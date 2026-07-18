import "dotenv/config";
import { UserRole } from "@prisma/client";
import { prisma } from "../src/lib/prisma.js";
import { supabaseAdmin } from "../src/lib/supabase.js";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin";

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env");
    process.exit(1);
  }

  if (!supabaseAdmin) {
    console.error("SUPABASE_SERVICE_ROLE_KEY must be set in server/.env");
    process.exit(1);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    console.log(`Admin user already exists: ${email}`);
    process.exit(0);
  }

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });

  if (authError || !authData.user) {
    console.error("Failed to create Supabase auth user:", authError?.message);
    process.exit(1);
  }

  await prisma.user.create({
    data: {
      authUserId: authData.user.id,
      name,
      email,
      role: UserRole.ADMIN,
    },
  });

  console.log(`Admin user seeded successfully: ${email}`);
}

seedAdmin()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
