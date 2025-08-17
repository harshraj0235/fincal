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

interface IndexFund {
  id: string;
  name: string;
  expenseRatio: number;
  trackingError: number;
  benchmarkReturn: number;
  fundReturn: number;
  investmentAmount: number;
  color: string;
}

const IndexFundReturnComparison: React.FC = () => {
  const [funds, setFunds] = useState<IndexFund[]>([
    {
      id: '1',
      name: 'Nifty 50 Index Fund',
      expenseRatio: 0.15,
      trackingError: 0.05,
      benchmarkReturn: 12.5,
      fundReturn: 12.35,
      investmentAmount: 100000,
      color: '#3B82F6'
    },
    {
      id: '2',
      name: 'Sensex Index Fund',
      expenseRatio: 0.20,
      trackingError: 0.08,
      benchmarkReturn: 11.8,
      fundReturn: 11.6,
      investmentAmount: 100000,
      color: '#10B981'
    }
  ]);

  const [newFund, setNewFund] = useState({
    name: '',
    expenseRatio: 0.15,
    trackingError: 0.05,
    benchmarkReturn: 12,
    fundReturn: 11.85,
    investmentAmount: 100000
  });

  const addFund = () => {
    if (newFund.name && newFund.investmentAmount > 0) {
      const fund: IndexFund = {
        id: Date.now().toString(),
        name: newFund.name,
        expenseRatio: newFund.expenseRatio,
        trackingError: newFund.trackingError,
        benchmarkReturn: newFund.benchmarkReturn,
        fundReturn: newFund.fundReturn,
        investmentAmount: newFund.investmentAmount,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      };
      setFunds([...funds, fund]);
      setNewFund({
        name: '',
        expenseRatio: 0.15,
        trackingError: 0.05,
        benchmarkReturn: 12,
        fundReturn: 11.85,
        investmentAmount: 100000
      });
    }
  };

  const removeFund = (id: string) => {
    setFunds(funds.filter(fund => fund.id !== id));
  };

  const calculateFundMetrics = (fund: IndexFund) => {
    const benchmarkCorpus = fund.investmentAmount * Math.pow(1 + fund.benchmarkReturn / 100, 10);
    const fundCorpus = fund.investmentAmount * Math.pow(1 + fund.fundReturn / 100, 10);
    const trackingDifference = fundCorpus - benchmarkCorpus;
    const totalExpenses = fund.investmentAmount * (fund.expenseRatio / 100) * 10;
    const netTrackingError = fund.trackingError - fund.expenseRatio;
    
    return {
      benchmarkCorpus,
      fundCorpus,
      trackingDifference,
      totalExpenses,
      netTrackingError
    };
  };

  const calculatePortfolioMetrics = () => {
    const totalInvestment = funds.reduce((sum, fund) => sum + fund.investmentAmount, 0);
    const weightedExpenseRatio = funds.reduce((sum, fund) => 
      sum + (fund.expenseRatio * fund.investmentAmount / totalInvestment), 0);
    
    let totalBenchmarkCorpus = 0;
    let totalFundCorpus = 0;
    let totalTrackingDifference = 0;

    funds.forEach(fund => {
      const metrics = calculateFundMetrics(fund);
      totalBenchmarkCorpus += metrics.benchmarkCorpus;
      totalFundCorpus += metrics.fundCorpus;
      totalTrackingDifference += metrics.trackingDifference;
    });

    const bestPerformer = funds.length > 0 ? 
      funds.reduce((best, current) => {
        const bestMetrics = calculateFundMetrics(best);
        const currentMetrics = calculateFundMetrics(current);
        return currentMetrics.fundCorpus > bestMetrics.fundCorpus ? current : best;
      }) : null;

    return {
      totalInvestment,
      weightedExpenseRatio,
      totalBenchmarkCorpus,
      totalFundCorpus,
      totalTrackingDifference,
      bestPerformer
    };
  };

  const result = calculatePortfolioMetrics();

  return (
    <>
      <SEOHelmet
        title="Index Fund Return Comparison - Compare Index Fund Performance | MoneyCal"
        description="Compare different index fund returns, tracking errors, and expense ratios. Analyze index fund performance with our comprehensive comparison tool."
        keywords="index fund comparison, index fund returns, tracking error, expense ratio, mutual fund comparison, index fund performance"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-blue-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Index Fund Return Comparison
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Compare different index fund returns, tracking errors, and expense ratios
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
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-blue-600" />
                  Add Index Fund
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fund Name
                    </label>
                    <input
                      type="text"
                      value={newFund.name}
                      onChange={(e) => setNewFund({...newFund, name: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="e.g., Nifty 50 Index Fund"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expense Ratio (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={newFund.expenseRatio}
                        onChange={(e) => setNewFund({...newFund, expenseRatio: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="0.15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tracking Error (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={newFund.trackingError}
                        onChange={(e) => setNewFund({...newFund, trackingError: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="0.05"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Benchmark Return (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={newFund.benchmarkReturn}
                        onChange={(e) => setNewFund({...newFund, benchmarkReturn: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="12.5"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fund Return (%)
                    </label>
                    <input
                      type="number"
                        step="0.1"
                        value={newFund.fundReturn}
                        onChange={(e) => setNewFund({...newFund, fundReturn: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="12.35"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={newFund.investmentAmount}
                      onChange={(e) => setNewFund({...newFund, investmentAmount: Number(e.target.value)})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="100000"
                    />
                  </div>

                  <button
                    onClick={addFund}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base"
                  >
                    Add Fund
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
                {/* Portfolio Summary */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Portfolio Comparison</h3>
                    <Activity className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">
                        ₹{result.totalFundCorpus.toLocaleString()}
                      </div>
                      <p className="text-blue-100 text-sm">Total Fund Corpus (10Y)</p>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">
                        ₹{result.totalTrackingDifference.toLocaleString()}
                      </div>
                      <p className="text-blue-100 text-sm">Tracking Difference</p>
                    </div>
                  </div>
                  <div className="mt-4 p-2 rounded-lg text-sm bg-blue-500/20">
                    Weighted Expense Ratio: {result.weightedExpenseRatio.toFixed(2)}%
                  </div>
                </div>

                {/* Performance Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Benchmark Corpus</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                      ₹{result.totalBenchmarkCorpus.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">10-year benchmark returns</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Target className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Fund Corpus</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-blue-600 mb-1">
                      ₹{result.totalFundCorpus.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">10-year fund returns</p>
                  </div>
                </div>

                {/* Fund List */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Index Funds ({funds.length})
                  </h4>
                  <div className="space-y-3">
                    {funds.map((fund) => {
                      const metrics = calculateFundMetrics(fund);
                      
                      return (
                        <div key={fund.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-3" 
                                style={{ backgroundColor: fund.color }}
                              ></div>
                              <div>
                                <div className="font-medium text-sm">{fund.name}</div>
                                <div className="text-xs text-gray-500">
                                  TER: {fund.expenseRatio}% • Tracking Error: {fund.trackingError}%
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFund(fund.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-600">Benchmark:</span>
                              <span className="font-semibold ml-1">{fund.benchmarkReturn}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Fund Return:</span>
                              <span className="font-semibold ml-1">{fund.fundReturn}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">10Y Corpus:</span>
                              <span className="font-semibold ml-1">₹{metrics.fundCorpus.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Tracking Diff:</span>
                              <span className={`font-semibold ml-1 ${metrics.trackingDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ₹{metrics.trackingDifference.toLocaleString()}
                              </span>
                            </div>
                    </div>
                    </div>
                      );
                    })}
                    {funds.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No index funds added yet
                    </div>
                    )}
                  </div>
                </div>

                {/* Best Performer */}
                {result.bestPerformer && (
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                      <TrendingUp className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
                      Best Performing Fund
                    </h4>
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-green-600 mb-1">
                        {result.bestPerformer.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Fund Return: {result.bestPerformer.fundReturn}% • 
                        Expense Ratio: {result.bestPerformer.expenseRatio}%
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        10-Year Corpus: ₹{calculateFundMetrics(result.bestPerformer).fundCorpus.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
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
                to="/finance-tools/mutual-fund-expense-ratio-estimator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-3 md:mb-4">
                  <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Mutual Fund Expense Ratio Estimator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate the impact of expense ratios on mutual fund returns</p>
              </Link>

              <Link
                to="/finance-tools/nifty-vs-sensex-performance-tracker"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4">
                  <Activity className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Nifty vs Sensex Performance Tracker</h3>
                <p className="text-gray-600 text-xs md:text-sm">Track and compare the performance of market indices</p>
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndexFundReturnComparison;