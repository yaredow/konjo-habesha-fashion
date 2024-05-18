"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification_token";
import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "./authenticate";
import { sendWelcomeEmail } from "../email/EmailAction";

export async function tokenVerificationAction(
  token: string,
): Promise<ErrorAndSuccessType> {
  const existingVerification = await getVerificationTokenByToken(token);

  if (!existingVerification) {
    return { error: "Token not found" };
  }

  const isTokenExpired = new Date(existingVerification.expires) < new Date();

  if (isTokenExpired) {
    return { error: "Token has expired" };
  }

  const user = await getUserByEmail(existingVerification.email);

  if (!user) {
    return { error: "User not found" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      email: existingVerification.email,
    },
  });

  await sendWelcomeEmail(user.name!, user.email!);

  await prisma.verificationToken.delete({
    where: { id: existingVerification.id },
  });

  return { success: "Email successfuly verified" };
}
