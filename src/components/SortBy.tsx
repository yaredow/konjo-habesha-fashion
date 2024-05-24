"use client";

import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { SORT_OPTIONS } from "@/utils/constants";

function SortBy() {
  const [filter, setFilter] = useState({
    sort: "none",
  });
  return (
    <div className=" ">
      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium">
          Sort
          <ChevronDown className="m -mr-1 ml-1 h-5 w-5 flex-shrink-0 group-hover:text-blue-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {SORT_OPTIONS.map((option) => (
            <Button
              variant="outline"
              key={option.label}
              className={cn("block w-full px-4 py-2 text-left text-sm", {
                " bg-slate-100 text-slate-900": option.value === filter.sort,
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
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SortBy;
