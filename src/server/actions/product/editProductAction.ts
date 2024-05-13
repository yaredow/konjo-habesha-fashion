"use server";

import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "../account/authenticate";
import { Product } from "@prisma/client";

export async function editProductAction(
  id: string,
  productDetails: Product,
): Promise<ErrorAndSuccessType> {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...productDetails,
      },
    });

    if (!product) {
      return {
        error: "Failed to update product",
      };
    }

    return {
      success: "Product successfully updated",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
