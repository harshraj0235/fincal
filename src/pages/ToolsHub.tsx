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
  Rocket, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import { BannerAd, ResponsiveAd } from '../components/BannerAd';

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
      icon: <IndianRupee className="h-6 w-6" />,
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
      description: 'GST Calculator, due dates, GSTR-3B, HSN finder, invoice, ITC',
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
      icon: <IndianRupee className="h-6 w-6" />,
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
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Tax Tools',
      path: '/tax-tools',
      isNew: true,
      color: 'from-red-500 to-red-600'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: <Zap className="h-5 w-5" /> },
    { id: 'Financial Calculators', name: 'Financial Calculators', icon: <IndianRupee className="h-5 w-5" /> },
    { id: 'Stock Market Tools', name: 'Stock Market Tools', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'Corporate Finance', name: 'Corporate Finance', icon: <Building2 className="h-5 w-5" /> },
    { id: 'Insurance', name: 'Insurance', icon: <Shield className="h-5 w-5" /> },
    { id: 'Business Tools', name: 'Business Tools', icon: <Building2 className="h-5 w-5" /> },
    { id: 'Productivity Tools', name: 'Productivity Tools', icon: <Wrench className="h-5 w-5" /> },
    { id: 'Sales & Marketing', name: 'Sales & Marketing', icon: <Target className="h-5 w-5" /> },
    { id: 'Tax Tools', name: 'Tax Tools', icon: <IndianRupee className="h-5 w-5" /> },
    { id: 'Education', name: 'Education', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'Specialized', name: 'Specialized', icon: <Star className="h-5 w-5" /> }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const faqItems = [
    {
      question: 'What is the Tools Hub on MoneyCal?',
      answer: 'It is a single place to access all calculators, planning tools, and utility widgets across loans, tax, investments, and business.'
    },
    {
      question: 'How do I find the right tool quickly?',
      answer: 'Use the search bar or filter by category to narrow down the list based on your goal.'
    },
    {
      question: 'Are these tools free and mobile-friendly?',
      answer: 'Yes. MoneyCal tools are free and optimized for mobile and desktop usage.'
    },
    {
      question: 'Can I compare scenarios with these tools?',
      answer: 'Yes. Adjust inputs to compare outcomes like EMI, returns, and tax impact instantly.'
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Tools Hub - All Financial Tools & Calculators | MoneyCal"
        description="Explore our comprehensive collection of financial tools, calculators, and utilities. From EMI calculators to stock screeners, find everything you need for smart financial decisions."
        keywords="financial tools, calculators, stock market tools, business tools, productivity tools, EMI Calculator, SIP Calculator, stock screener"
        url="/tools"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tools Hub', url: '/tools' }
        ]}
        faqData={faqItems}
        tags={["tools hub", "financial tools", "calculators", "india finance tools"]}
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gray-50/50">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100 pt-12 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                Tools Hub
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                Discover our comprehensive collection of financial tools, calculators, and utilities designed to help you make smarter financial decisions.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8 bg-white p-2 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for tools, calculators, or features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-base rounded-xl border-0 focus:ring-0 text-gray-900 bg-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Choose the right tool</h2>
                <p className="text-gray-700">
                  Start with your goal: reduce EMI, estimate taxes, or compare investments. Use the search above or filter by category.
                  Each tool explains inputs, shows clear outputs, and helps compare scenarios side‑by‑side.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick pathways</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-medium">Loans:</span> <Link to="/calculators/emi-calculator" className="text-blue-600 hover:underline">EMI Calculator</Link> → <Link to="/calculators/loan-prepayment-calculator" className="text-blue-600 hover:underline">Prepayment</Link> → <Link to="/calculators/loan-refinance-calculator" className="text-blue-600 hover:underline">Refinancing</Link></li>
                  <li><span className="font-medium">Investments:</span> <Link to="/calculators/sip-calculator" className="text-blue-600 hover:underline">SIP Calculator</Link> → <Link to="/calculators/xirr-calculator" className="text-blue-600 hover:underline">XIRR</Link> → <Link to="/finance-tools/portfolio-diversification-visualizer" className="text-blue-600 hover:underline">Diversification</Link></li>
                  <li><span className="font-medium">Taxes:</span> <Link to="/calculators/income-tax-calculator" className="text-blue-600 hover:underline">Income Tax</Link> → <Link to="/calculators/income-tax-regime-comparison-calculator" className="text-blue-600 hover:underline">Regime Comparison</Link> → <Link to="/calculators/section-80c-calculator" className="text-blue-600 hover:underline">80C Visualizer</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Worked example</h3>
                <p className="text-gray-700">
                  Compare two scenarios: conservative vs moderate assumptions. Review total impact, monthly changes,
                  and fees or taxes. Save results to revisit decisions later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Ad in the middle of Tools Hub */}
        <div className="w-full flex justify-center py-6 bg-white">
          <ResponsiveAd />
        </div>

        {/* Tools Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTools.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link
                      to={tool.path}
                      className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all block h-full flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                          <div className="text-white">
                            {tool.icon}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {tool.isPopular && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wider">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </span>
                          )}
                          {tool.isNew && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                              <Rocket className="h-3 w-3 mr-1" />
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {tool.name}
                      </h3>
                      
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-blue-600 font-semibold text-xs flex items-center">
                          Open Tool
                          <ArrowRight className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
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

        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Tools Hub FAQ</h2>
              <p className="text-gray-600">Answers to common questions about using MoneyCal tools.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map(item => (
                <div key={item.question} className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
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
