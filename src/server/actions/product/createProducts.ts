"use server";

import connectMongoDB from "@/lib/utils/mongo/db";
import { revalidatePath } from "next/cache";
import { FormState } from "@/types/product";
import { CreateProductFormSchema } from "@/lib/utils/validators/form-validators";
import Product from "@/models/productModel";

export async function createProductAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  console.log("images: ", formData.get("images"));
  console.log("category: ", formData.get("category"));
  const validatedFields = CreateProductFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    sizes: formData.get("sizes"),
    stockQuantity: formData.get("stockQuantity"),
    description: formData.get("description"),
    images: formData.get("images"),
  });

  console.log(validatedFields.success);

  if (!validatedFields.success) {
    return {
      message: "invalid form data",
    };
  }

  try {
    await connectMongoDB();
    const newProduct = await Product.create(validatedFields.data);

    if (!newProduct) {
      return { message: "New product creation failed" };
    }

    revalidatePath("/");
    return { message: "success" };
  } catch (err) {
    throw err;
  }
}
