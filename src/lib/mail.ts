import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendKey);

export async function sendVerificationEmail(
  email: string,
  token: string,
  reset?: boolean,
) {
  const confirmLink = reset
    ? `http://localhost:3000/auth/reset-password?token=${token}`
    : `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: reset ? "Reset your password" : "Confirm your email",
    html: `Here <p><a href="${confirmLink}">Here</a></p>`,
  });
}
