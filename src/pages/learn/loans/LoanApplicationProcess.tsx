import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, CheckCircle, Clock, Award } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanApplicationProcess: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Step-by-Step Guide to Applying for a Loan in India | Complete Process"
        description="Complete loan application process from eligibility check to disbursal. Learn each step for home, personal, car loans with timeline, documents, and tips for quick approval."
        keywords="loan application process, how to apply for loan, loan application steps, loan approval process, loan sanction process, apply for home loan"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="loan-application-process"
        breadcrumb={['Learn', 'Loans & Credit', 'Loan Application Process']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Step-by-Step Process of Taking a Loan in India
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Loan लेने की पूरी प्रक्रिया - Application to Disbursal
          </p>

          {/* Process Steps */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Application Process (10 Steps)</h2>
            
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Check Eligibility (Self-Assessment)</h3>
                    <p className="text-gray-700 mb-2">Use online eligibility calculator. Check: CIBIL score, income, existing EMIs, age.</p>
                    <div className="bg-white p-3 rounded-lg text-sm">
                      <p className="font-semibold text-gray-800">Timeline: 5 minutes</p>
                      <p className="text-gray-600">Impact: Soft inquiry - no CIBIL impact</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-600">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-900 mb-2">Compare Banks (3-4 Options)</h3>
                    <p className="text-gray-700 mb-2">Compare interest rates, processing fees, prepayment terms, total cost.</p>
                    <div className="bg-white p-3 rounded-lg text-sm">
                      <p className="font-semibold text-gray-800">Timeline: 2-3 hours</p>
                      <p className="text-gray-600">Use: Bank websites, loan aggregators</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-600">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Gather Documents</h3>
                    <p className="text-gray-700 mb-2">Collect: KYC, income proof, address proof, bank statements, property documents (if applicable).</p>
                    <div className="bg-white p-3 rounded-lg text-sm">
                      <p className="font-semibold text-gray-800">Timeline: 1-2 days</p>
                      <p className="text-gray-600">Tip: Make 2-3 self-attested sets</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps 4-10 Continued... */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <h4 className="font-bold text-gray-800">Submit Application</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Online or branch. Fill form carefully, attach documents.</p>
                  <p className="text-xs text-gray-600">Timeline: 30 minutes</p>
                </div>

                <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
                    <h4 className="font-bold text-gray-800">Document Verification</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Bank verifies authenticity, calls employer, checks address.</p>
                  <p className="text-xs text-gray-600">Timeline: 2-3 days</p>
                </div>

                <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">6</div>
                    <h4 className="font-bold text-gray-800">CIBIL Check & Credit Assessment</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Hard inquiry. Bank pulls credit report, calculates FOIR.</p>
                  <p className="text-xs text-gray-600">Timeline: 1 day | CIBIL drops 5-10 points</p>
                </div>

                <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">7</div>
                    <h4 className="font-bold text-gray-800">Property/Asset Valuation</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Technical/legal check of collateral (property/vehicle).</p>
                  <p className="text-xs text-gray-600">Timeline: 3-7 days (home loans only)</p>
                </div>

                <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">8</div>
                    <h4 className="font-bold text-gray-800">Sanction Letter Issued</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Bank approves loan with terms (amount, rate, tenure).</p>
                  <p className="text-xs text-gray-600">Timeline: 5-10 days total from application</p>
                </div>

                <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">9</div>
                    <h4 className="font-bold text-gray-800">Sign Loan Agreement</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Read carefully! All terms finalized here. Legally binding.</p>
                  <p className="text-xs text-gray-600">Timeline: 1 day (take time to read!)</p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-xl text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold">10</div>
                    <h4 className="font-bold">Loan Disbursal 🎉</h4>
                  </div>
                  <p className="text-sm mb-2">Money credited to your account! Start EMI from next month.</p>
                  <p className="text-xs opacity-90">Timeline: 1-2 days after signing</p>
                </div>
              </div>
            </div>
          </section>

          {/* Total Timeline */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Total Timeline by Loan Type
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Personal Loan</h4>
                <p className="text-3xl font-bold text-blue-700 mb-1">2-5 days</p>
                <p className="text-xs text-gray-600">Sometimes instant (pre-approved)</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Car Loan</h4>
                <p className="text-3xl font-bold text-green-700 mb-1">3-7 days</p>
                <p className="text-xs text-gray-600">Quick valuation needed</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Home Loan</h4>
                <p className="text-3xl font-bold text-orange-700 mb-1">2-3 weeks</p>
                <p className="text-xs text-gray-600">Property verification takes time</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/repayment-options" className="text-gray-600 hover:text-blue-600">
              ← Previous: Repayment Options
            </a>
            <a href="/learn/loans/compare-loan-offers" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Compare Loan Offers →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Apply for a Loan in India",
            "step": [
              { "@type": "HowToStep", "name": "Check Eligibility" },
              { "@type": "HowToStep", "name": "Compare Banks" },
              { "@type": "HowToStep", "name": "Gather Documents" },
              { "@type": "HowToStep", "name": "Submit Application" },
              { "@type": "HowToStep", "name": "Document Verification" },
              { "@type": "HowToStep", "name": "CIBIL Check" },
              { "@type": "HowToStep", "name": "Property Valuation" },
              { "@type": "HowToStep", "name": "Sanction Letter" },
              { "@type": "HowToStep", "name": "Sign Agreement" },
              { "@type": "HowToStep", "name": "Loan Disbursal" }
            ]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default LoanApplicationProcess;

