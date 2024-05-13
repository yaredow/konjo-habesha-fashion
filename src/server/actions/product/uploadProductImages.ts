"use server";

import prisma from "@/lib/prisma";
import cloudinary from "@/utils/cloudinary";
import { UploadApiResponse } from "cloudinary";

type ImageTypes = {
  public_id: string;
  url: string;
};

type ReturnType = {
  message: string;
  success: boolean;
  uploadedImages?: ImageTypes[];
};

export async function uploadProductImagesAction(
  formData: FormData,
  productId?: string,
): Promise<ReturnType> {
  const uploadedImages = [] as ImageTypes[];
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
        public_id: uploadResult?.public_id as string,
        url: uploadResult?.url as string,
      });
    }

    if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (product) {
        await prisma.product.update({
          where: { id: product.id },
          data: {
            images: [...product.images, ...uploadedImages],
          },
        });
      }

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
