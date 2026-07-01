import React from "react";
import Link from "next/link";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  createPageUrl?: (page: number) => string;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  createPageUrl,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex items-center justify-center space-x-2 font-sans ${className}`}>
      {createPageUrl ? (
        <Link
          href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
          className={`px-3 py-2 border border-neutral-300 dark:border-petrol-800 rounded-none text-sm font-medium text-petrol-950 dark:text-neutral-200 bg-white dark:bg-petrol-900/40 hover:bg-neutral-50 dark:hover:bg-petrol-800 ${
            currentPage === 1 ? "opacity-50 pointer-events-none cursor-not-allowed" : "cursor-pointer"
          } focus:outline-none focus:ring-2 focus:ring-green-500/50`}
        >
          <span className="sr-only">Previous Page</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      ) : (
        <button
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-neutral-300 dark:border-petrol-800 rounded-none text-sm font-medium text-petrol-950 dark:text-neutral-200 bg-white dark:bg-petrol-900/40 hover:bg-neutral-50 dark:hover:bg-petrol-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/50"
        >
          <span className="sr-only">Previous Page</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {pages.map((page) => {
        const isActive = page === currentPage;
        const buttonClass = `px-4 py-2 border rounded-none text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/50 cursor-pointer ${
          isActive
            ? "border-green-500 bg-green-500 text-petrol-950 font-bold"
            : "border-neutral-300 dark:border-petrol-800 bg-white dark:bg-petrol-900/40 text-petrol-950 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-petrol-800"
        }`;

        if (createPageUrl) {
          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              aria-current={isActive ? "page" : undefined}
              className={buttonClass}
            >
              {page}
            </Link>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange && onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            className={buttonClass}
          >
            {page}
          </button>
        );
      })}

      {createPageUrl ? (
        <Link
          href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
          className={`px-3 py-2 border border-neutral-300 dark:border-petrol-800 rounded-none text-sm font-medium text-petrol-950 dark:text-neutral-200 bg-white dark:bg-petrol-900/40 hover:bg-neutral-50 dark:hover:bg-petrol-800 ${
            currentPage === totalPages ? "opacity-50 pointer-events-none cursor-not-allowed" : "cursor-pointer"
          } focus:outline-none focus:ring-2 focus:ring-green-500/50`}
        >
          <span className="sr-only">Next Page</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      ) : (
        <button
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-neutral-300 dark:border-petrol-800 rounded-none text-sm font-medium text-petrol-950 dark:text-neutral-200 bg-white dark:bg-petrol-900/40 hover:bg-neutral-50 dark:hover:bg-petrol-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/50"
        >
          <span className="sr-only">Next Page</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
