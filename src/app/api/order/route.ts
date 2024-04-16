import Order from "@/models/orderModel";
import connectMongoDB from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const orders = await Order.find();

    if (!orders) {
      return NextResponse.json(
        { message: "Unable to find orders" },
        { status: 400 },
      );
    }

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
