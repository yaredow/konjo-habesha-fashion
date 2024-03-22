"use server";

import { UpdatePasswordFormSchema } from "@/lib/utils/Schemas";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updatePasswordAction(
  email: string,
  prevState: any,
  formData: FormData,
): Promise<{
  error?: string | null;
  message?: string | null;
}> {
  const { currentPassword, newPassword, passwordConfirm } = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const validatedFields = UpdatePasswordFormSchema.safeParse({
    currentPassword,
    newPassword,
    passwordConfirm,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await connectMongoDB();
    const user = await User.findOne({
      email: email,
    }).select("+password");

    if (!user) {
      return { error: "You have to log in first" };
    }

    const isCorrectPasswod = await bcrypt.compare(
      currentPassword as string,
      user.password,
    );

    if (!isCorrectPasswod) {
      return {
        error: "Passwords do not match",
      };
    }

    user.password = newPassword;
    user.passwordConfirm = passwordConfirm;
    console.log("password changed successfully");
    await user.save();
    revalidatePath("/");
    return { message: "Passowrd updated successfully" };
  } catch (err) {
    return { error: "Changing user password failed" };
  }
}
