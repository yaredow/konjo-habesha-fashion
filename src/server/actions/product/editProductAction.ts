"use server";

import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "../account/authenticate";
import { Product } from "@prisma/client";

export async function editProductAction(
  productDetails: Product,
): Promise<ErrorAndSuccessType> {
  try {
    const { id, ...updateData } = productDetails;
    console.log(updateData);
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        Review: {},
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
