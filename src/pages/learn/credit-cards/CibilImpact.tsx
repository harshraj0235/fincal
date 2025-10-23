import React from 'react';
import { TrendingUp, TrendingDown, CheckCircle, AlertCircle, Target, Shield } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CibilImpact: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How Credit Cards Affect Your CIBIL Score 2024 - Impact Guide | MoneyCal"
        description="Complete guide on how credit cards impact CIBIL score. Learn positive and negative effects, optimization strategies, and how to use credit cards to boost score by 100+ points."
        keywords="credit card cibil impact, credit card affect credit score, improve cibil with credit card, credit card hurt cibil score"
        canonicalUrl="https://moneycal.in/learn/credit-cards/cibil-impact"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'How Credit Cards Impact Your CIBIL Credit Score',
          description: 'Comprehensive guide to credit card impact on CIBIL score and optimization strategies',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="cibil-impact"
        breadcrumb={['Learn', 'Credit Cards', 'CIBIL Impact']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Target className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Credit Cards: Your Score's Best Friend or Worst Enemy!</h3>
              <p className="text-gray-700">
                Credit cards can boost your score by 100+ points OR destroy it by 200+ points! It all depends on HOW you use them. 
                This guide shows exactly how credit cards affect CIBIL and how to optimize usage. 📊✨
              </p>
            </div>
          </div>
        </div>

        {/* Positive Impacts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ✅ How Credit Cards BOOST Your CIBIL Score
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">7 Positive Impacts:</h3>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">1. Builds Payment History (35% of score)</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Every on-time credit card payment is reported to CIBIL, building your payment track record.
                </p>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-bold text-gray-900 mb-1 text-sm">Impact:</p>
                  <p className="text-xs text-gray-700">
                    12 months perfect payments → +50-80 points | 24 months → +80-120 points
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">2. Improves Credit Utilization (30% of score)</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  New credit card increases total credit limit, automatically lowering utilization ratio.
                </p>
                <div className="bg-green-50 p-3 rounded text-xs">
                  <p className="text-gray-700">Before: ₹50K used of ₹1L limit = 50% (poor)</p>
                  <p className="text-gray-700">New ₹1L card: ₹50K used of ₹2L = 25% (excellent!) ✅</p>
                  <p className="text-green-700 font-bold mt-1">Score boost: +40-60 points</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">3. Extends Credit History Length (15% of score)</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Keeping cards active for years increases average account age.
                </p>
                <div className="bg-green-50 p-3 rounded text-xs">
                  <p className="text-gray-700">5-year-old active card = Excellent history</p>
                  <p className="text-green-700 font-bold">Impact: +20-40 points over time</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">4. Improves Credit Mix (10% of score)</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Having both revolving credit (cards) and installment loans shows financial maturity.
                </p>
                <div className="bg-green-50 p-3 rounded text-xs">
                  <p className="text-gray-700">Credit card + Home loan = Good mix</p>
                  <p className="text-green-700 font-bold">Impact: +10-20 points</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">5. Regular Activity Shows Responsibility</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Using card regularly and paying in full demonstrates credit management skills to lenders.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">6. Recovering from No Credit History</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  First credit card is the easiest way to start building credit from scratch (vs loans that need existing score).
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">7. Access to Pre-Approved Offers</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Good credit card usage leads to pre-approved loan offers at best rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Negative Impacts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ❌ How Credit Cards HURT Your CIBIL Score
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">8 Negative Impacts:</h3>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-3">
                  <TrendingDown className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">1. Late/Missed Payments (Worst!)</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Even 1 day late payment can drop score significantly. 30+ days late = massive damage.
                </p>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <p className="text-gray-700">1 late payment (30 days): -50 to -100 points</p>
                  <p className="text-gray-700">Multiple late payments: -100 to -200 points</p>
                  <p className="text-red-700 font-bold mt-1">Stays on report for 7 years!</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-3">
                  <TrendingDown className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">2. High Credit Utilization (&gt; 30%)</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Using &gt; 30% of credit limit signals financial stress to lenders.
                </p>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <p className="text-gray-700">30-50% utilization: -10 to -30 points</p>
                  <p className="text-gray-700">50-80% utilization: -30 to -60 points</p>
                  <p className="text-gray-700">80-100% utilization: -60 to -100 points</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-3">
                  <TrendingDown className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">3. Multiple Card Applications</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Each application = Hard inquiry. Too many inquiries = Credit hungry signal.
                </p>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <p className="text-gray-700">Each inquiry: -5 to -10 points</p>
                  <p className="text-gray-700">5+ in 6 months: -30 to -50 points total</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-3">
                  <TrendingDown className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">4. Minimum Payment Habit</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Paying only minimum shows financial difficulty, leads to high utilization.
                </p>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <p className="text-red-700">Chronic minimum payers have 50-100 points lower scores</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-3">
                  <TrendingDown className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">5. Closing Old Cards</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Reduces average account age and total credit limit (increases utilization).
                </p>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <p className="text-gray-700">Closing oldest card: -30 to -80 points</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-3">
                  <TrendingDown className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">6. Maxing Out Cards (100% utilization)</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Using full credit limit every month = Major red flag for lenders.
                </p>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <p className="text-red-700">Can drop score by 80-120 points!</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-3">
                  <TrendingDown className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">7. Defaults & Settlements</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Not paying credit card bill for 90+ days = Account marked as NPA (Non-Performing Asset).
                </p>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <p className="text-red-700 font-bold">Drops score by 150-250 points! Stays 7 years on report!</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-3">
                  <TrendingDown className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">8. Too Many Credit Cards</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">
                  Having 5+ cards can signal credit dependency, especially if all have balances.
                </p>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <p className="text-gray-700">Ideal: 2-3 cards | Avoid: 5+ cards with balances</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Optimization Strategies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Use Credit Cards to BOOST Score (स्कोर बढ़ाने की रणनीति)
          </h2>

          <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">10 Proven Strategies:</h3>

            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">1. ALWAYS Pay Full Bill Before Due Date</p>
                  <p className="text-sm text-gray-600">
                    Set auto-pay for full payment. This single habit can increase score by 100+ points in 12 months!
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">2. Keep Utilization Below 30%</p>
                  <p className="text-sm text-gray-600">
                    Use max 30% of credit limit. Pay before statement date to report even lower utilization.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">3. Use Card Regularly (But Responsibly)</p>
                  <p className="text-sm text-gray-600">
                    Make 5-10 small transactions monthly, pay in full. Shows active, responsible usage.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">4. Request Credit Limit Increases</p>
                  <p className="text-sm text-gray-600">
                    Higher limit = Lower utilization automatically. Request increase every 6-12 months.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">5. Don't Close Old Cards</p>
                  <p className="text-sm text-gray-600">
                    Keep oldest card active with minimal usage to maintain credit history length.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">6. Space Out New Applications</p>
                  <p className="text-sm text-gray-600">
                    Wait 6 months between card applications to minimize hard inquiry impact.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">7. Pay Multiple Times Per Month</p>
                  <p className="text-sm text-gray-600">
                    Pay mid-month + before statement to keep reported balance low (boosts score).
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">8. Maintain 2-3 Cards Only</p>
                  <p className="text-sm text-gray-600">
                    Sweet spot: 2-3 cards with different benefits. Avoid having too many (5+).
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">9. Monitor Credit Reports Monthly</p>
                  <p className="text-sm text-gray-600">
                    Check for errors, unauthorized accounts, wrong payment status - dispute immediately.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">10. Never Take Cash Advances</p>
                  <p className="text-sm text-gray-600">
                    Shows financial desperation, expensive (2.5% + 42% interest), may hurt approval chances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Score Improvement Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Card Usage → CIBIL Score Timeline
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How Long to See Impact?</h3>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-gray-900">Month 1-3: Initial Impact</p>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">+10-20 pts</span>
                </div>
                <p className="text-sm text-gray-600">
                  First few on-time payments recorded, credit mix improved if first card
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-gray-900">Month 4-6: Noticeable Growth</p>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">+30-50 pts</span>
                </div>
                <p className="text-sm text-gray-600">
                  Consistent payment history building, utilization optimized
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-gray-900">Month 7-12: Significant Improvement</p>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">+50-80 pts</span>
                </div>
                <p className="text-sm text-gray-600">
                  12-month perfect record, credit age increasing, lenders trust established
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-gray-900">Month 13-24: Excellent Range</p>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">+80-120 pts</span>
                </div>
                <p className="text-sm text-gray-600">
                  Long payment history, mature account, trusted borrower status
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-200 to-emerald-200 p-4 rounded-lg border-2 border-green-500">
                <p className="font-bold text-gray-900 text-center mb-2">🎉 Typical Journey:</p>
                <p className="text-center text-lg font-bold text-gray-900">
                  650 → 750+ in 12-18 months!
                </p>
                <p className="text-center text-sm text-gray-600">
                  With perfect payments, low utilization, and responsible usage
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/how-calculated" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">How Score Calculated</p>
                <p className="text-sm text-gray-600">5 factors explained</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">6-month action plan</p>
              </a>
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-red-200">
                <p className="font-semibold text-red-600 mb-1">Payment Strategy</p>
                <p className="text-sm text-gray-600">Always pay full</p>
              </a>
              <a href="/learn/credit-cards/credit-limit" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Credit Limit Guide</p>
                <p className="text-sm text-gray-600">Utilization optimization</p>
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
              <span className="text-gray-800">Credit cards can boost score +100-120 points OR drop it -200 points depending on usage</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Positive: On-time payments, low utilization (&lt; 30%), long history, credit mix</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Negative: Late payments, high utilization, multiple applications, closing old cards, defaults</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Best strategy: Pay full bill, use &lt; 30% limit, keep old cards active, 2-3 cards max</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Timeline: +10-20 points (3 months), +50-80 points (12 months), +80-120 points (24 months)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Score improvement: 650 → 750+ possible in 12-18 months with perfect usage!</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Boost Your Score with Smart Usage! 📈</h2>
          <p className="text-blue-100 mb-6">
            Use these strategies to turn your credit card into a powerful credit-building tool!
          </p>
          <a
            href="/learn/credit-score/improve-score"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Complete Score Improvement Plan →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default CibilImpact;
