import FeaturedProducts from "@/components/product/featured/FeaturedProducts";
import NewArrivals from "@/components/product/new-arrival/NewArrivedProducts";
import TrendingProductCarousel from "@/components/product/trending/TrendingProductsCarousel";
import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";
import { getProductWithCategory } from "@/server/actions/product/getProductCatagories";
import { Suspense } from "react";

async function page() {
  const categories: string[] = ["trending", "featured", "new-arrival"];

  const data = await Promise.all(
    categories.map(async (category) => {
      return await getProductWithCategory(category);
    }),
  );

  return (
    <div>
      <TrendingProductCarousel trendingProducts={data[0].trendingProducts} />
      <Suspense fallback={<ProductSkeleton />}>
        <FeaturedProducts featuredProducts={data[1].featuredProducts} />
      </Suspense>
      <Suspense fallback={<ProductSkeleton />}>
        <NewArrivals newArrivalProducts={data[2].newArrivalProducts} />
      </Suspense>
    </div>
  );
}

export default page;
