import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, TrendingUp, BookOpen, DollarSign, Shield, MoreHorizontal, Home, Grid, Filter, ChevronDown } from 'lucide-react';
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

const categoryIcons: Record<string, JSX.Element> = {
  'All': <Tag className="h-5 w-5" />, // for bottom nav
  'Investing': <TrendingUp className="h-5 w-5 text-blue-600" />,
  'Tax': <DollarSign className="h-5 w-5 text-green-600" />,
  'Personal Finance': <BookOpen className="h-5 w-5 text-orange-600" />,
  'Government Schemes': <Shield className="h-5 w-5 text-purple-600" />,
};

const mainCategories = ['All', 'Investing', 'Tax', 'Personal Finance', 'Government Schemes'];

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showMore, setShowMore] = useState(false);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [visibleCount, setVisibleCount] = useState(9);

  // Get unique categories
  const categories = Array.from(
    new Set(allBlogPosts.flatMap((post: BlogPost) => post.categories))
  );
  const extraCategories = categories.filter(cat => !mainCategories.includes(cat));

  // Sort posts
  let sortedPosts = [...allBlogPosts];
  if (sortBy === 'latest') {
    sortedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } // else: could add popularity logic

  // Filter posts based on search and category
  const filteredPosts = sortedPosts.filter(post => {
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ||
      post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // For infinite scroll / load more
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-neutral-50">
      {/* Sidebar for tablet/desktop */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-neutral-200 bg-white/95 backdrop-blur-md sticky top-0 h-screen z-10">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {mainCategories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => { setSelectedCategory(cat); setShowMore(false); }}
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-left font-medium transition-colors ${selectedCategory === cat ? 'bg-primary-100 text-primary-700' : 'text-neutral-700 hover:bg-neutral-100'}`}
                >
                  {categoryIcons[cat]}
                  <span className="ml-2">{cat}</span>
                </button>
              </li>
            ))}
            {extraCategories.length > 0 && (
              <li>
                <button
                  onClick={() => setShowMore(!showMore)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-left font-medium transition-colors ${showMore ? 'bg-primary-100 text-primary-700' : 'text-neutral-700 hover:bg-neutral-100'}`}
                >
                  <MoreHorizontal className="h-5 w-5 mr-2" /> More
                </button>
                {showMore && (
                  <ul className="mt-2 space-y-1">
                    {extraCategories.map(category => (
                      <li key={category}>
                        <button
                          onClick={() => { setSelectedCategory(category); setShowMore(false); }}
                          className={`flex items-center w-full px-3 py-2 rounded-lg text-left font-medium transition-colors ${selectedCategory === category ? 'bg-primary-600 text-white' : 'hover:bg-neutral-100 text-neutral-800'}`}
                        >
                          {categoryIcons[category] || <Tag className="h-4 w-4 mr-2 text-gray-400" />} {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Hero/Intro Section */}
        <section className="relative bg-gradient-to-br from-primary-100 to-primary-50 py-8 px-4 sm:px-8 mb-4 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-2">Discover Financial Wisdom</h1>
          <p className="text-lg text-primary-800 mb-4 max-w-xl mx-auto">Expert insights, tips, and guides to help you make better financial decisions. Browse by category, search, or explore our latest posts.</p>
          <div className="relative w-full max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-3 py-3 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white shadow"
              aria-label="Search Blog Articles"
            />
          </div>
        </section>

        {/* Category Chips (mobile/tablet) */}
        <div className="md:hidden sticky top-0 z-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 mb-2">
          <div className="overflow-x-auto scrollbar-hide py-2 px-2 flex gap-2 w-max min-w-full">
            {mainCategories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setShowMore(false); }}
                className={`flex items-center px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 border shadow-sm ${selectedCategory === cat ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'}`}
              >
                {categoryIcons[cat]}
                <span className="ml-1">{cat}</span>
              </button>
            ))}
            <button
              onClick={() => setShowMore(!showMore)}
              className={`flex items-center px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 border shadow-sm ${showMore ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'}`}
            >
              <MoreHorizontal className="h-5 w-5 mr-1" /> More
            </button>
          </div>
        </div>
        {/* More Categories Modal (mobile only) */}
        {showMore && (
          <div className="fixed inset-0 z-40 flex items-end md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowMore(false)} />
            <div className="relative w-full bg-white rounded-t-2xl shadow-lg p-6 max-h-[60vh] overflow-y-auto animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">More Categories</h2>
                <button onClick={() => setShowMore(false)} aria-label="Close"><Tag className="h-6 w-6" /></button>
              </div>
              <ul className="space-y-2">
                {extraCategories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => { setSelectedCategory(category); setShowMore(false); }}
                      className={`flex items-center w-full px-3 py-2 rounded-lg text-left font-medium transition-colors ${selectedCategory === category ? 'bg-primary-600 text-white' : 'hover:bg-neutral-100 text-neutral-800'}`}
                    >
                      {categoryIcons[category] || <Tag className="h-4 w-4 mr-2 text-gray-400" />} {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-8 mb-4">
          <div className="flex items-center gap-2">
            <button className="flex items-center px-3 py-2 rounded-lg bg-primary-100 text-primary-700 font-medium text-sm shadow hover:bg-primary-200 transition-colors">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </button>
            <div className="relative">
              <button
                onClick={() => setSortBy(sortBy === 'latest' ? 'popular' : 'latest')}
                className="flex items-center px-3 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-700 font-medium text-sm shadow hover:bg-neutral-100 transition-colors"
              >
                <Grid className="h-4 w-4 mr-1" />
                Sort: {sortBy === 'latest' ? 'Latest' : 'Popular'}
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          <span className="text-xs text-neutral-500">{filteredPosts.length} articles</span>
        </div>

        {/* Blog posts grid */}
        <div className="flex-1 px-2 md:px-6 pb-20 md:pb-8">
          {visiblePosts.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50 rounded-lg mt-8">
              <p className="text-lg text-neutral-600">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {visiblePosts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow flex flex-col h-full border border-neutral-100 group animate-fade-in"
                >
                  <div className="h-48 overflow-hidden border-b border-neutral-100 group-hover:scale-105 transition-transform">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-neutral-500 mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-base font-semibold text-neutral-900 mb-1 line-clamp-2">{post.title}</h3>
                    <p className="text-neutral-600 text-sm mb-2 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.categories.slice(0, 2).map(category => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
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
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount(visibleCount + 9)}
                className="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation Bar for Categories (mobile only) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200 flex justify-between items-center px-1 py-1 shadow-lg">
          <Link to="/" className="flex flex-col items-center flex-1 py-1 px-1 rounded-lg transition-colors text-neutral-700">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-0.5">Home</span>
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center flex-1 py-1 px-1 rounded-lg transition-colors text-neutral-700"
          >
            <Grid className="h-5 w-5" />
            <span className="text-xs mt-0.5">Top</span>
          </button>
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-col items-center flex-1 py-1 px-1 rounded-lg transition-colors ${showMore ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'}`}
          >
            <Filter className="h-5 w-5" />
            <span className="text-xs mt-0.5">Filter</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default Blog;
