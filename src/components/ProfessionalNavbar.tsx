import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, Menu, X, Home, TrendingUp, BookOpen, 
  Newspaper, Settings, Award, Phone, Mail
} from 'lucide-react';

export const ProfessionalNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Calculators', path: '/calculators', icon: Calculator },
    { name: 'Investment', path: '/finance-tools', icon: TrendingUp },
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Blog', path: '/blog', icon: Newspaper },
    { name: 'Tools', path: '/tools', icon: Settings },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white/95 backdrop-blur-sm shadow-md'
      }`}
      style={{ height: '72px', contain: 'layout style paint' }}
    >
      <nav className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo - Professional */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            aria-label="MoneyCal.in - Financial Calculators"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MoneyCal.in
              </div>
              <div className="text-xs text-gray-600 -mt-1">Financial Tools</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </a>
            <Link
              to="/calculators/emi-calculator"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              <Calculator className="w-4 h-4" />
              Calculate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown - Clean Slide Down */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium border border-transparent hover:border-blue-200"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile CTA */}
              <Link
                to="/calculators/emi-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold mt-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Now
              </Link>

              {/* Contact Info - Mobile */}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                <a href="tel:+919876543210" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </a>
                <a href="mailto:support@moneycal.in" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  support@moneycal.in
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default ProfessionalNavbar;

