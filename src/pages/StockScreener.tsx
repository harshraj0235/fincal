import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Info, BarChart3 } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const StockScreener: React.FC = () => {
  const [filters, setFilters] = useState({
    marketCap: '',
    peRatio: '',
    dividendYield: '',
    sector: '',
    priceRange: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState<any[]>([]);

  // Mock stock data - in real implementation, this would come from an API
  const mockStocks = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      price: 2450.50,
      change: 2.5,
      marketCap: '15.2L Cr',
      peRatio: 18.5,
      dividendYield: 0.8,
      sector: 'Oil & Gas'
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3850.75,
      change: -1.2,
      marketCap: '14.1L Cr',
      peRatio: 25.2,
      dividendYield: 1.2,
      sector: 'IT'
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank',
      price: 1650.25,
      change: 0.8,
      marketCap: '9.8L Cr',
      peRatio: 22.1,
      dividendYield: 1.5,
      sector: 'Banking'
    },
    {
      symbol: 'INFY',
      name: 'Infosys',
      price: 1450.80,
      change: 1.5,
      marketCap: '6.2L Cr',
      peRatio: 20.8,
      dividendYield: 2.1,
      sector: 'IT'
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank',
      price: 950.45,
      change: -0.5,
      marketCap: '6.8L Cr',
      peRatio: 16.2,
      dividendYield: 0.9,
      sector: 'Banking'
    }
  ];

  const applyFilters = () => {
    let filtered = mockStocks;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply market cap filter
    if (filters.marketCap) {
      // Simplified filtering logic
      filtered = filtered.filter(stock => stock.marketCap.includes(filters.marketCap));
    }

    // Apply sector filter
    if (filters.sector) {
      filtered = filtered.filter(stock => stock.sector === filters.sector);
    }

    setFilteredStocks(filtered);
  };

  const resetFilters = () => {
    setFilters({
      marketCap: '',
      peRatio: '',
      dividendYield: '',
      sector: '',
      priceRange: ''
    });
    setSearchTerm('');
    setFilteredStocks([]);
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Stock Screener - Advanced Stock Filtering Tool | MoneyCal.in"
        description="Filter stocks according to your strategy. Advanced stock screener with market cap, P/E ratio, dividend yield, and sector filters for investment analysis."
        keywords="stock screener, stock filter, stock analysis, market cap filter, PE ratio filter, dividend yield filter, stock screening tool"
        url="/calculators/stock-screener"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Stock Screener</h1>
            <p className="text-xl text-gray-600">Filter stocks according to your investment strategy</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-green-600" />
                  Filters
                </h2>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Stocks
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by symbol or name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Market Cap */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Market Cap
                    </label>
                    <select
                      value={filters.marketCap}
                      onChange={(e) => setFilters({...filters, marketCap: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">All Market Caps</option>
                      <option value="Large">Large Cap (&gt;20,000 Cr)</option>
                      <option value="Mid">Mid Cap (5,000-20,000 Cr)</option>
                      <option value="Small">Small Cap (&lt;5,000 Cr)</option>
                    </select>
                  </div>

                  {/* P/E Ratio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      P/E Ratio Range
                    </label>
                    <select
                      value={filters.peRatio}
                      onChange={(e) => setFilters({...filters, peRatio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">All P/E Ratios</option>
                      <option value="low">Low (&lt;15)</option>
                      <option value="medium">Medium (15-25)</option>
                      <option value="high">High (&gt;25)</option>
                    </select>
                  </div>

                  {/* Dividend Yield */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dividend Yield
                    </label>
                    <select
                      value={filters.dividendYield}
                      onChange={(e) => setFilters({...filters, dividendYield: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">All Dividend Yields</option>
                      <option value="high">High (&gt;3%)</option>
                      <option value="medium">Medium (1-3%)</option>
                      <option value="low">Low (&lt;1%)</option>
                    </select>
                  </div>

                  {/* Sector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sector
                    </label>
                    <select
                      value={filters.sector}
                      onChange={(e) => setFilters({...filters, sector: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">All Sectors</option>
                      <option value="IT">Information Technology</option>
                      <option value="Banking">Banking</option>
                      <option value="Oil & Gas">Oil & Gas</option>
                      <option value="Pharma">Pharmaceuticals</option>
                      <option value="Auto">Automobile</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">All Prices</option>
                      <option value="low">Low (&lt;500)</option>
                      <option value="medium">Medium (500-1000)</option>
                      <option value="high">High (&gt;1000)</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={applyFilters}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    Stock Results
                  </h2>
                  <span className="text-sm text-gray-600">
                    {filteredStocks.length > 0 ? `${filteredStocks.length} stocks found` : 'No filters applied'}
                  </span>
                </div>

                {filteredStocks.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Change
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Market Cap
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            P/E Ratio
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dividend Yield
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sector
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStocks.map((stock, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                                <div className="text-sm text-gray-500">{stock.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₹{stock.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stock.change >= 0 ? '+' : ''}{stock.change}%
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {stock.marketCap}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {stock.peRatio}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {stock.dividendYield}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {stock.sector}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search criteria</p>
                  </div>
                )}
              </div>

              {/* Information Section */}
              <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-purple-600" />
                  How to Use Stock Screener
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Filter Options:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Market Cap:</strong> Filter by company size</li>
                      <li>• <strong>P/E Ratio:</strong> Find undervalued or growth stocks</li>
                      <li>• <strong>Dividend Yield:</strong> Identify income-generating stocks</li>
                      <li>• <strong>Sector:</strong> Focus on specific industries</li>
                      <li>• <strong>Price Range:</strong> Filter by stock price</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Investment Strategies:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Value Investing:</strong> Low P/E, high dividend yield</li>
                      <li>• <strong>Growth Investing:</strong> High P/E, low dividend yield</li>
                      <li>• <strong>Dividend Investing:</strong> High dividend yield stocks</li>
                      <li>• <strong>Large Cap:</strong> Stable, established companies</li>
                      <li>• <strong>Small Cap:</strong> High growth potential</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockScreener;
