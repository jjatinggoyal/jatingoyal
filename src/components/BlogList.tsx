import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { BlogPost, getBlogPosts, formatDate } from '../utils/blogUtils';

const POSTS_PER_PAGE = 6;

const BlogList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getBlogPosts();
      setPosts(allPosts);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Validate current page
  useEffect(() => {
    if (!isLoading && (currentPage < 1 || currentPage > totalPages)) {
      navigate('/blog?page=1', { replace: true });
    }
  }, [currentPage, totalPages, isLoading, navigate]);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page === 1) {
      navigate('/blog');
    } else {
      navigate(`/blog?page=${page}`);
    }
  };

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
          <h1 className="text-4xl font-bold font-montserrat theme-text-primary mb-12">Blog Posts</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            {paginatedPosts.map((post) => (
              <Link 
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block"
              >
                <article 
                  className="theme-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {post.frontmatter.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.frontmatter.coverImage}
                        alt={post.frontmatter.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <time className="text-sm theme-text-tertiary">
                        {formatDate(post.frontmatter.date)}
                      </time>
                      {post.frontmatter.tags && post.frontmatter.tags.map(tag => (
                        <span 
                          key={tag}
                          className="inline-block px-2 py-1 text-xs rounded-full theme-bg-tertiary theme-text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold theme-text-primary mb-2">
                      {post.frontmatter.title}
                    </h2>
                    {post.frontmatter.subtitle && (
                      <p className="theme-text-secondary mb-4">{post.frontmatter.subtitle}</p>
                    )}
                    <span 
                      className="inline-flex items-center theme-primary hover:opacity-80 transition-opacity"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg theme-bg-tertiary hover:theme-bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors theme-text-primary"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600' 
                      : 'theme-bg-tertiary hover:theme-bg-secondary theme-text-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg theme-bg-tertiary hover:theme-bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors theme-text-primary"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogList;