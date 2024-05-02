"use server";

import prisma from "@/lib/prisma";
import {
  FormState,
  SignupFormSchema,
} from "@/utils/validators/form-validators";
import { redirect } from "next/navigation";

export async function register(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  });

  if (!validatedFields.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData.get(key)?.toString() || "";
    }
    return {
      message: "Invalid data",
      fields,
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const { name, email, password } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { message: "User already exists" };
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    if (newUser) {
      redirect("/account");
    }

    return { message: "success" };
  } catch (err) {
    throw err;
  }
}
