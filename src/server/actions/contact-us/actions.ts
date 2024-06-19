import {
  ContactUsFromSchema,
  ErrorAndSuccessType,
} from "@/utils/validators/form-validators";
import { z } from "zod";
import { sendAdminNotificationEmail, sendContactUsEmail } from "../email/email";

export async function contactUsAction(
  values: z.infer<typeof ContactUsFromSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = ContactUsFromSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { name, email, phone, message } = validatedFields.data;

  try {
    await sendContactUsEmail(name, email, message);

    await sendAdminNotificationEmail(name, email, message, phone);

    return { success: "Thank you for your contact" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
