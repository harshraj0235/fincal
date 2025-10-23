import React from 'react';
import { Calculator, PieChart, TrendingUp, Clock, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const HowCalculated: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How Credit Score is Calculated - 5 Factors Explained | MoneyCal"
        description="Learn exactly how CIBIL score is calculated. Understand the 5 factors: payment history (35%), credit utilization (30%), credit history length (15%), credit mix (10%), new credit (10%)."
        keywords="how credit score calculated, CIBIL score factors, credit score calculation, payment history impact, credit utilization ratio, credit score formula"
        canonicalUrl="https://moneycal.in/learn/credit-score/how-calculated"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'How Credit Score is Calculated - The 5 Key Factors',
          description: 'Detailed explanation of the 5 factors that determine your credit score and their weightage',
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
        currentLesson="how-calculated"
        breadcrumb={['Learn', 'Credit Score', 'How Calculated']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Calculator className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Unlock the Secret Formula!</h3>
          <p className="text-gray-700">
                Understanding how your credit score is calculated helps you improve it strategically. 
                Focus on the right factors and boost your score by 100+ points in months! 📊✨
              </p>
            </div>
          </div>
        </div>

        {/* The 5 Factors Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            The 5 Factors That Determine Your Credit Score
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-400 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Credit Score Calculation (CIBIL Formula):</h3>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-2 border-blue-400">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                    <p className="font-bold text-gray-900">1. Payment History</p>
                  </div>
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                    35%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-600 h-4 rounded-full" style={{width: '35%'}}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Most important! On-time payments = good score</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-green-400">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <PieChart className="h-6 w-6 text-green-600 mr-2" />
                    <p className="font-bold text-gray-900">2. Credit Utilization</p>
                  </div>
                  <div className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                    30%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-green-600 h-4 rounded-full" style={{width: '30%'}}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Keep under 30% of credit limit for best score</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-purple-400">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-purple-600 mr-2" />
                    <p className="font-bold text-gray-900">3. Credit History Length</p>
                  </div>
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                    15%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-purple-600 h-4 rounded-full" style={{width: '15%'}}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Older accounts better - don't close old cards!</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-yellow-400">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 text-yellow-600 mr-2" />
                    <p className="font-bold text-gray-900">4. Credit Mix</p>
                  </div>
                  <div className="bg-yellow-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                    10%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-yellow-600 h-4 rounded-full" style={{width: '10%'}}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Mix of credit cards + loans shows maturity</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-red-400">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
                    <p className="font-bold text-gray-900">5. New Credit Inquiries</p>
                  </div>
                  <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                    10%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-red-600 h-4 rounded-full" style={{width: '10%'}}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Too many applications hurt - space them out!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Factor 1: Payment History */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center">
              <CreditCard className="h-10 w-10 mr-3" />
              <div>
                <h2 className="text-3xl font-bold">Factor 1: Payment History (35%)</h2>
                <p className="text-blue-100">Most Important - Make or Break Your Score!</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">What Credit Bureaus Track:</h3>

            <div className="space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg">
                <p className="font-bold text-gray-900 mb-3">✅ Positive Factors (Boost Score):</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Paying ALL bills on time (credit cards, loans, EMIs)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Paying FULL amount (not just minimum due)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Consistent on-time record for 6+ months</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Clearing past dues and defaults</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-5 rounded-lg border-2 border-red-400">
                <p className="font-bold text-red-900 mb-3">❌ Negative Factors (Damage Score):</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">Late Payments (30+ days)</p>
                      <p className="text-gray-700">Score drops 50-100 points | Stays on report for 7 years</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">Defaults (90+ days)</p>
                      <p className="text-gray-700">Score drops 150-200 points | Marked as NPA</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">Settlements (Paying less than owed)</p>
                      <p className="text-gray-700">Almost as bad as default | Stays 7 years</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">Write-offs (Bank gives up collection)</p>
                      <p className="text-gray-700">Severe damage | Loan approvals nearly impossible</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-3 text-lg">💰 Real Impact Example:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-green-700 mb-2">Perfect Payment (24 months):</p>
                    <p className="text-sm text-gray-700">Starting: 650</p>
                    <p className="text-sm font-bold text-green-700">After 2 years: 780+ 📈</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-red-700 mb-2">1 Late Payment (30 days):</p>
                    <p className="text-sm text-gray-700">Starting: 750</p>
                    <p className="text-sm font-bold text-red-700">Immediately: 650-700 📉</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Factor 2: Credit Utilization */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center">
              <PieChart className="h-10 w-10 mr-3" />
              <div>
                <h2 className="text-3xl font-bold">Factor 2: Credit Utilization (30%)</h2>
                <p className="text-green-100">How Much of Your Credit Limit You Use</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-green-400 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">What is Credit Utilization?</h3>
            
            <p className="text-gray-700 mb-4">
              <strong>Credit Utilization Ratio (CUR)</strong> = (Total Credit Card Balance ÷ Total Credit Limit) × 100
            </p>

            <div className="bg-green-50 p-5 rounded-lg mb-4">
              <p className="font-bold text-gray-900 mb-3">Formula & Example:</p>
              <div className="bg-white p-4 rounded border-2 border-green-400">
                <p className="font-semibold text-gray-900 mb-2">Scenario:</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>Card 1: ₹15,000 used of ₹50,000 limit</p>
                  <p>Card 2: ₹10,000 used of ₹40,000 limit</p>
                  <p className="font-bold mt-2">Total used: ₹25,000</p>
                  <p className="font-bold">Total limit: ₹90,000</p>
                </div>
                <div className="bg-green-100 p-3 rounded mt-3">
                  <p className="font-mono text-center text-gray-900">
                    CUR = (₹25,000 ÷ ₹90,000) × 100 = <strong className="text-green-700 text-xl">27.8%</strong>
                  </p>
                  <p className="text-sm text-green-700 font-bold text-center mt-2">
                    ✅ Excellent! (Under 30%)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <h4 className="font-bold text-lg text-gray-900">Impact on Credit Score:</h4>
              
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-4 rounded-lg text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">0-10% Utilization</p>
                      <p className="text-sm text-green-100">Ideal range - shows discipline</p>
                    </div>
                    <div className="text-3xl">🏆</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-300 to-green-400 p-4 rounded-lg text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">10-30% Utilization</p>
                      <p className="text-sm text-green-100">Excellent - recommended range</p>
                    </div>
                    <div className="text-3xl">✅</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-lg text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">30-50% Utilization</p>
                      <p className="text-sm text-yellow-100">Fair - try to reduce</p>
                    </div>
                    <div className="text-3xl">⚠️</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-lg text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">50-70% Utilization</p>
                      <p className="text-sm text-orange-100">Poor - financial stress signal</p>
                    </div>
                    <div className="text-3xl">❌</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-lg text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">70-100% Utilization</p>
                      <p className="text-sm text-red-100">Very Poor - major red flag!</p>
                    </div>
                    <div className="text-3xl">🚨</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-400">
              <p className="font-bold text-gray-900 mb-3">🎯 How to Optimize Utilization:</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Pay before statement date:</strong> Utilization reported on statement generation, not due date!</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Request limit increase:</strong> Higher limit = lower utilization (without spending more)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Spread spending:</strong> Use 2-3 cards instead of maxing out one</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Pay multiple times:</strong> Pay mid-month + before statement to keep reported balance low</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Factor 3: Credit History Length */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center">
              <Clock className="h-10 w-10 mr-3" />
              <div>
                <h2 className="text-3xl font-bold">Factor 3: Credit History Length (15%)</h2>
                <p className="text-purple-100">Age of Your Credit Accounts</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">How Age Affects Score:</h3>

            <div className="space-y-4">
              <div className="bg-purple-50 p-5 rounded-lg">
                <p className="font-semibold text-gray-900 mb-3">Average Account Age Calculation:</p>
                <div className="bg-white p-4 rounded border-2 border-purple-400">
                  <p className="font-mono text-sm text-gray-700 mb-2">
                    Average Age = Sum of all account ages ÷ Number of accounts
                  </p>
                  
                  <div className="bg-purple-100 p-3 rounded mt-3">
                    <p className="font-bold text-gray-900 text-sm mb-2">Example:</p>
                    <p className="text-xs text-gray-700">Card 1: 5 years old</p>
                    <p className="text-xs text-gray-700">Card 2: 3 years old</p>
                    <p className="text-xs text-gray-700">Car Loan: 2 years old</p>
                    <p className="text-xs font-bold text-purple-700 mt-2">
                      Average Age = (5 + 3 + 2) ÷ 3 = 3.3 years
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-400">
                  <p className="font-bold text-green-900 mb-2">✅ Good for Score:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Older accounts (5+ years)</li>
                    <li>• Keeping first credit card active</li>
                    <li>• Not closing old accounts</li>
                    <li>• Long-term loans (home, car)</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-400">
                  <p className="font-bold text-red-900 mb-2">❌ Bad for Score:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Closing oldest credit card</li>
                    <li>• Only new accounts (&lt;1 year)</li>
                    <li>• Frequently opening/closing</li>
                    <li>• No credit history at all</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-100 p-3 rounded border border-yellow-400 mt-3">
                <p className="font-bold text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-gray-700">
                  If your oldest card has annual fee, DON'T close it! Negotiate fee waiver or keep it active with one small purchase every 6 months. 
                  Closing it reduces your average age and hurts score by 20-50 points!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Factor 4 & 5 Combined */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Factor 4 */}
            <div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-6 text-white mb-4">
                <h2 className="text-2xl font-bold">Factor 4: Credit Mix (10%)</h2>
              </div>

              <div className="bg-white border-2 border-yellow-400 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  Having both <strong>revolving credit</strong> (credit cards) and <strong>installment loans</strong> (EMIs) shows financial maturity.
                </p>

                <div className="bg-yellow-50 p-4 rounded-lg mb-3">
                  <p className="font-semibold text-gray-900 mb-2">Ideal Mix:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 1-2 Credit Cards (revolving)</li>
                    <li>• 1-2 Loans (installment)</li>
                    <li>• Mix of secured + unsecured</li>
                  </ul>
                </div>

                <div className="bg-green-100 p-3 rounded">
                  <p className="text-sm text-gray-800">
                    <strong>✅ Example:</strong> 1 credit card + 1 home loan = Good mix
          </p>
        </div>

                <div className="bg-red-100 p-3 rounded mt-2">
                  <p className="text-sm text-gray-800">
                    <strong>❌ Don't:</strong> Take loans JUST for credit mix. Only if genuinely needed!
                  </p>
                </div>
              </div>
            </div>

            {/* Factor 5 */}
            <div>
              <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-xl p-6 text-white mb-4">
                <h2 className="text-2xl font-bold">Factor 5: New Credit (10%)</h2>
              </div>

              <div className="bg-white border-2 border-red-400 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  Every loan/card application creates a <strong>hard inquiry</strong> that temporarily lowers your score.
                </p>

                <div className="bg-red-50 p-4 rounded-lg mb-3">
                  <p className="font-semibold text-red-900 mb-2">Hard Inquiry Impact:</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Each inquiry: -5 to -10 points</li>
                    <li>• Stays on report: 2 years</li>
                    <li>• Multiple in 30 days: Combined impact</li>
                  </ul>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="bg-green-100 p-3 rounded border border-green-400">
                    <p className="font-bold text-green-900 mb-1">✅ Safe Gap:</p>
                    <p className="text-gray-700">Wait 6 months between applications</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded border border-yellow-400">
                    <p className="font-bold text-yellow-900 mb-1">⚠️ Moderate:</p>
                    <p className="text-gray-700">2-3 applications per year</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded border border-red-400">
                    <p className="font-bold text-red-900 mb-1">❌ Dangerous:</p>
                    <p className="text-gray-700">5+ applications in 6 months (score crashes!)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Score Calculation Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Real Credit Score Calculation Example
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-400 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">Meet Priya - Let's Calculate Her Score:</h3>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-gray-300">
                <p className="font-bold text-gray-900 mb-3">Priya's Credit Profile:</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-1">Credit Cards:</p>
                    <p>• 2 cards, 4 years average age</p>
                    <p>• ₹20K used of ₹80K limit (25%)</p>
                    <p>• All payments on time (24 months)</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Loans:</p>
                    <p>• 1 car loan, 2 years old</p>
                    <p>• All EMIs paid on time</p>
                    <p>• 1 hard inquiry in last year</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-bold text-blue-900 mb-2">Factor 1: Payment History (35%)</p>
                  <p className="text-sm text-gray-700">Perfect record for 24 months</p>
                  <p className="font-bold text-blue-700">Score: 95/100 (33.25 points)</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-900 mb-2">Factor 2: Utilization (30%)</p>
                  <p className="text-sm text-gray-700">25% utilization (excellent!)</p>
                  <p className="font-bold text-green-700">Score: 90/100 (27 points)</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-bold text-purple-900 mb-2">Factor 3: History Length (15%)</p>
                  <p className="text-sm text-gray-700">Average 3.3 years (good)</p>
                  <p className="font-bold text-purple-700">Score: 80/100 (12 points)</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-bold text-yellow-900 mb-2">Factor 4: Credit Mix (10%)</p>
                  <p className="text-sm text-gray-700">Cards + car loan (good mix)</p>
                  <p className="font-bold text-yellow-700">Score: 85/100 (8.5 points)</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-bold text-orange-900 mb-2">Factor 5: New Credit (10%)</p>
                  <p className="text-sm text-gray-700">1 inquiry in last year (fine)</p>
                  <p className="font-bold text-orange-700">Score: 80/100 (8 points)</p>
                </div>

                <div className="bg-gradient-to-r from-green-200 to-emerald-200 p-5 rounded-lg border-2 border-green-500">
                  <p className="font-bold text-gray-900 text-lg mb-2">Priya's Total Credit Score:</p>
                  <p className="text-sm text-gray-700 mb-2">
                    33.25 + 27 + 12 + 8.5 + 8 = 88.75/100
                  </p>
                  <p className="font-bold text-green-700 text-3xl">
                    = 799 Credit Score! 🎉
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    (Actual CIBIL uses proprietary algorithm, but this shows the weighting!)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* External Resources */}
        <section className="mb-12">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">🔗 Official Resources:</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <strong>CIBIL Official:</strong> <a href="https://www.cibil.com/resources" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Credit Score Factors Explained</a>
              </p>
              <p className="text-gray-700">
                <strong>RBI Consumer Education:</strong> <a href="https://www.rbi.org.in/Scripts/FAQView.aspx?Id=92" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Credit Information FAQs</a>
              </p>
              <p className="text-gray-700">
                <strong>Experian India:</strong> <a href="https://www.experian.in/credit-score/credit-score-range" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Credit Score Range Guide</a>
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/what-is-credit-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">What is Credit Score?</p>
                <p className="text-sm text-gray-600">Understand the basics first</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Improve Score in 6 Months</p>
                <p className="text-sm text-gray-600">Actionable improvement plan</p>
              </a>
              <a href="/learn/credit-cards/cibil-impact" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Credit Cards & CIBIL</p>
                <p className="text-sm text-gray-600">How cards affect your score</p>
              </a>
              <a href="/learn/credit-score/check-score-free" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Check Score Free</p>
                <p className="text-sm text-gray-600">Get your free report</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">5 factors: Payment History (35%), Utilization (30%), History Length (15%), Mix (10%), New Credit (10%)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Payment history most important - never miss payments, pay on time!</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Keep utilization under 30% - pay before statement date for best results</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Don't close old cards - reduces average account age (15% of score)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Space out loan/card applications - wait 6 months between to minimize hard inquiries</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Ideal mix: 1-2 credit cards + 1-2 loans (don't force it though!)</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: Improve Your Score! 🚀</h2>
          <p className="text-blue-100 mb-6">
            Now that you know the formula, learn the exact 6-month action plan to boost your score to 750+!
          </p>
          <a
            href="/learn/credit-score/improve-score"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: 6-Month Improvement Plan →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default HowCalculated;
