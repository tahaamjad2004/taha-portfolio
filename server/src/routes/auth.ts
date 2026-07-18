import { Router } from "express";
import { supabaseAuth } from "../lib/supabase.js";
import { loginSchema } from "../lib/validators.js";
import { getClientIp } from "../middleware/getClientIp.js";
import { requireAdmin, type AuthRequest } from "../middleware/auth.js";
import { clearLoginAttempts, isIpBlocked, recordFailedLogin } from "../lib/loginAttempts.js";

const router = Router();

router.post("/login", async (req, res) => {
  const ipAddress = getClientIp(req);

  try {
    const blockStatus = await isIpBlocked(ipAddress);
    if (blockStatus.blocked) {
      return res.status(429).json({ error: blockStatus.message });
    }

    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parsed.data;

    // Attempt login with Supabase
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase Auth Error:", error.message);
      const failResult = await recordFailedLogin(ipAddress);
      return res.status(401).json({ 
        error: "Invalid email or password",
        details: error.message 
      });
    }

    if (!data.session) {
      return res.status(401).json({ error: "No session returned" });
    }

    await clearLoginAttempts(ipAddress);

    return res.json({
      message: "Login successful",
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      },
      user: { id: data.user.id, email: data.user.email },
    });
  } catch (err: any) {
    console.error("CRITICAL SERVER ERROR:", err);
    return res.status(500).json({ 
      error: "Internal server error", 
      details: err.message 
    });
  }
});

router.post("/logout", requireAdmin, (_req, res) => {
  res.json({ message: "Logged out successfully" });
});

router.get("/me", requireAdmin, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

export default router;