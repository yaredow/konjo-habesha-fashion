"use server";

import { updatePasswordFormSchema } from "@/Schema/formSchemas";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updatePassword(
  prevState: { message: string; fieldValues: { email: string } },
  formData: FormData,
) {
  const data = updatePasswordFormSchema.parse({
    password: formData.get("password"),
    confirmPassword: formData.get("passwordConfirm"),
  });

  try {
    await connectMongoDB();
    const user = await User.findOne({
      email: prevState.fieldValues.email,
    }).select("+password");

    if (!user) {
      return { message: "You are not logged in" };
    }

    const isCorrectPasswod = await bcrypt.compare(
      data.currentPassword,
      user.password,
    );

    if (!isCorrectPasswod) {
      return { message: "The passowrd you provided is inccorect" };
    }

    user.password = data.newPassword;
    user.passwordConfirm = data.passwordConfirm;

    revalidatePath("/");
    await user.save();
    return { message: "Passowrd updated successfully" };
  } catch (err) {
    return { message: err };
  }
}
