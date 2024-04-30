"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { FormState } from "@/types/product";
import connectMongoDB from "@/utils/db/db";
import { UpdatePasswordFormSchema } from "@/utils/validators/form-validators";
import prisma from "@/lib/prisma";

export async function updatePasswordAction(
  email: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = UpdatePasswordFormSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    passwordConfirm: formData.get("passwordConfirm"),
  });

  if (!validatedFields.success) {
    return {
      message: "invalid form data",
    };
  }

  const { currentPassword, newPassword, passwordConfirm } =
    validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        password: true,
      },
    });

    if (!user) {
      return { message: "You have to login first" };
    }

    const isCorrectPasswod = await bcrypt.compare(
      currentPassword as string,
      user.password,
    );

    if (!isCorrectPasswod) {
      return {
        message: "Passwords do not match",
      };
    }

    user.password = newPassword;
    user.passwordConfirm = passwordConfirm;
    await user.save();
    revalidatePath("/");
    return { message: "success" };
  } catch (err) {
    return { message: "Changing user password failed" };
  }
}
