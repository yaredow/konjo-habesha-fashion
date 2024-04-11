"use server";

import connectMongoDB from "@/lib/utils/mongo/db";
import { revalidatePath } from "next/cache";
import { FormState } from "@/types/product";
import { CreateProductFormSchema } from "@/lib/utils/validators/form-validators";
import Product from "@/models/productModel";
import cloudinary from "@/lib/utils/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function createProductAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  let sizes: string[] = [];
  const sizesData = formData.get("sizes");
  const uploadedImages = [];
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
    for (const image of images) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const uploadResult = await new Promise<UploadApiResponse | undefined>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                tags: ["konjo-habesha-next-js"],
                upload_preset: "konjo-habesha",
              },
              function (err, result) {
                if (err) {
                  reject(err);
                  return;
                } else {
                  resolve(result);
                }
              },
            )
            .end(buffer);
        },
      );

      uploadedImages.push({
        public_id: uploadResult?.public_id,
        url: uploadResult?.url,
      });
    }

    await connectMongoDB();
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
