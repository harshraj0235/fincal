// src/pages/Excel.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { ExcelPost } from '../data/exceldata';

const Excel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(blogPosts.flatMap(post => post.categories))
  );

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === null ||
      post.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Excel Tool Blog</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Tips, tricks, and guides to supercharge your Excel workflow, tailored for finance professionals.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 space-y-6">
          {/* Search */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                  selectedCategory === null
                    ? 'bg-primary-100 text-primary-800 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                    selectedCategory === category
                      ? 'bg-primary-100 text-primary-800 font-medium'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Excel Templates</h3>
            <p className="text-sm text-primary-700 mb-3">
              Download ready-to-use Excel templates for budgeting, analysis, and more.
            </p>
            <Link
              to="/excel/templates"
              className="text-sm font-medium text-primary-700 hover:text-primary-800 flex items-center"
            >
              View templates
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="w-full md:w-2/3 lg:w-3/4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <Link
                  key={post.id}
                  to={`/excel/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-xs text-neutral-500 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-neutral-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map(category => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination (static - for demo) */}
          {filteredPosts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a href="#" className="px-4 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  Previous
                </a>
                <a href="#" className="px-4 py-2 border-t border-b border-neutral-300 bg-white text-sm font-medium text-primary-600 hover:bg-primary-50">
                  1
                </a>
                <a href="#" className="px-4 py-2 border-t border-b border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  2
                </a>
                <a href="#" className="px-4 py-2 border-t border-b border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  3
                </a>
                <a href="#" className="px-4 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  Next
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Excel;
