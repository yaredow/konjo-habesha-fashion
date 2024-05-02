import { z } from "zod";

export const UpdateAccountFormSchema = z.object({
  name: z.string().refine(
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
});

export const UpdatePasswordFormSchema = z
  .object({
    currentPassword: z.string().trim().min(8),
    newPassword: z.string().trim().min(8),
    passwordConfirm: z.string().trim().min(8),
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

export const registrationFormSchema = z
  .object({
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
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  })
  .refine(
    (data) => {
      return (data.password = data.passwordConfirm);
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    },
  );

export const CreateProductFormSchema = z.object({
  name: z
    .string()
    .max(400, { message: "Product name cannot exceed 400 characters" })
    .min(1, { message: "Name is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
  sizes: z
    .array(z.string())
    .min(1, { message: "At least one size is required" }),
  stockQuantity: z.coerce
    .number()
    .min(1, { message: "Stock quantity must be a positive number" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(2000, { message: "Description cannot exceed 2000 characters" }),
});
