import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { SearchResult, searchBlogPosts } from '../utils/blogUtils';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const HighlightText: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query.trim()) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const searchPosts = async () => {
      if (query) {
        setIsSearching(true);
        try {
          const searchResults = await searchBlogPosts(query);
          setResults(searchResults);
        } catch (error) {
          console.error('Search failed:', error);
          setResults([]);
        }
        setIsSearching(false);
      } else {
        setResults([]);
      }
    };

    const debounceTimer = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl mx-4 theme-card rounded-xl shadow-lg"
      >
        <div className="p-4 border-b theme-border flex items-center gap-3">
          <SearchIcon className="h-5 w-5 theme-text-tertiary" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search blog posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none theme-text-primary placeholder:theme-text-tertiary"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <X className="h-5 w-5 theme-text-tertiary" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {isSearching ? (
            <div className="p-8 text-center theme-text-secondary">
              Searching...
            </div>
          ) : results.length > 0 ? (
            results.map((result) => (
              <Link
                key={result.slug}
                to={`/blog/${result.slug}`}
                onClick={onClose}
                className="block p-4 hover:theme-bg-secondary rounded-lg transition-colors"
              >
                <h3 className="font-semibold theme-text-primary mb-1">
                  <HighlightText text={result.title} query={query} />
                </h3>
                {result.subtitle && (
                  <p className="text-sm theme-text-secondary mb-2">
                    <HighlightText text={result.subtitle} query={query} />
                  </p>
                )}
                <p className="text-sm theme-text-tertiary mb-2">
                  <HighlightText text={result.preview} query={query} />
                </p>
                {result.tags && (
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full theme-bg-tertiary theme-text-primary"
                      >
                        <HighlightText text={tag} query={query} />
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))
          ) : query && (
            <div className="p-8 text-center theme-text-secondary">
              No results found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;