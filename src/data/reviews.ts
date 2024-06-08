"use server";

import prisma from "@/lib/prisma";
import { Review } from "@prisma/client";

export const getReviews = async (id: string): Promise<Review[] | null> => {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: id },

      include: {
        product: {
          select: {
            id: true,
          },
        },
        user: {
          select: { name: true },
        },
        order: {
          select: { id: true },
        },
        likes: {
          select: { userId: true },
        },
        dislikes: {
          select: { userId: true },
        },
      },
    });

    if (!reviews) return null;

    return reviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
