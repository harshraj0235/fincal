import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Search, Star, TrendingUp, FileSpreadsheet, LayoutGrid, List, Wand2, BookOpen, Users, Clock, ArrowRight, Sparkles, Zap, Target, BarChart3 } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { excelTools, getExcelToolsByCategory } from '../data/excelToolsData';

// Import the new blog data
import blog133 from '../../excel_blogs/blog_133_boost-your-freelance-income-with-ai-in-excel-2025-133.json';

const ExcelToolsPage: React.FC = () => {
  const [filteredTools, setFilteredTools] = useState(excelTools);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showBlogs, setShowBlogs] = useState(false);

  const categories = ['All', 'Personal Finance', 'Business & Accounting', 'Investment & Wealth Management', 'Tax & Compliance', 'Loan & Credit', 'Real Estate & Property'];

  // Featured blogs data
  const featuredBlogs = [
    {
      ...blog133,
      featured: true,
      readTime: '15 min read',
      category: 'AI & Productivity'
    }
  ];

  useEffect(() => {
    let filtered = excelTools;
    if (selectedCategory !== 'All') {
      filtered = getExcelToolsByCategory(selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    filtered.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredTools(filtered);
  }, [selectedCategory, searchQuery]);

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "100 Free Excel Tools & Templates - FinanceGurus",
    "description": "Download 100+ free Excel tools and templates for personal finance, business, investment, tax, and more. All tools are SEO optimized and designed for low-competition keywords.",
    "url": "https://moneycal.in/excel-tools",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": excelTools.length,
      "itemListElement": excelTools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.title,
          "description": tool.description,
          "url": `https://moneycal.in/excel-tools/${tool.slug}`,
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Microsoft Excel",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          }
        }
      }))
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <SEOHelmet
        title="100 Free Excel Tools & Templates - Download Financial Calculators | FinanceGurus"
        description="Download 100+ free Excel tools and templates for personal finance, business accounting, investment tracking, tax calculation, and more. All tools optimized for low-competition keywords and designed to rank #1 on Google."
        keywords="free excel tools, excel templates download, financial calculator excel, business excel templates, investment tracker excel, tax calculator excel, loan calculator excel, budget template excel"
        url="/excel-tools"
        structuredData={structuredData}
        tags={["excel tools", "financial templates", "business calculators", "investment trackers", "tax calculators"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="relative">
          {/* Enhanced Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24 shadow-2xl overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  <Sparkles className="w-4 h-4" />
                  New: AI-Powered Excel Tools 2025
                </span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
                <span className="inline-block bg-gradient-to-r from-yellow-300 via-green-300 to-blue-400 bg-clip-text text-transparent">
                  100+ Free Excel Tools
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
                Transform your financial management with AI-powered Excel tools. 
                <span className="font-semibold text-yellow-300"> Download, customize, and boost your productivity instantly!</span>
              </p>
              
              {/* Enhanced CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/excel-tool-builder"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-green-400 text-blue-900 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-xl transform hover:scale-105"
                >
                  <Wand2 className="w-6 h-6" />
                  Build Your Tool
                </Link>
                <button
                  onClick={() => setShowBlogs(!showBlogs)}
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-xl"
                >
                  <BookOpen className="w-6 h-6" />
                  Read Latest Blogs
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-yellow-300">{excelTools.length}+</div>
                  <div className="text-sm opacity-80">Excel Tools</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-300">15+</div>
                  <div className="text-sm opacity-80">Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-300">100%</div>
                  <div className="text-sm opacity-80">Free</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-300">24/7</div>
                  <div className="text-sm opacity-80">Access</div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Blog Section */}
          {showBlogs && (
            <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 border-b border-purple-100">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Latest Excel Insights & Tips
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover the latest trends, tips, and techniques to maximize your Excel productivity
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredBlogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      <div className="relative">
                        <img 
                          src={blog.coverImage} 
                          alt={blog.title}
                          className="w-full h-48 object-cover"
                        />
                        {blog.featured && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Featured
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            {blog.category}
                          </span>
                          <span className="text-gray-500 text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.readTime}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img 
                              src={blog.authorImage} 
                              alt={blog.author}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{blog.author}</div>
                              <div className="text-xs text-gray-500">{blog.authorTitle}</div>
                            </div>
                          </div>
                          
                          <Link
                            to={`/excel-tools/blog/${blog.slug}`}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Persistent Floating CTA */}
          <Link
            to="/excel-tool-builder"
            className="fixed z-50 bottom-6 right-6 bg-gradient-to-br from-yellow-400 to-green-400 text-blue-900 font-bold px-6 py-3 rounded-full shadow-2xl border-4 border-white hover:scale-105 transition-transform text-lg flex items-center gap-2 focus:ring-2 focus:ring-yellow-300"
            aria-label="Open Excel Tool Builder"
          >
            <Wand2 className="w-6 h-6" />
            Build Tool
          </Link>
        </div>

        {/* Enhanced Search/Filter Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-lg py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Enhanced Search */}
            <div className="relative flex-1 max-w-lg w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Excel tools, templates, calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/80 backdrop-blur-sm text-lg"
                aria-label="Search Excel tools"
              />
            </div>
            
            {/* Enhanced Category Tabs */}
            <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                      : 'bg-white/80 backdrop-blur-sm text-blue-700 hover:bg-blue-50 border border-blue-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Enhanced View Mode Toggle */}
            <div className="flex gap-2 items-center bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-blue-200">
              <button
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-blue-700 hover:bg-blue-50'
                }`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-blue-700 hover:bg-blue-50'
                }`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Tools Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Header */}
            <div className="mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Excel Tools & Templates
                </h2>
                <p className="text-lg text-gray-600">
                  Showing <span className="font-semibold text-blue-600">{filteredTools.length}</span> of <span className="font-semibold text-blue-600">{excelTools.length}</span> tools
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/excel-tool-builder"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Wand2 className="w-5 h-5" />
                  Build Custom Tool
                </Link>
                
                <button
                  onClick={() => setShowBlogs(!showBlogs)}
                  className="inline-flex items-center gap-3 bg-white border-2 border-blue-200 text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5" />
                  {showBlogs ? 'Hide Blogs' : 'Show Blogs'}
                </button>
              </div>
            </div>

            {/* Enhanced Grid/List View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTools.map((tool, idx) => (
                  <div key={tool.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2">
                    <div className="p-8 flex flex-col h-full">
                      {/* Enhanced Header */}
                      <div className="flex items-center gap-3 mb-4">
                        {idx < 3 && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                        {tool.estimatedTraffic === 'High' && (
                          <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Popular
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(tool.difficulty)}`}>
                          {tool.difficulty}
                        </span>
                      </div>
                      
                      {/* Enhanced Title */}
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-4 group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </h3>
                      
                      {/* Enhanced Description */}
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                        {tool.description}
                      </p>
                      
                      {/* Enhanced Keywords */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tool.keywords.slice(0, 3).map((keyword, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                            {keyword}
                          </span>
                        ))}
                        {tool.keywords.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                            +{tool.keywords.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      {/* Enhanced Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FileSpreadsheet className="w-4 h-4" />
                          Excel Template
                        </div>
                        
                        <Link
                          to={`/excel-tools/${tool.slug}`}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTools.map((tool, idx) => (
                  <div key={tool.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {idx < 3 && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </span>
                          )}
                          {tool.estimatedTraffic === 'High' && (
                            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Popular
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(tool.difficulty)}`}>
                            {tool.difficulty}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {tool.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4">
                          {tool.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {tool.keywords.slice(0, 5).map((keyword, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-4">
                        <Link
                          to={`/excel-tools/${tool.slug}`}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <Download className="w-4 h-4" />
                          Download Tool
                        </Link>
                        
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <FileSpreadsheet className="w-4 h-4" />
                          Excel Template
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ExcelToolsPage;
