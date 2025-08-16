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
  AlertTriangle
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

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
        description="Explore our comprehensive collection of tax and profit simplification tools. From STCG/LTCG classifiers to advanced tax planning calculators, find everything you need for smart tax management."
        keywords="tax tools, profit simplifiers, capital gains tax calculator, STCG LTCG calculator, tax planning tools, mutual fund tax calculator, dividend tax calculator"
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
                Tax & Profit Simplifiers
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Comprehensive collection of tax tools and calculators designed to simplify your financial planning and tax management.
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
