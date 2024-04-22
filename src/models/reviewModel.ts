import mongoose, { Schema, Types } from "mongoose";

interface IReview {
  review: string;
  title: string;
  rating: number;
  createdAt: Date;
  images: string[];
  likes: number;
  dislikes: number;
  user: Types.ObjectId;
  order: Types.ObjectId;
  product: Types.ObjectId;
}

const reviewSchema = new Schema<IReview>(
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
      ref: "Tour",
      required: [true, "Review must belong to a product."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
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
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// reviewSchema.pre(/^find/, function () {
//   this.populate({ path: "user", select: "name" })
//     .populate({ path: "order" })
//     .populate({ path: "product" });
// });

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
