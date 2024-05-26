"use server";

import { revalidatePath } from "next/cache";

import { CreateProductFormSchema } from "@/utils/validators/form-validators";
import { uploadProductImagesAction } from "./uploadProductImages";
import { ErrorAndSuccessType } from "../account/authenticate";
import prisma from "@/lib/prisma";

export async function createProductAction(
  formData: FormData,
): Promise<ErrorAndSuccessType> {
  let sizes: string[] = [];
  const sizesData = formData.get("sizes");
  const images = formData.getAll("images") as File[];

  if (typeof sizesData === "string") {
    sizes = sizesData.split(",").map((size) => size.trim());
  } else if (Array.isArray(sizesData)) {
    sizes = sizesData;
  }

  const validatedFields = CreateProductFormSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    sizes,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid data",
    };
  }

  try {
    const { uploadedImages } = await uploadProductImagesAction(images);

    const newProduct = await prisma.product.create({
      data: {
        ...validatedFields.data,
        images: uploadedImages,
      },
    });

    if (!newProduct) {
      return { error: "New product creation failed" };
    }

    revalidatePath("/");
    return { success: "Product created successfully" };
  } catch (err) {
    throw err;
  }
}
