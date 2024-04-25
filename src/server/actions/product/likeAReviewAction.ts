"use server";

import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";
import mongoose from "mongoose";

export async function likeAReviewAction(
  userId: string,
  productId: string,
  action: "like" | "dislike",
) {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const productObjectId = new mongoose.Types.ObjectId(productId);

  try {
    await connectMongoDB();

    let update: Record<string, any> = {};

    if (action === "like") {
      update = {
        $addToSet: { likes: userObjectId },
        $pull: { dislikes: userObjectId },
      };
    } else if (action === "dislike") {
      update = {
        $addToSet: { dislikes: userObjectId },
        $pull: { likes: userObjectId },
      };
    }

    const review = await Review.findOneAndUpdate(
      { product: productObjectId },
      update,
      {
        new: true,
        upsert: false,
      },
    );

    if (!review) {
      throw new Error("Review not found");
    }

    return { success: true, message: "Action performed successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
