"use client";

import ProductPagination from "@/components/ProductPagination";
import {
  DEFAULT_CUSTOM_PRICE,
  ITEMS_PERPAGE,
  SORT_OPTIONS,
} from "@/lib/utils/constants";
import { useCallback, useState } from "react";
import ProductItem from "@/components/product/ProductItem";
import { ChevronDown, SortAscIcon } from "lucide-react";
import { IoFilter } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import EmptyState from "@/components/product/EmptyState";
import { Product } from "../../types/product";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { ProductState } from "@/lib/utils/validators/product-validators";

import debounce from "lodash.debounce";
import useGetFilteredProducts from "../../lib/hook/useGetFilteredProducts";
import ProductFilter from "@/components/product/shop/ProductFilter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaSortAlphaDown } from "react-icons/fa";

function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastItemIndex = currentPage * ITEMS_PERPAGE;
  const firstItemIndex = lastItemIndex - ITEMS_PERPAGE;
  const [filter, setFilter] = useState<ProductState>({
    price: {
      isCustom: false,
      range: DEFAULT_CUSTOM_PRICE,
    },
    size: ["L", "M", "S", "XL", "XXL"],
    category: "All",
    sort: "none",
  });

  const { products, refetch } = useGetFilteredProducts(filter);
  const currentitems = products?.slice(firstItemIndex, lastItemIndex);

  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = useCallback(debouncedSubmit, []);

  return (
    <main className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b p-6">
        <h1 className="text-2xl font-semibold tracking-tight md:text-4xl md:font-bold">
          {filter.category}
        </h1>

        <div className=" flex flex-row items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-4">
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Sort
                </span>
                <FaSortAlphaDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={cn("block w-full px-4 py-2 text-left text-sm", {
                    "bg-gray-200 text-gray-900": option.value === filter.sort,
                    " text-secondary-foreground": option.value !== filter.sort,
                  })}
                  onClick={() => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: option.value,
                    }));

                    _debouncedSubmit();
                  }}
                >
                  {option.label}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile navigation  */}
          <div className="sm block md:hidden">
            <Sheet>
              <SheetTrigger>
                <IoFilter className=" mt-2 text-xl" />
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Filter</SheetTitle>
                </SheetHeader>
                <div>
                  <ProductFilter
                    filter={filter}
                    setFilter={setFilter}
                    _debouncedSubmit={_debouncedSubmit}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <section className=" flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-4">
          {/* Desktop Filter */}
          <div className="hidden md:block">
            <ProductFilter
              filter={filter}
              setFilter={setFilter}
              _debouncedSubmit={_debouncedSubmit}
            />
          </div>

          {/* Product grid */}
          <ul className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3 ">
            {products && products.length === 0 ? (
              <EmptyState />
            ) : products ? (
              currentitems.map((product: Product) => (
                <ProductItem product={product} />
              ))
            ) : (
              new Array(12)
                .fill(null)
                .map((_, index) => <ProductSkeleton key={index} />)
            )}

            {products && products.length > ITEMS_PERPAGE && (
              <div className=" col-span-full mt-6 flex items-center justify-center">
                <ProductPagination
                  totalItems={products?.length}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default page;
