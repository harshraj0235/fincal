import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calculator, Search, ChevronRight, FileText, Shield, PhoneCall } from 'lucide-react';
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
    <header 
      className={`sticky top-0 z-[999] pointer-events-auto transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-3 md:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Improved for mobile */}
          <Link to="/" className="flex items-center space-x-2 min-w-0 flex-shrink-0">
            <Calculator className="h-7 w-7 md:h-8 md:w-8 text-primary-600 flex-shrink-0" />
            <span className="text-lg md:text-xl font-bold text-neutral-900 truncate">MoneyCal</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <div className="relative" ref={categoriesRef}>
              <button 
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center px-3 py-2 rounded-md text-sm font-medium"
              >
                Categories
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {categoriesOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-10 py-2">
                  {calculatorCategories.map(category => (
                    <div key={category.id} className="relative group">
                      <Link
                        to={`/#${category.id}`}
                        className="block px-4 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 group transition-colors"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{category.name}</span>
                          <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                        </div>
                      </Link>
                      <div className="absolute left-full top-0 ml-1 w-72 bg-white rounded-xl shadow-xl border border-gray-100 hidden group-hover:block">
                        <div className="py-2">
                          {category.calculators.slice(0, 8).map(calculator => (
                            <button
                              key={calculator.id}
                              onClick={() => handleCalculatorClick(calculator.id)}
                              className="block w-full text-left px-4 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
                            >
                              {calculator.name}
                            </button>
                          ))}
                          {category.calculators.length > 8 && (
                            <Link
                              to={`/#${category.id}`}
                              className="block px-4 py-3 text-primary-600 hover:bg-neutral-50 font-medium transition-colors"
                              onClick={() => setCategoriesOpen(false)}
                            >
                              View all {category.calculators.length} calculators
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link
                    to="/#categories"
                    className="block px-4 py-3 text-primary-600 hover:bg-neutral-50 font-medium border-t border-neutral-100 mt-1 transition-colors"
                    onClick={() => setCategoriesOpen(false)}
                  >
                    View all calculators
                  </Link>
                </div>
              )}
            </div>
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
            <Link 
              to="/blog" 
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center px-3 py-2 rounded-md text-sm font-medium"
            >
              <FileText className="h-4 w-4 mr-1" />
              Blog
            </Link>
            <a
              href="https://moneycal.in/crypto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center px-3 py-2 rounded-md text-sm font-medium"
            >
              <Shield className="h-4 w-4 mr-1 text-yellow-500" />
              Crypto (MoneyCal.in)
            </a>
            <Link 
              to="/government-schemes" 
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center px-3 py-2 rounded-md text-sm font-medium"
            >
              <Shield className="h-4 w-4 mr-1" />
              <span className="hidden xl:inline">Government Schemes</span>
              <span className="xl:hidden">Schemes</span>
            </Link>
            <Link 
              to="/exceltool" 
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center px-3 py-2 rounded-md text-sm font-medium"
            >
              <FileText className="h-4 w-4 mr-1" />
              <span className="hidden xl:inline">Excel Tools</span>
              <span className="xl:hidden">Excel</span>
            </Link>
            <Link 
              to="/missed-call-banking-directory" 
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center px-3 py-2 rounded-md text-sm font-medium"
            >
              <PhoneCall className="h-4 w-4 mr-1" />
              <span className="hidden xl:inline">Missed Call Banking</span>
              <span className="xl:hidden">Banking</span>
            </Link>
            <Link 
              to="/about-us" 
              className="text-neutral-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact-us" 
              className="text-neutral-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
            <Link 
              to="/calculators/income-tax-calculator" 
              className="btn btn-primary text-sm px-4 py-2"
            >
              Tax Calculator
            </Link>
            <li>
              <a href="/calculators/cheque-bounce-charges-calculator" className="hover:text-orange-600 font-semibold">Cheque Bounce Charges</a>
            </li>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center space-x-2">
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-neutral-700 p-2 rounded-full hover:bg-neutral-100 transition-colors touch-manipulation z-[1000] pointer-events-auto"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={handleOpenMobileMenu}
              className="text-neutral-700 p-2 rounded-full hover:bg-neutral-100 transition-colors touch-manipulation z-[1000] pointer-events-auto"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-20">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 p-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">Search Calculators</h2>
              <button 
                onClick={() => setSearchOpen(false)}
                className="text-neutral-500 hover:text-neutral-700 p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      )}
    </header>
  );
};
