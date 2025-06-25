import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, TrendingUp, BookOpen, DollarSign, Shield, MoreHorizontal } from 'lucide-react';
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

  // Get unique categories
  const categories = Array.from(
    new Set(allBlogPosts.flatMap((post: BlogPost) => post.categories))
  );
  const extraCategories = categories.filter(cat => !mainCategories.includes(cat));

  // Filter posts based on search and category
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ||
      post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="md:hidden min-h-screen flex flex-col bg-neutral-50">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md shadow mb-2">
        <div className="relative px-3 py-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-3 py-3 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white"
            aria-label="Search Blog Articles"
          />
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="flex-1 px-2 pb-20">
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
          <div className="grid grid-cols-1 gap-4 mt-2">
            {filteredPosts.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow flex flex-col h-full border border-neutral-100"
              >
                <div className="h-48 overflow-hidden border-b border-neutral-100">
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
      </div>

      {/* Bottom Navigation Bar for Categories */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200 flex justify-between items-center px-1 py-1 shadow-lg">
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
      {/* More Categories Modal */}
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
    </div>
  );
};

export default Blog;
