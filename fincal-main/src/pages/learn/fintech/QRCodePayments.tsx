import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, QrCode, CheckCircle, Award, AlertTriangle,
  Target, HelpCircle, Shield, Smartphone, Store
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const QRCodePayments: React.FC = () => {
  const faqData = [
    {
      question: "What is QR code payment and how does it work?",
      answer: "QR code = Quick Response code (square barcode). Merchant displays QR, you scan with UPI app (GPay/PhonePe), enter amount, pay. Payment goes directly from your bank to merchant's bank. Fast, contactless, zero charges! Used in 50+ million Indian shops."
    },
    {
      question: "What is Bharat QR?",
      answer: "Bharat QR = Universal QR code standard by NPCI. Works with ALL UPI apps + cards. Merchant needs only one QR (not separate for GPay, PhonePe, Paytm). Launched 2016. Now: Most merchant QRs are Bharat QR (you can pay with any UPI app!)."
    },
    {
      question: "Static vs Dynamic QR code: difference?",
      answer: "Static QR: Fixed merchant details, YOU enter amount (used in small shops, street vendors). Dynamic QR: Pre-filled amount + invoice (used in restaurants, online orders). Static = reusable, Dynamic = one-time. Both equally safe if scanned from trusted merchant!"
    },
    {
      question: "What are common QR code scams?",
      answer: "5 scams: (1) Fake QR sticker over genuine (money goes to scammer), (2) Caller says 'scan this QR to receive refund' (actually you're sending!), (3) WhatsApp QR from unknown person, (4) QR on phishing website, (5) Edited QR image (UPI ID changed). Prevention: Verify merchant name before paying!"
    },
    {
      question: "How to verify if QR code is safe?",
      answer: "4 checks: (1) Scan QR → Check merchant name displayed in app (should match shop), (2) Check UPI ID (should be merchant's, not personal), (3) For small shops: Verify with shopkeeper verbally, (4) If QR is printed paper pasted over existing = RED FLAG! Ask for original QR."
    },
    {
      question: "Can I get refund for QR code payment?",
      answer: "Depends! Merchant payment = NO auto-refund (merchant must manually refund to your UPI ID). Request merchant: 'Please refund to my UPI ID xxx@ybl'. Wrong QR = Lost money (cannot reverse). Prevention: Double-check merchant name + amount before confirming payment!"
    },
    {
      question: "What is UPI QR limit?",
      answer: "Same as UPI: ₹1 lakh per transaction. But: Most merchants have lower limits (₹10K-50K) set by bank. For large payments above ₹1L: Split into multiple transactions or use NEFT/RTGS. No daily limit on number of QR transactions!"
    },
    {
      question: "Do I need internet to scan QR code?",
      answer: "YES! Scanning QR + payment both need internet. Offline: Cannot scan or pay. Merchant also needs internet to receive payment confirmation. UPI Lite: Can make small payments (below ₹500) offline, but scanning QR still needs internet!"
    },
    {
      question: "Can I create my own QR code for receiving payments?",
      answer: "YES! Free on any UPI app: GPay → Profile → QR Code → Download/Share. PhonePe → My Money → My QR → Download. Shows your UPI ID as QR. Anyone can scan & pay you. Use for: Selling products, freelance work, receiving money from friends. Print & keep at counter/table!"
    },
    {
      question: "Is Bharat QR mandatory for merchants?",
      answer: "Not mandatory but highly recommended! Benefits for merchants: (1) Accept all UPI apps + RuPay cards, (2) Zero MDR (no transaction charges!), (3) Instant settlement, (4) No POS machine needed (save ₹5-10K). 95%+ Indian merchants use Bharat QR now!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="QR Code Payments & Bharat QR 2025: How to Scan & Pay Safely India | Complete Guide | MoneyCal"
        description="Master QR code payments in India: Static vs Dynamic QR codes, Bharat QR explained, how merchant QR works, common QR code scams to avoid, scanning safety tips, payment limits. Create your own QR code for receiving payments. Prevent fake QR fraud. Hindi + English"
        keywords="QR code payments India 2025, Bharat QR, static vs dynamic QR, merchant QR code, QR scams prevention, scan and pay safely, UPI QR limit, create QR code, QR कोड भुगतान"
        url="/learn/fintech-digital-payments/qr-code-payments-bharat-qr-scan-and-pay-merchant-upi-india-complete-guide"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to FinTech</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 7 of 8</span>
                <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Lesson 7 • 30 Minutes • Beginner</div>
                <h1 className="text-4xl font-bold text-gray-900">QR Code Payments Guide 2025</h1>
                <p className="text-xl text-gray-600 mt-1">Scan & Pay Safely - Bharat QR Explained</p>
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
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">🎉 Lesson Complete!</h3>
            <Link to="/learn/fintech-digital-payments/cryptocurrency-blockchain-basics-bitcoin-ethereum-india-legal-guide-2025" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next: Cryptocurrency Basics
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRCodePayments;

