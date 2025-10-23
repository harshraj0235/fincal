import React from 'react';
import { FileText, CheckCircle, AlertCircle, Calendar, DollarSign, CreditCard } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const StatementGuide: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How to Read Credit Card Statement 2024 - Complete Guide | MoneyCal"
        description="Learn to read and understand your credit card statement. Decode billing cycle, due date, minimum payment, interest charges, transactions and avoid costly mistakes."
        keywords="credit card statement, how to read credit card bill, billing statement guide, minimum due, total due, credit card charges"
        canonicalUrl="https://moneycal.in/learn/credit-cards/statement-guide"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'How to Read Credit Card Statement - Complete Guide',
          description: 'Comprehensive guide to understanding every section of your credit card statement',
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
        currentLesson="statement-guide"
        breadcrumb={['Learn', 'Credit Cards', 'Statement Reading Guide']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Decode Your Statement - Spot Errors & Save Money!</h3>
          <p className="text-gray-700">
                Credit card statements contain critical information that can save you thousands! Learn to read every section, 
                spot unauthorized charges, understand fees, and avoid costly mistakes. 📊💰
              </p>
            </div>
          </div>
        </div>

        {/* Statement Sections Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Card Statement Anatomy (स्टेटमेंट के भाग)
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">8 Main Sections You Must Understand:</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                <p className="font-bold text-blue-900 mb-2">1️⃣ Account Summary</p>
                <p className="text-sm text-gray-600">Overview of your account</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                <p className="font-bold text-green-900 mb-2">2️⃣ Payment Information</p>
                <p className="text-sm text-gray-600">Due date & amounts</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
                <p className="font-bold text-purple-900 mb-2">3️⃣ Transaction Details</p>
                <p className="text-sm text-gray-600">All purchases & payments</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-orange-300">
                <p className="font-bold text-orange-900 mb-2">4️⃣ Fees & Charges</p>
                <p className="text-sm text-gray-600">Interest, late fees, annual fee</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                <p className="font-bold text-red-900 mb-2">5️⃣ Credit Limit</p>
                <p className="text-sm text-gray-600">Total & available limit</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                <p className="font-bold text-yellow-900 mb-2">6️⃣ Reward Points</p>
                <p className="text-sm text-gray-600">Points earned & balance</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-indigo-300">
                <p className="font-bold text-indigo-900 mb-2">7️⃣ Important Dates</p>
                <p className="text-sm text-gray-600">Statement, due, billing dates</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-pink-300">
                <p className="font-bold text-pink-900 mb-2">8️⃣ Contact Information</p>
                <p className="text-sm text-gray-600">Customer care, disputes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Account Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Section 1: Account Summary (खाता सारांश)
          </h2>

          <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
            <div className="bg-blue-50 p-5 rounded-lg mb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-3">What You'll See:</h3>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border-2 border-blue-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Previous Balance</span>
                    <span className="font-bold text-gray-900">₹25,430</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Outstanding from last month</p>
                </div>

                <div className="bg-white p-3 rounded border-2 border-green-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Payments Received</span>
                    <span className="font-bold text-green-700">- ₹25,430</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Amount you paid last month</p>
                </div>

                <div className="bg-white p-3 rounded border-2 border-purple-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">New Purchases</span>
                    <span className="font-bold text-purple-700">+ ₹34,560</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Total spending this month</p>
                </div>

                <div className="bg-white p-3 rounded border-2 border-red-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Fees & Charges</span>
                    <span className="font-bold text-red-700">+ ₹590</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Annual fee, late fee, GST, etc.</p>
                </div>

                <div className="bg-white p-3 rounded border-2 border-orange-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Interest Charged</span>
                    <span className="font-bold text-orange-700">+ ₹0</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">0 if paid in full last month</p>
                </div>

                <div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-4 rounded border-2 border-blue-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-bold text-lg">TOTAL AMOUNT DUE</span>
                    <span className="font-bold text-blue-900 text-xl">₹35,150</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Pay this to avoid interest!</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-3 rounded border border-yellow-400">
              <p className="font-bold text-gray-900 mb-1">💡 Key Insight:</p>
              <p className="text-sm text-gray-700">
                Always check "Previous Balance" vs "Payments Received". They should match if you paid full last month!
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Payment Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Section 2: Payment Information (भुगतान जानकारी)
          </h2>

          <div className="bg-white border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Most Critical Section - Read Carefully!</h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-400 to-orange-500 p-5 rounded-lg text-white">
                <div className="flex items-center mb-3">
                  <Calendar className="h-7 w-7 mr-3" />
                  <p className="font-bold text-xl">Payment Due Date</p>
                </div>
                <div className="bg-white p-4 rounded text-gray-700">
                  <p className="font-bold text-red-700 text-lg mb-2">Example: 20th January 2024</p>
                  <p className="text-sm mb-2">
                    You MUST pay at least minimum due by this date to avoid late fee + interest
                  </p>
                  <div className="bg-red-50 p-2 rounded text-xs">
                    <p className="text-red-700 font-bold">⚠️ Pay BEFORE this date, not ON! Give 1-2 days buffer for processing.</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-400">
                  <p className="font-bold text-green-900 text-lg mb-2">✅ Total Amount Due</p>
                  <div className="bg-white p-3 rounded mb-2">
                    <p className="text-2xl font-bold text-green-700 text-center">₹35,150</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Pay this amount</strong> to avoid ALL interest charges (42% p.a.)
                  </p>
                  <div className="bg-green-100 p-2 rounded text-xs text-green-800">
                    ✅ Recommended: Always pay full amount!
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-400">
                  <p className="font-bold text-red-900 text-lg mb-2">❌ Minimum Amount Due</p>
                  <div className="bg-white p-3 rounded mb-2">
                    <p className="text-2xl font-bold text-red-700 text-center">₹1,758</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>DON'T pay just this!</strong> Remaining balance attracts 42% interest
                  </p>
                  <div className="bg-red-100 p-2 rounded text-xs text-red-800">
                    ⚠️ Trap: ₹33,392 @ 42% = ₹1,168/month interest!
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
                <p className="font-bold text-gray-900 mb-3">📅 Key Dates to Remember:</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded flex justify-between">
                    <span className="text-gray-700">Statement Generation Date:</span>
                    <span className="font-bold text-gray-900">1st Jan</span>
                  </div>
                  <div className="bg-white p-2 rounded flex justify-between">
                    <span className="text-gray-700">Payment Due Date:</span>
                    <span className="font-bold text-red-700">20th Jan</span>
                  </div>
                  <div className="bg-white p-2 rounded flex justify-between">
                    <span className="text-gray-700">Interest-Free Period:</span>
                    <span className="font-bold text-green-700">20 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Transaction Details */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Section 3: Transaction Details (लेनदेन विवरण)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sample Transaction List:</h3>

            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <table className="w-full text-sm">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b">
                    <td className="p-2">05 Dec</td>
                    <td className="p-2">AMAZON.IN</td>
                    <td className="p-2 text-right font-bold">₹3,499</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">08 Dec</td>
                    <td className="p-2">SWIGGY*</td>
                    <td className="p-2 text-right font-bold">₹825</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">12 Dec</td>
                    <td className="p-2">RELIANCE DIGITAL</td>
                    <td className="p-2 text-right font-bold">₹15,999</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">15 Dec</td>
                    <td className="p-2">INDIAN OIL - PETROL</td>
                    <td className="p-2 text-right font-bold">₹2,500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">20 Dec</td>
                    <td className="p-2">PAYMENT RECEIVED - NEFT</td>
                    <td className="p-2 text-right font-bold text-green-700">- ₹10,000 CR</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">25 Dec</td>
                    <td className="p-2">FLIPKART</td>
                    <td className="p-2 text-right font-bold">₹4,250</td>
                  </tr>
                  <tr className="border-b bg-red-50">
                    <td className="p-2">31 Dec</td>
                    <td className="p-2 font-bold">ANNUAL FEE + GST</td>
                    <td className="p-2 text-right font-bold text-red-700">₹1,180</td>
                  </tr>
                  <tr className="bg-blue-100">
                    <td className="p-2 font-bold" colSpan={2}>TOTAL NEW CHARGES</td>
                    <td className="p-2 text-right font-bold text-blue-900">₹18,253</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-bold text-gray-900 mb-2">✅ What to Check:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Verify every transaction - do you recognize all merchants?</li>
                  <li>• Check dates - do they match when you made purchases?</li>
                  <li>• Confirm amounts - are they correct?</li>
                  <li>• Look for unauthorized transactions</li>
                  <li>• Check for duplicate charges</li>
                </ul>
              </div>

              <div className="bg-red-50 p-3 rounded border border-red-400">
                <p className="font-bold text-red-900 mb-2">🚨 Red Flags - Report Immediately:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Unknown merchant names</li>
                  <li>• Transactions you didn't make</li>
                  <li>• Duplicate charges for same purchase</li>
                  <li>• Wrong amounts (higher than actual)</li>
                  <li>• International transactions (if you didn't travel)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Fees & Charges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Section 4: Fees & Charges Breakdown (शुल्क विवरण)
          </h2>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-100 border-2 border-orange-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding All Charges:</h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                <h4 className="font-bold text-red-900 mb-3">Finance Charges (Interest):</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-gray-900 mb-1">Interest Rate (APR)</p>
                    <p className="text-gray-700">Annual: <strong>42%</strong></p>
                    <p className="text-gray-700">Monthly: <strong>3.5%</strong></p>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-gray-900 mb-1">Interest This Month</p>
                    <p className="text-gray-700">Amount: <strong>₹0</strong></p>
                    <p className="text-xs text-green-600">(Paid full last month ✅)</p>
                  </div>
                </div>
                <div className="bg-yellow-100 p-2 rounded mt-2 text-xs text-gray-800">
                  ⚠️ Interest charged ONLY if you didn't pay full amount last month
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-orange-300">
                <h4 className="font-bold text-orange-900 mb-3">Other Fees:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-orange-50 p-2 rounded flex justify-between">
                    <span className="text-gray-700">Annual Fee</span>
                    <span className="font-bold text-gray-900">₹1,000</span>
                  </div>
                  <div className="bg-orange-50 p-2 rounded flex justify-between">
                    <span className="text-gray-700">GST on Fee (18%)</span>
                    <span className="font-bold text-gray-900">₹180</span>
                  </div>
                  <div className="bg-orange-50 p-2 rounded flex justify-between">
                    <span className="text-gray-700">Late Payment Fee</span>
                    <span className="font-bold text-gray-900">₹0</span>
                  </div>
                  <div className="bg-orange-50 p-2 rounded flex justify-between">
                    <span className="text-gray-700">Over-Limit Fee</span>
                    <span className="font-bold text-gray-900">₹0</span>
                  </div>
                  <div className="bg-orange-50 p-2 rounded flex justify-between">
                    <span className="text-gray-700">Cash Advance Fee</span>
                    <span className="font-bold text-gray-900">₹0</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 p-3 rounded border border-green-400">
                <p className="font-bold text-gray-900 mb-1">✅ How to Minimize Fees:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Pay full amount to avoid interest (saves 42%!)</li>
                  <li>• Meet annual spend target to waive annual fee</li>
                  <li>• Never withdraw cash (2.5% fee + 42% interest)</li>
                  <li>• Stay within limit to avoid over-limit fee</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Reward Points Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Reward Points & Benefits Section
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Track Your Rewards:</h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                <div className="grid md:grid-cols-3 gap-3 text-center">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-600 mb-1">Opening Balance</p>
                    <p className="text-2xl font-bold text-gray-900">5,240</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm text-gray-600 mb-1">Points Earned</p>
                    <p className="text-2xl font-bold text-green-700">+ 346</p>
                    <p className="text-xs text-gray-500">this month</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-sm text-gray-600 mb-1">Closing Balance</p>
                    <p className="text-2xl font-bold text-purple-700">5,586</p>
                    <p className="text-xs text-gray-500">total points</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">💰 Reward Value:</p>
                <p className="text-sm text-gray-700">
                  Typical value: 1 point = ₹0.25-1.00 depending on redemption
                </p>
                <p className="text-sm text-gray-700">
                  Your 5,586 points = ₹1,396-5,586 value
          </p>
        </div>

              <div className="bg-green-100 p-3 rounded border border-green-400">
                <p className="font-bold text-gray-900 mb-1">✅ Redemption Options:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Cash credit to statement</li>
                  <li>• Shopping vouchers (Amazon, Flipkart)</li>
                  <li>• Air miles/travel bookings</li>
                  <li>• Product catalog redemptions</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2">
                  Learn more: <a href="/learn/credit-cards/rewards-cashback" className="hover:underline">Rewards & Cashback Guide</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Statement Errors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Common Statement Errors to Watch For
          </h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Unauthorized Transactions</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Transactions you didn't make - possible fraud or identity theft
                </p>
                <p className="text-sm text-green-700 font-semibold">
                  ✅ Action: Call bank within 3 days, file dispute, zero liability protection applies
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Duplicate Charges</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Same transaction charged twice - common with online payments
                </p>
                <p className="text-sm text-green-700 font-semibold">
                  ✅ Action: Contact merchant first, then bank if not resolved in 7 days
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Incorrect Amounts</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Amount charged different from what you paid
                </p>
                <p className="text-sm text-green-700 font-semibold">
                  ✅ Action: Keep receipts, raise dispute with transaction proof
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Unexpected Fees</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Late fees, over-limit fees you weren't expecting
                </p>
                <p className="text-sm text-green-700 font-semibold">
                  ✅ Action: Check if genuinely due, request waiver if first-time occurrence
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">❌ Missing Payments/Credits</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Your payment not reflected in statement
                </p>
                <p className="text-sm text-green-700 font-semibold">
                  ✅ Action: Show payment proof (transaction ID, receipt) to bank
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/billing-cycle" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Billing Cycle Guide</p>
                <p className="text-sm text-gray-600">Understand billing dates</p>
              </a>
              <a href="/learn/credit-cards/interest-rates-charges" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-red-200">
                <p className="font-semibold text-red-600 mb-1">All Charges Explained</p>
                <p className="text-sm text-gray-600">42% interest breakdown</p>
              </a>
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Payment Strategy</p>
                <p className="text-sm text-gray-600">Why pay full bill</p>
              </a>
              <a href="/learn/credit-cards/fraud-safety" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Fraud Protection</p>
                <p className="text-sm text-gray-600">Spot unauthorized charges</p>
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
              <span className="text-gray-800">8 main sections: Account summary, payments, transactions, fees, limits, rewards, dates, contacts</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">ALWAYS pay "Total Amount Due" not "Minimum Due" to avoid 42% interest</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Check every transaction - unauthorized charges must be reported within 3 days for zero liability</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Verify all fees - late fees, annual fees, GST, cash advance charges</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Track reward points - redeem before expiry (usually 2-3 years)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Read statement within 3 days of generation to catch errors early</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Understand Your Statement Fully! 📊</h2>
          <p className="text-blue-100 mb-6">
            Next, learn about billing cycles to understand when transactions appear on your statement!
          </p>
          <a
            href="/learn/credit-cards/billing-cycle"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Billing Cycle Guide →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default StatementGuide;
