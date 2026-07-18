import { prisma } from "./prisma.js";

const MAX_ATTEMPTS = 5;
const BLOCK_MINUTES = 30;

export async function isIpBlocked(ipAddress: string) {
  const record = await prisma.loginAttempt.findUnique({
    where: { ipAddress },
  });

  if (!record?.blockedUntil) {
    return { blocked: false };
  }

  if (record.blockedUntil > new Date()) {
    return {
      blocked: true,
      blockedUntil: record.blockedUntil,
      message:
        "Too many failed login attempts. Please try again later or contact support.",
    };
  }

  await prisma.loginAttempt.update({
    where: { ipAddress },
    data: { attempts: 0, blockedUntil: null },
  });

  return { blocked: false };
}

export async function recordFailedLogin(ipAddress: string) {
  const now = new Date();

  await prisma.loginAttempt.upsert({
    where: { ipAddress },
    create: {
      ipAddress,
      attempts: 1,
      lastAttemptAt: now,
    },
    update: {
      attempts: { increment: 1 },
      lastAttemptAt: now,
    },
  });

  const record = await prisma.loginAttempt.findUniqueOrThrow({
    where: { ipAddress },
  });

  if (record.attempts >= MAX_ATTEMPTS) {
    const blockedUntil = new Date(now.getTime() + BLOCK_MINUTES * 60 * 1000);
    await prisma.loginAttempt.update({
      where: { ipAddress },
      data: { blockedUntil },
    });
    return {
      blocked: true,
      message:
        "Too many failed login attempts. Your IP has been temporarily blocked.",
    };
  }

  return {
    blocked: false,
    remainingAttempts: MAX_ATTEMPTS - record.attempts,
  };
}

export async function clearLoginAttempts(ipAddress: string) {
  await prisma.loginAttempt.upsert({
    where: { ipAddress },
    create: { ipAddress, attempts: 0 },
    update: { attempts: 0, blockedUntil: null, lastAttemptAt: new Date() },
  });
}
