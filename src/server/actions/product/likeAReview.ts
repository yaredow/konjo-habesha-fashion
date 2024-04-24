"use server";

import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";

export async function likeAReviewAction(
  userId: string,
  productId: string,
  action: "like" | "dislike",
) {
  console.log(userId);
  try {
    await connectMongoDB();

    const review = await Review.findOne({ product: productId, user: userId });

    if (!review) {
      throw new Error("Review not found");
    }

    const existingLike = review.likes.find(
      (like: any) => like.user.toString() === userId,
    );
    const existDislike = review.dislikes.find(
      (dislike: any) => dislike.user.toString() === userId,
    );

    if (action === "like") {
      if (existingLike) {
        throw new Error("You have already liked this review");
      }

      if (existDislike) {
        review.dislikes.filter(
          (dislike: any) => dislike.user.toString() !== userId,
        );
      }
      review.likes.push({ user: userId });
      await review.save();
      return true;
    } else if ((action = "dislike")) {
      if (existDislike) {
        throw new Error("You have already disliked this review");
      }
      if (existingLike) {
        review.likes = review.likes.filter(
          (like: any) => like.userId.toString() !== userId,
        );
      }
      review.dislikes.push({ userId });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
