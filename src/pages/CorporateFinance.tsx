import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Building,
  Shield,
  BarChart3,
  Target,
  Globe,
  Zap,
  ArrowRight,
  Download,
  FileText,
  Users,
  Briefcase, IndianRupee
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

export const CorporateFinance: React.FC = () => {
  const corporateTools = [
    {
      id: 'business-valuation',
      name: 'Business Valuation Calculator',
      description: 'Free DCF + Multiples valuation tool for companies',
      icon: IndianRupee,
      color: 'from-blue-500 to-blue-600',
      features: ['DCF Analysis', 'Comparable Multiples', 'Valuation Range', 'Market Data'],
      keywords: 'business valuation Calculator, free DCF tool, company worth calculator',
      path: '/corporate-finance/business-valuation-calculator'
    },
    {
      id: 'loan-amortization',
      name: 'Advanced Loan Amortization Generator',
      description: 'Professional-grade debt repayment & prepayment simulator with charts',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      features: ['Advanced Prepayments', 'Interactive Charts', 'PDF & Excel Reports', 'Tenure Reduction'],
      keywords: 'loan amortization generator, prepayment calculator india, home loan repayment schedule, business loan amortization',
      path: '/corporate-finance/loan-amortization-generator'
    },
    {
      id: 'ma-synergy',
      name: 'M&A Synergy Estimator',
      description: 'Calculate merger and acquisition synergies',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      features: ['Cost Savings', 'Revenue Synergies', 'Tax Benefits', 'NPV Analysis'],
      keywords: 'M&A synergy Calculator, merger synergy estimator, acquisition value calculator',
      path: '/corporate-finance/ma-synergy-estimator'
    },
    {
      id: 'working-capital',
      name: 'Working Capital Optimizer',
      description: 'Optimize cash flow and working capital cycle',
      icon: PieChart,
      color: 'from-orange-500 to-orange-600',
      features: ['Cash Conversion', 'AR/AP Analysis', 'Inventory Optimization', 'Cash Flow'],
      keywords: 'working capital Calculator, cash conversion cycle tool, free corporate finance tool',
      path: '/corporate-finance/working-capital-optimizer'
    },
    {
      id: 'capital-structure',
      name: 'Capital Structure Analyzer',
      description: 'Analyze optimal debt vs equity mix',
      icon: Building,
      color: 'from-indigo-500 to-indigo-600',
      features: ['WACC Calculation', 'Debt vs Equity', 'Cost Analysis', 'Risk Assessment'],
      keywords: 'capital structure Calculator, debt vs equity tool, WACC analyzer',
      path: '/corporate-finance/capital-structure-analyzer'
    },
    {
      id: 'dividend-policy',
      name: 'Dividend Policy Impact Tool',
      description: 'Analyze dividend payout impact on valuation',
      icon: Target,
      color: 'from-pink-500 to-pink-600',
      features: ['Payout Ratio Analysis', 'Share Price Impact', 'Growth Model', 'Valuation Impact'],
      keywords: 'dividend Calculator corporate, payout ratio tool, dividend impact on valuation',
      path: '/corporate-finance/dividend-policy-impact-tool'
    },
    {
      id: 'break-even',
      name: 'Break-Even Point Calculator',
      description: 'Calculate business break-even analysis',
      icon: BarChart3,
      color: 'from-red-500 to-red-600',
      features: ['Break-Even Units', 'Sales Analysis', 'Profit Margins', 'Cost Structure'],
      keywords: 'break even Calculator, corporate finance tool, profit point calculator',
      path: '/corporate-finance/break-even-calculator'
    },
    {
      id: 'fx-exposure',
      name: 'FX Exposure Risk Calculator',
      description: 'Calculate foreign exchange risk for corporates',
      icon: Globe,
      color: 'from-cyan-500 to-cyan-600',
      features: ['Currency Risk', 'Hedge Suggestions', 'Real-time Rates', 'Risk Analysis'],
      keywords: 'fx exposure Calculator, currency risk tool, forex risk corporate',
      path: '/corporate-finance/fx-exposure-risk-calculator'
    },
    {
      id: 'cost-capital',
      name: 'Cost of Capital Benchmarking',
      description: 'Industry-wise WACC and cost of capital analysis',
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600',
      features: ['Industry WACC', 'Beta Analysis', 'Risk Premium', 'Benchmarking'],
      keywords: 'cost of capital tool, WACC industry Calculator, benchmark finance tool',
      path: '/corporate-finance/cost-capital-benchmarking'
    },
    {
      id: 'scenario-analysis',
      name: 'Scenario Analysis Simulator',
      description: 'Monte Carlo simulation for corporate scenarios',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      features: ['Monte Carlo', 'Multiple Scenarios', 'Risk Analysis', 'Probability Charts'],
      keywords: 'scenario analysis Calculator, financial simulation tool, corporate risk tool',
      path: '/corporate-finance/scenario-analysis-simulator'
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Corporate Finance Tools - Free Business Financial Calculators | MoneyCal.in"
        description="Comprehensive suite of free corporate finance tools including business valuation, M&A analysis, working capital optimization, and more. No login required."
        keywords="corporate finance tools, business valuation Calculator, M&A synergy Calculator, working capital Calculator, free corporate finance tools"
        url="/corporate-finance"
        type="website"
        image="/images/corporate-finance-tools.jpg"
        tags={["corporate finance", "business tools", "financial calculators", "M&A analysis"]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                <Briefcase className="h-16 w-16 text-blue-600 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                  Corporate Finance Tools
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Professional-grade corporate finance calculators and analysis tools.
                Free, no-login required, with instant results and downloadable reports.
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Download className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Reports</h3>
                <p className="text-gray-600 text-sm">Download detailed analysis reports</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3>
                <p className="text-gray-600 text-sm">No login required, immediate calculations</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Data</h3>
                <p className="text-gray-600 text-sm">Real-time market data integration</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Grade</h3>
                <p className="text-gray-600 text-sm">Used by CFOs and analysts worldwide</p>
              </div>
            </motion.div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {corporateTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={tool.path}
                  className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 duration-300 block h-full"
                >
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <tool.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 group-hover:text-blue-700 font-semibold flex items-center">
                      Launch Tool
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="text-xs text-gray-500">
                      Free Tool
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Advanced Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Download className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">PDF Download</h3>
                <p className="text-gray-600">
                  Download comprehensive analysis reports with charts, tables, and detailed calculations for offline reference and sharing.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Data</h3>
                <p className="text-gray-600">
                  Integration with live market data, currency rates, and industry benchmarks for accurate, up-to-date analysis.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Charts</h3>
                <p className="text-gray-600">
                  Dynamic visualizations, sensitivity analysis, and scenario modeling to help you understand the impact of different variables.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <FileText className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excel Export</h3>
                <p className="text-gray-600">
                  Export detailed calculations, amortization schedules, and analysis tables to Excel for further customization.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry Benchmarks</h3>
                <p className="text-gray-600">
                  Compare your results with industry averages and best practices to make informed financial decisions.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Monte Carlo Simulation</h3>
                <p className="text-gray-600">
                  Advanced scenario analysis with probability distributions and risk assessment for complex financial modeling.
                </p>
              </div>
            </div>
          </motion.div>

          {/* SEO Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Corporate Finance Analysis</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                Our comprehensive suite of corporate finance tools provides professional-grade analysis capabilities
                that are typically available only through expensive software or consulting services. Each tool is
                designed with the latest financial modeling techniques and industry best practices.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Our Corporate Finance Tools?</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>No Login Required:</strong> Access all tools instantly without registration or subscription fees</li>
                <li><strong>Professional Accuracy:</strong> Built using industry-standard formulas and methodologies</li>
                <li><strong>Real-time Data:</strong> Integration with live market data for accurate analysis</li>
                <li><strong>Comprehensive Reports:</strong> Download detailed PDF reports with charts and analysis</li>
                <li><strong>Excel Integration:</strong> Export data for further analysis in your preferred spreadsheet software</li>
                <li><strong>Mobile Optimized:</strong> Access tools on any device with responsive design</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect for:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>CFOs and Finance Teams:</strong> Quick analysis and decision support tools</li>
                <li><strong>Investment Bankers:</strong> M&A analysis and valuation support</li>
                <li><strong>Business Analysts:</strong> Financial modeling and scenario analysis</li>
                <li><strong>Students and Academics:</strong> Learning and research in corporate finance</li>
                <li><strong>Entrepreneurs:</strong> Business planning and valuation for startups</li>
                <li><strong>Consultants:</strong> Client analysis and presentation support</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CorporateFinance;
