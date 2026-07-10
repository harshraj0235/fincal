import React from 'react';
import { Award, TrendingUp, Zap, Shield, CheckCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const BestBanks: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Best Banks for Gold Loans in India 2024 - Top 10 Comparison | MoneyCal"
        description="Compare top 10 banks and NBFCs for gold loans in India. Find best interest rates, LTV ratios, processing fees, and choose the right lender for your needs."
        keywords="best gold loan banks, gold loan interest rates, top NBFCs gold loan, Muthoot Finance, Manappuram Finance, SBI gold loan"
        canonicalUrl="/learn/gold-loans/best-banks"
      />
      
      <LearnLayout
        category="gold-loans"
        currentLesson="best-banks"
        breadcrumb={['Learn', 'Gold Loans', 'Best Banks']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Award className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Choosing the right lender can save you lakhs! Compare top banks and NBFCs for best rates, quick service, and maximum loan amount. 🏆💰
              </p>
            </div>
          </div>
        </div>

        {/* Top 10 Lenders */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Top 10 Gold Loan Providers in India 2024
          </h2>

          <div className="space-y-6">
            {/* Muthoot Finance */}
            <div className="bg-white border-2 border-yellow-400 rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">1. Muthoot Finance</h3>
                    <p className="text-sm text-gray-600">🥇 Largest Gold Loan NBFC in India</p>
                  </div>
                </div>
                <div className="bg-green-100 px-4 py-2 rounded-full">
                  <p className="font-bold text-green-800">⭐ 4.5/5</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Interest Rate</p>
                  <p className="text-lg font-bold text-green-700">10.5% - 12% p.a.</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">LTV Ratio</p>
                  <p className="text-lg font-bold text-blue-700">Up to 75%</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Processing Time</p>
                  <p className="text-lg font-bold text-purple-700">15-20 mins</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Key Features:</p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <li>✅ 4,400+ branches across India</li>
                  <li>✅ Instant loan disbursal</li>
                  <li>✅ No pre-closure charges</li>
                  <li>✅ Gold insurance included</li>
                  <li>✅ Doorstep service available</li>
                  <li>✅ Multiple repayment options</li>
                </ul>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-800">
                  <strong>Best For:</strong> Quick loans, nationwide presence, trusted brand
                </p>
              </div>
            </div>

            {/* Manappuram Finance */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-xl mr-4">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">2. Manappuram Finance</h3>
                    <p className="text-sm text-gray-600">🥈 Second Largest Gold Loan NBFC</p>
                  </div>
                </div>
                <div className="bg-green-100 px-4 py-2 rounded-full">
                  <p className="font-bold text-green-800">⭐ 4.4/5</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Interest Rate</p>
                  <p className="text-lg font-bold text-green-700">10% - 12% p.a.</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">LTV Ratio</p>
                  <p className="text-lg font-bold text-blue-700">Up to 75%</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Processing Time</p>
                  <p className="text-lg font-bold text-purple-700">10-15 mins</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Key Features:</p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <li>✅ 3,700+ branches</li>
                  <li>✅ Online application available</li>
                  <li>✅ Flexible repayment schemes</li>
                  <li>✅ Gold auction transparency</li>
                  <li>✅ SMS alerts for transactions</li>
                  <li>✅ Overdraft facility</li>
                </ul>
              </div>

              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-800">
                  <strong>Best For:</strong> Competitive rates, online convenience, South India presence
                </p>
              </div>
            </div>

            {/* SBI Gold Loan */}
            <div className="bg-white border-2 border-blue-400 rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">3. State Bank of India (SBI)</h3>
                    <p className="text-sm text-gray-600">🥉 India's Largest Bank</p>
                  </div>
                </div>
                <div className="bg-green-100 px-4 py-2 rounded-full">
                  <p className="font-bold text-green-800">⭐ 4.3/5</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Interest Rate</p>
                  <p className="text-lg font-bold text-green-700">7.5% - 9% p.a.</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">LTV Ratio</p>
                  <p className="text-lg font-bold text-blue-700">Up to 75%</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Processing Time</p>
                  <p className="text-lg font-bold text-purple-700">30-45 mins</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Key Features:</p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <li>✅ Lowest interest rates</li>
                  <li>✅ 22,000+ branches</li>
                  <li>✅ Highest trust factor</li>
                  <li>✅ Government bank security</li>
                  <li>✅ Agricultural gold loans too</li>
                  <li>✅ SBI account holders get priority</li>
                </ul>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-800">
                  <strong>Best For:</strong> Lowest rates, maximum security, existing SBI customers
                </p>
              </div>
            </div>

            {/* Quick Comparison of Others */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Other Top Lenders</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">4. HDFC Bank</h4>
                  <p className="text-sm text-gray-700 mb-2">Rate: 9-11% | LTV: 75%</p>
                  <p className="text-xs text-gray-600">Great for urban customers, quick processing</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">5. ICICI Bank</h4>
                  <p className="text-sm text-gray-700 mb-2">Rate: 9.5-11.5% | LTV: 75%</p>
                  <p className="text-xs text-gray-600">Digital process, doorstep service</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">6. Axis Bank</h4>
                  <p className="text-sm text-gray-700 mb-2">Rate: 9-10.5% | LTV: 75%</p>
                  <p className="text-xs text-gray-600">Fast approval, overdraft facility</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">7. Kotak Mahindra Bank</h4>
                  <p className="text-sm text-gray-700 mb-2">Rate: 10-12% | LTV: 75%</p>
                  <p className="text-xs text-gray-600">Flexible tenure, good customer service</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">8. Federal Bank</h4>
                  <p className="text-sm text-gray-700 mb-2">Rate: 8.5-10% | LTV: 75%</p>
                  <p className="text-xs text-gray-600">Competitive rates, South India strong</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">9. IIFL Finance</h4>
                  <p className="text-sm text-gray-700 mb-2">Rate: 10-13% | LTV: 75%</p>
                  <p className="text-xs text-gray-600">Quick disbursal, business loans</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">10. Rupeek</h4>
                  <p className="text-sm text-gray-700 mb-2">Rate: 10-14% | LTV: 75%</p>
                  <p className="text-xs text-gray-600">100% digital, doorstep service</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300 text-sm">
              <thead className="bg-yellow-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">Lender</th>
                  <th className="border border-gray-300 p-2">Interest Rate</th>
                  <th className="border border-gray-300 p-2">LTV</th>
                  <th className="border border-gray-300 p-2">Processing Fee</th>
                  <th className="border border-gray-300 p-2">Branches</th>
                  <th className="border border-gray-300 p-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-2 font-semibold">Muthoot Finance</td>
                  <td className="border border-gray-300 p-2 text-center">10.5-12%</td>
                  <td className="border border-gray-300 p-2 text-center">75%</td>
                  <td className="border border-gray-300 p-2 text-center">0.5-1%</td>
                  <td className="border border-gray-300 p-2 text-center">4,400+</td>
                  <td className="border border-gray-300 p-2 text-center">⭐ 4.5</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 font-semibold">Manappuram</td>
                  <td className="border border-gray-300 p-2 text-center">10-12%</td>
                  <td className="border border-gray-300 p-2 text-center">75%</td>
                  <td className="border border-gray-300 p-2 text-center">0.5-1%</td>
                  <td className="border border-gray-300 p-2 text-center">3,700+</td>
                  <td className="border border-gray-300 p-2 text-center">⭐ 4.4</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-2 font-semibold">SBI</td>
                  <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">7.5-9%</td>
                  <td className="border border-gray-300 p-2 text-center">75%</td>
                  <td className="border border-gray-300 p-2 text-center text-green-700 font-bold">0.25%</td>
                  <td className="border border-gray-300 p-2 text-center">22,000+</td>
                  <td className="border border-gray-300 p-2 text-center">⭐ 4.3</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-2 font-semibold">HDFC Bank</td>
                  <td className="border border-gray-300 p-2 text-center">9-11%</td>
                  <td className="border border-gray-300 p-2 text-center">75%</td>
                  <td className="border border-gray-300 p-2 text-center">0.5%</td>
                  <td className="border border-gray-300 p-2 text-center">6,000+</td>
                  <td className="border border-gray-300 p-2 text-center">⭐ 4.2</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 font-semibold">ICICI Bank</td>
                  <td className="border border-gray-300 p-2 text-center">9.5-11.5%</td>
                  <td className="border border-gray-300 p-2 text-center">75%</td>
                  <td className="border border-gray-300 p-2 text-center">0.5-1%</td>
                  <td className="border border-gray-300 p-2 text-center">5,500+</td>
                  <td className="border border-gray-300 p-2 text-center">⭐ 4.2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Choose */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Choose the Right Lender?</h2>

          <div className="space-y-4">
            <div className="flex items-start bg-white border-2 border-blue-300 rounded-lg p-5">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Compare Interest Rates</h3>
                <p className="text-gray-700">Even 0.5% difference can save ₹10,000+ over loan tenure</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-5">
              <Zap className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Check Processing Time</h3>
                <p className="text-gray-700">NBFCs are faster (15 mins) than banks (30-45 mins)</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-purple-300 rounded-lg p-5">
              <Shield className="h-6 w-6 text-purple-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Verify Gold Storage Security</h3>
                <p className="text-gray-700">Ensure proper vaults, insurance, and 24/7 CCTV</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-yellow-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Read Customer Reviews</h3>
                <p className="text-gray-700">Check Google reviews and customer complaints</p>
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
              <span className="text-gray-800">SBI offers lowest rates (7.5-9%) but slower processing</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Muthoot & Manappuram are largest NBFCs with fastest service</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Private banks (HDFC, ICICI) offer balance of rate & speed</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Always compare 3-4 lenders before deciding</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: Tax Benefits! 🎯</h2>
          <p className="text-yellow-100 mb-6">
            Learn about tax implications and potential deductions on gold loans!
          </p>
          <a
            href="/learn/gold-loans/tax-benefits"
            className="inline-block bg-white text-yellow-600 font-bold py-3 px-8 rounded-xl hover:bg-yellow-50 transition-colors"
          >
            Next: Gold Loan Tax Benefits →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default BestBanks;

