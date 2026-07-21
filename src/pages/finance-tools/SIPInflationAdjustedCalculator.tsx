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
  TrendingUpIcon, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface InflationAnalysis {
  monthlySIP: number;
  timePeriod: number;
  expectedReturn: number;
  inflationRate: number;
  nominalValue: number;
  realValue: number;
  inflationAdjustedReturn: number;
  purchasingPowerLoss: number;
  yearByYearData: {
    year: number;
    nominalValue: number;
    realValue: number;
    inflationAdjustedReturn: number;
    purchasingPower: number;
  }[];
  monthlyData: {
    month: number;
    nominalValue: number;
    realValue: number;
    inflationImpact: number;
  }[];
  recommendations: string[];
}

const SIPInflationAdjustedCalculator: React.FC = () => {
  const [monthlySIP, setMonthlySIP] = useState('10000');
  const [timePeriod, setTimePeriod] = useState('10');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [inflationRate, setInflationRate] = useState('6');
  const [analysis, setAnalysis] = useState<InflationAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const calculateInflationAdjustedReturns = () => {
    const sip = parseFloat(monthlySIP);
    const years = parseInt(timePeriod);
    const returnRate = parseFloat(expectedReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    
    // Calculate nominal value (without inflation adjustment)
    const monthlyReturn = returnRate / 12;
    const months = years * 12;
    let nominalValue = 0;
    
    for (let i = 1; i <= months; i++) {
      nominalValue = (nominalValue + sip) * (1 + monthlyReturn);
    }
    
    // Calculate real value (inflation adjusted)
    const realValue = nominalValue / Math.pow(1 + inflation, years);
    
    // Calculate inflation-adjusted return
    const inflationAdjustedReturn = ((realValue / (sip * months)) - 1) * 100;
    
    // Calculate purchasing power loss
    const purchasingPowerLoss = ((nominalValue - realValue) / nominalValue) * 100;
    
    // Generate year-by-year data
    const yearByYearData = [];
    for (let year = 1; year <= years; year++) {
      let yearNominalValue = 0;
      for (let month = 1; month <= year * 12; month++) {
        yearNominalValue = (yearNominalValue + sip) * (1 + monthlyReturn);
      }
      
      const yearRealValue = yearNominalValue / Math.pow(1 + inflation, year);
      const yearInflationAdjustedReturn = ((yearRealValue / (sip * year * 12)) - 1) * 100;
      const yearPurchasingPower = (yearRealValue / yearNominalValue) * 100;
      
      yearByYearData.push({
        year,
        nominalValue: yearNominalValue,
        realValue: yearRealValue,
        inflationAdjustedReturn: yearInflationAdjustedReturn,
        purchasingPower: yearPurchasingPower
      });
    }
    
    // Generate monthly data for first 2 years
    const monthlyData = [];
    for (let month = 1; month <= Math.min(24, months); month++) {
      let monthNominalValue = 0;
      for (let m = 1; m <= month; m++) {
        monthNominalValue = (monthNominalValue + sip) * (1 + monthlyReturn);
      }
      
      const monthRealValue = monthNominalValue / Math.pow(1 + inflation, month / 12);
      const monthInflationImpact = ((monthNominalValue - monthRealValue) / monthNominalValue) * 100;
      
      monthlyData.push({
        month,
        nominalValue: monthNominalValue,
        realValue: monthRealValue,
        inflationImpact: monthInflationImpact
      });
    }
    
    // Generate recommendations
    const recommendations = [];
    if (inflationAdjustedReturn < 5) {
      recommendations.push('Consider increasing your SIP amount to compensate for inflation.');
    }
    if (inflationAdjustedReturn < returnRate - inflation) {
      recommendations.push('Your real returns are lower than expected. Review your investment strategy.');
    }
    if (purchasingPowerLoss > 30) {
      recommendations.push('High inflation is significantly eroding your purchasing power.');
    }
    if (recommendations.length === 0) {
      recommendations.push('Your investment strategy is well-positioned against inflation.');
    }
    
    setAnalysis({
      monthlySIP: sip,
      timePeriod: years,
      expectedReturn: returnRate * 100,
      inflationRate: inflation * 100,
      nominalValue,
      realValue,
      inflationAdjustedReturn,
      purchasingPowerLoss,
      yearByYearData,
      monthlyData,
      recommendations
    });
    setShowAnalysis(true);
  };

  const resetForm = () => {
    setMonthlySIP('10000');
    setTimePeriod('10');
    setExpectedReturn('12');
    setInflationRate('6');
    setAnalysis(null);
    setShowAnalysis(false);
  };

  const getInflationAssessment = () => {
    if (!analysis) return '';
    
    if (analysis.inflationAdjustedReturn > 8) {
      return 'Excellent - Your investments are well-protected against inflation.';
    } else if (analysis.inflationAdjustedReturn > 5) {
      return 'Good - Your real returns are positive and reasonable.';
    } else if (analysis.inflationAdjustedReturn > 0) {
      return 'Moderate - Your real returns are positive but low.';
    } else {
      return 'Poor - Your investments are losing value in real terms.';
    }
  };

  return (
    <>
      <SEOHelmet
        title="SIP Inflation-Adjusted Calculator - Real Returns Analysis | MoneyCal"
        description="Calculate inflation-adjusted returns for SIP investments. Understand how inflation affects your real returns and purchasing power over time."
        keywords="SIP inflation Calculator, real returns, inflation adjusted returns, purchasing power, SIP investment analysis"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                SIP Inflation-Adjusted Calculator
              </h1>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Calculate inflation-adjusted returns for SIP investments. Understand how 
                inflation affects your real returns and purchasing power over time.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-orange-100">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  Real Returns
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Inflation Impact
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
                  <IndianRupee className="h-6 w-6 mr-3 text-orange-600" />
                  Investment Parameters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly SIP Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlySIP}
                      onChange={(e) => setMonthlySIP(e.target.value)}
                      placeholder="10000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(e.target.value)}
                      placeholder="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-900 mb-3">Parameters Explained</h3>
                    <div className="space-y-2 text-sm text-orange-700">
                      <p><strong>Monthly SIP:</strong> Regular monthly investment amount</p>
                      <p><strong>Expected Return:</strong> Annual return rate from investments</p>
                      <p><strong>Inflation Rate:</strong> Expected annual inflation rate</p>
                      <p><strong>Real Returns:</strong> Returns adjusted for inflation</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateInflationAdjustedReturns}
                      className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
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
                  <BarChart3 className="h-6 w-6 mr-3 text-orange-600" />
                  Inflation-Adjusted Analysis
                </h2>

                {analysis ? (
                  <div className="space-y-6">
                    {/* Main Results Card */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">Inflation-Adjusted Return</h3>
                      <p className="text-4xl font-bold mb-2">{analysis.inflationAdjustedReturn.toFixed(2)}%</p>
                      <p className="text-orange-100">Real annual return after inflation</p>
                  </div>

                    {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">Nominal Value</h3>
                        <p className="text-2xl font-bold text-blue-900">₹{analysis.nominalValue.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">Real Value</h3>
                        <p className="text-2xl font-bold text-green-900">₹{analysis.realValue.toLocaleString()}</p>
                  </div>
                </div>

                    {/* Inflation Impact */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Inflation Impact</h3>
                      <div className="space-y-2 text-sm text-red-700">
                        <div className="flex justify-between">
                          <span>Purchasing Power Loss:</span>
                          <span className="font-semibold">{analysis.purchasingPowerLoss.toFixed(2)}%</span>
                    </div>
                        <div className="flex justify-between">
                          <span>Value Eroded:</span>
                          <span className="font-semibold">₹{(analysis.nominalValue - analysis.realValue).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Real vs Nominal Return:</span>
                          <span className="font-semibold">{analysis.inflationAdjustedReturn.toFixed(2)}% vs {analysis.expectedReturn.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Assessment */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Inflation Assessment
                      </h3>
                      <p className="text-yellow-700">{getInflationAssessment()}</p>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">Recommendations</h3>
                      <div className="space-y-2">
                        {analysis.recommendations.map((recommendation, index) => (
                          <p key={index} className="text-green-700">• {recommendation}</p>
                        ))}
                    </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter parameters to calculate inflation-adjusted returns</p>
                </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Year-by-Year Analysis */}
        {showAnalysis && analysis && (
          <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <LineChart className="h-6 w-6 mr-3 text-orange-600" />
                  Year-by-Year Inflation Impact
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Nominal Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Real Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Inflation-Adjusted Return</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Purchasing Power</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.yearByYearData.map((data, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{data.year}</td>
                          <td className="py-3 px-4 text-right">₹{data.nominalValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.realValue.toLocaleString()}</td>
                          <td className={`py-3 px-4 text-right font-semibold ${data.inflationAdjustedReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.inflationAdjustedReturn.toFixed(2)}%
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-orange-600">
                            {data.purchasingPower.toFixed(1)}%
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
                Understanding Inflation-Adjusted Returns
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUpIcon className="w-5 h-5 mr-2 text-orange-600" />
                    What are Real Returns?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Returns adjusted for inflation to show actual purchasing power growth.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Formula:</strong> Real Return = Nominal Return - Inflation</p>
                    <p><strong>Purpose:</strong> Show true investment performance</p>
                    <p><strong>Importance:</strong> Protect purchasing power</p>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-red-600" />
                    Inflation Impact
                  </h3>
                  <p className="text-gray-700 mb-4">
                    How inflation erodes the real value of your investments over time.
                  </p>
                  <div className="space-y-2 text-sm text-red-700">
                    <p><strong>Purchasing Power:</strong> Decreases with inflation</p>
                    <p><strong>Real Value:</strong> Nominal value adjusted for inflation</p>
                    <p><strong>Long-term Impact:</strong> Significant erosion over decades</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    SIP Benefits
                  </h3>
                  <p className="text-gray-700 mb-4">
                    How SIPs can help combat inflation over the long term.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Regular Investing:</strong> Consistent market participation</p>
                    <p><strong>Compounding:</strong> Long-term wealth building</p>
                    <p><strong>Inflation Hedge:</strong> Equity investments beat inflation</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Protection Strategies
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Ways to protect your investments from inflation.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Equity Focus:</strong> Stocks historically beat inflation</p>
                    <p><strong>Increase SIP:</strong> Compensate for inflation</p>
                    <p><strong>Diversification:</strong> Mix of asset classes</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Why Inflation-Adjusted Returns Matter
                </h3>
                <div className="space-y-4 text-orange-700">
                  <p>
                    <strong>True Performance:</strong> Nominal returns can be misleading. 
                    A 12% return with 6% inflation means only 6% real growth in purchasing power.
                  </p>
                  <p>
                    <strong>Long-term Planning:</strong> Understanding real returns helps you 
                    plan for retirement and other long-term financial goals more accurately.
                  </p>
                  <p>
                    <strong>Investment Decisions:</strong> Real returns help you choose between 
                    different investment options and assess their true value.
                  </p>
                  <p>
                    <strong>Goal Achievement:</strong> Your financial goals are based on 
                    purchasing power, not nominal amounts, making real returns crucial for planning.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Best Practices for Inflation Protection
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Invest in Equities:</strong> Historically, equity investments 
                    have provided returns that beat inflation over the long term.
                  </p>
                  <p>
                    <strong>Increase SIP Amounts:</strong> Periodically increase your SIP 
                    amount to compensate for inflation and maintain real investment value.
                  </p>
                  <p>
                    <strong>Diversify Assets:</strong> Include inflation-protected securities 
                    and real assets in your portfolio for better inflation hedging.
                  </p>
                  <p>
                    <strong>Monitor and Adjust:</strong> Regularly review your investment 
                    strategy and adjust based on changing inflation expectations.
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

export default SIPInflationAdjustedCalculator;
