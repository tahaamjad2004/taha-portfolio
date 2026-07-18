import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { sendContactAlert } from "../lib/resend.js";
import { contactSchema } from "../lib/validators.js";
import { verifyRecaptcha } from "../lib/recaptcha.js"; // 1. Import the function

const router = Router();

router.post("/", async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    // 2. Add ReCAPTCHA verification
    const { token } = req.body;
    const recaptchaResult = await verifyRecaptcha(token);
    if (!recaptchaResult.success) {
      res.status(400).json({ error: recaptchaResult.error || "Spam detection failed" });
      return;
    }

    const contact = await prisma.contact.create({
      data: parsed.data,
    });

    try {
      await sendContactAlert(parsed.data);
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