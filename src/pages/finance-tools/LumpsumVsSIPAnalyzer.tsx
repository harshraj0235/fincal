import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  Target,
  CheckCircle,
  DollarSign,
  ArrowUpRight,
  BarChart3,
  PieChart
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';


const LumpsumVsSIPAnalyzer: React.FC = () => {
  const [lumpsumAmount, setLumpsumAmount] = useState(100000);
  const [sipAmount, setSipAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);

  const calculateReturns = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    // Calculate lumpsum returns
    const lumpsumCorpus = lumpsumAmount * Math.pow(1 + monthlyRate, totalMonths);
    
    // Calculate SIP returns
    const sipCorpus = sipAmount * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    // Calculate total SIP investment
    const totalSipInvestment = sipAmount * totalMonths;
    
    // Calculate lumpsum profit
    const lumpsumProfit = lumpsumCorpus - lumpsumAmount;
    
    // Calculate SIP profit
    const sipProfit = sipCorpus - totalSipInvestment;
    
    // Calculate ROI percentages
    const lumpsumROI = ((lumpsumProfit / lumpsumAmount) * 100);
    const sipROI = ((sipProfit / totalSipInvestment) * 100);
    
    return {
      lumpsumCorpus: Math.round(lumpsumCorpus),
      sipCorpus: Math.round(sipCorpus),
      lumpsumProfit: Math.round(lumpsumProfit),
      sipProfit: Math.round(sipProfit),
      totalSipInvestment: Math.round(totalSipInvestment),
      lumpsumROI: Math.round(lumpsumROI * 100) / 100,
      sipROI: Math.round(sipROI * 100) / 100,
      difference: Math.round(lumpsumCorpus - sipCorpus),
      betterOption: lumpsumCorpus > sipCorpus ? 'Lumpsum' : 'SIP'
    };
  };

  const result = calculateReturns();

  return (
    <>
      <SEOHelmet
        title="Lumpsum vs SIP Analyzer - Compare Investment Strategies | MoneyCal"
        description="Compare lumpsum vs SIP investment strategies for optimal returns. Use our analyzer to understand which approach works better for your financial goals."
        keywords="lumpsum vs SIP, investment comparison, lumpsum investment, SIP calculator, investment strategy, wealth creation"
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
                Lumpsum vs SIP Analyzer
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Compare lumpsum vs SIP investment strategies for optimal returns
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
                  Compare Investment Strategies
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lumpsum Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={lumpsumAmount}
                      onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="100000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly SIP Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="10000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      placeholder="12"
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
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
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
                {/* Winner Card */}
                <div className={`bg-gradient-to-br ${result.betterOption === 'Lumpsum' ? 'from-blue-500 to-blue-600' : 'from-green-500 to-green-600'} rounded-2xl p-6 md:p-8 text-white shadow-xl`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Better Option</h3>
                    <Target className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="text-2xl md:text-4xl font-bold mb-2">{result.betterOption}</div>
                  <p className="text-blue-100 md:text-green-100 text-sm md:text-base">
                    Higher returns after {investmentPeriod} years
                  </p>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Lumpsum</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-blue-600 mb-1">
                      ₹{result.lumpsumCorpus.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Final Corpus</p>
                    <p className="text-xs text-blue-600 mt-1">ROI: {result.lumpsumROI}%</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">SIP</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                      ₹{result.sipCorpus.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Final Corpus</p>
                    <p className="text-xs text-green-600 mt-1">ROI: {result.sipROI}%</p>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <DollarSign className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Investment Summary
                  </h4>
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lumpsum Investment:</span>
                      <span className="font-semibold">₹{lumpsumAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total SIP Investment:</span>
                      <span className="font-semibold">₹{result.totalSipInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lumpsum Profit:</span>
                      <span className="font-semibold text-blue-600">
                        ₹{result.lumpsumProfit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SIP Profit:</span>
                      <span className="font-semibold text-green-600">
                        ₹{result.sipProfit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difference:</span>
                      <span className={`font-semibold ${result.difference > 0 ? 'text-blue-600' : 'text-green-600'}`}>
                        ₹{Math.abs(result.difference).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Investment Strategy Comparison</h2>
              <p className="text-base md:text-lg text-gray-600">Understanding the pros and cons of each approach</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Lumpsum Investment</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <p className="text-gray-600">✅ Higher potential returns in bull markets</p>
                  <p className="text-gray-600">✅ No need to remember monthly investments</p>
                  <p className="text-gray-600">❌ Higher risk due to market timing</p>
                  <p className="text-gray-600">❌ Requires large initial capital</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-green-100 rounded-full p-3 w-fit mb-4">
                  <PieChart className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">SIP Investment</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <p className="text-gray-600">✅ Rupee cost averaging reduces risk</p>
                  <p className="text-gray-600">✅ Lower initial capital requirement</p>
                  <p className="text-gray-600">✅ Disciplined investment approach</p>
                  <p className="text-gray-600">❌ May miss out on early market gains</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        <section className="py-8 md:py-16 bg-gray-50">
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
                to="/finance-tools/sip-step-up-planner"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">SIP Step-up Planner</h3>
                <p className="text-gray-600 text-xs md:text-sm">Plan and visualize your step-up SIP strategy for wealth creation</p>
              </Link>

              <Link
                to="/finance-tools/xirr-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-3 md:mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">XIRR Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate Extended Internal Rate of Return for complex investment scenarios</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LumpsumVsSIPAnalyzer;