"use client";

import React, { useState } from "react";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import useGetProduct from "@/utils/hook/useGetProduct";
import { Separator } from "@/components/ui/separator";
import { BoxIcon, PackageIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartItem, Product } from "../../../../types/product";
import { cn } from "@/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, getCart } from "@/store/slices/cartSlice";
import { toast } from "@/components/ui/use-toast";
import ProductReview from "@/components/product/review/ProductReview";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import useGetReviews from "@/utils/hook/useGetReviews";
import UserReview from "@/components/product/review/Review";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommentRatings } from "@/components/ui/rating-stars";
import { formatCurrency } from "@/utils/helpers";
import RatingBreakdown from "@/components/product/review/RatingBreakdown";
import { ProductReviewType } from "../../../../types/review";

type UserReviewsType = {
  reviews: ProductReviewType[];
  isFetched: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

type ProductType = {
  product: Product;
  isFetched: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

function ProductDetail({ params }: { params: { id: string } }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [cartFilter, setCartFilter] = React.useState<CartItem | null>(null);
  const { id } = params;
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const {
    reviews = [],
    isFetched: isReviewsFetched,
    refetch: refetchReviews,
  }: UserReviewsType = useGetReviews(id);

  const avgRating = reviews.reduce(
    (acc, review) => (acc + review.rating) / reviews.length,
    0,
  );

  const {
    product,
    isFetched,
    refetch: refetchProduct,
  }: ProductType = useGetProduct(id);

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

  const handleThumbnailClick = (index: any) => {
    setSelectedPhotoIndex(index);
  };

  React.useEffect(() => {
    if (isFetched && product) {
      setCartFilter({
        ...product,
        quantity: 1,
        size: product.sizes[0],
      });
    }
  }, [isFetched, product]);

  if (!isFetched) return <Spinner />;

  return (
    <section className="md:mx-12">
      <div>
        <div className=" mb-4">
          <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
            <div className="grid gap-3 md:grid-cols-5">
              <div className="order-last flex w-full gap-3 overflow-x-auto md:order-first md:col-span-1 md:flex-col">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    onClick={() => handleThumbnailClick(index)}
                    key={index}
                    className={cn(
                      "overflow-hidden rounded-lg border transition-colors",
                      {
                        "opacity-60": index === selectedPhotoIndex,
                      },
                    )}
                  >
                    <img
                      alt={image.public_id}
                      className="object-cover"
                      height="120"
                      src={image.url}
                      width="100"
                    />
                    <span className="sr-only">View Image {index + 1}</span>
                  </button>
                ))}
              </div>

              <div className="order-first w-full md:order-last md:col-span-4">
                <img
                  src={product.images[selectedPhotoIndex].url}
                  alt={product.images[selectedPhotoIndex].public_id}
                  className="w-full overflow-hidden rounded-lg border object-cover"
                  height="900"
                  width="600"
                />
              </div>
            </div>

            <div className="grid items-start gap-4 md:gap-10">
              <div className="items-start md:flex">
                <div className="grid gap-4">
                  <h1 className="text-lg font-semibold md:text-xl ">
                    {product.name.toUpperCase()}
                  </h1>
                  <Separator className=" w-full" />
                  <p className=" text-lg font-normal">
                    {formatCurrency(product.price)}
                  </p>
                  <div className="flex items-center gap-4">
                    <CommentRatings fixed={true} rating={avgRating} />
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
                          onClick={(
                            evt: React.MouseEvent<HTMLButtonElement>,
                          ) => {
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
                        <SelectItem value={(index + 1).toString()}>
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
        <Separator className="mb-4" />
        <Tabs defaultValue="Description">
          <div className="mx-auto flex justify-center">
            <TabsList>
              <TabsTrigger value="Description">Description</TabsTrigger>
              <TabsTrigger value="Reviews">
                Reviews({reviews.length})
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator className="mt-4" />
          <TabsContent value="Description">
            <div className=" mt-4 flex-wrap">{product.description}</div>
          </TabsContent>
          <TabsContent value="Reviews">
            <div className=" mx-auto mb-4 mt-12 flex justify-center">
              <p
                className={
                  reviews.length > 0
                    ? "hidden"
                    : "Be the first to rate this product"
                }
              ></p>
              <ProductReview productId={product.id} refetch={refetchProduct} />
            </div>

            <div className="grid gap-4 pt-4">
              {reviews.length > 0 ? (
                <div className="mx-auto mb-4 grid w-full max-w-2xl gap-12 md:grid-cols-2">
                  <Card className="grid gap-6 p-6">
                    <CardHeader>
                      <CardTitle>Overal Rating</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                      <div className="text-8xl font-bold">
                        {avgRating}
                        <span className="text-5xl text-gray-500 dark:text-gray-400">
                          / 5
                        </span>
                      </div>
                      <div className="flex items-center rounded-full bg-gray-100 px-3 py-2 dark:bg-gray-800">
                        <CommentRatings fixed={true} rating={avgRating} />
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {`out of ${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="grid gap-6 p-6">
                    <CardHeader>
                      <CardTitle>Rating Breakdown</CardTitle>
                    </CardHeader>
                    <RatingBreakdown reviews={reviews} />
                  </Card>
                </div>
              ) : (
                <p className=" text-center">
                  Be the first to review this product
                </p>
              )}

              <Separator />

              <div className=" mt-4">
                <h1 className=" mb-4 text-center font-semibold">
                  Reviews<span className=" ml-2">{`(${reviews.length})`}</span>
                </h1>
                <ul>
                  {!isReviewsFetched ? (
                    <Spinner />
                  ) : (
                    reviews.map((review) => (
                      <li>
                        <UserReview refetch={refetchReviews} review={review} />
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default ProductDetail;
