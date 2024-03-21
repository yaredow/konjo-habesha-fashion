"use server";

import { UpdatePasswordFormSchema } from "@/lib/utils/Schemas";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updatePasswordAction(
  email: string,
  formData: z.infer<typeof UpdatePasswordFormSchema>,
) {
  console.log(formData);
  const validatedFields = UpdatePasswordFormSchema.safeParse({
    currentPassword: formData.currentPassword,
    newPassword: formData.newPassword,
    passwordConfirm: formData.passwordConfirm,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await connectMongoDB();
    const user = await User.findOne({
      email: email,
    }).select("+password");

    if (!user) {
      return { message: "You are not logged in" };
    }

    const isCorrectPasswod = await bcrypt.compare(
      parsedFormData.currentPassword,
      user.password,
    );

    if (!isCorrectPasswod) {
      return { message: "The passowrd you provided is inccorect" };
    }

    user.password = parsedFormData.newPassword;
    user.passwordConfirm = parsedFormData.passwordConfirm;
    await user.save();
    revalidatePath("/");
    return { message: "Passowrd updated successfully" };
  } catch (err) {
    return { message: err };
  }
}
