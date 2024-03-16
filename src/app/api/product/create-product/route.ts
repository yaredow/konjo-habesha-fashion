import connectMongoDB from "@/lib/utils/mongo/db";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  await connectMongoDB();

  const newProduct = await Product.create(res);

  if (!newProduct) {
    return NextResponse.json(
      {
        message: "There was an error creating the product",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Product successfully created", newProduct },
    { status: 201 },
  );
}
