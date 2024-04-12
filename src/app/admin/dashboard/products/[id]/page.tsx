"use client";

import Image from "next/image";
import { ChevronLeft, PlusCircle, Upload } from "lucide-react";

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
import { Product } from "../../../../../types/product";
import Spinner from "@/components/Spinner";
import useGetProduct from "@/utils/hook/useGetProduct";
import React from "react";
import {
  AVAILABLE_CATEGORIRES,
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
import { deleteProductImageAction } from "@/server/actions/product/deleteProductImageAction";
import { toast } from "@/components/ui/use-toast";

export default function page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const { product, isFetched }: { product: Product; isFetched: boolean } =
    useGetProduct(id);

  const [selectedSizes, setSelectedSizes] = React.useState<string[]>();
  const [productDetails, setProductDetails] = React.useState<Product | null>(
    null,
  );

  console.log(productDetails);

  React.useEffect(() => {
    if (isFetched && product) {
      setProductDetails({
        ...product,
      });
    }
  }, [!isFetched, product]);

  const handleEditProduct = async (id: string) => {};

  const handleSizeToggle = (size: string, isSelected: boolean) => {
    setSelectedSizes((prevSizes) => {
      if (isSelected) {
        return [...(prevSizes as string[]), size];
      }
    });

    setProductDetails((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        sizes: selectedSizes,
      };
    });
  };

  const handleDeleteProductImage = async (
    public_id: string,
    product_id: string,
  ) => {
    try {
      const result = await deleteProductImageAction(public_id, product_id);

      if (result.success === true) {
        toast({
          description: "Image deleted successfully",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Failed to delete product image",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

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
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save Product</Button>
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
                              type="single"
                              defaultValue={productDetails?.sizes[0]}
                              variant="outline"
                              onValueChange={(value) => {
                                handleSizeToggle(value, true);
                              }}
                            >
                              {product.sizes.map((size, index) => (
                                <ToggleGroupItem
                                  key={index}
                                  value={size}
                                  onValueChange={(value) =>
                                    handleSizeToggle(size, value)
                                  }
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
                          <AlertDialog>
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
                                      product._id,
                                    )
                                  }
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ))}

                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
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
                    <div></div>
                    <Button size="sm" variant="secondary">
                      Archive Product
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
