import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, IndianRupee } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const InterestRatesExplained: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Home Loan Interest Rates Explained: How They Work in India 2025"
        description="Understand home loan interest rates in India - how they're calculated, what affects them, current rates, and how to get the best deal. Save lakhs with this guide!"
        keywords="home loan interest rate, home loan rates India, best home loan rates, interest rate calculation, repo rate, MCLR, home loan interest"
        canonicalUrl="/learn/home-loans/interest-rates-explained"
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="interest-rates-explained"
        breadcrumb={['Learn', 'Home Loans', 'Interest Rates']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <TrendingUp className="h-6 w-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why Interest Rates Are Critical</h3>
              <p className="text-gray-700">
                Just 0.5% difference in interest rate can save/cost you ₹5-7 LAKHS over 20 years! Understanding rates is the key to massive savings! 💰
              </p>
            </div>
          </div>
        </div>

        {/* What is Interest Rate */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Home Loan Interest Rate?</h2>
          
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-800 mb-4">
              <strong>Interest rate</strong> is the cost you pay to the bank for borrowing money, expressed as a percentage per year.
            </p>
            
            <div className="bg-white border-2 border-blue-400 rounded-lg p-5">
              <h4 className="font-bold text-blue-900 mb-3">Simple Explanation:</h4>
              <p className="text-gray-800 text-lg">
                Borrow ₹40 lakhs at <strong>8.5% interest</strong> = You pay ₹3.4 lakhs per year just as interest cost (₹28,333/month)!
              </p>
            </div>
          </div>

          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-yellow-900 mb-4">Real Impact Example:</h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-800"><strong>Loan Amount:</strong> ₹40,00,000</p>
                <p className="text-gray-800"><strong>Tenure:</strong> 20 years</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded border border-red-300">
                    <span className="font-semibold">At 9.0% rate:</span>
                    <div className="text-right">
                      <p className="font-bold text-xl">₹35,997/mo</p>
                      <p className="text-sm text-gray-600">Total paid: ₹86.39L</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-300">
                    <span className="font-semibold">At 8.5% rate:</span>
                    <div className="text-right">
                      <p className="font-bold text-xl">₹34,604/mo</p>
                      <p className="text-sm text-gray-600">Total paid: ₹83.05L</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-100 rounded border-2 border-blue-500 mt-3">
                    <span className="font-bold text-lg">Savings with 0.5% lower rate:</span>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-green-700">₹3.34 Lakhs! 🎉</p>
                      <p className="text-sm text-gray-600">Just for negotiating 0.5%!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Rates in India */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Home Loan Rates in India (2025)</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Bank/Lender</th>
                  <th className="border border-gray-300 p-3 text-left">Interest Rate</th>
                  <th className="border border-gray-300 p-3 text-left">Type</th>
                  <th className="border border-gray-300 p-3 text-left">Special Offers</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-3 font-bold">SBI</td>
                  <td className="border border-gray-300 p-3">8.50% - 9.65%</td>
                  <td className="border border-gray-300 p-3">Floating</td>
                  <td className="border border-gray-300 p-3 text-sm">Women: 8.45%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">HDFC</td>
                  <td className="border border-gray-300 p-3">8.60% - 9.50%</td>
                  <td className="border border-gray-300 p-3">Floating</td>
                  <td className="border border-gray-300 p-3 text-sm">CIBIL 750+: 8.55%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">ICICI</td>
                  <td className="border border-gray-300 p-3">8.70% - 9.45%</td>
                  <td className="border border-gray-300 p-3">Floating</td>
                  <td className="border border-gray-300 p-3 text-sm">PSU employees: 8.65%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">Axis Bank</td>
                  <td className="border border-gray-300 p-3">8.75% - 9.60%</td>
                  <td className="border border-gray-300 p-3">Floating</td>
                  <td className="border border-gray-300 p-3 text-sm">-</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">LIC Housing</td>
                  <td className="border border-gray-300 p-3">8.40% - 9.30%</td>
                  <td className="border border-gray-300 p-3">Floating</td>
                  <td className="border border-gray-300 p-3 text-sm text-green-700 font-semibold">Lowest rate!</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5 mt-6">
            <p className="text-gray-800">
              <strong>Note:</strong> Rates updated as of January 2025. Actual rate depends on your CIBIL score, income, loan amount, and LTV ratio. Always compare 4-5 banks before deciding!
            </p>
          </div>
        </section>

        {/* How Banks Set Rates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Do Banks Decide Your Interest Rate?</h2>
          
          <div className="space-y-6">
            {/* Base Rate Components */}
            <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Step 1: Bank's Base Rate (MCLR or Repo-Linked)</h3>
              <p className="text-gray-700 mb-4">
                Banks start with a <strong>base rate</strong> set by RBI (Reserve Bank of India). Two main types:
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">1. MCLR (Marginal Cost of Funds based Lending Rate)</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Bank's internal cost of borrowing money</li>
                    <li>Changes quarterly (every 3 months)</li>
                    <li>Current average: 8.30-8.75%</li>
                    <li>More stable, less volatile</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">2. Repo-Linked Rate (External Benchmark)</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Directly linked to RBI's repo rate</li>
                    <li>Changes immediately when RBI changes policy</li>
                    <li>Current RBI Repo Rate: 6.50%</li>
                    <li>More dynamic, reflects economy faster</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Spread/Margin */}
            <div className="bg-white border-2 border-orange-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Step 2: Bank Adds "Spread" (Their Profit Margin)</h3>
              <p className="text-gray-700 mb-4">
                Banks add 1.50%-2.50% on top of base rate as their profit. This is called <strong>"spread"</strong>.
              </p>
              
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Example Calculation:</h4>
                <div className="space-y-2 text-gray-800">
                  <div className="flex justify-between py-1">
                    <span>Base Rate (MCLR):</span>
                    <strong>8.50%</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>+ Bank's Spread:</span>
                    <strong>+ 2.00%</strong>
                  </div>
                  <div className="flex justify-between py-2 border-t-2 border-yellow-500 text-lg">
                    <span>= Your Interest Rate:</span>
                    <strong className="text-orange-700">10.50%</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-300 rounded p-3">
                <p className="text-sm text-gray-700">
                  <strong>Negotiation Tip:</strong> The "spread" is negotiable! With good CIBIL (750+), high income, you can negotiate 0.25-0.50% reduction in spread = big savings!
                </p>
              </div>
            </div>

            {/* Personal Factors */}
            <div className="bg-white border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Step 3: Adjustments Based on YOUR Profile</h3>
              <p className="text-gray-700 mb-4">
                Banks adjust final rate based on your risk profile:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2" />
                    Rate REDUCED if:
                  </h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>✅ CIBIL score 750+ (<strong>-0.25%</strong>)</li>
                    <li>✅ Woman applicant (<strong>-0.05-0.10%</strong>)</li>
                    <li>✅ Salaried, top company (<strong>-0.10%</strong>)</li>
                    <li>✅ Existing customer (<strong>-0.10-0.25%</strong>)</li>
                    <li>✅ High income (₹1L+/mo) (<strong>-0.15%</strong>)</li>
                    <li>✅ Low LTV (70% or less) (<strong>-0.10%</strong>)</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-2 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Rate INCREASED if:
                  </h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>❌ CIBIL below 700 (<strong>+0.50-1.00%</strong>)</li>
                    <li>❌ Self-employed (<strong>+0.25-0.50%</strong>)</li>
                    <li>❌ High LTV (85-90%) (<strong>+0.10-0.25%</strong>)</li>
                    <li>❌ Property in Tier-3 city (<strong>+0.15%</strong>)</li>
                    <li>❌ Under-construction property (<strong>+0.10%</strong>)</li>
                    <li>❌ Second/investment property (<strong>+0.50-1.00%</strong>)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Real Example:</h4>
                <div className="space-y-1 text-gray-800 text-sm">
                  <p>Base MCLR: 8.50%</p>
                  <p>Standard Spread: +2.00% = 10.50%</p>
                  <p className="text-green-700">✅ CIBIL 780: -0.25%</p>
                  <p className="text-green-700">✅ Woman applicant: -0.05%</p>
                  <p className="text-green-700">✅ Existing customer: -0.20%</p>
                  <p className="font-bold text-lg text-blue-700 pt-2 border-t-2 border-yellow-500">Final Rate: 10.00% (saved 0.50%!)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Factors Affecting Rates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">10 Factors That Affect Your Interest Rate</h2>
          
          <div className="space-y-4">
            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">1. CIBIL Score (Biggest Impact!)</h3>
                <p className="text-gray-700">750+: Best rates (8.5-8.75%). 700-749: +0.25-0.50%. Below 650: +1-2% or rejection!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">2. Loan Amount</h3>
                <p className="text-gray-700">₹50L+: Better rates (banks want big loans!). Below ₹15L: Higher rates (+0.25-0.50%)</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">3. Employment Type</h3>
                <p className="text-gray-700">Salaried (Govt/PSU/Top MNC): Best rates. Self-employed: +0.25-0.50% higher</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">4. LTV Ratio</h3>
                <p className="text-gray-700">Lower LTV = lower rate. 70% LTV: -0.10-0.15% vs 85-90% LTV</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">5. Property Type & Location</h3>
                <p className="text-gray-700">Ready, metro city: Best rates. Under-construction, Tier-3: +0.10-0.25% higher</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">6. Relationship with Bank</h3>
                <p className="text-gray-700">Existing customer with salary account: -0.10-0.25% discount! New customer: Standard rate</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">7. Gender</h3>
                <p className="text-gray-700">Women get -0.05-0.10% discount! Add wife as co-applicant to benefit</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">8. Income Level</h3>
                <p className="text-gray-700">₹1L+ monthly income: -0.15-0.25% discount. Higher income = lower risk for bank</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">9. Purpose of Loan</h3>
                <p className="text-gray-700">First home (self-occupied): Best rates. Investment/2nd property: +0.50-1.00% higher</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">10. RBI Policy</h3>
                <p className="text-gray-700">When RBI reduces repo rate, home loan rates go down (and vice versa). Track RBI announcements!</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Get Best Rate */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Get the BEST Interest Rate? 🎯</h2>
          
          <div className="space-y-4">
            <div className="flex items-start bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Improve CIBIL to 750+ (6 months before applying)</h3>
                <p className="text-gray-700">Pay credit cards on time, clear small dues, don't apply for multiple loans. This alone can save ₹5-7L!</p>
              </div>
            </div>

            <div className="flex items-start bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Compare 5-6 Banks (Mandatory!)</h3>
                <p className="text-gray-700">Don't go with first offer! Get quotes from SBI, HDFC, ICICI, LIC, Axis, Kotak. Play them against each other.</p>
              </div>
            </div>

            <div className="flex items-start bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Negotiate the "Spread"</h3>
                <p className="text-gray-700">Tell bank: "Bank X offering 0.25% less." They'll often match! Spread is negotiable, base rate is not.</p>
              </div>
            </div>

            <div className="flex items-start bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Add Woman Co-Applicant</h3>
                <p className="text-gray-700">Wife/mother/sister: -0.05-0.10% discount. Plus higher loan eligibility!</p>
              </div>
            </div>

            <div className="flex items-start bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Use Salary Account Bank</h3>
                <p className="text-gray-700">If salary in HDFC, apply to HDFC first. Existing customer discount: -0.10-0.25%</p>
              </div>
            </div>

            <div className="flex items-start bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Timing Matters</h3>
                <p className="text-gray-700">Apply during festive season (Diwali, year-end). Banks offer special rates -0.10-0.25% to meet targets!</p>
              </div>
            </div>

            <div className="flex items-start bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Pay Higher Down Payment (If Possible)</h3>
                <p className="text-gray-700">70% LTV vs 85-90% can get -0.10-0.15% discount. Only if you have spare cash!</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Can interest rate change during my loan period?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: YES, for floating rate loans (most common).</strong> Your rate changes when:<br/>
                • RBI changes repo rate<br/>
                • Bank changes MCLR (every quarter)<br/>
                <br/>
                <strong>Example:</strong> Started at 8.5% in 2023. RBI increased repo by 0.50%. Your rate became 9.0% in 2024.<br/>
                <br/>
                <strong>Fixed rate loans:</strong> Rate stays same for 2-5 years, then converts to floating. We'll cover this in next lesson!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Is MCLR or Repo-linked rate better?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Repo-linked is USUALLY better!</strong><br/>
                <br/>
                <strong>Repo-linked pros:</strong><br/>
                • Changes immediately when RBI cuts rates (instant benefit!)<br/>
                • More transparent<br/>
                • Usually 0.10-0.15% lower than MCLR<br/>
                <br/>
                <strong>MCLR pros:</strong><br/>
                • More stable (changes quarterly, not monthly)<br/>
                • Less volatile<br/>
                <br/>
                <strong>Bottom line:</strong> For most people, repo-linked is better. You benefit faster when rates fall!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: How much can I negotiate on interest rate?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: 0.25-0.50% realistically</strong> (sometimes up to 0.75% with perfect profile).<br/>
                <br/>
                <strong>Negotiation power depends on:</strong><br/>
                • CIBIL 780+: Strong negotiation (can ask -0.50%)<br/>
                • High income (₹1.5L+/mo): Ask -0.25-0.40%<br/>
                • Large loan (₹75L+): Ask -0.25-0.50%<br/>
                • Competing offers: Show quotes from 2-3 banks<br/>
                <br/>
                <strong>Real savings:</strong> 0.50% negotiation on ₹40L loan = saves ₹3.5L over 20 years! Worth 2-3 hours of effort!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Should I go for lowest rate without comparing other factors?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: NO! Rate isn't everything!</strong><br/>
                <br/>
                <strong>Also compare:</strong><br/>
                • Processing fees (0.25-1% of loan = ₹40K-4L!)<br/>
                • Prepayment charges (some charge 2-4% penalty)<br/>
                • Loan tenure flexibility<br/>
                • Customer service (important for 20 years!)<br/>
                • Hidden charges (legal, valuation, insurance)<br/>
                <br/>
                <strong>Example:</strong><br/>
                Bank A: 8.50% rate, ₹80K processing, 3% prepayment penalty<br/>
                Bank B: 8.60% rate, ₹20K processing, NO prepayment penalty<br/>
                <br/>
                Bank B might be better if you plan to prepay in 5-7 years!
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
                <span className="text-gray-800">0.5% rate difference = ₹3-5 lakhs saved over 20 years. Always negotiate!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Current rates: 8.40-9.65%. CIBIL 750+ gets best rates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Rate = Base Rate (MCLR/Repo) + Spread (bank's profit) + Personal adjustments</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Repo-linked rates usually better than MCLR (faster to benefit from rate cuts)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Women applicants get 0.05-0.10% discount automatically</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Compare 5+ banks, get quotes in writing, negotiate spread by 0.25-0.50%</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Fixed vs Floating: Which to Choose? 🤔</h2>
          <p className="text-blue-100 mb-6">
            Now that you understand interest rates, let's decide between fixed and floating rate loans!
          </p>
          <a
            href="/learn/home-loans/fixed-vs-floating"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Fixed vs Floating Rates →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default InterestRatesExplained;



