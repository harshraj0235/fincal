import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3,
  Calculator, 
  DollarSign,
  PieChart, 
  LineChart, 
  Activity,
  Info,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Star,
  Search,
  Filter
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface MutualFund {
  name: string;
  category: string;
  starRating: number;
  nav: number;
  expenseRatio: number;
  aum: number;
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  fundHouse: string;
  minInvestment: number;
  exitLoad: number;
  rating: number;
  performance: {
    year1: number;
    year3: number;
    year5: number;
    sinceInception: number;
  };
}

const MutualFundStarRatingsExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [selectedRisk, setSelectedRisk] = useState('All Risk Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('starRating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);

  const mutualFunds: MutualFund[] = [
    {
      name: 'HDFC Mid-Cap Opportunities Fund',
      category: 'Mid Cap',
      starRating: 5,
      nav: 45.67,
      expenseRatio: 1.85,
      aum: 25000,
      returns1Y: 18.5,
      returns3Y: 22.3,
      returns5Y: 19.8,
      riskLevel: 'High',
      fundHouse: 'HDFC Mutual Fund',
      minInvestment: 5000,
      exitLoad: 1,
      rating: 4.8,
      performance: {
        year1: 18.5,
        year3: 22.3,
        year5: 19.8,
        sinceInception: 15.2
      }
    },
    {
      name: 'Axis Bluechip Fund',
      category: 'Large Cap',
      starRating: 5,
      nav: 32.45,
      expenseRatio: 1.75,
      aum: 18000,
      returns1Y: 15.2,
      returns3Y: 18.9,
      returns5Y: 16.5,
      riskLevel: 'Moderate',
      fundHouse: 'Axis Mutual Fund',
      minInvestment: 5000,
      exitLoad: 1,
      rating: 4.7,
      performance: {
        year1: 15.2,
        year3: 18.9,
        year5: 16.5,
        sinceInception: 14.8
      }
    },
    {
      name: 'SBI Small Cap Fund',
      category: 'Small Cap',
      starRating: 4,
      nav: 28.90,
      expenseRatio: 1.95,
      aum: 8500,
      returns1Y: 25.8,
      returns3Y: 28.5,
      returns5Y: 24.2,
      riskLevel: 'High',
      fundHouse: 'SBI Mutual Fund',
      minInvestment: 5000,
      exitLoad: 1,
      rating: 4.2,
      performance: {
        year1: 25.8,
        year3: 28.5,
        year5: 24.2,
        sinceInception: 20.1
      }
    },
    {
      name: 'ICICI Prudential Balanced Advantage Fund',
      category: 'Balanced',
      starRating: 4,
      nav: 38.20,
      expenseRatio: 1.65,
      aum: 12000,
      returns1Y: 12.5,
      returns3Y: 15.8,
      returns5Y: 14.2,
      riskLevel: 'Moderate',
      fundHouse: 'ICICI Prudential Mutual Fund',
      minInvestment: 5000,
      exitLoad: 1,
      rating: 4.1,
      performance: {
        year1: 12.5,
        year3: 15.8,
        year5: 14.2,
        sinceInception: 13.5
      }
    },
    {
      name: 'Kotak Emerging Equity Fund',
      category: 'Mid Cap',
      starRating: 4,
      nav: 42.15,
      expenseRatio: 1.80,
      aum: 9500,
      returns1Y: 20.3,
      returns3Y: 24.1,
      returns5Y: 21.5,
      riskLevel: 'High',
      fundHouse: 'Kotak Mutual Fund',
      minInvestment: 5000,
      exitLoad: 1,
      rating: 4.3,
      performance: {
        year1: 20.3,
        year3: 24.1,
        year5: 21.5,
        sinceInception: 18.9
      }
    },
    {
      name: 'Nippon India Large Cap Fund',
      category: 'Large Cap',
      starRating: 3,
      nav: 35.80,
      expenseRatio: 1.70,
      aum: 15000,
      returns1Y: 13.8,
      returns3Y: 16.5,
      returns5Y: 15.2,
      riskLevel: 'Moderate',
      fundHouse: 'Nippon India Mutual Fund',
      minInvestment: 5000,
      exitLoad: 1,
      rating: 3.8,
      performance: {
        year1: 13.8,
        year3: 16.5,
        year5: 15.2,
        sinceInception: 14.1
      }
    }
  ];

  const categories = ['All Categories', 'Large Cap', 'Mid Cap', 'Small Cap', 'Balanced', 'Multi Cap'];
  const ratings = ['All Ratings', '5 Star', '4 Star', '3 Star', '2 Star', '1 Star'];
  const riskLevels = ['All Risk Levels', 'Low', 'Moderate', 'High'];

  const filteredFunds = mutualFunds.filter(fund => {
    const matchesCategory = selectedCategory === 'All Categories' || fund.category === selectedCategory;
    const matchesRating = selectedRating === 'All Ratings' || 
      (selectedRating === '5 Star' && fund.starRating === 5) ||
      (selectedRating === '4 Star' && fund.starRating === 4) ||
      (selectedRating === '3 Star' && fund.starRating === 3) ||
      (selectedRating === '2 Star' && fund.starRating === 2) ||
      (selectedRating === '1 Star' && fund.starRating === 1);
    const matchesRisk = selectedRisk === 'All Risk Levels' || fund.riskLevel === selectedRisk;
    const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fund.fundHouse.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesRating && matchesRisk && matchesSearch;
  });

  const sortedFunds = [...filteredFunds].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'starRating':
        aValue = a.starRating;
        bValue = b.starRating;
        break;
      case 'returns1Y':
        aValue = a.returns1Y;
        bValue = b.returns1Y;
        break;
      case 'returns3Y':
        aValue = a.returns3Y;
        bValue = b.returns3Y;
        break;
      case 'expenseRatio':
        aValue = a.expenseRatio;
        bValue = b.expenseRatio;
        break;
      case 'aum':
        aValue = a.aum;
        bValue = b.aum;
        break;
      default:
        aValue = a.starRating;
        bValue = b.starRating;
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <>
      <SEOHelmet
        title="Mutual Fund Star Ratings Explorer - Find Top Rated Mutual Funds | MoneyCal"
        description="Explore mutual funds by star ratings, performance, and risk levels. Compare top-rated funds, analyze returns, and make informed investment decisions with our comprehensive mutual fund explorer."
        keywords="mutual fund star ratings, top mutual funds, fund comparison, mutual fund performance, fund ratings, best mutual funds India, fund analysis"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Mutual Fund Star Ratings Explorer
              </h1>
              <p className="text-xl text-yellow-100 mb-8 max-w-3xl mx-auto">
                Explore and compare mutual funds by star ratings, performance metrics, and risk levels. 
                Find the best-rated funds for your investment portfolio with comprehensive analysis.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-yellow-100">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Star Ratings
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Analysis
                </div>
                <div className="flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Fund Comparison
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Filter className="h-6 w-6 mr-3 text-yellow-600" />
                Fund Filters & Search
                </h2>
                
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Star Rating</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {ratings.map((rating) => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                  </div>
                  
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                  <select
                    value={selectedRisk}
                    onChange={(e) => setSelectedRisk(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {riskLevels.map((risk) => (
                      <option key={risk} value={risk}>{risk}</option>
                    ))}
                  </select>
                  </div>
                  
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Funds</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name or fund house..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="starRating">Star Rating</option>
                    <option value="returns1Y">1 Year Returns</option>
                    <option value="returns3Y">3 Year Returns</option>
                    <option value="expenseRatio">Expense Ratio</option>
                    <option value="aum">AUM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <span className="text-sm text-gray-600">
                    Showing {sortedFunds.length} of {mutualFunds.length} funds
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Funds List */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              {sortedFunds.map((fund, index) => (
                <motion.div
                  key={fund.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedFund(fund)}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      {/* Fund Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{fund.name}</h3>
                            <p className="text-sm text-gray-600">{fund.fundHouse}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {renderStars(fund.starRating)}
                            <span className="text-sm font-medium text-gray-700">({fund.starRating} Star)</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Category</p>
                            <p className="font-semibold text-gray-900">{fund.category}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">NAV</p>
                            <p className="font-semibold text-gray-900">₹{fund.nav}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">AUM (Cr)</p>
                            <p className="font-semibold text-gray-900">₹{fund.aum}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Risk Level</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(fund.riskLevel)}`}>
                              {fund.riskLevel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Returns */}
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-xs text-gray-600">1Y Return</p>
                            <p className={`font-bold ${fund.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {fund.returns1Y}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">3Y Return</p>
                            <p className={`font-bold ${fund.returns3Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {fund.returns3Y}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">5Y Return</p>
                            <p className={`font-bold ${fund.returns5Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {fund.returns5Y}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              </motion.div>
          </div>
        </section>

        {/* Fund Details Modal */}
        {selectedFund && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedFund.name}</h2>
                <button
                  onClick={() => setSelectedFund(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <AlertCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Fund Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fund House:</span>
                      <span className="font-semibold">{selectedFund.fundHouse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold">{selectedFund.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">NAV:</span>
                      <span className="font-semibold">₹{selectedFund.nav}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AUM:</span>
                      <span className="font-semibold">₹{selectedFund.aum} Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Investment:</span>
                      <span className="font-semibold">₹{selectedFund.minInvestment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exit Load:</span>
                      <span className="font-semibold">{selectedFund.exitLoad}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance & Ratings</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Star Rating:</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedFund.starRating)}
                        <span className="ml-2 font-semibold">({selectedFund.starRating}/5)</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Level:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedFund.riskLevel)}`}>
                        {selectedFund.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expense Ratio:</span>
                      <span className="font-semibold">{selectedFund.expenseRatio}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">1Y Return:</span>
                      <span className={`font-semibold ${selectedFund.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedFund.returns1Y}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">3Y Return:</span>
                      <span className={`font-semibold ${selectedFund.returns3Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedFund.returns3Y}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">5Y Return:</span>
                      <span className={`font-semibold ${selectedFund.returns5Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedFund.returns5Y}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Recommendation</h3>
                <p className="text-gray-700">
                  {selectedFund.starRating >= 4 
                    ? `This ${selectedFund.category} fund has excellent ratings and strong performance. Consider for long-term investment.`
                    : selectedFund.starRating >= 3
                    ? `This fund shows decent performance but consider comparing with higher-rated alternatives.`
                    : 'This fund has lower ratings. Consider exploring other options with better performance.'
                  }
                </p>
                </div>
              </motion.div>
            </div>
        )}

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Mutual Fund Star Ratings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-600" />
                    5-Star Funds
                  </h3>
                  <p className="text-gray-700">
                    Top-performing funds with excellent track records, strong risk-adjusted returns, and consistent performance across market cycles.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-orange-600" />
                    4-Star Funds
                  </h3>
                  <p className="text-gray-700">
                    Above-average performers with good risk-adjusted returns and solid track records, suitable for most investors.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-blue-600" />
                    3-Star Funds
                  </h3>
                  <p className="text-gray-700">
                    Average performers with moderate risk-adjusted returns. Consider alternatives with better ratings.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-gray-600" />
                    1-2 Star Funds
                  </h3>
                  <p className="text-gray-700">
                    Below-average performers with poor risk-adjusted returns. Generally not recommended for investment.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Key Factors in Star Ratings
                </h3>
                <div className="space-y-4 text-yellow-700">
                  <p>
                    <strong>Risk-Adjusted Returns:</strong> How well the fund performs relative to the risk it takes.
                  </p>
                  <p>
                    <strong>Consistency:</strong> Steady performance across different market conditions and time periods.
                  </p>
                  <p>
                    <strong>Expense Ratio:</strong> Lower expense ratios generally lead to better net returns.
                  </p>
                  <p>
                    <strong>Fund Manager Track Record:</strong> Experience and past performance of the fund management team.
                  </p>
                  <p>
                    <strong>Fund House Reputation:</strong> Overall credibility and track record of the mutual fund house.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Investment Tips
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Diversify:</strong> Don't put all your money in one fund, even if it's 5-star rated.
                  </p>
                  <p>
                    <strong>Long-term Perspective:</strong> Star ratings can change, focus on long-term performance.
                  </p>
                  <p>
                    <strong>Risk Assessment:</strong> Consider your risk tolerance alongside star ratings.
                  </p>
                  <p>
                    <strong>Regular Review:</strong> Monitor your investments and rebalance as needed.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MutualFundStarRatingsExplorer;