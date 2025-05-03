import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, baseUrl = '/blog' }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Show at most 5 page numbers, with ellipsis if needed
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) {
      return [...pages.slice(0, 5), '...', totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }
    
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  const getPageUrl = (page: number) => {
    return `${baseUrl}${page === 1 ? '' : `?page=${page}`}`;
  };

  return (
    <nav className="flex justify-center items-center space-x-2 my-8">
      <Link
        href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : baseUrl}
        className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
          currentPage === 1 ? 'text-slate-400 dark:text-slate-600 pointer-events-none' : 'text-slate-600 dark:text-slate-300'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>

      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 theme-text-secondary">...</span>
          ) : (
            <Link
              href={getPageUrl(page as number)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {page}
            </Link>
          )}
        </React.Fragment>
      ))}

      <Link
        href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : baseUrl}
        className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
          currentPage === totalPages ? 'text-slate-400 dark:text-slate-600 pointer-events-none' : 'text-slate-600 dark:text-slate-300'
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </Link>
    </nav>
  );
};

export default Pagination; 