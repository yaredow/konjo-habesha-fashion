import { ContactUsFromSchema } from "@/utils/validators/form-validators";
import { z } from "zod";
import { ErrorAndSuccessType } from "../account/authenticate";
import { sendContactUsEmail } from "../email/EmailAction";

export async function contactUsAction(
  values: z.infer<typeof ContactUsFromSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = ContactUsFromSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { fullName, email, message } = validatedFields.data;

  try {
    await sendContactUsEmail(fullName, email, message);
  } catch (error) {
    console.error(error);
    throw error;
  }

  return { success: "Thank you for your contact" };
}
