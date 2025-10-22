import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calculator, TrendingUp, Target, Clock, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const RepaymentStrategies: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Repayment Strategies in India: Smart Tips 2025 | MoneyCal"
        description="Master personal loan repayment strategies in India. Learn about EMI optimization, prepayment benefits, debt consolidation, and smart repayment techniques to save money and improve credit score."
        keywords="personal loan repayment strategies, EMI optimization, prepayment benefits, debt consolidation, loan repayment tips India"
        canonicalUrl="https://moneycal.in/learn/personal-loans/repayment-strategies"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Personal Loan Repayment Strategies in India: Smart Tips',
          description: 'Comprehensive guide to personal loan repayment strategies including EMI optimization, prepayment benefits, debt consolidation, and smart techniques to save money.',
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
                  Lesson 12 of 20
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
                Personal Loan Repayment Strategies
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Smart strategies to optimize your personal loan repayment, save money, and improve your credit score
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>14 min read</span>
                <span className="mx-2">•</span>
                <Calculator className="w-4 h-4 mr-2" />
                <span>Repayment Calculator Included</span>
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
                  <Target className="w-8 h-8 text-green-600 mr-3" />
                  Understanding Repayment Strategies
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Smart repayment strategies can help you save thousands of rupees in interest, improve your credit score, 
                    and achieve financial freedom faster. The key is to understand your options and choose the right approach.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-green-900 mb-3">
                      💡 Key Insight
                    </h3>
                    <p className="text-green-800">
                      Even small changes in your repayment strategy can save you significant money over the loan tenure. 
                      A ₹1,000 extra payment per month on a ₹5 lakh loan can save you ₹50,000+ in interest!
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Repayment Strategy Calculator
                  </h3>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loan Amount (₹)
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
                          Tenure (Years)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="5"
                          defaultValue="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Extra Payment/Month (₹)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="1000"
                          defaultValue="1000"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Standard EMI</div>
                        <div className="text-2xl font-bold text-gray-900">₹11,122</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="text-sm text-gray-600 mb-1">With Extra Payment</div>
                        <div className="text-2xl font-bold text-green-600">₹12,122</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Interest Saved</div>
                        <div className="text-2xl font-bold text-blue-600">₹52,340</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Time Saved</div>
                        <div className="text-2xl font-bold text-purple-600">8 months</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Top Repayment Strategies
                  </h3>

                  <div className="space-y-8 mb-8">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
                        1. Extra EMI Payments
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Pay more than your regular EMI whenever possible. This reduces your principal faster and saves significant interest.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-900 mb-2">Benefits:</h5>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Reduces total interest paid</li>
                            <li>• Shortens loan tenure</li>
                            <li>• Improves credit score</li>
                            <li>• No prepayment charges on most loans</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-green-900 mb-2">Example:</h5>
                          <p className="text-sm text-green-800">
                            ₹5 lakh loan at 12% for 5 years. Regular EMI: ₹11,122. 
                            Add ₹1,000 extra monthly = Save ₹52,340 in interest!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <DollarSign className="w-6 h-6 text-green-600 mr-3" />
                        2. Lump Sum Prepayments
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Use bonuses, tax refunds, or windfalls to make large prepayments. This has the biggest impact on interest savings.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-green-900 mb-2">Best Times:</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Annual bonus</li>
                            <li>• Tax refunds</li>
                            <li>• Festival gifts</li>
                            <li>• Investment returns</li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-900 mb-2">Strategy:</h5>
                          <p className="text-sm text-blue-800">
                            Make lump sum payments early in the loan tenure when interest component is highest. 
                            This maximizes your savings.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Target className="w-6 h-6 text-purple-600 mr-3" />
                        3. EMI vs Tenure Optimization
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Choose between higher EMI with shorter tenure vs lower EMI with longer tenure based on your financial situation.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-900 mb-2">Shorter Tenure:</h5>
                          <ul className="text-sm text-purple-800 space-y-1">
                            <li>• Higher EMI</li>
                            <li>• Lower total interest</li>
                            <li>• Faster debt freedom</li>
                            <li>• Better for stable income</li>
                          </ul>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-orange-900 mb-2">Longer Tenure:</h5>
                          <ul className="text-sm text-orange-800 space-y-1">
                            <li>• Lower EMI</li>
                            <li>• Higher total interest</li>
                            <li>• More flexibility</li>
                            <li>• Better for variable income</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3" />
                        4. Debt Consolidation Strategy
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Combine multiple high-interest debts into a single personal loan with lower interest rate.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-indigo-900 mb-2">When to Use:</h5>
                          <ul className="text-sm text-indigo-800 space-y-1">
                            <li>• Multiple credit card debts</li>
                            <li>• High-interest loans</li>
                            <li>• Complex repayment schedule</li>
                            <li>• Better interest rate available</li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-900 mb-2">Benefits:</h5>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Single EMI to track</li>
                            <li>• Lower interest rate</li>
                            <li>• Simplified finances</li>
                            <li>• Better credit utilization</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Advanced Repayment Techniques
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">
                        Bi-weekly Payments
                      </h4>
                      <p className="text-blue-800 mb-3">
                        Split your monthly EMI into two bi-weekly payments. This results in 26 payments per year instead of 12.
                      </p>
                      <div className="text-sm text-blue-700">
                        <strong>Result:</strong> One extra payment per year, significant interest savings
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3">
                        Round-Up Strategy
                      </h4>
                      <p className="text-green-800 mb-3">
                        Round up your EMI to the nearest thousand. The extra amount goes directly to principal.
                      </p>
                      <div className="text-sm text-green-700">
                        <strong>Example:</strong> EMI ₹11,122 → Pay ₹12,000 (₹878 extra)
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-3">
                        Windfall Strategy
                      </h4>
                      <p className="text-purple-800 mb-3">
                        Use unexpected money (bonuses, gifts, tax refunds) for prepayments instead of spending.
                      </p>
                      <div className="text-sm text-purple-700">
                        <strong>Impact:</strong> ₹50,000 bonus can save ₹15,000+ in interest
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3">
                        Salary Increase Strategy
                      </h4>
                      <p className="text-orange-800 mb-3">
                        When you get a salary increase, allocate 50% to loan prepayment and 50% to savings.
                      </p>
                      <div className="text-sm text-orange-700">
                        <strong>Benefit:</strong> Accelerates debt freedom while building wealth
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Repayment Strategy Comparison
                  </h3>

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Strategy</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Interest Savings</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Time Saved</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Difficulty</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3">Extra ₹1,000/month</td>
                          <td className="border border-gray-300 px-4 py-3">₹52,340</td>
                          <td className="border border-gray-300 px-4 py-3">8 months</td>
                          <td className="border border-gray-300 px-4 py-3">Easy</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">₹50,000 lump sum</td>
                          <td className="border border-gray-300 px-4 py-3">₹35,200</td>
                          <td className="border border-gray-300 px-4 py-3">6 months</td>
                          <td className="border border-gray-300 px-4 py-3">Medium</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3">Bi-weekly payments</td>
                          <td className="border border-gray-300 px-4 py-3">₹28,500</td>
                          <td className="border border-gray-300 px-4 py-3">4 months</td>
                          <td className="border border-gray-300 px-4 py-3">Medium</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">Round-up strategy</td>
                          <td className="border border-gray-300 px-4 py-3">₹15,800</td>
                          <td className="border border-gray-300 px-4 py-3">2 months</td>
                          <td className="border border-gray-300 px-4 py-3">Easy</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Common Repayment Mistakes to Avoid
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
                          <h5 className="font-semibold text-red-900">Paying minimum EMI only</h5>
                          <p className="text-red-800 text-sm">This maximizes interest payments and extends loan tenure unnecessarily.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Ignoring prepayment options</h5>
                          <p className="text-red-800 text-sm">Many borrowers don't realize they can prepay without penalties.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Not tracking interest vs principal</h5>
                          <p className="text-red-800 text-sm">Understanding how your payments are split helps optimize strategy.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Taking new loans while repaying</h5>
                          <p className="text-red-800 text-sm">This increases total debt burden and reduces repayment capacity.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Building a Repayment Plan
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        1. Assess Your Financial Situation
                      </h4>
                      <p className="text-gray-700">
                        Calculate your monthly income, expenses, and available surplus. 
                        Determine how much extra you can afford to pay without affecting your lifestyle.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        2. Set Clear Goals
                      </h4>
                      <p className="text-gray-700">
                        Define your repayment goals: save interest, reduce tenure, or both. 
                        Set specific targets like "Save ₹50,000 in interest" or "Pay off 6 months early."
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        3. Choose Your Strategy
                      </h4>
                      <p className="text-gray-700">
                        Select the repayment strategy that best fits your financial situation and goals. 
                        You can combine multiple strategies for maximum impact.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        4. Track and Adjust
                      </h4>
                      <p className="text-gray-700">
                        Monitor your progress monthly and adjust your strategy based on changes in your financial situation. 
                        Celebrate milestones to stay motivated.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Impact on Credit Score
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">
                      How Repayment Strategies Affect Credit Score
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Positive Impacts:</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Consistent on-time payments</li>
                          <li>• Lower credit utilization ratio</li>
                          <li>• Faster debt reduction</li>
                          <li>• Improved payment history</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Long-term Benefits:</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Better loan terms in future</li>
                          <li>• Lower interest rates</li>
                          <li>• Higher credit limits</li>
                          <li>• Easier loan approvals</li>
                        </ul>
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
                      Which repayment strategy saves the most money?
                    </h3>
                    <p className="text-gray-700">
                      Extra EMI payments typically save the most money because they reduce principal consistently. 
                      However, the best strategy depends on your financial situation and ability to make regular extra payments.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Are there any penalties for prepaying personal loans?
                    </h3>
                    <p className="text-gray-700">
                      Most personal loans in India don't have prepayment penalties, especially for floating rate loans. 
                      However, some fixed-rate loans may have prepayment charges. Always check your loan agreement.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Should I prepay my loan or invest the money?
                    </h3>
                    <p className="text-gray-700">
                      If your loan interest rate is higher than your expected investment returns, prepaying makes more sense. 
                      Generally, if your loan rate is above 12-15%, prepayment is usually better than investing.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How often should I review my repayment strategy?
                    </h3>
                    <p className="text-gray-700">
                      Review your strategy every 6 months or when your financial situation changes significantly. 
                      This includes salary changes, bonuses, or other windfalls that could be used for prepayment.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Can I change my EMI amount during the loan tenure?
                    </h3>
                    <p className="text-gray-700">
                      Most lenders allow you to increase your EMI through prepayments, but decreasing EMI usually requires 
                      refinancing or restructuring the loan. Check with your lender for specific options.
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
                    <span className="text-green-800 font-medium">Repayment Strategies</span>
                    <span className="text-green-600">Current</span>
                  </div>
                  
                  <Link to="/learn/personal-loans/prepayment-options" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Prepayment Options</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
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
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">12/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
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
              to="/learn/personal-loans/processing-fees"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Processing Fees
            </Link>
            
            <Link
              to="/learn/personal-loans/prepayment-options"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Next: Prepayment Options
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RepaymentStrategies;
