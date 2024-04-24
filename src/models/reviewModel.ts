import mongoose, { Types } from "mongoose";

interface IReview {
  review: string;
  title: string;
  rating: number;
  createdAt: Date;
  images: { public_id: string; url: string }[];
  likes: number;
  dislikes: number;
  user: Types.ObjectId;
  order: Types.ObjectId;
  product: Types.ObjectId;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
    },
    title: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Review must belong to an order"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    dislikes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
