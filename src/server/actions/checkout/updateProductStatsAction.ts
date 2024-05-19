"use server";

import prisma from "@/lib/prisma";
import { CartItem } from "@/../types/product";

export async function updateProductStats(formData: FormData) {
  const customer = JSON.parse(formData.get("customer") as string);

  const items = JSON.parse(customer.metadata.cart);
  console.log(items);

  await Promise.all(
    items.map(async (item: CartItem) => {
      try {
        const product = await prisma.product.findFirst({
          where: { name: item.name },
        });

        if (!product) {
          throw new Error("Product not found");
        }

        await prisma.product.update({
          where: { id: product.id },
          data: {
            unitsSold: product.unitsSold + item.quantity,
            stockQuantity: product.stockQuantity - item.quantity,
          },
        });

        product.unitsSold += item.quantity;
        product.stockQuantity -= item.quantity;

        if (product.stockQuantity === 0) {
          product.inStock = false;
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    }),
  );
}
