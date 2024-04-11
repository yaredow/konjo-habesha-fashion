"use server";

import Product from "@/models/productModel";
import connectMongoDB from "@/utils/db/db";

export async function editProductAction(id: string) {
  try {
    await connectMongoDB();
    const product = await Product.findById({ _id: id });

    if (!product) {
      return {
        message: "Product not found",
      };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
