"use client";

import { MoveRight, Search as SearchIcon } from "lucide-react";
import useGetProductSearch from "@/utils/hook/useGetSearchProducts";
import { UseMutateFunction } from "@tanstack/react-query";
import Spinner from "./Spinner";
import Image from "next/image";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Product } from "@prisma/client";
import { Input } from "./ui/input";

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
    } else {
      setOpen(false);
    }
  };

  const handleSearchItemSelect = (id: string) => {
    router.push(`/product/${id}`);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative ml-auto flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          onChange={handleValueChange}
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>

      {open && (
        <div className=" absolute left-0 right-0 mt-2 w-full rounded-lg border  bg-background p-4 shadow-md">
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
                  <span className="text-sm">{result.name}</span>
                </div>
              ))}

              {results?.length > 6 && (
                <div className="mt-4 flex cursor-pointer items-center justify-between p-2 text-sm hover:bg-gray-100 ">
                  <p>
                    Search for <span className="italic">{query}</span>
                  </p>
                  <span>
                    <MoveRight />
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
