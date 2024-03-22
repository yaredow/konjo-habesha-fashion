"use server";

import { toast } from "@/components/ui/use-toast";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updatePasswordAction(
  email: string,
  prevState: any,
  formData: FormData,
): Promise<{
  errors: {
    currentPassword?: string[] | undefined;
    newPassword?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  };
  message: string | null;
}> {
  const data = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  console.log(data);

  try {
    await connectMongoDB();
    const user = await User.findOne({
      email: email,
    }).select("+password");

    console.log(user);

    if (!user) {
      toast({
        description: "Please login first",
      });
    }

    const isCorrectPasswod = await bcrypt.compare(
      data.currentPassword as string,
      user.password,
    );

    if (!isCorrectPasswod) {
      toast({
        description: "Passwords do not match",
      });
    }

    user.password = data.newPassword;
    user.passwordConfirm = data.passwordConfirm;
    console.log("password changed successfully");
    await user.save();
    revalidatePath("/");
    return { message: "Passowrd updated successfully", errors: {} };
  } catch (err) {
    return { message: "Changing user password failed", errors: {} };
  }
}
