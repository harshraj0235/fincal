import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowRight, ArrowLeft, Calculator, TrendingUp, DollarSign, 
  PiggyBank, Wallet, BarChart3, Target, CheckCircle, AlertCircle, 
  Lightbulb, Star, Award, Globe, Home, Car, GraduationCap, Heart
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

/**
 * LESSON 1: What is Money? Understanding Income, Expenses & Wealth
 * Category: Money Management & Budgeting
 * Duration: 45 minutes
 * Difficulty: Beginner
 * 
 * Learning Objectives:
 * 1. Understand the fundamental concept of money and its functions
 * 2. Identify different types of income streams
 * 3. Categorize expenses into needs vs wants
 * 4. Grasp the concept of wealth creation
 * 5. Learn real Indian examples and scenarios
 */

const WhatIsMoney: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'income' | 'expenses' | 'wealth'>('income');
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <SEOHelmet
        title="What is Money? Understanding Income, Expenses & Wealth | MoneyCal Learn"
        description="Learn money fundamentals in Hindi & English. Understand income streams, expense categories, wealth creation for Indians. Real examples, calculators & expert guidance."
        keywords="what is money in Hindi, income types India, expense categories, wealth creation, personal finance basics, पैसा क्या है, आय के प्रकार, खर्च श्रेणी, संपत्ति निर्माण"
        url="/learn/money-management/what-is-money-income-expenses-wealth"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/money-management" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Money Management</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 1 of 8</span>
                <Link 
                  to="/learn/money-management/setting-financial-goals-short-medium-long-term"
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
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                  Lesson 1 • 45 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  What is Money?
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  Understanding Income, Expenses & Wealth (आय, खर्च और संपत्ति को समझें)
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
                  'Understand what money really is and its 4 key functions',
                  'Identify all your income sources and calculate monthly income',
                  'Categorize expenses into needs, wants, and savings',
                  'Grasp how wealth is built through income minus expenses',
                  'Learn real Indian examples and practical scenarios'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Section 1: What is Money? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wallet className="w-8 h-8 text-green-600" />
              1. What is Money? (पैसा क्या है?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Money is <strong>not just currency notes and coins</strong>. At its core, money is a <strong>medium of exchange</strong>, 
                a <strong>unit of account</strong>, a <strong>store of value</strong>, and a <strong>standard of deferred payment</strong>.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-4 bg-amber-50 border-l-4 border-amber-500 p-4 italic">
                <strong>Hindi में समझें:</strong> पैसा सिर्फ नोट और सिक्के नहीं है। यह <strong>विनिमय का माध्यम</strong>, 
                <strong>मूल्य का मापदंड</strong>, <strong>धन संचय का साधन</strong>, और <strong>भविष्य के भुगतान का मानक</strong> है।
              </p>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 my-6">
                <h4 className="text-xl font-bold text-green-900 mb-4">🔑 4 Functions of Money:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="font-bold text-green-700 mb-2">1️⃣ Medium of Exchange</div>
                    <p className="text-sm text-gray-700">You exchange money for goods/services instead of bartering.</p>
                    <p className="text-xs text-gray-600 italic mt-1">Example: ₹50 for 1kg rice instead of trading chickens!</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="font-bold text-green-700 mb-2">2️⃣ Unit of Account</div>
                    <p className="text-sm text-gray-700">Money provides a standard way to measure value.</p>
                    <p className="text-xs text-gray-600 italic mt-1">Example: iPhone costs ₹1,00,000, not "200 kg wheat"</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="font-bold text-green-700 mb-2">3️⃣ Store of Value</div>
                    <p className="text-sm text-gray-700">Money retains value over time (if inflation-protected).</p>
                    <p className="text-xs text-gray-600 italic mt-1">Example: ₹10,000 saved today can buy things tomorrow</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="font-bold text-green-700 mb-2">4️⃣ Standard of Deferred Payment</div>
                    <p className="text-sm text-gray-700">You can make agreements for future payments.</p>
                    <p className="text-xs text-gray-600 italic mt-1">Example: EMI—buy car today, pay over 5 years</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl my-6">
                <h4 className="font-bold text-yellow-900 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5" />
                  Real Indian Example (वास्तविक भारतीय उदाहरण):
                </h4>
                <p className="text-gray-800 leading-relaxed">
                  <strong>Rajesh earns ₹50,000/month</strong> as a software developer in Bangalore. His money serves all 4 functions:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700 ml-4">
                  <li><strong>Medium of Exchange:</strong> He pays ₹15,000 rent, ₹5,000 groceries</li>
                  <li><strong>Unit of Account:</strong> He knows his net worth is ₹8,50,000 (savings + investments - debts)</li>
                  <li><strong>Store of Value:</strong> He keeps ₹3,00,000 in FD for emergencies</li>
                  <li><strong>Deferred Payment:</strong> He pays ₹12,000 EMI for his bike (₹1.2L loan over 12 months)</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Section 2: Understanding Income */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              2. Understanding Income (आय को समझना)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Income is <strong>money you receive</strong> in exchange for your time, skills, capital, or assets. In India, 
                there are <strong>two main types of income</strong>: <span className="bg-yellow-100 px-2 py-1 rounded font-semibold">Active Income</span> and 
                <span className="bg-green-100 px-2 py-1 rounded font-semibold ml-1">Passive Income</span>.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 italic">
                <strong>Hindi में:</strong> आय वह <strong>पैसा है जो आपको मिलता है</strong> आपके समय, कौशल, पूंजी या संपत्ति के बदले में। 
                भारत में <strong>दो मुख्य प्रकार की आय होती है</strong>: सक्रिय आय और निष्क्रिय आय।
              </p>

              {/* Income Types */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">💼 Types of Income in India:</h3>
                
                {/* Active Income */}
                <div className="bg-white rounded-lg p-6 mb-6 border-2 border-blue-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Briefcase className="w-6 h-6 text-yellow-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        🔷 Active Income (सक्रिय आय) - "Trading Time for Money"
                      </h4>
                      <p className="text-gray-700 mb-3">
                        Money earned by <strong>actively working</strong>. If you stop working, income stops.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Salary/Wages (वेतन):</strong>
                        <p className="text-sm text-gray-600">₹30,000 - ₹5,00,000/month for IT engineers, teachers, doctors, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Business Income (व्यवसाय आय):</strong>
                        <p className="text-sm text-gray-600">Shop owners, freelancers, consultants—income from active work</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Professional Fees (पेशेवर शुल्क):</strong>
                        <p className="text-sm text-gray-600">Doctors, lawyers, CAs charging per consultation/case</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Commission/Incentives (कमीशन):</strong>
                        <p className="text-sm text-gray-600">Real estate agents, insurance agents, sales teams</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Passive Income */}
                <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <PiggyBank className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        🔷 Passive Income (निष्क्रिय आय) - "Money Works for You"
                      </h4>
                      <p className="text-gray-700 mb-3">
                        Money earned <strong>without active daily work</strong>. Your assets generate income even while you sleep!
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <Star className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Interest Income (ब्याज आय):</strong>
                        <p className="text-sm text-gray-600">FD @ 7%: ₹10L → ₹70,000/year; Savings Account @ 3%: ₹5L → ₹15,000/year</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <Star className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Dividend Income (लाभांश):</strong>
                        <p className="text-sm text-gray-600">₹5L in stocks → ₹15,000 - ₹25,000/year dividend (varies by company)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <Star className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Rental Income (किराया आय):</strong>
                        <p className="text-sm text-gray-600">2BHK flat in Mumbai → ₹30,000 - ₹50,000/month rent</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <Star className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Capital Gains (पूंजीगत लाभ):</strong>
                        <p className="text-sm text-gray-600">Sold mutual funds: Bought @ ₹2L, Sold @ ₹3L = ₹1L capital gain</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <Star className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900">Royalty/License Income (रॉयल्टी):</strong>
                        <p className="text-sm text-gray-600">YouTube creators, authors, photographers earning passive royalties</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Income Calculation Example */}
              <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-6 my-8">
                <h4 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6" />
                  📊 Real Example: Priya's Monthly Income Breakdown
                </h4>
                <div className="bg-white rounded-lg p-5 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold text-gray-700">💼 Salary (Software Engineer):</span>
                    <span className="text-lg font-bold text-green-600">₹80,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold text-gray-700">💻 Freelance Projects (weekends):</span>
                    <span className="text-lg font-bold text-green-600">₹15,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold text-gray-700">📈 Mutual Fund SIP Returns (average):</span>
                    <span className="text-lg font-bold text-green-600">₹3,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold text-gray-700">🏦 FD Interest (₹5L @ 7% p.a.):</span>
                    <span className="text-lg font-bold text-green-600">₹2,900</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-green-100 rounded-lg px-3 mt-2">
                    <span className="font-bold text-gray-900 text-lg">💰 TOTAL MONTHLY INCOME:</span>
                    <span className="text-2xl font-bold text-green-700">₹1,00,900</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic mt-4">
                  <strong>Key Insight:</strong> Priya has <strong>79% active income</strong> (₹95,000 from salary + freelance) and 
                  <strong>21% passive income</strong> (₹5,900 from investments). Goal: Increase passive income to 40% in 5 years!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Understanding Expenses */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wallet className="w-8 h-8 text-red-600" />
              3. Understanding Expenses (खर्चों को समझना)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Expenses are <strong>money going out</strong>. The #1 rule of wealth creation: <span className="bg-yellow-200 px-2 py-1 rounded font-bold">
                Income must be greater than Expenses</span>. Simple, but 68% of Indians fail at this!
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 italic">
                <strong>Hindi में:</strong> खर्च वह <strong>पैसा है जो बाहर जाता है</strong>। धन सृजन का पहला नियम: 
                <span className="bg-yellow-200 px-2 py-1 rounded font-bold ml-1">आय खर्च से अधिक होनी चाहिए</span>। सरल है, लेकिन 68% भारतीय इसमें असफल होते हैं!
              </p>

              {/* Expense Categories */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-red-900 mb-6">🏷️ 3 Categories of Expenses:</h3>

                {/* Needs */}
                <div className="bg-white rounded-lg p-6 mb-4 border-2 border-red-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Home className="w-6 h-6 text-red-700" />
                    </div>
                    <h4 className="text-xl font-bold text-red-900">
                      1️⃣ NEEDS (ज़रूरतें) - 50% of Income
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    <strong>Essential expenses</strong> you cannot avoid. Life-critical. Non-negotiable.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      '🏠 Rent/EMI (घर का किराया/EMI): ₹15,000 - ₹40,000',
                      '🍚 Food & Groceries (भोजन): ₹8,000 - ₹15,000',
                      '⚡ Utilities (बिजली, पानी, गैस): ₹3,000 - ₹5,000',
                      '🚗 Transportation (यातायात): ₹3,000 - ₹8,000',
                      '💊 Healthcare, Insurance (स्वास्थ्य): ₹2,000 - ₹5,000',
                      '📚 Children Education (शिक्षा): ₹5,000 - ₹20,000'
                    ].map((need, i) => (
                      <div key={i} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        {need}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wants */}
                <div className="bg-white rounded-lg p-6 mb-4 border-2 border-yellow-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Star className="w-6 h-6 text-yellow-700" />
                    </div>
                    <h4 className="text-xl font-bold text-yellow-900">
                      2️⃣ WANTS (इच्छाएं) - 30% of Income
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    <strong>Discretionary expenses</strong> that improve quality of life but aren't essential. Can be reduced/eliminated.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      '🍕 Dining out, Zomato/Swiggy: ₹5,000 - ₹10,000',
                      '🎬 Entertainment (OTT, movies): ₹1,500 - ₹3,000',
                      '👗 Shopping (clothes, gadgets): ₹5,000 - ₹15,000',
                      '✈️ Vacations, Travel: ₹10,000 - ₹30,000',
                      '☕ Cafe visits, impulse buys: ₹2,000 - ₹5,000',
                      '🎮 Hobbies, subscriptions: ₹2,000 - ₹5,000'
                    ].map((want, i) => (
                      <div key={i} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        {want}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <PiggyBank className="w-6 h-6 text-green-700" />
                    </div>
                    <h4 className="text-xl font-bold text-green-900">
                      3️⃣ SAVINGS & INVESTMENTS (बचत) - 20% of Income
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    <strong>Pay yourself first!</strong> This is NOT what's "left over"—it's a <strong>mandatory expense</strong> 
                    to your future self.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      '🏦 Emergency Fund (FD, Liquid Fund): 10% of income',
                      '📈 SIP in Mutual Funds: 5-10% of income',
                      '🏠 PPF/NPS/Tax-saving investments: 5% of income',
                      '💰 Additional investments (stocks, gold): 5% if possible'
                    ].map((saving, i) => (
                      <div key={i} className="text-sm text-gray-700 bg-gray-50 p-2 rounded flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{saving}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 50-30-20 Rule */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 my-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-7 h-7" />
                  🎯 The Famous 50-30-20 Rule (प्रसिद्ध 50-30-20 नियम)
                </h3>
                <p className="text-lg mb-6 text-white/90">
                  The simplest budgeting framework followed by millions worldwide. Developed by U.S. Senator Elizabeth Warren.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5 text-center">
                    <div className="text-5xl font-bold mb-2">50%</div>
                    <div className="font-semibold text-lg mb-2">NEEDS</div>
                    <div className="text-sm text-white/80">Rent, food, utilities, transport</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5 text-center">
                    <div className="text-5xl font-bold mb-2">30%</div>
                    <div className="font-semibold text-lg mb-2">WANTS</div>
                    <div className="text-sm text-white/80">Entertainment, shopping, dining</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5 text-center">
                    <div className="text-5xl font-bold mb-2">20%</div>
                    <div className="font-semibold text-lg mb-2">SAVINGS</div>
                    <div className="text-sm text-white/80">Emergency fund, SIPs, investments</div>
                  </div>
                </div>
                <p className="text-sm text-white/80 mt-6 italic">
                  💡 Modify for India: If you're just starting out or have high rent (Mumbai, Bangalore), aim for 
                  <strong> 60% needs / 25% wants / 15% savings</strong>, then gradually shift to 50-30-20.
                </p>
              </div>

              {/* Expense Example */}
              <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6 my-8">
                <h4 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6" />
                  📊 Real Example: Amit's Monthly Expenses (₹60,000 income)
                </h4>
                <div className="bg-white rounded-lg p-5">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-red-700">🔴 NEEDS (50% = ₹30,000)</span>
                    </div>
                    <div className="space-y-2 ml-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">🏠 Rent (shared flat, Pune):</span>
                        <span className="font-medium">₹12,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">🍚 Groceries + Food:</span>
                        <span className="font-medium">₹10,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">⚡ Electricity, Water, WiFi:</span>
                        <span className="font-medium">₹3,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">🚌 Local transport (bus, auto):</span>
                        <span className="font-medium">₹2,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">💊 Health insurance premium:</span>
                        <span className="font-medium">₹2,500</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total Needs:</span>
                        <span className="text-red-700">₹30,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-yellow-700">🟡 WANTS (30% = ₹18,000)</span>
                    </div>
                    <div className="space-y-2 ml-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">🍕 Dining out, Swiggy:</span>
                        <span className="font-medium">₹6,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">🎬 Netflix, Amazon Prime, Spotify:</span>
                        <span className="font-medium">₹1,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">👕 Clothes, gadgets, accessories:</span>
                        <span className="font-medium">₹5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">☕ Cafe visits, weekend outings:</span>
                        <span className="font-medium">₹3,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">🎮 Gaming, hobbies:</span>
                        <span className="font-medium">₹2,000</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total Wants:</span>
                        <span className="text-yellow-700">₹18,000</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-green-700">🟢 SAVINGS (20% = ₹12,000)</span>
                    </div>
                    <div className="space-y-2 ml-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">💰 Emergency Fund (Liquid Fund):</span>
                        <span className="font-medium">₹5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">📈 SIP in Index Funds:</span>
                        <span className="font-medium">₹5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">🏦 PPF (tax saving):</span>
                        <span className="font-medium">₹2,000</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total Savings:</span>
                        <span className="text-green-700">₹12,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-green-100 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">💵 TOTAL EXPENSES + SAVINGS:</span>
                      <span className="text-2xl font-bold text-green-700">₹60,000</span>
                    </div>
                    <p className="text-sm text-green-800 mt-2">
                      ✅ <strong>Perfect Balance!</strong> Amit spends within his income and saves 20% every month.
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Expense Mistakes */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl my-8">
                <h4 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  ⚠️ Common Expense Mistakes Indians Make:
                </h4>
                <ul className="space-y-3">
                  {[
                    { mistake: 'Treating "Wants" as "Needs"', example: 'Daily ₹200 Starbucks coffee = ₹72,000/year! Make at home: ₹5,000/year.' },
                    { mistake: 'Lifestyle Inflation', example: 'Salary increases from ₹40K → ₹70K, but expenses also go from ₹35K → ₹65K. No wealth built!' },
                    { mistake: 'Impulse Buying', example: 'Flipkart sale: Buy ₹8,000 shoes you don\'t need because "50% off"' },
                    { mistake: 'No Expense Tracking', example: '₹15,000 spent on "miscellaneous" every month. Where did it go? Unknown!' }
                  ].map((item, i) => (
                    <li key={i} className="bg-white p-3 rounded-lg">
                      <strong className="text-red-700">{i + 1}. {item.mistake}:</strong>
                      <p className="text-sm text-gray-700 mt-1 italic">Example: {item.example}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Section 4: What is Wealth? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              4. What is Wealth? (संपत्ति क्या है?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Wealth is <strong>NOT your salary</strong>. Wealth is <strong>NOT your car or iPhone</strong>. Wealth is:
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-300">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-purple-900 mb-3">
                    Wealth = Assets - Liabilities
                  </h3>
                  <p className="text-xl text-purple-700 italic">
                    संपत्ति = परिसंपत्तियां - देनदारियां
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Assets */}
                  <div className="bg-white rounded-lg p-5 border-2 border-green-200">
                    <h4 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      ASSETS (परिसंपत्तियां) ✅
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">Things you OWN that have VALUE or generate INCOME:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>💰 Cash, Bank Balance (₹50,000)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>🏦 Fixed Deposits (₹3,00,000)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>📈 Stocks, Mutual Funds (₹5,00,000)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>🏠 Property, Real Estate (₹50,00,000)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>🚗 Vehicles (resale value: ₹4,00,000)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>💎 Gold, Jewelry (₹2,00,000)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Liabilities */}
                  <div className="bg-white rounded-lg p-5 border-2 border-red-200">
                    <h4 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      LIABILITIES (देनदारियां) ❌
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">Money you OWE to others (debts):</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">✗</span>
                        <span>🏠 Home Loan (outstanding: ₹25,00,000)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">✗</span>
                        <span>🚗 Car Loan (outstanding: ₹3,50,000)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">✗</span>
                        <span>💳 Credit Card Debt (₹50,000)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">✗</span>
                        <span>📱 Personal Loan (₹2,00,000)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600">✗</span>
                        <span>👨 Money borrowed from friends/family (₹1,00,000)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Net Worth Calculation */}
                <div className="bg-white rounded-lg p-6 mt-6 border-2 border-purple-300">
                  <h4 className="text-lg font-bold text-purple-900 mb-4">📐 Calculate Net Worth (नेट वर्थ की गणना):</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">Total Assets (कुल परिसंपत्तियां):</span>
                      <span className="font-bold text-green-700 text-lg">₹65,50,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-700">Total Liabilities (कुल देनदारियां):</span>
                      <span className="font-bold text-red-700 text-lg">- ₹32,00,000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-purple-100 rounded-lg px-3">
                      <span className="font-bold text-gray-900 text-xl">NET WORTH (नेट वर्थ):</span>
                      <span className="font-bold text-purple-700 text-2xl">₹33,50,000</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 italic">
                    💡 This person's actual wealth is ₹33.5 lakh—not their ₹50L home or ₹60K salary. 
                    <strong> Wealth = What you own minus what you owe.</strong>
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Interactive Calculator CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-2xl">
              <Calculator className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">
                🧮 Calculate Your Net Worth Now!
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Use our free Net Worth Calculator to see your actual wealth (अपनी वास्तविक संपत्ति देखें)
              </p>
              <Link
                to="/calculators/net-worth"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <Calculator className="w-6 h-6" />
                Open Net Worth Calculator
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.section>

          {/* Section 5: The Wealth Creation Formula */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
              5. The Wealth Creation Formula (धन सृजन सूत्र)
            </h2>

            <div className="prose max-w-none">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8 mb-6 text-center">
                <h3 className="text-3xl font-bold mb-4">
                  The Universal Wealth Formula:
                </h3>
                <div className="text-5xl font-bold mb-2">
                  Income - Expenses = Savings
                </div>
                <div className="text-2xl italic mb-4">
                  Savings × Time × Returns = Wealth
                </div>
                <p className="text-lg text-white/90">
                  <strong>Hindi में:</strong> आय - खर्च = बचत<br />
                  बचत × समय × रिटर्न = संपत्ति
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Let's break this down with a <strong>10-year real example</strong> of two friends from the same college:
              </p>

              {/* Comparison Example */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Person A - Saves */}
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
                  <h4 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Rahul (Smart Saver)
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white p-3 rounded-lg">
                      <strong>Monthly Income:</strong> ₹60,000
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <strong>Monthly Expenses:</strong> ₹48,000 (80%)
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <strong>Monthly Savings:</strong> ₹12,000 (20%)
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <strong>Investment:</strong> SIP in Nifty 50 Index Fund @ 12% p.a.
                    </div>
                    <div className="bg-green-200 p-4 rounded-lg mt-4">
                      <strong className="text-lg">After 10 years:</strong>
                      <div className="text-3xl font-bold text-green-700 mt-2">₹27,48,000</div>
                      <p className="text-xs text-green-800 mt-1">
                        (₹14.4L invested + ₹13.08L returns)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Person B - Doesn't Save */}
                <div className="bg-red-50 rounded-xl p-6 border-2 border-red-300">
                  <h4 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    Vikram (Overspender)
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white p-3 rounded-lg">
                      <strong>Monthly Income:</strong> ₹60,000
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <strong>Monthly Expenses:</strong> ₹59,000 (98%)
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <strong>Monthly Savings:</strong> ₹1,000 (2%)
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <strong>Investment:</strong> Savings Account @ 3% p.a. (rarely adds money)
                    </div>
                    <div className="bg-red-200 p-4 rounded-lg mt-4">
                      <strong className="text-lg">After 10 years:</strong>
                      <div className="text-3xl font-bold text-red-700 mt-2">₹1,39,000</div>
                      <p className="text-xs text-red-800 mt-1">
                        (₹1.2L saved + ₹19K interest)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-bold text-yellow-900 mb-3">
                  🎯 The Shocking Difference:
                </h4>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Both earned <strong>₹72 lakh over 10 years</strong> (₹60K × 120 months). But:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-800">
                      <strong>Rahul has ₹27.48 lakh</strong> — can buy a 2BHK flat (down payment) or fund retirement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 text-xl">✗</span>
                    <span className="text-gray-800">
                      <strong>Vikram has ₹1.39 lakh</strong> — barely covers 2 months' expenses in an emergency
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-gray-700 mt-4 italic border-t border-yellow-300 pt-4">
                  💡 <strong>Key Lesson:</strong> The difference wasn't intelligence or luck—it was <strong>saving ₹11,000 more per month</strong> 
                  (skipping unnecessary wants) and <strong>investing it wisely</strong>. Same income, drastically different wealth!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 6: Indian Context - Rupee Denominations */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Globe className="w-8 h-8 text-orange-600" />
              6. Money in Indian Context (भारतीय संदर्भ में पैसा)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In India, we use the <strong>Indian Rupee (₹)</strong> as our currency, managed by the Reserve Bank of India (RBI). 
                Understanding denominations and their purchasing power helps with budgeting.
              </p>

              {/* Purchasing Power Guide */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-bold text-orange-900 mb-4">
                  💵 What Can You Buy with Different Amounts? (2025 Prices)
                </h4>
                <div className="space-y-3">
                  {[
                    { amount: '₹100', items: '2 chai + samosa, 2 kg potatoes, local bus ride (10 km)' },
                    { amount: '₹500', items: '1 month mobile recharge, 5 kg rice, 1 lunch at decent restaurant' },
                    { amount: '₹1,000', items: '1 month basic groceries (single person), OTT subscription (Netflix), ₹50K term insurance premium' },
                    { amount: '₹5,000', items: 'Monthly SIP (start wealth building!), electricity bill (3BHK), 1 shirt from branded store' },
                    { amount: '₹10,000', items: 'Emergency fund monthly contribution, basic smartphone, 1 month cooking gas + groceries (family of 4)' },
                    { amount: '₹50,000', items: '2-3 months emergency fund, down payment for bike, 1 month rent (2BHK Bangalore)' },
                    { amount: '₹1,00,000', items: '6 months emergency fund (₹15K expenses), laptop, AC, mutual fund lumpsum investment' },
                    { amount: '₹10,00,000', items: 'Down payment for ₹40L flat, start index fund portfolio, education/emergency fund' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg flex gap-3">
                      <span className="text-3xl font-bold text-orange-600 flex-shrink-0">{item.amount}</span>
                      <div className="flex-1">
                        <div className="text-sm text-gray-700">{item.items}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inflation Impact */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6">
                <h4 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  ⚠️ Inflation: The Silent Wealth Killer (मुद्रास्फीति)
                </h4>
                <p className="text-gray-800 mb-4">
                  Money <strong>loses value over time</strong> due to inflation. In India, average inflation is <strong>5-6% per year</strong>.
                </p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <strong className="text-red-700">Example:</strong>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    <li>• ₹1,00,000 today = <strong>₹95,000 purchasing power</strong> in 1 year @ 5% inflation</li>
                    <li>• ₹1,00,000 today = <strong>₹74,000 purchasing power</strong> in 5 years</li>
                    <li>• ₹1,00,000 today = <strong>₹55,000 purchasing power</strong> in 10 years</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-700 italic">
                  💡 <strong>Solution:</strong> Don't just save—<strong>INVEST</strong> at returns higher than inflation (8%+ in equity, 
                  12%+ in SIP). Use our <Link to="/calculators/inflation-calculator" className="text-blue-600 hover:underline font-semibold">Inflation Calculator</Link> to see the impact.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Quick Quiz */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
              <Award className="w-7 h-7" />
              📝 Quick Quiz (त्वरित प्रश्नोत्तरी)
            </h2>

            <div className="bg-white rounded-xl p-6 mb-4">
              <p className="text-lg font-semibold text-gray-900 mb-4">
                Q: If Suman earns ₹70,000/month, spends ₹55,000, and saves ₹15,000 in a SIP that grows at 12% p.a., 
                what will be her wealth after 5 years?
              </p>
              <div className="space-y-2 mb-4">
                {['A) ₹9,00,000', 'B) ₹11,61,000', 'C) ₹15,00,000', 'D) ₹20,00,000'].map((option, i) => (
                  <button
                    key={i}
                    onClick={() => { setQuizAnswer(option); setShowAnswer(true); }}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      quizAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {showAnswer && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="font-bold text-green-900 mb-2">
                    ✅ Correct Answer: B) ₹11,61,000
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Calculation:</strong> ₹15,000/month SIP for 60 months @ 12% p.a. = ₹11,61,000 
                    (₹9L invested + ₹2.61L returns from compounding). 
                    <Link to="/calculators/sip-calculator" className="text-blue-600 hover:underline ml-1">
                      Try SIP Calculator →
                    </Link>
                  </p>
                </div>
              )}
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
                'Money has 4 functions: Medium of exchange, unit of account, store of value, deferred payment standard',
                'Income = Active (salary, business) + Passive (interest, dividends, rent)',
                'Expenses = Needs (50%) + Wants (30%) + Savings (20%) — follow 50-30-20 rule',
                'Wealth = Assets - Liabilities. Focus on building assets, reducing liabilities',
                'Wealth Formula: (Income - Expenses) × Time × Returns = Long-term Wealth',
                'Inflation erodes money value by 5-6% annually. Invest, don\'t just save!',
                'Calculate your net worth quarterly. Track it. Grow it deliberately.'
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
              🧮 Practice with Free Calculators (मुफ्त कैलकुलेटर के साथ अभ्यास करें)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Net Worth Calculator', link: '/calculators/net-worth', icon: '💰', desc: 'Calculate your actual wealth' },
                { name: 'Income Tax Calculator', link: '/calculators/income-tax', icon: '💼', desc: 'See your take-home income' },
                { name: 'Budget Planner', link: '/calculators/budget-planner', icon: '📊', desc: 'Plan your 50-30-20 budget' },
                { name: 'SIP Calculator', link: '/calculators/sip-calculator', icon: '📈', desc: 'See wealth after 10 years' },
                { name: 'Emergency Fund Calculator', link: '/calculators/emergency-fund', icon: '🏦', desc: 'How much to save?' },
                { name: 'Inflation Calculator', link: '/calculators/inflation-calculator', icon: '📉', desc: 'Future value of money' }
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
                Now that you understand money, income, expenses, and wealth, let's learn how to set powerful financial goals!
              </p>
              <Link
                to="/learn/money-management/setting-financial-goals-short-medium-long-term"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                Next: Setting Financial Goals
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.section>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600">
            <p>
              <strong>Disclaimer:</strong> This content is for educational purposes only and does not constitute financial advice. 
              Examples use hypothetical scenarios and average returns. Actual results may vary. Consult a certified financial advisor 
              for personalized guidance. MoneyCal is not responsible for any financial decisions made based on this content.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIsMoney;

