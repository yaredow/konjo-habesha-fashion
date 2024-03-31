"use client";

import ProductPagination from "@/components/ProductPagination";
import {
  DEFAULT_CUSTOM_PRICE,
  FILTER_OPTIONS,
  ITEMS_PERPAGE,
  PRICE_FILTERS,
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
import { Slider } from "@/components/ui/slider";

const initialState: ProductState = {
  price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
  size: ["L", "M", "S", "XL", "XXL"],
  sort: "none",
};

function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastItemIndex = currentPage * ITEMS_PERPAGE;
  const firstItemIndex = lastItemIndex - ITEMS_PERPAGE;

  const [filter, setFilter] = useState<ProductState>(initialState);

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);
  // const currentitems = products?.slice(firstItemIndex, lastItemIndex);

  console.log(filter);

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post("http://localhost:3000/api/product", {
        filter: {
          sort: filter.sort,
          price: filter.price.range,
          size: filter.size,
        },
      });
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
                    "bg-gray-100 text-gray-900": option.value === filter.sort,
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

            <Accordion type="multiple" className="animate-none">
              {/* size filter */}
              <AccordionItem value="size">
                <AccordionTrigger className="py-3 text-sm hover:text-gray-500">
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

              {/* Price filtering section */}
              <AccordionItem value="price">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Price</span>
                </AccordionTrigger>

                <AccordionContent className="animate-none pt-6">
                  <ul className="space-y-4">
                    {PRICE_FILTERS.options.map((option, optionIdx) => (
                      <li key={option.label} className="flex items-center">
                        <input
                          type="radio"
                          id={`price-${optionIdx}`}
                          onChange={() => {
                            setFilter((prev) => ({
                              ...prev,
                              price: {
                                isCustom: false,
                                range: [...option.value],
                              },
                            }));
                          }}
                          checked={
                            !filter.price.isCustom &&
                            filter.price.range[0] === option.value[0] &&
                            filter.price.range[1] === option.value[1]
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`price-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                    <li className="flex flex-col justify-center gap-2">
                      <div>
                        <input
                          type="radio"
                          id={`price-${PRICE_FILTERS.options.length}`}
                          onChange={() => {
                            setFilter((prev) => ({
                              ...prev,
                              price: {
                                isCustom: true,
                                range: [0, 100],
                              },
                            }));
                          }}
                          checked={filter.price.isCustom}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`price-${PRICE_FILTERS.options.length}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          Custom
                        </label>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-medium">Price</p>
                        <div>
                          {filter.price.isCustom
                            ? minPrice.toFixed(0)
                            : filter.price.range[0].toFixed(0)}{" "}
                          € -{" "}
                          {filter.price.isCustom
                            ? maxPrice.toFixed(0)
                            : filter.price.range[1].toFixed(0)}{" "}
                          €
                        </div>
                      </div>

                      <Slider
                        className={cn({
                          "opacity-50": !filter.price.isCustom,
                        })}
                        disabled={!filter.price.isCustom}
                        onValueChange={(range) => {
                          const [newMin, newMax] = range;

                          setFilter((prev) => ({
                            ...prev,
                            price: {
                              isCustom: true,
                              range: [newMin, newMax],
                            },
                          }));
                        }}
                        value={
                          filter.price.isCustom
                            ? filter.price.range
                            : DEFAULT_CUSTOM_PRICE
                        }
                        min={DEFAULT_CUSTOM_PRICE[0]}
                        defaultValue={DEFAULT_CUSTOM_PRICE}
                        max={DEFAULT_CUSTOM_PRICE[1]}
                        step={5}
                      />
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
        </div>
      </section>
    </main>
  );
}

export default page;

{
  /* <ProductPagination
        totalItems={products?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */
}
