import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calculator, Search, ChevronRight, FileText, Shield, PhoneCall, TrendingUp, Clock, Globe } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { SearchBar } from './SearchBar';
import { calculatorCategories } from '../data/calculatorData';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const justOpenedMenu = useRef(false);

  // Breaking news ticker content
  const breakingNews = [
    "RBI keeps repo rate unchanged at 6.5% for the 8th consecutive time",
    "Sensex hits new all-time high of 75,000 points",
    "New tax benefits announced for home loan borrowers",
    "Mutual fund SIP investments reach record high in March 2025"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only close mobile menu on actual route change, not on every location change
  useEffect(() => {
    if (justOpenedMenu.current) {
      justOpenedMenu.current = false;
      return;
    }
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  
  const handleCalculatorClick = (calculatorId: string) => {
    navigate(`/calculators/${calculatorId}`);
    setCategoriesOpen(false);
  };

  // Fix: When opening the mobile menu, set a flag to prevent immediate closing
  const handleOpenMobileMenu = () => {
    justOpenedMenu.current = true;
    setMobileMenuOpen(true);
  };

  return (
    <>
      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-red-700 px-3 py-1 rounded-full">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">BREAKING</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                {breakingNews.map((news, index) => (
                  <span key={index} className="inline-block mr-8 text-sm">
                    {news}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-[999] pointer-events-auto transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-3 md:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>India</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="mb-4">
              <SearchBar onClose={() => setSearchOpen(false)} />
            </div>
          )}

          {/* Main Navigation */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 min-w-0 flex-shrink-0">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-neutral-900">MoneyCal</span>
                <div className="text-xs text-gray-500">India's Financial Portal</div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-primary-600">
                Home
              </Link>
              <div className="relative" ref={categoriesRef}>
                <button 
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-primary-600"
                >
                  Calculators
                  <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {categoriesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="grid grid-cols-1 gap-1">
                      {calculatorCategories.map((category) => (
                        <div key={category.id} className="px-4 py-2">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">{category.name}</h3>
                          <div className="space-y-1">
                            {category.calculators.slice(0, 3).map((calculator) => (
                              <button
                                key={calculator.id}
                                onClick={() => handleCalculatorClick(calculator.id)}
                                className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                              >
                                {calculator.name}
                              </button>
                            ))}
                            {category.calculators.length > 3 && (
                              <Link
                                to={`/category/${category.id}`}
                                className="block text-sm text-primary-600 hover:text-primary-700 px-2 py-1 rounded transition-colors"
                              >
                                View all {category.calculators.length} calculators →
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/blog" className="text-neutral-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-primary-600">
                News & Analysis
              </Link>
              <Link to="/government-schemes" className="text-neutral-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-primary-600">
                Govt Schemes
              </Link>
              <Link to="/tools" className="text-neutral-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-primary-600">
                Tools
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={handleOpenMobileMenu}
              className="lg:hidden text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}
      </header>

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
};
