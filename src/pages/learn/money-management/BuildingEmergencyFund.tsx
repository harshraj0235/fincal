import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowRight, ArrowLeft, Shield, AlertTriangle, TrendingUp, 
  CheckCircle, XCircle, Lightbulb, DollarSign, Heart, Home, Briefcase,
  Clock, Target, Award, Zap, Activity, Calendar, PiggyBank, CreditCard,
  Smartphone, Calculator
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

/**
 * LESSON 4: Building an Emergency Fund - The Financial Safety Net
 * Category: Money Management & Budgeting
 * Duration: 50 minutes
 * Difficulty: Beginner
 * 
 * Learning Objectives:
 * 1. Understand why an emergency fund is THE most critical financial goal
 * 2. Learn how much to save (3, 6, or 12 months?)
 * 3. Discover where to keep emergency funds for instant access
 * 4. Master strategies to build fund from scratch
 * 5. Know when to use (and NOT use) emergency money
 */

const BuildingEmergencyFund: React.FC = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(30000);
  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<number>(0);
  const [monthlySavings, setMonthlySavings] = useState<number>(5000);
  const [calculated, setCalculated] = useState(false);

  const targetAmount = monthlyExpenses * targetMonths;
  const remaining = Math.max(0, targetAmount - currentSavings);
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : 0;

  const calculateFund = () => {
    setCalculated(true);
  };

  return (
    <>
      <SEOHelmet
        title="Emergency Fund Guide: How Much to Save (6-12 Months) India | MoneyCal Learn"
        description="Build your financial safety net. Learn emergency fund basics in Hindi & English: how much to save, where to keep it, when to use. Real Indian salary examples."
        keywords="emergency fund India, financial safety net, 6 months expenses, emergency savings, liquid fund, emergency fund calculator, आपातकालीन फंड, emergency fund Hindi"
        url="/learn/money-management/building-emergency-fund-india-6-12-months"
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/money-management" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Money Management</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 4 of 8</span>
                <Link 
                  to="/learn/money-management/cash-flow-net-worth-tracking-india"
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
          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                  Lesson 4 • 50 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Emergency Fund: Your Financial Safety Net
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  आपातकालीन फंड बनाना - सबसे ज़रूरी वित्तीय लक्ष्य
                </p>
              </div>
            </div>

            {/* Critical Alert */}
            <div className="bg-red-100 border-l-4 border-red-600 rounded-r-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    🚨 Most Critical Financial Priority (सबसे महत्वपूर्ण)
                  </h3>
                  <p className="text-red-800">
                    Before investing in stocks, buying insurance, or chasing returns—build this FIRST. 
                    An emergency fund is the difference between a financial setback and complete financial ruin.
                  </p>
                  <p className="text-red-800 mt-2 font-semibold">
                    <strong>Hindi:</strong> शेयर बाजार, म्यूचुअल फंड, या बीमा से पहले—पहले यह बनाएं! 
                    आपातकालीन फंड आपको वित्तीय बर्बादी से बचाता है।
                  </p>
                </div>
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
                  'Understand why emergency fund is THE #1 financial priority',
                  'Learn the 3-6-12 month rule: which is right for you?',
                  'Discover best places to keep emergency money (instant access + safety)',
                  'Master step-by-step strategies to build from ₹0 to full fund',
                  'Know real emergencies vs fake emergencies (when to use/not use)'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Section 1: What is an Emergency Fund? The Brutal Reality */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-600" />
              1. What is an Emergency Fund? The Brutal Reality
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                An emergency fund is <strong>liquid cash set aside ONLY for unexpected financial shocks</strong>—not for goals, 
                not for wants, not for "opportunities." It's your financial airbag that prevents a crisis from becoming a catastrophe.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">📊 The Statistics That Should Scare You:</h4>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-3">
                    <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">1</span>
                    <span><strong>69% of Indians</strong> have less than ₹50,000 in savings (HSBC Survey, 2024). One medical emergency = bankruptcy.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">2</span>
                    <span><strong>42% of Indian families</strong> had to borrow money at high interest for emergencies in the past year (RBI, 2024).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">3</span>
                    <span><strong>Average medical emergency cost</strong> in India: ₹1.5 - ₹3 lakhs (without insurance). Most people don't have it.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">4</span>
                    <span><strong>Job layoffs</strong> take 3-6 months to recover in India. Without savings, families collapse.</span>
                  </li>
                </ul>
              </div>

              {/* Real Emergency vs "I Want" */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    ✅ REAL Emergencies (असली आपात स्थिति)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      '🏥 Medical emergency (surgery, hospitalization, accident)',
                      '💼 Job loss (layoff, company shutdown)',
                      '🚗 Critical vehicle breakdown (can\'t reach work)',
                      '🏠 Home emergency (water leak, roof damage, fire)',
                      '👨‍👩‍👦 Family crisis (death, serious illness, urgent travel)',
                      '💳 Identity theft or fraud (bank account compromised)',
                      '🔧 Essential appliance breakdown (water pump, AC in summer)'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-red-700 mt-4 italic">
                    <strong>Rule:</strong> If not dealing with it TODAY causes severe harm or loss—it's an emergency.
                  </p>
                </div>

                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-gray-600" />
                    ❌ NOT Emergencies (आपात स्थिति नहीं)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      '📱 New iPhone launch (want, not need)',
                      '✈️ Goa trip with friends (vacation)',
                      '🎮 PS5 on sale (entertainment)',
                      '👗 Wedding shopping (planned event)',
                      '🚗 Want to upgrade car (lifestyle)',
                      '📈 "Great stock opportunity" (investment)',
                      '🎁 Festival shopping (predictable expense)',
                      '💍 Expensive gift for partner (want)'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-600 mt-4 italic">
                    <strong>Rule:</strong> If you can wait, plan, or skip it—NOT an emergency. Use "wants" budget instead!
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: How Much to Save? The 3-6-12 Month Rule */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-purple-600" />
              2. How Much to Save? The 3-6-12 Month Rule (कितना बचाएं?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The standard advice: Save <strong>6 months of expenses</strong>. But your personal situation determines the exact amount.
              </p>

              {/* Interactive Calculator */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 mb-8 text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-7 h-7" />
                  🧮 Emergency Fund Calculator
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <label className="block text-sm font-bold mb-2">Monthly Expenses (₹):</label>
                    <input
                      type="number"
                      value={monthlyExpenses || ''}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                      placeholder="e.g., 30000"
                    />
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <label className="block text-sm font-bold mb-2">Target Months:</label>
                    <select
                      value={targetMonths}
                      onChange={(e) => setTargetMonths(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                    >
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months (Recommended)</option>
                      <option value={9}>9 Months</option>
                      <option value={12}>12 Months</option>
                    </select>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <label className="block text-sm font-bold mb-2">Current Savings (₹):</label>
                    <input
                      type="number"
                      value={currentSavings || ''}
                      onChange={(e) => setCurrentSavings(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                      placeholder="e.g., 50000"
                    />
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <label className="block text-sm font-bold mb-2">Monthly Savings (₹):</label>
                    <input
                      type="number"
                      value={monthlySavings || ''}
                      onChange={(e) => setMonthlySavings(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                      placeholder="e.g., 5000"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateFund}
                  className="w-full px-6 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all mb-4"
                >
                  Calculate My Emergency Fund
                </button>

                {calculated && (
                  <div className="bg-white rounded-lg p-6 text-gray-900">
                    <h4 className="font-bold text-xl mb-4">Your Emergency Fund Plan:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 bg-purple-100 px-4 rounded-lg">
                        <strong className="text-purple-900">🎯 Target Amount:</strong>
                        <strong className="text-2xl text-purple-700">₹{targetAmount.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-blue-100 px-4 rounded-lg">
                        <strong className="text-blue-900">💰 Current Savings:</strong>
                        <strong className="text-2xl text-blue-700">₹{currentSavings.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-orange-100 px-4 rounded-lg">
                        <strong className="text-orange-900">🚀 Still Need:</strong>
                        <strong className="text-2xl text-orange-700">₹{remaining.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-green-100 px-4 rounded-lg">
                        <strong className="text-green-900">⏱️ Months to Goal:</strong>
                        <strong className="text-2xl text-green-700">{monthsToGoal} months</strong>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 italic">
                      💡 At ₹{monthlySavings.toLocaleString()}/month, you'll have full emergency fund in {monthsToGoal} months!
                    </p>
                  </div>
                )}
              </div>

              {/* Decision Matrix */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">🎯 Which Target is Right for YOU?</h4>
                
                <div className="space-y-4">
                  {/* 3 Months */}
                  <div className="bg-white rounded-lg p-5 border-2 border-green-300">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-lg font-bold text-green-900">🟢 3 MONTHS = Minimum Safety Net</h5>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>Who should choose this:</strong>
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4 mb-3">
                      <li>• Single, no dependents</li>
                      <li>• Stable government job or MNC with low layoff risk</li>
                      <li>• Living with parents (low/no rent)</li>
                      <li>• Have health insurance + strong family support</li>
                      <li>• Can quickly find alternate income</li>
                    </ul>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <strong className="text-green-800">Example:</strong>
                      <div className="text-sm text-green-900 mt-2">
                        Rohan, 25, works at TCS (stable job), lives with parents in Pune, no EMIs. 
                        Monthly expenses: ₹15K. <strong>Emergency fund: ₹45,000</strong>.
                      </div>
                    </div>
                  </div>

                  {/* 6 Months */}
                  <div className="bg-white rounded-lg p-5 border-2 border-blue-400">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-lg font-bold text-blue-900">🔵 6 MONTHS = Standard Safety Net (RECOMMENDED)</h5>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>Who should choose this:</strong>
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4 mb-3">
                      <li>• Average job stability (private sector)</li>
                      <li>• Married with 1-2 dependents</li>
                      <li>• Paying rent or have 1 EMI</li>
                      <li>• Basic health insurance</li>
                      <li>• Most Indians should target THIS</li>
                    </ul>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <strong className="text-blue-800">Example:</strong>
                      <div className="text-sm text-blue-900 mt-2">
                        Priya, 32, software engineer in Bangalore, married, one kid, paying ₹18K rent + ₹15K home loan EMI. 
                        Total monthly expenses: ₹50K. <strong>Emergency fund: ₹3,00,000</strong>.
                      </div>
                    </div>
                  </div>

                  {/* 12 Months */}
                  <div className="bg-white rounded-lg p-5 border-2 border-red-400">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-lg font-bold text-red-900">🔴 12 MONTHS = Maximum Safety (High Risk Jobs)</h5>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>Who should choose this:</strong>
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4 mb-3">
                      <li>• Freelancer, consultant, contractor (irregular income)</li>
                      <li>• Startup employee (high layoff risk)</li>
                      <li>• Single income family with 3+ dependents</li>
                      <li>• Chronic health issues or aging parents</li>
                      <li>• Business owner (income fluctuates)</li>
                    </ul>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <strong className="text-red-800">Example:</strong>
                      <div className="text-sm text-red-900 mt-2">
                        Sanjay, 40, freelance consultant, sole earner, 2 kids + parents to support, no health insurance yet. 
                        Monthly expenses: ₹70K. <strong>Emergency fund: ₹8,40,000</strong>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <strong className="text-yellow-900">💡 Pro Tip:</strong>
                <p className="text-sm text-gray-700 mt-2">
                  If unsure, start with <strong>3 months</strong> (achievable fast), then work towards <strong>6 months</strong> (standard), 
                  and eventually <strong>9-12 months</strong> if high risk. Don't let perfection paralyze you—₹50K emergency fund is 
                  infinitely better than ₹0!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Where to Keep Emergency Fund */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <PiggyBank className="w-8 h-8 text-blue-600" />
              3. Where to Keep Emergency Fund? (कहां रखें?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Critical Rule:</strong> Emergency money needs <span className="bg-yellow-200 px-2 py-1 rounded font-bold">instant access + safety + decent returns</span>. 
                NOT locked in stocks, FDs, or real estate!
              </p>

              <div className="space-y-6">
                {/* Option 1: Savings Account (50%) */}
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-blue-900">💳 Savings Account (Keep 50% Here)</h4>
                      <p className="text-blue-700 font-semibold">Best for: Immediate access (ATM, UPI, debit card)</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-5">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <strong className="text-blue-700 block mb-2">✅ Pros:</strong>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Instant access 24/7 (ATM, online)</li>
                          <li>• Zero lock-in or penalty</li>
                          <li>• Safe (DICGC insured up to ₹5L per bank)</li>
                          <li>• Can link to UPI for emergencies</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-red-700 block mb-2">❌ Cons:</strong>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Low interest (3-4% p.a. only)</li>
                          <li>• Loses to inflation (real return negative)</li>
                          <li>• Temptation to spend easily</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg">
                      <strong className="text-blue-900">📌 Recommended Banks:</strong>
                      <div className="text-sm text-blue-800 mt-2 grid grid-cols-2 gap-2">
                        <div>• HDFC Bank (4% interest)</div>
                        <div>• ICICI Bank (3.5% interest)</div>
                        <div>• SBI (2.7% interest)</div>
                        <div>• Kotak Mahindra (3.5% interest)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Option 2: Liquid Mutual Fund (50%) */}
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-green-900">📈 Liquid Mutual Fund (Keep 50% Here) ⭐ BEST!</h4>
                      <p className="text-green-700 font-semibold">Best for: Better returns + quick access (1-2 days)</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-5">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <strong className="text-green-700 block mb-2">✅ Pros:</strong>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Higher returns (6-7% p.a.)</li>
                          <li>• Money in bank in 1-2 working days</li>
                          <li>• Low risk (invests in govt securities)</li>
                          <li>• No exit load, no lock-in</li>
                          <li>• Can withdraw any amount anytime</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-red-700 block mb-2">❌ Cons:</strong>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Not instant (takes 1-2 days to redeem)</li>
                          <li>• Slight market risk (very minimal)</li>
                          <li>• Requires mutual fund account</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                      <strong className="text-green-900">📌 Top Liquid Funds (2024):</strong>
                      <div className="text-sm text-green-800 mt-2 space-y-1">
                        <div>• HDFC Liquid Fund (₹53,000 Cr AUM, 6.8% returns)</div>
                        <div>• ICICI Pru Liquid Fund (₹43,000 Cr AUM, 6.7% returns)</div>
                        <div>• Axis Liquid Fund (₹28,000 Cr AUM, 6.9% returns)</div>
                        <div>• SBI Liquid Fund (₹40,000 Cr AUM, 6.5% returns)</div>
                      </div>
                      <p className="text-xs text-green-700 mt-3 italic">
                        <strong>How to invest:</strong> Use Groww, Zerodha Coin, Paytm Money, or ET Money app. 
                        Enable instant redemption (get ₹50K instantly, rest in 1 day).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Avoid These */}
                <div className="bg-red-50 rounded-xl p-6 border-2 border-red-300">
                  <h4 className="text-xl font-bold text-red-900 mb-4">🚫 AVOID These for Emergency Fund:</h4>
                  <div className="space-y-3">
                    {[
                      { 
                        option: '❌ Fixed Deposits (FD)', 
                        reason: 'Locked for 1-5 years. Breaking early = penalty (1-2% loss). Takes 2-3 days to break. NOT instant access!' 
                      },
                      { 
                        option: '❌ Stocks / Equity Mutual Funds', 
                        reason: "High volatility. When emergency hits (recession/market crash), stocks may be down 30-50%. You'll sell at loss!\" 
                      },
                      { 
                        option: '❌ PPF / EPF', 
                        reason: 'Locked till retirement. Withdrawal rules are complex. EPF takes 1-2 months to process. NOT accessible!' 
                      },
                      { 
                        option: '❌ Real Estate', 
                        reason: \"Can't sell property in 1 day. Takes 3-6 months minimum. Completely illiquid!" 
                      },
                      { 
                        option: '❌ Gold / Gold Bonds', 
                        reason: 'Sovereign Gold Bonds locked 5-8 years. Physical gold selling = hassle + low price. Not ideal!' 
                      },
                      { 
                        option: '❌ Credit Card (as emergency fund)', 
                        reason: '36-42% interest if not paid in 50 days! Debt trap. Emergency fund should be YOUR money, not borrowed!' 
                      }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                        <strong className="text-red-700 block mb-1">{item.option}</strong>
                        <p className="text-sm text-gray-700">{item.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Split */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6">
                  <h4 className="text-2xl font-bold mb-4">💎 Ideal Emergency Fund Split (सबसे अच्छा विकल्प):</h4>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5">
                    <div className="space-y-3 text-lg">
                      <div className="flex justify-between items-center py-3 bg-white/20 px-4 rounded-lg">
                        <span>💳 <strong>50%</strong> in Savings Account</span>
                        <span className="font-bold">Instant Access</span>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-white/20 px-4 rounded-lg">
                        <span>📈 <strong>50%</strong> in Liquid Fund</span>
                        <span className="font-bold">Better Returns</span>
                      </div>
                    </div>
                    <p className="text-sm mt-4 opacity-90">
                      <strong>Example:</strong> ₹3L emergency fund → ₹1.5L in savings (instant), ₹1.5L in liquid fund (1-2 day access). 
                      This gives you instant money for day-1 emergencies + better returns on rest!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 4: How to Build From Scratch */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-600" />
              4. How to Build Emergency Fund from ₹0 (शून्य से शुरू)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Most people feel overwhelmed: "I need ₹3 lakhs? Impossible!\" But you don't build it overnight. 
                Here's the proven step-by-step strategy used by thousands of Indians.
              </p>

              <div className=\"bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-6 border-2 border-orange-300">
                <h4 className="text-xl font-bold text-orange-900 mb-5">🚀 5-Step Emergency Fund Building System:</h4>
                
                <div className="space-y-5">
                  {/* Step 1 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">1</div>
                      <strong className="text-orange-900 text-lg">Start with Mini-Goal: Save ₹10,000 FAST (1-2 months)</strong>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Don't aim for ₹3L immediately. First goal: <strong>₹10,000</strong>. This covers small emergencies 
                      (₹5K medical bill, ₹3K urgent repair). Builds confidence!
                    </p>
                    <div className="bg-orange-50 p-3 rounded-lg text-sm">
                      <strong className="text-orange-800">How to save ₹10K in 2 months:</strong>
                      <ul className="mt-2 space-y-1 ml-4 text-gray-700">
                        <li>• Cut Swiggy/Zomato for 2 months: Save ₹4,000</li>
                        <li>• Skip 1 weekend outing: Save ₹2,000</li>
                        <li>• Use existing budget "wants" money: ₹4,000</li>
                        <li><strong>Total: ₹10,000 in 60 days!</strong></li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">2</div>
                      <strong className="text-blue-900 text-lg">Build to ₹50,000 (Covers Most Small Crises)</strong>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Once you have ₹10K, aim for <strong>₹50,000</strong>. This covers: minor hospitalization (₹30K), 
                      urgent travel (₹15K), appliance replacement (₹20K).
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg text-sm">
                      <strong className="text-blue-800">Strategy: Pay Yourself First (Auto-Save)</strong>
                      <ul className="mt-2 space-y-1 ml-4 text-gray-700">
                        <li>• Set up auto-transfer on salary day: ₹5,000/month → separate savings account</li>
                        <li>• Treat it like EMI (non-negotiable)</li>
                        <li>• In 8 months: ₹10K (existing) + ₹40K (new) = <strong>₹50K emergency fund!</strong></li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-green-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">3</div>
                      <strong className="text-green-900 text-lg">Reach 3 Months Expenses (Minimum Safety Net)</strong>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Now go for <strong>3 months of expenses</strong>. If monthly expense = ₹30K, target = ₹90K.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg text-sm">
                      <strong className="text-green-800">Accelerate with Windfalls:</strong>
                      <ul className="mt-2 space-y-1 ml-4 text-gray-700">
                        <li>• Got ₹50K bonus? Put 50% (₹25K) in emergency fund</li>
                        <li>• Received ₹20K festival gift? Add it</li>
                        <li>• Tax refund ₹15K? Emergency fund!</li>
                        <li>• Continue ₹5K/month auto-save</li>
                        <li><strong>Reach ₹90K in 12-15 months total!</strong></li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-purple-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">4</div>
                      <strong className="text-purple-900 text-lg">Build to 6 Months (Standard Goal for Most)</strong>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Target: <strong>6 months expenses</strong>. For ₹30K/month = ₹1,80,000.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg text-sm">
                      <strong className="text-purple-800">Move Half to Liquid Fund:</strong>
                      <ul className="mt-2 space-y-1 ml-4 text-gray-700">
                        <li>• Keep ₹90K in savings account (instant access)</li>
                        <li>• Move ₹90K to liquid mutual fund (better returns)</li>
                        <li>• Continue saving ₹5-7K/month</li>
                        <li><strong>Reach ₹1.8L in 24-30 months from start!</strong></li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-red-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">5</div>
                      <strong className="text-red-900 text-lg">Optional: Go for 9-12 Months (Maximum Safety)</strong>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      If high-risk job or sole earner: Target <strong>12 months</strong>. For ₹30K/month = ₹3,60,000.
                    </p>
                    <div className="bg-red-50 p-3 rounded-lg text-sm">
                      <strong className="text-red-800">Once 6-month fund is complete:</strong>
                      <ul className="mt-2 space-y-1 ml-4 text-gray-700">
                        <li>• Reduce monthly emergency saving to ₹3K</li>
                        <li>• Allocate rest (₹4K) to investments (SIP, stocks)</li>
                        <li>• Slowly build to 12 months over next 2-3 years</li>
                        <li><strong>Total: ₹3.6L emergency fund (ultimate safety!)</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Win Strategies */}
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
                <h4 className="text-xl font-bold text-yellow-900 mb-4">⚡ Quick Win Strategies to Build Fund FASTER:</h4>
                <div className="space-y-2 text-sm text-gray-800">
                  {[
                    '💰 Sell unused items (old phone, laptop, bike): Add ₹10-30K instantly',
                    '💼 Take freelance gigs on weekends: Earn ₹5-10K extra/month',
                    '🚗 Use public transport for 3 months: Save ₹3-5K/month',
                    '🏠 If paying high rent, get a roommate: Save ₹5-8K/month',
                    '📱 Cancel unused subscriptions (Netflix, gym, etc): Save ₹2K/month',
                    '🍕 Cook at home for 2 months: Save ₹8-12K',
                    '🎁 Ask for cash gifts instead of material gifts (birthdays, festivals)',
                    '📈 Use work bonuses, tax refunds, appraisals for emergency fund FIRST'
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 py-2">
                      <CheckCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 5: When to Use (and NOT Use) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-green-600" />
              5. When to Use Emergency Fund? Rules to Follow (कब इस्तेमाल करें?)
            </h2>

            <div className="prose max-w-none">
              <div className="bg-green-50 rounded-xl p-6 mb-6 border-2 border-green-300">
                <h4 className="text-xl font-bold text-green-900 mb-4">✅ USE Emergency Fund For:</h4>
                <div className="space-y-3">
                  {[
                    { 
                      emergency: '🏥 Medical Emergency', 
                      example: 'Dad hospitalized with heart attack. Surgery costs ₹2L. Health insurance deductible ₹50K → Use emergency fund.',
                      action: 'Use immediately. Replenish over next 6 months.' 
                    },
                    { 
                      emergency: '💼 Job Loss', 
                      example: "Company laid off 30% staff. You're jobless. Monthly expenses ₹40K → Use emergency fund for 3-6 months while job hunting.\",
                      action: 'Use monthly as needed. Cut expenses to stretch fund longer.' 
                    },
                    { 
                      emergency: '🚗 Critical Vehicle Breakdown', 
                      example: \"Bike accident. Can't reach office without bike. Repair ₹25K → Use emergency fund (essential for income).",
                      action: 'Use immediately. Replenish next month.' 
                    },
                    { 
                      emergency: '🏠 Home Emergency', 
                      example: "Monsoon roof leak. Water damaging electronics. Repair ₹30K → Use emergency fund (can't delay).\",
                      action: 'Use immediately. Claim insurance if applicable.' 
                    },
                    { 
                      emergency: '👨‍👩‍👦 Family Crisis', 
                      example: 'Grandfather passed away in village. Need ₹40K for urgent travel + rituals → Use emergency fund.',
                      action: 'Use immediately. Family comes first.' 
                    }
                  ].map((item, i) => (
                    <div key={i} className=\"bg-white p-4 rounded-lg border-l-4 border-green-500">
                      <strong className="text-green-700 text-lg block mb-2">{item.emergency}</strong>
                      <p className="text-sm text-gray-700 mb-2 bg-gray-50 p-2 rounded italic">
                        <strong>Example:</strong> {item.example}
                      </p>
                      <p className="text-sm text-green-800 bg-green-100 p-2 rounded">
                        <strong>✅ Action:</strong> {item.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-6 mb-6 border-2 border-red-300">
                <h4 className="text-xl font-bold text-red-900 mb-4">❌ DO NOT Use Emergency Fund For:</h4>
                <div className="space-y-3">
                  {[
                    { 
                      temptation: '📱 Gadget Upgrade', 
                      example: 'iPhone 15 launched. Your iPhone 12 works fine. Want to upgrade (₹80K).',
                      why: 'This is a WANT, not emergency. Save separately or use credit card reward points.' 
                    },
                    { 
                      temptation: '✈️ Vacation / Travel', 
                      example: "Friends planning Goa trip. Costs ₹25K. You don't have money in \"wants\" budget.",
                      why: 'Vacation is planned, not emergency. Either skip or save for next time.' 
                    },
                    { 
                      temptation: '📈 Stock Market "Opportunity"', 
                      example: 'Market crashed 10%. Friend says "buy the dip!" You want to use emergency fund to invest.',
                      why: 'NEVER invest emergency money. What if emergency hits + market stays down for years?' 
                    },
                    { 
                      temptation: '💍 Wedding / Festival Shopping', 
                      example: "Sister's wedding in 3 months. Need ₹1L for gifts/clothes. Haven't saved.\",
                      why: 'Weddings are predictable, not emergencies. Should have budgeted months ago.' 
                    },
                    { 
                      temptation: '🏠 Home Renovation', 
                      example: 'Want to renovate living room (₹2L). House is livable, just want upgrade.',
                      why: 'Renovation is lifestyle improvement, not emergency. Save separately.' 
                    },
                    { 
                      temptation: '🚗 Car Down Payment', 
                      example: 'Car on discount. Need ₹1.5L down payment. Thinking of using emergency fund.',
                      why: 'Car purchase is planned expense. Using emergency fund = leaving yourself exposed!' 
                    }
                  ].map((item, i) => (
                    <div key={i} className=\"bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <strong className="text-red-700 text-lg block mb-2">{item.temptation}</strong>
                      <p className="text-sm text-gray-700 mb-2 bg-gray-50 p-2 rounded italic">
                        <strong>Temptation:</strong> {item.example}
                      </p>
                      <p className="text-sm text-red-800 bg-red-100 p-2 rounded">
                        <strong>❌ Why NOT:</strong> {item.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-4">🎯 The 24-Hour Rule:</h4>
                <p className="text-gray-800 mb-3">
                  Before touching emergency fund, ask yourself:
                </p>
                <div className="bg-white p-5 rounded-lg">
                  <ol className="space-y-2 text-gray-800">
                    <li><strong>1. Is it truly unexpected?</strong> (Not predictable like festivals, weddings)</li>
                    <li><strong>2. Can I delay it 1 month?</strong> (If yes, it's not urgent)</li>
                    <li><strong>3. Is there an alternative?</strong> (Borrow from friend, use credit card 0% EMI, claim insurance)</li>
                    <li><strong>4. What happens if I don't act today?</strong> (Severe harm/loss = emergency. Inconvenience = not emergency)</li>
                  </ol>
                  <p className="text-sm text-blue-800 mt-4 italic bg-blue-100 p-3 rounded">
                    <strong>Rule:</strong> If answer to #4 is "nothing terrible," it's NOT an emergency. Don't touch the fund!
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 6: Replenishing After Use */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
              6. Replenishing Emergency Fund After Use (दोबारा भरना)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                You used your emergency fund—that's EXACTLY what it's for! Now you need to rebuild it ASAP. Here's how:
              </p>

              <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-300">
                <h4 className="text-xl font-bold text-indigo-900 mb-5">🔄 4-Step Replenishment Strategy:</h4>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-5 border-l-4 border-indigo-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">1</div>
                      <strong className="text-indigo-900 text-lg">Pause All New Investments (SIPs, stocks, gold)</strong>
                    </div>
                    <p className="text-sm text-gray-700">
                      For next 3-6 months, STOP all non-essential investments. Emergency fund comes FIRST. 
                      Redirect SIP money (₹10K) → emergency fund till replenished.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border-l-4 border-indigo-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">2</div>
                      <strong className="text-indigo-900 text-lg">Cut "Wants" Budget by 50%</strong>
                    </div>
                    <p className="text-sm text-gray-700">
                      If your "wants" budget is ₹10K/month, cut to ₹5K for next 6 months. 
                      Extra ₹5K → emergency fund. Total: ₹30K saved in 6 months!
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border-l-4 border-indigo-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">3</div>
                      <strong className="text-indigo-900 text-lg">Use Next Bonus/Increment for Replenishment</strong>
                    </div>
                    <p className="text-sm text-gray-700">
                      Got ₹50K bonus? Put 80% (₹40K) in emergency fund. Appraisal increased salary by ₹5K/month? 
                      Add ₹3K to emergency fund for 6 months.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5 border-l-4 border-indigo-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">4</div>
                      <strong className="text-indigo-900 text-lg">Resume Normal Savings Once Fund is 80% Full</strong>
                    </div>
                    <p className="text-sm text-gray-700">
                      Once emergency fund reaches 80% of target (e.g., ₹1.44L of ₹1.8L target), you can resume SIPs 
                      and normal investing. Complete last 20% over next 3 months.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-100 p-5 rounded-lg mt-5">
                  <strong className="text-indigo-900 block mb-2">📌 Example: Replenishing ₹1L Used from ₹1.8L Fund</strong>
                  <div className="text-sm text-indigo-900 space-y-1">
                    <div>• Stop ₹10K SIP → Add to emergency fund: <strong>₹10K/month</strong></div>
                    <div>• Cut wants ₹10K → ₹5K: Save <strong>₹5K/month</strong></div>
                    <div>• Use ₹50K bonus (80%): <strong>₹40K</strong></div>
                    <div className="border-t border-indigo-300 pt-2 mt-2">
                      <strong>Total in 6 months:</strong> (₹10K + ₹5K) × 6 + ₹40K = <strong>₹1,30,000 replenished!</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Key Takeaways (मुख्य बातें)
            </h2>
            <div className="space-y-4">
              {[
                'Emergency fund is THE #1 financial priority—build this BEFORE investing in stocks, mutual funds, or anything else',
                'Target: 3 months (minimum), 6 months (standard), 12 months (high-risk jobs or sole earners)',
                'Where to keep: 50% in savings account (instant access) + 50% in liquid mutual fund (better returns)',
                'Start small: ₹10K → ₹50K → 3 months → 6 months → 12 months. Don\'t let ₹3L goal paralyze you!',
                'Building strategy: Pay Yourself First (auto-save ₹5-10K/month), use windfalls (bonus, refunds), cut wants temporarily',
                'Use ONLY for real emergencies: medical, job loss, home/vehicle breakdown, family crisis',
                'Never use for: vacations, gadgets, investments, shopping, predictable expenses',
                'After using: Pause investments, cut wants, replenish ASAP. Fund should be 100% full before resuming SIPs',
                'Liquid funds recommendation: HDFC, ICICI, Axis, SBI Liquid Funds (6-7% returns, redeem in 1-2 days)',
                '24-Hour Rule: Before touching fund, ask "What happens if I don\'t act today?" If no severe harm = NOT an emergency!'
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
              🧮 Calculate Your Emergency Fund (मुफ्त कैलकुलेटर)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Emergency Fund Calculator', link: '/calculators/emergency-fund-calculator', icon: '🛡️', desc: 'Calculate your target amount' },
                { name: 'Budget Calculator', link: '/calculators/budget-calculator', icon: '📊', desc: 'Track monthly expenses' },
                { name: 'Savings Goal Planner', link: '/calculators/savings-goal', icon: '💰', desc: 'Plan your savings timeline' },
                { name: 'Liquid Fund Estimator', link: '/calculators/liquid-fund-returns', icon: '📈', desc: 'Estimate liquid fund returns' },
                { name: 'Expense Tracker', link: '/calculators/expense-tracker', icon: '💸', desc: 'Track daily spending' },
                { name: 'SIP Calculator', link: '/calculators/sip-calculator', icon: '💳', desc: 'Plan post-emergency investments' }
              ].map((calc, i) => (
                <Link
                  key={i}
                  to={calc.link}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all group"
                >
                  <div className="text-4xl mb-3">{calc.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {calc.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{calc.desc}</p>
                  <div className="flex items-center text-red-600 font-semibold text-sm">
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
                Now that you understand emergency funds, let's learn how to track your overall financial health with Cash Flow & Net Worth!
              </p>
              <Link
                to="/learn/money-management/cash-flow-net-worth-tracking-india"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                Next: Cash Flow & Net Worth Tracking
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.section>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600">
            <p>
              <strong>Disclaimer:</strong> Emergency fund targets and strategies are general guidelines for Indian users. 
              Your personal situation (income, dependents, job stability, health) may require adjustments. Liquid fund returns 
              are indicative and may vary. This is educational content, not personalized financial advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildingEmergencyFund;


