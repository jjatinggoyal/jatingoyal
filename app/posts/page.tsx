import PostPageContent from '@/components/post/PostPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts - Jatin Goyal',
  description: 'Thoughts on software development, tech trends, and engineering best practices',
  openGraph: {
    title: 'Posts - Jatin Goyal',
    description: 'Thoughts on software development, tech trends, and engineering best practices',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posts - Jatin Goyal',
    description: 'Thoughts on software development, tech trends, and engineering best practices',
  },
};

export default function PostPage() {
  return <PostPageContent />;
} 