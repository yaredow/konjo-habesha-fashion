import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const type = request.url.slice(request.url.lastIndexOf("/") + 1);

  switch (type) {
    case "trending":
      const minUnitSold = 10;
      const trendingProducts = await prisma.product.findMany({
        where: {
          unitsSold: {
            gte: minUnitSold,
          },
        },
        take: 8,
        orderBy: {
          unitsSold: "desc",
        },
      });

      return NextResponse.json({ trendingProducts }, { status: 200 });

    case "featured":
      const featuredProducts = await prisma.product.findMany({
        where: {
          isFeatured: true,
          stockQuantity: {
            gt: 0,
          },
        },
        take: 8,
      });

      return NextResponse.json({ featuredProducts }, { status: 200 });

    case "new-arrival":
      const daysAgo = 30;
      const newArrivalProducts = await prisma.product.findMany({
        where: {
          productAddedDate: {
            gte: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
          },
        },
        take: 8,
        orderBy: {
          productAddedDate: "desc",
        },
      });

      return NextResponse.json({ newArrivalProducts }, { status: 200 });
  }
}
