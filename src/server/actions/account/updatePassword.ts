"use server";

import { UpdatePasswordFormSchema } from "@/lib/utils/Schemas";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { FormState } from "../../../../type";

export async function updatePasswordAction(
  email: string,
  prevState: FormState,
  formData: z.infer<typeof UpdatePasswordFormSchema>,
) {
  console.log(formData);
  console.log(email);
  const validatedFields = UpdatePasswordFormSchema.safeParse({
    currentPassword: formData.currentPassword,
    newPassword: formData.newPassword,
    passwordConfirm: formData.passwordConfirm,
  });

  console.log(validatedFields.success);
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

    console.log(user);

    if (!user) {
      return { message: "You are not logged in" };
    }

    const isCorrectPasswod = await bcrypt.compare(
      validatedFields.data.currentPassword,
      user.password,
    );

    if (!isCorrectPasswod) {
      return { message: "The passowrd you provided is inccorect" };
    }

    user.password = validatedFields.data.newPassword;
    user.passwordConfirm = validatedFields.data.passwordConfirm;
    await user.save();
    revalidatePath("/");
    return { message: "Passowrd updated successfully" };
  } catch (err) {
    return { message: err };
  }
}
