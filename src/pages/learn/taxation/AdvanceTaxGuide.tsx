import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Calendar, CheckCircle, Award,
  AlertTriangle, Calculator, Target, HelpCircle, DollarSign, Clock, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const AdvanceTaxGuide: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState(1500000);
  const [tdsDeducted, setTdsDeducted] = useState(100000);
  
  const taxLiability = annualIncome * 0.2; // Simplified
  const advanceTaxDue = Math.max(0, taxLiability - tdsDeducted);
  const mustPayAdvanceTax = advanceTaxDue > 10000;

  const faqData = [
    {
      question: "What is advance tax and who needs to pay?",
      answer: "Advance tax = Paying tax in installments during the year (not lump sum at year-end). Who: If tax liability after TDS exceeds ₹10,000. Example: Freelancer earning ₹15L (no TDS) → Must pay advance tax quarterly. Salaried with full TDS → Usually exempt!"
    },
    {
      question: "What are advance tax due dates?",
      answer: "4 quarterly deadlines: (1) 15 June: 15% of annual tax, (2) 15 September: 45% cumulative, (3) 15 December: 75% cumulative, (4) 15 March: 100%. Miss deadline = Interest penalty 1% per month! Pay via incometax.gov.in → e-Pay Tax."
    },
    {
      question: "How to calculate advance tax?",
      answer: "3 steps: (1) Estimate annual income (salary + business + capital gains + interest), (2) Calculate tax as per slab, (3) Deduct TDS already paid, (4) If balance exceeds ₹10K, pay quarterly. Use: Challan 280 on IT portal. Payment via netbanking instant!"
    },
    {
      question: "What is interest penalty for not paying advance tax?",
      answer: "Section 234B: 1% per month simple interest on unpaid advance tax. Section 234C: Additional interest if quarterly payment missed. Example: ₹1L advance tax due, paid 3 months late → Interest = ₹3,000. Penalty auto-calculated when filing ITR!"
    },
    {
      question: "Do salaried employees need to pay advance tax?",
      answer: "Usually NO if employer deducts full TDS. But YES if: (1) Have capital gains (sold shares/property), (2) Rental income, (3) Freelance/business income, (4) TDS not sufficient. Example: Salary ₹10L (TDS ₹1L) + Capital gains ₹5L → Must pay advance tax on ₹5L portion!"
    },
    {
      question: "How to pay advance tax online?",
      answer: "5 steps: (1) Login to incometax.gov.in → e-Pay Tax, (2) Select Challan 280, (3) Choose 100 (Advance Tax), (4) Enter PAN, amount, (5) Pay via netbanking. Get challan receipt (save for ITR filing). Payment reflects in 26AS within 2-3 days."
    },
    {
      question: "Can I pay advance tax in one go instead of quarterly?",
      answer: "YES! Can pay 100% in first installment (by 15 June) - no penalty. Or pay anytime before 15 March. But: If pay late (after due dates), interest penalty applies. Best: Pay quarterly as per schedule to avoid interest u/s 234C."
    },
    {
      question: "What if I overestimated and paid excess advance tax?",
      answer: "No problem! You get refund when filing ITR. Example: Paid ₹2L advance tax, but actual liability ₹1.5L → Get ₹50K refund. IT department refunds via bank NEFT within 2-4 weeks. Better to overpay than underpay (underpay = interest penalty)!"
    },
    {
      question: "Advance tax vs self-assessment tax: difference?",
      answer: "Advance tax: Paid during the year (quarterly before 15 Mar). Self-assessment tax: Paid while filing ITR (if advance tax insufficient). Both same - just timing different. Self-assessment = balancing figure. But if self-assessment exceeds ₹10K, you should have paid advance tax!"
    },
    {
      question: "Senior citizens exemption from advance tax?",
      answer: "YES! Senior citizens (60+) with NO business income are EXEMPT from advance tax. Can pay full tax while filing ITR. But if have business income, must pay quarterly. Benefit: No interest penalty for seniors on non-business income!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Advance Tax 2025: Payment Due Dates, Calculation, Interest Penalty India | Quarterly Tax Guide | MoneyCal"
        description="Complete advance tax guide: When to pay (quarterly), due dates (15 Jun, 15 Sep, 15 Dec, 15 Mar), calculation method, Challan 280, interest penalty u/s 234B/234C for late payment. Senior citizen exemption. Online payment via incometax.gov.in. Hindi + English"
        keywords="advance tax India 2025, quarterly tax payment, advance tax due dates, challan 280, interest penalty 234B 234C, how to pay advance tax online, senior citizen exemption, एडवांस टैक्स"
        url="/learn/taxation-compliance/advance-tax-payment-due-dates-calculation-penalty-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Taxation</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 6 of 7</span>
                <Link to="/learn/taxation-compliance" className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
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
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Lesson 6 • 40 Minutes • Advanced</div>
                <h1 className="text-4xl font-bold text-gray-900">Advance Tax Guide 2025</h1>
                <p className="text-xl text-gray-600 mt-1">Quarterly Payments, Due Dates, Penalties</p>
              </div>
            </div>
          </motion.div>

          {/* Calculator */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-br from-orange-600 to-amber-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                🧮 Advance Tax Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Estimated Annual Income (₹)</label>
                  <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">TDS Already Deducted (₹)</label>
                  <input type="number" value={tdsDeducted} onChange={(e) => setTdsDeducted(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>
              </div>

              {mustPayAdvanceTax ? (
                <div className="bg-red-500 rounded-xl p-6 text-center">
                  <div className="text-sm opacity-90 mb-1">YOU MUST PAY ADVANCE TAX!</div>
                  <div className="text-5xl font-bold mb-2">₹{advanceTaxDue.toLocaleString('en-IN')}</div>
                  <p className="text-sm opacity-90">Pay quarterly to avoid 1% monthly interest penalty!</p>
                  
                  <div className="grid grid-cols-4 gap-2 mt-6">
                    {[
                      { date: '15 Jun', percent: 15, amount: advanceTaxDue * 0.15 },
                      { date: '15 Sep', percent: 30, amount: advanceTaxDue * 0.30 },
                      { date: '15 Dec', percent: 30, amount: advanceTaxDue * 0.30 },
                      { date: '15 Mar', percent: 25, amount: advanceTaxDue * 0.25 }
                    ].map((q, i) => (
                      <div key={i} className="bg-white/30 rounded-lg p-3">
                        <div className="text-sm font-semibold">{q.date}</div>
                        <div className="text-2xl font-bold">₹{(q.amount / 1000).toFixed(0)}K</div>
                        <div className="text-xs opacity-75">{q.percent}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-green-500 rounded-xl p-6 text-center">
                  <div className="text-sm opacity-90 mb-1">✅ You Don't Need to Pay Advance Tax!</div>
                  <div className="text-3xl font-bold mb-2">TDS Sufficient</div>
                  <p className="text-sm opacity-90">Balance tax liability under ₹10K. Just file ITR at year-end!</p>
                </div>
              )}
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

          {/* Lesson Complete */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">🎉 Lesson Complete!</h3>
            <Link to="/learn/taxation-compliance/tax-planning-strategies-minimize-tax-liability-legally-india" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next: Tax Planning Strategies
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvanceTaxGuide;
