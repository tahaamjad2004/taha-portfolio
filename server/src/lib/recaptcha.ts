const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE = 0.5;

function isRecaptchaConfigured() {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  return Boolean(secret && secret !== "leave_blank_for_now");
}

export async function verifyRecaptcha(token: string, remoteIp?: string) {
  if (!isRecaptchaConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return { success: false, error: "reCAPTCHA is not configured" };
    }
    return { success: true };
  }

  const params = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY!,
    response: token,
  });

  if (remoteIp) {
    params.set("remoteip", remoteIp);
  }

  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = (await response.json()) as {
    success: boolean;
    score?: number;
    "error-codes"?: string[];
  };

  if (!data.success) {
    return { success: false, error: "reCAPTCHA verification failed" };
  }

  if (typeof data.score === "number" && data.score < MIN_SCORE) {
    return { success: false, error: "reCAPTCHA score too low" };
  }

  return { success: true };
}
