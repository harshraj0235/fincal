import React from 'react';
import { Calculator, CheckCircle, AlertCircle, TrendingDown, DollarSign, CreditCard } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const EmiOnCreditCard: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="EMI on Credit Card - Complete Guide 2024 | Save vs 42% Interest | MoneyCal"
        description="Complete guide to EMI on credit card in India. Convert purchases to EMI at 13-18% vs 42% revolving interest. Calculate savings, eligibility, process and best practices."
        keywords="EMI on credit card, credit card EMI, convert to EMI, EMI interest rate, no cost EMI, credit card installment"
        canonicalUrl="https://moneycal.in/learn/credit-cards/emi-on-credit-card"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'EMI on Credit Card - Complete Guide to Save on Interest',
          description: 'Learn how to convert credit card purchases to EMI and save on interest charges',
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
        currentLesson="emi-on-credit-card"
        breadcrumb={['Learn', 'Credit Cards', 'EMI on Credit Card']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Calculator className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Convert to EMI - Save on 42% Interest!</h3>
          <p className="text-gray-700">
                Can't pay full bill? Convert to EMI at 13-18% instead of paying 42% revolving interest! 
                This guide shows when to use EMI, how to convert, and real savings calculations. 💰📊
          </p>
            </div>
          </div>
        </div>

        {/* What is EMI on Credit Card */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What is EMI on Credit Card? (क्रेडिट कार्ड ईएमआई क्या है?)
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Simple Definition:</h3>
            
            <div className="bg-white p-5 rounded-lg border-2 border-purple-300 mb-4">
              <p className="text-lg text-gray-800 mb-3">
                <strong>EMI on Credit Card</strong> = Converting a purchase or outstanding balance into fixed monthly installments 
                at a lower interest rate (13-18%) instead of paying 42% revolving interest.
              </p>
              
              <div className="bg-purple-50 p-4 rounded">
                <p className="font-bold text-gray-900 mb-2">Real Example:</p>
                <p className="text-sm text-gray-700">
                  Bought ₹50,000 phone → Can't pay full → Convert to 12-month EMI @ 15% → 
                  Pay ₹4,500/month instead of ₹50K at once or paying 42% interest!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-bold text-green-900 mb-2">✅ Advantages:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Much lower interest (13-18% vs 42%)</li>
                  <li>• Fixed monthly payment</li>
                  <li>• Clear debt timeline</li>
                  <li>• Budget-friendly installments</li>
                  <li>• No cost EMI options available</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-bold text-red-900 mb-2">❌ Disadvantages:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Processing fee (₹99-499)</li>
                  <li>• Credit limit blocked for EMI amount</li>
                  <li>• Prepayment charges may apply</li>
                  <li>• Still interest (13-18%)</li>
                  <li>• GST on processing fee (18%)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Types of EMI */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            3 Types of Credit Card EMI (ईएमआई के प्रकार)
          </h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-5 rounded-lg text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">1. No Cost EMI (सबसे लोकप्रिय)</h3>
                  <p className="text-sm text-green-100">Zero interest - Merchant pays!</p>
                </div>
                <span className="bg-white text-green-700 px-4 py-2 rounded-full font-bold">Best Deal</span>
              </div>
              <div className="bg-white p-4 rounded text-gray-700">
                <p className="font-semibold text-gray-900 mb-2">How It Works:</p>
                <ul className="text-sm space-y-1">
                  <li>• Product price: ₹30,000</li>
                  <li>• Interest: 0% (merchant absorbs cost)</li>
                  <li>• Processing fee: Usually waived</li>
                  <li>• Tenure: 3-12 months</li>
                  <li>• Monthly EMI: ₹30,000 ÷ 12 = <strong className="text-green-700">₹2,500</strong></li>
                </ul>
                <div className="bg-green-100 p-2 rounded mt-2 text-xs">
                  <p className="text-green-800 font-bold">✅ Best Option: No extra cost, just pay in installments!</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-5 rounded-lg text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">2. Standard EMI (Regular)</h3>
                  <p className="text-sm text-blue-100">Interest charged but lower than 42%</p>
                </div>
                <span className="bg-white text-blue-700 px-4 py-2 rounded-full font-bold">Better than Revolving</span>
              </div>
              <div className="bg-white p-4 rounded text-gray-700">
                <p className="font-semibold text-gray-900 mb-2">How It Works:</p>
                <ul className="text-sm space-y-1">
                  <li>• Product price: ₹50,000</li>
                  <li>• Interest: 15% per annum</li>
                  <li>• Processing fee: ₹199 + ₹36 GST</li>
                  <li>• Tenure: 12 months</li>
                  <li>• Monthly EMI: <strong className="text-blue-700">₹4,509</strong></li>
                  <li>• Total interest: ₹4,108</li>
                </ul>
                <div className="bg-blue-100 p-2 rounded mt-2 text-xs">
                  <p className="text-blue-800 font-bold">✅ Still better than 42% revolving interest!</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-5 rounded-lg text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">3. Balance Conversion EMI</h3>
                  <p className="text-sm text-purple-100">Convert existing balance to EMI</p>
                </div>
                <span className="bg-white text-purple-700 px-4 py-2 rounded-full font-bold">Debt Relief</span>
              </div>
              <div className="bg-white p-4 rounded text-gray-700">
                <p className="font-semibold text-gray-900 mb-2">How It Works:</p>
                <ul className="text-sm space-y-1">
                  <li>• Outstanding balance: ₹1,00,000</li>
                  <li>• Interest: 18% per annum</li>
                  <li>• Processing fee: ₹999</li>
                  <li>• Tenure: 12-24 months</li>
                  <li>• Monthly EMI: <strong className="text-purple-700">₹9,168</strong> (for 12 months)</li>
                </ul>
                <div className="bg-purple-100 p-2 rounded mt-2 text-xs">
                  <p className="text-purple-800 font-bold">✅ Avoid 42% interest trap, clear debt systematically!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Savings Calculation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            EMI vs Revolving Interest - Savings Calculation
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Real Example: ₹50,000 Purchase</h3>

            <div className="space-y-4">
              <div className="bg-red-50 p-5 rounded-lg border-2 border-red-400">
                <h4 className="font-bold text-red-900 mb-3">❌ Option 1: Pay Minimum (Revolving Credit)</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded text-sm">
                    <p className="text-gray-700">Amount: ₹50,000</p>
                    <p className="text-gray-700">Interest: 42% p.a. (3.5% monthly)</p>
                    <p className="text-gray-700">Minimum payment: ₹2,500/month</p>
                  </div>
                  <div className="bg-white p-3 rounded text-sm">
                    <p className="text-gray-700">Time to clear: <strong className="text-red-700">4+ years</strong></p>
                    <p className="text-gray-700">Total interest: <strong className="text-red-700">₹67,000+</strong></p>
                    <p className="text-gray-700">Total paid: <strong className="text-red-700">₹1,17,000</strong></p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-400">
                <h4 className="font-bold text-green-900 mb-3">✅ Option 2: Convert to 12-Month EMI @ 15%</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded text-sm">
                    <p className="text-gray-700">Amount: ₹50,000</p>
                    <p className="text-gray-700">Interest: 15% p.a.</p>
                    <p className="text-gray-700">Monthly EMI: ₹4,509</p>
                    <p className="text-gray-700">Processing fee: ₹235</p>
                  </div>
                  <div className="bg-white p-3 rounded text-sm">
                    <p className="text-gray-700">Time to clear: <strong className="text-green-700">12 months</strong></p>
                    <p className="text-gray-700">Total interest: <strong className="text-green-700">₹4,108</strong></p>
                    <p className="text-gray-700">Total paid: <strong className="text-green-700">₹54,343</strong></p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-200 to-emerald-200 p-5 rounded-lg border-2 border-green-500">
                <h4 className="font-bold text-gray-900 text-center mb-2 text-xl">💰 Total Savings with EMI:</h4>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-700 mb-2">₹62,657</p>
                  <p className="text-lg text-gray-700">(₹1,17,000 - ₹54,343)</p>
                  <p className="text-sm text-gray-600 mt-2">Plus you clear debt in 12 months vs 4+ years!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Convert to EMI */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Convert Purchase to EMI (ईएमआई में कैसे बदलें)
          </h2>

          <div className="bg-white border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">2 Methods to Convert:</h3>

            <div className="space-y-5">
              <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-300">
                <h4 className="font-bold text-blue-900 text-lg mb-3">Method 1: At Time of Purchase (Point of Sale EMI)</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-gray-900 mb-2">Step-by-Step:</p>
                    <ol className="text-sm text-gray-700 space-y-1 list-decimal ml-4">
                      <li>Choose product worth ₹5,000+ (minimum varies)</li>
                      <li>At checkout, select "Credit Card EMI" option</li>
                      <li>Choose your bank and card</li>
                      <li>Select tenure (3, 6, 9, 12 months)</li>
                      <li>Review EMI amount and interest</li>
                      <li>Complete payment with OTP</li>
                    </ol>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <p className="text-sm text-gray-800">
                      <strong>✅ Available on:</strong> Amazon, Flipkart, electronics stores, appliance shops
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                <h4 className="font-bold text-green-900 text-lg mb-3">Method 2: After Purchase (Convert Later)</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-gray-900 mb-2">Step-by-Step:</p>
                    <ol className="text-sm text-gray-700 space-y-1 list-decimal ml-4">
                      <li>Log into mobile banking app or net banking</li>
                      <li>Go to "Credit Card" section</li>
                      <li>Select "Convert to EMI" or "EMI Conversion"</li>
                      <li>Choose transaction(s) to convert</li>
                      <li>Select tenure (6-24 months typically)</li>
                      <li>Review charges and submit</li>
                      <li>EMI starts from next billing cycle</li>
                    </ol>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm text-gray-800">
                      <strong>✅ Can convert:</strong> Individual transactions or full outstanding balance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMI Charges Breakdown */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            EMI Charges Breakdown (शुल्क विवरण)
          </h2>

          <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
            <div className="space-y-4">
              <div className="bg-orange-50 p-5 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-3">What You Pay:</h4>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-2 border-orange-300">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Processing Fee</span>
                      <span className="font-bold text-gray-900">₹99-499</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">One-time, added to EMI amount</p>
                  </div>

                  <div className="bg-white p-3 rounded border-2 border-orange-300">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">GST on Processing Fee</span>
                      <span className="font-bold text-gray-900">18%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">On processing fee amount</p>
                  </div>

                  <div className="bg-white p-3 rounded border-2 border-orange-300">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Interest Rate</span>
                      <span className="font-bold text-gray-900">13-18% p.a.</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Much better than 42% revolving!</p>
                  </div>

                  <div className="bg-white p-3 rounded border-2 border-orange-300">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Prepayment Charges</span>
                      <span className="font-bold text-gray-900">2-5%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">If you want to close EMI early</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 p-4 rounded border-2 border-blue-400">
                <p className="font-bold text-gray-900 mb-2">📊 Full Cost Example (₹50K @ 15% for 12 months):</p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>Principal: ₹50,000</p>
                  <p>Processing fee: ₹199 + ₹36 GST = ₹235</p>
                  <p>Interest (15%): ₹4,108</p>
                  <p className="font-bold text-blue-700 text-lg mt-2">Total Cost: ₹54,343</p>
                  <p className="text-xs text-green-600">vs ₹1,17,000+ with minimum payments!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use EMI */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            When to Use Credit Card EMI (कब उपयोग करें)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-4">✅ Use EMI When:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You can't pay full bill this month</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Large purchase (₹20K+ appliance, electronics)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>No cost EMI available (0% interest)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Emergency expense but cash flow issue</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Want to avoid minimum payment trap (42%)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Can afford fixed EMI but not lump sum</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-red-900 mb-4">❌ Don't Use EMI When:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You can pay full amount easily</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Small purchases (under ₹5,000)</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>High processing fee (&gt; 3% of amount)</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You won't complete EMI (prepayment charges)</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Your credit limit is low (EMI blocks limit)</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You have better loan options (home loan 8%)</span>
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
              <a href="/learn/credit-cards/interest-rates-charges" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-red-200">
                <p className="font-semibold text-red-600 mb-1">Interest & Charges</p>
                <p className="text-sm text-gray-600">42% APR explained</p>
              </a>
              <a href="/learn/credit-cards/minimum-vs-full-payment" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Payment Strategy</p>
                <p className="text-sm text-gray-600">Avoid minimum payment trap</p>
              </a>
              <a href="/learn/credit-cards/balance-transfer" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Balance Transfer</p>
                <p className="text-sm text-gray-600">Another debt relief option</p>
              </a>
              <a href="/calculators/loan-calculator" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">EMI Calculator</p>
                <p className="text-sm text-gray-600">Calculate your EMI</p>
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
              <span className="text-gray-800">EMI on credit card: Convert purchases to fixed monthly installments at 13-18% vs 42% revolving</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">3 types: No cost EMI (0%), Standard EMI (15%), Balance conversion EMI (18%)</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Huge savings: ₹62K+ on ₹50K purchase (EMI vs minimum payments)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Charges: Processing fee ₹99-499, GST 18%, Interest 13-18%, Prepayment penalty 2-5%</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Use when: Can't pay full, large purchase, no cost EMI available, avoiding 42% interest</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Avoid when: Can pay full, small amount, high processing fee, have cheaper loan options</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Save Thousands with Smart EMI! 💰</h2>
          <p className="text-green-100 mb-6">
            Use EMI strategically to manage cash flow and avoid the 42% interest trap!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/calculators/loan-calculator"
              className="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors"
            >
              Calculate Your EMI →
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

export default EmiOnCreditCard;
