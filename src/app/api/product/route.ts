import connectMongoDB from "@/lib/utils/mongo/db";
import { ProductFilterValidator } from "@/lib/utils/validators/product-validators";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { sort, price, size } = ProductFilterValidator.parse(body.filter);
    let query: any = {};
    await connectMongoDB();

    if (sort) query.sort = sort;
    if (price) query.price = { $gte: price[0], $lte: price[1] };
    if (size) query.size = { $in: size };

    const products = await Product.find(query);

    if (products) {
      return NextResponse.json({ products }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
  }
}
