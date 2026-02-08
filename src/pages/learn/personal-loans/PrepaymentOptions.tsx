import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calculator, DollarSign, TrendingUp, Clock, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const PrepaymentOptions: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Prepayment Options in India: Complete Guide 2025 | MoneyCal"
        description="Master personal loan prepayment in India. Learn about prepayment benefits, penalties, strategies, and how to save money with early loan closure. Complete guide with calculator."
        keywords="personal loan prepayment, loan prepayment benefits, prepayment penalty, early loan closure, save interest personal loan"
        canonicalUrl="https://moneycal.in/learn/personal-loans/prepayment-options"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Personal Loan Prepayment Options in India: Complete Guide',
          description: 'Comprehensive guide to personal loan prepayment including benefits, penalties, strategies, and money-saving techniques in India.',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
                  Lesson 13 of 20
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
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
                Personal Loan Prepayment Options
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Master prepayment strategies to save thousands in interest and achieve debt freedom faster
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>13 min read</span>
                <span className="mx-2">•</span>
                <Calculator className="w-4 h-4 mr-2" />
                <span>Prepayment Calculator Included</span>
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
                  <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                  Understanding Prepayment Options
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Prepayment allows you to pay off your personal loan before the scheduled tenure ends. 
                    This can save you significant money in interest, but understanding the options and penalties is crucial.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-green-900 mb-3">
                      💡 Key Insight
                    </h3>
                    <p className="text-green-800">
                      Prepaying a ₹5 lakh personal loan 2 years early can save you ₹1.5-2 lakhs in interest! 
                      The key is understanding when and how to prepay strategically.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Prepayment Calculator
                  </h3>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Loan Amount (₹)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="500000"
                          defaultValue="500000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Interest Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="12"
                          defaultValue="12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Remaining Tenure (Months)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="36"
                          defaultValue="36"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prepayment Amount (₹)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="100000"
                          defaultValue="100000"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Interest Saved</div>
                        <div className="text-2xl font-bold text-green-600">₹45,200</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Time Saved</div>
                        <div className="text-2xl font-bold text-blue-600">8 months</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="text-sm text-gray-600 mb-1">New EMI</div>
                        <div className="text-2xl font-bold text-purple-600">₹12,450</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Prepayment Penalty</div>
                        <div className="text-2xl font-bold text-orange-600">₹0</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Types of Prepayment Options
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Partial Prepayment
                      </h4>
                      <p className="text-blue-800 mb-3">
                        Pay a portion of your outstanding principal while continuing with regular EMIs.
                      </p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Reduces principal amount</li>
                        <li>• Lowers future interest</li>
                        <li>• Maintains same EMI</li>
                        <li>• Shortens loan tenure</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Full Prepayment
                      </h4>
                      <p className="text-green-800 mb-3">
                        Pay off the entire outstanding loan amount and close the loan completely.
                      </p>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Closes loan immediately</li>
                        <li>• Maximum interest savings</li>
                        <li>• No future EMIs</li>
                        <li>• Complete debt freedom</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Prepayment Penalties in India
                  </h3>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-yellow-900 mb-3">
                      ⚠️ Important: Prepayment Penalties
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-yellow-900 mb-2">Floating Rate Loans:</h5>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• Usually NO penalty</li>
                          <li>• RBI guidelines favor borrowers</li>
                          <li>• Can prepay anytime</li>
                          <li>• Most common option</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-yellow-900 mb-2">Fixed Rate Loans:</h5>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• 2-4% penalty common</li>
                          <li>• Higher for early prepayment</li>
                          <li>• Reduces after 1-2 years</li>
                          <li>• Check loan agreement</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    When to Consider Prepayment
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Good Times to Prepay
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>High interest rate:</strong> If your loan rate is above 15-16%</li>
                        <li>• <strong>Windfall gains:</strong> Bonus, tax refund, inheritance</li>
                        <li>• <strong>Investment returns lower:</strong> When market returns are below loan rate</li>
                        <li>• <strong>No penalty:</strong> Floating rate loans with no prepayment charges</li>
                        <li>• <strong>Early in tenure:</strong> Maximum interest savings potential</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-red-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ❌ Avoid Prepayment When
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>High penalty:</strong> Fixed rate loans with 3-4% penalty</li>
                        <li>• <strong>Better investment options:</strong> When you can earn more than loan rate</li>
                        <li>• <strong>Emergency fund needed:</strong> Don't use emergency money for prepayment</li>
                        <li>• <strong>Near loan end:</strong> Minimal interest savings in last 6-12 months</li>
                        <li>• <strong>Other high-interest debt:</strong> Pay credit cards first</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Prepayment Strategies
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">
                        Lump Sum Strategy
                      </h4>
                      <p className="text-blue-800 mb-3">
                        Use large amounts (bonuses, tax refunds) for significant prepayments.
                      </p>
                      <div className="text-sm text-blue-700">
                        <strong>Best for:</strong> Annual bonuses, tax refunds, windfalls
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3">
                        Regular Extra Payments
                      </h4>
                      <p className="text-green-800 mb-3">
                        Add small amounts to your EMI regularly for consistent savings.
                      </p>
                      <div className="text-sm text-green-700">
                        <strong>Best for:</strong> Salary increases, side income
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-3">
                        Round-Up Strategy
                      </h4>
                      <p className="text-purple-800 mb-3">
                        Round up your EMI to the nearest thousand for easy extra payments.
                      </p>
                      <div className="text-sm text-purple-700">
                        <strong>Example:</strong> EMI ₹11,122 → Pay ₹12,000
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3">
                        Bi-Annual Strategy
                      </h4>
                      <p className="text-orange-800 mb-3">
                        Make large prepayments twice a year during bonus seasons.
                      </p>
                      <div className="text-sm text-orange-700">
                        <strong>Best for:</strong> Regular bonus earners
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Prepayment vs Investment Decision
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">
                      💡 Decision Framework
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                          <div>
                            <h5 className="font-semibold text-blue-900">If loan rate &gt; 15%:</h5>
                            <p className="text-blue-800 text-sm">Prepay immediately - guaranteed high returns</p>
                          </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-yellow-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-900">If loan rate 12-15%:</h5>
                          <p className="text-blue-800 text-sm">Compare with expected investment returns</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                          <div>
                            <h5 className="font-semibold text-blue-900">If loan rate &lt; 12%:</h5>
                            <p className="text-blue-800 text-sm">Consider investing instead of prepaying</p>
                          </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Step-by-Step Prepayment Process
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Check Your Loan Agreement</h4>
                        <p className="text-gray-700 text-sm">Review prepayment terms, penalties, and procedures</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Calculate Savings</h4>
                        <p className="text-gray-700 text-sm">Use prepayment calculator to determine interest savings</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Contact Your Bank</h4>
                        <p className="text-gray-700 text-sm">Inform about prepayment intention and get current outstanding</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Submit Application</h4>
                        <p className="text-gray-700 text-sm">Fill prepayment form and submit required documents</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Make Payment</h4>
                        <p className="text-gray-700 text-sm">Transfer the prepayment amount as instructed</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">6</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Get Updated Schedule</h4>
                        <p className="text-gray-700 text-sm">Receive new EMI schedule or closure certificate</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Common Prepayment Mistakes to Avoid
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Mistakes That Cost Money
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Not checking penalties</h5>
                          <p className="text-red-800 text-sm">Fixed rate loans may have high prepayment penalties</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Using emergency funds</h5>
                          <p className="text-red-800 text-sm">Don't prepay if it leaves you without emergency savings</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Ignoring better opportunities</h5>
                          <p className="text-red-800 text-sm">Don't prepay if you have higher-interest debt elsewhere</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Not calculating net savings</h5>
                          <p className="text-red-800 text-sm">Factor in penalties and opportunity costs</p>
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
                      Is there a penalty for prepaying personal loans?
                    </h3>
                    <p className="text-gray-700">
                      For floating rate personal loans, there's usually no prepayment penalty. However, fixed rate loans 
                      may have penalties of 2-4%. Always check your loan agreement for specific terms.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      When is the best time to prepay a personal loan?
                    </h3>
                    <p className="text-gray-700">
                      The best time is early in the loan tenure when the interest component is highest. 
                      Also consider prepaying when you have windfall gains or when your loan rate is higher than 
                      your expected investment returns.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Should I prepay or invest the money?
                    </h3>
                    <p className="text-gray-700">
                      If your loan interest rate is higher than your expected investment returns, prepay the loan. 
                      Generally, if your loan rate is above 12-15%, prepayment usually makes more sense than investing.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How much can I save by prepaying my personal loan?
                    </h3>
                    <p className="text-gray-700">
                      Savings depend on your loan amount, interest rate, and remaining tenure. Use our prepayment 
                      calculator above to get exact figures. Generally, prepaying early can save 30-50% of total interest.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Can I prepay my personal loan online?
                    </h3>
                    <p className="text-gray-700">
                      Most banks now offer online prepayment options through their internet banking or mobile apps. 
                      You can also visit the branch or contact customer service for assistance with the prepayment process.
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
                  <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">Prepayment Options</span>
                    <span className="text-green-600">Current</span>
                  </div>
                  
                  <Link to="/learn/personal-loans/loan-rejection-reasons" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Rejection Reasons</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/improving-approval-chances" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Improving Approval</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-comparison-tools" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Comparison Tools</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-myths-debunked" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Myths Debunked</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-fraud-protection" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Fraud Protection</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">13/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
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
              to="/learn/personal-loans/repayment-strategies"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Repayment Strategies
            </Link>
            
            <Link
              to="/learn/personal-loans/loan-rejection-reasons"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Next: Rejection Reasons
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrepaymentOptions;
