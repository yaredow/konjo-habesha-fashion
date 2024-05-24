"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ITEMS_PERPAGE } from "@/utils/constants";

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
  for (let i = 1; i <= Math.ceil(totalItems / ITEMS_PERPAGE); i++) {
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
    <div className="">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handleClickPrev} />
          </PaginationItem>
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                className={`${currentPage === page ? " rounded-m" : null}`}
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
