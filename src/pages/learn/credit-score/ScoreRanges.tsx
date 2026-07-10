import React from 'react';
import { TrendingUp, TrendingDown, CheckCircle, AlertCircle, Star, Target } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ScoreRanges: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Score Ranges Explained - 300-900 Scale Guide 2024 | MoneyCal"
        description="Complete guide to credit score ranges in India. Understand 300-900 scale, what each range means, loan eligibility, interest rates, and how to improve your score to next level."
        keywords="credit score ranges, CIBIL score 300-900, credit score meaning, loan eligibility by score, interest rate by credit score, credit score categories"
        canonicalUrl="/learn/credit-score/score-ranges"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Score Ranges - Understanding the 300-900 Scale',
          description: 'Complete guide to credit score ranges and what each score means for loan eligibility and interest rates',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-score"
        currentLesson="score-ranges"
        breadcrumb={['Learn', 'Credit Score', 'Score Ranges']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Your Score Determines Your Financial Future!</h3>
          <p className="text-gray-700">
                Understanding credit score ranges is crucial! Each range (300-900) affects loan approvals, interest rates, and financial opportunities. 
                Learn what your score means and how to move to the next level!
              </p>
            </div>
          </div>
        </div>

        {/* Credit Score Scale Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Score Scale: 300-900
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">CIBIL Credit Score Ranges:</h3>
            
            <div className="space-y-3">
              {/* 750-900: Excellent */}
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-4 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">750-900: EXCELLENT</p>
                    <p className="text-sm text-green-100">Premium credit score - Best rates & offers!</p>
                  </div>
                  <div className="text-3xl">?</div>
                </div>
              </div>

              {/* 700-749: Good */}
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-4 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">700-749: GOOD</p>
                    <p className="text-sm text-blue-100">Favorable rates, easy approvals</p>
                  </div>
                  <div className="text-3xl">?</div>
                </div>
              </div>

              {/* 650-699: Fair */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">650-699: FAIR</p>
                    <p className="text-sm text-yellow-100">Moderate rates, some restrictions</p>
                  </div>
                  <div className="text-3xl">?</div>
                </div>
              </div>

              {/* 550-649: Poor */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">550-649: POOR</p>
                    <p className="text-sm text-orange-100">High rates, limited options</p>
                  </div>
                  <div className="text-3xl">?</div>
                </div>
              </div>

              {/* 300-549: Very Poor */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">300-549: VERY POOR</p>
                    <p className="text-sm text-red-100">Difficult to get credit</p>
                  </div>
                  <div className="text-3xl">?</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-100 border-2 border-blue-400 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">Key Insight:</p>
              <p className="text-sm text-gray-700">
                Most banks in India consider <strong>750+ as excellent</strong>, <strong>700+ as good</strong>, and <strong>650+ as fair</strong>. 
                Scores below 650 face challenges in getting credit at reasonable rates.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Range Analysis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What Each Range Means
          </h2>

          <div className="space-y-6">
            {/* 750-900: Excellent */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Star className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-green-900">750-900: EXCELLENT CREDIT SCORE</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-gray-900 mb-3">? What You Get:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Instant loan approvals (90%+ success rate)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Lowest interest rates (8-9% on home loans)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Premium credit cards (Infinia, Magnus)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Higher credit limits (5-10x salary)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Pre-approved offers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Waived processing fees</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-gray-900 mb-3">?? Interest Rate Examples:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-green-50 p-2 rounded">
                      <span className="text-gray-700">Home Loan:</span>
                      <span className="font-bold text-green-700">8.5-9.5%</span>
                    </div>
                    <div className="flex justify-between bg-green-50 p-2 rounded">
                      <span className="text-gray-700">Personal Loan:</span>
                      <span className="font-bold text-green-700">10-12%</span>
                    </div>
                    <div className="flex justify-between bg-green-50 p-2 rounded">
                      <span className="text-gray-700">Car Loan:</span>
                      <span className="font-bold text-green-700">8-9%</span>
                    </div>
                    <div className="flex justify-between bg-green-50 p-2 rounded">
                      <span className="text-gray-700">Credit Card:</span>
                      <span className="font-bold text-green-700">30-36%</span>
                    </div>
                  </div>

                  <div className="mt-3 p-2 bg-green-100 rounded">
                    <p className="text-xs text-gray-700">
                      <strong>Annual Savings:</strong> ?2-5 lakhs on home loans vs poor credit!
          </p>
        </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-200 to-emerald-200 p-4 rounded-lg border-2 border-green-500 mt-4">
                <p className="font-bold text-gray-900 mb-2">How to Maintain 750+ Score:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>? Pay ALL bills on time (never miss payments)</li>
                  <li>? Keep credit utilization under 30%</li>
                  <li>? Maintain mix of credit types</li>
                  <li>? Don't apply for too many loans/cards</li>
                  <li>? Keep old accounts active</li>
                </ul>
              </div>
            </div>

            {/* 700-749: Good */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-blue-900">700-749: GOOD CREDIT SCORE</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <p className="font-bold text-gray-900 mb-3">? What You Get:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Good loan approval chances (80-90%)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reasonable interest rates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Mid-range credit cards</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Decent credit limits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Some pre-approved offers</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <p className="font-bold text-gray-900 mb-3">?? Interest Rate Examples:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span className="text-gray-700">Home Loan:</span>
                      <span className="font-bold text-blue-700">9-10%</span>
                    </div>
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span className="text-gray-700">Personal Loan:</span>
                      <span className="font-bold text-blue-700">12-15%</span>
                    </div>
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span className="text-gray-700">Car Loan:</span>
                      <span className="font-bold text-blue-700">9-10%</span>
                    </div>
                    <div className="flex justify-between bg-blue-50 p-2 rounded">
                      <span className="text-gray-700">Credit Card:</span>
                      <span className="font-bold text-blue-700">36-38%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 p-3 rounded border border-blue-400 mt-4">
                <p className="font-bold text-gray-900 mb-2">?? How to Improve to 750+:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>? Reduce credit utilization to under 30%</li>
                  <li>? Pay off any outstanding dues</li>
                  <li>? Avoid new credit applications for 6 months</li>
                  <li>? Maintain perfect payment history</li>
                </ul>
              </div>
            </div>

            {/* 650-699: Fair */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-8 w-8 text-yellow-600 mr-3" />
                <h3 className="text-xl font-bold text-yellow-900">650-699: FAIR CREDIT SCORE</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                  <p className="font-bold text-gray-900 mb-3">?? What You Get:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Moderate approval chances (60-80%)</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Higher interest rates</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic credit cards only</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Lower credit limits</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Processing fees may apply</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                  <p className="font-bold text-gray-900 mb-3">?? Interest Rate Examples:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-yellow-50 p-2 rounded">
                      <span className="text-gray-700">Home Loan:</span>
                      <span className="font-bold text-yellow-700">10-11%</span>
                    </div>
                    <div className="flex justify-between bg-yellow-50 p-2 rounded">
                      <span className="text-gray-700">Personal Loan:</span>
                      <span className="font-bold text-yellow-700">15-18%</span>
                    </div>
                    <div className="flex justify-between bg-yellow-50 p-2 rounded">
                      <span className="text-gray-700">Car Loan:</span>
                      <span className="font-bold text-yellow-700">10-11%</span>
                    </div>
                    <div className="flex justify-between bg-yellow-50 p-2 rounded">
                      <span className="text-gray-700">Credit Card:</span>
                      <span className="font-bold text-yellow-700">38-40%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 p-3 rounded border border-yellow-400 mt-4">
                <p className="font-bold text-gray-900 mb-2">?? Action Plan to Improve:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>? Clear all outstanding dues immediately</li>
                  <li>? Reduce credit card balances to under 30%</li>
                  <li>? Make all payments on time for 6 months</li>
                  <li>? Avoid new credit applications</li>
                  <li>? Consider secured credit cards to rebuild</li>
                </ul>
              </div>
            </div>

            {/* 550-649: Poor */}
            <div className="bg-gradient-to-br from-orange-50 to-red-100 border-2 border-orange-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <TrendingDown className="h-8 w-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-orange-900">550-649: POOR CREDIT SCORE</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-orange-300">
                  <p className="font-bold text-gray-900 mb-3">? Challenges:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Limited approval chances (30-60%)</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Very high interest rates</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Only secured loans available</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>High processing fees</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Limited credit card options</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-orange-300">
                  <p className="font-bold text-gray-900 mb-3">?? Interest Rate Examples:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-orange-50 p-2 rounded">
                      <span className="text-gray-700">Home Loan:</span>
                      <span className="font-bold text-orange-700">11-13%</span>
                    </div>
                    <div className="flex justify-between bg-orange-50 p-2 rounded">
                      <span className="text-gray-700">Personal Loan:</span>
                      <span className="font-bold text-orange-700">18-25%</span>
                    </div>
                    <div className="flex justify-between bg-orange-50 p-2 rounded">
                      <span className="text-gray-700">Car Loan:</span>
                      <span className="font-bold text-orange-700">11-13%</span>
                    </div>
                    <div className="flex justify-between bg-orange-50 p-2 rounded">
                      <span className="text-gray-700">Credit Card:</span>
                      <span className="font-bold text-orange-700">40-42%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-100 p-3 rounded border border-orange-400 mt-4">
                <p className="font-bold text-gray-900 mb-2">Recovery Strategy:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>? Settle all overdue accounts immediately</li>
                  <li>? Get secured credit card (fixed deposit backed)</li>
                  <li>? Make small purchases and pay in full monthly</li>
                  <li>? Avoid any new credit applications</li>
                  <li>? Consider credit counseling if needed</li>
                </ul>
              </div>
            </div>

            {/* 300-549: Very Poor */}
            <div className="bg-gradient-to-br from-red-50 to-pink-100 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-xl font-bold text-red-900">300-549: VERY POOR CREDIT SCORE</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                  <p className="font-bold text-gray-900 mb-3">?? Major Challenges:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Very low approval chances (&lt;30%)</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Extremely high interest rates</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Only secured loans possible</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>High processing fees & charges</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>No credit card approvals</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                  <p className="font-bold text-gray-900 mb-3">?? Interest Rate Examples:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-red-50 p-2 rounded">
                      <span className="text-gray-700">Home Loan:</span>
                      <span className="font-bold text-red-700">13-15%</span>
                    </div>
                    <div className="flex justify-between bg-red-50 p-2 rounded">
                      <span className="text-gray-700">Personal Loan:</span>
                      <span className="font-bold text-red-700">25-30%</span>
                    </div>
                    <div className="flex justify-between bg-red-50 p-2 rounded">
                      <span className="text-gray-700">Car Loan:</span>
                      <span className="font-bold text-red-700">13-15%</span>
                    </div>
                    <div className="flex justify-between bg-red-50 p-2 rounded">
                      <span className="text-gray-700">Credit Card:</span>
                      <span className="font-bold text-red-700">42%+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-100 p-3 rounded border border-red-400 mt-4">
                <p className="font-bold text-gray-900 mb-2">?? Emergency Recovery Plan:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>? Pay off all outstanding dues immediately</li>
                  <li>? Get secured credit card with fixed deposit</li>
                  <li>? Build credit history with small, regular payments</li>
                  <li>? Wait 6-12 months before applying for new credit</li>
                  <li>? Consider professional credit repair services</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Eligibility by Score */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Loan Eligibility by Credit Score
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300 text-sm">
              <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Credit Score</th>
                  <th className="border border-gray-300 p-3">Home Loan</th>
                  <th className="border border-gray-300 p-3">Personal Loan</th>
                  <th className="border border-gray-300 p-3">Car Loan</th>
                  <th className="border border-gray-300 p-3">Credit Card</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-100">
                  <td className="border border-gray-300 p-3 font-semibold">750-900</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">? Easy</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">? Easy</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">? Easy</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">? Premium</td>
                </tr>
                <tr className="bg-blue-100">
                  <td className="border border-gray-300 p-3 font-semibold">700-749</td>
                  <td className="border border-gray-300 p-3 text-center text-blue-700 font-bold">? Good</td>
                  <td className="border border-gray-300 p-3 text-center text-blue-700 font-bold">? Good</td>
                  <td className="border border-gray-300 p-3 text-center text-blue-700 font-bold">? Good</td>
                  <td className="border border-gray-300 p-3 text-center text-blue-700 font-bold">? Good</td>
                </tr>
                <tr className="bg-yellow-100">
                  <td className="border border-gray-300 p-3 font-semibold">650-699</td>
                  <td className="border border-gray-300 p-3 text-center text-yellow-700 font-bold">?? Fair</td>
                  <td className="border border-gray-300 p-3 text-center text-yellow-700 font-bold">?? Fair</td>
                  <td className="border border-gray-300 p-3 text-center text-yellow-700 font-bold">?? Fair</td>
                  <td className="border border-gray-300 p-3 text-center text-yellow-700 font-bold">?? Basic</td>
                </tr>
                <tr className="bg-orange-100">
                  <td className="border border-gray-300 p-3 font-semibold">550-649</td>
                  <td className="border border-gray-300 p-3 text-center text-orange-700 font-bold">? Difficult</td>
                  <td className="border border-gray-300 p-3 text-center text-orange-700 font-bold">? Difficult</td>
                  <td className="border border-gray-300 p-3 text-center text-orange-700 font-bold">? Difficult</td>
                  <td className="border border-gray-300 p-3 text-center text-orange-700 font-bold">? Secured</td>
                </tr>
                <tr className="bg-red-100">
                  <td className="border border-gray-300 p-3 font-semibold">300-549</td>
                  <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">?? Very Hard</td>
                  <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">?? Very Hard</td>
                  <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">?? Very Hard</td>
                  <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">?? None</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <p className="font-bold text-gray-900 mb-2">?? Key Insights:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>? <strong>750+ score:</strong> Get best rates and instant approvals</li>
              <li>? <strong>700+ score:</strong> Good approval chances with reasonable rates</li>
              <li>? <strong>650+ score:</strong> May face some restrictions and higher rates</li>
              <li>? <strong>Below 650:</strong> Significant challenges in getting credit</li>
              <li>? <strong>Below 550:</strong> Very difficult to get any unsecured credit</li>
            </ul>
          </div>
        </section>

        {/* Interest Rate Impact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interest Rate Impact by Score
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Real Example: ?30 Lakhs Home Loan for 20 Years</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300 text-sm">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Credit Score</th>
                    <th className="border border-gray-300 p-3">Interest Rate</th>
                    <th className="border border-gray-300 p-3">Monthly EMI</th>
                    <th className="border border-gray-300 p-3">Total Interest</th>
                    <th className="border border-gray-300 p-3">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-100">
                    <td className="border border-gray-300 p-3 font-semibold">750-900</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-green-700">8.5%</td>
                    <td className="border border-gray-300 p-3 text-center">?26,072</td>
                    <td className="border border-gray-300 p-3 text-center text-green-700">?32.57L</td>
                    <td className="border border-gray-300 p-3 text-center">?62.57L</td>
                  </tr>
                  <tr className="bg-blue-100">
                    <td className="border border-gray-300 p-3 font-semibold">700-749</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-blue-700">9.5%</td>
                    <td className="border border-gray-300 p-3 text-center">?27,999</td>
                    <td className="border border-gray-300 p-3 text-center text-blue-700">?37.20L</td>
                    <td className="border border-gray-300 p-3 text-center">?67.20L</td>
                  </tr>
                  <tr className="bg-yellow-100">
                    <td className="border border-gray-300 p-3 font-semibold">650-699</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-yellow-700">10.5%</td>
                    <td className="border border-gray-300 p-3 text-center">?29,998</td>
                    <td className="border border-gray-300 p-3 text-center text-yellow-700">?41.99L</td>
                    <td className="border border-gray-300 p-3 text-center">?71.99L</td>
                  </tr>
                  <tr className="bg-orange-100">
                    <td className="border border-gray-300 p-3 font-semibold">550-649</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-orange-700">12%</td>
                    <td className="border border-gray-300 p-3 text-center">?33,032</td>
                    <td className="border border-gray-300 p-3 text-center text-orange-700">?49.28L</td>
                    <td className="border border-gray-300 p-3 text-center">?79.28L</td>
                  </tr>
                  <tr className="bg-red-100">
                    <td className="border border-gray-300 p-3 font-semibold">300-549</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-red-700">14%</td>
                    <td className="border border-gray-300 p-3 text-center">?37,293</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700">?59.50L</td>
                    <td className="border border-gray-300 p-3 text-center">?89.50L</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg border-2 border-green-500">
              <p className="font-bold text-gray-900 text-center mb-2">EXTRA COST OF POOR CREDIT SCORE:</p>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-700 mb-1">?26.93 Lakhs Extra!</p>
                <p className="text-sm text-gray-700">
                  Poor credit (300-549) costs ?26.93 lakhs MORE than excellent credit (750-900)!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/what-is-credit-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">What is Credit Score?</p>
                <p className="text-sm text-gray-600">Understand the basics</p>
              </a>
              <a href="/learn/credit-score/how-calculated" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">How Calculated</p>
                <p className="text-sm text-gray-600">5 factors explained</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Improve Score</p>
                <p className="text-sm text-gray-600">6-month action plan</p>
              </a>
              <a href="/learn/credit-score/check-score-free" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Check Score Free</p>
                <p className="text-sm text-gray-600">All free platforms</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Credit score ranges: 750-900 (excellent), 700-749 (good), 650-699 (fair), 550-649 (poor), 300-549 (very poor)</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">750+ score gets lowest interest rates and instant approvals</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Poor credit can cost ?26+ lakhs extra on a ?30L home loan over 20 years!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Each range offers different loan approval chances and interest rates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Focus on reaching 750+ for maximum financial benefits and opportunities</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Know Your Score, Know Your Power!</h2>
          <p className="text-blue-100 mb-6">
            Check your credit score now and see which range you're in. Then work on improving it to unlock better financial opportunities!
          </p>
          <div className="flex flex-wrap gap-4">
          <a
              href="/learn/credit-score/check-score-free"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
              Check Score Free ?
            </a>
            <a
              href="/learn/credit-score/improve-score"
              className="inline-block bg-purple-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-purple-800 transition-colors"
            >
              Improve Score Plan
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default ScoreRanges;
