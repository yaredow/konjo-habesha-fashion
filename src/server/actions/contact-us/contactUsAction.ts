import { ContactUsFromSchema } from "@/utils/validators/form-validators";
import { z } from "zod";
import { ErrorAndSuccessType } from "../account/authenticate";
import {
  sendAdminNotificationEmail,
  sendContactUsEmail,
} from "../email/EmailAction";

export async function contactUsAction(
  values: z.infer<typeof ContactUsFromSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = ContactUsFromSchema.safeParse(values);

  console.log(validatedFields);
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
