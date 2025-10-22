import React from 'react';
import { RefreshCw, CreditCard, Calculator, TrendingDown, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const DebtConsolidation: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan for Debt Consolidation: Complete Guide 2025 | MoneyCal"
        description="Use personal loan for debt consolidation in India. Pay off multiple credit cards and loans with one low-interest personal loan. Save money and improve CIBIL score!"
        keywords="debt consolidation personal loan, consolidate credit card debt, personal loan to pay off credit cards, debt consolidation India, lower interest rate loan"
        canonicalUrl="https://moneycal.in/learn/personal-loans/debt-consolidation"
      />
      
      <LearnLayout
        title="Personal Loan for Debt Consolidation"
        description="Merge multiple debts into one low-interest loan and save money! 🔄"
        category="Personal Loans"
        difficulty="Intermediate"
        readTime="11 min read"
        prevLesson={{
          title: 'CIBIL Score Impact on Personal Loans',
          slug: '/learn/personal-loans/cibil-score-impact'
        }}
        nextLesson={{
          title: 'Tax Implications of Personal Loans',
          slug: '/learn/personal-loans/tax-implications'
        }}
      >
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Debt Consolidation: Smart Financial Move</h2>
            <p className="text-gray-700 text-lg">
              Debt consolidation means taking one personal loan to pay off multiple high-interest debts (credit cards, other loans). This can save you thousands of rupees in interest and simplify your finances! 💰
            </p>
          </div>
        </section>

        {/* How Debt Consolidation Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Debt Consolidation Works</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-blue-900 mb-2">Before Consolidation</h3>
                <p className="text-sm text-gray-700">Multiple high-interest debts</p>
                <div className="mt-2 text-xs text-gray-600">
                  <p>• Credit Card 1: ₹2L @ 36%</p>
                  <p>• Credit Card 2: ₹1.5L @ 42%</p>
                  <p>• Personal Loan: ₹1L @ 18%</p>
                  <p>• Total EMI: ₹25,000</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-green-900 mb-2">Take Personal Loan</h3>
                <p className="text-sm text-gray-700">One loan to pay all debts</p>
                <div className="mt-2 text-xs text-gray-600">
                  <p>• Personal Loan: ₹4.5L</p>
                  <p>• Interest Rate: 13%</p>
                  <p>• Tenure: 3 years</p>
                  <p>• EMI: ₹16,830</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-purple-900 mb-2">After Consolidation</h3>
                <p className="text-sm text-gray-700">One low-interest loan</p>
                <div className="mt-2 text-xs text-gray-600">
                  <p>• Single EMI: ₹16,830</p>
                  <p>• Save: ₹8,170/month</p>
                  <p>• Total Save: ₹2.94L</p>
                  <p>• CIBIL: Improves</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Example: Rajesh's Debt Consolidation</h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Rajesh's Financial Situation</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Before Consolidation:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p><strong>HDFC Credit Card:</strong> ₹2,00,000 @ 36%</p>
                    <p>EMI: ₹10,000/month</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p><strong>ICICI Credit Card:</strong> ₹1,50,000 @ 42%</p>
                    <p>EMI: ₹8,500/month</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p><strong>Bajaj Personal Loan:</strong> ₹1,00,000 @ 18%</p>
                    <p>EMI: ₹6,500/month</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p><strong>Total Monthly EMI:</strong> ₹25,000</p>
                    <p><strong>Total Interest (3 years):</strong> ₹4,50,000</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-3">After Consolidation:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p><strong>SBI Personal Loan:</strong> ₹4,50,000 @ 13%</p>
                    <p>EMI: ₹16,830/month</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p><strong>Monthly Savings:</strong> ₹8,170</p>
                    <p><strong>Total Interest (3 years):</strong> ₹1,55,880</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p><strong>Total Savings:</strong> ₹2,94,120</p>
                    <p><strong>CIBIL Score:</strong> Improved from 650 to 720</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits of Debt Consolidation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Debt Consolidation</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-900 mb-4 text-xl">✅ Financial Benefits:</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Lower Interest Rate</p>
                  <p className="text-sm text-gray-700">13% personal loan vs 36-42% credit cards</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Reduced Monthly EMI</p>
                  <p className="text-sm text-gray-700">Single EMI instead of multiple payments</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Save Thousands in Interest</p>
                  <p className="text-sm text-gray-700">Can save ₹2-5L over loan tenure</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Fixed Repayment Schedule</p>
                  <p className="text-sm text-gray-700">Clear timeline to become debt-free</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-blue-900 mb-4 text-xl">✅ Lifestyle Benefits:</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Simplified Finances</p>
                  <p className="text-sm text-gray-700">One EMI instead of tracking multiple payments</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Improved CIBIL Score</p>
                  <p className="text-sm text-gray-700">Paying off credit cards improves credit utilization</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Reduced Stress</p>
                  <p className="text-sm text-gray-700">No more juggling multiple due dates</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Better Cash Flow</p>
                  <p className="text-sm text-gray-700">Lower monthly payments free up money</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Consider Debt Consolidation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Consider Debt Consolidation?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-900 mb-4 text-xl">✅ Good Candidates:</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Multiple High-Interest Debts</p>
                  <p className="text-sm text-gray-700">Credit cards @ 30%+, personal loans @ 18%+</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Stable Income</p>
                  <p className="text-sm text-gray-700">Can afford consolidated EMI comfortably</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Good CIBIL Score</p>
                  <p className="text-sm text-gray-700">700+ to get better personal loan rates</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Disciplined Spender</p>
                  <p className="text-sm text-gray-700">Won't run up credit card debt again</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-red-900 mb-4 text-xl">❌ Avoid If:</h3>
              <div className="space-y-3">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Low CIBIL Score</p>
                  <p className="text-sm text-gray-700">Below 650 - personal loan rates will be high</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Unstable Income</p>
                  <p className="text-sm text-gray-700">Can't guarantee EMI payments</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Spending Problem</p>
                  <p className="text-sm text-gray-700">Will max out credit cards again</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Small Debt Amount</p>
                  <p className="text-sm text-gray-700">Below ₹2L - processing fees may not be worth it</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Debt Consolidation Calculator */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Debt Consolidation Calculator</h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Calculate Your Savings</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Debt Type</th>
                    <th className="border border-gray-300 p-3 text-left">Amount</th>
                    <th className="border border-gray-300 p-3 text-left">Interest Rate</th>
                    <th className="border border-gray-300 p-3 text-left">Current EMI</th>
                    <th className="border border-gray-300 p-3 text-left">Consolidated EMI</th>
                    <th className="border border-gray-300 p-3 text-left">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Credit Card 1</td>
                    <td className="border border-gray-300 p-3">₹2,00,000</td>
                    <td className="border border-gray-300 p-3 bg-red-50">36%</td>
                    <td className="border border-gray-300 p-3">₹10,000</td>
                    <td className="border border-gray-300 p-3 bg-green-50">₹6,700</td>
                    <td className="border border-gray-300 p-3 bg-green-50">₹3,300</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Credit Card 2</td>
                    <td className="border border-gray-300 p-3">₹1,50,000</td>
                    <td className="border border-gray-300 p-3 bg-red-50">42%</td>
                    <td className="border border-gray-300 p-3">₹8,500</td>
                    <td className="border border-gray-300 p-3 bg-green-50">₹5,000</td>
                    <td className="border border-gray-300 p-3 bg-green-50">₹3,500</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Personal Loan</td>
                    <td className="border border-gray-300 p-3">₹1,00,000</td>
                    <td className="border border-gray-300 p-3 bg-yellow-50">18%</td>
                    <td className="border border-gray-300 p-3">₹6,500</td>
                    <td className="border border-gray-300 p-3 bg-green-50">₹3,300</td>
                    <td className="border border-gray-300 p-3 bg-green-50">₹3,200</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold"><strong>Total</strong></td>
                    <td className="border border-gray-300 p-3"><strong>₹4,50,000</strong></td>
                    <td className="border border-gray-300 p-3"><strong>13%</strong></td>
                    <td className="border border-gray-300 p-3"><strong>₹25,000</strong></td>
                    <td className="border border-gray-300 p-3 bg-green-50"><strong>₹15,000</strong></td>
                    <td className="border border-gray-300 p-3 bg-green-50"><strong>₹10,000</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-white rounded-lg border-2 border-purple-400">
              <p className="font-bold text-purple-700">💡 Monthly Savings: ₹10,000 | Annual Savings: ₹1,20,000 | 3-Year Savings: ₹3,60,000</p>
            </div>
          </div>
        </section>

        {/* Steps to Consolidate Debt */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Steps to Consolidate Your Debt</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">List All Your Debts</h3>
                  <p className="text-gray-700">Make a list of all loans, credit cards, and their interest rates, EMIs, and outstanding amounts.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Calculate Total Debt</h3>
                  <p className="text-gray-700">Add up all outstanding amounts to know how much personal loan you need.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Check Eligibility</h3>
                  <p className="text-gray-700">Use online calculators to check if you're eligible for the required loan amount.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Compare Personal Loan Offers</h3>
                  <p className="text-gray-700">Compare interest rates, processing fees, and terms from multiple banks.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">5</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Apply for Personal Loan</h3>
                  <p className="text-gray-700">Submit application with all required documents for the best offer.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">6</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Pay Off All Debts</h3>
                  <p className="text-gray-700">Once loan is approved, use the money to pay off all existing debts immediately.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">7</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Close Credit Cards (Optional)</h3>
                  <p className="text-gray-700">Consider closing credit cards to avoid temptation of running up debt again.</p>
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
                <span className="text-gray-800">Debt consolidation: Use one personal loan (13%) to pay multiple high-interest debts (30-42%)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Can save ₹2-5L in interest over loan tenure and reduce monthly EMI by 30-40%</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Good for: Multiple high-interest debts, stable income, good CIBIL score, disciplined spending</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Avoid if: Low CIBIL score, unstable income, spending problem, or small debt amounts</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Tax Implications Next! 💰</h2>
          <p className="text-purple-100 mb-6">
            Now that you understand debt consolidation, let's learn about the tax implications of personal loans!
          </p>
          <a
            href="/learn/personal-loans/tax-implications"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: Tax Implications →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default DebtConsolidation;
