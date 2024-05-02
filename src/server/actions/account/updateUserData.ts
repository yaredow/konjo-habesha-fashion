"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateAccountFormSchema } from "@/utils/validators/form-validators";
import { revalidatePath } from "next/cache";

export type FormState = {
  message: string;
};

export async function updateUserData(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = UpdateAccountFormSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return { message: "Invalid data" };
  }

  const name = validatedFields.data.name;

  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Unauthorized access");
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
      },
    });

    revalidatePath("/");

    return { message: "success" };
  } catch (err) {
    return { message: "Changing user data failed" };
  }
}
