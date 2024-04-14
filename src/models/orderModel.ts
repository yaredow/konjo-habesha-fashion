import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
    products: [
      {
        productId: {
          type: String,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Object,
      required: true,
    },
    delivery_status: {
      type: String,
      default: "pending",
    },
    payment_status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
module.exports = Order;
