import React from 'react';
import { Home, Building, Wrench, TrendingUp, Users, Briefcase, CheckCircle, XCircle, Shield } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const TypesOfHomeLoans: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Types of Home Loans in India: Complete Guide 2025 | MoneyCal"
        description="Learn about 8 types of home loans in India - Home Purchase, Construction, Extension, Balance Transfer, Top-Up, NRI, Plot Loans. Which is best for you?"
        keywords="types of home loans India, home loan types, home purchase loan, home construction loan, home extension loan, plot loan, NRI home loan, balance transfer home loan"
        canonicalUrl="https://moneycal.in/learn/home-loans/types-of-home-loans"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Types of Home Loans in India',
          description: 'Comprehensive guide explaining all 8 types of home loans available in India with eligibility, benefits, and which to choose.',
          educationalLevel: 'Beginner',
          learningResourceType: 'Article',
        }}
      />
      
      <LearnLayout
        title="Types of Home Loans in India"
        description="Understand all 8 types of home loans and choose the perfect one for your needs 🏠"
        category="Home Loans"
        difficulty="Beginner"
        readTime="10 min read"
        prevLesson={{
          title: 'What is a Home Loan?',
          slug: '/learn/home-loans/what-is-home-loan'
        }}
        nextLesson={{
          title: 'Home Loan Eligibility Calculator',
          slug: '/learn/home-loans/home-loan-eligibility'
        }}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Home className="h-6 w-6 text-purple-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Not all home loans are the same! Using the wrong type can cost you lakhs in extra interest or make you ineligible. Choose the right loan type and save big! 💰
              </p>
            </div>
          </div>
        </div>

        {/* Main Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">8 Types of Home Loans in India</h2>
          
          {/* Type 1: Home Purchase Loan */}
          <div className="mb-8 bg-white border-2 border-blue-300 rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">1. Home Purchase Loan</h3>
                <p className="text-blue-600 font-semibold">Most Popular (80% of all home loans)</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <strong>For:</strong> Buying ready-made house/flat from builder or resale market
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Features
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Up to 90% of property value</li>
                    <li>• Tenure: 5-30 years</li>
                    <li>• Interest: 8-9% per year</li>
                    <li>• Fastest approval (1-2 weeks)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">Who Should Choose?</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Buying ready flat/house</li>
                    <li>• First-time home buyers</li>
                    <li>• Want immediate possession</li>
                    <li>• Salaried or self-employed</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Example:</strong> Rahul buys ₹60L flat in Mumbai. Bank gives ₹54L loan (90%). He pays ₹6L down payment. EMI starts next month.
                </p>
              </div>
            </div>
          </div>

          {/* Type 2: Home Construction Loan */}
          <div className="mb-8 bg-white border-2 border-orange-300 rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-xl mr-4">
                <Wrench className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">2. Home Construction Loan</h3>
                <p className="text-orange-600 font-semibold">For Building New House</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <strong>For:</strong> Building house on your own land/plot
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Features
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Money released in stages</li>
                    <li>• Up to 80% of construction cost</li>
                    <li>• Interest: 8.5-10% per year</li>
                    <li>• Pre-EMI during construction</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">Who Should Choose?</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Already own plot/land</li>
                    <li>• Want customized design</li>
                    <li>• Building in hometown/village</li>
                    <li>• Have approved building plan</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-4">
                <h4 className="font-bold text-orange-900 mb-2">How Money is Released (5 Stages):</h4>
                <div className="space-y-2 text-gray-800">
                  <div className="flex justify-between"><span>1. Foundation complete:</span> <strong>20% released</strong></div>
                  <div className="flex justify-between"><span>2. Walls up to roof level:</span> <strong>20% released</strong></div>
                  <div className="flex justify-between"><span>3. Roof casting done:</span> <strong>20% released</strong></div>
                  <div className="flex justify-between"><span>4. Doors, windows fitted:</span> <strong>20% released</strong></div>
                  <div className="flex justify-between"><span>5. Final completion:</span> <strong>20% released</strong></div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Example:</strong> Priya owns plot worth ₹20L. Construction cost: ₹30L. Bank gives ₹24L (80% of construction). During construction, she pays only interest (pre-EMI). After completion, full EMI starts.
                </p>
              </div>
            </div>
          </div>

          {/* Type 3: Home Extension/Improvement Loan */}
          <div className="mb-8 bg-white border-2 border-green-300 rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-xl mr-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">3. Home Extension/Improvement Loan</h3>
                <p className="text-green-600 font-semibold">For Renovating Existing Home</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <strong>For:</strong> Renovating, repairing, or adding rooms to existing house
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Features
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Up to ₹5-20 lakhs</li>
                    <li>• Tenure: 5-15 years</li>
                    <li>• Interest: 8.5-10% per year</li>
                    <li>• Quick approval (5-7 days)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">Who Should Choose?</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Adding extra room/floor</li>
                    <li>• Kitchen/bathroom renovation</li>
                    <li>• Fixing old structure</li>
                    <li>• Interior upgrades</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Example:</strong> Amit's family growing. Needs extra bedroom. Takes ₹8L improvement loan. Adds 1st floor. EMI: ₹8,900 for 10 years.
                </p>
              </div>
            </div>
          </div>

          {/* Type 4: Plot Loan (Land Purchase) */}
          <div className="mb-8 bg-white border-2 border-purple-300 rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-xl mr-4">
                <Building className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">4. Plot/Land Purchase Loan</h3>
                <p className="text-purple-600 font-semibold">For Buying Vacant Land</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <strong>For:</strong> Buying residential plot/land (will build later)
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Features
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Only 65-80% of land value</li>
                    <li>• Tenure: 10-20 years</li>
                    <li>• Interest: 9-11% (higher!)</li>
                    <li>• Must be residential zone</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-2 flex items-center">
                    <XCircle className="h-5 w-5 mr-2" />
                    Important Conditions
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• NO tax benefits (major loss!)</li>
                    <li>• Lower LTV (more down payment)</li>
                    <li>• Stricter verification</li>
                    <li>• Plot must be approved</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>⚠️ Smart Tip:</strong> Better strategy - Take combined "land + construction loan" together! Lower rate (8-9%), tax benefits, and 85-90% funding. Plot-only loan is expensive!
                </p>
              </div>
            </div>
          </div>

          {/* Type 5: Balance Transfer Loan */}
          <div className="mb-8 bg-white border-2 border-red-300 rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-xl mr-4">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">5. Balance Transfer Loan</h3>
                <p className="text-red-600 font-semibold">Switch to Lower Interest Rate</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <strong>For:</strong> Moving existing home loan to another bank for better rate
              </p>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
                <h4 className="font-bold text-green-900 mb-3 text-lg">When to Consider Balance Transfer?</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-gray-800">Current rate is 1%+ higher than market rates</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-gray-800">Outstanding principal &gt; ₹15 lakhs</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-gray-800">At least 10+ years of tenure remaining</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-gray-800">Savings will cover transfer charges (₹5,000-10,000)</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">Real Savings Example:</h4>
                <div className="space-y-2 text-gray-800">
                  <div className="flex justify-between"><span>Outstanding loan:</span> <strong>₹30,00,000</strong></div>
                  <div className="flex justify-between"><span>Current rate:</span> <strong>9.5%</strong></div>
                  <div className="flex justify-between"><span>New bank rate:</span> <strong>8.5%</strong></div>
                  <div className="flex justify-between"><span>Remaining tenure:</span> <strong>15 years</strong></div>
                  <div className="flex justify-between text-lg pt-2 border-t-2 border-blue-500">
                    <span>Total Savings:</span>
                    <strong className="text-green-700">₹5,87,000! 🎉</strong>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Note:</strong> We'll cover Balance Transfer in detail in Lesson #15 with calculator and checklist!
                </p>
              </div>
            </div>
          </div>

          {/* Type 6: Top-Up Loan */}
          <div className="mb-8 bg-white border-2 border-cyan-300 rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-cyan-100 p-3 rounded-xl mr-4">
                <Shield className="h-8 w-8 text-cyan-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">6. Top-Up Loan</h3>
                <p className="text-cyan-600 font-semibold">Extra Money on Existing Loan</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <strong>For:</strong> Taking additional loan amount on top of existing home loan
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Benefits
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Lower interest vs personal loan</li>
                    <li>• Up to 85% of property value</li>
                    <li>• Same tenure as main loan</li>
                    <li>• Quick approval (3-5 days)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">Common Uses</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Child's education fees</li>
                    <li>• Medical emergency</li>
                    <li>• Business investment</li>
                    <li>• Debt consolidation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Example:</strong> Suresh has home loan of ₹20L outstanding. Property worth ₹50L now. Bank offers ₹22.5L extra (85% of 50L = ₹42.5L - ₹20L existing). He takes ₹10L top-up for daughter's MBA. Rate: 9% (vs 15% personal loan!).
                </p>
              </div>
            </div>
          </div>

          {/* Type 7: NRI Home Loan */}
          <div className="mb-8 bg-white border-2 border-indigo-300 rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">7. NRI Home Loan</h3>
                <p className="text-indigo-600 font-semibold">For Non-Resident Indians</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <strong>For:</strong> NRIs wanting to buy property in India
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Features
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Up to 80-85% of property value</li>
                    <li>• Tenure: 5-30 years</li>
                    <li>• Interest: 8.5-10%</li>
                    <li>• Repay in INR or foreign currency</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 mb-2">Eligibility</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Must be Indian citizen</li>
                    <li>• Working abroad 1+ years</li>
                    <li>• Co-applicant in India (usually)</li>
                    <li>• Property must be residential</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Special Benefit:</strong> Can use rental income from India property to qualify! Banks consider 70-80% of rent as income for EMI calculation.
                </p>
              </div>
            </div>
          </div>

          {/* Type 8: Joint Home Loan */}
          <div className="mb-8 bg-white border-2 border-pink-300 rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 p-3 rounded-xl mr-4">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">8. Joint Home Loan (With Co-Applicant)</h3>
                <p className="text-pink-600 font-semibold">Apply Together, Get More!</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <strong>For:</strong> Applying with spouse, parent, or sibling to increase loan amount
              </p>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
                <h4 className="font-bold text-green-900 mb-3 text-lg">Major Benefits of Joint Loan:</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-gray-800"><strong>Higher Loan Amount:</strong> Both incomes considered (can get 50-70% more!)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-gray-800"><strong>Double Tax Benefits:</strong> Both can claim Section 80C + 24 deductions</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-gray-800"><strong>Better Interest Rate:</strong> Lower risk for bank = 0.1-0.25% discount</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span className="text-gray-800"><strong>Women Co-applicant:</strong> Extra 0.05-0.1% rate reduction!</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">Example Comparison:</h4>
                <div className="space-y-3 text-gray-800">
                  <div>
                    <div className="font-semibold mb-1">Single Applicant (Rajesh alone):</div>
                    <div className="pl-4">Income: ₹60,000/month → Max loan: ₹30 lakhs</div>
                  </div>
                  <div className="pt-2 border-t-2 border-blue-300">
                    <div className="font-semibold mb-1">Joint Applicant (Rajesh + Wife):</div>
                    <div className="pl-4">Combined income: ₹90,000/month → Max loan: <strong className="text-green-700">₹50 lakhs!</strong></div>
                    <div className="pl-4">Tax savings: <strong className="text-green-700">₹7 lakhs (both claim)</strong> vs ₹3.5L (single)</div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>We'll deep dive into co-applicant benefits in Lesson #13!</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison: Which Loan Type?</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Loan Type</th>
                  <th className="border border-gray-300 p-3 text-left">Interest Rate</th>
                  <th className="border border-gray-300 p-3 text-left">Max LTV</th>
                  <th className="border border-gray-300 p-3 text-left">Tax Benefits</th>
                  <th className="border border-gray-300 p-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-3 font-bold">Home Purchase ✅</td>
                  <td className="border border-gray-300 p-3">8-9%</td>
                  <td className="border border-gray-300 p-3">90%</td>
                  <td className="border border-gray-300 p-3 text-green-700 font-semibold">YES ₹3.5L</td>
                  <td className="border border-gray-300 p-3">Buying ready home</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">Construction</td>
                  <td className="border border-gray-300 p-3">8.5-10%</td>
                  <td className="border border-gray-300 p-3">80%</td>
                  <td className="border border-gray-300 p-3 text-green-700 font-semibold">YES ₹3.5L</td>
                  <td className="border border-gray-300 p-3">Building on own land</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">Extension</td>
                  <td className="border border-gray-300 p-3">8.5-10%</td>
                  <td className="border border-gray-300 p-3">Varies</td>
                  <td className="border border-gray-300 p-3 text-green-700 font-semibold">YES ₹2L</td>
                  <td className="border border-gray-300 p-3">Renovation/addition</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-gray-300 p-3 font-bold">Plot Only ❌</td>
                  <td className="border border-gray-300 p-3">9-11%</td>
                  <td className="border border-gray-300 p-3">70%</td>
                  <td className="border border-gray-300 p-3 text-red-600 font-semibold">NO</td>
                  <td className="border border-gray-300 p-3">Land purchase (expensive!)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">Balance Transfer</td>
                  <td className="border border-gray-300 p-3">7.5-9%</td>
                  <td className="border border-gray-300 p-3">N/A</td>
                  <td className="border border-gray-300 p-3 text-green-700 font-semibold">YES ₹3.5L</td>
                  <td className="border border-gray-300 p-3">Lower existing EMI</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-bold">Top-Up</td>
                  <td className="border border-gray-300 p-3">9-10.5%</td>
                  <td className="border border-gray-300 p-3">85%</td>
                  <td className="border border-gray-300 p-3 text-yellow-600 font-semibold">Partial</td>
                  <td className="border border-gray-300 p-3">Extra funds needed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Can I convert my plot loan to home loan later?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: YES!</strong> Once construction starts, you can request bank to convert your plot loan to home purchase/construction loan. Benefits: Lower interest rate (save 1-2%), get tax benefits. Most banks allow this if you apply before construction is 30% complete.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Which is better - construction loan or personal loan for building?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Construction loan is MUCH better!</strong> Personal loan: 15% interest, NO tax benefits, only ₹10-15L max. Construction loan: 8.5-9% interest, ₹3.5L tax benefits, up to ₹50L+. You'll save ₹10-15 lakhs over 15 years!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Should I add my wife as co-applicant?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: ABSOLUTELY YES (if she has income)!</strong> Benefits: 1) Get 40-60% higher loan, 2) BOTH claim tax benefits = ₹7L total deduction vs ₹3.5L, 3) Lower interest rate (0.05-0.1% discount), 4) Better CIBIL building for both. No downside!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: Can NRI get same loan amount as resident Indian?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Almost same!</strong> NRIs can get up to 80-85% LTV (vs 90% for residents). Interest rate 0.5-1% higher. But big advantage: Your foreign currency income is considered (converted to INR) + can use India rental income. So final loan amount is often similar or even higher!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-gray-900 text-lg">Q: When should I do balance transfer?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Transfer if:</strong> 1) Current rate is 1%+ higher than market, 2) Outstanding principal &gt; ₹15L, 3) 10+ years left, 4) Potential savings &gt; ₹2L. Transfer charges: ₹5-10K. We have detailed calculator + guide in Lesson #15!
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
                <span className="text-gray-800"><strong>Home Purchase Loan</strong> - Best rates, highest LTV (90%), fastest approval</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800"><strong>Avoid Plot-Only Loans</strong> - No tax benefits, higher rates. Take combined land+construction!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800"><strong>Joint Loans Rock!</strong> - 50% more loan, double tax benefits, lower rate</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800"><strong>Balance Transfer</strong> - Can save ₹5-10 lakhs if rate difference is 1%+</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800"><strong>Top-Up vs Personal</strong> - Top-up at 9% much better than personal loan at 15%</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Calculate Your Eligibility? 🧮</h2>
          <p className="text-blue-100 mb-6">
            Now that you know the types, let's find out how much home loan YOU can get!
          </p>
          <a
            href="/learn/home-loans/home-loan-eligibility"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Home Loan Eligibility Calculator →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default TypesOfHomeLoans;

