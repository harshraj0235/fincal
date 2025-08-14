import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsPortal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'business', name: 'Business', icon: '💼', color: 'bg-blue-500' },
    { id: 'money', name: 'Money', icon: '💰', color: 'bg-green-500' },
    { id: 'stock-market', name: 'Stock Market', icon: '📈', color: 'bg-red-500' },
    { id: 'technology', name: 'Technology', icon: '🚀', color: 'bg-purple-500' },
    { id: 'politics', name: 'Politics', icon: '🗳️', color: 'bg-orange-500' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'bg-pink-500' },
    { id: 'sports', name: 'Sports', icon: '⚽', color: 'bg-yellow-500' },
    { id: 'health', name: 'Health', icon: '🏥', color: 'bg-teal-500' },
    { id: 'education', name: 'Education', icon: '📚', color: 'bg-indigo-500' },
    { id: 'jobs', name: 'Jobs', icon: '💼', color: 'bg-gray-500' }
  ];

  const mockNews = [
    {
      id: 801,
      title: '🔥 Reliance Industries Q4 Results - What You Need to Know in 2025',
      excerpt: 'Complete analysis of Reliance Industries Q4 results with expert insights.',
      category: 'business',
      date: '2025-08-11',
      readTime: '8 min read'
    },
    {
      id: 802,
      title: '💰 Personal Finance Tips 2025 - Your Complete Financial Guide',
      excerpt: 'Comprehensive guide on personal finance with expert strategies.',
      category: 'money',
      date: '2025-08-11',
      readTime: '6 min read'
    },
    {
      id: 803,
      title: '📈 Nifty 50 Market Analysis - Market Analysis & Trading Tips',
      excerpt: 'In-depth analysis of Nifty 50 market performance and trading strategies.',
      category: 'stock-market',
      date: '2025-08-11',
      readTime: '7 min read'
    },
    {
      id: 804,
      title: '🚀 AI Development in India - Latest Tech Trends 2025',
      excerpt: 'Stay updated with AI development trends in Indian technology sector.',
      category: 'technology',
      date: '2025-08-11',
      readTime: '9 min read'
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? mockNews 
    : mockNews.filter(news => news.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">MoneyCal News</h1>
            <span className="text-sm text-gray-500">India's Premier News Portal</span>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 overflow-x-auto py-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📰 All News
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category.id ? `${category.color} text-white` : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* News Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {selectedCategory === 'all' ? 'Latest News' : `${categories.find(cat => cat.id === selectedCategory)?.name} News`}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div key={news.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  categories.find(cat => cat.id === news.category)?.color + ' text-white'
                }`}>
                  {categories.find(cat => cat.id === news.category)?.name}
                </span>
                <span className="text-sm text-gray-500">{news.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {news.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {news.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{news.date}</span>
                <Link 
                  to={`/blog/${news.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No news articles found for this category.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">MoneyCal News</h3>
          <p className="text-gray-300 mb-4">
            India's premier news portal delivering high-quality, SEO-optimized content.
          </p>
          <p className="text-sm text-gray-400">
            © 2025 MoneyCal India. Updated every 24 hours with fresh content.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NewsPortal;
