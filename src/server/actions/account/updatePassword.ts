"use server";

import bcrypt from "bcryptjs";
import { UpdatePasswordFormSchema } from "@/utils/validators/form-validators";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { ErrorAndSuccessType } from "./authenticate";

export async function updatePasswordAction(
  values: z.infer<typeof UpdatePasswordFormSchema>,
  userId: string,
): Promise<ErrorAndSuccessType> {
  const validatedFields = UpdatePasswordFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "invalid form data",
    };
  }

  const { currentPassword, newPassword, passwordConfirm } =
    validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      return { error: "Unauthorized access" };
    }

    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    if (isCorrectPassword) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
        },
      });
    }

    return { success: "Password updated successfully" };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
