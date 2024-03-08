import mongoose from "mongoose";

const prodcutScheme = new mongoose.Schema({
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
});

const Product =
  mongoose.models.Product || mongoose.model("Product", prodcutScheme);

export default Product;
