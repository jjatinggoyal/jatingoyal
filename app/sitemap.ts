import { getAllPosts, getAllTags } from '@/lib/post';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jatingoyal.com';
  const posts = getAllPosts();
  const tags = getAllTags();

  // Get current date for lastModified
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Blog post pages
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Tag pages
  const tagPages = tags.map((tag) => ({
    url: `${baseUrl}/posts/tag/${tag}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Blog pagination pages
  const { totalPages } = posts.length > 0 ? { totalPages: Math.ceil(posts.length / 6) } : { totalPages: 0 };
  const paginationPages = Array.from({ length: totalPages }, (_, i) => ({
    url: `${baseUrl}/posts/page/${i + 1}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...blogPosts, ...tagPages, ...paginationPages];
} 