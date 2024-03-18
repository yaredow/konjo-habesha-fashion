import FeaturedProducts from "@/components/product/featured/FeaturedProducts";
import NewArrivals from "@/components/product/new-arrival/NewArrivedProducts";
import TrendingProductCarousel from "@/components/product/trending/TrendingProductsCarousel";
import { getProductWithCategory } from "@/server/actions/actions";
import { Suspense } from "react";

async function page() {
  const data = await getProductWithCategory("trending");

  return (
    <div>
      <TrendingProductCarousel trendingProducts={data.trendingProducts} />
      <Suspense fallback={<p>Loading...</p>}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <NewArrivals />
      </Suspense>
    </div>
  );
}

export default page;
