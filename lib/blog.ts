import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  author: string;
  previewImage?: string;
  slug: string;
}

export interface PostData extends PostMetadata {
  content: string;
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const metadata = data as Omit<PostMetadata, 'slug'>;

  return {
    content,
    ...metadata,
    slug,
  };
}

export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    return getPostData(slug);
  });

  // Sort posts by date in descending order (newest first)
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getPaginatedPosts(page: number, limit: number = 5) {
  const allPosts = getAllPosts();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    posts: allPosts.slice(startIndex, endIndex),
    totalPages: Math.ceil(allPosts.length / limit),
    currentPage: page,
  };
}

export function getPostsByTag(tag: string): PostData[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags);
} 