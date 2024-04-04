import connectMongoDB from "@/lib/utils/mongo/db";
import { ProductFilterValidator } from "@/lib/utils/validators/product-validators";
import Product from "@/models/productModel";
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

    // Filtering
    const filter = new Filter();

    if (size.length > 0) filter.add("sizes", { $in: size });

    if (price && Array.isArray(price)) {
      filter.add("price", { $gte: price[0], $lte: price[1] });
    }

    if (category !== "All") {
      filter.add("category", category);
    }

    await connectMongoDB();

    const products = await Product.find(filter.hasFilter() ? filter.get() : {});

    // Sorting
    const [field, direction] = sort.split("-");
    const sortedProducts = [...products].sort((a, b) => {
      if (field === "name") {
        const nameA = a[field].toUpperCase();
        const nameB = b[field].toUpperCase();

        if (direction === "asc") {
          return nameA.localeCompare(nameB);
        } else if (direction === "desc") {
          return nameB.localeCompare(nameA);
        }
      } else {
        const modifier = direction === "asc" ? 1 : -1;
        return (a[field] - b[field]) * modifier;
      }
    });

    if (products) {
      return NextResponse.json({ sortedProducts }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return (
      NextResponse.json({ message: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
