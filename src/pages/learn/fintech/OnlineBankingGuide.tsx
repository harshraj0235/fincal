import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Building, CheckCircle, Award, AlertTriangle,
  Calculator, Target, HelpCircle, Zap, Shield, Smartphone, Lock
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const OnlineBankingGuide: React.FC = () => {
  const faqData = [
    {
      question: "What is the difference between NEFT, RTGS, IMPS, and UPI?",
      answer: "NEFT: Batch processing (hourly), ₹1-no limit, ₹2-25 charges, 2-3 hours. RTGS: Real-time, min ₹2L, ₹25-50 charges, instant. IMPS: 24/7 instant, ₹1-5L, ₹5-15 charges. UPI: 24/7 instant, ₹1-1L, ₹0 charges, easiest! Use UPI for daily payments, RTGS for large amounts (above ₹2L)."
    },
    {
      question: "Is net banking safe?",
      answer: "Very safe if you follow rules: (1) Never share password/OTP, (2) Use 2FA (two-factor authentication), (3) Don't use public WiFi for banking, (4) Verify website URL (https://netbanking.bankname.com), (5) Logout after use. Banks use 256-bit encryption + OTP + virtual keyboard for security!"
    },
    {
      question: "How to activate net banking?",
      answer: "2 ways: (1) Online: Visit bank website → New User → Enter account number + registered mobile → Get user ID + temp password via SMS → Set password. (2) Offline: Visit branch with passbook, get net banking kit (user ID + password). Activation takes 5-10 minutes!"
    },
    {
      question: "What are net banking transaction limits?",
      answer: "Varies by bank! SBI: NEFT ₹10L/day, RTGS no limit. HDFC: NEFT ₹25L/day, RTGS unlimited. IMPS: ₹5L/day. UPI: ₹1L/transaction. Can increase limit: Visit branch with request letter + ID proof. Higher limit = higher risk if account compromised!"
    },
    {
      question: "What is mobile banking and how is it different from net banking?",
      answer: "Mobile banking: Bank's official app (SBI YONO, HDFC MobileBanking). Net banking: Website on computer/mobile browser. Mobile app = Better UX, fingerprint login, faster, works offline (view balance). Net banking = More features, bigger screen, detailed statements. Both equally secure!"
    },
    {
      question: "What are net banking charges?",
      answer: "Free: Account balance check, statements, fund transfers to own accounts, bill payments. Charges: NEFT ₹2-25, RTGS ₹25-50, IMPS ₹5-15, DD/Cheque book, stop payment. UPI = Always free! Zero MDR (Merchant Discount Rate) as per RBI mandate."
    },
    {
      question: "How to reset net banking password if forgotten?",
      answer: "3 ways: (1) Online: Bank website → Forgot Password → Enter user ID + registered mobile/email → Get OTP → Reset. (2) ATM: Some banks allow password reset at ATM. (3) Branch visit: Submit request form + ID proof. Takes 24 hours to reactivate!"
    },
    {
      question: "Can I do net banking on multiple devices?",
      answer: "YES! Login from laptop, phone, tablet simultaneously. No device limit. But: (1) Logout from public computers, (2) Use trusted devices only, (3) Clear browser cache/cookies on shared devices, (4) Don't save password in browser. One session = one OTP needed for transaction."
    },
    {
      question: "What is virtual keyboard in net banking?",
      answer: "On-screen keyboard to type password (prevents keyloggers from stealing password). Always use virtual keyboard on public computers. Home computer = regular keyboard OK. Mobile app = fingerprint/face ID better than password!"
    },
    {
      question: "How to report fraud net banking transaction?",
      answer: "Immediate action: (1) Call bank's 24/7 helpline (block online access), (2) Visit branch next day with complaint, (3) File FIR at cyber police station, (4) Call cybercrime helpline 1930, (5) File complaint on cybercrime.gov.in. Bank liable if fraud due to their system (not if you shared OTP/password)!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Online Banking Guide 2025: Net Banking, Mobile Banking, NEFT/RTGS/IMPS Safety Tips India | MoneyCal"
        description="Master online banking in India: Net banking vs mobile banking, NEFT/RTGS/IMPS complete comparison, transaction limits, charges, 2FA security, OTP safety, common frauds to avoid. How to activate net banking, reset password, use virtual keyboard. Hindi + English"
        keywords="online banking India 2025, net banking guide, mobile banking, NEFT RTGS IMPS difference, transaction limits, banking security, 2FA OTP, cyber fraud prevention, ऑनलाइन बैंकिंग गाइड"
        url="/learn/fintech-digital-payments/online-banking-net-banking-mobile-banking-complete-guide-india-2025"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to FinTech</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 3 of 8</span>
                <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Lesson 3 • 45 Minutes • Intermediate</div>
                <h1 className="text-4xl font-bold text-gray-900">Online Banking Guide 2025</h1>
                <p className="text-xl text-gray-600 mt-1">Net Banking, Mobile Banking, NEFT/RTGS/IMPS</p>
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
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">🎉 Lesson Complete!</h3>
            <Link to="/learn/fintech-digital-payments/payment-security-cyber-fraud-prevention-upi-scams-india-2025" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next: Payment Security
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineBankingGuide;
