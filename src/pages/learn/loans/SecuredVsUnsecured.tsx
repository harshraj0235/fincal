import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, TrendingUp, Check, X } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const SecuredVsUnsecured: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Secured vs Unsecured Loans: Key Differences Explained | MoneyCal Learn"
        description="Complete guide to secured and unsecured loans in India. Learn differences, pros & cons, interest rates, eligibility, which is better for you with real examples and comparison."
        keywords="secured loan, unsecured loan, secured vs unsecured, collateral loan, personal loan, home loan, loan without collateral, loan types"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="secured-vs-unsecured"
        breadcrumb={['Learn', 'Loans & Credit', 'Secured vs Unsecured Loans']}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Secured vs Unsecured Loans
            </h1>
            <p className="text-lg text-gray-600">
              सिक्योर्ड बनाम अनसिक्योर्ड लोन: मुख्य अंतर
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
              <span>📖 9 min read</span>
              <span>📊 Beginner</span>
              <span>🔄 Updated: Oct 21, 2025</span>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The most important difference between loans is whether they are <strong>secured</strong> or <strong>unsecured</strong>. 
              This single factor affects your interest rate, loan amount, approval chances, and risk.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Hindi में:</strong> Secured loan में आप कोई asset (जैसे घर, गाड़ी) को collateral के रूप में pledge करते हैं। 
              Unsecured loan में कोई collateral नहीं चाहिए, लेकिन interest rate ज्यादा होता है।
            </p>
          </section>

          {/* Main Definitions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Secured Loan */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-600 rounded-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">Secured Loan</h2>
              </div>
              <p className="text-gray-800 mb-4 text-lg leading-relaxed">
                A loan backed by <strong>collateral</strong> (asset pledged as security). 
                If you don't repay, the lender can seize the asset.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-green-900 mb-2">Examples:</p>
                <ul className="space-y-1 text-gray-700">
                  <li>✅ Home Loan (property as collateral)</li>
                  <li>✅ Car Loan (vehicle as collateral)</li>
                  <li>✅ Gold Loan (gold jewelry)</li>
                  <li>✅ Loan Against Property</li>
                </ul>
              </div>
            </div>

            {/* Unsecured Loan */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-600 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-orange-900">Unsecured Loan</h2>
              </div>
              <p className="text-gray-800 mb-4 text-lg leading-relaxed">
                A loan <strong>without collateral</strong>. Approved based on income, 
                credit score, and repayment capacity. Higher risk for lender.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-orange-900 mb-2">Examples:</p>
                <ul className="space-y-1 text-gray-700">
                  <li>✅ Personal Loan</li>
                  <li>✅ Credit Card</li>
                  <li>✅ Education Loan (sometimes)</li>
                  <li>✅ Business Loan (unsecured)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4 text-left font-bold">Feature</th>
                    <th className="p-4 text-left font-bold">Secured Loan 🛡️</th>
                    <th className="p-4 text-left font-bold">Unsecured Loan 📝</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Collateral</td>
                    <td className="p-4">✅ Required (property, vehicle, gold)</td>
                    <td className="p-4">❌ Not required</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Interest Rate</td>
                    <td className="p-4 text-green-700 font-bold">Lower (7-12%)</td>
                    <td className="p-4 text-red-700 font-bold">Higher (11-24%)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Loan Amount</td>
                    <td className="p-4 text-green-700 font-bold">Higher (₹10L-5Cr+)</td>
                    <td className="p-4 text-orange-700">Lower (₹50K-50L)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Tenure</td>
                    <td className="p-4 text-green-700">Longer (5-30 years)</td>
                    <td className="p-4 text-orange-700">Shorter (1-5 years)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Approval Time</td>
                    <td className="p-4">Slower (1-3 weeks)</td>
                    <td className="p-4 text-green-700 font-bold">Faster (2-5 days)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Documentation</td>
                    <td className="p-4">More (property papers, valuation)</td>
                    <td className="p-4 text-green-700">Less (income proof, ID)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Credit Score Impact</td>
                    <td className="p-4">Moderate (650+ acceptable)</td>
                    <td className="p-4 text-red-700">High (750+ preferred)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Risk for Lender</td>
                    <td className="p-4 text-green-700">Lower (collateral recovery)</td>
                    <td className="p-4 text-red-700">Higher (no collateral)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Risk for Borrower</td>
                    <td className="p-4 text-red-700 font-bold">Higher (asset seizure)</td>
                    <td className="p-4 text-green-700">Lower (no asset loss)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Prepayment Penalty</td>
                    <td className="p-4">Sometimes (0-4%)</td>
                    <td className="p-4 text-green-700">Usually none</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How Collateral Works */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Collateral Works</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">What Is Collateral?</h3>
              <p className="text-gray-700 mb-4">
                <strong>Collateral (जमानत/सुरक्षा)</strong> is an asset you pledge to the lender as security. 
                If you fail to repay the loan, the lender has the legal right to seize and sell the asset to recover their money.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2">🏠</div>
                  <h4 className="font-bold text-gray-800 mb-2">Property</h4>
                  <p className="text-sm text-gray-600">Home, land, commercial building</p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">LTV: 70-90%</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2">🚗</div>
                  <h4 className="font-bold text-gray-800 mb-2">Vehicle</h4>
                  <p className="text-sm text-gray-600">Car, bike, commercial vehicle</p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">LTV: 70-90%</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2">🏆</div>
                  <h4 className="font-bold text-gray-800 mb-2">Gold</h4>
                  <p className="text-sm text-gray-600">Gold jewelry, coins</p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">LTV: 75%</p>
                </div>
              </div>

              <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>LTV (Loan-to-Value):</strong> Percentage of asset value you can borrow. 
                  For ₹1 Cr property with 80% LTV, you get ₹80L loan max.
                </p>
              </div>
            </div>
          </section>

          {/* Real Examples */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-Life Examples</h2>
            
            {/* Example 1: Secured */}
            <div className="mb-6 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                Scenario 1: Priya Takes a Home Loan (Secured)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">📋 Loan Details</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>🏠 <strong>Property Value:</strong> ₹80,00,000</li>
                    <li>💰 <strong>Down Payment:</strong> ₹20,00,000 (25%)</li>
                    <li>💵 <strong>Loan Amount:</strong> ₹60,00,000</li>
                    <li>📊 <strong>Interest Rate:</strong> 8.5% p.a.</li>
                    <li>📅 <strong>Tenure:</strong> 20 years</li>
                    <li>🏠 <strong>Collateral:</strong> Property itself</li>
                  </ul>
                </div>
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">💳 Result</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Monthly EMI:</strong> <span className="text-green-700 text-xl font-bold">₹52,069</span></li>
                    <li><strong>Total Interest:</strong> ₹64,96,560</li>
                    <li><strong>Total Cost:</strong> ₹1,24,96,560</li>
                    <li className="text-sm text-green-700 mt-3">✅ <strong>Low interest</strong> due to collateral</li>
                    <li className="text-sm text-red-700">⚠️ House at risk if default</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Example 2: Unsecured */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-4">
                Scenario 2: Amit Takes a Personal Loan (Unsecured)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">📋 Loan Details</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>💰 <strong>Purpose:</strong> Wedding expenses</li>
                    <li>💵 <strong>Loan Amount:</strong> ₹5,00,000</li>
                    <li>📊 <strong>Interest Rate:</strong> 14% p.a.</li>
                    <li>📅 <strong>Tenure:</strong> 3 years</li>
                    <li>📝 <strong>Collateral:</strong> None</li>
                    <li>📊 <strong>Credit Score:</strong> 780 (good)</li>
                  </ul>
                </div>
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">💳 Result</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Monthly EMI:</strong> <span className="text-orange-700 text-xl font-bold">₹17,153</span></li>
                    <li><strong>Total Interest:</strong> ₹1,17,508</li>
                    <li><strong>Total Cost:</strong> ₹6,17,508</li>
                    <li className="text-sm text-green-700 mt-3">✅ <strong>No collateral</strong> needed</li>
                    <li className="text-sm text-orange-700">⚠️ Higher interest rate</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pros and Cons */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Secured Pros/Cons */}
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Secured Loans
                </h3>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-3">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Advantages
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✅ Lower interest rates (7-12%)</li>
                    <li>✅ Higher loan amounts possible</li>
                    <li>✅ Longer repayment tenure</li>
                    <li>✅ Easier approval (collateral = security)</li>
                    <li>✅ Lower credit score acceptable</li>
                    <li>✅ Tax benefits (home/education loans)</li>
                  </ul>
                </div>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                    <X className="w-5 h-5" /> Disadvantages
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>❌ Risk of losing collateral if default</li>
                    <li>❌ Longer approval process (1-3 weeks)</li>
                    <li>❌ More documentation required</li>
                    <li>❌ Asset valuation needed</li>
                    <li>❌ Prepayment penalties sometimes</li>
                    <li>❌ Legal formalities more complex</li>
                  </ul>
                </div>
              </div>

              {/* Unsecured Pros/Cons */}
              <div>
                <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Unsecured Loans
                </h3>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-3">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Advantages
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✅ No collateral needed</li>
                    <li>✅ Faster approval (2-5 days)</li>
                    <li>✅ Less documentation</li>
                    <li>✅ No asset at risk</li>
                    <li>✅ Usually no prepayment penalty</li>
                    <li>✅ Simpler process</li>
                  </ul>
                </div>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                    <X className="w-5 h-5" /> Disadvantages
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>❌ Higher interest rates (11-24%)</li>
                    <li>❌ Lower loan amounts</li>
                    <li>❌ Shorter repayment tenure</li>
                    <li>❌ High credit score required (750+)</li>
                    <li>❌ Stricter income criteria</li>
                    <li>❌ No tax benefits (except education)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Which to Choose */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Which Loan Should You Choose?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border-2 border-green-200">
                <h3 className="font-bold text-green-800 mb-3">✅ Choose Secured Loan If:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• You need a <strong>large amount</strong> (₹10L+)</li>
                  <li>• You want <strong>lower interest</strong> rates</li>
                  <li>• You have <strong>assets to pledge</strong> (house, car, gold)</li>
                  <li>• You need <strong>longer repayment</strong> time (10-30 years)</li>
                  <li>• Your <strong>credit score is moderate</strong> (650-750)</li>
                  <li>• You want <strong>tax benefits</strong> (home/education)</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-orange-200">
                <h3 className="font-bold text-orange-800 mb-3">✅ Choose Unsecured Loan If:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• You need money <strong>urgently</strong> (2-5 days)</li>
                  <li>• You need a <strong>smaller amount</strong> (₹50K-10L)</li>
                  <li>• You <strong>don't have collateral</strong></li>
                  <li>• You can afford <strong>higher EMI</strong> (shorter tenure)</li>
                  <li>• Your <strong>credit score is excellent</strong> (750+)</li>
                  <li>• You don't want to <strong>risk assets</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              💡 Critical Points to Remember
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Secured = Lower rate but asset at risk</strong> if you default</li>
              <li><strong>Unsecured = Higher rate but no asset loss</strong> risk</li>
              <li><strong>Interest rate difference:</strong> 5-10% (huge savings over time)</li>
              <li><strong>For ₹50L, 20 years:</strong> 8% vs 14% = ₹30L+ extra interest</li>
              <li><strong>Collateral must be in your name</strong> (or co-applicant's)</li>
              <li><strong>Default consequences:</strong> Secured = asset seized, Unsecured = credit damage only</li>
              <li><strong>Always calculate total cost,</strong> not just EMI amount</li>
            </ul>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I convert an unsecured loan to a secured loan?
                </summary>
                <p className="mt-3 text-gray-700">
                  Generally no. You would need to close the unsecured loan and apply for a new secured loan. However, you can use the secured loan amount to prepay the unsecured one, effectively converting at lower rates.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What happens to collateral after I repay the loan?
                </summary>
                <p className="mt-3 text-gray-700">
                  Once you fully repay, the lender removes the lien/hypothecation from your asset. You get full ownership back. For property loans, you receive the original documents. For vehicle loans, the RC (Registration Certificate) is updated.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I sell collateral property while loan is active?
                </summary>
                <p className="mt-3 text-gray-700">
                  Yes, but with lender's permission. You can either: (1) Pay off the loan with sale proceeds before transfer, or (2) Buyer agrees to take over the loan (loan transfer/substitution). Bank approval required in both cases.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Is personal loan better than credit card?
                </summary>
                <p className="mt-3 text-gray-700">
                  For planned expenses, yes. Personal loan has lower interest (11-14%) vs credit card (18-42%). But for short-term needs (20-50 days), credit card's interest-free period is better. Use personal loan for debt consolidation or big purchases.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Which is safer for the borrower - secured or unsecured?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Unsecured is safer for borrower</strong> because no asset is at risk. Worst case in default: credit score damaged, legal action for recovery. In secured loan default, you lose the pledged asset (home, car, gold).
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a 
              href="/learn/loans/types-of-loans" 
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              ← Previous: Types of Loans
            </a>
            <a 
              href="/learn/loans/how-banks-evaluate" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
            >
              Next: How Banks Evaluate →
            </a>
          </div>

        </motion.div>

        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Secured vs Unsecured Loans: Key Differences",
            "description": "Complete comparison of secured and unsecured loans with examples, pros/cons, interest rates",
            "educationalLevel": "Beginner",
            "learningResourceType": "Tutorial",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default SecuredVsUnsecured;

