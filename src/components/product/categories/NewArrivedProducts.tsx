"use client";

import { Product } from "../../../../type";
import ProductItem from "../ProductItem";
import useGetProductsWithCatagory from "./useGetProductsWithCatagory";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

function NewArrivedProducts() {
  const { data } = useGetProductsWithCatagory("new-arrival");
  return (
    <div className="mt-[5rem]">
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data
          ? data.newArrivalProducts.map((product: Product) => (
              <ProductItem key={product._id} product={product} />
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
      </div>
    </div>
  );
}

export default NewArrivedProducts;
