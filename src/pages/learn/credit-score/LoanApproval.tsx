import React from 'react';
import { TrendingUp, CheckCircle, XCircle, AlertCircle, Calculator, Home, Car } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanApproval: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Score Impact on Loan Approval & Interest Rates 2024 | MoneyCal"
        description="How credit score affects loan approval chances and interest rates in India. Learn minimum score requirements for home loans, personal loans, car loans and save lakhs on interest."
        keywords="credit score loan approval, credit score interest rate, minimum credit score for loan, loan eligibility by credit score, credit score effect on EMI"
        canonicalUrl="https://moneycal.in/learn/credit-score/loan-approval"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'How Credit Score Affects Loan Approval and Interest Rates',
          description: 'Complete guide to credit score impact on loan approval chances and interest rates in India',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-score"
        currentLesson="loan-approval"
        breadcrumb={['Learn', 'Credit Score', 'Loan Approval Impact']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <TrendingUp className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Your Score = Your Loan Power!</h3>
          <p className="text-gray-700">
                Credit score directly impacts loan approval chances AND interest rates. A 750+ score can save you ₹7+ lakhs on a ₹30L home loan! 
                Learn exactly how it affects every loan type. 💰📊
          </p>
        </div>
          </div>
        </div>

        {/* Minimum Score Requirements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Minimum Credit Score Requirements by Loan Type
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Required Scores for Different Loans:</h3>

            <div className="space-y-4">
              {/* Home Loan */}
              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <Home className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">Home Loan (गृह ऋण)</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-1">Ideal Score: 750+</p>
                      <p className="text-sm text-gray-700">• Instant approval (90%+ success)</p>
                      <p className="text-sm text-gray-700">• Best interest rates (8.5-9.5%)</p>
                      <p className="text-sm text-gray-700">• Higher loan amounts</p>
                      <p className="text-sm text-gray-700">• Lower processing fees</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="font-bold text-yellow-900 mb-1">Acceptable: 650-749</p>
                      <p className="text-sm text-gray-700">• Good approval chances (60-80%)</p>
                      <p className="text-sm text-gray-700">• Moderate rates (10-11%)</p>
                      <p className="text-sm text-gray-700">• Standard processing</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                      <div className="bg-red-50 p-3 rounded">
                        <p className="font-bold text-red-900 mb-1">Challenging: Below 650</p>
                        <p className="text-sm text-gray-700">• Low approval rate (&lt; 40%)</p>
                        <p className="text-sm text-gray-700">• High interest (12-14%)</p>
                      <p className="text-sm text-gray-700">• More documentation needed</p>
                      <p className="text-sm text-gray-700">• Higher down payment required</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <a 
                    href="/tools/home-loan-calculator" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <Calculator className="h-4 w-4 mr-1" />
                    Calculate Home Loan EMI →
                  </a>
                </div>
              </div>

              {/* Personal Loan */}
              <div className="bg-white p-5 rounded-lg border-2 border-blue-300">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-7 w-7 text-blue-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">Personal Loan (व्यक्तिगत ऋण)</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-1">Ideal Score: 750+</p>
                      <p className="text-sm text-gray-700">• Quick approval (24-48 hours)</p>
                      <p className="text-sm text-gray-700">• Low interest (10-13%)</p>
                      <p className="text-sm text-gray-700">• Up to 40x monthly salary</p>
                      <p className="text-sm text-gray-700">• Minimal documentation</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="font-bold text-yellow-900 mb-1">Acceptable: 700-749</p>
                      <p className="text-sm text-gray-700">• Moderate approval (50-70%)</p>
                      <p className="text-sm text-gray-700">• Interest: 14-18%</p>
                      <p className="text-sm text-gray-700">• Standard loan amounts</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="font-bold text-orange-900 mb-1">Difficult: 650-699</p>
                      <p className="text-sm text-gray-700">• Limited options (30-50%)</p>
                      <p className="text-sm text-gray-700">• Interest: 19-24%</p>
                      <p className="text-sm text-gray-700">• Smaller loan amounts</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="font-bold text-red-900 mb-1">Very Difficult: Below 650</p>
                      <p className="text-sm text-gray-700">• Very low approval (&lt; 20%)</p>
                      <p className="text-sm text-gray-700">• Interest: 25-30%</p>
                      <p className="text-sm text-gray-700">• Secured loan recommended</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <a 
                    href="/tools/personal-loan-calculator" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <Calculator className="h-4 w-4 mr-1" />
                    Calculate Personal Loan EMI →
                  </a>
                </div>
              </div>

              {/* Car Loan */}
              <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
                <div className="flex items-center mb-3">
                  <Car className="h-7 w-7 text-purple-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">Car Loan (वाहन ऋण)</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-1">Ideal Score: 750+</p>
                      <p className="text-sm text-gray-700">• Fast approval (2-3 days)</p>
                      <p className="text-sm text-gray-700">• Best rates (8-10%)</p>
                      <p className="text-sm text-gray-700">• Up to 90% on-road price</p>
                      <p className="text-sm text-gray-700">• Longer tenure (7 years)</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="font-bold text-yellow-900 mb-1">Acceptable: 700-749</p>
                      <p className="text-sm text-gray-700">• Good approval (70-85%)</p>
                      <p className="text-sm text-gray-700">• Interest: 10-12%</p>
                      <p className="text-sm text-gray-700">• Up to 85% financing</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="font-bold text-orange-900 mb-1">Fair: 650-699</p>
                      <p className="text-sm text-gray-700">• Moderate approval (50-70%)</p>
                      <p className="text-sm text-gray-700">• Interest: 12-14%</p>
                      <p className="text-sm text-gray-700">• Up to 80% financing</p>
                      <p className="text-sm text-gray-700">• Higher down payment</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="font-bold text-red-900 mb-1">Difficult: Below 650</p>
                      <p className="text-sm text-gray-700">• Limited approval (&lt; 40%)</p>
                      <p className="text-sm text-gray-700">• Interest: 14-16%</p>
                      <p className="text-sm text-gray-700">• Only 70% financing</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <a 
                    href="/calculators/loan-calculator" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <Calculator className="h-4 w-4 mr-1" />
                    Calculate Car Loan EMI →
                  </a>
                </div>
              </div>

              {/* Credit Card */}
              <div className="bg-white p-5 rounded-lg border-2 border-orange-300">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-7 w-7 text-orange-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">Credit Card (क्रेडिट कार्ड)</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-900 mb-1">Premium Cards: 750+</p>
                      <p className="text-sm text-gray-700">• Infinia, Magnus, Diners Black</p>
                      <p className="text-sm text-gray-700">• High limits (5-10x salary)</p>
                      <p className="text-sm text-gray-700">• Best rewards & benefits</p>
                      <p className="text-sm text-gray-700">• Pre-approved offers</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-900 mb-1">Good Cards: 700-749</p>
                      <p className="text-sm text-gray-700">• Regalia, Millennia, Cashback</p>
                      <p className="text-sm text-gray-700">• Decent limits (3-5x salary)</p>
                      <p className="text-sm text-gray-700">• Good rewards programs</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="font-bold text-yellow-900 mb-1">Basic Cards: 650-699</p>
                      <p className="text-sm text-gray-700">• SimplyCLICK, Amazon Pay</p>
                      <p className="text-sm text-gray-700">• Lower limits (2-3x salary)</p>
                      <p className="text-sm text-gray-700">• Basic rewards</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="font-bold text-red-900 mb-1">Secured Only: Below 650</p>
                      <p className="text-sm text-gray-700">• FD-backed cards only</p>
                      <p className="text-sm text-gray-700">• Limit = FD amount</p>
                      <p className="text-sm text-gray-700">• Build credit history</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interest Rate Impact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interest Rate Impact by Credit Score (ब्याज दर पर प्रभाव)
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Real Savings Example: ₹30 Lakhs Home Loan (20 Years)</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300 text-sm">
                <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Credit Score</th>
                    <th className="border border-gray-300 p-3">Interest Rate</th>
                    <th className="border border-gray-300 p-3">Monthly EMI</th>
                    <th className="border border-gray-300 p-3">Total Interest</th>
                    <th className="border border-gray-300 p-3">Extra Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-100">
                    <td className="border border-gray-300 p-3 font-semibold">750-900 ⭐</td>
                    <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">8.5%</td>
                    <td className="border border-gray-300 p-3 text-center">₹26,072</td>
                    <td className="border border-gray-300 p-3 text-center text-green-700">₹32.57L</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-green-700">Base</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-3 font-semibold">700-749</td>
                    <td className="border border-gray-300 p-3 text-center font-bold">9.5%</td>
                    <td className="border border-gray-300 p-3 text-center">₹27,999</td>
                    <td className="border border-gray-300 p-3 text-center">₹37.20L</td>
                    <td className="border border-gray-300 p-3 text-center text-orange-700">+₹4.63L</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 p-3 font-semibold">650-699</td>
                    <td className="border border-gray-300 p-3 text-center font-bold">10.5%</td>
                    <td className="border border-gray-300 p-3 text-center">₹29,998</td>
                    <td className="border border-gray-300 p-3 text-center">₹41.99L</td>
                    <td className="border border-gray-300 p-3 text-center text-orange-700">+₹9.42L</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 p-3 font-semibold">550-649</td>
                    <td className="border border-gray-300 p-3 text-center font-bold">12%</td>
                    <td className="border border-gray-300 p-3 text-center">₹33,032</td>
                    <td className="border border-gray-300 p-3 text-center">₹49.28L</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700">+₹16.71L</td>
                  </tr>
                  <tr className="bg-red-100">
                    <td className="border border-gray-300 p-3 font-semibold">Below 550</td>
                    <td className="border border-gray-300 p-3 text-center font-bold text-red-700">14%</td>
                    <td className="border border-gray-300 p-3 text-center">₹37,293</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700">₹59.50L</td>
                    <td className="border border-gray-300 p-3 text-center text-red-700 font-bold">+₹26.93L</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-5 bg-gradient-to-r from-red-200 to-orange-200 rounded-lg border-2 border-red-500">
              <p className="font-bold text-gray-900 text-center mb-2 text-xl">😱 Poor Credit Score Costs You ₹26.93 Lakhs Extra!</p>
              <p className="text-center text-gray-700">
                On a ₹30L home loan, the difference between excellent (750+) and poor (below 550) credit score is <strong>₹26.93 LAKHS</strong> in extra interest over 20 years!
              </p>
            </div>
          </div>
        </section>

        {/* Approval Chances */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Loan Approval Chances by Score (अनुमोदन की संभावना)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-900">Approval Probability:</h3>
                
                <div className="space-y-3">
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-400">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-green-900">750-900 Credit Score</p>
                      <p className="font-bold text-green-700 text-xl">90-95%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-green-600 h-4 rounded-full" style={{width: '93%'}}></div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">Almost guaranteed approval if other criteria met</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-400">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-blue-900">700-749 Credit Score</p>
                      <p className="font-bold text-blue-700 text-xl">75-85%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-blue-600 h-4 rounded-full" style={{width: '80%'}}></div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">Very good chances with major banks</p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-yellow-900">650-699 Credit Score</p>
                      <p className="font-bold text-yellow-700 text-xl">50-70%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-yellow-600 h-4 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">Moderate chances, may need co-applicant</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-400">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-orange-900">550-649 Credit Score</p>
                      <p className="font-bold text-orange-700 text-xl">30-50%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-orange-600 h-4 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">Limited options, secured loans better</p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border-2 border-red-400">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-red-900">Below 550 Credit Score</p>
                      <p className="font-bold text-red-700 text-xl">10-30%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-red-600 h-4 rounded-full" style={{width: '20%'}}></div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">Very difficult, improve score first</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">Factors That Also Matter:</h3>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">1. Income Stability</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 6+ months in current job</li>
                      <li>• Consistent income history</li>
                      <li>• Higher income = better approval</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">2. Debt-to-Income Ratio</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Should be below 40%</li>
                      <li>• Lower = better approval chances</li>
                      <li>• Affects loan amount eligibility</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">3. Existing Loans</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Number of active loans</li>
                      <li>• Payment history on existing loans</li>
                      <li>• Total outstanding amount</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">4. Down Payment</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Higher down payment = better approval</li>
                      <li>• Reduces lender's risk</li>
                      <li>• Can offset lower credit score</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">5. Co-applicant</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Spouse/parent with good score</li>
                      <li>• Combined income considered</li>
                      <li>• Improves approval chances significantly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Financial Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🔗 Related Financial Tools & Resources
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="/tools/home-loan-calculator" 
              className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Home className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-1">Home Loan Calculator</h3>
              <p className="text-sm text-gray-600">Calculate home loan EMI with tax benefits</p>
            </a>

            <a 
              href="/tools/personal-loan-calculator" 
              className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Calculator className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-1">Personal Loan Calculator</h3>
              <p className="text-sm text-gray-600">Quick personal loan EMI calculations</p>
            </a>

            <a 
              href="/calculators/loan-calculator" 
              className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Car className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-1">Car Loan Calculator</h3>
              <p className="text-sm text-gray-600">Vehicle loan EMI & affordability</p>
            </a>

            <a 
              href="/loan-tools/prepayment-calculator" 
              className="bg-gradient-to-br from-orange-50 to-yellow-100 border-2 border-orange-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-1">Prepayment Calculator</h3>
              <p className="text-sm text-gray-600">Calculate prepayment savings</p>
            </a>

            <a 
              href="/loan-tools/loan-affordability" 
              className="bg-gradient-to-br from-red-50 to-pink-100 border-2 border-red-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CheckCircle className="h-8 w-8 text-red-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-1">Loan Affordability</h3>
              <p className="text-sm text-gray-600">How much loan can you afford?</p>
            </a>

            <a 
              href="/learn/credit-score/improve-score" 
              className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <TrendingUp className="h-8 w-8 text-indigo-600 mb-2" />
              <h3 className="font-bold text-gray-900 mb-1">CIBIL Score Guide</h3>
              <p className="text-sm text-gray-600">Improve your credit score</p>
            </a>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">750+ credit score = 90%+ approval chances + lowest interest rates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Poor credit score can cost ₹26+ lakhs extra on ₹30L home loan!</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Minimum scores: Home loans 650+, Personal loans 700+, Credit cards 650-750+</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Interest rate difference: 8.5% (750+) vs 14% (below 550) = 5.5% extra!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Other factors matter too: income, debt ratio, down payment, co-applicant</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Use loan calculators to plan EMI based on your likely interest rate</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Better Rates? 🚀</h2>
          <p className="text-blue-100 mb-6">
            Improve your credit score to unlock better loan approvals and save lakhs in interest!
          </p>
          <div className="flex flex-wrap gap-4">
          <a
              href="/learn/credit-score/improve-score"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
              Improve Credit Score →
            </a>
            <a
              href="/tools/home-loan-calculator"
              className="inline-block bg-blue-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Calculate Your EMI
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default LoanApproval;
