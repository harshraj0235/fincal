import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Star, Clock, Users, BookOpen, IndianRupee, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { financeCategories, FinanceCategory, FinanceSubcategory } from '../data/financeCategories';

const FinanceCategoriesHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<FinanceCategory[]>([]);

  useEffect(() => {
    setCategories(financeCategories);
  }, []);

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.tools.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         category.articles.some(article => article.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'all' || category.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Trending': return 'text-green-600 bg-green-100';
      case 'New': return 'text-blue-600 bg-blue-100';
      case 'Popular': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Trending': return <TrendingUp className="w-4 h-4" />;
      case 'New': return <Star className="w-4 h-4" />;
      case 'Popular': return <Users className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategory(expandedSubcategory === subcategoryId ? null : subcategoryId);
  };

  const totalTools = categories.reduce((sum, category) => sum + category.toolsCount, 0);
  const totalArticles = categories.reduce((sum, category) => sum + category.articlesCount, 0);
  const trendingCategories = categories.filter(category => category.status === 'Trending').length;
  const newCategories = categories.filter(category => category.status === 'New').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Finance Categories Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of finance tools, calculators, and educational content. 
            From personal finance to investment strategies, we have everything you need for financial success.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <IndianRupee className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalTools}</div>
            <div className="text-gray-600">Finance Tools</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{totalArticles}</div>
            <div className="text-gray-600">Educational Articles</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{trendingCategories}</div>
            <div className="text-gray-600">Trending Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Star className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{newCategories}</div>
            <div className="text-gray-600">New Categories</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Categories</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories, tools, or articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="trending">Trending</option>
                <option value="new">New</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Category Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                          {getStatusIcon(category.status)}
                          <span className="ml-1">{category.status}</span>
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{category.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {category.toolsCount} tools
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {category.articlesCount} articles
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Updated {category.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">Priority {category.priority}</div>
                      <div className="text-sm text-gray-500">High Impact</div>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Category Content */}
              {expandedCategory === category.id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  {/* Subcategories */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Subcategories</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory.id} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900">{subcategory.name}</h5>
                              <button
                                onClick={() => toggleSubcategory(subcategory.id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                {expandedSubcategory === subcategory.id ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{subcategory.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{subcategory.toolsCount} tools</span>
                              <span>{subcategory.articlesCount} articles</span>
                            </div>
                            
                            {/* Expanded Subcategory Content */}
                            {expandedSubcategory === subcategory.id && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h6 className="font-medium text-gray-900 mb-2">Tools</h6>
                                    <div className="space-y-1">
                                      {subcategory.tools.slice(0, 5).map((tool, index) => (
                                        <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                          {tool}
                                        </div>
                                      ))}
                                      {subcategory.tools.length > 5 && (
                                        <div className="text-sm text-blue-600">
                                          +{subcategory.tools.length - 5} more tools
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h6 className="font-medium text-gray-900 mb-2">Articles</h6>
                                    <div className="space-y-1">
                                      {subcategory.articles.slice(0, 5).map((article, index) => (
                                        <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                          {article}
                                        </div>
                                      ))}
                                      {subcategory.articles.length > 5 && (
                                        <div className="text-sm text-blue-600">
                                          +{subcategory.articles.length - 5} more articles
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main Tools and Articles */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Featured Tools</h4>
                      <div className="space-y-2">
                        {category.tools.slice(0, 10).map((tool, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <span className="text-sm font-medium text-gray-900">{tool}</span>
                            <button className="text-blue-600 hover:text-blue-800">
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {category.tools.length > 10 && (
                          <div className="text-center">
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              View All {category.tools.length} Tools
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Featured Articles</h4>
                      <div className="space-y-2">
                        {category.articles.slice(0, 10).map((article, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <span className="text-sm font-medium text-gray-900">{article}</span>
                            <button className="text-blue-600 hover:text-blue-800">
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {category.articles.length > 10 && (
                          <div className="text-center">
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              View All {category.articles.length} Articles
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                      Explore All Tools
                    </button>
                    <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
                      Read All Articles
                    </button>
                    <button className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium">
                      Get Personalized Recommendations
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Master Your Finances with Our Comprehensive Tools</h3>
          <p className="text-lg mb-6 opacity-90">
            From budgeting to investment planning, we have everything you need to achieve financial success. 
            Start your journey today with our expert-curated tools and educational content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Start Financial Planning
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Explore All Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceCategoriesHub;
