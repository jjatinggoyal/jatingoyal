import PostPageContent from '@/components/post/PostPageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts - Jatin Goyal',
  description: 'A place to share my thoughts and learnings',
  openGraph: {
    title: 'Posts - Jatin Goyal',
    description: 'A place to share my thoughts and learnings',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posts - Jatin Goyal',
    description: 'A place to share my thoughts and learnings',
  },
};

export default function PostPage() {
  return <PostPageContent />;
} 