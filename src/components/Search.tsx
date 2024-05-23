"use client";

import { Search as SearchIcon } from "lucide-react";
import useGetProductSearch from "@/utils/hook/useGetSearchProducts";
import { UseMutateFunction } from "@tanstack/react-query";
import Spinner from "./Spinner";
import Image from "next/image";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Product } from "@prisma/client";

type SearchType = {
  results: Product[] | null;
  isPending: boolean;
  search: UseMutateFunction<any, Error, void, unknown>;
};

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { search, isPending, results }: SearchType = useGetProductSearch(query);

  const debouncedSearch = useCallback(debounce(search, 400), [search]);

  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setQuery(value);
    if (value) {
      setOpen(true);
      debouncedSearch();
    }
  };

  const handleSearchItemSelect = (id: string) => {
    router.push(`/product/${id}`);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-1 items-center justify-between gap-4 rounded-md bg-gray-100 p-2">
        <input
          type="text"
          name="name"
          placeholder="Search"
          value={query}
          onChange={handleValueChange}
          className="flex-1 rounded-md bg-transparent outline-none"
        />
        <SearchIcon className="h-[20px] w-[20px] cursor-pointer" />
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          {isPending && <Spinner />}
          {!isPending && results?.length === 0 && <div>No results found.</div>}
          {results?.length > 0 && (
            <div>
              {results?.slice(0, 6).map((result) => (
                <div
                  key={result.id}
                  className="flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-100"
                  onClick={() => handleSearchItemSelect(result.id)}
                >
                  <Image
                    height={40}
                    width={40}
                    src={result.images[0].url}
                    alt={result.images[0].public_id}
                  />
                  <span>{result.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
