import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  let filter: any = {};

  try {
    const { delivery_status, time_range } = data.filter;

    if (delivery_status && delivery_status !== "all") {
      filter.delivery_status = delivery_status;
    } else {
      filter.delivery_status = "all";
    }

    let startDate: Date | undefined, endDate: Date | undefined;

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
      filter.createdAt = {
        gte: startDate,
        lt: endDate,
      };
    }

    const orders = await prisma.order.findMany({
      where: filter,
    });

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
