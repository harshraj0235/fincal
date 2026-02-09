import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Building, CheckCircle, Award, AlertTriangle,
  Calculator, Target, HelpCircle, DollarSign, FileText
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const BusinessLoansGuide: React.FC = () => {
  const faqData = [
    {
      question: "What is MUDRA loan and who can apply?",
      answer: "MUDRA (Micro Units Development & Refinance Agency) = Govt scheme for small businesses. 3 categories: Shishu (up to ₹50K), Kishore (₹50K-₹5L), Tarun (₹5L-₹10L). No collateral needed! Interest: 9-15%. Eligibility: Any Indian citizen with business plan. Apply via any bank/NBFC. Best for: Street vendors, small shops, manufacturing units."
    },
    {
      question: "What documents needed for business loan?",
      answer: "Essential: (1) Business registration proof (GST/Udyam), (2) ITR of last 2 years, (3) Bank statements (6 months), (4) KYC (Aadhaar, PAN), (5) Business plan/project report, (6) Balance sheet (if company). For secured loan: Property documents. Processing time: 7-15 days."
    },
    {
      question: "What is working capital loan?",
      answer: "Short-term loan for daily operations (paying salaries, buying inventory, vendor payments). Tenure: 12 months. Interest: 12-18%. Repayment: Monthly or at end. Example: Need ₹10L for 3 months (festival season inventory) → Take working capital loan, repay after sales. Better than overdraft for planned needs!"
    },
    {
      question: "What is term loan and when to use it?",
      answer: "Long-term loan for fixed assets (machinery, office, vehicles). Tenure: 3-10 years. Interest: 10-15%. Collateral: Usually required. EMI: Like home loan. Use for: Buying equipment, shop renovation, expansion. Don't use for: Working capital (too long tenure). Example: ₹25L machinery → Take 5-year term loan, EMI ₹53K."
    },
    {
      question: "MSME loan vs MUDRA loan: difference?",
      answer: "MUDRA: Up to ₹10L, no collateral, for micro businesses. MSME loan: ₹10L-₹50Cr, may need collateral, for medium enterprises. Both: Govt schemes with subsidized interest. MUDRA easier approval (smaller amount). MSME: Needs established business (2+ years), higher amounts available."
    },
    {
      question: "What is business loan interest rate in India?",
      answer: "Secured loan: 10-14% (with collateral). Unsecured: 14-20% (no collateral). MUDRA: 9-15%. MSME: 10-16%. Fintech (KreditBee, FlexiLoans): 18-24% (expensive!). Credit score impact: 750+ = lowest rate, 650-750 = higher rate, below 650 = rejection or 20%+ rate. Shop around - 2% difference = ₹20K savings on ₹10L!"
    },
    {
      question: "Can I get business loan without GST registration?",
      answer: "Difficult! Most banks need GST for loans above ₹5L. Without GST: (1) MUDRA Shishu (up to ₹50K) - possible, (2) Secured loan against property, (3) Personal loan (use for business but higher interest 14-18%). Better: Register for GST (free, takes 3 days) - improves credibility + loan approval chances!"
    },
    {
      question: "What is loan collateral and what can be used?",
      answer: "Collateral = Asset pledged to secure loan. If you default, bank takes asset. Can use: (1) Property (residential/commercial), (2) FD/shares, (3) Machinery, (4) Inventory, (5) Receivables. Unsecured loans: No collateral but higher interest + lower amount. Collateral = lower interest + higher loan amount."
    },
    {
      question: "How to improve business loan approval chances?",
      answer: "10 tips: (1) Maintain credit score 750+ (check CIBIL), (2) GST registration + regular filing, (3) ITR filed for 2+ years, (4) Profitable business (positive cash flow), (5) Clear business plan, (6) Collateral if possible, (7) Choose right bank (PSU banks for MSME, private for fintech), (8) Apply for right amount (don't overestimate), (9) Clean bank statements (no bounced cheques), (10) Co-applicant with good credit."
    },
    {
      question: "Can startup get business loan without revenue?",
      answer: "Very hard! Banks need: 2+ years of operations, positive cash flow, ITR filed. For pre-revenue startups: (1) Govt schemes: SIDBI, Startup India seed fund (₹20L grant + ₹50L debt), (2) Secured loan against property, (3) Personal loan (if founder has income), (4) Better: Raise equity (angel/VC) not debt!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Business Loans India 2025: MUDRA, MSME, Working Capital, Term Loan Complete Guide | MoneyCal"
        description="Master business loans in India: MUDRA loan (₹50K-₹10L, no collateral), MSME loans, working capital loan (12 months, 12-18%), term loan (3-10 years), eligibility, interest rates 9-15%, required documents, application process. Secured vs unsecured. Hindi + English"
        keywords="business loans India 2025, MUDRA loan, MSME loans, working capital loan, term loan, business loan interest rate, collateral, व्यवसाय ऋण गाइड"
        url="/learn/business-finance-entrepreneurship/business-loans-india-mudra-msme-working-capital-term-loan-guide-2025"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Business Finance</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 2 of 8</span>
                <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
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
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">Lesson 2 • 55 Minutes • Intermediate</div>
                <h1 className="text-4xl font-bold text-gray-900">Business Loans Guide 2025</h1>
                <p className="text-xl text-gray-600 mt-1">MUDRA, MSME, Working Capital, Term Loans</p>
              </div>
            </div>
          </motion.div>

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
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">🎉 Lesson Complete!</h3>
            <Link to="/learn/business-finance-entrepreneurship/cash-flow-management-business-receivables-payables-working-capital-india" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next: Cash Flow Management
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessLoansGuide;