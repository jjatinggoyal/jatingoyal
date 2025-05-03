import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
  theme: 'nord',
  keepBackground: true,
  defaultLang: 'plaintext',
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  output: 'export',
};

export default withMDX(nextConfig); 