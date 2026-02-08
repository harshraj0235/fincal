import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Zap, TrendingUp, CheckCircle, Shield,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Award,
  RefreshCw, Lock, Unlock, BarChart3, Sparkles, Clock, FileText
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const SweepInAccounts: React.FC = () => {
  const [balance, setBalance] = useState(100000);
  const [threshold, setThreshold] = useState(25000);
  
  const savingsBalance = Math.min(balance, threshold);
  const fdBalance = Math.max(0, balance - threshold);
  
  const savingsInterest = (savingsBalance * 3) / 100;
  const fdInterest = (fdBalance * 6.5) / 100;
  const totalInterest = savingsInterest + fdInterest;
  
  const normalSavingsInterest = (balance * 3) / 100;
  const extraEarnings = totalInterest - normalSavingsInterest;

  const faqData = [
    {
      question: "What is sweep-in and how does it work?",
      answer: "Sweep-in automatically converts idle money above threshold (e.g., ₹25K) into FD at higher rate (6-7%). When you need money, it automatically breaks FD and transfers back. Best of both: Liquidity + Higher returns!"
    },
    {
      question: "Is there any charge for sweep-in facility?",
      answer: "Most banks offer sweep-in FREE (no charges). Some banks require ₹10K-₹25K minimum balance. Check with your bank - usually zero cost!"
    },
    {
      question: "How quickly can I withdraw money from sweep-in FD?",
      answer: "Instant! When you swipe card or do UPI, money auto-sweeps from FD to savings in seconds. You won't even notice - works seamlessly."
    },
    {
      question: "What is auto-sweep vs manual sweep-in?",
      answer: "Auto-sweep: Automatic (you do nothing, bank handles). Manual sweep-in: You tell bank how much to sweep. Always choose auto-sweep for convenience!"
    },
    {
      question: "Which banks offer best sweep-in facility?",
      answer: "Top: HDFC (₹25K threshold, 6.5% FD rate), ICICI Money Multiplier (₹10K threshold), Axis Encash 24, Kotak 811 (₹25K threshold). All offer instant sweep-in."
    },
    {
      question: "Can I set my own threshold amount?",
      answer: "Yes! Most banks allow ₹10K, ₹25K, ₹50K, ₹1L thresholds. Choose based on your monthly expenses. Example: If monthly expense ₹30K, set ₹40K threshold (₹10K buffer)."
    },
    {
      question: "Is interest from sweep-in FD taxable?",
      answer: "Yes, FD interest is fully taxable at your slab rate. But ₹10K exemption under 80TTA applies (₹50K for seniors under 80TTB). TDS deducted if interest exceeds ₹40K/year."
    },
    {
      question: "What happens during reverse sweep (withdrawal)?",
      answer: "When you withdraw, money first comes from savings. If insufficient, FD breaks automatically (LIFO - Last In First Out). Broken FD portion earns interest till that date."
    },
    {
      question: "Can I have multiple sweep-in FDs?",
      answer: "Yes! Each time balance exceeds threshold, new FD created. Example: ₹70K balance with ₹25K threshold = 2 FDs (₹25K each). When you withdraw, breaks latest FD first."
    },
    {
      question: "Is sweep-in FD penalty-free on breaking?",
      answer: "Usually yes! Most banks offer penalty-free premature withdrawal on sweep-in FDs. You get interest till the date FD is broken. Check your bank's terms."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Sweep-In Accounts 2025: Get 6-7% FD Returns on Savings Balance | MoneyCal"
        description="Complete guide to sweep-in and auto-sweep accounts in India. How it works, best banks (HDFC, ICICI Money Multiplier, Axis Encash 24, Kotak), threshold settings, instant liquidity. Earn ₹3,500 extra on ₹1L idle money! Interactive calculator, examples, tax implications."
        keywords="sweep in account, auto sweep facility, HDFC sweep in, ICICI money multiplier, savings account FD returns, idle money interest, best sweep in banks India, स्वीप इन अकाउंट"
        url="/learn/savings-bank-products/sweep-in-accounts-auto-sweep-facility-banks-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Savings & Bank Products</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 6 of 9</span>
                <Link 
                  to="/learn/savings-bank-products/bank-charges-hidden-fees-minimum-balance-penalty-india"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                  Lesson 6 • 35 Minutes • Intermediate
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Sweep-In Accounts
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  Get 6-7% FD Returns on Idle Savings! - स्वीप-इन खाते (बचत पर एफडी रिटर्न)
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-teal-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-teal-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>How sweep-in auto-converts idle money to FD (6-7% vs 3% savings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Best banks: HDFC, ICICI Money Multiplier, Axis Encash 24, Kotak</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Reverse sweep mechanism - instant money when you need it</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Earn ₹3,500 extra annually on ₹1L idle balance (calculator included)</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* How Sweep-In Works */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-teal-600" />
                How Sweep-In Works (Step-by-Step)
              </h2>

              <div className="space-y-8">
                {/* Forward Sweep */}
                <div>
                  <h3 className="text-2xl font-bold text-teal-900 mb-4">1️⃣ Forward Sweep (Savings → FD)</h3>
                  
                  <div className="bg-teal-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-gray-900 mb-4">Scenario: You get salary of ₹75,000</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Your Savings Balance</div>
                          <div className="text-2xl font-bold text-gray-900">₹75,000</div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-teal-600" />
                        <div className="flex-1 bg-green-100 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Threshold Set</div>
                          <div className="text-2xl font-bold text-gray-900">₹25,000</div>
                        </div>
                      </div>

                      <div className="text-center text-teal-600 font-bold text-lg">
                        ⚡ Auto-Sweep Happens!
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
                          <Lock className="w-6 h-6 text-blue-600 mb-2" />
                          <div className="text-sm text-gray-600">Remains in Savings @ 3%</div>
                          <div className="text-2xl font-bold text-gray-900">₹25,000</div>
                          <div className="text-xs text-gray-600 mt-2">For daily use (UPI, ATM, bills)</div>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                          <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                          <div className="text-sm text-gray-600">Auto-Swept to FD @ 6.5%</div>
                          <div className="text-2xl font-bold text-gray-900">₹50,000</div>
                          <div className="text-xs text-gray-600 mt-2">Earns 2x more interest!</div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Interest Calculation:</strong><br/>
                          • ₹25K @ 3% = ₹750/year<br/>
                          • ₹50K @ 6.5% = ₹3,250/year<br/>
                          <span className="text-green-600 font-bold">• Total: ₹4,000/year (vs ₹2,250 without sweep-in)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reverse Sweep */}
                <div>
                  <h3 className="text-2xl font-bold text-cyan-900 mb-4">2️⃣ Reverse Sweep (FD → Savings on Withdrawal)</h3>
                  
                  <div className="bg-cyan-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-gray-900 mb-4">Scenario: You need ₹40,000 for emergency</h4>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-100 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Available in Savings</div>
                          <div className="text-2xl font-bold text-gray-900">₹25,000</div>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">In Sweep-In FD</div>
                          <div className="text-2xl font-bold text-gray-900">₹50,000</div>
                        </div>
                      </div>

                      <div className="text-center text-cyan-600 font-bold text-lg">
                        🔄 Automatic Reverse Sweep Triggered!
                      </div>

                      <div className="bg-white p-6 rounded-lg">
                        <h5 className="font-bold text-gray-900 mb-3">What Happens:</h5>
                        <ol className="space-y-2 text-gray-700">
                          <li>1. You withdraw ₹40,000 (UPI/ATM/NetBanking)</li>
                          <li>2. First ₹25,000 comes from savings balance</li>
                          <li>3. Remaining ₹15,000 needed → Latest FD auto-breaks</li>
                          <li>4. ₹15,000 transferred to savings and given to you</li>
                          <li>5. Remaining FD balance: ₹35,000 (continues earning 6.5%)</li>
                        </ol>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="font-bold text-green-900">✅ You get money instantly!</p>
                        <p className="text-sm text-gray-700 mt-2">Total time: 0-5 seconds. Works even at midnight. No bank visit needed!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Interactive Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                🧮 Sweep-In Interest Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Savings Balance (₹)</label>
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Sweep-In Threshold (₹)</label>
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Without Sweep-In (3%)</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm opacity-90">Full Balance in Savings</div>
                      <div className="text-2xl font-bold">₹{balance.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Annual Interest @ 3%</div>
                      <div className="text-3xl font-bold text-red-300">₹{normalSavingsInterest.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">With Sweep-In</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Savings @ 3%:</span>
                      <span className="font-bold">₹{savingsBalance.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>FD @ 6.5%:</span>
                      <span className="font-bold text-green-300">₹{fdBalance.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t border-white/30 pt-2">
                      <div className="text-sm opacity-90">Total Annual Interest</div>
                      <div className="text-3xl font-bold text-green-300">₹{totalInterest.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center text-lg">
                💰 You Earn ₹{extraEarnings.toLocaleString('en-IN')} Extra Per Year! ({Math.round((extraEarnings / normalSavingsInterest) * 100)}% more)
              </div>
            </div>
          </motion.section>

          {/* Bank Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🏦 Best Banks for Sweep-In (2025)</h2>
              
              <div className="space-y-6">
                {/* HDFC */}
                <div className="border-2 border-red-200 rounded-xl p-6 hover:border-red-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">HDFC Bank - Sweep-In Facility</h3>
                      <p className="text-gray-600">Most popular sweep-in option</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">6.5%</div>
                      <div className="text-sm text-gray-600">FD Rate</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <strong className="text-gray-800">Features:</strong>
                      <ul className="text-sm space-y-1 text-gray-700 mt-2">
                        <li>• Threshold: ₹25,000 (customizable)</li>
                        <li>• Auto-sweep: Instant</li>
                        <li>• FD tenure: 1 year auto-created</li>
                        <li>• Penalty-free withdrawal</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-gray-800">Best For:</strong>
                      <p className="text-sm text-gray-700 mt-2">Salary account holders with stable income. Example: ₹60K salary, set ₹30K threshold, rest auto-sweeps!</p>
                    </div>
                  </div>
                </div>

                {/* ICICI Money Multiplier */}
                <div className="border-2 border-orange-200 rounded-xl p-6 hover:border-orange-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">ICICI Money Multiplier</h3>
                      <p className="text-gray-600">Lower threshold, more flexibility</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">6.7%</div>
                      <div className="text-sm text-gray-600">FD Rate</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <strong className="text-gray-800">Features:</strong>
                      <ul className="text-sm space-y-1 text-gray-700 mt-2">
                        <li>• Threshold: ₹10,000 (lower than HDFC!)</li>
                        <li>• Multiple FD slabs</li>
                        <li>• Interest calculated daily</li>
                        <li>• No charges</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-gray-800">Best For:</strong>
                      <p className="text-sm text-gray-700 mt-2">Lower balance users (₹20-50K). Even small idle amounts earn FD rates!</p>
                    </div>
                  </div>
                </div>

                {/* Axis Encash 24 */}
                <div className="border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Axis Bank - Encash 24</h3>
                      <p className="text-gray-600">24/7 instant access</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">6.5%</div>
                      <div className="text-sm text-gray-600">FD Rate</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <strong className="text-gray-800">Features:</strong>
                      <ul className="text-sm space-y-1 text-gray-700 mt-2">
                        <li>• Threshold: ₹25,000</li>
                        <li>• Instant liquidity 24/7</li>
                        <li>• Multiple FD creation</li>
                        <li>• Free facility</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-gray-800">Best For:</strong>
                      <p className="text-sm text-gray-700 mt-2">Users who need emergency access anytime. Works even on holidays!</p>
                    </div>
                  </div>
                </div>

                {/* Kotak 811 */}
                <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Kotak 811 - Auto Sweep</h3>
                      <p className="text-gray-600">Digital bank with sweep-in</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">6.0%</div>
                      <div className="text-sm text-gray-600">FD Rate</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <strong className="text-gray-800">Features:</strong>
                      <ul className="text-sm space-y-1 text-gray-700 mt-2">
                        <li>• Threshold: ₹25,000</li>
                        <li>• 100% digital setup</li>
                        <li>• Zero balance account</li>
                        <li>• Video KYC account opening</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-gray-800">Best For:</strong>
                      <p className="text-sm text-gray-700 mt-2">Tech-savvy users who want everything online. No branch visit needed!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Pros & Cons */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">⚖️ Sweep-In: Pros & Cons</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    ✅ Advantages
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Higher returns:</strong> Earn 6-7% on idle money (vs 3% savings)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Full liquidity:</strong> Access money anytime instantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Zero effort:</strong> Everything automatic, you do nothing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>No charges:</strong> Free facility in most banks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Penalty-free:</strong> FD breaking has no penalty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Safe:</strong> DICGC insured ₹5L per bank</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    ⚠️ Limitations
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Not highest:</strong> 6-7% vs 7.25% in small finance banks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Threshold needed:</strong> Need to maintain ₹25K minimum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Taxable:</strong> Interest fully taxable (like regular FD)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Not available:</strong> All banks don't offer this facility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Frequent withdrawals:</strong> If you withdraw often, FD keeps breaking (less interest)</span>
                    </li>
                  </ul>
                </div>
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
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Sweep-in = Earn FD rates (6-7%) on idle savings automatically. Best of both worlds!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Best banks: HDFC (₹25K threshold), ICICI Money Multiplier (₹10K threshold), Axis Encash 24</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Instant liquidity: Money available 24/7, reverse sweep in 0-5 seconds!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Free facility: No charges in most banks. Just activate via netbanking/app.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Perfect for: Emergency fund (₹3-6 months expenses). Earn FD returns with savings liquidity!</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Calculators</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/calculators/fd-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Calculator className="w-8 h-8 text-teal-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">FD Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate FD returns</p>
                </Link>
                <Link to="/calculators/savings-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <DollarSign className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Savings Calculator</h3>
                  <p className="text-sm text-gray-600">Compare sweep-in vs regular</p>
                </Link>
                <Link to="/calculators/income-tax-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <FileText className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tax Calculator</h3>
                  <p className="text-sm text-gray-600">Tax on FD interest</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Stop Losing ₹5,000/Year to Bank Charges!</h3>
            <p className="mb-6 text-red-100">Learn all hidden bank fees and how to avoid them. Save thousands annually!</p>
            <Link
              to="/learn/savings-bank-products/bank-charges-hidden-fees-minimum-balance-penalty-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Bank Charges Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SweepInAccounts;
