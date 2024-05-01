"use server";

import prisma from "@/lib/prisma";

export async function createProductReviewAction(
  formData: FormData,
  userId: string,
  productId: string,
) {
  const userReview = formData.get("review") as string;
  const reviewTitle = formData.get("title") as string;
  const userRating = Number(formData.get("rating"));

  try {
    const review = await prisma.review.findFirst({
      where: { userId, productId },
    });

    if (review) {
      return {
        success: false,
        message: "You have already reviewed this product",
      };
    }

    const order = await prisma.order.findFirst({
      where: { userId, products: { some: { productId } } },
    });

    if (!order) {
      return {
        success: false,
        message: "You didn't not purchased this product",
      };
    }

    const newReview = await prisma.review.create({
      data: {
        review: reviewTitle,
        title: userReview,
        rating: userRating,
        productId,
        userId,
        orderId: order.id,
      },
    });

    if (!newReview) {
      return {
        success: false,
        message: "Failed to save your review. Please try again!",
      };
    }

    return {
      success: true,
      message: "Review saved successfully",
    };
  } catch (err) {
    throw err;
  }
}
