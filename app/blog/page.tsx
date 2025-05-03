import BlogPageContent from '@/components/blog/BlogPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Jatin Goyal',
  description: 'Thoughts on software development, tech trends, and engineering best practices',
  openGraph: {
    title: 'Blog - Jatin Goyal',
    description: 'Thoughts on software development, tech trends, and engineering best practices',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Jatin Goyal',
    description: 'Thoughts on software development, tech trends, and engineering best practices',
  },
};

export default function BlogPage() {
  return <BlogPageContent />;
} 