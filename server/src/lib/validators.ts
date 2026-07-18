import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address"),
  phoneSubject: z
    .string()
    .trim()
    .min(1, "Phone or subject is required")
    .max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  recaptchaToken: z.string().optional(),
});

export const contactStatusSchema = z.object({
  status: z.enum(["PENDING", "DONE", "COMPLETED", "RESOLVED"]),
});
