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
  Minus, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface SIPData {
  month: string;
  investment: number;
  nav: number;
  units: number;
  totalUnits: number;
  totalInvestment: number;
  currentValue: number;
  returns: number;
  returnPercentage: number;
  deviation: number;
}

interface SIPAnalysis {
  totalInvestment: number;
  currentValue: number;
  totalReturns: number;
  returnPercentage: number;
  averageReturn: number;
  bestMonth: string;
  worstMonth: string;
  maxDeviation: number;
  minDeviation: number;
  volatility: number;
  consistency: number;
}

const SIPReturnDeviationChart: React.FC = () => {
  const [monthlyAmount, setMonthlyAmount] = useState('10000');
  const [timePeriod, setTimePeriod] = useState('12');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [volatility, setVolatility] = useState('15');
  const [sipData, setSipData] = useState<SIPData[]>([]);
  const [analysis, setAnalysis] = useState<SIPAnalysis | null>(null);
  const [showChart, setShowChart] = useState(false);

  const generateSIPData = () => {
    const amount = parseFloat(monthlyAmount);
    const months = parseInt(timePeriod);
    const expectedReturnRate = parseFloat(expectedReturn) / 100;
    const volatilityRate = parseFloat(volatility) / 100;
    
    const data: SIPData[] = [];
    let totalUnits = 0;
    let totalInvestment = 0;

    for (let i = 1; i <= months; i++) {
      // Generate random NAV with volatility
      const baseNAV = 100 * Math.pow(1 + expectedReturnRate, i / 12);
      const randomFactor = 1 + (Math.random() - 0.5) * volatilityRate * 2;
      const nav = baseNAV * randomFactor;
      
      const units = amount / nav;
      totalUnits += units;
      totalInvestment += amount;
      
      const currentValue = totalUnits * nav;
      const returns = currentValue - totalInvestment;
      const returnPercentage = (returns / totalInvestment) * 100;
      
      // Calculate deviation from expected return
      const expectedValue = amount * ((Math.pow(1 + expectedReturnRate, i / 12) - 1) / expectedReturnRate) * (1 + expectedReturnRate);
      const deviation = ((currentValue - expectedValue) / expectedValue) * 100;

      data.push({
        month: `Month ${i}`,
        investment: amount,
        nav: nav,
        units: units,
        totalUnits: totalUnits,
        totalInvestment: totalInvestment,
        currentValue: currentValue,
        returns: returns,
        returnPercentage: returnPercentage,
        deviation: deviation
      });
    }

    setSipData(data);
    calculateAnalysis(data);
    setShowChart(true);
  };

  const calculateAnalysis = (data: SIPData[]) => {
    if (data.length === 0) return;

    const totalInvestment = data[data.length - 1].totalInvestment;
    const currentValue = data[data.length - 1].currentValue;
    const totalReturns = currentValue - totalInvestment;
    const returnPercentage = (totalReturns / totalInvestment) * 100;

    const deviations = data.map(d => d.deviation);
    const maxDeviation = Math.max(...deviations);
    const minDeviation = Math.min(...deviations);
    const averageReturn = data.reduce((sum, d) => sum + d.returnPercentage, 0) / data.length;

    const bestMonth = data.find(d => d.deviation === maxDeviation)?.month || '';
    const worstMonth = data.find(d => d.deviation === minDeviation)?.month || '';

    // Calculate volatility (standard deviation of returns)
    const returnPercentages = data.map(d => d.returnPercentage);
    const meanReturn = returnPercentages.reduce((sum, r) => sum + r, 0) / returnPercentages.length;
    const variance = returnPercentages.reduce((sum, r) => sum + Math.pow(r - meanReturn, 2), 0) / returnPercentages.length;
    const volatility = Math.sqrt(variance);

    // Calculate consistency (percentage of months with positive returns)
    const positiveMonths = data.filter(d => d.returns > 0).length;
    const consistency = (positiveMonths / data.length) * 100;

    setAnalysis({
      totalInvestment,
      currentValue,
      totalReturns,
      returnPercentage,
      averageReturn,
      bestMonth,
      worstMonth,
      maxDeviation,
      minDeviation,
      volatility,
      consistency
    });
  };

  const resetForm = () => {
    setMonthlyAmount('10000');
    setTimePeriod('12');
    setExpectedReturn('12');
    setVolatility('15');
    setSipData([]);
    setAnalysis(null);
    setShowChart(false);
  };

  const getDeviationColor = (deviation: number) => {
    if (deviation > 5) return 'text-green-600 bg-green-100';
    if (deviation > 0) return 'text-blue-600 bg-blue-100';
    if (deviation > -5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getReturnColor = (returns: number) => {
    return returns >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <>
      <SEOHelmet
        title="SIP Return Deviation Chart - Analyze SIP Performance Variations | MoneyCal"
        description="Track SIP return deviations and analyze performance variations over time. Visualize how market volatility affects your systematic investment plan returns with detailed charts and analysis."
        keywords="SIP return deviation, SIP performance analysis, systematic investment plan, SIP volatility, investment tracking, SIP Calculator, mutual fund SIP analysis"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                SIP Return Deviation Chart
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Analyze SIP performance variations and track return deviations over time. 
                Visualize how market volatility affects your systematic investment plan returns.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Tracking
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Deviation Analysis
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Volatility Monitoring
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
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  SIP Parameters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(e.target.value)}
                      placeholder="10000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Time Period (Months)
                    </label>
                    <input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      placeholder="12"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Return (%)
                      </label>
                      <input
                        type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        placeholder="12"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Parameters Explained</h3>
                    <div className="space-y-2 text-sm text-blue-700">
                      <p><strong>Expected Return:</strong> The average annual return you expect from your investment.</p>
                      <p><strong>Market Volatility:</strong> How much the market fluctuates, affecting your actual returns.</p>
                      <p><strong>Deviation:</strong> Difference between expected and actual returns due to market volatility.</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={generateSIPData}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Generate Analysis
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
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Analysis Results
                </h2>

                {analysis ? (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">Total Investment</h3>
                        <p className="text-2xl font-bold text-green-900">₹{analysis.totalInvestment.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">Current Value</h3>
                        <p className="text-2xl font-bold text-blue-900">₹{analysis.currentValue.toLocaleString()}</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-purple-800 mb-2">Total Returns</h3>
                        <p className={`text-2xl font-bold ${getReturnColor(analysis.totalReturns)}`}>
                          ₹{analysis.totalReturns.toLocaleString()}
                        </p>
                  </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-orange-800 mb-2">Return %</h3>
                        <p className={`text-2xl font-bold ${getReturnColor(analysis.returnPercentage)}`}>
                          {analysis.returnPercentage.toFixed(2)}%
                        </p>
                </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Average Return:</p>
                          <p className="font-bold text-gray-900">{analysis.averageReturn.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Volatility:</p>
                          <p className="font-bold text-gray-900">{analysis.volatility.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Consistency:</p>
                          <p className="font-bold text-gray-900">{analysis.consistency.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Max Deviation:</p>
                          <p className="font-bold text-gray-900">{analysis.maxDeviation.toFixed(2)}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Best/Worst Months */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">Best Month</h3>
                        <p className="text-lg font-bold text-green-900">{analysis.bestMonth}</p>
                        <p className="text-sm text-green-700">Deviation: +{analysis.maxDeviation.toFixed(2)}%</p>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-red-800 mb-2">Worst Month</h3>
                        <p className="text-lg font-bold text-red-900">{analysis.worstMonth}</p>
                        <p className="text-sm text-red-700">Deviation: {analysis.minDeviation.toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter SIP parameters to generate analysis</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* SIP Data Table */}
        {showChart && sipData.length > 0 && (
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Activity className="h-6 w-6 mr-3 text-blue-600" />
                  Monthly SIP Analysis
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Investment</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">NAV</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Units</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Units</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Investment</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Current Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Returns</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Return %</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Deviation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sipData.map((data, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{data.month}</td>
                          <td className="py-3 px-4 text-right">₹{data.investment.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.nav.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right">{data.units.toFixed(4)}</td>
                          <td className="py-3 px-4 text-right">{data.totalUnits.toFixed(4)}</td>
                          <td className="py-3 px-4 text-right">₹{data.totalInvestment.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.currentValue.toLocaleString()}</td>
                          <td className={`py-3 px-4 text-right font-semibold ${getReturnColor(data.returns)}`}>
                            ₹{data.returns.toLocaleString()}
                          </td>
                          <td className={`py-3 px-4 text-right font-semibold ${getReturnColor(data.returnPercentage)}`}>
                            {data.returnPercentage.toFixed(2)}%
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeviationColor(data.deviation)}`}>
                              {data.deviation > 0 ? '+' : ''}{data.deviation.toFixed(2)}%
                            </span>
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
                Understanding SIP Return Deviations
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Positive Deviations
                  </h3>
                  <p className="text-gray-700">
                    When actual returns exceed expected returns due to favorable market conditions, 
                    leading to better-than-expected performance.
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingDown className="w-5 h-5 mr-2 text-red-600" />
                    Negative Deviations
                  </h3>
                  <p className="text-gray-700">
                    When actual returns fall below expected returns due to market volatility or 
                    unfavorable conditions.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    Volatility Impact
                  </h3>
                  <p className="text-gray-700">
                    Higher market volatility leads to larger deviations, while lower volatility 
                    results in more predictable returns.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Time Effect
                  </h3>
                  <p className="text-gray-700">
                    Longer investment periods tend to reduce the impact of short-term deviations 
                    through rupee cost averaging.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Key Insights from SIP Deviation Analysis
                </h3>
                <div className="space-y-4 text-blue-700">
                  <p>
                    <strong>Market Timing Impact:</strong> SIP deviations show how market timing affects returns, 
                    highlighting the benefits of systematic investing over lump-sum investments.
                  </p>
                  <p>
                    <strong>Risk Management:</strong> Understanding deviations helps in setting realistic 
                    expectations and managing investment risk effectively.
                  </p>
                  <p>
                    <strong>Portfolio Optimization:</strong> Regular deviation analysis can help optimize 
                    your investment strategy and asset allocation.
                  </p>
                  <p>
                    <strong>Long-term Perspective:</strong> Short-term deviations are normal; focus on 
                    long-term performance trends for better investment decisions.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Investment Recommendations
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Stay Invested:</strong> Don't panic during negative deviations; SIPs work best 
                    over longer periods.
                  </p>
                  <p>
                    <strong>Regular Monitoring:</strong> Track deviations monthly to understand your 
                    investment performance patterns.
                  </p>
                  <p>
                    <strong>Diversify:</strong> Spread investments across different asset classes to 
                    reduce overall portfolio deviation.
                  </p>
                  <p>
                    <strong>Rebalance:</strong> Adjust your portfolio periodically based on deviation 
                    analysis and changing market conditions.
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

export default SIPReturnDeviationChart;
