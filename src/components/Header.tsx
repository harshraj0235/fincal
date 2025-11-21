import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Search, 
  Calculator, 
  X,
  ChevronDown,
  ChevronRight,
  Home,
  BookOpen,
  FileText,
  Shield,
  TrendingUp,
  DollarSign,
  Building
} from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const mainNavItems = [
    { name: 'Calculators', href: '/calculators', submenu: [
      { name: 'EMI Calculator', href: '/calculators/emi-calculator' },
      { name: 'SIP Calculator', href: '/calculators/sip-calculator' },
      { name: 'Income Tax', href: '/calculators/income-tax-calculator' },
      { name: 'All Calculators', href: '/calculators' }
    ]},
    { name: 'Tools', href: '/tools', submenu: [
      { name: 'Finance Tools', href: '/finance-tools' },
      { name: 'Tax Tools', href: '/tax-tools' },
      { name: 'GST Tools', href: '/gst-tools' },
      { name: 'Excel Tools', href: '/exceltool' }
    ]},
    { name: 'Learn', href: '/learn' },
    { name: 'Blog', href: '/blog' },
    { name: 'News', href: '/news' },
    { name: 'Schemes', href: '/government-schemes' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white shadow-sm border-b border-gray-100' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 flex-shrink-0"
            aria-label="MoneyCal.in Home"
          >
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-gray-900">
                MoneyCal.in
              </h1>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {mainNavItems.map((item) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasSubmenu && setIsDropdownOpen(item.name)}
                  onMouseLeave={() => setIsDropdownOpen(null)}
                >
                  <Link
                    to={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      <span>{item.name}</span>
                      {hasSubmenu && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {hasSubmenu && isDropdownOpen === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                    >
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          onClick={() => setIsDropdownOpen(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (onMenuClick) onMenuClick();
              }}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menu"
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
      
      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t border-gray-100"
          >
            <div className="max-w-3xl mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search calculators, tools, articles..."
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu - Comprehensive Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
            >
              <div className="p-4">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">All Calculators & Tools</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Quick Links */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Quick Links
                  </h3>
                  <div className="space-y-1">
                    {[
                      { name: 'Home', href: '/', icon: Home },
                      { name: 'All Calculators', href: '/calculators', icon: Calculator },
                      { name: 'Tools', href: '/tools', icon: Building },
                      { name: 'Learn', href: '/learn', icon: BookOpen },
                      { name: 'Blog', href: '/blog', icon: FileText },
                      { name: 'News', href: '/news', icon: FileText },
                      { name: 'Schemes', href: '/government-schemes', icon: Shield }
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            active
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Popular Calculators */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Popular Calculators
                  </h3>
                  <div className="space-y-1">
                    {[
                      { name: 'EMI Calculator', href: '/calculators/emi-calculator', icon: Calculator },
                      { name: 'SIP Calculator', href: '/calculators/sip-calculator', icon: TrendingUp },
                      { name: 'Income Tax Calculator', href: '/calculators/income-tax-calculator', icon: DollarSign },
                      { name: 'GST Calculator', href: '/calculators/gst-calculator', icon: FileText },
                      { name: 'PPF Calculator', href: '/calculators/ppf-calculator', icon: TrendingUp },
                      { name: 'Home Loan Calculator', href: '/calculators/home-loan-calculator', icon: Building }
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            active
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* All Calculator Categories */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    All Calculator Categories
                  </h3>
                  <div className="space-y-1">
                    {calculatorCategories.map((category) => (
                      <div key={category.id}>
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <span>{category.name}</span>
                            <span className="text-xs text-gray-400">({category.calculators.length})</span>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              expandedCategory === category.id ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedCategory === category.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pr-3 py-2 space-y-1 bg-gray-50 rounded-lg mt-1">
                                {category.calculators.map((calc) => {
                                  const active = location.pathname === `/calculators/${calc.id}`;
                                  return (
                                    <Link
                                      key={calc.id}
                                      to={`/calculators/${calc.id}`}
                                      onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setExpandedCategory(null);
                                      }}
                                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                        active
                                          ? 'bg-blue-100 text-blue-700 font-medium'
                                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                      }`}
                                    >
                                      {calc.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools Section */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Tools & Utilities
                  </h3>
                  <div className="space-y-1">
                    {[
                      { name: 'GST Tools', href: '/gst-tools' },
                      { name: 'Tax Tools', href: '/tax-tools' },
                      { name: 'Finance Tools', href: '/finance-tools' },
                      { name: 'Excel Tools', href: '/exceltool' },
                      { name: 'Bank Tools', href: '/bank-tools' }
                    ].map((item) => {
                      const active = location.pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            active
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
