import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Star, ArrowRight } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const ToolsHub: React.FC = () => {
  const tools = [
    {
      id: 'emi-calculator',
      name: 'EMI Calculator',
      description: 'Calculate loan EMI, total interest, and payment schedule',
      path: '/calculators/emi-calculator',
      isPopular: true
    },
    {
      id: 'sip-calculator',
      name: 'SIP Calculator',
      description: 'Plan investments and calculate returns on SIP investments',
      path: '/calculators/sip-calculator',
      isPopular: true
    },
    {
      id: 'income-tax-calculator',
      name: 'Income Tax Calculator',
      description: 'Calculate income tax liability under old and new tax regimes',
      path: '/calculators/income-tax-calculator',
      isPopular: true
    },
    {
      id: 'stock-screener',
      name: 'Stock Screener',
      description: 'Advanced stock screening and analysis tool',
      path: '/calculators/stock-screener',
      isNew: true
    },
    {
      id: 'stock-market-course',
      name: 'Stock Market Course',
      description: 'Comprehensive stock market education platform',
      path: '/stock-market',
      isPopular: true
    },
    {
      id: 'astro-finance',
      name: 'Astro Finance',
      description: 'Vedic astrology-based financial guidance',
      path: '/astro-finance',
      isPopular: true
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Tools Hub - All Financial Tools & Calculators | MoneyCal"
        description="Explore our comprehensive collection of financial tools, calculators, and utilities."
        keywords="financial tools, calculators, stock market tools, business tools"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Tools Hub
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Discover our comprehensive collection of financial tools, calculators, and utilities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={tool.path}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 duration-300 block h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Calculator className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex space-x-2">
                        {tool.isPopular && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </span>
                        )}
                        {tool.isNew && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {tool.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm flex items-center">
                        Open Tool
                        <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ToolsHub;
