import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { getAllPosts, PostMetadata } from '@/lib/post';
import PostCard from '@/components/post/PostCard';
import Link from 'next/link';

export default function Home() {
  const posts: PostMetadata[] = getAllPosts().slice(0, 5);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        {/* Latest Posts Section */}
        <section className="container mx-auto px-4 md:px-6 py-12">
          <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white text-center">
            Latest Posts
          </h2>
          <div className="flex flex-col gap-8 mb-8">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <Link
              href="/posts"
              className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}