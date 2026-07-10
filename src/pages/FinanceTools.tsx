import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Calculator, 
  DollarSign, 
  BarChart3, 
  PieChart,
  ArrowRight,
  Search,
  ArrowLeft, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

interface FinanceTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  path: string;
  isPopular?: boolean;
  color: string;
  keywords: string[];
  seoDescription: string;
}

const FinanceTools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const financeTools: FinanceTool[] = [
    // SIP Tools
    {
      id: 'sip-delay-loss-calculator',
      name: 'SIP Delay Loss Calculator',
      description: 'Calculate the opportunity cost of delaying your SIP investments',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-delay-loss-calculator',
      isPopular: true,
      color: 'from-red-500 to-red-600',
      keywords: ['SIP delay loss', 'investment timing', 'opportunity cost calculator'],
      seoDescription: 'Calculate how much money you lose by delaying your SIP investments.'
    },
    {
      id: 'sip-step-up-planner',
      name: 'SIP Step-up Planner',
      description: 'Plan and visualize your step-up SIP strategy for wealth creation',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-step-up-planner',
      isPopular: true,
      color: 'from-green-500 to-green-600',
      keywords: ['step up SIP', 'SIP planner', 'wealth creation'],
      seoDescription: 'Plan your step-up SIP strategy to increase investments systematically.'
    },
    {
      id: 'lumpsum-vs-sip-analyzer',
      name: 'Lumpsum vs SIP Analyzer',
      description: 'Compare lumpsum vs SIP investment strategies for optimal returns',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/lumpsum-vs-sip-analyzer',
      color: 'from-blue-500 to-blue-600',
      keywords: ['lumpsum vs SIP', 'investment comparison', 'investment strategy'],
      seoDescription: 'Compare lumpsum vs SIP investment strategies to choose the best approach.'
    },
    {
      id: 'sip-inflation-adjusted-calculator',
      name: 'SIP Inflation-Adjusted Calculator',
      description: 'Calculate real returns on SIP investments after adjusting for inflation',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-inflation-adjusted-calculator',
      color: 'from-purple-500 to-purple-600',
      keywords: ['inflation adjusted SIP', 'real returns', 'inflation calculator'],
      seoDescription: 'Calculate real returns on SIP investments after adjusting for inflation.'
    },
    {
      id: 'sip-missed-payment-loss-estimator',
      name: 'SIP Missed Payment Loss Estimator',
      description: 'Estimate the impact of missing SIP payments on your investment goals',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-missed-payment-loss-estimator',
      color: 'from-orange-500 to-orange-600',
      keywords: ['missed SIP payment', 'investment loss', 'SIP impact'],
      seoDescription: 'Estimate the impact of missing SIP payments on your investment goals.'
    },
    {
      id: 'sip-withdrawal-planner',
      name: 'SIP Withdrawal Planner',
      description: 'Plan systematic withdrawals from your SIP investments',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-withdrawal-planner',
      color: 'from-pink-500 to-pink-600',
      keywords: ['SIP withdrawal', 'systematic withdrawal', 'investment planning'],
      seoDescription: 'Plan systematic withdrawals from your SIP investments.'
    },
    {
      id: 'sip-vs-swp-tool',
      name: 'SIP vs SWP Tool',
      description: 'Compare Systematic Investment Plan vs Systematic Withdrawal Plan',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-vs-swp-tool',
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['SIP vs SWP', 'systematic withdrawal', 'investment comparison'],
      seoDescription: 'Compare Systematic Investment Plan vs Systematic Withdrawal Plan.'
    },
    {
      id: 'flexi-sip-planner',
      name: 'Flexi SIP Planner',
      description: 'Plan flexible SIP investments with variable amounts',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/flexi-sip-planner',
      color: 'from-teal-500 to-teal-600',
      keywords: ['flexi SIP', 'flexible investment', 'variable SIP'],
      seoDescription: 'Plan flexible SIP investments with variable amounts.'
    },
    {
      id: 'sip-tracker-with-goal-thermometer',
      name: 'SIP Tracker with Goal Thermometer',
      description: 'Track your SIP progress towards financial goals with visual indicators',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-tracker-with-goal-thermometer',
      color: 'from-cyan-500 to-cyan-600',
      keywords: ['SIP tracker', 'goal tracking', 'investment progress'],
      seoDescription: 'Track your SIP progress towards financial goals with visual indicators.'
    },
    {
      id: 'sip-return-deviation-chart',
      name: 'SIP Return Deviation Chart',
      description: 'Analyze SIP return variations and volatility patterns',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-return-deviation-chart',
      color: 'from-lime-500 to-lime-600',
      keywords: ['SIP return deviation', 'volatility analysis', 'return patterns'],
      seoDescription: 'Analyze SIP return variations and volatility patterns.'
    },

    // Mutual Fund Tools
    {
      id: 'mutual-fund-comparison-tool',
      name: 'Mutual Fund Comparison Tool',
      description: 'Compare direct vs regular mutual fund plans and their impact',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Fund Tools',
      path: '/finance-tools/mutual-fund-comparison-tool',
      isPopular: true,
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['direct vs regular', 'mutual fund comparison', 'expense ratio impact'],
      seoDescription: 'Compare direct vs regular mutual fund plans to understand the impact of expense ratios.'
    },
    {
      id: 'mutual-fund-expense-ratio-estimator',
      name: 'Mutual Fund Expense Ratio Estimator',
      description: 'Calculate and compare expense ratios across different mutual funds',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Mutual Fund Tools',
      path: '/finance-tools/mutual-fund-expense-ratio-estimator',
      color: 'from-blue-500 to-blue-600',
      keywords: ['expense ratio', 'mutual fund costs', 'fund comparison'],
      seoDescription: 'Calculate and compare expense ratios across different mutual funds.'
    },
    {
      id: 'mutual-fund-exit-load-tracker',
      name: 'Mutual Fund Exit Load Tracker',
      description: 'Track exit loads and their impact on mutual fund returns',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Fund Tools',
      path: '/finance-tools/mutual-fund-exit-load-tracker',
      color: 'from-red-500 to-red-600',
      keywords: ['exit load', 'mutual fund charges', 'redemption fees'],
      seoDescription: 'Track exit loads and their impact on mutual fund returns.'
    },
    {
      id: 'mutual-fund-star-ratings-explorer',
      name: 'Mutual Fund Star Ratings Explorer',
      description: 'Explore and analyze mutual fund star ratings and performance',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Fund Tools',
      path: '/finance-tools/mutual-fund-star-ratings-explorer',
      color: 'from-yellow-500 to-yellow-600',
      keywords: ['star ratings', 'fund performance', 'rating analysis'],
      seoDescription: 'Explore and analyze mutual fund star ratings and performance.'
    },
    {
      id: 'mutual-fund-overlap-checker',
      name: 'Mutual Fund Overlap Checker',
      description: 'Check portfolio overlap between different mutual funds',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Fund Tools',
      path: '/finance-tools/mutual-fund-overlap-checker',
      color: 'from-green-500 to-green-600',
      keywords: ['portfolio overlap', 'fund diversification', 'overlap analysis'],
      seoDescription: 'Check portfolio overlap between different mutual funds.'
    },
    {
      id: 'mutual-fund-historical-nav-visualizer',
      name: 'Mutual Fund Historical NAV Visualizer',
      description: 'Visualize historical NAV trends and performance patterns',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Fund Tools',
      path: '/finance-tools/mutual-fund-historical-nav-visualizer',
      color: 'from-purple-500 to-purple-600',
      keywords: ['historical NAV', 'fund performance', 'trend analysis'],
      seoDescription: 'Visualize historical NAV trends and performance patterns.'
    },
    {
      id: 'mutual-fund-tracker',
      name: 'Mutual Fund Tracker',
      description: 'Track and monitor your mutual fund investments with charts',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Fund Tools',
      path: '/finance-tools/mutual-fund-tracker',
      color: 'from-pink-500 to-pink-600',
      keywords: ['mutual fund tracker', 'investment monitoring', 'fund tracking'],
      seoDescription: 'Track and monitor your mutual fund investments with charts.'
    },
    {
      id: 'etf-vs-mutual-fund-comparison',
      name: 'ETF vs Mutual Fund Comparison',
      description: 'Compare ETFs and mutual funds to choose the best investment option',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Fund Tools',
      path: '/finance-tools/etf-vs-mutual-fund-comparison',
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['ETF vs mutual fund', 'investment comparison', 'fund selection'],
      seoDescription: 'Compare ETFs and mutual funds to choose the best investment option.'
    },

    // Investment Analysis
    {
      id: 'portfolio-diversification-visualizer',
      name: 'Portfolio Diversification Visualizer',
      description: 'Visualize and analyze your portfolio diversification across asset classes',
      icon: <PieChart className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/portfolio-diversification-visualizer',
      isPopular: true,
      color: 'from-pink-500 to-pink-600',
      keywords: ['portfolio diversification', 'asset allocation', 'risk management'],
      seoDescription: 'Visualize your portfolio diversification across asset classes.'
    },
    {
      id: 'real-vs-nominal-return-calculator',
      name: 'Real vs Nominal Return Calculator',
      description: 'Calculate real returns by adjusting nominal returns for inflation',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/real-vs-nominal-return-calculator',
      color: 'from-blue-500 to-blue-600',
      keywords: ['real returns', 'nominal returns', 'inflation adjustment'],
      seoDescription: 'Calculate real returns by adjusting nominal returns for inflation.'
    },
    {
      id: 'fd-vs-mutual-fund-return-tool',
      name: 'FD vs Mutual Fund Return Tool',
      description: 'Compare returns from Fixed Deposits vs Mutual Funds',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/fd-vs-mutual-fund-return-tool',
      color: 'from-green-500 to-green-600',
      keywords: ['FD vs mutual fund', 'return comparison', 'investment choice'],
      seoDescription: 'Compare returns from Fixed Deposits vs Mutual Funds.'
    },
    {
      id: 'stock-cagr-calculator',
      name: 'Stock CAGR Calculator',
      description: 'Calculate Compound Annual Growth Rate for stock investments',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/stock-cagr-calculator',
      color: 'from-purple-500 to-purple-600',
      keywords: ['stock CAGR', 'compound growth', 'investment returns'],
      seoDescription: 'Calculate Compound Annual Growth Rate for stock investments.'
    },
    {
      id: 'nifty-vs-sensex-performance-tracker',
      name: 'Nifty vs Sensex Performance Tracker',
      description: 'Track and compare performance of Nifty 50 vs Sensex',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/nifty-vs-sensex-performance-tracker',
      color: 'from-orange-500 to-orange-600',
      keywords: ['Nifty vs Sensex', 'index comparison', 'market performance'],
      seoDescription: 'Track and compare performance of Nifty 50 vs Sensex.'
    },
    {
      id: 'index-fund-return-comparison',
      name: 'Index Fund Return Comparison',
      description: 'Compare returns across different index funds',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/index-fund-return-comparison',
      color: 'from-teal-500 to-teal-600',
      keywords: ['index fund comparison', 'passive investing', 'fund returns'],
      seoDescription: 'Compare returns across different index funds.'
    },
    {
      id: 'equity-vs-debt-split-recommender',
      name: 'Equity vs Debt Split Recommender',
      description: 'Get recommendations for equity-debt allocation based on your profile',
      icon: <PieChart className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/equity-vs-debt-split-recommender',
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['equity debt split', 'asset allocation', 'investment recommendation'],
      seoDescription: 'Get recommendations for equity-debt allocation based on your profile.'
    },
    {
      id: 'asset-allocation-tool',
      name: 'Asset Allocation Tool',
      description: 'Age-based asset allocation recommendations for optimal portfolio balance',
      icon: <PieChart className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/asset-allocation-tool',
      color: 'from-cyan-500 to-cyan-600',
      keywords: ['asset allocation', 'age-based investing', 'portfolio balance'],
      seoDescription: 'Age-based asset allocation recommendations for optimal portfolio balance.'
    },
    {
      id: 'portfolio-rebalancing-reminder-tool',
      name: 'Portfolio Rebalancing Reminder Tool',
      description: 'Set reminders and track portfolio rebalancing needs',
      icon: <PieChart className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/portfolio-rebalancing-reminder-tool',
      color: 'from-lime-500 to-lime-600',
      keywords: ['portfolio rebalancing', 'investment reminders', 'portfolio management'],
      seoDescription: 'Set reminders and track portfolio rebalancing needs.'
    },
    {
      id: 'investment-timeline-visualizer',
      name: 'Investment Timeline Visualizer',
      description: 'Visualize your investment journey and milestones',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/investment-timeline-visualizer',
      color: 'from-pink-500 to-pink-600',
      keywords: ['investment timeline', 'investment journey', 'milestones'],
      seoDescription: 'Visualize your investment journey and milestones.'
    },
    {
      id: '5y-cagr-vs-volatility-analyzer',
      name: '5Y CAGR vs Volatility Analyzer',
      description: 'Analyze 5-year CAGR vs volatility for investment decisions',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/5y-cagr-vs-volatility-analyzer',
      color: 'from-red-500 to-red-600',
      keywords: ['5Y CAGR', 'volatility analysis', 'risk return analysis'],
      seoDescription: 'Analyze 5-year CAGR vs volatility for investment decisions.'
    },
    {
      id: 'investment-goal-countdown-widget',
      name: 'Investment Goal Countdown Widget',
      description: 'Track progress towards your investment goals with countdown timers',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/investment-goal-countdown-widget',
      color: 'from-yellow-500 to-yellow-600',
      keywords: ['investment goals', 'goal tracking', 'countdown widget'],
      seoDescription: 'Track progress towards your investment goals with countdown timers.'
    },

    // Advanced Investment
    {
      id: 'xirr-calculator',
      name: 'XIRR Calculator',
      description: 'Calculate Extended Internal Rate of Return for complex investment scenarios',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/xirr-calculator',
      isPopular: true,
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['XIRR calculator', 'internal rate of return', 'investment returns'],
      seoDescription: 'Calculate Extended Internal Rate of Return for complex investment scenarios.'
    },
    {
      id: 'dividend-tracker',
      name: 'Dividend Tracker',
      description: 'Track and analyze dividend income from your investments',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/dividend-tracker',
      color: 'from-green-500 to-green-600',
      keywords: ['dividend tracker', 'dividend income', 'investment tracking'],
      seoDescription: 'Track and analyze dividend income from your investments.'
    },
    {
      id: 'elss-vs-ppf-return-visualizer',
      name: 'ELSS vs PPF Return Visualizer',
      description: 'Compare returns from ELSS vs PPF investments',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/elss-vs-ppf-return-visualizer',
      color: 'from-purple-500 to-purple-600',
      keywords: ['ELSS vs PPF', 'tax saving', 'return comparison'],
      seoDescription: 'Compare returns from ELSS vs PPF investments.'
    },
    {
      id: 'gold-vs-equity-10-year-return-comparator',
      name: 'Gold vs Equity 10-Year Return Comparator',
      description: 'Compare 10-year returns from gold vs equity investments',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/gold-vs-equity-10-year-return-comparator',
      color: 'from-yellow-500 to-yellow-600',
      keywords: ['gold vs equity', '10 year returns', 'investment comparison'],
      seoDescription: 'Compare 10-year returns from gold vs equity investments.'
    },
    {
      id: 'crypto-vs-equity-investment-risk-tool',
      name: 'Crypto vs Equity Investment Risk Tool',
      description: 'Compare risk profiles of crypto vs equity investments',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/crypto-vs-equity-investment-risk-tool',
      color: 'from-orange-500 to-orange-600',
      keywords: ['crypto vs equity', 'risk comparison', 'investment risk'],
      seoDescription: 'Compare risk profiles of crypto vs equity investments.'
    },
    {
      id: 'reits-vs-fd-roi-visualizer',
      name: 'REITs vs FD ROI Visualizer',
      description: 'Compare ROI from REITs vs Fixed Deposits',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/reits-vs-fd-roi-visualizer',
      color: 'from-blue-500 to-blue-600',
      keywords: ['REITs vs FD', 'ROI comparison', 'real estate investment'],
      seoDescription: 'Compare ROI from REITs vs Fixed Deposits.'
    },
    {
      id: 'long-term-capital-gains-estimator',
      name: 'Long-Term Capital Gains Estimator',
      description: 'Estimate long-term capital gains on your investments',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/long-term-capital-gains-estimator',
      color: 'from-green-500 to-green-600',
      keywords: ['long term capital gains', 'LTCG', 'tax estimation'],
      seoDescription: 'Estimate long-term capital gains on your investments.'
    },
    {
      id: 'stock-split-adjusted-roi-calculator',
      name: 'Stock Split Adjusted ROI Calculator',
      description: 'Calculate ROI adjusted for stock splits and corporate actions',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/stock-split-adjusted-roi-calculator',
      color: 'from-purple-500 to-purple-600',
      keywords: ['stock split', 'ROI calculation', 'corporate actions'],
      seoDescription: 'Calculate ROI adjusted for stock splits and corporate actions.'
    },
    {
      id: 'expense-ratio-impact-visual-tool',
      name: 'Expense Ratio Impact Visual Tool',
      description: 'Visualize the impact of expense ratios on long-term returns',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/expense-ratio-impact-visual-tool',
      color: 'from-red-500 to-red-600',
      keywords: ['expense ratio impact', 'fund costs', 'return impact'],
      seoDescription: 'Visualize the impact of expense ratios on long-term returns.'
    },
    {
      id: 'goal-based-investment-allocator',
      name: 'Goal-Based Investment Allocator',
      description: 'Allocate investments based on specific financial goals',
      icon: <PieChart className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/goal-based-investment-allocator',
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['goal based investing', 'investment allocation', 'financial goals'],
      seoDescription: 'Allocate investments based on specific financial goals.'
    },
    {
      id: 'nps-vs-ppf-comparison',
      name: 'NPS vs PPF Comparison',
      description: 'Compare National Pension System vs Public Provident Fund',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/nps-vs-ppf-comparison',
      color: 'from-teal-500 to-teal-600',
      keywords: ['NPS vs PPF', 'pension planning', 'retirement comparison'],
      seoDescription: 'Compare National Pension System vs Public Provident Fund.'
    },
    {
      id: 'real-estate-vs-stock-roi-tool',
      name: 'Real Estate vs Stock ROI Tool',
      description: 'Compare ROI from real estate vs stock investments',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/real-estate-vs-stock-roi-tool',
      color: 'from-cyan-500 to-cyan-600',
      keywords: ['real estate vs stock', 'ROI comparison', 'investment choice'],
      seoDescription: 'Compare ROI from real estate vs stock investments.'
    },
    {
      id: 'monthly-passive-income-calculator',
      name: 'Monthly Passive Income Calculator',
      description: 'Calculate monthly passive income from your investments',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/monthly-passive-income-calculator',
      color: 'from-lime-500 to-lime-600',
      keywords: ['passive income', 'monthly income', 'investment income'],
      seoDescription: 'Calculate monthly passive income from your investments.'
    },
    {
      id: 'shareholding-pattern-visualizer',
      name: 'Shareholding Pattern Visualizer',
      description: 'Visualize shareholding patterns and ownership structures',
      icon: <PieChart className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/shareholding-pattern-visualizer',
      color: 'from-pink-500 to-pink-600',
      keywords: ['shareholding pattern', 'ownership structure', 'stock analysis'],
      seoDescription: 'Visualize shareholding patterns and ownership structures.'
    },
    {
      id: 'top-sector-allocation-analyzer',
      name: 'Top Sector Allocation Analyzer',
      description: 'Analyze sector allocation in your portfolio and market indices',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/top-sector-allocation-analyzer',
      color: 'from-orange-500 to-orange-600',
      keywords: ['sector allocation', 'portfolio analysis', 'sector exposure'],
      seoDescription: 'Analyze sector allocation in your portfolio and market indices.'
    },
    {
      id: 'amc-fee-analyzer-tool',
      name: 'AMC Fee Analyzer Tool',
      description: 'Analyze Asset Management Company fees and their impact',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/amc-fee-analyzer-tool',
      color: 'from-red-500 to-red-600',
      keywords: ['AMC fees', 'fund charges', 'fee analysis'],
      seoDescription: 'Analyze Asset Management Company fees and their impact.'
    },
    {
      id: 'simple-stock-valuation-tool',
      name: 'Simple Stock Valuation Tool',
      description: 'Basic stock valuation using PE ratio and EPS analysis',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/simple-stock-valuation-tool',
      color: 'from-blue-500 to-blue-600',
      keywords: ['stock valuation', 'PE ratio', 'EPS analysis'],
      seoDescription: 'Basic stock valuation using PE ratio and EPS analysis.'
    },
    {
      
      id: 'ulip-vs-term-insurance-return-calculator',
      name: 'ULIP vs Term Insurance Return Calculator',
      description: 'Compare returns from ULIP vs Term Insurance policies',
      icon: <IndianRupee className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/ulip-vs-term-insurance-return-calculator',
      color: 'from-green-500 to-green-600',
      keywords: ['ULIP vs term insurance', 'insurance comparison', 'return calculation'],
      seoDescription: 'Compare returns from ULIP vs Term Insurance policies.'
    },
    {
      id: 'gold-sip-vs-gold-etf-return-visualizer',
      name: 'Gold SIP vs Gold ETF Return Visualizer',
      description: 'Compare returns from Gold SIP vs Gold ETF investments',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/gold-sip-vs-gold-etf-return-visualizer',
      color: 'from-yellow-500 to-yellow-600',
      keywords: ['gold SIP', 'gold ETF', 'gold investment comparison'],
      seoDescription: 'Compare returns from Gold SIP vs Gold ETF investments.'
    }
  ];

  const categories = ['all', ...Array.from(new Set(financeTools.map(tool => tool.category)))];

  const filteredTools = financeTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTools = financeTools.filter(tool => tool.isPopular);

  return (
    <>
      <SEOHelmet
        title="Finance Tools Hub - Investment & Financial Planning Tools | MoneyCal"
        description="Access comprehensive finance tools including SIP calculators, mutual fund analyzers, portfolio trackers, and investment planning tools. Make informed financial decisions with our expert tools."
        keywords="finance tools, investment tools, SIP Calculator, mutual fund tools, portfolio tracker, investment planning, financial calculators"
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
                Finance Tools Hub
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                Comprehensive investment and financial planning tools to help you make informed decisions
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 font-medium px-4">
                <span>📈 Investment Analysis</span>
                <span>•</span>
                <span>💰 Portfolio Management</span>
                <span>•</span>
                <span>🎯 Goal Planning</span>
                <span>•</span>
                <span>📊 Risk Assessment</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-96 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search finance tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-base rounded-xl border border-gray-200 bg-gray-50 focus:ring-0 focus:border-blue-400 text-gray-900 transition-colors"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
                      selectedCategory === category
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {category === 'all' ? 'All Tools' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTools.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-2xl border border-gray-100"
              >
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-gray-100 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
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
                              Popular
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

        {/* Related Tools Section */}
        <section className="py-8 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Explore More Tools</h2>
              <p className="text-base md:text-lg text-gray-600">Discover other specialized tool categories</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Link
                to="/tax-tools"
                className="group bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1 duration-300 block text-center"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Tax Tools
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">Advanced tax planning and calculation tools</p>
              </Link>
              
              <Link
                to="/tools"
                className="group bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block text-center"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <IndianRupee className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  All Tools Hub
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">Complete collection of financial tools</p>
              </Link>
              
              <Link
                to="/calculators"
                className="group bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200 transform hover:-translate-y-1 duration-300 block text-center"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  Calculators
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">Basic and advanced financial calculators</p>
              </Link>
              
              <Link
                to="/stock-market"
                className="group bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1 duration-300 block text-center"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  Stock Market
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">Stock analysis and trading tools</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FinanceTools;
