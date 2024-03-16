import { groupObject } from "@/lib/utils/constants";
import connectMongoDB from "@/lib/utils/mongo/db";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const type = request.url.slice(request.url.lastIndexOf("/") + 1);
  console.log(request);

  const minUnitSold = 10;
  await connectMongoDB();

  const bestSellingProducts = await Product.aggregate([
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

  return NextResponse.json({ bestSellingProducts }, { status: 200 });
}
