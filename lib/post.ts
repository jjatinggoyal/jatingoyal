import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { getMDXComponents } from '@/mdx-components';

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

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
  giscus?: boolean;
}

export interface PostData extends PostMetadata {
  content: React.ReactElement;
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      if (data.draft) return null;
      return {
        params: {
          slug,
        },
      };
    })
    .filter((v): v is { params: { slug: string } } => !!v); // type guard to remove nulls
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const metadata = data as Omit<PostMetadata, 'slug'>;

  if (metadata.draft) {
    return null;
  }

  const { frontmatter, content: compiledContent } = await compileMDX<Omit<PostMetadata, 'slug'>>({
    source: content,
    components: getMDXComponents(),
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypePrettyCode, { theme: 'monokai', keepBackground: false }],
        ],
      },
    },
  });

  return {
    content: compiledContent,
    ...metadata,
    slug,
  };
}

export function getAllPosts(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const metadata = data as Omit<PostMetadata, 'slug'>;

      if (metadata.draft) {
        return null;
      }

      return {
        ...metadata,
        slug,
      } as PostMetadata;
    })
    .filter((post): post is PostMetadata => !!post);

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

export function getPostsByTag(tag: string): PostMetadata[] {
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

export async function getPostHtml(slug: string): Promise<string | null> {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);
    const metadata = data as Omit<PostMetadata, 'slug'>;

    if (metadata.draft) {
        return null;
    }

    const file = await unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypePrettyCode, { theme: 'monokai', keepBackground: false })
      .use(rehypeStringify)
      .process(content)

    return String(file.value);
}