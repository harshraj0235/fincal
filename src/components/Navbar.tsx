import React, { useState } from "react";
import MoneyModal from "./MoneyModal";
import { Link } from "react-router-dom";
import { Newspaper, Menu, X, Banknote, PhoneCall, Shield, AlertCircle, Calculator, Phone } from "lucide-react";

const Navbar = () => {
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              MoneyCal
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Blog
            </Link>
            <Link 
              to="/crypto" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Crypto
            </Link>
            <Link 
              to="/news-reel" 
              className="inline-flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Newspaper className="w-4 h-4 mr-1" />
              News Reel
            </Link>
            <li className="relative group">
              <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
                <span>Bank Tools</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <li>
                  <a href="/calculators/bank-locker-finder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      <div>
                        <div className="font-semibold">Bank Locker Finder</div>
                        <div className="text-xs text-gray-500">Find locker availability & charges</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/calculators/cheque-bounce-charges-calculator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      <div>
                        <div className="font-semibold">Cheque Bounce Charges</div>
                        <div className="text-xs text-gray-500">Bank-wise penalty calculator</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/calculators/bank-charges-analyzer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                    <div className="flex items-center">
                      <Calculator className="w-4 h-4 mr-2" />
                      <div>
                        <div className="font-semibold">Bank Charges Analyzer</div>
                        <div className="text-xs text-gray-500">Compare hidden bank fees</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/missed-call-banking-directory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <div>
                        <div className="font-semibold">Missed Call Banking</div>
                        <div className="text-xs text-gray-500">Bank missed call numbers</div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <button 
              onClick={() => setShowMoneyModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Money
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/blog" 
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/crypto" 
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Crypto
              </Link>
              <Link 
                to="/news-reel" 
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Newspaper className="w-4 h-4 mr-2" />
                News Reel
              </Link>
              <li className="relative group">
                <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
                  <span>Bank Tools</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <li>
                    <a href="/calculators/bank-locker-finder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        <div>
                          <div className="font-semibold">Bank Locker Finder</div>
                          <div className="text-xs text-gray-500">Find locker availability & charges</div>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/calculators/cheque-bounce-charges-calculator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        <div>
                          <div className="font-semibold">Cheque Bounce Charges</div>
                          <div className="text-xs text-gray-500">Bank-wise penalty calculator</div>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/calculators/bank-charges-analyzer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      <div className="flex items-center">
                        <Calculator className="w-4 h-4 mr-2" />
                        <div>
                          <div className="font-semibold">Bank Charges Analyzer</div>
                          <div className="text-xs text-gray-500">Compare hidden bank fees</div>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/missed-call-banking-directory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <div>
                          <div className="font-semibold">Missed Call Banking</div>
                          <div className="text-xs text-gray-500">Bank missed call numbers</div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <button 
                onClick={() => {
                  setShowMoneyModal(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
              >
                Money
              </button>
            </div>
          </div>
        )}
      </div>

      {showMoneyModal && (
        <MoneyModal onClose={() => setShowMoneyModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
