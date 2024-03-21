import ProductCollection from "@/components/product/ProductCollection";
import { getProducts } from "@/server/actions/product/getProduct";
import { unstable_noStore } from "next/cache";

async function page() {
  unstable_noStore();
  const data = await getProducts();
  return (
    <div>
      <ProductCollection products={data.products} />
    </div>
  );
}

export default page;
