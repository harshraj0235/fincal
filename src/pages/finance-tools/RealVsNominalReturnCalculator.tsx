import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  Target,
  CheckCircle,
  ArrowUpRight,
  BarChart3,
  PieChart,
  AlertTriangle
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';


const RealVsNominalReturnCalculator: React.FC = () => {
  const [nominalReturn, setNominalReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);

  const calculateRealReturn = () => {
    // Real Return = ((1 + Nominal Return) / (1 + Inflation Rate)) - 1
    const realReturn = ((1 + nominalReturn / 100) / (1 + inflationRate / 100)) - 1;
    
    // Calculate nominal corpus
    const nominalCorpus = investmentAmount * Math.pow(1 + nominalReturn / 100, investmentPeriod);
    
    // Calculate real corpus (inflation-adjusted)
    const realCorpus = investmentAmount * Math.pow(1 + realReturn, investmentPeriod);
    
    // Calculate nominal profit
    const nominalProfit = nominalCorpus - investmentAmount;
    
    // Calculate real profit
    const realProfit = realCorpus - investmentAmount;
    
    // Calculate purchasing power loss
    const purchasingPowerLoss = nominalProfit - realProfit;
    
    // Calculate effective annual return
    const effectiveAnnualReturn = Math.pow(1 + realReturn, 1/investmentPeriod) - 1;
    
    return {
      realReturn: realReturn * 100,
      nominalCorpus: Math.round(nominalCorpus),
      realCorpus: Math.round(realCorpus),
      nominalProfit: Math.round(nominalProfit),
      realProfit: Math.round(realProfit),
      purchasingPowerLoss: Math.round(purchasingPowerLoss),
      effectiveAnnualReturn: effectiveAnnualReturn * 100,
      inflationImpact: ((nominalReturn - inflationRate) / (1 + inflationRate / 100)) * 100
    };
  };

  const result = calculateRealReturn();

  return (
    <>
      <SEOHelmet
        title="Real vs Nominal Return Calculator - Inflation-Adjusted Returns | MoneyCal"
        description="Calculate real returns by adjusting nominal returns for inflation. Understand the true purchasing power of your investments with our inflation-adjusted return calculator."
        keywords="real return calculator, nominal return, inflation adjustment, purchasing power, investment returns, inflation impact"
      />


      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-600 via-blue-600 to-green-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-green-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Real vs Nominal Return Calculator
              </h1>
              <p className="text-lg md:text-xl text-green-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Calculate inflation-adjusted returns to understand your true investment performance
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
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-green-600" />
                  Calculate Real Returns
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nominal Return (%)
                    </label>
                    <input
                      type="number"
                      value={nominalReturn}
                      onChange={(e) => setNominalReturn(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      placeholder="12"
                    />
                    <p className="text-xs text-gray-500 mt-1">Your investment's stated return rate</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      placeholder="6"
                    />
                    <p className="text-xs text-gray-500 mt-1">Expected annual inflation rate</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      placeholder="100000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <input
                      type="number"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      placeholder="10"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                {/* Real Return Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Real Return</h3>
                    <Target className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="text-2xl md:text-4xl font-bold mb-2">{result.realReturn.toFixed(2)}%</div>
                  <p className="text-green-100 text-sm md:text-base">
                    Inflation-adjusted return rate
                  </p>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Nominal</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-blue-600 mb-1">
                      ₹{result.nominalCorpus.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Final Corpus</p>
                    <p className="text-xs text-blue-600 mt-1">Profit: ₹{result.nominalProfit.toLocaleString()}</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Real</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                      ₹{result.realCorpus.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Final Corpus</p>
                    <p className="text-xs text-green-600 mt-1">Profit: ₹{result.realProfit.toLocaleString()}</p>
                  </div>
                </div>

                {/* Inflation Impact */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-orange-600" />
                    Inflation Impact Analysis
                  </h4>
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purchasing Power Loss:</span>
                      <span className="font-semibold text-orange-600">
                        ₹{result.purchasingPowerLoss.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Effective Annual Return:</span>
                      <span className="font-semibold text-green-600">
                        {result.effectiveAnnualReturn.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inflation Impact:</span>
                      <span className="font-semibold text-red-600">
                        {result.inflationImpact.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Understanding Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Understanding Real vs Nominal Returns</h2>
              <p className="text-base md:text-lg text-gray-600">Why inflation adjustment matters for your investments</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Nominal Returns</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <p className="text-gray-600">✅ Stated return rate on your investment</p>
                  <p className="text-gray-600">✅ Does not account for inflation</p>
                  <p className="text-gray-600">❌ Can be misleading in high inflation periods</p>
                  <p className="text-gray-600">❌ Doesn't show true purchasing power</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-green-100 rounded-full p-3 w-fit mb-4">
                  <PieChart className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Real Returns</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <p className="text-gray-600">✅ Inflation-adjusted return rate</p>
                  <p className="text-gray-600">✅ Shows true purchasing power</p>
                  <p className="text-gray-600">✅ Better measure of actual performance</p>
                  <p className="text-gray-600">✅ Helps in investment decision making</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formula Section */}
        <section className="py-8 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How Real Returns Are Calculated</h2>
              <p className="text-base md:text-lg text-gray-600">The mathematical formula behind inflation adjustment</p>
            </motion.div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Real Return Formula</h3>
                <div className="bg-gray-100 rounded-lg p-4 md:p-6 text-lg md:text-xl font-mono">
                  Real Return = ((1 + Nominal Return) / (1 + Inflation Rate)) - 1
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Example Calculation:</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nominal Return:</strong> 12%</p>
                    <p><strong>Inflation Rate:</strong> 6%</p>
                    <p><strong>Real Return:</strong> ((1 + 0.12) / (1 + 0.06)) - 1 = 5.66%</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Key Insights:</h4>
                  <div className="space-y-2 text-sm">
                    <p>• Higher inflation reduces real returns</p>
                                         <p>• Real returns can be negative if inflation &gt; nominal returns</p>
                    <p>• Important for long-term investment planning</p>
                    <p>• Helps choose inflation-beating investments</p>
                  </div>
                </div>
              </div>
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
                to="/finance-tools/lumpsum-vs-sip-analyzer"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Lumpsum vs SIP Analyzer</h3>
                <p className="text-gray-600 text-xs md:text-sm">Compare lumpsum vs SIP investment strategies for optimal returns</p>
              </Link>

              <Link
                to="/finance-tools/sip-delay-loss-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">SIP Delay Loss Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate the opportunity cost of delaying your SIP investments</p>
              </Link>

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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RealVsNominalReturnCalculator;