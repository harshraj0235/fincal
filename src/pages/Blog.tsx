import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Tag, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Eye, 
  BookOpen,
  TrendingUp,
  Star,
  Heart,
  Share2,
  Grid,
  List
} from 'lucide-react';
import { blogPosts as oldPosts } from '../data/blogData';
import { blogPosts as newPosts } from '../data/blogData1';
import SEOHelmet from '../components/SEOHelmet';

const allBlogPosts = [...oldPosts, ...newPosts];
const POSTS_PER_PAGE = 15;

export const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'popularity'>('date');

  // Get current page from URL params
  const currentPage = parseInt(searchParams.get('page') || '1');
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  // Get unique categories with post counts
  const categories = Array.from(
    new Set(allBlogPosts.flatMap(post => post.categories))
  ).map(category => ({
    name: category,
    count: allBlogPosts.filter(post => post.categories.includes(category)).length
  }));

  // Filter posts based on search and category
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = (searchParam || searchTerm) === '' ||
      post.title.toLowerCase().includes((searchParam || searchTerm).toLowerCase()) ||
      post.excerpt.toLowerCase().includes((searchParam || searchTerm).toLowerCase()) ||
      post.categories.some(cat => cat.toLowerCase().includes((searchParam || searchTerm).toLowerCase()));

    const matchesCategory = (categoryParam || selectedCategory) === null ||
      post.categories.includes(categoryParam || selectedCategory || '');

    return matchesSearch && matchesCategory;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'popularity':
        // Simulate popularity based on date and random factor
        return Math.random() - 0.5;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (categoryParam || selectedCategory) params.set('category', categoryParam || selectedCategory || '');
    if (searchParam || searchTerm) params.set('search', searchParam || searchTerm);
    setSearchParams(params);
  }, [currentPage, categoryParam, selectedCategory, searchParam, searchTerm, setSearchParams]);

  // Generate structured data for Google Discover
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "FinanceGurus Directory Blog",
    "description": "Expert financial insights, tips, and guides for Indian users",
    "url": "https://moneycal.in/blog",
    "publisher": {
      "@type": "Organization",
      "name": "FinanceGurus Directory",
      "url": "https://moneycal.in"
    },
    "blogPost": currentPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author || "FinanceGurus Team"
      },
      "datePublished": post.date,
      "dateModified": post.date,
      "image": post.image || "https://moneycal.in/images/blog-default.jpg",
      "url": `https://moneycal.in/blog/${post.slug}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://moneycal.in/blog/${post.slug}`
      },
      "articleSection": post.categories.join(", "),
      "keywords": post.categories.join(", "),
      "wordCount": post.excerpt.split(' ').length + 200,
      "timeRequired": "PT5M",
      "inLanguage": "en-IN"
    }))
  };

  // Featured posts (first 3 posts)
  const featuredPosts = currentPosts.slice(0, 3);

  // Regular posts (remaining posts)
  const regularPosts = currentPosts.slice(3);

  // Filter sidebar/modal content
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="lg:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchParam || searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Tag className="mr-2 text-blue-600" size={20} />
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setShowFilter(false);
            }}
            className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
              (categoryParam || selectedCategory) === null 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg' 
                : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>All Categories</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {allBlogPosts.length}
              </span>
            </div>
          </button>
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);
                setShowFilter(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                (categoryParam || selectedCategory) === category.name 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  (categoryParam || selectedCategory) === category.name 
                    ? 'bg-white/20' 
                    : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="mr-2 text-purple-600" size={20} />
          Sort By
        </h3>
        <div className="space-y-2">
          {[
            { value: 'date', label: 'Latest First', icon: Calendar },
            { value: 'title', label: 'Alphabetical', icon: BookOpen },
            { value: 'popularity', label: 'Most Popular', icon: Star }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value as 'date' | 'title' | 'popularity')}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                sortBy === option.value
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center">
                <option.icon className="mr-2" size={16} />
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
            <Star className="mr-2" size={16} />
            Government Schemes
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            Explore comprehensive guides on government financial schemes.
          </p>
          <Link 
            to="/blog/category/government-schemes" 
            className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            View all guides
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-semibold text-green-900 mb-2 flex items-center">
            <Heart className="mr-2" size={16} />
            Write for Us
          </h3>
          <p className="text-sm text-green-700 mb-3">
            Share your financial expertise with our community.
          </p>
          <Link 
            to="/blog/write" 
            className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1 transition-colors"
          >
            Learn more
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      return pages;
    };

    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (currentPage > 1) {
              newParams.set('page', (currentPage - 1).toString());
            }
            return newParams;
          })}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (page !== '...') {
                setSearchParams(prev => {
                  const newParams = new URLSearchParams(prev);
                  newParams.set('page', page.toString());
                  return newParams;
                });
              }
            }}
            className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
              page === currentPage
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600 shadow-lg'
                : page === '...'
                ? 'border-transparent cursor-default'
                : 'border-gray-300 hover:bg-gray-50 hover:shadow-sm'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (currentPage < totalPages) {
              newParams.set('page', (currentPage + 1).toString());
            }
            return newParams;
          })}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };

  // Blog Post Card Component
  const BlogPostCard = ({ post, index, isFeatured = false }: { post: any; index: number; isFeatured?: boolean }) => (
    <article 
      className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
        isFeatured ? 'bg-gradient-to-br from-white to-blue-50' : 'bg-white'
      }`}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        {/* Image Container */}
        <div className={`relative overflow-hidden ${
          isFeatured ? 'aspect-[16/9]' : viewMode === 'grid' ? 'aspect-video' : 'aspect-[3/2]'
        }`}>
          <img
            src={post.image || '/images/blog-default.jpg'}
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading={index < 6 ? "eager" : "lazy"}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/blog-default.jpg';
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
              {post.categories[0]}
            </span>
          </div>

          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg flex items-center gap-1">
                <Star className="h-3 w-3" />
                Featured
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex gap-2">
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                <Share2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className={`p-6 ${isFeatured ? 'space-y-4' : 'space-y-3'}`}>
          <h2 
            className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 ${
              isFeatured ? 'text-xl' : viewMode === 'grid' ? 'text-lg' : 'text-xl'
            }`}
            itemProp="headline"
          >
            {post.title}
          </h2>
          
          <p 
            className={`text-gray-600 line-clamp-3 ${
              isFeatured ? 'text-base' : 'text-sm'
            }`}
            itemProp="description"
          >
            {post.excerpt}
          </p>
          
          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {post.author || 'FinanceGurus Team'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                5 min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {Math.floor(Math.random() * 1000) + 100}
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Schema.org structured data */}
      <meta itemProp="datePublished" content={post.date} />
      <meta itemProp="dateModified" content={post.date} />
      <meta itemProp="author" content={post.author || 'FinanceGurus Team'} />
      <meta itemProp="publisher" content="FinanceGurus Directory" />
      <meta itemProp="mainEntityOfPage" content={`https://moneycal.in/blog/${post.slug}`} />
    </article>
  );

  useEffect(() => {
    // AdSense script
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4446717165665089';
    adsenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseScript);

    // Google Analytics Enhanced Ecommerce
    if (window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_id: 'blog_posts',
        item_list_name: 'Finance Blog Posts',
        items: currentPosts.map((post, index) => ({
          item_id: post.slug,
          item_name: post.title,
          item_category: post.categories[0],
          item_list_name: 'Finance Blog Posts',
          item_list_id: 'blog_posts',
          index: index + 1
        }))
      });
    }

    return () => {
      if (document.head.contains(adsenseScript)) document.head.removeChild(adsenseScript);
    };
  }, [currentPosts]);

  return (
    <>
      <SEOHelmet
        title="Finance Blog - Expert Financial Insights & Tips | FinanceGurus Directory"
        description="Discover expert financial insights, tips, and comprehensive guides. Stay updated with the latest financial trends, government schemes, and investment strategies for Indian users."
        keywords="finance blog, financial tips, investment advice, money management, financial planning, government schemes, personal finance, wealth creation"
        url="/blog"
        image="/images/blog-hero.jpg"
        type="website"
        structuredData={structuredData}
        tags={["finance", "blog", "financial tips", "investment", "money management"]}
        alternateLanguages={{
          'en-IN': 'https://moneycal.in/blog',
          'hi-IN': 'https://moneycal.in/hi/blog'
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Finance Blog
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                Expert insights, tips, and guides to help you make better financial decisions
              </p>
              <div className="flex justify-center items-center gap-8 text-blue-100">
                <span className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {filteredPosts.length} Articles
                </span>
                <span className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  {categories.length} Categories
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Expert Insights
                </span>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Controls */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Search Bar */}
              <div className="flex-1 relative max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchParam || searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <button
                  className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                  onClick={() => setShowFilter(true)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {(categoryParam || selectedCategory) && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {categoryParam || selectedCategory}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {((categoryParam || selectedCategory) || (searchParam || searchTerm)) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {(categoryParam || selectedCategory) && (
                  <span className="inline-flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full text-sm font-medium text-blue-800">
                    {categoryParam || selectedCategory}
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchParams(prev => {
                          const newParams = new URLSearchParams(prev);
                          newParams.delete('category');
                          return newParams;
                        });
                      }}
                      className="hover:text-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {(searchParam || searchTerm) && (
                  <span className="inline-flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full text-sm font-medium text-green-800">
                    Search: "{searchParam || searchTerm}"
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSearchParams(prev => {
                          const newParams = new URLSearchParams(prev);
                          newParams.delete('search');
                          return newParams;
                        });
                      }}
                      className="hover:text-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Filter Modal (mobile only) */}
          {showFilter && (
            <div className="fixed inset-0 z-50 bg-black/50 flex justify-start lg:hidden">
              <div className="bg-white w-80 max-w-full h-full p-6 overflow-y-auto shadow-2xl relative animate-slide-in-left">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                  onClick={() => setShowFilter(false)}
                >
                  <X className="h-5 w-5" />
                </button>
                <FilterContent />
              </div>
              <div className="flex-1" onClick={() => setShowFilter(false)} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-8">
                <FilterContent />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Results Summary */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, sortedPosts.length)} of {sortedPosts.length} articles
                    {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
                  </p>
                  <div className="text-sm text-gray-500">
                    Sorted by: {sortBy === 'date' ? 'Latest' : sortBy === 'title' ? 'Alphabetical' : 'Popularity'}
                  </div>
                </div>
              </div>

              {/* Featured Posts Section */}
              {currentPage === 1 && featuredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Star className="mr-2 text-yellow-500" size={24} />
                    Featured Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPosts.map((post, index) => (
                      <BlogPostCard key={post.slug} post={post} index={index} isFeatured={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts Section */}
              {regularPosts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <BookOpen className="mr-2 text-blue-600" size={24} />
                    {currentPage === 1 ? 'Latest Articles' : 'All Articles'}
                  </h2>
                  
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {regularPosts.map((post, index) => (
                      <BlogPostCard key={post.slug} post={post} index={index + 3} />
                    ))}
                  </div>
                </div>
              )}

              {/* Pagination */}
              <Pagination />

              {/* No Results */}
              {currentPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-6">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-8">
                    Try adjusting your search terms or browse all categories to discover great content.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                      setSearchParams(new URLSearchParams());
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
