import SortBy from "@/components/SortBy";
import { Suspense } from "react";
import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";
import Shop from "@/components/product/shop/Shop";
async function page() {
  return (
    <>
      <Suspense fallback={<ProductSkeleton />}>
        <Shop />
      </Suspense>
      <div>
        <SortBy />
      </div>
    </>
  );
}

export default page;
