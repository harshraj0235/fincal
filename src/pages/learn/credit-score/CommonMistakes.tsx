import React from 'react';
import { AlertTriangle, XCircle, CheckCircle, TrendingDown, Shield, Target } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CommonMistakes: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="10 Credit Score Mistakes to Avoid 2024 - Don't Lose 200 Points | MoneyCal"
        description="Avoid these 10 costly credit score mistakes! Learn about late payments, high utilization, closing old accounts, and how to maintain 750+ credit score."
        keywords="credit score mistakes, CIBIL score errors, late payment impact, credit utilization mistakes, credit report errors"
        canonicalUrl="https://moneycal.in/learn/credit-score/common-mistakes"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: '10 Common Credit Score Mistakes and How to Avoid Them',
          description: 'Complete guide to avoiding mistakes that damage your credit score',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-score"
        currentLesson="common-mistakes"
        breadcrumb={['Learn', 'Credit Score', 'Common Mistakes']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">These Mistakes Cost You ₹7+ Lakhs on Loans!</h3>
          <p className="text-gray-700">
                Small credit score mistakes have HUGE financial consequences! A 750+ score vs 650 score = ₹7 lakhs difference on home loans. 
                Avoid these 10 mistakes to protect your score and save money! ⚠️💰
          </p>
            </div>
          </div>
        </div>

        {/* Top 10 Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            10 Credit Score Killers (स्कोर खराब करने वाली गलतियां)
          </h2>

          <div className="space-y-4">
            {/* Mistake 1 */}
            <div className="bg-gradient-to-r from-red-500 to-orange-600 p-5 rounded-xl text-white">
              <div className="flex items-center mb-3">
                <div className="bg-white rounded-full p-3 mr-3">
                  <span className="font-bold text-red-700 text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Missing Loan/Credit Card Payments</h3>
                  <p className="text-sm text-red-100">Worst Mistake - Drops Score 50-200 Points!</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded text-gray-700">
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-bold text-red-900 mb-2">❌ Impact:</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• 30 days late: -50 to -100 points</li>
                      <li>• 60 days late: -100 to -150 points</li>
                      <li>• 90+ days (default): -150 to -200 points</li>
                      <li>• Stays on report: 7 years!</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-bold text-green-900 mb-2">✅ Prevention:</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Set auto-pay for all loans/cards</li>
                      <li>• Keep buffer in account always</li>
                      <li>• Set 3 payment reminders</li>
                      <li>• Pay 3 days before due date</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-100 p-2 rounded mt-2 text-xs text-center">
                  <p className="text-red-800 font-bold">Cost: 750 → 600 score = ₹7 lakhs extra on ₹30L home loan!</p>
                </div>
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="bg-white border-2 border-red-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-red-700 text-xl">2</span>
                </div>
                <h3 className="text-lg font-bold text-red-900">High Credit Utilization (&gt; 30%)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-bold text-gray-900 mb-2">❌ The Damage:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• 30-50% utilization: -10 to -30 points</li>
                    <li>• 50-80% utilization: -30 to -60 points</li>
                    <li>• 80-100% utilization: -60 to -100 points</li>
                    <li>• Shows financial stress to lenders</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-bold text-gray-900 mb-2">✅ Fix:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Keep below 30% always</li>
                    <li>• Pay before statement date</li>
                    <li>• Request credit limit increase</li>
                    <li>• Use multiple cards to spread</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mistake 3 */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-orange-700 text-xl">3</span>
                </div>
                <h3 className="text-lg font-bold text-orange-900">Closing Old Credit Accounts</h3>
              </div>
              <div className="bg-orange-50 p-3 rounded text-sm">
                <p className="text-gray-700 mb-2">
                  Reduces average account age (15% of score) and total credit limit (increases utilization).
                </p>
                <p className="font-bold text-red-700 text-xs">Impact: -30 to -80 points (oldest card hurts most)</p>
                <p className="font-bold text-green-700 text-xs mt-2">✅ Keep active with 1 purchase every 6 months</p>
              </div>
            </div>

            {/* Mistake 4 */}
            <div className="bg-white border-2 border-yellow-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-yellow-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-yellow-700 text-xl">4</span>
                </div>
                <h3 className="text-lg font-bold text-yellow-900">Applying for Too Many Loans/Cards</h3>
              </div>
              <div className="bg-yellow-50 p-3 rounded text-sm">
                <p className="text-gray-700 mb-2">
                  Each application = Hard inquiry = -5 to -10 points. 5+ applications in 6 months = -50 points!
                </p>
                <p className="font-bold text-green-700 text-xs mt-2">✅ Wait 6 months between credit applications</p>
              </div>
            </div>

            {/* Mistake 5 */}
            <div className="bg-white border-2 border-purple-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-purple-700 text-xl">5</span>
                </div>
                <h3 className="text-lg font-bold text-purple-900">Not Checking Credit Report Regularly</h3>
              </div>
              <div className="bg-purple-50 p-3 rounded text-sm">
                <p className="text-gray-700 mb-2">
                  30% of credit reports have errors! Wrong entries, fraud, outdated info go unnoticed.
                </p>
                <p className="font-bold text-green-700 text-xs mt-2">✅ Check free monthly on Paisabazaar, dispute errors immediately</p>
              </div>
            </div>

            {/* Mistake 6 */}
            <div className="bg-white border-2 border-blue-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-blue-700 text-xl">6</span>
                </div>
                <h3 className="text-lg font-bold text-blue-900">Settling Debts (Instead of Paying Full)</h3>
              </div>
              <div className="bg-blue-50 p-3 rounded text-sm">
                <p className="text-gray-700 mb-2">
                  "Settled" status is almost as bad as default! Shows you couldn't pay full amount owed.
                </p>
                <p className="font-bold text-red-700 text-xs">Impact: -120 to -180 points, stays 7 years</p>
                <p className="font-bold text-green-700 text-xs mt-2">✅ Negotiate payment plan instead, pay full even if takes time</p>
              </div>
            </div>

            {/* Mistake 7 */}
            <div className="bg-white border-2 border-green-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-green-700 text-xl">7</span>
                </div>
                <h3 className="text-lg font-bold text-green-900">Ignoring "Soft" Inquiries vs "Hard" Inquiries</h3>
              </div>
              <div className="bg-green-50 p-3 rounded text-sm">
                <p className="text-gray-700 mb-2">
                  Checking own score = Soft (no harm). Loan applications = Hard (damages score).
                </p>
                <p className="font-bold text-green-700 text-xs mt-2">✅ Check score unlimited times yourself, but limit loan applications</p>
              </div>
            </div>

            {/* Mistake 8 */}
            <div className="bg-white border-2 border-indigo-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-indigo-700 text-xl">8</span>
                </div>
                <h3 className="text-lg font-bold text-indigo-900">Co-Signing Loans Without Understanding Risk</h3>
              </div>
              <div className="bg-indigo-50 p-3 rounded text-sm">
                <p className="text-gray-700 mb-2">
                  If co-signed person defaults, YOUR score drops too! You're equally liable.
                </p>
                <p className="font-bold text-green-700 text-xs mt-2">✅ Only co-sign for people you absolutely trust, monitor their payments</p>
              </div>
            </div>

            {/* Mistake 9 */}
            <div className="bg-white border-2 border-pink-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-pink-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-pink-700 text-xl">9</span>
                </div>
                <h3 className="text-lg font-bold text-pink-900">Not Having Any Credit History (Credit Invisible)</h3>
              </div>
              <div className="bg-pink-50 p-3 rounded text-sm">
                <p className="text-gray-700 mb-2">
                  No credit cards or loans = No credit score = Loan rejections (lenders can't assess risk).
                </p>
                <p className="font-bold text-green-700 text-xs mt-2">✅ Get secured credit card or become add-on cardholder to start building history</p>
              </div>
            </div>

            {/* Mistake 10 */}
            <div className="bg-white border-2 border-teal-400 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-teal-100 rounded-full p-3 mr-3">
                  <span className="font-bold text-teal-700 text-xl">10</span>
                </div>
                <h3 className="text-lg font-bold text-teal-900">Ignoring Errors in Credit Report</h3>
              </div>
              <div className="bg-teal-50 p-3 rounded text-sm">
                <p className="text-gray-700 mb-2">
                  Wrong loan entries, incorrect late payments, identity theft - 30% reports have errors that hurt score!
                </p>
                <p className="font-bold text-green-700 text-xs mt-2">✅ Check report monthly, dispute all errors within 30 days</p>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Impact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Financial Cost of These Mistakes
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">💸 Real Money Impact:</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300 text-sm">
                <thead className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Mistake</th>
                    <th className="border border-gray-300 p-3">Score Impact</th>
                    <th className="border border-gray-300 p-3">Financial Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3">Late Payments (3+ times)</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">-100 to -150</td>
                    <td className="border border-gray-300 p-3 text-center">₹7L+ on loans</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">High Utilization (80%+)</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700">-60 to -100</td>
                    <td className="border border-gray-300 p-3 text-center">₹5L+ on loans</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3">Closing Oldest Card</td>
                    <td className="border border-gray-300 p-3 text-center text-orange-700">-30 to -80</td>
                    <td className="border border-gray-300 p-3 text-center">₹3L+ on loans</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Multiple Applications (5+ in 6 mo)</td>
                    <td className="border border-gray-300 p-3 text-center text-orange-700">-30 to -50</td>
                    <td className="border border-gray-300 p-3 text-center">Rejections + ₹2L</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3">Debt Settlement</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">-120 to -180</td>
                    <td className="border border-gray-300 p-3 text-center">₹10L+ (very hard to get loans)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-red-200 to-orange-200 rounded-lg border-2 border-red-500">
              <p className="font-bold text-gray-900 text-center mb-2 text-xl">💔 Combined Impact:</p>
              <p className="text-center text-3xl font-bold text-red-700">₹10-15 Lakhs Lost!</p>
              <p className="text-center text-sm text-gray-700">Making these mistakes can cost you 10-15 lakhs in extra interest over lifetime!</p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Improve Score Plan</p>
                <p className="text-sm text-gray-600">Fix these mistakes</p>
              </a>
              <a href="/learn/credit-score/how-calculated" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Score Calculation</p>
                <p className="text-sm text-gray-600">Understand the factors</p>
              </a>
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-red-200">
                <p className="font-semibold text-red-600 mb-1">Payment Strategy</p>
                <p className="text-sm text-gray-600">Avoid #1 mistake</p>
              </a>
              <a href="/learn/credit-score/dispute-errors" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Dispute Errors</p>
                <p className="text-sm text-gray-600">Fix report mistakes</p>
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
              <span className="text-gray-800">#1 Worst mistake: Late/missed payments (can drop score by 200 points, costs ₹7L+ on loans)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Other major mistakes: High utilization, closing old cards, multiple applications, settlements</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Combined impact: Can cost ₹10-15 lakhs in extra interest over lifetime</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Prevention: Auto-pay, keep utilization &lt; 30%, maintain old accounts, space applications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Check credit report monthly for errors - 30% reports have mistakes that hurt score</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Recovery: Most mistakes recoverable in 6-24 months with perfect behavior</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Avoid Mistakes, Build Perfect Score! 🎯</h2>
          <p className="text-red-100 mb-6">
            Learn how to improve your credit score with proven strategies!
          </p>
          <a
            href="/learn/credit-score/improve-score"
            className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-xl hover:bg-red-50 transition-colors"
          >
            6-Month Improvement Plan →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default CommonMistakes;
