import React from 'react';
import { CreditCard, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const BalanceTransfer: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Home Loan Balance Transfer: Save ₹5-10 Lakhs by Switching Banks 2025"
        description="Complete guide to home loan balance transfer in India - when to transfer, process, costs, and massive savings calculator. Switch to lower rates!"
        keywords="home loan balance transfer, balance transfer calculator, switch home loan, transfer home loan to another bank"
        canonicalUrl="https://moneycal.in/learn/home-loans/balance-transfer"
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="balance-transfer"
        breadcrumb={['Learn', 'Home Loans', 'Balance Transfer']}
      >
        {/* What is Balance Transfer */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What is Balance Transfer?</h2>
            <p className="text-gray-700 text-lg">
              <strong>Balance Transfer</strong> = Moving your existing home loan from one bank to another to get a lower interest rate.
            </p>
            <div className="mt-4 bg-white rounded-lg p-4 border-2 border-cyan-300">
              <p className="text-gray-800"><strong>Simple Example:</strong> Your current bank charges 9.5%. Another bank offers 8.5%. Transfer loan → Save ₹5-7 lakhs over remaining tenure!</p>
            </div>
          </div>
        </section>

        {/* When to Transfer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">When Should You Do Balance Transfer?</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Condition 1: Interest Rate Difference ≥ 1%
              </h3>
              <p className="text-gray-700">Current: 9.5%, New bank: 8.5% = 1% difference. Worth it! Below 0.75%? May not be worth the hassle.</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Condition 2: Outstanding Loan ≥ ₹15 Lakhs
              </h3>
              <p className="text-gray-700">Smaller loan = smaller savings. Transfer fees ₹5-10K might not justify. ₹15L+ = worthwhile!</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Condition 3: Remaining Tenure ≥ 10 Years
              </h3>
              <p className="text-gray-700">More time = more savings! Only 3-5 years left? Savings might not justify effort.</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Condition 4: Potential Savings &gt; ₹2 Lakhs
              </h3>
              <p className="text-gray-700">Do the math! If total savings &gt; ₹2L after transfer costs, go for it!</p>
            </div>
          </div>
        </section>

        {/* Real Savings Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Savings Calculation</h2>
          
          <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Scenario:</h3>
            <div className="space-y-3 text-gray-800 mb-6">
              <p>Outstanding loan: <strong>₹30,00,000</strong></p>
              <p>Current interest rate: <strong>9.5%</strong></p>
              <p>New bank offering: <strong>8.5%</strong></p>
              <p>Remaining tenure: <strong>15 years</strong></p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
                <h4 className="font-bold text-red-900 mb-3">Continue with Current Bank</h4>
                <div className="space-y-2 text-sm text-gray-800">
                  <p>EMI: ₹31,383/month</p>
                  <p>Total payment: ₹56.49 lakhs</p>
                  <p className="font-bold text-red-700">Total interest: ₹26.49 lakhs</p>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
                <h4 className="font-bold text-green-900 mb-3">After Transfer to New Bank</h4>
                <div className="space-y-2 text-sm text-gray-800">
                  <p>EMI: ₹29,551/month</p>
                  <p>Total payment: ₹53.19 lakhs</p>
                  <p>Transfer charges: -₹8,000</p>
                  <p className="font-bold text-green-700">Total interest: ₹23.27 lakhs</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
              <p className="text-lg font-semibold mb-2">Total Savings:</p>
              <p className="text-4xl font-bold">₹3.22 LAKHS! 🎉</p>
              <p className="text-sm text-green-100 mt-2">Plus ₹1,832 lower EMI every month!</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Balance Transfer Process (4 Steps)</h2>
          
          <div className="space-y-4">
            <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</div>
                <h3 className="font-bold text-gray-900">Apply to New Bank</h3>
              </div>
              <p className="text-gray-700 ml-11">Submit: Loan statement, property papers, income proof. New bank evaluates and offers rate.</p>
            </div>

            <div className="bg-white border-2 border-green-300 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</div>
                <h3 className="font-bold text-gray-900">Get Sanction Letter</h3>
              </div>
              <p className="text-gray-700 ml-11">New bank approves loan at lower rate. Get written sanction letter (5-7 days).</p>
            </div>

            <div className="bg-white border-2 border-orange-300 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">3</div>
                <h3 className="font-bold text-gray-900">Old Bank Clearance</h3>
              </div>
              <p className="text-gray-700 ml-11">New bank pays off old loan. Old bank releases property documents. Transfer fee: ₹5-10K.</p>
            </div>

            <div className="bg-white border-2 border-purple-300 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">4</div>
                <h3 className="font-bold text-gray-900">Start New EMI</h3>
              </div>
              <p className="text-gray-700 ml-11">New EMI starts at lower rate! Property documents moved to new bank.</p>
            </div>
          </div>

          <div className="mt-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
            <p className="font-bold text-yellow-900">⏱️ Total Time: 15-25 days</p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Transfer when: 1%+ rate difference, ₹15L+ outstanding, 10+ years left</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Savings: ₹3-10 lakhs depending on loan size and rate difference</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Cost: ₹5-10K transfer fee. Process takes 15-25 days</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Top-Up Loans Next! 💸</h2>
          <p className="text-blue-100 mb-6">
            Need extra funds? Learn about top-up loans at 9% vs 15% personal loans!
          </p>
          <a
            href="/learn/home-loans/top-up-loans"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Top-Up Loans →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default BalanceTransfer;


