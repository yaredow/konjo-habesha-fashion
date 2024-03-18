import { getProductWithCategory } from "@/server/actions/actions";
import ProductItem from "../ProductItem";

async function NewArrivals() {
  const data = await getProductWithCategory("new-arrival");
  const newArrivalProducts: Product[] = data.newArrivalProducts;
  return (
    <div className="mt-[5rem]">
      <h3 className="text-center text-2xl font-medium md:text-start">
        NEW ARRIVALS
      </h3>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {newArrivalProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
