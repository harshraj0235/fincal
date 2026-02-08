import React from 'react';
import { Users, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CoApplicantBenefits: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Co-Applicant & Joint Home Loans: Get 60% More Loan + Double Tax Benefits"
        description="Benefits of adding co-applicant to home loan in India - higher loan amount, double tax benefits (₹7L), lower rates. Complete guide!"
        keywords="joint home loan, co-applicant home loan, joint home loan benefits, home loan with spouse"
        canonicalUrl="https://moneycal.in/learn/home-loans/co-applicant-benefits"
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="co-applicant-benefits"
        breadcrumb={['Learn', 'Home Loans', 'Co-Applicant Benefits']}
      >
        {/* Main Benefits */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4 Major Benefits of Joint Home Loan</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-bold text-green-800">40-60% Higher Loan</h3>
                <p className="text-sm text-gray-700">Both incomes considered!</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-bold text-blue-800">Double Tax Benefits</h3>
                <p className="text-sm text-gray-700">₹7L vs ₹3.5L deduction</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                <CheckCircle className="h-8 w-8 text-orange-600 mb-2" />
                <h3 className="font-bold text-orange-800">Lower Interest Rate</h3>
                <p className="text-sm text-gray-700">-0.05 to -0.10% discount</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-bold text-purple-800">Better Approval Odds</h3>
                <p className="text-sm text-gray-700">Lower risk for bank</p>
              </div>
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Example: Single vs Joint Application</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">Rajesh Applies Alone</h3>
              <div className="space-y-3 text-gray-800">
                <p><strong>Monthly Income:</strong> ₹70,000</p>
                <p><strong>Max EMI (50%):</strong> ₹35,000</p>
                <p><strong>Eligible Loan:</strong> ₹42 lakhs</p>
                <p><strong>Tax Benefit:</strong> ₹3.5L/year</p>
                <div className="bg-white rounded p-3 border border-red-400 mt-4">
                  <p className="font-bold text-red-700">Can buy: ₹50L property</p>
                  <p className="text-sm">(₹42L loan + ₹8L down payment)</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Rajesh + Wife (Joint)</h3>
              <div className="space-y-3 text-gray-800">
                <p><strong>Combined Income:</strong> ₹1,10,000</p>
                <p><strong>Max EMI (50%):</strong> ₹55,000</p>
                <p><strong>Eligible Loan:</strong> ₹68 lakhs! (+₹26L)</p>
                <p><strong>Tax Benefit:</strong> ₹7L/year (+₹3.5L)</p>
                <div className="bg-white rounded p-3 border border-green-400 mt-4">
                  <p className="font-bold text-green-700">Can buy: ₹80L property! 🎉</p>
                  <p className="text-sm">(₹68L loan + ₹12L down payment)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-100 border-2 border-blue-400 rounded-xl p-5 text-center">
            <p className="text-xl font-bold text-blue-900">
              Joint Application = ₹26 Lakh MORE loan + ₹3.5L extra tax benefit/year!
            </p>
          </div>
        </section>

        {/* Tax Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Double Tax Benefits Explained</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Deduction</th>
                  <th className="border border-gray-300 p-3 text-left">Single Applicant</th>
                  <th className="border border-gray-300 p-3 text-left">Joint Applicant</th>
                  <th className="border border-gray-300 p-3 text-left">Advantage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3">Principal (80C)</td>
                  <td className="border border-gray-300 p-3">₹1.5L</td>
                  <td className="border border-gray-300 p-3 font-bold text-green-700">₹1.5L each = ₹3L</td>
                  <td className="border border-gray-300 p-3">+₹1.5L</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Interest (24b)</td>
                  <td className="border border-gray-300 p-3">₹2L</td>
                  <td className="border border-gray-300 p-3 font-bold text-green-700">₹2L each = ₹4L</td>
                  <td className="border border-gray-300 p-3">+₹2L</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-3 font-bold">Total Deduction</td>
                  <td className="border border-gray-300 p-3 font-bold">₹3.5L</td>
                  <td className="border border-gray-300 p-3 font-bold text-green-700 text-xl">₹7L</td>
                  <td className="border border-gray-300 p-3 font-bold">+₹3.5L</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 p-3 font-bold">Tax Saved (31%)</td>
                  <td className="border border-gray-300 p-3 font-bold">₹1.08L/year</td>
                  <td className="border border-gray-300 p-3 font-bold text-blue-700 text-xl">₹2.17L/year</td>
                  <td className="border border-gray-300 p-3 font-bold text-green-700">+₹1.09L!</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
            <p className="font-bold text-yellow-900">Over 20 years:</p>
            <p className="text-gray-800 text-lg">₹1.09L × 20 = <strong className="text-green-700 text-2xl">₹21.8 LAKHS extra tax savings! 🤑</strong></p>
          </div>
        </section>

        {/* Who Can Be Co-Applicant */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Can Be Co-Applicant?</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                1. Spouse (Most Common)
              </h3>
              <p className="text-gray-700">Best option! Banks prefer spousal co-applicants. Women co-applicants get extra 0.05-0.10% rate discount.</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                2. Parents
              </h3>
              <p className="text-gray-700">Father or mother can be co-applicant. Useful if you're young with lower income. They should be co-owners too.</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                3. Siblings
              </h3>
              <p className="text-gray-700">Brother or sister can be co-applicant. Both should be co-owners of property.</p>
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
              <p className="font-bold text-yellow-900 mb-2">⚠️ Important Rules:</p>
              <ul className="ml-6 text-gray-700 list-disc text-sm">
                <li>Co-applicant MUST be co-owner (name on property papers)</li>
                <li>Both are equally liable for EMI payment</li>
                <li>Both can claim tax benefits (if both are co-owners + co-borrowers)</li>
                <li>Blood relatives only (no friends/cousins)</li>
              </ul>
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
                <span className="text-gray-800">Joint application → 40-60% higher loan amount (both incomes considered)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">BOTH claim tax benefits = ₹7L deduction vs ₹3.5L (save ₹21.8L over 20 years)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Women co-applicant = extra 0.05-0.10% rate discount</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Co-applicant can be spouse, parent, or sibling (must be co-owner)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Prepayment Strategy Next! 💰</h2>
          <p className="text-blue-100 mb-6">
            Learn how to prepay smartly and save ₹5-10 lakhs in interest!
          </p>
          <a
            href="/learn/home-loans/prepayment-foreclosure"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Prepayment & Foreclosure →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default CoApplicantBenefits;



