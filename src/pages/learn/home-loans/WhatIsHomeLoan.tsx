import React from 'react';
import { Home, TrendingUp, Shield, AlertCircle, IndianRupee, CheckCircle, XCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const WhatIsHomeLoan: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="What is a Home Loan? Complete Guide for Indians | MoneyCal Learn"
        description="Learn everything about home loans in India - definition, how they work, types, benefits, eligibility, and step-by-step process. Perfect guide for first-time home buyers!"
        keywords="home loan India, what is home loan, home loan meaning, housing loan India, home loan process, home loan benefits, first time home buyer India"
        canonicalUrl="/learn/home-loans/what-is-home-loan"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'What is a Home Loan?',
          description: 'Comprehensive guide explaining home loans in India, how they work, benefits, and the complete process for first-time home buyers.',
          educationalLevel: 'Beginner',
          learningResourceType: 'Article',
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: 'student',
          },
        }}
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="what-is-home-loan"
        breadcrumb={['Learn', 'Home Loans', 'What is a Home Loan?']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Home className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Buying a home is the biggest financial decision for most Indians. A home loan makes it possible to own your dream home without waiting decades to save the full amount. Understanding how home loans work can save you lakhs of rupees! 💰
              </p>
            </div>
          </div>
        </div>

        {/* What is a Home Loan */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Home className="h-7 w-7 text-blue-600 mr-3" />
            What is a Home Loan? (Hindi: गृह ऋण)
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              A <strong>home loan</strong> (also called housing loan or mortgage) is money borrowed from a bank or financial institution to buy, build, renovate, or extend a house/flat.
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Simple Explanation</h3>
              <p className="text-gray-800 text-lg">
                <strong>Bank gives you money → You buy house → You repay monthly (EMI) → House is yours!</strong>
              </p>
              <p className="text-gray-700 mt-3">
                The bank owns the property until you fully repay the loan. Once paid, ownership transfers 100% to you.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">How Does It Work?</h3>
            <div className="space-y-4">
              <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="font-bold text-blue-700">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">You Choose a Property</h4>
                  <p className="text-gray-700">Find your dream home and agree on price with seller</p>
                </div>
              </div>

              <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="font-bold text-blue-700">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Bank Approves Loan</h4>
                  <p className="text-gray-700">Bank checks your eligibility, income, CIBIL score, and property value</p>
                </div>
              </div>

              <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="font-bold text-blue-700">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">You Pay Down Payment</h4>
                  <p className="text-gray-700">Typically 10-20% of property cost from your savings</p>
                </div>
              </div>

              <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="font-bold text-blue-700">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Bank Pays Seller</h4>
                  <p className="text-gray-700">Bank transfers remaining 80-90% directly to seller</p>
                </div>
              </div>

              <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="font-bold text-blue-700">5</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">You Repay Monthly (EMI)</h4>
                  <p className="text-gray-700">Fixed monthly payment for 5-30 years until loan is fully paid</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Example: Priya's Home Purchase</h2>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-green-200">
                <span className="font-semibold text-gray-800">Property Price:</span>
                <span className="font-bold text-gray-900">₹50,00,000</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-green-200">
                <span className="font-semibold text-gray-800">Down Payment (20%):</span>
                <span className="font-bold text-red-600">- ₹10,00,000 (From savings)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-green-200 bg-blue-50 px-3 rounded">
                <span className="font-semibold text-gray-800">Home Loan Amount:</span>
                <span className="font-bold text-blue-700 text-xl">₹40,00,000</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-green-200">
                <span className="font-semibold text-gray-800">Interest Rate:</span>
                <span className="font-bold text-gray-900">8.5% per year</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-green-200">
                <span className="font-semibold text-gray-800">Loan Tenure:</span>
                <span className="font-bold text-gray-900">20 years (240 months)</span>
              </div>
              <div className="flex items-center justify-between py-3 bg-yellow-100 px-3 rounded-lg mt-3">
                <span className="font-bold text-gray-900">Monthly EMI:</span>
                <span className="font-bold text-green-700 text-2xl">₹34,604</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-300">
              <p className="text-gray-800">
                <strong>Result:</strong> Priya owns a ₹50 lakh home by paying just ₹10 lakh upfront + ₹34,604 every month. Without loan, she'd wait 14+ years to save ₹50 lakhs! 🎉
              </p>
            </div>
          </div>
        </section>

        {/* Key Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Components of Home Loan</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <IndianRupee className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="font-bold text-lg text-gray-900">Principal Amount</h3>
              </div>
              <p className="text-gray-700">
                The actual loan amount borrowed from bank (₹40 lakhs in above example). This is the base amount on which interest is calculated.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <TrendingUp className="h-6 w-6 text-orange-600 mr-2" />
                <h3 className="font-bold text-lg text-gray-900">Interest Rate</h3>
              </div>
              <p className="text-gray-700">
                The cost of borrowing (8-9% per year in India). Lower rate = lower EMI. Even 0.5% difference can save lakhs!
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <Home className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-bold text-lg text-gray-900">Loan Tenure</h3>
              </div>
              <p className="text-gray-700">
                Repayment period (5-30 years). Longer tenure = smaller EMI but more total interest. Shorter = higher EMI but less interest.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <Shield className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="font-bold text-lg text-gray-900">EMI (Monthly Payment)</h3>
              </div>
              <p className="text-gray-700">
                Equated Monthly Installment - fixed amount you pay every month. Includes both principal + interest repayment.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Taking Home Loan</h2>
          
          <div className="space-y-4">
            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Own Home Immediately</h3>
                <p className="text-gray-700">Don't wait 20 years to save. Buy now, pay gradually!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Huge Tax Savings (Up to ₹3.5 Lakhs/year)</h3>
                <p className="text-gray-700">Section 80C (₹1.5L) + Section 24 (₹2L) tax deductions. Can save ₹1+ lakh in taxes annually!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Property Value Increases</h3>
                <p className="text-gray-700">Real estate appreciates 5-8% yearly. Your ₹50L home could be worth ₹1 crore in 15 years!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Build Credit History</h3>
                <p className="text-gray-700">Timely EMI payments improve CIBIL score, making future loans easier!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Low Interest Rates</h3>
                <p className="text-gray-700">Home loans have lowest rates (8-9%) vs personal loans (11-15%) or credit cards (36%+)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Things to Consider */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Things to Consider Before Taking Loan</h2>
          
          <div className="space-y-4">
            <div className="flex items-start bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">EMI Should Be &lt;40% of Income</h3>
                <p className="text-gray-700">If monthly income is ₹80,000, EMI shouldn't exceed ₹32,000. Keep buffer for emergencies!</p>
              </div>
            </div>

            <div className="flex items-start bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Compare Multiple Banks</h3>
                <p className="text-gray-700">0.5% interest difference = ₹5+ lakhs saved over 20 years. Shop around!</p>
              </div>
            </div>

            <div className="flex items-start bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Hidden Charges</h3>
                <p className="text-gray-700">Processing fees (0.5-1%), legal charges, insurance can add ₹50,000-1,00,000 extra</p>
              </div>
            </div>

            <div className="flex items-start bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">CIBIL Score Matters</h3>
                <p className="text-gray-700">Score 750+ gets best rates. Below 650? Banks might reject or charge 1-2% higher!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Home Loan vs Other Options</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Option</th>
                  <th className="border border-gray-300 p-3 text-left">Interest Rate</th>
                  <th className="border border-gray-300 p-3 text-left">Tax Benefits</th>
                  <th className="border border-gray-300 p-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-3 font-bold">Home Loan ✅</td>
                  <td className="border border-gray-300 p-3">8-9%</td>
                  <td className="border border-gray-300 p-3 text-green-700 font-semibold">YES (₹3.5L)</td>
                  <td className="border border-gray-300 p-3">Buying house</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">Personal Loan</td>
                  <td className="border border-gray-300 p-3">11-15%</td>
                  <td className="border border-gray-300 p-3 text-red-600 font-semibold">NO</td>
                  <td className="border border-gray-300 p-3">Short-term needs</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">Credit Card</td>
                  <td className="border border-gray-300 p-3">36-42%</td>
                  <td className="border border-gray-300 p-3 text-red-600 font-semibold">NO</td>
                  <td className="border border-gray-300 p-3">Emergencies only</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">Saving & Buying</td>
                  <td className="border border-gray-300 p-3">0% (but inflation 6%)</td>
                  <td className="border border-gray-300 p-3">NO</td>
                  <td className="border border-gray-300 p-3">Wait 15-20 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Can I get 100% home loan (no down payment)?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A:</strong> Usually NO. Banks give 80-90% of property value. You must pay 10-20% from your savings. Some banks offer 100% loans but only for government employees or those with very high income + CIBIL 800+.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: What if I can't pay EMI one month?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A:</strong> Immediate impact: Late payment fees (₹500-2000), CIBIL score drops 50-100 points. After 90 days of non-payment: Account marked as NPA (Non-Performing Asset), bank can take legal action + sell property to recover money. Always inform bank in advance if facing issues!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Should I choose floating or fixed interest rate?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A:</strong> For most people: <strong>Floating rate</strong> is better. It's 0.5-1% cheaper and you benefit if rates fall. Fixed rate only if you expect rates to increase significantly. We'll cover this in detail in Lesson #6!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: How much home loan can I get with ₹50,000 salary?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A:</strong> Rough estimate: <strong>₹25-30 lakhs</strong> (50-60x monthly salary). Exact amount depends on age, CIBIL score, existing loans, bank policies. Use our eligibility Calculator (Lesson #3) for accurate calculation!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Can I prepay home loan? Any penalty?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A:</strong> <strong>YES!</strong> For floating rate loans: NO PENALTY (RBI rule). For fixed rate: Banks may charge 2-4% penalty. Prepaying even ₹50,000 extra per year can save lakhs and reduce tenure by 2-4 years!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: What documents do I need?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A:</strong> Basic docs: PAN, Aadhaar, salary slips (3 months), bank statements (6 months), Form 16, property documents. Self-employed need: ITR (2 years), GST returns, business proof. We have detailed checklist in Lesson #8!
              </p>
            </details>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Home loan lets you buy property by paying only 10-20% upfront</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Interest rates: 8-9% (lowest among all loans)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Tax benefits up to ₹3.5 lakhs per year can save ₹1+ lakh in taxes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">EMI should not exceed 40% of your monthly income</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">CIBIL score 750+ gets best rates and easy approval</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Compare 4-5 banks before choosing - 0.5% difference = ₹5L+ savings!</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Learn More? 🚀</h2>
          <p className="text-blue-100 mb-6">
            Now that you understand home loan basics, let's explore different types available in India!
          </p>
          <a
            href="/learn/home-loans/types-of-home-loans"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Types of Home Loans →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default WhatIsHomeLoan;



