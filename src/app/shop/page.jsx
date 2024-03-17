"use client";

import ProductPagination from "@/components/ProductPagination";
import ProductItem from "@/components/product/ProductItem";
import useGetProducts from "@/components/product/useGetProducts";

function page() {
  const { isPending, products = [] } = useGetProducts();
  console.log(products);

  if (isPending) return <h>Loading....</h>;
  return (
    <div className=" flex flex-col">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <ProductPagination />
    </div>
  );
}

export default page;
