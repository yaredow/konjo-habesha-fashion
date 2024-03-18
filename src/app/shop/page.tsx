import ProductCollection from "@/components/product/ProductCollection";
import { getProducts } from "@/server/actions/actions";

async function page() {
  const data = await getProducts();
  return (
    <div>
      <ProductCollection products={data.products} />
    </div>
  );
}

export default page;
