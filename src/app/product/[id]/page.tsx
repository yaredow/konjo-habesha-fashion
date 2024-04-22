"use client";

import React, { useState } from "react";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import useGetProduct from "@/utils/hook/useGetProduct";
import { Separator } from "@/components/ui/separator";
import { BoxIcon, PackageIcon, StarIcon, UserIcon } from "lucide-react";

import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CartItem, Product } from "@/types/product";
import { cn } from "@/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, getCart } from "@/store/slices/cartSlice";
import { toast } from "@/components/ui/use-toast";
import ProductReview from "@/components/product/review/ProductReview";

function ProductDetail({ params }: { params: { id: string } }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [cartFilter, setCartFilter] = React.useState<CartItem | null>(null);
  const { id } = params;
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);

  const { product, isFetched }: { product: Product; isFetched: boolean } =
    useGetProduct(id);

  const handleAddToCart = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const isProductInCart = cart.some(
      (item: CartItem) => item._id === cartFilter?._id,
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
    <section className="mx-12">
      <div>
        <div>
          <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
            <div className="grid items-start gap-3 md:grid-cols-5">
              {/* Mobile */}
              <div className="flex items-start md:hidden">
                <div className="grid gap-4">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    {product.name}
                  </h1>
                  <div>
                    <p>{product.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <PackageIcon className="h-5 w-5 fill-muted" />
                      <span className="text-sm text-muted-foreground">
                        {product.unitsSold}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BoxIcon className="h-5 w-5 fill-muted" />
                      <span className="text-sm text-muted-foreground">
                        500 in stock
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
                <div className="ml-auto text-4xl font-bold">$99</div>
              </div>

              <div className="hidden flex-col items-start gap-3 md:flex">
                {product.images.map((image, index) => (
                  <button
                    onClick={() => handleThumbnailClick(index)}
                    key={index}
                    className={cn(
                      "overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50",
                      {
                        "opacity-60": index === selectedPhotoIndex,
                      },
                    )}
                  >
                    <img
                      alt={image.public_id}
                      className="aspect-[5/6] object-cover"
                      height="120"
                      src={image.url}
                      width="100"
                    />
                    <span className="sr-only">View Image 1</span>
                  </button>
                ))}
              </div>
              <div className="md:col-span-4">
                <img
                  src={product.images[selectedPhotoIndex].url}
                  alt={product.images[selectedPhotoIndex].public_id}
                  className="aspect-[2/3] w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
                  height="900"
                  width="600"
                />
              </div>
            </div>

            <div className="grid items-start gap-4 md:gap-10">
              <div className="hidden items-start md:flex">
                <div className="grid gap-4">
                  <h1 className="text-3xl font-bold lg:text-4xl">
                    {product.name}
                  </h1>
                  <div>
                    <p>{product.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
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
                <div className="ml-auto text-4xl font-bold">$99</div>
              </div>

              <form className="grid gap-4 md:gap-10">
                <div className="grid gap-2">
                  <Label className="text-base" htmlFor="size">
                    Size
                  </Label>
                  <RadioGroup
                    className="flex items-center gap-2"
                    defaultValue={cartFilter?.size}
                    id="size"
                  >
                    {product.sizes.map((size, index) => (
                      <Label
                        key={index}
                        className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="size-s"
                      >
                        <RadioGroupItem
                          onClick={() => {
                            setCartFilter((prev) => ({
                              ...(prev as CartItem),
                              size: size,
                            }));
                          }}
                          checked={size === cartFilter?.size}
                          id={size}
                          value={size}
                        />
                        {size.toLocaleUpperCase()}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
                <div className="grid gap-2">
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
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 8 }).map((_, index) => (
                        <SelectItem value={(index + 1).toString()}>
                          {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddToCart} size="lg">
                  Add to cart
                </Button>
              </form>
            </div>
          </div>
        </div>
        <Separator className="mb-4" />
        <div>
          <Tabs defaultValue="Description">
            <TabsList>
              <TabsTrigger value="Description">Description</TabsTrigger>
              <TabsTrigger value="Reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="Description">
              <div className=" mt-4">{product.description}</div>
            </TabsContent>
            <TabsContent value="Reviews">
              <ProductReview
                cartFilter={cartFilter}
                setCartFilter={setCartFilter}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
