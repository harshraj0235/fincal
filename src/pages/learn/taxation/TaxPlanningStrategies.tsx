import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Award, CheckCircle, Shield, Zap,
  AlertTriangle, Calculator, Target, HelpCircle, DollarSign,
  TrendingDown, Building, Home, HeartHandshake
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const TaxPlanningStrategies: React.FC = () => {
  const [salary, setSalary] = useState(1200000);
  
  // Calculate tax savings
  const section80C = 150000 * 0.31; // ₹46,500
  const nps80CCD = 50000 * 0.31; // ₹15,500
  const healthInsurance = 25000 * 0.31; // ₹7,750
  const homeLoan = 200000 * 0.31; // ₹62,000
  const totalSavings = section80C + nps80CCD + healthInsurance + homeLoan;

  const faqData = [
    {
      question: "How can I save ₹1 lakh tax legally?",
      answer: "Combine multiple deductions: (1) 80C: ₹1.5L = Save ₹46,500, (2) NPS 80CCD(1B): ₹50K = Save ₹15,500, (3) Health insurance 80D: ₹25K = Save ₹7,750, (4) Home loan 24(b): ₹2L = Save ₹62,000, (5) HRA exemption: ₹2L = Save ₹62,000. Total savings: ₹1.94 Lakh in 31% bracket!"
    },
    {
      question: "What is salary structuring and how does it save tax?",
      answer: "Salary structuring: Arranging salary components to maximize tax-free allowances. Example: ₹15L CTC = ₹10L basic + ₹2L HRA (partly exempt) + ₹50K LTA (exempt) + ₹50K food coupons (exempt) + ₹2.5L special allowance. Can save ₹30K-50K annually with smart structuring!"
    },
    {
      question: "How to claim maximum HRA exemption?",
      answer: "HRA exempt = Least of: (1) Actual HRA received, (2) Rent paid - 10% of salary, (3) 50% of salary (metro) or 40% (non-metro). Example: Salary ₹10L, HRA ₹3L, Rent ₹4L, Metro → Exempt = Least of ₹3L, ₹3L (₹4L - 10% of ₹10L), ₹5L = ₹3L exempt!"
    },
    {
      question: "Can I claim both 80C and NPS 80CCD(1B)?",
      answer: "YES! They're separate. 80C: ₹1.5L (PPF, ELSS, insurance, etc). 80CCD(1B): EXTRA ₹50K only for NPS. Total tax-saving investment = ₹2L! In 30% bracket: Save ₹46,500 (80C) + ₹15,600 (NPS) = ₹62,100 tax savings!"
    },
    {
      question: "What are all Section 80 deductions available?",
      answer: "Major ones: 80C (₹1.5L), 80CCD(1B) NPS (₹50K), 80D health insurance (₹25K + ₹50K parents), 80DD disability (₹75K-1.25L), 80DDB medical (₹40K-1L), 80E education loan interest (full), 80G donations (50-100%), 80GG rent if no HRA, 80TTA savings interest (₹10K), 80TTB seniors interest (₹50K)."
    },
    {
      question: "How much can I save on home loan?",
      answer: "Two benefits: (1) Section 24(b): Home loan interest up to ₹2L (self-occupied). Save ₹62,400 in 30% bracket. (2) Section 80C: Principal repayment up to ₹1.5L (within 80C limit). Together: ₹3.5L deduction = Save ₹1.09L tax! Plus: Section 80EE (₹50K extra for first-time buyers)."
    },
    {
      question: "Should I opt for old tax regime or new tax regime?",
      answer: "Depends! Old regime: Lower rates BUT can claim all deductions (80C, HRA, home loan). New regime: Higher rates BUT no deductions (except NPS, employer contribution). Old is better if: (1) Have 80C investments, (2) Paying home loan, (3) Claiming HRA. New is better if: No deductions + want simpler ITR."
    },
    {
      question: "How to plan tax for next financial year (April onwards)?",
      answer: "Start now! (1) Estimate income for FY 2025-26, (2) Max out 80C: ₹1.5L (PPF/ELSS/insurance by March), (3) Start NPS: ₹50K (80CCD 1B), (4) Buy health insurance: ₹25K (80D), (5) Plan home loan prepayment (80C + 24b), (6) Calculate advance tax if needed. Plan in April, not March!"
    },
    {
      question: "Can I claim tax benefit on rent paid to parents?",
      answer: "YES! Pay rent to parents (make agreement), claim HRA exemption. Parents must show rental income in their ITR (tax-free if under ₹2.5L). Example: Pay ₹20K/month to parents → HRA exemption ₹2.4L/year = Save ₹74,880 in 31% bracket. Parents' income ₹2.4L (below ₹2.5L) = zero tax. Win-win!"
    },
    {
      question: "How much tax can senior citizens (60+) save?",
      answer: "Extra benefits: (1) Higher basic exemption: ₹3L (vs ₹2.5L), (2) 80D health insurance: ₹50K (vs ₹25K for others), (3) 80TTB bank interest: ₹50K (vs ₹10K), (4) No advance tax on non-business income. Total extra benefit: ₹30K-50K tax savings!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Tax Planning Strategies 2025: Minimize Tax Legally, Save ₹1 Lakh/Year India | MoneyCal"
        description="Advanced tax planning guide: Salary restructuring (HRA, LTA), maximize 80C (₹1.5L), NPS 80CCD(1B) (₹50K), health insurance 80D (₹25K), home loan 24(b) (₹2L), rent to parents, old vs new tax regime. Save ₹1-2L tax legally! Hindi + English"
        keywords="tax planning strategies India 2025, minimize tax liability legally, salary restructuring, HRA exemption, 80C 80D 80CCD optimization, home loan tax benefits, save 1 lakh tax, old vs new regime, कर योजना रणनीतियां"
        url="/learn/taxation-compliance/tax-planning-strategies-minimize-tax-liability-legally-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Taxation</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-indigo-600 font-semibold">Lesson 7 of 7 - FINAL!</span>
                <Link to="/learn/taxation-compliance" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <span className="hidden sm:inline">Back to Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Lesson 7 • 50 Minutes • Advanced • FINAL</div>
                <h1 className="text-4xl font-bold text-gray-900">Tax Planning Strategies 2025</h1>
                <p className="text-xl text-gray-600 mt-1">Save ₹1 Lakh+ Legally Every Year</p>
              </div>
            </div>
          </motion.div>

          {/* Tax Savings Calculator */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                💰 Total Tax Savings Calculator
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Your Annual Salary (₹)</label>
                <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-2xl" />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { name: '80C (PPF, ELSS, Insurance)', amount: '₹1.5L', savings: section80C },
                  { name: 'NPS 80CCD(1B)', amount: '₹50K', savings: nps80CCD },
                  { name: 'Health Insurance 80D', amount: '₹25K', savings: healthInsurance },
                  { name: 'Home Loan Interest 24(b)', amount: '₹2L', savings: homeLoan }
                ].map((item, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-sm opacity-90">{item.name}</div>
                    <div className="text-xl font-bold">{item.amount}</div>
                    <div className="text-green-300 font-bold">Save: ₹{item.savings.toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>

              <div className="bg-green-500 rounded-xl p-6 text-center">
                <div className="text-sm opacity-90 mb-1">Total Annual Tax Savings</div>
                <div className="text-6xl font-bold mb-2">₹{totalSavings.toLocaleString('en-IN')}</div>
                <p className="text-sm opacity-90">Using all available deductions in 31% tax bracket!</p>
              </div>
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
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
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Maximize 80C:</strong> ₹1.5L → Save ₹46,500 (PPF, ELSS, insurance)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>NPS bonus:</strong> Extra ₹50K deduction (80CCD 1B) → Save ₹15,600!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Home loan:</strong> ₹2L interest (24b) → Save ₹62,000 annually</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>HRA:</strong> If paying rent, structure salary for HRA exemption (save ₹60K+)</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Category Complete */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white shadow-2xl text-center">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-4xl font-bold mb-4">🎉 Taxation & Compliance Complete!</h3>
            <p className="text-2xl mb-8">You've mastered all 7 tax lessons! Save ₹1L+ every year legally.</p>
            <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Explore More Categories
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxPlanningStrategies;