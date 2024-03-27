import ProductDetail from "@/components/product/ProductDetail";
import { ProductSkeleton } from "@/components/skeletons/ProductSkeleton";
import { getProduct } from "@/server/actions/product/getProduct";
import { Suspense } from "react";

async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getProduct(id);
  const { product } = data;
  console.log(product);
  return (
    <div>
      <Suspense fallback={<ProductSkeleton length={product.length} />}>
        <ProductDetail product={product} />
      </Suspense>
    </div>
  );
}

export default ProductDetailPage;
