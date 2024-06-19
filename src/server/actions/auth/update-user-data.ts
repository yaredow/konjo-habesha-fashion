"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateAccountFormSchema } from "@/utils/validators/form-validators";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ErrorAndSuccessType } from "./authenticate";

export type FormState = {
  message: string;
};

export async function updateUserData(
  values: z.infer<typeof UpdateAccountFormSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = UpdateAccountFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
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

    return { success: "User account updated successfully" };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
