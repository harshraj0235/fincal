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
  FileText,
  Zap,
  BarChart3,
  Wrench,
  Clock,
  Rocket,
  TrendingDown,
  Percent,
  Activity,
  PieChart,
  Shield,
  RefreshCw,
  Gift,
  Eye,
  Calendar,
  Globe,
  Target,
  ArrowLeftRight,
  AlertTriangle,
  Home,
  Scale,
  ChevronDown,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface TaxTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  path: string;
  isPopular?: boolean;
  isNew?: boolean;
  color: string;
  status: 'available' | 'coming-soon';
}

const TaxToolsHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedGuide, setExpandedGuide] = useState<string | null>('getting-started');

  const taxTools: TaxTool[] = [
    // Available Tools
    {
      id: 'stcg-ltcg-classifier',
      name: 'STCG vs LTCG Classifier',
      description: 'Determine your capital gains tax category based on holding period',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/stcg-ltcg-classifier',
      isPopular: true,
      color: 'from-blue-500 to-blue-600',
      status: 'available'
    },
    {
      id: 'equity-tax-estimator',
      name: 'Equity Tax Estimator by Assessment Year',
      description: 'Calculate equity tax liability by assessment year with precision',
      icon: <Calculator className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/equity-tax-estimator',
      isPopular: true,
      color: 'from-green-500 to-green-600',
      status: 'available'
    },
    {
      id: 'mutual-fund-exit-load-checker',
      name: 'Mutual Fund Exit Load Checker',
      description: 'Check exit load charges for mutual fund redemptions',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Funds',
      path: '/tax-tools/mutual-fund-exit-load-checker',
      isNew: true,
      color: 'from-indigo-500 to-indigo-600',
      status: 'available'
    },
    {
      id: 'dividend-tax-estimator',
      name: 'Dividend Tax Estimator (Post-2020 Rules)',
      description: 'Calculate dividend tax under new regulations',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Dividends',
      path: '/tax-tools/dividend-tax-estimator',
      isPopular: true,
      color: 'from-yellow-500 to-yellow-600',
      status: 'available'
    },
    {
      id: 'loss-carry-forward-estimator',
      name: 'Loss Carry Forward Estimator',
      description: 'Calculate and track capital loss carry forward',
      icon: <TrendingDown className="h-6 w-6" />,
      category: 'Loss Management',
      path: '/tax-tools/loss-carry-forward-estimator',
      isNew: true,
      color: 'from-red-500 to-red-600',
      status: 'available'
    },
    // Coming Soon Tools
    {
      id: 'intraday-vs-delivery-tax-calculator',
      name: 'Intraday vs Delivery Tax Calculator',
      description: 'Compare tax implications of intraday vs delivery trading',
      icon: <Activity className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/intraday-vs-delivery-tax-calculator',
      color: 'from-purple-500 to-purple-600',
      status: 'available'
    },
    {
      id: 'turnover-calculator-itr',
      name: 'Turnover Calculator for ITR Form Filling',
      description: 'Calculate turnover for ITR form selection',
      icon: <FileText className="h-6 w-6" />,
      category: 'Filing & Compliance',
      path: '/tax-tools/turnover-calculator-itr',
      color: 'from-orange-500 to-orange-600',
      status: 'available'
    },
    {
      id: 'section-80c-tally-analyzer',
      name: 'Section 80C Tally Analyzer',
      description: 'Analyze and optimize your Section 80C investments',
      icon: <Percent className="h-6 w-6" />,
      category: 'Tax Planning',
      path: '/tax-tools/section-80c-tally-analyzer',
      color: 'from-teal-500 to-teal-600',
      status: 'available'
    },
    {
      id: 'short-term-capital-loss-benefit-estimator',
      name: 'Short-Term Capital Loss Benefit Estimator',
      description: 'Calculate benefits of STCG losses and optimize tax strategy',
      icon: <TrendingDown className="h-6 w-6" />,
      category: 'Loss Management',
      path: '/tax-tools/short-term-capital-loss-benefit-estimator',
      color: 'from-pink-500 to-pink-600',
      status: 'available'
    },
    {
      id: 'tax-on-partial-selloff-calculator',
      name: 'Tax on Partial Selloff Calculator',
      description: 'Calculate tax implications when selling partial holdings',
      icon: <PieChart className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/tax-on-partial-selloff-calculator',
      color: 'from-indigo-500 to-indigo-600',
      status: 'available'
    },
    {
      id: 'offset-ltcg-with-annual-exemptions-tool',
      name: 'Offset LTCG with Annual Exemptions Tool',
      description: 'Plan LTCG sales to maximize annual exemption benefits',
      icon: <Shield className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool',
      color: 'from-emerald-500 to-emerald-600',
      status: 'available'
    },
    {
      id: 'dividend-reinvestment-tax-comparison',
      name: 'Dividend Reinvestment Tax Comparison',
      description: 'Compare tax implications of dividend reinvestment vs direct investment',
      icon: <RefreshCw className="h-6 w-6" />,
      category: 'Dividends',
      path: '/tax-tools/dividend-reinvestment-tax-comparison',
      color: 'from-cyan-500 to-cyan-600',
      status: 'available'
    },
    {
      id: 'tax-on-bonus-shares-tracker',
      name: 'Tax on Bonus Shares Tracker',
      description: 'Track and calculate tax implications of bonus shares',
      icon: <Gift className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/tax-on-bonus-shares-tracker',
      color: 'from-pink-500 to-pink-600',
      status: 'available'
    },
    {
      id: 'tds-impact-visualizer-on-gains',
      name: 'TDS Impact Visualizer on Gains',
      description: 'Visualize how TDS affects your capital gains',
      icon: <Eye className="h-6 w-6" />,
      category: 'Advanced Tools',
      path: '/tax-tools/tds-impact-visualizer-on-gains',
      color: 'from-violet-500 to-violet-600',
      status: 'available'
    },
    {
      id: 'debt-fund-tax-calculator',
      name: 'Debt Fund Tax Calculator',
      description: 'Compare normal vs STCG rates for debt funds',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Funds',
      path: '/tax-tools/debt-fund-tax-calculator',
      color: 'from-amber-500 to-amber-600',
      status: 'available'
    },
    {
      id: 'nps-tax-benefit-vs-growth-estimator',
      name: 'NPS Tax Benefit vs Growth Estimator',
      description: 'Compare tax benefits vs growth benefits of NPS',
      icon: <Shield className="h-6 w-6" />,
      category: 'Tax Planning',
      path: '/tax-tools/nps-tax-benefit-vs-growth-estimator',
      color: 'from-lime-500 to-lime-600',
      status: 'available'
    },
    {
      id: 'tax-filing-deadline-reminder-widget',
      name: 'Tax Filing Deadline Reminder Widget',
      description: 'Never miss important tax deadlines with comprehensive reminders',
      icon: <Calendar className="h-6 w-6" />,
      category: 'Tax Planning',
      path: '/tax-tools/tax-filing-deadline-reminder-widget',
      color: 'from-orange-500 to-orange-600',
      status: 'available'
    },
    {
      id: 'itr-form-type-helper',
      name: 'ITR Form Type Helper',
      description: 'Choose the right ITR form based on your income sources',
      icon: <FileText className="h-6 w-6" />,
      category: 'Tax Filing',
      path: '/tax-tools/itr-form-type-helper',
      color: 'from-indigo-500 to-indigo-600',
      status: 'available'
    },
    {
      id: 'tax-loss-harvesting-calculator',
      name: 'Tax Loss Harvesting Calculator',
      description: 'Optimize your tax strategy by harvesting investment losses',
      icon: <TrendingDown className="h-6 w-6" />,
      category: 'Tax Optimization',
      path: '/tax-tools/tax-loss-harvesting-calculator',
      color: 'from-red-500 to-red-600',
      status: 'available'
    },
    {
      id: 'csv-to-tax-summary-tool',
      name: 'CSV to Tax Summary Tool',
      description: 'Convert trading CSV data into comprehensive tax reports',
      icon: <FileText className="h-6 w-6" />,
      category: 'Data Analysis',
      path: '/tax-tools/csv-to-tax-summary-tool',
      isNew: true,
      color: 'from-indigo-500 to-indigo-600',
      status: 'available'
    },
    {
      id: 'elss-lockin-vs-tax-benefit-visualizer',
      name: 'ELSS Lock-in vs Tax Benefit Visualizer',
      description: 'Compare ELSS 3-year lock-in period with tax benefits',
      icon: <Shield className="h-6 w-6" />,
      category: 'Tax Planning',
      path: '/tax-tools/elss-lockin-vs-tax-benefit-visualizer',
      isNew: true,
      color: 'from-blue-500 to-blue-600',
      status: 'available'
    },
    {
      id: 'pf-vs-nps-tax-growth-comparison',
      name: 'PF vs NPS Tax & Growth Comparison',
      description: 'Compare EPF and NPS for retirement planning',
      icon: <Shield className="h-6 w-6" />,
      category: 'Retirement Planning',
      path: '/tax-tools/pf-vs-nps-tax-growth-comparison',
      isNew: true,
      color: 'from-green-500 to-green-600',
      status: 'available'
    },
    {
      id: 'gifted-shares-tax-estimator',
      name: 'Gifted Shares Tax Estimator',
      description: 'Calculate tax on shares received as gifts',
      icon: <Gift className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/gifted-shares-tax-estimator',
      isNew: true,
      color: 'from-pink-500 to-pink-600',
      status: 'available'
    },
         {
       id: 'bonus-shares-tax-impact-tool',
       name: 'Bonus Shares Tax Impact Tool',
       description: 'Calculate tax implications on bonus shares',
       icon: <Gift className="h-6 w-6" />,
       category: 'Capital Gains',
       path: '/tax-tools/bonus-shares-tax-impact-tool',
       isNew: true,
       color: 'from-purple-500 to-purple-600',
       status: 'available'
     },
           {
        id: 'switch-mf-tax-calculator',
        name: 'Switch MF Tax Calculator',
        description: 'Calculate tax on mutual fund switching',
        icon: <RefreshCw className="h-6 w-6" />,
        category: 'Mutual Funds',
        path: '/tax-tools/switch-mf-tax-calculator',
        isNew: true,
        color: 'from-cyan-500 to-cyan-600',
        status: 'available'
      },
      {
        id: '80c-deduction-bucket-visualizer',
        name: '80C Deduction Bucket Visualizer',
        description: 'Visualize and optimize 80C investments',
        icon: <PieChart className="h-6 w-6" />,
        category: 'Tax Planning',
        path: '/tax-tools/80c-deduction-bucket-visualizer',
        isNew: true,
        color: 'from-emerald-500 to-emerald-600',
        status: 'available'
      },
      {
        id: 'trader-turnover-estimator-itr',
        name: 'Trader Turnover Estimator for ITR',
        description: 'Calculate trading turnover for ITR filing',
        icon: <FileText className="h-6 w-6" />,
        category: 'Filing & Compliance',
        path: '/tax-tools/trader-turnover-estimator-itr',
        isNew: true,
        color: 'from-orange-500 to-orange-600',
        status: 'available'
      },
      {
        id: 'intra-year-redemption-tax-tracker',
        name: 'Intra-Year Redemption Tax Tracker',
        description: 'Track tax implications of multiple redemptions',
        icon: <Clock className="h-6 w-6" />,
        category: 'Capital Gains',
        path: '/tax-tools/intra-year-redemption-tax-tracker',
        isNew: true,
        color: 'from-blue-500 to-blue-600',
        status: 'available'
      },
      {
        id: 'double-tax-relief-tool',
        name: 'Double Tax Relief Tool',
        description: 'Calculate relief from double taxation',
        icon: <Globe className="h-6 w-6" />,
        category: 'International Tax',
        path: '/tax-tools/double-tax-relief-tool',
        isNew: true,
        color: 'from-purple-500 to-purple-600',
        status: 'available'
      },
      {
        id: 'tax-efficient-withdrawal-planner',
        name: 'Tax-Efficient Withdrawal Planner',
        description: 'Plan tax-efficient withdrawals from investments',
        icon: <Target className="h-6 w-6" />,
        category: 'Tax Planning',
        path: '/tax-tools/tax-efficient-withdrawal-planner',
        isNew: true,
        color: 'from-green-500 to-green-600',
        status: 'available'
      },
      {
        id: 'pf-withdrawal-tax-preview',
        name: 'PF Withdrawal Tax Preview',
        description: 'Calculate tax implications of PF withdrawals',
        icon: <Shield className="h-6 w-6" />,
        category: 'Retirement Planning',
        path: '/tax-tools/pf-withdrawal-tax-preview',
        isNew: true,
        color: 'from-blue-500 to-blue-600',
        status: 'available'
      },
      {
        id: 'high-dividend-tax-impact-calculator',
        name: 'High Dividend Tax Impact Calculator',
        description: 'Calculate tax implications of high dividend income',
        icon: <DollarSign className="h-6 w-6" />,
        category: 'Dividends',
        path: '/tax-tools/high-dividend-tax-impact-calculator',
        isNew: true,
        color: 'from-green-500 to-green-600',
        status: 'available'
      },
      {
        id: 'tax-year-comparison-slider-tool',
        name: 'Tax Year Comparison Slider Tool',
        description: 'Compare tax implications across different financial years',
        icon: <ArrowLeftRight className="h-6 w-6" />,
        category: 'Tax Planning',
        path: '/tax-tools/tax-year-comparison-slider-tool',
        isNew: true,
        color: 'from-purple-500 to-purple-600',
        status: 'available'
      },
      {
        id: 'short-term-loss-offset-visualizer',
        name: 'Short-Term Loss Offset Visualizer',
        description: 'Visualize and optimize capital loss offset strategies',
        icon: <AlertTriangle className="h-6 w-6" />,
        category: 'Loss Management',
        path: '/tax-tools/short-term-loss-offset-visualizer',
        isNew: true,
        color: 'from-red-500 to-red-600',
        status: 'available'
      },
      {
        id: 'exit-strategy-tax-visualizer',
        name: 'Exit Strategy Tax Visualizer',
        description: 'Plan and visualize tax implications of different exit strategies',
        icon: <Target className="h-6 w-6" />,
        category: 'Tax Planning',
        path: '/tax-tools/exit-strategy-tax-visualizer',
        isNew: true,
        color: 'from-purple-500 to-purple-600',
        status: 'available'
      },
             {
         id: 'hra-vs-lta-tax-comparison-tool',
         name: 'HRA vs LTA Tax Comparison Tool',
         description: 'Compare and optimize House Rent vs Leave Travel Allowance benefits',
         icon: <Home className="h-6 w-6" />,
         category: 'Tax Planning',
         path: '/tax-tools/hra-vs-lta-tax-comparison-tool',
         isNew: true,
         color: 'from-teal-500 to-teal-600',
         status: 'available'
       },
       {
         id: 'old-vs-new-tax-regime-helper',
         name: 'Old vs New Tax Regime Helper',
         description: 'Compare and choose between old and new tax regimes',
         icon: <Scale className="h-6 w-6" />,
         category: 'Tax Planning',
         path: '/tax-tools/old-vs-new-tax-regime-helper',
         isNew: true,
         color: 'from-orange-500 to-orange-600',
         status: 'available'
       }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: <Zap className="h-5 w-5" /> },
    { id: 'Capital Gains', name: 'Capital Gains', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'Mutual Funds', name: 'Mutual Funds', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'Dividends', name: 'Dividends', icon: <DollarSign className="h-5 w-5" /> },
    { id: 'Loss Management', name: 'Loss Management', icon: <TrendingDown className="h-5 w-5" /> },
    { id: 'Tax Planning', name: 'Tax Planning', icon: <Percent className="h-5 w-5" /> },
    { id: 'Filing & Compliance', name: 'Filing & Compliance', icon: <FileText className="h-5 w-5" /> },
    { id: 'Tax Filing', name: 'Tax Filing', icon: <FileText className="h-5 w-5" /> },
    { id: 'Advanced Tools', name: 'Advanced Tools', icon: <Wrench className="h-5 w-5" /> },
    { id: 'Data Analysis', name: 'Data Analysis', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'Retirement Planning', name: 'Retirement Planning', icon: <Shield className="h-5 w-5" /> },
    { id: 'Tax Optimization', name: 'Tax Optimization', icon: <Calculator className="h-5 w-5" /> },
    { id: 'International Tax', name: 'International Tax', icon: <Globe className="h-5 w-5" /> }
  ];

  const filteredTools = taxTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHelmet
        title="Tax & Profit Simplifiers - Comprehensive Tax Tools Hub | MoneyCal"
        description="Free Indian tax tools hub: STCG/LTCG classifier, equity tax estimator, dividend tax, loss carry forward, ITR helpers, 80C analyzer, NPS comparison & more. How-to guides and calculators for 2026–2050."
        keywords="tax tools India, capital gains calculator, STCG LTCG calculator, dividend tax calculator, ITR form helper, 80C deduction, tax planning tools, mutual fund tax, loss carry forward, tax filing India"
        url="https://moneycal.in/tax-tools"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 text-white mb-6">
                Tax Tools Hub • Valid 2026–2050
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Tax & Profit Simplifiers
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Find the right tool with search and categories. Use calculators for capital gains, dividends, ITR, 80C, and more—all free.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for tax tools, calculators, or features..."
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

        {/* How to Use Guide */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-blue-600" />
              How to Use These Tax Tools
            </h2>
            <div className="space-y-2">
              {[
                {
                  id: 'getting-started',
                  title: 'Getting started',
                  body: 'Use the search bar above to find a tool by name (e.g. "STCG", "dividend", "80C") or browse by category. Click any tool card to open it. All tools are free and work in the browser—no sign-up required.'
                },
                {
                  id: 'by-category',
                  title: 'Browse by category',
                  body: 'Capital Gains: STCG/LTCG classifier, equity tax estimator, partial selloff, bonus shares. Dividends: dividend tax estimator, reinvestment comparison. Loss Management: carry forward, loss offset visualizer. Tax Planning: 80C, NPS, ELSS, regime comparison. Filing: ITR form helper, turnover calculator, deadline reminder.'
                },
                {
                  id: 'popular-first',
                  title: 'Popular tools',
                  body: 'Start with STCG vs LTCG Classifier to know your gain type, Equity Tax Estimator by Assessment Year for liability, Dividend Tax Estimator for post-2020 rules, and Loss Carry Forward Estimator. For planning, try Section 80C Tally Analyzer and Old vs New Tax Regime Helper.'
                },
                {
                  id: 'data-and-filing',
                  title: 'Data & filing',
                  body: 'Use CSV to Tax Summary Tool to turn broker statements into tax reports. ITR Form Type Helper and Turnover Calculator help you pick the right form and report turnover. Tax Filing Deadline Reminder Widget keeps you on track for due dates.'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedGuide(expandedGuide === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    {item.title}
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedGuide === item.id ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedGuide === item.id && (
                    <div className="px-5 pb-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                      {item.body}
                    </div>
                  )}
                </div>
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
                    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 duration-300 block h-full">
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
                          {tool.status === 'coming-soon' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Soon
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
                        {tool.status === 'available' ? (
                          <Link
                            to={tool.path}
                            className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm flex items-center"
                          >
                            Open Tool
                            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ) : (
                          <span className="text-gray-500 font-semibold text-sm flex items-center">
                            Coming Soon
                            <Clock className="h-4 w-4 ml-1" />
                          </span>
                        )}
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SEO & Guide Content */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tax Tools Hub: Plan, Calculate & File Smarter</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              MoneyCal&apos;s tax tools hub helps you with capital gains tax, dividend tax, loss carry forward, Section 80C, NPS, ITR form selection, and more. Whether you trade equity, invest in mutual funds, or plan retirement, these calculators and helpers are built for Indian tax rules and updated for current assessment years.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Capital gains & equity</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Use the <Link to="/tax-tools/stcg-ltcg-classifier" className="text-blue-600 hover:underline font-medium">STCG vs LTCG Classifier</Link> to see if your gains are short-term or long-term. The <Link to="/tax-tools/equity-tax-estimator" className="text-blue-600 hover:underline font-medium">Equity Tax Estimator by Assessment Year</Link> gives you tax liability by FY/AY. For partial sales, bonus shares, and gifted shares, use the dedicated calculators so cost and period are applied correctly.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Dividends & mutual funds</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dividend income is taxable under the post-2020 regime. The <Link to="/tax-tools/dividend-tax-estimator" className="text-blue-600 hover:underline font-medium">Dividend Tax Estimator</Link> and <Link to="/tax-tools/dividend-reinvestment-tax-comparison" className="text-blue-600 hover:underline font-medium">Dividend Reinvestment Tax Comparison</Link> help you estimate and compare. For mutual funds, try the <Link to="/tax-tools/mutual-fund-exit-load-checker" className="text-blue-600 hover:underline font-medium">Exit Load Checker</Link>, <Link to="/tax-tools/debt-fund-tax-calculator" className="text-blue-600 hover:underline font-medium">Debt Fund Tax Calculator</Link>, and <Link to="/tax-tools/switch-mf-tax-calculator" className="text-blue-600 hover:underline font-medium">Switch MF Tax Calculator</Link>.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Losses & tax optimization</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Track and use losses with the <Link to="/tax-tools/loss-carry-forward-estimator" className="text-blue-600 hover:underline font-medium">Loss Carry Forward Estimator</Link> and <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-blue-600 hover:underline font-medium">Short-Term Loss Offset Visualizer</Link>. The <Link to="/tax-tools/tax-loss-harvesting-calculator" className="text-blue-600 hover:underline font-medium">Tax Loss Harvesting Calculator</Link> helps plan loss utilization. For exemptions, use the <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-blue-600 hover:underline font-medium">Offset LTCG with Annual Exemptions</Link> tool.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Tax planning & filing</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Compare regimes with the <Link to="/tax-tools/old-vs-new-tax-regime-helper" className="text-blue-600 hover:underline font-medium">Old vs New Tax Regime Helper</Link>. Optimize 80C with the <Link to="/tax-tools/section-80c-tally-analyzer" className="text-blue-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> and <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-blue-600 hover:underline font-medium">80C Deduction Bucket Visualizer</Link>. For ITR, use the <Link to="/tax-tools/itr-form-type-helper" className="text-blue-600 hover:underline font-medium">ITR Form Type Helper</Link>, <Link to="/tax-tools/turnover-calculator-itr" className="text-blue-600 hover:underline font-medium">Turnover Calculator for ITR</Link>, and <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-blue-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link>. Official returns are filed at the Income Tax e-Filing portal.
            </p>
            <p className="text-gray-600 leading-relaxed mt-6">
              For official e-filing and forms, visit <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1">incometax.gov.in <ExternalLink className="h-4 w-4" /></a>. This hub is for estimation and planning only; always confirm with a tax professional for your situation.
            </p>
          </div>
        </section>

        {/* Explore More */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explore More</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/tools" className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
                <Wrench className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600">All Tools</div>
                  <div className="text-sm text-gray-500">Calculators & utilities</div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/finance-tools" className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
                <DollarSign className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600">Finance Tools</div>
                  <div className="text-sm text-gray-500">Investments & planning</div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/blog" className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
                <FileText className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600">Blog</div>
                  <div className="text-sm text-gray-500">Articles & updates</div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group">
                <Globe className="h-8 w-8 text-indigo-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600">Income Tax Portal</div>
                  <div className="text-sm text-gray-500">Official e-filing</div>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400 ml-auto" />
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{taxTools.length}+</div>
                <div className="text-gray-600">Tax Tools Available</div>
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

export default TaxToolsHub;
