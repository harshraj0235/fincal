import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, FileText, DollarSign, CheckCircle, Shield, Award,
  AlertTriangle, Calculator, Target, HelpCircle, Users, Building, Percent,
  TrendingDown, Download, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const TDSExplained: React.FC = () => {
  const [salaryIncome, setSalaryIncome] = useState(1000000);
  const [tdsDeducted, setTdsDeducted] = useState(112500);
  const [actualTaxLiability, setActualTaxLiability] = useState(90000);
  
  const refundAmount = Math.max(0, tdsDeducted - actualTaxLiability);
  const additionalTax = Math.max(0, actualTaxLiability - tdsDeducted);

  const faqData = [
    {
      question: "What is TDS and why is it deducted?",
      answer: "TDS = Tax Deducted at Source. It's advance tax collected by payer before paying you. Why: (1) Government gets tax throughout year (not waiting till ITR filing), (2) Prevents tax evasion, (3) Regular cash flow to govt. You get credit for TDS when filing ITR - either refund or adjust against total tax!"
    },
    {
      question: "How to check how much TDS was deducted from my salary?",
      answer: "3 ways: (1) Monthly payslip (shows TDS deducted that month), (2) Form 16 from employer (yearly summary), (3) Form 26AS on incometax.gov.in (all TDS from all sources). Form 26AS is most reliable - it shows what employer actually deposited!"
    },
    {
      question: "What is Form 16 and how to download it?",
      answer: "Form 16 = TDS certificate for salary income. Contains: Salary paid, TDS deducted, employer details. Issued by employer in June every year. Download: (1) Ask HR/Accounts, (2) Employer's payroll portal, (3) Email (sent May-June). Needed for ITR filing!"
    },
    {
      question: "What if my employer deducted more TDS than required?",
      answer: "You get REFUND when filing ITR! Example: TDS ₹1L but actual tax ₹80K → ₹20K refund. Common reasons: (1) Employer didn't consider your 80C investments, (2) Changed jobs mid-year, (3) Had losses to offset. File ITR to claim refund!"
    },
    {
      question: "What is Form 26AS and where to download it?",
      answer: "Form 26AS = Annual Tax Statement showing ALL TDS deducted on you (salary, FD interest, professional fees). Download: Login to incometax.gov.in → e-File → Income Tax Returns → View Form 26AS. Verify this matches Form 16 before filing ITR!"
    },
    {
      question: "What is the TDS rate on FD interest?",
      answer: "10% TDS if FD interest crosses ₹40,000/year (₹50K for senior citizens). Example: FD interest ₹60K → TDS ₹6K deducted. To avoid TDS: Submit Form 15G (if income under ₹2.5L) or Form 15H (senior citizens under ₹3L). Bank won't deduct TDS!"
    },
    {
      question: "What is Form 15G and 15H?",
      answer: "Forms to AVOID TDS deduction if income is below taxable limit. Form 15G: For individuals under 60 with income under ₹2.5L. Form 15H: For senior citizens (60+) with income under ₹3L (₹5L for 80+). Submit to bank/payer at start of financial year. Valid for 1 year only!"
    },
    {
      question: "Can I claim TDS refund if I didn't file ITR?",
      answer: "NO! TDS refund only via ITR filing. Government won't automatically refund. Even if you had excess TDS deduction, must file ITR to claim it. Unclaimed refunds = lost forever after 7 years! Always file ITR to get your money back."
    },
    {
      question: "What is TDS on professional/freelance income?",
      answer: "10% TDS under Section 194J if payment crosses ₹30,000. Example: Freelance project ₹1L → Client deducts ₹10K TDS, pays you ₹90K. Client must give you Form 16A (TDS certificate). When filing ITR, show this ₹10K TDS - you may get refund if total income is low!"
    },
    {
      question: "How long does TDS refund take?",
      answer: "Usually 2-4 weeks after ITR verification. Process: (1) File ITR with correct TDS details, (2) Verify via Aadhaar OTP, (3) IT department processes (7-15 days), (4) Refund credited to bank via NEFT. Track status on incometax.gov.in → View Returns → Refund Status."
    },
    {
      question: "What if Form 16 and Form 26AS don't match?",
      answer: "RED FLAG! Employer may not have deposited TDS to government. (1) Compare both carefully, (2) File ITR based on Form 26AS ONLY (actual TDS deposited), (3) Inform employer immediately, (4) Don't claim TDS that's not in Form 26AS - IT will reject refund!"
    },
    {
      question: "Can TDS be deducted on rent income?",
      answer: "YES! If monthly rent crosses ₹50,000, tenant must deduct 5% TDS (Section 194-IB). Example: Rent ₹60K/month = ₹7.2L/year → Tenant deducts ₹36K TDS, pays you ₹6.84L. Tenant deposits TDS to govt, gives you certificate. Show in ITR!"
    },
    {
      question: "What is TDS deduction limit for interest income?",
      answer: "Bank FD/RD interest: ₹40,000/year (₹50K for seniors). Above this, bank deducts 10% TDS. Example: FD interest ₹60K → TDS ₹6K. Can avoid by submitting Form 15G/15H if income is below taxable limit. Interest from savings account: No TDS (exempt)!"
    },
    {
      question: "Do I need to pay advance tax if employer already deducts TDS?",
      answer: "Usually NO if only salary income (TDS sufficient). But YES if: (1) Have capital gains from selling shares/property, (2) Freelance/business income, (3) Rental income, (4) TDS not covering full tax. If tax liability after TDS crosses ₹10K, must pay advance tax quarterly!"
    },
    {
      question: "How to download TDS certificates online?",
      answer: "Form 16 (salary): From employer. Form 16A (other income): Download from TRACES website (tdscpc.gov.in) → Login with PAN → View/Download Form 16A. All TDS from banks, clients auto-available on TRACES. Or check Form 26AS on IT portal!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="TDS Explained 2025: Tax Deducted at Source, Form 16/16A, Certificate, Claim Refund India | MoneyCal"
        description="Complete TDS (Tax Deducted at Source) guide: What is TDS, why deducted, TDS rates on salary (slab), FD interest (10% above ₹40K), professional fees (10%), rent (5%). Form 16 vs Form 16A vs Form 26AS. How to claim excess TDS refund in ITR. Form 15G/15H to avoid TDS. Hindi + English"
        keywords="TDS India 2025, tax deducted at source, Form 16, Form 16A, Form 26AS, TDS certificate, TDS refund, Form 15G 15H, TDS on FD, TDS on rent, TDS क्या है"
        url="/learn/taxation-compliance/tds-tax-deducted-at-source-certificate-claim-refund-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Taxation</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 4 of 7</span>
                <Link 
                  to="/learn/taxation-compliance"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <span className="hidden sm:inline">Back to Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl shadow-lg">
                <Percent className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                  Lesson 4 • 35 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  TDS Explained 2025
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  Tax Deducted at Source - TDS क्या है
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-teal-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Master
              </h3>
              <ul className="space-y-2 text-teal-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>What is TDS and why it's deducted (advance tax system)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>TDS rates: Salary (slab), FD (10%), Rent (5%), Professional fees (10%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Form 16, 16A, 26AS: Differences and how to download</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>How to claim TDS refund (when TDS exceeds tax liability)</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* TDS Refund Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                🧮 TDS Refund Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Annual Salary Income (₹)</label>
                  <input
                    type="number"
                    value={salaryIncome}
                    onChange={(e) => setSalaryIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">TDS Deducted (from Form 26AS)</label>
                  <input
                    type="number"
                    value={tdsDeducted}
                    onChange={(e) => setTdsDeducted(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Actual Tax Liability (after 80C, 80D deductions)</label>
                  <input
                    type="number"
                    value={actualTaxLiability}
                    onChange={(e) => setActualTaxLiability(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>
              </div>

              {refundAmount > 0 ? (
                <div className="bg-green-500 rounded-xl p-6 text-center">
                  <div className="text-sm opacity-90 mb-1">You'll Get REFUND!</div>
                  <div className="text-5xl font-bold">₹{refundAmount.toLocaleString('en-IN')}</div>
                  <p className="text-sm opacity-90 mt-2">File ITR to claim this refund (takes 2-4 weeks after filing)</p>
                </div>
              ) : (
                <div className="bg-red-500 rounded-xl p-6 text-center">
                  <div className="text-sm opacity-90 mb-1">You Need to Pay Additional Tax</div>
                  <div className="text-5xl font-bold">₹{additionalTax.toLocaleString('en-IN')}</div>
                  <p className="text-sm opacity-90 mt-2">TDS wasn't enough. Pay this when filing ITR!</p>
                </div>
              )}
            </div>
          </motion.section>

          {/* TDS Rates Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Percent className="w-8 h-8 text-blue-600" />
                TDS Rates on Different Income Types
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 font-bold text-gray-900">Income Type</th>
                      <th className="px-4 py-3 font-bold text-gray-900">TDS Rate</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Threshold</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Section</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: 'Salary', rate: 'As per slab', threshold: 'Above ₹2.5L', section: '192' },
                      { type: 'FD/RD Interest', rate: '10%', threshold: 'Above ₹40K/year (₹50K seniors)', section: '194A' },
                      { type: 'Professional/Freelance Fees', rate: '10%', threshold: 'Above ₹30K', section: '194J' },
                      { type: 'Rent (Individual)', rate: '5%', threshold: 'Above ₹50K/month', section: '194-IB' },
                      { type: 'Rent (Company)', rate: '10%', threshold: 'Above ₹2.4L/year', section: '194-I' },
                      { type: 'Commission/Brokerage', rate: '5%', threshold: 'Above ₹15K', section: '194H' },
                      { type: 'Lottery/Game Show', rate: '30%', threshold: 'Above ₹10K', section: '194B' },
                      { type: 'Sale of Property', rate: '1%', threshold: 'Above ₹50L', section: '194-IA' }
                    ].map((row, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50">
                        <td className="px-4 py-3 font-semibold">{row.type}</td>
                        <td className="px-4 py-3 text-green-600 font-bold">{row.rate}</td>
                        <td className="px-4 py-3 text-gray-700">{row.threshold}</td>
                        <td className="px-4 py-3 text-blue-600 text-sm">{row.section}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                ❓ Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Q{index + 1}: {faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>TDS = Advance tax:</strong> Payer deducts before paying you. You get credit when filing ITR</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Form 16:</strong> Salary TDS certificate from employer. Form 26AS = All TDS from all sources</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>TDS refund:</strong> If TDS deducted exceeds actual tax, file ITR to get refund!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Form 15G/15H:</strong> Submit to avoid TDS if income below taxable limit (₹2.5L/₹3L)</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Lessons</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/learn/taxation-compliance/itr-filing-complete-guide-online-income-tax-return-india-2025" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <FileText className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">ITR Filing Guide</h3>
                  <p className="text-sm text-gray-600">File return online</p>
                </Link>
                <Link to="/learn/taxation-compliance/section-80c-deductions-save-tax-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Section 80C</h3>
                  <p className="text-sm text-gray-600">Save ₹46,500 tax</p>
                </Link>
                <Link to="/calculators/income-tax-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <IndianRupee className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tax Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate tax liability</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Course Complete */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-12 h-12" />
              <h3 className="text-3xl font-bold">🎉 Lesson Complete!</h3>
            </div>
            <p className="text-xl mb-6">You've mastered TDS! Next: Capital Gains Tax.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/learn/taxation-compliance"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
                Back to Hub
              </Link>
              <Link
                to="/learn/taxation-compliance/capital-gains-tax-ltcg-stcg-equity-debt-property-india-2025"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Next: Capital Gains
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TDSExplained;
