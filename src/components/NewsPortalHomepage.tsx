import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NewsCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  trending: boolean;
}

const NewsPortalHomepage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const newsCategories: NewsCategory[] = [
    {
      id: 'business',
      name: 'Business',
      icon: '💼',
      color: 'bg-blue-500',
      description: 'Latest business news, corporate updates, and market insights'
    },
    {
      id: 'money',
      name: 'Money',
      icon: '💰',
      color: 'bg-green-500',
      description: 'Personal finance, investment tips, and wealth management'
    },
    {
      id: 'stock-market',
      name: 'Stock Market',
      icon: '📈',
      color: 'bg-red-500',
      description: 'Market analysis, stock recommendations, and trading insights'
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: '🚀',
      color: 'bg-purple-500',
      description: 'Tech innovations, digital transformation, and startup news'
    },
    {
      id: 'politics',
      name: 'Politics',
      icon: '🗳️',
      color: 'bg-orange-500',
      description: 'Political updates, policy changes, and government news'
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: '🎬',
      color: 'bg-pink-500',
      description: 'Bollywood news, celebrity updates, and entertainment industry'
    },
    {
      id: 'sports',
      name: 'Sports',
      icon: '⚽',
      color: 'bg-yellow-500',
      description: 'Sports news, match updates, and athlete achievements'
    },
    {
      id: 'health',
      name: 'Health',
      icon: '🏥',
      color: 'bg-teal-500',
      description: 'Health tips, medical news, and wellness advice'
    },
    {
      id: 'education',
      name: 'Education',
      icon: '📚',
      color: 'bg-indigo-500',
      description: 'Educational updates, career guidance, and learning resources'
    },
    {
      id: 'jobs',
      name: 'Jobs',
      icon: '💼',
      color: 'bg-gray-500',
      description: 'Job opportunities, career tips, and employment news'
    }
  ];

  useEffect(() => {
    // Simulate loading news data
    setTimeout(() => {
      const mockNewsData: NewsItem[] = [
        {
          id: 801,
          title: '🔥 Reliance Industries Q4 Results - What You Need to Know in 2025',
          excerpt: 'Complete analysis of Reliance Industries Q4 results. Latest updates, market impact, expert insights, and future predictions for Indian business landscape.',
          category: 'business',
          date: '2025-08-11',
          readTime: '8 min read',
          featured: true,
          trending: true
        },
        {
          id: 802,
          title: '💰 Personal Finance Tips 2025 - Your Complete Financial Guide',
          excerpt: 'Comprehensive guide on personal finance tips. Expert tips, strategies, and actionable advice for better financial planning and wealth creation.',
          category: 'money',
          date: '2025-08-11',
          readTime: '6 min read',
          featured: true,
          trending: true
        },
        {
          id: 803,
          title: '📈 Nifty 50 Market Analysis - Market Analysis & Trading Tips',
          excerpt: 'In-depth analysis of Nifty 50 market performance. Market trends, technical analysis, expert recommendations, and trading strategies for Indian investors.',
          category: 'stock-market',
          date: '2025-08-11',
          readTime: '7 min read',
          featured: true,
          trending: true
        },
        {
          id: 804,
          title: '🚀 AI Development in India - Latest Tech Trends 2025',
          excerpt: 'Stay updated with AI development in India. Latest developments, innovation trends, and future predictions in Indian technology sector.',
          category: 'technology',
          date: '2025-08-11',
          readTime: '9 min read',
          featured: true,
          trending: true
        },
        {
          id: 805,
          title: '🗳️ Election Commission Updates - Political Analysis & Updates',
          excerpt: 'Get latest updates on Election Commission developments. Political analysis, policy implications, and expert opinions on Indian politics.',
          category: 'politics',
          date: '2025-08-11',
          readTime: '5 min read',
          featured: false,
          trending: true
        }
      ];
      setNewsData(mockNewsData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  const featuredNews = newsData.filter(news => news.featured);
  const trendingNews = newsData.filter(news => news.trending);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">MoneyCal News</h1>
              <span className="ml-2 text-sm text-gray-500">India's Premier News Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Last Updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>📰</span>
              <span>All News</span>
            </button>
            {newsCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category.id 
                    ? `${category.color} text-white` 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured News Section */}
        {selectedCategory === 'all' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">⭐</span>
              Featured News
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredNews.slice(0, 4).map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        newsCategories.find(cat => cat.id === news.category)?.color.replace('bg-', 'bg-') + ' text-white'
                      }`}>
                        {newsCategories.find(cat => cat.id === news.category)?.name}
                      </span>
                      <span className="text-sm text-gray-500">{news.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Trending News Section */}
        {selectedCategory === 'all' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">🔥</span>
              Trending Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingNews.slice(0, 6).map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        newsCategories.find(cat => cat.id === news.category)?.color.replace('bg-', 'bg-') + ' text-white'
                      }`}>
                        {newsCategories.find(cat => cat.id === news.category)?.name}
                      </span>
                      <span className="text-xs text-gray-500">{news.readTime}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{news.date}</span>
                      <Link 
                        to={`/blog/${news.id}`}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Category News Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">
              {selectedCategory === 'all' ? '📰' : newsCategories.find(cat => cat.id === selectedCategory)?.icon}
            </span>
            {selectedCategory === 'all' ? 'Latest News' : newsCategories.find(cat => cat.id === selectedCategory)?.name + ' News'}
          </h2>
          
          {selectedCategory !== 'all' && (
            <p className="text-gray-600 mb-6">
              {newsCategories.find(cat => cat.id === selectedCategory)?.description}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      newsCategories.find(cat => cat.id === news.category)?.color.replace('bg-', 'bg-') + ' text-white'
                    }`}>
                      {newsCategories.find(cat => cat.id === news.category)?.name}
                    </span>
                    <span className="text-sm text-gray-500">{news.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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
              </motion.div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No news articles found for this category.</p>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">MoneyCal News</h3>
            <p className="text-gray-300 mb-4">
              India's premier news portal delivering high-quality, SEO-optimized content across all major categories.
            </p>
            <p className="text-sm text-gray-400">
              © 2025 MoneyCal India. All rights reserved. | Updated every 24 hours with fresh content.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsPortalHomepage;
