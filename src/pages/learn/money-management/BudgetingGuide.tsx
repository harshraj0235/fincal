import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowRight, ArrowLeft, Calculator, BarChart3, PieChart, 
  Wallet, TrendingDown, TrendingUp, CheckCircle, AlertCircle, 
  Lightbulb, DollarSign, Home, Car, Coffee, ShoppingCart, Film,
  Zap, Award, Target, Download, Smartphone
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

/**
 * LESSON 3: Budgeting - How to Track Income & Expenses
 * Category: Money Management & Budgeting
 * Duration: 55 minutes
 * Difficulty: Beginner
 * 
 * Learning Objectives:
 * 1. Master the 50-30-20 budgeting rule with Indian examples
 * 2. Learn 5 popular budgeting methods (Zero-based, Envelope, etc.)
 * 3. Track expenses manually and using apps
 * 4. Identify expense leaks and plug them
 * 5. Create a realistic monthly budget
 */

const BudgetingGuide: React.FC = () => {
  const [income, setIncome] = useState<number>(50000);
  const [needs, setNeeds] = useState<number>(0);
  const [wants, setWants] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [budgetCalculated, setBudgetCalculated] = useState(false);

  const calculate503020 = () => {
    setNeeds(income * 0.50);
    setWants(income * 0.30);
    setSavings(income * 0.20);
    setBudgetCalculated(true);
  };

  return (
    <>
      <SEOHelmet
        title="Budgeting Guide: 50-30-20 Rule, Expense Tracking for Indians | MoneyCal Learn"
        description="Master budgeting in Hindi & English. Learn 50-30-20 rule, zero-based budgeting, envelope method, expense tracking apps. Real Indian examples with ₹ amounts."
        keywords="budgeting India, 50-30-20 rule, expense tracking Hindi, budget planner, monthly budget, zero based budgeting, envelope budgeting, बजट बनाना, खर्च ट्रैकिंग"
        url="/learn/money-management/budgeting-how-to-track-income-expenses-india"
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
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 3 of 8</span>
                <Link 
                  to="/learn/money-management/building-emergency-fund-india-6-12-months"
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
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                  Lesson 3 • 55 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Budgeting Mastery
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  How to Track Income & Expenses (आय और खर्चों को कैसे ट्रैक करें)
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
                  'Master the 50-30-20 budgeting rule with real Indian salary examples',
                  'Learn 5 proven budgeting methods (Zero-based, Envelope, Pay Yourself First, etc.)',
                  'Track expenses using apps, spreadsheets, and manual methods',
                  'Identify hidden expense leaks and plug them',
                  'Create a realistic monthly budget you can actually stick to'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Section 1: Why Budget? The Harsh Truth */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-600" />
              1. Why Budget? The Harsh Truth (बजट क्यों? कड़वी सच्चाई)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                In a 2024 <strong>RBI Financial Literacy Survey</strong>, <span className="bg-red-100 px-2 py-1 rounded font-semibold">68% of Indians 
                admitted they don't know where their money goes</span> each month. Common response: <em>"Pata nahi, khatam ho jata hai!"</em>
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 italic">
                <strong>Hindi में:</strong> भारतीय रिजर्व बैंक के 2024 सर्वेक्षण में, <strong>68% भारतीयों ने स्वीकार किया</strong> कि 
                उन्हें नहीं पता कि उनका पैसा हर महीने कहां जाता है। आम जवाब: "पता नहीं, खत्म हो जाता है!"
              </p>

              {/* Without Budget */}
              <div className="bg-red-50 rounded-xl p-6 mb-6 border-2 border-red-300">
                <h4 className="text-xl font-bold text-red-900 mb-4">❌ Life WITHOUT a Budget:</h4>
                <div className="space-y-3">
                  {[
                    { day: 'Day 1-10', situation: 'Salary credited ₹60K. Feeling rich! Spend freely on shopping, dining, gadgets.', spent: '₹25,000' },
                    { day: 'Day 11-20', situation: "Unexpected car repair ₹8K, friend's wedding gift ₹5K, phone bill ₹2K. Total shock!", spent: '₹15,000' },
                    { day: 'Day 21-25', situation: 'Realize: Only ₹20K left! Panic mode. Cut all spending. Survive on Maggi.', spent: '₹8,000' },
                    { day: 'Day 26-30', situation: 'Rent due ₹15K! Use credit card. Month ends with ₹3K in bank, ₹10K new credit card debt.', spent: '₹12,000 + Debt' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-red-700">{item.day}</strong>
                        <span className="bg-red-200 px-3 py-1 rounded-full text-xs font-bold text-red-900">{item.spent}</span>
                      </div>
                      <p className="text-sm text-gray-700 italic">{item.situation}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-red-200 p-4 rounded-lg mt-4">
                  <strong className="text-red-900 text-lg">Result: Zero savings, growing debt, constant stress!</strong>
                </div>
              </div>

              {/* With Budget */}
              <div className="bg-green-50 rounded-xl p-6 mb-6 border-2 border-green-300">
                <h4 className="text-xl font-bold text-green-900 mb-4">✅ Life WITH a Budget (Same ₹60K Salary):</h4>
                <div className="space-y-3">
                  {[
                    { category: 'Salary Day', action: 'Transfer ₹30K (needs), ₹18K (wants), ₹12K (savings) to separate accounts/categories', result: 'Clear allocation' },
                    { category: 'Week 1', action: 'Rent ₹15K (from Needs account), groceries ₹5K (from Needs). Tracked in app.', result: '₹10K needs left' },
                    { category: 'Week 2', action: 'Car repair ₹8K (from Needs), dining ₹4K (from Wants). No panic—budgeted!', result: 'All covered' },
                    { category: 'Month End', action: 'Spent: ₹48K (within budget). Saved: ₹12K in SIP (auto-invested). No debt!', result: '₹12K saved ✅' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-green-700">{item.category}</strong>
                        <span className="bg-green-200 px-3 py-1 rounded-full text-xs font-bold text-green-900">{item.result}</span>
                      </div>
                      <p className="text-sm text-gray-700">{item.action}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-green-200 p-4 rounded-lg mt-4">
                  <strong className="text-green-900 text-lg">Result: ₹12K saved monthly = ₹1,44,000/year + ₹18K SIP returns = ₹1,62,000 wealth in 1 year!</strong>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2: The 50-30-20 Rule (Indian Adaptation) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <PieChart className="w-8 h-8 text-purple-600" />
              2. The 50-30-20 Rule: Indian Adaptation (50-30-20 नियम)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Developed by U.S. Senator Elizabeth Warren, adapted for Indian context by HDFC Bank financial advisors.
              </p>

              {/* Interactive Calculator */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Calculator className="w-7 h-7" />
                  🧮 50-30-20 Budget Calculator
                </h3>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5 mb-4">
                  <label className="block text-sm font-bold mb-2">Your Monthly Income (₹):</label>
                  <input
                    type="number"
                    value={income || ''}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                    placeholder="e.g., 50000"
                  />
                </div>

                <button
                  onClick={calculate503020}
                  className="w-full px-6 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all mb-4"
                >
                  Calculate My Budget
                </button>

                {budgetCalculated && (
                  <div className="bg-white rounded-lg p-6 text-gray-900">
                    <h4 className="font-bold text-xl mb-4">Your 50-30-20 Budget:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 bg-red-100 px-4 rounded-lg">
                        <div>
                          <strong className="text-red-900">🔴 NEEDS (50%)</strong>
                          <p className="text-xs text-red-700">Rent, food, utilities, transport</p>
                        </div>
                        <strong className="text-2xl text-red-700">₹{needs.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-yellow-100 px-4 rounded-lg">
                        <div>
                          <strong className="text-yellow-900">🟡 WANTS (30%)</strong>
                          <p className="text-xs text-yellow-700">Entertainment, dining, shopping</p>
                        </div>
                        <strong className="text-2xl text-yellow-700">₹{wants.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between items-center py-3 bg-green-100 px-4 rounded-lg">
                        <div>
                          <strong className="text-green-900">🟢 SAVINGS (20%)</strong>
                          <p className="text-xs text-green-700">SIPs, emergency fund, investments</p>
                        </div>
                        <strong className="text-2xl text-green-700">₹{savings.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">📋 Detailed 50-30-20 Breakdown for ₹60,000 Salary:</h4>
                
                {/* NEEDS 50% = ₹30,000 */}
                <div className="bg-white rounded-lg p-6 mb-4 border-2 border-red-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-bold text-red-900">🔴 NEEDS (50% = ₹30,000)</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { item: '🏠 Rent (1BHK Bangalore, shared)', amount: '₹12,000' },
                      { item: '🍚 Groceries + Home Cooking', amount: '₹7,000' },
                      { item: '⚡ Electricity + Water + Gas + WiFi', amount: '₹3,500' },
                      { item: '🚌 Local Transport (Metro, Bus, Auto)', amount: '₹2,500' },
                      { item: '💊 Health Expenses + Medicines', amount: '₹1,500' },
                      { item: '📱 Mobile Recharge', amount: '₹500' },
                      { item: '🧹 Household Items + Toiletries', amount: '₹1,500' },
                      { item: '👕 Basic Clothing (averaged)', amount: '₹1,500' }
                    ].map((expense, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">{expense.item}</span>
                        <strong className="text-gray-900">{expense.amount}</strong>
                      </div>
                    ))}
                    <div className="flex justify-between py-3 bg-red-100 px-3 rounded-lg mt-2">
                      <strong className="text-red-900">Total Needs:</strong>
                      <strong className="text-xl text-red-700">₹30,000</strong>
                    </div>
                  </div>
                </div>

                {/* WANTS 30% = ₹18,000 */}
                <div className="bg-white rounded-lg p-6 mb-4 border-2 border-yellow-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-bold text-yellow-900">🟡 WANTS (30% = ₹18,000)</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { item: '🍕 Dining Out (Zomato, Swiggy, restaurants)', amount: '₹6,000' },
                      { item: '🎬 Entertainment (Netflix, movies, concerts)', amount: '₹2,000' },
                      { item: '👗 Shopping (non-essential clothes, gadgets)', amount: '₹4,000' },
                      { item: '☕ Cafe Visits (Starbucks, CCD)', amount: '₹2,500' },
                      { item: '🎮 Hobbies, Gaming, Books', amount: '₹1,500' },
                      { item: '🚖 Uber/Ola (convenience trips)', amount: '₹1,000' },
                      { item: '🎁 Gifts, Social Events', amount: '₹1,000' }
                    ].map((expense, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">{expense.item}</span>
                        <strong className="text-gray-900">{expense.amount}</strong>
                      </div>
                    ))}
                    <div className="flex justify-between py-3 bg-yellow-100 px-3 rounded-lg mt-2">
                      <strong className="text-yellow-900">Total Wants:</strong>
                      <strong className="text-xl text-yellow-700">₹18,000</strong>
                    </div>
                  </div>
                </div>

                {/* SAVINGS 20% = ₹12,000 */}
                <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-bold text-green-900">🟢 SAVINGS (20% = ₹12,000)</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { item: '🏦 Emergency Fund (Liquid Fund)', amount: '₹5,000' },
                      { item: '📈 SIP in Index Fund (long-term)', amount: '₹5,000' },
                      { item: '💰 PPF (tax saving under 80C)', amount: '₹2,000' }
                    ].map((expense, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">{expense.item}</span>
                        <strong className="text-gray-900">{expense.amount}</strong>
                      </div>
                    ))}
                    <div className="flex justify-between py-3 bg-green-100 px-3 rounded-lg mt-2">
                      <strong className="text-green-900">Total Savings:</strong>
                      <strong className="text-xl text-green-700">₹12,000</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <strong className="text-blue-900">💡 Indian Adaptation:</strong>
                <p className="text-sm text-gray-700 mt-2">
                  If you live in Mumbai/Delhi (high rent), or have EMIs, use <strong>60-25-15</strong> (60% needs, 25% wants, 15% savings) 
                  initially. As income grows, shift towards 50-30-20 or even 50-20-30 (more savings)!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 3: 5 Budgeting Methods */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              3. 5 Popular Budgeting Methods (5 बजट विधियां)
            </h2>

            <div className="space-y-6">
              {/* Method 1: 50-30-20 */}
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-purple-900">50-30-20 Rule (सबसे लोकप्रिय)</h4>
                    <p className="text-purple-700 font-semibold">Best for: Beginners, salaried employees</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> Divide income into 3 buckets - 50% needs, 30% wants, 20% savings.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-purple-700">✅ Pros:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• Simple to understand and implement</li>
                    <li>• Flexible within each category</li>
                    <li>• Ensures minimum 20% savings</li>
                  </ul>
                  <strong className="text-red-700 block mt-3">❌ Cons:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• May not work if rent is very high (Mumbai: ₹30K rent on ₹50K salary = 60% already!)</li>
                    <li>• Less detailed - doesn't track specific expenses</li>
                  </ul>
                </div>
              </div>

              {/* Method 2: Zero-Based Budgeting */}
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-900">Zero-Based Budgeting (शून्य-आधारित बजट)</h4>
                    <p className="text-blue-700 font-semibold">Best for: Detail-oriented people, tight budgets</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> Income - All Planned Expenses - Savings = ₹0. Every rupee has a job!
                </p>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <strong className="text-blue-900 block mb-2">Example: ₹45,000 Salary</strong>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>Income:</span><strong>₹45,000</strong></div>
                    <div className="flex justify-between text-red-700"><span>- Rent:</span><strong>₹15,000</strong></div>
                    <div className="flex justify-between text-red-700"><span>- Groceries:</span><strong>₹6,000</strong></div>
                    <div className="flex justify-between text-red-700"><span>- Utilities:</span><strong>₹3,000</strong></div>
                    <div className="flex justify-between text-red-700"><span>- Transport:</span><strong>₹2,000</strong></div>
                    <div className="flex justify-between text-yellow-700"><span>- Dining/Entertainment:</span><strong>₹5,000</strong></div>
                    <div className="flex justify-between text-green-700"><span>- SIP:</span><strong>₹8,000</strong></div>
                    <div className="flex justify-between text-green-700"><span>- Emergency Fund:</span><strong>₹4,000</strong></div>
                    <div className="flex justify-between text-green-700"><span>- PPF:</span><strong>₹2,000</strong></div>
                    <div className="flex justify-between py-2 border-t-2 border-gray-300 font-bold">
                      <span>Balance:</span><strong className="text-green-600">₹0</strong>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-blue-700">✅ Pros:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• Forces you to account for every rupee</li>
                    <li>• Prevents overspending—no "leftover" to waste</li>
                    <li>• Great for aggressive savers</li>
                  </ul>
                  <strong className="text-red-700 block mt-3">❌ Cons:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• Time-consuming to track every expense category</li>
                    <li>• Less flexibility for unexpected expenses</li>
                  </ul>
                </div>
              </div>

              {/* Method 3: Envelope System */}
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-green-900">Envelope System (लिफाफा प्रणाली)</h4>
                    <p className="text-green-700 font-semibold">Best for: Cash users, overspenders</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> Withdraw salary in cash. Put money in physical envelopes for each category. 
                  When envelope is empty, no more spending in that category!
                </p>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <strong className="text-green-900 block mb-3">Example Envelopes (₹40K Salary):</strong>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Envelope 1: Rent', amount: '₹12,000' },
                      { label: 'Envelope 2: Groceries', amount: '₹8,000' },
                      { label: 'Envelope 3: Transport', amount: '₹3,000' },
                      { label: 'Envelope 4: Dining Out', amount: '₹4,000' },
                      { label: 'Envelope 5: Entertainment', amount: '₹3,000' },
                      { label: 'Envelope 6: Emergency Buffer', amount: '₹2,000' },
                      { label: '🏦 Bank: SIP + Savings', amount: '₹8,000' }
                    ].map((env, i) => (
                      <div key={i} className="bg-green-100 p-3 rounded-lg border border-green-300">
                        <div className="text-xs text-green-800 mb-1">{env.label}</div>
                        <div className="text-lg font-bold text-green-700">{env.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-green-700">✅ Pros:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• Physical cash = psychological control (harder to overspend)</li>
                    <li>• Visual—you SEE money decreasing</li>
                    <li>• Works great for habitual overspenders</li>
                  </ul>
                  <strong className="text-red-700 block mt-3">❌ Cons:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• Carrying cash is unsafe in some areas</li>
                    <li>• Doesn't work for online payments (which most Indians use now)</li>
                    <li>• Modern adaptation: Use UPI apps like Paytm with category limits instead</li>
                  </ul>
                </div>
              </div>

              {/* Method 4: Pay Yourself First */}
              <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
                    4
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-orange-900">Pay Yourself First (पहले खुद को भुगतान)</h4>
                    <p className="text-orange-700 font-semibold">Best for: Aggressive savers, wealth builders</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> On salary day, FIRST transfer 20-30% to savings/investments (auto-debit SIP). 
                  Spend remaining 70-80% on needs + wants.
                </p>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <strong className="text-orange-900 block mb-3">Example: ₹70K Salary (30% savings goal)</strong>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 bg-green-100 px-3 rounded-lg">
                      <span className="text-green-900 font-bold">Day 1 - Auto-debit SIPs:</span>
                      <strong className="text-green-700">₹21,000</strong>
                    </div>
                    <div className="ml-4 space-y-1 text-gray-700">
                      <div className="flex justify-between"><span>• Nifty 50 Index Fund:</span><span>₹10,000</span></div>
                      <div className="flex justify-between"><span>• Liquid Fund (emergency):</span><span>₹6,000</span></div>
                      <div className="flex justify-between"><span>• PPF:</span><span>₹5,000</span></div>
                    </div>
                    <div className="flex justify-between py-2 bg-blue-100 px-3 rounded-lg mt-2">
                      <span className="text-blue-900 font-bold">Remaining for Month:</span>
                      <strong className="text-blue-700">₹49,000</strong>
                    </div>
                    <p className="text-xs text-gray-600 italic mt-2">
                      Now spend ₹49K on needs + wants. No pressure to "save"—already saved! 💪
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-orange-700">✅ Pros:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• Guarantees savings (not dependent on "leftover")</li>
                    <li>• Automation works—no willpower needed monthly</li>
                    <li>• Builds wealth faster (savings = priority #1)</li>
                  </ul>
                  <strong className="text-red-700 block mt-3">❌ Cons:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• Requires discipline to live on remaining amount</li>
                    <li>• Can be tight if unexpected expenses hit</li>
                  </ul>
                </div>
              </div>

              {/* Method 5: 80/20 Budget (Simplified) */}
              <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-xl">
                    5
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-pink-900">80/20 Budget - The Simplest (सबसे आसान)</h4>
                    <p className="text-pink-700 font-semibold">Best for: Lazy budgeters, people who hate details</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>How it works:</strong> Save 20% FIRST (auto-SIP). Spend remaining 80% however you want. Don't track categories.
                </p>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <strong className="text-pink-900 block mb-3">Example: ₹50K Salary</strong>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 bg-green-100 px-3 rounded-lg">
                      <span className="font-bold text-green-900">Auto-Save (Day 1):</span>
                      <strong className="text-green-700">₹10,000 (20%)</strong>
                    </div>
                    <div className="flex justify-between py-2 bg-gray-100 px-3 rounded-lg">
                      <span className="font-bold text-gray-900">Spend Freely:</span>
                      <strong className="text-gray-700">₹40,000 (80%)</strong>
                    </div>
                    <p className="text-xs text-gray-600 italic mt-2">
                      No category tracking. Just ensure you don't overspend the ₹40K. That's it!
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-pink-700">✅ Pros:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• Extremely simple - just 2 numbers (save 20%, spend 80%)</li>
                    <li>• No detailed tracking needed</li>
                    <li>• Still saves consistently</li>
                  </ul>
                  <strong className="text-red-700 block mt-3">❌ Cons:</strong>
                  <ul className="text-sm text-gray-700 ml-4 mt-2 space-y-1">
                    <li>• Can't identify specific expense leaks</li>
                    <li>• May overspend on wants, underspend on needs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-5 mt-6">
              <strong className="text-yellow-900">🎯 Which Method Should YOU Use?</strong>
              <ul className="mt-3 space-y-2 text-sm text-gray-800">
                <li>• <strong>Beginner?</strong> Start with 50-30-20 or 80/20</li>
                <li>• <strong>Overspender?</strong> Use Envelope System or Zero-Based</li>
                <li>• <strong>Aggressive saver?</strong> Pay Yourself First (30%+ savings)</li>
                <li>• <strong>Tech-savvy?</strong> Use apps like Money Manager, Walnut, ET Money</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 4: Expense Tracking Tools */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-indigo-600" />
              4. Expense Tracking Tools (खर्च ट्रैकिंग उपकरण)
            </h2>

            <div className="space-y-6">
              {/* Manual Tracking */}
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-300">
                <h4 className="text-xl font-bold text-gray-900 mb-4">📝 Method 1: Manual Tracking (Notebook/Excel)</h4>
                <div className="bg-white rounded-lg p-5 mb-4">
                  <strong className="text-gray-900">How to do it:</strong>
                  <ol className="mt-3 ml-5 space-y-2 text-sm text-gray-700">
                    <li>1. Get a small notebook or create Excel sheet</li>
                    <li>2. Every night, write down ALL expenses (even ₹10 chai)</li>
                    <li>3. Categorize: Needs, Wants, or Savings</li>
                    <li>4. End of month: Total each category</li>
                    <li>5. Compare with budget. Find where you overspent.</li>
                  </ol>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-100 p-4 rounded-lg">
                    <strong className="text-green-800">✅ Pros:</strong>
                    <ul className="text-xs text-gray-700 mt-2 space-y-1">
                      <li>• No app needed, works offline</li>
                      <li>• Writing makes you conscious of spending</li>
                      <li>• Free (just paper or Google Sheets)</li>
                    </ul>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg">
                    <strong className="text-red-800">❌ Cons:</strong>
                    <ul className="text-xs text-gray-700 mt-2 space-y-1">
                      <li>• Time-consuming (5-10 mins daily)</li>
                      <li>• Easy to forget entries</li>
                      <li>• No automatic bank sync</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* App-Based Tracking */}
              <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-300">
                <h4 className="text-xl font-bold text-indigo-900 mb-4">📱 Method 2: Expense Tracking Apps (Popular in India)</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {[
                    { 
                      app: 'Money Manager', 
                      features: 'Manual entry, multiple accounts, budgets, Indian UPI support',
                      rating: '4.5★ (2M+ downloads)',
                      link: 'Play Store'
                    },
                    { 
                      app: 'Walnut (by Axio)', 
                      features: 'Auto SMS parsing, bill reminders, subscription tracking',
                      rating: '4.3★ (5M+ downloads)',
                      link: 'Play Store'
                    },
                    { 
                      app: 'ET Money', 
                      features: 'Expense tracking + investment portfolio + tax planning',
                      rating: '4.4★ (10M+ downloads)',
                      link: 'Play Store / iOS'
                    },
                    { 
                      app: 'Spendee', 
                      features: 'Beautiful UI, shared wallets, bank sync',
                      rating: '4.6★ (Global)',
                      link: 'Play Store / iOS'
                    }
                  ].map((tool, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Smartphone className="w-5 h-5 text-indigo-600" />
                        <strong className="text-indigo-900">{tool.app}</strong>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">{tool.features}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-green-700 font-semibold">{tool.rating}</span>
                        <span className="text-xs text-gray-600">{tool.link}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg p-4">
                  <strong className="text-indigo-700">✅ Pros:</strong>
                  <ul className="text-xs text-gray-700 mt-2 space-y-1">
                    <li>• Auto SMS parsing (reads bank SMS, extracts amount + category)</li>
                    <li>• Charts, graphs, insights automatically</li>
                    <li>• Reminders for bills, subscriptions</li>
                  </ul>
                  <strong className="text-red-700 block mt-3">❌ Cons:</strong>
                  <ul className="text-xs text-gray-700 mt-2 space-y-1">
                    <li>• Needs SMS permission (privacy concern for some)</li>
                    <li>• Cash expenses must be entered manually</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 5: Finding Expense Leaks */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-red-600" />
              5. Finding Expense Leaks (खर्च के छेद ढूंढना)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Most Indians <strong>leak ₹5,000 - ₹15,000 per month</strong> on small expenses they don't even remember! 
                These "invisible" expenses destroy wealth silently.
              </p>

              {/* Common Leaks */}
              <div className="bg-red-50 rounded-xl p-6 mb-6 border-2 border-red-300">
                <h4 className="text-xl font-bold text-red-900 mb-4">🔴 Top 10 Expense Leaks for Indians:</h4>
                <div className="space-y-3">
                  {[
                    { leak: 'Daily Cafe Coffee', cost: '₹150/day × 25 days = ₹3,750/month', yearly: '₹45,000/year', fix: 'Make at home: ₹500/month → Save ₹3,250/month!' },
                    { leak: 'Unused Subscriptions', cost: 'Netflix + Prime + Hotstar + Gym = ₹2,500/month', yearly: '₹30,000/year', fix: 'Cancel unused. Keep 1-2 only → Save ₹1,500/month' },
                    { leak: 'Impulse Online Shopping', cost: 'Flipkart/Amazon "deals" = ₹8,000/month', yearly: '₹96,000/year', fix: '24-hour rule: Wait 1 day before buying → Save ₹5,000/month' },
                    { leak: 'Swiggy/Zomato Ordering', cost: '₹300/meal × 20 orders = ₹6,000/month', yearly: '₹72,000/year', fix: 'Cook at home, order only weekends → Save ₹4,000/month' },
                    { leak: 'Auto/Uber for Short Distances', cost: '₹150/day instead of ₹20 metro = ₹3,250/month', yearly: '₹39,000/year', fix: 'Use metro/bus for < 5km → Save ₹2,500/month' },
                    { leak: 'Bank Charges & Late Fees', cost: 'ATM fees, CC late fees, insufficient balance = ₹800/month', yearly: '₹9,600/year', fix: 'Use own bank ATM, auto-pay bills → Save ₹800/month' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-red-700">{i + 1}. {item.leak}</strong>
                        <span className="bg-red-200 px-2 py-1 rounded text-xs font-bold text-red-900">{item.yearly}</span>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        <strong>Cost:</strong> {item.cost}
                      </div>
                      <div className="bg-green-100 p-2 rounded text-sm text-green-900">
                        <strong>✅ Fix:</strong> {item.fix}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-red-200 p-5 rounded-lg mt-4">
                  <strong className="text-red-900 text-lg">💰 Total Savings Potential by Plugging Leaks:</strong>
                  <div className="text-3xl font-bold text-red-700 mt-2">₹17,050/month = ₹2,04,600/year!</div>
                  <p className="text-sm text-red-800 mt-2">
                    That's enough for a <strong>₹2L emergency fund</strong> or a <strong>Goa vacation + new laptop</strong>!
                  </p>
                </div>
              </div>

              {/* Expense Audit Exercise */}
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
                <h4 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  💡 7-Day Expense Audit Challenge (7 दिन का चैलेंज)
                </h4>
                <p className="text-gray-800 mb-4">
                  For the next 7 days, track <strong>EVERY expense</strong> (even ₹5 paan). Write in notebook or use Money Manager app.
                </p>
                <div className="bg-white rounded-lg p-5">
                  <strong className="text-gray-900 block mb-3">What to Track:</strong>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    {[
                      '📅 Date', '💰 Amount (exact ₹)', '🏷️ Category (food/transport/etc)', 
                      '💳 Payment Mode (cash/UPI/card)', '📝 Note (what you bought)', '😊 Was it necessary? (yes/no)'
                    ].map((field, i) => (
                      <div key={i} className="bg-yellow-50 p-2 rounded flex items-center gap-2">
                        <span className="text-yellow-700 font-bold">{field}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic mt-4">
                    <strong>After 7 days:</strong> You'll be shocked to see where your money went! Most people find 
                    ₹3K - ₹8K of "unnecessary" expenses they didn't even realize.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 6: Creating Your First Budget (Step-by-Step) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wallet className="w-8 h-8 text-green-600" />
              6. Create Your First Budget: Step-by-Step (अपना पहला बजट बनाएं)
            </h2>

            <div className="prose max-w-none">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
                <h4 className="text-lg font-bold text-green-900 mb-4">✅ 5-Step Budget Creation Process:</h4>
                
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-green-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <strong className="text-green-900 text-lg">Calculate Total Monthly Income</strong>
                    </div>
                    <div className="ml-13 space-y-2 text-sm">
                      <p className="text-gray-700 mb-3">Add ALL income sources (salary + freelance + rental + interest):</p>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between mb-1">
                          <span>Salary (in-hand after tax):</span>
                          <strong>₹55,000</strong>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Freelance projects:</span>
                          <strong>+ ₹8,000</strong>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>FD interest (monthly avg):</span>
                          <strong>+ ₹2,000</strong>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-300 font-bold">
                          <span className="text-green-700">TOTAL INCOME:</span>
                          <strong className="text-green-700 text-lg">₹65,000</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-yellow-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <strong className="text-yellow-900 text-lg">List ALL Fixed Expenses (Monthly)</strong>
                    </div>
                    <div className="ml-13 space-y-2 text-sm">
                      <p className="text-gray-700 mb-3">Expenses that are same every month (can't easily reduce):</p>
                      <div className="bg-gray-50 p-3 rounded">
                        {[
                          { item: 'Rent/EMI', amount: '₹18,000' },
                          { item: 'Electricity (avg)', amount: '₹1,500' },
                          { item: 'WiFi/Internet', amount: '₹800' },
                          { item: 'Mobile Recharge', amount: '₹500' },
                          { item: 'Insurance Premiums (monthly avg)', amount: '₹2,500' },
                          { item: 'SIP (treat as fixed!)', amount: '₹10,000' }
                        ].map((exp, i) => (
                          <div key={i} className="flex justify-between mb-1">
                            <span>{exp.item}</span>
                            <strong>{exp.amount}</strong>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2 border-t border-gray-300 font-bold">
                          <span>Total Fixed:</span>
                          <strong className="text-yellow-700">₹33,300</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <strong className="text-blue-900 text-lg">Estimate Variable Expenses</strong>
                    </div>
                    <div className="ml-13 space-y-2 text-sm">
                      <p className="text-gray-700 mb-3">Expenses that change monthly (you have control):</p>
                      <div className="bg-gray-50 p-3 rounded">
                        {[
                          { item: 'Groceries', amount: '₹8,000' },
                          { item: 'Dining out / Food delivery', amount: '₹5,000' },
                          { item: 'Transport (auto, metro, petrol)', amount: '₹3,000' },
                          { item: 'Entertainment (movies, OTT)', amount: '₹2,000' },
                          { item: 'Shopping (clothes, accessories)', amount: '₹4,000' },
                          { item: 'Personal care (salon, cosmetics)', amount: '₹1,500' },
                          { item: 'Miscellaneous', amount: '₹1,500' }
                        ].map((exp, i) => (
                          <div key={i} className="flex justify-between mb-1">
                            <span>{exp.item}</span>
                            <strong>{exp.amount}</strong>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2 border-t border-gray-300 font-bold">
                          <span>Total Variable:</span>
                          <strong className="text-blue-700">₹25,000</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-purple-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                        4
                      </div>
                      <strong className="text-purple-900 text-lg">Calculate Total Expenses & Savings</strong>
                    </div>
                    <div className="ml-13">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-2">
                            <span>Total Income:</span>
                            <strong className="text-green-700">₹65,000</strong>
                          </div>
                          <div className="flex justify-between py-2 border-t">
                            <span>Fixed Expenses:</span>
                            <strong className="text-red-700">- ₹33,300</strong>
                          </div>
                          <div className="flex justify-between py-2">
                            <span>Variable Expenses:</span>
                            <strong className="text-red-700">- ₹25,000</strong>
                          </div>
                          <div className="flex justify-between py-3 bg-green-100 px-3 rounded-lg border-t-2">
                            <strong className="text-green-900">Savings/Surplus:</strong>
                            <strong className="text-xl text-green-700">₹6,700</strong>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 italic mt-3">
                        💡 This ₹6,700 can be additional SIP, emergency fund top-up, or specific goal (vacation, gadget).
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
                        5
                      </div>
                      <strong className="text-orange-900 text-lg">Review & Adjust Monthly</strong>
                    </div>
                    <div className="ml-13">
                      <p className="text-gray-700 text-sm mb-3">
                        At month-end, compare <strong>Actual vs Budgeted</strong>. Find overspends. Adjust next month.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm">
                        <div className="grid md:grid-cols-3 gap-3">
                          <div>
                            <strong className="text-gray-900">Budgeted</strong>
                            <div className="mt-2 text-blue-700 font-bold">₹5,000</div>
                            <div className="text-xs text-gray-600">Dining out</div>
                          </div>
                          <div>
                            <strong className="text-gray-900">Actual Spent</strong>
                            <div className="mt-2 text-red-700 font-bold">₹7,500</div>
                            <div className="text-xs text-gray-600">Over by ₹2,500!</div>
                          </div>
                          <div>
                            <strong className="text-gray-900">Next Month</strong>
                            <div className="mt-2 text-green-700 font-bold">₹4,000</div>
                            <div className="text-xs text-gray-600">Reduce target</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 7: Real Budget Example - Comprehensive */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-indigo-600" />
              7. Complete Budget Example: Rohan (Software Engineer, Hyderabad)
            </h2>

            <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-300">
              <div className="bg-white rounded-lg p-6 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                    R
                  </div>
                  <div>
                    <strong className="text-xl text-gray-900">Rohan Malhotra, 29</strong>
                    <p className="text-gray-700">Software Engineer | Salary: ₹85,000/month (in-hand)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Income */}
                  <div>
                    <strong className="text-green-700 block mb-2">💰 INCOME:</strong>
                    <div className="bg-green-50 p-3 rounded text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Salary (after tax):</span>
                        <strong>₹85,000</strong>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-bold">
                        <span>Total Monthly Income:</span>
                        <strong className="text-green-700">₹85,000</strong>
                      </div>
                    </div>
                  </div>

                  {/* Needs */}
                  <div>
                    <strong className="text-red-700 block mb-2">🔴 NEEDS (47% = ₹40,000):</strong>
                    <div className="bg-red-50 p-3 rounded text-sm space-y-1">
                      {[
                        ['🏠 Rent (2BHK sharing, Gachibowli)', '₹15,000'],
                        ['🍚 Groceries + Vegetables', '₹8,000'],
                        ['⚡ Electricity + Water', '₹2,000'],
                        ['🌐 WiFi (200 Mbps)', '₹1,000'],
                        ['📱 Mobile Recharge', '₹500'],
                        ['🚇 Office Commute (Metro)', '₹2,000'],
                        ['💊 Health Insurance Premium (₹3L cover)', '₹2,500'],
                        ['👨‍👩‍👦 Parent Support (send home)', '₹5,000'],
                        ['🧹 Maid + Cleaning', '₹1,500'],
                        ['📺 DTH/Cable', '₹500'],
                        ['👕 Basic Clothing (avg)', '₹2,000']
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-gray-700">{item[0]}</span>
                          <strong>{item[1]}</strong>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 border-t-2 border-red-300 font-bold">
                        <span>Total Needs:</span>
                        <strong className="text-red-700">₹40,000</strong>
                      </div>
                    </div>
                  </div>

                  {/* Wants */}
                  <div>
                    <strong className="text-yellow-700 block mb-2">🟡 WANTS (25% = ₹21,500):</strong>
                    <div className="bg-yellow-50 p-3 rounded text-sm space-y-1">
                      {[
                        ['🍕 Zomato/Swiggy (4 orders/week)', '₹5,000'],
                        ['☕ Cafe visits (Starbucks, CCD)', '₹2,500'],
                        ['🎬 Movies, OTT (Netflix, Prime)', '₹1,500'],
                        ['🎮 Gaming (Steam, PS Plus)', '₹1,500'],
                        ['👟 Shopping (sneakers, gadgets)', '₹4,000'],
                        ['🍺 Weekend outings with friends', '₹3,000'],
                        ['🚕 Uber/Ola (convenience)', '₹2,000'],
                        ['💇 Grooming (haircut, salon)', '₹1,000'],
                        ['📚 Books, Courses, Subscriptions', '₹1,000']
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-gray-700">{item[0]}</span>
                          <strong>{item[1]}</strong>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 border-t-2 border-yellow-300 font-bold">
                        <span>Total Wants:</span>
                        <strong className="text-yellow-700">₹21,500</strong>
                      </div>
                    </div>
                  </div>

                  {/* Savings */}
                  <div>
                    <strong className="text-green-700 block mb-2">🟢 SAVINGS & INVESTMENTS (28% = ₹23,500):</strong>
                    <div className="bg-green-50 p-3 rounded text-sm space-y-1">
                      {[
                        ['📈 SIP - Nifty 50 Index Fund', '₹12,000'],
                        ['🏦 Emergency Fund (Liquid MF)', '₹6,000'],
                        ['💰 PPF (tax saving 80C)', '₹3,000'],
                        ['🚗 Car Down Payment Fund (FD)', '₹2,500']
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-gray-700">{item[0]}</span>
                          <strong>{item[1]}</strong>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 border-t-2 border-green-300 font-bold">
                        <span>Total Savings:</span>
                        <strong className="text-green-700">₹23,500</strong>
                      </div>
                    </div>
                  </div>

                  {/* Final Tally */}
                  <div className="bg-white p-5 rounded-lg border-2 border-gray-300">
                    <strong className="text-gray-900 block mb-3 text-lg">📊 FINAL BUDGET SUMMARY:</strong>
                    <div className="space-y-2">
                      <div className="flex justify-between py-2 border-b">
                        <span>Monthly Income:</span>
                        <strong className="text-green-600">₹85,000</strong>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Total Needs:</span>
                        <strong className="text-red-600">₹40,000 (47%)</strong>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Total Wants:</span>
                        <strong className="text-yellow-600">₹21,500 (25%)</strong>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Total Savings:</span>
                        <strong className="text-green-600">₹23,500 (28%)</strong>
                      </div>
                      <div className="flex justify-between py-3 bg-blue-100 px-3 rounded-lg">
                        <strong>Balance (Buffer):</strong>
                        <strong className="text-blue-700">₹0</strong>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 italic mt-3">
                      ✅ <strong>Perfect!</strong> Every rupee is allocated. 28% savings rate is excellent! Rohan will build ₹2.82L wealth 
                      in first year alone (₹23.5K × 12 months)!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Download Budget Template */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-2xl">
              <Download className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">
                📥 Free Budget Planning Tools
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Use our calculators to create your perfect budget (अपना सही बजट बनाएं)
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/calculators/budget-calculator"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                >
                  Budget Calculator
                </Link>
                <Link
                  to="/calculators/expense-tracker"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                >
                  Expense Tracker
                </Link>
                <Link
                  to="/calculators/savings-goal"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                >
                  Savings Goal Planner
                </Link>
              </div>
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
                'Budgeting is not restriction—it\'s telling your money WHERE to go instead of wondering where it WENT',
                '50-30-20 Rule: 50% needs, 30% wants, 20% savings. Adapt to 60-25-15 if rent is high.',
                'Budget methods: Choose what works (50-30-20, Zero-based, Envelope, Pay Yourself First, 80/20)',
                'Track expenses for 7 days to find leaks. Most Indians waste ₹5K-15K monthly unknowingly.',
                'Common leaks: Daily cafe coffee (₹45K/year), unused subscriptions (₹30K/year), impulse shopping',
                'Fixed expenses: Rent, EMI, insurance (can\'t reduce easily). Variable: Food, entertainment (controllable).',
                'Use apps (Money Manager, Walnut, ET Money) or Excel. Review monthly. Adjust. Improve.',
                'Pay Yourself First: Auto-debit SIP on salary day = guaranteed savings!'
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
                { name: 'Budget Planner', link: '/calculators/budget-planner', icon: '📊', desc: 'Plan your 50-30-20 budget' },
                { name: 'Expense Tracker', link: '/calculators/expense-tracker', icon: '💸', desc: 'Track daily expenses' },
                { name: 'Savings Calculator', link: '/calculators/savings-calculator', icon: '💰', desc: 'Calculate monthly savings' },
                { name: 'SIP Calculator', link: '/calculators/sip-calculator', icon: '📈', desc: 'Plan your SIPs' },
                { name: 'EMI Calculator', link: '/calculators/emi-calculator', icon: '🏦', desc: 'Calculate loan EMIs' },
                { name: 'Goal Planner', link: '/calculators/goal-planner', icon: '🎯', desc: 'Plan financial goals' }
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
                Now that you can create and track a budget, let's learn about the MOST important financial goal: Building an Emergency Fund!
              </p>
              <Link
                to="/learn/money-management/building-emergency-fund-india-6-12-months"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                Next: Building Emergency Fund
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.section>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600">
            <p>
              <strong>Disclaimer:</strong> Budgeting examples use average Indian expenses for illustration. Your actual expenses 
              may vary based on location, lifestyle, and family size. Adjust percentages to fit your situation. This is educational 
              content, not financial advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetingGuide;



