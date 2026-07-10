import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RefreshCw, IndianRupee, TrendingUp, CheckCircle, Target, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanRefinancing: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Refinancing Guide: When & How to Refinance 2025 | MoneyCal"
        description="Complete guide to personal loan refinancing in India. Learn when to refinance, how to calculate savings, compare options, and make smart refinancing decisions. Includes calculator."
        keywords="personal loan refinancing, loan refinance, refinance personal loan, loan balance transfer, lower interest rate"
        canonicalUrl="/learn/personal-loans/loan-refinancing"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Personal Loan Refinancing Guide: When & How to Refinance',
          description: 'Comprehensive guide to personal loan refinancing including when to refinance, how to calculate savings, and making smart refinancing decisions.',
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
                  Lesson 19 of 20
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Advanced
                </span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Personal Loan Refinancing
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Master the art of loan refinancing to save money, reduce EMIs, and optimize your loan terms
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <RefreshCw className="w-4 h-4 mr-2" />
                <span>13 min read</span>
                <span className="mx-2">•</span>
                <IndianRupee className="w-4 h-4 mr-2" />
                <span>Advanced Strategy</span>
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
                  <RefreshCw className="w-8 h-8 text-green-600 mr-3" />
                  Complete Refinancing Strategy
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Loan refinancing can save you thousands of rupees by securing better interest rates, 
                    reducing monthly payments, or changing loan terms. Learn when and how to refinance effectively.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-green-900 mb-3">
                      💡 Pro Tip
                    </h3>
                    <p className="text-green-800">
                      Refinancing can save you ₹50,000-₹2,00,000 over the loan tenure! The key is timing 
                      and choosing the right refinancing option for your situation.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    What is Loan Refinancing?
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">
                      🔄 Refinancing Explained
                    </h4>
                    <p className="text-blue-800 mb-4">
                      Loan refinancing means replacing your existing loan with a new one that has better terms, 
                      usually from a different lender. This can help you save money or improve loan conditions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Types of Refinancing:</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Rate and term refinancing</li>
                          <li>• Cash-out refinancing</li>
                          <li>• Balance transfer</li>
                          <li>• Top-up refinancing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Benefits:</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Lower interest rates</li>
                          <li>• Reduced monthly payments</li>
                          <li>• Better loan terms</li>
                          <li>• Improved cash flow</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    When Should You Refinance?
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Interest Rates Have Dropped
                      </h4>
                      <p className="text-gray-700 mb-3">
                        When market rates are significantly lower than your current rate (usually 1-2% difference).
                      </p>
                      <div className="bg-green-50 p-4 rounded border border-green-200">
                        <h5 className="font-semibold text-green-900 mb-2">Example:</h5>
                        <p className="text-sm text-green-800">
                          Current rate: 15% | New rate: 12% | Savings: ₹3,000-₹5,000 per month on ₹5 lakh loan
                        </p>
                      </div>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Credit Score Improved
                      </h4>
                      <p className="text-gray-700 mb-3">
                        When your credit score has improved significantly, making you eligible for better rates.
                      </p>
                      <div className="bg-blue-50 p-4 rounded border border-blue-200">
                        <h5 className="font-semibold text-blue-900 mb-2">Example:</h5>
                        <p className="text-sm text-blue-800">
                          Credit score improved from 650 to 750 | Rate reduction: 2-3% | Better terms available
                        </p>
                      </div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Income Increased
                      </h4>
                      <p className="text-gray-700 mb-3">
                        When your income has increased, allowing you to qualify for better rates or shorter tenure.
                      </p>
                      <div className="bg-purple-50 p-4 rounded border border-purple-200">
                        <h5 className="font-semibold text-purple-900 mb-2">Example:</h5>
                        <p className="text-sm text-purple-800">
                          Salary increased by 30% | Better FOIR ratio | Eligible for premium rates
                        </p>
                      </div>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Need Cash for Other Purposes
                      </h4>
                      <p className="text-gray-700 mb-3">
                        When you need additional funds and can get a top-up loan at better rates.
                      </p>
                      <div className="bg-orange-50 p-4 rounded border border-orange-200">
                        <h5 className="font-semibold text-orange-900 mb-2">Example:</h5>
                        <p className="text-sm text-orange-800">
                          Need ₹2 lakh more | Top-up available at 11% vs new loan at 13% | Save on processing fees
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Refinancing Calculator
                  </h3>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Calculate Your Refinancing Savings</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                          Current Interest Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="15.0"
                          defaultValue="15.0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Interest Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="12.0"
                          defaultValue="12.0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <h5 className="font-semibold text-gray-900 mb-2">Current Loan</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Monthly EMI:</span>
                            <span className="font-semibold text-red-600">₹17,350</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-semibold text-red-600">₹1,24,600</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span className="font-semibold text-red-600">₹6,24,600</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-gray-900 mb-2">Refinanced Loan</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Monthly EMI:</span>
                            <span className="font-semibold text-green-600">₹16,610</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-semibold text-green-600">₹97,960</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span className="font-semibold text-green-600">₹5,97,960</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-900 mb-1">Total Savings: ₹26,640</div>
                        <div className="text-sm text-green-800">Monthly Savings: ₹740 | Processing Fee: ₹5,000</div>
                        <div className="text-sm text-green-800 mt-1">Net Savings: ₹21,640</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Types of Refinancing Options
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">
                        🔄 Rate and Term Refinancing
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Replace existing loan with new one</li>
                        <li>• Better interest rate</li>
                        <li>• Same or different tenure</li>
                        <li>• Lower monthly payments</li>
                        <li>• Best for: Rate reduction</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3">
                        💰 Cash-Out Refinancing
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Borrow more than current balance</li>
                        <li>• Get cash for other needs</li>
                        <li>• Consolidate multiple debts</li>
                        <li>• Single EMI for all loans</li>
                        <li>• Best for: Debt consolidation</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-3">
                        📋 Balance Transfer
                      </h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Transfer loan to new lender</li>
                        <li>• Better terms and rates</li>
                        <li>• Minimal documentation</li>
                        <li>• Faster processing</li>
                        <li>• Best for: Quick rate reduction</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3">
                        📈 Top-Up Refinancing
                      </h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Add more funds to existing loan</li>
                        <li>• Better rates than new loan</li>
                        <li>• Single EMI for combined amount</li>
                        <li>• Lower processing fees</li>
                        <li>• Best for: Additional funding</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Step-by-Step Refinancing Process
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Evaluate Current Loan</h4>
                        <p className="text-gray-700 text-sm">Check current rate, remaining balance, and prepayment charges</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Research New Lenders</h4>
                        <p className="text-gray-700 text-sm">Compare rates, terms, and fees from multiple lenders</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Calculate Savings</h4>
                        <p className="text-gray-700 text-sm">Use refinancing Calculator to determine actual savings</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Apply for New Loan</h4>
                        <p className="text-gray-700 text-sm">Submit application with required documents</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Close Old Loan</h4>
                        <p className="text-gray-700 text-sm">Pay off existing loan and get NOC from old lender</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">6</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Start New EMI</h4>
                        <p className="text-gray-700 text-sm">Begin paying EMIs on the new loan</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Costs and Fees to Consider
                  </h3>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-yellow-900 mb-3">
                      💰 Refinancing Costs Breakdown
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-yellow-900 mb-2">New Loan Costs:</h5>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• Processing fee: 1-3% of loan amount</li>
                          <li>• Documentation charges: ₹500-₹2,000</li>
                          <li>• Legal/valuation fees: ₹1,000-₹5,000</li>
                          <li>• Stamp duty: As per state rates</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-yellow-900 mb-2">Old Loan Costs:</h5>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• Prepayment penalty: 2-4%</li>
                          <li>• Foreclosure charges: ₹1,000-₹5,000</li>
                          <li>• NOC charges: ₹500-₹2,000</li>
                          <li>• Outstanding interest: As applicable</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    When NOT to Refinance
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-red-900 mb-3">
                      ❌ Avoid Refinancing When
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Rate difference is minimal</h5>
                          <p className="text-red-800 text-sm">If savings are less than total refinancing costs</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Near loan completion</h5>
                          <p className="text-red-800 text-sm">If less than 1-2 years remaining on current loan</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">High prepayment penalties</h5>
                          <p className="text-red-800 text-sm">If penalties exceed potential savings</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Credit score declined</h5>
                          <p className="text-red-800 text-sm">If you won't qualify for better rates</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Tips for Successful Refinancing
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">
                        🎯 Preparation Tips
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Improve credit score before applying</li>
                        <li>• Gather all required documents</li>
                        <li>• Compare multiple lenders</li>
                        <li>• Calculate total costs vs savings</li>
                        <li>• Check prepayment penalties</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3">
                        💡 Negotiation Tips
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Use competing offers as leverage</li>
                        <li>• Negotiate processing fees</li>
                        <li>• Ask for rate discounts</li>
                        <li>• Request faster processing</li>
                        <li>• Leverage existing relationships</li>
                      </ul>
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
                      How much can I save by refinancing my personal loan?
                    </h3>
                    <p className="text-gray-700">
                      Savings depend on the rate difference, loan amount, and remaining tenure. Typically, 
                      you can save ₹50,000-₹2,00,000 over the loan tenure with a 2-3% rate reduction.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      When is the best time to refinance a personal loan?
                    </h3>
                    <p className="text-gray-700">
                      The best time is when interest rates have dropped significantly (1-2% difference), 
                      your credit score has improved, or when you need additional funds at better rates.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What documents are required for refinancing?
                    </h3>
                    <p className="text-gray-700">
                      You'll need income proof, bank statements, existing loan details, credit report, 
                      identity proof, and address proof. Some lenders may require additional documents.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Can I refinance if I have a poor credit score?
                    </h3>
                    <p className="text-gray-700">
                      It's challenging but possible. You may need a co-applicant with good credit, 
                      or you might get higher rates. Focus on improving your credit score first.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How long does the refinancing process take?
                    </h3>
                    <p className="text-gray-700">
                      The process typically takes 7-15 days, depending on the lender and documentation. 
                      Online lenders may process faster, while traditional banks may take longer.
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
                    <span className="text-green-800 font-medium">Loan Refinancing</span>
                    <span className="text-green-600">Current</span>
                  </div>
                  
                  <Link to="/learn/personal-loans/loan-closure-process" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Loan Closure</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-success-tips" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Success Tips</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-future-trends" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Future Trends</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-case-studies" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Case Studies</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-expert-insights" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Expert Insights</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">19/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
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
              to="/learn/personal-loans/loan-fraud-protection"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Fraud Protection
            </Link>
            
            <Link
              to="/learn/personal-loans/loan-closure-process"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Next: Loan Closure
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoanRefinancing;
