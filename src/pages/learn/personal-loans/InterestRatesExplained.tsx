import React from 'react';
import { TrendingUp, Calculator, AlertCircle, CheckCircle, DollarSign, Target } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const InterestRatesExplained: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Interest Rates Explained: 11-15% Guide 2025 | MoneyCal"
        description="Understand personal loan interest rates in India - how they work, factors affecting rates, 11-15% range, and tips to get the lowest rates. Complete guide!"
        keywords="personal loan interest rates India, personal loan rate 2025, how to get low interest rate personal loan, personal loan rate factors, best personal loan rates"
        canonicalUrl="https://moneycal.in/learn/personal-loans/interest-rates-explained"
      />
      
      <LearnLayout
        title="Interest Rates Explained (11-15%)"
        description="Master personal loan interest rates - get the lowest rates possible! 💰"
        category="Personal Loans"
        difficulty="Intermediate"
        readTime="9 min read"
        prevLesson={{
          title: 'Personal Loan Eligibility Calculator',
          slug: '/learn/personal-loans/personal-loan-eligibility'
        }}
        nextLesson={{
          title: 'Secured vs Unsecured Personal Loans',
          slug: '/learn/personal-loans/secured-vs-unsecured'
        }}
      >
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Personal Loan Interest Rates: 11-15%</h2>
            <p className="text-gray-700 text-lg">
              Personal loan interest rates in India range from 11% to 15% for most borrowers. Understanding how these rates work can save you thousands of rupees! Let's break down everything you need to know. 💡
            </p>
          </div>
        </section>

        {/* Current Rate Range */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Interest Rate Range (2025)</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <div className="text-center">
                <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Best Rates</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">11-12%</div>
                <p className="text-green-700 text-sm">For excellent profiles (CIBIL 750+, high income, stable job)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
              <div className="text-center">
                <div className="bg-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Average Rates</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">13-14%</div>
                <p className="text-blue-700 text-sm">For good profiles (CIBIL 700+, decent income, stable job)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6">
              <div className="text-center">
                <div className="bg-orange-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-900 mb-2">Higher Rates</h3>
                <div className="text-3xl font-bold text-orange-600 mb-2">15-18%</div>
                <p className="text-orange-700 text-sm">For average profiles (CIBIL 650+, lower income, new job)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Rate Calculation Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Example: Rate Impact</h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4">₹5 Lakh Personal Loan Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Interest Rate</th>
                    <th className="border border-gray-300 p-3 text-left">3 Years EMI</th>
                    <th className="border border-gray-300 p-3 text-left">Total Interest</th>
                    <th className="border border-gray-300 p-3 text-left">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">11% (Best)</td>
                    <td className="border border-gray-300 p-3">₹16,370</td>
                    <td className="border border-gray-300 p-3 bg-green-50">₹89,320</td>
                    <td className="border border-gray-300 p-3">₹5,89,320</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">13% (Average)</td>
                    <td className="border border-gray-300 p-3">₹16,830</td>
                    <td className="border border-gray-300 p-3 bg-yellow-50">₹1,05,880</td>
                    <td className="border border-gray-300 p-3">₹6,05,880</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">15% (Higher)</td>
                    <td className="border border-gray-300 p-3">₹17,330</td>
                    <td className="border border-gray-300 p-3 bg-red-50">₹1,23,880</td>
                    <td className="border border-gray-300 p-3">₹6,23,880</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border-2 border-purple-400">
              <p className="font-bold text-purple-700">💡 Key Insight:</p>
              <p className="text-gray-700">Just 2% difference (11% vs 15%) saves you ₹34,560 in interest over 3 years!</p>
            </div>
          </div>
        </section>

        {/* Factors Affecting Rates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Affects Your Interest Rate?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-900 mb-4 text-xl">✅ Factors for Lower Rates:</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">High CIBIL Score (750+)</p>
                  <p className="text-sm text-gray-700">Best rates for excellent credit history</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">High Monthly Income (₹1L+)</p>
                  <p className="text-sm text-gray-700">Higher income = lower risk = better rates</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Stable Employment (2+ years)</p>
                  <p className="text-sm text-gray-700">Job stability reduces risk perception</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Low Existing EMIs</p>
                  <p className="text-sm text-gray-700">Less than 30% of income in existing EMIs</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Existing Bank Customer</p>
                  <p className="text-sm text-gray-700">Relationship banking gets preferential rates</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-red-900 mb-4 text-xl">❌ Factors for Higher Rates:</h3>
              <div className="space-y-3">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Low CIBIL Score (Below 650)</p>
                  <p className="text-sm text-gray-700">Poor credit history increases risk</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Low Monthly Income (Below ₹50K)</p>
                  <p className="text-sm text-gray-700">Lower income = higher risk perception</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">New Job (Less than 6 months)</p>
                  <p className="text-sm text-gray-700">Job instability increases risk</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">High Existing EMIs</p>
                  <p className="text-sm text-gray-700">More than 50% of income in existing EMIs</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Self-Employed/Freelancer</p>
                  <p className="text-sm text-gray-700">Irregular income = higher rates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bank-wise Rate Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bank-wise Interest Rates (2025)</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Bank</th>
                  <th className="border border-gray-300 p-3 text-left">Starting Rate</th>
                  <th className="border border-gray-300 p-3 text-left">Maximum Rate</th>
                  <th className="border border-gray-300 p-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">HDFC Bank</td>
                  <td className="border border-gray-300 p-3 bg-green-50">10.50%</td>
                  <td className="border border-gray-300 p-3">21.00%</td>
                  <td className="border border-gray-300 p-3">Existing customers, high income</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">ICICI Bank</td>
                  <td className="border border-gray-300 p-3 bg-green-50">10.75%</td>
                  <td className="border border-gray-300 p-3">19.00%</td>
                  <td className="border border-gray-300 p-3">Quick approval, good rates</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">SBI</td>
                  <td className="border border-gray-300 p-3 bg-green-50">11.00%</td>
                  <td className="border border-gray-300 p-3">16.00%</td>
                  <td className="border border-gray-300 p-3">Government employees, stable income</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Axis Bank</td>
                  <td className="border border-gray-300 p-3">11.50%</td>
                  <td className="border border-gray-300 p-3">20.00%</td>
                  <td className="border border-gray-300 p-3">Flexible terms, good service</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Kotak Mahindra</td>
                  <td className="border border-gray-300 p-3">11.75%</td>
                  <td className="border border-gray-300 p-3">19.00%</td>
                  <td className="border border-gray-300 p-3">Digital process, quick approval</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Bajaj Finserv</td>
                  <td className="border border-gray-300 p-3">12.00%</td>
                  <td className="border border-gray-300 p-3">18.00%</td>
                  <td className="border border-gray-300 p-3">High loan amounts, flexible tenure</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips to Get Lower Rates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Get the Lowest Interest Rate?</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-blue-900 mb-3">Before Applying:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Improve CIBIL score to 750+ (pay existing EMIs on time)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Reduce existing EMIs (prepay high-interest loans)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Build relationship with your bank (salary account, FDs)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Wait for stable employment (6+ months in current job)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-3">While Applying:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Apply to multiple banks and compare rates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Add co-applicant with good income and CIBIL</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Negotiate with banks (they can offer better rates)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Apply during bank's promotional periods</span>
                  </li>
                </ul>
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
                <span className="text-gray-800">Personal loan rates: 11-15% for most borrowers (2025)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">CIBIL score 750+ + high income + stable job = best rates (11-12%)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">2% rate difference can save ₹30K+ in interest over 3 years</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Apply to multiple banks, negotiate, and compare rates before finalizing</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Secured vs Unsecured Next! 🛡️</h2>
          <p className="text-purple-100 mb-6">
            Now that you understand interest rates, let's explore the difference between secured and unsecured personal loans!
          </p>
          <a
            href="/learn/personal-loans/secured-vs-unsecured"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: Secured vs Unsecured →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default InterestRatesExplained;

