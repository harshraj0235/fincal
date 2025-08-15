import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Building, 
  Shield, 
  FileText,
  Star,
  Clock,
  Users,
  Zap,
  ChevronRight,
  Home,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';

export const Sidebar: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const location = useLocation();

  const quickActions = [
    { name: 'EMI Calculator', href: '/calculators/emi-calculator', icon: Calculator, color: 'from-blue-500 to-blue-600' },
    { name: 'Income Tax', href: '/calculators/income-tax-calculator', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { name: 'SIP Calculator', href: '/calculators/sip-calculator', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
    { name: 'Mutual Fund', href: '/calculators/mutual-fund-returns-calculator', icon: Building, color: 'from-orange-500 to-orange-600' },
  ];

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return <Building className="w-5 h-5" />;
      case 'investment-calculators': return <TrendingUp className="w-5 h-5" />;
      case 'tax-calculators': return <DollarSign className="w-5 h-5" />;
      case 'retirement-calculators': return <Shield className="w-5 h-5" />;
      case 'business-calculators': return <Building className="w-5 h-5" />;
      case 'property-calculators': return <Building className="w-5 h-5" />;
      case 'insurance-calculators': return <Shield className="w-5 h-5" />;
      case 'banking-calculators': return <Building className="w-5 h-5" />;
      default: return <Calculator className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return 'from-blue-500 to-blue-600';
      case 'investment-calculators': return 'from-green-500 to-green-600';
      case 'tax-calculators': return 'from-purple-500 to-purple-600';
      case 'retirement-calculators': return 'from-orange-500 to-orange-600';
      case 'business-calculators': return 'from-indigo-500 to-indigo-600';
      case 'property-calculators': return 'from-red-500 to-red-600';
      case 'insurance-calculators': return 'from-pink-500 to-pink-600';
      case 'banking-calculators': return 'from-cyan-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };
  
  return (
    <div className="h-full overflow-y-auto bg-white/80 backdrop-blur-md">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Navigation</h2>
          <p className="text-sm text-gray-600">Find your financial tools</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
            Quick Actions
          </h3>
      <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isActive = location.pathname === action.href;
              
              return (
                <motion.div
                  key={action.name}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={action.href}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r ' + action.color + ' text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{action.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <Home className="w-4 h-4 mr-2 text-blue-500" />
            Main Sections
          </h3>
          <div className="space-y-1">
            {[
              { name: 'Home', href: '/', icon: Home },
              { name: 'Blog', href: '/blog', icon: FileText },
              { name: 'Government Schemes', href: '/government-schemes', icon: Shield },
              { name: 'Excel Tools', href: '/exceltool', icon: BookOpen },
              { name: 'Crypto', href: '/crypto', icon: TrendingUp },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Calculator Categories */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <Calculator className="w-4 h-4 mr-2 text-green-500" />
            Calculator Categories
          </h3>
          <div className="space-y-1">
            {calculatorCategories.map((category) => {
              const isExpanded = expandedCategory === category.id;
              const isActive = location.pathname.includes('/calculators/') && 
                             category.calculators.some(calc => 
                               location.pathname.includes(calc.id)
                             );
              
              return (
                <div key={category.id}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r ' + getCategoryColor(category.id) + ' text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        {getCategoryIcon(category.id)}
                      </div>
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-11 mt-2 space-y-1"
                      >
                        {category.calculators.slice(0, 6).map((calculator) => {
                          const isCalculatorActive = location.pathname.includes(calculator.id);
                  
                  return (
                            <motion.div
                      key={calculator.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <Link
                                to={`/calculators/${calculator.id}`}
                                className={`block p-2 rounded-lg text-sm transition-all duration-300 ${
                                  isCalculatorActive
                                    ? 'bg-blue-100 text-blue-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {calculator.name}
                              </Link>
                            </motion.div>
                          );
                        })}
                        {category.calculators.length > 6 && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Link
                              to={`/#${category.id}`}
                              className="block p-2 rounded-lg text-sm text-blue-600 hover:bg-blue-50 font-medium"
                            >
                              View all {category.calculators.length} calculators →
                            </Link>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Help & Support */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <HelpCircle className="w-4 h-4 mr-2 text-purple-500" />
            Help & Support
          </h3>
          <div className="space-y-1">
            {[
              { name: 'Contact Us', href: '/contact-us', icon: Users },
              { name: 'About Us', href: '/about-us', icon: Star },
              { name: 'Privacy Policy', href: '/privacy-policy', icon: Shield },
              { name: 'Terms & Conditions', href: '/terms-and-conditions', icon: FileText },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                </motion.div>
                  );
                })}
              </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-xs text-gray-600">Calculators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1M+</div>
                <div className="text-xs text-gray-600">Users</div>
              </div>
            </div>
            <div className="flex items-center justify-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              Updated daily
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};