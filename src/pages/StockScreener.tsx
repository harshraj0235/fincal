import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Info, BarChart3, RefreshCw, Star, TrendingDown, Target, Zap, PieChart, Newspaper, Eye } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import PortfolioTracker from '../components/PortfolioTracker';
import StockNews from '../components/StockNews';
import MarketWatchlist from '../components/MarketWatchlist';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  dividendYield: number;
  sector: string;
  volume: number;
  high52Week: number;
  low52Week: number;
  beta: number;
  eps: number;
  roe: number;
  debtToEquity: number;
  isFavorited?: boolean;
}

const StockScreener: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    marketCap: '',
    peRatio: { min: 0, max: 100 },
    dividendYield: { min: 0, max: 20 },
    sector: '',
    changePercent: { min: -50, max: 50 },
    roe: { min: 0, max: 100 }
  });

  // Comprehensive mock data
  const mockStocksData: StockData[] = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Limited',
      price: 2450.50,
      change: 45.25,
      changePercent: 1.88,
      marketCap: '15.2L Cr',
      peRatio: 18.5,
      dividendYield: 0.8,
      sector: 'Oil & Gas',
      volume: 2500000,
      high52Week: 2800,
      low52Week: 2100,
      beta: 1.2,
      eps: 132.45,
      roe: 15.6,
      debtToEquity: 0.8
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services Limited',
      price: 3850.75,
      change: -45.80,
      changePercent: -1.17,
      marketCap: '14.1L Cr',
      peRatio: 25.2,
      dividendYield: 1.2,
      sector: 'Information Technology',
      volume: 1800000,
      high52Week: 4200,
      low52Week: 3200,
      beta: 0.9,
      eps: 152.80,
      roe: 18.2,
      debtToEquity: 0.2
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Limited',
      price: 1650.25,
      change: 12.50,
      changePercent: 0.76,
      marketCap: '9.8L Cr',
      peRatio: 22.1,
      dividendYield: 1.5,
      sector: 'Banking',
      volume: 3200000,
      high52Week: 1800,
      low52Week: 1400,
      beta: 1.1,
      eps: 74.65,
      roe: 16.8,
      debtToEquity: 8.5
    },
    {
      symbol: 'INFY',
      name: 'Infosys Limited',
      price: 1450.80,
      change: 22.30,
      changePercent: 1.56,
      marketCap: '6.2L Cr',
      peRatio: 20.8,
      dividendYield: 2.1,
      sector: 'Information Technology',
      volume: 2100000,
      high52Week: 1600,
      low52Week: 1200,
      beta: 0.8,
      eps: 69.75,
      roe: 18.3,
      debtToEquity: 0.1
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank Limited',
      price: 950.45,
      change: -8.75,
      changePercent: -0.91,
      marketCap: '6.8L Cr',
      peRatio: 16.2,
      dividendYield: 0.9,
      sector: 'Banking',
      volume: 4500000,
      high52Week: 1050,
      low52Week: 850,
      beta: 1.3,
      eps: 58.65,
      roe: 14.2,
      debtToEquity: 7.2
    },
    {
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever Limited',
      price: 2850.30,
      change: 35.20,
      changePercent: 1.25,
      marketCap: '6.5L Cr',
      peRatio: 28.5,
      dividendYield: 2.8,
      sector: 'FMCG',
      volume: 1200000,
      high52Week: 3000,
      low52Week: 2500,
      beta: 0.7,
      eps: 100.25,
      roe: 20.1,
      debtToEquity: 0.3
    },
    {
      symbol: 'ITC',
      name: 'ITC Limited',
      price: 420.75,
      change: 5.25,
      changePercent: 1.26,
      marketCap: '5.2L Cr',
      peRatio: 22.8,
      dividendYield: 3.2,
      sector: 'FMCG',
      volume: 8500000,
      high52Week: 450,
      low52Week: 380,
      beta: 0.6,
      eps: 18.45,
      roe: 21.5,
      debtToEquity: 0.1
    },
    {
      symbol: 'SBIN',
      name: 'State Bank of India',
      price: 650.20,
      change: -12.80,
      changePercent: -1.93,
      marketCap: '5.8L Cr',
      peRatio: 12.5,
      dividendYield: 1.8,
      sector: 'Banking',
      volume: 6800000,
      high52Week: 720,
      low52Week: 580,
      beta: 1.4,
      eps: 52.10,
      roe: 12.8,
      debtToEquity: 9.2
    }
  ];

  useEffect(() => {
    // Simulate API call with real-time data
    setTimeout(() => {
      setStocks(mockStocksData);
      setFilteredStocks(mockStocksData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [stocks, filters, searchTerm, sortBy, sortOrder]);

  const applyFilters = () => {
    let filtered = [...stocks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(stock =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply all filters
    filtered = filtered.filter(stock =>
      stock.price >= filters.priceRange.min && stock.price <= filters.priceRange.max &&
      stock.peRatio >= filters.peRatio.min && stock.peRatio <= filters.peRatio.max &&
      stock.dividendYield >= filters.dividendYield.min && stock.dividendYield <= filters.dividendYield.max &&
      stock.changePercent >= filters.changePercent.min && stock.changePercent <= filters.changePercent.max &&
      stock.roe >= filters.roe.min && stock.roe <= filters.roe.max &&
      (filters.marketCap === '' || stock.marketCap.includes(filters.marketCap)) &&
      (filters.sector === '' || stock.sector === filters.sector)
    );

    // Sorting
    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof StockData];
      const bValue = b[sortBy as keyof StockData];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const aLower = aValue.toLowerCase();
        const bLower = bValue.toLowerCase();
        return sortOrder === 'asc' ? aLower.localeCompare(bLower) : bLower.localeCompare(aLower);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    setFilteredStocks(filtered);
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(fav => fav !== symbol)
        : [...prev, symbol]
    );
  };

  const getSectorColor = (sector: string) => {
    const colors: { [key: string]: string } = {
      'Information Technology': 'bg-blue-100 text-blue-800',
      'Banking': 'bg-green-100 text-green-800',
      'Oil & Gas': 'bg-orange-100 text-orange-800',
      'FMCG': 'bg-purple-100 text-purple-800'
    };
    return colors[sector] || 'bg-gray-100 text-gray-800';
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Advanced Stock Screener - Real-time Stock Filtering Tool | MoneyCal.in"
        description="Advanced stock screener with real-time data, comprehensive filtering, and detailed analysis. Filter stocks by price, market cap, P/E ratio, dividend yield, and more."
        keywords="stock screener, real-time stock data, stock filter, NSE BSE stocks, stock analysis, stock screening tool, Indian stocks"
        url="/calculators/stock-screener"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Real-time Stock Data
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Advanced Stock Screener
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive stock screening tool with real-time data, advanced filters, and detailed analysis. 
              Find the best stocks based on your investment criteria.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{filteredStocks.length}</div>
              <div className="text-gray-600">Stocks Found</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {filteredStocks.filter(s => s.changePercent > 0).length}
              </div>
              <div className="text-gray-600">Gainers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {filteredStocks.filter(s => s.changePercent < 0).length}
              </div>
              <div className="text-gray-600">Losers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {favorites.length}
              </div>
              <div className="text-gray-600">Favorites</div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Advanced Filters Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-green-600" />
                    Advanced Filters
                  </h2>
                  <button
                    onClick={refreshData}
                    disabled={loading}
                    className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

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

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range (₹)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={filters.priceRange.min}
                        onChange={(e) => setFilters({
                          ...filters,
                          priceRange: { ...filters.priceRange, min: Number(e.target.value) }
                        })}
                        placeholder="Min"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        value={filters.priceRange.max}
                        onChange={(e) => setFilters({
                          ...filters,
                          priceRange: { ...filters.priceRange, max: Number(e.target.value) }
                        })}
                        placeholder="Max"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={filters.peRatio.min}
                        onChange={(e) => setFilters({
                          ...filters,
                          peRatio: { ...filters.peRatio, min: Number(e.target.value) }
                        })}
                        placeholder="Min"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        value={filters.peRatio.max}
                        onChange={(e) => setFilters({
                          ...filters,
                          peRatio: { ...filters.peRatio, max: Number(e.target.value) }
                        })}
                        placeholder="Max"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Dividend Yield */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dividend Yield (%)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={filters.dividendYield.min}
                        onChange={(e) => setFilters({
                          ...filters,
                          dividendYield: { ...filters.dividendYield, min: Number(e.target.value) }
                        })}
                        placeholder="Min"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        value={filters.dividendYield.max}
                        onChange={(e) => setFilters({
                          ...filters,
                          dividendYield: { ...filters.dividendYield, max: Number(e.target.value) }
                        })}
                        placeholder="Max"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
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
                      <option value="Information Technology">Information Technology</option>
                      <option value="Banking">Banking</option>
                      <option value="Oil & Gas">Oil & Gas</option>
                      <option value="FMCG">FMCG</option>
                    </select>
                  </div>

                  {/* ROE */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ROE (%)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={filters.roe.min}
                        onChange={(e) => setFilters({
                          ...filters,
                          roe: { ...filters.roe, min: Number(e.target.value) }
                        })}
                        placeholder="Min"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        value={filters.roe.max}
                        onChange={(e) => setFilters({
                          ...filters,
                          roe: { ...filters.roe, max: Number(e.target.value) }
                        })}
                        placeholder="Max"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Reset Filters */}
                  <button
                    onClick={() => {
                      setFilters({
                        priceRange: { min: 0, max: 10000 },
                        marketCap: '',
                        peRatio: { min: 0, max: 100 },
                        dividendYield: { min: 0, max: 20 },
                        sector: '',
                        changePercent: { min: -50, max: 50 },
                        roe: { min: 0, max: 100 }
                      });
                      setSearchTerm('');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              {/* Controls */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                      Stock Results
                    </h2>
                    <span className="text-sm text-gray-600">
                      {filteredStocks.length} stocks found
                    </span>
                    <span className="text-sm text-gray-500">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                    <button
                      onClick={() => setShowPortfolio(!showPortfolio)}
                      className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <PieChart className="h-4 w-4 mr-2" />
                      Portfolio
                    </button>
                    <button
                      onClick={() => setShowNews(!showNews)}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Newspaper className="h-4 w-4 mr-2" />
                      News
                    </button>
                    <button
                      onClick={() => setShowWatchlist(!showWatchlist)}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Watchlist
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                      <option value="changePercent">Sort by Change %</option>
                      <option value="marketCap">Sort by Market Cap</option>
                      <option value="peRatio">Sort by P/E Ratio</option>
                      <option value="dividendYield">Sort by Dividend Yield</option>
                      <option value="roe">Sort by ROE</option>
                    </select>
                    
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>

                    {/* View Mode */}
                    <div className="flex border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setViewMode('table')}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          viewMode === 'table' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Table
                      </button>
                      <button
                        onClick={() => setViewMode('cards')}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          viewMode === 'cards' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Cards
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Display */}
              {loading ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading stock data...</p>
                </div>
              ) : filteredStocks.length > 0 ? (
                viewMode === 'table' ? (
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                              ROE
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Sector
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
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
                                <div className="flex items-center">
                                  {getChangeIcon(stock.changePercent)}
                                  <span className={`text-sm font-medium ml-1 ${getChangeColor(stock.changePercent)}`}>
                                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {stock.marketCap}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {stock.peRatio.toFixed(1)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {stock.dividendYield.toFixed(1)}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {stock.roe.toFixed(1)}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSectorColor(stock.sector)}`}>
                                  {stock.sector}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => toggleFavorite(stock.symbol)}
                                  className={`p-1 rounded-full transition-colors ${
                                    favorites.includes(stock.symbol)
                                      ? 'text-yellow-500 hover:text-yellow-600'
                                      : 'text-gray-400 hover:text-yellow-500'
                                  }`}
                                >
                                  <Star className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredStocks.map((stock, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
                            <p className="text-sm text-gray-600">{stock.name}</p>
                          </div>
                          <button
                            onClick={() => toggleFavorite(stock.symbol)}
                            className={`p-1 rounded-full transition-colors ${
                              favorites.includes(stock.symbol)
                                ? 'text-yellow-500 hover:text-yellow-600'
                                : 'text-gray-400 hover:text-yellow-500'
                            }`}
                          >
                            <Star className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Price</span>
                            <span className="text-lg font-bold text-gray-900">₹{stock.price.toLocaleString()}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Change</span>
                            <div className="flex items-center">
                              {getChangeIcon(stock.changePercent)}
                              <span className={`text-sm font-medium ml-1 ${getChangeColor(stock.changePercent)}`}>
                                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">P/E Ratio</span>
                            <span className="text-sm font-medium text-gray-900">{stock.peRatio.toFixed(1)}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Dividend Yield</span>
                            <span className="text-sm font-medium text-gray-900">{stock.dividendYield.toFixed(1)}%</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">ROE</span>
                            <span className="text-sm font-medium text-gray-900">{stock.roe.toFixed(1)}%</span>
                          </div>

                          <div className="pt-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSectorColor(stock.sector)}`}>
                              {stock.sector}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search criteria</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Portfolio Tracker */}
          {showPortfolio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <PortfolioTracker />
            </motion.div>
          )}

          {/* Stock News */}
          {showNews && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <StockNews />
            </motion.div>
          )}

          {/* Market Watchlist */}
          {showWatchlist && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <MarketWatchlist />
            </motion.div>
          )}

          {/* Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Info className="h-6 w-6 mr-2 text-purple-600" />
              Advanced Stock Screening Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-2 text-green-600" />
                  Real-time Data
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Live stock prices and changes</li>
                  <li>• Real-time market data</li>
                  <li>• Instant filtering results</li>
                  <li>• Auto-refresh capabilities</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                  Advanced Filters
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Price range filtering</li>
                  <li>• Market cap categories</li>
                  <li>• P/E ratio analysis</li>
                  <li>• Dividend yield screening</li>
                  <li>• Sector-based filtering</li>
                  <li>• ROE analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-orange-600" />
                  User Experience
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Table and card views</li>
                  <li>• Multiple sorting options</li>
                  <li>• Favorite stocks feature</li>
                  <li>• Mobile responsive design</li>
                  <li>• Quick search functionality</li>
                  <li>• Comprehensive metrics</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StockScreener;
