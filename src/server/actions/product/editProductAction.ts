"use server";

import Product from "@/models/productModel";
import { Product as ProductType } from "@/types/product";
import connectMongoDB from "@/utils/db/db";

export async function editProductAction(
  id: string,
  productDetails: ProductType,
) {
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
