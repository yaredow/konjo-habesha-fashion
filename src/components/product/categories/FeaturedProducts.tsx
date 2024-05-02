"use client";

import { Product } from "../../../../types/product";
import ProductItem from "../ProductItem";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import useGetProductsWithCatagory from "@/utils/hook/useGetProductsWithCatagory";

function FeaturedProducts() {
  const { data } = useGetProductsWithCatagory("featured");
  return (
    <div className="mt-[5rem]">
      <h1 className="items-center text-2xl font-semibold md:items-start">
        Featured Products
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data
          ? data.featuredProducts.map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
