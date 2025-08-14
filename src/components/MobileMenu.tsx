import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ChevronRight, FileText, Shield, Calculator, TrendingUp, Clock, Globe } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';

interface MobileMenuProps {
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  
  const handleCalculatorClick = (calculatorId: string) => {
    navigate(`/calculators/${calculatorId}`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div 
        ref={menuRef}
        className="bg-white w-full max-w-sm h-full overflow-y-auto shadow-2xl transform transition-transform duration-300 ease-out"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">MoneyCal</h2>
              <p className="text-xs text-gray-500">India's Financial Portal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors touch-manipulation"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {/* Quick Actions */}
          <div className="mb-6">
            <Link 
              to="/calculators/income-tax-calculator" 
              className="block w-full py-3 px-4 bg-primary-600 text-white rounded-xl text-center font-medium shadow-lg hover:bg-primary-700 transition-colors touch-manipulation"
              onClick={onClose}
            >
              Income Tax Calculator
            </Link>
            <Link 
              to="/calculators/emi-calculator" 
              className="block w-full py-3 px-4 bg-gray-100 text-gray-900 rounded-xl text-center font-medium mt-2 hover:bg-gray-200 transition-colors touch-manipulation"
              onClick={onClose}
            >
              EMI Calculator
            </Link>
          </div>

          {/* Main Navigation */}
          <Link 
            to="/" 
            className="block py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors touch-manipulation font-medium"
            onClick={onClose}
          >
            Home
          </Link>
          
          <Link 
            to="/blog" 
            className="block py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors touch-manipulation flex items-center"
            onClick={onClose}
          >
            <FileText className="h-5 w-5 mr-3 text-gray-500" />
            News & Analysis
          </Link>
          
          <Link 
            to="/government-schemes" 
            className="block py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors touch-manipulation flex items-center"
            onClick={onClose}
          >
            <Shield className="h-5 w-5 mr-3 text-gray-500" />
            Govt Schemes
          </Link>
          
          <Link 
            to="/tools" 
            className="block py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors touch-manipulation flex items-center"
            onClick={onClose}
          >
            <Calculator className="h-5 w-5 mr-3 text-gray-500" />
            Tools
          </Link>

          {/* Calculator Categories */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 px-4">Calculators</h3>
            {calculatorCategories.map((category) => (
              <div key={category.id} className="mb-2">
                <Link
                  to={`/#${category.id}`}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
                  onClick={onClose}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>
                <div className="ml-4 space-y-1">
                  {category.calculators.slice(0, 3).map((calculator) => (
                    <button
                      key={calculator.id}
                      onClick={() => handleCalculatorClick(calculator.id)}
                      className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors touch-manipulation"
                    >
                      {calculator.name}
                    </button>
                  ))}
                  {category.calculators.length > 3 && (
                    <Link
                      to={`/#${category.id}`}
                      className="block py-2 px-4 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors touch-manipulation"
                      onClick={onClose}
                    >
                      View all {category.calculators.length} calculators →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            <Link 
              to="/contact" 
              className="block py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-xl transition-colors touch-manipulation"
              onClick={onClose}
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
