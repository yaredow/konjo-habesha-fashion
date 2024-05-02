"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { FormState } from "../../../../types/product";
import { UpdatePasswordFormSchema } from "@/utils/validators/form-validators";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function updatePasswordAction(
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
    const session = await auth();
    const user = session?.user;

    if (!user) {
      throw new Error("Unauthorized access");
    }

    const isCorrectPasswod = await bcrypt.compare(
      currentPassword as string,
      user.email,
    );

    if (!isCorrectPasswod) {
      return {
        message: "Passwords do not match",
      };
    }

    revalidatePath("/");
    return { message: "success" };
  } catch (err) {
    return { message: "Changing user password failed" };
  }
}
