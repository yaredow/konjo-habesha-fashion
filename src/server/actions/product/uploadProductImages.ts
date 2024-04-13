"use server";

import cloudinary from "@/utils/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function uploadProductImagesAction(images: File[]) {
  const uploadedImages = [];

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

    return uploadedImages;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
