import React from 'react';
import { TrendingUp, Award, AlertCircle, CheckCircle, Target, BarChart3 } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CIBILScoreImpact: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="CIBIL Score Impact on Personal Loans: Complete Guide 2025 | MoneyCal"
        description="How CIBIL score affects personal loan approval and interest rates in India. CIBIL score ranges, impact on loan terms, tips to improve score. Complete guide!"
        keywords="CIBIL score personal loan, CIBIL score impact, personal loan CIBIL requirements, how to improve CIBIL score, CIBIL score ranges India"
        canonicalUrl="/learn/personal-loans/cibil-score-impact"
      />
      
      <LearnLayout
        category="personal-loans"
        currentLesson="cibil-score-impact"
        breadcrumb={['Learn', 'Personal Loans', 'CIBIL Score Impact']}
      >
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">CIBIL Score: Your Credit Report Card</h2>
            <p className="text-gray-700 text-lg">
              Your CIBIL score is like a report card for your credit behavior! It ranges from 300-900 and directly impacts your personal loan approval, interest rates, and loan terms. A good score can save you lakhs! 💰
            </p>
          </div>
        </section>

        {/* CIBIL Score Ranges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">CIBIL Score Ranges & Impact</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Excellent */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <div className="text-center">
                <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Excellent</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">750-900</div>
                <p className="text-green-700 text-sm mb-3">Best rates & terms</p>
                <div className="text-xs text-gray-700">
                  <p>• Interest: 11-12%</p>
                  <p>• Approval: 95%+</p>
                  <p>• Amount: Up to ₹40L</p>
                  <p>• Processing: Fast</p>
                </div>
              </div>
            </div>

            {/* Good */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6">
              <div className="text-center">
                <div className="bg-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Good</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">700-749</div>
                <p className="text-blue-700 text-sm mb-3">Decent rates</p>
                <div className="text-xs text-gray-700">
                  <p>• Interest: 12-14%</p>
                  <p>• Approval: 80-90%</p>
                  <p>• Amount: Up to ₹30L</p>
                  <p>• Processing: Normal</p>
                </div>
              </div>
            </div>

            {/* Fair */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
              <div className="text-center">
                <div className="bg-yellow-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-yellow-900 mb-2">Fair</h3>
                <div className="text-2xl font-bold text-yellow-600 mb-2">650-699</div>
                <p className="text-yellow-700 text-sm mb-3">Higher rates</p>
                <div className="text-xs text-gray-700">
                  <p>• Interest: 14-16%</p>
                  <p>• Approval: 60-70%</p>
                  <p>• Amount: Up to ₹20L</p>
                  <p>• Processing: Slower</p>
                </div>
              </div>
            </div>

            {/* Poor */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 rounded-xl p-6">
              <div className="text-center">
                <div className="bg-red-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-2">Poor</h3>
                <div className="text-2xl font-bold text-red-600 mb-2">300-649</div>
                <p className="text-red-700 text-sm mb-3">Rejection risk</p>
                <div className="text-xs text-gray-700">
                  <p>• Interest: 16-20%</p>
                  <p>• Approval: 20-40%</p>
                  <p>• Amount: Up to ₹10L</p>
                  <p>• Processing: Very slow</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Impact Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Impact: ₹5L Loan Comparison</h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">CIBIL Score</th>
                    <th className="border border-gray-300 p-3 text-left">Interest Rate</th>
                    <th className="border border-gray-300 p-3 text-left">3-Year EMI</th>
                    <th className="border border-gray-300 p-3 text-left">Total Interest</th>
                    <th className="border border-gray-300 p-3 text-left">Approval Chance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">750+ (Excellent)</td>
                    <td className="border border-gray-300 p-3 bg-green-50">11%</td>
                    <td className="border border-gray-300 p-3">₹16,370</td>
                    <td className="border border-gray-300 p-3 bg-green-50">₹89,320</td>
                    <td className="border border-gray-300 p-3 bg-green-50">95%+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">700-749 (Good)</td>
                    <td className="border border-gray-300 p-3 bg-blue-50">13%</td>
                    <td className="border border-gray-300 p-3">₹16,830</td>
                    <td className="border border-gray-300 p-3 bg-yellow-50">₹1,05,880</td>
                    <td className="border border-gray-300 p-3 bg-blue-50">80-90%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">650-699 (Fair)</td>
                    <td className="border border-gray-300 p-3 bg-yellow-50">15%</td>
                    <td className="border border-gray-300 p-3">₹17,330</td>
                    <td className="border border-gray-300 p-3 bg-orange-50">₹1,23,880</td>
                    <td className="border border-gray-300 p-3 bg-yellow-50">60-70%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Below 650 (Poor)</td>
                    <td className="border border-gray-300 p-3 bg-red-50">18%</td>
                    <td className="border border-gray-300 p-3">₹18,100</td>
                    <td className="border border-gray-300 p-3 bg-red-50">₹1,51,600</td>
                    <td className="border border-gray-300 p-3 bg-red-50">20-40%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border-2 border-purple-400">
              <p className="font-bold text-purple-700">💡 Key Insight:</p>
              <p className="text-gray-700">CIBIL score difference of 100 points (750 vs 650) can cost you ₹62,280 extra in interest over 3 years!</p>
            </div>
          </div>
        </section>

        {/* How CIBIL Score is Calculated */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How CIBIL Score is Calculated</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-blue-900 mb-3">Factors Affecting CIBIL Score:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Payment History (35%):</strong> Timely EMI payments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Credit Utilization (30%):</strong> How much credit you use</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Credit History Length (15%):</strong> How long you've had credit</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Credit Mix (10%):</strong> Different types of credit</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>New Credit (10%):</strong> Recent credit applications</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-3">What Banks Check:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Past loan repayment behavior</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Credit card usage patterns</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Existing loan obligations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Default history (if any)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Recent credit inquiries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Improve CIBIL Score */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Improve Your CIBIL Score</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-900 mb-4 text-xl">✅ Do's to Improve Score:</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Pay EMIs on Time</p>
                  <p className="text-sm text-gray-700">Set auto-debit for all loan EMIs and credit card bills</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Keep Credit Utilization Low</p>
                  <p className="text-sm text-gray-700">Use only 30% of your credit card limit</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Don't Close Old Credit Cards</p>
                  <p className="text-sm text-gray-700">Longer credit history improves your score</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Check CIBIL Report Regularly</p>
                  <p className="text-sm text-gray-700">Dispute errors and incorrect information</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Maintain Credit Mix</p>
                  <p className="text-sm text-gray-700">Have both secured and unsecured credit</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-red-900 mb-4 text-xl">❌ Don'ts (Score Killers):</h3>
              <div className="space-y-3">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Miss EMI Payments</p>
                  <p className="text-sm text-gray-700">Even 1 missed payment can drop score by 50+ points</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Max Out Credit Cards</p>
                  <p className="text-sm text-gray-700">Using 90%+ of limit shows financial stress</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Apply for Multiple Loans</p>
                  <p className="text-sm text-gray-700">Too many inquiries in short time hurts score</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Default on Any Loan</p>
                  <p className="text-sm text-gray-700">Default stays on report for 7 years</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Co-sign for Others</p>
                  <p className="text-sm text-gray-700">Their defaults affect your score too</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline to Improve Score */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline to Improve CIBIL Score</h2>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-green-900 mb-2">Immediate (1-3 months)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Pay all pending EMIs</li>
                  <li>• Reduce credit card usage</li>
                  <li>• Dispute errors in report</li>
                  <li>• Set up auto-debit</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-blue-900 mb-2">Short-term (3-6 months)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Maintain timely payments</li>
                  <li>• Keep utilization under 30%</li>
                  <li>• Avoid new credit applications</li>
                  <li>• Monitor score monthly</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-purple-900 mb-2">Long-term (6-12 months)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Build positive credit history</li>
                  <li>• Maintain good credit mix</li>
                  <li>• Keep old accounts active</li>
                  <li>• Regular credit monitoring</li>
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
                <span className="text-gray-800">CIBIL score 750+ gets best rates (11-12%), 650-749 gets decent rates (12-14%)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">100-point score difference can save ₹60K+ in interest over 3 years</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Payment history (35%) and credit utilization (30%) are most important factors</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Improve score by paying EMIs on time, keeping credit usage under 30%, avoiding multiple applications</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Debt Consolidation Next! 🔄</h2>
          <p className="text-purple-100 mb-6">
            Now that you understand CIBIL scores, let's learn how to use personal loans for debt consolidation to improve your credit score!
          </p>
          <a
            href="/learn/personal-loans/debt-consolidation"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: Debt Consolidation →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default CIBILScoreImpact;

