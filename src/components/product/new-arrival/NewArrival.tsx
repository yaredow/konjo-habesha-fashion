import { getProductWithCategory } from "@/server/actions/product/getProductCatagories";
import NewArrivals from "./NewArrivedProducts";

async function NewArrival() {
  const data = await getProductWithCategory("new-arrival");
  return (
    <div>
      <NewArrivals newArrivalProducts={data.newArrivalProducts} />
    </div>
  );
}

export default NewArrival;
