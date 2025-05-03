import { getPaginatedPosts } from '@/lib/blog';
import BlogPageContent from '@/components/blog/BlogPageContent';

interface PageProps {
  params: {
    page: string;
  };
}

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default function BlogPageNumber({ params }: PageProps) {
  return <BlogPageContent page={Number(params.page)} />;
} 