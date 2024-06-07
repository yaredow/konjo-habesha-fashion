"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  ListFilter,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useGetOrders from "@/utils/hook/useGetOrders";
import { useCallback, useEffect, useState } from "react";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { cn } from "@/utils/cn";
import _ from "lodash";
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
import { deleteOrderAction } from "@/server/actions/order/delete-order";
import { toast } from "@/components/ui/use-toast";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { AVAILABLE_DELIVARY_STATUS, ORDER_DURATION } from "@/utils/constants";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";
import { calculateTotalSales } from "@/utils/hook/calculateTotalSales";
import { Order } from "@prisma/client";
import { formatName } from "@/utils/formatName";

export type FetchOrderType = {
  orders: Order[];
  isFetched: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

export type FilterType = {
  delivery_status?: string;
  time_range: string;
};

export default function Page() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [monthlyTotalSales, setMonthlyTotalSales] = useState<number>(0);
  const [weeklyTotalSales, setWeeklyTotalSales] = useState<number>(0);
  const [filter, setFilter] = useState<FilterType | null>({
    delivery_status: "all",
    time_range: "week",
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const {
    orders = [],
    isFetched,
    refetch,
  }: FetchOrderType = useGetOrders(filter as FilterType);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsSelected(true);
  };

  const handleDeleteOrderClick = async (id: string) => {
    setIsDeleting(true);
    const result = await deleteOrderAction(id);

    if (result?.success === true) {
      toast({
        description: result.message,
      });
      setIsDeleting(false);
      refetch();
    } else {
      toast({
        variant: "destructive",
        description: "There was an error deleting the order",
      });
    }
  };

  // Limiting the request that will be send to the server
  const onSubmit = () => refetch();
  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = useCallback(debouncedSubmit, [debouncedSubmit]);

  // hydration error handling effetct and more
  useEffect(() => {
    if (isFetched && orders.length > 0) {
      setSelectedOrder(orders[0]);
    }

    const displayTotalSales = async () => {
      const weeklySales = await calculateTotalSales("week");
      setWeeklyTotalSales(weeklySales);

      const monthlySales = await calculateTotalSales("monthly");
      setMonthlyTotalSales(monthlySales);
    };

    displayTotalSales();
    setIsClient(true);
  }, [orders, isSelected, isFetched]);

  if (!isClient) return null;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Create an order</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Click the button below to create a new order
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Create New Order</Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">{`$${weeklyTotalSales}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-4xl">{`$${monthlyTotalSales}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label="12% increase" />
            </CardFooter>
          </Card>
        </div>
        <Tabs
          value={filter?.time_range}
          onValueChange={(value) => {
            setFilter((prev) => ({
              ...(prev as FilterType),
              time_range: value,
            }));
            _debouncedSubmit();
          }}
        >
          <div className="flex items-center">
            <TabsList>
              {ORDER_DURATION.map((option, index) => (
                <TabsTrigger
                  disabled={!isFetched}
                  key={index}
                  value={option.value}
                >
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={!isFetched}
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {AVAILABLE_DELIVARY_STATUS.map((option, index) => (
                    <DropdownMenuCheckboxItem
                      key={index}
                      onClick={() => {
                        setFilter((prev) => ({
                          ...(prev as FilterType),
                          delivery_status: option.value,
                        }));

                        _debouncedSubmit();
                      }}
                      defaultValue={filter?.delivery_status}
                      checked={filter?.delivery_status === option.value}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button> */}
            </div>
          </div>
          <TabsContent value={filter?.time_range as string}>
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Recent orders from your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table className={`${!isFetched && "overflow-hidden"}`}>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!isFetched ? (
                      <div className=" flex h-56 items-center justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      orders.map((order: Order) => (
                        <TableRow
                          key={order.id}
                          onClick={() => handleOrderClick(order)}
                          className={cn({
                            "bg-accent":
                              selectedOrder && selectedOrder.id === order.id,
                          })}
                        >
                          <TableCell>
                            <div className="font-medium">
                              {formatName(order.shipping.name)}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {order.shipping.email}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              {order.delivery_status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(order.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(order.subtotal)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order details */}
      <div>
        <Card
          className="sticky top-16 overflow-hidden"
          x-chunk="dashboard-05-chunk-4"
        >
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {`Order ${selectedOrder?.id}`}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>
                {`Date: ${formatDate(selectedOrder?.createdAt!)}`}
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e: any) => {
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
                          This action cannot be undone. This will permanently
                          delete the order details.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isDeleting}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOrderClick(selectedOrder?.id as string);
                          }}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          {/* Order details  */}
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>

              <ul className="grid gap-3">
                {selectedOrder?.products.map((product, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {` ${product.name} ${product.quantity === 1 ? "" : product.quantity}`}
                    </span>
                    <span>$250.00</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(selectedOrder?.subtotal)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>free</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>{formatCurrency(selectedOrder?.subtotal)}</span>
                </li>
              </ul>
            </div>

            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>{selectedOrder?.shipping.name}</span>
                  <span>{`${selectedOrder?.shipping.address.city}`}</span>
                  <span>{`${selectedOrder?.shipping.address.line1}`}</span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="text-muted-foreground">
                  Same as shipping address
                </div>
              </div>
            </div>

            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Customer Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Customer</dt>
                  <dd>{selectedOrder?.shipping.name}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">{selectedOrder?.shipping.email}</a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href="tel:">{selectedOrder?.shipping.phone}</a>
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Payment Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Visa
                  </dt>
                  <dd>**** **** **** 4532</dd>
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated{" "}
              <time dateTime="2023-11-23">
                {formatDate(selectedOrder?.createdAt)}
              </time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
