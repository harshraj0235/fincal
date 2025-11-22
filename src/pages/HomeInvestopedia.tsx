import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, Search, TrendingUp, BookOpen, FileText, 
  ArrowRight, Star, Zap, Shield, Award, ChevronRight,
  DollarSign, Building, Home, PiggyBank,
  Target, BarChart3, Gift, Umbrella,
  Rocket, Calendar, CheckCircle, Users,
  CreditCard, Building2, Briefcase, Heart, GraduationCap,
  Filter, Grid, List, X, Wrench,
  Newspaper, Coins, FolderOpen, Sparkles, Menu,
  Receipt, Calendar as CalendarIcon, Gem, FileInvoice, Scale
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
  const [activeTab, setActiveTab] = useState<'calculators' | 'tools' | 'resources'>('calculators');
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
      ).slice(0, 10);
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

  // Popular calculators
  const popularCalculators = [
    { id: 'emi-calculator', name: 'EMI Calculator', path: '/calculators/emi-calculator', icon: Calculator },
    { id: 'sip-calculator', name: 'SIP Calculator', path: '/calculators/sip-calculator', icon: TrendingUp },
    { id: 'income-tax-calculator', name: 'Income Tax', path: '/calculators/income-tax-calculator', icon: FileText },
    { id: 'gst-calculator', name: 'GST Calculator', path: '/calculators/gst-calculator', icon: DollarSign },
    { id: 'ppf-calculator', name: 'PPF Calculator', path: '/calculators/ppf-calculator', icon: PiggyBank },
    { id: 'home-loan-calculator', name: 'Home Loan', path: '/calculators/home-loan-calculator', icon: Home },
    { id: 'fd-calculator', name: 'FD Calculator', path: '/calculators/fd-calculator', icon: Building2 },
    { id: 'retirement-calculator', name: 'Retirement', path: '/calculators/retirement-calculator', icon: Umbrella },
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
        {/* Hero Section - Compact */}
        <section className="bg-white border-b border-gray-100 pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Free Financial Calculators
                <span className="text-blue-600"> for India</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                {totalCalculators}+ free tools • Expert guides • Trusted by 1M+ users
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6 relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search calculators, tools, articles..."
                    className="w-full pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Search Results */}
                {showSearchResults && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                    <div className="p-2">
                      {searchResults.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSearchItemClick(result.path)}
                          className="w-full text-left px-4 py-2.5 hover:bg-blue-50 rounded transition-colors flex items-center justify-between group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 group-hover:text-blue-600 truncate">{result.name}</div>
                            <div className="text-xs text-gray-500">{result.category}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-2 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Quick Access Tabs */}
        <section className="bg-gray-50 border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-1 overflow-x-auto py-3">
              <button
                onClick={() => setActiveTab('calculators')}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'calculators'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calculator className="w-4 h-4 inline mr-2" />
                Calculators ({totalCalculators}+)
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'tools'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Wrench className="w-4 h-4 inline mr-2" />
                Tools
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'resources'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FolderOpen className="w-4 h-4 inline mr-2" />
                Resources
              </button>
            </div>
          </div>
        </section>

        {/* Popular Calculators - Always Visible */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Calculators</h2>
              <Link 
                to="/calculators" 
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {popularCalculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={calc.id}
                    to={calc.path}
                    className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group text-center"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-600 transition-colors">
                      <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">{calc.name}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        {activeTab === 'calculators' && (
          <>
            {/* Category Filter - Compact */}
            <section className="py-4 bg-gray-50 border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === null
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {calculatorCategories.map((category) => {
                    const Icon = categoryIcons[category.name] || Calculator;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                          selectedCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {category.name.split(' ')[0]} ({category.calculators.length})
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Calculators Grid - Compact */}
            <section className="py-8 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredCategories.map((category) => {
                  const CategoryIcon = categoryIcons[category.name] || Calculator;
                  return (
                    <div key={category.id} className="mb-8 last:mb-0">
                      <div className="flex items-center gap-2 mb-4">
                        <CategoryIcon className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                        <span className="text-xs text-gray-500">({category.calculators.length})</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {category.calculators.map((calc) => (
                          <Link
                            key={calc.id}
                            to={`/calculators/${calc.id}`}
                            className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                          >
                            <h4 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-blue-600 line-clamp-2">
                              {calc.name}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">{calc.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {activeTab === 'tools' && (
          <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[
                  { name: 'Finance Tools', path: '/finance-tools', icon: DollarSign, count: '25+', color: 'bg-blue-50 text-blue-600' },
                  { name: 'Tax Tools', path: '/tax-tools', icon: FileText, count: '40+', color: 'bg-green-50 text-green-600' },
                  { name: 'GST Tools', path: '/gst-tools', icon: Calculator, count: '20+', color: 'bg-purple-50 text-purple-600' },
                  { name: 'Excel Tools', path: '/excel-tools', icon: BarChart3, count: '50+', color: 'bg-orange-50 text-orange-600' },
                  { name: 'Bank Tools', path: '/bank-tools', icon: Building2, count: '10+', color: 'bg-cyan-50 text-cyan-600' },
                  { name: 'Loan Tools', path: '/loan-tools', icon: Home, count: '15+', color: 'bg-teal-50 text-teal-600' },
                  { name: 'Insurance Tools', path: '/insurance-tools', icon: Heart, count: '8+', color: 'bg-pink-50 text-pink-600' },
                  { name: 'Gold Tools', path: '/gold-tools', icon: Gem, count: '5+', color: 'bg-yellow-50 text-yellow-600' },
                  { name: 'Invoicing Tools', path: '/invoicing-tools', icon: FileInvoice, count: '12+', color: 'bg-violet-50 text-violet-600' },
                  { name: 'Festival Tools', path: '/festival-tools', icon: CalendarIcon, count: '10+', color: 'bg-rose-50 text-rose-600' },
                  { name: 'Corporate Tools', path: '/corporate-tools', icon: Briefcase, count: '20+', color: 'bg-slate-50 text-slate-600' },
                  { name: 'All Tools', path: '/tools', icon: Wrench, count: '200+', color: 'bg-indigo-50 text-indigo-600' },
                ].map((tool, idx) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={idx}
                      to={tool.path}
                      className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-center group"
                    >
                      <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-blue-600">{tool.name}</h3>
                      <span className="text-xs text-gray-500">{tool.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'resources' && (
          <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[
                  { name: 'Learn', path: '/learn', icon: BookOpen, count: '40+', color: 'bg-emerald-50 text-emerald-600' },
                  { name: 'Blog', path: '/blog', icon: FileText, count: '150+', color: 'bg-blue-50 text-blue-600' },
                  { name: 'News', path: '/news', icon: Newspaper, count: '100+', color: 'bg-red-50 text-red-600' },
                  { name: 'Govt Schemes', path: '/government-schemes', icon: Gift, count: '50+', color: 'bg-yellow-50 text-yellow-600' },
                  { name: 'Crypto', path: '/crypto', icon: Coins, count: '30+', color: 'bg-purple-50 text-purple-600' },
                  { name: 'Astro Finance', path: '/astro-finance', icon: Sparkles, count: '13+', color: 'bg-indigo-50 text-indigo-600' },
                  { name: 'Festival', path: '/festival', icon: CalendarIcon, count: '25+', color: 'bg-rose-50 text-rose-600' },
                  { name: 'Corporate', path: '/corporate', icon: Briefcase, count: '15+', color: 'bg-slate-50 text-slate-600' },
                  { name: 'Personal Finance', path: '/personal-finance', icon: PiggyBank, count: '20+', color: 'bg-cyan-50 text-cyan-600' },
                  { name: 'Religious', path: '/religious', icon: Scale, count: '10+', color: 'bg-amber-50 text-amber-600' },
                ].map((resource, idx) => {
                  const Icon = resource.icon;
                  return (
                    <Link
                      key={idx}
                      to={resource.path}
                      className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all text-center group"
                    >
                      <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900 mb-1">{resource.name}</h3>
                      <span className="text-xs text-gray-500">{resource.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Features - Compact */}
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose MoneyCal.in</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: CheckCircle, title: '100% Free', desc: 'Completely free forever' },
                { icon: Shield, title: 'Secure', desc: 'Your data is safe' },
                { icon: Award, title: 'Expert Verified', desc: 'Verified calculations' },
                { icon: Zap, title: 'Fast', desc: 'Lightning-fast tools' },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-600">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeInvestopedia;
