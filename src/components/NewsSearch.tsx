import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Calendar, User, FileText, TrendingUp, Filter } from 'lucide-react';
import { contentRegistry } from '../cms-content/contentRegistry';
import { newsCategories } from '../data/newsCategories';
import { teamProfiles } from '../data/teamProfiles';
import { formatStaticShortDate } from '../utils/randomCalculators';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  type: 'news' | 'blog';
  category?: string;
  author?: string;
  date?: string;
  excerpt?: string;
  image?: string;
}

const NewsSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function
  const performSearch = (searchQuery: string, category: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().trim().split(' ');
    const newsResults: SearchResult[] = [];

    // Search news articles
    contentRegistry.forEach(article => {
      const titleMatch = searchTerms.some(term => 
        article.title.toLowerCase().includes(term)
      );
      const categoryMatch = category === 'all' || article.category === category;
      
      if (titleMatch && categoryMatch) {
        const author = teamProfiles.find(p => p.id === article.authorId);
        const cat = newsCategories.find(c => c.slug === article.category);
        
        newsResults.push({
          id: article.id,
          title: article.title,
          url: `/news/${article.category}/${article.slug}`,
          type: 'news',
          category: cat?.name || article.category,
          author: author?.name || 'MoneyCal Team',
          date: article.datePublished,
          image: article.image
        });
      }
    });

    // Sort by relevance (title match strength)
    newsResults.sort((a, b) => {
      const aScore = searchTerms.filter(term => a.title.toLowerCase().includes(term)).length;
      const bScore = searchTerms.filter(term => b.title.toLowerCase().includes(term)).length;
      return bScore - aScore;
    });

    setResults(newsResults.slice(0, 10)); // Limit to 10 results
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    performSearch(value, selectedCategory);
  };

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    performSearch(query, category);
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearchChange}
            onFocus={() => query && setIsOpen(true)}
            placeholder="Search news articles, topics, authors..."
            className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-3 sm:py-4 text-base sm:text-lg bg-white border-2 border-neutral-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none shadow-lg hover:shadow-xl"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-4 p-1 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-400 hover:text-neutral-600" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Filter className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            All
          </button>
          {newsCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === category.slug
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Dropdown - Enhanced UI No Overlap */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl border-2 border-blue-200 max-h-[500px] overflow-y-auto z-[9999] backdrop-blur-sm">
          <div className="p-3 sm:p-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm font-semibold text-neutral-600">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                Close
              </button>
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {results.map((result) => (
              <Link
                key={result.id}
                to={result.url}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="block p-3 sm:p-4 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex gap-3 sm:gap-4">
                  {/* Thumbnail */}
                  {result.image && (
                    <div className="flex-shrink-0">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-blue-700 transition-colors mb-1 sm:mb-2 line-clamp-2">
                      {result.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-600">
                      {result.category && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-semibold">
                          <TrendingUp className="h-3 w-3" />
                          {result.category}
                        </span>
                      )}
                      {result.author && (
                        <span className="inline-flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {result.author}
                        </span>
                      )}
                      {result.date && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatStaticShortDate(result.date)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-3 sm:p-4 bg-neutral-50 border-t border-neutral-200">
            <p className="text-xs sm:text-sm text-neutral-600 text-center">
              Press <kbd className="px-2 py-1 bg-white border border-neutral-300 rounded text-xs font-mono">ESC</kbd> to close
            </p>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl border-2 border-blue-200 p-8 sm:p-12 z-[9999]">
          <div className="text-center">
            <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">No results found</h3>
            <p className="text-sm sm:text-base text-neutral-600 mb-4">
              Try different keywords or browse our categories
            </p>
            <button
              onClick={clearSearch}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSearch;

