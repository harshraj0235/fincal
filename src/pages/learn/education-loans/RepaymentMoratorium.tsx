import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, IndianRupee, TrendingUp, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const RepaymentMoratorium: React.FC = () => {
  return (
    <LearnLayout
      category="education-loans"
      currentLesson="repayment-moratorium"
      breadcrumb={['Learn', 'Education Loans', 'Repayment & Moratorium Period']}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Clock className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Education Loan Repayment & Moratorium Period | रीपेमेंट और मोहलत अवधि
            </h1>
            <p className="text-pink-100 text-lg">
              When to start paying EMI? Complete guide to moratorium, repayment strategies, and smart planning
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Course + 1Yr</div>
            <div className="text-sm text-pink-100">Moratorium</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">₹0 EMI</div>
            <div className="text-sm text-pink-100">During Studies</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">15 Years</div>
            <div className="text-sm text-pink-100">Max Repayment</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Simple Int.</div>
            <div className="text-sm text-pink-100">During Moratorium</div>
          </div>
        </div>
      </div>

      {/* What is Moratorium */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Moratorium Period? | मोहलत अवधि क्या है?</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>Moratorium period (मोहलत अवधि)</strong> is the grace period during which you are <strong>NOT required to pay any EMI</strong>. 
            For education loans, moratorium = <strong>Course duration + 6 months to 1 year</strong> after course completion.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>हिंदी में:</strong> मोहलत अवधि वह समय है जब आपको EMI नहीं देनी होती। कोर्स की अवधि + कोर्स पूरा होने के 6 महीने से 1 साल बाद तक।
          </p>
          
          <div className="bg-pink-50 border-l-4 border-pink-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-pink-900 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Important to Understand | ध्यान दें
            </h4>
            <p className="text-gray-700 mb-3">
              During moratorium, you don't pay EMI, BUT <strong>simple interest keeps accumulating</strong> on the loan principal. 
              This interest is added to the principal amount when repayment starts.
            </p>
            <p className="text-gray-600">
              मोहलत के दौरान EMI नहीं देनी होती, लेकिन साधारण ब्याज (Simple Interest) जुड़ता रहता है और मूलधन में जुड़ जाता है।
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-blue-900 mb-3">Study in India (4-Year B.Tech)</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Year 1-4:</strong> Course period (No EMI)</li>
              <li>• <strong>Year 5:</strong> 1 year moratorium (No EMI)</li>
              <li>• <strong>Year 6 onwards:</strong> EMI starts</li>
              <li>• <strong>Total moratorium:</strong> 5 years</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-purple-900 mb-3">Study Abroad (2-Year MS)</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Year 1-2:</strong> Course period (No EMI)</li>
              <li>• <strong>Year 3:</strong> 1 year moratorium (No EMI)</li>
              <li>• <strong>Year 4 onwards:</strong> EMI starts</li>
              <li>• <strong>Total moratorium:</strong> 3 years</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3">PhD (5-Year)</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Year 1-5:</strong> Course period (No EMI)</li>
              <li>• <strong>Year 6:</strong> 1 year moratorium (No EMI)</li>
              <li>• <strong>Year 7 onwards:</strong> EMI starts</li>
              <li>• <strong>Total moratorium:</strong> 6 years</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Simple Interest During Moratorium */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Simple Interest During Moratorium | मोहलत के दौरान ब्याज</h2>
        
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border-2 border-orange-300">
          <p className="text-lg text-gray-700 mb-6">
            During moratorium period, <strong>simple interest</strong> (not compound interest) accrues on your loan. 
            This accumulated interest is added to the principal when EMI repayment starts.
          </p>
          
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <h4 className="font-bold text-xl text-orange-900 mb-4">Simple Interest Formula:</h4>
            <p className="text-2xl font-bold text-gray-900 mb-4">SI = (P × R × T) / 100</p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>P</strong> = Principal loan amount (मूल ऋण राशि)</li>
              <li><strong>R</strong> = Annual interest rate (वार्षिक ब्याज दर)</li>
              <li><strong>T</strong> = Time period in years (वर्षों में समय)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="font-bold text-xl text-orange-900 mb-4">Real Example:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Given:</h5>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between"><span>Loan Amount (P):</span><span className="font-bold">₹15,00,000</span></div>
                  <div className="flex justify-between"><span>Interest Rate (R):</span><span className="font-bold">9.5% p.a.</span></div>
                  <div className="flex justify-between"><span>Moratorium (T):</span><span className="font-bold">4 years</span></div>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Calculation:</h5>
                <div className="space-y-2 text-gray-700">
                  <p>SI = (15,00,000 × 9.5 × 4) / 100</p>
                  <p>SI = 5,70,000</p>
                  <div className="pt-3 border-t">
                    <strong>New Principal after Moratorium:</strong>
                    <p className="text-2xl font-bold text-orange-600">₹20,70,000</p>
                    <p className="text-sm text-gray-600">(Original ₹15L + SI ₹5.7L)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-orange-100 rounded-lg p-4">
              <p className="text-gray-700"><strong>Impact:</strong> Your EMI will be calculated on ₹20.7L (not ₹15L). This increases monthly EMI significantly!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Repayment Options */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Repayment Options During Moratorium | मोहलत के दौरान विकल्प</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Option 1: Pay Nothing</h3>
            <p className="text-gray-700 mb-4">Don't pay any EMI during moratorium. Let interest accumulate.</p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">Example (₹15L loan, 4 yr moratorium):</h5>
              <div className="space-y-1 text-sm text-gray-700">
                <p>Interest accrued: ₹5,70,000</p>
                <p>New Principal: ₹20,70,000</p>
                <p>EMI (10 yr @ 9.5%): ₹26,693</p>
              </div>
            </div>
            <div className="bg-red-50 p-3 rounded text-sm">
              <strong>⚠️ Downside:</strong> Higher EMI due to increased principal
            </div>
            <div className="bg-green-50 p-3 rounded text-sm mt-2">
              <strong>✅ Benefit:</strong> No immediate financial burden on student/family
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-400 ring-4 ring-green-100">
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">✅ Recommended</div>
            <h3 className="text-xl font-bold text-green-700 mb-4">Option 2: Pay Interest Only</h3>
            <p className="text-gray-700 mb-4">Pay only the interest during moratorium (not principal). Prevents interest capitalization.</p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">Example (₹15L loan, 4 yr moratorium):</h5>
              <div className="space-y-1 text-sm text-gray-700">
                <p>Monthly interest: ~₹11,875</p>
                <p>Interest paid (4 years): ₹5,70,000</p>
                <p>Final Principal: ₹15,00,000 (unchanged)</p>
                <p>EMI (10 yr @ 9.5%): ₹19,329</p>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded text-sm">
              <strong>✅ Benefit:</strong> Lower EMI after moratorium (₹26,693 vs ₹19,329 = Save ₹7,364/month!)
            </div>
            <div className="bg-blue-50 p-3 rounded text-sm mt-2">
              <strong>💡 Best for:</strong> Parents with steady income who can support during student's studies
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300">
            <h3 className="text-xl font-bold text-purple-700 mb-4">Option 3: Start EMI Early</h3>
            <p className="text-gray-700 mb-4">Start paying full EMI even during course period (waive moratorium).</p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <h5 className="font-semibold text-gray-900 mb-2">Example (₹15L loan, 10 yr repayment):</h5>
              <div className="space-y-1 text-sm text-gray-700">
                <p>Start EMI from Year 1</p>
                <p>Monthly EMI: ₹19,329</p>
                <p>Total interest: ₹16,19,480</p>
                <p>Loan closes: In 10 years (not 14 years)</p>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded text-sm">
              <strong>✅ Benefit:</strong> Lowest total interest, fastest loan closure
            </div>
            <div className="bg-red-50 p-3 rounded text-sm mt-2">
              <strong>⚠️ Challenge:</strong> Requires immediate cash flow (difficult for students)
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Repayment Options Comparison | विकल्पों की तुलना</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Option</th>
                <th className="px-6 py-4 text-left">During Moratorium</th>
                <th className="px-6 py-4 text-left">After Moratorium EMI</th>
                <th className="px-6 py-4 text-left">Total Interest</th>
                <th className="px-6 py-4 text-left">Total Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-pink-50">
                <td className="px-6 py-4 font-semibold">Pay Nothing</td>
                <td className="px-6 py-4">₹0</td>
                <td className="px-6 py-4 text-orange-600 font-bold">₹26,693</td>
                <td className="px-6 py-4 text-red-600">₹26,73,160</td>
                <td className="px-6 py-4">₹41,73,160</td>
              </tr>
              <tr className="hover:bg-pink-50 bg-green-50">
                <td className="px-6 py-4 font-semibold">Pay Interest Only ✅</td>
                <td className="px-6 py-4">₹11,875/month</td>
                <td className="px-6 py-4 text-green-600 font-bold">₹19,329</td>
                <td className="px-6 py-4 text-green-600">₹21,89,480</td>
                <td className="px-6 py-4">₹36,89,480</td>
              </tr>
              <tr className="hover:bg-pink-50">
                <td className="px-6 py-4 font-semibold">Start EMI Early</td>
                <td className="px-6 py-4 text-blue-600">₹19,329/month</td>
                <td className="px-6 py-4 text-blue-600 font-bold">₹19,329 (same)</td>
                <td className="px-6 py-4 text-green-600 font-bold">₹16,19,480</td>
                <td className="px-6 py-4 text-green-600 font-bold">₹31,19,480</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
          <h4 className="font-bold text-green-900 mb-2">💰 Savings Summary:</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Option 2 vs Option 1:</strong> Save ₹4,83,680 in total interest</li>
            <li>• <strong>Option 3 vs Option 1:</strong> Save ₹10,53,680 in total interest (but need immediate cash)</li>
            <li>• <strong>Best choice:</strong> Pay interest during moratorium if parents can afford (Option 2)</li>
          </ul>
        </div>
      </section>

      {/* Smart Strategies */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Smart Repayment Strategies | स्मार्ट रणनीतियाँ</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h4 className="font-bold text-xl text-gray-900 mb-3">Strategy 1: Partial Interest Payment</h4>
            <p className="text-gray-700 mb-4">
              If paying full interest is difficult, pay <strong>partial interest</strong> (e.g., ₹5,000-7,000/month). 
              This still reduces the interest burden significantly compared to paying nothing.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Example:</strong> On ₹15L loan @ 9.5%, if you pay ₹7,000/month during 4-year moratorium, 
                you save ₹3,36,000 in interest compared to paying nothing!
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <h4 className="font-bold text-xl text-gray-900 mb-3">Strategy 2: Use Summer Internship Money</h4>
            <p className="text-gray-700 mb-4">
              Students can use internship/part-time earnings during course to pay interest or make partial payments. 
              Even ₹50,000-1,00,000 payments help reduce burden.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>USA students:</strong> Summer internships at Google/Microsoft pay $8,000-10,000/month. 
                Use 50% of this (₹3-4L) towards loan to significantly reduce interest!
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <h4 className="font-bold text-xl text-gray-900 mb-3">Strategy 3: Get Job Before Moratorium Ends</h4>
            <p className="text-gray-700 mb-4">
              Try to secure a job and start earning <strong>before</strong> the 1-year post-course moratorium ends. 
              Use initial salary to start EMI payments early.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Goal:</strong> Get placed within 3-6 months of graduation. This gives you 6-9 months buffer before EMI starts. 
                Use this time to save emergency fund + first 3-6 months EMI amount.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
            <h4 className="font-bold text-xl text-gray-900 mb-3">Strategy 4: Negotiate Longer Repayment Tenure</h4>
            <p className="text-gray-700 mb-4">
              After getting a job, if EMI is too high (&gt;40% of salary), request bank to extend tenure from 10 to 12-15 years. 
              This reduces monthly EMI burden.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-3 rounded">
                <p className="text-sm"><strong>10-year EMI:</strong> ₹32,332</p>
                <p className="text-xs text-gray-600">40% of ₹80,000 salary</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm"><strong>15-year EMI:</strong> ₹26,125</p>
                <p className="text-xs text-gray-600">32% of ₹80,000 salary (more comfortable)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/education-loans/tax-benefits" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Tax Benefits Section 80E</div>
            <div className="text-sm text-pink-100">Save ₹50,000/year on taxes</div>
          </Link>
          <Link to="/learn/education-loans/scholarships-alternatives" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Scholarships & Alternatives</div>
            <div className="text-sm text-pink-100">Reduce loan burden</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default RepaymentMoratorium;

