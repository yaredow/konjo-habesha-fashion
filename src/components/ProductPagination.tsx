"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { itemsPerPage } from "@/lib/utils/constants";
import { useState } from "react";

function ProductPagination({
  totalItems,
  currentPage,
  setCurrentPage,
}: {
  totalItems: number;
  currentPage: any;
  setCurrentPage: any;
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleClickNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handleClickPrev} />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem>
              <PaginationLink
                href="#"
                className={`${currentPage === page ? " rounded-md bg-slate-100" : null}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href="#" onClick={handleClickNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ProductPagination;
