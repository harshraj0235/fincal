import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Award, HelpCircle, DollarSign, Clock } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const CashFlowManagement: React.FC = () => {
  const faqData = [
    { question: "What is cash flow and why is it more important than profit?", answer: "Cash flow = Money in - Money out (actual cash). Profit = Revenue - Expenses (accounting). You can be profitable but run out of cash! Why: Customers pay in 30-90 days (receivables), but you pay salaries/rent NOW. Cash flow crisis = Business shuts even if profitable! Track weekly!" },
    { question: "How to calculate cash runway?", answer: "Cash runway = Current cash ÷ Monthly burn rate. Example: ₹20L cash, ₹4L/month expenses = 5 months runway. Below 3 months = danger zone (raise funds or cut costs!). Above 12 months = comfortable. Startup rule: Maintain minimum 6-month runway always!" },
    { question: "What is working capital cycle?", answer: "Time between paying supplier and receiving customer payment. Calculate: Inventory days (30) + Receivable days (45) - Payable days (30) = 45 days working capital cycle. Shorter = better (less cash locked). Optimize by: Faster collections, slower payments, less inventory." },
    { question: "How to manage receivables effectively?", answer: "7 strategies: (1) Invoice immediately (same day as delivery), (2) Follow up on day 20, 28, 32 (before, on, after due date), (3) Offer 2% discount for early payment, (4) Penalty for late payment (2% after 30 days), (5) Monthly credit limit per client, (6) Credit check new clients, (7) Invoice discounting (get 80% cash instantly, pay 2% fee)." },
    { question: "What is invoice discounting?", answer: "Get cash immediately by selling invoices to financier at discount. Example: ₹10L invoice due in 60 days → Get ₹9.5L today, give up ₹50K (5%). Use when: (1) Urgent cash need, (2) Large pending invoices, (3) Customer reliable (financier checks!). Available: Bank overdraft, NBFCs (Flexiloans, Indifi), fintech platforms." },
    { question: "How to delay payables without damaging relationships?", answer: "Smart strategies: (1) Negotiate 45-60 day terms upfront, (2) Build goodwill (pay on time first 6 months, then request extension), (3) Communicate in advance (don't disappear!), (4) Pay partial amount if full not possible, (5) Offer post-dated cheque (assurance to supplier). DON'T: Ignore calls, lie, or repeatedly default!" },
    { question: "What is cash flow statement?", answer: "Statement showing: (1) Operating cash flow (from business operations), (2) Investing cash flow (buying/selling assets), (3) Financing cash flow (loans taken/repaid). Operating cash flow positive = healthy business! Even if profit is low, positive operating CF = business sustainable. Learn to read - crucial for survival!" },
    { question: "How much working capital do I need?", answer: "Rule of thumb: 3-6 months operating expenses. Example: Monthly expenses ₹5L (salary ₹2L + rent ₹50K + inventory ₹2L + misc ₹50K) → Need ₹15-30L working capital. Service business: Lower (1-3 months). Manufacturing: Higher (6-12 months due to inventory)." },
    { question: "What is cash burn rate?", answer: "Monthly cash outflow from bank account. Example: Revenue ₹8L, Expenses ₹10L → Burn rate = ₹2L/month (losing ₹2L monthly!). Pre-revenue startup: Total monthly cost = burn rate. Calculate: Salaries + rent + marketing + tools + misc. Track monthly - if increasing without revenue growth, cut costs!" },
    { question: "How to prevent cash flow crisis?", answer: "10 prevention strategies: (1) Maintain 6-month cash runway, (2) Collect receivables in 30 days max, (3) Pay suppliers in 45-60 days, (4) Weekly cash flow review, (5) Separate business + personal finances, (6) Build cash reserve (10-20% of revenue), (7) Credit line from bank (use in emergency), (8) Reduce fixed costs, increase variable, (9) Forecast cash flow 3 months ahead, (10) Cut unprofitable products/customers!" }
  ];

  return (
    <>
      <SEOHelmet title="Cash Flow Management 2025: Receivables, Payables, Working Capital India | MoneyCal" description="Master cash flow for businesses: Cash flow statement, managing receivables (30-90 days), payables optimization, working capital cycle, cash runway calculation, preventing cash crunch. Invoice discounting. Hindi + English" keywords="cash flow management India, receivables payables, working capital cycle, cash runway, invoice discounting, कैश फ्लो प्रबंधन" url="/learn/business-finance-entrepreneurship/cash-flow-management-business-receivables-payables-working-capital-india" faqData={faqData} />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"><ArrowLeft className="w-5 h-5" /><span className="hidden sm:inline">Back to Business Finance</span></Link>
              <div className="flex items-center gap-4"><span className="hidden sm:inline text-sm text-gray-600">Lesson 3 of 8</span><Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"><span className="hidden sm:inline">Back to Hub</span><ArrowRight className="w-5 h-5" /></Link></div>
            </div>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg"><TrendingUp className="w-8 h-8 text-white" /></div>
              <div><div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Lesson 3 • 50 Minutes • Advanced</div><h1 className="text-4xl font-bold text-gray-900">Cash Flow Management 2025</h1><p className="text-xl text-gray-600 mt-1">The Lifeline of Your Business</p></div>
            </div>
          </motion.div>
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3"><HelpCircle className="w-8 h-8 text-blue-600" />❓ Frequently Asked Questions</h2>
              <div className="space-y-6">{faqData.map((faq, index) => (<div key={index} className="border-b border-gray-200 pb-6 last:border-0"><h3 className="font-bold text-lg text-gray-900 mb-2">Q{index + 1}: {faq.question}</h3><p className="text-gray-700">{faq.answer}</p></div>))}</div>
            </div>
          </motion.section>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <Award className="w-12 h-12 mx-auto mb-4" /><h3 className="text-3xl font-bold mb-4">🎉 Lesson Complete!</h3>
            <Link to="/learn/business-finance-entrepreneurship/gst-compliance-india-registration-filing-returns-input-credit-composition-scheme-2025" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">Next: GST Compliance<ArrowRight className="w-6 h-6" /></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashFlowManagement;
