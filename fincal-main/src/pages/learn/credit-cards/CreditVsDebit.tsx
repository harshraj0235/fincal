import React from 'react';
import { CreditCard, Shield, CheckCircle, XCircle, AlertCircle, DollarSign } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CreditVsDebit: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card vs Debit Card - Complete Comparison 2024 | MoneyCal"
        description="Credit card vs debit card detailed comparison. Understand key differences, when to use each, benefits, risks, fees and make the right choice for your needs."
        keywords="credit card vs debit card, difference between credit and debit card, credit vs debit benefits, which is better credit or debit card"
        canonicalUrl="https://moneycal.in/learn/credit-cards/credit-vs-debit"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Card vs Debit Card - Complete Comparison',
          description: 'Comprehensive comparison of credit cards and debit cards with pros and cons',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="credit-vs-debit"
        breadcrumb={['Learn', 'Credit Cards', 'Credit vs Debit']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <CreditCard className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Credit vs Debit - Know the Difference!</h3>
          <p className="text-gray-700">
                Both look similar but work VERY differently! Understanding when to use which can save you money, 
                protect from fraud, and help build credit. Complete comparison guide! 💳📊
              </p>
            </div>
          </div>
        </div>

        {/* Key Differences Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Card vs Debit Card - Key Differences
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300 text-sm">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Feature</th>
                  <th className="border border-gray-300 p-3">Credit Card 💳</th>
                  <th className="border border-gray-300 p-3">Debit Card 🏦</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Money Source</td>
                  <td className="border border-gray-300 p-3 text-center">Bank's money (borrowed)</td>
                  <td className="border border-gray-300 p-3 text-center">Your own money (savings)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Limit</td>
                  <td className="border border-gray-300 p-3 text-center">Credit limit (₹25K-₹10L+)</td>
                  <td className="border border-gray-300 p-3 text-center">Account balance</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Interest</td>
                  <td className="border border-gray-300 p-3 text-center text-red-700">36-42% if not paid full</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700">Zero (no interest)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Credit Score</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700">Builds credit history ✅</td>
                  <td className="border border-gray-300 p-3 text-center text-gray-700">No credit impact</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Rewards</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700">1-10% cashback/points</td>
                  <td className="border border-gray-300 p-3 text-center text-gray-700">Limited/None</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Annual Fee</td>
                  <td className="border border-gray-300 p-3 text-center">₹0-₹50,000</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700">Usually ₹0-500</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Fraud Protection</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700">Excellent (Zero liability)</td>
                  <td className="border border-gray-300 p-3 text-center text-yellow-700">Moderate</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">EMI Facility</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700">Yes ✅</td>
                  <td className="border border-gray-300 p-3 text-center text-red-700">No ❌</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Insurance</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700">Purchase protection, travel</td>
                  <td className="border border-gray-300 p-3 text-center text-gray-700">Limited/None</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Over-spending Risk</td>
                  <td className="border border-gray-300 p-3 text-center text-red-700">High ⚠️</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700">Low ✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Detailed Feature Comparison (विस्तृत तुलना)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Credit Card Advantages */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">✅ Credit Card Advantages:</h3>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">1. Builds Credit History</p>
                  <p className="text-sm text-gray-600">
                    Every on-time payment boosts CIBIL score, helping you get loans with better rates in future.
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">2. Rewards & Cashback (₹20-50K/year)</p>
                  <p className="text-sm text-gray-600">
                    Earn 1-10% back on purchases. Debit cards offer minimal/no rewards.
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">3. Interest-Free Credit (50 days)</p>
                  <p className="text-sm text-gray-600">
                    Buy now, pay later without interest. Perfect for managing cash flow.
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">4. Superior Fraud Protection</p>
                  <p className="text-sm text-gray-600">
                    Zero liability on unauthorized transactions. Easier to dispute charges.
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">5. Purchase Protection & Insurance</p>
                  <p className="text-sm text-gray-600">
                    Extended warranty, price protection, travel insurance, rental car insurance.
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">6. EMI Conversion</p>
                  <p className="text-sm text-gray-600">
                    Convert large purchases to EMI (13-18% vs 42% on revolving).
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">7. Worldwide Acceptance</p>
                  <p className="text-sm text-gray-600">
                    Visa/Mastercard accepted globally. Better for international travel.
                  </p>
                </div>
              </div>
            </div>

            {/* Debit Card Advantages */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">✅ Debit Card Advantages:</h3>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">1. No Debt Risk</p>
                  <p className="text-sm text-gray-600">
                    Can only spend what you have. Zero chance of falling into debt trap.
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">2. Zero Interest Ever</p>
                  <p className="text-sm text-gray-600">
                    Your own money, no borrowing, no interest charges at all.
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">3. No Annual Fees (Usually)</p>
                  <p className="text-sm text-gray-600">
                    Most banks offer debit cards free with savings account.
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">4. Easier to Get</p>
                  <p className="text-sm text-gray-600">
                    Just need savings account. No credit score or income check needed.
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">5. Better for Cash Withdrawal</p>
                  <p className="text-sm text-gray-600">
                    Free ATM withdrawals (3-5/month). Credit card cash = 2.5% fee + 42% interest!
                  </p>
                </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">6. Budget Control</p>
                  <p className="text-sm text-gray-600">
                    Natural spending limit = your balance. Helps avoid overspending.
          </p>
        </div>

                <div className="bg-white p-4 rounded">
                  <p className="font-bold text-gray-900 mb-2">7. Simpler to Manage</p>
                  <p className="text-sm text-gray-600">
                    No bills, no due dates, no payment worries. Straightforward usage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use Which */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            When to Use Credit vs Debit (कब क्या उपयोग करें)
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-4">✅ Use CREDIT Card For:</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Online Shopping</p>
                      <p className="text-xs text-gray-600">Better fraud protection, easy chargebacks</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">International Transactions</p>
                      <p className="text-xs text-gray-600">Better rates, worldwide acceptance, travel insurance</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Hotel/Car Rentals</p>
                      <p className="text-xs text-gray-600">Security deposit doesn't block your money</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Large Purchases</p>
                      <p className="text-xs text-gray-600">EMI option available, rewards points</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Earning Rewards</p>
                      <p className="text-xs text-gray-600">Cashback, points, miles on all spends</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Building Credit History</p>
                      <p className="text-xs text-gray-600">Improve CIBIL score for future loans</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Emergency Expenses</p>
                      <p className="text-xs text-gray-600">When savings are low, use credit (pay full later)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-4">✅ Use DEBIT Card For:</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">ATM Cash Withdrawal</p>
                      <p className="text-xs text-gray-600">Free withdrawals vs 2.5% fee on credit card</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Daily Small Expenses</p>
                      <p className="text-xs text-gray-600">Groceries, utilities, fuel (if no fuel card)</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Budget Control</p>
                      <p className="text-xs text-gray-600">When you want to limit spending to available balance</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Government Payments</p>
                      <p className="text-xs text-gray-600">Taxes, fees (often credit cards not accepted)</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Avoiding Debt</p>
                      <p className="text-xs text-gray-600">If you struggle with credit discipline</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">No Credit Score Yet</p>
                      <p className="text-xs text-gray-600">Starting out, build history with savings first</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Merchant MDR Avoidance</p>
                      <p className="text-xs text-gray-600">Some merchants prefer debit (lower fees)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Cost Comparison Example
          </h2>

          <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">₹50,000 Laptop Purchase Comparison:</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-400">
                <p className="font-bold text-green-900 text-lg mb-3">💳 With Credit Card:</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded">
                    <p className="text-gray-700">Purchase: <strong>₹50,000</strong></p>
                    <p className="text-gray-700">Cashback (5%): <strong className="text-green-700">- ₹2,500</strong></p>
                    <p className="text-gray-700">Interest-free: <strong>45 days</strong></p>
                    <p className="text-gray-700">EMI option: <strong>Yes (no cost)</strong></p>
                    <p className="text-gray-700">Purchase insurance: <strong>90 days</strong></p>
                  </div>
                  <div className="bg-green-100 p-3 rounded border-2 border-green-500">
                    <p className="font-bold text-green-900">Effective Cost:</p>
                    <p className="text-2xl font-bold text-green-700">₹47,500</p>
                    <p className="text-xs text-gray-600">(₹50K - ₹2,500 cashback)</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-400">
                <p className="font-bold text-blue-900 text-lg mb-3">🏦 With Debit Card:</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded">
                    <p className="text-gray-700">Purchase: <strong>₹50,000</strong></p>
                    <p className="text-gray-700">Cashback: <strong className="text-gray-500">₹0 (none)</strong></p>
                    <p className="text-gray-700">Payment: <strong>Immediate</strong></p>
                    <p className="text-gray-700">EMI option: <strong>No</strong></p>
                    <p className="text-gray-700">Protection: <strong>Limited</strong></p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded border-2 border-blue-500">
                    <p className="font-bold text-blue-900">Effective Cost:</p>
                    <p className="text-2xl font-bold text-blue-700">₹50,000</p>
                    <p className="text-xs text-gray-600">(No benefits)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg border-2 border-green-500">
              <p className="font-bold text-gray-900 text-center mb-2">💰 Savings with Credit Card:</p>
              <p className="text-center text-2xl font-bold text-green-700">₹2,500</p>
              <p className="text-center text-sm text-gray-700">Plus 45 days free credit + EMI option + insurance!</p>
            </div>
          </div>
        </section>

        {/* Which Should You Choose */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Which Should You Choose? (कौन सा चुनें?)
          </h2>

          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-3">✅ Choose CREDIT Card If:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You have financial discipline (always pay full on time)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You want to build credit history/score</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You want to maximize rewards (₹20-50K/year)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You need interest-free credit (manage cash flow)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You travel frequently (insurance, lounge access)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You make large purchases (EMI conversion needed)</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-blue-900 mb-3">✅ Choose DEBIT Card If:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You struggle with spending discipline</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You don't want any debt risk</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You need frequent cash withdrawals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You have low/no credit score yet</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You prefer simplicity (no bills, no due dates)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You want zero annual fees</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Best Strategy: Use BOTH!</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Credit card for:</strong> Online shopping, bills, rewards, building credit (pay full monthly)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Debit card for:</strong> Cash withdrawals, small daily expenses, budget control</span>
                </div>
                <div className="bg-white p-3 rounded mt-2">
                  <p className="font-bold text-gray-900 mb-1">Result:</p>
                  <p className="text-xs text-gray-700">
                    Maximum rewards + credit building + fraud protection + budget control + zero debt risk!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/what-is-credit-card" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Credit Card Basics</p>
                <p className="text-sm text-gray-600">How credit cards work</p>
              </a>
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-red-200">
                <p className="font-semibold text-red-600 mb-1">Payment Strategy</p>
                <p className="text-sm text-gray-600">Avoid debt trap</p>
              </a>
              <a href="/learn/credit-cards/rewards-cashback" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Rewards Guide</p>
                <p className="text-sm text-gray-600">Maximize cashback</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Build Credit Score</p>
                <p className="text-sm text-gray-600">Credit cards help!</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Credit = Borrowed money (bank's), Debit = Your own money (savings account)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Credit card benefits: Rewards (₹20-50K/year), credit history, fraud protection, EMI, insurance</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Debit card benefits: No debt risk, zero interest, free cash withdrawal, budget control</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Use credit for: Online shopping, travel, large purchases, rewards | Debit for: Cash, daily expenses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Best strategy: Use both! Credit for benefits (pay full), debit for cash & budget control</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Never use credit card for cash withdrawal - use debit instead (saves 2.5% fee + 42% interest)</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Make Smart Choices! 💡</h2>
          <p className="text-blue-100 mb-6">
            Use the right card at the right time to maximize benefits and minimize costs!
          </p>
          <a
            href="/learn/credit-cards/rewards-cashback"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Maximize Rewards →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default CreditVsDebit;
