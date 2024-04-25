"use server";

import Review from "@/models/reviewModel";
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
    });

    if (!review) {
      throw new Error("Review not found");
    }

    // Check if userId is in the likes or dislikes array
    const existingLike = review.likes.includes(userId);
    const existingDislike = review.dislikes.includes(userId);

    if (action === "like") {
      if (existingLike) {
        review.likes = review.likes.filter((like: string) => like !== userId);
      } else {
        // Add userId to likes array and remove from dislikes array if present
        review.likes.push(userId);
        review.dislikes = review.dislikes.filter(
          (dislike: string) => dislike !== userId,
        );
      }
    } else if (action === "dislike") {
      if (existingDislike) {
        // If user already disliked, remove userId from dislikes array
        review.dislikes = review.dislikes.filter(
          (dislike: string) => dislike !== userId,
        );
      } else {
        review.dislikes.push(userId);
        review.likes = review.likes.filter((like: string) => like !== userId);
      }
    }

    await review.save();

    return { success: true, message: "Action performed successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
