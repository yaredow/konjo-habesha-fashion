"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../../type";
import ProductItem from "../ProductItem";
import axios from "axios";

function FeaturedProducts() {
  const { data: featuredProducts } = useQuery({
    queryKey: ["FeaturedProducts"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/product/categories/featured",
      );

      return data.featuredProducts;
    },
  });

  console.log(featuredProducts);

  return (
    <div className="mt-[5rem]">
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featuredProducts.map((product: Product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
