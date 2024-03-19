import ProductCollection from "@/components/product/ProductCollection";
import { getProducts } from "@/server/actions/product/getProduct";

async function page() {
  const data = await getProducts();
  return (
    <div>
      <ProductCollection products={data.products} />
    </div>
  );
}

export default page;
