import React, { useState, useEffect } from "react";
import MoneyModal from "./MoneyModal";
import { Link } from "react-router-dom";
import { 
  Newspaper, 
  Menu, 
  X, 
  ChevronDown, 
  Calculator, 
  Banknote, 
  TrendingUp, 
  Shield, 
  Search,
  Home,
  BookOpen,
  Coins,
  Building2,
  CreditCard,
  PiggyBank,
  Wallet,
  Percent,
  Target,
  Zap,
  Sparkles,
  BarChart
} from "lucide-react";

const Navbar = () => {
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Handle scroll effect for glass morphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Enhanced search functionality like news search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Check if search query contains news-related keywords
    const newsKeywords = ['news', 'latest', 'update', 'market', 'stock', 'crypto', 'bitcoin', 'ethereum', 'finance news', 'economic'];
    const isNewsSearch = newsKeywords.some(keyword => 
      searchQuery.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (isNewsSearch) {
      // Redirect to news page with search query
      window.location.href = `/news?search=${encodeURIComponent(searchQuery)}`;
      return;
    }
    
    setIsSearchLoading(true);
    setSearchResults([]);
    
    try {
      const API_KEY = "sk-eb4865dd01204224a1d97f3a30a2eb83";
      const API_URL = "https://api.deepseek.com/v1/chat/completions";
      
      const prompt = `Search for financial calculators, tools, and information: ${searchQuery} (Provide relevant calculators, tools, and financial information from MoneyCal platform)`;
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { 
              role: "system", 
              content: "You are a financial assistant that helps users find relevant calculators, tools, and financial information from the MoneyCal platform. Provide concise, helpful responses with specific calculator names and categories." 
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });
      
      if (!response.ok) throw new Error("API Error");
      
      const data = await response.json();
      const content: string = data.choices?.[0]?.message?.content || "";
      
      // Parse the response to extract bullet points or lines
      const results = content
        .split(/\n|•|\d+\./)
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      setSearchResults(results);
    } catch {
      setSearchResults(["Search functionality temporarily unavailable. Please try again later."]);
    } finally {
      setIsSearchLoading(false);
    }
  };

  // Calculator categories for mobile menu
  const calculatorCategories = [
    {
      title: "Financial Calculators",
      icon: <Calculator className="w-5 h-5" />,
      items: [
        { name: "EMI Calculator", path: "/calculators/emi-calculator", icon: <CreditCard className="w-4 h-4" /> },
        { name: "SIP Calculator", path: "/calculators/sip-calculator", icon: <TrendingUp className="w-4 h-4" /> },
        { name: "FD Calculator", path: "/calculators/fd-calculator", icon: <PiggyBank className="w-4 h-4" /> },
        { name: "RD Calculator", path: "/calculators/rd-calculator", icon: <Wallet className="w-4 h-4" /> },
        { name: "PPF Calculator", path: "/calculators/ppf-calculator", icon: <Shield className="w-4 h-4" /> },
        { name: "NPS Calculator", path: "/calculators/nps-calculator", icon: <Target className="w-4 h-4" /> }
      ]
    },
    {
      title: "Banking Tools",
      icon: <Building2 className="w-5 h-5" />,
      items: [
        { name: "Bank Locker Finder", path: "/calculators/bank-locker-finder", icon: <Shield className="w-4 h-4" /> },
        { name: "Bank Charges Analyzer", path: "/calculators/bank-charges-analyzer", icon: <Percent className="w-4 h-4" /> },
        { name: "Cheque Bounce Charges", path: "/calculators/cheque-bounce-charges-calculator", icon: <Banknote className="w-4 h-4" /> },
        { name: "Missed Call Banking", path: "/missed-call-banking-directory", icon: <Zap className="w-4 h-4" /> }
      ]
    },
    {
      title: "Investment Tools",
      icon: <TrendingUp className="w-5 h-5" />,
      items: [
        { name: "Mutual Fund Calculator", path: "/calculators/mutual-fund-calculator", icon: <TrendingUp className="w-4 h-4" /> },
        { name: "Stock Calculator", path: "/calculators/stock-calculator", icon: <Target className="w-4 h-4" /> },
        { name: "Bond Calculator", path: "/calculators/bond-calculator", icon: <Percent className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <>
      {/* Glass morphism backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white shadow-sm border-b border-gray-100'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="MoneyCal - Financial Calculator Home"
              >
                <Calculator className="w-6 h-6 mr-2" />
              MoneyCal
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/blog" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                aria-label="Read our financial blog"
            >
                <BookOpen className="w-4 h-4 mr-1" />
              Blog
            </Link>
            <Link 
              to="/crypto" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                aria-label="Cryptocurrency tools and information"
            >
                <Coins className="w-4 h-4 mr-1" />
              Crypto
            </Link>
            <Link 
              to="/news-reel" 
              className="inline-flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                aria-label="Latest financial news"
            >
              <Newspaper className="w-4 h-4 mr-1" />
              News Reel
            </Link>
            <Link 
              to="/astro-finance" 
              className="text-white bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm font-medium flex items-center" 
              aria-label="Astro Finance - Vedic Astrology Financial Guidance"
              style={{ marginLeft: '8px' }}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Astro Finance
            </Link>
            <Link 
              to="/stock-market" 
              className="text-white bg-gradient-to-r from-green-600 to-blue-600 px-4 py-2 rounded-lg shadow-md hover:from-green-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium flex items-center" 
              aria-label="Stock Market Course - Learn Trading"
              style={{ marginLeft: '8px' }}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Stock Market
            </Link>
            <Link 
              to="/tools" 
              className="text-white bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium flex items-center" 
              aria-label="Tool Hub - All Tools"
              style={{ marginLeft: '8px' }}
            >
              <Zap className="w-4 h-4 mr-1" />
              Tool Hub
            </Link>
            <Link 
              to="/real-time-stock-portfolio-tracker" 
              className="text-white bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 rounded-lg shadow-md hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-sm font-medium flex items-center" 
              aria-label="Real-Time Stock Portfolio Tracker"
              style={{ marginLeft: '8px' }}
            >
              <BarChart className="w-4 h-4 mr-1" />
              Portfolio Tracker
            </Link>
            <Link 
              to="/investing-tools" 
              className="text-white bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm font-medium flex items-center" 
              aria-label="Investing Tools Hub"
              style={{ marginLeft: '8px' }}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Investing Tools
            </Link>
              
              {/* Bank Tools Dropdown */}
            <div className="relative group">
                <button 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                  aria-label="Banking tools and calculators"
                  aria-expanded="false"
                >
                  <Building2 className="w-4 h-4 mr-1" />
                  Bank Tools 
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
              </button>
                <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                  <div className="p-2">
                    <Link to="/calculators/bank-locker-finder" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                      <Shield className="w-4 h-4 mr-2" />
                      Bank Locker Finder
                    </Link>
                    <Link to="/calculators/bank-charges-analyzer" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                      <Percent className="w-4 h-4 mr-2" />
                      Bank Charges Analyzer
                    </Link>
                    <Link to="/missed-call-banking-directory" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                      <Zap className="w-4 h-4 mr-2" />
                      Missed Call Banking
                    </Link>
                    <Link to="/calculators/cheque-bounce-charges-calculator" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                      <Banknote className="w-4 h-4 mr-2" />
                      Cheque Bounce Charges
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link to="/bank-tools" className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold">
                      <Building2 className="w-4 h-4 mr-2" />
                      All Bank Tools
                    </Link>
                  </div>
                </div>
              </div>

            <button 
              onClick={() => setShowMoneyModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                aria-label="Open money management tools"
            >
                <Banknote className="w-4 h-4 inline mr-1" />
              Money
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-button p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Glass Morphism */}
        {isMobileMenuOpen && (
          <div className="mobile-menu fixed inset-0 top-16 z-50 md:hidden">
            <div className="h-full bg-white/95 backdrop-blur-md border-t border-gray-200/50 overflow-y-auto">
              {/* Enhanced Search Bar */}
              <div className="p-4 border-b border-gray-200/50">
                <form onSubmit={handleSearch} className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                      placeholder="Search calculators, tools, and financial info..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                      aria-label="Search financial calculators and tools"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
                    disabled={isSearchLoading || !searchQuery.trim()}
                  >
                    {isSearchLoading ? "Searching..." : "Search"}
                  </button>
                </form>
                
                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Search Results:</h4>
                    <ul className="space-y-1">
                      {searchResults.map((result, index) => (
                        <li key={index} className="text-sm text-blue-800">
                          • {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-b border-gray-200/50">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/calculators/emi-calculator"
                    className="flex items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">EMI Calculator</span>
                  </Link>
              <Link 
                    to="/calculators/sip-calculator"
                    className="flex items-center p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">SIP Calculator</span>
              </Link>
              <Link 
                    to="/calculators/fd-calculator"
                    className="flex items-center p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                    <PiggyBank className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">FD Calculator</span>
              </Link>
              <Link 
                    to="/calculators/ppf-calculator"
                    className="flex items-center p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                    <Shield className="w-5 h-5 text-orange-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">PPF Calculator</span>
              </Link>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="p-4 border-b border-gray-200/50">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Home className="w-4 h-4 mr-2 text-blue-600" />
                  Main Navigation
                </h3>
                <div className="space-y-2">
                  <Link 
                    to="/blog" 
                    className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BookOpen className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">Blog</span>
                  </Link>
                  <Link 
                    to="/crypto" 
                    className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Coins className="w-5 h-5 mr-3 text-yellow-600" />
                    <span className="font-medium">Crypto</span>
                  </Link>
                  <Link 
                    to="/news-reel" 
                    className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Newspaper className="w-5 h-5 mr-3 text-green-600" />
                    <span className="font-medium">News Reel</span>
                  </Link>
                  <Link 
                    to="/astro-finance" 
                    className="flex items-center p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Sparkles className="w-5 h-5 mr-3" />
                    <span className="font-medium">Astro Finance</span>
                  </Link>
                  <Link 
                    to="/stock-market" 
                    className="flex items-center p-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-colors font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <TrendingUp className="w-5 h-5 mr-3" />
                    <span className="font-medium">Stock Market</span>
                  </Link>
                  <Link 
                    to="/tools" 
                    className="flex items-center p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Zap className="w-5 h-5 mr-3" />
                    <span className="font-medium">Tool Hub</span>
                  </Link>
              <button 
                onClick={() => {
                  setShowMoneyModal(true);
                  setIsMobileMenuOpen(false);
                }}
                    className="w-full flex items-center p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                    <Banknote className="w-5 h-5 mr-3" />
                    <span className="font-medium">Money Tools</span>
              </button>
                </div>
              </div>

              {/* Calculator Categories */}
              <div className="p-4">
                <Link 
                  to="/calculators" 
                  className="text-sm font-semibold text-gray-900 mb-3 flex items-center hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calculator className="w-4 h-4 mr-2 text-blue-600" />
                  All Calculators
                </Link>
                <div className="space-y-4">
                  {calculatorCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.title}</span>
                      </h4>
                      <div className="space-y-1">
                        {category.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.path}
                            className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.icon}
                            <span className="ml-3 text-sm">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {showMoneyModal && (
        <MoneyModal onClose={() => setShowMoneyModal(false)} />
      )}
    </>
  );
};

export default Navbar;
