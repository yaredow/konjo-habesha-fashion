import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Spinner from "../Spinner";
import ProductItem from "../product/ProductItem";
import { useCallback, useEffect, useState } from "react";
import useGetProductSearch from "@/utils/hook/useGetSearchProducts";
import { debounce } from "lodash";

export default function SearchComp() {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { search, isPending, results = [] } = useGetProductSearch(query);

  const onSubmit = () => search();
  const debouncedSearch = debounce(onSubmit, 400);
  const _debouncedSearch = useCallback(debouncedSearch, [debouncedSearch]);

  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setQuery(value);
    if (value) {
      setOpen(true);
      _debouncedSearch();
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (query) {
      setOpen(true);
      _debouncedSearch();
    } else {
      setOpen(false);
    }
  }, [query, search, _debouncedSearch]);

  return (
    <>
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
    </>
  );
}
