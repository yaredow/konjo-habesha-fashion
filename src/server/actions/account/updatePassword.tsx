"use server";

import { updatePasswordFormSchema } from "@/Schema/formSchemas";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function updatePassword(
  prevState: { message: string; email: string },
  formData: FormData,
) {
  console.log(prevState);
  const data = updatePasswordFormSchema.parse({
    password: formData.get("password"),
    confirmPassword: formData.get("passwordConfirm"),
  });

  const hashedToken = crypto
    .createHash("sha256")
    .update(data.currentPassword)
    .digest("hex");

  try {
    await connectMongoDB();
    const user = await User.findOne({ email: prevState.email }).select("+password");

    if (!user) {
      return { message: "You are not logged in" };
    }

    
    }
  } catch (err) {
    throw err;
  }
}
