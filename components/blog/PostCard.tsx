import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag } from 'lucide-react';
import { PostMetadata } from '@/lib/blog';

interface PostCardProps {
  post: PostMetadata;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-slate-200 dark:border-slate-700">
      {post.previewImage && (
        <div className="relative h-48 w-full">
          <Image
            src={post.previewImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Tag className="h-4 w-4 mr-1" />
            {post.tags.slice(0, 2).map((tag, index, arr) => (
              <React.Fragment key={tag}>
                <Link
                  href={`/blog?tag=${tag}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {tag}
                </Link>
                {index < arr.length - 1 && ', '}
              </React.Fragment>
            ))}
            {post.tags.length > 2 && ' ...'}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 theme-text-primary">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
            {post.title}
          </Link>
        </h2>
        
        {post.subtitle && (
          <p className="mb-4 theme-text-secondary">
            {post.subtitle}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm theme-text-secondary">
            By {post.author}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard; 