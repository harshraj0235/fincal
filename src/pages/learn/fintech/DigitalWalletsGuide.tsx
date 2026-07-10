import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Wallet, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  CreditCard, Smartphone, Star, TrendingUp, Building, Gift, Bell
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const DigitalWalletsGuide: React.FC = () => {
  const [selectedWallet, setSelectedWallet] = useState('paytm');

  const wallets = {
    paytm: { name: 'Paytm', cashback: '5-10%', limit: '₹1L/month', kyc: 'Full KYC needed', color: 'from-blue-500 to-cyan-600' },
    phonepe: { name: 'PhonePe', cashback: '1-5%', limit: '₹1L/month', kyc: 'Full KYC needed', color: 'from-purple-500 to-indigo-600' },
    amazonpay: { name: 'Amazon Pay', cashback: '5-20%', limit: '₹1L/month', kyc: 'Full KYC needed', color: 'from-orange-500 to-amber-600' },
    gpay: { name: 'Google Pay', cashback: 'Limited', limit: 'N/A (UPI only)', kyc: 'No wallet', color: 'from-green-500 to-emerald-600' }
  };

  const faqData = [
    {
      question: "What is the difference between digital wallet and UPI?",
      answer: "Wallet: Pre-loaded money in app (like cash in physical wallet). Must add money first, then spend. UPI: Direct bank account link, real-time debit. No pre-loading. Wallet = faster checkout but needs balance. UPI = always uses live bank balance. Best: Use both - wallet for cashback, UPI for convenience!"
    },
    {
      question: "What is the wallet balance limit?",
      answer: "Without KYC: ₹10,000 max balance. With minimum KYC: ₹25,000/month. With full KYC (Aadhaar): ₹1 lakh/month (₹2L/year). Beyond ₹1L/month = Need PAN-based full KYC. RBI regulation to prevent money laundering. Complete KYC to use wallet fully!"
    },
    {
      question: "How to complete wallet KYC?",
      answer: "3 steps: (1) Open wallet app (Paytm/PhonePe/Amazon Pay), (2) Go to Settings → KYC → Submit Aadhaar number, (3) Verify via OTP. Full KYC done in 5 minutes! Benefits: ₹1L/month limit, faster refunds, wallet-to-bank transfer enabled."
    },
    {
      question: "Which wallet gives maximum cashback?",
      answer: "Amazon Pay: 5-20% on Amazon purchases (best!). Paytm: 5-10% on recharges, bills. PhonePe: 1-5% (limited but stable). Strategy: Use Amazon Pay for shopping, Paytm for bills, PhonePe for reliability. Track offers in app before payment!"
    },
    {
      question: "Can I transfer money from wallet to bank account?",
      answer: "YES, but charges! Paytm: 2-5% fee. PhonePe Wallet: 1-2% fee. Amazon Pay: Cannot transfer to bank. Free: If you used wallet for refund (original payment mode). Tip: Use UPI instead of wallet if you need to transfer money out frequently!"
    },
    {
      question: "What happens to wallet money if app shuts down?",
      answer: "Your money is SAFE! RBI mandates: Wallet companies must keep user money in escrow account (separate from company funds). If company shuts, you get refund. Example: Paytm Payments Bank issue (2024) - all wallet balances were safe, users could withdraw!"
    },
    {
      question: "Should I keep large balance in wallet?",
      answer: "NO! Keep apenas ₹5,000-10,000 for daily expenses. Why: (1) No interest earned (unlike savings account), (2) If phone lost/hacked, can lose money, (3) Wallet companies can freeze accounts. Better: Use UPI for large payments (direct bank debit)!"
    },
    {
      question: "How to maximize wallet cashback?",
      answer: "6 strategies: (1) Use different wallets for different categories (Amazon Pay for shopping, Paytm for bills), (2) Check app for offers before payment, (3) Combine with credit card for double benefit, (4) Use wallet for small payments only, (5) Don't chase cashback if ₹10-20 only (waste of time), (6) Set alerts for big offers!"
    },
    {
      question: "What is Paytm Postpaid and is it safe?",
      answer: "Paytm Postpaid = Buy now, pay later. Get ₹10K-60K limit, pay by 7th next month (no interest if on time!). Safe if: (1) Pay on time (otherwise 2% monthly interest), (2) Don't overspend (affects credit score), (3) Use for planned purchases only. Like mini credit card!"
    },
    {
      question: "Can I use wallet for merchant payments?",
      answer: "YES! All major wallets accepted at: (1) Offline stores (scan QR code), (2) Online shopping, (3) Bill payments, (4) Recharges. Acceptance: Amazon Pay (limited to Amazon), Paytm/PhonePe (95%+ merchants). UPI has wider acceptance than wallets!"
    },
    {
      question: "What are wallet charges and fees?",
      answer: "Free: Adding money from bank, payments to merchants, bill payments. Charges: (1) Wallet to bank transfer: 2-5%, (2) Credit card to wallet: 2%, (3) Monthly maintenance: ₹0 for most. Paytm/PhonePe: Zero monthly charges. Compare before using!"
    },
    {
      question: "Is wallet money insured like bank deposits?",
      answer: "NO! Wallets are NOT banks (except Paytm Payments Bank). No DICGC insurance of ₹5L like bank accounts. But: Money held in escrow (safe if company fails). Recommendation: Don't keep more than ₹10-20K in wallet. Banks are safer for large amounts!"
    },
    {
      question: "What happens if I send money to wrong wallet number?",
      answer: "Contact recipient immediately! Wallet transfers are instant + irreversible. If they refuse to return: (1) Contact wallet customer care (raise dispute), (2) File police complaint (cyber fraud), (3) File case in consumer forum. Prevention: Double-check number before sending!"
    },
    {
      question: "Can NRI use Indian wallets?",
      answer: "Limited! NRI can use if: (1) Have Indian mobile number, (2) Have NRE/NRO bank account, (3) Complete KYC with Indian address. But: Cannot add money from foreign cards. Some wallets (Paytm, PhonePe) allow NRI usage, others don't. UPI is better for NRI (works with NRE accounts)!"
    },
    {
      question: "How secure are digital wallets?",
      answer: "Very secure if you follow rules: (1) 4-6 digit wallet PIN (don't share!), (2) Fingerprint/Face ID lock, (3) OTP for transactions, (4) Don't save CVV in app. Security: 256-bit encryption, PCI-DSS certified. Safer than carrying cash! But: Beware phishing/fake apps."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Digital Wallets Guide 2025: Paytm, PhonePe, Amazon Pay, Google Pay India | Cashback, KYC, Limits | MoneyCal"
        description="Complete digital wallet guide for India: Wallet vs UPI vs card comparison, how to add money, wallet balance limit (₹10K to ₹1L with KYC), KYC requirements, maximum cashback strategies, merchant payments, bill payments, wallet-to-bank transfer, safety tips. Paytm, PhonePe, Amazon Pay features compared. Hindi + English"
        keywords="digital wallet India 2025, Paytm wallet, PhonePe wallet, Amazon Pay, wallet vs UPI, wallet KYC limit, cashback strategies, wallet to bank transfer, डिजिटल वॉलेट गाइड"
        url="/learn/fintech-digital-payments/digital-wallets-paytm-phonepe-amazon-pay-google-pay-india-complete-guide"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to FinTech</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 2 of 8</span>
                <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <span className="hidden sm:inline">Back to Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">Lesson 2 • 35 Minutes • Beginner</div>
                <h1 className="text-4xl font-bold text-gray-900">Digital Wallets Guide 2025</h1>
                <p className="text-xl text-gray-600 mt-1">Paytm, PhonePe, Amazon Pay - Cashback & Security</p>
              </div>
            </div>
          </motion.div>

          {/* Wallet Comparison */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Wallet className="w-8 h-8 text-green-600" />
                Popular Wallet Comparison
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {Object.entries(wallets).map(([key, wallet]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedWallet(key)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedWallet === key ? `bg-gradient-to-r ${wallet.color} text-white border-transparent` : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-2">{wallet.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>Cashback:</strong> {wallet.cashback}</p>
                      <p><strong>Limit:</strong> {wallet.limit}</p>
                      <p><strong>KYC:</strong> {wallet.kyc}</p>
                    </div>
                  </button>
                ))}
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
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Wallet vs UPI:</strong> Wallet = pre-loaded, cashback. UPI = direct bank, convenient</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>KYC limit:</strong> ₹10K without, ₹1L/month with Aadhaar KYC</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Best cashback:</strong> Amazon Pay (5-20%), Paytm (5-10%), PhonePe (1-5%)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Keep low balance:</strong> Only ₹5-10K in wallet, rest in bank (safer!)</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Links */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Lessons</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/learn/fintech-digital-payments/upi-complete-guide-gpay-phonepe-paytm-limit-charges-india-2025" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Smartphone className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">UPI Guide</h3>
                  <p className="text-sm text-gray-600">GPay, PhonePe, Paytm</p>
                </Link>
                <Link to="/learn/fintech-digital-payments/payment-security-cyber-fraud-prevention-upi-scams-india-2025" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Shield className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Payment Security</h3>
                  <p className="text-sm text-gray-600">Prevent fraud</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Lesson Complete */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">🎉 Lesson Complete!</h3>
            <Link to="/learn/fintech-digital-payments/online-banking-net-banking-mobile-banking-complete-guide-india-2025" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next: Online Banking
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalWalletsGuide;
