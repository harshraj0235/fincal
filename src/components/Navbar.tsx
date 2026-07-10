import { useState, useEffect } from "react";
import MoneyModal from "./MoneyModal";
import { Link } from "react-router-dom";
import {
  Newspaper,
  Menu,
  X,
  ChevronDown,
  Banknote,
  TrendingUp,
  Shield,
  BookOpen,
  Coins,
  Building2,
  CreditCard,
  Wallet,
  Percent,
  Target,
  Zap,
  Sparkles,
  BarChart,
  FileText, IndianRupee
} from "lucide-react";
import { fetchLiveRates, CityRates } from "../services/marketApi";

const Navbar = () => {
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [marketRates, setMarketRates] = useState<CityRates | null>(null);

  // Handle scroll effect for glass morphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch live market data for the ticker
    const getRates = async () => {
      try {
        const rates = await fetchLiveRates('mumbai');
        setMarketRates(rates);
      } catch (err) {
        console.error("Failed to fetch rates for navbar", err);
      }
    };
    getRates();

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



  return (
    <>
      {/* Glass morphism backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50'
        : 'bg-white shadow-sm border-b border-gray-100'
        }`}>
        {/* Market Ticker - Inspired by GoodReturns */}
        <div className="bg-gray-900 overflow-hidden py-1.5 border-b border-gray-800">
          <div className="pulse-track">
            <div className="pulse-item">
              <span className="pulse-dot"></span>
              NIFTY 50: <span className="text-emerald-400">24,323.85 (+0.45%)</span>
            </div>
            <div className="pulse-item">
              <span className="pulse-dot"></span>
              SENSEX: <span className="text-emerald-400">80,120.55 (+0.38%)</span>
            </div>
            <div className="pulse-item">
              <span className="pulse-dot"></span>
              GOLD (24K/10g): <span className="text-emerald-400">₹{marketRates ? (marketRates.gold24k.price * 10).toLocaleString('en-IN') : '1,68,710'}</span>
            </div>
            <div className="pulse-item">
              <span className="pulse-dot"></span>
              SILVER (1kg): <span className="text-emerald-400">₹{marketRates ? marketRates.silver.price.toLocaleString('en-IN') : '2,95,000'}</span>
            </div>
            <div className="pulse-item">
              <span className="pulse-dot"></span>
              LATEST: <span className="text-blue-400">Income Tax Guide 2025 Live</span>
            </div>
            {/* Duplicate for seamless infinite loop */}
            <div className="pulse-item">
              <span className="pulse-dot"></span>
              NIFTY 50: <span className="text-emerald-400">24,323.85 (+0.45%)</span>
            </div>
            <div className="pulse-item">
              <span className="pulse-dot"></span>
              SENSEX: <span className="text-emerald-400">80,120.55 (+0.38%)</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="MoneyCal - Financial Calculator Home"
              >
                <IndianRupee className="w-6 h-6 mr-2" />
                MoneyCal
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/ipo" reloadDocument
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center relative overflow-hidden group"
                aria-label="IPO Central"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-100 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity rounded-md -z-10"></span>
                <Target className="w-4 h-4 mr-1 text-red-600 animate-pulse" />
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">IPO</span>
              </Link>
              <Link
                to="/blog" reloadDocument
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                aria-label="Read our financial blog"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Blog
              </Link>

              {/* Learn Dropdown */}
              <div className="relative group">
                <button
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                  aria-label="Financial education and guides"
                >
                  <BookOpen className="w-4 h-4 mr-1 text-blue-600" />
                  Learn
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                  <div className="p-3 grid grid-cols-1 gap-1">
                    <Link to="/learn/investing-wealth" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <TrendingUp className="w-4 h-4 mr-3 text-emerald-600" />
                      Investing Basics
                    </Link>
                    <Link to="/learn" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <Banknote className="w-4 h-4 mr-3 text-blue-600" />
                      Loan Guides
                    </Link>
                    <Link to="/learn/taxation-compliance" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <Percent className="w-4 h-4 mr-3 text-orange-600" />
                      Taxation & Savings
                    </Link>
                    <Link to="/learn/money-management" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <Wallet className="w-4 h-4 mr-3 text-purple-600" />
                      Money Management
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link to="/learn" className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold">
                      <BookOpen className="w-4 h-4 mr-3" />
                      All Learn Pages
                    </Link>
                  </div>
                </div>
              </div>

              {/* Market Rates Dropdown */}
              <div className="relative group">
                <button
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                  aria-label="Market rates and prices"
                >
                  <TrendingUp className="w-4 h-4 mr-1 text-emerald-600" />
                  Market Rates
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                  <div className="p-2">
                    <Link to="/gold-rate" className="flex items-center px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-lg transition-colors">
                      <div className="w-4 h-4 mr-3 bg-amber-400 rounded-full border border-amber-600/30 flex items-center justify-center">
                        <span className="text-[8px] font-black text-amber-900 leading-none">Au</span>
                      </div>
                      Gold Rate Today
                    </Link>
                    <Link to="/silver-rate" className="flex items-center px-3 py-2 text-gray-700 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="w-4 h-4 mr-3 bg-slate-300 rounded-full border border-slate-500/30 flex items-center justify-center">
                        <span className="text-[8px] font-black text-slate-800 leading-none">Ag</span>
                      </div>
                      Silver Rate Today
                    </Link>
                    <Link to="/crypto" className="flex items-center px-3 py-2 text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors">
                      <Coins className="w-4 h-4 mr-3 text-yellow-600" />
                      Crypto Rates
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link to="/news-reel" reloadDocument className="flex items-center px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg transition-colors">
                      <Newspaper className="w-4 h-4 mr-3 text-green-600" />
                      Live News Reel
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                to="/astro-finance"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                aria-label="Astro Finance - Vedic Astrology Financial Guidance"
              >
                <Sparkles className="w-4 h-4 mr-1 text-purple-600" />
                Astro Finance
              </Link>
              <Link
                to="/stock-market"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                aria-label="Stock Market Course - Learn Trading"
              >
                <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                Stock Market
              </Link>
              <Link
                to="/tools"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                aria-label="Tool Hub - All Tools"
              >
                <Zap className="w-4 h-4 mr-1 text-blue-600" />
                Tool Hub
              </Link>
              <Link
                to="/real-time-stock-portfolio-tracker"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                aria-label="Real-Time Stock Portfolio Tracker"
              >
                <BarChart className="w-4 h-4 mr-1 text-emerald-600" />
                Portfolio Tracker
              </Link>
              <Link
                to="/investing-tools"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                aria-label="Investing Tools Hub"
              >
                <TrendingUp className="w-4 h-4 mr-1 text-indigo-600" />
                Investing Tools
              </Link>
              <Link
                to="/invoicing-tools"
                className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium flex items-center"
                aria-label="Invoicing & Receivables Hub"
                style={{ marginLeft: '8px' }}
              >
                <FileText className="w-4 h-4 mr-1" />
                Invoicing Tools
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
              {/* New Categorized Mobile Navigation */}
              <div className="p-4 space-y-6">
                {/* Calculators Category */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Calculators</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <Link to="/calculators/emi-calculator" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-3 bg-slate-50 hover:bg-blue-50 rounded-2xl transition-all border border-slate-100 group">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                        <CreditCard className="w-5 h-5 text-blue-600 group-hover:text-white" />
                      </div>
                      <span className="font-bold text-slate-700">EMI Calculator</span>
                    </Link>
                    <Link to="/calculators/sip-calculator" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-3 bg-slate-50 hover:bg-emerald-50 rounded-2xl transition-all border border-slate-100 group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mr-3 group-hover:bg-emerald-600 transition-colors">
                        <TrendingUp className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                      </div>
                      <span className="font-bold text-slate-700">SIP Calculator</span>
                    </Link>
                    <Link to="/calculators/income-tax-calculator" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-3 bg-slate-50 hover:bg-orange-50 rounded-2xl transition-all border border-slate-100 group">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mr-3 group-hover:bg-orange-600 transition-colors">
                        <Percent className="w-5 h-5 text-orange-600 group-hover:text-white" />
                      </div>
                      <span className="font-bold text-slate-700">Income Tax</span>
                    </Link>
                    <Link to="/calculators" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                      <IndianRupee className="w-5 h-5 mr-3" />
                      <span className="font-bold">All Calculators</span>
                    </Link>
                  </div>
                </div>

                {/* Quick Access Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/tools" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-3xl border border-indigo-100 group">
                    <Zap className="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-black text-indigo-900 uppercase tracking-tighter">Tools</span>
                  </Link>
                  <Link to="/ipo" reloadDocument onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center justify-center p-4 bg-rose-50 rounded-3xl border border-rose-100 group">
                    <Target className="w-8 h-8 text-rose-600 mb-2 group-hover:scale-110 transition-transform animate-pulse" />
                    <span className="text-xs font-black text-rose-900 uppercase tracking-tighter">IPO</span>
                  </Link>
                </div>

                {/* Market Rates Accordion (Simplified as links) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Market Rates</h3>
                  <div className="flex flex-col gap-2">
                    <Link to="/gold-rate" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-xs font-black text-amber-900">Au</span>
                        </div>
                        <span className="font-bold text-amber-900">Gold Rate</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-amber-400 rotate-[-90deg]" />
                    </Link>
                    <Link to="/silver-rate" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-slate-300 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-xs font-black text-slate-900">Ag</span>
                        </div>
                        <span className="font-bold text-slate-900">Silver Rate</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 rotate-[-90deg]" />
                    </Link>
                  </div>
                </div>

                {/* Learn & Content Categories */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Discover</h3>
                  <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                    <Link to="/learn" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-4 hover:bg-slate-50 border-b border-slate-50 transition-colors">
                      <BookOpen className="w-5 h-5 text-blue-600 mr-4" />
                      <span className="font-bold text-slate-700 flex-1">Learn</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 rotate-[-90deg]" />
                    </Link>
                    <Link to="/blog" reloadDocument onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-4 hover:bg-slate-50 border-b border-slate-50 transition-colors">
                      <BookOpen className="w-5 h-5 text-purple-600 mr-4" />
                      <span className="font-bold text-slate-700 flex-1">Blog</span>
                    </Link>
                    <Link to="/news-reel" reloadDocument onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-4 hover:bg-slate-50 border-b border-slate-50 transition-colors">
                      <Newspaper className="w-5 h-5 text-emerald-600 mr-4" />
                      <span className="font-bold text-slate-700 flex-1">News</span>
                    </Link>
                    <Link to="/government-schemes" reloadDocument onClick={() => setIsMobileMenuOpen(false)} className="flex items-center p-4 hover:bg-slate-50 transition-colors">
                      <Shield className="w-5 h-5 text-orange-600 mr-4" />
                      <span className="font-bold text-slate-700 flex-1">Schemes</span>
                    </Link>
                  </div>
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
