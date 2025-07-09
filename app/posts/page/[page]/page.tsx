import { getPaginatedPosts } from '@/lib/post';
import PostsPageContent from '@/components/post/PostsPageContent';
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
  
  const title = `Posts - Page ${page}`;
  const description = 'A place to share my thoughts and learnings';
  
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

export default function PostsPageNumber({ params }: PageProps) {
  return <PostsPageContent page={Number(params.page)} />;
} 