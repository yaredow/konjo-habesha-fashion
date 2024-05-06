import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendKey);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http//localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `Here <p><a href="${confirmLink}">Here</a></p>`,
  });
}
