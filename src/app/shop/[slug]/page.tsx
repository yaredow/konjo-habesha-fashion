import Spinner from "@/components/Spinner";
import ProductDetail from "@/components/shop/ProductDetail";
import { getAllProducts, getProduct } from "@/data/product";
import { Product } from "@prisma/client";
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
  const products: Product[] = await fetch(
    "https://konjo-habesha-fashion.vercel.app//api/product/all",
  ).then((res) => res.json());

  return products?.map((product) => ({
    slug: product.slug,
  }));
}

export default async function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductDetail />;
    </Suspense>
  );
}
