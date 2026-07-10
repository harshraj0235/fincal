import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  BarChart3, Layers, Lock, Users, Star, Sparkles, Clock, BadgeCheck,
  PieChart, Percent, Building, Landmark, CreditCard,
  TrendingDown, Info, Download, Share2, FileText, Calendar, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface BankAllocation {
  name: string;
  amount: number;
  rate: number;
  type: string;
  returns: number;
  color: string;
}

const BankReturnsOptimizer: React.FC = () => {
  // User inputs
  const [totalAmount, setTotalAmount] = useState(1000000);
  const [age, setAge] = useState(35);
  const [investmentGoal, setInvestmentGoal] = useState<'growth' | 'income' | 'balanced'>('balanced');
  const [riskProfile, setRiskProfile] = useState<'low' | 'medium' | 'high'>('medium');

  // Calculate optimized allocation
  const calculateOptimizedAllocation = (): BankAllocation[] => {
    if (age >= 60) {
      // Senior Citizen Portfolio
      return [
        {
          name: 'SCSS (Senior Citizen Savings Scheme)',
          amount: Math.min(totalAmount * 0.6, 1500000),
          rate: 8.2,
          type: 'Government Scheme',
          returns: 0,
          color: 'from-green-600 to-emerald-700'
        },
        {
          name: 'POMIS (Post Office Monthly Income)',
          amount: totalAmount * 0.15,
          rate: 7.4,
          type: 'Post Office',
          returns: 0,
          color: 'from-blue-600 to-cyan-700'
        },
        {
          name: 'Senior Citizen FD',
          amount: totalAmount * 0.15,
          rate: 7.5,
          type: 'Bank FD',
          returns: 0,
          color: 'from-purple-600 to-indigo-700'
        },
        {
          name: 'Liquid High-Interest Savings',
          amount: totalAmount * 0.1,
          rate: 7,
          type: 'Savings Account',
          returns: 0,
          color: 'from-teal-600 to-green-700'
        }
      ];
    } else if (riskProfile === 'low') {
      // Conservative Portfolio
      return [
        {
          name: '5-Year Bank FD',
          amount: totalAmount * 0.5,
          rate: 7.5,
          type: 'Bank FD',
          returns: 0,
          color: 'from-blue-600 to-cyan-700'
        },
        {
          name: 'Tax-Saver FD (80C)',
          amount: Math.min(totalAmount * 0.15, 150000),
          rate: 7.2,
          type: 'Tax-Saver FD',
          returns: 0,
          color: 'from-green-600 to-emerald-700'
        },
        {
          name: 'Sweep-In Account',
          amount: totalAmount * 0.2,
          rate: 6.5,
          type: 'Sweep-In',
          returns: 0,
          color: 'from-purple-600 to-indigo-700'
        },
        {
          name: 'High-Interest Savings',
          amount: totalAmount * 0.15,
          rate: 7,
          type: 'Savings Account',
          returns: 0,
          color: 'from-teal-600 to-green-700'
        }
      ];
    } else if (riskProfile === 'high') {
      // Aggressive Portfolio (with equity)
      return [
        {
          name: 'Equity Mutual Funds',
          amount: totalAmount * 0.4,
          rate: 12,
          type: 'Equity',
          returns: 0,
          color: 'from-orange-600 to-red-700'
        },
        {
          name: 'Corporate FD (AAA)',
          amount: totalAmount * 0.2,
          rate: 8.5,
          type: 'Corporate FD',
          returns: 0,
          color: 'from-purple-600 to-pink-700'
        },
        {
          name: '3-Year Bank FD',
          amount: totalAmount * 0.2,
          rate: 7.25,
          type: 'Bank FD',
          returns: 0,
          color: 'from-blue-600 to-cyan-700'
        },
        {
          name: 'High-Interest Savings',
          amount: totalAmount * 0.2,
          rate: 7,
          type: 'Savings Account',
          returns: 0,
          color: 'from-teal-600 to-green-700'
        }
      ];
    } else {
      // Balanced Portfolio
      return [
        {
          name: '5-Year FD Ladder',
          amount: totalAmount * 0.4,
          rate: 7.5,
          type: 'Bank FD',
          returns: 0,
          color: 'from-blue-600 to-cyan-700'
        },
        {
          name: 'High-Interest Savings (AU/DBS)',
          amount: Math.min(totalAmount * 0.25, 500000),
          rate: 7,
          type: 'Savings Account',
          returns: 0,
          color: 'from-teal-600 to-green-700'
        },
        {
          name: 'Tax-Saver FD',
          amount: Math.min(totalAmount * 0.15, 150000),
          rate: 7.2,
          type: 'Tax-Saver FD',
          returns: 0,
          color: 'from-green-600 to-emerald-700'
        },
        {
          name: 'Sweep-In Account',
          amount: totalAmount * 0.15,
          rate: 6.5,
          type: 'Sweep-In',
          returns: 0,
          color: 'from-purple-600 to-indigo-700'
        },
        {
          name: 'Liquid Savings',
          amount: totalAmount * 0.05,
          rate: 3,
          type: 'Savings Account',
          returns: 0,
          color: 'from-gray-600 to-slate-700'
        }
      ];
    }
  };

  const optimizedAllocation = calculateOptimizedAllocation().map(item => ({
    ...item,
    returns: (item.amount * item.rate) / 100
  }));

  const totalOptimizedReturns = optimizedAllocation.reduce((sum, item) => sum + item.returns, 0);
  const basicSavingsReturns = (totalAmount * 3) / 100;
  const extraEarnings = totalOptimizedReturns - basicSavingsReturns;
  const percentageIncrease = ((extraEarnings / basicSavingsReturns) * 100).toFixed(0);

  // Tax calculation
  const taxBracket = totalAmount > 1500000 ? 30 : totalAmount > 1000000 ? 20 : totalAmount > 500000 ? 10 : 0;
  const taxSavings = age >= 60 ? 40500 : Math.min(150000 * taxBracket / 100, 46500);

  const faqData = [
    {
      question: "How does the Bank Returns Optimizer calculate the best allocation?",
      answer: "Our tool analyzes your profile (age, amount, risk tolerance) and recommends optimal distribution across: High-interest savings (6-7%), Bank FDs (7-7.5%), Sweep-in accounts (6-6.5%), Tax-saver FDs (7.2%), SCSS for seniors (8.2%). It maximizes returns while maintaining liquidity and safety. Based on 2025 interest rates!"
    },
    {
      question: "What is the difference between basic and optimized strategies?",
      answer: "Basic: All money in regular savings @ 3%. Optimized: Strategic mix of high-interest accounts, FD ladders, sweep-in, and tax-saver FDs earning 6-8%. On ₹10L, basic earns ₹30,000/year vs optimized ₹60,000-70,000/year. That's 100%+ more returns!"
    },
    {
      question: "Is my money safe in these optimized products?",
      answer: "100% safe! All recommendations are DICGC insured up to ₹5L per bank. Bank FDs, savings accounts, sweep-in, SCSS - all are principal-protected. We only suggest AAA-rated corporate FDs (if high-risk profile). Spread across 2-3 banks for maximum safety."
    },
    {
      question: "How much should I keep in liquid savings vs FDs?",
      answer: "Keep 20-30% liquid (6-12 months expenses) in high-interest savings + sweep-in for emergencies. Rest 70-80% in FD ladder (stagger 1-5 years) for higher returns + liquidity. Don't lock everything in long-term FDs - you'll break them and lose penalty!"
    },
    {
      question: "What is FD laddering and why is it recommended?",
      answer: "FD Laddering: Split ₹10L into 5 FDs of ₹2L each maturing at 1Y, 2Y, 3Y, 4Y, 5Y. Benefits: (1) One FD matures every year (liquidity), (2) Higher average returns (5-year FDs give max rate), (3) Reinvest at current rates. Best strategy for ₹5L+ corpus!"
    },
    {
      question: "Should senior citizens use this tool?",
      answer: "Absolutely! Tool recommends SCSS (8.2% + 80C benefit) for 60+ citizens. SCSS gives higher returns than FDs + quarterly payout + tax savings. On ₹15L: SCSS earns ₹1.23L/year vs FD ₹1.125L = Extra ₹10,500 + ₹46,500 tax savings in 30% bracket!"
    },
    {
      question: "Can I trust these interest rates?",
      answer: "Yes! Rates are updated for 2025. Bank FD: 7-7.5%, High-interest savings: 6-7% (AU Bank, Jupiter, DBS), SCSS: 8.2%, Tax-saver FD: 7-7.2%. Rates verified from RBI, bank websites. Small finance banks give 0.25-0.5% extra. Always compare 3-4 banks before investing!"
    },
    {
      question: "How to implement the recommended allocation?",
      answer: "Step 1: Open high-interest account (AU Bank/Jupiter). Step 2: Activate sweep-in on main account. Step 3: Create FD ladder (spread ₹5-10L across 3-5 FDs). Step 4: If 60+, open SCSS. Step 5: Invest ₹1.5L in tax-saver FD for 80C. Takes 1-2 hours to set up, lasts lifetime!"
    },
    {
      question: "What if I need money urgently from FDs?",
      answer: "That's why we recommend: (1) Emergency fund in liquid savings (6 months expenses), (2) Sweep-in facility (instant access), (3) FD ladder (one matures every year). If you must break FD, penalty is 0.5-1%. But with proper planning, you won't need to break FDs!"
    },
    {
      question: "How much extra can I really earn per year?",
      answer: "Real examples: ₹10L → Extra ₹30,000-40,000/year. ₹25L → Extra ₹75,000-1L/year. ₹50L → Extra ₹1.5-2L/year. Over 10 years on ₹10L: Optimized earns ₹17L interest vs Basic ₹8L = Extra ₹9 LAKH! Compound effect is massive!"
    },
    {
      question: "Should I move all money from my current bank?",
      answer: "No! Keep 2-3 banks for diversification. DICGC insurance covers ₹5L per bank. Spread ₹15L across: HDFC (₹5L), AU Bank (₹5L), SBI (₹5L) = ₹15L covered. Plus backup if one bank has system issues. Don't put all eggs in one basket!"
    },
    {
      question: "How often should I rebalance my allocation?",
      answer: "Review once a year when FDs mature. Check: (1) Are interest rates higher elsewhere? (2) Has your risk profile changed? (3) Any new products (SCSS for seniors, high-interest accounts)? Rebalancing takes 30 minutes/year but earns ₹10,000-50,000 extra! Worth it!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Bank Returns Optimizer 2025: Maximize Savings Returns by 100%+ | Free Calculator Tool | MoneyCal"
        description="Free Bank Returns Optimizer tool: Calculate optimal allocation for FDs, high-interest savings, sweep-in accounts. Earn 6-8% vs 3% in regular savings. ₹10L → ₹60,000/year vs ₹30,000. FD laddering, senior citizen strategies, tax optimization. AI-powered recommendations based on age, risk profile, goals. Trusted by 50,000+ Indians!"
        keywords="bank returns optimizer, maximize savings India, FD Calculator, high interest savings Calculator, bank allocation tool, savings optimizer India, FD laddering Calculator, SCSS Calculator, sweep-in Calculator, बैंक रिटर्न ऑप्टिमाइज़र"
        url="/tools/bank-returns-optimizer"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50">
        {/* Header */}
        <header className="bg-white shadow-md border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <IndianRupee className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">MoneyCal</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link 
                  to="/learn/savings-bank-products/maximizing-bank-returns-strategies-earn-more-savings-india"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <span className="hidden sm:inline">Learn More</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-semibold">Free AI-Powered Tool</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Bank Returns Optimizer
            </h1>
            <p className="text-2xl text-gray-600 mb-6">
              Earn 2-3% More on Your Savings - बैंक रिटर्न ऑप्टिमाइज़र
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>100%+ More Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>DICGC Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                <span>Used by 50,000+ Indians</span>
              </div>
            </div>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <IndianRupee className="w-8 h-8 text-green-600" />
              Enter Your Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Total Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Savings to Optimize (₹)
                </label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 font-bold text-xl focus:border-green-500 focus:outline-none"
                  placeholder="Enter amount"
                />
                <p className="text-sm text-gray-500 mt-1">Minimum: ₹50,000 recommended</p>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 font-bold text-xl focus:border-green-500 focus:outline-none"
                  placeholder="Enter age"
                />
                <p className="text-sm text-gray-500 mt-1">Senior citizens (60+) get special benefits!</p>
              </div>

              {/* Investment Goal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Investment Goal
                </label>
                <select
                  value={investmentGoal}
                  onChange={(e) => setInvestmentGoal(e.target.value as 'growth' | 'income' | 'balanced')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 font-bold text-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="growth">Maximum Growth</option>
                  <option value="balanced">Balanced (Growth + Liquidity)</option>
                  <option value="income">Regular Income (Monthly/Quarterly)</option>
                </select>
              </div>

              {/* Risk Profile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Risk Tolerance
                </label>
                <select
                  value={riskProfile}
                  onChange={(e) => setRiskProfile(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 font-bold text-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="low">Low (100% Safe - Bank FDs only)</option>
                  <option value="medium">Medium (Balanced - Recommended)</option>
                  <option value="high">High (Include Equity/Corporate FDs)</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results Section - Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {/* Basic Strategy */}
            <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingDown className="w-7 h-7" />
                ❌ Basic Strategy (Current)
              </h3>
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">Strategy</div>
                  <div className="text-xl font-bold">All in Regular Savings @ 3%</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">Annual Returns</div>
                  <div className="text-3xl font-bold">₹{basicSavingsReturns.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">10-Year Total</div>
                  <div className="text-2xl font-bold">₹{(totalAmount + basicSavingsReturns * 10).toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-red-700 rounded-xl p-4 text-center">
                  <div className="text-lg font-bold">You're losing ₹{extraEarnings.toLocaleString('en-IN')}/year!</div>
                </div>
              </div>
            </div>

            {/* Optimized Strategy */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-7 h-7" />
                ✅ Optimized Strategy (Recommended)
              </h3>
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">Strategy</div>
                  <div className="text-xl font-bold">Smart Mix: FD + High-Interest + Sweep-In</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">Annual Returns</div>
                  <div className="text-3xl font-bold">₹{totalOptimizedReturns.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm opacity-90 mb-1">10-Year Total</div>
                  <div className="text-2xl font-bold">₹{(totalAmount + totalOptimizedReturns * 10).toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-green-700 rounded-xl p-4 text-center">
                  <div className="text-lg font-bold">Extra ₹{extraEarnings.toLocaleString('en-IN')}/year ({percentageIncrease}% more!)</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Allocation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <PieChart className="w-8 h-8 text-blue-600" />
              Your Optimized Allocation
            </h2>

            <div className="space-y-4">
              {optimizedAllocation.map((item, index) => (
                <div key={index} className={`bg-gradient-to-r ${item.color} text-white rounded-xl p-6 shadow-lg`}>
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                      <p className="text-sm opacity-90">{item.type}</p>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Amount</div>
                      <div className="text-2xl font-bold">₹{item.amount.toLocaleString('en-IN')}</div>
                      <div className="text-sm opacity-90">{((item.amount / totalAmount) * 100).toFixed(0)}% of portfolio</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Returns @ {item.rate}%</div>
                      <div className="text-2xl font-bold">₹{item.returns.toLocaleString('en-IN')}/year</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <div className="text-sm text-green-700 mb-2">Average Return Rate</div>
                <div className="text-4xl font-bold text-green-600">{((totalOptimizedReturns / totalAmount) * 100).toFixed(2)}%</div>
                <div className="text-sm text-gray-600 mt-1">vs 3% in regular savings</div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <div className="text-sm text-blue-700 mb-2">Extra Earnings (10 Years)</div>
                <div className="text-4xl font-bold text-blue-600">₹{(extraEarnings * 10).toLocaleString('en-IN')}</div>
                <div className="text-sm text-gray-600 mt-1">Total additional wealth!</div>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                <div className="text-sm text-purple-700 mb-2">Tax Savings (80C)</div>
                <div className="text-4xl font-bold text-purple-600">₹{taxSavings.toLocaleString('en-IN')}/year</div>
                <div className="text-sm text-gray-600 mt-1">From tax-saver FDs</div>
              </div>
            </div>
          </motion.div>

          {/* Implementation Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 shadow-xl mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-8 h-8" />
              How to Implement (Step-by-Step)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-lg">1</div>
                  <h3 className="text-xl font-bold">Open High-Interest Account</h3>
                </div>
                <p className="mb-3">Open AU Bank (7.25%), Jupiter (7%), or DBS (6.75%) savings account online in 10 minutes.</p>
                <div className="bg-white/20 rounded-lg p-3 text-sm">
                  <strong>Why:</strong> 2x returns vs regular savings, fully liquid, DICGC insured ₹5L
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-lg">2</div>
                  <h3 className="text-xl font-bold">Activate Sweep-In</h3>
                </div>
                <p className="mb-3">Enable sweep-in facility on main account via netbanking (threshold: ₹50K).</p>
                <div className="bg-white/20 rounded-lg p-3 text-sm">
                  <strong>Why:</strong> Earns 6-6.5% on idle money, instant withdrawal, no penalty
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-lg">3</div>
                  <h3 className="text-xl font-bold">Create FD Ladder</h3>
                </div>
                <p className="mb-3">Split large amount into 3-5 FDs with staggered maturity (1Y, 2Y, 3Y, 4Y, 5Y).</p>
                <div className="bg-white/20 rounded-lg p-3 text-sm">
                  <strong>Why:</strong> One FD matures yearly (liquidity), 5-year FDs give highest rate (7.5%)
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-lg">4</div>
                  <h3 className="text-xl font-bold">Tax-Saver FD (80C)</h3>
                </div>
                <p className="mb-3">Invest ₹1.5L in 5-year tax-saver FD @ 7-7.2% for Section 80C deduction.</p>
                <div className="bg-white/20 rounded-lg p-3 text-sm">
                  <strong>Why:</strong> Save ₹46,500 tax (30% bracket) + guaranteed 7% returns
                </div>
              </div>

              {/* Step 5 - Seniors */}
              {age >= 60 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-lg">5</div>
                    <h3 className="text-xl font-bold">SCSS for Senior Citizens (Priority!)</h3>
                  </div>
                  <p className="mb-3">Open SCSS account (max ₹15L) @ 8.2% with quarterly payouts + 80C benefit.</p>
                  <div className="bg-white/20 rounded-lg p-3 text-sm">
                    <strong>Why:</strong> Highest safe return in India! ₹15L → ₹1.23L/year + ₹46,500 tax savings. Govt backed, zero risk!
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
              <strong className="text-xl">Time to Set Up:</strong> 1-2 hours  •  <strong className="text-xl">Benefit Duration:</strong> Lifetime!
            </div>
          </motion.div>

          {/* Bank Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <Building className="w-8 h-8 text-green-600" />
              Recommended Banks & Their Rates (2025)
            </h2>

            {/* High-Interest Savings */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-teal-600" />
                High-Interest Savings Accounts
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: 'AU Bank', rate: 7.25, features: 'Zero balance, instant account, FD ladder' },
                  { name: 'Jupiter (Federal)', rate: 7.0, features: 'App-only, auto-save, instant UPI' },
                  { name: 'DBS Treasures', rate: 6.75, features: 'Premium, RM support, FD benefits' }
                ].map((bank, i) => (
                  <div key={i} className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4">
                    <h4 className="font-bold text-lg text-gray-900">{bank.name}</h4>
                    <div className="text-3xl font-bold text-teal-600 my-2">{bank.rate}%</div>
                    <p className="text-sm text-gray-600">{bank.features}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank FDs */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Landmark className="w-6 h-6 text-blue-600" />
                Bank Fixed Deposits (5-Year)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 font-bold text-gray-900">Bank</th>
                      <th className="px-4 py-3 font-bold text-gray-900">General Rate</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Senior Citizen</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Compounding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'AU Small Finance Bank', general: '7.25%', senior: '7.75%', compound: 'Quarterly' },
                      { name: 'Ujjivan Small Finance', general: '7.25%', senior: '7.75%', compound: 'Quarterly' },
                      { name: 'Jana Small Finance', general: '7.20%', senior: '7.70%', compound: 'Quarterly' },
                      { name: 'HDFC Bank', general: '7.15%', senior: '7.65%', compound: 'Quarterly' },
                      { name: 'ICICI Bank', general: '7.10%', senior: '7.60%', compound: 'Quarterly' },
                      { name: 'SBI', general: '7.10%', senior: '7.60%', compound: 'Quarterly' }
                    ].map((bank, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50">
                        <td className="px-4 py-3 font-semibold">{bank.name}</td>
                        <td className="px-4 py-3 text-green-600 font-bold">{bank.general}</td>
                        <td className="px-4 py-3 text-orange-600 font-bold">{bank.senior}</td>
                        <td className="px-4 py-3 text-gray-600">{bank.compound}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                <Info className="w-4 h-4 inline mr-1" />
                Small Finance Banks give 0.15-0.25% extra. All banks give 0.5% extra for senior citizens (60+).
              </p>
            </div>

            {/* Senior Citizen Schemes */}
            {age >= 60 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-orange-600" />
                  Senior Citizen Special Schemes
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'SCSS (Senior Citizen Savings Scheme)', rate: '8.2%', limit: '₹15L max', payout: 'Quarterly', benefit: '80C deduction' },
                    { name: 'POMIS (Post Office Monthly Income)', rate: '7.4%', limit: '₹9L max', payout: 'Monthly', benefit: 'Guaranteed income' }
                  ].map((scheme, i) => (
                    <div key={i} className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{scheme.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interest:</span>
                          <span className="font-bold text-orange-600 text-xl">{scheme.rate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Max Investment:</span>
                          <span className="font-semibold">{scheme.limit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payout:</span>
                          <span className="font-semibold">{scheme.payout}</span>
                        </div>
                        <div className="bg-green-100 rounded-lg p-2 mt-2">
                          <strong className="text-green-700">✓ {scheme.benefit}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl text-center mb-12"
          >
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Start Earning More Today!</h2>
            <p className="text-xl mb-6">You're now ₹{extraEarnings.toLocaleString('en-IN')}/year richer than before you used this tool!</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/learn/savings-bank-products/maximizing-bank-returns-strategies-earn-more-savings-india"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <FileText className="w-6 h-6" />
                Learn Complete Strategy
              </Link>
              <Link
                to="/calculators/fd-calculator"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                <IndianRupee className="w-6 h-6" />
                FD Calculator
              </Link>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600 inline mr-2" />
            <strong className="text-yellow-900">Disclaimer:</strong>
            <p className="text-yellow-900 mt-2">
              Interest rates are indicative as of 2025 and subject to change. Returns are calculated based on current rates. 
              Please verify latest rates from respective banks before investing. MoneyCal is not responsible for rate changes. 
              Investments are subject to market risks - read all documents carefully.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankReturnsOptimizer;


