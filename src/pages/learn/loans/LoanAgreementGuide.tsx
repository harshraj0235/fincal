import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Eye, Shield, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanAgreementGuide: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Complete Guide to Loan Agreements in India | What to Check Before Signing"
        description="Understand loan agreements, key clauses, hidden charges, prepayment terms, foreclosure rules. Learn what to check before signing home, car, personal loan documents."
        keywords="loan agreement, loan contract, loan terms and conditions, prepayment clause, foreclosure charges, loan agreement checklist"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="loan-agreement-guide"
        breadcrumb={['Learn', 'Loans & Credit', 'Loan Agreement Guide']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Guide to Loan Agreements
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            लोन एग्रीमेंट को समझें - What to Check Before Signing
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
              <p className="text-lg text-red-800 font-semibold mb-2">
                ⚠️ NEVER sign a loan agreement without reading it completely!
              </p>
              <p className="text-gray-700">
                A loan agreement is a legally binding contract. Hidden charges, unfavorable terms, and fine print can cost you lakhs of rupees.
              </p>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Hindi में:</strong> Loan agreement एक legal document है जिसमें loan के सभी terms and conditions लिखे होते हैं। 
              इसमें interest rate, EMI, tenure, charges, prepayment rules सब कुछ होता है। Sign करने से पहले हर clause ध्यान से पढ़ें।
            </p>
          </section>

          {/* 15 Key Clauses */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15 Key Clauses to Check</h2>
            
            <div className="space-y-4">
              {/* Clause 1-5 */}
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  1. Loan Amount & Disbursal
                </h3>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2"><strong>Check:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Exact loan amount sanctioned</li>
                    <li>• Disbursal method (one-time or stages)</li>
                    <li>• Processing fee deducted upfront?</li>
                    <li>• Net amount you receive</li>
                  </ul>
                  <p className="text-xs text-red-600 mt-2">
                    ⚠️ If ₹50L sanctioned, you might receive only ₹49L after ₹1L processing fee!
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                <h3 className="font-bold text-green-900 mb-3">2. Interest Rate & Type</h3>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2"><strong>Verify:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Fixed or floating? Exact percentage?</li>
                    <li>• MCLR or repo-linked?</li>
                    <li>• Reset frequency (quarterly/yearly)</li>
                    <li>• Spread/margin over base rate</li>
                  </ul>
                  <p className="text-xs text-orange-600 mt-2">
                    ⚠️ "9% p.a." must specify if fixed or floating, calculation method!
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="font-bold text-purple-900 mb-3">3. EMI & Repayment Schedule</h3>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2"><strong>Confirm:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Monthly EMI amount (calculate yourself!)</li>
                    <li>• EMI start date (first payment date)</li>
                    <li>• Auto-debit setup required?</li>
                    <li>• Late payment penalty (₹500-1000)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <h3 className="font-bold text-orange-900 mb-3">4. Processing Fee & Charges</h3>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2"><strong>Hidden charges:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Processing fee: 0.5-2% of loan</li>
                    <li>• Documentation charges: ₹2-5K</li>
                    <li>• Legal/valuation fees: ₹5-10K</li>
                    <li>• Insurance premium (if mandatory)</li>
                    <li>• Stamp duty & registration</li>
                  </ul>
                  <p className="text-xs text-red-600 mt-2 font-semibold">
                    ⚠️ Total upfront cost = 2-4% of loan amount (₹50K-2L on ₹50L loan)!
                  </p>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  5. Prepayment & Foreclosure Terms
                </h3>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2"><strong>Critical clauses:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Prepayment allowed or not?</li>
                    <li>• Penalty: 0-4% of outstanding</li>
                    <li>• Minimum amount per prepayment</li>
                    <li>• Lock-in period (usually 6-12 months)</li>
                    <li>• Foreclosure (full closure) charges</li>
                  </ul>
                  <p className="text-xs text-green-600 mt-2">
                    ✅ RBI Rule: Floating rate home loans CANNOT charge prepayment penalty!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* More Important Clauses */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">6 More Critical Clauses</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">6. Default & Consequences</h4>
                <p className="text-sm text-gray-700">What happens if you miss 3, 6, 12 months? Asset seizure timeline, legal action clause.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">7. Insurance Requirements</h4>
                <p className="text-sm text-gray-700">Is life/property insurance mandatory? Can you choose your insurer or bank-tied?</p>
              </div>
              <div className="bg-white p-5 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">8. Hypothecation/Mortgage Details</h4>
                <p className="text-sm text-gray-700">Which asset pledged? How long? When released? Legal description of collateral.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">9. Interest Calculation Method</h4>
                <p className="text-sm text-gray-700">Daily reducing? Monthly? Annually? Flat rate vs reducing balance clearly stated?</p>
              </div>
              <div className="bg-white p-5 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">10. Change of Terms Clause</h4>
                <p className="text-sm text-gray-700">Can bank change rate/terms unilaterally? What's the notice period? Your rights?</p>
              </div>
              <div className="bg-white p-5 rounded-lg border-2 border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">11. Dispute Resolution</h4>
                <p className="text-sm text-gray-700">Which court/arbitration? Legal fees responsibility? Cooling-off period?</p>
              </div>
            </div>
          </section>

          {/* Before Signing Checklist */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              ✅ Before Signing: 10-Point Checklist
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Read <strong>every page</strong> - don't skip fine print</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Verify <strong>interest rate</strong> matches sanction letter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Check <strong>all charges</strong> (processing, legal, insurance)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Understand <strong>prepayment terms</strong> completely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Confirm <strong>EMI amount</strong> (calculate independently)</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Ask about <strong>default consequences</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Clarify <strong>collateral release process</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Get <strong>written clarification</strong> for doubts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Keep <strong>copies of all documents</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">□</span>
                  <span>Take <strong>24 hours to review</strong> - don't rush!</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I negotiate loan agreement terms?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Yes, some terms are negotiable!</strong> You can negotiate: (1) <strong>Interest rate</strong> (especially if good credit/relationship), 
                  (2) <strong>Processing fee</strong> (can reduce 0.5-1%), (3) <strong>Prepayment penalty</strong> (ask for waiver), 
                  (4) <strong>Insurance provider</strong> (use your own, cheaper). Non-negotiable: RBI regulations, standard T&C.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What if I find unfavorable terms after signing?
                </summary>
                <p className="mt-3 text-gray-700">
                  Limited options: (1) <strong>Within 3 days</strong> - some banks have cooling-off period (rare), (2) <strong>Prepay & exit</strong> - pay foreclosure charges, 
                  (3) <strong>Balance transfer</strong> to another bank (better terms), (4) <strong>Legal recourse</strong> if terms were misrepresented (costly, slow). 
                  <strong>Best: Read carefully BEFORE signing!</strong>
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What is a sanction letter vs loan agreement?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Sanction Letter</strong> = Bank's approval with basic terms (loan amount, rate, tenure). This is NOT binding yet. 
                  <strong>Loan Agreement</strong> = Final legal contract with ALL terms, charges, clauses. THIS is binding. 
                  Always verify sanction letter terms match agreement terms before signing!
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can bank change terms mid-way through loan?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Floating rate:</strong> Yes, rate changes with market (agreed in contract). 
                  <strong>Charges:</strong> Bank can change fees/charges with 30-day notice (RBI guideline). 
                  <strong>Cannot change:</strong> Principal, tenure (without your consent), prepayment rights (RBI protected for floating home loans). 
                  Check "change of terms" clause carefully!
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/check-eligibility" className="text-gray-600 hover:text-blue-600">
              ← Previous: Check Eligibility
            </a>
            <a href="/learn/loans/co-applicant-benefits" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Co-Applicant Benefits →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Complete Guide to Loan Agreements",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default LoanAgreementGuide;


