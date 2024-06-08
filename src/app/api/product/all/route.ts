import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    if (!products) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 400 },
      );
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
