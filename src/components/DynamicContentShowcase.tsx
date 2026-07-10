import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, BarChart3, Shield,
  Briefcase, BookOpen, TrendingUp, PartyPopper, Tag,
  Gift, Sparkles, DollarSign, RefreshCw, ArrowRight,
  Zap, Star, Newspaper, GraduationCap, Building, IndianRupee
} from 'lucide-react';
import { getRandomContent, type AggregatedContent } from '../utils/contentAggregator';

interface DynamicContentShowcaseProps {
  language?: 'en' | 'hi';
}

// Helper function to get icon and color based on content type/category
const getIconAndColor = (item: AggregatedContent): { icon: any; color: string } => {
  // Based on type
  if (item.type === 'blog') return { icon: Newspaper, color: 'from-amber-500 to-orange-600' };
  if (item.type === 'scheme') return { icon: Gift, color: 'from-green-500 to-emerald-600' };
  if (item.type === 'guide') return { icon: BookOpen, color: 'from-purple-500 to-pink-600' };

  // Based on category
  if (item.category.includes('GST')) return { icon: BarChart3, color: 'from-purple-500 to-pink-600' };
  if (item.category.includes('Tax')) return { icon: FileText, color: 'from-orange-500 to-red-600' };
  if (item.category.includes('Investment') || item.category.includes('SIP') || item.category.includes('Mutual Fund'))
    return { icon: TrendingUp, color: 'from-cyan-500 to-blue-600' };
  if (item.category.includes('Loan') || item.category.includes('EMI'))
    return { icon: DollarSign, color: 'from-blue-500 to-indigo-600' };
  if (item.category.includes('Insurance')) return { icon: Shield, color: 'from-teal-500 to-cyan-600' };
  if (item.category.includes('Corporate') || item.category.includes('Business'))
    return { icon: Briefcase, color: 'from-violet-500 to-purple-600' };
  if (item.category.includes('Banking') || item.category.includes('Bank'))
    return { icon: Building, color: 'from-cyan-500 to-blue-600' };
  if (item.category.includes('Education')) return { icon: GraduationCap, color: 'from-indigo-500 to-purple-600' };
  if (item.category.includes('Astro')) return { icon: Sparkles, color: 'from-purple-500 to-pink-600' };
  if (item.category.includes('Festival')) return { icon: PartyPopper, color: 'from-pink-500 to-rose-600' };

  // Default
  return { icon: IndianRupee, color: 'from-blue-500 to-indigo-600' };
};

export const DynamicContentShowcase: React.FC<DynamicContentShowcaseProps> = ({ language = 'en' }) => {
  const [displayItems, setDisplayItems] = useState<AggregatedContent[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get random items from entire website
  const loadRandomContent = async () => {
    const randomItems = await getRandomContent(15);
    setDisplayItems(randomItems);
  };

  // Initialize with random items
  useEffect(() => {
    loadRandomContent();
  }, []);

  // Refresh function
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadRandomContent();
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
          const featuredItem = displayItems[0];
          const { icon: FeaturedIcon, color } = getIconAndColor(featuredItem);
          return (
            <motion.div
              key={`featured-${featuredItem.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link to={featuredItem.url}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={`bg-gradient-to-r ${color} rounded-3xl shadow-2xl overflow-hidden`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="p-8 md:p-12 text-white flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                          ⭐ FEATURED
                        </div>
                        {featuredItem.badge && (
                          <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                            {featuredItem.badge}
                          </div>
                        )}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">{featuredItem.title}</h3>
                      <p className="text-xl text-white/90 mb-6">{featuredItem.description}</p>
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
            const { icon: ItemIcon, color: itemColor } = getIconAndColor(item);
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
                    <div className={`bg-gradient-to-r ${itemColor} p-6 relative`}>
                      <div className="flex items-start justify-between">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
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

