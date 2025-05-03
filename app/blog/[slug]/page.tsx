import { getPostData, getAllPostSlugs, getAllPosts } from '@/lib/blog';
import { Calendar, Tag, User, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.params.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostData(params.slug);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === params.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const components = useMDXComponents({});

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center mb-12">
              {post.previewImage && (
                <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden shadow-xl animate-fade-in">
                  <Image
                    src={post.previewImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-slate-800 dark:text-white mb-6 animate-fade-in">
                {post.title}
              </h1>

              {post.subtitle && (
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 animate-fade-in animation-delay-100">
                  {post.subtitle}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400 animate-fade-in animation-delay-200">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </header>
          </article>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Use MDXRemote with our custom components */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Navigation */}
          <nav className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-4">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex items-start p-4 rounded-lg bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div>
                  <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Previous Post
                  </span>
                  <p className="font-medium text-slate-800 dark:text-white line-clamp-2">{prevPost.title}</p>
                </div>
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex items-start p-4 rounded-lg bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-auto text-right"
              >
                <div>
                  <span className="flex items-center justify-end gap-1 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Next Post
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <p className="font-medium text-slate-800 dark:text-white line-clamp-2">{nextPost.title}</p>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
} 