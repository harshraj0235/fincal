import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';

const NewsHomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = selectedCategory === 'all'
    ? contentRegistry
    : contentRegistry.filter(article => article.category === selectedCategory);

  const featuredArticle = contentRegistry[0];
  const recentArticles = contentRegistry.slice(1);

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEOHelmet
        title="Financial News & Market Analysis | MoneyCal"
        description="Latest financial news, market analysis, IPO updates, and economic insights. Expert coverage of Indian markets, startups, and business trends."
        keywords="financial news, market analysis, IPO news, economy news, business news, startup news"
        url="/news"
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <TrendingUp className="h-6 w-6 text-yellow-300" />
              <span className="font-semibold text-blue-100">Breaking Financial News</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              MoneyCal News Hub
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Expert financial analysis, IPO coverage, market insights, and economic trends - All in one place
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-3xl font-bold">{contentRegistry.length}</div>
                <div className="text-sm text-blue-100">Articles</div>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-3xl font-bold">{newsCategories.length}</div>
                <div className="text-sm text-blue-100">Categories</div>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-3xl font-bold">{teamProfiles.length}</div>
                <div className="text-sm text-blue-100">Expert Writers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All News
            </button>
            {newsCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {selectedCategory === 'all' && featuredArticle && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-primary-600 to-purple-600 rounded"></div>
              Featured Story
            </h2>
          </div>
          <Link
            to={`/news/${featuredArticle.category}/${featuredArticle.slug}`}
            className="block bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all border-2 border-neutral-200 hover:border-primary-400 group"
          >
            <div className="md:flex">
              <div className="md:w-1/2 relative overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full min-h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Featured+Article';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-5 py-2.5 bg-red-600 text-white rounded-full font-bold text-sm shadow-xl animate-pulse">
                    🔥 FEATURED
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full font-bold text-sm shadow-md">
                    {newsCategories.find(c => c.slug === featuredArticle.category)?.name || featuredArticle.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight group-hover:text-primary-600 transition-colors">
                  {featuredArticle.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-700 mb-6 pb-6 border-b border-neutral-200">
                  <div className="flex items-center gap-2 font-bold">
                    <Calendar className="h-4 w-4 text-primary-600" />
                    <span className="text-base">{new Date(featuredArticle.datePublished).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <span className="text-neutral-400 font-bold">•</span>
                  <span className="font-bold text-primary-600 text-base">
                    {teamProfiles.find(p => p.id === featuredArticle.authorId)?.name}
                  </span>
                </div>
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl group-hover:from-primary-700 group-hover:to-purple-700 transition-all font-bold text-lg shadow-lg group-hover:shadow-xl">
                  <span>Read Full Story</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-neutral-50">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gradient-to-b from-primary-600 to-purple-600 rounded"></div>
            <h2 className="text-3xl font-bold text-neutral-900">
              {selectedCategory === 'all' ? 'Latest Articles' : newsCategories.find(c => c.slug === selectedCategory)?.name}
            </h2>
          </div>
          <p className="text-lg text-neutral-600 ml-5">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} • Updated daily
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const author = teamProfiles.find(p => p.id === article.authorId);
            const category = newsCategories.find(c => c.slug === article.category);

            return (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 border border-neutral-200 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=News';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full text-xs font-bold shadow-lg">
                      {category?.name || article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4 leading-snug group-hover:text-primary-600 transition-colors min-h-[3.5rem]">
                    {article.title}
                  </h3>
                  
                  {/* Author Info */}
                  <div 
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/news/author/${article.authorId}`;
                    }}
                    className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors mb-4 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                      {author?.name.split(' ').map(n => n[0]).join('') || 'MC'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-neutral-900 text-sm">{author?.name || 'MoneyCal Team'}</div>
                      <div className="text-xs text-neutral-600 font-medium">{author?.role || 'Writer'}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-neutral-600 mb-4 font-semibold">
                    <Calendar className="h-4 w-4 text-primary-600" />
                    <span>{new Date(article.datePublished).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg group-hover:from-primary-700 group-hover:to-purple-700 transition-all font-bold shadow-md group-hover:shadow-lg">
                    <span>Read Full Article</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-neutral-600">No articles found in this category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 text-primary-600 hover:text-primary-800 font-semibold"
            >
              View All Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsHomePage;

