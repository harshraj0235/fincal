import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ChevronRight, FileText, PenTool as Tool } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
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
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  const handleCalculatorClick = (calculatorId: string) => {
    navigate(`/calculators/${calculatorId}`);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div 
        ref={menuRef}
        className="bg-white w-80 h-full overflow-y-auto shadow-xl transform transition-transform duration-300"
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="p-4">
          <Link 
            to="/" 
            className="block py-2 px-4 text-neutral-900 hover:bg-neutral-100 rounded-lg"
            onClick={onClose}
          >
            Home
          </Link>
          
          <Link 
            to="/#tools" 
            className="block py-2 px-4 text-neutral-900 hover:bg-neutral-100 rounded-lg flex items-center"
            onClick={onClose}
          >
            <Tool className="h-4 w-4 mr-2" />
            Financial Tools
          </Link>
          
          <Link 
            to="/blog" 
            className="block py-2 px-4 text-neutral-900 hover:bg-neutral-100 rounded-lg flex items-center"
            onClick={onClose}
          >
            <FileText className="h-4 w-4 mr-2" />
            Blog
          </Link>
          
          <Link 
            to="/about-us" 
            className="block py-2 px-4 text-neutral-900 hover:bg-neutral-100 rounded-lg"
            onClick={onClose}
          >
            About Us
          </Link>
          
          <Link 
            to="/contact-us" 
            className="block py-2 px-4 text-neutral-900 hover:bg-neutral-100 rounded-lg"
            onClick={onClose}
          >
            Contact Us
          </Link>
          
          <div className="mt-4">
            <h3 className="font-medium text-neutral-500 px-4 py-2">Calculator Categories</h3>
            {calculatorCategories.map(category => (
              <div key={category.id} className="mt-2">
                <Link 
                  to={`/#${category.id}`}
                  className="px-4 py-2 flex justify-between items-center text-neutral-900 hover:bg-neutral-100 rounded-lg"
                  onClick={onClose}
                >
                  <span className="font-semibold">{category.name}</span>
                  <ChevronRight className="h-4 w-4 text-neutral-500" />
                </Link>
                <div className="ml-4">
                  {category.calculators.slice(0, 5).map(calculator => (
                    <button
                      key={calculator.id}
                      onClick={() => handleCalculatorClick(calculator.id)}
                      className="block w-full text-left py-2 px-4 text-neutral-900 hover:bg-neutral-100 rounded-lg text-sm"
                    >
                      {calculator.name}
                    </button>
                  ))}
                  {category.calculators.length > 5 && (
                    <Link
                      to={`/#${category.id}`}
                      className="block py-2 px-4 text-primary-600 hover:bg-neutral-100 rounded-lg text-sm font-medium"
                      onClick={onClose}
                    >
                      View all {category.calculators.length} calculators
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Link 
              to="/privacy-policy" 
              className="block py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded-lg text-sm"
              onClick={onClose}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-and-conditions" 
              className="block py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded-lg text-sm"
              onClick={onClose}
            >
              Terms & Conditions
            </Link>
            <Link 
              to="/calculators/income-tax-calculator" 
              className="block py-2 px-4 bg-primary-600 text-white rounded-lg text-center font-medium mt-4"
              onClick={onClose}
            >
              Income Tax Calculator
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};