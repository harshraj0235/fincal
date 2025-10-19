import React, { useState, useEffect } from 'react';
import { Search, Code, Tag, Filter, Download, ExternalLink, Info, CheckCircle, AlertCircle, Package, Zap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { hsnSacDatabase, searchHSNSAC, getAllCategories, getAllGSTRates, HSNSACItem } from '../data/hsnSacData';

export const HSNSACFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'All' | 'HSN' | 'SAC'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<HSNSACItem[]>(hsnSacDatabase);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const categories = ['All', ...getAllCategories()];
  const gstRates = getAllGSTRates();

  useEffect(() => {
    let results = hsnSacDatabase;

    // Search filter
    if (searchQuery) {
      results = searchHSNSAC(searchQuery);
    }

    // Type filter
    if (selectedType !== 'All') {
      results = results.filter(item => item.type === selectedType);
    }

    // Category filter
    if (selectedCategory !== 'All') {
      results = results.filter(item => item.category === selectedCategory);
    }

    // Rate filter
    if (selectedRate !== null) {
      results = results.filter(item => item.gstRate === selectedRate);
    }

    setSearchResults(results);
  }, [searchQuery, selectedType, selectedCategory, selectedRate]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  const getRateColor = (rate: number) => {
    switch (rate) {
      case 0: return 'bg-green-500 text-white';
      case 5: return 'bg-blue-500 text-white';
      case 12: return 'bg-yellow-500 text-white';
      case 18: return 'bg-orange-500 text-white';
      case 28: return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRateBorderColor = (rate: number) => {
    switch (rate) {
      case 0: return 'border-green-300 hover:border-green-400';
      case 5: return 'border-blue-300 hover:border-blue-400';
      case 12: return 'border-yellow-300 hover:border-yellow-400';
      case 18: return 'border-orange-300 hover:border-orange-400';
      case 28: return 'border-red-300 hover:border-red-400';
      default: return 'border-gray-300 hover:border-gray-400';
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedCategory('All');
    setSelectedRate(null);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              HSN/SAC Code Finder
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Find HSN (Harmonized System of Nomenclature) and SAC (Services Accounting Code) codes 
            with applicable GST rates. Search by product/service name, code, or category.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="relative mb-4">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name, service, HSN/SAC code, or description..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-14 pr-4 py-5 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && !searchQuery && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 mr-2">Recent:</span>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-cyan-50 text-gray-700 rounded-full transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
            <div className="flex gap-2">
              {(['All', 'HSN', 'SAC'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                    selectedType === type
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-cyan-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* GST Rate Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">GST Rate</label>
            <div className="grid grid-cols-3 gap-2">
              {gstRates.map(rate => (
                <button
                  key={rate}
                  onClick={() => setSelectedRate(selectedRate === rate ? null : rate)}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                    selectedRate === rate
                      ? getRateColor(rate)
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-cyan-400'
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Package className="w-4 h-4 mr-2 text-cyan-600" />
              <span className="font-semibold text-gray-900">Showing {searchResults.length} of {hsnSacDatabase.length}</span>
            </div>
            <div className="flex items-center">
              <Code className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-gray-600">
                HSN: {searchResults.filter(r => r.type === 'HSN').length} | 
                SAC: {searchResults.filter(r => r.type === 'SAC').length}
              </span>
            </div>
          </div>
          {(searchQuery || selectedType !== 'All' || selectedCategory !== 'All' || selectedRate !== null) && (
            <button
              onClick={clearFilters}
              className="text-sm text-cyan-600 hover:text-cyan-700 font-semibold underline"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {searchResults.map((item, index) => (
              <motion.div
                key={`${item.code}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.03 }}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 ${getRateBorderColor(item.gstRate)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`px-3 py-1 rounded-lg font-bold text-sm ${
                      item.type === 'HSN' ? 'bg-cyan-100 text-cyan-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {item.type}
                    </div>
                    <div className="text-sm text-gray-600">{item.category}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full font-bold ${getRateColor(item.gstRate)}`}>
                    {item.gstRate}%
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Code className="w-4 h-4 text-cyan-600 mr-2" />
                    <span className="font-mono font-bold text-lg text-cyan-700">{item.code}</span>
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-2">{item.description}</h3>
                  {item.examples && item.examples.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.examples.map((example, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {example}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    GST: {item.gstRate}%
                  </span>
                  {item.gstRate === 0 && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Exempt
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {searchResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No codes found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters. You can search by product name, service, or code.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors font-semibold"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-cyan-600" />
            Understanding HSN & SAC Codes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Code className="w-5 h-5 mr-2 text-cyan-600" />
                What is HSN Code?
              </h3>
              <p className="text-gray-600 mb-3">
                HSN (Harmonized System of Nomenclature) is a 6-digit code used to classify goods globally. 
                India uses HSN codes for GST on products and physical goods.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Used for physical products</li>
                <li>Internationally standardized</li>
                <li>Determines GST rate</li>
                <li>Required on GST invoices</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-purple-600" />
                What is SAC Code?
              </h3>
              <p className="text-gray-600 mb-3">
                SAC (Services Accounting Code) is a 6-digit code used to classify services. 
                India uses SAC codes for GST on services.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Used for services</li>
                <li>India-specific classification</li>
                <li>Determines service GST rate</li>
                <li>Mandatory for service invoices</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
            <h4 className="font-semibold text-cyan-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-cyan-800 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-cyan-600" />
                <span>Businesses with turnover &gt; ₹5 crore: Must use 6-digit HSN/SAC codes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-cyan-600" />
                <span>Turnover ₹1.5-5 crore: Must use 4-digit codes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-cyan-600" />
                <span>Turnover &lt; ₹1.5 crore: Optional to use HSN/SAC</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-cyan-600" />
                <span>Correct classification ensures proper GST rate application</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-cyan-600" />
            HSN/SAC Finder - FAQs
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How to find HSN code for my product?</h3>
              <p className="text-gray-600">
                Simply search for your product name in the search bar above. Our database will show matching HSN codes 
                with applicable GST rates and descriptions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the difference between HSN and SAC?</h3>
              <p className="text-gray-600">
                HSN codes are for goods/products (physical items), while SAC codes are for services (intangible offerings). 
                Both help determine the correct GST rate.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is HSN/SAC mandatory on invoices?</h3>
              <p className="text-gray-600">
                Yes, for businesses with turnover above ₹5 crore (6-digit code mandatory). 
                For turnover ₹1.5-5 crore, 4-digit code is required. Below ₹1.5 crore, it's optional.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How many digits in HSN/SAC code?</h3>
              <p className="text-gray-600">
                HSN and SAC codes are typically 6 or 8 digits. India requires 2, 4, 6, or 8 digit codes based on turnover.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Where can I find the official HSN/SAC list?</h3>
              <p className="text-gray-600">
                Visit the official <a href="https://www.cbic.gov.in/" target="_blank" rel="noopener noreferrer" className="underline text-cyan-700">CBIC website <ExternalLink className="w-3 h-3 inline" /></a> or 
                <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer" className="underline text-cyan-700 ml-1">GST Portal <ExternalLink className="w-3 h-3 inline" /></a> for complete official lists.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 bg-gray-50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related GST Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://moneycal.in/tools/gst-slab-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Slab Calculator</div>
              <div className="text-sm text-gray-600">Find GST rate for products</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-amount-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Amount Calculator</div>
              <div className="text-sm text-gray-600">Calculate GST on any amount</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-liability-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-cyan-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Liability Calculator</div>
              <div className="text-sm text-gray-600">Calculate net GST liability</div>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HSNSACFinder;
