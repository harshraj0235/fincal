import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Search, 
  Calculator, 
  TrendingUp, 
  FileText, 
  Settings,
  MessageCircle,
  Sparkles,
  Shield
} from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'All Tools', href: '/tools', icon: Calculator },
    { name: 'Calculators', href: '/calculators', icon: Calculator },
    { name: 'Finance Tools', href: '/finance-tools', icon: TrendingUp },
    { name: 'Tax Tools', href: '/tax-tools', icon: FileText },
    { name: 'Corporate Finance', href: '/corporate-finance', icon: TrendingUp },
    { name: 'Insurance', href: '/insurance-tools', icon: Shield },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'Education', href: '/financial-education', icon: FileText },
    { name: 'Help', href: '/help-center', icon: MessageCircle },
    { name: 'Schemes', href: '/government-schemes', icon: Settings },
    { name: 'Astro', href: '/astro-finance', icon: Sparkles },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MoneyCal.in
                </h1>
                <p className="text-xs text-gray-600">Smart Financial Tools</p>
              </div>
          </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || 
                             (item.href === '/calculators' && location.pathname.includes('/calculators')) ||
                             (item.href === '/astro-finance' && location.pathname.includes('/astro-finance'));
              
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                            <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                            </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-blue-100 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </motion.button>

            {/* WhatsApp Button */}
            <motion.a
              href="https://whatsapp.com/channel/0029Va4h1t39Gv7TgnHsR31j"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-green-500 hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-blue-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </motion.button>
        </div>
      </div>
      
        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-t border-gray-200 py-4"
            >
              <div className="max-w-2xl mx-auto px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search calculators, tools, and more..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
          </div>
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-600 to-purple-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.header>
  );
};

export default Header;
