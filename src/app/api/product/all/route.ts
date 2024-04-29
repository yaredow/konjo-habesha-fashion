import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany();

  if (!products) {
    return NextResponse.json(
      { message: "Products not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ products }, { status: 200 });
}
