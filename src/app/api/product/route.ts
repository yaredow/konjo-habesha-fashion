import prisma from "@/lib/prisma";
import { ProductFilterValidator } from "@/utils/validators/product-validators";
import { NextRequest, NextResponse } from "next/server";

class Filter {
  private filters: Map<string, string[]> = new Map();

  hasFilter() {
    return this.filters.size > 0;
  }

  add(key: string, value: any) {
    this.filters.set(key, value);
  }

  get() {
    const filterObj: any = {};

    this.filters.forEach((value, key) => {
      filterObj[key] = value;
    });
    return filterObj;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { sort, price, size, category } = ProductFilterValidator.parse(
      body.filter,
    );

    const [field, value] = sort.split("-");

    // Filtering
    const filter = new Filter();

    if (size.length > 0) filter.add("sizes", { hasEvery: size });

    if (price && Array.isArray(price)) {
      filter.add("price", { gte: price[0], lte: price[1] });
    }

    if (category !== "All") {
      filter.add("category", category);
    }

    console.log(filter);

    let products;

    if (filter.hasFilter()) {
      products = await prisma.product.findMany({
        where: filter.hasFilter() ? filter.get() : {},
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
