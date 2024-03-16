import { groupObject } from "@/lib/utils/constants";
import connectMongoDB from "@/lib/utils/mongo/db";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const type = request.url.slice(request.url.lastIndexOf("/") + 1);
  console.log(request);

  await connectMongoDB();
  switch (type) {
    case "":
      const products = await Product.find();
      return NextResponse.json({ products }, { status: 200 });

    case "trending":
      const minUnitSold = 10;
      const trendingProducts = await Product.aggregate([
        {
          $match: { unitsSold: { $gte: minUnitSold } },
        },
        {
          $group: groupObject,
        },
        {
          $limit: 8,
        },
        {
          $sort: { unitsSold: -1 },
        },
      ]);

      return NextResponse.json({ trendingProducts }, { status: 200 });

    case "featured":
      const featuredProducts = await Product.aggregate([
        {
          $match: {
            isFeatured: true,
            stockQuantity: { $gt: 0 },
          },
        },
        {
          $group: groupObject,
        },
      ]);

      return NextResponse.json({ featuredProducts }, { status: 200 });

    case "new-arrival":
      const daysAgo = 30;
      const newArrivalProducts = await Product.aggregate([
        {
          $match: {
            productAddedDate: {
              $gte: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $group: groupObject,
        },
        {
          $sort: { productAddedDate: -1 },
        },
        {
          $limit: 8,
        },
      ]);

      return NextResponse.json({ newArrivalProducts }, { status: 200 });
  }
}
