"use client";

import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "./ui/input";
import { Search as SearchIcon } from "lucide-react";
import useGetProductSearch from "@/utils/hook/useGetSearchProducts";
import { UseMutateFunction } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { Product } from "@/types/product";
import Image from "next/image";
import { debounce } from "lodash";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";

type SearchType = {
  results: Product[] | null;
  isPending: boolean;
  search: UseMutateFunction<any, Error, void, unknown>;
};

export default function Search() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");

  const { search, isPending, results }: SearchType = useGetProductSearch(query);

  const debouncedSearch = debounce(search, 400);
  const _debouncedSearch = React.useCallback(debouncedSearch, []);

  const handleValueChange = (value: string) => {
    setQuery(value);
    _debouncedSearch();
  };

  React.useEffect(() => {
    if (query.trim()) {
      search();
    }
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="relative ml-auto hidden flex-1 md:block md:grow-0">
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-full rounded-lg pl-8 text-muted-foreground md:w-[200px] lg:w-[300px]"
        >
          <span>
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4" />
          </span>{" "}
          Search for products...
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
            {results?.map((result) => (
              <CommandItem
                className=" flex flex-row gap-4"
                value={result._id}
                key={result._id}
              >
                <Image
                  height={40}
                  width={40}
                  src={result.images[0].url}
                  alt={result.images[0].public_id}
                />
                <span>{result.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
