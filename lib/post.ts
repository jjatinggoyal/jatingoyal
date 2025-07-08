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
  draft?: boolean;
}

export interface PostData extends PostMetadata {
  content: string;
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const post = getPostData(slug);
      if (!post) return null;
      return {
        params: {
          slug,
        },
      };
    })
    .filter((v): v is { params: { slug: string } } => !!v); // type guard to remove nulls
}

export function getPostData(slug: string): PostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const metadata = data as Omit<PostMetadata, 'slug'>;

  if (metadata.draft) {
    return null;
  }

  return {
    content,
    ...metadata,
    slug,
  };
}

export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      return getPostData(slug);
    })
    .filter((post): post is PostData => !!post);

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