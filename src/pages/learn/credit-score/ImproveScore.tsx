import React from 'react';
import { TrendingUp, CheckCircle, AlertCircle, Target, Calendar, Shield, Zap } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ImproveScore: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How to Improve Credit Score from 650 to 750+ in 6 Months | MoneyCal"
        description="Proven strategies to improve CIBIL score quickly. Learn 15 actionable steps to boost credit score from 650 to 750+ in 6 months. Get better loan rates and approvals!"
        keywords="improve credit score, increase CIBIL score, how to improve credit score fast, boost credit score, CIBIL score improvement tips, credit score 750+"
        canonicalUrl="https://moneycal.in/learn/credit-score/improve-score"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Improve Credit Score to 750+ in 6 Months',
          description: 'Step-by-step guide to improve your CIBIL credit score from 650 to 750+ within 6 months',
          totalTime: 'P6M',
          step: [
            { '@type': 'HowToStep', name: 'Pay all bills on time', text: 'Set up auto-pay for credit cards and loans' },
            { '@type': 'HowToStep', name: 'Reduce credit utilization', text: 'Keep credit card usage under 30% of limit' },
            { '@type': 'HowToStep', name: 'Check credit report', text: 'Review and dispute any errors' }
          ]
        }}
      />
      
      <LearnLayout
        category="credit-score"
        currentLesson="improve-score"
        breadcrumb={['Learn', 'Credit Score', 'Improve Score in 6 Months']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <TrendingUp className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Transform Your Financial Future!</h3>
          <p className="text-gray-700">
                Improving your credit score from 650 to 750+ can save you ₹5-7 lakhs on a home loan! This proven 6-month plan will boost your score and open doors to better financial opportunities. 📈💰
          </p>
            </div>
          </div>
        </div>

        {/* Why 750+ Matters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why 750+ Credit Score is a Game-Changer (क्यों ज़रूरी है?)
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="font-bold text-lg text-gray-900">With 750+ Score:</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✅ 2-3% lower interest rates</li>
                <li>✅ 95% loan approval rate</li>
                <li>✅ Higher loan amounts (20-30% more)</li>
                <li>✅ Premium credit cards approved</li>
                <li>✅ Pre-approved loan offers</li>
                <li>✅ Save ₹5-7L on ₹50L home loan</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-orange-100 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="font-bold text-lg text-gray-900">With 650 Score:</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>❌ Higher interest rates (2-3% more)</li>
                <li>❌ 60% loan approval rate</li>
                <li>❌ Lower loan amounts</li>
                <li>❌ Premium cards rejected</li>
                <li>❌ More documentation needed</li>
                <li>❌ Pay ₹5-7L extra in interest</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-3">💰 Real Money Impact (Example):</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-green-700 mb-2">750+ Credit Score:</p>
                <p className="text-gray-700">₹50L home loan @ 8.5% for 20 years</p>
                <p className="font-bold text-gray-900">EMI: ₹43,391</p>
                <p className="text-gray-600 text-sm">Total Interest: ₹54.14L</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-red-700 mb-2">650 Credit Score:</p>
                <p className="text-gray-700">₹50L home loan @ 11% for 20 years</p>
                <p className="font-bold text-gray-900">EMI: ₹51,579</p>
                <p className="text-gray-600 text-sm">Total Interest: ₹73.79L</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-200 rounded-lg text-center">
              <p className="font-bold text-green-900 text-xl">
                💸 You SAVE ₹19.65 LAKHS with better credit score!
              </p>
            </div>
          </div>
        </section>

        {/* 6-Month Action Plan */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
            <h2 className="text-3xl font-bold mb-2">6-Month Action Plan to 750+ 🎯</h2>
            <p className="text-blue-100">Follow these proven strategies month by month</p>
          </div>

          {/* Month 1-2 */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
              <h3 className="font-bold text-xl text-gray-900">Month 1-2: Foundation Building 🏗️</h3>
              <p className="text-gray-600">Focus: Fix basics and stop damage</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white border-2 border-green-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-green-700 text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Get Your Credit Report (Free!)</h4>
                    <p className="text-gray-700 mb-3">
                      Check your CIBIL, Experian, Equifax reports for errors. You're entitled to 1 free report per year from each bureau.
                    </p>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Action Steps:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>✓ Visit <a href="https://www.cibil.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cibil.com</a> and get free report</li>
                        <li>✓ Check for wrong addresses, incorrect loan details</li>
                        <li>✓ Look for accounts you don't recognize</li>
                        <li>✓ Note all late payments and defaults</li>
                      </ul>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-100 rounded">
                      <p className="text-sm text-gray-800">
                        <strong>💡 Impact:</strong> Disputing errors can instantly boost score by 20-50 points!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-green-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-green-700 text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Pay ALL Outstanding Dues Immediately</h4>
                    <p className="text-gray-700 mb-3">
                      Clear all pending credit card bills, loan EMIs, and overdue payments. This stops further score damage.
                    </p>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Priority Order:</p>
                      <ol className="text-sm text-gray-700 space-y-1 list-decimal ml-4">
                        <li>Overdue payments (90+ days) - URGENT!</li>
                        <li>Credit card bills due this month</li>
                        <li>Loan EMIs</li>
                        <li>Utility bills</li>
                      </ol>
                    </div>
                    <div className="mt-3 p-3 bg-blue-100 rounded">
                      <p className="text-sm text-gray-800">
                        <strong>💡 Tip:</strong> Borrow from family if needed - better than ruining credit score!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-green-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-green-700 text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Set Up Auto-Pay for Everything</h4>
                    <p className="text-gray-700 mb-3">
                      Never miss a payment again! Payment history is 35% of your score - the MOST important factor.
                    </p>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Set Auto-Pay For:</p>
                      <div className="grid md:grid-cols-2 gap-2">
                        <div className="bg-white p-2 rounded border border-green-300">
                          <p className="font-semibold text-gray-900 text-sm">Credit Cards:</p>
                          <p className="text-xs text-gray-600">Set for full payment, not minimum!</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-green-300">
                          <p className="font-semibold text-gray-900 text-sm">Loan EMIs:</p>
                          <p className="text-xs text-gray-600">Auto-debit from salary account</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-green-300">
                          <p className="font-semibold text-gray-900 text-sm">Phone/Internet:</p>
                          <p className="text-xs text-gray-600">Postpaid bill auto-pay</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-green-300">
                          <p className="font-semibold text-gray-900 text-sm">Utilities:</p>
                          <p className="text-xs text-gray-600">Electricity, gas bills</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-green-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-green-700 text-lg">4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Reduce Credit Card Utilization Below 30%</h4>
                    <p className="text-gray-700 mb-3">
                      Credit utilization is 30% of your score. High utilization signals financial stress to lenders.
                    </p>
                    <div className="bg-green-50 p-3 rounded mb-3">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Current vs Target:</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-red-700 font-bold">❌ Bad: 80% Usage</span>
                            <span className="text-red-700">₹40,000 / ₹50,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-red-500 h-3 rounded-full" style={{width: '80%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-green-700 font-bold">✅ Good: 25% Usage</span>
                            <span className="text-green-700">₹12,500 / ₹50,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{width: '25%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">How to Reduce:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Pay bill multiple times per month (before statement date)</li>
                        <li>• Request credit limit increase (doesn't need usage increase)</li>
                        <li>• Spread spending across 2-3 cards if you have multiple</li>
                        <li>• Use debit card for some purchases this month</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 bg-green-100 border-2 border-green-400 rounded-xl">
              <p className="font-bold text-gray-900 mb-2">📊 Expected Score Change (Month 1-2):</p>
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">Starting Score: 650</p>
                <p className="text-green-700 font-bold text-lg">After Month 2: 670-680 (+20-30 points) 📈</p>
                <p className="text-sm text-gray-600 mt-2">
                  Main boost from: Clearing dues, fixing errors, reducing utilization
                </p>
              </div>
            </div>
          </div>

          {/* Month 3-4 */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
              <h3 className="font-bold text-xl text-gray-900">Month 3-4: Building Positive History 📈</h3>
              <p className="text-gray-600">Focus: Establish consistent good behavior</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">5</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Perfect Payment Record for 60 Days</h4>
                    <p className="text-gray-700 mb-3">
                      Make EVERY payment 3-4 days BEFORE due date. This shows responsibility to credit bureaus.
                    </p>
                    <div className="bg-blue-50 p-4 rounded">
                      <p className="font-semibold text-gray-900 mb-3">🎯 Payment Checklist (Do This Monthly):</p>
                      <div className="space-y-2">
                        <label className="flex items-start cursor-pointer">
                          <input type="checkbox" className="mt-1 mr-3" />
                          <span className="text-sm text-gray-700">Credit card bills paid 4 days before due date</span>
                        </label>
                        <label className="flex items-start cursor-pointer">
                          <input type="checkbox" className="mt-1 mr-3" />
                          <span className="text-sm text-gray-700">All loan EMIs auto-debited successfully</span>
                        </label>
                        <label className="flex items-start cursor-pointer">
                          <input type="checkbox" className="mt-1 mr-3" />
                          <span className="text-sm text-gray-700">Phone/internet bills paid</span>
                        </label>
                        <label className="flex items-start cursor-pointer">
                          <input type="checkbox" className="mt-1 mr-3" />
                          <span className="text-sm text-gray-700">Rent (if tracked by credit bureau)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">6</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Keep Utilization Under 30% Consistently</h4>
                    <p className="text-gray-700 mb-3">
                      Don't let it spike! Check usage weekly and pay mid-cycle if needed.
                    </p>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Pro Strategy:</p>
                      <p className="text-sm text-gray-700 mb-2">
                        Statement date matters! Banks report your balance on statement generation date, not due date.
                      </p>
                      <div className="bg-white p-3 rounded border-2 border-blue-300 mt-2">
                        <p className="font-bold text-gray-900 text-sm mb-1">Example:</p>
                        <p className="text-xs text-gray-700">Statement Date: 1st of month</p>
                        <p className="text-xs text-gray-700">Due Date: 18th of month</p>
                        <p className="text-xs text-green-700 font-bold mt-2">
                          ✓ Pay before 1st to show low utilization in credit report!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">7</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Don't Apply for New Credit</h4>
                    <p className="text-gray-700 mb-3">
                      Every loan/card application creates a "hard inquiry" that temporarily lowers score by 5-10 points.
                    </p>
                    <div className="bg-red-50 p-3 rounded border-2 border-red-300">
                      <p className="font-bold text-red-900 mb-2">❌ Avoid During Months 3-4:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• New credit card applications</li>
                        <li>• Loan applications (personal, car, etc.)</li>
                        <li>• Multiple credit checks</li>
                        <li>• Co-signing for others' loans</li>
                      </ul>
                    </div>
                    <div className="mt-3 p-3 bg-green-100 rounded">
                      <p className="text-sm text-gray-800">
                        <strong>✅ Exception:</strong> Credit limit increase on existing card is OK (soft inquiry)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 bg-blue-100 border-2 border-blue-400 rounded-xl">
              <p className="font-bold text-gray-900 mb-2">📊 Expected Score Change (Month 3-4):</p>
              <div className="bg-white p-3 rounded">
                <p className="text-gray-700">After Month 2: 670-680</p>
                <p className="text-blue-700 font-bold text-lg">After Month 4: 700-720 (+30-40 points) 📈</p>
                <p className="text-sm text-gray-600 mt-2">
                  Main boost from: Consistent on-time payments, maintained low utilization
                </p>
              </div>
            </div>
          </div>

          {/* Month 5-6 */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-500 p-4 rounded-r-lg mb-4">
              <h3 className="font-bold text-xl text-gray-900">Month 5-6: Final Push to 750+ 🚀</h3>
              <p className="text-gray-600">Focus: Optimize and perfect your credit profile</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-purple-700 text-lg">8</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Optimize Credit Mix (If Applicable)</h4>
                    <p className="text-gray-700 mb-3">
                      Having both revolving credit (cards) and installment loans (EMI) shows you can handle different types. This is 10% of score.
                    </p>
                    <div className="bg-purple-50 p-4 rounded">
                      <p className="font-semibold text-gray-900 mb-3">Ideal Credit Mix:</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded border border-purple-300">
                          <p className="font-bold text-purple-700 text-sm mb-1">Revolving Credit:</p>
                          <p className="text-xs text-gray-700">1-2 credit cards (active use)</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-purple-300">
                          <p className="font-bold text-purple-700 text-sm mb-1">Installment Loans:</p>
                          <p className="text-xs text-gray-700">1 loan (home/car/personal)</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-100 rounded">
                      <p className="text-sm text-gray-800">
                        <strong>⚠️ Don't:</strong> Take a loan JUST for credit mix. Only if you genuinely need it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-purple-700 text-lg">9</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Keep Old Credit Cards Active</h4>
                    <p className="text-gray-700 mb-3">
                      Credit history length is 15% of score. Older accounts boost this. Don't close old cards!
                    </p>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Strategy for Old Cards:</p>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Use once every 3-6 months for small purchase (₹100-500)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Set up auto-pay for Netflix/Spotify subscription</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Pay full bill immediately to keep utilization low</span>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">DON'T close even if annual fee - negotiate waiver instead</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-purple-700 text-lg">10</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Request Credit Limit Increase</h4>
                    <p className="text-gray-700 mb-3">
                      Higher limit = lower utilization percentage with same spending. This instantly improves your credit utilization ratio!
                    </p>
                    <div className="bg-purple-50 p-4 rounded">
                      <p className="font-semibold text-gray-900 mb-2">Example Impact:</p>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border border-red-300">
                          <p className="text-sm font-bold text-red-700 mb-1">Before Limit Increase:</p>
                          <p className="text-sm text-gray-700">Spending: ₹20,000 | Limit: ₹50,000</p>
                          <p className="text-sm font-bold text-red-700">Utilization: 40% ❌ (Bad)</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-green-300">
                          <p className="text-sm font-bold text-green-700 mb-1">After Limit Increase:</p>
                          <p className="text-sm text-gray-700">Spending: ₹20,000 | Limit: ₹1,00,000</p>
                          <p className="text-sm font-bold text-green-700">Utilization: 20% ✅ (Excellent!)</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-green-100 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-1">How to Request:</p>
                      <p className="text-sm text-gray-700">
                        Call bank after 6-12 months of good payment history. Mention income increase if applicable.
                        Most banks approve via app/net banking too!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 rounded-xl">
              <p className="font-bold text-gray-900 mb-2 text-lg">🎉 Expected Score Change (Month 5-6):</p>
              <div className="bg-white p-4 rounded">
                <p className="text-gray-700">After Month 4: 700-720</p>
                <p className="text-green-700 font-bold text-2xl">After Month 6: 750-780! 🚀</p>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Congratulations!</strong> You've achieved excellent credit score. You now qualify for:
                </p>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>✓ Best loan interest rates (save lakhs!)</li>
                  <li>✓ Premium credit cards approved</li>
                  <li>✓ Pre-approved loan offers</li>
                  <li>✓ Higher loan amounts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bonus Tips for Faster Improvement ⚡</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6">
              <Zap className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-3">Become Authorized User</h3>
              <p className="text-gray-700 text-sm mb-2">
                Ask family member with excellent credit (750+) and low utilization to add you as authorized user on their old card.
              </p>
              <div className="bg-blue-100 p-3 rounded">
                <p className="text-xs text-gray-800">
                  <strong>Impact:</strong> Their good payment history gets added to your report! Can boost score by 30-50 points.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <Target className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-3">Become Authorized User</h3>
              <p className="text-gray-700 text-sm mb-2">
                Ask family member with excellent credit (750+) and low utilization to add you as authorized user on their old card.
              </p>
              <div className="bg-green-100 p-3 rounded">
                <p className="text-xs text-gray-800">
                  <strong>Impact:</strong> Their good payment history gets added to your report! Can boost score by 30-50 points.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What NOT to Do */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What NOT to Do ⚠️</h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">DON'T close old credit cards</p>
                <p className="text-sm text-gray-700">Reduces average account age & total available credit</p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">DON'T max out credit cards</p>
                <p className="text-sm text-gray-700">High utilization (80%+) severely damages score</p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">DON'T apply for multiple loans/cards in short time</p>
                <p className="text-sm text-gray-700">Each application = hard inquiry = score drop</p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">DON'T settle loans for less than owed</p>
                <p className="text-sm text-gray-700">"Settled" status on report is almost as bad as default</p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">DON'T pay just minimum due</p>
                <p className="text-sm text-gray-700">Shows financial stress + you pay 36-42% interest!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Track Progress */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Your Progress 📊</h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Free Credit Score Check Platforms:</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <p className="font-bold text-purple-700">CIBIL Official</p>
                <p className="text-sm text-gray-700 mb-2">1 free report/year</p>
                <a href="https://www.cibil.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Visit →</a>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <p className="font-bold text-purple-700">Paisabazaar</p>
                <p className="text-sm text-gray-700 mb-2">Free monthly updates</p>
                <a href="https://www.paisabazaar.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Visit →</a>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <p className="font-bold text-purple-700">BankBazaar</p>
                <p className="text-sm text-gray-700 mb-2">Free score check</p>
                <a href="https://www.bankbazaar.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Visit →</a>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <p className="font-bold text-purple-700">Experian</p>
                <p className="text-sm text-gray-700 mb-2">Free Experian score</p>
                <a href="https://www.experian.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Visit →</a>
              </div>
            </div>

            <div className="bg-yellow-100 p-3 rounded">
              <p className="text-sm text-gray-800">
                <strong>💡 Tip:</strong> Check score once a month to track progress. Don't check too frequently (doesn't update daily).
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/what-is-credit-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">What is Credit Score?</p>
                <p className="text-sm text-gray-600">Understand the basics first</p>
              </a>
              <a href="/learn/credit-score/how-calculated" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">How Score is Calculated</p>
                <p className="text-sm text-gray-600">Learn the 5 factors</p>
              </a>
              <a href="/learn/credit-cards/cibil-impact" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Credit Cards & CIBIL Impact</p>
                <p className="text-sm text-gray-600">Use cards wisely</p>
              </a>
              <a href="/learn/credit-score/check-score-free" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Check Score Free</p>
                <p className="text-sm text-gray-600">Get your free report</p>
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
              <span className="text-gray-800">750+ score can save you ₹5-7 lakhs on home loan</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Month 1-2: Clear dues, fix errors, set auto-pay (→ 670-680)</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Month 3-4: Perfect payment record, keep utilization &lt;30% (→ 700-720)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Month 5-6: Optimize mix, increase limits, maintain habits (→ 750-780)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Payment history (35%) and utilization (30%) are most important</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Never close old cards, pay before statement date, avoid multiple applications</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Start Your Journey to 750+ Today! 🚀</h2>
          <p className="text-green-100 mb-6">
            You now have the complete roadmap. Take action TODAY - check your credit report and start Month 1 immediately!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/learn/credit-score/check-score-free"
              className="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors"
            >
              Check Score Free →
            </a>
            <a
              href="/learn/credit-cards"
              className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-800 transition-colors"
            >
              Learn Credit Cards
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default ImproveScore;
