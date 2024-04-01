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
  console.log(body);

  try {
    const { sort, price, size } = ProductFilterValidator.parse(body.filter);

    const filter = new Filter();

    if (size.length > 0) {
      filter.add("size", { $in: size });
    }

    // if (!price.isCustom) {

    // }

    await connectMongoDB();

    const products = await Product.find();

    if (products) {
      return NextResponse.json({ products }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
  }
}
