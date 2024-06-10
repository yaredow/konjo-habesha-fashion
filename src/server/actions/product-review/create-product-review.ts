"use server";

import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "../account/authenticate";

export async function createProductReviewAction(
  formData: FormData,
): Promise<ErrorAndSuccessType> {
  const userReview = formData.get("review") as string;
  const reviewTitle = formData.get("title") as string;
  const userId = formData.get("userId") as string;
  const productId = formData.get("productId") as string;
  const userRating = Number(formData.get("rating"));

  try {
    const review = await prisma.review.findFirst({
      where: { userId, productId },
    });

    if (review) {
      return {
        error: "You have already reviewed this product",
      };
    }

    const order = await prisma.order.findFirst({
      where: {
        userId,
        products: {
          some: { productId },
        },
      },
    });

    if (!order) {
      return {
        error: "You didn't not purchased this product",
      };
    }

    const newReview = await prisma.review.create({
      data: {
        review: userReview,
        title: reviewTitle,
        rating: userRating,
        productId,
        userId,
        orderId: order.id,
      },
    });

    if (!newReview) {
      return {
        error: "Failed to save your review. Please try again!",
      };
    }

    return {
      success: "Review saved successfully",
    };
  } catch (err) {
    throw err;
  }
}
