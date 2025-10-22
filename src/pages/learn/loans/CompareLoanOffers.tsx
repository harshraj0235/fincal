import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CompareLoanOffers: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How to Compare Loan Offers from Different Banks | Complete Checklist"
        description="Learn to compare home, personal, car loan offers from multiple banks. Check interest rate, processing fee, prepayment terms, total cost with comparison framework."
        keywords="compare loan offers, loan comparison, best loan rates, compare banks, loan offer evaluation, APR comparison"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="compare-loan-offers"
        breadcrumb={['Learn', 'Loans & Credit', 'How to Compare Loan Offers']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            How to Compare Loan Offers from Different Banks
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            विभिन्न banks के loan offers की तुलना कैसे करें
          </p>

          {/* 10-Point Comparison Framework */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10-Point Loan Comparison Checklist</h2>
            <div className="space-y-4">
              {[
                { title: '1. Interest Rate', desc: 'Not just number - check if fixed/floating, MCLR/repo-linked, reset frequency', weight: '30%' },
                { title: '2. Processing Fee', desc: '0.5-2% of loan can be ₹10K-2L! Negotiate this.', weight: '20%' },
                { title: '3. Prepayment Terms', desc: 'Free or penalty? Can save/cost lakhs!', weight: '15%' },
                { title: '4. Total Cost (APR)', desc: 'Calculate total amount paid over tenure', weight: '25%' },
                { title: '5. Loan Amount Sanctioned', desc: 'Bank offering full amount or partial?', weight: '5%' },
                { title: '6. Tenure Offered', desc: 'Maximum tenure bank will give you', weight: '3%' },
                { title: '7. Hidden Charges', desc: 'Legal, valuation, insurance, documentation fees', weight: '10%' },
                { title: '8. Insurance Requirement', desc: 'Mandatory? Can use own insurer?', weight: '5%' },
                { title: '9. Disbursal Time', desc: 'How fast can you get money? 1 week vs 3 weeks', weight: '3%' },
                { title: '10. Customer Service', desc: 'Branch access, online portal, support quality', weight: '4%' }
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-700">{item.desc}</p>
                    </div>
                    <div className="ml-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        {item.weight}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sample Comparison */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Example: Comparing 3 Home Loan Offers</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Feature</th>
                    <th className="p-4 text-left">Bank A</th>
                    <th className="p-4 text-left">Bank B</th>
                    <th className="p-4 text-left">Bank C</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4 font-semibold">Interest Rate</td>
                    <td className="p-4 text-green-700 font-bold">8.5%</td>
                    <td className="p-4">8.75%</td>
                    <td className="p-4">8.6%</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Processing Fee</td>
                    <td className="p-4">0.5% (₹25K)</td>
                    <td className="p-4 text-green-700 font-bold">Waived</td>
                    <td className="p-4">1% (₹50K)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Prepayment</td>
                    <td className="p-4 text-green-700 font-bold">Free</td>
                    <td className="p-4 text-green-700 font-bold">Free</td>
                    <td className="p-4 text-red-700">2% penalty</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">EMI (₹50L, 20Y)</td>
                    <td className="p-4">₹43,391</td>
                    <td className="p-4">₹43,628</td>
                    <td className="p-4 text-green-700">₹43,283</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-4 font-bold">Total Cost</td>
                    <td className="p-4 font-bold">₹1,04,38,840</td>
                    <td className="p-4 font-bold text-green-700">₹1,04,45,720 ✅</td>
                    <td className="p-4 font-bold">₹1,05,37,920</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Winner?</td>
                    <td className="p-4 text-green-700">Best rate!</td>
                    <td className="p-4 text-green-700 font-bold">✅ BEST OVERALL</td>
                    <td className="p-4 text-red-700">Costly!</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-3 text-center">
              💡 Bank B wins despite higher rate because <strong>zero processing fee</strong> + free prepayment!
            </p>
          </section>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Should I always choose the lowest interest rate?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>No!</strong> Look at <strong>total cost</strong> (APR). A 0.25% higher rate with zero processing fee can be cheaper overall. 
                  Also consider: prepayment freedom, customer service, disbursal speed. <strong>Calculate total amount paid</strong>, not just EMI or rate!
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  How many banks should I compare?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>3-4 banks minimum.</strong> Include: (1) Your salary bank, (2) Top-3 banks (SBI, HDFC, ICICI), 
                  (3) One housing finance company (LIC Housing, HDFC Ltd). More than 5-6 = too much effort for marginal gains. 
                  <strong>Don't apply formally</strong> to all - check eligibility only (soft inquiry), then apply to best 1-2.
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/loan-application-process" className="text-gray-600 hover:text-blue-600">
              ← Previous: Application Process
            </a>
            <a href="/learn/loans/documents-required" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Documents Required →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "How to Compare Loan Offers from Different Banks",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default CompareLoanOffers;



