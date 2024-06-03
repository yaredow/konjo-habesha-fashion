"use client";

import ProductItem from "../ProductItem";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import useGetProductsWithCatagory from "@/utils/hook/useGetProductsWithCatagory";
import { Product } from "@prisma/client";

type FeaturedProductsProps = {
  data: {
    featuredProducts: Product[];
  };
  isPending: boolean;
};

export default function FeaturedProducts() {
  const { data, isPending }: FeaturedProductsProps =
    useGetProductsWithCatagory("featured");

  return (
    <section className="mx-4 my-[5rem] md:mx-12">
      <h1 className="items-center text-2xl font-semibold md:items-start">
        Featured Products
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!isPending
          ? data.featuredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
      </div>
    </section>
  );
}
