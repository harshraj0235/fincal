import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, TrendingUp, BookOpen, DollarSign, Shield, X } from 'lucide-react';
import { blogPosts as oldPosts } from '../data/blogData';
import { blogPosts as newPosts } from '../data/blogData1';

// Define BlogPost type for stricter typing
interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  categories: string[];
}

const allBlogPosts: BlogPost[] = [...oldPosts, ...newPosts];

// Category icon mapping for visual navigation
const categoryIcons: Record<string, JSX.Element> = {
  'Investing': <TrendingUp className="h-4 w-4 mr-1 text-blue-600" />,
  'Tax': <DollarSign className="h-4 w-4 mr-1 text-green-600" />,
  'Personal Finance': <BookOpen className="h-4 w-4 mr-1 text-orange-600" />,
  'Government Schemes': <Shield className="h-4 w-4 mr-1 text-purple-600" />,
};

const getFeaturedPosts = (posts: BlogPost[]): BlogPost[] => posts.slice(0, 3);

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Get unique categories
  const categories = Array.from(
    new Set(allBlogPosts.flatMap((post: BlogPost) => post.categories))
  );

  // Count posts per category
  const categoryCounts: Record<string, number> = {};
  allBlogPosts.forEach((post: BlogPost) => {
    post.categories.forEach((cat: string) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });

  // Filter posts based on search and category
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null ||
      post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = getFeaturedPosts(filteredPosts);
  const restPosts = filteredPosts.slice(featuredPosts.length);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 flex flex-col md:flex-row gap-6">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-left font-medium transition-colors ${selectedCategory === null ? 'bg-primary-600 text-white' : 'hover:bg-neutral-100 text-neutral-800'}`}
              >
                <Tag className="h-4 w-4 mr-2" /> All
                <span className="ml-auto text-xs bg-neutral-200 rounded px-2 py-0.5">{allBlogPosts.length}</span>
              </button>
            </li>
            {categories.map((category: string) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-left font-medium transition-colors ${selectedCategory === category ? 'bg-primary-600 text-white' : 'hover:bg-neutral-100 text-neutral-800'}`}
                >
                  {categoryIcons[category] || <Tag className="h-4 w-4 mr-2 text-gray-400" />} {category}
                  <span className="ml-auto text-xs bg-neutral-200 rounded px-2 py-0.5">{categoryCounts[category]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Finance Blog</h1>
          {/* Mobile: Floating Categories Button */}
          <button
            className="md:hidden flex items-center px-4 py-2 rounded-full bg-primary-600 text-white font-semibold shadow-lg fixed bottom-6 right-6 z-30"
            onClick={() => setShowCategoryModal(true)}
            aria-label="Show Categories"
          >
            <Tag className="h-5 w-5 mr-2" /> Categories
          </button>
        </div>

        {/* Sticky Search Bar (mobile) */}
        <div className="sticky top-2 z-20 bg-white/95 backdrop-blur-md rounded-lg shadow mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
              aria-label="Search Blog Articles"
            />
          </div>
        </div>

        {/* Featured Posts Carousel */}
        {featuredPosts.length > 0 && (
          <div className="mb-6">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2">
              {featuredPosts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="min-w-[85vw] sm:min-w-[350px] max-w-[95vw] sm:max-w-xs bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-lg overflow-hidden flex-shrink-0 border border-primary-100"
                >
                  <div className="h-40 sm:h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-xs text-neutral-500 mb-1">
                      {post.categories.slice(0, 1).map((category: string) => (
                        <span key={category} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mr-2">
                          {categoryIcons[category] || <Tag className="h-3 w-3 mr-1 text-gray-400" />} {category}
                        </span>
                      ))}
                      <span className="ml-auto flex items-center"><Calendar className="h-3 w-3 mr-1" />{post.date}</span>
                    </div>
                    <h2 className="text-lg font-bold text-neutral-900 mb-1 line-clamp-2">{post.title}</h2>
                    <p className="text-neutral-600 text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog posts grid */}
        <div className="min-h-[300px]">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <p className="text-lg text-neutral-600">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {restPosts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow flex flex-col h-full border border-neutral-100"
                >
                  <div className="h-32 sm:h-44 overflow-hidden border-b border-neutral-100">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-neutral-500 mb-1 sm:mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                      <span className="mx-1 sm:mx-2">•</span>
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900 mb-1 line-clamp-2">{post.title}</h3>
                    <p className="text-neutral-600 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
                      {post.categories.slice(0, 2).map((category: string) => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {categoryIcons[category] || <Tag className="h-3 w-3 mr-1 text-gray-400" />} {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-40 flex items-end md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCategoryModal(false)} />
          <div className="relative w-full bg-white rounded-t-2xl shadow-lg p-6 max-h-[70vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Categories</h2>
              <button onClick={() => setShowCategoryModal(false)} aria-label="Close"><X className="h-6 w-6" /></button>
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setSelectedCategory(null); setShowCategoryModal(false); }}
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-left font-medium transition-colors ${selectedCategory === null ? 'bg-primary-600 text-white' : 'hover:bg-neutral-100 text-neutral-800'}`}
                >
                  <Tag className="h-4 w-4 mr-2" /> All
                  <span className="ml-auto text-xs bg-neutral-200 rounded px-2 py-0.5">{allBlogPosts.length}</span>
                </button>
              </li>
              {categories.map((category: string) => (
                <li key={category}>
                  <button
                    onClick={() => { setSelectedCategory(category); setShowCategoryModal(false); }}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-left font-medium transition-colors ${selectedCategory === category ? 'bg-primary-600 text-white' : 'hover:bg-neutral-100 text-neutral-800'}`}
                  >
                    {categoryIcons[category] || <Tag className="h-4 w-4 mr-2 text-gray-400" />} {category}
                    <span className="ml-auto text-xs bg-neutral-200 rounded px-2 py-0.5">{categoryCounts[category]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
