"use server";

import Order from "@/models/orderModel";
import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";

export async function createProductReviewAction(
  formData: FormData,
  userId: string,
  productId: string,
) {
  const userReview = formData.get("review");
  const reviewTitle = formData.get("title");
  const userRating = Number(formData.get("rating"));

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
        message: "You didn't not purchased this product",
      };
    }

    const newReview = await Review.create({
      review: reviewTitle,
      title: userReview,
      rating: userRating,
      product: productId,
      user: userId,
      order: order._id,
    });

    if (!newReview) {
      return {
        success: false,
        message: "Failed to save your review. Please try again!",
      };
    }

    return {
      success: true,
      message: "Review saved successfully",
    };
  } catch (err) {
    throw err;
  }
}
