"use client";

import useGetProduct from "@/utils/hook/useGetProduct";
import { Separator } from "@/components/ui/separator";
import { BoxIcon, PackageIcon, UserIcon } from "lucide-react";
import { CommentRatings } from "@/components/ui/rating-stars";
import { formatCurrency } from "@/utils/helpers";
import ProductDetailImages from "./ProductDetailImages";
import ReviewsTab from "./ReviewsTab";
import { useSearchParams } from "next/navigation";
import { Product } from "@prisma/client";
import ProductDetailForm from "./ProductDetailForm";
import Spinner from "@/components/Spinner";
import ProductCommentRating from "./ProductCommentRating";

type ProductProps = {
  product: Product;
  isFetched: boolean;
  refetch: () => void;
};

export default function ProductDetail({ slug }: { slug: string }) {
  const { product, isFetched, refetch }: ProductProps = useGetProduct(slug);

  if (!isFetched)
    return (
      <div className=" grid min-h-[75vh] items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className=" mb-4">
        <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
          <ProductDetailImages product={product as Product} />

          <div className="grid items-start gap-4 md:gap-10">
            <div className="items-start md:flex">
              <div className="grid gap-4">
                <h1 className="text-lg font-semibold md:text-xl ">
                  {product?.name.toUpperCase()}
                </h1>
                <Separator className=" w-full" />
                <div className=" flex w-full flex-row justify-between gap-2 md:flex-col md:justify-start">
                  <p className=" text-lg font-normal">
                    {formatCurrency(product?.price)}
                  </p>
                  <ProductCommentRating productId={product.id} />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <PackageIcon className="h-5 w-5 fill-muted" />
                    <span className="text-sm text-muted-foreground">
                      {`${product.unitsSold} units sold`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BoxIcon className="h-5 w-5 fill-muted" />
                    <span className="text-sm text-muted-foreground">
                      {` ${product.stockQuantity} in stock`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 fill-muted" />
                    <span className="text-sm text-muted-foreground">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <ProductDetailForm product={product} isFetched={isFetched} />
          </div>
        </div>
      </div>
      <Separator className="mb-4" />;
      <ReviewsTab id={product?.id} productRefetch={refetch} product={product} />
    </div>
  );
}
