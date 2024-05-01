import prisma from "@/lib/prisma";
import connectMongoDB from "@/utils/db/db";
import { includes } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    const reviews = await prisma.review.findMany({
      where: { productId: id },
      include: {
        product: true,
        user: true,
      },
    });

    console.log(reviews);

    if (!reviews) {
      return NextResponse.json(
        { message: "There are no reviews" },
        { status: 400 },
      );
    }

    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
