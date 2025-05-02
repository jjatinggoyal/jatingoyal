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