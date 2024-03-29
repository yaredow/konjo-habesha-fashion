import { getProducts } from "@/server/actions/product/getProducts";
import ProductCollection from "./ProductCollection";

async function Shop() {
  const { products } = await getProducts();
  return (
    <div>
      <ProductCollection products={products} />
    </div>
  );
}

export default Shop;
