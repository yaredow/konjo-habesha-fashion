"use server";

import Order from "@/models/orderModel";
import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";
import { ObjectId } from "mongoose";

export async function createProductReviewAction(
  formData: FormData,
  userId: string,
  productId: string,
) {
  const review = formData.get("review");
  const rating = formData.get("rating");
  const title = formData.get("title");
  const images = formData.getAll("images");

  try {
    await connectMongoDB();
    const review = await Review.findOne({ user: userId, product: productId });
    if (review) {
      return {
        success: false,
        message: "You have already reviewed this product",
      };
    }

    const order = await Order.findOne({
      userId,
      "products.productId": productId,
    });

    console.log(order);

    if (!order) {
      return {
        success: false,
        message: "You have not purchased this product",
      };
    }

    const newReview = await Review.create({
      title,
      review,
      rating,
      product: productId,
      user: userId,
      order: order._id,
    });

    if (newReview) {
      return {
        success: true,
        message: "Review added successfully",
      };
    }

    return { message: "success" };
  } catch (err) {
    throw err;
  }
}
