"use server";

import prisma from "@/lib/prisma";
import { SignupFormSchema } from "@/utils/validators/form-validators";
import bcrypt from "bcryptjs";
import { ErrorAndSuccessType } from "./authenticate";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "../email/EmailAction";

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

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent" };
}
