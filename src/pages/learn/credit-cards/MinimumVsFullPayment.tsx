import React from 'react';
import { AlertTriangle, DollarSign, CheckCircle, XCircle, TrendingUp, IndianRupee } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const MinimumVsFullPayment: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Minimum Payment vs Full Payment - Credit Card Trap Explained | MoneyCal"
        description="Understand the DANGEROUS minimum payment trap! Learn why paying only minimum due costs ?10+ lakhs in interest. Compare full vs minimum payment with real examples."
        keywords="minimum payment trap, credit card minimum payment, credit card full payment, minimum due danger, credit card interest calculation, avoid credit card debt"
        canonicalUrl="/learn/credit-cards/minimum-vs-full-payment"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Card Minimum Payment vs Full Payment - The ?10 Lakh Trap',
          description: 'Detailed analysis of why paying only minimum due on credit cards can cost you lakhs in interest over time.',
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
        currentLesson="minimum-vs-full-payment"
        breadcrumb={['Learn', 'Credit Cards', 'Minimum vs Full Payment']}
      >
        {/* Warning Banner */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 border-l-4 border-red-700 p-6 rounded-r-lg mb-8 text-white">
          <div className="flex items-start">
            <AlertTriangle className="h-8 w-8 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-2">?? CRITICAL LESSON - This Can Save You ?10+ Lakhs!</h3>
              <p className="text-red-100 text-lg">
                Paying ONLY minimum due is one of the BIGGEST financial mistakes Indians make! 
                This lesson shows exactly how it can destroy your finances with 36-42% interest rates. ??
              </p>
            </div>
          </div>
        </div>

        {/* The Big Picture */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            The ?10 Lakh Trap: Minimum Payment Danger (??????? ?????? ?? ????)
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">Real-Life Horror Story:</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                <p className="font-bold text-gray-900 mb-2">Rajesh's Mistake:</p>
                <div className="space-y-2 text-gray-700">
                  <p>• Credit card bill: ?50,000</p>
                  <p>• Minimum due: ?1,000 (2% of bill)</p>
                  <p>• Rajesh pays only ?1,000 thinking "I'll pay rest next month"</p>
                  <p>• Interest rate: 3.5% per month (42% per year)</p>
                </div>
              </div>

              <div className="bg-red-100 p-5 rounded-lg border-2 border-red-400">
                <p className="font-bold text-red-900 mb-3 text-lg">What Happens Next:</p>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-gray-900">Month 1:</p>
                    <p className="text-gray-700">Paid: ?1,000 | Remaining: ?49,000</p>
                    <p className="text-red-600 font-bold">Interest charged: ?1,715 (3.5% on ?49,000)</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-gray-900">Month 2:</p>
                    <p className="text-gray-700">Outstanding: ?49,000 + ?1,715 = ?50,715</p>
                    <p className="text-gray-700">Paid minimum: ?1,014</p>
                    <p className="text-red-600 font-bold">New interest: ?1,775</p>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-gray-900">Month 3:</p>
                    <p className="text-gray-700">Outstanding: ?51,476</p>
                    <p className="text-red-600 font-bold">Interest keeps growing!</p>
                  </div>

                  <div className="bg-gradient-to-r from-red-200 to-orange-200 p-4 rounded-lg border-2 border-red-500 mt-4">
                    <p className="font-bold text-red-900 text-xl mb-2">After 5 Years of Minimum Payments:</p>
                    <p className="text-gray-800">Original amount: ?50,000</p>
                    <p className="text-gray-800">Total paid: ?78,000+</p>
                    <p className="text-gray-800">Still owing: ?42,000+</p>
                    <p className="font-bold text-red-700 text-2xl mt-3">
                      ?? Total Loss: ?1,20,000+ (More than DOUBLE the original amount!)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-400">
                <p className="font-bold text-gray-900 mb-2">?? The Shocking Truth:</p>
                <p className="text-gray-800">
                  If you pay ONLY minimum due on ?50,000, it will take <strong className="text-red-700">30+ YEARS</strong> to clear 
                  and cost you <strong className="text-red-700">?2,00,000+</strong> in interest!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Minimum Payment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Minimum Payment?</h2>

          <div className="bg-white border-2 border-blue-300 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-800 mb-4">
              <strong>Minimum payment</strong> (minimum due) is the smallest amount you MUST pay to avoid late fees and keep your account "current." 
              It's typically 2-5% of your total outstanding amount.
            </p>

            <div className="bg-blue-50 p-5 rounded-lg">
              <p className="font-bold text-gray-900 mb-3">How Banks Calculate Minimum Due:</p>
              <div className="space-y-2 text-gray-700">
                <p>Minimum Due = <strong>Higher of:</strong></p>
                <ul className="ml-6 space-y-1">
                  <li>• 5% of total outstanding amount, OR</li>
                  <li>• ?200-500 (fixed minimum), OR</li>
                  <li>• All fees + interest + 1% of principal</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-blue-300 mt-4">
                <p className="font-semibold text-gray-900 mb-2">Example Calculation:</p>
                <div className="space-y-1 text-gray-700">
                  <p>Total Outstanding: ?30,000</p>
                  <p>Interest charges: ?1,050 (3.5% per month)</p>
                  <p>Other fees: ?100</p>
                  <p>5% of ?30,000: ?1,500</p>
                  <p className="font-bold text-blue-700 text-lg mt-2">
                    Minimum Due = ?1,500
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Math: Full vs Minimum */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            The Math: Full Payment vs Minimum Payment
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Full Payment */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-green-900">? Full Payment</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Scenario:</p>
                  <p className="text-gray-700">Credit card bill: ?50,000</p>
                  <p className="text-gray-700">Due date: 20th Jan</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">You Pay:</p>
                  <p className="text-green-700 font-bold text-2xl">?50,000 (Full)</p>
                  <p className="text-sm text-gray-600">Before due date</p>
                </div>

                <div className="bg-green-200 p-4 rounded-lg border-2 border-green-500">
                  <p className="font-bold text-green-900 mb-2">Result:</p>
                  <ul className="space-y-1 text-sm text-gray-800">
                    <li>? Interest charged: <strong className="text-green-700">?0</strong></li>
                    <li>? Late fees: ?0</li>
                    <li>? Outstanding: ?0</li>
                    <li>? CIBIL score: Improves</li>
                    <li>? Credit limit: Fully available</li>
                    <li>? Interest-free period: Continues</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t-2 border-green-600">
                    <p className="font-bold text-green-800 text-lg">
                      Total Cost: ?50,000 only ??
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimum Payment */}
            <div className="bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <XCircle className="h-10 w-10 text-red-600 mr-3" />
                <h3 className="text-xl font-bold text-red-900">? Minimum Payment</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Scenario:</p>
                  <p className="text-gray-700">Credit card bill: ?50,000</p>
                  <p className="text-gray-700">Due date: 20th Jan</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">You Pay:</p>
                  <p className="text-red-700 font-bold text-2xl">?1,000 (Minimum)</p>
                  <p className="text-sm text-gray-600">Just 2% of bill</p>
                </div>

                <div className="bg-red-200 p-4 rounded-lg border-2 border-red-500">
                  <p className="font-bold text-red-900 mb-2">Result:</p>
                  <ul className="space-y-1 text-sm text-gray-800">
                    <li>? Interest: <strong className="text-red-700">?1,715/month</strong> (3.5%)</li>
                    <li>? Remaining: ?49,000</li>
                    <li>? Next month: ?50,715</li>
                    <li>? CIBIL: May decrease (high utilization)</li>
                    <li>? Debt keeps growing!</li>
                    <li>? Will take 30+ years to clear</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t-2 border-red-600">
                    <p className="font-bold text-red-800 text-lg">
                      Total Cost: ?2,00,000+ over years! ??
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <IndianRupee className="h-7 w-7 text-yellow-600 mr-3" />
              <h3 className="font-bold text-xl text-gray-900">The Shocking Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-yellow-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Metric</th>
                    <th className="p-3">Full Payment ?</th>
                    <th className="p-3">Minimum Payment ?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-3 font-semibold">Initial Amount</td>
                    <td className="p-3 text-center">?50,000</td>
                    <td className="p-3 text-center">?50,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Monthly Payment</td>
                    <td className="p-3 text-center text-green-700 font-bold">?50,000 (once)</td>
                    <td className="p-3 text-center text-red-700">?1,000-2,000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-semibold">Interest Rate</td>
                    <td className="p-3 text-center text-green-700 font-bold">0%</td>
                    <td className="p-3 text-center text-red-700 font-bold">3.5% monthly (42% yearly)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-semibold">Time to Clear</td>
                    <td className="p-3 text-center text-green-700 font-bold">1 month</td>
                    <td className="p-3 text-center text-red-700 font-bold">30+ YEARS</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-semibold">Total Interest Paid</td>
                    <td className="p-3 text-center text-green-700 font-bold text-lg">?0</td>
                    <td className="p-3 text-center text-red-700 font-bold text-lg">?1,50,000+</td>
                  </tr>
                  <tr className="bg-green-100">
                    <td className="p-3 font-semibold">TOTAL COST</td>
                    <td className="p-3 text-center text-green-800 font-bold text-xl">?50,000</td>
                    <td className="p-3 text-center text-red-800 font-bold text-xl">?2,00,000+</td>
                  </tr>
                  <tr className="bg-yellow-100">
                    <td className="p-3 font-semibold" colspan="2">MONEY WASTED:</td>
                    <td className="p-3 text-center text-red-900 font-bold text-2xl">?1,50,000! ??</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Banks Love Minimum Payments */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Banks LOVE When You Pay Minimum (???? ????? ??? ???? ???)
          </h2>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-400 rounded-xl p-6">
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-orange-300">
                <h3 className="font-bold text-lg text-gray-900 mb-3">The Bank's Business Model:</h3>
                <p className="text-gray-700 mb-4">
                  Credit card companies make 80% of their profits from users who pay only minimum due! 
                  Here's the math from bank's perspective:
                </p>

                <div className="bg-orange-50 p-4 rounded space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Customer pays minimum on ?50,000</span>
                    <span className="text-gray-900 font-bold">?1,000/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bank's interest income per month</span>
                    <span className="text-red-700 font-bold">?1,715</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bank's profit margin</span>
                    <span className="text-green-700 font-bold">~70%</span>
                  </div>
                  <div className="border-t-2 border-orange-300 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Bank earns per customer per year</span>
                      <span className="font-bold text-red-700 text-xl">?20,580</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-red-100 rounded">
                  <p className="text-gray-800">
                    <strong>?? Reality Check:</strong> Banks WANT you to pay minimum. That's why they make it so easy and prominently display it on statements!
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <h3 className="font-bold text-lg text-red-900 mb-3">?? The Trap Design:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Small amount looks manageable:</strong> ?1,000 feels affordable compared to ?50,000</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Keeps your account "active":</strong> No late fees, no collection calls</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Interest is hidden:</strong> Not clearly shown how much debt grows monthly</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Debt never decreases:</strong> With 3.5% monthly interest, ?1,000 barely covers interest!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Month-by-Month Breakdown: The Debt Spiral
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-400 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">
              Starting Balance: ?50,000 @ 42% Annual Interest (3.5% monthly)
            </h3>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <div className="grid grid-cols-5 gap-2 text-sm font-bold text-gray-900 mb-2">
                  <span>Month</span>
                  <span>Balance</span>
                  <span>Min. Paid</span>
                  <span>Interest</span>
                  <span>New Balance</span>
                </div>
              </div>

              {[
                { month: 1, balance: 50000, minPaid: 1000, interest: 1715, newBalance: 50715 },
                { month: 2, balance: 50715, minPaid: 1014, interest: 1775, newBalance: 51476 },
                { month: 3, balance: 51476, minPaid: 1029, interest: 1802, newBalance: 52249 },
                { month: 6, balance: 54180, minPaid: 1084, interest: 1896, newBalance: 54992 },
                { month: 12, balance: 59234, minPaid: 1185, interest: 2073, newBalance: 60122 },
                { month: 24, balance: 72458, minPaid: 1449, interest: 2536, newBalance: 73545 },
                { month: 36, balance: 88674, minPaid: 1773, interest: 3104, newBalance: 90005 }
              ].map((data) => (
                <div key={data.month} className={`p-3 rounded-lg ${data.month === 36 ? 'bg-red-200 border-2 border-red-500' : 'bg-gray-50'}`}>
                  <div className="grid grid-cols-5 gap-2 text-sm text-gray-700">
                    <span className="font-bold">{data.month}</span>
                    <span>?{data.balance.toLocaleString('en-IN')}</span>
                    <span className="text-blue-600">?{data.minPaid.toLocaleString('en-IN')}</span>
                    <span className="text-red-600 font-bold">?{data.interest.toLocaleString('en-IN')}</span>
                    <span className="font-bold">?{data.newBalance.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-red-300 to-orange-300 p-5 rounded-lg border-2 border-red-600 mt-4">
                <p className="font-bold text-red-900 text-lg mb-3">After 3 Years:</p>
                <div className="space-y-2 text-gray-800">
                  <p>Original Amount: ?50,000</p>
                  <p>Total Paid (36 months): ?45,000+</p>
                  <p>Still Owing: <strong className="text-red-800 text-xl">?90,000+</strong></p>
                  <p className="font-bold text-red-900 text-2xl mt-3 pt-3 border-t-2 border-red-500">
                    ?? Debt has DOUBLED despite paying ?45,000!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When Is Minimum Payment OK */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            When is Minimum Payment Acceptable? (?? ??? ???)
          </h2>

          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-3">? ONLY in These Emergency Situations:</h3>
              <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Medical Emergency</p>
                    <p className="text-sm text-gray-600">Someone in family critically ill, need cash immediately</p>
                  </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Job Loss</p>
                    <p className="text-sm text-gray-600">Sudden unemployment, need to preserve cash for essentials</p>
                  </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">One-Time Cash Crunch</p>
                    <p className="text-sm text-gray-600">ONLY if you're 100% sure you can pay full next month</p>
                  </div>
                </li>
              </ul>

              <div className="mt-4 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
                <p className="font-bold text-gray-900 mb-2">?? Important Rules:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use ONLY once or twice per year maximum</li>
                  <li>• Pay full bill the very next month</li>
                  <li>• Don't make it a habit!</li>
                  <li>• Consider personal loan if you can't pay (lower interest 11-15%)</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-red-900 mb-3">? NEVER Pay Minimum For:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Shopping Sprees</p>
                    <p className="text-sm text-gray-600">"I'll buy now, pay minimum, buy more next month" - Recipe for disaster!</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Regular Expenses</p>
                    <p className="text-sm text-gray-600">If you can't pay full bill for groceries/fuel, you're overspending!</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Luxury Purchases</p>
                    <p className="text-sm text-gray-600">Latest iPhone, expensive vacation - Save first, then buy!</p>
                  </div>
              </li>
              <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">"I'll Pay Next Month" Mindset</p>
                    <p className="text-sm text-gray-600">This ALWAYS leads to debt trap!</p>
                  </div>
              </li>
            </ul>
            </div>
          </div>
        </section>

        {/* Escape Strategy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Already Trapped? Here's Your Escape Plan ??
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-400 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">6-Step Debt Escape Plan:</h3>

            <div className="space-y-4">
              <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">STOP Using the Card Immediately</h4>
                    <p className="text-gray-700">Cut up the card if needed. No new purchases until debt is zero!</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Calculate Total Debt</h4>
                    <p className="text-gray-700 mb-2">Add up all credit card outstanding amounts</p>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      <p className="text-gray-700">Example: Card 1: ?30,000 + Card 2: ?20,000 = <strong>?50,000 total debt</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Pay More Than Minimum (Even ?500 Extra Helps!)</h4>
                    <p className="text-gray-700 mb-3">Every extra rupee goes toward reducing principal</p>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Impact of Paying Extra:</p>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p>Minimum only (?1,000): <span className="text-red-600">Clears in 30+ years</span></p>
                        <p>?1,500 (?500 extra): <span className="text-orange-600">Clears in 12 years</span></p>
                        <p>?2,500 (?1,500 extra): <span className="text-yellow-600">Clears in 5 years</span></p>
                        <p>?5,000: <span className="text-green-600 font-bold">Clears in 1.5 years</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Consider Balance Transfer to Lower Rate</h4>
                    <p className="text-gray-700 mb-3">
                      Transfer high-interest debt (42%) to lower rate card/loan (12-15%)
                    </p>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-bold text-gray-900 mb-2">Savings Example:</p>
                      <p className="text-sm text-gray-700">?50,000 debt for 1 year:</p>
                      <p className="text-sm text-gray-700">At 42%: Interest = ?21,000</p>
                      <p className="text-sm text-gray-700">At 12%: Interest = ?6,000</p>
                      <p className="text-sm font-bold text-green-700 mt-2">?? Save ?15,000!</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Learn more: <a href="/learn/credit-cards/balance-transfer" className="text-blue-600 hover:underline">Balance Transfer Guide</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">5</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Use Snowball or Avalanche Method</h4>
                    <p className="text-gray-700 mb-3">Strategic repayment if you have multiple cards</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-purple-50 p-3 rounded border border-purple-300">
                        <p className="font-bold text-purple-900 text-sm mb-1">Snowball Method:</p>
                        <p className="text-xs text-gray-700">Pay smallest debt first ? Quick wins ? Motivation</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded border border-orange-300">
                        <p className="font-bold text-orange-900 text-sm mb-1">Avalanche Method:</p>
                        <p className="text-xs text-gray-700">Pay highest interest first ? Save more money</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">6</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Increase Income or Cut Expenses</h4>
                    <p className="text-gray-700 mb-3">Find extra ?5,000-10,000/month to pay down debt faster</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-green-50 p-3 rounded">
                        <p className="font-bold text-green-900 text-sm mb-2">Increase Income:</p>
                        <ul className="text-xs text-gray-700 space-y-1">
                          <li>• Freelancing/part-time work</li>
                          <li>• Sell unused items</li>
                          <li>• Ask for raise/promotion</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 p-3 rounded">
                        <p className="font-bold text-orange-900 text-sm mb-2">Cut Expenses:</p>
                        <ul className="text-xs text-gray-700 space-y-1">
                          <li>• Cancel subscriptions</li>
                          <li>• Cook at home (save ?5K+)</li>
                          <li>• Skip luxury purchases</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Payment Strategies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Payment Strategies ??</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-3">? Best Practices:</h3>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-2">1. Set Up Auto-Pay for Full Amount</p>
                  <p className="text-gray-700 text-sm">Most banks allow auto-debit for full bill. Set it once, never worry!</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-2">2. Pay Before Due Date (Not On Due Date)</p>
                  <p className="text-gray-700 text-sm">Pay 3-5 days early to account for processing time and avoid accidental late payment</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-2">3. Don't Spend What You Can't Repay</p>
                  <p className="text-gray-700 text-sm">
                    <strong>Golden Rule:</strong> Only charge to credit card what you can pay in FULL by month-end
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-2">4. Track Spending Weekly</p>
                  <p className="text-gray-700 text-sm">Check card app every week. Stop spending if approaching limit or budget</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-2">5. Use Budgeting Apps</p>
                  <p className="text-gray-700 text-sm mb-2">Track all card spending in real-time</p>
                  <div className="bg-blue-50 p-2 rounded text-xs">
          <p className="text-gray-700">
                      Recommended: <a href="https://www.walnut.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Walnut</a>, 
                      <a href="https://www.moneyview.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">MoneyView</a>, 
                      or our own <a href="/tools/budget-calculator" className="text-blue-600 hover:underline">Budget Calculator</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternative to Minimum Payment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Better Alternatives to Minimum Payment
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-3">Option 1: Personal Loan</h3>
              <p className="text-gray-700 text-sm mb-4">
                Take a personal loan at 11-15% to pay off credit card debt at 42%. You save 27-31% interest!
              </p>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-semibold text-gray-900 text-sm mb-2">Example:</p>
                <p className="text-sm text-gray-700">Credit card debt: ?1,00,000</p>
                <p className="text-sm text-gray-700">Take personal loan @ 14% for 2 years</p>
                <p className="text-sm text-gray-700">EMI: ?4,850</p>
                <p className="text-sm font-bold text-green-700 mt-2">
                  Save ?56,000 in interest vs minimum payments!
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Learn more: <a href="/learn/personal-loans/debt-consolidation" className="text-blue-600 hover:underline">Debt Consolidation Guide</a>
              </p>
            </div>

            <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-purple-900 mb-3">Option 2: Balance Transfer Card</h3>
              <p className="text-gray-700 text-sm mb-4">
                Transfer to 0% interest card for 6-12 months. Pay aggressively during this period!
              </p>
              <div className="bg-purple-50 p-4 rounded">
                <p className="font-semibold text-gray-900 text-sm mb-2">Example:</p>
                <p className="text-sm text-gray-700">Transfer ?50,000 to 0% card for 12 months</p>
                <p className="text-sm text-gray-700">Processing fee: 2% (?1,000)</p>
                <p className="text-sm text-gray-700">Pay ?4,200/month for 12 months</p>
                <p className="text-sm font-bold text-purple-700 mt-2">
                  Save ?19,000 in interest!
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Learn more: <a href="/learn/credit-cards/balance-transfer" className="text-blue-600 hover:underline">Balance Transfer Guide</a>
              </p>
            </div>

            <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-orange-900 mb-3">Option 3: EMI Conversion</h3>
              <p className="text-gray-700 text-sm mb-4">
                Convert existing bill to EMI at reduced interest (typically 13-18%)
              </p>
              <div className="bg-orange-50 p-4 rounded">
                <p className="font-semibold text-gray-900 text-sm mb-2">Example:</p>
                <p className="text-sm text-gray-700">Bill: ?50,000</p>
                <p className="text-sm text-gray-700">Convert to 12-month EMI @ 15%</p>
                <p className="text-sm text-gray-700">EMI: ?4,504</p>
                <p className="text-sm font-bold text-orange-700 mt-2">
                  Better than 42% on revolving credit!
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Learn more: <a href="/learn/credit-cards/emi-on-credit-card" className="text-blue-600 hover:underline">EMI Conversion Guide</a>
          </p>
        </div>

            <div className="bg-white border-2 border-yellow-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-yellow-900 mb-3">Option 4: Gold Loan</h3>
              <p className="text-gray-700 text-sm mb-4">
                Pledge gold jewelry, get loan at 7-12%, pay off credit card debt
              </p>
              <div className="bg-yellow-50 p-4 rounded">
                <p className="font-semibold text-gray-900 text-sm mb-2">Example:</p>
                <p className="text-sm text-gray-700">Take gold loan: ?50,000 @ 10%</p>
                <p className="text-sm text-gray-700">Clear credit card @ 42%</p>
                <p className="text-sm text-gray-700">Repay gold loan in 12 months</p>
                <p className="text-sm font-bold text-yellow-700 mt-2">
                  Save ?16,000 in interest annually!
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Learn more: <a href="/learn/gold-loans/what-is-gold-loan" className="text-blue-600 hover:underline">Gold Loan Guide</a>
              </p>
            </div>
          </div>
        </section>

        {/* Real Success Stories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Success Stories ??</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-3">Success Story 1: Priya's Escape</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-gray-900 mb-1">Starting Point:</p>
                  <p className="text-sm text-gray-700">?80,000 credit card debt, paying ?1,600 minimum</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-gray-900 mb-1">What She Did:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Stopped using card completely</li>
                    <li>• Took personal loan ?80,000 @ 13%</li>
                    <li>• Paid ?7,500 EMI for 12 months</li>
                  </ul>
                </div>
                <div className="bg-green-200 p-3 rounded border-2 border-green-500">
                  <p className="font-semibold text-green-900 mb-1">Result:</p>
                  <p className="text-sm text-gray-800">Debt-free in 1 year!</p>
                  <p className="text-sm font-bold text-green-800">Saved ?1,20,000 in interest! ??</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-blue-900 mb-3">Success Story 2: Amit's Strategy</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-gray-900 mb-1">Starting Point:</p>
                  <p className="text-sm text-gray-700">?1,20,000 on 3 credit cards, paying ?3,000 minimum total</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-gray-900 mb-1">What He Did:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Cut all non-essential expenses (saved ?10,000/month)</li>
                    <li>• Started freelancing (earned ?8,000 extra)</li>
                    <li>• Paid ?15,000/month toward debt</li>
                    <li>• Used avalanche method (highest interest first)</li>
                  </ul>
                </div>
                <div className="bg-blue-200 p-3 rounded border-2 border-blue-500">
                  <p className="font-semibold text-blue-900 mb-1">Result:</p>
                  <p className="text-sm text-gray-800">Debt-free in 10 months!</p>
                  <p className="text-sm font-bold text-blue-800">Would've taken 40+ years with minimum! ??</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Calculate Your Own Scenario ??
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Interactive Comparison:</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <p className="font-semibold text-gray-900 text-sm mb-2">Your Debt Amount:</p>
                <p className="text-2xl font-bold text-gray-900">?_______</p>
                <p className="text-xs text-gray-600 mt-1">(Enter your total card debt)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <p className="font-semibold text-gray-900 text-sm mb-2">Interest Rate:</p>
                <p className="text-2xl font-bold text-red-700">3.5% / month</p>
                <p className="text-xs text-gray-600 mt-1">(42% annually - typical)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <p className="font-semibold text-gray-900 text-sm mb-2">Minimum Due:</p>
                <p className="text-2xl font-bold text-orange-700">5% of debt</p>
                <p className="text-xs text-gray-600 mt-1">(Typical bank formula)</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border-2 border-purple-400">
              <p className="font-bold text-gray-900 mb-3">Use Our Free Calculator:</p>
              <a 
                href="/tools/debt-payoff-calculator" 
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-bold"
              >
                Calculate Your Debt Payoff Plan ?
              </a>
              <p className="text-sm text-gray-600 mt-3">
                See exactly how long it'll take to clear debt with different payment amounts
              </p>
            </div>
          </div>
        </section>

        {/* Common Myths */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Myths Busted ??</h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-red-300 rounded-lg p-5">
              <div className="flex items-start">
                <XCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Myth: "Minimum payment is safe as long as I pay on time"</p>
                  <p className="text-gray-700 text-sm">
                    <strong>Truth:</strong> It avoids late fees but you still pay massive 42% interest on remaining balance!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-red-300 rounded-lg p-5">
              <div className="flex items-start">
                <XCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Myth: "I'll pay full amount next month"</p>
                  <p className="text-gray-700 text-sm">
                    <strong>Truth:</strong> 90% of people who pay minimum once, do it again next month. It becomes a habit!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-red-300 rounded-lg p-5">
              <div className="flex items-start">
                <XCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Myth: "Minimum payment doesn't hurt credit score"</p>
                  <p className="text-gray-700 text-sm">
                    <strong>Truth:</strong> It increases credit utilization ratio which CAN lower your score by 50-100 points!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-red-300 rounded-lg p-5">
              <div className="flex items-start">
                <XCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Myth: "Interest is only charged on minimum amount"</p>
                  <p className="text-gray-700 text-sm">
                    <strong>Truth:</strong> Interest is charged on ENTIRE remaining balance (?49,000 in example above)!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Related Lessons & Tools:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/interest-rates-charges" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Interest Rates Explained</p>
                <p className="text-sm text-gray-600">Understand how 42% is calculated</p>
              </a>
              <a href="/learn/credit-cards/billing-cycle" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Billing Cycle Guide</p>
                <p className="text-sm text-gray-600">When to pay for maximum benefit</p>
              </a>
              <a href="/tools/debt-payoff-calculator" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Debt Payoff Calculator</p>
                <p className="text-sm text-gray-600">Calculate your escape plan</p>
              </a>
              <a href="/learn/personal-loans/debt-consolidation" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Debt Consolidation</p>
                <p className="text-sm text-gray-600">Better alternatives to credit card debt</p>
              </a>
            </div>
          </div>
        </section>

        {/* Expert Resources */}
        <section className="mb-12">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Expert Resources:</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <strong>RBI Credit Card Guidelines:</strong> <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11445" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official RBI Circular on Credit Card Charges</a>
              </p>
              <p className="text-gray-700">
                <strong>Debt Management Tips:</strong> <a href="https://www.moneycontrol.com/news/business/personal-finance/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MoneyControl Personal Finance</a>
              </p>
              <p className="text-gray-700">
                <strong>Financial Planning:</strong> <a href="https://www.livemint.com/money" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mint Money Section</a>
              </p>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">?? Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Paying ONLY minimum due can cost you 3-4X the original amount in interest</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">?50,000 debt takes 30+ years to clear with minimum payments (?2L+ total cost)</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">ALWAYS pay full bill to enjoy interest-free credit (45-50 days free!)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">If stuck in debt: Stop using card, consider personal loan/balance transfer (save 27-31% interest)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Set up auto-pay for full amount to never fall into minimum payment trap</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Golden Rule: Only charge what you can pay in FULL by month-end</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Take Action NOW! ?</h2>
          <p className="text-red-100 mb-6">
            Don't let this lesson be just information. Take action TODAY to save lakhs!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/tools/debt-payoff-calculator"
              className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-xl hover:bg-red-50 transition-colors"
            >
              Calculate My Debt Plan ?
            </a>
            <a
              href="/learn/credit-cards/balance-transfer"
              className="inline-block bg-red-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-800 transition-colors"
            >
              Learn Balance Transfer
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default MinimumVsFullPayment;
