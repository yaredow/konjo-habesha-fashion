"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      redirectTo: "/account/profile",
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
