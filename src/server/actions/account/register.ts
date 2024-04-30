"use server";

import prisma from "@/lib/prisma";
import connectMongoDB from "@/utils/db/db";
import { registrationFormSchema } from "@/utils/validators/form-validators";

type FormState = {
  message: string;
};

export async function register(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = registrationFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  });

  if (!validatedFields.success) {
    return { message: "Invalid form data" };
  }
  try {
    const { fullName, email, password, passwordConfirm } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { message: "User already exists" };
    }

    const newUser = await prisma.user.create({
      fullName,
      email,
      password,
      passwordConfirm,
    });

    return { message: "success" };
  } catch (err) {
    throw err;
  }
}
