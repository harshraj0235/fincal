import React from 'react';
import { Gem, CreditCard, TrendingUp, Clock, Shield, CheckCircle, X } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const GoldVsPersonalLoan: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Gold Loan vs Personal Loan - Which is Better? 2024 Comparison | MoneyCal"
        description="Complete comparison of gold loan vs personal loan in India. Compare interest rates, eligibility, approval time, and choose the best option for your needs."
        keywords="gold loan vs personal loan, gold loan or personal loan, which loan is better, compare gold loan personal loan"
        canonicalUrl="https://moneycal.in/learn/gold-loans/gold-vs-personal-loan"
      />
      
      <LearnLayout
        category="gold-loans"
        currentLesson="gold-vs-personal-loan"
        breadcrumb={['Learn', 'Gold Loans', 'Gold vs Personal Loan']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <TrendingUp className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Choosing between gold loan and personal loan can save you lakhs in interest! Learn which option gives you better rates, faster approval, and more flexibility. ⚔️💰
              </p>
            </div>
          </div>
        </div>

        {/* Quick Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Feature</th>
                  <th className="border border-gray-300 p-3 text-center">Gold Loan 💎</th>
                  <th className="border border-gray-300 p-3 text-center">Personal Loan 💳</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Interest Rate</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">7-12% p.a. ✅</td>
                  <td className="border border-gray-300 p-3 text-center text-red-600">11-24% p.a.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Approval Time</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">15-30 minutes ✅</td>
                  <td className="border border-gray-300 p-3 text-center">1-7 days</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">CIBIL Score Required</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">NO ✅</td>
                  <td className="border border-gray-300 p-3 text-center text-red-600">YES (700+)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Income Proof</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">Not Required ✅</td>
                  <td className="border border-gray-300 p-3 text-center text-red-600">Mandatory</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Collateral</td>
                  <td className="border border-gray-300 p-3 text-center">Gold Jewelry</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">Not Required ✅</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Processing Fee</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">0-1% ✅</td>
                  <td className="border border-gray-300 p-3 text-center">1-3%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Max Loan Amount</td>
                  <td className="border border-gray-300 p-3 text-center">75-90% of gold value</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">Up to ₹50 lakhs ✅</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Documentation</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">Minimal ✅</td>
                  <td className="border border-gray-300 p-3 text-center">Extensive</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Tenure</td>
                  <td className="border border-gray-300 p-3 text-center">3 months - 3 years</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">1-5 years ✅</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Prepayment Penalty</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">Usually NIL ✅</td>
                  <td className="border border-gray-300 p-3 text-center">2-4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Comparison</h2>

          <div className="space-y-6">
            {/* Interest Rate */}
            <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">1. Interest Rates</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-green-900 mb-2">💎 Gold Loan: 7-12% p.a.</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Lower because of gold security</li>
                    <li>• Banks: 7-10% typically</li>
                    <li>• NBFCs: 10-12% usually</li>
                  </ul>
                  <div className="mt-3 p-2 bg-green-200 rounded">
                    <p className="text-sm font-semibold text-gray-800">
                      ✅ Winner for low interest!
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                  <p className="font-bold text-red-900 mb-2">💳 Personal Loan: 11-24% p.a.</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Higher due to no collateral</li>
                    <li>• Banks: 11-16% typically</li>
                    <li>• NBFCs: 16-24% common</li>
                  </ul>
                  <div className="mt-3 p-2 bg-red-200 rounded">
                    <p className="text-sm font-semibold text-gray-800">
                      ❌ 2-3x more expensive!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Speed */}
            <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">2. Approval Speed</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-green-900 mb-2">💎 Gold Loan: 15-30 Minutes</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✅ Instant valuation</li>
                    <li>✅ Quick documentation</li>
                    <li>✅ Same-day disbursal</li>
                    <li>✅ Perfect for emergencies</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                  <p className="font-bold text-yellow-900 mb-2">💳 Personal Loan: 1-7 Days</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• CIBIL verification needed</li>
                    <li>• Income verification required</li>
                    <li>• Credit assessment time</li>
                    <li>• May take up to a week</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="bg-white border-2 border-orange-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">3. Eligibility</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-green-900 mb-2">💎 Gold Loan - Very Easy</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✅ Age: 18+ years</li>
                    <li>✅ No CIBIL score check</li>
                    <li>✅ No income proof (up to ₹1L)</li>
                    <li>✅ Unemployed can also apply</li>
                    <li>✅ Just need gold jewelry!</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                  <p className="font-bold text-red-900 mb-2">💳 Personal Loan - Strict</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Age: 21-60 years</li>
                    <li>• CIBIL: 700+ required</li>
                    <li>• Stable income mandatory</li>
                    <li>• Employment proof needed</li>
                    <li>• Good credit history essential</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interest Comparison Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Example: ₹2 Lakh Loan for 2 Years</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">💎 Gold Loan @ 10% p.a.</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-600">Loan Amount</p>
                  <p className="text-xl font-bold text-gray-900">₹2,00,000</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="text-xl font-bold text-gray-900">₹9,201</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-xl font-bold text-orange-600">₹20,824</p>
                </div>
                <div className="bg-green-200 p-3 rounded">
                  <p className="text-sm text-gray-600">Total Payment</p>
                  <p className="text-2xl font-bold text-green-800">₹2,20,824</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-100 border-2 border-red-400 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">💳 Personal Loan @ 16% p.a.</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-600">Loan Amount</p>
                  <p className="text-xl font-bold text-gray-900">₹2,00,000</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="text-xl font-bold text-gray-900">₹9,706</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-xl font-bold text-red-600">₹32,944</p>
                </div>
                <div className="bg-red-200 p-3 rounded">
                  <p className="text-sm text-gray-600">Total Payment</p>
                  <p className="text-2xl font-bold text-red-800">₹2,32,944</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-100 border-2 border-yellow-400 rounded-xl p-6 text-center">
            <p className="text-2xl font-bold text-gray-900 mb-2">
              💰 You Save ₹12,120 with Gold Loan!
            </p>
            <p className="text-gray-700">That's 58% more interest in personal loan!</p>
          </div>
        </section>

        {/* When to Choose What */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Choose Which Loan?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Gem className="h-10 w-10 text-yellow-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Choose Gold Loan When:</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You have gold jewelry to pledge</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Need money urgently (same day)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Have low/no CIBIL score</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Want lowest interest rate</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Short-term need (6-18 months)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Business working capital</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-10 w-10 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Choose Personal Loan When:</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Don't want to pledge assets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Need larger amount (₹5L+)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Have good CIBIL (750+)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Want longer tenure (3-5 years)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Don't own gold jewelry</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Building credit history</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Gold loans have 50-70% lower interest rates (7-12% vs 11-24%)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Gold loans approved in 15-30 minutes; personal loans take days</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">No CIBIL score or income proof needed for gold loans</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Choose gold loan if you have jewelry and want cheap, fast money</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Choose personal loan if you need larger amount or longer tenure</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: Best Banks for Gold Loans! 🏆</h2>
          <p className="text-yellow-100 mb-6">
            Discover top banks and NBFCs offering the best gold loan rates and features!
          </p>
          <a
            href="/learn/gold-loans/best-banks"
            className="inline-block bg-white text-yellow-600 font-bold py-3 px-8 rounded-xl hover:bg-yellow-50 transition-colors"
          >
            Next: Best Banks for Gold Loans →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default GoldVsPersonalLoan;

