import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const SimpleVsCompoundInterest: React.FC = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [time, setTime] = useState(5);

  const simpleInterest = (principal * rate * time) / 100;
  const compoundInterest = principal * (Math.pow((1 + rate/100), time) - 1);

  return (
    <>
      <SEOHelmet
        title="Simple Interest vs Compound Interest: Complete Comparison | MoneyCal Learn"
        description="Understand the difference between simple and compound interest with formulas, examples, and interactive calculator. Learn which is better for loans vs investments."
        keywords="simple interest, compound interest, interest calculation, SI vs CI, compound interest formula, simple interest formula"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="simple-vs-compound-interest"
        breadcrumb={['Learn', 'Loans & Credit', 'Simple vs Compound Interest']}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Simple Interest vs Compound Interest
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            साधारण ब्याज बनाम चक्रवृद्धि ब्याज - Complete Comparison
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Interest (ब्याज)</strong> is the cost of borrowing money or the reward for lending it. 
              Understanding the difference between <strong>simple</strong> and <strong>compound interest</strong> can save or earn you lakhs of rupees.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Hindi में:</strong> Simple interest में ब्याज केवल principal पर लगता है। 
              Compound interest में ब्याज, principal + पिछले ब्याज दोनों पर लगता है। यह "ब्याज पर ब्याज" है।
            </p>
          </section>

          {/* Side by Side Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Simple Interest */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Simple Interest (SI)</h2>
              <div className="bg-white p-5 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Formula:</h3>
                <div className="bg-blue-50 p-4 rounded-lg font-mono text-lg text-center">
                  SI = (P × R × T) / 100
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p><strong>P</strong> = Principal (मूल राशि)</p>
                <p><strong>R</strong> = Rate of interest per annum (वार्षिक दर %)</p>
                <p><strong>T</strong> = Time period in years (वर्षों में समय)</p>
              </div>
            </div>

            {/* Compound Interest */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Compound Interest (CI)</h2>
              <div className="bg-white p-5 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Formula:</h3>
                <div className="bg-purple-50 p-4 rounded-lg font-mono text-sm text-center">
                  A = P(1 + r)^t<br/>
                  CI = A - P
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p><strong>A</strong> = Total amount (कुल राशि)</p>
                <p><strong>P</strong> = Principal</p>
                <p><strong>r</strong> = Rate (decimal: 10% = 0.10)</p>
                <p><strong>t</strong> = Time in years</p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compare Both - Interactive Calculator</h2>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Principal Amount (₹)
                    </label>
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-green-700">₹{principal.toLocaleString('en-IN')}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Interest Rate (% per annum)
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="0.5"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-green-700">{rate}%</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time Period (years)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={time}
                      onChange={(e) => setTime(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-green-700">{time} years</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Simple Interest</h4>
                    <p className="text-3xl font-bold text-blue-700">₹{Math.round(simpleInterest).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Total: ₹{(principal + simpleInterest).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border-2 border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Compound Interest</h4>
                    <p className="text-3xl font-bold text-purple-700">₹{Math.round(compoundInterest).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Total: ₹{(principal + compoundInterest).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="bg-orange-100 p-4 rounded-lg border-2 border-orange-200">
                    <p className="text-sm font-semibold text-orange-800">Difference</p>
                    <p className="text-2xl font-bold text-orange-700">
                      ₹{Math.round(compoundInterest - simpleInterest).toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      CI is {Math.round((compoundInterest/simpleInterest - 1) * 100)}% more!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Comparison Table */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Feature</th>
                    <th className="p-4 text-left">Simple Interest</th>
                    <th className="p-4 text-left">Compound Interest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Calculation Base</td>
                    <td className="p-4">Only on principal</td>
                    <td className="p-4 text-purple-700 font-bold">On principal + accumulated interest</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Growth Rate</td>
                    <td className="p-4">Linear (constant)</td>
                    <td className="p-4 text-purple-700 font-bold">Exponential (accelerating)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Total Interest</td>
                    <td className="p-4">Lower</td>
                    <td className="p-4 text-purple-700 font-bold">Higher</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Common Use</td>
                    <td className="p-4">Short-term loans, simple calculations</td>
                    <td className="p-4">Bank loans, credit cards, investments</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Better For Borrower</td>
                    <td className="p-4 text-green-700 font-bold">✅ Yes (pay less)</td>
                    <td className="p-4">❌ No (pay more)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Better For Investor</td>
                    <td className="p-4">❌ No (earn less)</td>
                    <td className="p-4 text-green-700 font-bold">✅ Yes (earn more)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Example */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real Example</h2>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-200">
              <h3 className="font-bold text-yellow-900 mb-4 text-lg">
                Scenario: ₹1,00,000 loan for 5 years at 10% interest
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Simple Interest</h4>
                  <div className="space-y-2 text-sm">
                    <p>Principal = ₹1,00,000</p>
                    <p>Rate = 10% per year</p>
                    <p>Time = 5 years</p>
                    <p className="font-mono text-xs mt-2">
                      SI = (1,00,000 × 10 × 5) / 100
                    </p>
                    <p className="text-2xl font-bold text-blue-700 mt-3">= ₹50,000</p>
                    <p className="text-sm text-gray-600">
                      Total = ₹1,00,000 + ₹50,000 = <strong>₹1,50,000</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border-2 border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-3">Compound Interest (Annual)</h4>
                  <div className="space-y-2 text-sm">
                    <p>Principal = ₹1,00,000</p>
                    <p>Rate = 10% per year</p>
                    <p>Time = 5 years</p>
                    <p className="font-mono text-xs mt-2">
                      A = 1,00,000 × (1.10)^5 = 1,61,051
                    </p>
                    <p className="text-2xl font-bold text-purple-700 mt-3">= ₹61,051</p>
                    <p className="text-sm text-gray-600">
                      Total = <strong>₹1,61,051</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-orange-100 p-4 rounded-lg">
                <p className="font-bold text-orange-800">You pay ₹11,051 MORE with compound interest!</p>
                <p className="text-sm text-gray-700 mt-1">This is why most banks use compound interest for loans.</p>
              </div>
            </div>
          </section>

          {/* Key Points */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              💡 Key Takeaways
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>For Loans:</strong> Simple interest is better (you pay less)</li>
              <li><strong>For Investments:</strong> Compound interest is better (you earn more)</li>
              <li><strong>Most bank loans use compound interest</strong> (EMI method = compound)</li>
              <li><strong>Compound interest grows exponentially</strong> over time</li>
              <li><strong>Longer tenure = bigger difference</strong> between SI and CI</li>
              <li><strong>Credit cards use compound interest</strong> (18-42% - very expensive!)</li>
              <li><strong>FD, PPF, mutual funds use compound interest</strong> (good for investors)</li>
            </ul>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Do Indian banks use simple or compound interest for home loans?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Compound interest (reducing balance method)</strong>. Your EMI includes both principal and interest. 
                  As principal reduces, interest decreases each month. This is actually fairer than flat rate (simple interest) 
                  which some personal loan companies use.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Which is better for borrowers - simple or compound interest?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Simple interest is always better for borrowers</strong> because you pay less total interest. 
                  However, most loans use compound interest. The key is to prepay and reduce the principal quickly to minimize compound interest effect.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Why do investments prefer compound interest?
                </summary>
                <p className="mt-3 text-gray-700">
                  Because compound interest accelerates growth. Your returns earn returns ("interest on interest"). 
                  Over 20-30 years, this creates massive wealth. Example: ₹10L at 12% for 30 years = ₹3 Cr with compound, 
                  only ₹46L with simple!
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What is flat rate vs reducing balance?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Flat rate</strong> = Simple interest on full principal for entire tenure (expensive). 
                  <strong>Reducing balance</strong> = Compound interest on remaining balance only (cheaper). 
                  Always choose reducing balance loans. Flat rate 10% ≈ Reducing balance 18-20% (double the real cost!).
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a 
              href="/learn/loans/what-is-emi" 
              className="text-gray-600 hover:text-blue-600"
            >
              ← Previous: What Is EMI?
            </a>
            <a 
              href="/learn/loans/loan-tenure-explained" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Next: Understanding Loan Tenure →
            </a>
          </div>

        </motion.div>

        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Simple Interest vs Compound Interest: Complete Comparison",
            "description": "Understand SI vs CI with formulas, examples, interactive calculator",
            "educationalLevel": "Beginner",
            "learningResourceType": "Tutorial",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default SimpleVsCompoundInterest;

