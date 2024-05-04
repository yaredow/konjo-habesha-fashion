"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginFormSchema } from "@/utils/validators/form-validators";
import { AuthError } from "next-auth";
import { z } from "zod";

export type ErrorAndSuccessType = {
  error?: string;
  success?: string;
};

export async function authenticate(
  values: z.infer<typeof loginFormSchema>,
): Promise<LoginFormType> {
  console.log(values);
  const validatedFields = loginFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  try {
    await signIn("credentials", {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      email: values.email,
      password: values.password,
    });

    return { success: "Login successful " };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}
