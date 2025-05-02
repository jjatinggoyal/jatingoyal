interface FrontMatter {
  title: string;
  subtitle?: string;
  date: string;
  coverImage?: string;
  tags?: string[];
}

export interface BlogPost {
  slug: string;
  frontmatter: FrontMatter;
  content: string;
}

function parseFrontMatter(content: string): { frontmatter: FrontMatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const matches = content.match(frontmatterRegex);

  if (!matches) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatterYaml, markdownContent] = matches;
  const frontmatterLines = frontmatterYaml.trim().split('\n');
  const frontmatter: Record<string, any> = {};

  frontmatterLines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const trimmedKey = key.trim();
      let value = valueParts.join(':').trim();
      
      // Remove quotes if they exist
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays in YAML format
      if (trimmedKey === 'tags' && value.startsWith('[') && value.endsWith(']')) {
        frontmatter[trimmedKey] = value
          .slice(1, -1)
          .split(',')
          .map(v => v.trim().replace(/"/g, ''));
      } else {
        frontmatter[trimmedKey] = value;
      }
    }
  });

  return {
    frontmatter: frontmatter as FrontMatter,
    content: markdownContent.trim()
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const modules = import.meta.glob<string>('../blogs/*.md', { as: 'raw', eager: true });

  return Object.entries(modules).map(([filepath, content]) => {
    const { frontmatter, content: markdownContent } = parseFrontMatter(content);
    return {
      slug: filepath.replace('../blogs/', '').replace('.md', ''),
      frontmatter,
      content: markdownContent
    };
  }).sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export interface SearchResult {
  title: string;
  subtitle?: string;
  slug: string;
  preview: string;
  date: string;
  tags?: string[];
}

export async function searchBlogPosts(query: string): Promise<SearchResult[]> {
  const posts = await getBlogPosts();
  const searchTerm = query.toLowerCase();
  
  return posts
    .filter(post => {
      const titleMatch = post.frontmatter.title.toLowerCase().includes(searchTerm);
      const subtitleMatch = post.frontmatter.subtitle?.toLowerCase().includes(searchTerm);
      const contentMatch = post.content.toLowerCase().includes(searchTerm);
      const tagsMatch = post.frontmatter.tags?.some(tag => 
        tag.toLowerCase().includes(searchTerm)
      );
      
      return titleMatch || subtitleMatch || contentMatch || tagsMatch;
    })
    .map(post => {
      let preview = '';
      const content = post.content.toLowerCase();
      const searchIndex = content.indexOf(searchTerm);
      
      // If found in content, show context around the match
      if (searchIndex !== -1) {
        const contextStart = Math.max(0, searchIndex - 75);
        const contextEnd = Math.min(post.content.length, searchIndex + searchTerm.length + 75);
        preview = post.content.slice(contextStart, contextEnd);
        
        // Add ellipsis if we're not at the start/end
        if (contextStart > 0) preview = '...' + preview;
        if (contextEnd < post.content.length) preview = preview + '...';
      } else {
        // Fallback to first 150 chars if match is in title/subtitle/tags
        preview = post.content.slice(0, 150) + '...';
      }

      return {
        title: post.frontmatter.title,
        subtitle: post.frontmatter.subtitle,
        slug: post.slug,
        preview,
        date: post.frontmatter.date,
        tags: post.frontmatter.tags
      };
    });
}

export interface AdjacentPosts {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export async function getAdjacentPosts(currentSlug: string): Promise<AdjacentPosts> {
  const posts = await getBlogPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  };
}