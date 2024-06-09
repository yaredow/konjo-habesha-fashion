import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  console.log("product id: " + id);

  try {
    const reviews = await prisma.review.findMany({
      where: { productId: id },
      include: {
        product: {
          select: {
            id: true,
          },
        },
        user: {
          select: { name: true },
        },
        order: {
          select: { id: true },
        },
        likes: {
          select: { userId: true },
        },
        dislikes: {
          select: { userId: true },
        },
      },
    });

    if (!reviews) {
      return NextResponse.json(
        { message: "There are no reviews" },
        { status: 400 },
      );
    }

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
