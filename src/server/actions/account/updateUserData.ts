"use server";
import { UpdateAccountFormSchema } from "@/lib/utils/validators/form-validators";
import connectMongoDB from "@/lib/utils/mongo/db";
import User from "@/models/authModel";

export type FormState = {
  message: string;
};

export async function updateUserData(
  email: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = UpdateAccountFormSchema.safeParse({
    fullName: formData.get("fullName"),
  });

  if (!validatedFields.success) {
    return { message: "Invalid data" };
  }

  try {
    const { fullName } = validatedFields.data;
    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) {
      return { message: "You have to login first" };
    }

    user.fullName = fullName;
    await user.save();

    return { message: "success" };
  } catch (err) {
    return { message: "Changing user data failed" };
  }
}
