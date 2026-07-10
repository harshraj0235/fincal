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
  ArrowUpRight, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';


const SIPStepUpPlanner: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState(5000);
  const [stepUpAmount, setStepUpAmount] = useState(1000);
  const [stepUpFrequency, setStepUpFrequency] = useState(12);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);

  const calculateStepUpSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    let totalCorpus = 0;
    let totalInvestment = 0;

    for (let month = 1; month <= totalMonths; month++) {
      const stepUps = Math.floor((month - 1) / stepUpFrequency);
      const currentSIPAmount = initialAmount + (stepUps * stepUpAmount);
      const monthsRemaining = totalMonths - month + 1;
      const monthCorpus = currentSIPAmount * 
          ((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate);
      
      totalCorpus += monthCorpus;
      totalInvestment += currentSIPAmount;
    }

    const regularSIPCorpus = initialAmount * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    const regularSIPInvestment = initialAmount * totalMonths;

    return {
      totalCorpus: Math.round(totalCorpus),
      totalInvestment: Math.round(totalInvestment),
      regularSIPCorpus: Math.round(regularSIPCorpus),
      regularSIPInvestment: Math.round(regularSIPInvestment),
      additionalCorpus: Math.round(totalCorpus - regularSIPCorpus),
      percentageIncrease: Math.round(((totalCorpus - regularSIPCorpus) / regularSIPCorpus) * 100)
    };
  };

  const result = calculateStepUpSIP();

  return (
    <>
      <SEOHelmet
        title="SIP Step-up Planner - Plan and Visualize Your Step-up SIP Strategy | MoneyCal"
        description="Plan and visualize your step-up SIP strategy for wealth creation. Use our SIP step-up planner to understand how increasing your investments systematically can boost your returns."
        keywords="SIP step-up planner, step up SIP Calculator, systematic investment plan, wealth creation, investment strategy, SIP increase calculator"
      />


      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-green-200 transition-colors">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                SIP Step-up Planner
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Plan and visualize your step-up SIP strategy for wealth creation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-green-600" />
                  Plan Your Step-up SIP
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Monthly SIP Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="5000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Step-up Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={stepUpAmount}
                      onChange={(e) => setStepUpAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="1000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Step-up Frequency (Months)
                    </label>
                    <select
                      value={stepUpFrequency}
                      onChange={(e) => setStepUpFrequency(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value={6}>Every 6 months</option>
                      <option value={12}>Every 12 months</option>
                      <option value={18}>Every 18 months</option>
                      <option value={24}>Every 24 months</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="space-y-6"
              >
                {/* Step-up SIP Results */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Step-up SIP Results</h3>
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-bold mb-2">₹{result.totalCorpus.toLocaleString()}</div>
                  <p className="text-green-100">Final Corpus after {investmentPeriod} years</p>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <ArrowUpRight className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Step-up SIP</h4>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ₹{result.totalCorpus.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Final Corpus</p>
                    <p className="text-xs text-green-600 mt-1">+{result.percentageIncrease}% vs Regular SIP</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Regular SIP</h4>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ₹{result.regularSIPCorpus.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Final Corpus</p>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Investment Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment (Step-up):</span>
                      <span className="font-semibold">₹{result.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment (Regular):</span>
                      <span className="font-semibold">₹{result.regularSIPInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Additional Investment:</span>
                      <span className="font-semibold text-green-600">
                        ₹{(result.totalInvestment - result.regularSIPInvestment).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Additional Corpus:</span>
                      <span className="font-semibold text-green-600">
                        ₹{result.additionalCorpus.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Step-up SIP</h2>
              <p className="text-lg text-gray-600">Why step-up SIP is an excellent wealth creation strategy</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-green-100 rounded-full p-3 w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Higher Returns</h3>
                <p className="text-gray-600">Step-up SIP generates significantly higher returns compared to regular SIP due to increased investment amounts over time</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Goal Achievement</h3>
                <p className="text-gray-600">Helps achieve financial goals faster by increasing investment capacity as your income grows</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-purple-100 rounded-full p-3 w-fit mb-4">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Approach</h3>
                <p className="text-gray-600">Allows you to start small and increase investments gradually as your financial situation improves</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Finance Tools</h2>
              <p className="text-lg text-gray-600">Explore other tools to enhance your investment planning</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/finance-tools/sip-delay-loss-calculator"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">SIP Delay Loss Calculator</h3>
                <p className="text-gray-600 text-sm">Calculate the opportunity cost of delaying your SIP investments</p>
              </Link>

              <Link
                to="/finance-tools/lumpsum-vs-sip-analyzer"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lumpsum vs SIP Analyzer</h3>
                <p className="text-gray-600 text-sm">Compare lumpsum vs SIP investment strategies for optimal returns</p>
              </Link>

              <Link
                to="/finance-tools/xirr-calculator"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-4">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">XIRR Calculator</h3>
                <p className="text-gray-600 text-sm">Calculate Extended Internal Rate of Return for complex investment scenarios</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SIPStepUpPlanner;
