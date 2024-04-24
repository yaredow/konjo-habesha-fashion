"use server";

import User from "@/models/authModel";
import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";
import { redirect } from "next/navigation";

export async function likeAReview(userId: string, productId: string) {
  try {
    await connectMongoDB();
    const user = await User.findById({ _id: userId });

    if (!user) {
      redirect("/account");
    }

    const review = await Review.findOne({ product: productId });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
