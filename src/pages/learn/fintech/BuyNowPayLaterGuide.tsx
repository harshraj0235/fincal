import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, CreditCard, CheckCircle, Award, AlertTriangle,
  Target, HelpCircle, XCircle, DollarSign, TrendingDown
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const BuyNowPayLaterGuide: React.FC = () => {
  const faqData = [
    {
      question: "What is BNPL and how does it work?",
      answer: "BNPL = Buy Now Pay Later. Instant credit for purchases. Buy today, pay after 15-30 days (interest-free if on time!). Popular: LazyPay (₹1L), Simpl (₹25K), ZestMoney (₹1L), Amazon Pay Later (₹60K). How: Link bank account, get instant approval, shop, repay by due date. Miss deadline = 2-3% monthly interest!"
    },
    {
      question: "Does BNPL affect credit score?",
      answer: "YES! (1) Timely payment = improves score (like credit card), (2) Late payment = reduces score by 50-100 points, (3) Multiple BNPL accounts = hard inquiry (reduces score). Default = reported to CIBIL, affects future loans. Use responsibly!"
    },
    {
      question: "What are BNPL charges and interest rates?",
      answer: "Interest-free if paid on time (15-30 days). Late payment: 2-3% per month (24-36% annually!) + ₹100-500 late fee. Example: ₹10K purchase, 3 months late → Interest ₹900 + fees ₹300 = Total ₹11,200. Way more expensive than credit card (18-24% p.a.)!"
    },
    {
      question: "BNPL vs Credit Card: which is better?",
      answer: "Credit Card WINS! Credit card: 45-day interest-free, rewards, wider acceptance, better fraud protection. BNPL: 15-30 day interest-free, limited merchants, higher late charges. Use BNPL only if: (1) Don't have credit card, (2) Very small amount (₹500-5K), (3) 100% sure of repayment. Otherwise: Credit card better!"
    },
    {
      question: "Can I use BNPL for EMI purchases?",
      answer: "Some allow! ZestMoney: 3-6 month EMI (interest 18-24%). Amazon Pay Later: Split into 3-6 months. LazyPay: No EMI. Better: Bank credit card EMI (12-18%) or personal loan (10-14%). BNPL EMI = expensive (24-36%)! Use only for small amounts if no other option."
    },
    {
      question: "How to close BNPL account?",
      answer: "3 steps: (1) Repay all dues (pending amount + interest), (2) App → Settings → Close Account, (3) Submit request. Account closed in 7-15 days. Impact: Stops credit access but doesn't affect CIBIL (if closed with zero dues). If dues pending = negative impact on credit score!"
    },
    {
      question: "Is BNPL a debt trap?",
      answer: "Can be! Risks: (1) Easy approval = impulse buying, (2) Multiple BNPL accounts = lose track of dues, (3) High late charges (3% monthly = 36% annual!), (4) Affects credit score. Use safely: (1) Max one BNPL account, (2) Set payment reminders, (3) Use only for needs (not wants), (4) Pay on time!"
    },
    {
      question: "What is minimum age for BNPL?",
      answer: "18 years minimum. Also need: (1) Bank account, (2) PAN card, (3) Aadhaar (for KYC), (4) Credit score 650+ (for higher limits). College students can get ₹5-10K limit. Working professionals: ₹25K-1L based on salary/credit score."
    },
    {
      question: "Can I use BNPL without credit score?",
      answer: "YES! New to credit (NTC) users can start with ₹5-10K limit. Apps check: (1) Bank statement (salary credits), (2) Spending patterns, (3) Aadhaar/PAN verification. As you use + repay on time, limit increases. Good: Build credit score. Bad: Easy to overuse - be disciplined!"
    },
    {
      question: "Which BNPL app is best in India?",
      answer: "Depends on use: Amazon Pay Later: Best for Amazon shopping (5-20% cashback). LazyPay: Highest limit (₹1L), wide merchant acceptance. Simpl: Best UX, auto-pay feature. ZestMoney: EMI option available. Recommendation: Start with Amazon Pay Later (safer ecosystem), avoid multiple BNPL accounts!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Buy Now Pay Later (BNPL) 2025: LazyPay, Simpl, ZestMoney India | How It Works, Risks, Credit Score Impact | MoneyCal"
        description="Complete BNPL guide for India: What is buy now pay later, how it works, interest-free period (15-30 days), late payment charges (2-3% monthly = 36% annually!), impact on credit score, when to use BNPL. LazyPay, Simpl, ZestMoney, Amazon Pay Later comparison. BNPL vs credit card. Risks and safe usage tips. Hindi + English"
        keywords="BNPL India 2025, buy now pay later, LazyPay, Simpl, ZestMoney, Amazon Pay Later, credit score impact, BNPL risks, interest rates, BNPL कैसे काम करता है"
        url="/learn/fintech-digital-payments/buy-now-pay-later-bnpl-lazypay-simpl-zestmoney-india-guide-2025"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to FinTech</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 6 of 8</span>
                <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
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
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Lesson 6 • 35 Minutes • Advanced</div>
                <h1 className="text-4xl font-bold text-gray-900">BNPL Guide 2025</h1>
                <p className="text-xl text-gray-600 mt-1">Buy Now Pay Later - Convenience or Trap?</p>
              </div>
            </div>

            <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-r-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-red-900">WARNING: Use BNPL Responsibly!</strong>
                  <p className="text-red-900 mt-2">Late payment = 2-3% monthly interest (36% annually!) + credit score damage. Only use if 100% sure you can repay on time!</p>
                </div>
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
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">🎉 Lesson Complete!</h3>
            <Link to="/learn/fintech-digital-payments" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Back to Hub
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNowPayLaterGuide;