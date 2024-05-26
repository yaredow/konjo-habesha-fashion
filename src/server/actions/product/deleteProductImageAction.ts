"use server";

import prisma from "@/lib/prisma";
import cloudinary from "@/utils/cloudinary";

export async function deleteProductImageAction(
  public_id: string,
  product_id: string,
) {
  try {
    const cloudinaryResult = await cloudinary.uploader.destroy(public_id);

    if (cloudinaryResult.result === "ok") {
      const product = await prisma.product.findUnique({
        where: { id: product_id },
      });

      if (!product) {
        return { error: "Product not found " };
      }

      const updatedImages = product.images.filter(
        (image) => image.public_id !== public_id,
      );

      await prisma.product.update({
        where: { id: product_id },
        data: {
          images: updatedImages,
        },
      });
    }

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw error;
  }
}
