"use server";

import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "../account/authenticate";
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
