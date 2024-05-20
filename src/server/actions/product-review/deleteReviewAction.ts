"use server";

import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "../account/authenticate";

export async function deleteReviewAction(
  reviewId: string,
  userId: string,
): Promise<ErrorAndSuccessType> {
  try {
    const review = await prisma.review.delete({
      where: {
        id: reviewId,
        userId,
      },
    });

    if (!review) {
      return { error: "Review not found" };
    }

    return { success: "Review deleted successfully" };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
