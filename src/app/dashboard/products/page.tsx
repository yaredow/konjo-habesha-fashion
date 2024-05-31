"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import CreateProduct from "@/components/dashboard/CreateProduct";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { deleteProductAction } from "@/server/actions/product/deleteProductAction";
import Spinner from "@/components/Spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import React, { useCallback, useState, useTransition } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { AVAILABLE_ADMIN_PRODUCT_CATEGORIES } from "@/utils/constants";
import useGetAdminFilteredProducts from "@/utils/hook/useGetAdminFilteredProducts";
import { debounce } from "lodash";
import { ProductFilterType } from "@/utils/validators/product-validators";
import { Product } from "@prisma/client";

export type FetchProductstype = {
  products: Product[];
  isFetched: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

export default function Page() {
  const [isClient, setIsClient] = React.useState(false);
  const [isLoading, startTransition] = useTransition();
  const [filter, setFilter] = useState<ProductFilterType>({
    status: "all",
  });
  const {
    products = [],
    isFetched,
    refetch,
  } = useGetAdminFilteredProducts(filter);
  const router = useRouter();
  console.log(filter);

  const onSubmit = () => refetch();
  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = useCallback(debouncedSubmit, [debouncedSubmit]);

  const handleProductDelete = async (id: string) => {
    startTransition(() => {
      deleteProductAction(id).then((data) => {
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
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className={`flex min-h-screen w-full flex-col bg-muted/40 ${isLoading && "opacity-75"}`}
    >
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs
          onValueChange={(value) => {
            setFilter({
              status: value,
            });
            _debouncedSubmit();
          }}
          defaultValue={filter.status}
        >
          <div className="flex items-center">
            <TabsList className=" flex flex-row gap-2">
              {AVAILABLE_ADMIN_PRODUCT_CATEGORIES.map((category, index) => (
                <TabsTrigger key={index} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="ml-auto flex items-center gap-6">
              <CreateProduct />
            </div>
          </div>
          <TabsContent value={filter.status}>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>Products available for order</CardDescription>
              </CardHeader>
              <CardContent>
                <Table className={`${!isFetched && "overflow-hidden"}`}>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Total Sales
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!isFetched ? (
                      <Spinner className="flex items-center justify-center" />
                    ) : (
                      products.map((product: Product) => (
                        <TableRow key={product.id}>
                          <TableCell className="hidden sm:table-cell">
                            <Image
                              alt={product.images[0].public_id}
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={product.images[0].url}
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.status}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatCurrency(product.price)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.unitsSold}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(product.productAddedDate)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.replace(
                                      `/dashboard/products/${product.id}`,
                                    )
                                  }
                                >
                                  Edit
                                </DropdownMenuItem>

                                <AlertDialog>
                                  <AlertDialogTrigger>
                                    <DropdownMenuItem
                                      onSelect={(e) => {
                                        e.preventDefault();
                                      }}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete the product.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleProductDelete(product.id);
                                        }}
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className={`${!isFetched && "hidden"}`}>
                {isFetched && products.length === 0 ? (
                  <h1 className=" mx-auto items-center font-semibold">
                    No product found
                  </h1>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of{" "}
                    <strong>{products.length > 0 && products.length}</strong>{" "}
                    products
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
