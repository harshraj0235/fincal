import React from 'react';
import { Briefcase, CheckCircle, TrendingUp, Award, Target } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ChooseBestLoan: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How to Choose Best Home Loan in India: Complete Decision Framework 2025"
        description="Complete guide to choosing the best home loan - compare interest rates, fees, flexibility, service. 15-point checklist + scoring system. Make the perfect choice!"
        keywords="best home loan India, how to choose home loan, compare home loans, home loan decision, best home loan rates"
        canonicalUrl="/learn/home-loans/choose-best-loan"
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="choose-best-loan"
        breadcrumb={['Learn', 'Home Loans', 'Choose Best Loan']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Briefcase className="h-6 w-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Your Final Decision Guide!</h3>
              <p className="text-gray-700">
                You've learned everything about home loans! Now let's put it all together and choose the BEST loan for YOUR situation. This framework will save you ₹5-10 lakhs! 💰
              </p>
            </div>
          </div>
        </div>

        {/* 4-Factor Framework */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">4-Factor Scoring Framework</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
            <p className="text-gray-800 mb-4">
              <strong>Score each bank out of 100 points</strong> across 4 factors:
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-blue-400">
                <p className="font-bold text-blue-900">Interest Rate</p>
                <p className="text-3xl font-bold text-blue-700">40%</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-green-400">
                <p className="font-bold text-green-900">Fees & Charges</p>
                <p className="text-3xl font-bold text-green-700">20%</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-orange-400">
                <p className="font-bold text-orange-900">Flexibility</p>
                <p className="text-3xl font-bold text-orange-700">20%</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-purple-400">
                <p className="font-bold text-purple-900">Service</p>
                <p className="text-3xl font-bold text-purple-700">20%</p>
              </div>
            </div>
          </div>

          {/* Factor 1: Interest Rate (40 points) */}
          <div className="bg-white border-2 border-blue-300 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Factor 1: Interest Rate (40 points)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300 text-sm">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Rate Offered</th>
                    <th className="border border-gray-300 p-3 text-left">Points</th>
                    <th className="border border-gray-300 p-3 text-left">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3">8.25-8.50%</td>
                    <td className="border border-gray-300 p-3 font-bold text-green-700">40/40</td>
                    <td className="border border-gray-300 p-3">Excellent ⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3">8.51-8.75%</td>
                    <td className="border border-gray-300 p-3 font-bold">35/40</td>
                    <td className="border border-gray-300 p-3">Very Good ⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3">8.76-9.00%</td>
                    <td className="border border-gray-300 p-3 font-bold">30/40</td>
                    <td className="border border-gray-300 p-3">Good ⭐⭐⭐</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3">9.01-9.50%</td>
                    <td className="border border-gray-300 p-3 font-bold text-orange-700">20/40</td>
                    <td className="border border-gray-300 p-3">Average ⭐⭐</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 p-3">Above 9.50%</td>
                    <td className="border border-gray-300 p-3 font-bold text-red-700">10/40</td>
                    <td className="border border-gray-300 p-3">Poor ⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Factor 2: Fees (20 points) */}
          <div className="bg-white border-2 border-green-300 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">Factor 2: Fees & Charges (20 points)</h3>
            <div className="space-y-2 text-gray-800">
              <p><strong>Processing Fee:</strong> Lower is better (0.25-0.50% = 20pts, 1%+ = 10pts)</p>
              <p><strong>Prepayment Penalty:</strong> NO penalty = 10pts, 2-4% = 0pts</p>
              <p><strong>Legal/Valuation:</strong> Included free = 5pts, ₹10K+ = 0pts</p>
            </div>
          </div>

          {/* Factor 3: Flexibility (20 points) */}
          <div className="bg-white border-2 border-orange-300 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-orange-900 mb-4">Factor 3: Flexibility (20 points)</h3>
            <div className="space-y-2 text-gray-800">
              <p><strong>Tenure Options:</strong> 5-30 years flexible = 10pts</p>
              <p><strong>Part Payment:</strong> Allowed anytime = 5pts</p>
              <p><strong>Top-Up Availability:</strong> Yes = 5pts</p>
            </div>
          </div>

          {/* Factor 4: Service (20 points) */}
          <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Factor 4: Service Quality (20 points)</h3>
            <div className="space-y-2 text-gray-800">
              <p><strong>Branch Network:</strong> Nationwide = 10pts</p>
              <p><strong>Online/App:</strong> Full digital = 5pts</p>
              <p><strong>Customer Reviews:</strong> 4+ stars = 5pts</p>
            </div>
          </div>
        </section>

        {/* Example Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Example: Bank A vs Bank B vs Bank C</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Factor</th>
                  <th className="border border-gray-300 p-3">Bank A (SBI)</th>
                  <th className="border border-gray-300 p-3">Bank B (HDFC)</th>
                  <th className="border border-gray-300 p-3">Bank C (LIC)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3">Interest Rate</td>
                  <td className="border border-gray-300 p-3">8.60% (35 pts)</td>
                  <td className="border border-gray-300 p-3">8.70% (30 pts)</td>
                  <td className="border border-gray-300 p-3 bg-green-50">8.40% (40 pts)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Processing Fee</td>
                  <td className="border border-gray-300 p-3 bg-green-50">0.35% (18 pts)</td>
                  <td className="border border-gray-300 p-3">0.50% (15 pts)</td>
                  <td className="border border-gray-300 p-3">0.40% (16 pts)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3">Flexibility</td>
                  <td className="border border-gray-300 p-3">Good (18 pts)</td>
                  <td className="border border-gray-300 p-3 bg-green-50">Excellent (20 pts)</td>
                  <td className="border border-gray-300 p-3">Good (16 pts)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">Service</td>
                  <td className="border border-gray-300 p-3 bg-green-50">Excellent (20 pts)</td>
                  <td className="border border-gray-300 p-3 bg-green-50">Excellent (20 pts)</td>
                  <td className="border border-gray-300 p-3">Good (15 pts)</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-3 font-bold">TOTAL SCORE</td>
                  <td className="border border-gray-300 p-3 font-bold">91/100</td>
                  <td className="border border-gray-300 p-3 font-bold">85/100</td>
                  <td className="border border-gray-300 p-3 font-bold text-green-700 text-xl">87/100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-blue-100 border-2 border-blue-400 rounded-lg p-4">
            <p className="font-bold text-blue-900">Winner: Bank A (SBI) with 91 points!</p>
            <p className="text-gray-800">Despite LIC having lowest rate, SBI wins due to excellent all-round package!</p>
          </div>
        </section>

        {/* 15-Point Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">15-Point Checklist Before Signing</h2>
          
          <div className="space-y-3">
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">1. Compared at least 5 banks?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">2. Interest rate ≤ 8.75%?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">3. Processing fee ≤ 0.50%?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">4. Floating rate (NOT fixed)?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">5. NO prepayment penalty?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">6. EMI ≤ 35% of income?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">7. Added woman co-applicant (if possible)?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">8. CIBIL score checked (750+)?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">9. Read full loan agreement?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">10. Property independently valued?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">11. Title clear (no legal issues)?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">12. Balance transfer option available?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">13. Top-up facility offered?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">14. All fees in writing (no verbal promises)?</span>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-300 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">15. Comfortable with 20-year commitment to this bank?</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white text-center">
            <p className="text-xl font-bold">If you answered YES to 13+/15 → GO AHEAD! 🎉</p>
            <p className="text-green-100 mt-2">If less than 10, reconsider or get better offers!</p>
          </div>
        </section>

        {/* Final Decision Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">10-Step Final Action Plan</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">1</div>
                <p className="text-gray-800">Check CIBIL score 3 months before (improve to 750+ if needed)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">2</div>
                <p className="text-gray-800">Calculate eligibility using our Calculator (know your budget!)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">3</div>
                <p className="text-gray-800">Apply to 5-6 banks simultaneously (SBI, HDFC, ICICI, LIC, Axis, Kotak)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">4</div>
                <p className="text-gray-800">Get written quotes (rate, fees, terms) from all</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">5</div>
                <p className="text-gray-800">Score each using 4-factor framework (40+20+20+20)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">6</div>
                <p className="text-gray-800">Negotiate with top 2 banks (play them against each other!)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">7</div>
                <p className="text-gray-800">Get property independently valued (avoid valuation shock!)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">8</div>
                <p className="text-gray-800">Read ENTIRE loan agreement (don't sign blindly!)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">9</div>
                <p className="text-gray-800">Get everything in writing (no verbal promises!)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">10</div>
                <p className="text-gray-800 font-bold">Sign with highest-scoring bank and celebrate! 🎉</p>
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
                <span className="text-gray-800">Use 4-factor framework: Rate (40%), Fees (20%), Flexibility (20%), Service (20%)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Apply to 5+ banks, score each, choose highest total score</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Lowest rate doesn't always = best loan! Consider total cost + flexibility</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">15-point checklist must score 13+/15 before signing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Negotiate spread by 0.25-0.50% - this alone saves ₹2-4 lakhs!</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Course Complete */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">🎊 Congratulations! Course Complete! 🎊</h2>
            <p className="text-purple-100 mb-6 text-lg">
              You've mastered ALL 20 Home Loans lessons! You now know more than 90% of home buyers in India. Ready to make smart decisions and save lakhs!
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
              <p className="text-2xl font-bold mb-2">What You've Learned:</p>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div>
                  <p className="font-semibold">Basics</p>
                  <p className="text-sm text-purple-100">Types, eligibility, LTV</p>
                </div>
                <div>
                  <p className="font-semibold">Calculations</p>
                  <p className="text-sm text-purple-100">EMI, interest, tax benefits</p>
                </div>
                <div>
                  <p className="font-semibold">Strategies</p>
                  <p className="text-sm text-purple-100">Prepayment, transfer, choosing best</p>
                </div>
              </div>
            </div>
            <a
              href="/learn"
              className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
            >
              Explore More Categories →
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default ChooseBestLoan;


