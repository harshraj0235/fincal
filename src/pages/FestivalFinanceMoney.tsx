import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wallet, Search, Filter, DollarSign, TrendingUp, CreditCard, Calculator,
  Home, ChevronRight, X, Star, Zap, PiggyBank, Target, Shield,
  BarChart3, Percent, Award, Users, Bell, ArrowRight, TrendingDown,
  Coins, Landmark, RefreshCw, AlertCircle, CheckCircle, Activity,
  Smartphone, Gift, Heart, FileText, LineChart, Calendar, Lock
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface FinanceTool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  keywords: string[];
  url: string;
  popular?: boolean;
  trending?: boolean;
}

const FestivalFinanceMoney: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: Wallet, count: 50 },
    { id: 'investment', name: 'Investment & Savings', icon: TrendingUp, count: 10 },
    { id: 'budget', name: 'Budget & Planning', icon: Calculator, count: 12 },
    { id: 'emi-loans', name: 'EMI & Loans', icon: CreditCard, count: 9 },
    { id: 'gold-silver', name: 'Gold & Silver', icon: Coins, count: 5 },
    { id: 'cashback', name: 'Cashback & Rewards', icon: Percent, count: 7 },
    { id: 'tax-charity', name: 'Tax & Charity', icon: FileText, count: 7 }
  ];

  const financeTools: FinanceTool[] = [
    // Investment & Savings Tools
    {
      id: 'dhanteras-gold-silver-roi',
      name: 'Dhanteras Gold vs Silver ROI Calculator',
      description: 'Compare returns on gold and silver investments for Dhanteras',
      icon: Coins,
      category: 'investment',
      keywords: ['dhanteras', 'gold', 'silver', 'roi', 'investment'],
      url: '/festival-tools/dhanteras-gold-silver-roi',
      popular: true,
      trending: true
    },
    {
      id: 'festival-savings-goal',
      name: 'Festival Savings Goal Tracker',
      description: 'Track progress towards your festival savings goals',
      icon: Target,
      category: 'investment',
      keywords: ['savings', 'goal', 'tracker', 'festival'],
      url: '/festival-tools/festival-savings-goal',
      popular: true
    },
    {
      id: 'custom-sip-festivals',
      name: 'Custom SIP Plan for Festivals',
      description: 'Create SIP plan to save for upcoming festivals',
      icon: TrendingUp,
      category: 'investment',
      keywords: ['sip', 'systematic', 'investment', 'festival'],
      url: '/festival-tools/custom-sip-festivals',
      popular: true
    },
    {
      id: 'short-term-investment',
      name: 'Short-Term Investment Planner',
      description: 'Plan short-term investments for festival shopping',
      icon: BarChart3,
      category: 'investment',
      keywords: ['short term', 'investment', 'planner', 'festival'],
      url: '/festival-tools/short-term-investment'
    },
    {
      id: 'festival-saving-jar',
      name: 'Festival Saving Jar Simulator',
      description: 'Visual savings jar to track festival fund growth',
      icon: PiggyBank,
      category: 'investment',
      keywords: ['saving jar', 'visual', 'tracker', 'simulation'],
      url: '/festival-tools/festival-saving-jar'
    },
    {
      id: 'mutual-fund-festival-goal',
      name: 'Mutual Fund SIP for Festival Goal Planner',
      description: 'Plan mutual fund SIP to achieve festival goals',
      icon: TrendingUp,
      category: 'investment',
      keywords: ['mutual fund', 'sip', 'goal', 'planner'],
      url: '/festival-tools/mutual-fund-festival-goal'
    },
    {
      id: 'save-10000-diwali',
      name: 'Save ₹10,000 Before Diwali Planner',
      description: 'Step-by-step plan to save ₹10,000 for Diwali',
      icon: Target,
      category: 'investment',
      keywords: ['save', 'diwali', '10000', 'plan'],
      url: '/festival-tools/save-10000-diwali',
      trending: true
    },
    {
      id: 'best-saving-account-diwali',
      name: 'Best Saving Account for Diwali Offers',
      description: 'Compare savings accounts with festival offers',
      icon: Landmark,
      category: 'investment',
      keywords: ['saving account', 'diwali', 'offers', 'compare'],
      url: '/festival-tools/best-saving-account-diwali'
    },
    {
      id: 'festival-investment-couples',
      name: 'Festival Investment Planner for Couples',
      description: 'Joint investment planning tool for couples',
      icon: Heart,
      category: 'investment',
      keywords: ['couples', 'investment', 'joint', 'planning'],
      url: '/festival-tools/festival-investment-couples'
    },
    {
      id: 'festival-saving-challenge',
      name: 'Festival Saving Challenge Tool (52 Weeks)',
      description: '52-week challenge to save for all festivals',
      icon: Award,
      category: 'investment',
      keywords: ['52 weeks', 'challenge', 'saving', 'yearly'],
      url: '/festival-tools/festival-saving-challenge'
    },

    // Budget & Planning Tools
    {
      id: 'festival-budget-auto-planner',
      name: 'Festival Budget Auto Planner',
      description: 'AI-powered automatic festival budget planning',
      icon: Calculator,
      category: 'budget',
      keywords: ['budget', 'auto', 'planner', 'ai', 'festival'],
      url: '/festival-tools/festival-budget-auto-planner',
      popular: true,
      trending: true
    },
    {
      id: 'festival-inflation-budget',
      name: 'Festival Inflation Adjusted Budget Tool',
      description: 'Adjust festival budget for current inflation rates',
      icon: TrendingUp,
      category: 'budget',
      keywords: ['inflation', 'budget', 'adjusted', 'festival'],
      url: '/festival-tools/festival-inflation-budget'
    },
    {
      id: 'family-expense-splitter',
      name: 'Family Festival Expense Splitter',
      description: 'Split festival expenses fairly among family members',
      icon: Users,
      category: 'budget',
      keywords: ['family', 'expense', 'splitter', 'festival'],
      url: '/festival-tools/family-expense-splitter',
      popular: true
    },
    {
      id: 'budget-heatmap',
      name: 'Festival Budget Heatmap Generator',
      description: 'Visual heatmap of festival spending patterns',
      icon: Activity,
      category: 'budget',
      keywords: ['heatmap', 'visual', 'budget', 'pattern'],
      url: '/festival-tools/budget-heatmap'
    },
    {
      id: 'spend-analyzer',
      name: 'How Much Should I Spend Analyzer',
      description: 'Get personalized festival spending recommendations',
      icon: AlertCircle,
      category: 'budget',
      keywords: ['spend', 'analyzer', 'recommendation', 'personalized'],
      url: '/festival-tools/spend-analyzer'
    },
    {
      id: 'budget-distribution-pie',
      name: 'Budget Distribution Pie Generator',
      description: 'Create visual pie charts of budget distribution',
      icon: BarChart3,
      category: 'budget',
      keywords: ['pie chart', 'distribution', 'visual', 'budget'],
      url: '/festival-tools/budget-distribution-pie'
    },
    {
      id: 'yearly-festival-calendar',
      name: 'Yearly Festival Expense Calendar',
      description: 'Annual calendar with all festival expense tracking',
      icon: Calendar,
      category: 'budget',
      keywords: ['yearly', 'calendar', 'expense', 'annual'],
      url: '/festival-tools/yearly-festival-calendar'
    },
    {
      id: 'smart-wallet-12-festivals',
      name: 'Smart Wallet Planner for 12 Festivals',
      description: 'Plan budget for all 12 major Indian festivals',
      icon: Wallet,
      category: 'budget',
      keywords: ['12 festivals', 'wallet', 'planner', 'yearly'],
      url: '/festival-tools/smart-wallet-12-festivals'
    },
    {
      id: 'household-festival-merge',
      name: 'Household Monthly + Festival Budget Merge',
      description: 'Merge regular and festival budgets seamlessly',
      icon: RefreshCw,
      category: 'budget',
      keywords: ['household', 'merge', 'monthly', 'festival'],
      url: '/festival-tools/household-festival-merge'
    },
    {
      id: 'expense-history-visualizer',
      name: 'Expense History Visualizer',
      description: 'Visualize past festival spending patterns',
      icon: LineChart,
      category: 'budget',
      keywords: ['history', 'visualizer', 'pattern', 'expense'],
      url: '/festival-tools/expense-history-visualizer'
    },
    {
      id: 'family-budget-adjuster',
      name: 'Family Budget Auto-Adjuster',
      description: 'Automatically adjust family budget based on income',
      icon: Users,
      category: 'budget',
      keywords: ['family', 'auto adjust', 'income', 'budget'],
      url: '/festival-tools/family-budget-adjuster'
    },
    {
      id: 'budget-reality-analyzer',
      name: 'Budget vs Reality Analyzer',
      description: 'Compare planned budget vs actual spending',
      icon: BarChart3,
      category: 'budget',
      keywords: ['budget', 'reality', 'compare', 'actual'],
      url: '/festival-tools/budget-reality-analyzer'
    },

    // EMI & Loans Tools
    {
      id: 'festival-emi-burden',
      name: 'Festival EMI Burden Calculator',
      description: 'Calculate total EMI burden from festival shopping',
      icon: CreditCard,
      category: 'emi-loans',
      keywords: ['emi', 'burden', 'calculator', 'festival'],
      url: '/festival-tools/festival-emi-burden',
      popular: true
    },
    {
      id: 'diwali-loan-comparison',
      name: 'Diwali Loan Comparison Tool',
      description: 'Compare festival loans from multiple banks',
      icon: Landmark,
      category: 'emi-loans',
      keywords: ['loan', 'comparison', 'diwali', 'banks'],
      url: '/festival-tools/diwali-loan-comparison',
      popular: true
    },
    {
      id: 'bnpl-interest-estimator',
      name: 'Buy Now Pay Later Interest Estimator',
      description: 'Calculate hidden costs of BNPL schemes',
      icon: CreditCard,
      category: 'emi-loans',
      keywords: ['bnpl', 'buy now pay later', 'interest', 'cost'],
      url: '/festival-tools/bnpl-interest-estimator',
      trending: true
    },
    {
      id: 'gold-loan-credit-card',
      name: 'Gold Loan vs Credit Card EMI Comparison',
      description: 'Compare gold loan with credit card EMI costs',
      icon: Coins,
      category: 'emi-loans',
      keywords: ['gold loan', 'credit card', 'emi', 'compare'],
      url: '/festival-tools/gold-loan-credit-card'
    },
    {
      id: 'emi-affordability',
      name: 'EMI Affordability Analyzer',
      description: 'Check if you can afford festival EMIs',
      icon: CheckCircle,
      category: 'emi-loans',
      keywords: ['emi', 'affordability', 'check', 'income'],
      url: '/festival-tools/emi-affordability'
    },
    {
      id: 'salary-advance-emi',
      name: 'Salary Advance vs EMI Calculator',
      description: 'Compare salary advance with EMI options',
      icon: DollarSign,
      category: 'emi-loans',
      keywords: ['salary', 'advance', 'emi', 'compare'],
      url: '/festival-tools/salary-advance-emi'
    },
    {
      id: 'emi-free-shopping',
      name: 'EMI-Free Shopping Alert',
      description: 'Get alerts for zero-interest EMI offers',
      icon: Bell,
      category: 'emi-loans',
      keywords: ['emi free', 'zero interest', 'alert', 'offers'],
      url: '/festival-tools/emi-free-shopping'
    },
    {
      id: 'zero-interest-emi',
      name: 'Zero-Interest EMI Finder',
      description: 'Find genuine zero-interest EMI deals',
      icon: Percent,
      category: 'emi-loans',
      keywords: ['zero interest', 'emi', 'finder', 'deals'],
      url: '/festival-tools/zero-interest-emi'
    },
    {
      id: 'moneylender-rate-comparison',
      name: 'Local Moneylender Rate Comparison',
      description: 'Compare local lender rates with banks',
      icon: Landmark,
      category: 'emi-loans',
      keywords: ['moneylender', 'rate', 'comparison', 'local'],
      url: '/festival-tools/moneylender-rate-comparison'
    },

    // Gold & Silver Tools
    {
      id: 'gold-price-predictor',
      name: 'Gold Price Predictor Tool',
      description: 'AI-based gold price prediction for festivals',
      icon: Coins,
      category: 'gold-silver',
      keywords: ['gold', 'price', 'predictor', 'forecast'],
      url: '/festival-tools/gold-price-predictor',
      trending: true
    },
    {
      id: 'silver-coin-bar',
      name: 'Silver Coin vs Bar Investment Tool',
      description: 'Compare silver coin and bar investment returns',
      icon: Coins,
      category: 'gold-silver',
      keywords: ['silver', 'coin', 'bar', 'investment'],
      url: '/festival-tools/silver-coin-bar'
    },
    {
      id: 'festival-roi-analyzer',
      name: 'Festival ROI Analyzer',
      description: 'Analyze return on investment for festival purchases',
      icon: TrendingUp,
      category: 'gold-silver',
      keywords: ['roi', 'analyzer', 'return', 'investment'],
      url: '/festival-tools/festival-roi-analyzer'
    },
    {
      id: 'gifting-roi-estimator',
      name: 'Festival Gifting ROI Estimator',
      description: 'Calculate ROI on valuable gifts like gold',
      icon: Gift,
      category: 'gold-silver',
      keywords: ['gifting', 'roi', 'gold', 'valuable'],
      url: '/festival-tools/gifting-roi-estimator'
    },
    {
      id: 'wealth-distribution-chart',
      name: 'Wealth Distribution Chart Maker',
      description: 'Create charts showing wealth distribution',
      icon: BarChart3,
      category: 'gold-silver',
      keywords: ['wealth', 'distribution', 'chart', 'visual'],
      url: '/festival-tools/wealth-distribution-chart'
    },

    // Cashback & Rewards Tools
    {
      id: 'credit-card-cashback',
      name: 'Festival Credit Card Cashback Calculator',
      description: 'Calculate maximum cashback from credit cards',
      icon: CreditCard,
      category: 'cashback',
      keywords: ['credit card', 'cashback', 'calculator', 'festival'],
      url: '/festival-tools/credit-card-cashback',
      popular: true
    },
    {
      id: 'upi-cashback-tracker',
      name: 'UPI Cashback Tracker',
      description: 'Track all UPI cashback during festivals',
      icon: Smartphone,
      category: 'cashback',
      keywords: ['upi', 'cashback', 'tracker', 'rewards'],
      url: '/festival-tools/upi-cashback-tracker',
      popular: true
    },
    {
      id: 'reward-points-maximizer',
      name: 'Reward Points Maximizer Tool',
      description: 'Maximize reward points on festival shopping',
      icon: Award,
      category: 'cashback',
      keywords: ['reward points', 'maximize', 'shopping', 'festival'],
      url: '/festival-tools/reward-points-maximizer'
    },
    {
      id: 'upi-limit-checker',
      name: 'UPI Limit Checker for Festival Days',
      description: 'Check UPI transaction limits for festival shopping',
      icon: Smartphone,
      category: 'cashback',
      keywords: ['upi', 'limit', 'checker', 'transaction'],
      url: '/festival-tools/upi-limit-checker'
    },
    {
      id: 'offer-cashback-profit',
      name: 'Festival Offer vs Cashback Profit Calculator',
      description: 'Compare instant discount vs cashback offers',
      icon: Percent,
      category: 'cashback',
      keywords: ['offer', 'cashback', 'compare', 'profit'],
      url: '/festival-tools/offer-cashback-profit'
    },
    {
      id: 'gift-voucher-cashback',
      name: 'Gift Voucher vs Cashback Value Tool',
      description: 'Compare gift voucher vs cashback value',
      icon: Gift,
      category: 'cashback',
      keywords: ['gift voucher', 'cashback', 'value', 'compare'],
      url: '/festival-tools/gift-voucher-cashback'
    },
    {
      id: 'credit-card-reward-simulator',
      name: 'Credit Card Reward Simulator',
      description: 'Simulate reward earnings on festival shopping',
      icon: CreditCard,
      category: 'cashback',
      keywords: ['credit card', 'reward', 'simulator', 'earnings'],
      url: '/festival-tools/credit-card-reward-simulator'
    },

    // Tax & Charity Tools
    {
      id: 'diwali-bonus-tax',
      name: 'Diwali Bonus Tax Calculator',
      description: 'Calculate tax on Diwali bonus and take-home amount',
      icon: FileText,
      category: 'tax-charity',
      keywords: ['diwali', 'bonus', 'tax', 'calculator'],
      url: '/festival-tools/diwali-bonus-tax',
      popular: true,
      trending: true
    },
    {
      id: 'gift-tax-estimation',
      name: 'Gift Tax Estimation Tool',
      description: 'Estimate tax implications on valuable gifts',
      icon: Gift,
      category: 'tax-charity',
      keywords: ['gift', 'tax', 'estimation', 'valuable'],
      url: '/festival-tools/gift-tax-estimation'
    },
    {
      id: 'charity-donation-tax',
      name: 'Charity Donation Tax Benefit Calculator',
      description: 'Calculate tax benefits on festival donations',
      icon: Heart,
      category: 'tax-charity',
      keywords: ['charity', 'donation', 'tax', 'benefit'],
      url: '/festival-tools/charity-donation-tax'
    },
    {
      id: 'donation-tracker-temples',
      name: 'Donation Tracker for Temples',
      description: 'Track temple donations with tax benefit tracking',
      icon: Heart,
      category: 'tax-charity',
      keywords: ['donation', 'temple', 'tracker', 'tax'],
      url: '/festival-tools/donation-tracker-temples'
    },
    {
      id: 'festival-insurance',
      name: 'Festival Insurance Planner',
      description: 'Plan insurance for festival shopping and travel',
      icon: Shield,
      category: 'tax-charity',
      keywords: ['insurance', 'planner', 'festival', 'protection'],
      url: '/festival-tools/festival-insurance'
    },
    {
      id: 'festival-scam-checker',
      name: 'Festival Season Scam Checker',
      description: 'Check and avoid festival shopping scams',
      icon: AlertCircle,
      category: 'tax-charity',
      keywords: ['scam', 'checker', 'fraud', 'alert'],
      url: '/festival-tools/festival-scam-checker'
    },
    {
      id: 'festival-financial-health',
      name: 'Festival Financial Health Meter',
      description: 'Assess your financial health for festival spending',
      icon: Activity,
      category: 'tax-charity',
      keywords: ['financial health', 'meter', 'assessment', 'festival'],
      url: '/festival-tools/festival-financial-health'
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = financeTools;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const popularTools = financeTools.filter(tool => tool.popular);
  const trendingTools = financeTools.filter(tool => tool.trending);

  return (
    <>
      <SEOHelmet
        title="Festival Finance & Money Tools 2025 | Festival Saving Plan, Dhanteras Gold Investment"
        description="Smart festival finance tools: festival saving plans, Dhanteras gold investment calculator, Diwali bonus tax calculator, EMI planner, cashback tracker. Save money on festival shopping!"
        keywords="festival saving plan, dhanteras gold investment, diwali bonus calculator, festival budget planner, festival emi calculator, gold vs silver roi, festival cashback, diwali loan, festival savings goal"
        url="/festival-finance"
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-green-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-green-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-green-600 font-medium">Festival Finance</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full mb-6">
                <Wallet className="w-5 h-5" />
                <span className="font-semibold">50+ Festival Finance Tools</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Festival Finance & Money Tools
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Smart financial planning for festivals! Create festival saving plans, calculate Dhanteras gold investment ROI, plan EMI budgets, track cashback, and manage Diwali bonus effectively.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tools... (e.g., saving plan, gold investment, EMI)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <span className="text-sm text-gray-600">Popular:</span>
                  {['Saving Plan', 'Gold Investment', 'EMI Calculator', 'Bonus Tax'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-white hover:bg-green-50 border border-green-200 rounded-full text-sm text-green-600 font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-white border-y border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className={`flex flex-wrap gap-3 ${!showFilters ? 'hidden lg:flex' : ''}`}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Popular & Trending Section */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Popular Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Star className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
                  </div>
                  <div className="space-y-4">
                    {popularTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={tool.url}
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-green-500 hover:border-green-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Trending Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                  </div>
                  <div className="space-y-4">
                    {trendingTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={tool.url}
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-teal-500 hover:border-teal-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Tools Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {searchQuery ? `Search Results (${filteredTools.length})` : 
                 selectedCategory !== 'all' ? `${categories.find(c => c.id === selectedCategory)?.name} (${filteredTools.length})` :
                 `All Tools (${filteredTools.length})`}
              </h2>
            </div>

            {filteredTools.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No tools found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={tool.url}
                      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-green-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <tool.icon className="w-7 h-7 text-white" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                              Popular
                            </span>
                          )}
                          {tool.trending && (
                            <span className="px-2 py-1 bg-teal-100 text-teal-600 text-xs font-bold rounded-full flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                          Use Tool
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Festival Finance & Money Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Use Festival Finance Tools?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Festival celebrations can strain your finances if not planned properly. Our smart finance tools help you:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Create effective festival saving plans
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Calculate Dhanteras gold vs silver investment ROI
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Plan EMI budgets without overburdening finances
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Maximize cashback and reward points
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Calculate tax on Diwali bonus and gifts
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      Track all festival expenses and savings
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Festival Finance Queries</h3>
                  <div className="bg-green-50 p-6 rounded-2xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <Target className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold">How to save for Diwali 2025?</span>
                      </li>
                      <li className="flex items-center">
                        <Coins className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-semibold">Gold vs Silver on Dhanteras - which is better?</span>
                      </li>
                      <li className="flex items-center">
                        <Calculator className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold">Festival EMI calculator with interest</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-semibold">Diwali bonus tax calculation 2025</span>
                      </li>
                      <li className="flex items-center">
                        <Percent className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-semibold">Best cashback offers for festival shopping</span>
                      </li>
                      <li className="flex items-center">
                        <PiggyBank className="w-5 h-5 text-pink-600 mr-2" />
                        <span className="font-semibold">Festival savings goal tracker</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Festival Money Management Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                  <PiggyBank className="w-10 h-10 text-green-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Start Early Savings</h4>
                  <p className="text-sm text-gray-700">Begin saving 6-12 months before major festivals using SIP or recurring deposits for stress-free celebrations.</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl">
                  <Coins className="w-10 h-10 text-emerald-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Smart Gold Investment</h4>
                  <p className="text-sm text-gray-700">Compare gold and silver ROI on Dhanteras. Consider digital gold for smaller investments with better liquidity.</p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl">
                  <CreditCard className="w-10 h-10 text-teal-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">EMI Planning</h4>
                  <p className="text-sm text-gray-700">Choose zero-interest EMI options carefully. Calculate total burden and ensure it doesn't exceed 30% of income.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Festival Finance Categories</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Investment & Savings (10 tools)</h4>
                  <p className="text-gray-700 text-sm">Gold vs Silver ROI, SIP planners, savings goal trackers, investment analyzers, and wealth management tools for festivals.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Budget & Planning (12 tools)</h4>
                  <p className="text-gray-700 text-sm">Auto planners, expense splitters, budget visualizers, spending analyzers, and comprehensive financial planning tools.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">EMI & Loans (9 tools)</h4>
                  <p className="text-gray-700 text-sm">EMI calculators, loan comparisons, BNPL analyzers, affordability checkers, and zero-interest EMI finders.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Gold & Silver (5 tools)</h4>
                  <p className="text-gray-700 text-sm">Price predictors, investment comparators, ROI analyzers, and wealth distribution tools for precious metals.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Cashback & Rewards (7 tools)</h4>
                  <p className="text-gray-700 text-sm">Credit card cashback calculators, UPI trackers, reward maximizers, and offer comparison tools.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Tax & Charity (7 tools)</h4>
                  <p className="text-gray-700 text-sm">Bonus tax calculators, gift tax estimators, donation benefit calculators, and financial health meters.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How much should I save for Diwali 2025?</h4>
                  <p className="text-gray-700 text-sm">A typical middle-class family should save ₹15,000-50,000 for Diwali. Use our Festival Budget Planner to calculate based on your specific needs including gifts, decorations, clothes, and sweets.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Is gold or silver better investment on Dhanteras?</h4>
                  <p className="text-gray-700 text-sm">Historically, gold offers stable long-term returns (8-10% annually) while silver is more volatile with higher potential gains. Use our Gold vs Silver ROI Calculator to compare based on current prices and your investment horizon.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How is Diwali bonus taxed?</h4>
                  <p className="text-gray-700 text-sm">Diwali bonus is added to your annual salary and taxed according to your income tax slab. Use our Diwali Bonus Tax Calculator to find your exact take-home amount after TDS deductions.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Are zero-interest EMIs really free?</h4>
                  <p className="text-gray-700 text-sm">Most "zero-interest" EMIs include processing fees or higher product prices. Use our BNPL Interest Estimator to calculate the real cost and compare with upfront payment discounts.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Start Smart Festival Financial Planning Today!</h3>
                <p className="mb-6 text-white/90">
                  Save smartly, invest wisely, and celebrate festivals without financial stress. Use our 50+ tools to plan every aspect of festival finances!
                </p>
                <Link
                  to="/festival-tools"
                  className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Explore All Festival Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FestivalFinanceMoney;

