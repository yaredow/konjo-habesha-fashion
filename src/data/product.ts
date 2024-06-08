"use server";

import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();

    if (!products) {
      return null;
    }

    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProduct = async (slug: string): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return null;
    }

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};
