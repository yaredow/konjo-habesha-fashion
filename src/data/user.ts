import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user as User;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = (await prisma.user.findUnique({
      where: { id },
    })) as User;
    return user;
  } catch {
    return null;
  }
};
