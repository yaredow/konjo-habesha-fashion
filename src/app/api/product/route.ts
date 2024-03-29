import connectMongoDB from "@/lib/utils/mongo/db";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  await connectMongoDB();
  const products = await Product.find();

  if (products) {
    return NextResponse.json({ products }, { status: 200 });
  }
}
