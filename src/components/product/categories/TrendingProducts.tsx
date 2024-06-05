"use client";

import ProductItem from "@/components/product/ProductItem";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import useGetProductsWithCatagory from "@/utils/hook/useGetProductsWithCatagory";
import { Product } from "@prisma/client";

type NewArrivalProductsType = {
  data: { trendingProducts: Product[] };
  isPending: boolean;
};

export default function TrendingProducts() {
  const { data, isPending }: NewArrivalProductsType =
    useGetProductsWithCatagory("trending");

  return (
    <section className="mx-4 mt-[5rem] md:mx-12">
      <h1 className=" items-center text-2xl font-semibold md:items-start">
        Trending Products
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!isPending
          ? data.trendingProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
      </div>
    </section>
  );
}
