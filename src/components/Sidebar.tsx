import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BannerAd } from './BannerAd';

import {
  IndianRupee,
  TrendingUp,
  DollarSign,
  Building,
  Shield,
  FileText,
  Home,
  BookOpen,
  HelpCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const quickActions = [
    { name: 'EMI Calculator', href: '/calculators/emi-calculator', icon: IndianRupee },
    { name: 'Income Tax', href: '/calculators/income-tax-calculator', icon: DollarSign },
    { name: 'SIP Calculator', href: '/calculators/sip-calculator', icon: TrendingUp },
    { name: 'Mutual Fund', href: '/calculators/mutual-fund-returns-calculator', icon: Building },
  ];

  const mainSections = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Calculators', href: '/calculators', icon: IndianRupee },
    { name: 'Tools', href: '/tools', icon: Building },
    { name: 'Learn', href: '/learn', icon: BookOpen },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'News', href: '/news', icon: FileText },
    { name: 'Government Schemes', href: '/government-schemes', icon: Shield },
    { name: 'Excel Tools', href: '/excel-tools', icon: FileText },
    { name: 'Crypto', href: '/crypto', icon: TrendingUp },
  ];

  const calculatorCategories = [
    { name: 'Loan Calculators', href: '/calculators?category=loan', count: 15 },
    { name: 'Investment Calculators', href: '/calculators?category=investment', count: 20 },
    { name: 'Tax Calculators', href: '/calculators?category=tax', count: 12 },
    { name: 'Retirement Calculators', href: '/calculators?category=retirement', count: 8 },
    { name: 'Business Calculators', href: '/calculators?category=business', count: 12 },
  ];

  const helpSections = [
    { name: 'Contact Us', href: '/contact-us', icon: HelpCircle },
    { name: 'About Us', href: '/about-us', icon: FileText },
    { name: 'Privacy Policy', href: '/privacy-policy', icon: Shield },
    { name: 'Terms & Conditions', href: '/terms-and-conditions', icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Navigation</h2>
          <p className="text-sm text-gray-600">Find your financial tools</p>
        </div>

        {/* Important Links */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Important Links
          </h3>
          <div className="space-y-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const active = isActive(action.href);

              return (
                <Link
                  key={action.name}
                  to={action.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${active
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Sections */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main Sections
          </h3>
          <div className="space-y-1">
            {mainSections.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${active
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Calculator Categories */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Calculator Categories
          </h3>
          <div className="space-y-1">
            {calculatorCategories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
              >
                <span>{category.name}</span>
                <span className="text-xs text-gray-400 group-hover:text-gray-600">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Help & Support */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Help & Support
          </h3>
          <div className="space-y-1">
            {helpSections.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${active
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4 shadow-md mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">500+</div>
            <div className="text-xs text-blue-100 font-medium uppercase tracking-wider">Financial Tools</div>
          </div>
        </div>

        {/* 160x600 AdSense Banner (Hidden on homepage to prevent hidden ad requests) */}
          {location.pathname !== '/' && (
            <div className="mt-6 flex justify-center">
              <BannerAd width={160} height={600} />
            </div>
          )}

      </div>
    </div>
  );
};
