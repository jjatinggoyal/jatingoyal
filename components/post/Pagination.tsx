import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <nav className="flex justify-center items-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? '/posts' : `/posts/page/${currentPage - 1}`}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      )}
      
      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? '/posts' : `/posts/page/${page}`}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {page}
        </Link>
      ))}
      
      {currentPage < totalPages && (
        <Link
          href={`/posts/page/${currentPage + 1}`}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      )}
    </nav>
  );
} 