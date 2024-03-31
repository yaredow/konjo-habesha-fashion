import connectMongoDB from "@/lib/utils/mongo/db";
import { ProductFilterValidator } from "@/lib/utils/validators/product-validators";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { sort, price, size } = ProductFilterValidator.parse(body.filter);

  await connectMongoDB();
  const products = await Product.find({
    sort,
    price,
    size,
  });

  if (products) {
    return NextResponse.json({ products }, { status: 200 });
  }
}
