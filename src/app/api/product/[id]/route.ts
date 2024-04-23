import Product from "@/models/productModel";
import connectMongoDB from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    await connectMongoDB();
    const product = await Product.findById(id);
    await product.populate("reviews");

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
