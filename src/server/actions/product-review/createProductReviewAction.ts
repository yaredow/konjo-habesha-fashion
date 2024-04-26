"use server";

import Order from "@/models/orderModel";
import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";

export async function createProductReviewAction(
  formData: FormData,
  userId: string,
  productId: string,
  mode: string,
) {
  const userReview = formData.get("review");
  const reviewTitle = formData.get("title");
  const userRating = Number(formData.get("rating"));

  const reviewObject = {
    review: reviewTitle,
    title: userReview,
    rating: userRating,
    product: productId,
    user: userId,
  };

  try {
    await connectMongoDB();

    const order = await Order.findOne({
      userId,
      "products.productId": productId,
    });

    if (!order) {
      return {
        success: false,
        message: "You didn't not purchased this product",
      };
    }

    if (mode === "create") {
      const review = await Review.findOne({ user: userId, product: productId });
      if (review) {
        return {
          success: false,
          message: "You have already reviewed this product",
        };
      }

      const newReview = await Review.create({
        ...reviewObject,
        order: order._id,
      });

      if (!newReview) {
        return {
          success: false,
          message: "Failed to save your review. Please try again!",
        };
      }
    } else if (mode === "edit") {
      const editedReview = await Review.findOneAndUpdate(
        { user: userId, product: productId },
        { $set: { ...reviewObject, order: order._id } },
        { new: true },
      );

      if (!editedReview) {
        return {
          success: false,
          message: "Failed to edit your review. Please try again",
        };
      }
    }

    return {
      success: true,
      message: "Review saved successfully",
    };
  } catch (err) {
    throw err;
  }
}
