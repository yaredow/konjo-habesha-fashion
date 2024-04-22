import Review from "@/models/reviewModel";
import connectMongoDB from "@/utils/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const reviews = await Review.find({});

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
