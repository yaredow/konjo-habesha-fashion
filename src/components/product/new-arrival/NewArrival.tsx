import { getProductWithCategory } from "@/server/actions/product/getProductCatagories";
import NewArrivals from "./NewArrivedProducts";
import { Suspense } from "react";
import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";

async function NewArrival() {
  const data = await getProductWithCategory("new-arrival");
  return (
    <div>
      <h3 className="text-center text-2xl font-medium md:text-start">
        NEW ARRIVALS
      </h3>
      <Suspense fallback={<ProductSkeleton />}>
        <NewArrivals newArrivalProducts={data.newArrivalProducts} />
      </Suspense>
    </div>
  );
}

export default NewArrival;
