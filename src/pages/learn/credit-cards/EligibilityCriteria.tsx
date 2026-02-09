import React from 'react';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, User, DollarSign } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const EligibilityCriteria: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card Eligibility Criteria India 2024 - Check Requirements | MoneyCal"
        description="Complete credit card eligibility criteria for all banks in India. Age, income, credit score requirements for entry-level, premium and super-premium cards. Check before applying!"
        keywords="credit card eligibility, credit card requirements, minimum income for credit card, credit score for credit card, age limit credit card"
        canonicalUrl="https://moneycal.in/learn/credit-cards/eligibility-criteria"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Card Eligibility Criteria - Complete Guide',
          description: 'Comprehensive guide to credit card eligibility requirements in India',
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
        currentLesson="eligibility-criteria"
        breadcrumb={['Learn', 'Credit Cards', 'Eligibility Criteria']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Check Before You Apply - Save Your Credit Score!</h3>
          <p className="text-gray-700">
                Wrong applications hurt your credit score! Know exact eligibility criteria to apply only when you'll be approved. 
                This guide covers all requirements for every card type. ✅📊
          </p>
            </div>
          </div>
        </div>

        {/* Basic Eligibility Criteria */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Basic Eligibility Criteria (बुनियादी पात्रता)
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">5 Universal Requirements:</h3>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-center mb-3">
                  <User className="h-7 w-7 text-green-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">1. Age Requirement (आयु)</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-bold text-green-900 mb-2">✅ Minimum Age:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Primary Cardholder: <strong>21 years</strong></li>
                      <li>• Add-on Card: <strong>18 years</strong></li>
                      <li>• Some banks: 18 years for students</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-bold text-blue-900 mb-2">✅ Maximum Age:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Salaried: <strong>60-65 years</strong></li>
                      <li>• Self-employed: <strong>65-70 years</strong></li>
                      <li>• Varies by bank and card type</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-blue-300">
                <div className="flex items-center mb-3">
                  <DollarSign className="h-7 w-7 text-blue-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">2. Income Requirement (आय)</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="border border-gray-300 p-2 text-left">Card Type</th>
                        <th className="border border-gray-300 p-2">Salaried (Monthly)</th>
                        <th className="border border-gray-300 p-2">Self-Employed (Annual)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border border-gray-300 p-2 font-semibold">Entry-Level</td>
                        <td className="border border-gray-300 p-2 text-center text-green-700">₹15,000-25,000</td>
                        <td className="border border-gray-300 p-2 text-center text-green-700">₹2-3 lakhs</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-2 font-semibold">Mid-Range</td>
                        <td className="border border-gray-300 p-2 text-center text-blue-700">₹30,000-50,000</td>
                        <td className="border border-gray-300 p-2 text-center text-blue-700">₹4-6 lakhs</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-gray-300 p-2 font-semibold">Premium</td>
                        <td className="border border-gray-300 p-2 text-center text-purple-700">₹75,000-1,00,000</td>
                        <td className="border border-gray-300 p-2 text-center text-purple-700">₹10-15 lakhs</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-2 font-semibold">Super Premium</td>
                        <td className="border border-gray-300 p-2 text-center text-red-700">₹2,00,000+</td>
                        <td className="border border-gray-300 p-2 text-center text-red-700">₹25 lakhs+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-7 w-7 text-purple-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">3. Credit Score (क्रेडिट स्कोर)</h4>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-green-50 p-3 rounded border-2 border-green-400">
                    <p className="font-bold text-green-900 mb-1">750-900</p>
                    <p className="text-xs text-gray-700 mb-2">Excellent Score</p>
                    <p className="text-xs text-green-700">✅ All cards approved</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border-2 border-blue-400">
                    <p className="font-bold text-blue-900 mb-1">700-749</p>
                    <p className="text-xs text-gray-700 mb-2">Good Score</p>
                    <p className="text-xs text-blue-700">✅ Most cards approved</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border-2 border-yellow-400">
                    <p className="font-bold text-yellow-900 mb-1">650-699</p>
                    <p className="text-xs text-gray-700 mb-2">Fair Score</p>
                    <p className="text-xs text-yellow-700">⚠️ Entry-level cards</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Below 650? Consider <strong>secured credit cards</strong> (FD-backed) to build credit history.
          </p>
        </div>

              <div className="bg-white p-5 rounded-lg border-2 border-orange-300">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-7 w-7 text-orange-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">4. Employment Status (रोजगार स्थिति)</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-bold text-blue-900 mb-2">✅ For Salaried:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Minimum 6 months in current job</li>
                      <li>• Permanent/Confirmed employment preferred</li>
                      <li>• Probation period may affect approval</li>
                      <li>• Regular monthly salary credits</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-bold text-green-900 mb-2">✅ For Self-Employed:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Business age: Minimum 2 years</li>
                      <li>• Stable income shown in ITR</li>
                      <li>• Business registration required</li>
                      <li>• Regular business transactions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-center mb-3">
                  <AlertCircle className="h-7 w-7 text-red-600 mr-3" />
                  <h4 className="text-lg font-bold text-gray-900">5. Residency Status (निवास)</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="bg-green-50 p-3 rounded flex items-center justify-between">
                    <span className="text-gray-700">Indian Citizen (Resident)</span>
                    <span className="font-bold text-green-700">✅ All Cards</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded flex items-center justify-between">
                    <span className="text-gray-700">NRI (Non-Resident Indian)</span>
                    <span className="font-bold text-blue-700">✅ NRI Cards Only</span>
                  </div>
                  <div className="bg-red-50 p-3 rounded flex items-center justify-between">
                    <span className="text-gray-700">Foreign Nationals</span>
                    <span className="font-bold text-red-700">❌ Not Eligible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bank-Specific Eligibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Bank-Specific Eligibility Requirements
          </h2>

          <div className="space-y-4">
            {/* HDFC Bank */}
            <div className="bg-white border-2 border-blue-400 rounded-xl p-5">
              <h3 className="text-lg font-bold text-blue-900 mb-4">🏦 HDFC Bank Credit Cards</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Entry Cards</p>
                  <p className="text-xs text-gray-700">• Millennia: ₹35K/month</p>
                  <p className="text-xs text-gray-700">• Moneyback+: ₹25K/month</p>
                  <p className="text-xs text-gray-700">• Score: 700+</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Premium Cards</p>
                  <p className="text-xs text-gray-700">• Regalia: ₹1L/month</p>
                  <p className="text-xs text-gray-700">• Diners Black: ₹2L/month</p>
                  <p className="text-xs text-gray-700">• Score: 750+</p>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Super Premium</p>
                  <p className="text-xs text-gray-700">• Infinia: ₹3L/month</p>
                  <p className="text-xs text-gray-700">• Score: 800+</p>
                  <p className="text-xs text-gray-700">• By invitation only</p>
                </div>
              </div>
            </div>

            {/* SBI Cards */}
            <div className="bg-white border-2 border-green-400 rounded-xl p-5">
              <h3 className="text-lg font-bold text-green-900 mb-4">🏦 SBI Credit Cards</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Entry Cards</p>
                  <p className="text-xs text-gray-700">• SimplyCLICK: ₹20K/month</p>
                  <p className="text-xs text-gray-700">• SimplySAVE: ₹25K/month</p>
                  <p className="text-xs text-gray-700">• Score: 650+</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Cashback Cards</p>
                  <p className="text-xs text-gray-700">• Cashback: ₹20K/month</p>
                  <p className="text-xs text-gray-700">• Score: 700+</p>
                  <p className="text-xs text-gray-700">• Best online shoppers</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Premium Cards</p>
                  <p className="text-xs text-gray-700">• Prime: ₹50K/month</p>
                  <p className="text-xs text-gray-700">• Elite: ₹1L/month</p>
                  <p className="text-xs text-gray-700">• Score: 750+</p>
                </div>
              </div>
            </div>

            {/* ICICI Bank */}
            <div className="bg-white border-2 border-purple-400 rounded-xl p-5">
              <h3 className="text-lg font-bold text-purple-900 mb-4">🏦 ICICI Bank Credit Cards</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Lifetime Free</p>
                  <p className="text-xs text-gray-700">• Amazon Pay: ₹20K/month</p>
                  <p className="text-xs text-gray-700">• Score: 650+</p>
                  <p className="text-xs text-gray-700">• No annual fee</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Mid-Range</p>
                  <p className="text-xs text-gray-700">• Coral: ₹35K/month</p>
                  <p className="text-xs text-gray-700">• Rubyx: ₹50K/month</p>
                  <p className="text-xs text-gray-700">• Score: 700+</p>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Premium</p>
                  <p className="text-xs text-gray-700">• Sapphiro: ₹1L/month</p>
                  <p className="text-xs text-gray-700">• Emeralde: ₹2L/month</p>
                  <p className="text-xs text-gray-700">• Score: 750+</p>
                </div>
              </div>
            </div>

            {/* Axis Bank */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-5">
              <h3 className="text-lg font-bold text-orange-900 mb-4">🏦 Axis Bank Credit Cards</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Lifetime Free</p>
                  <p className="text-xs text-gray-700">• Flipkart: ₹18K/month</p>
                  <p className="text-xs text-gray-700">• Ace: ₹20K/month</p>
                  <p className="text-xs text-gray-700">• Score: 650+</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Travel Cards</p>
                  <p className="text-xs text-gray-700">• Vistara: ₹50K/month</p>
                  <p className="text-xs text-gray-700">• Score: 700+</p>
                  <p className="text-xs text-gray-700">• For frequent flyers</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="font-semibold text-gray-900 text-sm mb-2">Super Premium</p>
                  <p className="text-xs text-gray-700">• Magnus: ₹1.5L/month</p>
                  <p className="text-xs text-gray-700">• Reserve: ₹3L/month</p>
                  <p className="text-xs text-gray-700">• Score: 800+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Factors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Additional Factors That Affect Approval
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">✅ Positive Factors (Improve Chances):</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Existing relationship with bank (savings account, FD)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">High credit score (750+)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Stable employment (2+ years)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Low debt-to-income ratio (below 40%)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Owned property/assets</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Good payment history on existing credit</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">❌ Negative Factors (Reduce Chances):</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Recent loan defaults or settlements</span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Multiple credit inquiries (5+ in 6 months)</span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">High credit utilization (80%+)</span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Frequent job changes (3+ in 2 years)</span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">No credit history (credit invisible)</span>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">High existing debt (5+ loans)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Check Your Eligibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Self-Check: Are You Eligible? (स्व-जांच)
          </h2>

          <div className="bg-white border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Eligibility Calculator:</h3>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-3">Answer These Questions:</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">1. Are you 21+ years old?</span>
                    <div className="space-x-2">
                      <span className="text-green-700 font-bold">Yes ✅</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-red-700 font-bold">No ❌</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">2. Monthly income ₹15,000+ (salaried) or ₹2L+ annual (self-employed)?</span>
                    <div className="space-x-2">
                      <span className="text-green-700 font-bold">Yes ✅</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-red-700 font-bold">No ❌</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">3. Credit score 650+?</span>
                    <div className="space-x-2">
                      <span className="text-green-700 font-bold">Yes ✅</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-red-700 font-bold">No ❌</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">4. Have PAN card?</span>
                    <div className="space-x-2">
                      <span className="text-green-700 font-bold">Yes ✅</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-red-700 font-bold">No ❌</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex justify-between items-center">
                    <span className="text-gray-700">5. Stable employment/business (6+ months)?</span>
                    <div className="space-x-2">
                      <span className="text-green-700 font-bold">Yes ✅</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-red-700 font-bold">No ❌</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border-2 border-green-500">
                <p className="font-bold text-gray-900 mb-2">✅ Results:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>5 Yes:</strong> Excellent! Apply for any card matching your income</li>
                  <li>• <strong>4 Yes:</strong> Good! Apply for entry/mid-range cards</li>
                  <li>• <strong>3 Yes:</strong> Fair! Start with secured/lifetime free cards</li>
                  <li>• <strong>Below 3:</strong> Build credit history first (secured card or add-on card)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/documents-required" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Documents Required</p>
                <p className="text-sm text-gray-600">Complete document checklist</p>
              </a>
              <a href="/learn/credit-cards/application-process" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Application Process</p>
                <p className="text-sm text-gray-600">How to apply step-by-step</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">Boost your score for approval</p>
              </a>
              <a href="/learn/credit-cards/choose-best-card" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Choose Best Card</p>
                <p className="text-sm text-gray-600">Find perfect card match</p>
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
              <span className="text-gray-800">Basic requirements: Age 21+, income ₹15K+/month, credit score 650+, PAN card, stable employment</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Income varies by card: Entry (₹15-25K), Mid (₹30-50K), Premium (₹75K-1L), Super Premium (₹2L+)</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Credit score crucial: 750+ gets premium cards, 700+ mid-range, 650+ entry-level</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Existing bank relationship helps - 20-30% higher approval chances</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Check eligibility before applying - wrong applications hurt credit score!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Self-employed need: 2+ years business, ITR, GST registration, regular transactions</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Eligible? Apply Now! 🎯</h2>
          <p className="text-green-100 mb-6">
            Check your credit score, gather documents, and apply for the perfect card!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/learn/credit-score/check-score-free"
              className="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors"
            >
              Check Your Score Free →
            </a>
            <a
              href="/learn/credit-cards/application-process"
              className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-800 transition-colors"
            >
              Application Process
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default EligibilityCriteria;
