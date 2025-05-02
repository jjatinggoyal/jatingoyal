import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, getBlogPosts, formatDate } from '../utils/blogUtils';

function getOptimizedImagePath(src: string, isThumb = true): string {
  if (src.startsWith('/src/blogs/images/')) {
    const fileName = src.split('/').pop();
    if (!fileName) return src;
    
    const baseName = fileName.split('.')[0];
    return `/images/blog/${baseName}${isThumb ? '-thumb' : ''}.webp`;
  }
  return src;
}

const BlogPreview: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getBlogPosts();
      setPosts(allPosts.slice(0, 3)); // Show only the 3 most recent posts
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 theme-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-20 theme-bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat theme-text-primary">
              Latest Blog Posts
            </h2>
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 theme-bg-tertiary hover:theme-bg-secondary rounded-lg transition-all duration-300 group"
            >
              <span className="text-sm theme-text-primary">View All</span>
              <svg className="w-4 h-4 theme-primary group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <Link 
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full flex flex-col overflow-hidden rounded-xl theme-bg-secondary border theme-border transform transition-transform hover:-translate-y-1">
                  {post.frontmatter.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getOptimizedImagePath(post.frontmatter.coverImage)}
                        alt={post.frontmatter.title}
                        className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 p-6">
                    <time className="text-sm theme-text-tertiary">
                      {formatDate(post.frontmatter.date)}
                    </time>
                    
                    <h2 className="mt-2 text-xl font-bold font-montserrat theme-text-primary">
                      {post.frontmatter.title}
                    </h2>
                    
                    {post.frontmatter.subtitle && (
                      <p className="mt-2 theme-text-secondary line-clamp-2">
                        {post.frontmatter.subtitle}
                      </p>
                    )}
                    
                    {post.frontmatter.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.frontmatter.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full theme-bg-tertiary theme-text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;