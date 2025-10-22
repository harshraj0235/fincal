import React from 'react';
import { TrendingUp, CheckCircle, X } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const TopUpLoans: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Top-Up Home Loans: Get Extra Funds at 9% vs 15% Personal Loan 2025"
        description="Complete guide to home loan top-up in India - what it is, eligibility, uses, and comparison with personal loans. Save 6% interest!"
        keywords="top-up home loan, home loan top-up, additional home loan, loan against property"
        canonicalUrl="https://moneycal.in/learn/home-loans/top-up-loans"
      />
      
      <LearnLayout
        title="Top-Up Home Loans Explained"
        description="Need extra funds? Get them at 9% instead of 15%! 💸"
        category="Home Loans"
        difficulty="Intermediate"
        readTime="9 min read"
        prevLesson={{
          title: 'Balance Transfer: When & How?',
          slug: '/learn/home-loans/balance-transfer'
        }}
        nextLesson={{
          title: 'Home Loan Insurance (Must or Skip?)',
          slug: '/learn/home-loans/home-loan-insurance'
        }}
      >
        {/* What is Top-Up */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What is a Top-Up Loan?</h2>
            <p className="text-gray-700 text-lg">
              <strong>Top-up loan</strong> = Additional loan amount taken on your existing home loan, at similar interest rates (9-10.5%).
            </p>
            <div className="mt-4 bg-white rounded-lg p-4 border-2 border-purple-300">
              <p className="font-bold text-purple-900 mb-2">Example:</p>
              <p className="text-gray-800">Current loan outstanding: ₹20L. Property worth: ₹50L. Bank offers up to 85% = ₹42.5L. You can take ₹22.5L extra as top-up!</p>
            </div>
          </div>
        </section>

        {/* Top-Up vs Personal Loan */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top-Up vs Personal Loan Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-4 text-left">Feature</th>
                  <th className="border border-gray-300 p-4 text-left">Top-Up Loan ✅</th>
                  <th className="border border-gray-300 p-4 text-left">Personal Loan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Interest Rate</td>
                  <td className="border border-gray-300 p-3 bg-green-50"><strong>9-10.5%</strong></td>
                  <td className="border border-gray-300 p-3 bg-red-50">11-15%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Max Amount</td>
                  <td className="border border-gray-300 p-3 bg-green-50">Up to ₹50L+</td>
                  <td className="border border-gray-300 p-3">₹10-25L</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Tenure</td>
                  <td className="border border-gray-300 p-3 bg-green-50">Up to 30 years</td>
                  <td className="border border-gray-300 p-3">5 years max</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Processing Time</td>
                  <td className="border border-gray-300 p-3">7-15 days</td>
                  <td className="border border-gray-300 p-3 bg-green-50">2-5 days</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-3 font-semibold">Total Interest (₹10L, 10 years)</td>
                  <td className="border border-gray-300 p-3 bg-green-100"><strong>₹5.7L</strong> @ 10%</td>
                  <td className="border border-gray-300 p-3 bg-red-100"><strong>₹7.9L</strong> @ 14%</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 p-3 font-bold">Savings with Top-Up</td>
                  <td className="border border-gray-300 p-3 bg-green-50 font-bold text-green-700 text-xl" colSpan={2}>₹2.2 LAKHS! 🎉</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Top-up at 9-10.5% MUCH better than personal loan at 15%</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Can get up to 85% of current property value (minus outstanding loan)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">₹10L top-up vs personal loan = save ₹2.2L over 10 years</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Loan Insurance Next! 🛡️</h2>
          <p className="text-blue-100 mb-6">
            Learn about home loan insurance - mandatory vs optional, and what to choose!
          </p>
          <a
            href="/learn/home-loans/home-loan-insurance"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Home Loan Insurance →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default TopUpLoans;


