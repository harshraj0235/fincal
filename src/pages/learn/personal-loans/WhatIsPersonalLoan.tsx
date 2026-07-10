import React from 'react';
import { UserCheck, Zap, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const WhatIsPersonalLoan: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="What is a Personal Loan? Complete Guide for Indians 2025 | MoneyCal"
        description="Learn everything about personal loans in India - definition, how they work, benefits, interest rates, eligibility. Quick approval guide for instant personal loans!"
        keywords="personal loan India, what is personal loan, instant personal loan, personal loan meaning, quick loan approval"
        canonicalUrl="/learn/personal-loans/what-is-personal-loan"
      />
      
      <LearnLayout
        category="personal-loans"
        currentLesson="what-is-personal-loan"
        breadcrumb={['Learn', 'Personal Loans', 'What is a Personal Loan?']}
      >
        {/* What is Personal Loan */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What is a Personal Loan?</h2>
            <p className="text-gray-700 text-lg">
              <strong>Personal loan</strong> = Instant money from bank/app (₹50K-₹40L) with NO collateral needed! Use for ANY purpose - medical, wedding, travel, business, debt payment. Get money in 24-48 hours!
            </p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Key Features:</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Quick Approval (24-48 hours)</p>
                  <p className="text-gray-700 text-sm">Apply online → Instant approval → Money in bank next day!</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">No Collateral Needed</p>
                  <p className="text-gray-700 text-sm">Don't pledge house, car, gold - just your income proof!</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-purple-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Use for Anything</p>
                  <p className="text-gray-700 text-sm">Medical emergency, wedding, vacation, gadgets, business - no questions!</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-orange-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Higher Interest (11-15%)</p>
                  <p className="text-gray-700 text-sm">Convenience costs more! 3-4% higher than home loans.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Example</h2>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">Priya's Medical Emergency:</h3>
            <div className="space-y-2 text-gray-800">
              <p><strong>Need:</strong> ₹3,00,000 for surgery (urgent!)</p>
              <p><strong>Solution:</strong> Personal loan from HDFC Bank app</p>
              <p><strong>Process:</strong> Applied online → Approved in 2 hours → Money in account next day!</p>
              <p><strong>Terms:</strong> 13% interest, 3-year tenure, EMI: ₹10,095/month</p>
              <div className="mt-4 p-4 bg-white rounded-lg border-2 border-green-400">
                <p className="font-bold text-green-700">Result: Surgery done, life saved! ❤️</p>
                <p className="text-gray-700 text-sm mt-1">Total paid: ₹3.63L over 3 years (₹63K interest - worth it for emergency!)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Loan vs Other Loans</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Feature</th>
                  <th className="border border-gray-300 p-3 text-left">Personal Loan</th>
                  <th className="border border-gray-300 p-3 text-left">Home Loan</th>
                  <th className="border border-gray-300 p-3 text-left">Credit Card</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Approval Time</td>
                  <td className="border border-gray-300 p-3 bg-green-50"><strong>24-48 hours ⚡</strong></td>
                  <td className="border border-gray-300 p-3">15-30 days</td>
                  <td className="border border-gray-300 p-3 bg-green-50">1-7 days</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Collateral</td>
                  <td className="border border-gray-300 p-3 bg-green-50"><strong>NO ✅</strong></td>
                  <td className="border border-gray-300 p-3 bg-red-50">YES (property)</td>
                  <td className="border border-gray-300 p-3 bg-green-50">NO</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Interest Rate</td>
                  <td className="border border-gray-300 p-3">11-15%</td>
                  <td className="border border-gray-300 p-3 bg-green-50">8-9%</td>
                  <td className="border border-gray-300 p-3 bg-red-50">36-42%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Amount</td>
                  <td className="border border-gray-300 p-3">₹50K-₹40L</td>
                  <td className="border border-gray-300 p-3 bg-green-50">₹10L-₹5Cr</td>
                  <td className="border border-gray-300 p-3">₹20K-₹5L</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Tenure</td>
                  <td className="border border-gray-300 p-3">1-5 years</td>
                  <td className="border border-gray-300 p-3">5-30 years</td>
                  <td className="border border-gray-300 p-3">Revolving</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Use For</td>
                  <td className="border border-gray-300 p-3 bg-green-50"><strong>ANYTHING ✅</strong></td>
                  <td className="border border-gray-300 p-3">Home only</td>
                  <td className="border border-gray-300 p-3">Short-term</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Use Personal Loan?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-900 mb-4 text-xl">✅ Good Uses:</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Medical Emergency</p>
                  <p className="text-sm text-gray-700">Life-saving surgery, hospitalization - worth any interest rate!</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Debt Consolidation</p>
                  <p className="text-sm text-gray-700">Pay off 3-4 credit cards @ 36% with one loan @ 13% - saves lakhs!</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Business Opportunity</p>
                  <p className="text-sm text-gray-700">Quick capital for proven business idea (if ROI &gt; 15%)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-red-900 mb-4 text-xl">❌ Bad Uses:</h3>
              <div className="space-y-3">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Vacation/Shopping</p>
                  <p className="text-sm text-gray-700">Don't pay 13% for 3 years to enjoy 1-week vacation. Save instead!</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Home Down Payment</p>
                  <p className="text-sm text-gray-700">Don't layer 13% loan on 8.5% home loan. Banks count both EMIs!</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Speculative Investment</p>
                  <p className="text-sm text-gray-700">Taking loan to invest in stocks/crypto = gambling with borrowed money!</p>
                </div>
              </div>
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
                <span className="text-gray-800">Personal loan = Quick money (24-48 hours) with NO collateral needed</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Interest: 11-15% (higher than home loan but faster & no property needed)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Can use for ANYTHING - no restrictions on end-use</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Good for: Medical, debt consolidation, business. Bad for: Vacation, shopping, speculation</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Types of Personal Loans Next! 📚</h2>
          <p className="text-purple-100 mb-6">
            Discover different types of personal loans available in India and which suits you best!
          </p>
          <a
            href="/learn/personal-loans/types-of-personal-loans"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: Types of Personal Loans →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default WhatIsPersonalLoan;


