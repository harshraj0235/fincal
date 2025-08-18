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
  TrendingDown,
  Percent,
  TrendingUpIcon
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface IndexData {
  name: string;
  currentValue: number;
  previousValue: number;
  change: number;
  changePercentage: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
}

interface PerformanceComparison {
  nifty: IndexData;
  sensex: IndexData;
  correlation: number;
  volatility: {
    nifty: number;
    sensex: number;
  };
  returns: {
    nifty: number;
    sensex: number;
  };
  riskMetrics: {
    nifty: number;
    sensex: number;
  };
  monthlyData: {
    month: string;
    niftyValue: number;
    sensexValue: number;
    niftyReturn: number;
    sensexReturn: number;
  }[];
}

const NiftyVsSensexPerformanceTracker: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('1');
  const [comparison, setComparison] = useState<PerformanceComparison | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Mock data - in real implementation, this would come from API
  const generateMockData = () => {
    const niftyData: IndexData = {
      name: 'NIFTY 50',
      currentValue: 22500,
      previousValue: 22300,
      change: 200,
      changePercentage: 0.90,
      yearHigh: 23000,
      yearLow: 18000,
      marketCap: 2500000,
      peRatio: 22.5,
      dividendYield: 1.2
    };

    const sensexData: IndexData = {
      name: 'SENSEX',
      currentValue: 74000,
      previousValue: 73200,
      change: 800,
      changePercentage: 1.09,
      yearHigh: 75000,
      yearLow: 60000,
      marketCap: 3500000,
      peRatio: 23.1,
      dividendYield: 1.1
    };

    const correlation = 0.95; // High correlation between Nifty and Sensex
    const volatility = {
      nifty: 15.2,
      sensex: 14.8
    };
    const returns = {
      nifty: 12.5,
      sensex: 11.8
    };
    const riskMetrics = {
      nifty: 0.82,
      sensex: 0.80
    };

    // Generate monthly data
    const monthlyData = [];
    const months = parseInt(timePeriod) * 12;
    let niftyBase = 20000;
    let sensexBase = 65000;

    for (let i = 1; i <= Math.min(months, 24); i++) {
      const niftyGrowth = 1 + (Math.random() - 0.5) * 0.1;
      const sensexGrowth = 1 + (Math.random() - 0.5) * 0.1;
      
      niftyBase *= niftyGrowth;
      sensexBase *= sensexGrowth;
      
      const niftyReturn = ((niftyBase / 20000) - 1) * 100;
      const sensexReturn = ((sensexBase / 65000) - 1) * 100;

      monthlyData.push({
        month: `Month ${i}`,
        niftyValue: niftyBase,
        sensexValue: sensexBase,
        niftyReturn,
        sensexReturn
      });
    }

    return {
      nifty: niftyData,
      sensex: sensexData,
      correlation,
      volatility,
      returns,
      riskMetrics,
      monthlyData
    };
  };

  const calculateComparison = () => {
    const data = generateMockData();
    setComparison(data);
    setShowAnalysis(true);
  };

  const resetForm = () => {
    setTimePeriod('1');
    setComparison(null);
    setShowAnalysis(false);
  };

  const getPerformanceAssessment = () => {
    if (!comparison) return '';
    
    if (comparison.returns.nifty > comparison.returns.sensex) {
      return 'NIFTY 50 is outperforming SENSEX in the selected period.';
    } else if (comparison.returns.sensex > comparison.returns.nifty) {
      return 'SENSEX is outperforming NIFTY 50 in the selected period.';
    } else {
      return 'Both indices are performing similarly in the selected period.';
    }
  };

  const getRiskAssessment = () => {
    if (!comparison) return '';
    
    if (comparison.volatility.nifty < comparison.volatility.sensex) {
      return 'NIFTY 50 shows lower volatility compared to SENSEX.';
    } else {
      return 'SENSEX shows lower volatility compared to NIFTY 50.';
    }
  };

  const getCorrelationAssessment = () => {
    if (!comparison) return '';
    
    if (comparison.correlation > 0.9) {
      return 'Very high correlation - both indices move almost in sync.';
    } else if (comparison.correlation > 0.7) {
      return 'High correlation - indices generally move together.';
    } else if (comparison.correlation > 0.5) {
      return 'Moderate correlation - some independent movement.';
    } else {
      return 'Low correlation - indices move independently.';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Nifty vs Sensex Performance Tracker - Index Comparison | MoneyCal"
        description="Track and compare Nifty 50 vs Sensex performance. Analyze returns, volatility, and correlation between India's major stock market indices with our comprehensive comparison tool."
        keywords="Nifty vs Sensex, index comparison, Nifty 50 performance, Sensex performance, stock market indices, market analysis"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Nifty vs Sensex Performance Tracker
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Track and compare Nifty 50 vs Sensex performance. Analyze returns, 
                volatility, and correlation between India's major stock market indices.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-green-100">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  Index Comparison
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Analysis
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Market Insights
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Control Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-green-600" />
                  Analysis Parameters
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period (Years)
                  </label>
                  <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="10">10 Years</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={calculateComparison}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Compare Performance
                  </button>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={resetForm}
                    className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Index Cards */}
        {showAnalysis && comparison && (
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Nifty Card */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{comparison.nifty.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${comparison.nifty.change >= 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                      {comparison.nifty.change >= 0 ? '+' : ''}{comparison.nifty.changePercentage.toFixed(2)}%
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{comparison.nifty.currentValue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Current Value</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Year High</p>
                        <p className="font-semibold text-gray-900">{comparison.nifty.yearHigh.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Year Low</p>
                        <p className="font-semibold text-gray-900">{comparison.nifty.yearLow.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">P/E Ratio</p>
                        <p className="font-semibold text-gray-900">{comparison.nifty.peRatio}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Dividend Yield</p>
                        <p className="font-semibold text-gray-900">{comparison.nifty.dividendYield}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sensex Card */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{comparison.sensex.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${comparison.sensex.change >= 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                      {comparison.sensex.change >= 0 ? '+' : ''}{comparison.sensex.changePercentage.toFixed(2)}%
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{comparison.sensex.currentValue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Current Value</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Year High</p>
                        <p className="font-semibold text-gray-900">{comparison.sensex.yearHigh.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Year Low</p>
                        <p className="font-semibold text-gray-900">{comparison.sensex.yearLow.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">P/E Ratio</p>
                        <p className="font-semibold text-gray-900">{comparison.sensex.peRatio}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Dividend Yield</p>
                        <p className="font-semibold text-gray-900">{comparison.sensex.dividendYield}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Performance Analysis */}
        {showAnalysis && comparison && (
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-green-600" />
                  Performance Analysis
                </h2>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Correlation</h3>
                    <p className="text-2xl font-bold text-blue-900">{(comparison.correlation * 100).toFixed(1)}%</p>
                    <p className="text-sm text-blue-700">Index correlation</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-800 mb-2">Nifty Returns</h3>
                    <p className="text-2xl font-bold text-green-900">{comparison.returns.nifty.toFixed(2)}%</p>
                    <p className="text-sm text-green-700">Annual returns</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-purple-800 mb-2">Sensex Returns</h3>
                    <p className="text-2xl font-bold text-purple-900">{comparison.returns.sensex.toFixed(2)}%</p>
                    <p className="text-sm text-purple-700">Annual returns</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-orange-800 mb-2">Volatility</h3>
                    <p className="text-2xl font-bold text-orange-900">{comparison.volatility.nifty.toFixed(1)}%</p>
                    <p className="text-sm text-orange-700">Nifty volatility</p>
                  </div>
                </div>

                {/* Risk Metrics */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">Risk Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-red-600">Nifty Volatility</p>
                      <p className="text-xl font-bold text-red-900">{comparison.volatility.nifty.toFixed(1)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-red-600">Sensex Volatility</p>
                      <p className="text-xl font-bold text-red-900">{comparison.volatility.sensex.toFixed(1)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-red-600">Nifty Risk Score</p>
                      <p className="text-xl font-bold text-red-900">{comparison.riskMetrics.nifty.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-red-600">Sensex Risk Score</p>
                      <p className="text-xl font-bold text-red-900">{comparison.riskMetrics.sensex.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Assessments */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      Performance Assessment
                    </h3>
                    <p className="text-yellow-700">{getPerformanceAssessment()}</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Risk Assessment</h3>
                    <p className="text-blue-700">{getRiskAssessment()}</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Correlation Assessment</h3>
                    <p className="text-green-700">{getCorrelationAssessment()}</p>
                  </div>
                </div>

                {/* Monthly Performance Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Nifty Value</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Sensex Value</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Nifty Return</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Sensex Return</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Difference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparison.monthlyData.slice(0, 20).map((data, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{data.month}</td>
                            <td className="py-3 px-4 text-right">{data.niftyValue.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">{data.sensexValue.toLocaleString()}</td>
                            <td className={`py-3 px-4 text-right font-semibold ${data.niftyReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {data.niftyReturn.toFixed(2)}%
                            </td>
                            <td className={`py-3 px-4 text-right font-semibold ${data.sensexReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {data.sensexReturn.toFixed(2)}%
                            </td>
                            <td className={`py-3 px-4 text-right font-semibold ${data.niftyReturn > data.sensexReturn ? 'text-green-600' : 'text-red-600'}`}>
                              {(data.niftyReturn - data.sensexReturn).toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Nifty vs Sensex
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUpIcon className="w-5 h-5 mr-2 text-blue-600" />
                    NIFTY 50
                  </h3>
                  <p className="text-gray-700 mb-4">
                    India's premier stock market index representing 50 large-cap companies.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Composition:</strong> 50 largest companies by market cap</p>
                    <p><strong>Weighting:</strong> Free-float market capitalization</p>
                    <p><strong>Base Year:</strong> 1995 (Base: 1000)</p>
                    <p><strong>Exchange:</strong> NSE (National Stock Exchange)</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    SENSEX
                  </h3>
                  <p className="text-gray-700 mb-4">
                    India's oldest stock market index representing 30 large-cap companies.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Composition:</strong> 30 largest companies by market cap</p>
                    <p><strong>Weighting:</strong> Free-float market capitalization</p>
                    <p><strong>Base Year:</strong> 1978-79 (Base: 100)</p>
                    <p><strong>Exchange:</strong> BSE (Bombay Stock Exchange)</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Key Differences
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Understanding the differences between these major indices.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Number of Stocks:</strong> Nifty 50 vs Sensex 30</p>
                    <p><strong>Exchange:</strong> NSE vs BSE</p>
                    <p><strong>Calculation:</strong> Similar methodology</p>
                    <p><strong>Correlation:</strong> Very high (95%+)</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Investment Implications
                  </h3>
                  <p className="text-gray-700 mb-4">
                    How these indices affect investment decisions.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Diversification:</strong> Both provide broad market exposure</p>
                    <p><strong>Liquidity:</strong> High liquidity in both indices</p>
                    <p><strong>Performance:</strong> Similar long-term returns</p>
                    <p><strong>Risk:</strong> Market risk applies to both</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Why Track Both Indices?
                </h3>
                <div className="space-y-4 text-blue-700">
                  <p>
                    <strong>Market Sentiment:</strong> Both indices reflect overall market sentiment 
                    and economic conditions, helping investors understand market trends.
                  </p>
                  <p>
                    <strong>Performance Comparison:</strong> Comparing your portfolio performance 
                    against these benchmarks helps assess investment strategy effectiveness.
                  </p>
                  <p>
                    <strong>Risk Assessment:</strong> Understanding index volatility and correlation 
                    helps in portfolio risk management and asset allocation decisions.
                  </p>
                  <p>
                    <strong>Investment Decisions:</strong> Index performance can guide decisions 
                    about market timing, sector allocation, and investment strategy adjustments.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Best Practices for Index Tracking
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Regular Monitoring:</strong> Track both indices regularly to understand 
                    market trends and identify potential investment opportunities or risks.
                  </p>
                  <p>
                    <strong>Long-term Perspective:</strong> Focus on long-term trends rather than 
                    short-term fluctuations for better investment decision-making.
                  </p>
                  <p>
                    <strong>Correlation Analysis:</strong> Understand that both indices are highly 
                    correlated, so tracking one provides insights into the other.
                  </p>
                  <p>
                    <strong>Benchmark Comparison:</strong> Use these indices as benchmarks to 
                    evaluate your portfolio performance and make necessary adjustments.
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

export default NiftyVsSensexPerformanceTracker;