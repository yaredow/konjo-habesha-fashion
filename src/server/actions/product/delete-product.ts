"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ErrorAndSuccessType } from "../account/authenticate";

export async function deleteProductAction(
  id: string,
): Promise<ErrorAndSuccessType> {
  try {
    const product = await prisma.product.delete({ where: { id } });

    if (!product) {
      return {
        error: "Product not found",
      };
    }

    revalidatePath("/");

    return {
      success: "Product deleted successfully",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
