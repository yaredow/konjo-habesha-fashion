import Order from "@/models/orderModel";
import connectMongoDB from "@/utils/db/db";
import Filter from "@/utils/hook/filter";
import { time } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  try {
    await connectMongoDB();
    const { delivery_status, time_range } = data.filter;

    const filter = new Filter();

    if (delivery_status && delivery_status !== "all") {
      filter.add("delivery_status", delivery_status);
    }

    let startDate, endDate;
    if (time_range === "week") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      endDate = new Date();
    } else if (time_range === "month") {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      endDate = new Date();
    } else if (time_range === "year") {
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      endDate = new Date();
    }

    if (startDate && endDate) {
      filter.add("createdAt", { $gte: startDate, $lte: endDate });
    }

    const orders = await Order.find(filter.hasFilter() ? filter.get() : {});

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
