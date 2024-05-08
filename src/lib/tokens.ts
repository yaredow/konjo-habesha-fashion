import { v4 as uuid4 } from "uuid";
import prisma from "@/lib/prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingVerficationToken = await prisma.verificationToken.findFirst({
    where: { email },
  });

  if (existingVerficationToken) {
    await prisma.verificationToken.delete({
      where: { id: existingVerficationToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingPasswordResetToken = await prisma.passwordResetToken.findFirst({
    where: { email },
  });

  if (existingPasswordResetToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingPasswordResetToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return passwordResetToken;
};
