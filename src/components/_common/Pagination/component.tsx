import {
  FC,
} from "react";
import clsx from "clsx";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

import { usePagination, DOTS } from "./usePagination";

interface PaginationProps {
  onPageChange: Function;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination: FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 0,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination(
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  );

  // If there are less than 2 times in pagination range we shall not render the component
  if (!paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage === paginationRange[paginationRange.length - 1]) return;
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  let dotCount = 0;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0});

  }

  const className =
    "text-gray-500 font-small hover:text-gray-700 transition-all duration-100 w-10 sm:w-8 cursor-pointer text-center align-middle";
  const selectedClassName =
    "text-indigo-500 font-medium w-10 sm:w-8 text-center align-middle";

  return (
    <div id="pagination" className="m-auto w-fit">
      <ul className="flex items-center gap-x-2">
        {/* Left navigation arrow */}
        <li
          key="pagination-previous"
          className={clsx("", {
            disabled: currentPage === 1,
          })}
          onClick={() => {
            onPrevious();
            scrollToTop();
          }}
        >
          <ArrowLongLeftIcon className={clsx("font-small duration:100 h-5 w-5 sm:h-7 sm:w-7 cursor-default text-gray-400 transition-all", currentPage > 1 && "hover:text-gray-600 cursor-pointer")}/>
        </li>
        {paginationRange.map((pageNumber) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            dotCount++;
            return (
              <li
                key={`pagination-dot${dotCount}`}
                className="font-small w-8 sm:w-10 text-center align-middle text-gray-400"
              >
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              key={`pagination-number${pageNumber}`}
              className={
                pageNumber === currentPage ? selectedClassName : className
              }
              onClick={() =>{onPageChange(pageNumber), scrollToTop()}}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
          key="pagination-next"
          className={"flex items-center gap-x-2"}
          onClick={() => {
            onNext();
            scrollToTop();
          }}
        >
          <ArrowLongRightIcon className={clsx("font-small duration:100 h-5 w-5 sm:h-7 sm:w-7 text-gray-400 transition-all cursor-default", currentPage !== paginationRange[paginationRange.length - 1]  && "hover:text-gray-600 cursor-pointer")} />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
