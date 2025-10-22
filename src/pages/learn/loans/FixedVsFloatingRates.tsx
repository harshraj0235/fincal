import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Anchor, TrendingUp, AlertCircle, BarChart3 } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const FixedVsFloatingRates: React.FC = () => {
  const [loanAmount] = useState(5000000);
  const [years] = useState(20);

  // Fixed at 9%
  const fixed = 9;
  // Floating scenarios
  const floatingStart = 8.5;
  const floatingAvg = 9.2;
  const floatingMax = 10.5;

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  };

  const emiFixed = calculateEMI(loanAmount, fixed, years);
  const emiFloatingStart = calculateEMI(loanAmount, floatingStart, years);
  const emiFloatingAvg = calculateEMI(loanAmount, floatingAvg, years);

  return (
    <>
      <SEOHelmet
        title="Fixed vs Floating Interest Rates: Which Is Better for Home Loans? | MoneyCal"
        description="Complete comparison of fixed vs floating interest rates with examples, pros/cons, market scenarios. Learn when to choose each type for home, car, personal loans in India."
        keywords="fixed interest rate, floating interest rate, fixed vs floating, home loan interest, variable interest rate, MCLR, repo rate linked"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="fixed-vs-floating-rates"
        breadcrumb={['Learn', 'Loans & Credit', 'Fixed vs Floating Rates']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Fixed vs Floating Interest Rates
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            फिक्स्ड बनाम फ्लोटिंग ब्याज दर - Which Is Better?
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              When taking a loan, you must choose between <strong>fixed</strong> and <strong>floating</strong> interest rates. 
              This choice affects your EMI, total cost, and financial planning for decades.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Hindi में:</strong> Fixed rate में ब्याज दर पूरे tenure के लिए same रहती है। Floating rate में यह market के हिसाब से बदलती है। 
              दोनों के अपने फायदे और नुकसान हैं।
            </p>
          </section>

          {/* Side by Side */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Fixed Rate */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Anchor className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900">Fixed Interest Rate</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Interest rate <strong>remains constant</strong> throughout the loan tenure. Your EMI never changes.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-blue-800 mb-2">Example:</p>
                <p className="text-sm text-gray-700">
                  ₹50L home loan @ <strong>9% fixed</strong> for 20 years<br/>
                  EMI = ₹44,986 <strong>(same for all 240 months)</strong>
                </p>
              </div>
            </div>

            {/* Floating Rate */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-purple-900">Floating Interest Rate</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Interest rate <strong>changes with market</strong> (RBI repo rate). Your EMI adjusts accordingly.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-purple-800 mb-2">Example:</p>
                <p className="text-sm text-gray-700">
                  ₹50L home loan @ <strong>8.5% floating</strong><br/>
                  Start EMI = ₹43,391<br/>
                  If rate → 10%: EMI = ₹48,251<br/>
                  If rate → 7.5%: EMI = ₹40,280
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Comparison */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Feature</th>
                    <th className="p-4 text-left">Fixed Rate ⚓</th>
                    <th className="p-4 text-left">Floating Rate 📊</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">EMI</td>
                    <td className="p-4 text-green-700 font-bold">Constant (never changes)</td>
                    <td className="p-4">Variable (market dependent)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Initial Rate</td>
                    <td className="p-4">Usually 0.5-1.5% higher</td>
                    <td className="p-4 text-green-700 font-bold">Lower (8.5-9%)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Predictability</td>
                    <td className="p-4 text-green-700 font-bold">100% predictable</td>
                    <td className="p-4 text-red-700">Uncertain</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Market Risk</td>
                    <td className="p-4 text-green-700">No exposure</td>
                    <td className="p-4 text-red-700 font-bold">Full exposure</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Prepayment Penalty</td>
                    <td className="p-4 text-red-700">2-4% usually</td>
                    <td className="p-4 text-green-700 font-bold">None (RBI mandated)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Switching Cost</td>
                    <td className="p-4 text-red-700">High (foreclosure charges)</td>
                    <td className="p-4 text-green-700">Low/Free (can prepay anytime)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Best When</td>
                    <td className="p-4">Rates expected to rise</td>
                    <td className="p-4">Rates expected to fall/stable</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Popular Choice</td>
                    <td className="p-4">15-20% borrowers</td>
                    <td className="p-4 text-green-700 font-bold">80-85% borrowers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Scenario Comparison */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Which Costs More? Real Scenario</h2>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
              <h3 className="font-bold text-green-900 mb-4">₹50L Home Loan for 20 Years</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* Fixed */}
                <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Fixed @ 9%</h4>
                  <div className="space-y-2 text-sm">
                    <p>Monthly EMI: <strong className="text-blue-700 text-lg">₹{emiFixed.toLocaleString('en-IN')}</strong></p>
                    <p>Total Payment: ₹{(emiFixed * 240).toLocaleString('en-IN')}</p>
                    <p className="text-green-700 font-semibold">✅ Predictable, no surprises</p>
                  </div>
                </div>

                {/* Floating - Stable */}
                <div className="bg-white p-5 rounded-lg border-2 border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">Floating (Stable Scenario)</h4>
                  <div className="space-y-2 text-sm">
                    <p>Start @ 8.5%: ₹{emiFloatingStart.toLocaleString('en-IN')}</p>
                    <p>Average @ 9.2%: ₹{emiFloatingAvg.toLocaleString('en-IN')}</p>
                    <p>Total: ₹{(emiFloatingAvg * 240).toLocaleString('en-IN')}</p>
                    <p className="text-orange-700 font-semibold">
                      ⚠️ ₹{((emiFloatingAvg - emiFixed) * 240).toLocaleString('en-IN')} more
                    </p>
                  </div>
                </div>

                {/* Floating - Volatile */}
                <div className="bg-white p-5 rounded-lg border-2 border-red-200">
                  <h4 className="font-semibold text-red-800 mb-3">Floating (Volatile Scenario)</h4>
                  <div className="space-y-2 text-sm">
                    <p>If rates peak @ 10.5%</p>
                    <p>EMI could reach: ₹{calculateEMI(loanAmount, floatingMax, years).toLocaleString('en-IN')}</p>
                    <p className="text-red-700 font-bold">
                      ❌ Budget risk if income doesn't grow
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* When to Choose */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-purple-900 mb-4">🎯 When to Choose Each Type</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3">Choose FIXED if:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✅ You expect <strong>RBI rates to increase</strong> soon</li>
                  <li>✅ You want <strong>100% certainty</strong> in budgeting</li>
                  <li>✅ Your income is <strong>not expected to grow</strong> much</li>
                  <li>✅ You're <strong>risk-averse</strong> (don't like uncertainty)</li>
                  <li>✅ <strong>Short loan tenure</strong> (5-10 years) - less rate volatility risk</li>
                  <li>✅ This is your <strong>first home</strong> (safe option)</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-purple-200">
                <h4 className="font-bold text-purple-800 mb-3">Choose FLOATING if:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✅ You expect <strong>rates to stay stable or fall</strong></li>
                  <li>✅ You can handle <strong>EMI fluctuations</strong> (±10-15%)</li>
                  <li>✅ Your income grows regularly <strong>(annual increments)</strong></li>
                  <li>✅ You want <strong>free prepayment</strong> option (RBI rule)</li>
                  <li>✅ <strong>Long tenure</strong> (20-30 years) - benefit from rate cycles</li>
                  <li>✅ You're comfortable with <strong>market-linked products</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              💡 Expert Insights
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>80-85% borrowers choose floating</strong> because initial rate is lower and prepayment is free</li>
              <li><strong>Fixed converts to floating</strong> after initial period (usually 2-5 years) in many banks</li>
              <li><strong>Floating rates linked to</strong> RBI repo rate or MCLR (Marginal Cost of Funds-based Lending Rate)</li>
              <li><strong>Rate reset frequency:</strong> Quarterly or annually (check loan agreement)</li>
              <li><strong>You can switch</strong> from fixed to floating (or vice versa) - bank may charge ₹5-10K</li>
              <li><strong>Hybrid option exists:</strong> Fixed for 2-3 years, then floating (best of both)</li>
            </ul>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  How often do floating rates change?
                </summary>
                <p className="mt-3 text-gray-700">
                  Depends on your loan's reset cycle: <strong>Quarterly</strong> (every 3 months), <strong>Half-yearly</strong> (6 months), 
                  or <strong>Yearly</strong>. Most home loans reset quarterly based on MCLR or repo rate changes. Check your loan agreement for exact frequency.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I switch from floating to fixed mid-way?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Yes!</strong> Most banks allow switching with fee of ₹5,000-10,000. However, <strong>think carefully</strong>: 
                  (1) New fixed rate will be current market rate (not your old rate), (2) Switching makes sense only if you expect big rate hikes soon, 
                  (3) You lose free prepayment benefit. Better strategy: Keep floating, prepay regularly to reduce principal.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What is the difference between MCLR and repo rate linked loans?
                </summary>
                <p className="mt-3 text-gray-700">
                  Both are floating rate types: <strong>MCLR</strong> (bank's internal cost + margin) changes slowly (quarterly/yearly). 
                  <strong>Repo-linked</strong> (directly follows RBI rate) changes instantly when RBI changes rates. 
                  <strong>Repo-linked is better</strong> - benefits you faster when rates fall, transparent pricing. Since 2019, most banks prefer repo-linked.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Which is cheaper overall - fixed or floating?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Historically, floating is 2-3% cheaper</strong> over 15-20 years in India. Reasons: (1) RBI maintains moderate rates (6-8%), 
                  (2) Rate cycles average out, (3) Free prepayment reduces principal faster. <strong>Exception:</strong> If you take loan during low-rate cycle 
                  and rates jump 3-4%, fixed could be cheaper. But timing the market is hard!
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/loan-tenure-explained" className="text-gray-600 hover:text-blue-600">
              ← Previous: Loan Tenure
            </a>
            <a href="/learn/loans/understanding-collateral" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Understanding Collateral →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Fixed vs Floating Interest Rates: Which Is Better?",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default FixedVsFloatingRates;



