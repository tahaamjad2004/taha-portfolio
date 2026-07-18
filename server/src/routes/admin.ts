import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { prisma } from "../lib/prisma.js"; // Ensure this import matches your project structure

const router = Router();

router.get("/contacts", requireAdmin, async (_req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(contacts);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;