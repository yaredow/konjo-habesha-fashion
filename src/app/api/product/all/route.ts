import Product from "@/models/productModel";
import connectMongoDB from "@/utils/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  if (!products) {
    return NextResponse.json(
      { message: "Products not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ products }, { status: 200 });
}
