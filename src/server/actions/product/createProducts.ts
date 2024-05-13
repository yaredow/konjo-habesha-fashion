"use server";

import { revalidatePath } from "next/cache";
import { FormState } from "../../../../types/product";

import { CreateProductFormSchema } from "@/utils/validators/form-validators";
import { uploadProductImagesAction } from "./uploadProductImages";

export async function createProductAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  let sizes: string[] = [];
  const sizesData = formData.get("sizes");
  const images = formData.getAll("images") as File[];

  if (typeof sizesData === "string") {
    // Parse the string into an array
    sizes = sizesData.split(",").map((size) => size.trim());
  } else if (Array.isArray(sizesData)) {
    sizes = sizesData;
  }

  const validatedFields = CreateProductFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    sizes: sizes,
    stockQuantity: formData.get("stockQuantity"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid data",
    };
  }

  try {
    const uploadedImages = await uploadProductImagesAction(images);
    console.log(uploadedImages);

    const newProduct = await Product.create({
      ...validatedFields.data,
      images: uploadedImages,
    });

    if (!newProduct) {
      return { message: "New product creation failed" };
    }

    revalidatePath("/");
    return { message: "success" };
  } catch (err) {
    throw err;
  }
}
