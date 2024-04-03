import connectMongoDB from "@/lib/utils/mongo/db";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const allProducts = await Product.find();

    if (!allProducts) {
      return NextResponse.json(
        { message: "Failed to find products" },
        { status: 400 },
      );
    }

    const minPrice = Math.min(...allProducts.map((product) => product.price));
    const maxPrice = Math.max(...allProducts.map((product) => product.price));

    console.log(minPrice, maxPrice);

    return NextResponse.json({ minPrice, maxPrice }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
