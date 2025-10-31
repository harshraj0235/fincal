import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Smartphone, CheckCircle, Target, AlertTriangle,
  Zap, Shield, DollarSign, Clock, Award, XCircle, Lightbulb,
  CreditCard, QrCode, Lock, TrendingUp
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const UPICompleteGuide: React.FC = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <SEOHelmet 
        title="UPI Complete Guide: GPay PhonePe Paytm ₹1L Limit Charges Safety India 2025 | MoneyCal" 
        description="Master UPI payments in Hindi & English. How UPI works, transaction limits ₹1L/day, zero charges, GPay vs PhonePe vs Paytm comparison, UPI ID creation, fraud prevention, cashback." 
        keywords="UPI guide India 2025, GPay tutorial, PhonePe guide, Paytm UPI, UPI limit 1 lakh, UPI charges, UPI safety tips, UPI fraud prevention, यूपीआई गाइड हिंदी" 
        url="/learn/fintech-digital-payments/upi-complete-guide-gpay-phonepe-paytm-limit-charges-india-2025" 
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">FinTech & Digital Payments</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 1 of 6</span>
                <Link 
                  to="/learn/fintech-digital-payments/digital-wallets-paytm-phonepe-amazon-pay-google-pay-india-complete-guide"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  Lesson 1 • 50 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  UPI Complete Guide: 10B+ Transactions/Month!
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  यूपीआई गाइड: GPay, PhonePe, Paytm
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  'Understand what UPI is and how it revolutionized Indian payments',
                  'Set up UPI on GPay, PhonePe, or Paytm in 5 minutes',
                  'Learn transaction limits (₹1 lakh per transaction, unlimited/day)',
                  'Master UPI safety: Avoid frauds, scams, phishing attacks',
                  'Compare UPI apps (GPay vs PhonePe vs Paytm - which is best?)',
                  'Use UPI for bill payments, recharges, QR codes, and get cashback'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* What is UPI */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6">
              🇮🇳 What is UPI? India's Pride!
            </h2>

            <div className="prose max-w-none text-white">
              <p className="text-lg mb-4">
                <strong>UPI (Unified Payments Interface)</strong> is India's revolutionary instant payment system launched by NPCI in 2016. 
                Send/receive money 24×7×365 using mobile number, UPI ID, or QR code - all for <strong>ZERO fees!</strong>
              </p>

              <p className="text-lg mb-4">
                <strong>Hindi में:</strong> यूपीआई भारत की तत्काल भुगतान प्रणाली है जो NPCI ने 2016 में शुरू की। 
                मोबाइल नंबर, UPI ID या QR code से 24/7 पैसे भेजें/प्राप्त करें - बिल्कुल मुफ्त!
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                  <strong className="block mb-3 text-xl">🌟 Amazing Stats:</strong>
                  <ul className="space-y-2 text-sm">
                    <li>• 10+ billion transactions/month (Oct 2024)</li>
                    <li>• ₹16 lakh crore transacted monthly</li>
                    <li>• 400+ banks connected</li>
                    <li>• 300+ million active users</li>
                    <li>• World's #1 real-time payment system!</li>
                  </ul>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                  <strong className="block mb-3 text-xl">⚡ Why UPI is Best:</strong>
                  <ul className="space-y-2 text-sm">
                    <li>• Transfer in 3 seconds (instant!)</li>
                    <li>• ₹0 charges (completely free)</li>
                    <li>• Works 24/7 (even holidays, 3 AM)</li>
                    <li>• No bank details needed (apenas mobile number)</li>
                    <li>• Cashback/rewards from apps</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* UPI Apps Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📱 UPI Apps Comparison: GPay vs PhonePe vs Paytm
            </h2>

            <div className="space-y-4">
              {[
                {
                  app: 'Google Pay (GPay)',
                  users: '150M+ users',
                  cashback: 'Reward scratchers (₹1-1,000)',
                  pros: ['Cleanest UI', 'Google integration', 'Bill split feature', 'Voice payments'],
                  cons: ['Cashback reduced vs 2019', 'Needs Google account'],
                  bestFor: 'Best overall UPI app (simple + trusted)',
                  rating: '4.8/5'
                },
                {
                  app: 'PhonePe',
                  users: '400M+ users (#1 in India!)',
                  cashback: 'Cashback on bills, recharges',
                  pros: ['Most merchants accept', 'Insurance/mutual fund buying', 'Switch feature', 'Works offline'],
                  cons: ['Cluttered UI (too many features)', 'Spam notifications'],
                  bestFor: 'Best for bill payments & shopping',
                  rating: '4.7/5'
                },
                {
                  app: 'Paytm',
                  users: '350M+ users',
                  cashback: 'Paytm cashback (wallet)',
                  pros: ['Paytm wallet integration', 'Postpaid feature', 'Gold investment', 'Largest QR network'],
                  cons: ['Cashback goes to wallet (not bank)', 'Heavily promotes loans/credit'],
                  bestFor: 'Good if you use Paytm wallet actively',
                  rating: '4.4/5'
                },
                {
                  app: 'Amazon Pay',
                  users: '50M+ users',
                  cashback: 'Amazon cashback on orders',
                  pros: ['Amazon shopping integration', 'Good cashback on Amazon', 'Bill payments'],
                  cons: ['Limited merchant acceptance', 'Focused on Amazon ecosystem'],
                  bestFor: 'Best for Amazon shoppers',
                  rating: '4.2/5'
                },
                {
                  app: 'BHIM App (Government)',
                  users: '30M+ users',
                  cashback: 'None (no commercials)',
                  pros: ['100% safe (government)', 'No ads', 'Lightweight app', 'Works on basic phones'],
                  cons: ['No cashback', 'Basic UI', 'Fewer features'],
                  bestFor: 'Best for those who prioritize safety over cashback',
                  rating: '4.0/5'
                }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <strong className="text-2xl text-blue-900">{item.app}</strong>
                      <p className="text-sm text-gray-600">{item.users}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold">
                        ⭐ {item.rating}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{item.cashback}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <strong className="text-green-800 block mb-2 text-sm">✅ Pros:</strong>
                      <ul className="space-y-1 text-xs text-gray-700">
                        {item.pros.map((pro, j) => (
                          <li key={j} className="flex items-start gap-1">
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <strong className="text-red-800 block mb-2 text-sm">⚠️ Cons:</strong>
                      <ul className="space-y-1 text-xs text-gray-700">
                        {item.cons.map((con, j) => (
                          <li key={j} className="flex items-start gap-1">
                            <XCircle className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <strong className="text-blue-900">🎯 Best For:</strong> <span className="text-gray-700">{item.bestFor}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-100 rounded-xl p-6">
              <strong className="text-blue-900 text-lg block mb-3">🏆 Verdict: Which UPI App to Use?</strong>
              <ul className="space-y-2 text-gray-700">
                <li><strong>For Most People:</strong> Google Pay (best UI + trusted) or PhonePe (most accepted)</li>
                <li><strong>For Maximum Safety:</strong> BHIM App (government, no third-party risks)</li>
                <li><strong>For Cashback Hunters:</strong> Use ALL (GPay for some merchants, PhonePe for others - maximize rewards!)</li>
                <li><strong>Pro Tip:</strong> Keep 2 UPI apps as backup. If GPay server is down, use PhonePe. Never depend on apenas one app!</li>
              </ul>
            </div>
          </motion.section>

          {/* UPI Limits & Rules */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📊 UPI Transaction Limits & Charges
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-900 mb-3">Transaction Limits</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between">
                    <span>Per Transaction:</span>
                    <strong>₹1,00,000</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Per Day (Count):</span>
                    <strong>Unlimited transactions</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Per Day (Amount):</span>
                    <strong>No limit (₹10L, ₹1Cr okay!)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Minimum Amount:</span>
                    <strong>₹1</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>IPO/Mutual Fund:</span>
                    <strong>₹5,00,000 per txn</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Charges & Fees</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between">
                    <span>UPI to Person:</span>
                    <strong className="text-green-600">₹0 (FREE!)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>UPI to Merchant:</span>
                    <strong className="text-green-600">₹0 (FREE!)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>QR Code Payment:</span>
                    <strong className="text-green-600">₹0 (FREE!)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Bill Payments:</span>
                    <strong className="text-green-600">₹0 (FREE!)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Failed Transaction:</span>
                    <strong className="text-green-600">₹0 (refunded automatically)</strong>
                  </li>
                </ul>
                <p className="text-xs text-blue-700 mt-4">
                  <strong>Note:</strong> Merchants pay 0-1% to banks, consumers pay ₹0. That&apos;s why UPI is free for users!
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-400">
              <strong className="text-yellow-900 text-lg block mb-3">💡 Real Example: Send ₹50,000</strong>
              <div className="space-y-2 text-gray-700">
                <p><strong>Via UPI:</strong> GPay → Friend's mobile number → ₹50,000 → Done in 5 seconds. Charge: ₹0</p>
                <p><strong>Via NEFT/RTGS:</strong> Login netbanking → Add beneficiary → Wait 30 mins → Transfer. Charge: ₹5-25</p>
                <p><strong>Via Cheque:</strong> Write cheque → Give to friend → He deposits → Clears in 2-3 days. Charge: ₹0 pero waste of time</p>
                <p className="text-green-700 font-bold mt-3">✅ UPI is FASTEST + CHEAPEST + EASIEST. That&apos;s why 10 billion transactions/month!</p>
              </div>
            </div>
          </motion.section>

          {/* How to Set Up UPI */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📝 How to Set Up UPI (5-Minute Guide)
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</span>
                  <strong className="text-lg text-blue-900">Download UPI App</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  Download Google Pay, PhonePe, or Paytm from Play Store/App Store. All are free.
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Recommendation:</strong> Start with Google Pay (easiest for beginners). Add PhonePe later as backup.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</span>
                  <strong className="text-lg text-blue-900">Verify Mobile Number</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  Enter mobile number linked to your bank account. OTP will come. Enter OTP to verify.
                </p>
                <div className="bg-red-100 rounded-lg p-4 border-2 border-red-400">
                  <strong className="text-red-900">⚠️ CRITICAL:</strong>
                  <p className="text-red-800 text-sm mt-2">
                    Mobile number MUST be registered with bank. If not, visit branch/use netbanking to link mobile before setting up UPI.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</span>
                  <strong className="text-lg text-blue-900">Select Bank & Add Account</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  App will show all banks linked to your mobile number. Select your bank (e.g., SBI, HDFC, ICICI).
                </p>
                <p className="text-sm text-gray-600">
                  Account details auto-fetched from bank. You just verify last 4 digits of account number. No need to enter full account number!
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">4</span>
                  <strong className="text-lg text-blue-900">Set UPI PIN (6-Digit Password)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  Create 6-digit UPI PIN (like ATM PIN pero different). This PIN authorizes all UPI payments.
                </p>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <strong className="text-yellow-900">Security Tips:</strong>
                  <ul className="text-sm text-gray-700 space-y-1 mt-2">
                    <li>• Don&apos;t use DOB, mobile number, or 123456</li>
                    <li>• Use random 6 digits you can remember</li>
                    <li>• NEVER share UPI PIN with anyone (not even bank)</li>
                    <li>• Different from ATM PIN (don&apos;t use same)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">5</span>
                  <strong className="text-lg text-green-900">Create UPI ID (Optional)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  Your UPI ID is like email for payments. Format: yourname@bankname (e.g., rajesh@paytm, priya@ybl).
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Difference:</strong> Mobile number works too! Pero UPI ID is more private (don&apos;t need to share mobile number publicly).
                </p>
              </div>
            </div>

            <div className="bg-green-100 rounded-xl p-6 mt-6">
              <strong className="text-green-900 text-lg block mb-3">✅ Done! You can now:</strong>
              <ul className="space-y-2 text-green-800 text-sm">
                <li>✓ Send money to any UPI user in India</li>
                <li>✓ Receive money from anyone (share mobile number or UPI ID)</li>
                <li>✓ Pay at shops (scan QR code)</li>
                <li>✓ Pay bills (electricity, mobile, DTH)</li>
                <li>✓ Buy online (Amazon, Flipkart, Swiggy all accept UPI)</li>
              </ul>
            </div>
          </motion.section>

          {/* UPI Safety & Fraud Prevention */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🔒 UPI Safety: Avoid Frauds & Scams
            </h2>

            <div className="bg-red-100 rounded-xl p-6 border-2 border-red-500 mb-6">
              <h3 className="text-2xl font-bold text-red-900 mb-4">⚠️ Top 5 UPI Scams in India (2024-25)</h3>
              
              <div className="space-y-4">
                {[
                    {
                      scam: '"Collect Request" Scam',
                      how: `Fraudster sends you UPI collect request for ₹50,000. Message says "Refund from Amazon". You approve thinking you'll receive money.`,
                    reality: 'Collect request TAKES money from you, not gives! You just sent ₹50K to scammer.',
                    avoid: 'NEVER approve collect requests unless YOU initiated payment. To receive money, apenas share UPI ID/mobile. No approval needed!'
                  },
                  {
                    scam: '"KYC Update" Fake Link',
                    how: 'SMS: "Your UPI/bank KYC expired. Click link to update or account will be blocked." Link looks like paytm.com pero actually paytm-kyc.tk',
                    reality: 'Fake website. Asks for UPI PIN, OTP, card details. Steals money immediately.',
                    avoid: 'Banks/UPI apps NEVER ask for KYC via SMS links. Update KYC apenas through official app, not random links. Check URL carefully!'
                  },
                  {
                    scam: '"Wrong Payment - Refund Me" Scam',
                    how: `Someone sends you ₹500. Then calls: "Sir I sent ₹5,000 by mistake, sent apenas ₹500. Please refund ₹5,000." You refund, thinking you'll get ₹4,500 more.`,
                    reality: 'The initial ₹500 was from stolen UPI. It gets reversed by bank. Pero your ₹5,000 refund is gone. You lose ₹5K!',
                    avoid: `If someone sends money by mistake, use UPI app's "Refund" button. Don't send new payment. Refund button reverses exact amount safely.`
                  },
                  {
                    scam: 'QR Code with Hidden Amount',
                    how: 'Shop bill is ₹500. Shopkeeper shows QR code. You scan + enter UPI PIN. Later see ₹5,000 deducted! QR had ₹5K hidden.',
                    reality: `Dynamic QR codes can have preset amounts. You don't see amount before entering PIN on some apps.`,
                    avoid: 'ALWAYS check amount on screen before entering UPI PIN. If amount is wrong, cancel payment. Scan QR again carefully.'
                  },
                  {
                    scam: '"Delivery Verification OTP" Scam',
                    how: 'Ordered ₹500 item COD. Delivery person: "For verification, tell me OTP sent to your phone." You tell OTP.',
                    reality: 'That OTP was for ₹50,000 UPI payment request fraudster sent simultaneously. By telling OTP, you approved payment!',
                    avoid: 'NEVER share OTP with delivery person, customer care, or anyone. OTP is apenas for YOUR phone, not to be told verbally. Hang up if asked!'
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border-l-4 border-red-500">
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                        <strong className="text-lg text-red-900">{item.scam}</strong>
                      </div>
                      <p className="text-sm text-gray-600 mb-2"><strong>How it works:</strong> {item.how}</p>
                      <p className="text-sm text-red-700 mb-2"><strong>Reality:</strong> {item.reality}</p>
                      <p className="text-sm text-green-700"><strong>✅ How to avoid:</strong> {item.avoid}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-100 rounded-xl p-6">
              <strong className="text-green-900 text-lg block mb-3">🛡️ Golden Rules for UPI Safety:</strong>
              <ul className="space-y-2 text-green-800 text-sm">
                <li>✓ NEVER share UPI PIN with anyone (not even bank/police/government)</li>
                <li>✓ NEVER approve collect requests from unknown people</li>
                <li>✓ NEVER click links in SMS asking for KYC/verification</li>
                <li>✓ ALWAYS check amount on screen before entering UPI PIN</li>
                <li>✓ Link UPI to LOW-BALANCE account (₹10-20K max), not salary account with ₹5L</li>
                <li>✓ Enable SMS alerts - check every transaction notification immediately</li>
                <li>✓ If scammed, call bank IMMEDIATELY (within 24 hours, money can be retrieved)</li>
              </ul>
            </div>
          </motion.section>

          {/* Expert Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 shadow-lg border-2 border-yellow-400"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              💡 Pro UPI Tips
            </h2>

            <div className="space-y-4">
              {[
                'Open separate zero-balance account for UPI (₹10-20K max). If UPI hacked, loss is limited. Salary account with ₹5L stays safe!',
                'Use 2 UPI apps (GPay + PhonePe). If one server is down during urgent payment, switch to other. Festival times, GPay often crashes.',
                'For payments > ₹50K, use NEFT/IMPS instead of UPI. UPI is convenient pero no paper trail for disputes. NEFT has better record-keeping for big amounts.',
                `Enable UPI transaction limit in app settings. Set max ₹10K/transaction. For bigger payments, you'll need to temporarily increase limit (prevents accidental high payments).`,
                `Don't save UPI PIN in apps or notes. Memorize it. If phone stolen, thief can't make payments without PIN (unless you saved it stupidly!).`,
                `For merchant payments, ask for invoice/bill before scanning QR. Shopkeepers can show higher QR amount - you won't know until deducted.`,
                'UPI cashback expires! GPay scratchers expire in 7 days, PhonePe cashback in 30 days. Use it or lose it. Set reminders.',
                'Link UPI to credit card (HDFC, Axis offer this). Get 30-50 days interest-free + reward points + UPI convenience. Best of both worlds!'
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800"><strong>Tip {i + 1}:</strong> {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ❓ Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'What if I enter wrong mobile number/UPI ID and send ₹10,000?',
                  a: 'If number is not UPI-registered, payment fails, money returned. If registered pero wrong person, PROBLEM! You must request refund politely. They can refuse. Always double-check number before confirming payment!'
                },
                {
                  q: 'UPI payment failed pero money deducted. What to do?',
                  a: 'Automatic refund in 1-3 working days. Check bank SMS (money might already be back). If not refunded in 7 days, raise complaint in UPI app > Help > Transaction Issue. 90% resolved within 10 days.'
                },
                {
                  q: 'Can I use UPI without internet?',
                  a: 'UPI needs internet. Pero UPI 123 (USSD-based) works without internet - dial *99#. Or use PhonePe offline feature (works with IVR for basic payments). Regular UPI needs internet.'
                },
                {
                  q: 'Is UPI safe? Can hackers steal money?',
                  a: `UPI is safe with 2-factor authentication (UPI PIN + mobile OTP). Pero social engineering frauds are common - people willingly give PIN/OTP thinking it's verification. Technology is safe, human error causes losses.`
                },
                {
                  q: 'Someone sent money, says "refund urgently". Should I?',
                  a: `SCAM alert! Use UPI app's official "Refund Transaction" button only. Don't send fresh payment. Scammers send ₹500 from stolen account, ask for ₹5K refund. Initial ₹500 reverses, your ₹5K is gone!`
                },
                {
                  q: 'Bank customer care called asking for UPI PIN for "verification". Give it?',
                  a: 'SCAM! Banks NEVER ask for PIN. Hang up immediately. Call bank's official number yourself. Fraudsters spoof caller ID to show "SBI Customer Care" pero they're scammers.'
                },
                {
                  q: 'Can I send ₹2 lakh via UPI (₹1L limit per transaction)?',
                  a: 'Yes! Send ₹1L, then ₹1L again. No daily limit. Pero for >₹1L, NEFT/RTGS is better (clear audit trail, better for tax records, business transactions).'
                },
                {
                  q: 'UPI via credit card vs debit card - which is better?',
                  a: 'Credit card UPI is BETTER! You get interest-free period (30-50 days) + reward points + fraud protection. Pero apenas few banks allow (HDFC, Axis). Most UPI is via debit/savings account.'
                },
                {
                  q: 'Lost phone with UPI apps. Can someone steal money?',
                  a: `They need UPI PIN to make payments. If you didn't save PIN stupidly, money is safe. Immediately call bank to block UPI on that mobile number. Buy new SIM (same number), reinstall app, set new PIN.`
                },
                {
                  q: 'Should I use GPay, PhonePe, or both?',
                  a: 'Use BOTH! Keep 2 UPI apps as backup. If GPay servers down (happens during festivals), use PhonePe. Also different apps give different cashback offers. Maximize rewards by using both smartly!'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <p className="font-bold text-lg text-gray-900 mb-2">Q{i + 1}: {faq.q}</p>
                  <p className="text-gray-700"><strong>A:</strong> {faq.a}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Action Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your UPI Action Checklist
            </h2>

            <div className="space-y-3">
              {[
                'Download Google Pay AND PhonePe (2 apps as backup)',
                'Link to SEPARATE zero-balance account (not salary account)',
                'Set strong 6-digit UPI PIN (not DOB, mobile, or 123456)',
                'NEVER share UPI PIN with anyone (not even bank/police)',
                'NEVER approve "collect requests" from unknown numbers',
                'Check amount on screen before entering PIN (especially QR payments)',
                'Enable transaction SMS alerts on mobile',
                'If scammed, call bank within 24 hours (money can be retrieved)'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Digital Wallets Complete Guide</h3>
            <p className="mb-6 text-purple-100">
              Learn about Paytm Wallet, PhonePe Wallet, Amazon Pay balance. When to use wallets vs direct UPI. 
              Cashback strategies and wallet security!
            </p>
            <Link
              to="/learn/fintech-digital-payments/digital-wallets-paytm-phonepe-amazon-pay-google-pay-india-complete-guide"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Digital Wallets Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UPICompleteGuide;
