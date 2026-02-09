import React from 'react';
import { motion } from 'framer-motion';
import { Home, Car, GraduationCap, Briefcase, CreditCard, Coins, Building, UserCheck } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const TypesOfLoans: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Types of Loans in India - Complete Guide 2025 | MoneyCal Learn"
        description="Complete guide to all types of loans in India: Home, Personal, Car, Education, Business, Gold loans. Compare secured vs unsecured loans with interest rates, eligibility & examples."
        keywords="types of loans, loan types India, secured loan, unsecured loan, home loan, personal loan, car loan, education loan, business loan"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="types-of-loans"
        breadcrumb={['Learn', 'Loans & Credit', 'Types of Loans']}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Types of Loans in India</h1>
            <p className="text-lg text-gray-600">
              भारत में लोन के प्रकार - Complete Guide 2025
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
              <span>📖 10 min read</span>
              <span>📊 Beginner</span>
              <span>🔄 Updated: Oct 21, 2025</span>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              India offers a wide variety of loans for every financial need — from buying a home to funding education, starting a business, or covering emergencies. 
              Understanding different loan types helps you choose the right one with the best interest rates and terms.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Hindi में:</strong> भारत में हर ज़रूरत के लिए अलग-अलग तरह के loan उपलब्ध हैं। इस guide में हम सभी major loan types को detail में समझेंगे।
            </p>
          </section>

          {/* Main Classification */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Main Classification</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                  🛡️ Secured Loans
                </h3>
                <p className="text-gray-700 mb-3">Require collateral (asset as security)</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>✅ Lower interest rates (7-12%)</li>
                  <li>✅ Higher loan amounts</li>
                  <li>✅ Longer repayment tenure</li>
                  <li>❌ Risk of losing collateral if default</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-lg border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
                  📝 Unsecured Loans
                </h3>
                <p className="text-gray-700 mb-3">No collateral needed</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>✅ Quick approval</li>
                  <li>✅ No collateral needed</li>
                  <li>❌ Higher interest (11-24%)</li>
                  <li>❌ Lower loan amounts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* All Loan Types */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6">All Types of Loans in India</h2>

          {/* 1. Home Loan */}
          <div className="mb-6 bg-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">1. Home Loan (होम लोन)</h3>
                <p className="text-gray-700 mb-4">
                  Loan to purchase, construct, or renovate residential property. Property serves as collateral.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-lg font-bold text-blue-700">8.5% - 9.5%</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Loan Amount</p>
                    <p className="text-lg font-bold text-blue-700">Up to ₹5 Cr+</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Tenure</p>
                    <p className="text-lg font-bold text-blue-700">Up to 30 years</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Tax Benefits:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Section 80C:</strong> ₹1.5 lakh deduction on principal</li>
                    <li>• <strong>Section 24(b):</strong> ₹2 lakh deduction on interest</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Personal Loan */}
          <div className="mb-6 bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-purple-100 rounded-xl">
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-purple-900 mb-2">2. Personal Loan (पर्सनल लोन)</h3>
                <p className="text-gray-700 mb-4">
                  Unsecured loan for any personal purpose - wedding, medical, travel, debt consolidation.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-lg font-bold text-purple-700">11% - 24%</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Loan Amount</p>
                    <p className="text-lg font-bold text-purple-700">₹50K - ₹50L</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Tenure</p>
                    <p className="text-lg font-bold text-purple-700">1 - 5 years</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Best For:</p>
                  <p className="text-sm text-gray-700">Quick cash needs, no collateral available, good credit score (750+)</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Car/Vehicle Loan */}
          <div className="mb-6 bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-green-100 rounded-xl">
                <Car className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-2">3. Car/Vehicle Loan (गाड़ी लोन)</h3>
                <p className="text-gray-700 mb-4">
                  Loan for purchasing new or used cars, two-wheelers. Vehicle is hypothecated to lender.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-lg font-bold text-green-700">8.5% - 12%</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Loan Amount</p>
                    <p className="text-lg font-bold text-green-700">Up to 90% of car value</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Tenure</p>
                    <p className="text-lg font-bold text-green-700">1 - 7 years</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Types:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>New Car Loan:</strong> Lower rates (8.5-10%)</li>
                    <li>• <strong>Used Car Loan:</strong> Higher rates (10-12%)</li>
                    <li>• <strong>Two-Wheeler Loan:</strong> Quick approval (10-15%)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Education Loan */}
          <div className="mb-6 bg-white border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-orange-100 rounded-xl">
                <GraduationCap className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-orange-900 mb-2">4. Education Loan (शिक्षा लोन)</h3>
                <p className="text-gray-700 mb-4">
                  Loan for higher education in India or abroad. Covers tuition, hostel, books, travel.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-lg font-bold text-orange-700">9% - 15%</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Loan Amount</p>
                    <p className="text-lg font-bold text-orange-700">Up to ₹1.5 Cr</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Repayment</p>
                    <p className="text-lg font-bold text-orange-700">After course + 1 year</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Tax Benefit:</p>
                  <p className="text-sm text-gray-700"><strong>Section 80E:</strong> Interest paid is 100% deductible (no upper limit) for 8 years</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Business Loan */}
          <div className="mb-6 bg-white border-2 border-indigo-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-indigo-100 rounded-xl">
                <Briefcase className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-indigo-900 mb-2">5. Business Loan (बिजनेस लोन)</h3>
                <p className="text-gray-700 mb-4">
                  Loan for business expansion, working capital, equipment purchase. Can be secured or unsecured.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-lg font-bold text-indigo-700">11% - 20%</p>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Loan Amount</p>
                    <p className="text-lg font-bold text-indigo-700">₹1L - ₹50 Cr+</p>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Tenure</p>
                    <p className="text-lg font-bold text-indigo-700">1 - 10 years</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Types:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>MSME Loan:</strong> For small businesses</li>
                    <li>• <strong>Mudra Loan:</strong> Up to ₹10L (govt scheme)</li>
                    <li>• <strong>Working Capital:</strong> For daily operations</li>
                    <li>• <strong>Term Loan:</strong> For long-term assets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Gold Loan */}
          <div className="mb-6 bg-white border-2 border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-yellow-100 rounded-xl">
                <Coins className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-yellow-900 mb-2">6. Gold Loan (गोल्ड लोन)</h3>
                <p className="text-gray-700 mb-4">
                  Quick loan against gold jewelry. Gold is pledged and returned after repayment.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-lg font-bold text-yellow-700">7% - 15%</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">LTV Ratio</p>
                    <p className="text-lg font-bold text-yellow-700">Up to 75%</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Tenure</p>
                    <p className="text-lg font-bold text-yellow-700">3 months - 3 years</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Benefits:</p>
                  <p className="text-sm text-gray-700">✅ Quick approval ✅ No credit score needed ✅ No purpose restriction ✅ Lower interest than personal loans</p>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Credit Card */}
          <div className="mb-6 bg-white border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-red-100 rounded-xl">
                <CreditCard className="w-8 h-8 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-900 mb-2">7. Credit Card (क्रेडिट कार्ड)</h3>
                <p className="text-gray-700 mb-4">
                  Revolving credit line for purchases. Pay minimum due or full amount monthly.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-lg font-bold text-red-700">18% - 42%</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Credit Limit</p>
                    <p className="text-lg font-bold text-red-700">₹10K - ₹10L+</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Interest-Free</p>
                    <p className="text-lg font-bold text-red-700">20-50 days</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">⚠️ Caution:</p>
                  <p className="text-sm text-gray-700">Highest interest rates. Only use if you can pay full bill monthly. Minimum payment trap leads to debt spiral.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Loan Against Property */}
          <div className="mb-6 bg-white border-2 border-teal-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-teal-100 rounded-xl">
                <Building className="w-8 h-8 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-teal-900 mb-2">8. Loan Against Property (प्रॉपर्टी पर लोन)</h3>
                <p className="text-gray-700 mb-4">
                  Mortgage existing residential/commercial property for large funds. Property remains with you.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-lg font-bold text-teal-700">9% - 12%</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Loan Amount</p>
                    <p className="text-lg font-bold text-teal-700">50-70% of property value</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Tenure</p>
                    <p className="text-lg font-bold text-teal-700">Up to 15 years</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Best For:</p>
                  <p className="text-sm text-gray-700">Business expansion, child's education, medical emergency, debt consolidation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Loan Type</th>
                    <th className="p-3 text-left">Interest Rate</th>
                    <th className="p-3 text-left">Tenure</th>
                    <th className="p-3 text-left">Collateral</th>
                    <th className="p-3 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50">
                    <td className="p-3 font-semibold">Home Loan</td>
                    <td className="p-3">8.5-9.5%</td>
                    <td className="p-3">30 years</td>
                    <td className="p-3">Property</td>
                    <td className="p-3">Buying house</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-3 font-semibold">Personal Loan</td>
                    <td className="p-3">11-24%</td>
                    <td className="p-3">1-5 years</td>
                    <td className="p-3">No</td>
                    <td className="p-3">Any personal need</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-3 font-semibold">Car Loan</td>
                    <td className="p-3">8.5-12%</td>
                    <td className="p-3">1-7 years</td>
                    <td className="p-3">Vehicle</td>
                    <td className="p-3">Buying car/bike</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-3 font-semibold">Education Loan</td>
                    <td className="p-3">9-15%</td>
                    <td className="p-3">10-15 years</td>
                    <td className="p-3">Sometimes</td>
                    <td className="p-3">Higher education</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-3 font-semibold">Business Loan</td>
                    <td className="p-3">11-20%</td>
                    <td className="p-3">1-10 years</td>
                    <td className="p-3">Varies</td>
                    <td className="p-3">Business needs</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-3 font-semibold">Gold Loan</td>
                    <td className="p-3">7-15%</td>
                    <td className="p-3">3 mo-3 yrs</td>
                    <td className="p-3">Gold</td>
                    <td className="p-3">Quick cash</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Choose */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-green-900 mb-4">How to Choose the Right Loan?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">1. Identify Purpose</h4>
                  <p className="text-sm text-gray-600">What do you need money for? Match loan type to purpose.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">2. Check Eligibility</h4>
                  <p className="text-sm text-gray-600">Do you meet income, age, credit score requirements?</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">3. Compare Interest Rates</h4>
                  <p className="text-sm text-gray-600">Shop around 3-4 banks for best rates</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">4. Calculate EMI</h4>
                  <p className="text-sm text-gray-600">Ensure EMI is 40-50% max of income</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">5. Read Fine Print</h4>
                  <p className="text-sm text-gray-600">Check processing fees, prepayment charges</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">6. Consider Tax Benefits</h4>
                  <p className="text-sm text-gray-600">Home & education loans offer tax savings</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Which loan has the lowest interest rate in India?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Gold loans and home loans</strong> typically have the lowest interest rates (7-9.5%) because they are secured loans with collateral.
                </p>
              </details>
              
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Which loan is easiest to get approved?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Gold loans and personal loans</strong> are easiest. Gold loans need no credit score; personal loans approve quickly if you have good credit (750+) and stable income.
                </p>
              </details>
              
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I have multiple loans at the same time?
                </summary>
                <p className="mt-3 text-gray-700">
                  Yes, you can have multiple loans, but total EMI should not exceed 50% of income. Banks check your debt-to-income ratio before approving new loans.
                </p>
              </details>
              
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What is the best loan for emergencies?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Gold loans or personal loans</strong> are best for emergencies. Gold loans are faster (24-48 hours) and cheaper. Personal loans take 2-5 days but need no collateral.
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a 
              href="/learn/loans/what-is-loan" 
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              ← Previous: What Is a Loan?
            </a>
            <a 
              href="/learn/loans/secured-vs-unsecured" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
            >
              Next: Secured vs Unsecured →
            </a>
          </div>

        </motion.div>

        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Types of Loans in India - Complete Guide",
            "description": "Complete guide to all types of loans: Home, Personal, Car, Education, Business, Gold loans with comparison",
            "educationalLevel": "Beginner",
            "learningResourceType": "Tutorial",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default TypesOfLoans;

