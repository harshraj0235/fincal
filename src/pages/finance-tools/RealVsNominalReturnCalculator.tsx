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
  Percent, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface ReturnAnalysis {
  nominalReturn: number;
  inflationRate: number;
  realReturn: number;
  purchasingPower: number;
  inflationAdjustedValue: number;
  realReturnPercentage: number;
  purchasingPowerLoss: number;
  yearByYearData: {
    year: number;
    nominalValue: number;
    inflationAdjustedValue: number;
    purchasingPower: number;
    realReturn: number;
  }[];
}

const RealVsNominalReturnCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState('100000');
  const [nominalReturn, setNominalReturn] = useState('12');
  const [inflationRate, setInflationRate] = useState('6');
  const [timePeriod, setTimePeriod] = useState('10');
  const [analysis, setAnalysis] = useState<ReturnAnalysis | null>(null);
  const [showChart, setShowChart] = useState(false);

  const calculateRealReturn = () => {
    const investment = parseFloat(initialInvestment);
    const nominal = parseFloat(nominalReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const years = parseInt(timePeriod);
    
    // Calculate real return using Fisher equation
    const realReturn = ((1 + nominal) / (1 + inflation)) - 1;
    const realReturnPercentage = realReturn * 100;
    
    // Calculate final values
    const nominalValue = investment * Math.pow(1 + nominal, years);
    const inflationAdjustedValue = investment * Math.pow(1 + realReturn, years);
    const purchasingPower = (inflationAdjustedValue / nominalValue) * 100;
    const purchasingPowerLoss = 100 - purchasingPower;
    
    // Generate year-by-year data
    const yearByYearData = [];
    for (let year = 1; year <= years; year++) {
      const yearNominalValue = investment * Math.pow(1 + nominal, year);
      const yearInflationAdjustedValue = investment * Math.pow(1 + realReturn, year);
      const yearPurchasingPower = (yearInflationAdjustedValue / yearNominalValue) * 100;
      const yearRealReturn = ((yearInflationAdjustedValue / investment) - 1) * 100;
      
      yearByYearData.push({
        year,
        nominalValue: yearNominalValue,
        inflationAdjustedValue: yearInflationAdjustedValue,
        purchasingPower: yearPurchasingPower,
        realReturn: yearRealReturn
      });
    }
    
    setAnalysis({
      nominalReturn: nominal * 100,
      inflationRate: inflation * 100,
      realReturn: realReturn * 100,
      purchasingPower,
      inflationAdjustedValue,
      realReturnPercentage,
      purchasingPowerLoss,
      yearByYearData
    });
    setShowChart(true);
  };

  const resetForm = () => {
    setInitialInvestment('100000');
    setNominalReturn('12');
    setInflationRate('6');
    setTimePeriod('10');
    setAnalysis(null);
    setShowChart(false);
  };

  const getReturnAssessment = () => {
    if (!analysis) return '';
    
    if (analysis.realReturn > 5) {
      return 'Excellent real returns - your investment is significantly beating inflation.';
    } else if (analysis.realReturn > 2) {
      return 'Good real returns - your investment is moderately beating inflation.';
    } else if (analysis.realReturn > 0) {
      return 'Moderate real returns - your investment is barely beating inflation.';
    } else {
      return 'Poor real returns - your investment is not keeping up with inflation.';
    }
  };

  const getInflationImpact = () => {
    if (!analysis) return '';
    
    if (analysis.inflationRate > 8) {
      return 'High inflation significantly erodes purchasing power.';
    } else if (analysis.inflationRate > 5) {
      return 'Moderate inflation affects purchasing power.';
    } else {
      return 'Low inflation has minimal impact on purchasing power.';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Real vs Nominal Return Calculator - Inflation-Adjusted Returns | MoneyCal"
        description="Calculate real vs nominal returns with inflation adjustment. Understand how inflation affects your investment purchasing power with our comprehensive return analysis tool."
        keywords="real vs nominal return, inflation adjusted returns, purchasing power Calculator, investment return analysis, inflation impact calculator"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Real vs Nominal Return Calculator
              </h1>
              <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                Calculate real vs nominal returns with inflation adjustment. 
                Understand how inflation affects your investment purchasing power.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-indigo-100">
                <div className="flex items-center">
                  <Percent className="w-4 h-4 mr-2" />
                  Inflation Adjustment
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Return Analysis
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Purchasing Power
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
                  <IndianRupee className="h-6 w-6 mr-3 text-indigo-600" />
                  Return Parameters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(e.target.value)}
                      placeholder="100000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nominal Return (%)
                    </label>
                    <input
                      type="number"
                      value={nominalReturn}
                      onChange={(e) => setNominalReturn(e.target.value)}
                      placeholder="12"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(e.target.value)}
                      placeholder="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                      placeholder="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-3">Parameters Explained</h3>
                    <div className="space-y-2 text-sm text-indigo-700">
                      <p><strong>Nominal Return:</strong> The stated return without considering inflation.</p>
                      <p><strong>Real Return:</strong> Return adjusted for inflation (purchasing power).</p>
                      <p><strong>Inflation Rate:</strong> Annual rate at which prices increase.</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateRealReturn}
                      className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                    >
                      Calculate Real Returns
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
                  <BarChart3 className="h-6 w-6 mr-3 text-indigo-600" />
                  Return Analysis Results
                </h2>

                {analysis ? (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">Nominal Return</h3>
                        <p className="text-2xl font-bold text-blue-900">{analysis.nominalReturn.toFixed(2)}%</p>
                        <p className="text-sm text-blue-700">Stated return</p>
                  </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">Real Return</h3>
                        <p className="text-2xl font-bold text-green-900">{analysis.realReturn.toFixed(2)}%</p>
                        <p className="text-sm text-green-700">Inflation adjusted</p>
                </div>
                    </div>

                    {/* Inflation Impact */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Inflation Impact</h3>
                      <div className="space-y-2 text-sm text-red-700">
                        <div className="flex justify-between">
                          <span>Inflation Rate:</span>
                          <span className="font-semibold">{analysis.inflationRate.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Purchasing Power:</span>
                          <span className="font-semibold">{analysis.purchasingPower.toFixed(1)}%</span>
                    </div>
                        <div className="flex justify-between">
                          <span>Power Loss:</span>
                          <span className="font-semibold">{analysis.purchasingPowerLoss.toFixed(1)}%</span>
                  </div>
                    </div>
                    </div>

                    {/* Final Values */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-purple-800 mb-3">Final Values</h3>
                      <div className="space-y-2 text-sm text-purple-700">
                        <div className="flex justify-between">
                          <span>Nominal Value:</span>
                          <span className="font-semibold">₹{(parseFloat(initialInvestment) * Math.pow(1 + analysis.nominalReturn/100, parseInt(timePeriod))).toLocaleString()}</span>
                </div>
                    <div className="flex justify-between">
                          <span>Real Value:</span>
                          <span className="font-semibold">₹{analysis.inflationAdjustedValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                          <span>Value Difference:</span>
                          <span className="font-semibold">₹{((parseFloat(initialInvestment) * Math.pow(1 + analysis.nominalReturn/100, parseInt(timePeriod))) - analysis.inflationAdjustedValue).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Assessment */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Return Assessment
                      </h3>
                      <p className="text-yellow-700">{getReturnAssessment()}</p>
                      <p className="text-yellow-700 mt-2">{getInflationImpact()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter parameters to calculate real returns</p>
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
                  <LineChart className="h-6 w-6 mr-3 text-indigo-600" />
                  Year-by-Year Analysis
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Nominal Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Real Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Purchasing Power</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Real Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.yearByYearData.slice(0, 20).map((data, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{data.year}</td>
                          <td className="py-3 px-4 text-right">₹{data.nominalValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.inflationAdjustedValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">{data.purchasingPower.toFixed(1)}%</td>
                          <td className={`py-3 px-4 text-right font-semibold ${data.realReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.realReturn.toFixed(2)}%
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
                Understanding Real vs Nominal Returns
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Nominal Returns
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The stated return on an investment without considering the impact of inflation.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Example:</strong> 12% nominal return</p>
                    <p><strong>Limitation:</strong> Doesn't show true purchasing power</p>
                    <p><strong>Use:</strong> For comparing investment options</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    Real Returns
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The actual return adjusted for inflation, showing true purchasing power.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Formula:</strong> (1 + Nominal) / (1 + Inflation) - 1</p>
                    <p><strong>Benefit:</strong> Shows true wealth creation</p>
                    <p><strong>Use:</strong> For long-term planning</p>
                </div>
              </div>
              
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingDown className="w-5 h-5 mr-2 text-red-600" />
                    Inflation Impact
                  </h3>
                  <p className="text-gray-700 mb-4">
                    How rising prices reduce the purchasing power of your investment returns.
                  </p>
                  <div className="space-y-2 text-sm text-red-700">
                    <p><strong>Effect:</strong> Reduces real returns</p>
                    <p><strong>Risk:</strong> Higher inflation = lower real returns</p>
                    <p><strong>Protection:</strong> Invest in inflation-beating assets</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Purchasing Power
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The amount of goods and services your money can buy over time.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Decline:</strong> Inflation reduces purchasing power</p>
                    <p><strong>Goal:</strong> Maintain or increase purchasing power</p>
                    <p><strong>Strategy:</strong> Invest in assets that beat inflation</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Why Real Returns Matter
                </h3>
                <div className="space-y-4 text-indigo-700">
                  <p>
                    <strong>True Wealth Creation:</strong> Real returns show whether your investment is actually 
                    creating wealth or just keeping pace with inflation.
                  </p>
                  <p>
                    <strong>Long-term Planning:</strong> For retirement and long-term goals, real returns are 
                    more important than nominal returns.
                  </p>
                  <p>
                    <strong>Investment Decisions:</strong> Comparing real returns helps you choose better 
                    investment options that truly grow your wealth.
                  </p>
                  <p>
                    <strong>Risk Assessment:</strong> Understanding inflation risk helps you protect your 
                    purchasing power over time.
                  </p>
                </div>
                </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Investment Strategies for Real Returns
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Equity Investments:</strong> Stocks historically provide returns that beat inflation 
                    over the long term.
                  </p>
                  <p>
                    <strong>Real Estate:</strong> Property values and rental income typically increase with inflation.
                  </p>
                  <p>
                    <strong>Commodities:</strong> Gold and other commodities can hedge against inflation.
                  </p>
                  <p>
                    <strong>Inflation-Protected Securities:</strong> Government bonds that adjust for inflation.
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

export default RealVsNominalReturnCalculator;
