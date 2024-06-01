import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "../account/authenticate";
import crypto from "crypto";

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
