import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Star, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  CreditCard, 
  PiggyBank, 
  FileText, 
  Users, 
  Target, 
  Zap, 
  BookOpen, 
  Coins, 
  Sparkles, 
  BarChart3, 
  Wrench, 
  Monitor, 
  Clock, 
  Building2,
  Rocket
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  path: string;
  isPopular?: boolean;
  isNew?: boolean;
  color: string;
}

const ToolsHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools: Tool[] = [
    // Financial Calculators
    {
      id: 'emi-calculator',
      name: 'EMI Calculator',
      description: 'Calculate loan EMI, total interest, and payment schedule',
      icon: <Calculator className="h-6 w-6" />,
      category: 'Financial Calculators',
      path: '/calculators/emi-calculator',
      isPopular: true,
      color: 'from-blue-500 to-blue-600'
    },
    // Corporate & Insurance Hubs
    {
      id: 'corporate-finance',
      name: 'Corporate Finance Tools',
      description: 'Business valuation, M&A synergy, working capital, WACC, more',
      icon: <Building2 className="h-6 w-6" />,
      category: 'Corporate Finance',
      path: '/corporate-finance',
      color: 'from-slate-500 to-slate-600'
    },
    {
      id: 'insurance-tools',
      name: 'Insurance Planning Tools',
      description: 'Life, health, car, travel, home, ULIP and more',
      icon: <Shield className="h-6 w-6" />,
      category: 'Insurance',
      path: '/insurance-tools',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'gst-tools',
      name: 'GST Tools Hub',
      description: 'GST calculator, due dates, GSTR-3B, HSN finder, invoice, ITC',
      icon: <FileText className="h-6 w-6" />,
      category: 'Tax Tools',
      path: '/gst-tools',
      isNew: true,
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'sip-calculator',
      name: 'SIP Calculator',
      description: 'Plan investments and calculate returns on SIP investments',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Financial Calculators',
      path: '/calculators/sip-calculator',
      isPopular: true,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'income-tax-calculator',
      name: 'Income Tax Calculator',
      description: 'Calculate income tax liability under old and new tax regimes',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Financial Calculators',
      path: '/calculators/income-tax-calculator',
      isPopular: true,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'fd-calculator',
      name: 'FD Calculator',
      description: 'Calculate fixed deposit returns and maturity amount',
      icon: <PiggyBank className="h-6 w-6" />,
      category: 'Financial Calculators',
      path: '/calculators/fd-calculator',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'ppf-calculator',
      name: 'PPF Calculator',
      description: 'Calculate PPF returns and maturity benefits',
      icon: <Shield className="h-6 w-6" />,
      category: 'Financial Calculators',
      path: '/calculators/ppf-calculator',
      color: 'from-orange-500 to-orange-600'
    },

    // Stock Market Tools
    {
      id: 'stock-screener',
      name: 'Stock Screener',
      description: 'Advanced stock screening and analysis tool',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Stock Market Tools',
      path: '/calculators/stock-screener',
      isNew: true,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'cagr-calculator',
      name: 'CAGR Calculator',
      description: 'Calculate Compound Annual Growth Rate',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Stock Market Tools',
      path: '/calculators/cagr-calculator',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'pe-ratio-calculator',
      name: 'P/E Ratio Calculator',
      description: 'Calculate Price-to-Earnings ratio for stocks',
      icon: <Target className="h-6 w-6" />,
      category: 'Stock Market Tools',
      path: '/calculators/pe-ratio-calculator',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'intrinsic-value-calculator',
      name: 'Intrinsic Value Calculator',
      description: 'Calculate intrinsic value of stocks',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Stock Market Tools',
      path: '/calculators/intrinsic-value-calculator',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'xirr-calculator',
      name: 'XIRR Calculator',
      description: 'Calculate returns for irregular investments',
      icon: <Calculator className="h-6 w-6" />,
      category: 'Stock Market Tools',
      path: '/calculators/xirr-calculator',
      color: 'from-lime-500 to-lime-600'
    },

    // Business Tools
    {
      id: 'discount-profit-calculator',
      name: 'Discount Profit Calculator',
      description: 'Calculate profit margins and discounts',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Business Tools',
      path: '/tools/discount-profit',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'product-comparison-matrix',
      name: 'Product Comparison Matrix',
      description: 'Compare products and make informed decisions',
      icon: <Target className="h-6 w-6" />,
      category: 'Business Tools',
      path: '/tools/product-comparison',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'emi-affordability-checker',
      name: 'EMI Affordability Checker',
      description: 'Check if you can afford a loan EMI',
      icon: <CreditCard className="h-6 w-6" />,
      category: 'Business Tools',
      path: '/tools/emi-affordability',
      color: 'from-violet-500 to-violet-600'
    },
    {
      id: 'stock-checker',
      name: 'Real-time Stock Checker',
      description: 'Check real-time stock prices and data',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Business Tools',
      path: '/tools/stock-checker',
      color: 'from-blue-500 to-blue-600'
    },

    // Productivity Tools
    {
      id: 'price-tag-creator',
      name: 'Price Tag Label Creator',
      description: 'Create professional price tags and labels',
      icon: <FileText className="h-6 w-6" />,
      category: 'Productivity Tools',
      path: '/tools/price-tag',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'meeting-notes-taker',
      name: 'Meeting Agenda Note Taker',
      description: 'Organize meeting notes and agendas',
      icon: <FileText className="h-6 w-6" />,
      category: 'Productivity Tools',
      path: '/tools/meeting-notes',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'business-card-creator',
      name: 'Digital Business Card Creator',
      description: 'Create professional digital business cards',
      icon: <Users className="h-6 w-6" />,
      category: 'Productivity Tools',
      path: '/tools/business-card',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'qr-generator',
      name: 'QR Code Generator',
      description: 'Generate QR codes for various purposes',
      icon: <Monitor className="h-6 w-6" />,
      category: 'Productivity Tools',
      path: '/tools/qr-generator',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'persona-builder',
      name: 'Customer Persona Builder',
      description: 'Build detailed customer personas',
      icon: <Users className="h-6 w-6" />,
      category: 'Productivity Tools',
      path: '/tools/persona-builder',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'timezone-converter',
      name: 'Time Zone Converter',
      description: 'Convert time between different time zones',
      icon: <Clock className="h-6 w-6" />,
      category: 'Productivity Tools',
      path: '/tools/timezone-converter',
      color: 'from-teal-500 to-teal-600'
    },

    // Sales & Marketing Tools
    {
      id: 'sales-script-assistant',
      name: 'Sales Script Assistant',
      description: 'Create effective sales scripts and pitches',
      icon: <Target className="h-6 w-6" />,
      category: 'Sales & Marketing',
      path: '/tools/sales-script',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'sales-performance-tracker',
      name: 'Sales Performance Tracker',
      description: 'Track and analyze sales performance',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Sales & Marketing',
      path: '/tools/sales-tracker',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'competitive-analysis',
      name: 'Competitive Analysis Cheat Sheet',
      description: 'Analyze competitors and market position',
      icon: <Target className="h-6 w-6" />,
      category: 'Sales & Marketing',
      path: '/tools/competitive-analysis',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'proposal-template-builder',
      name: 'Offer Proposal Template Builder',
      description: 'Create professional proposal templates',
      icon: <FileText className="h-6 w-6" />,
      category: 'Sales & Marketing',
      path: '/tools/proposal-template',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'feedback-form-generator',
      name: 'Simple Feedback Form Generator',
      description: 'Create feedback forms for customers',
      icon: <Users className="h-6 w-6" />,
      category: 'Sales & Marketing',
      path: '/tools/feedback-form',
      color: 'from-pink-500 to-pink-600'
    },

    // Specialized Tools
    {
      id: 'stock-market-course',
      name: 'Stock Market Course',
      description: 'Comprehensive stock market education platform',
      icon: <BookOpen className="h-6 w-6" />,
      category: 'Education',
      path: '/stock-market',
      isPopular: true,
      color: 'from-green-500 to-blue-600'
    },
    {
      id: 'astro-finance',
      name: 'Astro Finance',
      description: 'Vedic astrology-based financial guidance',
      icon: <Sparkles className="h-6 w-6" />,
      category: 'Specialized',
      path: '/astro-finance',
      isPopular: true,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'crypto-tools',
      name: 'Crypto Tools',
      description: 'Cryptocurrency analysis and tools',
      icon: <Coins className="h-6 w-6" />,
      category: 'Specialized',
      path: '/crypto',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'excel-tools',
      name: 'Excel Tools',
      description: 'Advanced Excel tools and templates',
      icon: <Wrench className="h-6 w-6" />,
      category: 'Productivity Tools',
      path: '/excel-tools',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'tax-tools-hub',
      name: 'Tax & Profit Simplifiers',
      description: 'Comprehensive collection of tax tools and calculators',
      icon: <Calculator className="h-6 w-6" />,
      category: 'Tax Tools',
      path: '/tax-tools',
      isNew: true,
      color: 'from-red-500 to-red-600'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: <Zap className="h-5 w-5" /> },
    { id: 'Financial Calculators', name: 'Financial Calculators', icon: <Calculator className="h-5 w-5" /> },
    { id: 'Stock Market Tools', name: 'Stock Market Tools', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'Corporate Finance', name: 'Corporate Finance', icon: <Building2 className="h-5 w-5" /> },
    { id: 'Insurance', name: 'Insurance', icon: <Shield className="h-5 w-5" /> },
    { id: 'Business Tools', name: 'Business Tools', icon: <Building2 className="h-5 w-5" /> },
    { id: 'Productivity Tools', name: 'Productivity Tools', icon: <Wrench className="h-5 w-5" /> },
    { id: 'Sales & Marketing', name: 'Sales & Marketing', icon: <Target className="h-5 w-5" /> },
    { id: 'Tax Tools', name: 'Tax Tools', icon: <Calculator className="h-5 w-5" /> },
    { id: 'Education', name: 'Education', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'Specialized', name: 'Specialized', icon: <Star className="h-5 w-5" /> }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHelmet
        title="Tools Hub - All Financial Tools & Calculators | MoneyCal"
        description="Explore our comprehensive collection of financial tools, calculators, and utilities. From EMI calculators to stock screeners, find everything you need for smart financial decisions."
        keywords="financial tools, calculators, stock market tools, business tools, productivity tools, EMI calculator, SIP calculator, stock screener"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Tools Hub
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Discover our comprehensive collection of financial tools, calculators, and utilities designed to help you make smarter financial decisions.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for tools, calculators, or features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 shadow-lg focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTools.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      to={tool.path}
                      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 duration-300 block h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          {tool.icon}
                        </div>
                        <div className="flex space-x-2">
                          {tool.isPopular && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </span>
                          )}
                          {tool.isNew && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Rocket className="h-3 w-3 mr-1" />
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {tool.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm flex items-center">
                          Open Tool
                          <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{tools.length}+</div>
                <div className="text-gray-600">Tools Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">{categories.length - 1}</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600">Free Access</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Available</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ToolsHub;
