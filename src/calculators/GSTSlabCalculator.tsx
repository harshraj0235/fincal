import React, { useState, useEffect } from 'react';
import { Search, Layers, TrendingUp, Info, ExternalLink, CheckCircle, AlertCircle, Filter, Tag, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Comprehensive GST rate data for different products and services
const gstSlabData = [
  // 0% - Exempt Items
  { category: 'Food', item: 'Fresh Vegetables', rate: 0, hsn: '0701-0714', description: 'All fresh vegetables' },
  { category: 'Food', item: 'Fresh Fruits', rate: 0, hsn: '0801-0814', description: 'All fresh fruits' },
  { category: 'Food', item: 'Fresh Milk', rate: 0, hsn: '0401', description: 'Unpasteurized milk' },
  { category: 'Food', item: 'Eggs', rate: 0, hsn: '0407', description: 'Fresh eggs' },
  { category: 'Food', item: 'Bread', rate: 0, hsn: '1905', description: 'Bread (not branded)' },
  { category: 'Food', item: 'Jaggery', rate: 0, hsn: '1701', description: 'Unrefined sugar' },
  { category: 'Healthcare', item: 'Healthcare Services', rate: 0, hsn: '9993', description: 'All healthcare services' },
  { category: 'Education', item: 'Educational Services', rate: 0, hsn: '9992', description: 'All educational services' },
  { category: 'Agriculture', item: 'Agricultural Products', rate: 0, hsn: 'Various', description: 'Seeds, grains, live animals' },
  
  // 5% GST Items
  { category: 'Food', item: 'Sugar', rate: 5, hsn: '1701', description: 'White sugar' },
  { category: 'Food', item: 'Tea', rate: 5, hsn: '0902', description: 'Tea leaves and packets' },
  { category: 'Food', item: 'Coffee', rate: 5, hsn: '0901', description: 'Coffee beans and powder' },
  { category: 'Food', item: 'Edible Oils', rate: 5, hsn: '1507-1518', description: 'Cooking oils' },
  { category: 'Food', item: 'Spices', rate: 5, hsn: '0904-0910', description: 'All spices' },
  { category: 'Food', item: 'Fish', rate: 5, hsn: '0302-0307', description: 'Fresh and frozen fish' },
  { category: 'Food', item: 'Paneer', rate: 5, hsn: '0406', description: 'Fresh paneer' },
  { category: 'Food', item: 'Curd/Lassi', rate: 5, hsn: '0403', description: 'Yogurt products' },
  { category: 'Food', item: 'Mishti/Mithai', rate: 5, hsn: '1704', description: 'Traditional sweets' },
  { category: 'Healthcare', item: 'Medicines', rate: 5, hsn: '3003-3004', description: 'Life-saving drugs' },
  { category: 'Healthcare', item: 'Medical Equipment', rate: 5, hsn: '9018-9022', description: 'Basic medical devices' },
  { category: 'Transport', item: 'Economy Class Air Ticket', rate: 5, hsn: '9973', description: 'Domestic flights' },
  { category: 'Transport', item: 'Transport Services', rate: 5, hsn: '9965', description: 'Passenger transport' },
  { category: 'Apparel', item: 'Clothes (Below ₹1000)', rate: 5, hsn: '6101-6217', description: 'Affordable clothing' },
  { category: 'Footwear', item: 'Footwear (Below ₹500)', rate: 5, hsn: '6401-6405', description: 'Basic footwear' },
  { category: 'Other', item: 'Coal', rate: 5, hsn: '2701', description: 'Coal and briquettes' },
  { category: 'Food', item: 'Milk Powder', rate: 5, hsn: '0402', description: 'Powdered milk' },
  { category: 'Food', item: 'Rusk', rate: 5, hsn: '1905', description: 'Bread rusk' },
  
  // 12% GST Items
  { category: 'Food', item: 'Butter', rate: 12, hsn: '0405', description: 'Dairy butter' },
  { category: 'Food', item: 'Ghee', rate: 12, hsn: '0405', description: 'Clarified butter' },
  { category: 'Food', item: 'Cheese', rate: 12, hsn: '0406', description: 'Processed cheese' },
  { category: 'Food', item: 'Fruit Juices', rate: 12, hsn: '2009', description: 'Packaged fruit juice' },
  { category: 'Food', item: 'Namkeen', rate: 12, hsn: '2105', description: 'Savory snacks' },
  { category: 'Food', item: 'Dry Fruits', rate: 12, hsn: '0801-0814', description: 'Dried fruits' },
  { category: 'Food', item: 'Ayurvedic Medicines', rate: 12, hsn: '3003', description: 'Ayurvedic preparations' },
  { category: 'IT', item: 'Mobile Phones', rate: 12, hsn: '8517', description: 'Smartphones' },
  { category: 'Electronics', item: 'Spectacles', rate: 12, hsn: '9004', description: 'Eyeglasses' },
  { category: 'Stationery', item: 'Exercise Books', rate: 12, hsn: '4820', description: 'Student notebooks' },
  { category: 'Apparel', item: 'Clothes (₹1000-2500)', rate: 12, hsn: '6101-6217', description: 'Mid-range clothing' },
  { category: 'Footwear', item: 'Footwear (₹500-1000)', rate: 12, hsn: '6401-6405', description: 'Mid-range footwear' },
  { category: 'Other', item: 'Toothpaste', rate: 12, hsn: '3306', description: 'Dental care' },
  { category: 'Other', item: 'Umbrella', rate: 12, hsn: '6601', description: 'Umbrellas' },
  { category: 'Food', item: 'Processed Food', rate: 12, hsn: '1901-2106', description: 'Packaged food items' },
  
  // 18% GST Items
  { category: 'Food', item: 'Ice Cream', rate: 18, hsn: '2105', description: 'Frozen desserts' },
  { category: 'Food', item: 'Pasta', rate: 18, hsn: '1902', description: 'Pasta and noodles' },
  { category: 'Food', item: 'Biscuits', rate: 18, hsn: '1905', description: 'Branded biscuits' },
  { category: 'Food', item: 'Cakes & Pastries', rate: 18, hsn: '1905', description: 'Bakery items' },
  { category: 'Food', item: 'Chocolates', rate: 18, hsn: '1806', description: 'All chocolates' },
  { category: 'Food', item: 'Cornflakes', rate: 18, hsn: '1904', description: 'Breakfast cereals' },
  { category: 'Food', item: 'Instant Food Mixes', rate: 18, hsn: '2106', description: 'Ready-to-eat foods' },
  { category: 'IT', item: 'Computers', rate: 18, hsn: '8471', description: 'Desktop & laptops' },
  { category: 'IT', item: 'Printers', rate: 18, hsn: '8443', description: 'All printers' },
  { category: 'Electronics', item: 'Cameras', rate: 18, hsn: '8525', description: 'Digital cameras' },
  { category: 'Electronics', item: 'Speakers', rate: 18, hsn: '8518', description: 'Audio speakers' },
  { category: 'Electronics', item: 'Refrigerator', rate: 18, hsn: '8418', description: 'Cooling appliances' },
  { category: 'Electronics', item: 'Washing Machine', rate: 18, hsn: '8450', description: 'Washing appliances' },
  { category: 'Electronics', item: 'Television', rate: 18, hsn: '8528', description: 'TV sets' },
  { category: 'Electronics', item: 'Microwave Oven', rate: 18, hsn: '8516', description: 'Microwave' },
  { category: 'Cosmetics', item: 'Hair Oil', rate: 18, hsn: '3305', description: 'Hair care products' },
  { category: 'Cosmetics', item: 'Face Cream', rate: 18, hsn: '3304', description: 'Skin care' },
  { category: 'Cosmetics', item: 'Lipstick', rate: 18, hsn: '3304', description: 'Beauty products' },
  { category: 'Apparel', item: 'Branded Clothing', rate: 18, hsn: '6101-6217', description: 'Premium clothing' },
  { category: 'Footwear', item: 'Branded Shoes', rate: 18, hsn: '6401-6405', description: 'Premium footwear' },
  { category: 'Services', item: 'Restaurant Services (AC)', rate: 18, hsn: '9963', description: 'AC restaurants' },
  { category: 'Services', item: 'Hotel Services', rate: 18, hsn: '9963', description: 'Hotel accommodation' },
  { category: 'Services', item: 'IT Services', rate: 18, hsn: '998314', description: 'Software services' },
  { category: 'Services', item: 'Telecom Services', rate: 18, hsn: '9997', description: 'Phone/internet' },
  { category: 'Services', item: 'Banking Services', rate: 18, hsn: '997131', description: 'Bank charges' },
  { category: 'Services', item: 'Insurance', rate: 18, hsn: '997132', description: 'Insurance premiums' },
  { category: 'Furniture', item: 'Furniture', rate: 18, hsn: '9401-9404', description: 'Home furniture' },
  { category: 'Other', item: 'Cement', rate: 18, hsn: '2523', description: 'Building cement' },
  { category: 'Other', item: 'Paints', rate: 18, hsn: '3208-3210', description: 'All paints' },
  { category: 'Other', item: 'Soap', rate: 18, hsn: '3401', description: 'Bathing soap' },
  
  // 28% GST Items
  { category: 'Luxury', item: 'Pan Masala', rate: 28, hsn: '2106', description: 'Tobacco products' },
  { category: 'Luxury', item: 'Aerated Drinks', rate: 28, hsn: '2202', description: 'Soft drinks' },
  { category: 'Luxury', item: 'Luxury Cars', rate: 28, hsn: '8703', description: 'Premium vehicles' },
  { category: 'Luxury', item: 'Motorcycles (Above 350cc)', rate: 28, hsn: '8711', description: 'High-end bikes' },
  { category: 'Luxury', item: 'Air Conditioner', rate: 28, hsn: '8415', description: 'Cooling units' },
  { category: 'Luxury', item: 'Dishwasher', rate: 28, hsn: '8422', description: 'Dishwashing machine' },
  { category: 'Luxury', item: 'Cinema Tickets', rate: 28, hsn: '9996', description: 'Movie tickets' },
  { category: 'Luxury', item: 'Amusement Park', rate: 28, hsn: '9996', description: 'Entertainment' },
  { category: 'Luxury', item: 'Chewing Gum', rate: 28, hsn: '1704', description: 'Chewing gum' },
  { category: 'Luxury', item: 'Vacuum Cleaner', rate: 28, hsn: '8508', description: 'Cleaning appliances' },
  { category: 'Luxury', item: 'Perfumes', rate: 28, hsn: '3303', description: 'Fragrances' },
  { category: 'Luxury', item: 'Deodorants', rate: 28, hsn: '3307', description: 'Body sprays' },
  { category: 'Luxury', item: 'Shampoo (Premium)', rate: 28, hsn: '3305', description: 'Hair wash' },
  { category: 'Luxury', item: 'Cement Bricks', rate: 28, hsn: '6810', description: 'Construction' },
  { category: 'Luxury', item: 'Wallpaper', rate: 28, hsn: '4814', description: 'Wall covering' },
  { category: 'Luxury', item: 'Sports Equipment', rate: 28, hsn: '9506', description: 'Sports goods' },
];

const categories = [...new Set(gstSlabData.map(item => item.category))].sort();

export const GSTSlabCalculator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState(gstSlabData);

  useEffect(() => {
    let results = gstSlabData;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(item =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hsn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      results = results.filter(item => item.category === selectedCategory);
    }

    // Filter by rate
    if (selectedRate !== null) {
      results = results.filter(item => item.rate === selectedRate);
    }

    setFilteredItems(results);
  }, [searchTerm, selectedCategory, selectedRate]);

  const getRateColor = (rate: number) => {
    switch (rate) {
      case 0: return 'bg-green-100 text-green-800 border-green-300';
      case 5: return 'bg-blue-100 text-blue-800 border-blue-300';
      case 12: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 18: return 'bg-orange-100 text-orange-800 border-orange-300';
      case 28: return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRateBadgeColor = (rate: number) => {
    switch (rate) {
      case 0: return 'bg-green-500';
      case 5: return 'bg-blue-500';
      case 12: return 'bg-yellow-500';
      case 18: return 'bg-orange-500';
      case 28: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const gstRates = [
    { rate: 0, label: '0% (Exempt)', count: gstSlabData.filter(i => i.rate === 0).length },
    { rate: 5, label: '5%', count: gstSlabData.filter(i => i.rate === 5).length },
    { rate: 12, label: '12%', count: gstSlabData.filter(i => i.rate === 12).length },
    { rate: 18, label: '18%', count: gstSlabData.filter(i => i.rate === 18).length },
    { rate: 28, label: '28%', count: gstSlabData.filter(i => i.rate === 28).length },
  ];

  const clearFilters = () => {
    setSearchTerm('');
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
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              GST Slab Calculator
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Find the applicable GST rate for any product or service in India. 
            Search by item name, category, or HSN code. Updated for 2025.
          </motion.p>
        </div>

        {/* GST Rate Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          {gstRates.map((rate, index) => (
            <motion.button
              key={rate.rate}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedRate(selectedRate === rate.rate ? null : rate.rate)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedRate === rate.rate
                  ? getRateColor(rate.rate) + ' shadow-lg scale-105'
                  : 'bg-white border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <div className={`w-3 h-3 ${getRateBadgeColor(rate.rate)} rounded-full mx-auto mb-2`}></div>
                <div className="font-bold text-2xl">{rate.rate}%</div>
                <div className="text-sm text-gray-600">{rate.count} items</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name, HSN code, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all appearance-none"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== 'All' || selectedRate !== null) && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-600">Active Filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-2">×</button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="ml-2">×</button>
                </span>
              )}
              {selectedRate !== null && (
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center">
                  Rate: {selectedRate}%
                  <button onClick={() => setSelectedRate(null)} className="ml-2">×</button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-purple-600 hover:text-purple-700 font-semibold underline"
              >
                Clear All
              </button>
            </div>
          )}
        </motion.div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-bold text-purple-600">{filteredItems.length}</span> of {gstSlabData.length} items
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${item.item}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-gray-100 hover:border-purple-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Package className="w-6 h-6 text-purple-600 mr-2" />
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full border-2 font-bold ${getRateColor(item.rate)}`}>
                    {item.rate}%
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.item}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Tag className="w-4 h-4 mr-1" />
                    HSN: {item.hsn}
                  </div>
                  {item.rate === 0 && (
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
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
            <Info className="w-6 h-6 mr-2 text-purple-600" />
            GST Slab Calculator - FAQs
          </h2>
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What are the different GST slabs in India?</h3>
              <p className="text-gray-600">
                India has 5 main GST slabs: 0% (exempt items), 5%, 12%, 18%, and 28%. Essential items like food grains are exempt, 
                while luxury items attract 28% GST.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I find the GST rate for my product?</h3>
              <p className="text-gray-600">
                Use our search feature to find your product by name, description, or HSN code. The tool will show you the applicable GST rate 
                along with the HSN classification.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is HSN code?</h3>
              <p className="text-gray-600">
                HSN (Harmonized System of Nomenclature) is an internationally standardized system of names and numbers to classify traded products. 
                In India, HSN codes help determine the GST rate for products.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Which items are exempt from GST?</h3>
              <p className="text-gray-600">
                Essential items like fresh vegetables, fruits, milk, eggs, education services, healthcare services, and agricultural products 
                are exempt from GST (0% rate).
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
              href="https://moneycal.in/tools/gst-amount-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
            >
              <div className="font-medium text-gray-900">GST Amount Calculator</div>
              <div className="text-sm text-gray-600">Calculate GST on any amount</div>
            </a>
            <a
              href="https://moneycal.in/tools/hsn-sac-finder"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
            >
              <div className="font-medium text-gray-900">HSN/SAC Finder</div>
              <div className="text-sm text-gray-600">Find HSN/SAC codes</div>
            </a>
            <a
              href="https://moneycal.in/tools/gst-liability-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
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

export default GSTSlabCalculator;
