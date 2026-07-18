import type { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { supabaseAdmin } from "../lib/supabase.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    authUserId: string;
    email: string;
    name: string;
    role: UserRole;
  };
}

export async function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const token = authHeader.slice(7);

    if (!supabaseAdmin) {
      res.status(500).json({ error: "Auth service not configured" });
      return;
    }

    const {
      data: { user: authUser },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !authUser) {
      res.status(401).json({ error: "Invalid or expired session" });
      return;
    }

    // DEBUGGING: Log IDs to check for mismatch
    console.log("Checking Admin Access for Supabase User ID:", authUser.id);

    const dbUser = await prisma.user.findUnique({
      where: { authUserId: authUser.id },
    });

    // DEBUGGING: Log what we found in our DB
    console.log("Database User found:", dbUser);

    if (!dbUser || dbUser.role !== UserRole.ADMIN) {
      console.warn("Access Denied: User not found or not an admin");
      res.status(403).json({ error: "Admin access required" });
      return;
    }

    req.user = {
      id: dbUser.id,
      authUserId: dbUser.authUserId,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role,
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ error: "Authentication failed" });
  }
}