import { ContactUsFromSchema } from "@/utils/validators/form-validators";
import { z } from "zod";
import { ErrorAndSuccessType } from "../account/authenticate";

export async function contactUsAction(
  values: z.infer<typeof ContactUsFromSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = ContactUsFromSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  return { success: "Thank you for your contact" };
}
