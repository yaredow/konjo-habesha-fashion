import { ContactUsFromSchema } from "@/utils/validators/form-validators";
import { z } from "zod";
import { ErrorAndSuccessType } from "../account/authenticate";
import { sendContactUsEmail } from "../email/EmailAction";

export async function contactUsAction(
  values: z.infer<typeof ContactUsFromSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = ContactUsFromSchema.safeParse(values);

  console.log(validatedFields);
  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  const { name, email, message } = validatedFields.data;

  try {
    await sendContactUsEmail(name, email, message);
    return { success: "Thank you for your contact" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
