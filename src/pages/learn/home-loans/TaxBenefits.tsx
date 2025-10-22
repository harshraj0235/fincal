import React from 'react';
import { DollarSign, CheckCircle, TrendingUp } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const TaxBenefits: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Tax Benefits on Home Loans: Save ₹3.5 Lakhs Per Year 2025 | MoneyCal"
        description="Complete guide to home loan tax benefits in India - Section 80C (₹1.5L), Section 24 (₹2L), first-time buyer benefits, joint loan tax savings calculator!"
        keywords="home loan tax benefits, section 80C, section 24, home loan tax deduction, tax saving home loan"
        canonicalUrl="https://moneycal.in/learn/home-loans/tax-benefits"
      />
      
      <LearnLayout
        title="Tax Benefits on Home Loans"
        description="Save ₹1+ lakh in taxes every year! Complete guide 💰"
        category="Home Loans"
        difficulty="Intermediate"
        readTime="13 min read"
        prevLesson={{
          title: 'CIBIL Score & Home Loan Approval',
          slug: '/learn/home-loans/cibil-score-impact'
        }}
        nextLesson={{
          title: 'Home Loan Pre-Approval Process',
          slug: '/learn/home-loans/pre-approval'
        }}
      >
        {/* Main Benefits Overview */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3 Major Tax Benefits = Save ₹1-1.5 Lakh/Year!</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                <h3 className="font-bold text-green-800">Section 80C</h3>
                <p className="text-3xl font-bold text-green-600">₹1.5L</p>
                <p className="text-sm text-gray-700">On principal repayment</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                <h3 className="font-bold text-blue-800">Section 24(b)</h3>
                <p className="text-3xl font-bold text-blue-600">₹2L</p>
                <p className="text-sm text-gray-700">On interest payment</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                <h3 className="font-bold text-purple-800">Section 80EEA</h3>
                <p className="text-3xl font-bold text-purple-600">+₹50K</p>
                <p className="text-sm text-gray-700">First-time buyer extra</p>
              </div>
            </div>
            <p className="mt-4 text-center text-lg font-bold text-gray-900">
              Total Maximum: ₹4 Lakhs deduction = Save ₹1.24 Lakhs in taxes (31% bracket)!
            </p>
          </div>
        </section>

        {/* Section 80C */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Section 80C: ₹1.5 Lakh on Principal Repayment</h2>
          
          <div className="bg-white border-2 border-green-300 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              <strong>What:</strong> You can claim deduction up to ₹1.5 lakhs on the principal amount you repay in a financial year.
            </p>

            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-5 mb-4">
              <h3 className="font-bold text-green-900 mb-3">Example:</h3>
              <div className="space-y-2 text-gray-800">
                <p>Annual Income: ₹12,00,000</p>
                <p>Tax Bracket: 31% (30% + 1% cess)</p>
                <p>Home Loan EMI: ₹35,000/month</p>
                <p>Principal component in Year 1: ₹90,000</p>
                <p className="pt-2 border-t-2 border-green-500">
                  <strong>Tax Saved:</strong> ₹90,000 × 31% = <strong className="text-green-700 text-xl">₹27,900! 🎉</strong>
                </p>
              </div>
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
              <p className="font-bold text-yellow-900 mb-2">⚠️ Important Points:</p>
              <ul className="ml-6 text-gray-700 list-disc space-y-1 text-sm">
                <li>₹1.5L limit is SHARED with other 80C investments (PPF, ELSS, LIC)</li>
                <li>Can claim from year construction is complete (not during construction)</li>
                <li>Property should NOT be sold within 5 years (else benefit reversed!)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 24 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Section 24(b): ₹2 Lakh on Interest Payment</h2>
          
          <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              <strong>What:</strong> You can claim deduction up to ₹2 lakhs on the interest you pay in a financial year.
            </p>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-5 mb-4">
              <h3 className="font-bold text-blue-900 mb-3">Example (Same loan as above):</h3>
              <div className="space-y-2 text-gray-800">
                <p>Annual Income: ₹12,00,000</p>
                <p>Tax Bracket: 31%</p>
                <p>Interest component in Year 1: ₹3,30,000</p>
                <p>Maximum deduction allowed: ₹2,00,000</p>
                <p className="pt-2 border-t-2 border-blue-500">
                  <strong>Tax Saved:</strong> ₹2,00,000 × 31% = <strong className="text-blue-700 text-xl">₹62,000! 🎉</strong>
                </p>
              </div>
            </div>

            <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4">
              <p className="font-bold text-green-900 mb-2">✅ Best Part:</p>
              <ul className="ml-6 text-gray-700 list-disc space-y-1 text-sm">
                <li>₹2L limit is SEPARATE from 80C (not shared!)</li>
                <li>Can claim even during construction (pre-EMI interest)</li>
                <li>Available for entire loan tenure (20-30 years!)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Combined Benefit */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Combined Annual Tax Saving</h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Deduction Type</th>
                    <th className="border border-gray-300 p-3 text-left">Max Amount</th>
                    <th className="border border-gray-300 p-3 text-left">Tax Saved (31%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3">Principal (80C)</td>
                    <td className="border border-gray-300 p-3">₹1,50,000</td>
                    <td className="border border-gray-300 p-3 font-bold">₹46,500</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Interest (24b)</td>
                    <td className="border border-gray-300 p-3">₹2,00,000</td>
                    <td className="border border-gray-300 p-3 font-bold">₹62,000</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-bold">TOTAL ANNUAL</td>
                    <td className="border border-gray-300 p-3 font-bold">₹3,50,000</td>
                    <td className="border border-gray-300 p-3 font-bold text-green-700 text-xl">₹1,08,500! 🎉</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 bg-yellow-100 rounded-lg p-4 border-2 border-yellow-400">
              <p className="font-bold text-yellow-900">Over 20 Years:</p>
              <p className="text-gray-800 text-lg">₹1,08,500 × 20 years = <strong className="text-green-700 text-2xl">₹21.7 LAKHS SAVED! 🤑</strong></p>
            </div>
          </div>
        </section>

        {/* Joint Loan Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Joint Loan = DOUBLE Benefits!</h2>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              <strong>Both co-applicants</strong> can claim full deductions if both are co-owners and repay EMI!
            </p>

            <div className="bg-white border-2 border-orange-400 rounded-lg p-5">
              <h3 className="font-bold text-orange-900 mb-3">Couple Example:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Husband can claim:</p>
                  <p>80C: ₹1.5L</p>
                  <p>24(b): ₹2L</p>
                  <p className="font-bold text-green-700">Tax saved: ₹1.08L</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Wife can claim:</p>
                  <p>80C: ₹1.5L</p>
                  <p>24(b): ₹2L</p>
                  <p className="font-bold text-green-700">Tax saved: ₹1.08L</p>
                </div>
              </div>
              <p className="mt-4 pt-4 border-t-2 border-orange-400 text-center font-bold text-xl text-orange-700">
                Combined Annual Saving: ₹2.16 Lakhs! 🎊
              </p>
              <p className="text-center text-gray-700 mt-2">
                Over 20 years = <strong className="text-green-700 text-2xl">₹43.2 LAKHS!</strong>
              </p>
            </div>
          </div>
        </section>

        {/* First Time Buyer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Section 80EEA: Extra ₹50K for First-Time Buyers</h2>
          
          <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              <strong>Additional deduction</strong> of ₹1.5 lakhs on interest (over and above Section 24's ₹2L)
            </p>

            <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-4">
              <p className="font-bold text-purple-900 mb-2">Eligibility:</p>
              <ul className="ml-6 text-gray-700 list-disc space-y-1">
                <li>Property value ≤ ₹45 lakhs</li>
                <li>Loan sanctioned between 2019-2024</li>
                <li>You don't own any other house on loan sanction date</li>
                <li>First-time home buyer</li>
              </ul>
            </div>

            <div className="mt-4 bg-green-100 border-2 border-green-400 rounded-lg p-4">
              <p className="font-bold text-green-900">Benefit:</p>
              <p className="text-gray-800">Can claim up to ₹2.5L interest (₹2L under 24 + ₹50K under 80EEA)</p>
              <p className="font-bold text-green-700">Extra tax saving: ₹15,500/year!</p>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Section 80C: ₹1.5L on principal + Section 24: ₹2L on interest = ₹3.5L total deduction</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Save ₹1.08 lakhs/year in taxes (31% bracket). Over 20 years = ₹21.7L saved!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Joint loan: BOTH claim ₹3.5L each = ₹7L total deduction = ₹2.16L tax saved annually!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">First-time buyers get extra ₹50K deduction under Section 80EEA (if property ≤ ₹45L)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Pre-Approval Next! ⚡</h2>
          <p className="text-blue-100 mb-6">
            Learn how to get pre-approved and gain negotiation power with sellers!
          </p>
          <a
            href="/learn/home-loans/pre-approval"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Pre-Approval Process →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default TaxBenefits;


