"use server";

import { UpdatePasswordFormSchema } from "@/lib/utils/Schemas";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export type FormState = {
  message: string;
};

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
    await connectMongoDB();
    const user = await User.findOne({
      email: email,
    }).select("+password");

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
