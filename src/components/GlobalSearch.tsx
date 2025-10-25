import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calculator, FileText, TrendingUp, Home, CreditCard, Shield, PiggyBank, Building, GraduationCap, Users, Globe, Star, Zap, Target, Briefcase, Heart, Lightbulb, Newspaper, BookOpen, Smartphone, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'tool' | 'article' | 'page' | 'category';
  url: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
}

const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Comprehensive search data
  const searchData: SearchResult[] = [
    // Personal Finance Tools
    { id: 'budget-calculator', title: 'Budget Calculator', description: 'Create and manage your monthly budget with this comprehensive tool', type: 'tool', url: '/tools/budget-calculator', category: 'Personal Finance', icon: <Calculator className="w-5 h-5" />, tags: ['budget', 'expense', 'planning', 'money management'] },
    { id: 'expense-tracker', title: 'Expense Tracker', description: 'Track your daily expenses and analyze spending patterns', type: 'tool', url: '/tools/expense-tracker', category: 'Personal Finance', icon: <TrendingUp className="w-5 h-5" />, tags: ['expense', 'tracking', 'spending', 'analysis'] },
    { id: 'emergency-fund-calculator', title: 'Emergency Fund Calculator', description: 'Calculate how much you need for your emergency fund', type: 'tool', url: '/tools/emergency-fund-calculator', category: 'Personal Finance', icon: <Shield className="w-5 h-5" />, tags: ['emergency', 'fund', 'savings', 'security'] },
    { id: 'debt-payoff-calculator', title: 'Debt Payoff Calculator', description: 'Plan your debt repayment strategy with snowball or avalanche method', type: 'tool', url: '/tools/debt-payoff-calculator', category: 'Personal Finance', icon: <CreditCard className="w-5 h-5" />, tags: ['debt', 'payoff', 'repayment', 'strategy'] },
    { id: 'savings-goal-calculator', title: 'Savings Goal Calculator', description: 'Calculate how much to save monthly to reach your financial goals', type: 'tool', url: '/tools/savings-goal-calculator', category: 'Personal Finance', icon: <PiggyBank className="w-5 h-5" />, tags: ['savings', 'goal', 'planning', 'target'] },

    // Investment Tools
    { id: 'sip-calculator', title: 'SIP Calculator', description: 'Calculate returns from Systematic Investment Plans', type: 'tool', url: '/tools/sip-calculator', category: 'Investment', icon: <TrendingUp className="w-5 h-5" />, tags: ['sip', 'mutual fund', 'investment', 'returns'] },
    { id: 'lumpsum-calculator', title: 'Lumpsum Calculator', description: 'Calculate returns from lumpsum investments', type: 'tool', url: '/tools/lumpsum-calculator', category: 'Investment', icon: <Calculator className="w-5 h-5" />, tags: ['lumpsum', 'investment', 'returns', 'calculator'] },
    { id: 'portfolio-analyzer', title: 'Portfolio Analyzer', description: 'Analyze your investment portfolio performance', type: 'tool', url: '/tools/portfolio-analyzer', category: 'Investment', icon: <TrendingUp className="w-5 h-5" />, tags: ['portfolio', 'analysis', 'performance', 'investment'] },
    { id: 'risk-assessment', title: 'Risk Assessment Tool', description: 'Assess your risk tolerance for investments', type: 'tool', url: '/tools/risk-assessment', category: 'Investment', icon: <Shield className="w-5 h-5" />, tags: ['risk', 'assessment', 'tolerance', 'investment'] },
    { id: 'asset-allocation', title: 'Asset Allocation Calculator', description: 'Calculate optimal asset allocation for your portfolio', type: 'tool', url: '/tools/asset-allocation', category: 'Investment', icon: <Building className="w-5 h-5" />, tags: ['asset', 'allocation', 'portfolio', 'diversification'] },

    // Loan Tools
    { id: 'emi-calculator', title: 'EMI Calculator', description: 'Calculate Equated Monthly Installments for loans', type: 'tool', url: '/loan-tools/emi-calculator', category: 'Loans', icon: <Calculator className="w-5 h-5" />, tags: ['emi', 'loan', 'calculator', 'installment'] },
    { id: 'home-loan-calculator', title: 'Home Loan Calculator', description: 'Calculate home loan EMI and eligibility', type: 'tool', url: '/loan-tools/home-loan-calculator', category: 'Loans', icon: <Home className="w-5 h-5" />, tags: ['home loan', 'emi', 'eligibility', 'property'] },
    { id: 'personal-loan-calculator', title: 'Personal Loan Calculator', description: 'Calculate personal loan EMI and compare offers', type: 'tool', url: '/loan-tools/personal-loan-calculator', category: 'Loans', icon: <CreditCard className="w-5 h-5" />, tags: ['personal loan', 'emi', 'comparison', 'eligibility'] },
    { id: 'car-loan-calculator', title: 'Car Loan Calculator', description: 'Calculate car loan EMI and down payment', type: 'tool', url: '/loan-tools/car-loan-calculator', category: 'Loans', icon: <Building className="w-5 h-5" />, tags: ['car loan', 'emi', 'down payment', 'vehicle'] },
    { id: 'education-loan-calculator', title: 'Education Loan Calculator', description: 'Calculate education loan EMI and moratorium period', type: 'tool', url: '/loan-tools/education-loan-calculator', category: 'Loans', icon: <GraduationCap className="w-5 h-5" />, tags: ['education loan', 'emi', 'moratorium', 'student'] },
    { id: 'flat-rate-calculator', title: 'Flat Rate Calculator', description: 'Calculate flat rate loan EMI and interest', type: 'tool', url: '/loan-tools/flat-rate-calculator', category: 'Loans', icon: <Calculator className="w-5 h-5" />, tags: ['flat rate', 'loan', 'interest', 'calculator'] },
    { id: 'prepayment-calculator', title: 'Prepayment Calculator', description: 'Calculate loan prepayment savings and benefits', type: 'tool', url: '/loan-tools/prepayment-calculator', category: 'Loans', icon: <TrendingUp className="w-5 h-5" />, tags: ['prepayment', 'loan', 'savings', 'benefits'] },
    { id: 'debt-strategies', title: 'Debt Strategies', description: 'Debt snowball vs avalanche strategy calculator', type: 'tool', url: '/loan-tools/debt-strategies', category: 'Loans', icon: <Target className="w-5 h-5" />, tags: ['debt strategy', 'snowball', 'avalanche', 'debt payoff'] },
    { id: 'refinancing-calculator', title: 'Refinancing Calculator', description: 'Calculate loan refinancing benefits and savings', type: 'tool', url: '/loan-tools/refinancing-calculator', category: 'Loans', icon: <TrendingUp className="w-5 h-5" />, tags: ['refinancing', 'loan', 'savings', 'benefits'] },
    { id: 'loan-affordability', title: 'Loan Affordability Calculator', description: 'Calculate how much loan you can afford', type: 'tool', url: '/loan-tools/loan-affordability', category: 'Loans', icon: <Calculator className="w-5 h-5" />, tags: ['loan affordability', 'eligibility', 'income', 'debt ratio'] },
    { id: 'debt-consolidation', title: 'Debt Consolidation Calculator', description: 'Calculate debt consolidation benefits and savings', type: 'tool', url: '/loan-tools/debt-consolidation-calculator', category: 'Loans', icon: <Shield className="w-5 h-5" />, tags: ['debt consolidation', 'multiple loans', 'savings', 'simplification'] },
    { id: 'amortization-schedule', title: 'Amortization Schedule Viewer', description: 'View detailed loan amortization schedule', type: 'tool', url: '/loan-tools/amortization-schedule-viewer', category: 'Loans', icon: <FileText className="w-5 h-5" />, tags: ['amortization', 'schedule', 'loan breakdown', 'payment details'] },

    // Tax Tools
    { id: 'income-tax-calculator', title: 'Income Tax Calculator', description: 'Calculate your income tax liability for the year', type: 'tool', url: '/tools/income-tax-calculator', category: 'Tax', icon: <Calculator className="w-5 h-5" />, tags: ['income tax', 'calculation', 'liability', 'deductions'] },
    { id: 'gst-calculator', title: 'GST Calculator', description: 'Calculate GST on goods and services', type: 'tool', url: '/gst-tools/gst-calculator', category: 'Tax', icon: <Calculator className="w-5 h-5" />, tags: ['gst', 'tax', 'calculation', 'goods services'] },
    { id: 'tds-calculator', title: 'TDS Calculator', description: 'Calculate Tax Deducted at Source', type: 'tool', url: '/tools/tds-calculator', category: 'Tax', icon: <Calculator className="w-5 h-5" />, tags: ['tds', 'tax deduction', 'source', 'calculation'] },
    { id: 'tax-saving-investments', title: 'Tax Saving Investments', description: 'Find the best tax saving investment options under Section 80C', type: 'tool', url: '/tools/tax-saving-investments', category: 'Tax', icon: <Shield className="w-5 h-5" />, tags: ['tax saving', '80c', 'investments', 'deductions'] },
    { id: 'stcg-ltcg-classifier', title: 'STCG/LTCG Classifier', description: 'Classify short-term and long-term capital gains', type: 'tool', url: '/tax-tools/stcg-ltcg-classifier', category: 'Tax', icon: <Calculator className="w-5 h-5" />, tags: ['stcg', 'ltcg', 'capital gains', 'tax classification'] },
    { id: 'equity-tax-estimator', title: 'Equity Tax Estimator', description: 'Estimate tax on equity investments and trading', type: 'tool', url: '/tax-tools/equity-tax-estimator', category: 'Tax', icon: <TrendingUp className="w-5 h-5" />, tags: ['equity tax', 'stock tax', 'trading tax', 'capital gains'] },
    { id: 'dividend-tax-estimator', title: 'Dividend Tax Estimator', description: 'Calculate tax on dividend income', type: 'tool', url: '/tax-tools/dividend-tax-estimator', category: 'Tax', icon: <TrendingUp className="w-5 h-5" />, tags: ['dividend tax', 'dividend income', 'tax calculation', 'investment tax'] },
    { id: 'old-vs-new-tax-regime', title: 'Old vs New Tax Regime Helper', description: 'Compare old and new tax regimes for optimal savings', type: 'tool', url: '/tax-tools/old-vs-new-tax-regime-helper', category: 'Tax', icon: <Calculator className="w-5 h-5" />, tags: ['tax regime', 'old regime', 'new regime', 'tax comparison'] },

    // Insurance Tools
    { id: 'life-insurance-calculator', title: 'Life Insurance Calculator', description: 'Calculate how much life insurance coverage you need', type: 'tool', url: '/insurance-tools/life-insurance-calculator', category: 'Insurance', icon: <Shield className="w-5 h-5" />, tags: ['life insurance', 'coverage', 'premium', 'protection'] },
    { id: 'health-insurance-calculator', title: 'Health Insurance Calculator', description: 'Calculate health insurance premium and coverage', type: 'tool', url: '/insurance-tools/health-insurance-estimator', category: 'Insurance', icon: <Shield className="w-5 h-5" />, tags: ['health insurance', 'premium', 'coverage', 'medical'] },
    { id: 'motor-insurance-calculator', title: 'Motor Insurance Calculator', description: 'Calculate motor insurance premium for your vehicle', type: 'tool', url: '/insurance-tools/car-insurance-calculator', category: 'Insurance', icon: <Building className="w-5 h-5" />, tags: ['motor insurance', 'vehicle', 'premium', 'coverage'] },
    { id: 'term-insurance-planner', title: 'Term Insurance Planner', description: 'Plan and calculate term insurance needs', type: 'tool', url: '/insurance-tools/term-insurance-planner', category: 'Insurance', icon: <Shield className="w-5 h-5" />, tags: ['term insurance', 'life insurance', 'planning', 'coverage'] },
    { id: 'travel-insurance-selector', title: 'Travel Insurance Selector', description: 'Select and compare travel insurance plans', type: 'tool', url: '/insurance-tools/travel-insurance-selector', category: 'Insurance', icon: <Globe className="w-5 h-5" />, tags: ['travel insurance', 'travel protection', 'insurance comparison', 'travel safety'] },
    { id: 'home-insurance-estimator', title: 'Home Insurance Estimator', description: 'Estimate home insurance premium and coverage', type: 'tool', url: '/insurance-tools/home-insurance-estimator', category: 'Insurance', icon: <Home className="w-5 h-5" />, tags: ['home insurance', 'property insurance', 'premium', 'coverage'] },
    { id: 'critical-illness-calculator', title: 'Critical Illness Calculator', description: 'Calculate critical illness insurance needs', type: 'tool', url: '/insurance-tools/critical-illness-calculator', category: 'Insurance', icon: <Heart className="w-5 h-5" />, tags: ['critical illness', 'health insurance', 'medical coverage', 'illness protection'] },
    { id: 'ulip-calculator', title: 'ULIP Calculator', description: 'Calculate Unit Linked Insurance Plan returns', type: 'tool', url: '/insurance-tools/ulip-calculator', category: 'Insurance', icon: <TrendingUp className="w-5 h-5" />, tags: ['ulip', 'unit linked', 'insurance investment', 'returns'] },

    // Retirement Tools
    { id: 'retirement-calculator', title: 'Retirement Calculator', description: 'Calculate how much you need to save for retirement', type: 'tool', url: '/tools/retirement-calculator', category: 'Retirement', icon: <PiggyBank className="w-5 h-5" />, tags: ['retirement', 'savings', 'pension', 'planning'] },
    { id: 'nps-calculator', title: 'NPS Calculator', description: 'Calculate returns from National Pension System', type: 'tool', url: '/tools/nps-calculator', category: 'Retirement', icon: <Shield className="w-5 h-5" />, tags: ['nps', 'pension', 'retirement', 'government'] },
    { id: 'pension-calculator', title: 'Pension Calculator', description: 'Calculate your pension benefits and contributions', type: 'tool', url: '/tools/pension-calculator', category: 'Retirement', icon: <PiggyBank className="w-5 h-5" />, tags: ['pension', 'benefits', 'contributions', 'retirement'] },

    // Articles
    { id: 'personal-finance-guide', title: 'Complete Personal Finance Guide 2025', description: 'Comprehensive guide to managing your personal finances in India', type: 'article', url: '/finance-blog/complete-personal-finance-guide-2025', category: 'Personal Finance', icon: <FileText className="w-5 h-5" />, tags: ['personal finance', 'guide', 'budgeting', 'savings'] },
    { id: 'investment-strategies', title: 'Best Investment Strategies for 2025', description: 'Top investment strategies to build wealth in India', type: 'article', url: '/finance-blog/best-investment-strategies-2025', category: 'Investment', icon: <FileText className="w-5 h-5" />, tags: ['investment', 'strategies', 'wealth building', 'returns'] },
    { id: 'mutual-funds-guide', title: 'Complete Mutual Funds Guide', description: 'Everything you need to know about mutual funds in India', type: 'article', url: '/finance-blog/complete-mutual-funds-guide', category: 'Investment', icon: <FileText className="w-5 h-5" />, tags: ['mutual funds', 'sip', 'investment', 'guide'] },
    { id: 'tax-planning-guide', title: 'Tax Planning Guide 2025', description: 'Complete guide to tax planning and saving in India', type: 'article', url: '/finance-blog/tax-planning-guide-2025', category: 'Tax', icon: <FileText className="w-5 h-5" />, tags: ['tax planning', 'savings', 'deductions', '80c'] },
    { id: 'insurance-planning', title: 'Insurance Planning Guide', description: 'Complete guide to insurance planning for financial security', type: 'article', url: '/finance-blog/insurance-planning-guide', category: 'Insurance', icon: <FileText className="w-5 h-5" />, tags: ['insurance', 'planning', 'security', 'coverage'] },

    // Categories
    { id: 'personal-finance-category', title: 'Personal Finance Management', description: 'Complete guide to budgeting, saving, debt management, and financial planning', type: 'category', url: '/finance-categories/personal-finance-management', category: 'Personal Finance', icon: <PiggyBank className="w-5 h-5" />, tags: ['personal finance', 'budgeting', 'savings', 'debt management'] },
    { id: 'investment-category', title: 'Investment Planning & Strategy', description: 'Comprehensive investment strategies, portfolio management, and wealth building', type: 'category', url: '/finance-categories/investment-planning-strategy', category: 'Investment', icon: <TrendingUp className="w-5 h-5" />, tags: ['investment', 'strategy', 'portfolio', 'wealth building'] },
    { id: 'loan-category', title: 'Loan Calculators & Tools', description: 'EMI calculators, loan comparison, and debt management tools', type: 'category', url: '/finance-categories/loan-calculators-tools', category: 'Loans', icon: <Calculator className="w-5 h-5" />, tags: ['loans', 'emi', 'calculators', 'debt management'] },
    { id: 'tax-category', title: 'Tax Planning & Optimization', description: 'Income tax planning, deductions, and tax-saving investment strategies', type: 'category', url: '/finance-categories/tax-planning-optimization', category: 'Tax', icon: <Shield className="w-5 h-5" />, tags: ['tax planning', 'deductions', 'optimization', 'savings'] },
    { id: 'insurance-category', title: 'Insurance Planning', description: 'Life, health, motor, and general insurance planning and comparison', type: 'category', url: '/finance-categories/insurance-planning', category: 'Insurance', icon: <Shield className="w-5 h-5" />, tags: ['insurance', 'planning', 'comparison', 'coverage'] },

    // Government Schemes
    { id: 'pm-kisan', title: 'PM Kisan Scheme', description: 'Pradhan Mantri Kisan Samman Nidhi - Direct income support to farmers', type: 'tool', url: '/government-schemes/pm-kisan', category: 'Government Schemes', icon: <Globe className="w-5 h-5" />, tags: ['pm kisan', 'farmer', 'income support', 'government'] },
    { id: 'pm-awas-yojana', title: 'PM Awas Yojana', description: 'Pradhan Mantri Awas Yojana - Housing for all scheme', type: 'tool', url: '/government-schemes/pm-awas-yojana', category: 'Government Schemes', icon: <Home className="w-5 h-5" />, tags: ['pm awas yojana', 'housing', 'home loan', 'subsidy'] },
    { id: 'mudra-loan', title: 'MUDRA Loan Calculator', description: 'Micro Units Development and Refinance Agency loan calculator', type: 'tool', url: '/government-schemes/mudra-loan', category: 'Government Schemes', icon: <Calculator className="w-5 h-5" />, tags: ['mudra', 'loan', 'msme', 'business'] },
    { id: 'stand-up-india', title: 'Stand Up India Scheme', description: 'Bank loan scheme for SC/ST and women entrepreneurs', type: 'tool', url: '/government-schemes/stand-up-india', category: 'Government Schemes', icon: <Star className="w-5 h-5" />, tags: ['stand up india', 'entrepreneur', 'sc st', 'women'] },
    { id: 'pm-svanidhi', title: 'PM SVANidhi Scheme', description: 'Pradhan Mantri Street Vendor AtmaNirbhar Nidhi scheme', type: 'tool', url: '/government-schemes/pm-svanidhi', category: 'Government Schemes', icon: <Building className="w-5 h-5" />, tags: ['pm svanidhi', 'street vendor', 'loan', 'micro credit'] },

    // Cryptocurrency & Digital Assets
    { id: 'crypto-calculator', title: 'Cryptocurrency Calculator', description: 'Calculate crypto investment returns and portfolio value', type: 'tool', url: '/cryptocurrency/crypto-calculator', category: 'Cryptocurrency', icon: <Zap className="w-5 h-5" />, tags: ['cryptocurrency', 'bitcoin', 'ethereum', 'crypto investment'] },
    { id: 'defi-calculator', title: 'DeFi Calculator', description: 'Decentralized Finance yield farming and staking calculator', type: 'tool', url: '/cryptocurrency/defi-calculator', category: 'Cryptocurrency', icon: <TrendingUp className="w-5 h-5" />, tags: ['defi', 'yield farming', 'staking', 'decentralized'] },
    { id: 'nft-calculator', title: 'NFT Investment Calculator', description: 'Calculate returns from NFT investments and trading', type: 'tool', url: '/cryptocurrency/nft-calculator', category: 'Cryptocurrency', icon: <Star className="w-5 h-5" />, tags: ['nft', 'non fungible token', 'digital art', 'blockchain'] },
    { id: 'crypto-tax-calculator', title: 'Crypto Tax Calculator', description: 'Calculate tax liability on cryptocurrency transactions', type: 'tool', url: '/cryptocurrency/crypto-tax-calculator', category: 'Cryptocurrency', icon: <Calculator className="w-5 h-5" />, tags: ['crypto tax', 'bitcoin tax', 'capital gains', 'cryptocurrency tax'] },

    // Banking & Financial Services
    { id: 'bank-account-comparison', title: 'Bank Account Comparison', description: 'Compare savings accounts, current accounts, and banking services', type: 'tool', url: '/banking/bank-account-comparison', category: 'Banking', icon: <Building className="w-5 h-5" />, tags: ['bank account', 'savings account', 'current account', 'banking'] },
    { id: 'credit-card-comparison', title: 'Credit Card Comparison', description: 'Compare credit cards, rewards, and benefits', type: 'tool', url: '/banking/credit-card-comparison', category: 'Banking', icon: <CreditCard className="w-5 h-5" />, tags: ['credit card', 'rewards', 'benefits', 'comparison'] },
    { id: 'upi-calculator', title: 'UPI Payment Calculator', description: 'Calculate UPI transaction fees and limits', type: 'tool', url: '/banking/upi-calculator', category: 'Banking', icon: <Smartphone className="w-5 h-5" />, tags: ['upi', 'digital payment', 'mobile payment', 'transaction'] },
    { id: 'fd-calculator', title: 'Fixed Deposit Calculator', description: 'Calculate FD returns and maturity amount', type: 'tool', url: '/banking/fd-calculator', category: 'Banking', icon: <PiggyBank className="w-5 h-5" />, tags: ['fixed deposit', 'fd', 'savings', 'interest'] },
    { id: 'credit-card-finder', title: 'Credit Card Finder', description: 'Find the best credit card for your needs', type: 'tool', url: '/credit-card-finder', category: 'Banking', icon: <CreditCard className="w-5 h-5" />, tags: ['credit card finder', 'credit card comparison', 'best credit card', 'card selection'] },
    { id: 'bank-locker-finder', title: 'Bank Locker Finder', description: 'Find bank locker facilities near you', type: 'tool', url: '/calculators/bank-locker-finder', category: 'Banking', icon: <Building className="w-5 h-5" />, tags: ['bank locker', 'locker finder', 'bank services', 'safety deposit'] },
    { id: 'cheque-bounce-calculator', title: 'Cheque Bounce Charges Calculator', description: 'Calculate cheque bounce charges and penalties', type: 'tool', url: '/calculators/cheque-bounce-charges-calculator', category: 'Banking', icon: <Calculator className="w-5 h-5" />, tags: ['cheque bounce', 'penalties', 'bank charges', 'bounce charges'] },

    // Real Estate Investment
    { id: 'property-investment-calculator', title: 'Property Investment Calculator', description: 'Calculate returns from real estate investments', type: 'tool', url: '/real-estate/property-investment-calculator', category: 'Real Estate', icon: <Home className="w-5 h-5" />, tags: ['property investment', 'real estate', 'rental yield', 'property returns'] },
    { id: 'reit-calculator', title: 'REIT Calculator', description: 'Calculate returns from Real Estate Investment Trusts', type: 'tool', url: '/real-estate/reit-calculator', category: 'Real Estate', icon: <Building className="w-5 h-5" />, tags: ['reit', 'real estate investment trust', 'dividend', 'property investment'] },
    { id: 'rental-yield-calculator', title: 'Rental Yield Calculator', description: 'Calculate rental yield and property investment returns', type: 'tool', url: '/real-estate/rental-yield-calculator', category: 'Real Estate', icon: <TrendingUp className="w-5 h-5" />, tags: ['rental yield', 'property investment', 'rental income', 'real estate'] },

    // GST Tools
    { id: 'gst-due-date-tracker', title: 'GST Due Date Tracker', description: 'Track GST filing due dates and compliance', type: 'tool', url: '/gst-tools/gst-due-date-tracker', category: 'GST Tools', icon: <Calendar className="w-5 h-5" />, tags: ['gst due date', 'gst filing', 'compliance', 'tracker'] },
    { id: 'gst-hsn-sac-finder', title: 'GST HSN/SAC Finder', description: 'Find HSN and SAC codes for GST filing', type: 'tool', url: '/gst-tools/gst-hsn-sac-finder', category: 'GST Tools', icon: <Search className="w-5 h-5" />, tags: ['gst hsn', 'gst sac', 'hsn code', 'sac code'] },
    { id: 'gst-slab-finder', title: 'GST Slab Finder', description: 'Find GST tax rates and slabs for products', type: 'tool', url: '/gst-tools/gst-slab-finder', category: 'GST Tools', icon: <Calculator className="w-5 h-5" />, tags: ['gst slab', 'gst rate', 'tax rate', 'gst percentage'] },
    { id: 'gst-liability-calculator', title: 'GST Liability Calculator', description: 'Calculate GST liability and tax payable', type: 'tool', url: '/gst-tools/gst-liability-calculator', category: 'GST Tools', icon: <Calculator className="w-5 h-5" />, tags: ['gst liability', 'gst payable', 'tax calculation', 'gst amount'] },
    { id: 'gst-invoice-generator', title: 'GST Invoice Generator', description: 'Generate GST compliant invoices', type: 'tool', url: '/gst-tools/gst-invoice-generator', category: 'GST Tools', icon: <FileText className="w-5 h-5" />, tags: ['gst invoice', 'invoice generator', 'gst compliant', 'invoice creation'] },
    
    // Corporate Finance Tools
    { id: 'business-valuation-calculator', title: 'Business Valuation Calculator', description: 'Calculate business value and worth', type: 'tool', url: '/corporate-finance/business-valuation-calculator', category: 'Corporate Finance', icon: <Calculator className="w-5 h-5" />, tags: ['business valuation', 'company value', 'business worth', 'valuation'] },
    { id: 'working-capital-optimizer', title: 'Working Capital Optimizer', description: 'Optimize working capital management', type: 'tool', url: '/corporate-finance/working-capital-optimizer', category: 'Corporate Finance', icon: <TrendingUp className="w-5 h-5" />, tags: ['working capital', 'capital management', 'business finance', 'optimization'] },
    { id: 'break-even-calculator', title: 'Break Even Calculator', description: 'Calculate break-even point for business', type: 'tool', url: '/corporate-finance/break-even-calculator', category: 'Corporate Finance', icon: <Target className="w-5 h-5" />, tags: ['break even', 'business analysis', 'profitability', 'cost analysis'] },
    { id: 'cost-of-capital-benchmarking', title: 'Cost of Capital Benchmarking', description: 'Benchmark and analyze cost of capital', type: 'tool', url: '/corporate-finance/cost-capital-benchmarking', category: 'Corporate Finance', icon: <TrendingUp className="w-5 h-5" />, tags: ['cost of capital', 'capital cost', 'benchmarking', 'financial analysis'] },
    
    // Festival Tools
    { id: 'diwali-budget-planner', title: 'Diwali Budget Planner', description: 'Plan your Diwali expenses and budget', type: 'tool', url: '/festival-tools/diwali/budget-planner', category: 'Festival Tools', icon: <Star className="w-5 h-5" />, tags: ['diwali', 'budget planner', 'festival expenses', 'diwali planning'] },
    { id: 'wedding-expense-calculator', title: 'Wedding Expense Calculator', description: 'Calculate wedding expenses and budget', type: 'tool', url: '/festival-tools/wedding/expense-calculator', category: 'Festival Tools', icon: <Heart className="w-5 h-5" />, tags: ['wedding', 'expense calculator', 'wedding budget', 'marriage planning'] },
    { id: 'holiday-savings-calculator', title: 'Holiday Savings Calculator', description: 'Calculate savings needed for holidays', type: 'tool', url: '/festival-tools/holiday/savings-calculator', category: 'Festival Tools', icon: <Globe className="w-5 h-5" />, tags: ['holiday savings', 'vacation planning', 'travel budget', 'holiday expenses'] },
    
    // Financial Education & Literacy
    { id: 'financial-literacy-course', title: 'Financial Literacy Course', description: 'Complete course on financial literacy and money management', type: 'article', url: '/financial-education/financial-literacy-course', category: 'Financial Education', icon: <BookOpen className="w-5 h-5" />, tags: ['financial literacy', 'money management', 'education', 'course'] },
    { id: 'investment-basics', title: 'Investment Basics Guide', description: 'Learn the fundamentals of investing in India', type: 'article', url: '/financial-education/investment-basics', category: 'Financial Education', icon: <Lightbulb className="w-5 h-5" />, tags: ['investment basics', 'investing guide', 'financial education', 'beginner'] },
    { id: 'market-analysis-tools', title: 'Market Analysis Tools', description: 'Tools for analyzing stock market trends and patterns', type: 'tool', url: '/market-analysis/tools', category: 'Market Analysis', icon: <TrendingUp className="w-5 h-5" />, tags: ['market analysis', 'stock market', 'trends', 'technical analysis'] },

    // Blog and Content
    { id: 'blog', title: 'Finance Blog', description: 'Latest finance articles, guides, and insights', type: 'page', url: '/blog', category: 'Blog', icon: <FileText className="w-5 h-5" />, tags: ['blog', 'articles', 'finance guides', 'insights'] },
    { id: 'finance-blog', title: 'SEO Finance Blog', description: 'Comprehensive finance guides and tutorials', type: 'page', url: '/finance-blog', category: 'Blog', icon: <FileText className="w-5 h-5" />, tags: ['seo blog', 'finance guides', 'tutorials', 'comprehensive'] },
    
    // Government Schemes
    { id: 'government-schemes', title: 'Government Schemes', description: 'PM schemes, subsidies, and government financial programs', type: 'page', url: '/government-schemes', category: 'Government Schemes', icon: <Globe className="w-5 h-5" />, tags: ['government schemes', 'pm schemes', 'subsidies', 'government programs'] },
    
    // Excel Tools
    { id: 'excel-tools', title: 'Excel Tools', description: 'Excel templates, formulas, and financial tools', type: 'page', url: '/excel-tools', category: 'Excel Tools', icon: <Building className="w-5 h-5" />, tags: ['excel', 'templates', 'formulas', 'spreadsheet tools'] },
    { id: 'exceltool', title: 'Excel Tool Blog', description: 'Excel tutorials and financial spreadsheet guides', type: 'page', url: '/exceltool', category: 'Excel Tools', icon: <FileText className="w-5 h-5" />, tags: ['excel blog', 'tutorials', 'spreadsheet guides', 'financial tools'] },
    { id: 'excel-budget-template', title: 'Excel Budget Template', description: 'Download free Excel budget templates', type: 'tool', url: '/excel-tools/budget-template', category: 'Excel Tools', icon: <FileText className="w-5 h-5" />, tags: ['excel budget', 'budget template', 'excel template', 'budget spreadsheet'] },
    { id: 'excel-financial-formulas', title: 'Excel Financial Formulas', description: 'Learn essential Excel financial formulas', type: 'tool', url: '/excel-tools/financial-formulas', category: 'Excel Tools', icon: <Calculator className="w-5 h-5" />, tags: ['excel formulas', 'financial formulas', 'excel functions', 'spreadsheet formulas'] },
    { id: 'excel-investment-tracker', title: 'Excel Investment Tracker', description: 'Track investments using Excel templates', type: 'tool', url: '/excel-tools/investment-tracker', category: 'Excel Tools', icon: <TrendingUp className="w-5 h-5" />, tags: ['excel investment', 'investment tracker', 'portfolio tracker', 'excel template'] },
    { id: 'excel-expense-tracker', title: 'Excel Expense Tracker', description: 'Track expenses using Excel templates', type: 'tool', url: '/excel-tools/expense-tracker', category: 'Excel Tools', icon: <Calculator className="w-5 h-5" />, tags: ['excel expense', 'expense tracker', 'expense template', 'excel spreadsheet'] },
    
    // Crypto Section
    { id: 'crypto', title: 'Cryptocurrency Section', description: 'Crypto investment guides, news, and analysis', type: 'page', url: '/crypto', category: 'Cryptocurrency', icon: <Zap className="w-5 h-5" />, tags: ['cryptocurrency', 'crypto news', 'bitcoin', 'blockchain'] },
    { id: 'crypto-portfolio-tracker', title: 'Crypto Portfolio Tracker', description: 'Track your cryptocurrency portfolio performance', type: 'tool', url: '/crypto/portfolio-tracker', category: 'Cryptocurrency', icon: <TrendingUp className="w-5 h-5" />, tags: ['crypto portfolio', 'portfolio tracker', 'cryptocurrency tracking', 'crypto performance'] },
    { id: 'crypto-profit-calculator', title: 'Crypto Profit Calculator', description: 'Calculate profits and losses from crypto trading', type: 'tool', url: '/crypto/profit-calculator', category: 'Cryptocurrency', icon: <Calculator className="w-5 h-5" />, tags: ['crypto profit', 'crypto calculator', 'trading calculator', 'crypto returns'] },
    { id: 'crypto-dca-calculator', title: 'Crypto DCA Calculator', description: 'Calculate Dollar Cost Averaging for crypto investments', type: 'tool', url: '/crypto/dca-calculator', category: 'Cryptocurrency', icon: <TrendingUp className="w-5 h-5" />, tags: ['crypto dca', 'dollar cost averaging', 'crypto investment', 'systematic investment'] },
    { id: 'crypto-staking-calculator', title: 'Crypto Staking Calculator', description: 'Calculate staking rewards and returns', type: 'tool', url: '/crypto/staking-calculator', category: 'Cryptocurrency', icon: <Star className="w-5 h-5" />, tags: ['crypto staking', 'staking calculator', 'staking rewards', 'crypto yield'] },
    
    // Calculators
    { id: 'calculators', title: 'All Calculators', description: 'Comprehensive collection of financial calculators', type: 'page', url: '/calculators', category: 'Calculators', icon: <Calculator className="w-5 h-5" />, tags: ['calculators', 'financial tools', 'emi calculator', 'investment calculator'] },
    { id: 'compound-interest-calculator', title: 'Compound Interest Calculator', description: 'Calculate compound interest and returns', type: 'tool', url: '/calculators/compound-interest-calculator', category: 'Calculators', icon: <Calculator className="w-5 h-5" />, tags: ['compound interest', 'interest calculator', 'compound returns', 'investment calculator'] },
    { id: 'simple-interest-calculator', title: 'Simple Interest Calculator', description: 'Calculate simple interest on loans and investments', type: 'tool', url: '/calculators/simple-interest-calculator', category: 'Calculators', icon: <Calculator className="w-5 h-5" />, tags: ['simple interest', 'interest calculation', 'loan interest', 'investment interest'] },
    { id: 'percentage-calculator', title: 'Percentage Calculator', description: 'Calculate percentages, discounts, and markups', type: 'tool', url: '/calculators/percentage-calculator', category: 'Calculators', icon: <Calculator className="w-5 h-5" />, tags: ['percentage calculator', 'discount calculator', 'markup calculator', 'percentage calculation'] },
    { id: 'currency-converter', title: 'Currency Converter', description: 'Convert between different currencies', type: 'tool', url: '/calculators/currency-converter', category: 'Calculators', icon: <Globe className="w-5 h-5" />, tags: ['currency converter', 'exchange rate', 'currency conversion', 'forex calculator'] },
    
    // Finance Tools
    { id: 'finance-tools', title: 'Finance Tools Hub', description: 'Advanced finance tools and calculators', type: 'page', url: '/finance-tools', category: 'Finance Tools', icon: <TrendingUp className="w-5 h-5" />, tags: ['finance tools', 'advanced calculators', 'investment tools', 'portfolio tools'] },
    { id: 'financial-ratio-calculator', title: 'Financial Ratio Calculator', description: 'Calculate key financial ratios and metrics', type: 'tool', url: '/finance-tools/financial-ratio-calculator', category: 'Finance Tools', icon: <Calculator className="w-5 h-5" />, tags: ['financial ratios', 'ratio calculator', 'financial metrics', 'business analysis'] },
    { id: 'cash-flow-calculator', title: 'Cash Flow Calculator', description: 'Calculate and analyze cash flow statements', type: 'tool', url: '/finance-tools/cash-flow-calculator', category: 'Finance Tools', icon: <TrendingUp className="w-5 h-5" />, tags: ['cash flow', 'cash flow calculator', 'financial analysis', 'business finance'] },
    { id: 'roi-calculator', title: 'ROI Calculator', description: 'Calculate Return on Investment for various assets', type: 'tool', url: '/finance-tools/roi-calculator', category: 'Finance Tools', icon: <Target className="w-5 h-5" />, tags: ['roi calculator', 'return on investment', 'investment returns', 'profitability'] },
    { id: 'npv-calculator', title: 'NPV Calculator', description: 'Calculate Net Present Value of investments', type: 'tool', url: '/finance-tools/npv-calculator', category: 'Finance Tools', icon: <Calculator className="w-5 h-5" />, tags: ['npv calculator', 'net present value', 'investment analysis', 'discounted cash flow'] },
    
    // Tax Tools
    { id: 'tax-tools', title: 'Tax Tools Hub', description: 'Income tax calculators and tax planning tools', type: 'page', url: '/tax-tools', category: 'Tax Tools', icon: <Shield className="w-5 h-5" />, tags: ['tax tools', 'income tax', 'tax planning', 'tax calculator'] },
    
    // GST Tools
    { id: 'gst-tools', title: 'GST Tools Hub', description: 'GST calculators, compliance tools, and tax utilities', type: 'page', url: '/gst-tools', category: 'GST Tools', icon: <Building className="w-5 h-5" />, tags: ['gst tools', 'gst calculator', 'tax compliance', 'business tax'] },
    
    // Corporate Finance
    { id: 'corporate-finance', title: 'Corporate Finance', description: 'Business finance tools and corporate calculators', type: 'page', url: '/corporate-finance', category: 'Corporate Finance', icon: <Briefcase className="w-5 h-5" />, tags: ['corporate finance', 'business tools', 'corporate calculators', 'business valuation'] },
    
    // Insurance Tools
    { id: 'insurance-tools', title: 'Insurance Tools Hub', description: 'Insurance calculators and planning tools', type: 'page', url: '/insurance-tools', category: 'Insurance Tools', icon: <Shield className="w-5 h-5" />, tags: ['insurance tools', 'life insurance', 'health insurance', 'insurance calculator'] },
    
    // Festival Tools
    { id: 'festival-tools', title: 'Festival Tools', description: 'Festival-specific financial tools and calculators', type: 'page', url: '/festival-tools', category: 'Festival Tools', icon: <Star className="w-5 h-5" />, tags: ['festival tools', 'festival calculator', 'special occasions', 'festival planning'] },
    
    // Gold Tools
    { id: 'gold-tools', title: 'Gold Tools', description: 'Gold investment calculators and price trackers', type: 'page', url: '/gold-tools', category: 'Gold Tools', icon: <Star className="w-5 h-5" />, tags: ['gold tools', 'gold calculator', 'gold investment', 'gold price'] },
    { id: 'gold-price-calculator', title: 'Gold Price Calculator', description: 'Calculate gold prices and investment returns', type: 'tool', url: '/gold-tools/gold-price-calculator', category: 'Gold Tools', icon: <Calculator className="w-5 h-5" />, tags: ['gold price', 'gold calculator', 'gold investment', 'gold returns'] },
    { id: 'gold-sip-calculator', title: 'Gold SIP Calculator', description: 'Calculate returns from Gold Systematic Investment Plans', type: 'tool', url: '/gold-tools/gold-sip-calculator', category: 'Gold Tools', icon: <TrendingUp className="w-5 h-5" />, tags: ['gold sip', 'systematic investment', 'gold mutual fund', 'gold etf'] },
    { id: 'gold-loan-calculator', title: 'Gold Loan Calculator', description: 'Calculate gold loan amount and interest rates', type: 'tool', url: '/gold-tools/gold-loan-calculator', category: 'Gold Tools', icon: <CreditCard className="w-5 h-5" />, tags: ['gold loan', 'loan against gold', 'gold collateral', 'gold financing'] },
    
    // Stock Market
    { id: 'stock-market', title: 'Stock Market Education', description: 'Stock market learning and analysis tools', type: 'page', url: '/stock-market', category: 'Stock Market', icon: <TrendingUp className="w-5 h-5" />, tags: ['stock market', 'trading', 'investment education', 'market analysis'] },
    { id: 'stock-screener', title: 'Stock Screener', description: 'Screen and filter stocks based on criteria', type: 'tool', url: '/stock-market/stock-screener', category: 'Stock Market', icon: <Search className="w-5 h-5" />, tags: ['stock screener', 'stock filter', 'stock analysis', 'stock selection'] },
    { id: 'portfolio-tracker', title: 'Portfolio Tracker', description: 'Track your stock portfolio performance', type: 'tool', url: '/stock-market/portfolio-tracker', category: 'Stock Market', icon: <TrendingUp className="w-5 h-5" />, tags: ['portfolio tracker', 'stock portfolio', 'performance tracking', 'investment tracking'] },
    { id: 'options-calculator', title: 'Options Calculator', description: 'Calculate options trading profits and losses', type: 'tool', url: '/stock-market/options-calculator', category: 'Stock Market', icon: <Calculator className="w-5 h-5" />, tags: ['options calculator', 'options trading', 'derivatives', 'options analysis'] },
    { id: 'futures-calculator', title: 'Futures Calculator', description: 'Calculate futures trading margins and profits', type: 'tool', url: '/stock-market/futures-calculator', category: 'Stock Market', icon: <Calculator className="w-5 h-5" />, tags: ['futures calculator', 'futures trading', 'margins', 'derivatives'] },
    
    // Astro Finance
    { id: 'astro-finance', title: 'Astro Finance', description: 'Astrology-based financial guidance and tools', type: 'page', url: '/astro-finance', category: 'Astro Finance', icon: <Star className="w-5 h-5" />, tags: ['astro finance', 'astrology', 'financial horoscope', 'lucky numbers'] },
    { id: 'financial-horoscope', title: 'Financial Horoscope', description: 'Get your financial horoscope and predictions', type: 'tool', url: '/astro-finance/financial-horoscope', category: 'Astro Finance', icon: <Star className="w-5 h-5" />, tags: ['financial horoscope', 'astrology', 'financial predictions', 'horoscope'] },
    { id: 'lucky-numbers-calculator', title: 'Lucky Numbers Calculator', description: 'Calculate your lucky numbers for investments', type: 'tool', url: '/astro-finance/lucky-numbers-calculator', category: 'Astro Finance', icon: <Calculator className="w-5 h-5" />, tags: ['lucky numbers', 'astrology', 'numerology', 'investment luck'] },
    { id: 'auspicious-dates-finder', title: 'Auspicious Dates Finder', description: 'Find auspicious dates for financial decisions', type: 'tool', url: '/astro-finance/auspicious-dates-finder', category: 'Astro Finance', icon: <Calendar className="w-5 h-5" />, tags: ['auspicious dates', 'financial decisions', 'astrology', 'good dates'] },
    
    // Tools Hub
    { id: 'tools', title: 'Tools Hub', description: 'Complete collection of business and finance tools', type: 'page', url: '/tools', category: 'Tools Hub', icon: <Calculator className="w-5 h-5" />, tags: ['tools hub', 'business tools', 'productivity tools', 'all tools'] },
    { id: 'business-tools', title: 'Business Tools', description: 'Comprehensive business management and productivity tools', type: 'page', url: '/business-tools', category: 'Tools Hub', icon: <Briefcase className="w-5 h-5" />, tags: ['business tools', 'productivity', 'business management', 'tools'] },
    { id: 'productivity-tools', title: 'Productivity Tools', description: 'Tools to boost your business productivity', type: 'page', url: '/productivity-tools', category: 'Tools Hub', icon: <TrendingUp className="w-5 h-5" />, tags: ['productivity tools', 'business efficiency', 'productivity', 'tools'] },
    
    // Invoicing Tools
    { id: 'invoicing-tools', title: 'Invoicing Tools', description: 'Invoice generation and receivables management', type: 'page', url: '/invoicing-tools', category: 'Invoicing Tools', icon: <FileText className="w-5 h-5" />, tags: ['invoicing', 'invoice generator', 'receivables', 'business tools'] },
    { id: 'invoice-generator', title: 'Invoice Generator', description: 'Generate professional invoices for your business', type: 'tool', url: '/invoicing-tools/invoice-generator', category: 'Invoicing Tools', icon: <FileText className="w-5 h-5" />, tags: ['invoice generator', 'invoice creation', 'business invoicing', 'invoice maker'] },
    { id: 'receivables-tracker', title: 'Receivables Tracker', description: 'Track and manage your accounts receivables', type: 'tool', url: '/invoicing-tools/receivables-tracker', category: 'Invoicing Tools', icon: <TrendingUp className="w-5 h-5" />, tags: ['receivables tracker', 'accounts receivable', 'payment tracking', 'business finance'] },
    { id: 'payment-reminder', title: 'Payment Reminder Tool', description: 'Send automated payment reminders to clients', type: 'tool', url: '/invoicing-tools/payment-reminder', category: 'Invoicing Tools', icon: <Calendar className="w-5 h-5" />, tags: ['payment reminder', 'invoice reminder', 'payment follow up', 'business tools'] },
    
    // Pages
    { id: 'finance-categories', title: 'Finance Categories', description: 'Explore all finance categories and tools', type: 'page', url: '/finance-categories', category: 'Navigation', icon: <Building className="w-5 h-5" />, tags: ['categories', 'finance', 'tools', 'navigation'] },
    { id: 'analytics', title: 'Analytics Dashboard', description: 'Comprehensive platform analytics and performance metrics', type: 'page', url: '/analytics', category: 'Analytics', icon: <TrendingUp className="w-5 h-5" />, tags: ['analytics', 'dashboard', 'metrics', 'performance'] },
    { id: 'community', title: 'Community Hub', description: 'Join our finance community and discussions', type: 'page', url: '/community', category: 'Community', icon: <Users className="w-5 h-5" />, tags: ['community', 'discussions', 'forum', 'interaction'] },
    { id: 'comprehensive-finance-hub', title: 'Comprehensive Finance Hub', description: 'Complete finance platform with all tools and resources', type: 'page', url: '/comprehensive-finance-hub', category: 'Main Platform', icon: <Globe className="w-5 h-5" />, tags: ['finance hub', 'complete platform', 'all tools', 'resources'] },
    { id: 'market-analysis', title: 'Market Analysis', description: 'Real-time market analysis and financial news', type: 'page', url: '/market-analysis', category: 'Market Analysis', icon: <Newspaper className="w-5 h-5" />, tags: ['market analysis', 'financial news', 'market trends', 'analysis'] },
    { id: 'top-10', title: 'Top 10 Lists', description: 'Top 10 financial tools, tips, and recommendations', type: 'page', url: '/top-10', category: 'Top Lists', icon: <Star className="w-5 h-5" />, tags: ['top 10', 'recommendations', 'best tools', 'financial tips'] },
    { id: 'help-center', title: 'Help Center', description: 'Get help and support for using our tools', type: 'page', url: '/help-center', category: 'Support', icon: <Users className="w-5 h-5" />, tags: ['help', 'support', 'faq', 'assistance'] }
  ];

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    const query = searchQuery.toLowerCase();
    const filteredResults = searchData.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    );

    // Sort by relevance (exact matches first, then partial matches)
    const sortedResults = filteredResults.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(query);
      const bTitleMatch = b.title.toLowerCase().includes(query);
      
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      
      return 0;
    });

    setResults(sortedResults.slice(0, 10)); // Limit to 10 results
    setIsLoading(false);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      setResults([]);
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tool': return 'bg-blue-100 text-blue-800';
      case 'article': return 'bg-green-100 text-green-800';
      case 'category': return 'bg-purple-100 text-purple-800';
      case 'page': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Enhanced Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="🔍 Search... GST, SIP, EMI, Eclipse, Marriage, Tools..."
          className="w-full pl-12 pr-12 py-4 text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none bg-white shadow-lg"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 z-10"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Enhanced Search Results Dropdown */}
      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-4 rounded-3xl shadow-2xl border-2 max-h-[75vh] overflow-hidden z-50 bg-white/98 border-gray-300 backdrop-blur-xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="font-bold text-gray-900">
                {results.length > 0 && (
                  <>✨ {results.length} Results from Entire Codebase</>
                )}
                {results.length === 0 && query && (
                  <>🔍 No results found</>
                )}
                {results.length === 0 && !query && (
                  <>💡 Search 250+ tools, calculators, and guides</>
                )}
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                  setResults([]);
                }}
                className="p-1.5 rounded-lg hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Container */}
          <div className="overflow-y-auto max-h-[60vh]">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Searching entire codebase...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="p-3">
                <div className="space-y-1.5">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      to={result.url}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                        setResults([]);
                      }}
                      className="flex items-center gap-4 p-4 hover:bg-blue-50 rounded-xl transition-all hover:scale-[1.01] border border-transparent hover:border-blue-200 group"
                    >
                      <div className="flex-shrink-0 text-gray-600 group-hover:scale-110 transition-transform text-3xl">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-gray-900 truncate group-hover:text-blue-600">
                            {result.title}
                          </h3>
                          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getTypeColor(result.type)}`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-1.5">
                          {result.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {result.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {result.url}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : query ? (
              <div className="p-10 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-700 font-medium text-lg">No results found for "{query}"</p>
                <p className="text-sm text-gray-500 mt-2">
                  Try different keywords like: SIP, GST, EMI, Tax, Calculator
                </p>
              </div>
            ) : (
              <div className="p-10 text-center">
                <Zap className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium text-lg">Search 250+ Tools & Guides</p>
                <p className="text-sm text-gray-500 mt-2">
                  Calculators • Tax Tools • GST • Festival Tools • Learning • Blog
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>
                💡 Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-[10px] font-mono">Esc</kbd> to close
              </span>
              {results.length > 0 && (
                <span className="font-medium">{results.length} result{results.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
