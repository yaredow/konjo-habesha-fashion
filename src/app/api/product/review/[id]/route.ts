import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    await connectMongoDB();
    const reviews = await Review.find({ product: id })
      .populate({
        path: "product",
        select: "name ",
      })
      .populate({ path: "user", select: "fullName" });

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
