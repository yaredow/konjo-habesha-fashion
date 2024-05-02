import { fetchProductsWithCategory } from "@/server/actions/product/fetchProductsWithCatagory";
import ProductItem from "../ProductItem";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Product } from "@prisma/client";

export default async function NewArrivedProducts() {
  const data = await fetchProductsWithCategory("new-arrival");

  return (
    <div className="mt-[5rem]">
      <h1 className=" items-center text-2xl font-semibold md:items-start">
        Trending Products
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data
          ? data.products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
      </div>
    </div>
  );
}
