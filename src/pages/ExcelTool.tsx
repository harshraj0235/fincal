// src/pages/ExcelTool.tsx

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, Download, TrendingUp, BookOpen } from 'lucide-react';
import { excelToolBlogPosts } from '../data/exceltooldata';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import SEOHelmet from '../components/SEOHelmet';

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best Excel templates for personal finance in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best Excel templates for personal finance in India include budget planners, daily expense trackers, loan & EMI calculators, investment trackers, and tax planning sheets. These templates help you manage your money, automate savings, and plan for financial goals."
      }
    },
    {
      "@type": "Question",
      "name": "How can I automate my savings in Excel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can automate your savings in Excel by using formulas, conditional formatting, and charts. Set up automatic calculations for monthly savings, use data validation for expense categories, and visualize your progress with graphs. Download our free savings automation template to get started."
      }
    },
    {
      "@type": "Question",
      "name": "Is Excel better than Google Sheets for budgeting in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Excel offers more advanced features and offline access, making it ideal for complex budgeting. Google Sheets is great for collaboration and cloud access. For most Indian users, Excel is preferred for its powerful templates and compatibility with Indian banks and formats."
      }
    }
  ]
};

const ExcelTool: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'popularity'>('date');

  // Get all unique categories
  const categories = useMemo(() => {
    const allCategories = Array.from(new Set(excelToolBlogPosts.flatMap(post => post.categories)));
    return allCategories.sort();
  }, []);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = excelToolBlogPosts.filter(post => post.categories.includes(cat)).length;
    });
    return counts;
  }, [categories]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    const filtered = excelToolBlogPosts.filter(post => {
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === null ||
        post.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
          return (b.readingTime || 0) - (a.readingTime || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Excel Tools & Templates for Personal Finance in India"
        description="Master Personal Finance with Professional Excel Templates. Find the best Excel templates for budgeting, savings, investments, and tax planning in India."
        keywords="Excel templates, personal finance, budget planner, expense tracker, loan Calculator, investment tracker, tax planning, India"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Excel Tools & Templates Hub
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Master Personal Finance with Professional Excel Templates
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search templates, guides, or categories..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
          {/* Category Navigation */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'date' | 'title' | 'popularity')}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="popularity">Sort by Popularity</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${selectedCategory === null ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
              >
                All Categories ({excelToolBlogPosts.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 text-sm ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                >
                  <Tag className="h-4 w-4" />
                  {cat} ({categoryCounts[cat]})
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Total Posts</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{excelToolBlogPosts.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Categories</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{categories.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Templates</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {excelToolBlogPosts.filter(p => p.downloadLink).length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold text-gray-900">Trending</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">2024</p>
              </div>
            </div>
          </div>

          {/* SEO Article Section */}
          {!selectedCategory && searchTerm === '' && (
            <article className="prose lg:prose-xl max-w-none mb-12 bg-white p-8 rounded-lg shadow-sm border">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Best Excel Tools & Templates for Personal Finance in India (2024 Guide)</h1>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Trending on Google Discover:</strong> Excel is making a huge comeback for Indian personal finance in 2024! From AI-powered templates to classic budget planners, discover why Excel is the #1 tool for money management, savings, and investments in India.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Excel is Still the #1 Tool</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Customizable for Indian banks, tax rules, and formats
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Works offline and on any device
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Supports advanced formulas, charts, and automation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Free and easy to download templates
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Trending Templates</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Budget Planner</p>
                        <p className="text-sm text-gray-600">Track income, expenses, and savings</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Loan & EMI Calculator</p>
                        <p className="text-sm text-gray-600">Calculate EMIs and compare loans</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Investment Tracker</p>
                        <p className="text-sm text-gray-600">Monitor SIPs, stocks, and mutual funds</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Download Free Templates (2024 Edition)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="/excel-templates/monthly-budget-template.xlsx" download className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                    <Download className="h-5 w-5 text-blue-600" />
                    <span>Monthly Budget Planner</span>
                  </a>
                  <a href="/excel-templates/daily-expense-tracker.xlsx" download className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                    <Download className="h-5 w-5 text-blue-600" />
                    <span>Daily Expense Tracker</span>
                  </a>
                  <a href="/excel-templates/loan-emi-calculator.xlsx" download className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                    <Download className="h-5 w-5 text-blue-600" />
                    <span>Loan & EMI Calculator</span>
                  </a>
                  <a href="/excel-templates/investment-tracker.xlsx" download className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                    <Download className="h-5 w-5 text-blue-600" />
                    <span>Investment Tracker</span>
                  </a>
                </div>
              </div>

              {/* FAQ Schema for SEO */}
              <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </article>
          )}

          {/* Category View */}
          {selectedCategory && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Tag className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">{selectedCategory}</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {categoryCounts[selectedCategory]} posts
                </span>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Link
                key={post.id}
                to={`/exceltool/${post.slug}`}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {post.downloadLink && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        Template
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {post.readingTime || 5} min read
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.categories.slice(0, 2).map(cat => (
                      <span
                        key={cat}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        {cat}
                      </span>
                    ))}
                    {post.categories.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        +{post.categories.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search terms or browse all categories</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Posts
                </button>
              </div>
            </div>
          )}

          {/* Results Count */}
          {filteredPosts.length > 0 && (
            <div className="mt-8 text-center text-gray-500 text-sm">
              Showing {filteredPosts.length} of {excelToolBlogPosts.length} posts
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExcelTool;
