"use client";

import { Button } from "@/components/ui/button";
import useGetProduct from "@/utils/hook/useGetProduct";
import { Separator } from "@/components/ui/separator";
import { BoxIcon, PackageIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartItem } from "@/../types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, getCart } from "@/store/slices/cartSlice";
import { toast } from "@/components/ui/use-toast";
import { CommentRatings } from "@/components/ui/rating-stars";
import { formatCurrency } from "@/utils/helpers";
import RippleLoader from "@/components/RippleLoader";
import ProductDetailImages from "./ProductDetailImages";
import ReviewsTab from "./ReviewsTab";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, Review } from "@prisma/client";
import useGetReviews from "@/utils/hook/useGetReviews";

type ProductProps = {
  product: Product;
  isFetched: boolean;
  refetch: () => void;
};

export default function ProductDetail() {
  const [cartFilter, setCartFilter] = useState<CartItem | null>(null);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") as string;
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);

  const { product, isFetched, refetch }: ProductProps = useGetProduct(slug);
  const { reviews }: { reviews: Review[] } = useGetReviews(product.id);
  const avgRating = reviews?.reduce(
    (acc, review) => (acc + review.rating) / reviews.length,
    0,
  );

  const handleAddToCart = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const isProductInCart = cart.some(
      (item: CartItem) => item.id === cartFilter?.id,
    );

    if (product.stockQuantity > 0 && isFetched) {
      if (!isProductInCart) {
        dispatch(addItem(cartFilter as CartItem));
      } else {
        toast({
          variant: "destructive",
          description: "Item already exists",
        });
      }
    } else {
      toast({
        variant: "destructive",
        description: "Item is out of stock",
      });
    }
  };

  useEffect(() => {
    if (isFetched && product) {
      setCartFilter({
        ...product,
        quantity: 1,
        size: product.sizes[0],
      });
    }
  }, [isFetched, product]);

  if (!isFetched)
    return (
      <div className=" grid min-h-[75vh] items-center justify-center">
        <RippleLoader />;
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
                  <div className="flex items-center gap-4">
                    <CommentRatings fixed={true} rating={avgRating as number} />
                  </div>
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

            <form className="grid gap-4 md:gap-10">
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="size">
                  Size
                </Label>
                <ul className=" flex flex-row gap-4">
                  {product.sizes.map((size, index) => (
                    <li key={index}>
                      <Button
                        variant={
                          cartFilter?.size === size ? "default" : "outline"
                        }
                        size="icon"
                        onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
                          evt.preventDefault();
                          setCartFilter((prev) => ({
                            ...(prev as CartItem),
                            size: size,
                          }));
                        }}
                        id={size}
                        value={size}
                      >
                        {size}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid  gap-2">
                <Label className="text-base" htmlFor="quantity">
                  Quantity
                </Label>
                <Select
                  onValueChange={(value) => {
                    setCartFilter((prev) => ({
                      ...(prev as CartItem),
                      quantity: Number(value),
                    }));
                  }}
                  defaultValue={cartFilter?.quantity.toString()}
                >
                  <SelectTrigger className="md:w-44">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <SelectItem key={index} value={(index + 1).toString()}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className=" flex w-full items-center gap-2"
                onClick={handleAddToCart}
                size="lg"
              >
                <span>
                  <ShoppingCartIcon size={20} />
                </span>{" "}
                Add to cart
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Separator className="mb-4" />;
      <ReviewsTab
        id={product?.id}
        productRefetch={refetch}
        product={product}
        avgRating={avgRating}
      />
    </div>
  );
}
