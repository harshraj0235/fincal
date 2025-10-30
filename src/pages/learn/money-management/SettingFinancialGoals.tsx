import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowRight, ArrowLeft, Calculator, Target, TrendingUp, 
  Calendar, Award, CheckCircle, AlertCircle, Lightbulb, Star, 
  Home, Car, GraduationCap, Heart, Plane, Briefcase, PiggyBank
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

/**
 * LESSON 2: Setting Financial Goals (Short-, Medium-, Long-Term)
 * Category: Money Management & Budgeting
 * Duration: 50 minutes
 * Difficulty: Beginner
 * 
 * Learning Objectives:
 * 1. Understand SMART goal framework for financial planning
 * 2. Learn to categorize goals by time horizon (short/medium/long)
 * 3. Calculate exact amounts needed for each goal
 * 4. Create actionable plans to achieve financial goals
 * 5. Prioritize multiple competing goals effectively
 */

const SettingFinancialGoals: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'short' | 'medium' | 'long'>('short');
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [monthsToSave, setMonthsToSave] = useState<number>(12);
  const [monthlySIP, setMonthlySIP] = useState<number>(0);

  // Simple SIP calculation for goal planning
  const calculateMonthlySIP = (targetAmount: number, months: number, rate: number = 12) => {
    const monthlyRate = rate / 12 / 100;
    const n = months;
    const sip = targetAmount * monthlyRate / ((Math.pow(1 + monthlyRate, n) - 1) * (1 + monthlyRate));
    return Math.round(sip);
  };

  const handleCalculate = () => {
    const sip = calculateMonthlySIP(goalAmount, monthsToSave);
    setMonthlySIP(sip);
  };

  return (
    <>
      <SEOHelmet
        title="Setting Financial Goals: Short, Medium & Long-Term Planning | MoneyCal Learn"
        description="Learn SMART financial goal setting in Hindi & English. Set short-term (vacation), medium-term (car), long-term (retirement) goals with real Indian examples and calculators."
        keywords="financial goals India, SMART goals, short term goals, long term goals, goal planning Hindi, retirement planning, emergency fund goal, वित्तीय लक्ष्य, लक्ष्य निर्धारण"
        url="/learn/money-management/setting-financial-goals-short-medium-long-term"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/money-management" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Money Management</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 2 of 8</span>
                <Link 
                  to="/learn/money-management/budgeting-how-to-track-income-expenses-india"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                  Lesson 2 • 50 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Setting Financial Goals
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  Short-, Medium-, Long-Term Planning (छोटी, मध्यम और लंबी अवधि की योजना)
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  'Master the SMART goal framework for financial planning',
                  'Categorize goals into short-term (1 year), medium-term (1-5 years), long-term (5+ years)',
                  'Calculate exact amounts needed for each specific goal',
                  'Create step-by-step action plans to achieve goals',
                  'Prioritize multiple goals when resources are limited'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Section 1: Why Financial Goals Matter */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              1. Why Financial Goals Matter (वित्तीय लक्ष्य क्यों महत्वपूर्ण हैं)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                According to a <strong>2024 HDFC survey</strong>, <span className="bg-red-100 px-2 py-1 rounded font-semibold">73% of Indians 
                don't have written financial goals</span>. They save "randomly" or "whatever is left" at month-end—which is usually ₹0!
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 italic">
                <strong>Hindi में:</strong> HDFC के 2024 सर्वेक्षण के अनुसार, <strong>73% भारतीयों के पास लिखित वित्तीय लक्ष्य नहीं हैं</strong>। 
                वे "जो बच जाए" महीने के अंत में बचाते हैं—जो आमतौर पर ₹0 होता है!
              </p>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-6 border-2 border-red-200">
                <h4 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  ❌ What Happens WITHOUT Financial Goals?
                </h4>
                <div className="space-y-3">
                  {[
                    { problem: 'No Clear Direction', result: 'Save ₹5K this month, spend ₹8K next month. Wealth = ZERO after 10 years.' },
                    { problem: 'Lifestyle Inflation', result: 'Salary ₹30K → ₹70K, but expenses also ₹27K → ₹68K. No wealth built!' },
                    { problem: 'Impulse Spending', result: 'See sale, buy ₹15K shoes you don\'t need. Goal: delayed by 3 months.' },
                    { problem: 'Emergency Surprises', result: 'Medical emergency: ₹2L needed. No savings. Take 18% personal loan!' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <strong className="text-red-700 block mb-1">{i + 1}. {item.problem}:</strong>
                      <p className="text-sm text-gray-700 italic">{item.result}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-300">
                <h4 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  ✅ What Happens WITH Clear Financial Goals?
                </h4>
                <div className="space-y-3">
                  {[
                    { benefit: 'Disciplined Saving', result: 'SIP ₹10K/month for Europe trip. After 18 months: ₹2.2L saved! Trip booked! ✈️' },
                    { benefit: 'Controlled Spending', result: 'Goal: ₹50K emergency fund. Skip ₹8K impulse buys. Fund built in 6 months! 🎯' },
                    { benefit: 'Motivation & Progress', result: 'Track ₹5L car fund monthly. See it grow ₹15K → ₹45K → ₹1.2L. Motivation HIGH! 📈' },
                    { benefit: 'Financial Security', result: 'Goal: 6-month emergency fund = ₹3L. Achieved! Job loss? No panic. Time to find better job! 💪' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                      <strong className="text-green-700 block mb-1">{i + 1}. {item.benefit}:</strong>
                      <p className="text-sm text-gray-700 italic">{item.result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: The SMART Goal Framework */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Star className="w-8 h-8 text-purple-600" />
              2. The SMART Goal Framework (SMART लक्ष्य रूपरेखा)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A goal like <span className="bg-red-100 px-2 py-1 rounded">"I want to be rich"</span> is useless. 
                A SMART goal like <span className="bg-green-100 px-2 py-1 rounded">"I will save ₹5,00,000 for a car down payment 
                by Dec 2026 through ₹20,000 monthly SIP"</span> is powerful!
              </p>

              {/* SMART Breakdown */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 mb-8">
                <h3 className="text-3xl font-bold mb-6 text-center">
                  🎯 SMART Goals Framework
                </h3>
                
                <div className="space-y-4">
                  {/* S - Specific */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-purple-600">
                        S
                      </div>
                      <h4 className="text-2xl font-bold">SPECIFIC (विशिष्ट)</h4>
                    </div>
                    <p className="mb-3 text-white/90">Exactly WHAT, HOW MUCH, and WHY?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-red-100 text-red-900 p-3 rounded-lg">
                        <strong>❌ Vague:</strong> "I want to save money"
                      </div>
                      <div className="bg-green-100 text-green-900 p-3 rounded-lg">
                        <strong>✅ Specific:</strong> "I will save ₹3,00,000 for my wedding in Goa"
                      </div>
                    </div>
                  </div>

                  {/* M - Measurable */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-purple-600">
                        M
                      </div>
                      <h4 className="text-2xl font-bold">MEASURABLE (मापने योग्य)</h4>
                    </div>
                    <p className="mb-3 text-white/90">Can you TRACK progress with numbers?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-red-100 text-red-900 p-3 rounded-lg">
                        <strong>❌ Not Measurable:</strong> "I want financial freedom"
                      </div>
                      <div className="bg-green-100 text-green-900 p-3 rounded-lg">
                        <strong>✅ Measurable:</strong> "I will build ₹10,00,000 passive income portfolio by 2030"
                      </div>
                    </div>
                  </div>

                  {/* A - Achievable */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-purple-600">
                        A
                      </div>
                      <h4 className="text-2xl font-bold">ACHIEVABLE (प्राप्त करने योग्य)</h4>
                    </div>
                    <p className="mb-3 text-white/90">Is it REALISTIC given your income and expenses?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-red-100 text-red-900 p-3 rounded-lg">
                        <strong>❌ Unrealistic:</strong> "Save ₹50L in 1 year" (₹30K salary)
                      </div>
                      <div className="bg-green-100 text-green-900 p-3 rounded-lg">
                        <strong>✅ Achievable:</strong> "Save ₹3.6L in 1 year" (₹30K SIP, ₹50K salary)
                      </div>
                    </div>
                  </div>

                  {/* R - Relevant */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-purple-600">
                        R
                      </div>
                      <h4 className="text-2xl font-bold">RELEVANT (प्रासंगिक)</h4>
                    </div>
                    <p className="mb-3 text-white/90">Does this goal MATTER to your life priorities?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-red-100 text-red-900 p-3 rounded-lg">
                        <strong>❌ Not Relevant:</strong> "Buy ₹3L Gucci bag" (you're in debt!)
                      </div>
                      <div className="bg-green-100 text-green-900 p-3 rounded-lg">
                        <strong>✅ Relevant:</strong> "Pay off ₹2L credit card debt" (reduces 18% interest!)
                      </div>
                    </div>
                  </div>

                  {/* T - Time-Bound */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-purple-600">
                        T
                      </div>
                      <h4 className="text-2xl font-bold">TIME-BOUND (समय-सीमा)</h4>
                    </div>
                    <p className="mb-3 text-white/90">By WHEN will you achieve this?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-red-100 text-red-900 p-3 rounded-lg">
                        <strong>❌ No Deadline:</strong> "I'll save for retirement someday"
                      </div>
                      <div className="bg-green-100 text-green-900 p-3 rounded-lg">
                        <strong>✅ Time-Bound:</strong> "I'll save ₹50L by age 60 (March 2055)"
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SMART Goal Example */}
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-bold text-yellow-900 mb-4">
                  📝 Real Indian Example: Converting Vague → SMART Goal
                </h4>
                <div className="bg-white rounded-lg p-5 mb-4 border-2 border-red-200">
                  <strong className="text-red-700 text-lg mb-2 block">❌ Vague Goal (NOT useful):</strong>
                  <p className="text-gray-800 text-lg italic">
                    "I want to buy a house in Bangalore"
                  </p>
                </div>
                <div className="text-center my-4">
                  <ArrowRight className="w-8 h-8 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-600 font-semibold mt-2">Transform using SMART framework ↓</p>
                </div>
                <div className="bg-white rounded-lg p-5 border-2 border-green-300">
                  <strong className="text-green-700 text-lg mb-3 block">✅ SMART Goal (Powerful & Actionable):</strong>
                  <p className="text-gray-900 text-lg leading-relaxed mb-4">
                    "I will save <strong className="text-green-700">₹25,00,000</strong> (25 lakhs) for a 
                    <strong className="text-green-700"> 2BHK apartment down payment in Whitefield, Bangalore</strong> by 
                    <strong className="text-green-700"> December 2028</strong> (48 months from now) through:
                  </p>
                  <ul className="ml-6 space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Monthly SIP: ₹40,000 in Nifty 50 Index Fund (expected 12% returns)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Bonus savings: 50% of annual bonus (₹1.5L × 4 years = ₹6L)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Cut dining out from ₹8K → ₹3K/month (save ₹5K extra for SIP)</span>
                    </li>
                  </ul>
                  <div className="mt-4 bg-green-100 p-4 rounded-lg">
                    <strong className="text-green-900">💰 Total by Dec 2028:</strong>
                    <div className="text-2xl font-bold text-green-700 mt-1">
                      ₹25,89,000 (SIP) + ₹6,00,000 (bonus) = ₹31,89,000
                    </div>
                    <p className="text-sm text-green-800 mt-2">
                      ✅ Enough for 25% down payment + registration costs for ₹1 crore flat!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Goal Categories by Time Horizon */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              3. Goal Categories by Time Horizon (समय अवधि के अनुसार लक्ष्य)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Different goals need <strong>different investment strategies</strong>. A 6-month goal → Keep in FD (safe, liquid). 
                A 20-year goal → Invest in equity (higher returns, can handle volatility).
              </p>

              {/* Timeframe Selector */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {[
                  { id: 'short', label: 'Short-Term (< 1 year)', icon: '🏃', color: 'blue' },
                  { id: 'medium', label: 'Medium-Term (1-5 years)', icon: '🚗', color: 'green' },
                  { id: 'long', label: 'Long-Term (5+ years)', icon: '🏠', color: 'purple' }
                ].map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => setSelectedTimeframe(tf.id as any)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      selectedTimeframe === tf.id
                        ? `bg-${tf.color}-600 text-white shadow-lg scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tf.icon} {tf.label}
                  </button>
                ))}
              </div>

              {/* Short-Term Goals */}
              {selectedTimeframe === 'short' && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-5xl">🏃</div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">SHORT-TERM GOALS (अल्पकालिक लक्ष्य)</h3>
                      <p className="text-blue-700 font-semibold">Timeline: Less than 1 year | Strategy: SAFETY first</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 mb-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">🎯 Typical Short-Term Goals for Indians:</h4>
                    <div className="space-y-3">
                      {[
                        { goal: '🏦 Emergency Fund (3 months)', amount: '₹1,50,000', where: 'Liquid Fund, Bank Savings' },
                        { goal: '🎊 Diwali Shopping', amount: '₹25,000', where: 'RD (6 months), FD' },
                        { goal: '✈️ Goa Vacation', amount: '₹80,000', where: 'Savings Account, Liquid MF' },
                        { goal: '💍 Wedding Shopping (this year)', amount: '₹2,00,000', where: 'Short-Term FD (9 months)' },
                        { goal: '📱 iPhone 16 Purchase', amount: '₹1,20,000', where: 'Savings + Flexi FD' },
                        { goal: '🏍️ Bike Down Payment', amount: '₹40,000', where: 'RD (₹7K × 6 months)' }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                          <div>
                            <strong className="text-gray-900">{item.goal}</strong>
                            <p className="text-xs text-gray-600 mt-1">💰 Target: {item.amount}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-blue-700 font-semibold">{item.where}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-r-lg">
                    <strong className="text-blue-900">💡 Investment Strategy:</strong>
                    <p className="text-sm text-gray-800 mt-2">
                      <strong>SAFETY & LIQUIDITY</strong> matter most. Keep money in: Savings Account (3-4%), 
                      FD (7-7.5%), Liquid Mutual Funds (6-7%), RD. <strong>Don't invest in stocks or equity funds</strong> 
                      for short-term goals—too risky!
                    </p>
                  </div>
                </div>
              )}

              {/* Medium-Term Goals */}
              {selectedTimeframe === 'medium' && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-5xl">🚗</div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-900">MEDIUM-TERM GOALS (मध्यम अवधि लक्ष्य)</h3>
                      <p className="text-green-700 font-semibold">Timeline: 1-5 years | Strategy: BALANCED (safety + growth)</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 mb-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">🎯 Typical Medium-Term Goals for Indians:</h4>
                    <div className="space-y-3">
                      {[
                        { goal: '🚗 Buy Car (₹10L)', time: '3 years', monthly: '₹25,000 SIP @ 12%', total: '₹11,50,000' },
                        { goal: '💍 Wedding Expenses', time: '2 years', monthly: '₹35,000 SIP @ 10%', total: '₹9,15,000' },
                        { goal: '🏠 House Down Payment', time: '5 years', monthly: '₹30,000 SIP @ 12%', total: '₹24,50,000' },
                        { goal: '👶 Child Education Fund', time: '4 years', monthly: '₹15,000 SIP @ 11%', total: '₹8,25,000' },
                        { goal: '📚 MBA / Masters Abroad', time: '3 years', monthly: '₹40,000 SIP @ 12%', total: '₹18,50,000' },
                        { goal: '💰 Start Business Capital', time: '2 years', monthly: '₹20,000 SIP @ 10%', total: '₹5,25,000' }
                      ].map((item, i) => (
                        <div key={i} className="bg-green-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <strong className="text-gray-900 text-lg">{item.goal}</strong>
                            <span className="bg-green-200 px-3 py-1 rounded-full text-xs font-bold text-green-900">{item.time}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="text-gray-700">
                              <strong>Monthly SIP:</strong> {item.monthly}
                            </div>
                            <div className="text-green-700 font-bold">
                              <strong>Total:</strong> {item.total}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded-r-lg">
                    <strong className="text-green-900">💡 Investment Strategy:</strong>
                    <p className="text-sm text-gray-800 mt-2">
                      <strong>BALANCED approach:</strong> 60-70% in Debt/Hybrid Mutual Funds (8-10% returns, moderate risk), 
                      30-40% in Equity Funds (12%+ potential, higher risk). Or use Balanced Advantage Funds that auto-adjust 
                      based on market conditions. <Link to="/calculators/sip-calculator" className="text-blue-600 hover:underline font-bold">Calculate SIP →</Link>
                    </p>
                  </div>
                </div>
              )}

              {/* Long-Term Goals */}
              {selectedTimeframe === 'long' && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-5xl">🏠</div>
                    <div>
                      <h3 className="text-2xl font-bold text-purple-900">LONG-TERM GOALS (दीर्घकालिक लक्ष्य)</h3>
                      <p className="text-purple-700 font-semibold">Timeline: 5+ years | Strategy: GROWTH focused (equity heavy)</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 mb-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">🎯 Typical Long-Term Goals for Indians:</h4>
                    <div className="space-y-3">
                      {[
                        { goal: '🏠 Buy ₹1 Crore Flat (Full)', time: '15 years', monthly: '₹35,000 SIP', total: '₹1,05,00,000', equity: '100%' },
                        { goal: '👨‍👧 Child Higher Education', time: '18 years', monthly: '₹10,000 SIP', total: '₹75,00,000', equity: '100%' },
                        { goal: '🏖️ Retirement Corpus (₹5 Cr)', time: '25 years', monthly: '₹25,000 SIP', total: '₹4,75,00,000', equity: '90%' },
                        { goal: '💼 Financial Independence', time: '20 years', monthly: '₹40,000 SIP', total: '₹4,00,00,000', equity: '100%' },
                        { goal: '🌍 World Tour Fund', time: '10 years', monthly: '₹15,000 SIP', total: '₹35,00,000', equity: '80%' },
                        { goal: '🏢 Second Income Property', time: '12 years', monthly: '₹50,000 SIP', total: '₹1,20,00,000', equity: '90%' }
                      ].map((item, i) => (
                        <div key={i} className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                          <div className="flex justify-between items-start mb-3">
                            <strong className="text-gray-900 text-lg">{item.goal}</strong>
                            <span className="bg-purple-200 px-3 py-1 rounded-full text-xs font-bold text-purple-900">{item.time}</span>
                          </div>
                          <div className="grid md:grid-cols-3 gap-3 text-sm">
                            <div className="text-gray-700">
                              <strong>Monthly SIP:</strong> {item.monthly}
                            </div>
                            <div className="text-purple-700 font-bold">
                              <strong>Target:</strong> {item.total}
                            </div>
                            <div className="text-green-700 font-bold">
                              <strong>Equity:</strong> {item.equity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-100 border-l-4 border-purple-600 p-4 rounded-r-lg">
                    <strong className="text-purple-900">💡 Investment Strategy:</strong>
                    <p className="text-sm text-gray-800 mt-2">
                      <strong>GROWTH MAXIMIZATION:</strong> 80-100% in Equity (Index Funds, Large Cap, Flexi Cap). 
                      Time is on your side—short-term volatility doesn't matter. Historical avg return: <strong>12-15% p.a.</strong> 
                      Power of compounding works magic over 10+ years! 
                      <Link to="/calculators/compound-interest" className="text-blue-600 hover:underline font-bold ml-1">See Compounding Power →</Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          {/* Interactive Goal Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8" />
              🧮 Interactive Goal Calculator (लक्ष्य कैलकुलेटर)
            </h2>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Target Amount (₹):</label>
                  <input
                    type="number"
                    value={goalAmount || ''}
                    onChange={(e) => setGoalAmount(Number(e.target.value))}
                    placeholder="e.g., 500000"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Time Period (months):</label>
                  <input
                    type="number"
                    value={monthsToSave || ''}
                    onChange={(e) => setMonthsToSave(Number(e.target.value))}
                    placeholder="e.g., 24"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-lg"
                  />
                </div>
              </div>
              
              <button
                onClick={handleCalculate}
                className="w-full mt-4 px-6 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
              >
                Calculate Monthly SIP Needed
              </button>

              {monthlySIP > 0 && (
                <div className="mt-6 bg-white rounded-lg p-5 text-gray-900">
                  <h4 className="font-bold text-xl mb-3">📊 Your Goal Plan:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span>Target Amount:</span>
                      <strong className="text-lg">₹{goalAmount.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Time Period:</span>
                      <strong className="text-lg">{monthsToSave} months ({Math.round(monthsToSave / 12 * 10) / 10} years)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Expected Returns:</span>
                      <strong className="text-lg">12% p.a.</strong>
                    </div>
                    <div className="flex justify-between py-3 bg-green-100 px-3 rounded-lg mt-3">
                      <span className="font-bold">Monthly SIP Required:</span>
                      <strong className="text-2xl text-green-700">₹{monthlySIP.toLocaleString()}</strong>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 italic">
                    💡 Start this SIP today using our <Link to="/calculators/sip-calculator" className="text-blue-600 hover:underline font-bold">SIP Calculator</Link>!
                  </p>
                </div>
              )}
            </div>

            <Link
              to="/calculators/goal-planner"
              className="block text-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Open Full Goal Planning Calculator →
            </Link>
          </motion.section>

          {/* Section 4: Real Examples - 3 Indians, 3 Different Goals */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-orange-600" />
              4. Real Examples: 3 Indians, 3 Goals (वास्तविक उदाहरण)
            </h2>

            <div className="space-y-6">
              {/* Example 1: Priya */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    P
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Priya Sharma, 28</h3>
                    <p className="text-gray-700">Software Engineer, Mumbai | Salary: ₹1,20,000/month</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 mb-4">
                  <strong className="text-blue-700 text-lg block mb-3">🎯 Goal: Europe Vacation (3 months)</strong>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Target Amount:</span>
                      <strong>₹3,50,000</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Current Savings:</span>
                      <strong>₹50,000</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Need to Save:</span>
                      <strong className="text-red-700">₹3,00,000</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Timeline:</span>
                      <strong>3 months</strong>
                    </div>
                    <div className="flex justify-between py-3 bg-blue-100 px-3 rounded-lg">
                      <span className="font-bold">Monthly Savings Needed:</span>
                      <strong className="text-xl text-blue-700">₹1,00,000</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <strong className="text-green-900">✅ Action Plan:</strong>
                  <ul className="mt-2 space-y-1 text-sm text-gray-800">
                    <li>• Use ₹50K salary this month + ₹50K from existing savings → ₹1L month 1</li>
                    <li>• Cut expenses from ₹60K → ₹20K (skip dining, shopping) → Save ₹1L month 2</li>
                    <li>• Use Diwali bonus ₹1L → Goal achieved in 3 months! Book flights! ✈️</li>
                  </ul>
                </div>
              </div>

              {/* Example 2: Rahul */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    R
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Rahul Mehta, 32</h3>
                    <p className="text-gray-700">Marketing Manager, Pune | Salary: ₹80,000/month</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 mb-4">
                  <strong className="text-green-700 text-lg block mb-3">🎯 Goal: Buy Car - Maruti Brezza (3 years)</strong>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Car Price (on-road):</span>
                      <strong>₹12,00,000</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Down Payment Needed (25%):</span>
                      <strong className="text-red-700">₹3,00,000</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Current Savings:</span>
                      <strong>₹0</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Timeline:</span>
                      <strong>36 months</strong>
                    </div>
                    <div className="flex justify-between py-3 bg-green-100 px-3 rounded-lg">
                      <span className="font-bold">Monthly SIP @ 10%:</span>
                      <strong className="text-xl text-green-700">₹7,500</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <strong className="text-green-900">✅ Action Plan:</strong>
                  <ul className="mt-2 space-y-1 text-sm text-gray-800">
                    <li>• Start ₹7,500 SIP in Hybrid Fund today → Auto-debit from salary account</li>
                    <li>• Cut Swiggy/Zomato from ₹6K → ₹2K (save ₹4K, cook at home)</li>
                    <li>• Skip annual ₹80K phone upgrade → Put in car fund instead</li>
                    <li>• After 36 months: ₹3,15,000 saved! Buy car, loan only ₹9L (low EMI!)</li>
                  </ul>
                </div>
              </div>

              {/* Example 3: Anjali */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    A
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Anjali Verma, 25</h3>
                    <p className="text-gray-700">Graphic Designer, Delhi | Salary: ₹45,000/month</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 mb-4">
                  <strong className="text-purple-700 text-lg block mb-3">🎯 Goal: Retirement at 60 (₹2 Crore corpus) - 35 years</strong>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Target Corpus:</span>
                      <strong>₹2,00,00,000</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Current Age:</span>
                      <strong>25 years</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Retirement Age:</span>
                      <strong>60 years (35 years left)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-700">Expected Returns:</span>
                      <strong>12% p.a. (equity)</strong>
                    </div>
                    <div className="flex justify-between py-3 bg-purple-100 px-3 rounded-lg">
                      <span className="font-bold text-purple-900">Monthly SIP Required:</span>
                      <strong className="text-xl text-purple-700">₹6,500</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <strong className="text-purple-900">✅ Action Plan:</strong>
                  <ul className="mt-2 space-y-1 text-sm text-gray-800">
                    <li>• Start ₹6,500 SIP in Nifty 50 Index Fund TODAY (₹45K salary, she can afford!)</li>
                    <li>• Increase SIP by 10% every year (₹6.5K → ₹7K → ₹8K... as salary grows)</li>
                    <li>• After 35 years @ 12%: <strong className="text-purple-700">₹2,15,00,000!</strong> (₹27L invested, ₹1.88Cr returns!)</li>
                    <li>• At 60, withdraw ₹80K/month (4% rule) = comfortable retirement! 🏖️</li>
                  </ul>
                  <p className="text-xs text-purple-800 mt-3 italic">
                    💡 The earlier you start, the less you need to save monthly due to <strong>compounding magic</strong>!
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 5: Prioritizing Multiple Goals */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              5. Prioritizing Multiple Goals (एकाधिक लक्ष्यों को प्राथमिकता देना)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Most Indians have <strong>5-10 competing financial goals</strong> at any time. Limited income. How to prioritize?
              </p>

              <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-bold text-orange-900 mb-4">🏆 The Priority Pyramid (Indian Context):</h4>
                
                <div className="space-y-3">
                  {/* Priority 1 */}
                  <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">1</span>
                      <strong className="text-red-900 text-lg">CRITICAL (DO FIRST!):</strong>
                    </div>
                    <ul className="ml-10 space-y-1 text-sm text-gray-800">
                      <li>✅ <strong>Emergency Fund:</strong> 3-6 months expenses (₹1.5L - ₹3L)</li>
                      <li>✅ <strong>Health Insurance:</strong> ₹5L+ family floater</li>
                      <li>✅ <strong>Term Insurance:</strong> ₹1 Cr cover (if you have dependents)</li>
                      <li>✅ <strong>High-interest Debt:</strong> Clear credit card (18%) & personal loans (14%+)</li>
                    </ul>
                  </div>

                  {/* Priority 2 */}
                  <div className="bg-yellow-100 border-l-4 border-yellow-600 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold">2</span>
                      <strong className="text-yellow-900 text-lg">HIGH PRIORITY:</strong>
                    </div>
                    <ul className="ml-10 space-y-1 text-sm text-gray-800">
                      <li>✅ <strong>Retirement Savings:</strong> Start SIP early (even ₹5K/month!)</li>
                      <li>✅ <strong>Child Education Fund:</strong> If you have kids, start now</li>
                      <li>✅ <strong>Tax-Saving Investments:</strong> 80C (₹1.5L/year in PPF/ELSS)</li>
                    </ul>
                  </div>

                  {/* Priority 3 */}
                  <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">3</span>
                      <strong className="text-green-900 text-lg">MEDIUM PRIORITY:</strong>
                    </div>
                    <ul className="ml-10 space-y-1 text-sm text-gray-800">
                      <li>✅ <strong>House Down Payment:</strong> 3-5 year plan</li>
                      <li>✅ <strong>Car Purchase:</strong> 2-3 year plan</li>
                      <li>✅ <strong>Marriage / Wedding Fund:</strong> 1-2 year plan</li>
                      <li>✅ <strong>Skill Upgradation:</strong> Certification courses, MBA</li>
                    </ul>
                  </div>

                  {/* Priority 4 */}
                  <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">4</span>
                      <strong className="text-blue-900 text-lg">NICE-TO-HAVE (Do AFTER above):</strong>
                    </div>
                    <ul className="ml-10 space-y-1 text-sm text-gray-800">
                      <li>• Vacation / International Travel</li>
                      <li>• Gadget Upgrades (new iPhone, MacBook)</li>
                      <li>• Hobby Investments (camera, bike, gaming setup)</li>
                      <li>• Luxury Purchases (designer clothes, watches)</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mt-4 italic">
                  <strong>Rule:</strong> Never skip Priority 1 for Priority 4. Emergency fund BEFORE Europe trip. Insurance BEFORE iPhone!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 6: Common Goal-Setting Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-600" />
              6. Common Goal-Setting Mistakes (आम गलतियां)
            </h2>

            <div className="space-y-4">
              {[
                { 
                  mistake: 'Too Many Goals at Once', 
                  example: 'Trying to save for car (₹5L), house (₹25L), vacation (₹2L), and retirement (₹1Cr) ALL at the same time on ₹50K salary',
                  fix: 'Focus on 2-3 goals max. Complete emergency fund FIRST, then add others sequentially.'
                },
                { 
                  mistake: 'Unrealistic Timelines', 
                  example: 'Save ₹50L for house in 2 years on ₹60K salary (need ₹2L/month savings! Impossible!)',
                  fix: 'Use SIP calculator. Be realistic. ₹50L needs 5-7 years at ₹50-60K/month SIP.'
                },
                { 
                  mistake: 'No Written Plan', 
                  example: 'Goal in mind: "I\'ll buy a car someday." No amount, no date, no action. Result: Never happens.',
                  fix: 'Write it down! "₹5L down payment by Dec 2026. ₹12K SIP starting this month." Stick on wall!'
                },
                { 
                  mistake: 'Ignoring Inflation', 
                  example: 'Today: iPhone costs ₹1L. In 2 years: will cost ₹1.15L (@ 7% inflation). Saved only ₹1L. Short by ₹15K!',
                  fix: 'Add 5-7% buffer for inflation. Target ₹1.15L, not ₹1L. Use Inflation Calculator.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-5 border-l-4 border-red-500">
                  <div className="mb-3">
                    <strong className="text-red-700 text-lg">❌ Mistake {i + 1}: {item.mistake}</strong>
                  </div>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-sm text-gray-700 italic">
                      <strong>Example:</strong> {item.example}
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4">
                    <p className="text-sm text-green-900">
                      <strong className="text-green-700">✅ Fix:</strong> {item.fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Interactive Exercise */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-7 h-7" />
              📝 Your Turn: Create Your First SMART Goal (अपना पहला लक्ष्य बनाएं)
            </h2>

            <div className="bg-white rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Fill this template for ANY financial goal you have:
              </p>
              <div className="bg-gray-50 rounded-lg p-5 font-mono text-sm space-y-2">
                <p><strong>SPECIFIC:</strong> I will save ₹__________ for __________________</p>
                <p><strong>MEASURABLE:</strong> I will track progress monthly using __________________</p>
                <p><strong>ACHIEVABLE:</strong> I can save ₹__________ per month from my ₹__________ salary</p>
                <p><strong>RELEVANT:</strong> This matters because __________________</p>
                <p><strong>TIME-BOUND:</strong> I will achieve this by __________ (date)</p>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">
                💡 <strong>Example:</strong> "I will save <strong>₹2,00,000</strong> for <strong>MacBook Pro</strong> 
                by <strong>June 2026</strong> through <strong>₹8,000 monthly SIP</strong> in liquid fund. 
                I can afford this from my ₹60K salary after ₹40K expenses. This matters because I'm a designer and need a powerful laptop."
              </p>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Key Takeaways (मुख्य बातें)
            </h2>
            <div className="space-y-4">
              {[
                'Goals without plans are just wishes. Use SMART framework: Specific, Measurable, Achievable, Relevant, Time-bound',
                'Short-term (< 1 year): Safety first. Use FD, RD, Savings Account. Don\'t risk in stocks.',
                'Medium-term (1-5 years): Balanced approach. 60% debt, 40% equity. Hybrid/Balanced Funds work well.',
                'Long-term (5+ years): Growth focus. 80-100% equity. Index Funds, Large Cap funds. Volatility is okay.',
                'Priority order: Emergency fund → Insurance → Debt clearance → Retirement → Big purchases → Luxuries',
                'Write goals down. Track monthly. Adjust if needed. Don\'t abandon mid-way.',
                'Use SIP Calculator to know exact monthly savings needed for any goal. Then commit!'
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="text-2xl font-bold text-white/80">{i + 1}.</span>
                  <p className="text-white text-lg">{takeaway}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Related Calculators */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🧮 Practice with Free Calculators (मुफ्त कैलकुलेटर)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Goal Planner', link: '/calculators/goal-planner', icon: '🎯', desc: 'Plan any financial goal' },
                { name: 'SIP Calculator', link: '/calculators/sip-calculator', icon: '📈', desc: 'Calculate monthly SIP' },
                { name: 'Retirement Calculator', link: '/calculators/retirement-calculator', icon: '🏖️', desc: 'Plan your retirement' },
                { name: 'Emergency Fund', link: '/calculators/emergency-fund', icon: '🏦', desc: 'How much to save?' },
                { name: 'Inflation Calculator', link: '/calculators/inflation-calculator', icon: '📉', desc: 'Future value of money' },
                { name: 'Compound Interest', link: '/calculators/compound-interest', icon: '💰', desc: 'See compounding magic' }
              ].map((calc, i) => (
                <Link
                  key={i}
                  to={calc.link}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-2xl transition-all group"
                >
                  <div className="text-4xl mb-3">{calc.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {calc.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{calc.desc}</p>
                  <div className="flex items-center text-green-600 font-semibold text-sm">
                    Open Calculator
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Next Steps */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">
                🎓 Ready for the Next Lesson?
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Now that you can set SMART goals, let's learn how to create a budget to actually achieve them!
              </p>
              <Link
                to="/learn/money-management/budgeting-how-to-track-income-expenses-india"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                Next: Budgeting Guide
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.section>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600">
            <p>
              <strong>Disclaimer:</strong> This content is for educational purposes only. Investment examples assume average returns 
              and may vary. Past performance doesn't guarantee future results. Consult a certified financial planner for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingFinancialGoals;

