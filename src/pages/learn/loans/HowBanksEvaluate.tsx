import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, User, DollarSign, FileText, Award } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const HowBanksEvaluate: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How Banks Evaluate Loan Applications in India | Complete Guide"
        description="Learn how banks assess loan applications: credit score, income, employment, debt-to-income ratio, and 10+ evaluation criteria. Tips to improve approval chances."
        keywords="loan approval process, how banks evaluate loans, loan eligibility criteria, CIBIL score, debt to income ratio, loan approval tips"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="how-banks-evaluate"
        breadcrumb={['Learn', 'Loans & Credit', 'How Banks Evaluate Loans']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            How Banks Evaluate Loan Applications
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            बैंक लोन कैसे approve करते हैं - Complete Process
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              When you apply for a loan, banks assess your <strong>creditworthiness</strong> - your ability and willingness to repay. 
              They use 10+ factors to decide approval, loan amount, and interest rate.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Hindi में:</strong> Banks 3 main चीजें देखते हैं: (1) क्या आप loan repay कर सकते हैं? (income, employment), 
              (2) क्या आप loan repay करेंगे? (credit history, CIBIL score), और (3) अगर नहीं repay करते तो क्या recover कर सकते हैं? (collateral, assets).
            </p>
          </section>

          {/* The 3 C's */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The 3 C's of Loan Evaluation</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-lg border-2 border-green-200">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-green-800 mb-2">1. Capacity</h3>
                <p className="text-sm text-gray-700 mb-2"><strong>Can you repay?</strong></p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Income & employment</li>
                  <li>• Debt-to-income ratio</li>
                  <li>• Existing EMIs</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-blue-800 mb-2">2. Character</h3>
                <p className="text-sm text-gray-700 mb-2"><strong>Will you repay?</strong></p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Credit score (CIBIL)</li>
                  <li>• Payment history</li>
                  <li>• Past defaults</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-purple-200">
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="font-bold text-purple-800 mb-2">3. Collateral</h3>
                <p className="text-sm text-gray-700 mb-2"><strong>What can we recover?</strong></p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Property, assets</li>
                  <li>• Co-applicant backing</li>
                  <li>• Guarantors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 10 Key Evaluation Factors */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10 Key Evaluation Factors</h2>
            
            {/* Factor 1 */}
            <div className="mb-4 bg-white p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">1. Credit Score (CIBIL)</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Weight: 40% of decision</strong> - Most important factor for unsecured loans
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="font-semibold text-gray-800">750-900</p>
                        <p className="text-green-700">✅ Excellent (approved easily)</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">650-749</p>
                        <p className="text-yellow-700">⚠️ Good (may approve)</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">550-649</p>
                        <p className="text-orange-700">❌ Fair (difficult)</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">&lt;550</p>
                        <p className="text-red-700">❌ Poor (rejected)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Factor 2 */}
            <div className="mb-4 bg-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-2">2. Income & Stability</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Monthly income</strong> determines how much EMI you can afford
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2"><strong>Minimum Income Requirements:</strong></p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Personal Loan:</strong> ₹15,000-25,000/month (salaried)</li>
                      <li>• <strong>Home Loan:</strong> ₹25,000-50,000/month</li>
                      <li>• <strong>Car Loan:</strong> ₹20,000-30,000/month</li>
                      <li>• <strong>Higher income</strong> = Higher loan amount & better rate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Factor 3 */}
            <div className="mb-4 bg-white p-6 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-purple-900 mb-2">3. Employment Type & History</h3>
                  <p className="text-gray-700 mb-3">
                    Job stability matters - longer employment = lower risk
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-purple-800 mb-2">✅ Preferred:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Govt job (best)</li>
                        <li>• MNC/large company employee</li>
                        <li>• 2+ years same employer</li>
                        <li>• Permanent position</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-800 mb-2">❌ Risky:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Frequent job changes</li>
                        <li>• Contract/temporary</li>
                        <li>• New startup employee</li>
                        <li>• Self-employed &lt;3 years</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Factor 4 */}
            <div className="mb-4 bg-white p-6 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-orange-900 mb-2">4. Debt-to-Income Ratio (FOIR)</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>FOIR = (Total Monthly EMIs / Monthly Income) × 100</strong>
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800 mb-2">Example:</p>
                    <p className="text-sm text-gray-700 mb-2">
                      Income = ₹60,000/month<br/>
                      Existing EMIs = ₹15,000<br/>
                      FOIR = (15,000 / 60,000) × 100 = <strong>25%</strong>
                    </p>
                    <div className="mt-3 pt-3 border-t border-orange-200">
                      <p className="text-xs text-gray-600">
                        <strong>Bank Limits:</strong> FOIR should be ≤40-50%. 
                        If 50%, you can't take more loans. Lower FOIR = better approval chances.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Factors 5-10 in Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border-2 border-teal-200">
                <h3 className="font-bold text-teal-900 mb-2">5. Age</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Ideal:</strong> 25-50 years<br/>
                  <strong>Max age at end:</strong> 60-65 years<br/>
                  Too young (&lt;23) or old (&gt;55) = harder approval
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border-2 border-pink-200">
                <h3 className="font-bold text-pink-900 mb-2">6. Existing Loans & Credit Cards</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Too many loans</strong> = rejection<br/>
                  <strong>Good repayment history</strong> = approval<br/>
                  Banks check: Number of loans, timely payments, credit utilization
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border-2 border-indigo-200">
                <h3 className="font-bold text-indigo-900 mb-2">7. Company Profile</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Category A:</strong> Govt, PSU, large MNC<br/>
                  <strong>Category B:</strong> Established companies<br/>
                  <strong>Category C:</strong> Startups, small firms<br/>
                  Category A gets instant approval!
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border-2 border-red-200">
                <h3 className="font-bold text-red-900 mb-2">8. Residential Stability</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Own house:</strong> Big plus<br/>
                  <strong>Rented (3+ years):</strong> Good<br/>
                  <strong>Frequent moves:</strong> Red flag<br/>
                  Stability = trust
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border-2 border-yellow-200">
                <h3 className="font-bold text-yellow-900 mb-2">9. Loan Amount vs Property Value</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>LTV (Loan-to-Value):</strong><br/>
                  Home loan: Max 80-90% of property value<br/>
                  Higher down payment = better approval
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-2">10. Co-Applicant Income</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Adding spouse/parent:</strong> Increases eligibility<br/>
                  Combined income = higher loan amount<br/>
                  Tax benefits also increase
                </p>
              </div>
            </div>
          </section>

          {/* Bank's Decision Process */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bank's Decision-Making Process</h2>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">1️⃣</div>
                  <p className="font-semibold text-sm">Application Submitted</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">2️⃣</div>
                  <p className="font-semibold text-sm">Document Verification</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">3️⃣</div>
                  <p className="font-semibold text-sm">CIBIL Check</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">4️⃣</div>
                  <p className="font-semibold text-sm">Eligibility Calculation</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">5️⃣</div>
                  <p className="font-semibold text-sm">Approval/Rejection</p>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                ⏱️ Timeline: 2-7 days for personal loans, 2-3 weeks for home loans
              </p>
            </div>
          </section>

          {/* Tips to Improve Approval */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-green-900 mb-4">🎯 10 Tips to Improve Loan Approval Chances</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Maintain 750+ credit score</strong> for 6+ months before applying</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Close existing loans</strong> to reduce FOIR below 40%</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Add co-applicant</strong> (spouse/parent) to increase eligibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Show stable employment</strong> (2+ years same company)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Keep credit utilization</strong> below 30% on credit cards</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Never miss EMI payments</strong> for 12+ months before applying</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Make larger down payment</strong> (30% vs 20%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Apply to banks where you have accounts</strong> (relationship banking)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Don't apply to multiple banks</strong> simultaneously (affects score)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Have all documents ready</strong> (delays = rejection risk)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Common Rejection Reasons */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6" />
              Top 10 Reasons for Loan Rejection
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>❌ Low credit score (&lt;650)</li>
                <li>❌ High existing debt (FOIR &gt;50%)</li>
                <li>❌ Unstable employment (frequent job changes)</li>
                <li>❌ Insufficient income</li>
                <li>❌ Incomplete/fake documents</li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>❌ Recent loan defaults</li>
                <li>❌ Too many credit inquiries</li>
                <li>❌ Property issues (for home loans)</li>
                <li>❌ Age factor (too young/old)</li>
                <li>❌ Negative employer category</li>
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I get a loan with 600 credit score?
                </summary>
                <p className="mt-3 text-gray-700">
                  Very difficult for unsecured loans. For <strong>secured loans</strong> (home, car), possible but with:
                  (1) Higher interest rate (+2-3%), (2) Lower LTV (60-70% vs 80-90%), (3) Need strong co-applicant, 
                  (4) Larger down payment required. Better to improve score to 650+ before applying.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  How long does loan approval take?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Personal Loan:</strong> 2-5 days (sometimes instant pre-approved)<br/>
                  <strong>Car Loan:</strong> 3-7 days<br/>
                  <strong>Home Loan:</strong> 2-3 weeks (property verification takes time)<br/>
                  <strong>Gold Loan:</strong> Same day (1-2 hours)<br/>
                  Delays happen if: Documents incomplete, property title unclear, CIBIL check issues.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Does checking eligibility affect credit score?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Soft inquiry</strong> (eligibility check on bank website) = <strong>No impact</strong>. 
                  <strong>Hard inquiry</strong> (formal application with documents) = <strong>5-10 point drop</strong>. 
                  Multiple hard inquiries in 30 days = Major red flag. Check eligibility first (soft inquiry), 
                  then apply to 1-2 banks only.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What if my loan gets rejected?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Don't apply elsewhere immediately!</strong> Steps: (1) Ask rejection reason from bank, 
                  (2) Wait 3-6 months, (3) Fix the issue (improve score, close loans, increase income), 
                  (4) Apply again. Multiple rejections in short time = very bad for future applications.
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/types-of-loans" className="text-gray-600 hover:text-blue-600">
              ← Previous: Types of Loans
            </a>
            <a href="/learn/loans/what-is-emi" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: What Is EMI? →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "How Banks Evaluate Loan Applications",
            "description": "Complete guide to loan approval process, evaluation criteria, tips to improve approval chances",
            "educationalLevel": "Beginner",
            "learningResourceType": "Tutorial",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default HowBanksEvaluate;

