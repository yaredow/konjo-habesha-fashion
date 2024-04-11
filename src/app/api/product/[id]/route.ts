import Product from "@/models/productModel";
import connectMongoDB from "@/utils/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  console.log(id);
  await connectMongoDB();
  const product = await Product.findById({ _id: id });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
