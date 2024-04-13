"use server";

import Product from "@/models/productModel";
import cloudinary from "@/utils/cloudinary";
import connectMongoDB from "@/utils/db/db";
import { UploadApiResponse } from "cloudinary";

type ReturnType = {
  message: string;
  success: boolean;
  uploadedImages?: {
    public_id: string | undefined;
    url: string | undefined;
  }[];
};

export async function uploadProductImagesAction(
  formData: FormData,
  productId?: string,
): Promise<ReturnType> {
  const uploadedImages = [];
  const images = formData.getAll("images") as File[];

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

    if (productId) {
      await connectMongoDB();
      const product = await Product.findById({ _id: productId });
      product.images = [...product.images, ...uploadedImages];

      await product.save();

      return { success: true, message: "Images are updated successfully" };
    }

    return {
      success: true,
      uploadedImages,
      message: "Images are uploaded successfully",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
