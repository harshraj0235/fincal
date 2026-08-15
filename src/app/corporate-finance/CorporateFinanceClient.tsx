"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Zap, Target, BarChart3, PieChart, TrendingUp, IndianRupee, FileText, ArrowRight, DollarSign, Building, Globe, Shield } from 'lucide-react';
import WhatsAppBanner from '@/components/WhatsAppBanner';
import ToolArticle from '@/components/ToolArticle';

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

// If there are multiple arrays, we merge them for search
const allTools = corporateTools.filter((v: any, i: number, a: any) => a.findIndex((t: any) => t.name === v.name) === i);

const CorporateFinanceClient: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!query) return allTools;
    const q = query.toLowerCase();
    return allTools.filter(t => t.name.toLowerCase().includes(q) || (t.desc || t.description || '').toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Corporate Finance Tools</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Business valuation, M&A synergy, WACC, and working capital optimization.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search tools..." 
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((t, index) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.03 }}>
                <Link href={t.path || '/tools'} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-300 transform hover:-translate-y-1 transition-all block h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{t.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{t.desc || t.description}</p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-800">
                    Open Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default CorporateFinanceClient;
