import { getPostData, getAllPostSlugs, getAllPosts } from '@/lib/post';
import { Calendar, Tag, User, ArrowLeft, ArrowRight, Rss } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import GiscusComments from '@/components/GiscusComments';

interface PostPageProps {
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

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist.',
    };
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post.title,
    description: post.subtitle || `${post.title} - Post by ${post.author}`,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.subtitle || `${post.title} - Post by ${post.author}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.previewImage 
        ? [post.previewImage, ...previousImages]
        : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.subtitle || `${post.title} - Post by ${post.author}`,
      images: post.previewImage ? [post.previewImage] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostData(params.slug);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === params.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8">This post does not exist or is a draft.</p>
          <Link href="/posts" className="text-blue-600 dark:text-blue-400 underline">
            Go back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-8">
      {/* Hero Section */}
      <div className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center">
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

              <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-slate-800 dark:text-white mb-6 animate-fade-in">
                {post.title}
              </h1>

              {post.subtitle && (
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 animate-fade-in animation-delay-100">
                  {post.subtitle}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400 animate-fade-in animation-delay-200">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                )}

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
                        href={`/posts/tag/${tag}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Rss className="h-4 w-4" />
                  <Link href="/feed.xml" className="hover:text-blue-600 dark:hover:text-blue-400">
                    RSS Feed
                  </Link>
                </div>
              </div>
            </header>
          </article>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Use MDXRemote with our custom components */}
          <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-table:my-6 prose-th:border prose-th:border-slate-200 dark:prose-th:border-slate-700 prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-700">
            {post.content}
          </div>

          {post.giscus && (
            <GiscusComments />
          )}

          {/* Navigation */}
          <nav className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-4">
            {prevPost && (
              <Link
                href={`/posts/${prevPost.slug}`}
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
                href={`/posts/${nextPost.slug}`}
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