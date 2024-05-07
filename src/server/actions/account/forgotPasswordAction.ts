import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { forgotPasswordFormSchema } from "@/utils/validators/form-validators";
import { z } from "zod";

export async function forgotPasswordAction(
  values: z.infer<typeof forgotPasswordFormSchema>,
) {
  const validatedField = forgotPasswordFormSchema.safeParse({
    email: values.email,
  });

  if (!validatedField.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedField.data;

  const user = await getUserByEmail(values.email);

  if (!user) {
    return { error: "User doesn't exist with that email" };
  }

  const verificationToken = await generateVerificationToken(email);

  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Password reset token sent successfully" };
}
