"use client";

import Image from "next/image";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import useGetProduct from "@/utils/hook/useGetProduct";
import React, { useTransition } from "react";
import {
  AVAILABLE_CATEGORIRES,
  AVAILABLE_SIZES,
  PRODUCT_STATUS_OPTIONS,
} from "@/utils/constants";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteProductImageAction } from "@/server/actions/product/delete-product-image";
import { toast } from "@/components/ui/use-toast";
import { editProductAction } from "@/server/actions/product/edit-product";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import ImageUploader from "@/components/ImageUploader";
import compareObject from "@/utils/compareObjects";
import { cn } from "@/utils/cn";
import { Product } from "@prisma/client";
import { uploadProductImagesAction } from "@/server/actions/product/upload-product-image";

type EditProductType = {
  product: Product;
  isFetched: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

export default function Page({ params }: { params: { slug: string } }) {
  console.log(params);
  const [isLoading, startTransition] = useTransition();
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [productDetails, setProductDetails] = React.useState<Product | null>(
    null,
  );
  const router = useRouter();
  const { slug } = params;
  const { product, isFetched, refetch }: EditProductType = useGetProduct(slug);

  const hasNoChanges = compareObject(productDetails as Product, product);

  const handleDeleteProductImage = async (
    public_id: string,
    product_id: string,
  ) => {
    startTransition(() => {
      deleteProductImageAction(public_id, product_id).then((data) => {
        if (data.success) {
          toast({
            description: data.message,
          });
          refetch();
        } else {
          toast({
            variant: "destructive",
            description: "Deleting image failed",
          });
        }
      });
    });
  };

  const handleUploadProductImages = async (
    files: File[],
    productId: string,
  ) => {
    const formData = new FormData();

    if (files) {
      for (const file of files) {
        formData.append("images", file);
      }
    }
    startTransition(() => {
      uploadProductImagesAction(files, productId).then((data) => {
        if (data.success) {
          toast({
            description: data.success,
          });
          refetch();
        } else {
          toast({
            variant: "destructive",
            description: data.error,
          });
        }
      });
    });
  };

  const handleEditProduct = async (productDetails: Product) => {
    startTransition(() => {
      editProductAction(productDetails).then((data) => {
        if (data.success) {
          toast({
            description: data.success,
          });
          refetch();
        } else {
          toast({
            variant: "destructive",
            description: data.error,
          });
        }
      });
    });
  };

  React.useEffect(() => {
    if (isFetched && product) {
      setProductDetails({
        ...product,
      });
    }
  }, [isFetched, product]);

  if (!isFetched) return <Spinner />;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {product.name}
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                {product.inStock ? "In Stock" : "Sold"}
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  onClick={() => {
                    setProductDetails({ ...product });
                  }}
                  variant="outline"
                  size="sm"
                  disabled={hasNoChanges}
                  className={cn({
                    "disabled:cursor-not-allowed disabled:opacity-60":
                      hasNoChanges,
                  })}
                >
                  Discard
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger
                    className={cn({
                      "disabled:cursor-not-allowed disabled:opacity-60":
                        hasNoChanges,
                    })}
                    disabled={hasNoChanges}
                  >
                    <Button variant="outline" size="sm">
                      Save Product
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        alter the product.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleEditProduct(productDetails as Product)
                          }
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          onChange={(e) => {
                            setProductDetails((prev) => ({
                              ...(prev as Product),
                              name: e.target.value,
                            }));
                          }}
                          id="name"
                          type="text"
                          className="w-full"
                          value={productDetails?.name}
                          defaultValue="Gamer Gear Pro Controller"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          onChange={(e) => {
                            setProductDetails((prev) => ({
                              ...(prev as Product),
                              description: e.target.value,
                            }));
                          }}
                          id="description"
                          value={productDetails?.description}
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">SKU</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="w-[100px]">Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-001
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-1" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              onChange={(e) => {
                                setProductDetails((prev) => ({
                                  ...(prev as Product),
                                  stockQuantity: Number(e.target.value),
                                }));
                              }}
                              id="stock-1"
                              type="number"
                              defaultValue={productDetails?.stockQuantity}
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-1" className="sr-only">
                              Price
                            </Label>
                            <Input
                              onChange={(e) => {
                                setProductDetails((prev) => ({
                                  ...(prev as Product),
                                  price: Number(e.target.value),
                                }));
                              }}
                              id="price-1"
                              type="number"
                              defaultValue={productDetails?.price}
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="multiple"
                              variant="outline"
                              value={productDetails?.sizes}
                              onValueChange={(value) => {
                                setProductDetails((prev) => ({
                                  ...(prev as Product),
                                  sizes: [...value],
                                }));
                              }}
                            >
                              {AVAILABLE_SIZES.map((size, index) => (
                                <ToggleGroupItem
                                  key={index}
                                  value={size}
                                  defaultChecked={productDetails?.sizes.includes(
                                    size,
                                  )}
                                >
                                  {size}
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mx-4 flex flex-row justify-between">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          onValueChange={(value) => {
                            setProductDetails((prev) => ({
                              ...(prev as Product),
                              category: value,
                            }));
                          }}
                        >
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {AVAILABLE_CATEGORIRES.map((category, index) => (
                              <SelectItem key={index} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="subcategory">Featured</Label>
                        <Switch
                          checked={productDetails?.isFeatured || false}
                          onCheckedChange={() => {
                            setProductDetails((prev) => ({
                              ...(prev as Product),
                              isFeatured: !prev?.isFeatured,
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          defaultValue={productDetails?.status}
                          onValueChange={(value) => {
                            setProductDetails((prev) => ({
                              ...(prev as Product),
                              status: value,
                            }));
                          }}
                        >
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {PRODUCT_STATUS_OPTIONS.map((option, index) => (
                              <SelectItem key={index} value={option.value}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      {product && `Images available for ${product.name}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={product.images[0].url}
                        width="300"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        {product.images.map((image, index) => (
                          <AlertDialog key={index}>
                            <AlertDialogTrigger>
                              <button
                                key={index}
                                className=" hover:cursor-pointer"
                              >
                                <Image
                                  alt="Product image"
                                  className="aspect-square w-full rounded-md object-cover hover:opacity-75"
                                  height="84"
                                  src={image.url}
                                  width="84"
                                />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Permanently delete this image?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteProductImage(
                                      image.public_id,
                                      product.id,
                                    )
                                  }
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ))}
                      </div>
                      <div className="flex flex-col gap-4">
                        <ImageUploader files={files} setFiles={setFiles} />
                        {files && files.length > 0 ? (
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleUploadProductImages(files, product.id)
                            }
                          >
                            Upload
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Archive Product</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => {
                        setProductDetails((prev) => ({
                          ...(prev as Product),
                          status: "Archived",
                        }));
                      }}
                      size="sm"
                      variant="secondary"
                    >
                      {productDetails?.status === "Archived"
                        ? "Archived"
                        : "Archive Product"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button
                onClick={() => {
                  setProductDetails({ ...product });
                }}
                variant="outline"
                size="sm"
              >
                Discard
              </Button>
              <Button
                onClick={() => {
                  handleEditProduct(productDetails as Product);
                }}
                size="sm"
              >
                Save Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
