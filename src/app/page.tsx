import Featured from "@/components/product/featured/Featured";
import FeaturedProducts from "@/components/product/featured/FeaturedProducts";
import NewArrival from "@/components/product/new-arrival/NewArrival";
import NewArrivals from "@/components/product/new-arrival/NewArrivedProducts";
import Trending from "@/components/product/trending/Trending";
import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";
import { Suspense } from "react";

async function page() {
  return (
    <div>
      <Trending />
      <Suspense fallback={<ProductSkeleton />}>
        <Featured />
      </Suspense>
      <Suspense fallback={<ProductSkeleton />}>
        <NewArrival />
      </Suspense>
    </div>
  );
}

export default page;
