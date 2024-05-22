"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Search as SearchIcon } from "lucide-react";
import useGetProductSearch from "@/utils/hook/useGetSearchProducts";
import { UseMutateFunction } from "@tanstack/react-query";
import Spinner from "./Spinner";
import Image from "next/image";
import { debounce } from "lodash";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@prisma/client";

type SearchType = {
  results: Product[] | null;
  isPending: boolean;
  search: UseMutateFunction<any, Error, void, unknown>;
};

export default function Search() {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const { search, isPending, results }: SearchType = useGetProductSearch(query);

  const debouncedSearch = useCallback(
    debounce((query) => {
      search(query);
    }, 400),
    [],
  );

  const handleValueChange = (value: string) => {
    setQuery(value);
    setOpen(true);
    debouncedSearch(value);
  };

  const handleSearchItemSelect = (id: string) => {
    router.replace(`/product/${id}`);
    setOpen(false);
  };

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);

  return (
    <>
      <div className="relative ml-auto hidden flex-1 md:block md:grow-0">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen(true)}
          className="overflow-hidden rounded-full"
        >
          <SearchIcon strokeWidth={1.5} className="h-[20px] w-[20px]" />
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          onValueChange={handleValueChange}
          placeholder="Search for products..."
        />
        <CommandList>
          {!isPending && results?.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          <CommandGroup className="">
            {isPending ? (
              <Spinner />
            ) : (
              results?.slice(0, 6).map((result) => (
                <CommandItem
                  onSelect={() => handleSearchItemSelect(result.id)}
                  className=" flex flex-row gap-4"
                  value={result.id}
                  key={result.id}
                >
                  <Image
                    height={40}
                    width={40}
                    src={result.images[0].url}
                    alt={result.images[0].public_id}
                  />
                  <span>{result.name}</span>
                </CommandItem>
              ))
            )}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
