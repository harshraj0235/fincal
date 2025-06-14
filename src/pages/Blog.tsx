import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Calendar, User, ArrowRight, Tag, TrendingUp, 
  Filter, Grid, List, BookOpen, Star, Clock, Eye, Share2
} from 'lucide-react';
import { blogPosts, blogCategories, getFeaturedPosts, getTrendingPosts, BlogPost, BlogCategory } from '../data/blogData';

export const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category') || null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'trending' | 'popular'>('latest');
  const [showFilters, setShowFilters] = useState(false);
  
  const featuredPosts = getFeaturedPosts();
  const trendingPosts = getTrendingPosts();
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, setSearchParams]);
  
  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = selectedCategory === null || 
      post.categories.some(cat => cat.toLowerCase().replace(/\s+/g, '-') === selectedCategory);
      
    return matchesSearch && matchesCategory;
  });
  
  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      case 'popular':
        return b.id - a.id; // Assuming higher ID means more popular
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  
  const handleCategorySelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">Financial Insights & Guides</h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
          Expert insights, comprehensive guides, and latest updates to help you make informed financial decisions. 
          Stay ahead with our in-depth analysis of government schemes, investment strategies, and tax planning.
        </p>
        
        {/* Quick Stats */}
        <div className="flex justify-center space-x-8 text-sm text-neutral-600 mb-8">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1 text-primary-600" />
            <span>{blogPosts.length}+ Articles</span>
          </div>
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-1 text-primary-600" />
            <span>{blogCategories.length}+ Categories</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1 text-primary-600" />
            <span>Expert Authors</span>
          </div>
        </div>
      </div>
      
      {/* Featured Posts */}
      {!searchTerm && !selectedCategory && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              Featured Articles
            </h2>
            <Link to="/blog?featured=true" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Main Featured Post */}
            {featuredPosts[0] && (
              <Link to={`/blog/${featuredPosts[0].slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-neutral-100">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={featuredPosts[0].coverImage} 
                      alt={featuredPosts[0].title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs text-neutral-500 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{featuredPosts[0].date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{featuredPosts[0].readTime}</span>
                      {featuredPosts[0].trending && (
                        <>
                          <span className="mx-2">•</span>
                          <TrendingUp className="h-3 w-3 mr-1 text-orange-500" />
                          <span className="text-orange-600">Trending</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-3">{featuredPosts[0].excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPosts[0].categories.slice(0, 3).map(category => (
                        <span 
                          key={category} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-neutral-300 overflow-hidden mr-3">
                          <img 
                            src={featuredPosts[0].authorImage || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"} 
                            alt={featuredPosts[0].author} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-900">{featuredPosts[0].author}</div>
                          <div className="text-xs text-neutral-500">{featuredPosts[0].authorTitle}</div>
                        </div>
                      </div>
                      <span className="text-primary-600 font-medium flex items-center">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
            
            {/* Secondary Featured Posts */}
            <div className="space-y-6">
              {featuredPosts.slice(1, 3).map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-neutral-100 flex">
                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex items-center text-xs text-neutral-500 mb-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1">
                        {post.categories.slice(0, 2).map(category => (
                          <span 
                            key={category} 
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Trending Posts */}
      {!searchTerm && !selectedCategory && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 flex items-center">
              <TrendingUp className="h-6 w-6 text-orange-500 mr-2" />
              Trending Now
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {trendingPosts.map((post, index) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-neutral-100">
                  <div className="h-32 overflow-hidden relative">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-xs text-neutral-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Search and Filters */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-100">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, guides, schemes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            {/* View Toggle and Sort */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'trending' | 'popular')}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="latest">Latest</option>
                <option value="trending">Trending</option>
                <option value="popular">Popular</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          {/* Active Filters */}
          {(searchTerm || selectedCategory) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  Category: {blogCategories.find(cat => cat.slug === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-neutral-600 hover:text-neutral-800 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className={`lg:w-1/4 space-y-8 ${showFilters || selectedCategory ? 'block' : 'hidden lg:block'}`}>
          {/* Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
            <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-primary-600" />
              All Categories
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <button
                onClick={() => handleCategorySelect(null)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedCategory === null 
                    ? 'bg-primary-100 text-primary-800 font-semibold border border-primary-200' 
                    : 'text-neutral-700 hover:bg-neutral-50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>All Categories</span>
                  <span className="text-sm text-neutral-500">{blogPosts.length}</span>
                </div>
              </button>
              
              {blogCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.slug)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    selectedCategory === category.slug 
                      ? 'bg-primary-100 text-primary-800 font-semibold border border-primary-200' 
                      : 'text-neutral-700 hover:bg-neutral-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-xs text-neutral-500">{category.postCount}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
            <h3 className="text-lg font-bold text-primary-900 mb-3">📧 Never Miss an Update</h3>
            <p className="text-sm text-primary-700 mb-4">
              Get the latest financial insights, government scheme updates, and investment tips delivered to your inbox.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Subscribe Free
              </button>
            </form>
            <p className="text-xs text-primary-600 mt-2">
              Join 50,000+ readers • Unsubscribe anytime
            </p>
          </div>
          
          {/* Popular Tags */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">🏷️ Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Tax Saving', 'SIP', 'Home Loan', 'NPS', 'Mutual Funds', 'PPF', 'ELSS', 'Insurance'].map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs hover:bg-primary-100 hover:text-primary-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                {selectedCategory 
                  ? `${blogCategories.find(cat => cat.slug === selectedCategory)?.name} Articles`
                  : searchTerm 
                    ? `Search Results for "${searchTerm}"`
                    : 'All Articles'
                }
              </h2>
              <p className="text-neutral-600 mt-1">
                {sortedPosts.length} article{sortedPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
          
          {/* Articles Grid/List */}
          {sortedPosts.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-xl">
              <div className="mb-4">
                <Search className="h-16 w-16 text-neutral-300 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">No articles found</h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your search terms or browse our categories.
              </p>
              <button 
                onClick={clearFilters}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {sortedPosts.map(post => (
                <article key={post.id} className="group">
                  <Link to={`/blog/${post.slug}`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-neutral-100">
                      <div className={`${viewMode === 'grid' ? 'h-48' : 'h-32 md:h-48'} overflow-hidden relative`}>
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                        {post.featured && (
                          <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                            FEATURED
                          </div>
                        )}
                        {post.trending && (
                          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            TRENDING
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-xs text-neutral-500 mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <User className="h-3 w-3 mr-1" />
                          <span>{post.author}</span>
                          {post.readTime && (
                            <>
                              <span className="mx-2">•</span>
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{post.readTime}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-neutral-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.categories.slice(0, 3).map(category => {
                            const categoryData = blogCategories.find(cat => cat.name === category);
                            return (
                              <span 
                                key={category} 
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  categoryData?.color || 'bg-neutral-100 text-neutral-800'
                                }`}
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {category}
                              </span>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {post.authorImage && (
                              <div className="h-8 w-8 rounded-full bg-neutral-300 overflow-hidden mr-3">
                                <img 
                                  src={post.authorImage} 
                                  alt={post.author} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-neutral-900">{post.author}</div>
                              {post.authorTitle && (
                                <div className="text-xs text-neutral-500">{post.authorTitle}</div>
                              )}
                            </div>
                          </div>
                          <span className="text-primary-600 font-medium flex items-center">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {sortedPosts.length > 0 && (
            <div className="mt-16 flex justify-center">
              <nav className="inline-flex rounded-xl shadow-lg overflow-hidden">
                <button className="px-6 py-3 bg-white border border-neutral-300 text-sm font-medium text-neutral-500 hover:bg-neutral-50 transition-colors">
                  Previous
                </button>
                <button className="px-6 py-3 bg-primary-600 border border-primary-600 text-sm font-medium text-white">
                  1
                </button>
                <button className="px-6 py-3 bg-white border border-neutral-300 text-sm font-medium text-neutral-500 hover:bg-neutral-50 transition-colors">
                  2
                </button>
                <button className="px-6 py-3 bg-white border border-neutral-300 text-sm font-medium text-neutral-500 hover:bg-neutral-50 transition-colors">
                  3
                </button>
                <button className="px-6 py-3 bg-white border border-neutral-300 text-sm font-medium text-neutral-500 hover:bg-neutral-50 transition-colors">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      
      {/* Call to Action */}
      <section className="mt-20 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Want to Contribute?</h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Share your financial expertise with our community. We welcome guest contributions from finance professionals, advisors, and experts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/blog/write"
            className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Write for Us
          </Link>
          <Link 
            to="/contact-us"
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
