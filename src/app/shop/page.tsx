"use client";

import ProductPagination from "@/components/ProductPagination";
import { ITEMS_PERPAGE, SORT_OPTIONS } from "@/lib/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import ProductItem from "@/components/product/ProductItem";
import { ChevronDown, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import EmptyState from "@/components/product/EmptyState";
import { Product } from "../../../type";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastItemIndex = currentPage * ITEMS_PERPAGE;
  const firstItemIndex = lastItemIndex - ITEMS_PERPAGE;
  const [filter, setFilter] = useState({
    sort: "none",
  });
  // const currentitems = products?.slice(firstItemIndex, lastItemIndex);

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post("http://localhost:3000/api/product", {
        filter: {
          sort: filter.sort,
        },
      });

      return data;
    },
  });

  return (
    <main className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight">Products</h1>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium">
              Sort
              <ChevronDown className="m -mr-1 ml-1 h-5 w-5 flex-shrink-0 group-hover:text-blue-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  className={cn("block w-full px-4 py-2 text-left text-sm", {
                    " bg-slate-100 text-slate-900":
                      option.value === filter.sort,
                    "text-gray-500": option.value !== filter.sort,
                  })}
                  onClick={() => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: option.value,
                    }));
                  }}
                >
                  {option.label}
                </button>
              ))}
            </DropdownMenuContent>

            <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
              <Filter className="h-5 w-5" />
            </button>
          </DropdownMenu>
        </div>
      </div>

      <section>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}

          {/* Product grid */}
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3">
            {products && products.length === 0 ? (
              <EmptyState />
            ) : products ? (
              products.map((product: Product) => (
                <ProductItem product={product} />
              ))
            ) : (
              new Array(12)
                .fill(null)
                .map((_, i) => <ProductSkeleton key={i} />)
            )}
          </ul>
        </div>
      </section>
      {/* <ProductPagination
        totalItems={products?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </main>
  );
}

export default page;
