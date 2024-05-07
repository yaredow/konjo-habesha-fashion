import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification_token";
import prisma from "@/lib/prisma";

export async function tokenVerificationAction(token: string) {
  const existingVerification = await getVerificationTokenByToken(token);
  console.log(existingVerification);

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

  await prisma.verificationToken.delete({
    where: { id: existingVerification.id },
  });

  return { success: "Email successfuly verified" };
}
