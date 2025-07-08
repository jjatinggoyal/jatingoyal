import React from 'react';
import { getPaginatedPosts, getAllTags, getPostsByTag } from '@/lib/post';
import PostCard from '@/components/post/PostCard';
import Pagination from '@/components/post/Pagination';
import { Tag, Search } from 'lucide-react';
import Link from 'next/link';

interface PostPageContentProps {
  page?: number;
  tag?: string;
}

export default function PostPageContent({ page = 1, tag }: PostPageContentProps) {
  const allTags = getAllTags();
  
  // Get posts based on whether a tag is selected
  const { posts, totalPages } = tag 
    ? {
        posts: getPostsByTag(tag),
        totalPages: 1, // No pagination for tag filtered posts for now
      }
    : getPaginatedPosts(page);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-slate-800 dark:text-white mb-6 animate-fade-in">
              {tag ? `Posts tagged "${tag}"` : 'All Posts'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 animate-fade-in animation-delay-100">
              {tag 
                ? `${posts.length} post${posts.length !== 1 ? 's' : ''} found`
                : ''
              }
            </p>
            
            {/* Search and Tags */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 animate-fade-in animation-delay-200">
              {/* <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}
              <div className="flex flex-wrap justify-center gap-2">
                {tag && (
                  <Link
                    href="/posts"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
                  >
                    Clear filter ×
                  </Link>
                )}
                {allTags.map((t) => (
                  <Link
                    key={t}
                    href={`/posts/tag/${t}`}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full transition-colors text-sm
                      ${t === tag
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                  >
                    <Tag className="h-3 w-3" />
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="flex flex-col gap-8 mb-12">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Only show pagination when no tag is selected */}
          {!tag && totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </div>
      </div>
    </div>
  );
}