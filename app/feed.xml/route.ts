import { getAllPosts, getPostHtml } from '@/lib/post';
import { Feed } from 'feed';

const SITE_URL = 'https://jatingoyal.com';

export async function GET() {
  const postsMetadata = getAllPosts();
  
  const feed = new Feed({
    title: "Jatin Goyal's Blog",
    description: 'A place to share my thoughts and learnings',
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}, Jatin Goyal`,
    feedLinks: {
      rss2: `${SITE_URL}/feed.xml`,
    },
    author: {
      name: 'Jatin Goyal',
    }
  });

  await Promise.all(postsMetadata.map(async (postMeta) => {
    const content = await getPostHtml(postMeta.slug);
    if (content) {
      feed.addItem({
        title: postMeta.title,
        id: `${SITE_URL}/posts/${postMeta.slug}`,
        link: `${SITE_URL}/posts/${postMeta.slug}`,
        description: postMeta.subtitle,
        content: content,
        image: postMeta.previewImage ? `${SITE_URL}${postMeta.previewImage}` : '',
        date: new Date(postMeta.date),
        author: [{
          name: postMeta.author,
        }],
      });
    }
  }));

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
