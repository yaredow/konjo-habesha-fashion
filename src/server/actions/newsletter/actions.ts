"use server";

import {
  ErrorAndSuccessType,
  newsLetterFormSchema,
} from "@/utils/validators/form-validators";
import { z } from "zod";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendNewsLetterSubscriptionConfirmationEmail } from "../email/email";

export async function newsLetterSubscriptionAction(
  values: z.infer<typeof newsLetterFormSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = newsLetterFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { fullName, email } = validatedFields.data;

  const existingUser = await prisma.newslettersubscriptions.findFirst({
    where: { email },
  });

  if (existingUser) {
    return { error: "You are already subscribed to our newsletter" };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const newSubsciption = await prisma.newslettersubscriptions.create({
    data: {
      fullName,
      email,
      unsubscribeToken: hashedToken,
      unsubscribeTokenExpires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  if (!newSubsciption) {
    return { error: "Something went wrong. Try again!" };
  }

  await sendNewsLetterSubscriptionConfirmationEmail(fullName, email, token);

  return { success: "You have successfully subscribed to our newsletter" };
}

export async function newsLetterUnsubscriptionAction(
  token: string,
): Promise<ErrorAndSuccessType> {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const subscription = await prisma.newslettersubscriptions.findUnique({
    where: { unsubscribeToken: hashedToken },
  });

  if (!subscription) {
    return { error: "Subscription not found" };
  }

  const isExpired = new Date(subscription.unsubscribeTokenExpires) < new Date();

  if (!isExpired) {
    return { error: "Token expired" };
  }

  await prisma.newslettersubscriptions.delete({
    where: { unsubscribeToken: subscription.unsubscribeToken },
  });

  return {
    success: "You have successfully unsubscribed from our subscription",
  };
}
