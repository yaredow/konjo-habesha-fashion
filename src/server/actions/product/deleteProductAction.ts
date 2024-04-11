"use server";

import Product from "@/models/productModel";
import connectMongoDB from "@/utils/db/db";
import { revalidatePath } from "next/cache";

export async function deleteProductAction(id: string) {
  try {
    await connectMongoDB();
    const product = await Product.findByIdAndDelete({ _id: id });

    if (!product) {
      return {
        message: "Product not found",
      };
    }

    revalidatePath("/");

    return {
      message: "success",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
