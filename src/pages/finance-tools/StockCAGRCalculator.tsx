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
  Stock
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface CAGRAnalysis {
  initialPrice: number;
  finalPrice: number;
  timePeriod: number;
  cagr: number;
  totalReturn: number;
  totalReturnPercentage: number;
  annualizedReturn: number;
  volatility: number;
  riskAdjustedReturn: number;
  yearByYearData: {
    year: number;
    price: number;
    return: number;
    returnPercentage: number;
  }[];
}

const StockCAGRCalculator: React.FC = () => {
  const [initialPrice, setInitialPrice] = useState('100');
  const [finalPrice, setFinalPrice] = useState('200');
  const [timePeriod, setTimePeriod] = useState('5');
  const [analysis, setAnalysis] = useState<CAGRAnalysis | null>(null);
  const [showChart, setShowChart] = useState(false);

  const calculateCAGR = () => {
    const initial = parseFloat(initialPrice);
    const final = parseFloat(finalPrice);
    const years = parseFloat(timePeriod);
    
    if (initial <= 0 || final <= 0 || years <= 0) {
      alert('Please enter valid positive values');
      return;
    }
    
    // Calculate CAGR using the formula: CAGR = (Final Value / Initial Value)^(1/n) - 1
    const cagr = Math.pow(final / initial, 1 / years) - 1;
    const cagrPercentage = cagr * 100;
    
    // Calculate total return
    const totalReturn = final - initial;
    const totalReturnPercentage = (totalReturn / initial) * 100;
    
    // Calculate annualized return (simple average)
    const annualizedReturn = totalReturnPercentage / years;
    
    // Generate year-by-year data
    const yearByYearData = [];
    for (let year = 1; year <= Math.min(years, 20); year++) {
      const yearPrice = initial * Math.pow(1 + cagr, year);
      const yearReturn = yearPrice - initial;
      const yearReturnPercentage = (yearReturn / initial) * 100;
      
      yearByYearData.push({
        year,
        price: yearPrice,
        return: yearReturn,
        returnPercentage: yearReturnPercentage
      });
    }
    
    // Calculate volatility (simplified - using CAGR as proxy)
    const volatility = Math.abs(cagrPercentage) * 0.3; // Simplified volatility calculation
    
    // Calculate risk-adjusted return (Sharpe ratio simplified)
    const riskAdjustedReturn = cagrPercentage / (volatility + 1);
    
    setAnalysis({
      initialPrice: initial,
      finalPrice: final,
      timePeriod: years,
      cagr: cagrPercentage,
      totalReturn,
      totalReturnPercentage,
      annualizedReturn,
      volatility,
      riskAdjustedReturn,
      yearByYearData
    });
    setShowChart(true);
  };

  const resetForm = () => {
    setInitialPrice('100');
    setFinalPrice('200');
    setTimePeriod('5');
    setAnalysis(null);
    setShowChart(false);
  };

  const getCAGRAssessment = () => {
    if (!analysis) return '';
    
    if (analysis.cagr > 15) {
      return 'Excellent CAGR - This represents outstanding long-term growth performance.';
    } else if (analysis.cagr > 10) {
      return 'Good CAGR - This shows strong long-term growth potential.';
    } else if (analysis.cagr > 5) {
      return 'Moderate CAGR - This indicates steady but moderate growth.';
    } else if (analysis.cagr > 0) {
      return 'Low CAGR - This shows minimal growth over the period.';
    } else {
      return 'Negative CAGR - This indicates declining value over time.';
    }
  };

  const getRiskAssessment = () => {
    if (!analysis) return '';
    
    if (analysis.volatility > 20) {
      return 'High Risk - Significant price volatility expected.';
    } else if (analysis.volatility > 10) {
      return 'Moderate Risk - Moderate price fluctuations expected.';
    } else {
      return 'Low Risk - Relatively stable price movement expected.';
    }
  };

  const getInvestmentRecommendation = () => {
    if (!analysis) return '';
    
    if (analysis.cagr > 12 && analysis.riskAdjustedReturn > 1) {
      return 'Strong Buy - Excellent growth with good risk-adjusted returns.';
    } else if (analysis.cagr > 8 && analysis.riskAdjustedReturn > 0.5) {
      return 'Buy - Good growth potential with reasonable risk.';
    } else if (analysis.cagr > 5) {
      return 'Hold - Moderate growth, consider for long-term portfolio.';
    } else if (analysis.cagr > 0) {
      return 'Weak Hold - Minimal growth, consider alternatives.';
    } else {
      return 'Sell - Declining value, consider exiting position.';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Stock CAGR Calculator - Compound Annual Growth Rate | MoneyCal"
        description="Calculate stock CAGR (Compound Annual Growth Rate) with detailed analysis. Understand long-term stock performance and growth potential with our comprehensive CAGR calculator."
        keywords="stock CAGR calculator, compound annual growth rate, stock performance analysis, investment returns calculator, CAGR formula"
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
                Stock CAGR Calculator
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Calculate stock CAGR (Compound Annual Growth Rate) with detailed analysis. 
                Understand long-term stock performance and growth potential.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-green-100">
                <div className="flex items-center">
                  <Stock className="w-4 h-4 mr-2" />
                  CAGR Analysis
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Metrics
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Risk Assessment
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-green-600" />
                  Stock Parameters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Stock Price (₹)
                    </label>
                    <input
                      type="number"
                      value={initialPrice}
                      onChange={(e) => setInitialPrice(e.target.value)}
                      placeholder="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Final Stock Price (₹)
                    </label>
                    <input
                      type="number"
                      value={finalPrice}
                      onChange={(e) => setFinalPrice(e.target.value)}
                      placeholder="200"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Period (Years)
                    </label>
                    <input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      placeholder="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Parameters Explained</h3>
                    <div className="space-y-2 text-sm text-green-700">
                      <p><strong>Initial Price:</strong> The stock price at the beginning of the period.</p>
                      <p><strong>Final Price:</strong> The current or ending stock price.</p>
                      <p><strong>Time Period:</strong> Number of years between initial and final prices.</p>
                      <p><strong>CAGR:</strong> Compound Annual Growth Rate - annualized return.</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={calculateCAGR}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Calculate CAGR
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-green-600" />
                  CAGR Analysis Results
                </h2>

                {analysis ? (
                  <div className="space-y-6">
                    {/* Main CAGR Card */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">Compound Annual Growth Rate</h3>
                      <p className="text-4xl font-bold mb-2">{analysis.cagr.toFixed(2)}%</p>
                      <p className="text-green-100">Annualized return over {analysis.timePeriod} years</p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">Total Return</h3>
                        <p className="text-2xl font-bold text-blue-900">₹{analysis.totalReturn.toLocaleString()}</p>
                        <p className="text-sm text-blue-700">{analysis.totalReturnPercentage.toFixed(2)}%</p>
                    </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-purple-800 mb-2">Annualized Return</h3>
                        <p className="text-2xl font-bold text-purple-900">{analysis.annualizedReturn.toFixed(2)}%</p>
                        <p className="text-sm text-purple-700">Simple average</p>
                  </div>
                    </div>

                    {/* Risk Metrics */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Risk Metrics</h3>
                      <div className="space-y-2 text-sm text-red-700">
                        <div className="flex justify-between">
                          <span>Volatility:</span>
                          <span className="font-semibold">{analysis.volatility.toFixed(2)}%</span>
                    </div>
                        <div className="flex justify-between">
                          <span>Risk-Adjusted Return:</span>
                          <span className="font-semibold">{analysis.riskAdjustedReturn.toFixed(2)}</span>
                  </div>
                </div>
                    </div>

                    {/* Assessment */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        CAGR Assessment
                      </h3>
                      <p className="text-yellow-700">{getCAGRAssessment()}</p>
                    </div>

                    {/* Risk Assessment */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-orange-800 mb-3">Risk Assessment</h3>
                      <p className="text-orange-700">{getRiskAssessment()}</p>
                    </div>

                    {/* Investment Recommendation */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">Investment Recommendation</h3>
                      <p className="text-green-700">{getInvestmentRecommendation()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter stock parameters to calculate CAGR</p>
                </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Year-by-Year Analysis */}
        {showChart && analysis && (
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <LineChart className="h-6 w-6 mr-3 text-green-600" />
                  Year-by-Year Growth Analysis
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Stock Price</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Return</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Return %</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">CAGR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.yearByYearData.map((data, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{data.year}</td>
                          <td className="py-3 px-4 text-right">₹{data.price.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.return.toLocaleString()}</td>
                          <td className={`py-3 px-4 text-right font-semibold ${data.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.returnPercentage.toFixed(2)}%
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {analysis.cagr.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                Understanding Stock CAGR (Compound Annual Growth Rate)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    What is CAGR?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    CAGR measures the mean annual growth rate of an investment over a specified time period.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Formula:</strong> CAGR = (Final Value / Initial Value)^(1/n) - 1</p>
                    <p><strong>Purpose:</strong> Smooths out volatility and shows consistent growth</p>
                    <p><strong>Use:</strong> Compare investments over different time periods</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    CAGR vs Simple Return
                  </h3>
                  <p className="text-gray-700 mb-4">
                    CAGR accounts for compounding effects, while simple return doesn't.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>CAGR:</strong> Accounts for time value of money</p>
                    <p><strong>Simple Return:</strong> Basic percentage change</p>
                    <p><strong>Advantage:</strong> CAGR is more accurate for long-term analysis</p>
                </div>
              </div>
              
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    CAGR Interpretation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Understanding what different CAGR values mean for your investment.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>15%+ CAGR:</strong> Exceptional growth performance</p>
                    <p><strong>10-15% CAGR:</strong> Strong growth potential</p>
                    <p><strong>5-10% CAGR:</strong> Moderate but steady growth</p>
                    <p><strong>0-5% CAGR:</strong> Minimal growth or decline</p>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Risk Considerations
                  </h3>
                  <p className="text-gray-700 mb-4">
                    CAGR doesn't show volatility - consider risk alongside returns.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Volatility:</strong> Higher CAGR may mean higher risk</p>
                    <p><strong>Time Period:</strong> Longer periods smooth out volatility</p>
                    <p><strong>Market Cycles:</strong> Consider economic conditions</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Why CAGR Matters for Stock Investors
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Long-term Perspective:</strong> CAGR helps you understand the true growth potential 
                    of a stock over extended periods, smoothing out short-term market fluctuations.
                  </p>
                  <p>
                    <strong>Investment Comparison:</strong> Use CAGR to compare different stocks or investment 
                    options over the same time period for better decision-making.
                  </p>
                  <p>
                    <strong>Goal Planning:</strong> CAGR helps you estimate future stock values and plan 
                    your investment goals more accurately.
                  </p>
                  <p>
                    <strong>Risk Assessment:</strong> While CAGR shows growth, always consider volatility 
                    and market conditions for a complete risk assessment.
                  </p>
                </div>
                </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Best Practices for Using CAGR
                </h3>
                <div className="space-y-4 text-blue-700">
                  <p>
                    <strong>Use Multiple Time Periods:</strong> Calculate CAGR for different time periods 
                    to understand short-term vs long-term performance.
                  </p>
                  <p>
                    <strong>Compare with Benchmarks:</strong> Compare stock CAGR with market indices 
                    like Nifty 50 or Sensex to assess relative performance.
                  </p>
                  <p>
                    <strong>Consider Dividends:</strong> For dividend-paying stocks, include dividend 
                    income in your CAGR calculations for total return analysis.
                  </p>
                  <p>
                    <strong>Regular Monitoring:</strong> Recalculate CAGR periodically to track 
                    performance changes and adjust your investment strategy accordingly.
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

export default StockCAGRCalculator;