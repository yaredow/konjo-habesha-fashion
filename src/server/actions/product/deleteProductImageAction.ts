"use server";

import Product from "@/models/productModel";
import cloudinary from "@/utils/cloudinary";

export async function deleteProductImageAction(
  public_id: string,
  product_id: string,
) {
  console.log("public_id:", public_id);
  try {
    const cloudinaryResult = await cloudinary.uploader.destroy(public_id);

    console.log("cloudinary result:", cloudinaryResult);

    if (cloudinaryResult.result === "ok") {
      await Product.updateOne(
        { _id: product_id },
        { $pull: { images: { public_id: public_id } } },
      );
    }

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw error;
  }
}
