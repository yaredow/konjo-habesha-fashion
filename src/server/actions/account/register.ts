"use server";

import { registrationFormSchema } from "@/lib/utils/form-schemas";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";

type FormState = {
  message: string;
};

export async function register(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = registrationFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  });

  if (!validatedFields.success) {
    return { message: "Invalid form data" };
  }
  try {
    const { fullName, email, password, passwordConfirm } = validatedFields.data;

    await connectMongoDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { message: "User already exists" };
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      passwordConfirm,
    });

    return { message: "success" };
  } catch (err) {
    throw err;
  }
}
