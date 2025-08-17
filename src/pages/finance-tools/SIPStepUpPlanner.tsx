import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  BarChart3,
  DollarSign,
  Calendar,
  Target,
  PieChart
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

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
    const yearlyData = [];

    for (let year = 1; year <= investmentPeriod; year++) {
      let yearCorpus = 0;
      let yearInvestment = 0;
      const currentAmount = initialAmount + (stepUpAmount * Math.floor((year - 1) * 12 / stepUpFrequency));

      for (let month = 1; month <= 12; month++) {
        const monthsRemaining = totalMonths - ((year - 1) * 12 + month - 1);
        const monthlyCorpus = currentAmount * 
          ((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate);
        yearCorpus += monthlyCorpus;
        yearInvestment += currentAmount;
      }

      totalCorpus += yearCorpus;
      totalInvestment += yearInvestment;
      yearlyData.push({
        year,
        amount: currentAmount,
        corpus: yearCorpus,
        investment: yearInvestment
      });
    }

    return {
      totalCorpus: Math.round(totalCorpus),
      totalInvestment: Math.round(totalInvestment),
      yearlyData
    };
  };

  const result = calculateStepUpSIP();

  return (
    <>
      <SEOHelmet
        title="SIP Step-up Planner - Plan and Visualize Your Step-up SIP Strategy | MoneyCal"
        description="Plan and visualize your step-up SIP strategy for wealth creation. Use our SIP step-up planner to understand how increasing your investments systematically can boost your returns."
        keywords="SIP step up planner, step up SIP calculator, systematic investment plan, wealth creation, investment planning, SIP strategy"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-blue-600 to-green-700">
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
                Plan and visualize your step-up SIP strategy for wealth creation and systematic investment growth
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-green-100">
                <span>📈 Systematic Growth</span>
                <span>💰 Wealth Creation</span>
                <span>🎯 Goal Achievement</span>
                <span>⚡ Compound Growth</span>
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
                  <Calculator className="h-6 w-6 mr-3 text-green-600" />
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
                    <input
                      type="number"
                      value={stepUpFrequency}
                      onChange={(e) => setStepUpFrequency(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="12"
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
                {/* Final Corpus Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Final Corpus</h3>
                    <Target className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-bold mb-2">₹{result.totalCorpus.toLocaleString()}</div>
                  <p className="text-green-100">Total investment: ₹{result.totalInvestment.toLocaleString()}</p>
                </div>

                {/* Investment Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Investment Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment:</span>
                      <span className="font-semibold">₹{result.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Returns:</span>
                      <span className="font-semibold text-green-600">
                        ₹{(result.totalCorpus - result.totalInvestment).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Return Rate:</span>
                      <span className="font-semibold text-green-600">
                        {Math.round(((result.totalCorpus - result.totalInvestment) / result.totalInvestment) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Yearly Breakdown */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                    Yearly Breakdown
                  </h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {result.yearlyData.map((yearData) => (
                      <div key={yearData.year} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">Year {yearData.year}</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold">₹{yearData.amount.toLocaleString()}/month</div>
                          <div className="text-xs text-gray-600">₹{yearData.corpus.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use SIP Step-up Planner</h2>
              <p className="text-lg text-gray-600">Follow these steps to plan your step-up SIP strategy effectively</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Set Initial Amount</h3>
                    <p className="text-gray-600">Enter your starting monthly SIP amount</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Define Step-up Amount</h3>
                    <p className="text-gray-600">Set how much you want to increase your SIP by</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Choose Frequency</h3>
                    <p className="text-gray-600">Select how often you want to step up (e.g., yearly)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Set Return Rate</h3>
                    <p className="text-gray-600">Enter your expected annual return percentage</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Choose Duration</h3>
                    <p className="text-gray-600">Set your investment period in years</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full p-2 mr-4 mt-1">
                    <span className="font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Analyze Results</h3>
                    <p className="text-gray-600">Review your projected corpus and returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Step-up SIP</h2>
              <p className="text-lg text-gray-600">Why step-up SIP is an effective wealth creation strategy</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-green-100 rounded-full p-3 w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Systematic Growth</h3>
                <p className="text-gray-600">Increase investments systematically as your income grows, maintaining discipline</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                  <PieChart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Higher Returns</h3>
                <p className="text-gray-600">Larger investments in later years benefit more from compound interest</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-purple-100 rounded-full p-3 w-fit mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Goal Achievement</h3>
                <p className="text-gray-600">Achieve financial goals faster with increasing investment amounts</p>
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
              <p className="text-lg text-gray-600">Common questions about step-up SIP planning</p>
            </motion.div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What is step-up SIP?</h3>
                <p className="text-gray-600">Step-up SIP allows you to increase your monthly investment amount systematically, typically based on income growth or predetermined intervals.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">When should I start step-up SIP?</h3>
                <p className="text-gray-600">Start step-up SIP when you have a stable income and can commit to increasing investments regularly, usually after 1-2 years of regular SIP.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How often should I step up?</h3>
                <p className="text-gray-600">Common frequencies are yearly or every 6 months, but you can choose based on your income growth and financial goals.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I decrease the amount?</h3>
                <p className="text-gray-600">Yes, you can also implement step-down SIP if needed, but step-up is generally recommended for wealth creation.</p>
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
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lumpsum vs SIP Analyzer</h3>
                <p className="text-gray-600 text-sm">Compare lumpsum vs SIP investment strategies for optimal returns</p>
              </Link>

              <Link
                to="/finance-tools/xirr-calculator"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200 transform hover:-translate-y-1 duration-300 block"
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

export default SIPStepUpPlanner;
