import { Resend } from "resend";

const resendKey = process.env.RESEND_SECRET_KEY;
const resend = new Resend(resendKey);

resend.emails.send({
  from: "onboarding@resend.dev",
  to: "yaredyilma11@gmail.com",
  subject: "Hello World",
  html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
});
