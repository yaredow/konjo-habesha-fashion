import FeaturedProducts from "@/components/product/featured/FeaturedProducts";
import NewArrivals from "@/components/product/new-arrival/NewArrivedProducts";
import TrendingProductCarousel from "@/components/product/trending/TrendingProductsCarousel";
import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";
import { productCategories } from "@/lib/utils/constants";
import { getProductWithCategory } from "@/server/actions/product/getProductCatagories";
import { Suspense } from "react";

async function page() {
  const data = await Promise.all(
    productCategories.map(async (category) => {
      return await getProductWithCategory(category);
    }),
  );

  return (
    <div>
      <Suspense
        fallback={<ProductSkeleton length={data[0].trendingProducts.length} />}
      >
        <TrendingProductCarousel trendingProducts={data[0].trendingProducts} />
      </Suspense>
      <Suspense
        fallback={<ProductSkeleton length={data[1].featuredProducts.length} />}
      >
        <FeaturedProducts featuredProducts={data[1].featuredProducts} />
      </Suspense>
      <Suspense
        fallback={
          <ProductSkeleton length={data[2].newArrivalProducts.length} />
        }
      >
        <NewArrivals newArrivalProducts={data[2].newArrivalProducts} />
      </Suspense>
    </div>
  );
}

export default page;
