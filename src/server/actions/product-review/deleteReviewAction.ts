"use server";

import prisma from "@/lib/prisma";

export async function deleteReviewAction(reviewId: string, userId: string) {
  try {
    const review = await prisma.review.delete({
      where: {
        id: reviewId,
        userId,
      },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    return { success: true, message: "Review deleted successfully" };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
