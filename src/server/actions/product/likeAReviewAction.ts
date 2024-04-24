"use server";

import Review from "@/models/reviewModel";
import { Review as ReviewType } from "@/types/review";
import connectMongoDB from "@/utils/db/db";
import { revalidatePath } from "next/cache";

export async function likeAReviewAction(
  userId: string,
  productId: string,
  action: "like" | "dislike",
) {
  try {
    await connectMongoDB();

    const review = await Review.findOne({
      product: productId,
      user: userId,
    });
    if (!review) {
      throw new Error("Review not found");
    }

    const existingLike = review.likes.includes(userId);
    const existingDislike = review.dislikes.includes(userId);

    if (action === "like") {
      if (existingLike) {
        review.likes = review.likes.filter(
          (like) => like.toString() !== userId,
        );
      } else if (existingDislike) {
        review.dislikes = review.dislikes.filter(
          (dislike) => dislike.toString() !== userId,
        );
        review.likes.push(userId);
      } else {
        review.likes.push(userId);
      }
    } else if (action === "dislike") {
      if (existingDislike) {
        review.dislikes = review.dislikes.filter(
          (dislike) => dislike.toString() !== userId,
        );
      } else if (existingLike) {
        review.likes = review.likes.filter(
          (like) => like.toString() !== userId,
        );
        review.dislikes.push(userId);
      } else {
        review.dislikes.push(userId);
      }
    }

    await review.save();
    revalidatePath("/");

    return { success: true, message: "Action performed successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
