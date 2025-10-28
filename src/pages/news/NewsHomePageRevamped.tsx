import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Flame,
  Clock,
  Eye,
  ArrowRight,
  Search,
  Filter,
  Grid,
  List,
  Calendar
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { articleRegistry, getFeaturedArticles, getTrendingArticles, getArticlesByCategory } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { getAuthorById } from '../../data/teamProfiles';

const NewsHomePageRevamped: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const featuredArticles = getFeaturedArticles();
  const trendingArticles = getTrendingArticles();

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHelmet
        title="Latest Finance News India | मनीकैल न्यूज़ - Markets, IPO, Economy Updates"
        description="Breaking finance news, market updates, IPO analysis, and economic policy coverage in Hindi. Your trusted source for Indian financial news and insights."
        keywords="finance news india, market news hindi, IPO news, economy updates, lenskart ipo, stock market today"
        url="/news"
      />

      {/* Hero Section - Google News Style */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">मनीकैल न्यूज़</h1>
              <p className="text-xl text-white/90">MoneyCal News - India's Financial Intelligence Hub</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-lg">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleString('hi-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search finance news... (खोजें)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Category Pills - Horizontal Scroll */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              🏠 All News
            </button>
            {newsCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? `bg-${cat.color}-600 text-white`
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.icon} {cat.nameHindi}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Stories Section - Google News Style */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-neutral-900">Featured Stories | मुख्य समाचार</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Featured Article - Large Card */}
          {featuredArticles[0] && (
            <Link
              to={`/news/${featuredArticles[0].category}/${featuredArticles[0].slug}`}
              className="block mb-6 group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image Placeholder */}
                  <div className="relative h-64 md:h-auto bg-gradient-to-br from-primary-600 to-blue-600 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <div className="text-6xl mb-4">📰</div>
                      <p className="text-sm opacity-80">Featured Image</p>
                      <p className="text-xs mt-2">Add from Pexels/Unsplash</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        FEATURED
                      </span>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold">
                        {featuredArticles[0].subcategory.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {featuredArticles[0].titleHindi}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-2">
                      {featuredArticles[0].title}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredArticles[0].readTime} min read
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredArticles[0].publishDate).toLocaleDateString('hi-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Other Featured Articles - Grid */}
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {featuredArticles.slice(1, 4).map((article, index) => (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="block group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all h-full">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <p className="text-xs opacity-80">Article {index + 2}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span className={`inline-block px-3 py-1 bg-${article.category === 'markets' ? 'green' : 'blue'}-100 text-${article.category === 'markets' ? 'green' : 'blue'}-700 rounded-full text-xs font-bold mb-2`}>
                      {article.subcategory.replace('-', ' ').toUpperCase()}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {article.titleHindi}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 mt-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {Math.floor(Math.random() * 5000) + 1000}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <div className="my-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-neutral-900">Trending Now | ट्रेंडिंग समाचार</h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              {trendingArticles.slice(0, 10).map((article, index) => {
                const author = getAuthorById(article.author);
                return (
                  <Link
                    key={article.id}
                    to={`/news/${article.category}/${article.slug}`}
                    className="flex gap-4 p-4 hover:bg-neutral-50 rounded-lg transition-all group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-neutral-900 group-hover:text-primary-600 line-clamp-2 mb-1">
                        {article.titleHindi}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span>{author?.nameHindi || author?.name}</span>
                        <span>•</span>
                        <span>{article.readTime} min read</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-neutral-100 rounded">
                          {article.subcategory.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Sections - Google News Style */}
        {newsCategories.map(category => {
          const categoryArticles = getArticlesByCategory(category.slug).slice(0, 4);
          if (categoryArticles.length === 0) return null;

          return (
            <div key={category.id} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <Link
                  to={`/news/${category.slug}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {category.nameHindi}
                  </h2>
                  <ArrowRight className="h-5 w-5 text-neutral-400" />
                </Link>
                <Link
                  to={`/news/${category.slug}`}
                  className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                >
                  View All →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryArticles.map(article => {
                  const author = getAuthorById(article.author);
                  return (
                    <Link
                      key={article.id}
                      to={`/news/${article.category}/${article.slug}`}
                      className="block group"
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all h-full">
                        {/* Image Placeholder */}
                        <div className={`h-40 bg-gradient-to-br from-${category.color}-400 to-${category.color}-600 flex items-center justify-center`}>
                          <div className="text-white text-center">
                            <div className="text-3xl mb-1">{category.icon}</div>
                            <p className="text-xs opacity-80">Image Here</p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <span className={`inline-block px-2 py-1 bg-${category.color}-100 text-${category.color}-700 rounded text-xs font-bold mb-2`}>
                            {article.subcategory.replace('-', ' ').toUpperCase()}
                          </span>
                          <h3 className="font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm">
                            {article.titleHindi}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-neutral-500 mt-3">
                            <span className="truncate">{author?.nameHindi}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.readTime}m
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Quick Stats */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-1">{articleRegistry.length}</div>
              <div className="text-white/80">Total Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">9</div>
              <div className="text-white/80">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">113+</div>
              <div className="text-white/80">Free Calculators</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">4</div>
              <div className="text-white/80">Expert Writers</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/calculators"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-neutral-100 transition-all font-semibold"
            >
              Explore 113+ Financial Calculators
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsHomePageRevamped;

