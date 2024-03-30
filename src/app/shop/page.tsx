"use client";

import ProductPagination from "@/components/ProductPagination";
import {
  DEFAULT_CUSTOM_PRICE,
  FILTER_OPTIONS,
  ITEMS_PERPAGE,
  SIZE_FILTERS,
  SORT_OPTIONS,
} from "@/lib/utils/constants";
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
import { ProductState } from "@/lib/utils/validators/product-validators";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastItemIndex = currentPage * ITEMS_PERPAGE;
  const firstItemIndex = lastItemIndex - ITEMS_PERPAGE;

  const [filter, setFilter] = useState<ProductState>({
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    size: ["L", "M", "S", "XL", "XXL"],
    sort: "none",
  });
  // const currentitems = products?.slice(firstItemIndex, lastItemIndex);

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post("http://localhost:3000/api/product");
      return data.products;
    },
  });

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "price" | "sort">;
    value: string;
  }) => {
    const isFilterApplied = filter[category].includes(value as never);

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  };

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
            <button className="-m-2 ml-4 p-2 sm:ml-6 lg:hidden">
              <Filter className="h-5 w-5" />
            </button>
          </DropdownMenu>
        </div>
      </div>

      <section>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-4">
          {/* Filters */}

          <div className=" mt-6 hidden lg:block">
            <ul className="space-y-4 border-b pb-6 text-sm font-medium ">
              {FILTER_OPTIONS.map((category) => (
                <li key={category.label}>
                  <button
                    disabled={!category.selected}
                    className="disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product grid */}
          <ul className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3 ">
            {products && products.length === 0 ? (
              <EmptyState />
            ) : products ? (
              products.map((product: Product) => (
                <ProductItem product={product} />
              ))
            ) : (
              new Array(12)
                .fill(null)
                .map((_, index) => <ProductSkeleton key={index} />)
            )}
          </ul>

          <Accordion type="multiple" className="animate-none">
            {/* size filter */}
            <AccordionItem value="color">
              <AccordionTrigger className="py-3 text-sm ">
                <span className="font-medium">Size</span>
              </AccordionTrigger>

              <AccordionContent className="animate-none pt-6">
                <ul className="space-y-4">
                  {SIZE_FILTERS.options.map((option, optionIdx) => (
                    <li key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`size-${optionIdx}`}
                        onChange={() => {
                          applyArrayFilter({
                            category: "size",
                            value: option.value,
                          });
                        }}
                        checked={filter.size.includes(option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`size-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
