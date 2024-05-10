"use server";

import { getUserById } from "@/data/user";
import { ErrorAndSuccessType } from "./authenticate";
import prisma from "@/lib/prisma";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/utils/cloudinary";

export async function uploadUserProfileImage(
  formData: FormData,
): Promise<ErrorAndSuccessType> {
  const userId = formData.get("userId") as string;
  const image = formData.get("image") as File;
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  if (!image) {
    return { error: "Image not found" };
  }

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

  const user = await getUserById(userId);

  if (!user) {
    return { error: "User not found" };
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      image: uploadResult?.url,
    },
  });

  return { success: "Image uploaded successfully" };
}
