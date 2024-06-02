"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Spinner from "../Spinner";
import ProductItem from "../product/ProductItem";
import { useCallback, useEffect, useState } from "react";
import useGetProductSearch from "@/utils/hook/useGetSearchProducts";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";

export default function SearchComp() {
  const [open, setOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") as string;
  const [query, setQuery] = useState<string>(initialQuery || "");

  const { search, isPending, results = [] } = useGetProductSearch(query);
  console.log(results);

  const debouncedSearch = useCallback(
    debounce(() => search(), 400),
    [search],
  );

  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setQuery(value);
    if (value) {
      setOpen(true);
      debouncedSearch();
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    if (query) {
      setOpen(true);
      debouncedSearch();
    } else {
      setOpen(false);
    }
  }, [query, search, debouncedSearch]);

  if (!isClient) return null;

  return (
    <div className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full">
        <div className="mb-8 flex flex-col items-center justify-center">
          <h1 className="mb-4 text-xl font-semibold">Search</h1>
          <div className="relative w-full max-w-3xl">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              onChange={handleValueChange}
              value={query}
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </div>

        {open && (
          <div className="flex w-full flex-col items-center">
            {isPending && <Spinner />}
            {!isPending && results?.length === 0 && (
              <div className="my-4">No results found.</div>
            )}
            {!isPending && results?.length! > 0 && (
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {results?.map((result) => (
                  <ProductItem key={result.id} product={result} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
