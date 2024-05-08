import { ResetPasswordFormSchema } from "@/utils/validators/form-validators";
import { z } from "zod";
import { ErrorAndSuccessType } from "./authenticate";
import { getPasswordResetTokenByToken } from "@/data/password_reset_token";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function resetPasswordAction(
  values: z.infer<typeof ResetPasswordFormSchema>,
  token: string,
): Promise<ErrorAndSuccessType> {
  if (!token) {
    return { error: "Token not found" };
  }

  const validatedFields = ResetPasswordFormSchema.safeParse({
    newPassword: values.newPassword,
    passwordCOnfirm: values.passwordConfirm,
  });

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { newPassword } = validatedFields.data;

  const existingResetPasswordToken = await getPasswordResetTokenByToken(token);

  if (!existingResetPasswordToken) {
    return { error: "Token not found" };
  }

  const isTokenExoired =
    new Date(existingResetPasswordToken.expires) < new Date();

  if (isTokenExoired) {
    return { error: "Token expired" };
  }

  const user = await getUserByEmail(existingResetPasswordToken.email);

  if (!user) {
    return { error: "User not found" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingResetPasswordToken.id },
  });

  return { success: "Password reseted successfully" };
}
