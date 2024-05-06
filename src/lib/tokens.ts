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
