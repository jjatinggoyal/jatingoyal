import React from 'react';
import { getPostsByTag, getAllTags } from '@/lib/blog';
import PostCard from '@/components/blog/PostCard';
import { Tag } from 'lucide-react';
import Link from 'next/link';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default function TagPage({ params }: TagPageProps) {
  const posts = getPostsByTag(params.tag);
  const allTags = getAllTags();

  return (
    <div className="py-20 theme-bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat theme-text-primary mb-4">
            Posts tagged with &quot;{params.tag}&quot;
          </h1>
          <p className="text-lg theme-text-secondary">
            {posts.length} post{posts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with tags */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 sticky top-24">
              <h2 className="text-xl font-semibold theme-text-primary mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      tag === params.tag
                        ? 'theme-bg-secondary theme-text-primary font-medium'
                        : 'theme-bg-tertiary hover:theme-bg-secondary theme-text-primary'
                    }`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Blog posts */}
          <div className="lg:col-span-3">
            {posts.length > 0 ? (
              <div className="grid gap-8">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg theme-text-secondary">
                  No posts found with this tag.
                </p>
                <Link
                  href="/blog"
                  className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View all posts
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 