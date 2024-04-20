"use client";

import * as React from "react";
import {
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
import { debounce } from "lodash";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { Product } from "@/types/product";

type SearchType = {
  searchResults: Product[];
  isFetched: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
};

export default function Search() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const {
    searchResults = [],
    isFetched,
    refetch,
  }: SearchType = useGetProductSearch(query);

  console.log(query);

  const onSubmit = () => refetch();
  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = React.useCallback(debouncedSubmit, [refetch]);

  const handleValueChange = (value: string) => {
    setQuery(value);
    _debouncedSubmit();
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [query]);

  return (
    <>
      <div className="relative ml-auto hidden flex-1 md:block md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          onClick={() => setOpen(true)}
          type="search"
          placeholder="Search for products..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          onValueChange={handleValueChange}
          placeholder="Search for products..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {!isFetched ? (
              <Spinner />
            ) : (
              searchResults.map((result) => (
                <CommandItem key={result._id}>
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
