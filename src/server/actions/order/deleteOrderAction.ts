"use server";

import Order from "@/models/orderModel";
import connectMongoDB from "@/utils/db/db";

export async function deleteOrderAction(id: string) {
  try {
    await connectMongoDB();

    await Order.findByIdAndDelete({ _id: id });

    const order = await Order.findById({ _id: id });

    if (!order) {
      return { success: true, message: "Order is deleted successfully" };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
