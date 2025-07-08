import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/post';
import PostCard from './post/PostCard';

const PostPreview: React.FC = () => {
  const posts = getAllPosts().slice(0, 3); // Get latest 3 posts

  return (
    <section className="py-20 theme-bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat theme-text-primary mb-4">
            Latest Posts
          </h2>
          <p className="text-lg theme-text-secondary">
            Read my latest thoughts on software development, tech, and career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-6 py-3 theme-bg-tertiary hover:theme-bg-secondary rounded-lg transition-all duration-300 group"
          >
            <span className="text-sm font-medium theme-text-primary">View All Posts</span>
            <ArrowRight className="h-4 w-4 theme-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PostPreview; 