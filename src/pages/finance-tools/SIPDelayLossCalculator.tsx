import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  Info, 
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';


const SIPDelayLossCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [delayMonths, setDelayMonths] = useState(6);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);

  // Calculate the opportunity cost of delaying SIP
  const calculateDelayLoss = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    // Calculate corpus if started immediately
    const immediateCorpus = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    // Calculate corpus if started after delay
    const delayedCorpus = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, totalMonths - delayMonths) - 1) / monthlyRate);
    
    const opportunityLoss = immediateCorpus - delayedCorpus;
    const totalInvestment = monthlyInvestment * totalMonths;
    const delayedInvestment = monthlyInvestment * (totalMonths - delayMonths);
    
    return {
      immediateCorpus: Math.round(immediateCorpus),
      delayedCorpus: Math.round(delayedCorpus),
      opportunityLoss: Math.round(opportunityLoss),
      totalInvestment,
      delayedInvestment,
      percentageLoss: Math.round((opportunityLoss / immediateCorpus) * 100)
    };
  };

  const result = calculateDelayLoss();

  return (
    <>
      <SEOHelmet
        title="SIP Delay Loss Calculator - Calculate Opportunity Cost of Delaying Investments | MoneyCal"
        description="Calculate how much money you lose by delaying your SIP investments. Use our SIP delay loss calculator to understand the opportunity cost of postponing your investment decisions."
        keywords="SIP delay loss calculator, investment timing, opportunity cost calculator, SIP investment loss, delayed investment impact, SIP postponement cost"
      />


      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-red-600 via-orange-600 to-red-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-red-200 transition-colors">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                SIP Delay Loss Calculator
              </h1>
              <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
                Calculate the opportunity cost of delaying your SIP investments and understand the real impact of postponing your investment decisions
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-red-100">
                <span>💰 Opportunity Cost Analysis</span>
                <span>📈 Investment Timing Impact</span>
                <span>🎯 Goal Achievement Delay</span>
                <span>⚡ Time Value of Money</span>
              </div>
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
                  <Calculator className="h-6 w-6 mr-3 text-red-600" />
                  Calculate Delay Loss
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly SIP Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delay Period (Months)
                    </label>
                    <input
                      type="number"
                      value={delayMonths}
                      onChange={(e) => setDelayMonths(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="6"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                {/* Opportunity Loss Card */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Opportunity Loss</h3>
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-bold mb-2">₹{result.opportunityLoss.toLocaleString()}</div>
                  <p className="text-red-100">You lose {result.percentageLoss}% of potential corpus</p>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Start Immediately</h4>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ₹{result.immediateCorpus.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Final Corpus</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Clock className="h-5 w-5 text-orange-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Start After Delay</h4>
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      ₹{result.delayedCorpus.toLocaleString()}
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
                      <span className="text-gray-600">Total Investment (Immediate):</span>
                      <span className="font-semibold">₹{result.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment (Delayed):</span>
                      <span className="font-semibold">₹{result.delayedInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Saved:</span>
                      <span className="font-semibold text-green-600">
                        ₹{(result.totalInvestment - result.delayedInvestment).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use SIP Delay Loss Calculator</h2>
              <p className="text-lg text-gray-600">Follow these simple steps to calculate the opportunity cost of delaying your SIP investments</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-100 text-red-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Enter Monthly SIP Amount</h3>
                    <p className="text-gray-600">Input the amount you plan to invest monthly through SIP</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 text-red-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Set Expected Return Rate</h3>
                    <p className="text-gray-600">Enter your expected annual return percentage (typically 10-15%)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 text-red-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Specify Delay Period</h3>
                    <p className="text-gray-600">Enter how many months you plan to delay starting your SIP</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-100 text-red-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Set Investment Period</h3>
                    <p className="text-gray-600">Choose the total duration for your investment (in years)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 text-red-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Analyze Results</h3>
                    <p className="text-gray-600">Compare the opportunity loss and make informed decisions</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 text-red-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Take Action</h3>
                    <p className="text-gray-600">Start your SIP immediately to avoid opportunity loss</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Delay Loss Matters */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why SIP Delay Loss Matters</h2>
              <p className="text-lg text-gray-600">Understanding the impact of delaying your investments can help you make better financial decisions</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-red-100 rounded-full p-3 w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Power of Compounding</h3>
                <p className="text-gray-600">Every month of delay reduces the power of compound interest, significantly impacting your final corpus</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-orange-100 rounded-full p-3 w-fit mb-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Time Value of Money</h3>
                <p className="text-gray-600">Money invested earlier has more time to grow, making timing crucial for wealth creation</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-green-100 rounded-full p-3 w-fit mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Goal Achievement</h3>
                <p className="text-gray-600">Delays can push back your financial goals, affecting retirement planning and major life milestones</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Common questions about SIP delay loss and investment timing</p>
            </motion.div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What is SIP delay loss?</h3>
                <p className="text-gray-600">SIP delay loss is the opportunity cost of postponing your Systematic Investment Plan. It represents the potential returns you miss out on by not starting your investments immediately.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How is the delay loss calculated?</h3>
                <p className="text-gray-600">The calculator compares the final corpus if you start SIP immediately versus starting after a delay period, considering compound interest and the time value of money.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Should I start SIP immediately?</h3>
                <p className="text-gray-600">Yes, starting SIP immediately is generally recommended as it maximizes the power of compounding and helps you achieve your financial goals faster.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What if I can't afford the full amount now?</h3>
                <p className="text-gray-600">Start with whatever amount you can afford, even if it's small. You can always increase your SIP amount later. The key is to start early.</p>
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
                to="/finance-tools/sip-step-up-planner"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-red-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">SIP Step-up Planner</h3>
                <p className="text-gray-600 text-sm">Plan and visualize your step-up SIP strategy for wealth creation</p>
              </Link>

              <Link
                to="/finance-tools/lumpsum-vs-sip-analyzer"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-red-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lumpsum vs SIP Analyzer</h3>
                <p className="text-gray-600 text-sm">Compare lumpsum vs SIP investment strategies for optimal returns</p>
              </Link>

              <Link
                to="/finance-tools/xirr-calculator"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-red-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-white" />
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

export default SIPDelayLossCalculator;
