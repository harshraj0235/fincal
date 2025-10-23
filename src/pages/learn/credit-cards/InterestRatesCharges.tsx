import React from 'react';
import { TrendingUp, AlertCircle, DollarSign, CheckCircle, Calculator, CreditCard } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const InterestRatesCharges: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card Interest Rates & Charges Explained - Hidden Fees Guide 2024 | MoneyCal"
        description="Complete breakdown of credit card interest rates (36-42% APR), late fees, processing fees, GST and hidden charges. Learn how interest is calculated and avoid costly mistakes."
        keywords="credit card interest rate, credit card charges, credit card fees, APR calculation, late payment fees, credit card hidden charges, finance charges"
        canonicalUrl="https://moneycal.in/learn/credit-cards/interest-rates-charges"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Card Interest Rates & All Charges Explained',
          description: 'Comprehensive guide to understanding credit card interest rates, finance charges, late fees, and all hidden costs.',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          },
          publisher: {
            '@type': 'Organization',
            name: 'MoneyCal'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="interest-rates-charges"
        breadcrumb={['Learn', 'Credit Cards', 'Interest Rates & Charges']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Critical Financial Knowledge!</h3>
              <p className="text-gray-700">
                Credit card interest rates are the HIGHEST in India (36-42% per year)! Understanding all charges can save you lakhs. 
                This comprehensive guide reveals every fee and how to avoid them! 💰⚠️
              </p>
            </div>
          </div>
        </div>

        {/* Main Interest Rate Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Card Interest Rates (ब्याज दरें)
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-400 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">The Shocking Truth: 36-42% Per Year!</h3>
            
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <p className="text-lg text-gray-800 mb-3">
                  <strong>Annual Percentage Rate (APR):</strong> The yearly interest rate charged on unpaid credit card balances.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded">
                    <p className="font-semibold text-gray-900 mb-2">Typical Rates in India:</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Public Sector Banks: 36-40% p.a.</li>
                      <li>• Private Banks: 38-42% p.a.</li>
                      <li>• Premium Cards: 30-36% p.a.</li>
                      <li>• Monthly Rate: 3-3.5%</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded">
                    <p className="font-semibold text-gray-900 mb-2">Common Examples:</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• SBI Cards: 40.92% p.a. (3.41% monthly)</li>
                      <li>• HDFC Cards: 42% p.a. (3.5% monthly)</li>
                      <li>• ICICI Cards: 40.8% p.a. (3.4% monthly)</li>
                      <li>• Axis Cards: 42% p.a. (3.5% monthly)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-400">
                <p className="font-bold text-gray-900 mb-2">⚠️ Why So High?</p>
                <p className="text-gray-700 text-sm">
                  Credit cards are <strong>unsecured loans</strong> (no collateral). Banks charge premium rates to cover risk of defaults. 
                  Compare this to: Home Loans (8-9%), Personal Loans (11-15%), Gold Loans (7-12%).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Interest is Calculated */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How Credit Card Interest is Calculated (गणना कैसे होती है)
          </h2>

          <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">Step-by-Step Calculation:</h3>

            <div className="space-y-6">
              <div className="bg-blue-50 p-5 rounded-lg">
                <p className="font-bold text-gray-900 mb-3">The Formula:</p>
                <div className="bg-white p-4 rounded border-2 border-blue-400 text-center">
                  <p className="text-sm text-gray-600 mb-2">Monthly Interest</p>
                  <p className="text-xl font-mono font-bold text-gray-900">
                    = Outstanding Balance × Monthly Interest Rate
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    (Monthly Rate = Annual Rate ÷ 12)
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-400 rounded-xl p-5">
                <h4 className="font-bold text-lg text-gray-900 mb-4">Real Example: Rahul's Bill</h4>
                
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded border-2 border-gray-300">
                    <p className="font-semibold text-gray-900 mb-2">Given Data:</p>
                    <div className="space-y-1 text-gray-700">
                      <p>• Total bill amount: ₹50,000</p>
                      <p>• Annual interest rate: 42% (3.5% monthly)</p>
                      <p>• Bill date: 1st January</p>
                      <p>• Due date: 20th January</p>
                      <p>• Rahul pays: ₹20,000 on due date</p>
                      <p>• Remaining: ₹30,000</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded">
                    <p className="font-semibold text-gray-900 mb-2">Step 1: Calculate Monthly Rate</p>
                    <p className="text-sm text-gray-700">
                      Annual Rate: 42% ÷ 12 months = <strong className="text-blue-700">3.5% per month</strong>
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded">
                    <p className="font-semibold text-gray-900 mb-2">Step 2: Calculate Interest on Unpaid Amount</p>
                    <p className="text-sm text-gray-700">
                      ₹30,000 (unpaid) × 3.5% = <strong className="text-purple-700">₹1,050</strong>
                    </p>
                  </div>

                  <div className="bg-red-100 p-4 rounded border-2 border-red-400">
                    <p className="font-semibold text-red-900 mb-2">Step 3: Next Month's Bill</p>
                    <div className="space-y-1 text-sm text-gray-800">
                      <p>Previous balance: ₹30,000</p>
                      <p>Interest charged: + ₹1,050</p>
                      <p>New purchases (if any): + ₹0</p>
                      <p className="font-bold text-red-700 text-lg mt-2 pt-2 border-t-2 border-red-500">
                        February Bill = ₹31,050
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-100 p-4 rounded border-2 border-yellow-400">
                    <p className="font-bold text-gray-900 mb-2">⚠️ Important Notes:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Interest calculated from the date of purchase (not due date!)</li>
                      <li>• Each purchase accrues interest daily until fully paid</li>
                      <li>• No interest-free period once you carry a balance</li>
                      <li>• Interest on interest (compound effect) makes debt grow exponentially</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Charges & Fees */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Complete List of Credit Card Charges (सभी शुल्क)
          </h2>

          <div className="space-y-4">
            {/* 1. Late Payment Fee */}
            <div className="bg-white border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-red-700 text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Late Payment Fee (विलंब शुल्क)</h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                Charged when you miss the payment due date or pay less than minimum due.
              </p>

              <div className="bg-red-50 p-4 rounded-lg mb-3">
                <p className="font-semibold text-gray-900 mb-2">Fee Structure (Varies by Outstanding):</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center bg-white p-2 rounded">
                    <span className="text-gray-700">Outstanding: Up to ₹5,000</span>
                    <span className="font-bold text-red-700">₹500</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded">
                    <span className="text-gray-700">Outstanding: ₹5,001 - ₹10,000</span>
                    <span className="font-bold text-red-700">₹750</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded">
                    <span className="text-gray-700">Outstanding: ₹10,001 - ₹25,000</span>
                    <span className="font-bold text-red-700">₹950</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded">
                    <span className="text-gray-700">Outstanding: ₹25,001 - ₹50,000</span>
                    <span className="font-bold text-red-700">₹1,200</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded">
                    <span className="text-gray-700">Outstanding: Above ₹50,000</span>
                    <span className="font-bold text-red-700">₹1,500</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 p-3 rounded">
                <p className="text-sm text-gray-800">
                  <strong>💡 Impact:</strong> Late payment fee + interest charges + CIBIL score drop of 50-100 points!
                </p>
              </div>
            </div>

            {/* 2. Annual/Joining Fee */}
            <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-purple-700 text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Annual & Joining Fees</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Joining Fee:</p>
                  <p className="text-sm text-gray-700 mb-2">One-time fee when you get the card</p>
                  <p className="font-bold text-purple-700">Range: ₹0 - ₹10,000</p>
                  <p className="text-xs text-gray-600 mt-2">Many cards waive this for first year</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Annual Fee:</p>
                  <p className="text-sm text-gray-700 mb-2">Yearly charge to keep card active</p>
                  <p className="font-bold text-pink-700">Range: ₹0 - ₹50,000</p>
                  <p className="text-xs text-gray-600 mt-2">Can be waived with spend targets</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-3">Examples by Card Type:</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">Lifetime Free Cards (Flipkart Axis, Amazon Pay)</span>
                    <span className="font-bold text-green-700">₹0</span>
                  </div>
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">Entry-Level Cards (SBI SimplyCLICK)</span>
                    <span className="font-bold text-gray-900">₹499</span>
                  </div>
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">Mid-Range (HDFC Millennia, Regalia)</span>
                    <span className="font-bold text-gray-900">₹1,000-2,500</span>
                  </div>
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">Premium (Axis Magnus, HDFC Diners Black)</span>
                    <span className="font-bold text-gray-900">₹5,000-10,000</span>
                  </div>
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">Super Premium (HDFC Infinia, Amex Platinum)</span>
                    <span className="font-bold text-red-700">₹10,000-50,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 p-3 rounded border-2 border-green-400">
                <p className="font-bold text-gray-900 mb-2">💡 How to Get Fee Waived:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Meet annual spend target (typically ₹1-5 lakhs depending on card)</li>
                  <li>✓ Maintain minimum balance in savings account (for some bank cards)</li>
                  <li>✓ Call customer care and negotiate (works 50% of time!)</li>
                  <li>✓ Threaten to close card if you're good customer (last resort)</li>
                </ul>
              </div>
            </div>

            {/* 3. Processing Fee */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-orange-700 text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Processing & Service Fees</h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-3">Common Service Charges:</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-3 rounded border border-orange-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Cash Withdrawal (ATM)</p>
                          <p className="text-xs text-gray-600">Advance against credit limit</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-700">2.5-3%</p>
                          <p className="text-xs text-gray-600">(Min ₹250-500)</p>
                        </div>
                      </div>
                      <p className="text-xs text-red-600 mt-2">
                        ⚠️ PLUS 42% interest from day 1 (no free period!)
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded border border-orange-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Over-Limit Fee</p>
                          <p className="text-xs text-gray-600">Spending beyond credit limit</p>
                        </div>
                        <p className="font-bold text-orange-700">₹500-600</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border border-orange-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Cheque Bounce/Return</p>
                          <p className="text-xs text-gray-600">Insufficient balance for auto-pay</p>
                        </div>
                        <p className="font-bold text-orange-700">₹500-750</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border border-orange-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Duplicate Statement</p>
                          <p className="text-xs text-gray-600">Physical copy requested</p>
                        </div>
                        <p className="font-bold text-orange-700">₹50-100</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border border-orange-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Card Replacement</p>
                          <p className="text-xs text-gray-600">Lost/damaged card</p>
                        </div>
                        <p className="font-bold text-orange-700">₹100-200</p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border border-orange-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Foreign Currency Markup</p>
                          <p className="text-xs text-gray-600">International transactions</p>
                        </div>
                        <p className="font-bold text-orange-700">3-3.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. GST on Charges */}
            <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-blue-700 text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">GST on Credit Card Charges</h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                <strong>18% GST</strong> is charged on most credit card fees (not on interest though!)
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-3">GST Applicable On:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 text-sm mb-1">Annual Fee:</p>
                    <p className="text-xs text-gray-700">₹1,000 + ₹180 GST = ₹1,180</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 text-sm mb-1">Late Payment Fee:</p>
                    <p className="text-xs text-gray-700">₹750 + ₹135 GST = ₹885</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 text-sm mb-1">Cash Advance Fee:</p>
                    <p className="text-xs text-gray-700">₹500 + ₹90 GST = ₹590</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 text-sm mb-1">Over-Limit Fee:</p>
                    <p className="text-xs text-gray-700">₹500 + ₹90 GST = ₹590</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 p-3 rounded mt-3">
                <p className="text-sm text-gray-800">
                  <strong>✅ Good News:</strong> Interest charges (42% APR) are NOT subject to GST!
                </p>
              </div>
            </div>

            {/* 5. EMI Processing Fee */}
            <div className="bg-white border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-green-700 text-xl">5</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">EMI Conversion Charges</h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                When you convert purchases to EMI, banks charge interest + processing fee.
              </p>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-3">EMI Charges:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Processing Fee: ₹99-499 per transaction</p>
                  <p>• Interest Rate: 13-18% per annum (lower than 42% on revolving!)</p>
                  <p>• Tenure: 3-24 months typically</p>
                  <p>• GST: 18% on processing fee</p>
                </div>

                <div className="bg-white p-3 rounded border-2 border-green-400 mt-3">
                  <p className="font-bold text-gray-900 text-sm mb-2">Example:</p>
                  <p className="text-xs text-gray-700">Purchase: ₹30,000 laptop</p>
                  <p className="text-xs text-gray-700">Convert to 12-month EMI @ 15%</p>
                  <p className="text-xs text-gray-700">Processing fee: ₹199 + ₹36 GST</p>
                  <p className="text-xs text-gray-700">Monthly EMI: ₹2,705</p>
                  <p className="text-xs font-bold text-green-700 mt-2">
                    Still better than 42% if you can't pay in full!
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                Learn more: <a href="/learn/credit-cards/emi-on-credit-card" className="text-blue-600 hover:underline">EMI on Credit Card Guide</a>
              </p>
            </div>

            {/* 6. Cash Advance Charges */}
            <div className="bg-white border-2 border-yellow-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-yellow-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-yellow-700 text-xl">6</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cash Advance (ATM Withdrawal)</h3>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-400">
                <p className="font-bold text-red-900 mb-3">⚠️ MOST EXPENSIVE Feature!</p>
                <p className="text-sm text-gray-700 mb-3">
                  Withdrawing cash from credit card is extremely costly - avoid unless absolute emergency!
                </p>

                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 mb-1">Charges:</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Cash advance fee: 2.5-3% of amount (minimum ₹250-500)</li>
                      <li>• Interest: 42% p.a. from DAY 1 (no free period!)</li>
                      <li>• GST: 18% on advance fee</li>
                    </ul>
                  </div>

                  <div className="bg-red-100 p-3 rounded border-2 border-red-300">
                    <p className="font-bold text-red-900 mb-2">Example: Withdraw ₹10,000</p>
                    <p className="text-xs text-gray-800">Cash advance fee (2.5%): ₹250</p>
                    <p className="text-xs text-gray-800">GST (18%): ₹45</p>
                    <p className="text-xs text-gray-800">Interest for 30 days (3.5%): ₹350</p>
                    <p className="font-bold text-red-700 text-sm mt-2">
                      Total Cost: ₹645 to borrow ₹10K for 1 month! (6.45%!)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 p-3 rounded mt-3">
                <p className="text-sm text-gray-800">
                  <strong>✅ Better Alternative:</strong> Use debit card, personal loan, or even gold loan (7-12%) instead!
                </p>
              </div>
            </div>

            {/* 7. Fuel Surcharge */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-orange-700 text-xl">7</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fuel Surcharge</h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                Petrol pumps charge 1% extra when you pay by credit card (to cover merchant fees).
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-300">
                  <p className="font-bold text-red-900 mb-2">❌ Regular Cards:</p>
                  <p className="text-sm text-gray-700">You pay the 1% surcharge</p>
                  <p className="text-xs text-gray-600 mt-2">
                    ₹1,000 fuel = ₹1,010 charged (₹10 extra!)
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-300">
                  <p className="font-bold text-green-900 mb-2">✅ Fuel Cards:</p>
                  <p className="text-sm text-gray-700">Surcharge waived on transactions ₹400+</p>
                  <p className="text-xs text-gray-600 mt-2">
                    ₹1,000 fuel = ₹1,000 only (save ₹10!)
                  </p>
                </div>
              </div>

              <div className="bg-orange-100 p-3 rounded mt-3">
                <p className="text-sm text-gray-800">
                  <strong>💡 Annual Savings:</strong> If you spend ₹60,000/year on fuel, fuel card saves ₹600 in surcharge + ₹2,400 in cashback = ₹3,000 total!
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                Learn more: <a href="/learn/credit-cards/types-of-credit-cards" className="text-blue-600 hover:underline">Fuel Credit Cards Guide</a>
              </p>
            </div>

            {/* 8. Balance Transfer Fee */}
            <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-purple-700 text-xl">8</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Balance Transfer Processing Fee</h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                Fee charged when you transfer debt from one card to another (usually for lower interest rate).
              </p>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-3">Typical Charges:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Processing Fee: 1-3% of transferred amount</p>
                  <p>• Minimum: ₹199-500</p>
                  <p>• GST: 18% on processing fee</p>
                  <p>• Interest Rate: 0-15% for 6-12 months (promotional)</p>
                </div>

                <div className="bg-white p-3 rounded border-2 border-purple-400 mt-3">
                  <p className="font-bold text-gray-900 text-sm mb-2">Example:</p>
                  <p className="text-xs text-gray-700">Transfer ₹1,00,000 @ 2% processing fee</p>
                  <p className="text-xs text-gray-700">Fee: ₹2,000 + ₹360 GST = ₹2,360</p>
                  <p className="text-xs text-gray-700">Interest: 0% for 12 months</p>
                  <p className="text-xs font-bold text-purple-700 mt-2">
                    Pay ₹8,333/month for 12 months = Clear debt!
                  </p>
                  <p className="text-xs font-bold text-green-700">
                    vs paying 42% = Save ₹20,000+ in interest!
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                Learn more: <a href="/learn/credit-cards/balance-transfer" className="text-blue-600 hover:underline">Balance Transfer Complete Guide</a>
              </p>
            </div>
          </div>
        </section>

        {/* Comparison with Other Loans */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Card vs Other Loan Interest Rates
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Loan Type</th>
                  <th className="border border-gray-300 p-3">Interest Rate (p.a.)</th>
                  <th className="border border-gray-300 p-3">EMI on ₹1L for 1 year</th>
                  <th className="border border-gray-300 p-3">Total Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-100">
                  <td className="border border-gray-300 p-3 font-semibold">Home Loan ✅</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">8-9%</td>
                  <td className="border border-gray-300 p-3 text-center">₹8,699</td>
                  <td className="border border-gray-300 p-3 text-center">₹4,388</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Gold Loan</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700">10-12%</td>
                  <td className="border border-gray-300 p-3 text-center">₹8,885</td>
                  <td className="border border-gray-300 p-3 text-center">₹6,620</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Personal Loan</td>
                  <td className="border border-gray-300 p-3 text-center text-yellow-700">13-15%</td>
                  <td className="border border-gray-300 p-3 text-center">₹9,025</td>
                  <td className="border border-gray-300 p-3 text-center">₹8,300</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Car Loan</td>
                  <td className="border border-gray-300 p-3 text-center text-yellow-700">9-11%</td>
                  <td className="border border-gray-300 p-3 text-center">₹8,792</td>
                  <td className="border border-gray-300 p-3 text-center">₹5,504</td>
                </tr>
                <tr className="bg-red-100">
                  <td className="border border-gray-300 p-3 font-semibold">Credit Card ❌</td>
                  <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">36-42%</td>
                  <td className="border border-gray-300 p-3 text-center font-bold">₹9,201</td>
                  <td className="border border-gray-300 p-3 text-center font-bold text-red-700">₹10,412</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
            <p className="font-bold text-red-900 mb-2 text-lg">😱 Shocking Reality:</p>
            <p className="text-gray-800">
              Credit card interest is <strong>4-5X more expensive</strong> than home loans and <strong>3X more</strong> than personal loans!
              This is why paying FULL bill every month is absolutely critical!
            </p>
          </div>
        </section>

        {/* How to Avoid All Charges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Avoid ALL Charges (शून्य शुल्क कैसे रखें)
          </h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-4">✅ The Zero-Fee Strategy:</h3>

              <div className="space-y-3">
                <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">1. ALWAYS Pay Full Bill Before Due Date</p>
                    <p className="text-sm text-gray-700">
                      This alone saves you from 42% interest + maintains free credit period. Set auto-pay!
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">2. Meet Annual Spend Target</p>
                    <p className="text-sm text-gray-700">
                      Most cards waive annual fee if you spend ₹1-5 lakhs per year. Plan purchases accordingly!
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">3. Never Withdraw Cash</p>
                    <p className="text-sm text-gray-700">
                      Use debit card for cash needs. Credit card cash withdrawal costs 2.5% fee + 42% interest from day 1!
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">4. Stay Within Credit Limit</p>
                    <p className="text-sm text-gray-700">
                      Track spending weekly. Going over limit costs ₹500-600 penalty!
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">5. Choose Lifetime Free Cards Initially</p>
                    <p className="text-sm text-gray-700">
                      Flipkart Axis, Amazon Pay ICICI, SBI SimplySAVE - ₹0 fee forever!
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">6. Use E-Statement (Not Physical)</p>
                    <p className="text-sm text-gray-700">
                      Physical statements cost ₹50-100. Email statements are free!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RBI Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            RBI Guidelines on Credit Card Charges
          </h2>

          <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              Reserve Bank of India (RBI) has set regulations to protect consumers from excessive charges.
            </p>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">✅ RBI Mandates:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Banks must disclose APR clearly in agreement</li>
                  <li>• Interest-free period must be minimum 20 days</li>
                  <li>• Charges must be prominently displayed on statement</li>
                  <li>• Customer must receive SMS alert for every charge</li>
                  <li>• Banks cannot charge interest on fees (only on purchases/cash advance)</li>
                </ul>
              </div>

              <div className="bg-blue-100 p-3 rounded">
                <p className="text-sm text-gray-800">
                  <strong>🔗 Official Source:</strong> <a href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11445" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">RBI Master Direction on Credit Card Operations</a>
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
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-red-200">
                <p className="font-semibold text-red-600 mb-1">Minimum Payment Trap</p>
                <p className="text-sm text-gray-600">Why 42% interest destroys finances</p>
              </a>
              <a href="/learn/credit-cards/billing-cycle" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Billing Cycle Guide</p>
                <p className="text-sm text-gray-600">Understand when interest kicks in</p>
              </a>
              <a href="/learn/credit-cards/statement-guide" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Read Your Statement</p>
                <p className="text-sm text-gray-600">Identify all charges clearly</p>
              </a>
              <a href="/tools/debt-payoff-calculator" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Debt Calculator</p>
                <p className="text-sm text-gray-600">Calculate interest impact</p>
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
              <span className="text-gray-800">Credit card interest: 36-42% per year (3-3.5% monthly) - HIGHEST in India!</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Main charges: Late fee (₹500-1,500), Annual fee (₹0-50K), Cash advance (2.5%+42% interest)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">18% GST applicable on most fees (not on interest)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">ALWAYS pay full bill to avoid 42% interest - this is the golden rule!</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Cash withdrawal most expensive: 2.5% fee + 42% interest from day 1 (total 6%+ for 1 month!)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Use fuel cards to save 1% surcharge + get extra cashback (₹3,000/year savings)</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: Understand Your Statement! 📋</h2>
          <p className="text-red-100 mb-6">
            Learn to read your credit card statement to spot all charges and track your spending effectively!
          </p>
          <a
            href="/learn/credit-cards/statement-guide"
            className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-xl hover:bg-red-50 transition-colors"
          >
            Next: Statement Reading Guide →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default InterestRatesCharges;
