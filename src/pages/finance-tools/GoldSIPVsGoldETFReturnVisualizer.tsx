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
  Smartphone
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface GoldInvestment {
  type: 'SIP' | 'ETF';
  monthlyAmount: number;
  totalInvested: number;
  currentValue: number;
  returns: number;
  returnPercentage: number;
  timePeriod: number;
  goldPrice: number;
  units: number;
}

const GoldSIPVsGoldETFReturnVisualizer: React.FC = () => {
  const [sipAmount, setSipAmount] = useState('10000');
  const [timePeriod, setTimePeriod] = useState('5');
  const [goldPrice, setGoldPrice] = useState('65000');
  const [goldReturn, setGoldReturn] = useState('12');
  const [sipExpenseRatio, setSipExpenseRatio] = useState('0.5');
  const [etfExpenseRatio, setEtfExpenseRatio] = useState('0.1');
  const [results, setResults] = useState<{ sip: GoldInvestment; etf: GoldInvestment } | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const calculateReturns = () => {
    const monthlyAmount = parseFloat(sipAmount);
    const years = parseFloat(timePeriod);
    const currentGoldPrice = parseFloat(goldPrice);
    const annualReturn = parseFloat(goldReturn) / 100;
    const sipExpense = parseFloat(sipExpenseRatio) / 100;
    const etfExpense = parseFloat(etfExpenseRatio) / 100;

    // Calculate SIP returns
    const sipTotalInvested = monthlyAmount * 12 * years;
    const sipNetReturn = annualReturn - sipExpense;
    const sipFutureValue = monthlyAmount * ((Math.pow(1 + sipNetReturn, years) - 1) / sipNetReturn) * (1 + sipNetReturn);
    const sipReturns = sipFutureValue - sipTotalInvested;
    const sipReturnPercentage = (sipReturns / sipTotalInvested) * 100;
    const sipUnits = sipFutureValue / currentGoldPrice;

    // Calculate ETF returns (assuming lumpsum equivalent)
    const etfTotalInvested = sipTotalInvested;
    const etfNetReturn = annualReturn - etfExpense;
    const etfFutureValue = etfTotalInvested * Math.pow(1 + etfNetReturn, years);
    const etfReturns = etfFutureValue - etfTotalInvested;
    const etfReturnPercentage = (etfReturns / etfTotalInvested) * 100;
    const etfUnits = etfFutureValue / currentGoldPrice;

    setResults({
      sip: {
        type: 'SIP',
        monthlyAmount,
        totalInvested: sipTotalInvested,
        currentValue: sipFutureValue,
        returns: sipReturns,
        returnPercentage: sipReturnPercentage,
        timePeriod: years,
        goldPrice: currentGoldPrice,
        units: sipUnits
      },
      etf: {
        type: 'ETF',
        monthlyAmount,
        totalInvested: etfTotalInvested,
        currentValue: etfFutureValue,
        returns: etfReturns,
        returnPercentage: etfReturnPercentage,
        timePeriod: years,
        goldPrice: currentGoldPrice,
        units: etfUnits
      }
    });
  };

  useEffect(() => {
    if (sipAmount && timePeriod && goldPrice && goldReturn) {
      calculateReturns();
    }
  }, [sipAmount, timePeriod, goldPrice, goldReturn, sipExpenseRatio, etfExpenseRatio]);

  const resetForm = () => {
    setSipAmount('10000');
    setTimePeriod('5');
    setGoldPrice('65000');
    setGoldReturn('12');
    setSipExpenseRatio('0.5');
    setEtfExpenseRatio('0.1');
    setResults(null);
    setShowDetails(false);
  };

  const getRecommendation = () => {
    if (!results) return '';
    
    const difference = results.etf.returns - results.sip.returns;
    const percentageDiff = ((results.etf.currentValue - results.sip.currentValue) / results.sip.currentValue) * 100;
    
    if (difference > 0) {
      return `Gold ETF is better by ₹${difference.toLocaleString()} (${percentageDiff.toFixed(2)}% higher returns)`;
    } else {
      return `Gold SIP is better by ₹${Math.abs(difference).toLocaleString()} (${Math.abs(percentageDiff).toFixed(2)}% higher returns)`;
    }
  };

  return (
    <>
      <SEOHelmet
        title="Gold SIP vs Gold ETF Return Visualizer - Compare Gold Investment Strategies | MoneyCal"
        description="Compare Gold SIP vs Gold ETF returns with our advanced calculator. Analyze expense ratios, time periods, and investment amounts to choose the best gold investment strategy for your portfolio."
        keywords="gold SIP vs ETF, gold investment calculator, gold ETF returns, gold SIP calculator, gold investment strategy, gold mutual fund vs ETF, gold investment comparison"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Gold SIP vs Gold ETF Return Visualizer
              </h1>
              <p className="text-xl text-yellow-100 mb-8 max-w-3xl mx-auto">
                Compare Gold SIP and Gold ETF investment strategies. Analyze returns, expense ratios, 
                and choose the optimal gold investment approach for your financial goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-yellow-100">
                <div className="flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  Advanced Calculator
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Visual Comparison
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Expert Analysis
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
                  <Calculator className="h-6 w-6 mr-3 text-yellow-600" />
                  Investment Parameters
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(e.target.value)}
                      placeholder="Enter monthly amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Time Period (Years)
                    </label>
                    <input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      placeholder="Enter time period"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Gold Price (₹ per 10g)
                    </label>
                    <input
                      type="number"
                      value={goldPrice}
                      onChange={(e) => setGoldPrice(e.target.value)}
                      placeholder="Enter current gold price"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Gold Return (%)
                    </label>
                    <input
                      type="number"
                      value={goldReturn}
                      onChange={(e) => setGoldReturn(e.target.value)}
                      placeholder="Enter expected return"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gold SIP Expense Ratio (%)
                      </label>
                      <input
                        type="number"
                        value={sipExpenseRatio}
                        onChange={(e) => setSipExpenseRatio(e.target.value)}
                        placeholder="0.5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gold ETF Expense Ratio (%)
                      </label>
                      <input
                        type="number"
                        value={etfExpenseRatio}
                        onChange={(e) => setEtfExpenseRatio(e.target.value)}
                        placeholder="0.1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateReturns}
                      className="flex-1 bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
                    >
                      Calculate Returns
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
                  <BarChart3 className="h-6 w-6 mr-3 text-yellow-600" />
                  Comparison Results
                </h2>

                {results ? (
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="text-blue-800 font-medium">{getRecommendation()}</p>
                      </div>
                    </div>

                    {/* Gold SIP Results */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Gold SIP Results
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-yellow-700">Total Invested:</p>
                          <p className="font-bold text-yellow-900">₹{results.sip.totalInvested.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-yellow-700">Current Value:</p>
                          <p className="font-bold text-yellow-900">₹{results.sip.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-yellow-700">Returns:</p>
                          <p className="font-bold text-yellow-900">₹{results.sip.returns.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-yellow-700">Return %:</p>
                          <p className="font-bold text-yellow-900">{results.sip.returnPercentage.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-yellow-700">Gold Units:</p>
                          <p className="font-bold text-yellow-900">{results.sip.units.toFixed(3)} g</p>
                        </div>
                        <div>
                          <p className="text-yellow-700">Monthly Amount:</p>
                          <p className="font-bold text-yellow-900">₹{results.sip.monthlyAmount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Gold ETF Results */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Gold ETF Results
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-orange-700">Total Invested:</p>
                          <p className="font-bold text-orange-900">₹{results.etf.totalInvested.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-orange-700">Current Value:</p>
                          <p className="font-bold text-orange-900">₹{results.etf.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-orange-700">Returns:</p>
                          <p className="font-bold text-orange-900">₹{results.etf.returns.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-orange-700">Return %:</p>
                          <p className="font-bold text-orange-900">{results.etf.returnPercentage.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-orange-700">Gold Units:</p>
                          <p className="font-bold text-orange-900">{results.etf.units.toFixed(3)} g</p>
                        </div>
                        <div>
                          <p className="text-orange-700">Monthly Amount:</p>
                          <p className="font-bold text-orange-900">₹{results.etf.monthlyAmount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Comparison */}
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                    >
                      {showDetails ? 'Hide' : 'Show'} Detailed Analysis
                    </button>

                    {showDetails && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Detailed Analysis</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Value Difference:</span>
                            <span className="font-bold">₹{(results.etf.currentValue - results.sip.currentValue).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Return Difference:</span>
                            <span className="font-bold">₹{(results.etf.returns - results.sip.returns).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gold Units Difference:</span>
                            <span className="font-bold">{(results.etf.units - results.sip.units).toFixed(3)} g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expense Ratio Difference:</span>
                            <span className="font-bold">{(parseFloat(sipExpenseRatio) - parseFloat(etfExpenseRatio)).toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter investment parameters to see comparison results</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Gold SIP vs Gold ETF: Understanding the Differences
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Gold SIP (Systematic Investment Plan)
                  </h3>
                  <ul className="space-y-2 text-yellow-700">
                    <li>• Regular monthly investments in gold mutual funds</li>
                    <li>• Rupee cost averaging benefits</li>
                    <li>• Higher expense ratios (0.5-1%)</li>
                    <li>• Professional fund management</li>
                    <li>• Better for beginners and small investors</li>
                    <li>• Automatic investment discipline</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Gold ETF (Exchange Traded Fund)
                  </h3>
                  <ul className="space-y-2 text-orange-700">
                    <li>• Direct investment in physical gold-backed securities</li>
                    <li>• Lower expense ratios (0.1-0.3%)</li>
                    <li>• Higher liquidity and trading flexibility</li>
                    <li>• Direct gold price tracking</li>
                    <li>• Better for experienced investors</li>
                    <li>• Requires active management</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Key Factors to Consider
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Investment Amount</h4>
                    <p className="text-blue-700 text-sm">
                      Gold SIPs are better for small regular investments, while ETFs are ideal for larger lump-sum investments.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Time Horizon</h4>
                    <p className="text-blue-700 text-sm">
                      Longer investment periods favor ETFs due to lower expense ratios, while SIPs provide better rupee cost averaging.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Risk Tolerance</h4>
                    <p className="text-blue-700 text-sm">
                      SIPs offer better risk management through averaging, while ETFs provide direct gold price exposure.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Liquidity Needs</h4>
                    <p className="text-blue-700 text-sm">
                      ETFs offer higher liquidity and can be traded throughout market hours, while SIPs have exit load considerations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Investment Recommendations
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>For Beginners:</strong> Start with Gold SIPs for disciplined investing and rupee cost averaging benefits.
                  </p>
                  <p>
                    <strong>For Experienced Investors:</strong> Consider Gold ETFs for lower costs and better liquidity.
                  </p>
                  <p>
                    <strong>For Large Investments:</strong> ETFs are more cost-effective due to lower expense ratios.
                  </p>
                  <p>
                    <strong>For Regular Savings:</strong> SIPs provide automatic investment discipline and better psychological benefits.
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

export default GoldSIPVsGoldETFReturnVisualizer;