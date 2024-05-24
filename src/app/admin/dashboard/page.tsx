"use client";

import Link from "next/link";
import { Activity, ArrowUpRight, CreditCard, DollarSign } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import useGetOrders from "@/utils/hook/useGetOrders";
import { FetchOrderType } from "./order/page";
import Spinner from "@/components/Spinner";
import { formatCurrency } from "@/utils/helpers";
import useGetProducts from "@/utils/hook/useGetProducts";
import { Product } from "../../../../types/product";
import { formatName, getInitials } from "@/utils/formatName";

export default function Dashboard() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [activeProducts, setActiveProducts] = useState<number>(0);
  const [totalNumberOfSales, setTotalNumberOfSales] = useState<number>(0);
  const {
    orders = [],
    isFetched: isOrdersFetched,
    refetch,
  }: FetchOrderType = useGetOrders({
    delivery_status: "",
    time_range: "",
  });
  const {
    products = [],
    isFetched: isProductsFetched,
  }: { products: Product[]; isFetched: boolean } = useGetProducts();

  useEffect(() => {
    setIsClient(true);
    if (isProductsFetched) {
      const numberOfProducts = products.length;
      setActiveProducts(numberOfProducts);
      const totalSales = products.reduce(
        (total, product) => total + product.unitsSold,
        0,
      );
      setTotalNumberOfSales(totalSales);
    }

    if (isOrdersFetched) {
      const revenue = orders.reduce(
        (total, order) => total + order.subtotal,
        0,
      );
      setTotalRevenue(revenue);
    }
  }, [orders, products, isOrdersFetched, isProductsFetched]);

  if (!isClient) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{`+${totalNumberOfSales}`}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{`+${activeProducts}`}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table className={`${!isOrdersFetched && "overflow-hidden"}`}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!isOrdersFetched ? (
                    <Spinner />
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="font-medium">
                            {formatName(order.shipping.name)}
                          </div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {order.shipping.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          Sale
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-06-23
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
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {!isOrdersFetched ? (
                <Spinner />
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>
                        {getInitials(order.shipping.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {formatName(order.shipping.name)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.shipping.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{`+${formatCurrency(order.subtotal)}`}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
