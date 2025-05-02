import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { Helmet } from 'react-helmet-async';
import { BlogPost as BlogPostType, getBlogPosts, formatDate } from '../utils/blogUtils';
import Alert from './markdown/Alert';
import CodeDemo from './markdown/CodeDemo';
import MermaidDiagram from './markdown/MermaidDiagram';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';

interface MarkdownProps {
  href?: string;
  src?: string;
  alt?: string;
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function getOptimizedImagePath(src: string): string {
  // If the image is from our blog images directory, use the optimized version
  if (src.startsWith('/src/blogs/images/')) {
    const fileName = src.split('/').pop();
    if (!fileName) return src;
    
    const baseName = fileName.split('.')[0];
    return `/images/blog/${baseName}.webp`;
  }
  return src;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adjacentPosts, setAdjacentPosts] = useState<{ previous: BlogPostType | null; next: BlogPostType | null }>({
    previous: null,
    next: null
  });

  useEffect(() => {
    const loadPost = async () => {
      const posts = await getBlogPosts();
      const currentPost = posts.find(p => p.slug === slug);
      const currentIndex = posts.findIndex(p => p.slug === slug);
      
      setPost(currentPost || null);
      setAdjacentPosts({
        previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
        next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
      });
      setIsLoading(false);
    };
    loadPost();
  }, [slug]);

  const truncateTitle = (title: string, maxLength: number = 30) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  const components: Partial<Components> & {
    Alert: typeof Alert;
    CodeDemo: typeof CodeDemo;
    MermaidDiagram: typeof MermaidDiagram;
  } = {
    Alert,
    CodeDemo,
    MermaidDiagram,
    a: ({ href, children, ...props }: MarkdownProps) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="theme-primary hover:opacity-80"
        {...props}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, ...props }: MarkdownProps) => {
      const optimizedSrc = src ? getOptimizedImagePath(src) : '';
      return (
        <img 
          src={optimizedSrc}
          alt={alt} 
          className="rounded-lg shadow-md"
          loading="lazy"
          {...props}
        />
      );
    },
    code: ({ inline, className, children, ...props }: MarkdownProps) => {
      // Handle Mermaid diagrams
      if (className === 'language-mermaid') {
        return <MermaidDiagram chart={String(children)} />;
      }

      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="relative group">
          <pre className={className} {...props}>
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(String(children))}
            className="absolute top-2 right-2 p-2 rounded bg-gray-800 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Copy code"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 theme-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-20 theme-bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold theme-text-primary mb-4">Blog Post Not Found</h1>
            <p className="theme-text-secondary mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blog"
              className="inline-flex items-center px-6 py-3 rounded-lg theme-bg-tertiary hover:theme-bg-secondary transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const blogImage = post.frontmatter.coverImage ? getOptimizedImagePath(post.frontmatter.coverImage) : '';
  const canonicalUrl = `https://jatingoyal.dev/blog/${post.slug}`;

  return (
    <>
      <Helmet>
        <title>{post.frontmatter.title} | Jatin Goyal</title>
        
        <meta name="description" content={post.frontmatter.subtitle || `Read ${post.frontmatter.title} on Jatin Goyal's blog`} />
        <meta property="og:title" content={`${post.frontmatter.title} | Jatin Goyal`} />
        <meta property="og:description" content={post.frontmatter.subtitle || `Read ${post.frontmatter.title} on Jatin Goyal's blog`} />
        <meta property="og:url" content={canonicalUrl} />
        {blogImage && <meta property="og:image" content={blogImage} />}

        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.frontmatter.title} | Jatin Goyal`} />
        <meta name="twitter:description" content={post.frontmatter.subtitle || `Read ${post.frontmatter.title} on Jatin Goyal's blog`} />
        {blogImage && <meta name="twitter:image" content={blogImage} />}

        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <article className="py-20 theme-bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {post.frontmatter.coverImage && (
              <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
                <img 
                  src={post.frontmatter.coverImage}
                  alt={post.frontmatter.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <header className="mb-12">
              <h1 className="text-4xl font-bold font-montserrat theme-text-primary mb-4">
                {post.frontmatter.title}
              </h1>
              {post.frontmatter.subtitle && (
                <p className="text-xl theme-text-secondary mb-6">{post.frontmatter.subtitle}</p>
              )}
              <div className="flex items-center gap-4">
                <time className="theme-text-tertiary">
                  {formatDate(post.frontmatter.date)}
                </time>
                {post.frontmatter.tags && (
                  <div className="flex gap-2">
                    {post.frontmatter.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full theme-bg-tertiary theme-text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
                components={components}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t theme-border">
              <div className="flex justify-between items-center">
                {adjacentPosts.previous ? (
                  <Link 
                    to={`/blog/${adjacentPosts.previous.slug}`}
                    className="flex items-center theme-text-primary hover:theme-primary transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>{truncateTitle(adjacentPosts.previous.frontmatter.title)}</span>
                  </Link>
                ) : (
                  <div></div>
                )}

                {/* Show "All Posts" link only for first and last posts */}
                {(!adjacentPosts.previous || !adjacentPosts.next) && (
                  <Link 
                    to="/blog"
                    className="mx-4 theme-text-primary hover:theme-primary transition-colors"
                  >
                    All Posts
                  </Link>
                )}

                {adjacentPosts.next ? (
                  <Link 
                    to={`/blog/${adjacentPosts.next.slug}`}
                    className="flex items-center theme-text-primary hover:theme-primary transition-colors"
                  >
                    <span>{truncateTitle(adjacentPosts.next.frontmatter.title)}</span>
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;