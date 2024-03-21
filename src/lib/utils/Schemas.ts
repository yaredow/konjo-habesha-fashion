import { z } from "zod";

export const UpdateAccountFormSchema = z.object({
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

export const UpdatePasswordFormSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(8),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.newPassword === data.passwordConfirm;
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    },
  );
