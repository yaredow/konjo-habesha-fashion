"use server";
import { UpdateAccountFormSchema } from "@/lib/utils/Schemas";

export async function updateUserData(
  prevState: any,
  formData: FormData,
): Promise<{
  errors: {
    fullName?: string[] | undefined;
    email?: string[] | undefined;
  };
  message: string | null;
}> {
  const validatedFields = UpdateAccountFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { message: "Validation failed", errors: {} };
  }

  const data = validatedFields.data;
  console.log(data);

  return { message: "validation successful", errors: {} };
}
