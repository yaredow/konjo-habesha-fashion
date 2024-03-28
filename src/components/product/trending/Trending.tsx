import { getProductWithCategory } from "@/server/actions/product/getProductCatagories";
import TrendingProductCarousel from "./TrendingProductsCarousel";
import { Suspense } from "react";
import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";

async function Trending() {
  const data = await getProductWithCategory("trending");
  return (
    <main>
      <h2 className="mb-6 text-center font-roboto text-base font-semibold md:text-start md:text-2xl">
        Trending Items
      </h2>
      <Suspense fallback={<ProductSkeleton />}>
        <TrendingProductCarousel trendingProducts={data.trendingProducts} />
      </Suspense>
    </main>
  );
}

export default Trending;
