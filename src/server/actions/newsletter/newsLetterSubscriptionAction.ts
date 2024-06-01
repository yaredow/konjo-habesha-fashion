import { newsLetterFormSchema } from "@/utils/validators/form-validators";
import { z } from "zod";
import { ErrorAndSuccessType } from "../account/authenticate";
import prisma from "@/lib/prisma";
import crypto from "crypto";

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

  return { success: "You have successfully subscribed to our newsletter" };
}
