import prisma from "@/lib/prisma";

export const getTwoFactorConfirmationTokenWithEmail = async (email: string) => {
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

export const getTwoFactorConfirmationTokenWithToken = async (token: string) => {
  try {
    const twoFactorConfirmationToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorConfirmationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
