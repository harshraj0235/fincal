import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, XCircle, TrendingDown, FileX, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanRejectionReasons: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Rejection Reasons in India: Complete Guide 2025 | MoneyCal"
        description="Understand why personal loans get rejected in India. Learn about common rejection reasons, how to avoid them, and improve your approval chances. Complete guide with solutions."
        keywords="personal loan rejection, loan rejection reasons, why loan rejected, improve loan approval, loan rejection solutions"
        canonicalUrl="https://moneycal.in/learn/personal-loans/loan-rejection-reasons"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Personal Loan Rejection Reasons in India: Complete Guide',
          description: 'Comprehensive guide to understanding personal loan rejection reasons and how to improve approval chances in India.',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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
                  Lesson 14 of 20
                </span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  Beginner
                </span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Personal Loan Rejection Reasons
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Understand why loans get rejected and learn how to avoid common mistakes that lead to rejection
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>11 min read</span>
                <span className="mx-2">•</span>
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>Prevention Guide</span>
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
                  <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                  Top Reasons for Loan Rejection
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Understanding why personal loans get rejected is crucial for improving your approval chances. 
                    Most rejections happen due to a few common reasons that can be easily avoided with proper preparation.
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-red-900 mb-3">
                      ⚠️ Important Insight
                    </h3>
                    <p className="text-red-800">
                      70% of personal loan rejections happen due to credit score issues, income problems, or incomplete documentation. 
                      These are all preventable with proper planning!
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #1 Credit Score Issues (40% of rejections)
                  </h3>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-orange-900 mb-3 flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2" />
                      Low Credit Score Problems
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-orange-900 mb-2">Score Ranges:</h5>
                        <ul className="text-sm text-orange-800 space-y-1">
                          <li>• Below 600: High rejection risk</li>
                          <li>• 600-650: Moderate risk</li>
                          <li>• 650-750: Good approval chances</li>
                          <li>• 750+: Excellent rates</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-orange-900 mb-2">Common Causes:</h5>
                        <ul className="text-sm text-orange-800 space-y-1">
                          <li>• Late payments</li>
                          <li>• High credit utilization</li>
                          <li>• Multiple loan applications</li>
                          <li>• Default history</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #2 Income & Employment Issues (25% of rejections)
                  </h3>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center">
                      <FileX className="w-5 h-5 mr-2" />
                      Income-Related Rejections
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-yellow-900">Insufficient Income</h5>
                          <p className="text-yellow-800 text-sm">Income too low to support the requested loan amount</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-yellow-900">Unstable Employment</h5>
                          <p className="text-yellow-800 text-sm">Frequent job changes or gaps in employment</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-yellow-900">Self-Employment Issues</h5>
                          <p className="text-yellow-800 text-sm">Inconsistent income or insufficient business documentation</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #3 Documentation Problems (20% of rejections)
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                      <FileX className="w-5 h-5 mr-2" />
                      Common Documentation Issues
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Missing Documents:</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Salary slips</li>
                          <li>• Bank statements</li>
                          <li>• Identity proof</li>
                          <li>• Address proof</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Invalid Documents:</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Expired documents</li>
                          <li>• Mismatched information</li>
                          <li>• Poor quality copies</li>
                          <li>• Incomplete forms</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #4 Existing Debt Burden (10% of rejections)
                  </h3>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2" />
                      High Debt-to-Income Ratio
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded border border-purple-200">
                        <h5 className="font-semibold text-purple-900 mb-2">FOIR (Fixed Obligation to Income Ratio)</h5>
                        <p className="text-purple-800 text-sm mb-2">Banks prefer FOIR below 50-60%</p>
                        <div className="text-sm text-purple-700">
                          <strong>Calculation:</strong> (All EMIs + New EMI) / Gross Monthly Income × 100
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-purple-900 mb-2">High FOIR Causes:</h5>
                          <ul className="text-sm text-purple-800 space-y-1">
                            <li>• Multiple existing loans</li>
                            <li>• High credit card debt</li>
                            <li>• Large EMI commitments</li>
                            <li>• Low income relative to debt</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-purple-900 mb-2">Solutions:</h5>
                          <ul className="text-sm text-purple-800 space-y-1">
                            <li>• Pay off existing loans</li>
                            <li>• Reduce credit card usage</li>
                            <li>• Increase income</li>
                            <li>• Request smaller loan amount</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #5 Other Common Rejection Reasons (5% of rejections)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <XCircle className="w-5 h-5 mr-2 text-red-600" />
                        Age-Related Issues
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Too young (below 21 years)</li>
                        <li>• Too old (above 65 years)</li>
                        <li>• Retirement age approaching</li>
                        <li>• Insufficient earning years left</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-blue-600" />
                        Verification Failures
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Address verification failed</li>
                        <li>• Employment verification issues</li>
                        <li>• Phone number not reachable</li>
                        <li>• References not responding</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                        Multiple Applications
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Too many loan applications</li>
                        <li>• Recent rejections</li>
                        <li>• Credit inquiries spike</li>
                        <li>• Desperate borrowing pattern</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <FileX className="w-5 h-5 mr-2 text-purple-600" />
                        Bank-Specific Issues
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Previous bad experience</li>
                        <li>• Account closure history</li>
                        <li>• Cheque bounce record</li>
                        <li>• Policy restrictions</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    How to Avoid Loan Rejection
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Improve Your Credit Score
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Pay all bills on time</li>
                        <li>• Keep credit utilization below 30%</li>
                        <li>• Don't apply for multiple loans simultaneously</li>
                        <li>• Check and correct credit report errors</li>
                        <li>• Maintain a good credit mix</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Strengthen Your Income Profile
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Maintain stable employment (6+ months)</li>
                        <li>• Show consistent income growth</li>
                        <li>• Keep salary account with the same bank</li>
                        <li>• Provide complete income documentation</li>
                        <li>• Consider adding a co-applicant if needed</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Prepare Complete Documentation
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Gather all required documents beforehand</li>
                        <li>• Ensure documents are valid and clear</li>
                        <li>• Double-check all information accuracy</li>
                        <li>• Provide additional income proofs if available</li>
                        <li>• Keep backup copies of all documents</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Manage Your Debt Burden
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Pay off existing high-interest debt first</li>
                        <li>• Keep FOIR below 50%</li>
                        <li>• Close unused credit cards</li>
                        <li>• Request loan amount within your capacity</li>
                        <li>• Consider debt consolidation if needed</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    What to Do If Your Loan Gets Rejected
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">
                      📋 Step-by-Step Recovery Plan
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <h5 className="font-semibold text-blue-900">Understand the Reason</h5>
                          <p className="text-blue-800 text-sm">Ask the bank for specific rejection reasons</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <h5 className="font-semibold text-blue-900">Check Your Credit Report</h5>
                          <p className="text-blue-800 text-sm">Get free credit report and identify issues</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <h5 className="font-semibold text-blue-900">Work on Improvements</h5>
                          <p className="text-blue-800 text-sm">Address the specific issues identified</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <h5 className="font-semibold text-blue-900">Wait and Reapply</h5>
                          <p className="text-blue-800 text-sm">Wait 3-6 months before applying again</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">5</div>
                        <div>
                          <h5 className="font-semibold text-blue-900">Try Alternative Lenders</h5>
                          <p className="text-blue-800 text-sm">Consider NBFCs or online lenders with different criteria</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Alternative Options After Rejection
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3">
                        💳 Credit Card Options
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Personal loan on credit card</li>
                        <li>• Balance transfer to new card</li>
                        <li>• Cash advance (higher interest)</li>
                        <li>• EMI conversion of purchases</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">
                        🏦 Alternative Lenders
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• NBFCs with relaxed criteria</li>
                        <li>• Online lending platforms</li>
                        <li>• Peer-to-peer lending</li>
                        <li>• Fintech loan apps</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-3">
                        👥 Co-Applicant Options
                      </h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Add spouse as co-applicant</li>
                        <li>• Family member as guarantor</li>
                        <li>• Joint loan application</li>
                        <li>• Shared responsibility</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3">
                        💰 Other Financial Options
                      </h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Gold loan (secured)</li>
                        <li>• Loan against FD</li>
                        <li>• Loan against insurance</li>
                        <li>• Borrow from family/friends</li>
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
                      How long should I wait before reapplying after rejection?
                    </h3>
                    <p className="text-gray-700">
                      Wait at least 3-6 months before reapplying. Use this time to improve your credit score, 
                      reduce debt burden, and address the specific reasons for rejection.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Can I apply to multiple banks simultaneously?
                    </h3>
                    <p className="text-gray-700">
                      It's not recommended to apply to multiple banks at once as it can hurt your credit score. 
                      Apply to 2-3 banks maximum and space out applications by a few weeks.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What's the minimum credit score for personal loans?
                    </h3>
                    <p className="text-gray-700">
                      Most banks prefer a credit score of 650+ for personal loans. However, some NBFCs and 
                      online lenders may approve loans with scores as low as 600, but at higher interest rates.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Can I get a personal loan with a low salary?
                    </h3>
                    <p className="text-gray-700">
                      Yes, but the loan amount will be limited. Banks typically offer loans up to 10-15 times 
                      your monthly salary. Consider adding a co-applicant or improving your income profile.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How can I improve my chances of loan approval?
                    </h3>
                    <p className="text-gray-700">
                      Maintain a good credit score (650+), stable employment, complete documentation, 
                      reasonable debt-to-income ratio, and apply for an amount within your repayment capacity.
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
                  <div className="flex items-center justify-between py-2 px-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-800 font-medium">Rejection Reasons</span>
                    <span className="text-orange-600">Current</span>
                  </div>
                  
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
                  
                  <Link to="/learn/personal-loans/loan-refinancing" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Loan Refinancing</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">14/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '70%' }}></div>
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
              to="/learn/personal-loans/prepayment-options"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Prepayment Options
            </Link>
            
            <Link
              to="/learn/personal-loans/improving-approval-chances"
              className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Next: Improving Approval
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoanRejectionReasons;
