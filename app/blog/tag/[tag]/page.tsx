import { getAllTags, getPostsByTag } from '@/lib/blog';
import BlogPageContent from '@/components/blog/BlogPageContent';
import { Metadata, ResolvingMetadata } from 'next';

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

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const tag = params.tag;
  const posts = getPostsByTag(tag);
  
  const title = `Posts tagged "${tag}"`;
  const description = `${posts.length} post${posts.length !== 1 ? 's' : ''} tagged with "${tag}"`;
  
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

export default function BlogTagPage({ params }: PageProps) {
  return <BlogPageContent tag={params.tag} />;
} 