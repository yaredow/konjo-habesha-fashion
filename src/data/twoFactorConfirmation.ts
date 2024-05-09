import prisma from "@/lib/prisma";

export const twoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: { userId },
      },
    );

    return twoFactorConfirmation;
  } catch (error) {
    console.error(error);
    return null;
  }
};
