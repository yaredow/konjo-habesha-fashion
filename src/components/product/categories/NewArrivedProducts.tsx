"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../../type";
import ProductItem from "../ProductItem";
import axios from "axios";

function NewArrivedProducts() {
  const { data: newArrivalProducts } = useQuery({
    queryKey: ["newArrivedProducts"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/product/categories/new-arrival",
      );
      return data.newArrivalProducts;
    },
  });

  return (
    <div className="mt-[5rem]">
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {newArrivalProducts.map((product: Product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default NewArrivedProducts;
