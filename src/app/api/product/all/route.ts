import connectMongoDB from "@/lib/utils/mongo/db";
import Product from "@/models/productModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const products = await Product.find();

    if (!products) {
      return NextResponse.json(
        {
          message: "There was an erro fetching products",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
