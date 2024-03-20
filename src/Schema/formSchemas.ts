import { z } from "zod";

export const updatePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return (data.newPassword = data.passwordConfirm);
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    },
  );
