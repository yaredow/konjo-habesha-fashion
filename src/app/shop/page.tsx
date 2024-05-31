"use client";

import ProductPagination from "@/components/ProductPagination";

import { useCallback, useState } from "react";
import ProductItem from "@/components/product/ProductItem";

import { IoFilter } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EmptyState from "@/components/product/EmptyState";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import debounce from "lodash.debounce";
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
import useGetFilteredProducts from "@/utils/hook/useGetFilteredProducts";
import { ITEMS_PERPAGE, SORT_OPTIONS } from "@/utils/constants";
import { Product } from "@prisma/client";
import { ProductFilter as ProductFilterType } from "@/utils/validators/product-validators";

const initialFilter: ProductFilterType = {
  size: ["S", "L", "M", "XL", "XXL"],
  sort: "none",
  category: "All",
  price: { isCustom: false, range: [0, 600] },
};

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastItemIndex = currentPage * ITEMS_PERPAGE;
  const firstItemIndex = lastItemIndex - ITEMS_PERPAGE;
  const [filter, setFilter] = useState(initialFilter);

  const { products, refetch } = useGetFilteredProducts(filter);
  const currentItems = products?.slice(firstItemIndex, lastItemIndex);

  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = useCallback(debouncedSubmit, [debouncedSubmit]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl md:my-6">
      <div className="flex items-baseline justify-between border-b p-6">
        <h1 className="text-xl font-semibold tracking-normal md:text-2xl md:font-bold">
          {filter.category}
        </h1>
        <div className="flex flex-row items-center gap-6">
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
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    option.value === filter.sort
                      ? "bg-gray-200 text-gray-900"
                      : "text-secondary-foreground"
                  }`}
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
          {/* Mobile navigation */}
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger>
                <IoFilter className="mt-2 text-xl" />
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
      <section className="flex flex-col items-center justify-center">
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
          <ul className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
            {products && products.length === 0 ? (
              <EmptyState />
            ) : products ? (
              currentItems.map((product: Product) => (
                <ProductItem key={product.id} product={product} />
              ))
            ) : (
              new Array(12)
                .fill(null)
                .map((_, index) => <ProductSkeleton key={index} />)
            )}
            {products && products.length > ITEMS_PERPAGE && (
              <div className="col-span-full mt-6 flex items-center justify-center">
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
