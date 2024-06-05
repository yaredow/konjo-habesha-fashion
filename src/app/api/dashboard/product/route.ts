import prisma from "@/lib/prisma";
import { ProductFilterType } from "@/utils/validators/product-validators";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { filter }: { filter: ProductFilterType } = await request.json();

    let products: Product[] = [];

    if (filter && filter.status !== "all") {
      products = await prisma.product.findMany({
        where: { status: filter.status },
      });
    } else {
      products = await prisma.product.findMany();
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
