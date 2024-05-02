"use server";

import Product from "@/models/productModel";
import { Product as ProductType } from "../../../../types/product";
import connectMongoDB from "@/utils/db/db";

type ReturnType = {
  success: boolean;
  message: string;
};
export async function editProductAction(
  id: string,
  productDetails: ProductType,
): Promise<ReturnType> {
  try {
    await connectMongoDB();
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      productDetails,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    return {
      success: true,
      message: "Product successfully updated",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
