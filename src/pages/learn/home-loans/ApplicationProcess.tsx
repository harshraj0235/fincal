import React from 'react';
import { ClipboardCheck, CheckCircle, Clock } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ApplicationProcess: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Home Loan Application Process: Step-by-Step Guide 2025 | MoneyCal"
        description="Complete home loan application process in India - from pre-qualification to disbursement. Timeline, steps, approval stages explained in simple Hindi-English!"
        keywords="home loan application process, home loan steps, how to apply home loan, home loan approval process, loan disbursement"
        canonicalUrl="https://moneycal.in/learn/home-loans/application-process"
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="application-process"
        breadcrumb={['Learn', 'Home Loans', 'Application Process']}
      >
        {/* Timeline Overview */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-7 w-7 text-blue-600 mr-3" />
              Total Timeline: 15-30 Days
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                <p className="text-sm text-gray-600">Pre-Approval</p>
                <p className="text-xl font-bold text-blue-700">2-5 days</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                <p className="text-sm text-gray-600">Verification</p>
                <p className="text-xl font-bold text-green-700">5-7 days</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                <p className="text-sm text-gray-600">Valuation & Legal</p>
                <p className="text-xl font-bold text-orange-700">5-10 days</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                <p className="text-sm text-gray-600">Sanction & Disbursal</p>
                <p className="text-xl font-bold text-purple-700">3-7 days</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7 Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7 Steps to Get Home Loan</h2>
          
          {/* Step 1 */}
          <div className="mb-6 bg-white border-2 border-blue-300 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4">1</div>
              <h3 className="text-2xl font-bold text-gray-900">Pre-Qualification (Optional but Recommended)</h3>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>What:</strong> Check how much loan you can get BEFORE property hunting.<br/>
              <strong>Time:</strong> 10 minutes<br/>
              <strong>Documents:</strong> Basic income proof, ID
            </p>
            <div className="bg-green-50 border border-green-300 rounded-lg p-4">
              <p className="font-bold text-green-900">✅ Benefits:</p>
              <ul className="ml-6 text-gray-700 list-disc">
                <li>Know your budget (don't waste time on ₹80L property if eligible for ₹40L only!)</li>
                <li>Seller takes you seriously</li>
                <li>Soft credit check (doesn't affect CIBIL)</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-6 bg-white border-2 border-green-300 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4">2</div>
              <h3 className="text-2xl font-bold text-gray-900">Property Selection & Token</h3>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>What:</strong> Find your dream home, negotiate, pay token amount<br/>
              <strong>Time:</strong> Varies (1 day - 3 months)<br/>
              <strong>Action:</strong> Pay ₹50K-2L token to block property
            </p>
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4">
              <p className="font-bold text-yellow-900">⚠️ Important:</p>
              <p className="text-gray-700">Get sale agreement drafted. Mention "Subject to home loan approval" clause!</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-6 bg-white border-2 border-purple-300 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4">3</div>
              <h3 className="text-2xl font-bold text-gray-900">Formal Application & Document Submission</h3>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>What:</strong> Fill application form, submit all documents<br/>
              <strong>Time:</strong> 1-2 days<br/>
              <strong>Fee:</strong> ₹500-2,000 application fee (refundable if rejected)
            </p>
            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Documents needed:</p>
              <ul className="ml-6 text-gray-700 list-disc text-sm">
                <li>KYC: PAN, Aadhaar, address proof</li>
                <li>Income: Salary slips (3), bank statements (6), Form 16</li>
                <li>Property: Sale agreement, seller's title deed</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mb-6 bg-white border-2 border-orange-300 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4">4</div>
              <h3 className="text-2xl font-bold text-gray-900">Verification & Credit Check</h3>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>What:</strong> Bank verifies all documents + checks CIBIL + calls employer<br/>
              <strong>Time:</strong> 5-7 days
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-300 rounded-lg p-3">
                <p className="font-semibold text-blue-900">What Bank Checks:</p>
                <ul className="ml-4 text-gray-700 text-sm list-disc">
                  <li>CIBIL score (expects 750+)</li>
                  <li>Employment verification</li>
                  <li>Income stability</li>
                  <li>Existing loans</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                <p className="font-semibold text-green-900">Your Actions:</p>
                <ul className="ml-4 text-gray-700 text-sm list-disc">
                  <li>Respond to bank calls promptly</li>
                  <li>Keep phone reachable</li>
                  <li>Inform employer to expect call</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="mb-6 bg-white border-2 border-red-300 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4">5</div>
              <h3 className="text-2xl font-bold text-gray-900">Property Valuation & Legal Check</h3>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>What:</strong> Bank's engineer visits property + lawyer checks title<br/>
              <strong>Time:</strong> 5-10 days<br/>
              <strong>Fee:</strong> ₹2,000-5,000 (you pay)
            </p>
            <div className="space-y-3">
              <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3">
                <p className="font-bold text-yellow-900">Valuation Risk:</p>
                <p className="text-gray-700 text-sm">If bank values property at ₹45L but you agreed ₹50L → Bank gives loan on ₹45L only. You pay ₹5L extra!</p>
              </div>
              <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                <p className="font-bold text-green-900">Legal Check:</p>
                <p className="text-gray-700 text-sm">Lawyer verifies: Clear title, no pending dues, approved construction, encumbrance certificate</p>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="mb-6 bg-white border-2 border-indigo-300 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4">6</div>
              <h3 className="text-2xl font-bold text-gray-900">Sanction Letter & Agreement</h3>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>What:</strong> Bank approves loan officially, you sign agreement<br/>
              <strong>Time:</strong> 2-3 days<br/>
              <strong>Validity:</strong> Sanction letter valid for 6 months
            </p>
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
              <p className="font-bold text-blue-900 mb-2">Sanction Letter Contains:</p>
              <ul className="ml-6 text-gray-700 list-disc text-sm">
                <li>Approved loan amount: ₹40,00,000</li>
                <li>Interest rate: 8.5% (floating)</li>
                <li>Tenure: 20 years</li>
                <li>EMI: ₹34,604/month</li>
                <li>Processing fee: ₹20,000 (0.5%)</li>
                <li>Conditions: Property insurance mandatory</li>
              </ul>
            </div>
            <div className="mt-3 bg-yellow-100 border border-yellow-400 rounded-lg p-3">
              <p className="text-sm text-gray-800"><strong>Pro Tip:</strong> Read ALL terms! Check prepayment penalty, rate change clause, foreclosure charges.</p>
            </div>
          </div>

          {/* Step 7 */}
          <div className="mb-6 bg-white border-2 border-green-400 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4">7</div>
              <h3 className="text-2xl font-bold text-gray-900">Disbursement & Registration</h3>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>What:</strong> Bank transfers money, property registered in your name<br/>
              <strong>Time:</strong> 3-7 days
            </p>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                <p className="font-bold text-green-900 mb-2">Disbursement Flow:</p>
                <ol className="ml-6 text-gray-700 list-decimal text-sm space-y-1">
                  <li>You pay stamp duty + registration (5-7% of property value)</li>
                  <li>Bank releases funds to seller's account</li>
                  <li>Property registered at sub-registrar office</li>
                  <li>Bank gets original documents (holds until loan repaid)</li>
                  <li>You get possession + copy of sale deed</li>
                  <li>EMI starts from next month</li>
                </ol>
              </div>
              <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4">
                <p className="font-bold text-blue-900">🎉 Congratulations! You're a homeowner!</p>
                <p className="text-gray-700 text-sm mt-1">First EMI will be debited next month. Set up auto-debit to never miss payment!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Delays */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5 Common Reasons for Delays</h2>
          
          <div className="space-y-4">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <h3 className="font-bold text-red-900 mb-2">1. Incomplete Documents (50% of delays)</h3>
              <p className="text-gray-700">Missing salary slip, expired address proof, unclear property papers. Keep all docs ready BEFORE applying!</p>
            </div>

            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-5">
              <h3 className="font-bold text-orange-900 mb-2">2. Property Title Issues (20%)</h3>
              <p className="text-gray-700">Seller's title not clear, pending court cases, unapproved construction. ALWAYS check title before token!</p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5">
              <h3 className="font-bold text-yellow-900 mb-2">3. Low CIBIL Score (15%)</h3>
              <p className="text-gray-700">Below 650: Rejected or needs more scrutiny (adds 10-15 days). Check CIBIL BEFORE applying!</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-5">
              <h3 className="font-bold text-purple-900 mb-2">4. Employer Verification Delay (10%)</h3>
              <p className="text-gray-700">HR doesn't respond to bank's call. Inform HR in advance, share bank's contact number.</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">5. Peak Season Rush (5%)</h3>
              <p className="text-gray-700">Festival season (Diwali, March year-end): Banks overloaded. Apply 45 days before you need money!</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Can I apply to multiple banks simultaneously?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: YES! Highly recommended!</strong> Apply to 3-5 banks at once. Each does hard credit check (affects CIBIL by 5-10 points), but multiple checks within 30 days count as ONE inquiry. Compare final offers and choose best!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: What if loan is rejected? Can I apply again?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: YES, but wait 3-6 months.</strong> Fix the issue first: Improve CIBIL, close existing loans, increase income. Immediate reapplication = another rejection (looks desperate to banks). Wait, fix, then reapply.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Can I cancel application after approval? Any penalty?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: YES, you can cancel.</strong> Before disbursement: No penalty (you lose processing fee ₹10-20K). After disbursement: You took the loan! Must repay with foreclosure charges (usually 2-4% for fixed rate, NO penalty for floating).
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
                <span className="text-gray-800">Total timeline: 15-30 days (if no issues)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">7 steps: Pre-qual → Property → Application → Verification → Valuation → Sanction → Disbursal</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">50% delays due to incomplete documents - prepare BEFORE applying!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Apply to 3-5 banks simultaneously for best offer</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">CIBIL Score Impact Next! 📊</h2>
          <p className="text-blue-100 mb-6">
            CIBIL score can make or break your application. Learn how to get 750+ and best rates!
          </p>
          <a
            href="/learn/home-loans/cibil-score-impact"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: CIBIL Score & Approval →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default ApplicationProcess;



