"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/prisma";
import {
  generateTwoFactorConfirmationToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginFormSchema } from "@/utils/validators/form-validators";
import { AuthError } from "next-auth";
import { z } from "zod";
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "../email/EmailAction";

export type ErrorAndSuccessType = {
  error?: string;
  success?: string;
  twoFactor?: boolean;
};

export async function authenticate(
  values: z.infer<typeof loginFormSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = loginFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { email, password, twoFactor } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email is not available" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Verification email sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (twoFactor) {
      const twoFactorCode = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorCode) {
        return { error: "Invalid code" };
      }

      if (twoFactorCode.token !== twoFactor) {
        return { error: "Invalid code" };
      }

      const twoFactorCodeExpires = new Date(twoFactorCode.expires) < new Date();

      if (twoFactorCodeExpires) {
        return { error: "The code has expired" };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoFactorCode.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorConfirmation = await generateTwoFactorConfirmationToken(
        existingUser.email,
      );

      await sendTwoFactorTokenEmail(
        twoFactorConfirmation.email,
        twoFactorConfirmation.token,
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      email,
      password,
    });

    return { success: "Login successful" };
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
