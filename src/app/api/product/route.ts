import prisma from "@/lib/prisma";
import { ProductFilterValidator } from "@/utils/validators/product-validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  try {
    const { sort, price, size, category } = ProductFilterValidator.parse(
      body.filter,
    );

    const [field, value] = sort.split("-");
    console.log(sort);

    // Filtering
    let filter: any = {};

    if (size.length > 0) {
      filter = {
        ...filter,
        sizes: {
          has: size,
        },
      };
    }

    if (price && Array.isArray(price)) {
      filter = { ...filter, price: { gte: price[0], lte: price[1] } };
    }

    if (category !== "All") {
      filter = { ...filter, category };
    }

    console.log(filter);

    let products;

    if (Object.keys(filter).length > 0) {
      products = await prisma.product.findMany({
        where: filter,
        orderBy: {
          [field]: value,
        },
      });

      return NextResponse.json({ products }, { status: 200 });
    } else {
      products = await prisma.product.findMany({
        orderBy: {
          [field]: value,
        },
      });

      return NextResponse.json({ products }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
