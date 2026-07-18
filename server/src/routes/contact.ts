import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { sendContactAlert } from "../lib/resend.js";
import { contactSchema } from "../lib/validators.js";
import { verifyRecaptcha } from "../lib/recaptcha.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    // 1. Validate the incoming request body
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      console.error("Zod Validation Error:", parsed.error.flatten().fieldErrors);
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    // 2. Destructure to separate the token from the actual contact data
    // parsed.data now contains { name, email, phoneSubject, message, token }
    const { token, ...contactData } = parsed.data;

    // 3. Verify ReCAPTCHA
    const recaptchaResult = await verifyRecaptcha(token);
    if (!recaptchaResult.success) {
      console.error("reCAPTCHA check failed:", recaptchaResult.error);
      return res.status(400).json({ error: recaptchaResult.error || "Spam detection failed" });
    }

    // 4. Save to database using only the cleaned contactData (without the token)
    const contact = await prisma.contact.create({
      data: contactData,
    });

    // 5. Send notification email
    try {
      await sendContactAlert(contactData);
    } catch (emailError) {
      console.error("Failed to send contact alert email:", emailError);
    }

    res.status(201).json({
      message: "Thank you! Your message has been sent successfully.",
      id: contact.id,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ error: "Failed to submit contact form. Please try again." });
  }
});

export default router;