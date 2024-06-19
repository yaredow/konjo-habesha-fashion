import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "@/utils/validators/form-validators";

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

export async function likeOrDislikeAReviewAction(
  userId: string,
  reviewId: string,
  action: "like" | "dislike",
): Promise<ErrorAndSuccessType> {
  try {
    if (action === "like") {
      const existingLike = await prisma.like.findFirst({
        where: { userId, reviewId },
      });

      if (existingLike) {
        await prisma.like.delete({
          where: { id: existingLike.id },
        });
      } else {
        await prisma.like.create({
          data: {
            userId,
            reviewId,
          },
        });
        await prisma.dislike.deleteMany({
          where: { userId, reviewId },
        });
      }
    } else if (action === "dislike") {
      const existingDislike = await prisma.dislike.findFirst({
        where: { userId, reviewId },
      });

      if (existingDislike) {
        await prisma.dislike.delete({
          where: { id: existingDislike.id },
        });
      } else {
        await prisma.dislike.create({
          data: {
            userId,
            reviewId,
          },
        });
        await prisma.like.deleteMany({
          where: { userId, reviewId },
        });
      }
    }

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        likes: true,
        dislikes: true,
      },
    });

    if (!review) {
      return {
        error: "Review not found",
      };
    }

    return { success: "Action performed successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
