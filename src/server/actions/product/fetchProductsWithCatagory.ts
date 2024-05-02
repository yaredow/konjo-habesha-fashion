import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

export async function fetchProductsWithCategory(type: string) {
  try {
    let products: Product[] = [];

    if (type === "trending") {
      const minUnitSold = 10;
      products = await prisma.product.findMany({
        where: {
          unitsSold: {
            gte: minUnitSold,
          },
        },
        take: 8,
        orderBy: {
          unitsSold: "desc",
        },
      });
    } else if (type === "featured") {
      products = await prisma.product.findMany({
        where: {
          isFeatured: true,
          stockQuantity: {
            gt: 0,
          },
        },
        take: 8,
      });
    } else if (type === "new-arrival") {
      const daysAgo = 30;
      products = await prisma.product.findMany({
        where: {
          productAddedDate: {
            gte: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
          },
        },
        take: 8,
        orderBy: {
          productAddedDate: "desc",
        },
      });
    } else {
      throw new Error("Invalid type");
    }

    if (products) {
      return { success: true, products };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
