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
  ArrowUpDown, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface InvestmentComparison {
  lumpsum: {
    totalInvestment: number;
    finalValue: number;
    totalReturns: number;
    returnPercentage: number;
    cagr: number;
  };
  sip: {
    totalInvestment: number;
    finalValue: number;
    totalReturns: number;
    returnPercentage: number;
    cagr: number;
  };
  monthlyData: {
    month: number;
    lumpsumValue: number;
    sipValue: number;
    sipInvestment: number;
  }[];
}

const LumpsumVsSIPAnalyzer: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState('1000000');
  const [monthlySIP, setMonthlySIP] = useState('10000');
  const [timePeriod, setTimePeriod] = useState('10');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [volatility, setVolatility] = useState('15');
  const [comparison, setComparison] = useState<InvestmentComparison | null>(null);
  const [showChart, setShowChart] = useState(false);

  const calculateComparison = () => {
    const total = parseFloat(totalAmount);
    const monthly = parseFloat(monthlySIP);
    const years = parseInt(timePeriod);
    const annualReturn = parseFloat(expectedReturn) / 100;
    const volatilityRate = parseFloat(volatility) / 100;
    
    const months = years * 12;
    
    // Lumpsum calculation
    const lumpsumFinalValue = total * Math.pow(1 + annualReturn, years);
    const lumpsumReturns = lumpsumFinalValue - total;
    const lumpsumReturnPercentage = (lumpsumReturns / total) * 100;
    const lumpsumCAGR = (Math.pow(lumpsumFinalValue / total, 1 / years) - 1) * 100;
    
    // SIP calculation
    const sipFinalValue = monthly * ((Math.pow(1 + annualReturn, years) - 1) / annualReturn) * (1 + annualReturn);
    const sipTotalInvestment = monthly * months;
    const sipReturns = sipFinalValue - sipTotalInvestment;
    const sipReturnPercentage = (sipReturns / sipTotalInvestment) * 100;
    const sipCAGR = (Math.pow(sipFinalValue / sipTotalInvestment, 1 / years) - 1) * 100;
    
    // Generate monthly data for chart
    const monthlyData = [];
    for (let i = 1; i <= Math.min(months, 120); i++) {
      const month = i;
      const lumpsumValue = total * Math.pow(1 + annualReturn, i / 12);
      const sipValue = monthly * ((Math.pow(1 + annualReturn, i / 12) - 1) / annualReturn) * (1 + annualReturn);
      const sipInvestment = monthly * i;
      
      monthlyData.push({
        month,
        lumpsumValue,
        sipValue,
        sipInvestment
      });
    }
    
    setComparison({
      lumpsum: {
        totalInvestment: total,
        finalValue: lumpsumFinalValue,
        totalReturns: lumpsumReturns,
        returnPercentage: lumpsumReturnPercentage,
        cagr: lumpsumCAGR
      },
      sip: {
        totalInvestment: sipTotalInvestment,
        finalValue: sipFinalValue,
        totalReturns: sipReturns,
        returnPercentage: sipReturnPercentage,
        cagr: sipCAGR
      },
      monthlyData
    });
    setShowChart(true);
  };

  const resetForm = () => {
    setTotalAmount('1000000');
    setMonthlySIP('10000');
    setTimePeriod('10');
    setExpectedReturn('12');
    setVolatility('15');
    setComparison(null);
    setShowChart(false);
  };

  const getRecommendation = () => {
    if (!comparison) return '';
    
    const lumpsumCAGR = comparison.lumpsum.cagr;
    const sipCAGR = comparison.sip.cagr;
    const lumpsumReturns = comparison.lumpsum.totalReturns;
    const sipReturns = comparison.sip.totalReturns;
    
    if (lumpsumReturns > sipReturns) {
      return 'Lumpsum investment shows higher absolute returns due to longer time in market.';
    } else if (sipReturns > lumpsumReturns) {
      return 'SIP shows better returns due to rupee cost averaging benefits.';
    } else {
      return 'Both strategies show similar returns. Consider your risk tolerance and market timing ability.';
    }
  };

  const getRiskAssessment = () => {
    const volatility = parseFloat(volatility);
    if (volatility <= 10) return 'Low Risk';
    if (volatility <= 20) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <>
      <SEOHelmet
        title="Lumpsum vs SIP Analyzer - Compare Investment Strategies | MoneyCal"
        description="Compare lumpsum vs SIP investment strategies with detailed analysis. Understand which approach works better for your financial goals with our comprehensive investment comparison tool."
        keywords="lumpsum vs SIP, investment comparison, lumpsum investment, SIP Calculator, investment strategy, mutual fund investment, investment analysis"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Lumpsum vs SIP Analyzer
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Compare lumpsum vs SIP investment strategies with detailed analysis. 
                Understand which approach works better for your financial goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-100">
                <div className="flex items-center">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Strategy Comparison
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Analysis
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
                  <IndianRupee className="h-6 w-6 mr-3 text-purple-600" />
                  Investment Parameters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Lumpsum Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                      placeholder="1000000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly SIP Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlySIP}
                      onChange={(e) => setMonthlySIP(e.target.value)}
                      placeholder="10000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Period (Years)
                      </label>
                      <input
                        type="number"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                        placeholder="10"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Return (%)
                    </label>
                    <input
                      type="number"
                      value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                      placeholder="12"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Market Volatility (%)
                    </label>
                    <input
                      type="number"
                      value={volatility}
                      onChange={(e) => setVolatility(e.target.value)}
                      placeholder="15"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">Parameters Explained</h3>
                    <div className="space-y-2 text-sm text-purple-700">
                      <p><strong>Lumpsum:</strong> One-time investment of the total amount at the beginning.</p>
                      <p><strong>SIP:</strong> Systematic Investment Plan with monthly investments over time.</p>
                      <p><strong>Volatility:</strong> Market fluctuations that affect investment returns.</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateComparison}
                      className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    >
                      Compare Strategies
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
                  <BarChart3 className="h-6 w-6 mr-3 text-purple-600" />
                  Comparison Results
                </h2>

                {comparison ? (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">Lumpsum Investment</h3>
                        <p className="text-2xl font-bold text-blue-900">₹{comparison.lumpsum.finalValue.toLocaleString()}</p>
                        <p className="text-sm text-blue-700">Returns: ₹{comparison.lumpsum.totalReturns.toLocaleString()}</p>
                        <p className="text-sm text-blue-700">CAGR: {comparison.lumpsum.cagr.toFixed(2)}%</p>
                    </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">SIP Investment</h3>
                        <p className="text-2xl font-bold text-green-900">₹{comparison.sip.finalValue.toLocaleString()}</p>
                        <p className="text-sm text-green-700">Returns: ₹{comparison.sip.totalReturns.toLocaleString()}</p>
                        <p className="text-sm text-green-700">CAGR: {comparison.sip.cagr.toFixed(2)}%</p>
                  </div>
                </div>

                    {/* Investment Comparison */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Comparison</h3>
                      <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                          <span className="text-gray-600">Total Investment (Lumpsum):</span>
                          <span className="font-semibold">₹{comparison.lumpsum.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                          <span className="text-gray-600">Total Investment (SIP):</span>
                          <span className="font-semibold">₹{comparison.sip.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                          <span className="text-gray-600">Return Difference:</span>
                          <span className={`font-semibold ${comparison.lumpsum.totalReturns > comparison.sip.totalReturns ? 'text-blue-600' : 'text-green-600'}`}>
                            ₹{Math.abs(comparison.lumpsum.totalReturns - comparison.sip.totalReturns).toLocaleString()}
                      </span>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Investment Recommendation
                      </h3>
                      <p className="text-yellow-700">{getRecommendation()}</p>
                    </div>

                    {/* Risk Assessment */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Risk Assessment</h3>
                      <p className="text-red-700">
                        <strong>Market Risk Level:</strong> {getRiskAssessment()}
                      </p>
                      <p className="text-red-700 text-sm mt-2">
                        Volatility: {volatility}% - Higher volatility increases risk but may offer higher returns.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter investment parameters to compare strategies</p>
                </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Monthly Comparison Chart */}
        {showChart && comparison && (
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <LineChart className="h-6 w-6 mr-3 text-purple-600" />
                  Monthly Performance Comparison
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Lumpsum Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">SIP Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">SIP Investment</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.monthlyData.slice(0, 24).map((data, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{data.month}</td>
                          <td className="py-3 px-4 text-right">₹{data.lumpsumValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.sipValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.sipInvestment.toLocaleString()}</td>
                          <td className={`py-3 px-4 text-right font-semibold ${data.lumpsumValue > data.sipValue ? 'text-blue-600' : 'text-green-600'}`}>
                            ₹{(data.lumpsumValue - data.sipValue).toLocaleString()}
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
                Understanding Lumpsum vs SIP Investment Strategies
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Lumpsum Investment
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Investing the entire amount at once, typically at the beginning of the investment period.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Pros:</strong> Longer time in market, potentially higher returns</p>
                    <p><strong>Cons:</strong> Market timing risk, higher volatility exposure</p>
                    <p><strong>Best for:</strong> Experienced investors, market downturns</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    SIP Investment
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Systematic Investment Plan with regular monthly investments over time.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Pros:</strong> Rupee cost averaging, lower risk, disciplined investing</p>
                    <p><strong>Cons:</strong> May miss early market gains, lower absolute returns</p>
                    <p><strong>Best for:</strong> Beginners, regular income earners</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Key Factors to Consider
                  </h3>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Market Timing:</strong> Lumpsum works better in falling markets</p>
                    <p><strong>Investment Horizon:</strong> Longer periods favor lumpsum</p>
                    <p><strong>Risk Tolerance:</strong> SIP is less risky for beginners</p>
                    <p><strong>Cash Flow:</strong> SIP requires regular income</p>
              </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Risk Management
                  </h3>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Diversification:</strong> Consider combining both strategies</p>
                    <p><strong>Market Conditions:</strong> Adapt strategy based on market outlook</p>
                    <p><strong>Goal Alignment:</strong> Match strategy with financial goals</p>
                    <p><strong>Regular Review:</strong> Monitor and adjust as needed</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  When to Choose Each Strategy
                </h3>
                <div className="space-y-4 text-purple-700">
                  <p>
                    <strong>Choose Lumpsum when:</strong> You have a large amount to invest, market is down, 
                    you have a long investment horizon, and you're comfortable with market volatility.
                  </p>
                  <p>
                    <strong>Choose SIP when:</strong> You have regular income, want to reduce market timing risk, 
                    prefer disciplined investing, or are new to investing.
                  </p>
                  <p>
                    <strong>Hybrid Approach:</strong> Consider investing 60-70% in lumpsum and 30-40% in SIP 
                    to get the benefits of both strategies.
                  </p>
                </div>
                </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Investment Best Practices
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Start Early:</strong> The earlier you start investing, the more time your money has to grow.
                  </p>
                  <p>
                    <strong>Stay Consistent:</strong> Whether lumpsum or SIP, consistency is key to long-term success.
                  </p>
                  <p>
                    <strong>Monitor Performance:</strong> Regularly review your investments and adjust strategies as needed.
                  </p>
                  <p>
                    <strong>Focus on Goals:</strong> Align your investment strategy with your financial goals and timeline.
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

export default LumpsumVsSIPAnalyzer;
