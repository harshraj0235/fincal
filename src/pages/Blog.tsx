import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, TrendingUp, BookOpen, DollarSign, Shield } from 'lucide-react';
import { blogPosts as oldPosts } from '../data/blogData';
import { blogPosts as newPosts } from '../data/blogData1';

const allBlogPosts = [...oldPosts, ...newPosts];

// Category icon mapping for visual navigation
const categoryIcons: Record<string, JSX.Element> = {
  'Investing': <TrendingUp className="h-4 w-4 mr-1 text-blue-600" />,
  'Tax': <DollarSign className="h-4 w-4 mr-1 text-green-600" />,
  'Personal Finance': <BookOpen className="h-4 w-4 mr-1 text-orange-600" />,
  'Government Schemes': <Shield className="h-4 w-4 mr-1 text-purple-600" />,
};

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(allBlogPosts.flatMap(post => post.categories))
  );

  // Filter posts based on search and category
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null ||
      post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">Finance Blog</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Expert insights, tips, and guides to help you make better financial decisions
        </p>
      </div>

      {/* Category Bar - horizontally scrollable on mobile */}
      <div className="mb-8 sticky top-[56px] z-[20] bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100">
        <div className="overflow-x-auto scrollbar-hide py-2">
          <div className="flex gap-3 px-2 w-max min-w-full">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center px-5 py-2.5 rounded-full font-semibold text-base whitespace-nowrap transition-all duration-200 border shadow-sm ${selectedCategory === null ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'}`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center px-5 py-2.5 rounded-full font-semibold text-base whitespace-nowrap transition-all duration-200 border shadow-sm ${selectedCategory === category ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'}`}
              >
                {categoryIcons[category] || <Tag className="h-5 w-5 mr-1 text-gray-400" />} {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white shadow"
            aria-label="Search Blog Articles"
          />
        </div>
      </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                <div className="h-44 sm:h-48 overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-neutral-500 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <User className="h-3 w-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-1 line-clamp-2">{post.title}</h3>
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

      {/* Google Discover/SEO structured data (optional, for main blog page) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          'name': 'Finance Blog',
          'description': 'Expert insights, tips, and guides to help you make better financial decisions',
          'url': 'https://yourdomain.com/blog',
          'blogPost': filteredPosts.slice(0, 10).map(post => ({
            '@type': 'BlogPosting',
            'headline': post.title,
            'image': post.coverImage,
            'author': { '@type': 'Person', 'name': post.author },
            'datePublished': post.date,
            'url': `https://yourdomain.com/blog/${post.slug}`
          }))
        })}
      </script>
    </div>
  );
};

export default Blog;
