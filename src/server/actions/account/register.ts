"use server";

import prisma from "@/lib/prisma";
import { SignupFormSchema } from "@/utils/validators/form-validators";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { ErrorAndSuccessType } from "./authenticate";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";

export async function register(
  values: z.infer<typeof SignupFormSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = SignupFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    return { error: "User creation failed" };
  }

  return { success: "Registration successfull" };
}
