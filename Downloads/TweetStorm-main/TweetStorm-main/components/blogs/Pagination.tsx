'use client';

import Link from 'next/link';
import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const [page, setPage] = useState<number>();
  if (totalPages <= 1) return null;

  function submitPageNumber() {
    if (page && page > 0) {
      window.location.href = page === 1 ? basePath : `${basePath}?page=${page}`;
    }
  }

  function getPageNumbers() {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        startPage = 2;
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 3, 2);
        endPage = totalPages - 1;
      }

      if (startPage > 2) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }

  return (
    <>
      <nav className='flex items-center justify-center space-x-2'>
        {currentPage > 1 ? (
          <Link
            href={
              currentPage === 2
                ? basePath
                : `${basePath}?page=${currentPage - 1}`
            }
            className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            Previous
          </Link>
        ) : (
          <span className='px-3 py-2 text-sm font-medium text-gray-300 bg-white border border-gray-300 rounded-lg cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600'>
            Previous
          </span>
        )}

        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className='px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400'
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Link
              key={`page-${pageNum}`}
              href={pageNum === 1 ? basePath : `${basePath}?page=${pageNum}`}
              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                isCurrentPage
                  ? 'text-blue-600 bg-blue-50 border border-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-500'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              {pageNum}
            </Link>
          );
        })}

        {currentPage < totalPages ? (
          <Link
            href={`${basePath}?page=${currentPage + 1}`}
            className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            Next
          </Link>
        ) : (
          <span className='px-3 py-2 text-sm font-medium text-gray-300 bg-white border border-gray-300 rounded-lg cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600'>
            Next
          </span>
        )}
      </nav>
      <span className='flex items-center justify-center mt-4'>OR</span>
      <span className='flex items-center justify-center mt-4 space-x-2'>
        <label
          htmlFor='page-number'
          className='text-gray-600 dark:text-gray-400'
        >
          Go to Page
        </label>
        <input
          id='page-number'
          type='number'
          className='max-w-md rounded-xl dark:bg-dark-mode-gray  dark:text-white'
          max={totalPages}
          min={1}
          onChange={e => {
            setPage(Number(e.target.value));
          }}
          value={page}
        />
        <button
          onClick={submitPageNumber}
          className='hover:bg-primary-light text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-white p-2 rounded-lg cursor-pointer'
        >
          Submit
        </button>
      </span>
    </>
  );
}

export default Pagination;
