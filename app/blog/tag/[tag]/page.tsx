import { getAllTags } from '@/lib/blog';
import BlogPageContent from '@/components/blog/BlogPageContent';

interface PageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const allTags = getAllTags();
  return allTags.map((tag) => ({
    tag,
  }));
}

export default function BlogTagPage({ params }: PageProps) {
  return <BlogPageContent tag={params.tag} />;
} 