import prisma from "@/lib/prisma";
import { ProductFilterValidator } from "@/utils/validators/product-validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const validatedFields = ProductFilterValidator.safeParse({
      ...body.filter,
    });

    if (!validatedFields.success) {
      return NextResponse.json({
        Message: validatedFields.error.flatten().fieldErrors,
      });
    }

    const { size, sort, category, price } = validatedFields.data;
    const { range: priceRange } = price;
    let orderBy: any = {};

    if (sort !== "none") {
      const [field, value] = sort.split("-");
      orderBy[field] = value;
    } else {
      orderBy.name = "asc";
    }

    // Filtering
    let filter: any = {};

    if (size.length > 0) {
      filter = {
        ...filter,
        sizes: {
          hasSome: size,
        },
      };
    }

    if (price && Array.isArray(priceRange)) {
      filter = { ...filter, price: { gte: priceRange[0], lte: priceRange[1] } };
    }

    if (category !== "All") {
      filter = { ...filter, category };
    }

    let products;

    if (Object.keys(filter).length > 0) {
      products = await prisma.product.findMany({
        where: filter,
        orderBy,
      });

      return NextResponse.json({ products }, { status: 200 });
    } else {
      products = await prisma.product.findMany({
        orderBy,
      });

      return NextResponse.json({ products }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
