import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, TrendingUp, FileText, BarChart3, Shield, 
  Briefcase, Umbrella, PartyPopper, BookOpen, Award, 
  Gift, Sparkles, DollarSign, RefreshCw, ArrowRight,
  Clock, Tag, Zap, Star, Target, CheckCircle, Building, Sparkle
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon: any;
  color: string;
  badge?: string;
}

interface DynamicContentShowcaseProps {
  language?: 'en' | 'hi';
}

export const DynamicContentShowcase: React.FC<DynamicContentShowcaseProps> = ({ language = 'en' }) => {
  const [displayItems, setDisplayItems] = useState<ContentItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Complete content pool from all sections
  const allContent: ContentItem[] = [
    // Tools
    { id: 't1', title: 'EMI Calculator', description: 'Calculate loan EMIs for home, car, and personal loans', category: 'Tools', url: '/calculators/emi-calculator', icon: Calculator, color: 'from-blue-500 to-indigo-600', badge: 'Popular' },
    { id: 't2', title: 'GST Calculator', description: 'Calculate GST amounts for goods and services', category: 'Tools', url: '/calculators/gst-calculator', icon: BarChart3, color: 'from-green-500 to-emerald-600' },
    { id: 't3', title: 'Income Tax Calculator', description: 'Calculate income tax for FY 2024-25', category: 'Tools', url: '/calculators/income-tax-calculator', icon: FileText, color: 'from-purple-500 to-pink-600', badge: 'Updated' },
    
    // Calculators
    { id: 'c1', title: 'SIP Calculator', description: 'Calculate mutual fund SIP returns and maturity', category: 'Calculators', url: '/calculators/sip-calculator', icon: TrendingUp, color: 'from-cyan-500 to-blue-600', badge: 'Trending' },
    { id: 'c2', title: 'PPF Calculator', description: 'Public Provident Fund maturity calculator', category: 'Calculators', url: '/calculators/ppf-calculator', icon: Award, color: 'from-indigo-500 to-purple-600', badge: 'Premium' },
    { id: 'c3', title: 'FD Calculator', description: 'Fixed deposit returns and interest calculator', category: 'Calculators', url: '/calculators/fd-calculator', icon: DollarSign, color: 'from-green-500 to-teal-600' },
    { id: 'c4', title: 'CAGR Calculator', description: 'Compound annual growth rate calculator', category: 'Calculators', url: '/calculators/cagr-calculator', icon: TrendingUp, color: 'from-orange-500 to-red-600' },
    
    // Finance Tools
    { id: 'f1', title: 'Retirement Planner', description: 'Plan your retirement corpus and expenses', category: 'Finance', url: '/finance-tools/retirement-planner', icon: Sparkles, color: 'from-purple-500 to-pink-600' },
    { id: 'f2', title: 'XIRR Calculator', description: 'Calculate returns for irregular investments', category: 'Finance', url: '/finance-tools/xirr-calculator', icon: TrendingUp, color: 'from-blue-500 to-cyan-600' },
    { id: 'f3', title: 'Goal Based Planner', description: 'Plan investments for specific goals', category: 'Finance', url: '/finance-tools/goal-based-investment-allocator', icon: Target, color: 'from-green-500 to-emerald-600' },
    
    // Tax Tools
    { id: 'tx1', title: 'Section 80C Calculator', description: 'Calculate tax deductions under Section 80C', category: 'Tax', url: '/calculators/section-80c-calculator', icon: Shield, color: 'from-orange-500 to-red-600', badge: 'Save Tax' },
    { id: 'tx2', title: 'HRA Calculator', description: 'Calculate HRA tax exemption', category: 'Tax', url: '/calculators/hra-calculator', icon: FileText, color: 'from-purple-500 to-pink-600' },
    { id: 'tx3', title: 'Advance Tax Calculator', description: 'Calculate advance tax installments', category: 'Tax', url: '/tax-tools/advance-tax-calculator', icon: Calculator, color: 'from-blue-500 to-indigo-600' },
    
    // GST Tools
    { id: 'g1', title: 'HSN/SAC Finder', description: 'Find HSN and SAC codes with GST rates', category: 'GST', url: '/tools/gst-hsn-sac-finder', icon: BarChart3, color: 'from-cyan-500 to-blue-600', badge: 'New' },
    { id: 'g2', title: 'GSTR-1 Calculator', description: 'GSTR-1 deadline and penalty calculator', category: 'GST', url: '/tools/gstr-1-deadline-calculator', icon: FileText, color: 'from-purple-500 to-pink-600' },
    { id: 'g3', title: 'GST Liability Calculator', description: 'Calculate total GST liability', category: 'GST', url: '/tools/gst-liability-calculator', icon: Calculator, color: 'from-green-500 to-emerald-600' },
    { id: 'g4', title: 'ITC Eligibility Checker', description: 'Check input tax credit eligibility', category: 'GST', url: '/tools/itc-eligibility-checker', icon: CheckCircle, color: 'from-blue-500 to-cyan-600' },
    
    // Insurance
    { id: 'i1', title: 'Life Insurance Calculator', description: 'Calculate required life insurance cover', category: 'Insurance', url: '/calculators/life-insurance-calculator', icon: Umbrella, color: 'from-teal-500 to-cyan-600', badge: 'Essential' },
    { id: 'i2', title: 'Health Insurance', description: 'Estimate health insurance needs', category: 'Insurance', url: '/insurance-tools/health-insurance-estimator', icon: Shield, color: 'from-green-500 to-emerald-600' },
    
    // Loan Tools
    { id: 'l1', title: 'Home Loan Calculator', description: 'Calculate home loan EMI and interest', category: 'Loans', url: '/calculators/home-loan-calculator', icon: DollarSign, color: 'from-orange-500 to-red-600', badge: 'Popular' },
    { id: 'l2', title: 'Personal Loan Calculator', description: 'Calculate personal loan EMI', category: 'Loans', url: '/calculators/personal-loan-calculator', icon: Calculator, color: 'from-purple-500 to-pink-600' },
    { id: 'l3', title: 'Car Loan Calculator', description: 'Calculate car loan EMI and costs', category: 'Loans', url: '/calculators/car-loan-calculator', icon: DollarSign, color: 'from-blue-500 to-indigo-600' },
    
    // Investment Tools
    { id: 'inv1', title: 'NPS Calculator', description: 'National Pension System calculator', category: 'Investment', url: '/calculators/nps-calculator', icon: TrendingUp, color: 'from-indigo-500 to-purple-600' },
    { id: 'inv2', title: 'Mutual Fund Calculator', description: 'Calculate mutual fund returns', category: 'Investment', url: '/calculators/mutual-fund-returns-calculator', icon: BarChart3, color: 'from-green-500 to-teal-600' },
    { id: 'inv3', title: 'Stock Analysis', description: 'Analyze stock performance and returns', category: 'Investment', url: '/investing-tools', icon: TrendingUp, color: 'from-blue-500 to-cyan-600' },
    
    // Festival
    { id: 'fe1', title: 'Diwali Budget Planner', description: 'Plan your Diwali expenses and budget', category: 'Festival', url: '/festival-tools', icon: PartyPopper, color: 'from-pink-500 to-rose-600', badge: 'Seasonal' },
    
    // Corporate Finance
    { id: 'cf1', title: 'Business Loan Calculator', description: 'Calculate business loan EMI and costs', category: 'Corporate', url: '/calculators/business-loan-calculator', icon: Briefcase, color: 'from-violet-500 to-purple-600' },
    { id: 'cf2', title: 'Profit Margin Calculator', description: 'Calculate business profit margins', category: 'Corporate', url: '/corporate-finance', icon: BarChart3, color: 'from-green-500 to-emerald-600' },
    
    // Education
    { id: 'e1', title: 'Financial Literacy Course', description: 'Learn basics of personal finance', category: 'Education', url: '/financial-education', icon: BookOpen, color: 'from-blue-500 to-indigo-600', badge: 'Free' },
    { id: 'e2', title: 'Investment Guide', description: 'Complete guide to investing in India', category: 'Education', url: '/financial-education', icon: Award, color: 'from-purple-500 to-pink-600' },
    
    // Government Schemes
    { id: 'gs1', title: 'PM Kisan Scheme', description: 'Direct income support for farmers', category: 'Schemes', url: '/government-schemes', icon: Gift, color: 'from-green-500 to-teal-600', badge: 'Govt' },
    { id: 'gs2', title: 'Sukanya Samriddhi', description: 'Girl child savings scheme calculator', category: 'Schemes', url: '/calculators/sukanya-samriddhi-calculator', icon: Sparkles, color: 'from-pink-500 to-rose-600' },
    
    // Astro Finance
    { id: 'a1', title: 'Auspicious Investment Days', description: 'Find lucky days for investments', category: 'Astro', url: '/astro-finance', icon: Sparkle, color: 'from-purple-500 to-pink-600', badge: 'Unique' },
    
    // Bank Tools
    { id: 'b1', title: 'IFSC Code Finder', description: 'Find bank IFSC codes instantly', category: 'Banking', url: '/calculators/bank-ifsc-finder', icon: Building, color: 'from-cyan-500 to-blue-600' },
    { id: 'b2', title: 'Interest Rate Comparison', description: 'Compare bank interest rates', category: 'Banking', url: '/bank-tools', icon: TrendingUp, color: 'from-green-500 to-emerald-600' }
  ];

  // Shuffle and select 15 random items
  const getRandomItems = () => {
    const shuffled = [...allContent].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  };

  // Initialize with random items
  useEffect(() => {
    setDisplayItems(getRandomItems());
  }, []);

  // Refresh function
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setDisplayItems(getRandomItems());
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {language === 'en' ? '🔥 Trending Financial Tools & Guides' : '🔥 ट्रेंडिंग वित्तीय टूल्स और गाइड'}
              </span>
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Discover our most popular calculators, guides, and resources • Refreshes automatically' 
                : 'हमारे सबसे लोकप्रिय कैलकुलेटर, गाइड और संसाधन खोजें • स्वचालित रूप से रीफ्रेश होता है'}
            </p>
          </motion.div>

          {/* Refresh Button */}
          <motion.button
            onClick={handleRefresh}
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Featured Item (First Large Card) */}
        {displayItems[0] && (() => {
          const FeaturedIcon = displayItems[0].icon;
          return (
            <motion.div
              key={`featured-${displayItems[0].id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link to={displayItems[0].url}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={`bg-gradient-to-r ${displayItems[0].color} rounded-3xl shadow-2xl overflow-hidden`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="p-8 md:p-12 text-white flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                          ⭐ FEATURED
                        </div>
                        {displayItems[0].badge && (
                          <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                            {displayItems[0].badge}
                          </div>
                        )}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">{displayItems[0].title}</h3>
                      <p className="text-xl text-white/90 mb-6">{displayItems[0].description}</p>
                      <div className="flex items-center text-white font-semibold text-lg">
                        {language === 'en' ? 'Try Now' : 'अभी आज़माएं'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center p-12 bg-white/10 backdrop-blur-sm">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <FeaturedIcon className="w-32 h-32 text-white opacity-80" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })()}

        {/* News-Style Grid (Remaining 14 Items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.slice(1, 15).map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group"
              >
                <Link to={item.url}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                    {/* Icon Header */}
                    <div className={`bg-gradient-to-r ${item.color} p-6 relative`}>
                      <div className="flex items-start justify-between">
                        <div className={`bg-white/20 backdrop-blur-sm p-3 rounded-xl`}>
                          <ItemIcon className="w-8 h-8 text-white" />
                        </div>
                      {item.badge && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className="bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold"
                        >
                          {item.badge}
                        </motion.div>
                      )}
                    </div>
                    {/* Decorative blob */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-500">{item.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-1 transition-all">
                        <Zap className="w-4 h-4 mr-1" />
                        {language === 'en' ? 'Use Tool' : 'टूल इस्तेमाल करें'}
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>

        {/* Auto-refresh indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-5 h-5 text-blue-600" />
            </motion.div>
            <span className="text-sm text-gray-700">
              {language === 'en' 
                ? '15 tools shown from 100+ available • Click refresh for more'
                : '100+ उपलब्ध में से 15 टूल्स दिखाए गए • अधिक के लिए रीफ्रेश करें'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicContentShowcase;

