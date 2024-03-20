import { z } from "zod";

export const updateAccountFormSchema = z.object({
  fullName: z.string().refine(
    (value) => {
      if (value !== "") {
        const names = value.trim().split(" ");
        return names.length === 2 && names.every((name) => name.length > 0);
      }
    },
    {
      message: "Please enter your full name with both first and last names.",
    },
  ),
  email: z.string().email(),
});

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
