import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calculator, FileText, TrendingUp, Home, CreditCard, Shield, PiggyBank, Building, GraduationCap, Users } from 'lucide-react';
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

    // Tax Tools
    { id: 'income-tax-calculator', title: 'Income Tax Calculator', description: 'Calculate your income tax liability for the year', type: 'tool', url: '/tools/income-tax-calculator', category: 'Tax', icon: <Calculator className="w-5 h-5" />, tags: ['income tax', 'calculation', 'liability', 'deductions'] },
    { id: 'gst-calculator', title: 'GST Calculator', description: 'Calculate GST on goods and services', type: 'tool', url: '/tools/gst-calculator', category: 'Tax', icon: <Calculator className="w-5 h-5" />, tags: ['gst', 'tax', 'calculation', 'goods services'] },
    { id: 'tds-calculator', title: 'TDS Calculator', description: 'Calculate Tax Deducted at Source', type: 'tool', url: '/tools/tds-calculator', category: 'Tax', icon: <Calculator className="w-5 h-5" />, tags: ['tds', 'tax deduction', 'source', 'calculation'] },
    { id: 'tax-saving-investments', title: 'Tax Saving Investments', description: 'Find the best tax saving investment options under Section 80C', type: 'tool', url: '/tools/tax-saving-investments', category: 'Tax', icon: <Shield className="w-5 h-5" />, tags: ['tax saving', '80c', 'investments', 'deductions'] },

    // Insurance Tools
    { id: 'life-insurance-calculator', title: 'Life Insurance Calculator', description: 'Calculate how much life insurance coverage you need', type: 'tool', url: '/tools/life-insurance-calculator', category: 'Insurance', icon: <Shield className="w-5 h-5" />, tags: ['life insurance', 'coverage', 'premium', 'protection'] },
    { id: 'health-insurance-calculator', title: 'Health Insurance Calculator', description: 'Calculate health insurance premium and coverage', type: 'tool', url: '/tools/health-insurance-calculator', category: 'Insurance', icon: <Shield className="w-5 h-5" />, tags: ['health insurance', 'premium', 'coverage', 'medical'] },
    { id: 'motor-insurance-calculator', title: 'Motor Insurance Calculator', description: 'Calculate motor insurance premium for your vehicle', type: 'tool', url: '/tools/motor-insurance-calculator', category: 'Insurance', icon: <Building className="w-5 h-5" />, tags: ['motor insurance', 'vehicle', 'premium', 'coverage'] },

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

    // Pages
    { id: 'finance-categories', title: 'Finance Categories', description: 'Explore all finance categories and tools', type: 'page', url: '/finance-categories', category: 'Navigation', icon: <Building className="w-5 h-5" />, tags: ['categories', 'finance', 'tools', 'navigation'] },
    { id: 'analytics', title: 'Analytics Dashboard', description: 'Comprehensive platform analytics and performance metrics', type: 'page', url: '/analytics', category: 'Analytics', icon: <TrendingUp className="w-5 h-5" />, tags: ['analytics', 'dashboard', 'metrics', 'performance'] },
    { id: 'community', title: 'Community Hub', description: 'Join our finance community and discussions', type: 'page', url: '/community', category: 'Community', icon: <Users className="w-5 h-5" />, tags: ['community', 'discussions', 'forum', 'interaction'] }
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
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
      >
        <Search className="w-5 h-5 text-gray-500" />
        <span className="text-gray-500 hidden sm:block">Search tools, articles, guides...</span>
        <span className="text-gray-500 sm:hidden">Search</span>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            {/* Search Header */}
            <div className="flex items-center p-4 border-b border-gray-200">
              <Search className="w-5 h-5 text-gray-500 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder="Search for tools, articles, guides, categories..."
                className="flex-1 text-lg border-none outline-none placeholder-gray-500"
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                  setResults([]);
                }}
                className="ml-3 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Searching...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      to={result.url}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                        setResults([]);
                      }}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 mr-3 text-gray-600">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {result.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {result.category}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query ? (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No results found for "{query}"</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Try searching for tools, articles, or categories
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Start typing to search</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Search for tools, articles, guides, and categories
                  </p>
                </div>
              )}
            </div>

            {/* Search Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd> to close</span>
                </div>
                <div>
                  {results.length > 0 && (
                    <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
