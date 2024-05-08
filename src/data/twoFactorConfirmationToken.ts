import prisma from "@/lib/prisma";

export const getTwoFactorConfirmationTokenWithUserId = async (
  email: string,
) => {
  try {
    const twoFactorConfirmationToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorConfirmationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
