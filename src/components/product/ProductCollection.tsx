"use client";

import { useState } from "react";
import ProductPagination from "../ProductPagination";
import ProductItem from "./ProductItem";
import { itemsPerPage } from "@/lib/utils/constants";
import { Product } from "../../../type";

function ProductCollection({ products }: { products: Product[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentitems = products?.slice(firstItemIndex, lastItemIndex);
  return (
    <div className=" flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentitems?.map((product: any) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <ProductPagination
        totalItems={products?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ProductCollection;
