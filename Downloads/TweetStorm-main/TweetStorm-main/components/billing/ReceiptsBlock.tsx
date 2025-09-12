'use client';

import { useInvoices, useInvoicesCount } from '@/hooks/swr';
import { InvoiceStatus } from '@/types/types';
import { INVOICES_PER_PAGE, MONTHS } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { DownloadInvoiceIcon } from '../icons';
import ReceiptsTableHeader from './ReceiptsTableHeader';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
}
const invoiceStatus: Record<InvoiceStatus, string> = {
  paid: 'text-success-700 bg-success-500/10',
  unpaid: 'text-danger bg-danger/10',
};

function ReceiptsBlock() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationCursor, setPaginationCursor] = useState<null | {
    type: 'after' | 'before';
    invoiceId: string;
  }>(null);
  const { data: invoicesData } = useInvoices({
    limit: INVOICES_PER_PAGE,
    startAfter:
      paginationCursor?.type === 'after' ? paginationCursor.invoiceId : null,
    startBefore:
      paginationCursor?.type === 'before' ? paginationCursor.invoiceId : null,
  });
  const { data: invoicesCountData } = useInvoicesCount();

  const invoices = invoicesData?.invoices;
  const invoicesCount = invoicesCountData?.count;

  let totalPages: number = 0;

  if (invoicesCount !== undefined) {
    totalPages = Math.ceil(invoicesCount / INVOICES_PER_PAGE);
  }

  function handlePageClick(pageNumber: number) {
    if (!invoices) return;
    const selectedPage = pageNumber + 1;
    if (selectedPage === currentPage) return;
    // moving to first page
    if (selectedPage === 1) {
      setPaginationCursor(null);
    }
    // moving to the next page
    else if (selectedPage > currentPage) {
      const lastInvoiceId = invoices[invoices.length - 1].id;
      setPaginationCursor({ type: 'after', invoiceId: lastInvoiceId });
    }
    // moving to the previous page
    else if (selectedPage < currentPage) {
      const firstInvoiceId = invoices[0].id;
      setPaginationCursor({ type: 'before', invoiceId: firstInvoiceId });
    }

    setCurrentPage(selectedPage);
  }

  return invoices ? (
    <div className='mt-12'>
      <h2 className='text-2xl mb-3'>Receipts</h2>

      <div className='rounded-xl border border-gray-300 dark:border-dark-mode-border shadow-xs'>
        <div className='relative overflow-x-auto rounded-t-xl'>
          <table className='w-full table-auto divide-y dark:divide-gray-700 text-start rounded-xl'>
            <thead className='bg-warm-light-gray dark:bg-primary-dark'>
              <tr>
                <ReceiptsTableHeader text='Created at' />
                <ReceiptsTableHeader text='Total Amount' />
                <ReceiptsTableHeader text='Amount Due' />
                <ReceiptsTableHeader text='Amount Paid' />
                <ReceiptsTableHeader text='Status' />

                <th className='w-5'></th>
              </tr>
            </thead>

            <tbody className='divide-y dark:divide-gray-700 whitespace-nowrap bg-white dark:bg-primary-dark-light rounded-xl'>
              {invoices?.map(invoice => {
                return (
                  <tr key={invoice.id} className='transition'>
                    <td>
                      <div>
                        <div className='flex w-full justify-start text-start'>
                          <div className='px-4 py-3 text-sm whitespace-nowrap'>
                            <span>{formatDate(invoice.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>
                        <div className='flex w-full justify-start text-start'>
                          <div className='px-4 py-3 text-sm'>
                            <span>{invoice.amount}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className='flex w-full justify-start text-start'>
                          <div className='px-4 py-3 text-sm'>
                            <span>{invoice.amountDue}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>
                        <div className='flex w-full justify-start text-start'>
                          <div className='px-4 py-3 text-sm'>
                            <span>{invoice.amountPaid}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className='flex w-full justify-start text-start'>
                          <div className='flex px-4 py-3'>
                            <div
                              className={clsx(
                                'flex-cc whitespace-nowrap rounded-xl px-2 py-0.5 text-sm font-medium rtl:space-x-reverse',
                                invoiceStatus[invoice.status as InvoiceStatus]
                              )}
                            >
                              <span>{invoice.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>
                        <div className='flex w-full justify-start text-start'>
                          <div className='px-4 py-3 whitespace-normal text-sm'>
                            <div className='inline-flex items-center space-x-1 rtl:space-x-reverse'>
                              <Link
                                href={invoice.url ?? ''}
                                className=''
                                target='_blank'
                              >
                                <DownloadInvoiceIcon />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className='flex items-center gap-4 justify-end'></div>
                    </td>

                    <td
                      className='w-full animate-pulse px-4 py-4 hidden'
                      colSpan={6}
                    >
                      <div className='h-4 rounded-md bg-gray-300 dark:bg-gray-700'></div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {totalPages > 1 && (
        <div className='py-3 text-sm flex-cb'>
          <p>
            Showing {getPageStart(currentPage)} to{' '}
            {getPageEnd(currentPage, invoicesCount ?? 0)} of {invoicesCount}{' '}
            results
          </p>
          <ReactPaginate
            breakLabel=' . . . '
            nextLabel='>'
            previousLabel='<'
            onPageChange={e => {
              handlePageClick(e.selected);
            }}
            containerClassName='flex border dark:border-dark-mode-border rounded-lg divide-x dark:divide-gray-700'
            pageLinkClassName='flex-cc py-1 px-2'
            nextLinkClassName='flex-cc py-1 px-2'
            previousLinkClassName='flex-cc py-1 px-2'
            activeLinkClassName='bg-gray-200 dark:bg-primary-dark-light text-soft-white'
            pageRangeDisplayed={0}
            marginPagesDisplayed={0}
            pageCount={totalPages}
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  ) : null;
}

function getPageStart(pageNumber: number): number {
  return (pageNumber - 1) * INVOICES_PER_PAGE + 1;
}

function getPageEnd(pageNumber: number, totalRecords: number): number {
  return pageNumber * INVOICES_PER_PAGE <= totalRecords
    ? pageNumber * INVOICES_PER_PAGE
    : totalRecords;
}

export default ReceiptsBlock;
