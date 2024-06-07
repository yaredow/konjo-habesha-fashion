import prisma from "@/lib/prisma";

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    console.log(products);

    if (!products) {
      return null;
    }

    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
};
