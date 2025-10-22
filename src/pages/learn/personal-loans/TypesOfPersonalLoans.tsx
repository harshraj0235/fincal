import React from 'react';
import { BookOpen, Zap, Shield, Users, Briefcase, Heart, GraduationCap, Car, CheckCircle, XCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const TypesOfPersonalLoans: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Types of Personal Loans in India: 8 Categories Explained 2025 | MoneyCal"
        description="Discover 8 types of personal loans in India - instant, medical, wedding, travel, debt consolidation, business, education, and emergency loans. Choose the right one!"
        keywords="types of personal loans India, instant personal loan, medical loan, wedding loan, travel loan, debt consolidation loan, business personal loan, emergency loan"
        canonicalUrl="https://moneycal.in/learn/personal-loans/types-of-personal-loans"
      />
      
      <LearnLayout
        title="Types of Personal Loans in India"
        description="8 categories of personal loans - choose the perfect one for your need! 💳"
        category="Personal Loans"
        difficulty="Beginner"
        readTime="10 min read"
        prevLesson={{
          title: 'What is a Personal Loan?',
          slug: '/learn/personal-loans/what-is-personal-loan'
        }}
        nextLesson={{
          title: 'Personal Loan Eligibility Calculator',
          slug: '/learn/personal-loans/personal-loan-eligibility'
        }}
      >
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8 Types of Personal Loans in India</h2>
            <p className="text-gray-700 text-lg">
              Personal loans come in different flavors! Each type is designed for specific needs - from instant emergency cash to planned expenses. Choose wisely to get the best rates and terms! 🎯
            </p>
          </div>
        </section>

        {/* Types Grid */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 1. Instant Personal Loan */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-3 rounded-xl mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">Instant Personal Loan</h3>
                  <p className="text-blue-700 text-sm">Approval in 2-24 hours ⚡</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Amount:</strong> ₹50K - ₹5L</p>
                <p><strong>Interest:</strong> 12-18%</p>
                <p><strong>Tenure:</strong> 1-3 years</p>
                <p><strong>Best For:</strong> Emergency cash, urgent needs</p>
                <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800"><strong>Example:</strong> Medical emergency, car breakdown, urgent travel</p>
                </div>
              </div>
            </div>

            {/* 2. Medical Loan */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 p-3 rounded-xl mr-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-900">Medical Loan</h3>
                  <p className="text-red-700 text-sm">Healthcare financing 🏥</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Amount:</strong> ₹1L - ₹40L</p>
                <p><strong>Interest:</strong> 11-15%</p>
                <p><strong>Tenure:</strong> 1-5 years</p>
                <p><strong>Best For:</strong> Surgery, treatment, medical equipment</p>
                <div className="mt-3 p-3 bg-white rounded-lg border border-red-200">
                  <p className="text-sm text-red-800"><strong>Example:</strong> Heart surgery, cancer treatment, organ transplant</p>
                </div>
              </div>
            </div>

            {/* 3. Wedding Loan */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-pink-500 p-3 rounded-xl mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-900">Wedding Loan</h3>
                  <p className="text-pink-700 text-sm">Big day financing 💒</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Amount:</strong> ₹2L - ₹30L</p>
                <p><strong>Interest:</strong> 12-16%</p>
                <p><strong>Tenure:</strong> 2-5 years</p>
                <p><strong>Best For:</strong> Wedding expenses, ceremonies</p>
                <div className="mt-3 p-3 bg-white rounded-lg border border-pink-200">
                  <p className="text-sm text-pink-800"><strong>Example:</strong> Venue, catering, jewelry, photography</p>
                </div>
              </div>
            </div>

            {/* 4. Travel Loan */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 p-3 rounded-xl mr-4">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900">Travel Loan</h3>
                  <p className="text-green-700 text-sm">Vacation financing ✈️</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Amount:</strong> ₹50K - ₹10L</p>
                <p><strong>Interest:</strong> 13-17%</p>
                <p><strong>Tenure:</strong> 1-3 years</p>
                <p><strong>Best For:</strong> International trips, honeymoon</p>
                <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                  <p className="text-sm text-green-800"><strong>Example:</strong> Europe trip, honeymoon, family vacation</p>
                </div>
              </div>
            </div>

            {/* 5. Debt Consolidation Loan */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-orange-500 p-3 rounded-xl mr-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900">Debt Consolidation</h3>
                  <p className="text-orange-700 text-sm">Merge multiple debts 🔄</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Amount:</strong> ₹1L - ₹25L</p>
                <p><strong>Interest:</strong> 11-15%</p>
                <p><strong>Tenure:</strong> 2-5 years</p>
                <p><strong>Best For:</strong> Paying off credit cards, other loans</p>
                <div className="mt-3 p-3 bg-white rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-800"><strong>Example:</strong> Pay off 3 credit cards @ 36% with one loan @ 13%</p>
                </div>
              </div>
            </div>

            {/* 6. Business Personal Loan */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-500 p-3 rounded-xl mr-4">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900">Business Personal Loan</h3>
                  <p className="text-indigo-700 text-sm">Business capital 💼</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Amount:</strong> ₹2L - ₹40L</p>
                <p><strong>Interest:</strong> 12-18%</p>
                <p><strong>Tenure:</strong> 1-5 years</p>
                <p><strong>Best For:</strong> Business expansion, working capital</p>
                <div className="mt-3 p-3 bg-white rounded-lg border border-indigo-200">
                  <p className="text-sm text-indigo-800"><strong>Example:</strong> Shop renovation, inventory purchase, equipment</p>
                </div>
              </div>
            </div>

            {/* 7. Education Loan (Personal) */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-teal-500 p-3 rounded-xl mr-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-teal-900">Education Loan (Personal)</h3>
                  <p className="text-teal-700 text-sm">Learning investment 📚</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Amount:</strong> ₹1L - ₹20L</p>
                <p><strong>Interest:</strong> 11-16%</p>
                <p><strong>Tenure:</strong> 2-5 years</p>
                <p><strong>Best For:</strong> Courses, certifications, skill development</p>
                <div className="mt-3 p-3 bg-white rounded-lg border border-teal-200">
                  <p className="text-sm text-teal-800"><strong>Example:</strong> MBA course, professional certification, skill training</p>
                </div>
              </div>
            </div>

            {/* 8. Emergency Loan */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-500 p-3 rounded-xl mr-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-900">Emergency Loan</h3>
                  <p className="text-yellow-700 text-sm">Crisis funding 🚨</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <p><strong>Amount:</strong> ₹25K - ₹5L</p>
                <p><strong>Interest:</strong> 14-20%</p>
                <p><strong>Tenure:</strong> 6 months - 2 years</p>
                <p><strong>Best For:</strong> Job loss, family crisis, urgent needs</p>
                <div className="mt-3 p-3 bg-white rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800"><strong>Example:</strong> Job loss, family emergency, unexpected expenses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Loan Type</th>
                  <th className="border border-gray-300 p-3 text-left">Amount Range</th>
                  <th className="border border-gray-300 p-3 text-left">Interest Rate</th>
                  <th className="border border-gray-300 p-3 text-left">Approval Time</th>
                  <th className="border border-gray-300 p-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Instant</td>
                  <td className="border border-gray-300 p-3">₹50K - ₹5L</td>
                  <td className="border border-gray-300 p-3">12-18%</td>
                  <td className="border border-gray-300 p-3 bg-green-50">2-24 hours</td>
                  <td className="border border-gray-300 p-3">Emergency cash</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Medical</td>
                  <td className="border border-gray-300 p-3">₹1L - ₹40L</td>
                  <td className="border border-gray-300 p-3">11-15%</td>
                  <td className="border border-gray-300 p-3">1-3 days</td>
                  <td className="border border-gray-300 p-3">Healthcare</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Wedding</td>
                  <td className="border border-gray-300 p-3">₹2L - ₹30L</td>
                  <td className="border border-gray-300 p-3">12-16%</td>
                  <td className="border border-gray-300 p-3">2-5 days</td>
                  <td className="border border-gray-300 p-3">Wedding expenses</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Travel</td>
                  <td className="border border-gray-300 p-3">₹50K - ₹10L</td>
                  <td className="border border-gray-300 p-3">13-17%</td>
                  <td className="border border-gray-300 p-3">1-3 days</td>
                  <td className="border border-gray-300 p-3">Vacation</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Debt Consolidation</td>
                  <td className="border border-gray-300 p-3">₹1L - ₹25L</td>
                  <td className="border border-gray-300 p-3">11-15%</td>
                  <td className="border border-gray-300 p-3">3-7 days</td>
                  <td className="border border-gray-300 p-3">Merge debts</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Business</td>
                  <td className="border border-gray-300 p-3">₹2L - ₹40L</td>
                  <td className="border border-gray-300 p-3">12-18%</td>
                  <td className="border border-gray-300 p-3">3-7 days</td>
                  <td className="border border-gray-300 p-3">Business needs</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Education</td>
                  <td className="border border-gray-300 p-3">₹1L - ₹20L</td>
                  <td className="border border-gray-300 p-3">11-16%</td>
                  <td className="border border-gray-300 p-3">3-7 days</td>
                  <td className="border border-gray-300 p-3">Learning</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Emergency</td>
                  <td className="border border-gray-300 p-3">₹25K - ₹5L</td>
                  <td className="border border-gray-300 p-3">14-20%</td>
                  <td className="border border-gray-300 p-3 bg-green-50">Same day</td>
                  <td className="border border-gray-300 p-3">Crisis funding</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Choose */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Choose the Right Type?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-900 mb-4 text-xl">✅ Choose Based on Purpose:</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Medical Emergency</p>
                  <p className="text-sm text-gray-700">→ Medical Loan (lower rates, higher amounts)</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Multiple Credit Cards</p>
                  <p className="text-sm text-gray-700">→ Debt Consolidation (save on interest)</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Urgent Cash Need</p>
                  <p className="text-sm text-gray-700">→ Instant Loan (fastest approval)</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Planned Wedding</p>
                  <p className="text-sm text-gray-700">→ Wedding Loan (better terms for planned expenses)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-red-900 mb-4 text-xl">❌ Avoid These Mistakes:</h3>
              <div className="space-y-3">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Using Instant Loan for Planned Expenses</p>
                  <p className="text-sm text-gray-700">Higher rates! Plan ahead and get better terms.</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Taking Emergency Loan for Vacation</p>
                  <p className="text-sm text-gray-700">Save instead! Don't pay 18% for a trip.</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Business Loan for Personal Use</p>
                  <p className="text-sm text-gray-700">Banks may ask for business documents.</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Not Comparing Types</p>
                  <p className="text-sm text-gray-700">Same amount can have different rates across types!</p>
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
                <span className="text-gray-800">8 types of personal loans: Instant, Medical, Wedding, Travel, Debt Consolidation, Business, Education, Emergency</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Interest rates vary: 11-20% depending on type, amount, and your profile</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Choose based on purpose: Medical loans for healthcare, debt consolidation for multiple debts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Instant loans are fastest (2-24 hours) but cost more. Plan ahead for better rates!</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Check Your Eligibility Next! 📊</h2>
          <p className="text-purple-100 mb-6">
            Now that you know the types, let's see which personal loan you're eligible for and how much you can get!
          </p>
          <a
            href="/learn/personal-loans/personal-loan-eligibility"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: Eligibility Calculator →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default TypesOfPersonalLoans;
