import { getPaginatedPosts } from '@/lib/blog';
import BlogPageContent from '@/components/blog/BlogPageContent';
import { Metadata, ResolvingMetadata } from 'next';

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

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = Number(params.page);
  const { posts } = getPaginatedPosts(page);
  
  const title = `Blog - Page ${page}`;
  const description = 'Thoughts on software development, tech trends, and engineering best practices';
  
  // Get the first post's image as the preview image, if available
  const previewImage = posts[0]?.previewImage;
  const previousImages = (await parent).openGraph?.images || [];
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: previewImage ? [previewImage, ...previousImages] : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: previewImage ? [previewImage] : [],
    },
  }
}

export default function BlogPageNumber({ params }: PageProps) {
  return <BlogPageContent page={Number(params.page)} />;
} 