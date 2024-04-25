"use server";

import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";

export async function deleteReviewAction(reviewId: string, userId: string) {
  try {
    await connectMongoDB();

    const review = await Review.findOneAndDelete({
      _id: reviewId,
      user: userId,
    });

    if (!review) {
      throw new Error("Review not found");
    }

    return { success: true, message: "Review deleted successfully" };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
