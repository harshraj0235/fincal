import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Building, 
  Rocket, 
  Smartphone,
  Wallet,
  FileText,
  Calculator,
  MapPin,
  Flame,
  ArrowRight,
  Calendar,
  Clock,
  Eye
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { newsCategories, getFeaturedCategories } from '../../data/newsCategories';

const iconMap: Record<string, any> = {
  TrendingUp,
  Building,
  Rocket,
  Smartphone,
  Wallet,
  FileText,
  Calculator,
  MapPin,
  Flame
};

const NewsHomePage: React.FC = () => {
  const featuredCategories = getFeaturedCategories();

  // Mock featured article - replace with actual featured content
  const featuredArticle = {
    id: 'featured-1',
    headline: 'Breaking: RBI Announces New Policy Rate Decision - Impact on Your EMI',
    excerpt: 'The Reserve Bank of India has maintained the repo rate at 6.5%, affecting home loans, personal loans, and savings rates across the country.',
    image: 'https://via.placeholder.com/1200x600',
    category: 'Economy & Policy',
    datePublished: new Date().toISOString(),
    author: { name: 'MoneyCal Editorial Team' },
    readTime: 5,
    views: 15420,
    trending: true
  };

  // Mock trending articles
  const trendingArticles = Array(6).fill(null).map((_, i) => ({
    id: `trending-${i}`,
    headline: `Trending Finance Story ${i + 1} - Breaking News Update`,
    excerpt: 'Quick update on latest financial developments affecting Indian markets and economy.',
    image: 'https://via.placeholder.com/400x250',
    category: 'Markets',
    datePublished: new Date().toISOString(),
    readTime: 3,
    views: 5000 + i * 500
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <SEOHelmet
        title="MoneyCal News - Latest Finance, Business & Economy Updates India"
        description="Stay updated with breaking finance news, market analysis, startup stories, economic policy updates, and personal finance tips from MoneyCal India's news portal."
        keywords="finance news india, business news, market updates, economy news, startup news, personal finance"
        url="/news"
        type="website"
      />

      {/* Hero - Featured Article */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-red-400" />
                <span className="text-red-200 font-semibold uppercase text-sm">Featured Story</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {featuredArticle.headline}
              </h1>
              <p className="text-xl text-white/90 mb-6">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-6 mb-6 text-white/80">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(featuredArticle.datePublished).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {featuredArticle.readTime} min read
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  {featuredArticle.views.toLocaleString()} views
                </div>
              </div>
              <Link
                to={`/news/markets/${featuredArticle.id}`}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Read Full Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.headline}
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsCategories.map((cat, index) => {
              const Icon = iconMap[cat.icon] || TrendingUp;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/news/${cat.slug}`}
                    className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border-l-4 border-transparent hover:border-primary-600"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-${cat.color}-100 rounded-lg`}>
                        <Icon className={`h-6 w-6 text-${cat.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">{cat.name}</h3>
                        <p className="text-neutral-600 text-sm mb-3">{cat.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {cat.subcategories.slice(0, 3).map(sub => (
                            <span 
                              key={sub.id}
                              className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded"
                            >
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Trending Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 flex items-center">
              <Flame className="h-8 w-8 text-red-500 mr-2" />
              Trending Now
            </h2>
            <Link to="/news/trending" className="text-primary-600 hover:text-primary-800 font-semibold">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div className="aspect-video">
                  <img src={article.image} alt={article.headline} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">
                    {article.headline}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime} min
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views.toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Call to Action - Connect News to Tools */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Make Informed Decisions with Our Tools</h2>
            <p className="text-xl text-white/90 mb-6">
              Use our comprehensive financial calculators to plan your investments based on the latest news and market trends.
            </p>
            <Link
              to="/calculators"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-bold hover:bg-blue-50 transition-colors text-lg"
            >
              Explore Calculators
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsHomePage;

