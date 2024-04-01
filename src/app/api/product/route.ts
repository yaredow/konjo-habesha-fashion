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
    const { sort, price, size } = ProductFilterValidator.parse(body.filter);

    const filter = new Filter();

    if (size.length > 0) filter.add("size", { $in: size });

    if (price && Array.isArray(price)) {
      filter.add("price", { $gte: price[0], $lte: price[1] });
    }

    let sortOption = {};
    if (sort === "price-asc") sortOption = { price: 1 };
    else if (sort === "price-desc") sortOption = { price: -1 };

    console.log(filter.hasFilter());

    await connectMongoDB();

    const products = await Product.find(filter.hasFilter() ? filter.get() : {})
      .sort(sortOption)
      .limit(12);

    if (products) {
      return NextResponse.json({ products }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
  }
}
