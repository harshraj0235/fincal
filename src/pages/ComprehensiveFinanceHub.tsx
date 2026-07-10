import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Building,
  Shield,
  Calculator,
  BarChart3,
  Globe,
  Smartphone,
  Users,
  BookOpen,
  Target,
  Zap,
  ArrowRight,
  Search,
  Filter,
  Star,
  Award,
  Briefcase,
  Home,
  Heart,
  CreditCard,
  PiggyBank,
  TrendingUp as Investment,
  FileText,
  Newspaper,
  Lightbulb, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface MarketData {
  nifty50: number;
  sensex: number;
  goldPrice: number;
  silverPrice: number;
  dollarRate: number;
  bitcoinPrice: number;
  change: {
    nifty50: number;
    sensex: number;
    goldPrice: number;
    silverPrice: number;
    dollarRate: number;
    bitcoinPrice: number;
  };
}

interface FinanceTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  url: string;
  trending: boolean;
  new: boolean;
  tools: number;
  articles: number;
  color: string;
}

const ComprehensiveFinanceHub: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Comprehensive finance topics covering all major areas
  const financeTopics: FinanceTopic[] = [
    // Personal Finance
    {
      id: 'personal-finance',
      title: 'Personal Finance Management',
      description: 'Complete guide to budgeting, saving, debt management, and financial planning for individuals',
      icon: <PiggyBank className="h-8 w-8" />,
      category: 'personal',
      url: '/tools/budget-calculator',
      trending: true,
      new: false,
      tools: 15,
      articles: 25,
      color: 'bg-blue-500'
    },
    {
      id: 'budgeting',
      title: 'Budgeting & Expense Tracking',
      description: 'Create budgets, track expenses, and optimize your spending patterns',
      icon: <BarChart3 className="h-8 w-8" />,
      category: 'personal',
      url: '/tools/expense-tracker',
      trending: true,
      new: false,
      tools: 8,
      articles: 12,
      color: 'bg-green-500'
    },
    {
      id: 'emergency-fund',
      title: 'Emergency Fund Planning',
      description: 'Build and maintain emergency funds for financial security',
      icon: <Shield className="h-8 w-8" />,
      category: 'personal',
      url: '/tools/emergency-fund-calculator',
      trending: false,
      new: true,
      tools: 3,
      articles: 8,
      color: 'bg-red-500'
    },

    // Investment & Wealth Building
    {
      id: 'investment-planning',
      title: 'Investment Planning & Strategy',
      description: 'Comprehensive investment strategies, portfolio management, and wealth building',
      icon: <Investment className="h-8 w-8" />,
      category: 'investment',
      url: '/tools/investment-calculator',
      trending: true,
      new: false,
      tools: 20,
      articles: 35,
      color: 'bg-purple-500'
    },
    {
      id: 'mutual-funds',
      title: 'Mutual Funds & SIP',
      description: 'Systematic Investment Plans, mutual fund analysis, and portfolio optimization',
      icon: <TrendingUp className="h-8 w-8" />,
      category: 'investment',
      url: '/tools/mutual-fund-calculator',
      trending: true,
      new: false,
      tools: 12,
      articles: 20,
      color: 'bg-indigo-500'
    },
    {
      id: 'stock-market',
      title: 'Stock Market & Equity',
      description: 'Stock analysis, trading strategies, and equity investment guidance',
      icon: <BarChart3 className="h-8 w-8" />,
      category: 'investment',
      url: '/tools/sip-calculator',
      trending: true,
      new: false,
      tools: 18,
      articles: 30,
      color: 'bg-orange-500'
    },
    {
      id: 'cryptocurrency',
      title: 'Cryptocurrency & Digital Assets',
      description: 'Crypto investment strategies, DeFi, and digital asset management',
      icon: <Zap className="h-8 w-8" />,
      category: 'investment',
      url: '/crypto',
      trending: true,
      new: false,
      tools: 10,
      articles: 15,
      color: 'bg-yellow-500'
    },
    {
      id: 'real-estate',
      title: 'Real Estate Investment',
      description: 'Property investment, REITs, and real estate portfolio management',
      icon: <Home className="h-8 w-8" />,
      category: 'investment',
      url: '/learn/advanced-specialised-finance/real-estate-investment-india-residential-commercial-reits-property-guide-2025',
      trending: false,
      new: true,
      tools: 8,
      articles: 12,
      color: 'bg-teal-500'
    },

    // Loans & Credit
    {
      id: 'loan-tools',
      title: 'Loan Calculators & Tools',
      description: 'EMI calculators, loan comparison, and debt management tools',
      icon: <IndianRupee className="h-8 w-8" />,
      category: 'loans',
      url: '/loan-tools',
      trending: true,
      new: false,
      tools: 25,
      articles: 18,
      color: 'bg-pink-500'
    },
    {
      id: 'home-loans',
      title: 'Home Loans & Mortgages',
      description: 'Home loan comparison, EMI calculation, and property financing',
      icon: <Home className="h-8 w-8" />,
      category: 'loans',
      url: '/tools/home-loan-calculator',
      trending: true,
      new: false,
      tools: 12,
      articles: 15,
      color: 'bg-blue-600'
    },
    {
      id: 'personal-loans',
      title: 'Personal Loans & Credit',
      description: 'Personal loan comparison, credit score improvement, and debt consolidation',
      icon: <CreditCard className="h-8 w-8" />,
      category: 'loans',
      url: '/tools/personal-loan-calculator',
      trending: true,
      new: false,
      tools: 10,
      articles: 12,
      color: 'bg-green-600'
    },
    {
      id: 'business-loans',
      title: 'Business Loans & Finance',
      description: 'Business financing, working capital, and commercial loan solutions',
      icon: <Briefcase className="h-8 w-8" />,
      category: 'loans',
      url: '/learn/business-loans',
      trending: false,
      new: true,
      tools: 8,
      articles: 10,
      color: 'bg-purple-600'
    },

    // Insurance & Protection
    {
      id: 'insurance',
      title: 'Insurance Planning',
      description: 'Life, health, motor, and general insurance planning and comparison',
      icon: <Shield className="h-8 w-8" />,
      category: 'insurance',
      url: '/tools/insurance-calculator',
      trending: true,
      new: false,
      tools: 15,
      articles: 20,
      color: 'bg-red-600'
    },
    {
      id: 'health-insurance',
      title: 'Health Insurance',
      description: 'Health insurance comparison, coverage analysis, and claim management',
      icon: <Heart className="h-8 w-8" />,
      category: 'insurance',
      url: '/tools/insurance-calculator',
      trending: true,
      new: false,
      tools: 8,
      articles: 12,
      color: 'bg-pink-600'
    },
    {
      id: 'life-insurance',
      title: 'Life Insurance',
      description: 'Term life, whole life, and investment-linked insurance products',
      icon: <Users className="h-8 w-8" />,
      category: 'insurance',
      url: '/tools/insurance-calculator',
      trending: false,
      new: true,
      tools: 6,
      articles: 10,
      color: 'bg-indigo-600'
    },

    // Tax Planning
    {
      id: 'tax-planning',
      title: 'Tax Planning & Optimization',
      description: 'Income tax planning, deductions, and tax-saving investment strategies',
      icon: <FileText className="h-8 w-8" />,
      category: 'tax',
      url: '/tools/tax-calculator',
      trending: true,
      new: false,
      tools: 20,
      articles: 25,
      color: 'bg-orange-600'
    },
    {
      id: 'income-tax',
      title: 'Income Tax Calculator',
      description: 'Income tax calculation, TDS, and tax return filing assistance',
      icon: <IndianRupee className="h-8 w-8" />,
      category: 'tax',
      url: '/tools/income-tax-calculator',
      trending: true,
      new: false,
      tools: 12,
      articles: 15,
      color: 'bg-yellow-600'
    },
    {
      id: 'gst',
      title: 'GST & Business Tax',
      description: 'GST calculation, compliance, and business tax planning',
      icon: <Building className="h-8 w-8" />,
      category: 'tax',
      url: '/learn/business-finance-entrepreneurship/gst-compliance-india-registration-filing-returns-input-credit-composition-scheme-2025',
      trending: false,
      new: true,
      tools: 8,
      articles: 10,
      color: 'bg-teal-600'
    },

    // Retirement Planning
    {
      id: 'retirement-planning',
      title: 'Retirement Planning',
      description: 'NPS, pension planning, and retirement corpus calculation',
      icon: <Target className="h-8 w-8" />,
      category: 'retirement',
      url: '/tools/retirement-calculator',
      trending: true,
      new: false,
      tools: 10,
      articles: 15,
      color: 'bg-gray-600'
    },
    {
      id: 'pension',
      title: 'Pension & Annuity',
      description: 'Pension planning, annuity products, and retirement income strategies',
      icon: <Award className="h-8 w-8" />,
      category: 'retirement',
      url: '/tools/retirement-calculator',
      trending: false,
      new: true,
      tools: 6,
      articles: 8,
      color: 'bg-blue-700'
    },

    // Banking & Financial Services
    {
      id: 'banking',
      title: 'Banking Services',
      description: 'Bank account comparison, digital banking, and financial services',
      icon: <Building className="h-8 w-8" />,
      category: 'banking',
      url: '/banking',
      trending: true,
      new: false,
      tools: 12,
      articles: 18,
      color: 'bg-green-700'
    },
    {
      id: 'credit-cards',
      title: 'Credit Cards & Rewards',
      description: 'Credit card comparison, reward optimization, and credit management',
      icon: <CreditCard className="h-8 w-8" />,
      category: 'banking',
      url: '/learn/credit-cards',
      trending: true,
      new: false,
      tools: 8,
      articles: 12,
      color: 'bg-purple-700'
    },
    {
      id: 'digital-payments',
      title: 'Digital Payments & UPI',
      description: 'UPI, digital wallets, and modern payment solutions',
      icon: <Smartphone className="h-8 w-8" />,
      category: 'banking',
      url: '/learn/fintech-digital-payments',
      trending: true,
      new: false,
      tools: 6,
      articles: 10,
      color: 'bg-indigo-700'
    },

    // Government Schemes
    {
      id: 'government-schemes',
      title: 'Government Schemes',
      description: 'PM schemes, subsidies, and government financial programs',
      icon: <Globe className="h-8 w-8" />,
      category: 'government',
      url: '/government-schemes',
      trending: true,
      new: false,
      tools: 15,
      articles: 20,
      color: 'bg-orange-700'
    },
    {
      id: 'pradhan-mantri-schemes',
      title: 'Pradhan Mantri Schemes',
      description: 'PM Kisan, PM Awas Yojana, and other flagship government programs',
      icon: <Star className="h-8 w-8" />,
      category: 'government',
      url: '/pradhan-mantri-schemes',
      trending: true,
      new: false,
      tools: 10,
      articles: 15,
      color: 'bg-red-700'
    },

    // Financial Education
    {
      id: 'financial-education',
      title: 'Financial Education Hub',
      description: 'Learn finance basics, advanced concepts, and market analysis',
      icon: <BookOpen className="h-8 w-8" />,
      category: 'education',
      url: '/learn',
      trending: true,
      new: false,
      tools: 25,
      articles: 50,
      color: 'bg-yellow-700'
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis & News',
      description: 'Real-time market updates, analysis, and financial news',
      icon: <Newspaper className="h-8 w-8" />,
      category: 'education',
      url: '/stock-market',
      trending: true,
      new: false,
      tools: 8,
      articles: 30,
      color: 'bg-teal-700'
    },
    {
      id: 'financial-literacy',
      title: 'Financial Literacy',
      description: 'Basic to advanced financial concepts and money management skills',
      icon: <Lightbulb className="h-8 w-8" />,
      category: 'education',
      url: '/learn',
      trending: false,
      new: true,
      tools: 12,
      articles: 25,
      color: 'bg-pink-700'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Topics', count: financeTopics.length },
    { value: 'personal', label: 'Personal Finance', count: financeTopics.filter(t => t.category === 'personal').length },
    { value: 'investment', label: 'Investment', count: financeTopics.filter(t => t.category === 'investment').length },
    { value: 'loans', label: 'Loans & Credit', count: financeTopics.filter(t => t.category === 'loans').length },
    { value: 'insurance', label: 'Insurance', count: financeTopics.filter(t => t.category === 'insurance').length },
    { value: 'tax', label: 'Tax Planning', count: financeTopics.filter(t => t.category === 'tax').length },
    { value: 'retirement', label: 'Retirement', count: financeTopics.filter(t => t.category === 'retirement').length },
    { value: 'banking', label: 'Banking', count: financeTopics.filter(t => t.category === 'banking').length },
    { value: 'government', label: 'Government Schemes', count: financeTopics.filter(t => t.category === 'government').length },
    { value: 'education', label: 'Financial Education', count: financeTopics.filter(t => t.category === 'education').length }
  ];

  // Filter topics based on search and category
  const filteredTopics = financeTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Simulate market data fetch
  useEffect(() => {
    const fetchMarketData = async () => {
      // Simulate API call
      setTimeout(() => {
        setMarketData({
          nifty50: 24567.89,
          sensex: 81234.56,
          goldPrice: 62500,
          silverPrice: 78500,
          dollarRate: 83.45,
          bitcoinPrice: 4250000,
          change: {
            nifty50: 1.25,
            sensex: 0.89,
            goldPrice: -0.45,
            silverPrice: 0.67,
            dollarRate: -0.12,
            bitcoinPrice: 2.34
          }
        });
      }, 1000);
    };

    fetchMarketData();
  }, []);

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <>
      <SEOHelmet
        title="Comprehensive Finance Hub - India's Complete Financial Platform"
        description="Complete finance platform covering personal finance, investments, loans, insurance, tax planning, retirement, banking, government schemes, and financial education. 200+ tools and calculators."
        keywords="finance india, personal finance, investment planning, loan Calculator, insurance, tax planning, retirement planning, banking, government schemes, financial education, mutual funds, stock market, cryptocurrency, home loans, credit cards"
        url="/comprehensive-finance-hub"
        image="/images/comprehensive-finance-hub.jpg"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  India's Complete
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                    {' '}Finance Platform
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Everything you need for financial success - from personal finance to investment strategies,
                  loan planning to tax optimization. 200+ tools, calculators, and expert guidance.
                </p>
              </motion.div>

              {/* Market Data Ticker */}
              {marketData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-4xl mx-auto"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Market Data</h3>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Nifty 50</p>
                      <p className="font-semibold text-gray-900">{marketData.nifty50.toLocaleString()}</p>
                      <div className={`flex items-center justify-center ${getChangeColor(marketData.change.nifty50)}`}>
                        {getChangeIcon(marketData.change.nifty50)}
                        <span className="ml-1 text-sm">{Math.abs(marketData.change.nifty50)}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Sensex</p>
                      <p className="font-semibold text-gray-900">{marketData.sensex.toLocaleString()}</p>
                      <div className={`flex items-center justify-center ${getChangeColor(marketData.change.sensex)}`}>
                        {getChangeIcon(marketData.change.sensex)}
                        <span className="ml-1 text-sm">{Math.abs(marketData.change.sensex)}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Gold (₹/10g)</p>
                      <p className="font-semibold text-gray-900">₹{marketData.goldPrice.toLocaleString()}</p>
                      <div className={`flex items-center justify-center ${getChangeColor(marketData.change.goldPrice)}`}>
                        {getChangeIcon(marketData.change.goldPrice)}
                        <span className="ml-1 text-sm">{Math.abs(marketData.change.goldPrice)}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">USD/INR</p>
                      <p className="font-semibold text-gray-900">₹{marketData.dollarRate}</p>
                      <div className={`flex items-center justify-center ${getChangeColor(marketData.change.dollarRate)}`}>
                        {getChangeIcon(marketData.change.dollarRate)}
                        <span className="ml-1 text-sm">{Math.abs(marketData.change.dollarRate)}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Bitcoin</p>
                      <p className="font-semibold text-gray-900">₹{(marketData.bitcoinPrice / 100000).toFixed(1)}L</p>
                      <div className={`flex items-center justify-center ${getChangeColor(marketData.change.bitcoinPrice)}`}>
                        {getChangeIcon(marketData.change.bitcoinPrice)}
                        <span className="ml-1 text-sm">{Math.abs(marketData.change.bitcoinPrice)}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Silver (₹/kg)</p>
                      <p className="font-semibold text-gray-900">₹{marketData.silverPrice.toLocaleString()}</p>
                      <div className={`flex items-center justify-center ${getChangeColor(marketData.change.silverPrice)}`}>
                        {getChangeIcon(marketData.change.silverPrice)}
                        <span className="ml-1 text-sm">{Math.abs(marketData.change.silverPrice)}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search finance topics, tools, or calculators..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white min-w-[200px]"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label} ({category.count})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Showing {filteredTopics.length} of {financeTopics.length} finance topics
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>


        {/* Finance Topics Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={topic.url}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-full border border-gray-100 hover:border-blue-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${topic.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                          {topic.icon}
                        </div>
                        <div className="flex gap-2">
                          {topic.trending && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </span>
                          )}
                          {topic.new && (
                            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              New
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {topic.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center">
                            <IndianRupee className="h-4 w-4 mr-1" />
                            {topic.tools} tools
                          </span>
                          <span className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {topic.articles} articles
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Key Features Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose MoneyCal India?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                India's most comprehensive financial platform with cutting-edge tools and expert guidance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">200+ Tools</h3>
                <p className="text-gray-600">Comprehensive calculators and financial tools for every need</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Data</h3>
                <p className="text-gray-600">Live market data and current financial information</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Content</h3>
                <p className="text-gray-600">In-depth articles and guides by financial experts</p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Platform</h3>
                <p className="text-gray-600">Secure, reliable, and trusted by millions of users</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Financial Journey Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join millions of Indians who trust MoneyCal for their financial planning and decision-making
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculators"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Calculators
              </Link>
              <Link
                to="/blog" reloadDocument
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Read Financial Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComprehensiveFinanceHub;
