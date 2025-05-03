import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Alert from '@/components/blog/Alert';

// Helper function to check if a child is a block element
const isBlockElement = (child: React.ReactElement) => {
  const blockElements = ['div', 'pre', 'table', 'blockquote', 'ul', 'ol', 'figure', 'img'];
  return blockElements.includes(child.type as string);
};

// Wrapper component for MDX images
const MDXImage = ({ src, alt }: { src?: string; alt?: string }) => (
  <div className="my-8">
    <Image
      src={src || ''}
      alt={alt || ''}
      width={800}
      height={400}
      className="rounded-xl shadow-lg"
    />
  </div>
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-slate-800 dark:text-white mt-12 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-slate-800 dark:text-white mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold font-montserrat text-slate-800 dark:text-white mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => {
      // If children is a single element that's an image, render it directly
      if (React.isValidElement(children) && children.type === 'img') {
        return <MDXImage {...children.props} />;
      }

      // If children is a single element and it's a block element, return it directly
      if (React.isValidElement(children) && isBlockElement(children)) {
        return children;
      }

      // If children is an array and contains block elements, wrap non-block elements in spans
      if (Array.isArray(children)) {
        const hasBlockElement = children.some(
          child => React.isValidElement(child) && isBlockElement(child)
        );
        if (hasBlockElement) {
          return <>{children}</>;
        }
      }

      // Otherwise, wrap in p tag
      return (
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
          {children}
        </p>
      );
    },
    img: ({ src, alt }) => (
      <div className="my-8">
        <Image
          src={src || ''}
          alt={alt || ''}
          width={800}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </div>
    ),
    a: ({ href, children }) => (
      <Link 
        href={href || ''} 
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors underline underline-offset-2"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-lg text-slate-600 dark:text-slate-300 mb-6 space-y-2 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-lg text-slate-600 dark:text-slate-300 mb-6 space-y-2 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-lg leading-relaxed">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 my-8 italic text-slate-700 dark:text-slate-300">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      // For inline code
      if (!className) {
        return (
          <code className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-sm">
            {children}
          </code>
        );
      }
      
      // For code blocks
      const language = className.replace('language-', '');
      return (
        <div className="relative my-8 rounded-xl overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase bg-slate-900/5 dark:bg-slate-900/30 rounded-bl-xl">
            {language}
          </div>
          <pre className="p-4 bg-slate-900 dark:bg-slate-900/50 overflow-x-auto">
            <code className={`language-${language} text-sm leading-relaxed`}>
              {children}
            </code>
          </pre>
        </div>
      );
    },
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-slate-200 dark:border-slate-700 p-4 text-slate-700 dark:text-slate-300 font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-slate-200 dark:border-slate-800 p-4 text-slate-600 dark:text-slate-400">
        {children}
      </td>
    ),
    hr: () => (
      <hr className="my-8 border-t border-slate-200 dark:border-slate-800" />
    ),
    Alert: Alert,
    ...components,
  };
} 