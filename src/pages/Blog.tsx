import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag, Filter, X, ChevronLeft, ChevronRight, Clock, Eye } from 'lucide-react';
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

  // Get current page from URL params
  const currentPage = parseInt(searchParams.get('page') || '1');
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  // Get unique categories
  const categories = Array.from(
    new Set(allBlogPosts.flatMap(post => post.categories))
  );

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

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
      "wordCount": post.excerpt.split(' ').length + 200, // Estimate
      "timeRequired": "PT5M", // 5 minutes reading time
      "inLanguage": "en-IN"
    }))
  };

  // Filter sidebar/modal content
  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setShowFilter(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              (categoryParam || selectedCategory) === null 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowFilter(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                (categoryParam || selectedCategory) === category 
                  ? 'bg-blue-100 text-blue-800 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Government Schemes</h3>
        <p className="text-sm text-blue-700 mb-3">
          Explore comprehensive guides on government financial schemes.
        </p>
        <Link 
          to="/blog/category/government-schemes" 
          className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1"
        >
          View all guides
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">Write for Us</h3>
        <p className="text-sm text-green-700 mb-3">
          Share your financial expertise with our community.
        </p>
        <Link 
          to="/blog/write" 
          className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
        >
          Learn more
          <ArrowRight className="h-3 w-3" />
        </Link>
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
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (currentPage > 1) {
              newParams.set('page', (currentPage - 1).toString());
            }
            return newParams;
          })}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
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
            className={`px-3 py-2 border rounded-lg ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : page === '...'
                ? 'border-transparent cursor-default'
                : 'border-gray-300 hover:bg-gray-50'
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
          className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };

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

    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Finance Blog
              </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert insights, tips, and guides to help you make better financial decisions
            </p>
              <div className="mt-4 flex justify-center items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {filteredPosts.length} Articles
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {categories.length} Categories
                </span>
              </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Mobile Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                  value={searchParam || searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Mobile Filter Toggle */}
            <div className="sm:hidden">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                onClick={() => setShowFilter(true)}
              >
                <Filter className="h-4 w-4" />
                Filters
                  {(categoryParam || selectedCategory) && (
                    <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
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
                <span className="inline-flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-xs">
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
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
                {(searchParam || searchTerm) && (
                <span className="inline-flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-xs">
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
                    className="ml-1 hover:text-red-600"
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
          <div className="fixed inset-0 z-40 bg-black/40 flex justify-start sm:hidden">
            <div className="bg-white w-80 max-w-full h-full p-6 overflow-y-auto shadow-lg relative animate-slide-in-left">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
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
              <FilterContent />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
              {/* Results Summary */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
                  {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
                </p>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPosts.map((post, index) => (
                  <article 
                    key={post.slug}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <img
                          src={post.image || '/images/blog-default.jpg'}
                          alt={post.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading={index < 4 ? "eager" : "lazy"}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/blog-default.jpg';
                          }}
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            {post.categories[0]}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h2 
                          className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors"
                          itemProp="headline"
                        >
                          {post.title}
                        </h2>
                        
                        <p 
                          className="text-gray-600 text-sm mb-3 line-clamp-3"
                          itemProp="description"
                        >
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author || 'FinanceGurus Team'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.date).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            5 min read
                          </span>
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
                    ))}
                  </div>

              {/* Pagination */}
              <Pagination />

              {/* No Results */}
              {currentPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse all categories.
                  </p>
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
