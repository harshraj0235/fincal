import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, Search, TrendingUp, BookOpen, FileText, 
  ArrowRight, Star, Zap, Shield, Award, ChevronRight,
  DollarSign, Building, TrendingDown, Home, PiggyBank,
  Target, BarChart3, Gift, Umbrella, HelpCircle,
  Rocket, Calendar, Tag, CheckCircle, Clock, Users
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';

// Build comprehensive search database
const buildSearchDatabase = () => {
  const calculators = [
    // Investment
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', category: 'Investment', keywords: 'sip mutual fund systematic' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment', keywords: 'ppf provident fund' },
    { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment', keywords: 'fixed deposit fd interest' },
    { name: 'CAGR Calculator', path: '/calculators/cagr-calculator', category: 'Investment', keywords: 'cagr growth rate' },
    { name: 'Lumpsum Calculator', path: '/calculators/lumpsum-calculator', category: 'Investment', keywords: 'lumpsum investment' },
    { name: 'Mutual Fund Returns', path: '/calculators/mutual-fund-returns-calculator', category: 'Investment', keywords: 'mutual fund returns' },
    
    // Loans
    { name: 'EMI Calculator', path: '/calculators/emi-calculator', category: 'Loan', keywords: 'emi loan monthly' },
    { name: 'Home Loan EMI', path: '/calculators/home-loan-calculator', category: 'Loan', keywords: 'home loan housing' },
    { name: 'Personal Loan', path: '/calculators/personal-loan-calculator', category: 'Loan', keywords: 'personal loan instant' },
    { name: 'Car Loan', path: '/calculators/car-loan-calculator', category: 'Loan', keywords: 'car auto vehicle loan' },
    { name: 'Loan Comparison', path: '/calculators/loan-comparison-calculator', category: 'Loan', keywords: 'compare loans interest' },
    
    // Tax
    { name: 'Income Tax Calculator', path: '/calculators/income-tax-calculator', category: 'Tax', keywords: 'income tax old new regime' },
    { name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax', keywords: 'hra house rent allowance' },
    { name: 'Capital Gains Tax', path: '/calculators/capital-gains-tax-calculator', category: 'Tax', keywords: 'capital gains ltcg stcg' },
    { name: 'TDS Calculator', path: '/calculators/tds-calculator', category: 'Tax', keywords: 'tds tax deducted source' },
    
    // GST
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST', keywords: 'gst goods services tax' },
    { name: 'HSN/SAC Finder', path: '/tools/gst-hsn-sac-finder', category: 'GST', keywords: 'hsn sac code finder' },
    { name: 'Reverse GST', path: '/tools/reverse-gst-calculator', category: 'GST', keywords: 'reverse gst backward' },
    
    // Retirement
    { name: 'Retirement Calculator', path: '/calculators/retirement-calculator', category: 'Retirement', keywords: 'retirement planning corpus' },
    { name: 'NPS Calculator', path: '/calculators/nps-calculator', category: 'Retirement', keywords: 'nps national pension' },
    { name: 'EPF Calculator', path: '/calculators/epf-calculator', category: 'Retirement', keywords: 'epf provident fund' },
    
    // More
    { name: 'Salary Calculator', path: '/calculators/salary-calculator', category: 'Salary', keywords: 'salary take home ctc' },
    { name: 'Budget Calculator', path: '/calculators/budget-calculator', category: 'Budget', keywords: 'budget planner monthly' },
    { name: 'Currency Converter', path: '/calculators/currency-converter', category: 'Currency', keywords: 'currency exchange forex' },
  ];

  const blogs = [
    ...blogPosts0.slice(0, 20).map(post => ({ 
      name: post.title, 
      path: `/blog/${post.slug}`, 
      category: 'Blog',
      keywords: post.categories.join(' ')
    })),
    ...blogPosts1.slice(0, 20).map(post => ({ 
      name: post.title, 
      path: `/blog/${post.slug}`, 
      category: 'Blog',
      keywords: post.categories.join(' ')
    }))
  ];
  
  return [...calculators, ...blogs];
};

const HomeInvestopedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  const searchDatabase = useMemo(() => buildSearchDatabase(), []);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      return searchDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords?.toLowerCase().includes(query) ||
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

  // Popular calculators
  const popularCalculators = [
    { name: 'EMI Calculator', path: '/calculators/emi-calculator', icon: Calculator, desc: 'Calculate loan EMI' },
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', icon: TrendingUp, desc: 'Plan your SIP investments' },
    { name: 'Income Tax', path: '/calculators/income-tax-calculator', icon: FileText, desc: 'Calculate income tax' },
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', icon: DollarSign, desc: 'Calculate GST amount' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', icon: PiggyBank, desc: 'Plan your PPF investment' },
    { name: 'Home Loan', path: '/calculators/home-loan-calculator', icon: Home, desc: 'Calculate home loan EMI' },
  ];

  // Quick categories
  const quickCategories = [
    { name: 'Calculators', path: '/calculators', icon: Calculator, count: '100+', color: 'blue' },
    { name: 'Tools', path: '/tools', icon: Target, count: '200+', color: 'purple' },
    { name: 'Learn', path: '/learn', icon: BookOpen, count: '40', color: 'green' },
    { name: 'Blog', path: '/blog', icon: FileText, count: '150+', color: 'orange' },
    { name: 'GST Tools', path: '/gst-tools', icon: DollarSign, count: '20+', color: 'indigo' },
    { name: 'Tax Tools', path: '/tax-tools', icon: FileText, count: '15+', color: 'red' },
    { name: 'Festival Tools', path: '/festival-tools', icon: Calendar, count: '11', color: 'pink' },
    { name: 'Schemes', path: '/government-schemes', icon: Gift, count: '50+', color: 'yellow' },
  ];

  return (
    <>
      <SEOHelmet
        title="MoneyCal.in - Free Financial Calculators & Tools for India"
        description="India's most comprehensive financial platform. 100+ free calculators, 40 lessons, tools for GST, Tax, SIP, EMI, and more. Mobile-friendly and fast."
        keywords="financial calculators India, GST calculator, SIP calculator, EMI calculator, income tax, mutual fund calculator"
        canonicalUrl="https://moneycal.in"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Free Financial Calculators
                <br />
                <span className="text-blue-600">for India</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Calculate EMI, SIP, Income Tax, GST, and more. 100+ free tools, 40 expert lessons, trusted by 1M+ users.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search calculators, tools, articles..."
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Search Results */}
                {showSearchResults && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    <div className="p-2">
                      {searchResults.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSearchItemClick(result.path)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{result.name}</div>
                            <div className="text-sm text-gray-500">{result.category}</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Calculators</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">1M+</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Free</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">40</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Calculators */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCalculators.map((calc, idx) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={idx}
                    to={calc.path}
                    className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{calc.name}</h3>
                        <p className="text-sm text-gray-600">{calc.desc}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
              {quickCategories.map((cat, idx) => {
                const Icon = cat.icon;
                const colorClasses = {
                  blue: 'bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white',
                  purple: 'bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white',
                  green: 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white',
                  orange: 'bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white',
                  indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white',
                  red: 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white',
                  pink: 'bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white',
                  yellow: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-600 hover:text-white',
                };
                return (
                  <Link
                    key={idx}
                    to={cat.path}
                    className={`p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all text-center group ${colorClasses[cat.color as keyof typeof colorClasses]}`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3" />
                    <div className="font-semibold mb-1">{cat.name}</div>
                    <div className="text-sm opacity-75">{cat.count}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose MoneyCal.in</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, title: '100% Free', desc: 'All tools and calculators are completely free' },
                { icon: Shield, title: 'Secure', desc: 'Your data is safe and secure' },
                { icon: Award, title: 'Expert Verified', desc: 'All calculations verified by financial experts' },
                { icon: Star, title: 'Trusted', desc: 'Used by 1M+ users across India' },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">Explore 100+ free financial calculators and tools</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculators"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Calculators
              </Link>
              <Link
                to="/learn"
                className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
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
