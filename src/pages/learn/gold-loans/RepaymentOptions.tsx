import React from 'react';
import { CreditCard, Calendar, TrendingUp, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const RepaymentOptions: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Gold Loan Repayment Options - EMI Plans & Schemes 2024 | MoneyCal"
        description="Complete guide to gold loan repayment options in India. Compare bullet payment, regular EMI, overdraft facility and choose the best repayment scheme to save interest."
        keywords="gold loan repayment, gold loan EMI, gold loan payment options, bullet payment gold loan, gold loan overdraft"
        canonicalUrl="/learn/gold-loans/repayment-options"
      />
      
      <LearnLayout
        category="gold-loans"
        currentLesson="repayment-options"
        breadcrumb={['Learn', 'Gold Loans', 'Repayment Options']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <CreditCard className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Choosing the right repayment option can save you thousands in interest! Learn all available schemes and pick what suits your cash flow best. 💰✨
              </p>
            </div>
          </div>
        </div>

        {/* Main Repayment Options */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Gold Loan Repayment Options (पुनर्भुगतान विकल्प)
          </h2>

          <div className="space-y-6">
            {/* Option 1: Bullet Payment */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-xl mr-4">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">1. Bullet Payment (One-Time)</h3>
                  <p className="text-sm text-gray-600">Pay full amount at maturity</p>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg mb-4">
                <p className="text-gray-800 mb-3">
                  <strong>How it works:</strong> Pay only monthly interest → Repay principal at loan end
                </p>
                
                <div className="bg-white p-4 rounded-lg border-2 border-orange-300">
                  <p className="font-semibold text-gray-900 mb-2">Example:</p>
                  <div className="space-y-2 text-gray-700">
                    <p>Loan Amount: ₹2,00,000</p>
                    <p>Interest Rate: 12% per year (1% per month)</p>
                    <p>Tenure: 12 months</p>
                    <div className="bg-orange-100 p-3 rounded mt-3">
                      <p className="font-bold">Monthly Payment: ₹2,000 (interest only)</p>
                      <p className="font-bold text-orange-700 text-lg">Final Payment (Month 12): ₹2,02,000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-green-900 mb-2">✅ Best For:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Business owners (seasonal income)</li>
                    <li>• Those expecting lump sum money</li>
                    <li>• Short-term emergencies</li>
                  </ul>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-red-900 mb-2">❌ Avoid If:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• You can't save lump sum</li>
                    <li>• Uncertain future income</li>
                    <li>• Long loan tenure (2+ years)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Option 2: Regular EMI */}
            <div className="bg-white border-2 border-blue-400 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">2. Regular EMI (Monthly Installments)</h3>
                  <p className="text-sm text-gray-600">Pay principal + interest monthly</p>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg mb-4">
                <p className="text-gray-800 mb-3">
                  <strong>How it works:</strong> Fixed monthly payment → Reduces principal every month
                </p>
                
                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <p className="font-semibold text-gray-900 mb-2">Example:</p>
                  <div className="space-y-2 text-gray-700">
                    <p>Loan Amount: ₹2,00,000</p>
                    <p>Interest Rate: 12% per year</p>
                    <p>Tenure: 12 months</p>
                    <div className="bg-blue-100 p-3 rounded mt-3">
                      <p className="font-bold text-blue-700 text-lg">Fixed Monthly EMI: ₹17,760</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Total Payment: ₹2,13,120 (Interest: ₹13,120)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-green-900 mb-2">✅ Best For:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Salaried individuals</li>
                    <li>• Regular monthly income</li>
                    <li>• Better budgeting</li>
                    <li>• Reduces debt gradually</li>
                  </ul>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-red-900 mb-2">❌ Avoid If:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Irregular income</li>
                    <li>• Need flexible payments</li>
                    <li>• Very short tenure (3-6 months)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Option 3: Overdraft Facility */}
            <div className="bg-white border-2 border-purple-400 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-xl mr-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">3. Overdraft Facility (OD)</h3>
                  <p className="text-sm text-gray-600">Pay interest only on used amount</p>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg mb-4">
                <p className="text-gray-800 mb-3">
                  <strong>How it works:</strong> Withdraw as needed → Pay interest only on utilized amount → Repay anytime
                </p>
                
                <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
                  <p className="font-semibold text-gray-900 mb-2">Example:</p>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>OD Limit Sanctioned: ₹2,00,000</p>
                    <div className="bg-purple-100 p-3 rounded mt-2">
                      <p className="font-bold mb-2">Month 1:</p>
                      <p>Withdrawn: ₹50,000</p>
                      <p>Interest (12% p.a.): ₹500 only</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="font-bold mb-2">Month 2:</p>
                      <p>Repaid: ₹30,000 | Outstanding: ₹20,000</p>
                      <p>Interest: ₹200 only</p>
                    </div>
                    <p className="text-green-700 font-bold mt-3">
                      ✅ Pay interest ONLY on what you use!
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-green-900 mb-2">✅ Best For:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Business working capital</li>
                    <li>• Flexible cash needs</li>
                    <li>• Saving maximum interest</li>
                    <li>• Irregular expenses</li>
                  </ul>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-red-900 mb-2">❌ Limitations:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Not all banks offer this</li>
                    <li>• Requires discipline</li>
                    <li>• May have account fees</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-yellow-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Feature</th>
                  <th className="border border-gray-300 p-3">Bullet Payment</th>
                  <th className="border border-gray-300 p-3">Regular EMI</th>
                  <th className="border border-gray-300 p-3">Overdraft (OD)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Monthly Payment</td>
                  <td className="border border-gray-300 p-3 text-center">Interest Only</td>
                  <td className="border border-gray-300 p-3 text-center">Principal + Interest</td>
                  <td className="border border-gray-300 p-3 text-center">Interest on Used Amount</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Total Interest</td>
                  <td className="border border-gray-300 p-3 text-center text-red-600">Highest</td>
                  <td className="border border-gray-300 p-3 text-center text-yellow-600">Medium</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600">Lowest</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Flexibility</td>
                  <td className="border border-gray-300 p-3 text-center">Low</td>
                  <td className="border border-gray-300 p-3 text-center">Low</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600">High</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Best For</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">Short-term</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">Salaried</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">Business</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Availability</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600">All Banks</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600">All Banks</td>
                  <td className="border border-gray-300 p-3 text-center text-yellow-600">Selected Banks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Prepayment & Foreclosure */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prepayment & Foreclosure</h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">✅ Good News: No Penalties!</h3>
                <p className="text-gray-700">
                  Most banks don't charge prepayment penalty on gold loans. You can close anytime!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <h4 className="font-semibold text-gray-900 mb-3">Partial Prepayment</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Pay extra amount anytime</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reduces interest burden</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Can reduce EMI or tenure</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <h4 className="font-semibold text-gray-900 mb-3">Full Foreclosure</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Close loan before maturity</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Get gold back immediately</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Usually no penalty</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Repayment Tips 💡</h2>

          <div className="space-y-4">
            <div className="flex items-start bg-white border-2 border-yellow-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Set Up Auto-Debit</h3>
                <p className="text-gray-700">Never miss EMI - avoid late fees and gold auction risk</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-yellow-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Pay More When You Can</h3>
                <p className="text-gray-700">Extra payments reduce interest significantly</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-yellow-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Choose Shorter Tenure If Possible</h3>
                <p className="text-gray-700">Higher EMI but much lower total interest</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-red-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Never Default on Gold Loans!</h3>
                <p className="text-gray-700">After 3-6 months of default, bank can auction your gold</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">3 main options: Bullet Payment, Regular EMI, Overdraft</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Overdraft saves maximum interest but needs discipline</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Regular EMI best for salaried individuals with fixed income</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">No prepayment penalty - can close loan anytime</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: Gold vs Personal Loan! ⚔️</h2>
          <p className="text-yellow-100 mb-6">
            Should you take gold loan or personal loan? Compare both and make the right choice!
          </p>
          <a
            href="/learn/gold-loans/gold-vs-personal-loan"
            className="inline-block bg-white text-yellow-600 font-bold py-3 px-8 rounded-xl hover:bg-yellow-50 transition-colors"
          >
            Next: Gold Loan vs Personal Loan →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default RepaymentOptions;

