// src/pages/ExcelTool.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { excelToolBlogPosts } from '../data/exceltooldata';

const ExcelTool: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(excelToolBlogPosts.flatMap(post => post.categories)));

  const filteredPosts = excelToolBlogPosts.filter(post => {
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Excel Tool</h1>
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input"
        />
        <select
          value={selectedCategory ?? ''}
          onChange={e => setSelectedCategory(e.target.value || null)}
          className="input"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map(post => (
          <Link key={post.id} to={`/exceltool/${post.slug}`} className="block bg-white shadow p-4 rounded">
            <img src={post.coverImage} alt={post.title} className="w-full h-40 object-cover rounded mb-3" />
            <div className="text-xs text-gray-500 flex gap-2 mb-2">
              <Calendar className="h-3 w-3" /> {post.date}
              <User className="h-3 w-3" /> {post.author}
            </div>
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.categories.map(cat => (
                <span key={cat} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs flex items-center">
                  <Tag className="h-3 w-3 mr-1" />{cat}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <div>No articles found.</div>
        )}
      </div>
    </div>
  );
};

export default ExcelTool;
