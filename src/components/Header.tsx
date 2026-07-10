import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  IndianRupee,
  X,
  ChevronDown,
  Home,
  BookOpen,
  Calculator,
  Wrench,
  TrendingUp,
  Gamepad2,
  Newspaper,
  GraduationCap,
  Building2,
  Coins,
  BarChart3,
  CreditCard,
  Landmark,
  PiggyBank,
  Shield,
  Car,
  Briefcase,
  Heart,
  Brain,
  Banknote,
  FileText,
  DollarSign,
  Building
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobileSection(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(name);
  };
  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setIsDropdownOpen(null), 150);
  };

  const { t } = useTranslation();

  // ── Desktop Navigation Items ──
  const mainNavItems = [
    {
      name: t('nav.calculators', 'Calculators'), href: '/calculators', color: 'text-blue-600', hoverBg: 'hover:bg-blue-50', submenu: [
        { name: 'EMI Calculator', href: '/calculators/emi-calculator' },
        { name: 'SIP Calculator', href: '/calculators/sip-calculator' },
        { name: 'Income Tax', href: '/calculators/income-tax-calculator' },
        { name: 'PPF Calculator', href: '/calculators/ppf-calculator' },
        { name: 'FD Calculator', href: '/calculators/fd-calculator' },
        { name: 'All Calculators →', href: '/calculators' }
      ]
    },
    {
      name: t('nav.tools', 'Tools'), href: '/tools', color: 'text-indigo-600', hoverBg: 'hover:bg-indigo-50', submenu: [
        { name: 'Finance Tools', href: '/finance-tools' },
        { name: 'Tax Tools', href: '/tax-tools' },
        { name: 'GST Tools', href: '/gst-tools' },
        { name: 'Loan Tools', href: '/loan-tools' },
        { name: 'Insurance Tools', href: '/insurance-tools' },
        { name: 'All Tools →', href: '/tools' }
      ]
    },
    { name: t('nav.ipo', 'IPO'), href: '/ipo', color: 'text-rose-600', hoverBg: 'hover:bg-rose-50' },
    {
      name: 'Market Rates', href: '/gold-rate', color: 'text-amber-600', hoverBg: 'hover:bg-amber-50', submenu: [
        { name: 'Gold Rate Today', href: '/gold-rate' },
        { name: 'Silver Rate Today', href: '/silver-rate' }
      ]
    },
    {
      name: t('nav.learn', 'Learn'), href: '/learn', color: 'text-violet-600', hoverBg: 'hover:bg-violet-50', submenu: [
        { name: 'Personal Loans', href: '/learn/personal-loans' },
        { name: 'Home Loans', href: '/learn/home-loans' },
        { name: 'Credit Score', href: '/learn/credit-score' },
        { name: 'Credit Cards', href: '/learn/credit-cards' },
        { name: 'Education Loans', href: '/learn/education-loans' },
        { name: 'Investing & Wealth', href: '/learn/investing-wealth' },
        { name: 'Savings Bank', href: '/learn/savings-bank-products' },
        { name: 'Insurance', href: '/learn/insurance-retirement' },
        { name: 'Taxation', href: '/learn/taxation-compliance' },
        { name: 'Gold Loans', href: '/learn/gold-loans' },
        { name: 'Vehicle Loans', href: '/learn/vehicle-loans' },
        { name: 'Business Loans', href: '/learn/business-loans' },
        { name: 'Money Management', href: '/learn/money-management' },
        { name: 'Advanced Finance', href: '/learn/advanced-specialised-finance' },
        { name: 'Behavioural Finance', href: '/learn/behavioural-finance-money-psychology' },
        { name: 'FinTech', href: '/learn/fintech-digital-payments' },
        { name: 'Business & Startup', href: '/learn/business-finance-entrepreneurship' },
        { name: 'All Learn Topics →', href: '/learn' }
      ]
    },
    { name: t('nav.blog', 'Blog'), href: '/blog', color: 'text-blue-500', hoverBg: 'hover:bg-blue-50' },
    { name: t('nav.news', 'News'), href: '/news', color: 'text-emerald-600', hoverBg: 'hover:bg-emerald-50' },
    { name: 'Discover', href: '/discover', color: 'text-pink-600', hoverBg: 'hover:bg-pink-50' },
    { name: 'Games', href: '/games', color: 'text-purple-600', hoverBg: 'hover:bg-purple-50' },
    { name: t('nav.schemes', 'Schemes'), href: '/government-schemes', color: 'text-sky-600', hoverBg: 'hover:bg-sky-50' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const toggleMobileSection = (id: string) => {
    setExpandedMobileSection(expandedMobileSection === id ? null : id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
        : 'bg-white border-b border-gray-50'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0" aria-label="MoneyCal.in Home">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                MoneyCal
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-2 flex-shrink-0">
            {mainNavItems.map((item) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const itemColor = (item as any).color;
              const itemHoverBg = (item as any).hoverBg;

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasSubmenu && handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={item.href}
                    className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-all duration-150 whitespace-nowrap ${isActive(item.href)
                      ? `${itemColor} bg-blue-50/50`
                      : `text-gray-700 hover:${itemColor} ${itemHoverBg}`
                      }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {hasSubmenu && <ChevronDown className="w-4 h-4 opacity-50" />}
                    </span>
                  </Link>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {hasSubmenu && isDropdownOpen === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 
                          ${item.name === 'Learn' ? 'w-[420px] grid grid-cols-2 gap-0' 
                          : (item.name === 'Calculators' || item.name === 'Tools') ? 'w-[380px] grid grid-cols-2 gap-0'
                          : 'w-56'}`}
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={() => setIsDropdownOpen(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Desktop Search */}
          {location.pathname !== '/' && (
            <div className="hidden lg:flex flex-1 justify-center px-6">
              <div className="w-full max-w-xl">
                <SearchBar variant="compact" dropdownMode="overlay" />
              </div>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <LanguageSwitcher className="hidden sm:flex" />

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors lg:hidden"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => { 
                const next = !isMobileMenuOpen;
                setIsMobileMenuOpen(next); 
                if (!next) setExpandedMobileSection(null); 
              }}
              onTouchEnd={(e) => { 
                e.preventDefault(); 
                const next = !isMobileMenuOpen;
                setIsMobileMenuOpen(next); 
                if (!next) setExpandedMobileSection(null); 
              }}
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="max-w-5xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Search MoneyCal</p>
                  <p className="text-xs text-gray-500">Tools, calculators, news, blog, and more.</p>
                </div>
                <button onClick={() => setIsSearchOpen(false)} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close search">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════ */}
      {/* PREMIUM MOBILE NAVIGATION                      */}
      {/* ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden"
              style={{ touchAction: 'manipulation' }}
              onClick={() => { setIsMobileMenuOpen(false); setExpandedMobileSection(null); }}
              onTouchEnd={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setExpandedMobileSection(null); }}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-full max-w-[340px] bg-white z-50 xl:hidden shadow-2xl flex flex-col"
            >
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="p-4 space-y-1">

                  {/* Close Button inside panel */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-900">Menu</span>
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); setExpandedMobileSection(null); }}
                      onTouchEnd={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setExpandedMobileSection(null); }}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  
                  <div className="mb-4 px-2">
                    <LanguageSwitcher className="w-full justify-center py-2" />
                  </div>

                  {/* Home Link */}
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${location.pathname === '/' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                      <Home className="w-4 h-4" />
                    </div>
                    Home
                  </Link>

                  {/* Games Link */}
                  <Link
                    to="/games"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname.startsWith('/games') ? 'bg-purple-50 text-purple-600' : 'text-gray-800 hover:bg-gray-50'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${location.pathname.startsWith('/games') ? 'bg-purple-100' : 'bg-gray-100'
                      }`}>
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    Games <span className="ml-auto text-xs font-bold px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">New</span>
                  </Link>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 my-2" />

                  {/* ── CALCULATORS (Expandable) ── */}
                  <div>
                    <button
                      onClick={() => toggleMobileSection('calculators')}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/calculators') ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/calculators') ? 'bg-blue-100' : 'bg-orange-50'
                          }`}>
                          <Calculator className={`w-4 h-4 ${isActive('/calculators') ? 'text-blue-600' : 'text-orange-600'}`} />
                        </div>
                        Calculators
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedMobileSection === 'calculators' ? 'rotate-180' : ''
                        }`} />
                    </button>
                    <AnimatePresence>
                      {expandedMobileSection === 'calculators' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-5 pr-2 py-2 space-y-0.5">
                            {[
                              { name: 'EMI Calculator', href: '/calculators/emi-calculator' },
                              { name: 'SIP Calculator', href: '/calculators/sip-calculator' },
                              { name: 'Income Tax', href: '/calculators/income-tax-calculator' },
                              { name: 'PPF Calculator', href: '/calculators/ppf-calculator' },
                              { name: 'FD Calculator', href: '/calculators/fd-calculator' },
                              { name: 'Home Loan', href: '/calculators/home-loan-calculator' },
                            ].map(item => (
                              <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === item.href ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                  }`}
                              >
                                {item.name}
                              </Link>
                            ))}
                            <Link
                              to="/calculators"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              All Calculators →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── TOOLS (Expandable) ── */}
                  <div>
                    <button
                      onClick={() => toggleMobileSection('tools')}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/tools') || isActive('/finance-tools') || isActive('/tax-tools') || isActive('/gst-tools')
                        ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-50">
                          <Wrench className="w-4 h-4 text-purple-600" />
                        </div>
                        Tools
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedMobileSection === 'tools' ? 'rotate-180' : ''
                        }`} />
                    </button>
                    <AnimatePresence>
                      {expandedMobileSection === 'tools' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-5 pr-2 py-2 space-y-0.5">
                            {[
                              { name: 'Finance Tools', href: '/finance-tools' },
                              { name: 'Tax Tools', href: '/tax-tools' },
                              { name: 'GST Tools', href: '/gst-tools' },
                              { name: 'Loan Tools', href: '/loan-tools' },
                              { name: 'Insurance Tools', href: '/insurance-tools' },
                              { name: 'Bank Tools', href: '/bank-tools' },
                              { name: 'Excel Tools', href: '/excel-tools' },
                            ].map(item => (
                              <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${isActive(item.href) ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                  }`}
                              >
                                {item.name}
                              </Link>
                            ))}
                            <Link
                              to="/tools"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              All 200+ Tools →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 my-2" />

                  {/* ── EXPLORE SECTION (Direct Links) ── */}
                  <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explore</p>

                  {[
                    { name: 'IPO Dashboard', href: '/ipo', icon: TrendingUp, color: 'bg-green-50 text-green-600', badge: 'Live' },
                    { name: 'Gold Rate Today', href: '/gold-rate', icon: Coins, color: 'bg-yellow-50 text-yellow-600' },
                    { name: 'Silver Rate Today', href: '/silver-rate', icon: Coins, color: 'bg-gray-100 text-gray-600' },
                    { name: 'Stock Market', href: '/stock-market', icon: BarChart3, color: 'bg-indigo-50 text-indigo-600' },
                    { name: 'Crypto Market', href: '/crypto', icon: DollarSign, color: 'bg-amber-50 text-amber-600' },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50'
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color.split(' ')[0]}`}>
                          <Icon className={`w-4 h-4 ${item.color.split(' ')[1]}`} />
                        </div>
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full animate-pulse">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}

                  {/* Divider */}
                  <div className="h-px bg-gray-100 my-2" />

                  {/* ── LEARN (Expandable) ── */}
                  <div>
                    <button
                      onClick={() => toggleMobileSection('learn')}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all ${isActive('/learn') ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive('/learn') ? 'bg-blue-100' : 'bg-violet-50'
                          }`}>
                          <GraduationCap className={`w-4 h-4 ${isActive('/learn') ? 'text-blue-600' : 'text-violet-600'}`} />
                        </div>
                        Learn
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">18 topics</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedMobileSection === 'learn' ? 'rotate-180' : ''
                          }`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedMobileSection === 'learn' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 pr-2 py-2 grid grid-cols-2 gap-1">
                            {[
                              { name: 'Personal Loans', href: '/learn/personal-loans', icon: Banknote },
                              { name: 'Home Loans', href: '/learn/home-loans', icon: Building },
                              { name: 'Credit Score', href: '/learn/credit-score', icon: CreditCard },
                              { name: 'Credit Cards', href: '/learn/credit-cards', icon: CreditCard },
                              { name: 'Education Loans', href: '/learn/education-loans', icon: GraduationCap },
                              { name: 'Investing', href: '/learn/investing', icon: TrendingUp },
                              { name: 'Savings Bank', href: '/learn/savings-bank', icon: PiggyBank },
                              { name: 'Insurance', href: '/learn/insurance', icon: Shield },
                              { name: 'Taxation', href: '/learn/taxation', icon: FileText },
                              { name: 'Gold Loans', href: '/learn/gold-loans', icon: Coins },
                              { name: 'Vehicle Loans', href: '/learn/vehicle-loans', icon: Car },
                              { name: 'Business Loans', href: '/learn/business-loans', icon: Briefcase },
                              { name: 'Money Mgmt', href: '/learn/money-management', icon: IndianRupee },
                              { name: 'Advanced', href: '/learn/advanced', icon: Brain },
                              { name: 'Behavioural', href: '/learn/behavioural', icon: Heart },
                              { name: 'FinTech', href: '/learn/fintech', icon: Landmark },
                              { name: 'Business', href: '/learn/business', icon: Building2 },
                            ].map(item => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-colors ${isActive(item.href) ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="truncate">{item.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="px-3 pb-2">
                            <Link
                              to="/learn"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-3 py-2 rounded-lg text-sm font-semibold text-violet-600 hover:bg-violet-50 transition-colors text-center"
                            >
                              All Learn Topics →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 my-2" />

                  {/* ── CONTENT SECTION ── */}
                  <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Content</p>

                  {[
                    { name: 'Blog', href: '/blog', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
                    { name: 'News', href: '/news', icon: Newspaper, color: 'bg-emerald-50 text-emerald-600' },
                    { name: 'Discover', href: '/discover', icon: Newspaper, color: 'bg-pink-50 text-pink-600' },
                    { name: 'Government Schemes', href: '/government-schemes', icon: Building2, color: 'bg-sky-50 text-sky-600' },
                    { name: 'Financial Education', href: '/financial-education', icon: GraduationCap, color: 'bg-indigo-50 text-indigo-600' },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:bg-gray-50'
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color.split(' ')[0]}`}>
                          <Icon className={`w-4 h-4 ${item.color.split(' ')[1]}`} />
                        </div>
                        {item.name}
                      </Link>
                    );
                  })}

                </div>
              </div>

              {/* Fixed Bottom Bar */}
              <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50/80 p-3">
                <Link
                  to="/about-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  About MoneyCal.in · Privacy · Terms
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
