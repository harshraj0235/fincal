import React, { useState } from "react";
import MoneyModal from "./MoneyModal";
import { Link } from "react-router-dom";
import { Newspaper, Menu, X } from "lucide-react";

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
