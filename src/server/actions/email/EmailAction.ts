"use server";

import { Resend } from "resend";
import ContactUsEmail from "@/emails/ContactUsEmail";
import WelcomeEmail from "@/emails/welcomeEmail";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your 2fa code:",
    html: `Here is your 2fa code: <p>${token}"></p>`,
  });
};

export const sendPasswordResetToken = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `Here <p><a href="${resetLink}">Here</a></p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `Click <p><a href="${confirmLink}">Here</a></p> to verifiy your email`,
  });
};

export const sendContactUsEmail = async (
  name: string,
  message: string,
  senderEmail: string,
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.HOST_PHONE_NUMBER as string,
    subject: "Reset your password",
    reply_to: senderEmail,
    react: ContactUsEmail({ name, message, senderEmail }),
  });
};

export const sendWelcomeEmail = async (name: string, email: string) => {
  const firstName = name.split(" ")[0];
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Welcome to Konjo habesha shop",
    react: WelcomeEmail({ firstName }),
  });
};
