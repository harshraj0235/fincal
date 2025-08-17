import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  DollarSign,
  BarChart3,
  Calendar,
  Target,
  TrendingDown,
  Activity
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface IndexData {
  id: string;
  name: string;
  currentValue: number;
  previousValue: number;
  date: string;
  color: string;
}

const NiftyVsSensexPerformanceTracker: React.FC = () => {
  const [indices, setIndices] = useState<IndexData[]>([
    {
      id: '1',
      name: 'Nifty 50',
      currentValue: 22500,
      previousValue: 22000,
      date: '2025-01-15',
      color: '#3B82F6'
    },
    {
      id: '2',
      name: 'Sensex',
      currentValue: 74000,
      previousValue: 72000,
      date: '2025-01-15',
      color: '#10B981'
    }
  ]);

  const [newIndex, setNewIndex] = useState({
    name: '',
    currentValue: 0,
    previousValue: 0,
    date: ''
  });

  const addIndex = () => {
    if (newIndex.name && newIndex.currentValue > 0 && newIndex.previousValue > 0) {
      const index: IndexData = {
        id: Date.now().toString(),
        name: newIndex.name,
        currentValue: newIndex.currentValue,
        previousValue: newIndex.previousValue,
        date: newIndex.date,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      };
      setIndices([...indices, index]);
      setNewIndex({
        name: '',
        currentValue: 0,
        previousValue: 0,
        date: ''
      });
    }
  };

  const removeIndex = (id: string) => {
    setIndices(indices.filter(index => index.id !== id));
  };

  const calculatePerformance = (index: IndexData) => {
    const change = index.currentValue - index.previousValue;
    const changePercent = (change / index.previousValue) * 100;
    const isPositive = change >= 0;
    
    return {
      change,
      changePercent,
      isPositive
    };
  };

  const calculatePortfolioMetrics = () => {
    const totalChange = indices.reduce((sum, index) => {
      const perf = calculatePerformance(index);
      return sum + perf.change;
    }, 0);

    const averageChangePercent = indices.length > 0 ? 
      indices.reduce((sum, index) => {
        const perf = calculatePerformance(index);
        return sum + perf.changePercent;
      }, 0) / indices.length : 0;

    const bestPerformer = indices.length > 0 ? 
      indices.reduce((best, current) => {
        const bestPerf = calculatePerformance(best);
        const currentPerf = calculatePerformance(current);
        return currentPerf.changePercent > bestPerf.changePercent ? current : best;
      }) : null;

    const worstPerformer = indices.length > 0 ? 
      indices.reduce((worst, current) => {
        const worstPerf = calculatePerformance(worst);
        const currentPerf = calculatePerformance(current);
        return currentPerf.changePercent < worstPerf.changePercent ? current : worst;
      }) : null;

    return {
      totalChange,
      averageChangePercent,
      bestPerformer,
      worstPerformer
    };
  };

  const result = calculatePortfolioMetrics();

  return (
    <>
      <SEOHelmet
        title="Nifty vs Sensex Performance Tracker - Compare Market Indices | MoneyCal"
        description="Track and compare the performance of Nifty 50 vs Sensex indices. Analyze market trends and index performance with our comprehensive tracker."
        keywords="nifty vs sensex, market indices comparison, nifty 50 tracker, sensex tracker, market performance, index comparison"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-indigo-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Nifty vs Sensex Performance Tracker
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Track and compare the performance of market indices
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-indigo-600" />
                  Add Market Index
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Index Name
                    </label>
                    <input
                      type="text"
                      value={newIndex.name}
                      onChange={(e) => setNewIndex({...newIndex, name: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                      placeholder="e.g., Nifty 50, Sensex, Bank Nifty"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Value
                      </label>
                      <input
                        type="number"
                        value={newIndex.currentValue}
                        onChange={(e) => setNewIndex({...newIndex, currentValue: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                        placeholder="22500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Previous Value
                      </label>
                      <input
                        type="number"
                        value={newIndex.previousValue}
                        onChange={(e) => setNewIndex({...newIndex, previousValue: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                        placeholder="22000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newIndex.date}
                      onChange={(e) => setNewIndex({...newIndex, date: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>

                  <button
                    onClick={addIndex}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base"
                  >
                    Add Index
                  </button>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                {/* Market Summary */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Market Performance</h3>
                    <Activity className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">
                        {result.averageChangePercent >= 0 ? '+' : ''}{result.averageChangePercent.toFixed(2)}%
                      </div>
                      <p className="text-indigo-100 text-sm">Average Change</p>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">
                        {result.totalChange >= 0 ? '+' : ''}{result.totalChange.toLocaleString()}
                      </div>
                      <p className="text-indigo-100 text-sm">Total Change</p>
                    </div>
                  </div>
                  <div className="mt-4 p-2 rounded-lg text-sm bg-indigo-500/20">
                    Tracking {indices.length} market indices
                  </div>
                </div>

                {/* Best/Worst Performers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Best Performer</h4>
                    </div>
                    {result.bestPerformer ? (
                      <>
                        <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                          {result.bestPerformer.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {calculatePerformance(result.bestPerformer).changePercent.toFixed(2)}% gain
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-500">No data available</div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <TrendingDown className="h-4 w-4 md:h-5 md:w-5 text-red-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Worst Performer</h4>
                    </div>
                    {result.worstPerformer ? (
                      <>
                        <div className="text-lg md:text-2xl font-bold text-red-600 mb-1">
                          {result.worstPerformer.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {calculatePerformance(result.worstPerformer).changePercent.toFixed(2)}% change
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-500">No data available</div>
                    )}
                  </div>
                </div>

                {/* Index List */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-600" />
                    Market Indices ({indices.length})
                  </h4>
                  <div className="space-y-3">
                    {indices.map((index) => {
                      const perf = calculatePerformance(index);
                      
                      return (
                        <div key={index.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-3" 
                                style={{ backgroundColor: index.color }}
                              ></div>
                              <div>
                                <div className="font-medium text-sm">{index.name}</div>
                                <div className="text-xs text-gray-500">{new Date(index.date).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeIndex(index.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <span className="text-gray-600">Current:</span>
                              <span className="font-semibold ml-1">{index.currentValue.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Previous:</span>
                              <span className="font-semibold ml-1">{index.previousValue.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Change:</span>
                              <span className={`font-semibold ml-1 ${perf.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {perf.isPositive ? '+' : ''}{perf.changePercent.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 text-xs">
                            <span className="text-gray-600">Absolute Change:</span>
                            <span className={`font-semibold ml-1 ${perf.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {perf.isPositive ? '+' : ''}{perf.change.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {indices.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No market indices added yet
                      </div>
                    )}
                  </div>
                </div>

                {/* Market Insights */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <Target className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-600" />
                    Market Insights
                  </h4>
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Sentiment:</span>
                      <span className={`font-semibold ${result.averageChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.averageChangePercent >= 0 ? 'Bullish' : 'Bearish'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volatility Level:</span>
                      <span className="font-semibold text-gray-900">
                        {Math.abs(result.averageChangePercent) > 2 ? 'High' : Math.abs(result.averageChangePercent) > 1 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Performance Range:</span>
                      <span className="font-semibold text-gray-900">
                        {indices.length > 0 ? 
                          `${Math.min(...indices.map(i => calculatePerformance(i).changePercent)).toFixed(2)}% to ${Math.max(...indices.map(i => calculatePerformance(i).changePercent)).toFixed(2)}%` : 
                          'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Related Finance Tools</h2>
              <p className="text-base md:text-lg text-gray-600">Explore other tools to enhance your investment planning</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Link
                to="/finance-tools/stock-cagr-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Stock CAGR Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate Compound Annual Growth Rate for stock investments</p>
              </Link>

              <Link
                to="/finance-tools/portfolio-diversification-visualizer"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Portfolio Diversification Visualizer</h3>
                <p className="text-gray-600 text-xs md:text-sm">Visualize and analyze your portfolio diversification across asset classes</p>
              </Link>

              <Link
                to="/finance-tools/mutual-fund-expense-ratio-estimator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-3 md:mb-4">
                  <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Mutual Fund Expense Ratio Estimator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate the impact of expense ratios on mutual fund returns</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NiftyVsSensexPerformanceTracker;