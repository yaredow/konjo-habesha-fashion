import ProductCollection from "@/components/product/ProductCollection";
import { getProducts } from "@/server/actions/actions";

async function page() {
  const products = await getProducts();
  return (
    <div>
      <ProductCollection products={products} />
    </div>
  );
}

export default page;
