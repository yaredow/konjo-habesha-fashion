import { groupObject } from "@/lib/utils/constants";
import connectMongoDB from "@/lib/utils/mongo/db";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
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
}
