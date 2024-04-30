"use server";

import prisma from "@/lib/prisma";
import connectMongoDB from "@/utils/db/db";
import bcrypt from "bcryptjs";

export async function login(credentials: { email: string; password: string }) {
  const { email, password } = credentials;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        password: true,
      },
    });

    if (user && !user.password) {
      throw new Error(
        "It appears you previously signed up using social media. Please use your Google or Facebook account.",
      );
    }

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        return user;
      } else {
        throw new Error("Passord or email doesn't match");
      }
    } else {
      throw new Error("User does not exist.");
    }
  } catch (err: any) {
    throw new Error(err);
  }
}
