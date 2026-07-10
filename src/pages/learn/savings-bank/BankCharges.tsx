import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, AlertCircle, DollarSign, CheckCircle, Shield,
  AlertTriangle, Calculator, Target, HelpCircle, Award, XCircle,
  CreditCard, Smartphone, FileText, Send, Banknote, Receipt, Zap, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const BankCharges: React.FC = () => {
  const [currentBank, setCurrentBank] = useState<'sbi' | 'hdfc' | 'icici' | 'axis'>('hdfc');
  
  const bankCharges = {
    sbi: {
      minBalance: 10000,
      penalty: 500,
      atmCharge: 20,
      smsCharge: 25,
      chequeCharge: 3
    },
    hdfc: {
      minBalance: 10000,
      penalty: 600,
      atmCharge: 20,
      smsCharge: 25,
      chequeCharge: 5
    },
    icici: {
      minBalance: 10000,
      penalty: 500,
      atmCharge: 20,
      smsCharge: 18,
      chequeCharge: 3
    },
    axis: {
      minBalance: 10000,
      penalty: 600,
      atmCharge: 20,
      smsCharge: 20,
      chequeCharge: 4
    }
  };

  const charges = bankCharges[currentBank];
  const annualPenalty = charges.penalty * 12;
  const annualSMS = charges.smsCharge * 12;
  const annualATM = charges.atmCharge * 5 * 12; // Assuming 5 extra ATM visits/month
  const totalAnnual = annualPenalty + annualSMS + annualATM;

  const faqData = [
    {
      question: "What is minimum balance penalty and how much do banks charge?",
      answer: "If your monthly average balance falls below minimum (₹10K for metro), banks charge ₹100-₹750/month. SBI: ₹500/month, HDFC: ₹600/month. Over 1 year = ₹6,000-₹9,000 wasted!"
    },
    {
      question: "How to avoid minimum balance penalty completely?",
      answer: "3 ways: (1) Open zero balance account (Kotak 811, DBS Digibank), (2) Maintain required balance, (3) Convert to salary account (if employed). Simplest: Switch to zero balance!"
    },
    {
      question: "How many free ATM withdrawals per month?",
      answer: "Own bank ATMs: Unlimited free. Other bank ATMs: 5 free/month (metro), 8 free/month (tier 2 cities). After that: ₹20/transaction. Pro tip: Use UPI instead!"
    },
    {
      question: "Can I disable SMS charges?",
      answer: "Yes! Banks charge ₹25-50/month for SMS alerts. Alternative: Use mobile banking app (free push notifications). Call customer care to disable SMS and save ₹300-600/year!"
    },
    {
      question: "Are cheque book charges avoidable?",
      answer: "Yes! Banks charge ₹2-5 per cheque leaf (₹200-500 per book). Avoid by using: UPI (free), NEFT (free), IMPS, or netbanking. Only use cheques when absolutely necessary."
    },
    {
      question: "What is the charge for stop payment on cheque?",
      answer: "₹50-200 per cheque to stop payment. If cheque bounces due to insufficient funds: ₹500-750 penalty + legal issues. Always ensure balance before issuing cheque!"
    },
    {
      question: "NEFT/RTGS charges - how much do banks charge?",
      answer: "From Nov 2019: NEFT is FREE! RTGS: Free for amounts above ₹2L in most banks. Below ₹2L: Use NEFT or UPI (both free). Never pay for digital transfers!"
    },
    {
      question: "Do banks charge for debit card?",
      answer: "Basic debit card: Usually free (₹0-200/year). Premium cards (Platinum, World): ₹500-5,000/year. Decline premium upgrades - basic card does same job!"
    },
    {
      question: "How to calculate monthly average balance?",
      answer: "Formula: Sum of daily closing balance / Number of days in month. Example: If balance is ₹15K for 20 days and ₹5K for 10 days, average = (15K×20 + 5K×10)/30 = ₹11,666. Above ₹10K minimum ✅"
    },
    {
      question: "Can I get reversal of penalty if wrongly charged?",
      answer: "Yes! Call customer care or visit branch with passbook. If genuinely wrong (calculation error), they will reverse. Be polite but firm. Works 70% of time!"
    },
    {
      question: "What is account maintenance charge?",
      answer: "Some banks charge ₹200-500/year for account maintenance (especially if old, inactive account). Solution: Close unused accounts or convert to zero balance variant."
    },
    {
      question: "Are there charges for demand draft?",
      answer: "Yes, ₹50-100 per DD. Avoid by using NEFT (free) or RTGS. Only use DD if recipient specifically asks (like government offices, universities)."
    },
    {
      question: "What happens if I don't use my account for 1 year?",
      answer: "Becomes 'inactive' after 12 months of no transaction. No penalty, but you must visit branch with ID to reactivate. Better: Do one small transaction every 6 months (₹10 UPI to anyone)."
    },
    {
      question: "Cash deposit charges - do banks charge?",
      answer: "Own bank: Free up to certain limit (₹1L-2L/month). Beyond that: ₹2-5 per ₹1000. Other bank: ₹50-100 + % of amount. Always deposit at own bank!"
    },
    {
      question: "Can I negotiate bank charges?",
      answer: "Yes, especially if long-time customer or high balance! Call relationship manager and say you'll switch banks. They often waive charges or upgrade to premium free. Worth trying!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Bank Charges & Hidden Fees 2025: Avoid ₹5,000/Year Penalties | MoneyCal"
        description="Complete guide to all bank charges in India. Minimum balance penalty (₹500-750/month), ATM fees, SMS charges, cheque book costs, NEFT/RTGS charges, debit card fees. Learn how to avoid each charge. Bank-wise comparison (SBI, HDFC, ICICI, Axis). Save ₹5,000+ annually!"
        keywords="bank charges India, minimum balance penalty, ATM withdrawal charges, bank fees avoid, hidden charges SBI HDFC ICICI, zero balance account, बैंक चार्जेस, मिनिमम बैलेंस पेनल्टी"
        url="/learn/savings-bank-products/bank-charges-hidden-fees-minimum-balance-penalty-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Savings & Bank Products</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 7 of 9</span>
                <Link 
                  to="/learn/savings-bank-products/maximizing-bank-returns-strategies-earn-more-savings-india"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl shadow-lg">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                  Lesson 7 • 30 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Bank Charges & Hidden Fees
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  How to Avoid ₹5,000/Year in Penalties - बैंक शुल्क से कैसे बचें
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-red-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>All bank charges: Min balance penalty (₹500/month), ATM, SMS, cheque fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Bank-wise comparison: SBI, HDFC, ICICI, Axis charges breakdown</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>How to avoid EACH charge (actionable strategies)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Case study: Save ₹5,000-8,000 per year!</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Complete Charges List */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-red-600" />
                💸 Complete List of Bank Charges
              </h2>

              <div className="space-y-6">
                {/* Minimum Balance Penalty */}
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-red-900 mb-2">#1. Minimum Balance Penalty (Biggest Trap!)</h3>
                      <p className="text-gray-700 mb-3">
                        If monthly average balance falls below minimum, heavy penalty charged:
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-gray-900">Metro Cities (Delhi, Mumbai, etc.):</strong>
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        <li>• Minimum Required: ₹10,000</li>
                        <li>• Penalty if below: ₹500-750/month</li>
                        <li>• Annual Loss: ₹6,000-₹9,000!</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-gray-900">Non-Metro Cities:</strong>
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        <li>• Minimum Required: ₹5,000</li>
                        <li>• Penalty if below: ₹300-500/month</li>
                        <li>• Annual Loss: ₹3,600-₹6,000</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 bg-green-100 p-4 rounded-lg">
                    <strong className="text-green-900">✅ How to Avoid:</strong>
                    <p className="text-gray-700 mt-2">Open zero balance account (Kotak 811, DBS Digibank, Paytm) or maintain required balance!</p>
                  </div>
                </div>

                {/* ATM Charges */}
                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    #2. ATM Withdrawal Charges
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Own Bank ATMs:</strong> Unlimited free withdrawals</p>
                    <p><strong>Other Bank ATMs:</strong></p>
                    <ul className="ml-6 space-y-1">
                      <li>• Free: 5 transactions/month (metro), 8 transactions/month (other cities)</li>
                      <li>• After limit: ₹20 per transaction</li>
                      <li>• Failed transactions: ₹20 charged (even if no cash dispensed!)</li>
                    </ul>
                    <div className="bg-white p-4 rounded-lg mt-3">
                      <strong>Annual Cost (10 extra ATM visits/month):</strong>
                      <p className="text-red-600 font-bold text-xl">₹20 × 10 × 12 = ₹2,400/year</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-green-100 p-4 rounded-lg">
                    <strong className="text-green-900">✅ How to Avoid:</strong>
                    <p className="text-gray-700 mt-2">Use UPI (100% free!), find your bank's ATM, or withdraw larger amounts less frequently</p>
                  </div>
                </div>

                {/* SMS Charges */}
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
                    <Smartphone className="w-6 h-6" />
                    #3. SMS Alert Charges
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Charge:</strong> ₹25-50 per month (varies by bank)</p>
                    <p><strong>Annual Cost:</strong> ₹300-600/year</p>
                    <p className="text-sm italic">For what? SMS notifications of transactions (which you already see in app!)</p>
                  </div>
                  <div className="mt-4 bg-green-100 p-4 rounded-lg">
                    <strong className="text-green-900">✅ How to Avoid:</strong>
                    <p className="text-gray-700 mt-2">Disable SMS, use mobile banking app for FREE push notifications. Save ₹300-600/year!</p>
                  </div>
                </div>

                {/* Cheque Book Charges */}
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    #4. Cheque Book Charges
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Charge per leaf:</strong> ₹2-5 (25 leaves = ₹50-125 per book)</p>
                    <p><strong>If you use 50 cheques/year:</strong> ₹100-250</p>
                  </div>
                  <div className="mt-4 bg-green-100 p-4 rounded-lg">
                    <strong className="text-green-900">✅ How to Avoid:</strong>
                    <p className="text-gray-700 mt-2">Use UPI (free), NEFT (free), or IMPS. Keep cheques for emergencies only!</p>
                  </div>
                </div>

                {/* Other Charges */}
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">#5. Other Hidden Charges</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between border-b pb-2">
                      <span>Stop Payment on Cheque:</span>
                      <span className="font-bold text-red-600">₹50-200</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span>Cheque Return (Insufficient Funds):</span>
                      <span className="font-bold text-red-600">₹500-750</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span>Demand Draft (DD):</span>
                      <span className="font-bold text-red-600">₹50-100</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span>Account Statement (Physical):</span>
                      <span className="font-bold text-red-600">₹50-100</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span>Debit Card Replacement:</span>
                      <span className="font-bold text-red-600">₹100-200</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Folio Charges (Passbook printing):</span>
                      <span className="font-bold text-red-600">₹30-50/year</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Bank-wise Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🏦 Bank-wise Charges Comparison</h2>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Your Bank:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['sbi', 'hdfc', 'icici', 'axis'] as const).map((bank) => (
                    <button
                      key={bank}
                      onClick={() => setCurrentBank(bank)}
                      className={`px-4 py-3 rounded-lg font-bold transition-colors ${
                        currentBank === bank
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {bank.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-6">{currentBank.toUpperCase()} - Annual Charges Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-sm opacity-90">Minimum Balance Penalty (if not maintained)</div>
                      <div className="text-3xl font-bold">₹{annualPenalty.toLocaleString('en-IN')}/year</div>
                      <div className="text-xs mt-1">₹{charges.penalty}/month × 12 months</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-sm opacity-90">SMS Alert Charges</div>
                      <div className="text-2xl font-bold">₹{annualSMS.toLocaleString('en-IN')}/year</div>
                      <div className="text-xs mt-1">₹{charges.smsCharge}/month × 12 months</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-sm opacity-90">Extra ATM Charges (60 transactions/year)</div>
                      <div className="text-2xl font-bold">₹{annualATM.toLocaleString('en-IN')}/year</div>
                      <div className="text-xs mt-1">₹{charges.atmCharge} × 5/month × 12 months</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-sm opacity-90">Cheque Charges (50 cheques/year)</div>
                      <div className="text-2xl font-bold">₹{(charges.chequeCharge * 50).toLocaleString('en-IN')}/year</div>
                      <div className="text-xs mt-1">₹{charges.chequeCharge} per cheque</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center text-xl">
                  💸 Potential Annual Loss: ₹{(totalAnnual + charges.chequeCharge * 50).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Case Study */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-3xl font-bold mb-6">📖 Case Study: Rahul Saved ₹8,200/Year!</h2>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">Before (Losing ₹8,200/year):</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-white/30 pb-2">
                    <span>Minimum balance penalty (₹8K avg, needs ₹10K):</span>
                    <span className="font-bold text-red-300">-₹6,000</span>
                  </div>
                  <div className="flex justify-between border-b border-white/30 pb-2">
                    <span>SMS charges:</span>
                    <span className="font-bold text-red-300">-₹300</span>
                  </div>
                  <div className="flex justify-between border-b border-white/30 pb-2">
                    <span>Extra ATM withdrawals (8/month):</span>
                    <span className="font-bold text-red-300">-₹1,920</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Annual Loss:</span>
                    <span className="text-red-300">-₹8,220</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold text-xl mb-4">After (Saving ₹8,200/year!):</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <span>Opened Kotak 811 zero balance account → ₹0 penalty (saved ₹6,000)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <span>Disabled SMS, using app notifications → Saved ₹300</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                    <span>Using UPI instead of ATM → Saved ₹1,920</span>
                  </div>
                </div>
                <div className="mt-4 bg-green-400 text-green-900 rounded-lg p-4 font-bold text-center text-lg">
                  💰 Total Saved: ₹8,220/year (can invest in SIP instead!)
                </div>
              </div>
            </div>
          </motion.section>

          {/* How to Avoid Each Charge */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">✅ Action Plan: How to Avoid Each Charge</h2>

              <div className="space-y-4">
                {[
                  {
                    charge: 'Minimum Balance Penalty',
                    solution: 'Open zero balance account (Kotak 811, DBS Digibank, Paytm Payments Bank) OR maintain required balance',
                    saving: '₹6,000-₹9,000/year'
                  },
                  {
                    charge: 'ATM Withdrawal Charges',
                    solution: 'Use UPI for payments (100% free), withdraw cash only from own bank ATMs, or withdraw larger amounts less frequently',
                    saving: '₹1,200-₹2,400/year'
                  },
                  {
                    charge: 'SMS Alert Charges',
                    solution: 'Call customer care, disable SMS alerts, use mobile app push notifications (free & instant)',
                    saving: '₹300-600/year'
                  },
                  {
                    charge: 'Cheque Book Charges',
                    solution: 'Use UPI/NEFT for payments. Request cheque book only when absolutely needed (e.g., government offices)',
                    saving: '₹100-500/year'
                  },
                  {
                    charge: 'Debit Card Annual Fee',
                    solution: 'Decline premium card upgrades. Basic RuPay/Visa debit card is FREE in most banks',
                    saving: '₹500-5,000/year'
                  },
                  {
                    charge: 'Account Statement Charges',
                    solution: 'Download PDF from netbanking (free). Only request physical if legally required',
                    saving: '₹50-200/year'
                  },
                  {
                    charge: 'Demand Draft Charges',
                    solution: 'Use NEFT/RTGS instead (free). Only use DD if recipient specifically asks',
                    saving: '₹100-500/year'
                  },
                  {
                    charge: 'Folio/Passbook Printing',
                    solution: 'Use mobile banking for all transaction history. Passbook not needed in 2025!',
                    saving: '₹30-100/year'
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-500">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{item.charge}</h4>
                        <p className="text-gray-700 mb-2">{item.solution}</p>
                        <div className="bg-green-100 px-3 py-1 rounded-full inline-block">
                          <span className="text-sm font-bold text-green-900">💰 Save: {item.saving}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl">
                <h4 className="font-bold text-2xl mb-2">Total Potential Savings:</h4>
                <div className="text-5xl font-bold">₹8,000-₹18,000/year!</div>
                <p className="text-sm mt-2 opacity-90">This money can be invested in SIP for wealth creation instead of wasting on bank charges!</p>
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
            <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Biggest trap:</strong> Minimum balance penalty (₹6,000-9,000/year). Switch to zero balance!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Use UPI:</strong> Free unlimited transactions vs ₹20 per ATM withdrawal. Save ₹2,000+/year.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Disable SMS:</strong> Use app notifications (free). Save ₹300-600/year.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Total savings:</strong> ₹8,000-18,000/year if you avoid all unnecessary charges!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Calculators */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Tools</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/calculators/savings-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <IndianRupee className="w-8 h-8 text-teal-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Savings Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate what you could earn instead</p>
                </Link>
                <Link to="/learn/savings-bank-products/types-of-savings-accounts-zero-balance-salary-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <FileText className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Zero Balance Accounts</h3>
                  <p className="text-sm text-gray-600">Learn about penalty-free options</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: 10 Strategies to Maximize Bank Returns</h3>
            <p className="mb-6 text-green-100">Learn advanced strategies to earn 2-3% more on your bank savings. FD laddering, sweep-in, tax optimization & more!</p>
            <Link
              to="/learn/savings-bank-products/maximizing-bank-returns-strategies-earn-more-savings-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Maximizing Bank Returns
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankCharges;
