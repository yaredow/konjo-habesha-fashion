import Spinner from "@/components/Spinner";
import ProductDetail from "@/components/shop/ProductDetail";
import { getAllProducts, getProduct } from "@/data/product";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = params;

  const product = await getProduct(slug);

  return { title: `${product?.name}` };
}

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products?.map((product) => ({
    slug: product.slug,
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const initialData = await getProduct(slug);

  return (
    <Suspense fallback={<Spinner />}>
      <ProductDetail />;
    </Suspense>
  );
}
