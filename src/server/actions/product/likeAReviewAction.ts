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
        // User already liked, remove the userId from likes
        review.likes = review.likes.filter(
          (like) => like.toString() !== userId,
        );
      } else {
        // Add the userId to the likes and remove from dislikes
        review.likes.push(userId);
        review.dislikes = review.dislikes.filter(
          (dislike) => dislike.toString() !== userId,
        );
      }
    } else if (action === "dislike") {
      if (existingDislike) {
        // User already disliked, remove the userId from dislikes
        review.dislikes = review.dislikes.filter(
          (dislike) => dislike.toString() !== userId,
        );
      } else {
        // Add the userId to the dislikes and remove from likes
        review.dislikes.push(userId);
        review.likes = review.likes.filter(
          (like) => like.toString() !== userId,
        );
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
