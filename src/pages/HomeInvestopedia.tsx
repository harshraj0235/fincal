import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, Search, TrendingUp, BookOpen, FileText, 
  ArrowRight, Star, Zap, Shield, Award, ChevronRight,
  DollarSign, Building, TrendingDown, Home, PiggyBank,
  Target, BarChart3, Gift, Umbrella, HelpCircle,
  Rocket, Calendar, Tag, CheckCircle, Clock, Users,
  CreditCard, Building2, Briefcase, Car, Heart, GraduationCap,
  TrendingUp as TrendingUpIcon, Filter, Grid, List, X, Wrench
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { calculatorCategories } from '../data/calculatorData';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  'Loan Calculators': Home,
  'Investment Calculators': TrendingUp,
  'Tax Calculators': FileText,
  'Retirement Calculators': Umbrella,
  'Business Calculators': Briefcase,
  'Property Calculators': Building,
  'Insurance Calculators': Heart,
  'Banking & Finance Tools': Building2,
  'FinTech & Payments': CreditCard,
  'Investments & Wealth Management': BarChart3,
  'Personal Finance': PiggyBank,
  'Math & Education Calculators': GraduationCap,
};

// Build comprehensive search database
const buildSearchDatabase = () => {
  const calculators = calculatorCategories.flatMap(category =>
    category.calculators.map(calc => ({
      name: calc.name,
      path: `/calculators/${calc.id}`,
      category: category.name,
      keywords: calc.keywords.join(' '),
      description: calc.description
    }))
  );

  const blogs = [
    ...blogPosts0.slice(0, 20).map(post => ({ 
      name: post.title, 
      path: `/blog/${post.slug}`, 
      category: 'Blog',
      keywords: post.categories?.join(' ') || '',
      description: post.excerpt || ''
    })),
    ...blogPosts1.slice(0, 20).map(post => ({ 
      name: post.title, 
      path: `/blog/${post.slug}`, 
      category: 'Blog',
      keywords: post.categories?.join(' ') || '',
      description: post.excerpt || ''
    }))
  ];
  
  return [...calculators, ...blogs];
};

const HomeInvestopedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const searchDatabase = useMemo(() => buildSearchDatabase(), []);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      return searchDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query)
      ).slice(0, 12);
    }
    return [];
  }, [searchQuery, searchDatabase]);

  useEffect(() => {
    setShowSearchResults(searchResults.length > 0 && searchQuery.length > 1);
  }, [searchResults, searchQuery]);

  const handleSearchItemClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchItemClick(searchResults[0].path);
    }
  };

  // Filter calculators by category
  const filteredCategories = useMemo(() => {
    if (!selectedCategory) return calculatorCategories;
    return calculatorCategories.filter(cat => cat.id === selectedCategory);
  }, [selectedCategory]);

  // Popular calculators (most used)
  const popularCalculators = [
    { id: 'emi-calculator', name: 'EMI Calculator', path: '/calculators/emi-calculator', icon: Calculator, desc: 'Calculate loan EMI instantly' },
    { id: 'sip-calculator', name: 'SIP Calculator', path: '/calculators/sip-calculator', icon: TrendingUp, desc: 'Plan your SIP investments' },
    { id: 'income-tax-calculator', name: 'Income Tax Calculator', path: '/calculators/income-tax-calculator', icon: FileText, desc: 'Calculate income tax liability' },
    { id: 'gst-calculator', name: 'GST Calculator', path: '/calculators/gst-calculator', icon: DollarSign, desc: 'Calculate GST amount' },
    { id: 'ppf-calculator', name: 'PPF Calculator', path: '/calculators/ppf-calculator', icon: PiggyBank, desc: 'Plan your PPF investment' },
    { id: 'home-loan-calculator', name: 'Home Loan Calculator', path: '/calculators/home-loan-calculator', icon: Home, desc: 'Calculate home loan EMI' },
    { id: 'fd-calculator', name: 'FD Calculator', path: '/calculators/fd-calculator', icon: Building2, desc: 'Fixed deposit calculator' },
    { id: 'retirement-calculator', name: 'Retirement Calculator', path: '/calculators/retirement-calculator', icon: Umbrella, desc: 'Plan your retirement' },
  ];

  const totalCalculators = calculatorCategories.reduce((sum, cat) => sum + cat.calculators.length, 0);

  return (
    <>
      <SEOHelmet
        title="MoneyCal.in - Free Financial Calculators & Tools for India | 100+ Calculators"
        description="India's most comprehensive financial platform. 100+ free calculators for EMI, SIP, Income Tax, GST, PPF, FD, Home Loan, and more. Mobile-friendly, fast, and trusted by 1M+ users."
        keywords="financial calculators India, GST calculator, SIP calculator, EMI calculator, income tax calculator, PPF calculator, FD calculator, home loan calculator, tax calculator, investment calculator"
        canonicalUrl="https://moneycal.in"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Lightweight & Clean */}
        <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-100 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Free Financial Calculators
                <br />
                <span className="text-blue-600">for India</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Calculate EMI, SIP, Income Tax, GST, PPF, FD, and more. {totalCalculators}+ free tools, expert guides, trusted by 1M+ users.
              </p>

              {/* Enhanced Search Bar */}
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8 relative">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 100+ calculators, tools, articles..."
                    className="w-full pl-14 pr-4 py-4 text-base md:text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm hover:shadow-md"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Enhanced Search Results */}
                {showSearchResults && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-96 overflow-y-auto">
                    <div className="p-2">
                      {searchResults.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSearchItemClick(result.path)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors flex items-start justify-between group"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 group-hover:text-blue-600">{result.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{result.category}</div>
                            {result.description && (
                              <div className="text-xs text-gray-400 mt-1 line-clamp-1">{result.description}</div>
                            )}
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 ml-4 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">{totalCalculators}+</div>
                  <div className="text-sm text-gray-600 mt-1">Calculators</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">1M+</div>
                  <div className="text-sm text-gray-600 mt-1">Users</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Free</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">40+</div>
                  <div className="text-sm text-gray-600 mt-1">Guides</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Calculators - Quick Access */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Calculators</h2>
              <Link 
                to="/calculators" 
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm md:text-base"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularCalculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={calc.id}
                    to={calc.path}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 line-clamp-1">{calc.name}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">{calc.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Category Filter & View Toggle */}
        <section className="py-8 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Calculators</h2>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{totalCalculators} tools</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Categories
              </button>
              {calculatorCategories.map((category) => {
                const Icon = categoryIcons[category.name] || Calculator;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name} ({category.calculators.length})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Calculators by Category */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCategories.map((category) => {
              const CategoryIcon = categoryIcons[category.name] || Calculator;
              return (
                <div key={category.id} className="mb-12 last:mb-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>

                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {category.calculators.map((calc) => (
                        <Link
                          key={calc.id}
                          to={`/calculators/${calc.id}`}
                          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                        >
                          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2">
                            {calc.name}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-2 mb-3">{calc.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-600 font-medium">Use Calculator →</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {category.calculators.map((calc) => (
                        <Link
                          key={calc.id}
                          to={`/calculators/${calc.id}`}
                          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-sm transition-all group flex items-start justify-between"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
                              {calc.name}
                            </h4>
                            <p className="text-sm text-gray-600">{calc.description}</p>
                            {calc.keywords && calc.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {calc.keywords.slice(0, 3).map((keyword, idx) => (
                                  <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 ml-4 flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Financial Tools</h2>
                <p className="text-gray-600">Specialized tools for finance, tax, GST, Excel, and banking</p>
              </div>
              <Link 
                to="/tools" 
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm md:text-base"
              >
                View All Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  name: 'Finance Tools', 
                  path: '/finance-tools', 
                  icon: DollarSign, 
                  desc: 'SIP calculators, mutual fund tools, portfolio analyzers', 
                  count: '25+',
                  color: 'from-blue-500 to-blue-600'
                },
                { 
                  name: 'Tax Tools', 
                  path: '/tax-tools', 
                  icon: FileText, 
                  desc: 'Tax calculators, ITR helpers, deduction analyzers', 
                  count: '40+',
                  color: 'from-green-500 to-green-600'
                },
                { 
                  name: 'GST Tools', 
                  path: '/gst-tools', 
                  icon: Calculator, 
                  desc: 'GST calculators, HSN finder, compliance tools', 
                  count: '20+',
                  color: 'from-purple-500 to-purple-600'
                },
                { 
                  name: 'Excel Tools', 
                  path: '/excel-tools', 
                  icon: BarChart3, 
                  desc: 'Excel templates, formulas, financial spreadsheets', 
                  count: '50+',
                  color: 'from-orange-500 to-orange-600'
                },
                { 
                  name: 'Bank Tools', 
                  path: '/bank-tools', 
                  icon: Building2, 
                  desc: 'IFSC finder, ATM locator, bank charges analyzer', 
                  count: '10+',
                  color: 'from-cyan-500 to-cyan-600'
                },
                { 
                  name: 'All Tools', 
                  path: '/tools', 
                  icon: Wrench, 
                  desc: 'Browse all financial tools and utilities', 
                  count: '200+',
                  color: 'from-indigo-500 to-indigo-600'
                },
              ].map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={idx}
                    to={tool.path}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity" 
                         style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`, 
                                  '--tw-gradient-from': tool.color.split(' ')[1], 
                                  '--tw-gradient-to': tool.color.split(' ')[3] }} />
                    <div className="flex items-start space-x-4 relative z-10">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{tool.name}</h3>
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">{tool.count}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{tool.desc}</p>
                        <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                          Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Resources & Learning</h2>
                <p className="text-gray-600">Educational content, guides, news, and government schemes</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  name: 'Learn', 
                  path: '/learn', 
                  icon: BookOpen, 
                  desc: 'Financial education, lessons, and guides', 
                  count: '90+',
                  color: 'from-emerald-500 to-emerald-600'
                },
                { 
                  name: 'Blog', 
                  path: '/blog', 
                  icon: FileText, 
                  desc: 'Financial articles, tips, and insights', 
                  count: '700+',
                  color: 'from-pink-500 to-pink-600'
                },
                { 
                  name: 'News', 
                  path: '/news', 
                  icon: Calendar, 
                  desc: 'Latest financial news and updates', 
                  count: '160+',
                  color: 'from-red-500 to-red-600'
                },
                { 
                  name: 'Government Schemes', 
                  path: '/government-schemes', 
                  icon: Gift, 
                  desc: 'Government financial schemes and benefits', 
                  count: '180+',
                  color: 'from-yellow-500 to-yellow-600'
                },
                { 
                  name: 'Crypto', 
                  path: '/crypto', 
                  icon: TrendingUp, 
                  desc: 'Cryptocurrency guides and calculators', 
                  count: '75+',
                  color: 'from-violet-500 to-violet-600'
                },
              ].map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <Link
                    key={idx}
                    to={resource.path}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity" 
                         style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`, 
                                  '--tw-gradient-from': resource.color.split(' ')[1], 
                                  '--tw-gradient-to': resource.color.split(' ')[3] }} />
                    <div className="flex items-start space-x-4 relative z-10">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${resource.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{resource.name}</h3>
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">{resource.count}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{resource.desc}</p>
                        <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                          Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Why Choose MoneyCal.in</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, title: '100% Free', desc: 'All tools and calculators are completely free forever' },
                { icon: Shield, title: 'Secure & Private', desc: 'Your data is safe - we never store personal information' },
                { icon: Award, title: 'Expert Verified', desc: 'All calculations verified by financial experts' },
                { icon: Zap, title: 'Fast & Lightweight', desc: 'Lightning-fast calculations, optimized for speed' },
                { icon: Star, title: 'Trusted', desc: 'Used by 1M+ users across India' },
                { icon: Rocket, title: 'Always Updated', desc: 'Regularly updated with latest rates and rules' },
                { icon: Users, title: 'Mobile Friendly', desc: 'Works perfectly on all devices' },
                { icon: BookOpen, title: 'Learn & Grow', desc: '40+ expert guides to improve financial literacy' },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">Explore {totalCalculators}+ free financial calculators and tools</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculators"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Browse All Calculators
              </Link>
              <Link
                to="/learn"
                className="px-8 py-4 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors border-2 border-white"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeInvestopedia;
