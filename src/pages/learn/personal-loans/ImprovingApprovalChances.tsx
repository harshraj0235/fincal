import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, TrendingUp, CheckCircle, Target, Star, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const ImprovingApprovalChances: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How to Improve Personal Loan Approval Chances in India 2025 | MoneyCal"
        description="Boost your personal loan approval chances with proven strategies. Learn credit score improvement, income optimization, documentation tips, and smart application techniques."
        keywords="improve loan approval, personal loan approval tips, increase loan chances, loan approval strategies, better loan approval"
        canonicalUrl="/learn/personal-loans/improving-approval-chances"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'How to Improve Personal Loan Approval Chances in India',
          description: 'Comprehensive guide with proven strategies to improve personal loan approval chances including credit score, income, and documentation optimization.',
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
                  Lesson 15 of 20
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
                Improving Personal Loan Approval Chances
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Proven strategies to boost your loan approval chances and get better interest rates
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>12 min read</span>
                <span className="mx-2">•</span>
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>Success Strategies</span>
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
                  <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                  Proven Strategies for Better Approval
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Getting approved for a personal loan with favorable terms requires strategic planning and preparation. 
                    These proven strategies can significantly improve your approval chances and help you secure better interest rates.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-green-900 mb-3">
                      💡 Success Tip
                    </h3>
                    <p className="text-green-800">
                      Following these strategies can improve your approval chances by 60-80% and help you get 
                      interest rates 2-3% lower than standard rates!
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #1 Credit Score Optimization (Most Important)
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Credit Score Improvement Plan
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Immediate Actions (1-3 months):</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Pay all bills on time</li>
                          <li>• Keep credit utilization below 30%</li>
                          <li>• Don't apply for new credit</li>
                          <li>• Check credit report for errors</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Long-term Strategy (3-12 months):</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Maintain diverse credit mix</li>
                          <li>• Keep old accounts open</li>
                          <li>• Regular credit monitoring</li>
                          <li>• Gradual credit limit increases</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #2 Income & Employment Strengthening
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Employment Stability
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Job tenure:</strong> Stay at current job for 6+ months before applying</li>
                        <li>• <strong>Salary account:</strong> Use the same bank where you have salary account</li>
                        <li>• <strong>Employment letter:</strong> Get updated employment letter with salary details</li>
                        <li>• <strong>Increment proof:</strong> Show recent salary increments or promotions</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ✅ Income Documentation
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Complete salary slips:</strong> Provide last 3-6 months salary slips</li>
                        <li>• <strong>Bank statements:</strong> Show consistent salary credits</li>
                        <li>• <strong>Form 16:</strong> Provide latest Form 16 for tax verification</li>
                        <li>• <strong>Additional income:</strong> Include rental income, investments, bonuses</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #3 Smart Application Strategy
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-3">
                        🎯 Right Timing
                      </h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Apply after salary increment</li>
                        <li>• Avoid applying during job change</li>
                        <li>• Apply when credit score is highest</li>
                        <li>• Consider seasonal offers</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3">
                        🏦 Right Lender
                      </h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Choose bank with existing relationship</li>
                        <li>• Compare multiple lenders</li>
                        <li>• Check lender's criteria</li>
                        <li>• Consider NBFCs for flexibility</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3">
                        💰 Right Amount
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Request amount within 10-15x salary</li>
                        <li>• Don't ask for maximum possible</li>
                        <li>• Consider existing EMIs</li>
                        <li>• Leave room for negotiation</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">
                        📋 Right Documentation
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Prepare all documents beforehand</li>
                        <li>• Ensure documents are clear</li>
                        <li>• Double-check information</li>
                        <li>• Provide additional proofs</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #4 Debt Management Optimization
                  </h3>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-yellow-900 mb-3">
                      📊 FOIR (Fixed Obligation to Income Ratio) Management
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded border border-yellow-300">
                        <h5 className="font-semibold text-yellow-900 mb-2">Target FOIR: Below 50%</h5>
                        <div className="text-sm text-yellow-800">
                          <strong>Formula:</strong> (All EMIs + New EMI) / Gross Monthly Income × 100
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-yellow-900 mb-2">Reduce FOIR:</h5>
                          <ul className="text-sm text-yellow-800 space-y-1">
                            <li>• Pay off existing loans</li>
                            <li>• Reduce credit card debt</li>
                            <li>• Close unused credit cards</li>
                            <li>• Increase income sources</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-yellow-900 mb-2">Benefits:</h5>
                          <ul className="text-sm text-yellow-800 space-y-1">
                            <li>• Higher approval chances</li>
                            <li>• Better interest rates</li>
                            <li>• Higher loan amounts</li>
                            <li>• Faster processing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #5 Relationship Banking Strategy
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-indigo-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        🏦 Build Strong Banking Relationships
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Salary account:</strong> Maintain salary account with the bank</li>
                        <li>• <strong>Savings balance:</strong> Keep good balance in savings account</li>
                        <li>• <strong>Fixed deposits:</strong> Open FDs to show financial stability</li>
                        <li>• <strong>Credit history:</strong> Use bank's credit cards responsibly</li>
                        <li>• <strong>Investment products:</strong> Invest in bank's mutual funds or insurance</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        💳 Credit Card Strategy
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Regular usage:</strong> Use credit card for regular expenses</li>
                        <li>• <strong>Full payment:</strong> Pay full amount before due date</li>
                        <li>• <strong>Limit utilization:</strong> Keep usage below 30% of limit</li>
                        <li>• <strong>Limit increase:</strong> Request periodic limit increases</li>
                        <li>• <strong>No late payments:</strong> Never miss payment deadlines</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #6 Co-Applicant Strategy
                  </h3>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">
                      👥 When and How to Use Co-Applicants
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">Ideal Co-Applicants:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Spouse with good income</li>
                          <li>• Parents with stable income</li>
                          <li>• Siblings with good credit</li>
                          <li>• Business partners (for business loans)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">Benefits:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Higher loan amount</li>
                          <li>• Better interest rates</li>
                          <li>• Improved approval chances</li>
                          <li>• Shared responsibility</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    #7 Application Timing & Process
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        ⏰ Best Times to Apply
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>After salary increment:</strong> Shows income growth</li>
                        <li>• <strong>Festive seasons:</strong> Banks offer better rates</li>
                        <li>• <strong>Month-end:</strong> Banks try to meet targets</li>
                        <li>• <strong>After credit score improvement:</strong> When score is highest</li>
                        <li>• <strong>Stable employment period:</strong> 6+ months in current job</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        📝 Application Process Optimization
                      </h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Online application:</strong> Faster processing and better tracking</li>
                        <li>• <strong>Complete information:</strong> Fill all fields accurately</li>
                        <li>• <strong>Consistent details:</strong> Match information across documents</li>
                        <li>• <strong>Follow up:</strong> Stay in touch with bank representative</li>
                        <li>• <strong>Be responsive:</strong> Respond quickly to bank queries</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Advanced Strategies for Better Rates
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">
                        💎 Negotiation Tactics
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Compare offers from multiple banks</li>
                        <li>• Use existing relationship as leverage</li>
                        <li>• Show good credit history</li>
                        <li>• Be willing to walk away</li>
                        <li>• Ask for processing fee waiver</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3">
                        🎯 Pre-Approval Strategy
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Get pre-approved offers</li>
                        <li>• Use pre-approval for negotiation</li>
                        <li>• Faster processing</li>
                        <li>• Better terms</li>
                        <li>• No impact on credit score</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-900 mb-3">
                        🏆 Premium Banking
                      </h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Upgrade to premium banking</li>
                        <li>• Get dedicated relationship manager</li>
                        <li>• Priority processing</li>
                        <li>• Better rates and terms</li>
                        <li>• Waived processing fees</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3">
                        📊 Portfolio Approach
                      </h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Diversify banking relationships</li>
                        <li>• Maintain accounts with multiple banks</li>
                        <li>• Use different banks for different needs</li>
                        <li>• Build credit history across lenders</li>
                        <li>• Create competition for better rates</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Common Mistakes to Avoid
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Mistakes That Hurt Approval Chances
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Applying to multiple banks simultaneously</h5>
                          <p className="text-red-800 text-sm">Creates multiple hard inquiries and reduces approval chances</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Incomplete or inaccurate documentation</h5>
                          <p className="text-red-800 text-sm">Leads to rejection or delays in processing</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Requesting maximum possible amount</h5>
                          <p className="text-red-800 text-sm">Banks prefer conservative loan amounts</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Applying during job transition</h5>
                          <p className="text-red-800 text-sm">Employment instability reduces approval chances</p>
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
                      How long should I wait before applying for a personal loan?
                    </h3>
                    <p className="text-gray-700">
                      Wait at least 3-6 months after any major financial changes like job change, 
                      credit score improvement, or debt reduction. This gives time for your profile to stabilize.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Should I apply online or visit the branch?
                    </h3>
                    <p className="text-gray-700">
                      Online applications are generally faster and more convenient. However, if you have 
                      an existing relationship with the bank, visiting the branch might give you better 
                      personalized service and negotiation opportunities.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How can I negotiate better interest rates?
                    </h3>
                    <p className="text-gray-700">
                      Compare offers from multiple banks, leverage your existing banking relationship, 
                      show your good credit history, and be willing to negotiate. Having pre-approved 
                      offers from other banks gives you strong negotiation power.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Is it better to apply with a co-applicant?
                    </h3>
                    <p className="text-gray-700">
                      Yes, if your co-applicant has a good credit score and stable income. This can 
                      significantly improve your approval chances, get you better rates, and allow you 
                      to borrow a higher amount.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What's the minimum credit score for personal loans?
                    </h3>
                    <p className="text-gray-700">
                      Most banks prefer a credit score of 650+ for personal loans. However, some NBFCs 
                      and online lenders may approve loans with scores as low as 600, though at higher 
                      interest rates.
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
                    <span className="text-green-800 font-medium">Improving Approval</span>
                    <span className="text-green-600">Current</span>
                  </div>
                  
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
                  
                  <Link to="/learn/personal-loans/loan-closure-process" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Loan Closure</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">15/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
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
              to="/learn/personal-loans/loan-rejection-reasons"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Rejection Reasons
            </Link>
            
            <Link
              to="/learn/personal-loans/loan-comparison-tools"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Next: Comparison Tools
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ImprovingApprovalChances;
