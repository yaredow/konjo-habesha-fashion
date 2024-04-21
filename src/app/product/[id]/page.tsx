"use client";

import React, { useState } from "react";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import useGetProduct from "@/utils/hook/useGetProduct";
import useAddToCart from "@/utils/hook/useAddToCart";
import { Separator } from "@/components/ui/separator";
import {
  BoxIcon,
  PackageIcon,
  Star,
  StarIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  UserIcon,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Product } from "@/types/product";
import ImageUploader from "@/components/ImageUploader";
import { cn } from "@/utils/cn";

type CartFilter = {
  size: string;
  quantity: number;
};

function ProductDetail({ params }: { params: { id: string } }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [cartFilter, setCartFilter] = React.useState<CartFilter>({
    size: "S",
    quantity: 1,
  });

  console.log(cartFilter);

  const { id } = params;
  const { product = {}, isFetched }: { product: Product; isFetched: boolean } =
    useGetProduct(id);

  const { handleAddToCart } = useAddToCart(product);

  function handleAddToCartClick() {
    if (!product?.inStock) {
      console.log("The item is out of stock");
      return;
    }
    handleAddToCart();
  }

  const handleThumbnailClick = (index: any) => {
    setSelectedPhotoIndex(index);
  };

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
                    defaultValue={cartFilter.size}
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
                              ...(prev as CartFilter),
                              size: size,
                            }));
                          }}
                          checked={size === cartFilter.size}
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
                  <Select defaultValue="1">
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="lg">Add to cart</Button>
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
              <div className="max-w-2xl px-4 py-8 md:px-6">
                <div className="grid gap-6">
                  <div>
                    <h2 className="text-2xl font-bold">Leave a Review</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Share your thoughts on this product.
                    </p>
                  </div>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="review">Review</Label>
                      <Textarea
                        className="min-h-[120px]"
                        id="review"
                        placeholder="Write your review here..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="rating">Rating</Label>
                        <Select defaultValue="3" id="rating">
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <ImageUploader files={files} setFiles={setFiles} />
                    </div>
                    <Button type="submit">Submit Review</Button>
                  </form>
                  <div className="grid gap-4 border-t pt-4 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            alt="User Image"
                            src="/placeholder-user.jpg"
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5 text-sm">
                          <div className="font-medium">John Doe</div>
                          <div className="text-gray-500 dark:text-gray-400">
                            Order #12345
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <time className="text-sm text-gray-500 dark:text-gray-400">
                          2 days ago
                        </time>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <ThumbsUpIcon className="h-5 w-5 fill-primary" />
                          <span>12</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <ThumbsDownIcon className="h-5 w-5 fill-primary" />
                          <span>3</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                      <p>
                        The product I purchased is absolutely stunning! The
                        quality of the fabric and the intricate embroidery are
                        truly impressive. It fits perfectly and is so
                        comfortable to wear. I can't wait to wear it to my next
                        event.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
