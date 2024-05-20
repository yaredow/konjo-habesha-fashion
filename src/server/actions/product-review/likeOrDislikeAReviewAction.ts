"use server";

import prisma from "@/lib/prisma";
import { ErrorAndSuccessType } from "../account/authenticate";
export async function likeOrDislikeAReviewAction(
  userId: string,
  reviewId: string,
  action: "like" | "dislike",
): Promise<ErrorAndSuccessType> {
  try {
    let update: Record<string, any> = {};

    if (action === "like") {
      const existingLike = await prisma.like.findFirst({
        where: { userId, reviewId },
      });

      if (existingLike) {
        update = {
          likes: { disconnect: [{ id: existingLike.id }] },
        };
      } else {
        update = {
          likes: {
            connect: [{ id: userId }],
          },
          dislikes: {
            disconnect: [{ id: userId }],
          },
        };
      }
    } else if (action === "dislike") {
      const existingDislike = await prisma.dislike.findFirst({
        where: { userId, reviewId },
      });

      if (existingDislike) {
        update = {
          dislikes: {
            disconnect: [{ id: existingDislike.id }],
          },
        };
      } else {
        update = {
          dislikes: {
            connect: [{ id: userId }],
          },
          likes: {
            disconnect: [{ id: userId }],
          },
        };
      }
    }

    const review = await prisma.review.update({
      where: { id: reviewId },
      data: update,
      include: {
        likes: true,
        dislikes: true,
      },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    return { success: "Action performed successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
