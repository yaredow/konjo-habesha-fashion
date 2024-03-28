import { getProductWithCategory } from "@/server/actions/product/getProductCatagories";
import FeaturedProducts from "./FeaturedProducts";
import { Suspense } from "react";
import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";

async function Featured() {
  const data = await getProductWithCategory("featured");
  return (
    <div>
      <h3 className="text-center text-2xl font-medium   md:text-start">
        Featured Items
      </h3>
      <Suspense fallback={<ProductSkeleton />}>
        <FeaturedProducts featuredProducts={data.featuredProducts} />
      </Suspense>
    </div>
  );
}

export default Featured;
