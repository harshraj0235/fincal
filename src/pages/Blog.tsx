import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Calendar, User, Tag, TrendingUp, BookOpen, DollarSign, Shield, MoreHorizontal, X
} from 'lucide-react';
import { blogPosts as oldPosts } from '../data/blogData';
import { blogPosts as newPosts } from '../data/blogData1';

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
  'All': <Tag className="h-5 w-5" />,
  'Investing': <TrendingUp className="h-5 w-5 text-blue-600" />,
  'Tax': <DollarSign className="h-5 w-5 text-green-600" />,
  'Personal Finance': <BookOpen className="h-5 w-5 text-orange-600" />,
  'Government Schemes': <Shield className="h-5 w-5 text-purple-600" />,
};

const mainCategories = ['All', 'Investing', 'Tax', 'Personal Finance', 'Government Schemes'];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showMore, setShowMore] = useState(false);

  // All unique categories
  const categories = Array.from(
    new Set(allBlogPosts.flatMap((post: BlogPost) => post.categories))
  );
  const extraCategories = categories.filter(cat => !mainCategories.includes(cat));

  const featuredPosts = allBlogPosts.slice(0, 3);

  // Filtering
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ||
      post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Search Bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm">
        <div className="flex items-center px-4 py-2">
          <Search className="text-neutral-400 h-5 w-5 absolute ml-2" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
            aria-label="Search Blog Articles"
          />
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="mb-2 md:mb-6 overflow-x-auto scrollbar-hide px-2 pt-2 -mx-2">
        <div className="flex gap-4">
          {featuredPosts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="min-w-[80vw] max-w-xs md:min-w-[320px] md:max-w-xs bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 border border-primary-100 hover:scale-105 transition-transform"
            >
              <img src={post.coverImage} alt={post.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <div className="flex items-center text-xs text-neutral-500 mb-1">
                  {post.categories.slice(0, 1).map(category => (
                    <span key={category} className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-100 text-primary-800 mr-2">
                      {categoryIcons[category] || <Tag className="h-3 w-3 mr-1" />} {category}
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

      {/* Category Navigation (mobile bottom nav, desktop sidebar) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 flex md:hidden justify-between items-center px-1 py-1 shadow">
        {mainCategories.map(cat => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setShowMore(false); }}
            className={`flex flex-col items-center flex-1 py-1 px-1 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'}`}
          >
            {categoryIcons[cat]}
            <span className="text-xs mt-0.5">{cat === 'All' ? 'All' : cat.split(' ')[0]}</span>
          </button>
        ))}
        <button
          onClick={() => setShowMore(!showMore)}
          className={`flex flex-col items-center flex-1 py-1 px-1 rounded-lg transition-colors ${showMore ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'}`}
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-xs mt-0.5">More</span>
        </button>
      </nav>

      {/* More Categories Modal (mobile) */}
      {showMore && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowMore(false)} />
          <div className="relative w-full bg-white rounded-t-2xl shadow-lg p-6 max-h-[60vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">More Categories</h2>
              <button onClick={() => setShowMore(false)} aria-label="Close">
                <X className="h-6 w-6" />
              </button>
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

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r border-neutral-200 bg-white/95 backdrop-blur-md sticky top-0 h-screen z-10">
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
              </li>
            )}
          </ul>
        </div>
      </aside>

      {/* Blog posts grid */}
      <main className="flex-1 px-2 md:px-6 pb-20 md:pb-8 md:ml-60">
        {filteredPosts.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {filteredPosts.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow flex flex-col h-full border border-neutral-100 group"
              >
                <div className="h-40 overflow-hidden border-b border-neutral-100 group-hover:scale-105 transition-transform">
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
      </main>
    </div>
  );
};

export default Blog;
