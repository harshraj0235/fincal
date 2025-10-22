import React from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, XCircle, Home, Car, Briefcase } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const SecuredVsUnsecured: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Secured vs Unsecured Personal Loans: Complete Comparison 2025 | MoneyCal"
        description="Understand the difference between secured and unsecured personal loans in India. Compare interest rates, amounts, risks, and choose the right option for your needs."
        keywords="secured personal loan, unsecured personal loan, personal loan with collateral, personal loan without collateral, secured vs unsecured loan India"
        canonicalUrl="https://moneycal.in/learn/personal-loans/secured-vs-unsecured"
      />
      
      <LearnLayout
        title="Secured vs Unsecured Personal Loans"
        description="Understand the key differences and choose the right option! 🛡️"
        category="Personal Loans"
        difficulty="Beginner"
        readTime="8 min read"
        prevLesson={{
          title: 'Interest Rates Explained (11-15%)',
          slug: '/learn/personal-loans/interest-rates-explained'
        }}
        nextLesson={{
          title: 'Instant Personal Loan Apps Explained',
          slug: '/learn/personal-loans/instant-loan-apps'
        }}
      >
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Secured vs Unsecured: The Key Difference</h2>
            <p className="text-gray-700 text-lg">
              The main difference is <strong>collateral</strong>! Secured loans require you to pledge an asset (house, car, gold), while unsecured loans don't need any collateral. This affects everything - rates, amounts, and risk! 🎯
            </p>
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Secured Loan */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 p-3 rounded-xl mr-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900">Secured Personal Loan</h3>
                  <p className="text-green-700 text-sm">With Collateral 🏠</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-gray-800"><strong>Collateral:</strong> House, car, gold, FDs</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-gray-800"><strong>Interest:</strong> 8-12% (lower)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-gray-800"><strong>Amount:</strong> ₹5L - ₹2Cr</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-gray-800"><strong>Tenure:</strong> 1-10 years</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-gray-800"><strong>Risk:</strong> Asset can be seized</span>
                </div>
              </div>
            </div>

            {/* Unsecured Loan */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-3 rounded-xl mr-4">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">Unsecured Personal Loan</h3>
                  <p className="text-blue-700 text-sm">No Collateral 💳</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-800"><strong>Collateral:</strong> None required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-800"><strong>Interest:</strong> 11-18% (higher)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-800"><strong>Amount:</strong> ₹50K - ₹40L</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-800"><strong>Tenure:</strong> 1-5 years</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-800"><strong>Risk:</strong> No asset seizure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Factor</th>
                  <th className="border border-gray-300 p-3 text-left">Secured Loan</th>
                  <th className="border border-gray-300 p-3 text-left">Unsecured Loan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Collateral Required</td>
                  <td className="border border-gray-300 p-3 bg-red-50">YES (House, Car, Gold, FD)</td>
                  <td className="border border-gray-300 p-3 bg-green-50">NO</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Interest Rate</td>
                  <td className="border border-gray-300 p-3 bg-green-50">8-12% (Lower)</td>
                  <td className="border border-gray-300 p-3 bg-yellow-50">11-18% (Higher)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Loan Amount</td>
                  <td className="border border-gray-300 p-3 bg-green-50">₹5L - ₹2Cr (Higher)</td>
                  <td className="border border-gray-300 p-3 bg-yellow-50">₹50K - ₹40L (Lower)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Tenure</td>
                  <td className="border border-gray-300 p-3 bg-green-50">1-10 years (Longer)</td>
                  <td className="border border-gray-300 p-3 bg-yellow-50">1-5 years (Shorter)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Approval Time</td>
                  <td className="border border-gray-300 p-3 bg-yellow-50">7-15 days (Slower)</td>
                  <td className="border border-gray-300 p-3 bg-green-50">1-3 days (Faster)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">CIBIL Score Requirement</td>
                  <td className="border border-gray-300 p-3 bg-green-50">650+ (Lower)</td>
                  <td className="border border-gray-300 p-3 bg-yellow-50">700+ (Higher)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Risk to Borrower</td>
                  <td className="border border-gray-300 p-3 bg-red-50">Asset can be seized</td>
                  <td className="border border-gray-300 p-3 bg-green-50">No asset seizure</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Documentation</td>
                  <td className="border border-gray-300 p-3 bg-yellow-50">More (Property docs)</td>
                  <td className="border border-gray-300 p-3 bg-green-50">Less (Basic docs)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Choose Which */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Choose Which?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-900 mb-4 text-xl">✅ Choose Secured Loan When:</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You Need High Amount (₹10L+)</p>
                  <p className="text-sm text-gray-700">Unsecured loans max out at ₹40L, secured can go up to ₹2Cr</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You Want Lower Interest Rate</p>
                  <p className="text-sm text-gray-700">8-12% vs 11-18% - saves lakhs in interest</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You Have Low CIBIL Score</p>
                  <p className="text-sm text-gray-700">Collateral compensates for poor credit history</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You Want Longer Tenure</p>
                  <p className="text-sm text-gray-700">Up to 10 years vs 5 years maximum</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You're Confident About Repayment</p>
                  <p className="text-sm text-gray-700">Stable income, no risk of default</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-blue-900 mb-4 text-xl">✅ Choose Unsecured Loan When:</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You Don't Want to Risk Assets</p>
                  <p className="text-sm text-gray-700">No risk of losing house, car, or gold</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You Need Quick Approval</p>
                  <p className="text-sm text-gray-700">1-3 days vs 7-15 days for secured</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You Have Good CIBIL Score</p>
                  <p className="text-sm text-gray-700">700+ CIBIL gets decent rates even without collateral</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You Need Small Amount (Below ₹10L)</p>
                  <p className="text-sm text-gray-700">Unsecured loans are sufficient for smaller needs</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">You Don't Own Valuable Assets</p>
                  <p className="text-sm text-gray-700">No house, car, or gold to pledge</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Examples</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Secured Example */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Secured Loan Example</h3>
              <div className="space-y-2 text-gray-800">
                <p><strong>Scenario:</strong> Rajesh needs ₹15L for business expansion</p>
                <p><strong>Collateral:</strong> Pledges his house worth ₹50L</p>
                <p><strong>Loan Amount:</strong> ₹15L (30% of property value)</p>
                <p><strong>Interest Rate:</strong> 10% (secured rate)</p>
                <p><strong>Tenure:</strong> 5 years</p>
                <p><strong>EMI:</strong> ₹31,870/month</p>
                <p><strong>Total Interest:</strong> ₹4.12L</p>
                <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                  <p className="font-bold text-green-700">✅ Benefits:</p>
                  <p className="text-sm text-gray-700">Lower rate, higher amount, longer tenure</p>
                </div>
                <div className="mt-2 p-3 bg-white rounded-lg border border-red-200">
                  <p className="font-bold text-red-700">⚠️ Risk:</p>
                  <p className="text-sm text-gray-700">House can be seized if EMI defaults</p>
                </div>
              </div>
            </div>

            {/* Unsecured Example */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Unsecured Loan Example</h3>
              <div className="space-y-2 text-gray-800">
                <p><strong>Scenario:</strong> Priya needs ₹5L for medical emergency</p>
                <p><strong>Collateral:</strong> None required</p>
                <p><strong>Loan Amount:</strong> ₹5L (based on income)</p>
                <p><strong>Interest Rate:</strong> 13% (unsecured rate)</p>
                <p><strong>Tenure:</strong> 3 years</p>
                <p><strong>EMI:</strong> ₹16,830/month</p>
                <p><strong>Total Interest:</strong> ₹1.06L</p>
                <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                  <p className="font-bold text-blue-700">✅ Benefits:</p>
                  <p className="text-sm text-gray-700">No asset risk, quick approval, simple process</p>
                </div>
                <div className="mt-2 p-3 bg-white rounded-lg border border-yellow-200">
                  <p className="font-bold text-yellow-700">⚠️ Trade-off:</p>
                  <p className="text-sm text-gray-700">Higher interest rate, lower amount limit</p>
                </div>
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
                <span className="text-gray-800">Secured loans: Lower rates (8-12%) but require collateral (house, car, gold)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Unsecured loans: Higher rates (11-18%) but no collateral needed</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Choose secured for: High amounts (₹10L+), lower rates, longer tenure</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Choose unsecured for: Quick approval, no asset risk, smaller amounts</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Instant Loan Apps Next! ⚡</h2>
          <p className="text-purple-100 mb-6">
            Now that you understand secured vs unsecured, let's explore instant personal loan apps that can give you money in minutes!
          </p>
          <a
            href="/learn/personal-loans/instant-loan-apps"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: Instant Loan Apps →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default SecuredVsUnsecured;
