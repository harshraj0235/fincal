import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calculator, Search, ChevronRight, FileText, Shield } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setCategoriesOpen(false);
  }, [location]);
  
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
  
  const handleCalculatorClick = (calculatorId: string) => {
    navigate(`/calculators/${calculatorId}`);
    setCategoriesOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-neutral-900">FinCalc India</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <div className="relative" ref={categoriesRef}>
              <button 
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center"
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
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 py-2">
                  {calculatorCategories.map(category => (
                    <div key={category.id} className="relative group">
                      <Link
                        to={`/#${category.id}`}
                        className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 group"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        {category.name}
                        <ChevronRight className="h-4 w-4 absolute right-4 top-3 text-neutral-400 group-hover:text-primary-600" />
                      </Link>
                      <div className="absolute left-full top-0 ml-2 w-64 bg-white rounded-lg shadow-lg hidden group-hover:block">
                        <div className="py-2">
                          {category.calculators.slice(0, 8).map(calculator => (
                            <button
                              key={calculator.id}
                              onClick={() => handleCalculatorClick(calculator.id)}
                              className="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-primary-600"
                            >
                              {calculator.name}
                            </button>
                          ))}
                          {category.calculators.length > 8 && (
                            <Link
                              to={`/#${category.id}`}
                              className="block px-4 py-2 text-primary-600 hover:bg-neutral-100 font-medium"
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
                    className="block px-4 py-2 text-primary-600 hover:bg-neutral-100 font-medium border-t border-neutral-100 mt-1 pt-1"
                    onClick={() => setCategoriesOpen(false)}
                  >
                    View all calculators
                  </Link>
                </div>
              )}
            </div>
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center space-x-1"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
            <Link 
              to="/blog" 
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              Blog
            </Link>
            <Link 
              to="/government-schemes" 
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center"
            >
              <Shield className="h-4 w-4 mr-1" />
              Government Schemes
            </Link>
             <Link 
              to="/ExcelTool" 
              className="text-neutral-700 hover:text-primary-600 transition-colors flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              Excel Tool
            </Link>
            <Link 
              to="/about-us" 
              className="text-neutral-700 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact-us" 
              className="text-neutral-700 hover:text-primary-600 transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/calculators/income-tax-calculator" 
              className="btn btn-primary"
            >
              Income Tax Calculator
            </Link>
          </nav>
          
          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-neutral-700 p-2 rounded-full hover:bg-neutral-100"
            >
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-neutral-700 p-2 rounded-full hover:bg-neutral-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">Search Calculators</h2>
              <button 
                onClick={() => setSearchOpen(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};
