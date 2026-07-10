import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, XCircle, Lightbulb, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanMythsDebunked: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Myths Debunked: Truth vs Fiction 2025 | MoneyCal"
        description="Debunk common personal loan myths and misconceptions in India. Learn the truth about interest rates, eligibility, processing, and make informed decisions. Complete myth-busting guide."
        keywords="personal loan myths, loan misconceptions, personal loan facts, loan myths debunked, personal loan truth"
        canonicalUrl="/learn/personal-loans/loan-myths-debunked"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Personal Loan Myths Debunked: Truth vs Fiction',
          description: 'Comprehensive guide debunking common personal loan myths and misconceptions to help borrowers make informed decisions.',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
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
                  Lesson 17 of 20
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
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
                Personal Loan Myths Debunked
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Separate fact from fiction and make informed decisions by understanding the truth about personal loans
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Lightbulb className="w-4 h-4 mr-2" />
                <span>9 min read</span>
                <span className="mx-2">•</span>
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>Myth Busting</span>
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
                  <Lightbulb className="w-8 h-8 text-yellow-600 mr-3" />
                  Common Myths vs Reality
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Personal loans are surrounded by many myths and misconceptions that can lead to poor financial decisions. 
                    Let's debunk the most common myths and reveal the truth behind personal loans.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-yellow-900 mb-3">
                      💡 Important Insight
                    </h3>
                    <p className="text-yellow-800">
                      Believing in these myths can cost you thousands of rupees! Understanding the truth helps you 
                      make better decisions and save money on your personal loan.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Myth #1: "Personal loans are always expensive"
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-red-900 mb-2">MYTH</h4>
                        <p className="text-red-800 mb-3">
                          "Personal loans have very high interest rates and are always expensive compared to other loans."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-green-900 mb-2">REALITY</h4>
                        <p className="text-green-800 mb-3">
                          Personal loan rates vary widely (8-24%) based on your credit profile. With good credit score, 
                          you can get rates as low as 8-12%, which is competitive with other loan types.
                        </p>
                        <div className="bg-white p-4 rounded border border-green-300">
                          <h5 className="font-semibold text-green-900 mb-2">Current Market Rates:</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Excellent credit (750+): 8-12%</li>
                            <li>• Good credit (650-750): 12-16%</li>
                            <li>• Average credit (600-650): 16-20%</li>
                            <li>• Poor credit (below 600): 20-24%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Myth #2: "You need a perfect credit score to get a loan"
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-red-900 mb-2">MYTH</h4>
                        <p className="text-red-800">
                          "You need a credit score of 800+ to get approved for a personal loan."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-green-900 mb-2">REALITY</h4>
                        <p className="text-green-800 mb-3">
                          Most lenders approve loans with credit scores of 650+. Some NBFCs even approve loans 
                          with scores as low as 600, though at higher interest rates.
                        </p>
                        <div className="bg-white p-4 rounded border border-green-300">
                          <h5 className="font-semibold text-green-900 mb-2">Credit Score Requirements:</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Banks: Usually 650+</li>
                            <li>• NBFCs: 600+</li>
                            <li>• Online lenders: 550+ (higher rates)</li>
                            <li>• Co-applicant can help with lower scores</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Myth #3: "Processing fees are always high"
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-red-900 mb-2">MYTH</h4>
                        <p className="text-red-800">
                          "All banks charge high processing fees of 3-5% on personal loans."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-green-900 mb-2">REALITY</h4>
                        <p className="text-green-800 mb-3">
                          Processing fees vary significantly. Many banks offer promotional rates as low as 0.5-1%, 
                          and some even waive fees for existing customers.
                        </p>
                        <div className="bg-white p-4 rounded border border-green-300">
                          <h5 className="font-semibold text-green-900 mb-2">Processing Fee Range:</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Public sector banks: 0.5-2%</li>
                            <li>• Private banks: 1-3%</li>
                            <li>• NBFCs: 2-4%</li>
                            <li>• Promotional offers: 0-1%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Myth #4: "You can't prepay personal loans"
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-red-900 mb-2">MYTH</h4>
                        <p className="text-red-800">
                          "Personal loans cannot be prepaid and you have to pay the full tenure."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-green-900 mb-2">REALITY</h4>
                        <p className="text-green-800 mb-3">
                          Most personal loans allow prepayment with minimal or no penalties. Floating rate loans 
                          usually have no prepayment charges, while fixed rate loans may have small penalties.
                        </p>
                        <div className="bg-white p-4 rounded border border-green-300">
                          <h5 className="font-semibold text-green-900 mb-2">Prepayment Rules:</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Floating rate: Usually no penalty</li>
                            <li>• Fixed rate: 2-4% penalty (reduces over time)</li>
                            <li>• Partial prepayment: Allowed</li>
                            <li>• Full prepayment: Allowed</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Myth #5: "Online loans are risky"
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-red-900 mb-2">MYTH</h4>
                        <p className="text-red-800">
                          "Online personal loans are unsafe and you might lose your money or get scammed."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-green-900 mb-2">REALITY</h4>
                        <p className="text-green-800 mb-3">
                          Legitimate online lenders are regulated by RBI and offer secure, fast loan processing. 
                          Just ensure you're dealing with licensed lenders and verify their credentials.
                        </p>
                        <div className="bg-white p-4 rounded border border-green-300">
                          <h5 className="font-semibold text-green-900 mb-2">Safety Checklist:</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Check RBI license</li>
                            <li>• Verify website security (HTTPS)</li>
                            <li>• Read customer reviews</li>
                            <li>• Never pay upfront fees</li>
                            <li>• Use official apps/websites</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Myth #6: "You need collateral for personal loans"
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-red-900 mb-2">MYTH</h4>
                        <p className="text-red-800">
                          "Personal loans require collateral like property or gold to get approved."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-green-900 mb-2">REALITY</h4>
                        <p className="text-green-800 mb-3">
                          Personal loans are unsecured loans that don't require collateral. They're approved based on 
                          your creditworthiness, income, and repayment capacity.
                        </p>
                        <div className="bg-white p-4 rounded border border-green-300">
                          <h5 className="font-semibold text-green-900 mb-2">What Lenders Consider:</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Credit score and history</li>
                            <li>• Monthly income</li>
                            <li>• Employment stability</li>
                            <li>• Existing debt burden</li>
                            <li>• Age and location</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Myth #7: "Multiple loan applications improve chances"
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-red-900 mb-2">MYTH</h4>
                        <p className="text-red-800">
                          "Applying to multiple banks simultaneously increases your chances of approval."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-green-900 mb-2">REALITY</h4>
                        <p className="text-green-800 mb-3">
                          Multiple applications create multiple hard inquiries on your credit report, which can 
                          actually hurt your credit score and reduce approval chances.
                        </p>
                        <div className="bg-white p-4 rounded border border-green-300">
                          <h5 className="font-semibold text-green-900 mb-2">Better Strategy:</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Apply to 2-3 banks maximum</li>
                            <li>• Space applications by 2-3 weeks</li>
                            <li>• Use pre-approval tools first</li>
                            <li>• Compare offers before applying</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Myth #8: "Personal loans affect your credit score negatively"
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-red-900 mb-2">MYTH</h4>
                        <p className="text-red-800">
                          "Taking a personal loan will always hurt your credit score."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-green-900 mb-2">REALITY</h4>
                        <p className="text-green-800 mb-3">
                          If managed properly, personal loans can actually improve your credit score by diversifying 
                          your credit mix and showing responsible repayment behavior.
                        </p>
                        <div className="bg-white p-4 rounded border border-green-300">
                          <h5 className="font-semibold text-green-900 mb-2">Credit Score Impact:</h5>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Initial dip: 5-10 points (hard inquiry)</li>
                            <li>• Positive impact: On-time payments</li>
                            <li>• Credit mix: Diversifies your profile</li>
                            <li>• Long-term benefit: Builds credit history</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    How to Avoid Falling for Myths
                  </h3>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">
                      🛡️ Protection Strategies
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-900">Research thoroughly</h5>
                          <p className="text-blue-800 text-sm">Always verify information from multiple reliable sources</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-900">Read loan agreements carefully</h5>
                          <p className="text-blue-800 text-sm">Understand all terms and conditions before signing</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-900">Consult financial experts</h5>
                          <p className="text-blue-800 text-sm">Get professional advice for complex decisions</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-900">Compare multiple options</h5>
                          <p className="text-blue-800 text-sm">Don't rely on single source of information</p>
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
                      Are personal loans really more expensive than other loans?
                    </h3>
                    <p className="text-gray-700">
                      Not necessarily. While personal loans may have higher rates than secured loans like home loans, 
                      they're often cheaper than credit cards and can be competitive with other unsecured options.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Can I get a personal loan with a low credit score?
                    </h3>
                    <p className="text-gray-700">
                      Yes, but with limitations. While banks prefer scores of 650+, some NBFCs and online lenders 
                      may approve loans with scores as low as 600, though at higher interest rates.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Is it safe to apply for personal loans online?
                    </h3>
                    <p className="text-gray-700">
                      Yes, if you use legitimate, RBI-licensed lenders. Always verify the lender's credentials, 
                      check for secure websites (HTTPS), and never pay upfront fees.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Will taking a personal loan hurt my credit score?
                    </h3>
                    <p className="text-gray-700">
                      Initially, it may cause a small dip due to the hard inquiry, but if you make timely payments, 
                      it can actually improve your credit score over time by diversifying your credit mix.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How many banks should I apply to for a personal loan?
                    </h3>
                    <p className="text-gray-700">
                      Apply to 2-3 banks maximum and space out applications by 2-3 weeks. Multiple simultaneous 
                      applications can hurt your credit score and reduce approval chances.
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
                  <div className="flex items-center justify-between py-2 px-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-800 font-medium">Myths Debunked</span>
                    <span className="text-yellow-600">Current</span>
                  </div>
                  
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
                  
                  <Link to="/learn/personal-loans/loan-future-trends" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Future Trends</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">17/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '85%' }}></div>
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
              to="/learn/personal-loans/loan-comparison-tools"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Comparison Tools
            </Link>
            
            <Link
              to="/learn/personal-loans/loan-fraud-protection"
              className="flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Next: Fraud Protection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoanMythsDebunked;
