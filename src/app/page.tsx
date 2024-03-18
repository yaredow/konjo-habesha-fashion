import FeaturedProducts from "@/components/product/featured/FeaturedProducts";
import NewArrivals from "@/components/product/new-arrival/NewArrivedProducts";
import TrendingProductCarousel from "@/components/product/trending/TrendingProductsCarousel";
import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";
import { getProductWithCategory } from "@/server/actions/actions";
import { Suspense } from "react";

async function page() {
  const data = await getProductWithCategory("trending");

  return (
    <div>
      <TrendingProductCarousel trendingProducts={data.trendingProducts} />
      <Suspense fallback={<ProductSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={<ProductSkeleton />}>
        <NewArrivals />
      </Suspense>
    </div>
  );
}

export default page;
