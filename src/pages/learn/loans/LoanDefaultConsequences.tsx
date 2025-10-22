import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, XCircle, TrendingDown, Shield, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanDefaultConsequences: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="What Happens If You Default on a Loan? Complete Guide | MoneyCal Learn"
        description="Understand loan default consequences: CIBIL impact, asset seizure, legal action, NPA classification. Learn timeline, how to avoid default, and recovery options."
        keywords="loan default, what happens if loan not paid, NPA, loan default consequences, CIBIL score drop, loan recovery, asset seizure"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="loan-default-consequences"
        breadcrumb={['Learn', 'Loans & Credit', 'Loan Default Consequences']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            What Happens If You Default on a Loan?
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            लोन default करने पर क्या होता है - Complete Guide
          </p>

          {/* Critical Warning */}
          <div className="bg-red-100 border-2 border-red-500 p-6 rounded-xl mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-12 h-12 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-red-900 mb-2">
                  ⚠️ Loan Default is Serious!
                </h3>
                <p className="text-gray-800 text-lg mb-2">
                  Defaulting on a loan has severe, long-lasting consequences that affect your financial life for years.
                </p>
                <p className="text-gray-700">
                  <strong>Hindi में:</strong> Loan default मतलब EMI pay न करना। इसके बहुत serious consequences हैं: 
                  CIBIL score खराब होता है, asset जब्त हो सकती है, legal case हो सकता है, और future में loan नहीं मिलता।
                </p>
              </div>
            </div>
          </div>

          {/* Default Timeline */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Default Timeline: What Happens When</h2>
            <div className="space-y-4">
              {/* Day 1-30 */}
              <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-yellow-900">Day 1-30: First Missed EMI</h3>
                </div>
                <ul className="text-gray-700 space-y-2 ml-15">
                  <li>• <strong>Day 1:</strong> Late payment fee charged (₹500-1,000)</li>
                  <li>• <strong>Day 5-10:</strong> Reminder calls/SMS from bank</li>
                  <li>• <strong>Day 15:</strong> Overdue marked in records</li>
                  <li>• <strong>Day 30:</strong> <span className="text-red-700 font-semibold">CIBIL score drops 50-100 points</span></li>
                </ul>
              </div>

              {/* Day 31-90 */}
              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-orange-900">Day 31-90: Escalation</h3>
                </div>
                <ul className="text-gray-700 space-y-2 ml-15">
                  <li>• Frequent collection calls (daily)</li>
                  <li>• Visit to residence/office by recovery agents</li>
                  <li>• Notice sent to co-applicant/guarantor</li>
                  <li>• Penalty interest charged (2-3% extra)</li>
                  <li>• <span className="text-red-700 font-semibold">Future loan applications rejected</span></li>
                </ul>
              </div>

              {/* Day 90+ */}
              <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-red-900">Day 90+: NPA & Legal Action</h3>
                </div>
                <ul className="text-gray-700 space-y-2 ml-15">
                  <li>• <span className="text-red-700 font-bold">NPA (Non-Performing Asset) classification</span></li>
                  <li>• Legal notice sent (under SARFAESI Act for secured loans)</li>
                  <li>• <strong>Collateral seizure process begins</strong> (60-day notice)</li>
                  <li>• Credit cards, other loans may be blocked</li>
                  <li>• <span className="text-red-700 font-semibold">CIBIL score drops to 400-500 range</span></li>
                </ul>
              </div>

              {/* Day 180+ */}
              <div className="bg-gray-800 text-white p-6 rounded-xl border-2 border-gray-900">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <h3 className="text-xl font-bold">Day 180+: Asset Auction & Court</h3>
                </div>
                <ul className="space-y-2 ml-15">
                  <li>• <strong>Collateral auctioned</strong> (house, car, gold sold)</li>
                  <li>• Civil/criminal case filed in court</li>
                  <li>• Salary/bank account attachment possible</li>
                  <li>• Name in CIBIL defaulters list (7 years)</li>
                  <li>• <span className="text-red-400 font-bold">Blacklisted from all banks</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Avoid Default */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-green-900 mb-4">🛡️ How to Avoid Loan Default</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Set up auto-debit</strong> (never forget EMI date)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Maintain 3-month EMI buffer</strong> in savings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Borrow only 40-50% of income</strong> (safe FOIR)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Get loan insurance</strong> (covers EMI if job loss)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Contact bank immediately</strong> if facing difficulty</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Request restructuring</strong> (extend tenure, reduce EMI)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Ask for moratorium</strong> (3-6 month EMI pause)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Sell asset if needed</strong> (better than default)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Take personal loan</strong> to clear high-rate loan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Never hide from bank</strong> (they WILL find you!)</span>
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
                  Can I recover my credit score after default?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Yes, but takes time.</strong> Steps: (1) Clear all dues immediately, (2) Get <strong>NOC (No Objection Certificate)</strong> from lender, 
                  (3) Maintain perfect record for 24 months, (4) Score gradually improves 50-100 points/year. 
                  <strong>From 400 → 700</strong> = 2-3 years of clean history. Default stays on report for 7 years but impact reduces over time.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What is SARFAESI Act and how does it affect me?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>SARFAESI Act</strong> allows banks to seize collateral <strong>without court order</strong> after 90 days default. 
                  Process: (1) 60-day notice to borrower, (2) If still no payment, bank takes possession, (3) Asset auctioned within 30 days. 
                  <strong>No court involvement needed!</strong> This makes default very risky for secured loans. Bank can recover faster.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can bank send me to jail for loan default?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Generally NO</strong> for civil defaults (can't pay). Jail possible only if <strong>fraud proved</strong>: 
                  (1) Fake documents submitted, (2) Intent to defraud from start, (3) Cheque bounce under Section 138 (rare now). 
                  <strong>Normal default</strong> = Civil matter = Asset seizure + CIBIL damage, NOT jail. However, recovery agents may harass (illegal - complain to RBI!).
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What if I genuinely can't pay due to job loss?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Contact bank IMMEDIATELY!</strong> Options available: (1) <strong>Moratorium</strong> - 3-6 month EMI holiday (interest still accrues), 
                  (2) <strong>Loan restructuring</strong> - extend tenure, reduce EMI, (3) <strong>Part-sale of property</strong> (if divisible), 
                  (4) <strong>One-time settlement</strong> (pay 60-80% of outstanding, close loan). Banks prefer settlement over NPA - negotiate!
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/calculate-true-cost" className="text-gray-600 hover:text-blue-600">
              ← Previous: Calculate True Cost
            </a>
            <a href="/learn/loans/repayment-options" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Repayment Options →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "What Happens If You Default on a Loan?",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default LoanDefaultConsequences;



