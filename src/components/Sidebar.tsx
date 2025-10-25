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

  const customCategories = [
    {
      id: 'loan-calculators',
      name: 'Loan Calculators',
      icon: <Building className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      route: '/calculators/loan'
    },
    {
      id: 'investment-calculators',
      name: 'Investment Calculators',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-green-500 to-green-600',
      route: '/calculators/investment'
    },
    {
      id: 'tax-calculators',
      name: 'Tax Calculators',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      route: '/tax-tools'
    },
    {
      id: 'retirement-calculators',
      name: 'Retirement Calculators',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-orange-500 to-orange-600',
      route: '/calculators/retirement'
    },
    {
      id: 'business-calculators',
      name: 'Business Calculators',
      icon: <Building className="w-5 h-5" />,
      color: 'from-indigo-500 to-indigo-600',
      route: '/calculators/business'
    },
    {
      id: 'property-calculators',
      name: 'Property Calculators',
      icon: <Building className="w-5 h-5" />,
      color: 'from-red-500 to-red-600',
      route: '/calculators/property'
    },
    {
      id: 'insurance-calculators',
      name: 'Insurance Calculators',
      icon: <Shield className="w-5 h-5" />,
      color: 'from-pink-500 to-pink-600',
      route: '/calculators/insurance'
    },
    {
      id: 'banking-finance-tools',
      name: 'Banking & Finance Tools',
      icon: <Building className="w-5 h-5" />,
      color: 'from-cyan-500 to-cyan-600',
      route: '/bank-tools'
    },
    {
      id: 'fintech-payments',
      name: 'FinTech & Payments',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-violet-500 to-violet-600',
      route: '/fintech-tools'
    },
    {
      id: 'investments-wealth',
      name: 'Investments & Wealth Management',
      icon: <Star className="w-5 h-5" />,
      color: 'from-amber-500 to-amber-600',
      route: '/investing-tools'
    },
    {
      id: 'personal-finance',
      name: 'Personal Finance',
      icon: <Users className="w-5 h-5" />,
      color: 'from-teal-500 to-teal-600',
      route: '/finance-tools'
    },
    {
      id: 'math-education',
      name: 'Math & Education Calculators',
      icon: <Calculator className="w-5 h-5" />,
      color: 'from-rose-500 to-rose-600',
      route: '/calculators/education'
    }
  ];

  const getCategoryIcon = (categoryId: string) => {
    const category = customCategories.find(cat => cat.id === categoryId);
    return category?.icon || <Calculator className="w-5 h-5" />;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = customCategories.find(cat => cat.id === categoryId);
    return category?.color || 'from-gray-500 to-gray-600';
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
            {customCategories.map((category) => {
              const isActive = location.pathname.includes(category.route);
              
              return (
                <motion.div
                  key={category.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={category.route}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        {category.icon}
                      </div>
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
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