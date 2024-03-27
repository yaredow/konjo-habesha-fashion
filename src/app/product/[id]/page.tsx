import ProductDetail from "@/components/product/ProductDetail";
import { getProduct } from "@/server/actions/product/getProduct";

async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await getProduct(id);
  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}

export default ProductDetailPage;
