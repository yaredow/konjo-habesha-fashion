"use client";

import { SearchType } from "@/components/Search";
import Spinner from "@/components/Spinner";
import ProductItem from "@/components/product/ProductItem";
import { Input } from "@/components/ui/input";
import useGetProductSearch from "@/utils/hook/useGetSearchProducts";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function page() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query");
  const [query, setQuery] = useState<string>(initialQuery || "");
  const [open, setOpen] = useState<boolean>(false);

  const {
    results = [],
    isPending,
    search,
  }: SearchType = useGetProductSearch(query);
  const debouncedSeach = useCallback(debounce(search, 400), [search]);

  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setQuery(value);
  };

  useEffect(() => {
    if (query) {
      setOpen(true);
      debouncedSeach();
    } else {
      setOpen(false);
    }
  }, [query, search]);

  return (
    <div className=" items-center">
      <div className="mx-auto mb-8 flex flex-col items-center justify-center">
        <h1 className=" mb-4 text-xl font-semibold">Search</h1>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            onChange={handleValueChange}
            value={query}
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[400px] lg:w-[600px]"
          />
        </div>
      </div>

      {open && (
        <div className="mt-2 flex w-full flex-col items-center">
          {isPending && <Spinner className="my-4" />}
          {!isPending && results?.length === 0 && (
            <div className="my-4">No results found.</div>
          )}
          {!isPending && results?.length! > 0 && (
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {results?.map((result) => (
                <ProductItem key={result.id} product={result} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
