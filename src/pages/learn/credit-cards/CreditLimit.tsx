import React from 'react';
import { TrendingUp, CheckCircle, AlertCircle, Target, DollarSign, Zap } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CreditLimit: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card Limit Explained - How to Increase Limit 2024 | MoneyCal"
        description="Complete guide to credit card limits in India. How limits are decided, factors affecting limit, how to increase credit limit, utilization ratio impact on credit score."
        keywords="credit card limit, how to increase credit limit, credit limit calculation, credit utilization ratio, maximum credit limit"
        canonicalUrl="https://moneycal.in/learn/credit-cards/credit-limit"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Card Limit - Complete Guide to Understanding and Increasing',
          description: 'Learn how credit card limits work and how to increase them effectively',
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
        currentLesson="credit-limit"
        breadcrumb={['Learn', 'Credit Cards', 'Credit Limit']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Target className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Your Credit Limit = Your Financial Power!</h3>
              <p className="text-gray-700">
                Understanding credit limits helps you manage finances better and improve credit score. Learn how limits are set, 
                how to increase them, and optimal utilization strategies! 💳📈
              </p>
            </div>
          </div>
        </div>

        {/* What is Credit Limit */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What is Credit Limit? (क्रेडिट लिमिट क्या है?)
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Simple Definition:</h3>
            
            <div className="bg-white p-5 rounded-lg border-2 border-green-300 mb-4">
              <p className="text-lg text-gray-800 mb-3">
                <strong>Credit Limit</strong> = Maximum amount you can spend on your credit card before needing to make a payment.
              </p>
              
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">Real Example:</p>
                <p className="text-sm text-gray-700">
                  If your credit limit is <strong>₹1,00,000</strong>, you can spend up to ₹1 lakh on the card. 
                  Once you reach this limit, card will be declined unless you make a payment.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold text-blue-900 mb-2">✅ What You Can Do:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Spend up to the limit amount</li>
                  <li>• Pay back and spend again (revolving credit)</li>
                  <li>• Build credit history with responsible use</li>
                  <li>• Request limit increase after 6 months</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="font-bold text-orange-900 mb-2">⚠️ What You Cannot Do:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Spend beyond the limit (card declined)</li>
                  <li>• Guaranteed limit increase (bank decides)</li>
                  <li>• Transfer limit between cards</li>
                  <li>• Withdraw full limit as cash (different limit)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How Credit Limits are Decided */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How Banks Decide Your Credit Limit (लिमिट कैसे तय होती है)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">8 Key Factors Banks Consider:</h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-4 rounded-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 mr-2" />
                    <p className="font-bold text-lg">1. Your Income</p>
                  </div>
                  <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-bold">Most Important</span>
                </div>
                <div className="bg-white p-3 rounded text-gray-700 text-sm">
                  <p className="mb-2"><strong>Typical Formula:</strong></p>
                  <p className="font-mono bg-blue-50 p-2 rounded">Credit Limit = 2-5× Monthly Income (Salaried)</p>
                  <p className="font-mono bg-blue-50 p-2 rounded mt-1">Credit Limit = 10-15% of Annual Income (Self-employed)</p>
                  <p className="mt-2 text-xs text-gray-600">
                    Example: ₹50,000/month salary → ₹1-2.5 lakh limit typically
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">2. Credit Score (CIBIL)</p>
                </div>
                <div className="grid md:grid-cols-3 gap-2 text-sm">
                  <div className="bg-white p-2 rounded text-center">
                    <p className="font-bold text-green-700">750-900</p>
                    <p className="text-xs text-gray-600">5-10× income</p>
                  </div>
                  <div className="bg-white p-2 rounded text-center">
                    <p className="font-bold text-blue-700">700-749</p>
                    <p className="text-xs text-gray-600">3-5× income</p>
                  </div>
                  <div className="bg-white p-2 rounded text-center">
                    <p className="font-bold text-yellow-700">650-699</p>
                    <p className="text-xs text-gray-600">2-3× income</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-purple-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">3. Employment Stability</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p>• Working 2+ years → Higher limit</p>
                  <p>• Frequent job changes → Lower limit</p>
                  <p>• Permanent job → Better than contract</p>
                  <p>• Reputed company → Additional benefit</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">4. Existing Debt (Debt-to-Income Ratio)</p>
                </div>
                <div className="bg-white p-3 rounded text-sm">
                  <p className="text-gray-700 mb-2"><strong>Formula:</strong> Total Monthly Debt ÷ Monthly Income</p>
                  <div className="space-y-1">
                    <p className="text-green-700">• Below 30% → High limit possible</p>
                    <p className="text-yellow-700">• 30-40% → Moderate limit</p>
                    <p className="text-red-700">• Above 40% → Low limit or rejection</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
                <div className="flex items-center mb-2">
                  <Zap className="h-6 w-6 text-orange-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">5. Relationship with Bank</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p>• Existing customer (savings/FD) → +20-30% limit</p>
                  <p>• Salary account holder → Better limits</p>
                  <p>• High account balance → Preferential treatment</p>
                  <p>• New customer → Lower initial limit</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">6. Credit History Length</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p>• No credit history → Lower limit (₹25-50K)</p>
                  <p>• 1-2 years history → Moderate (₹50K-1L)</p>
                  <p>• 3-5 years history → Good (₹1-3L)</p>
                  <p>• 5+ years history → Excellent (₹3L+)</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-2">
                  <Target className="h-6 w-6 text-red-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">7. Payment History</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p>• Always paid on time → Maximum limit</p>
                  <p>• Occasional late payments → Reduced limit</p>
                  <p>• Defaults/Settlements → Minimal limit</p>
                  <p>• Full payment history → Better than minimum</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">8. Assets Owned</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p>• Property ownership → Higher confidence</p>
                  <p>• Investments (FDs, MFs, stocks) → Better limit</p>
                  <p>• Vehicle ownership → Positive factor</p>
                  <p>• No assets → Lower initial limit</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Limits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Different Types of Credit Limits
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-blue-300">
                <h4 className="font-bold text-lg text-gray-900 mb-3">1. Purchase Limit (खरीदारी लिमिट)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Maximum amount you can spend on purchases (shopping, dining, bills, etc.)
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-800">
                    <strong>Example:</strong> If total limit is ₹1 lakh, you can spend up to ₹1 lakh on purchases.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-orange-300">
                <h4 className="font-bold text-lg text-gray-900 mb-3">2. Cash Advance Limit (नकद निकासी लिमिट)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Maximum cash you can withdraw from ATM using credit card
                </p>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-sm text-gray-800 mb-1">
                    <strong>Typically:</strong> 20-40% of total limit
                  </p>
                  <p className="text-sm text-gray-800">
                    <strong>Example:</strong> ₹1 lakh total limit → ₹20-40K cash withdrawal limit
                  </p>
                  <p className="text-xs text-red-600 mt-2">
                    ⚠️ Avoid cash withdrawal - 2.5% fee + 42% interest from day 1!
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <h4 className="font-bold text-lg text-gray-900 mb-3">3. Over-Limit Amount</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Some banks allow small over-limit transactions (emergency)
                </p>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-gray-800 mb-1">
                    <strong>Typically:</strong> 5-10% over limit allowed
                  </p>
                  <p className="text-sm text-gray-800">
                    <strong>Fee:</strong> ₹500-600 over-limit charge
                  </p>
                  <p className="text-xs text-yellow-600 mt-2">
                    ⚠️ Better to avoid - pay dues and then spend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credit Utilization Ratio */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Utilization Ratio - Most Important! (उपयोग अनुपात)
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">The 30% Golden Rule:</h3>

            <div className="bg-white p-5 rounded-lg border-2 border-purple-300 mb-4">
              <p className="font-bold text-gray-900 mb-3 text-lg">Formula:</p>
              <div className="bg-purple-50 p-4 rounded border-2 border-purple-400">
                <p className="text-center text-lg font-mono text-gray-900 mb-2">
                  Credit Utilization = (Outstanding Balance ÷ Credit Limit) × 100
                </p>
                <p className="text-center text-sm text-gray-600">
                  Keep this below 30% for best credit score!
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-4 rounded-lg text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">0-30% Utilization ✅</p>
                    <p className="text-sm text-green-100">Excellent - Best for credit score</p>
                  </div>
                  <div className="text-3xl">🏆</div>
                </div>
                <div className="bg-white p-3 rounded text-gray-700 text-sm mt-2">
                  <p><strong>Example:</strong> ₹30,000 used of ₹1,00,000 limit = 30% utilization</p>
                  <p className="text-green-700 font-bold">Impact: Boosts credit score by 50-100 points!</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">30-50% Utilization ⚠️</p>
                    <p className="text-sm text-yellow-100">Fair - Try to reduce</p>
                  </div>
                  <div className="text-3xl">⚠️</div>
                </div>
                <div className="bg-white p-3 rounded text-gray-700 text-sm mt-2">
                  <p><strong>Example:</strong> ₹40,000 used of ₹1,00,000 limit = 40% utilization</p>
                  <p className="text-orange-700 font-bold">Impact: Neutral to slightly negative on score</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">50-100% Utilization ❌</p>
                    <p className="text-sm text-red-100">Poor - Red flag for lenders</p>
                  </div>
                  <div className="text-3xl">🚨</div>
                </div>
                <div className="bg-white p-3 rounded text-gray-700 text-sm mt-2">
                  <p><strong>Example:</strong> ₹80,000 used of ₹1,00,000 limit = 80% utilization</p>
                  <p className="text-red-700 font-bold">Impact: Drops score by 50-100 points!</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-100 rounded-lg border-2 border-blue-400">
              <p className="font-bold text-gray-900 mb-2">💡 Pro Tips to Maintain Low Utilization:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Pay before statement generation date (not just due date)</li>
                <li>• Request credit limit increase (lowers utilization automatically)</li>
                <li>• Use multiple cards to spread spending</li>
                <li>• Pay mid-month + end of month to keep balance low</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Increase Credit Limit */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Increase Your Credit Limit (लिमिट कैसे बढ़ाएं)
          </h2>

          <div className="bg-white border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">7 Proven Strategies:</h3>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">1. Wait 6-12 Months</p>
                </div>
                <p className="text-sm text-gray-700">
                  Banks typically review and offer automatic limit increases every 6-12 months for good payment history.
                  Be patient and use card responsibly.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">2. Always Pay ON TIME & IN FULL</p>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Perfect payment history is #1 factor for limit increase. Even 1 late payment can delay increase by 6 months.
                </p>
                <div className="bg-white p-2 rounded text-xs text-gray-600">
                  Set auto-pay for full payment to never miss due date!
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-purple-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">3. Use Card Regularly (but below 30%)</p>
                </div>
                <p className="text-sm text-gray-700">
                  Banks increase limits for active users. Use card for 60-70% of limit monthly, but pay in full. 
                  Shows you need and can manage higher limit.
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-orange-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">4. Update Income Details</p>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Got salary hike or promotion? Update bank immediately with latest salary slips. 
                  Higher income = higher limit eligibility.
                </p>
                <div className="bg-white p-2 rounded text-xs text-green-700">
                  ✅ Can increase limit by 20-50% with income proof!
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-yellow-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">5. Request Increase Through App/Website</p>
                </div>
                <p className="text-sm text-gray-700">
                  Most banks allow online limit increase requests after 6 months. Navigate to:
                </p>
                <div className="bg-white p-2 rounded text-xs text-gray-700 mt-2">
                  App → Credit Card → Services → Request Credit Limit Increase
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">6. Maintain Good CIBIL Score (750+)</p>
                </div>
                <p className="text-sm text-gray-700">
                  Higher credit score = automatic limit increases. Focus on improving score:
                </p>
                <ul className="text-xs text-gray-600 mt-2 space-y-1">
                  <li>• Pay all loans/EMIs on time</li>
                  <li>• Keep credit utilization under 30%</li>
                  <li>• Don't apply for multiple cards simultaneously</li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-6 w-6 text-indigo-600 mr-2" />
                  <p className="font-bold text-lg text-gray-900">7. Call Customer Care & Request</p>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  After 6 months of good usage, call and request increase. Be prepared with:
                </p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Current income details</li>
                  <li>• Reason for increase (travel, large purchase planned)</li>
                  <li>• Latest ITR/salary slips if asked</li>
                </ul>
                <div className="bg-white p-2 rounded text-xs text-blue-700 mt-2">
                  Success rate: 60-70% if all criteria met!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Common Mistakes to Avoid
          </h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Maxing Out Your Card (100% utilization)</h4>
                <p className="text-sm text-gray-700">
                  Using full limit signals financial stress, drops credit score by 100+ points, reduces chances of limit increase.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Requesting Increase Too Soon (before 6 months)</h4>
                <p className="text-sm text-gray-700">
                  Banks need 6 months minimum to evaluate usage. Early requests get rejected and go on record.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Not Using the Card at All</h4>
                <p className="text-sm text-gray-700">
                  Zero usage = No need for higher limit in bank's eyes. Use regularly (but pay in full) to show need.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Missing Even One Payment</h4>
                <p className="text-sm text-gray-700">
                  Single late payment can freeze limit increase for 12 months. Always pay on time!
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
              <a href="/learn/credit-score/how-calculated" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">How Credit Score Calculated</p>
                <p className="text-sm text-gray-600">30% weightage to utilization</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">Get higher limits</p>
              </a>
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Payment Strategies</p>
                <p className="text-sm text-gray-600">Pay in full for better limit</p>
              </a>
              <a href="/learn/credit-cards/eligibility-criteria" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Eligibility Criteria</p>
                <p className="text-sm text-gray-600">Income requirements</p>
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
              <span className="text-gray-800">Credit limit = Maximum spend allowed, typically 2-5× monthly income for salaried</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Credit utilization ratio: Keep below 30% for best credit score impact</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">8 factors decide limit: Income, credit score, employment, debt ratio, bank relationship, history, payments, assets</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Increase limit: Wait 6 months, pay on time, use regularly, update income, maintain 750+ score</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Cash withdrawal limit: Only 20-40% of total limit (avoid - expensive!)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Avoid: Maxing out card, missing payments, requesting increase too soon, zero usage</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Master Your Credit Limit! 📈</h2>
          <p className="text-blue-100 mb-6">
            Use these strategies to get higher limits and maintain perfect utilization ratio!
          </p>
          <a
            href="/learn/credit-score/improve-score"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Improve Your Credit Score →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default CreditLimit;
