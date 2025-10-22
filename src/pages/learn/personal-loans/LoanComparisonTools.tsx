import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calculator, Search, TrendingUp, CheckCircle, Star, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanComparisonTools: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Comparison Tools in India: Complete Guide 2025 | MoneyCal"
        description="Master personal loan comparison with advanced tools and techniques. Learn to compare interest rates, fees, terms, and choose the best loan offer. Complete comparison guide with calculators."
        keywords="personal loan comparison, loan comparison tools, compare personal loans, best personal loan, loan comparison calculator"
        canonicalUrl="https://moneycal.in/learn/personal-loans/loan-comparison-tools"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Personal Loan Comparison Tools in India: Complete Guide',
          description: 'Comprehensive guide to comparing personal loans using advanced tools and techniques to find the best loan offers in India.',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Link 
                to="/learn/personal-loans" 
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Personal Loans
              </Link>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Lesson 16 of 20
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Intermediate
                </span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Personal Loan Comparison Tools
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Master the art of comparing personal loans and find the best deals using advanced tools and techniques
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Calculator className="w-4 h-4 mr-2" />
                <span>10 min read</span>
                <span className="mx-2">•</span>
                <Search className="w-4 h-4 mr-2" />
                <span>Comparison Guide</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Search className="w-8 h-8 text-blue-600 mr-3" />
                  Advanced Comparison Techniques
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Comparing personal loans effectively can save you thousands of rupees in interest and fees. 
                    Learn to use advanced comparison tools and techniques to make informed decisions.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                      💡 Pro Tip
                    </h3>
                    <p className="text-blue-800">
                      A proper comparison can help you save ₹50,000-₹1,00,000 over the loan tenure! 
                      Don't just look at interest rates - consider all factors for the best decision.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Key Comparison Factors
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Interest Rates
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Annual Percentage Rate (APR)</li>
                        <li>• Fixed vs Floating rates</li>
                        <li>• Rate change frequency</li>
                        <li>• Rate calculation method</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3 flex items-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        Fees & Charges
                      </h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Processing fees</li>
                        <li>• Prepayment charges</li>
                        <li>• Late payment fees</li>
                        <li>• Documentation charges</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Loan Terms
                      </h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Loan amount limits</li>
                        <li>• Tenure options</li>
                        <li>• EMI flexibility</li>
                        <li>• Foreclosure terms</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                        <Star className="w-5 h-5 mr-2" />
                        Service Quality
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Processing time</li>
                        <li>• Customer service</li>
                        <li>• Online facilities</li>
                        <li>• Branch network</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Loan Comparison Calculator
                  </h3>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loan Amount (₹)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="500000"
                          defaultValue="500000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tenure (Years)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="5"
                          defaultValue="5"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Compare Up to 3 Lenders</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-blue-900 mb-2">Bank A</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Interest Rate:</span>
                              <span className="font-semibold">12.5%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Processing Fee:</span>
                              <span className="font-semibold">2%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly EMI:</span>
                              <span className="font-semibold text-green-600">₹11,250</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Cost:</span>
                              <span className="font-semibold text-red-600">₹6,75,000</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg border border-green-200">
                          <h5 className="font-semibold text-green-900 mb-2">Bank B</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Interest Rate:</span>
                              <span className="font-semibold">11.8%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Processing Fee:</span>
                              <span className="font-semibold">1.5%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly EMI:</span>
                              <span className="font-semibold text-green-600">₹11,100</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Cost:</span>
                              <span className="font-semibold text-red-600">₹6,66,000</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg border border-purple-200">
                          <h5 className="font-semibold text-purple-900 mb-2">Bank C</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Interest Rate:</span>
                              <span className="font-semibold">13.2%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Processing Fee:</span>
                              <span className="font-semibold">1%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly EMI:</span>
                              <span className="font-semibold text-green-600">₹11,400</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Cost:</span>
                              <span className="font-semibold text-red-600">₹6,84,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-900 mb-1">Best Option: Bank B</div>
                          <div className="text-sm text-green-800">Saves ₹9,000 compared to Bank A</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Online Comparison Platforms
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        🏦 Bank Websites
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Direct comparison:</strong> Use bank's own comparison tools</li>
                        <li>• <strong>Accurate rates:</strong> Get real-time interest rates</li>
                        <li>• <strong>Pre-approval:</strong> Check eligibility instantly</li>
                        <li>• <strong>Detailed terms:</strong> Access complete loan terms</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        🔍 Aggregator Platforms
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Multiple options:</strong> Compare 10+ lenders at once</li>
                        <li>• <strong>Unbiased comparison:</strong> No bank bias</li>
                        <li>• <strong>Quick results:</strong> Get multiple offers in minutes</li>
                        <li>• <strong>Expert guidance:</strong> Get personalized recommendations</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        📱 Mobile Apps
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Convenient access:</strong> Compare on-the-go</li>
                        <li>• <strong>Push notifications:</strong> Get rate alerts</li>
                        <li>• <strong>Document upload:</strong> Easy application process</li>
                        <li>• <strong>Track applications:</strong> Monitor loan status</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Step-by-Step Comparison Process
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Define Your Requirements</h4>
                        <p className="text-gray-700 text-sm">Determine loan amount, tenure, and preferred features</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Research Lenders</h4>
                        <p className="text-gray-700 text-sm">Identify 5-7 potential lenders including banks and NBFCs</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Get Quotes</h4>
                        <p className="text-gray-700 text-sm">Request detailed quotes from each lender</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Compare Key Metrics</h4>
                        <p className="text-gray-700 text-sm">Use comparison tools to analyze rates, fees, and terms</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Calculate Total Cost</h4>
                        <p className="text-gray-700 text-sm">Include all fees and charges in total cost calculation</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">6</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Evaluate Service Quality</h4>
                        <p className="text-gray-700 text-sm">Consider processing time, customer service, and convenience</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">7</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Make Final Decision</h4>
                        <p className="text-gray-700 text-sm">Choose the best overall option based on all factors</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Advanced Comparison Techniques
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">
                        📊 Total Cost of Ownership
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Include all fees and charges</li>
                        <li>• Calculate interest over full tenure</li>
                        <li>• Factor in prepayment penalties</li>
                        <li>• Consider opportunity costs</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3">
                        🎯 Risk Assessment
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Evaluate rate change policies</li>
                        <li>• Check prepayment flexibility</li>
                        <li>• Assess penalty structures</li>
                        <li>• Review default consequences</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-3">
                        🔄 Flexibility Analysis
                      </h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• EMI adjustment options</li>
                        <li>• Tenure modification</li>
                        <li>• Top-up loan availability</li>
                        <li>• Balance transfer options</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3">
                        🏆 Value-Added Services
                      </h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Insurance coverage</li>
                        <li>• Credit card offers</li>
                        <li>• Investment opportunities</li>
                        <li>• Relationship benefits</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Common Comparison Mistakes
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Mistakes That Cost Money
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Focusing only on interest rates</h5>
                          <p className="text-red-800 text-sm">Ignoring processing fees and other charges</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Not considering total cost</h5>
                          <p className="text-red-800 text-sm">Looking at monthly EMI instead of total interest</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Ignoring service quality</h5>
                          <p className="text-red-800 text-sm">Choosing based only on rates without considering service</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Not negotiating</h5>
                          <p className="text-red-800 text-sm">Accepting the first offer without trying to negotiate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How many lenders should I compare?
                    </h3>
                    <p className="text-gray-700">
                      Compare at least 5-7 lenders including 2-3 banks and 2-3 NBFCs. This gives you a good 
                      range of options and helps you understand the market better.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What's more important - interest rate or processing fee?
                    </h3>
                    <p className="text-gray-700">
                      Both are important, but interest rate has a bigger impact on total cost over the loan tenure. 
                      However, if you plan to prepay early, processing fee becomes more significant.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Should I trust online comparison tools?
                    </h3>
                    <p className="text-gray-700">
                      Online tools are good for initial comparison, but always verify rates directly with the lender. 
                      Rates can change frequently, and online tools may not always have the latest information.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How do I compare fixed vs floating rates?
                    </h3>
                    <p className="text-gray-700">
                      Consider your risk tolerance and interest rate outlook. Fixed rates provide certainty but are 
                      usually higher. Floating rates can be lower but carry the risk of rate increases.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Can I negotiate after comparing loans?
                    </h3>
                    <p className="text-gray-700">
                      Yes! Use your comparison results as leverage for negotiation. Show lenders that you have 
                      better offers from competitors and ask them to match or improve their terms.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Loans Course
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-800 font-medium">Comparison Tools</span>
                    <span className="text-blue-600">Current</span>
                  </div>
                  
                  <Link to="/learn/personal-loans/loan-myths-debunked" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Myths Debunked</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-fraud-protection" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Fraud Protection</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-refinancing" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Loan Refinancing</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-closure-process" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Loan Closure</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-success-tips" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Success Tips</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">16/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-between items-center mt-8"
          >
            <Link
              to="/learn/personal-loans/improving-approval-chances"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Improving Approval
            </Link>
            
            <Link
              to="/learn/personal-loans/loan-myths-debunked"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next: Myths Debunked
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoanComparisonTools;
