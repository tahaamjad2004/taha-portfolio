import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
const adminEmail = process.env.ADMIN_EMAIL;

export const resend =
  apiKey && apiKey !== "leave_blank_for_now" ? new Resend(apiKey) : null;

export async function sendContactAlert(contact: {
  name: string;
  email: string;
  phoneSubject: string;
  message: string;
}) {
  if (!resend || !adminEmail) {
    console.warn("Resend not configured — skipping contact alert email");
    return;
  }

  await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject: `New contact from ${contact.name}`,
    html: `
      <h2>New portfolio contact submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone / Subject:</strong> ${contact.phoneSubject}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message.replace(/\n/g, "<br>")}</p>
    `,
  });
}
