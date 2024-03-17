"use client";

import ProductPagination from "@/components/ProductPagination";
import ProductItem from "@/components/product/ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { itemsPerPage } from "@/lib/utils/constants";

function page() {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentitems = products?.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    async function getProducts() {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/api/product",
      });
      setProducts(res.data.products);
    }
    getProducts();
  }, []);
  return (
    <div className=" flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentitems?.map((product) => (
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

export default page;
