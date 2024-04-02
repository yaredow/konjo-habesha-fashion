"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../../type";
import ProductItem from "../ProductItem";
import axios from "axios";
import useGetProductsWithCatagory from "./useGetProductsWithCatagory";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

function FeaturedProducts() {
  const { products, isFetching } = useGetProductsWithCatagory("featured");
  return (
    <div className="mt-[5rem]">
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: Product) => (
          <ProductItem key={product._id} product={product} />
        ))}

        {isFetching &&
          Array.from({ length: 7 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
