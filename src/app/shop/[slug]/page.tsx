import ProductDetail from "@/components/shop/ProductDetail";
import { getProduct } from "@/data/product";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = params;

  const product = await getProduct(slug);

  return { title: `${product?.name}` };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  return <ProductDetail slug={slug} />;
}
