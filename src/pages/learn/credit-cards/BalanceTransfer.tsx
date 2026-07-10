import React from 'react';
import { ArrowRightLeft, IndianRupee, CheckCircle, AlertCircle, TrendingUp, CreditCard } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const BalanceTransfer: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card Balance Transfer Guide 2024 - Save ?10L+ on Interest | MoneyCal"
        description="Complete guide to credit card balance transfer in India. Compare offers, calculate savings, step-by-step process, best banks, and avoid common mistakes. Save thousands on high-interest debt!"
        keywords="credit card balance transfer, balance transfer offers, debt consolidation, lower interest rate, credit card debt, balance transfer process India"
        canonicalUrl="/learn/credit-cards/balance-transfer"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Card Balance Transfer - Complete Guide to Save on Interest',
          description: 'Learn how to transfer credit card balances to save thousands in interest charges',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="balance-transfer"
        breadcrumb={['Learn', 'Credit Cards', 'Balance Transfer']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <ArrowRightLeft className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Save ?10 Lakhs+ with Balance Transfer!</h3>
          <p className="text-gray-700">
                Transfer high-interest credit card debt to lower rates and save thousands! This comprehensive guide shows exactly how to do it, 
                which banks offer best rates, and common mistakes to avoid. ????
              </p>
            </div>
          </div>
        </div>

        {/* What is Balance Transfer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What is Credit Card Balance Transfer? (?????? ???????? ???? ???)
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Simple Definition:</h3>
            
            <p className="text-lg text-gray-700 mb-4">
              <strong>Balance Transfer</strong> = Moving your existing credit card debt from one card (high interest) to another card (lower interest) to save money on interest charges.
            </p>

            <div className="bg-white p-5 rounded-lg border-2 border-blue-300">
              <p className="font-bold text-gray-900 mb-3">Real Example:</p>
              <div className="space-y-3">
                <div className="bg-red-50 p-4 rounded border-2 border-red-300">
                  <p className="font-bold text-red-900 mb-2">? Current Situation:</p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• HDFC Card: ?1,00,000 outstanding</p>
                    <p>• Interest Rate: 42% per annum (3.5% monthly)</p>
                    <p>• Monthly Interest: ?3,500</p>
                    <p>• Annual Interest: ?42,000</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded border-2 border-green-300">
                  <p className="font-bold text-green-900 mb-2">? After Balance Transfer:</p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• SBI Card: 0% interest for 12 months</p>
                    <p>• Processing Fee: 2% (?2,000)</p>
                    <p>• Monthly Payment: ?8,333 (?1,00,000 ÷ 12)</p>
                    <p>• Total Interest Saved: ?40,000 in first year!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-400 mt-4">
              <p className="font-bold text-gray-900 mb-2">?? Key Benefits:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Lower interest rate (0-15% vs 36-42%)</li>
                <li>• Fixed repayment period (6-24 months)</li>
                <li>• Single EMI instead of minimum payments</li>
                <li>• Improve credit score (better utilization)</li>
                <li>• Reduce financial stress</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How Balance Transfer Works (???? ??? ???? ??)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">Step-by-Step Process:</h3>

            <div className="space-y-4">
              <div className="bg-purple-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-purple-700 text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Apply for New Credit Card</h4>
                    <p className="text-gray-700 mb-3">Choose a card offering balance transfer with favorable terms</p>
                    <div className="bg-white p-3 rounded border-2 border-purple-300">
                      <p className="font-semibold text-gray-900 mb-2">Best Options:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• SBI Cards: 0% for 12 months</li>
                        <li>• ICICI Cards: 1% for 12 months</li>
                        <li>• HDFC Cards: 1.5% for 12 months</li>
                        <li>• Axis Cards: 2% for 12 months</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Submit Balance Transfer Request</h4>
                    <p className="text-gray-700 mb-3">Once approved, request to transfer balance from old card</p>
                    <div className="bg-white p-3 rounded border-2 border-blue-300">
                      <p className="font-semibold text-gray-900 mb-2">Required Information:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Old card number</li>
                        <li>• Outstanding amount</li>
                        <li>• Old card bank details</li>
                        <li>• Latest statement copy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-green-700 text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Processing & Transfer</h4>
                    <p className="text-gray-700 mb-3">New bank processes transfer and pays old card</p>
                    <div className="bg-white p-3 rounded border-2 border-green-300">
                      <p className="font-semibold text-gray-900 mb-2">Timeline:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Processing time: 7-15 working days</li>
                        <li>• Old card gets paid automatically</li>
                        <li>• New card shows transferred amount</li>
                        <li>• EMI starts from next billing cycle</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-orange-700 text-lg">4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Start EMI Payments</h4>
                    <p className="text-gray-700 mb-3">Pay fixed EMI amount monthly to clear debt</p>
                    <div className="bg-white p-3 rounded border-2 border-orange-300">
                      <p className="font-semibold text-gray-900 mb-2">Benefits:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Fixed monthly payment</li>
                        <li>• Lower interest rate</li>
                        <li>• Clear debt in defined period</li>
                        <li>• Improve credit utilization ratio</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Balance Transfer Offers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Best Balance Transfer Offers 2024 (???? ????? ???)
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Current Top Offers:</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300 text-sm">
                <thead className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Bank</th>
                    <th className="border border-gray-300 p-3">Interest Rate</th>
                    <th className="border border-gray-300 p-3">Processing Fee</th>
                    <th className="border border-gray-300 p-3">Tenure</th>
                    <th className="border border-gray-300 p-3">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-100">
                    <td className="border border-gray-300 p-3 font-semibold">SBI Cards</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-green-700">0%</td>
                    <td className="border border-gray-300 p-3 text-center">2%</td>
                    <td className="border border-gray-300 p-3 text-center">12 months</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">Highest savings</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">ICICI Cards</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-green-700">1%</td>
                    <td className="border border-gray-300 p-3 text-center">1.5%</td>
                    <td className="border border-gray-300 p-3 text-center">12 months</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">Low fee</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">HDFC Cards</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-green-700">1.5%</td>
                    <td className="border border-gray-300 p-3 text-center">2%</td>
                    <td className="border border-gray-300 p-3 text-center">12 months</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">Quick approval</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Axis Cards</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-green-700">2%</td>
                    <td className="border border-gray-300 p-3 text-center">2.5%</td>
                    <td className="border border-gray-300 p-3 text-center">12 months</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">Easy process</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-3 font-semibold">Kotak Cards</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-green-700">0%</td>
                    <td className="border border-gray-300 p-3 text-center">2.5%</td>
                    <td className="border border-gray-300 p-3 text-center">6 months</td>
                    <td className="border border-gray-300 p-3 text-center text-sm">Short tenure</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">?? Important Notes:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Offers change frequently - check current rates</li>
                <li>• Processing fee is one-time, added to transferred amount</li>
                <li>• After promotional period, normal interest rate applies</li>
                <li>• Minimum transfer amount usually ?25,000</li>
                <li>• Maximum transfer amount up to credit limit</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Savings Calculation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Calculate Your Savings (??? ?? ????)
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Real Example: ?2 Lakhs Debt</h3>

            <div className="space-y-4">
              <div className="bg-red-50 p-5 rounded-lg border-2 border-red-400">
                <h4 className="font-bold text-red-900 mb-3">? Current Situation (Without Balance Transfer):</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Outstanding Amount:</p>
                      <p className="font-bold text-red-700">?2,00,000</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Interest Rate:</p>
                      <p className="font-bold text-red-700">42% per annum</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Monthly Interest:</p>
                      <p className="font-bold text-red-700">?7,000</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">If paying minimum (5%):</p>
                      <p className="font-bold text-red-700">?10,000/month</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Time to clear:</p>
                      <p className="font-bold text-red-700">10+ years!</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Total interest paid:</p>
                      <p className="font-bold text-red-700">?8+ lakhs!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-400">
                <h4 className="font-bold text-green-900 mb-3">? After SBI Balance Transfer (0% for 12 months):</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Transfer Amount:</p>
                      <p className="font-bold text-gray-700">?2,00,000</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Processing Fee (2%):</p>
                      <p className="font-bold text-gray-700">?4,000</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Total Amount:</p>
                      <p className="font-bold text-gray-700">?2,04,000</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Monthly EMI (12 months):</p>
                      <p className="font-bold text-green-700">?17,000</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Total Payment:</p>
                      <p className="font-bold text-green-700">?2,04,000</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Interest Saved:</p>
                      <p className="font-bold text-green-700">?6,96,000!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-200 to-emerald-200 p-6 rounded-lg border-2 border-green-500">
                <h4 className="font-bold text-gray-900 text-xl mb-3 text-center">?? Total Savings in First Year:</h4>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-700 mb-2">?6,96,000</p>
                  <p className="text-lg text-gray-700">That's 6.96 lakhs saved just in the first year!</p>
                  <p className="text-sm text-gray-600 mt-2">Plus you clear the entire debt in just 12 months vs 10+ years!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility & Requirements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Eligibility & Requirements (???????)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">? Eligibility Criteria:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Existing credit card with outstanding balance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Good credit score (650+)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Regular income source</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>No recent defaults or settlements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Minimum outstanding: ?25,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Age: 21-65 years</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 border-2 border-orange-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">?? Required Documents:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Identity proof (PAN card, Aadhaar)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Address proof (utility bill, rental agreement)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Income proof (salary slip, bank statements)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Latest credit card statement (old card)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Bank statements (3-6 months)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Photographs (passport size)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Common Mistakes to Avoid (??????? ? ????)
          </h2>

          <div className="space-y-4">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Not Reading Terms & Conditions</h4>
                <p className="text-sm text-gray-700">
                  Many people miss hidden charges, prepayment penalties, or rate changes after promotional period. Always read the fine print!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Using New Card for Fresh Purchases</h4>
                <p className="text-sm text-gray-700">
                  Using the new card for new purchases can void the 0% offer on transferred amount. Keep the new card only for EMI payments!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Missing EMI Payments</h4>
                <p className="text-sm text-gray-700">
                  Even one missed payment can void the promotional rate and apply normal interest (36-42%) from day 1. Set auto-pay!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Not Closing Old Card</h4>
                <p className="text-sm text-gray-700">
                  Keeping old card open increases total credit exposure and can hurt credit score. Close it after transfer is complete.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">? Not Planning for Post-Promotional Period</h4>
                <p className="text-sm text-gray-700">
                  After promotional period ends, normal interest rate applies. Plan to clear balance or transfer to another offer before that!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* When NOT to Do Balance Transfer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            When NOT to Do Balance Transfer (?? ? ????)
          </h2>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Avoid Balance Transfer If:</h3>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-2 border-yellow-300">
                <p className="font-bold text-gray-900 mb-2">1. You Can Pay Off Debt in 3-6 Months</p>
                <p className="text-sm text-gray-700">
                  If you can clear the debt quickly, processing fees might be higher than interest savings.
                </p>
              </div>

              <div className="bg-white p-4 rounded border-2 border-yellow-300">
                <p className="font-bold text-gray-900 mb-2">2. Poor Credit Score (&lt;600)</p>
                <p className="text-sm text-gray-700">
                  Low credit score means higher interest rates or rejection. Improve score first.
                </p>
              </div>

              <div className="bg-white p-4 rounded border-2 border-yellow-300">
                <p className="font-bold text-gray-900 mb-2">3. Irregular Income</p>
                <p className="text-sm text-gray-700">
                  If income is unstable, fixed EMI payments can become difficult to manage.
                </p>
              </div>

              <div className="bg-white p-4 rounded border-2 border-yellow-300">
                <p className="font-bold text-gray-900 mb-2">4. High Processing Fees</p>
                <p className="text-sm text-gray-700">
                  If processing fee is more than 3-4%, the savings might not be worth it.
          </p>
        </div>

              <div className="bg-white p-4 rounded border-2 border-yellow-300">
                <p className="font-bold text-gray-900 mb-2">5. Short Promotional Period</p>
                <p className="text-sm text-gray-700">
                  If promotional rate is for less than 6 months, savings might be minimal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/interest-rates-charges" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-red-200">
                <p className="font-semibold text-red-600 mb-1">Interest Rates & Charges</p>
                <p className="text-sm text-gray-600">Understand current rates</p>
              </a>
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Minimum Payment Trap</p>
                <p className="text-sm text-gray-600">Why full payment matters</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">Better score = better offers</p>
              </a>
              <a href="/learn/credit-cards/application-process" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Card Application Process</p>
                <p className="text-sm text-gray-600">How to apply for new card</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">?? Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Balance transfer can save ?6+ lakhs on ?2L debt in first year alone!</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Best offers: SBI (0%), ICICI (1%), HDFC (1.5%) for 12 months</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Process: Apply ? Transfer ? Pay EMI ? Save thousands!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Requirements: Good credit score (650+), regular income, ?25K+ debt</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Avoid: Using new card for purchases, missing EMI payments, not reading terms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Plan ahead: Clear debt or transfer again before promotional period ends</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Start Saving Today! ??</h2>
          <p className="text-green-100 mb-6">
            Don't let high interest eat your money! Transfer your balance and save thousands in interest charges.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/learn/credit-cards/application-process"
              className="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors"
            >
              Next: Application Process ?
            </a>
          <a
            href="/learn/credit-cards"
              className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-800 transition-colors"
          >
              All Credit Card Lessons
          </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default BalanceTransfer;
