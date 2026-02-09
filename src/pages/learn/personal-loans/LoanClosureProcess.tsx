import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, FileText, Calculator, Clock, AlertTriangle, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanClosureProcess: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Closure Process: Complete Guide 2025 | MoneyCal"
        description="Complete guide to personal loan closure process in India. Learn about foreclosure, prepayment, documentation, NOC, and final settlement procedures. Includes closure calculator."
        keywords="personal loan closure, loan foreclosure, loan prepayment, loan settlement, NOC certificate, loan closure process"
        canonicalUrl="https://moneycal.in/learn/personal-loans/loan-closure-process"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Personal Loan Closure Process: Complete Guide',
          description: 'Comprehensive guide to personal loan closure including foreclosure, prepayment, documentation requirements, and settlement procedures.',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
                  Lesson 20 of 20
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Final Lesson
                </span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Personal Loan Closure Process
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Complete your loan journey successfully with proper closure procedures, documentation, and final settlement
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>12 min read</span>
                <span className="mx-2">•</span>
                <Trophy className="w-4 h-4 mr-2" />
                <span>Course Completion</span>
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
                  <CheckCircle className="w-8 h-8 text-purple-600 mr-3" />
                  Complete Loan Closure Guide
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Successfully closing your personal loan requires proper planning, documentation, and understanding 
                    of the settlement process. Learn how to complete your loan journey smoothly and avoid common pitfalls.
                  </p>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-purple-900 mb-3">
                      🎉 Congratulations!
                    </h3>
                    <p className="text-purple-800">
                      You've reached the final lesson of the Personal Loans course! This guide will help you 
                      complete your loan closure process successfully and maintain a clean credit history.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Types of Loan Closure
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Regular Closure
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Pay all EMIs as scheduled</li>
                        <li>• Complete full tenure</li>
                        <li>• No prepayment penalties</li>
                        <li>• Standard closure process</li>
                        <li>• Get NOC automatically</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        Prepayment Closure
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Pay full amount before tenure</li>
                        <li>• May have prepayment charges</li>
                        <li>• Calculate outstanding amount</li>
                        <li>• Request closure statement</li>
                        <li>• Get NOC after payment</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Pre-Closure Calculator
                  </h3>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Calculate Your Pre-Closure Amount</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Original Loan Amount (₹)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="12.0"
                          defaultValue="12.0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Original Tenure (Months)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="60"
                          defaultValue="60"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          EMIs Paid (Months)
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="24"
                          defaultValue="24"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-white rounded-lg border border-purple-200">
                        <h5 className="font-semibold text-gray-900 mb-2">Outstanding Principal</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Remaining Balance:</span>
                            <span className="font-semibold text-blue-600">₹3,45,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interest on Outstanding:</span>
                            <span className="font-semibold text-orange-600">₹8,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Prepayment Penalty:</span>
                            <span className="font-semibold text-red-600">₹6,900</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <h5 className="font-semibold text-gray-900 mb-2">Total Closure Amount</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Outstanding Principal:</span>
                            <span className="font-semibold">₹3,45,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interest + Penalty:</span>
                            <span className="font-semibold">₹15,400</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-semibold">Total Amount:</span>
                            <span className="font-semibold text-green-600 text-lg">₹3,60,400</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-900 mb-1">Savings on Interest: ₹45,000</div>
                        <div className="text-sm text-green-800">By closing 36 months early</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Step-by-Step Closure Process
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Request Closure Statement</h4>
                        <p className="text-gray-700 text-sm">Contact your lender to get the exact outstanding amount and closure charges</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Review Closure Amount</h4>
                        <p className="text-gray-700 text-sm">Verify the outstanding principal, interest, and any applicable charges</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Make Final Payment</h4>
                        <p className="text-gray-700 text-sm">Pay the complete closure amount through your preferred method</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Obtain NOC</h4>
                        <p className="text-gray-700 text-sm">Get No Objection Certificate and loan closure letter from the lender</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Update Credit Report</h4>
                        <p className="text-gray-700 text-sm">Ensure the loan is marked as 'Closed' in your credit report</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">6</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Keep Documentation</h4>
                        <p className="text-gray-700 text-sm">Maintain all closure documents for future reference</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Required Documents for Closure
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">
                      📋 Essential Documents
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Identity & Address Proof:</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Aadhaar card</li>
                          <li>• PAN card</li>
                          <li>• Passport/Voter ID</li>
                          <li>• Address proof</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Loan Documents:</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Loan agreement copy</li>
                          <li>• EMI payment receipts</li>
                          <li>• Bank statements</li>
                          <li>• Closure application form</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Understanding NOC (No Objection Certificate)
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ What is NOC?
                      </h4>
                      <p className="text-gray-700 mb-3">
                        NOC is a legal document issued by the lender confirming that the loan has been fully repaid 
                        and there are no outstanding dues.
                      </p>
                      <div className="bg-green-50 p-4 rounded border border-green-200">
                        <h5 className="font-semibold text-green-900 mb-2">NOC Contains:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Loan account number</li>
                          <li>• Loan amount and tenure</li>
                          <li>• Closure date</li>
                          <li>• Confirmation of full payment</li>
                          <li>• Lender's signature and seal</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Importance of NOC
                      </h4>
                      <p className="text-gray-700 mb-3">
                        NOC is crucial for future loan applications and maintaining a clean credit history.
                      </p>
                      <div className="bg-blue-50 p-4 rounded border border-blue-200">
                        <h5 className="font-semibold text-blue-900 mb-2">Why NOC Matters:</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Required for future loan applications</li>
                          <li>• Proves loan completion</li>
                          <li>• Improves credit score</li>
                          <li>• Legal protection</li>
                          <li>• Tax benefit documentation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Common Closure Charges
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3">
                        💰 Regular Closure Charges
                      </h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• NOC charges: ₹500-₹2,000</li>
                        <li>• Documentation fees: ₹200-₹1,000</li>
                        <li>• Processing charges: ₹500-₹1,500</li>
                        <li>• Courier charges: ₹100-₹500</li>
                        <li>• Total: ₹1,300-₹5,000</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <h4 className="text-lg font-semibold text-red-900 mb-3">
                        ⚠️ Pre-Closure Charges
                      </h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>• Prepayment penalty: 2-4%</li>
                        <li>• Foreclosure charges: ₹1,000-₹5,000</li>
                        <li>• Interest on outstanding</li>
                        <li>• Processing fees</li>
                        <li>• Total: Varies by lender</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Timeline for Loan Closure
                  </h3>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      ⏰ Closure Timeline
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 px-4 bg-white rounded border border-gray-200">
                        <span className="font-medium">Request closure statement</span>
                        <span className="text-blue-600 font-semibold">Same day</span>
                      </div>
                      <div className="flex items-center justify-between py-2 px-4 bg-white rounded border border-gray-200">
                        <span className="font-medium">Make final payment</span>
                        <span className="text-green-600 font-semibold">1-2 days</span>
                      </div>
                      <div className="flex items-center justify-between py-2 px-4 bg-white rounded border border-gray-200">
                        <span className="font-medium">Receive NOC</span>
                        <span className="text-purple-600 font-semibold">3-7 days</span>
                      </div>
                      <div className="flex items-center justify-between py-2 px-4 bg-white rounded border border-gray-200">
                        <span className="font-medium">Credit report update</span>
                        <span className="text-orange-600 font-semibold">30-45 days</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Post-Closure Checklist
                  </h3>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">
                      ✅ Post-Closure Actions
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">Immediate Actions:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Verify NOC details</li>
                          <li>• Check final payment receipt</li>
                          <li>• Update bank records</li>
                          <li>• File closure documents</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">Follow-up Actions:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Monitor credit report</li>
                          <li>• Keep NOC safe</li>
                          <li>• Update financial records</li>
                          <li>• Plan next financial goal</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Common Closure Mistakes to Avoid
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-red-900 mb-3">
                      ❌ Avoid These Mistakes
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Not getting NOC</h5>
                          <p className="text-red-800 text-sm">Always obtain NOC for future loan applications</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Ignoring credit report</h5>
                          <p className="text-red-800 text-sm">Monitor credit report to ensure proper closure</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Losing closure documents</h5>
                          <p className="text-red-800 text-sm">Keep all closure documents safely for future reference</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Not calculating savings</h5>
                          <p className="text-red-800 text-sm">Calculate if prepayment makes financial sense</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Course Completion Celebration
                  </h3>

                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-8 mb-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎉</div>
                      <h4 className="text-2xl font-bold text-purple-900 mb-3">
                        Congratulations! You've Completed the Personal Loans Course!
                      </h4>
                      <p className="text-purple-800 mb-6">
                        You now have comprehensive knowledge about personal loans, from basics to advanced strategies. 
                        You're equipped to make informed decisions and manage your loans effectively.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <div className="text-2xl font-bold text-purple-600">20</div>
                          <div className="text-sm text-purple-800">Lessons Completed</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <div className="text-2xl font-bold text-purple-600">4h+</div>
                          <div className="text-sm text-purple-800">Learning Time</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <div className="text-2xl font-bold text-purple-600">5</div>
                          <div className="text-sm text-purple-800">Interactive Calculators</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-purple-800">
                        <p>✅ Understanding loan basics and types</p>
                        <p>✅ Mastering eligibility and application process</p>
                        <p>✅ Learning about interest rates and fees</p>
                        <p>✅ Exploring repayment strategies</p>
                        <p>✅ Protecting against frauds and scams</p>
                        <p>✅ Advanced topics like refinancing and closure</p>
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
                      How long does it take to get NOC after loan closure?
                    </h3>
                    <p className="text-gray-700">
                      Most lenders issue NOC within 3-7 days after receiving the final payment. Some banks may 
                      take up to 15 days. You can follow up with the lender if it takes longer.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Is NOC mandatory for future loan applications?
                    </h3>
                    <p className="text-gray-700">
                      While not always mandatory, NOC is highly recommended as it provides proof of loan completion 
                      and can help in faster processing of future loan applications.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Can I close my loan early without penalties?
                    </h3>
                    <p className="text-gray-700">
                      It depends on your loan terms. Floating rate loans usually have no prepayment penalties, 
                      while fixed rate loans may have charges. Check your loan agreement for specific terms.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What should I do if my credit report doesn't show loan closure?
                    </h3>
                    <p className="text-gray-700">
                      Contact your lender to ensure they've updated the credit bureau. If the issue persists, 
                      you can dispute the information with the credit bureau using your NOC as proof.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How long should I keep loan closure documents?
                    </h3>
                    <p className="text-gray-700">
                      Keep loan closure documents, especially NOC, for at least 7 years. These documents may be 
                      required for future loan applications, tax purposes, or legal matters.
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
                  <div className="flex items-center justify-between py-2 px-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-800 font-medium">Loan Closure</span>
                    <span className="text-purple-600">Current</span>
                  </div>
                  
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
                  
                  <Link to="/learn/personal-loans/loan-resources" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Resources</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">20/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="text-xs text-purple-600 mt-2 font-semibold">🎉 COURSE COMPLETE!</div>
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
              to="/learn/personal-loans/loan-refinancing"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Loan Refinancing
            </Link>
            
            <Link
              to="/learn"
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              🎉 Course Complete!
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoanClosureProcess;
