import mongoose, { Schema } from "mongoose";

interface IProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  images: Array<{ key: string; url: string }>;
  stockQuantity: number;
  unitsSold?: number;
  productAddedDate: Date;
  isFeatured?: boolean;
  inStock?: boolean;
  sizes: Array<string>;
  status: String;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "A product needs a name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A product needs a description"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Male", "Female", "Kids"],
      required: true,
    },
    price: {
      type: Number,
      required: [true, "A product needs a price"],
      min: 0,
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
    stockQuantity: {
      type: Number,
      required: [true, "A product needs a stock quantity"],
      min: 0,
    },
    unitsSold: {
      type: Number,
      default: 0,
    },
    productAddedDate: {
      type: Date,
      default: Date.now,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    sizes: {
      type: [String],
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

productSchema.pre("save", function (next) {
  this.productAddedDate = new Date();
  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
