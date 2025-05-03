import React from 'react';
import { getPaginatedPosts, getAllTags } from '@/lib/blog';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/blog/Pagination';
import { Tag, Search } from 'lucide-react';
import Link from 'next/link';

interface BlogPageProps {
  searchParams: { page?: string };
}

// Mark this page as dynamically rendered
export const dynamic = 'force-dynamic';

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const { posts, totalPages } = getPaginatedPosts(currentPage);
  const allTags = getAllTags();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-slate-800 dark:text-white mb-6 animate-fade-in">
              Blog
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 animate-fade-in animation-delay-100">
              Thoughts on software development, tech trends, and engineering best practices
            </p>
            
            {/* Search and Tags */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 animate-fade-in animation-delay-200">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {allTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
} 