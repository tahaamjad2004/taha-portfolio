const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

function isRecaptchaConfigured() {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  return Boolean(secret && secret !== "leave_blank_for_now");
}

export async function verifyRecaptcha(token: string, remoteIp?: string) {
  if (!isRecaptchaConfigured()) {
    return { success: process.env.NODE_ENV !== "production" };
  }

  const params = new URLSearchParams();
  params.append("secret", process.env.RECAPTCHA_SECRET_KEY!);
  params.append("response", token);
  if (remoteIp) params.append("remoteip", remoteIp);

  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  // Explicitly define the type to fix the red squiggly line
  const data = (await response.json()) as { 
    success: boolean; 
    "error-codes"?: string[] 
  };

  if (!data.success) {
    // This will print the error in your terminal to tell us why it failed
    console.error("reCAPTCHA Google API Error Response:", data);
    return { success: false, error: "reCAPTCHA verification failed" };
  }

  return { success: true };
}