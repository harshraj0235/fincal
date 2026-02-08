import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowRight, ArrowLeft, Zap, Target, CheckCircle, 
  XCircle, Lightbulb, Calendar, Clock, Award, TrendingUp,
  Repeat, Bell, DollarSign, Shield, Brain, Heart, Activity,
  Settings, Smartphone, CreditCard, PiggyBank, Sparkles, AlertTriangle
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

/**
 * LESSON 6: Building Good Financial Habits - Daily Discipline
 * Category: Money Management & Budgeting
 * Duration: 40 minutes
 * Difficulty: Beginner
 * 
 * Learning Objectives:
 * 1. Understand why habits beat willpower every time
 * 2. Learn the "Pay Yourself First" principle
 * 3. Master automation for savings, investments, bills
 * 4. Build micro-habits that create wealth over decades
 * 5. Break bad money habits (impulse spending, credit card debt)
 */

const FinancialHabits: React.FC = () => {
  const [selectedHabit, setSelectedHabit] = useState<number | null>(null);

  const goodHabits = [
    {
      id: 1,
      title: 'Pay Yourself First (Auto-Save)',
      titleHindi: 'पहले खुद को भुगतान करें',
      description: 'Transfer 20-30% to savings/investments on salary day BEFORE spending anything',
      impact: 'High',
      difficulty: 'Easy',
      timeToForm: '21 days',
      example: 'Salary ₹60K → Auto-transfer ₹12K to SIP + liquid fund on 1st of month',
      howTo: [
        'Set up auto-debit SIP for ₹10K on salary date',
        'Auto-transfer ₹5K to separate savings account',
        'Live on remaining ₹45K for the month',
        'NEVER touch the "paid yourself" money'
      ]
    },
    {
      id: 2,
      title: 'Track Every Rupee for 30 Days',
      titleHindi: 'हर रुपये को ट्रैक करें',
      description: 'Write down EVERY expense (even ₹10 chai) for 1 month to find leaks',
      impact: 'High',
      difficulty: 'Medium',
      timeToForm: '30 days',
      example: 'Found ₹8K/month waste on food delivery, ₹3K on unused subscriptions',
      howTo: [
        'Use Money Manager or Walnut app',
        'Or simple notebook - write every night',
        'Categorize: Needs, Wants, Savings',
        'Review weekly to spot patterns'
      ]
    },
    {
      id: 3,
      title: '24-Hour Rule for Big Purchases',
      titleHindi: '24 घंटे का नियम',
      description: 'Wait 24 hours before buying anything over ₹2,000 (kills impulse buying)',
      impact: 'High',
      difficulty: 'Medium',
      timeToForm: '14 days',
      example: 'Wanted iPhone 15 (₹80K) → waited 24 hours → realized current phone works fine',
      howTo: [
        'See something expensive? Add to cart but DON\'T buy',
        'Sleep on it for 24 hours',
        'Next day, ask: "Do I still need it?"',
        '70% of time, you won\'t buy it!'
      ]
    },
    {
      id: 4,
      title: 'Monthly Money Review (1 Hour)',
      titleHindi: 'मासिक धन समीक्षा',
      description: 'Spend 1 hour every month reviewing expenses, savings, investments',
      impact: 'Medium',
      difficulty: 'Easy',
      timeToForm: '7 days',
      example: 'Found spent ₹15K dining out (budgeted ₹8K) → cut back next month',
      howTo: [
        'Set calendar reminder: 1st Sunday of month',
        'Check bank statements, credit card bills',
        'Compare actual vs budgeted spending',
        'Adjust next month\'s budget accordingly'
      ]
    },
    {
      id: 5,
      title: 'No Credit Card Interest Ever',
      titleHindi: 'कभी भी ब्याज न दें',
      description: 'Pay credit card FULL balance every month before due date (0% interest)',
      impact: 'High',
      difficulty: 'Easy',
      timeToForm: '7 days',
      example: 'Saved ₹36,000/year by paying full balance (avoided 36% APR)',
      howTo: [
        'Set auto-pay for FULL amount (not minimum)',
        'Or set reminder 3 days before due date',
        'If can\'t pay full → STOP using card',
        'Credit card is payment tool, NOT loan!'
      ]
    },
    {
      id: 6,
      title: 'Cook at Home 5 Days/Week',
      titleHindi: 'घर पर खाना बनाएं',
      description: 'Reduce Zomato/Swiggy orders from 15/month to 5/month (save ₹6K)',
      impact: 'Medium',
      difficulty: 'Hard',
      timeToForm: '30 days',
      example: 'Was spending ₹9K/month ordering → now ₹3K → saving ₹6K monthly',
      howTo: [
        'Meal prep on Sunday (dal, rice, sabzi)',
        'Order only on weekends/Friday',
        'Keep simple ingredients always stocked',
        'Calculate savings: ₹300/order × 10 avoided = ₹3K!'
      ]
    }
  ];

  const badHabits = [
    {
      id: 1,
      habit: 'Impulse Shopping (Online/Offline)',
      habitHindi: 'आवेगपूर्ण खरीदारी',
      damage: "Wastes ₹5K-15K/month on things you don't need",
      howToBreak: [
        'Uninstall shopping apps (Flipkart, Myntra)',
        'Unsubscribe from promotional emails',
        'Use 24-hour rule for purchases > ₹2K',
        'Ask: "Do I NEED it or just WANT it?"'
      ]
    },
    {
      id: 2,
      habit: 'Paying Only Credit Card Minimum',
      habitHindi: 'केवल न्यूनतम भुगतान',
      damage: 'Costs ₹30K-50K/year in interest (36% APR on ₹1L balance)',
      howToBreak: [
        'Set auto-pay for FULL amount',
        'Stop using card till balance = ₹0',
        'Pay more than minimum every month',
        'Consider balance transfer to lower rate'
      ]
    },
    {
      id: 3,
      habit: 'No Emergency Fund (Living Paycheck-to-Paycheck)',
      habitHindi: 'आपातकालीन फंड नहीं',
      damage: 'One emergency = debt spiral (medical, job loss)',
      howToBreak: [
        'Start with ₹10K mini emergency fund',
        'Auto-save ₹5K/month to separate account',
        'Build to 6 months expenses gradually',
        'NEVER touch it unless real emergency'
      ]
    },
    {
      id: 4,
      habit: 'Lifestyle Inflation (Upgrading with Every Raise)',
      habitHindi: 'जीवनशैली मुद्रास्फीति',
      damage: 'Salary ₹40K→₹60K, but savings stay same (₹5K) - wasted opportunity',
      howToBreak: [
        'When salary increases, increase savings FIRST',
        'Got ₹10K raise? Save ₹7K, spend ₹3K extra',
        'Keep lifestyle constant for 6 months',
        'Resist upgrading car, rent, gadgets immediately'
      ]
    },
    {
      id: 5,
      habit: 'Not Tracking Expenses',
      habitHindi: 'खर्चों को ट्रैक नहीं करना',
      damage: `Lose ₹8K-12K/month to "invisible" expenses (don't know where money goes)`,
      howToBreak: [
        'Use Money Manager or Walnut app (SMS auto-tracking)',
        'Or simple notebook - write daily',
        'Track for 30 days to find leaks',
        'Continue tracking top 3 expense categories'
      ]
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Building Good Financial Habits: Pay Yourself First | MoneyCal Learn"
        description="Master wealth-building habits in Hindi & English. Learn automation, pay yourself first, break bad habits. 21-day habit formation guide with Indian examples."
        keywords="financial habits India, pay yourself first, automation savings, break bad habits, impulse spending control, money discipline Hindi, वित्तीय आदतें"
        url="/learn/money-management/building-good-financial-habits-daily"
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/money-management" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Money Management</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 6 of 8</span>
                <Link 
                  to="/learn/money-management/reviewing-adjusting-budget-monthly-quarterly-annual"
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                  Lesson 6 • 40 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Building Good Financial Habits
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  वित्तीय आदतें बनाना - दैनिक अनुशासन जो धन बनाता है
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <Sparkles className="w-12 h-12 flex-shrink-0" />
                <div>
                  <p className="text-2xl font-bold mb-2">
                    "You don't rise to your goals. You fall to your habits."
                  </p>
                  <p className="text-lg text-white/90">
                    – James Clear, Atomic Habits
                  </p>
                  <p className="text-white/80 mt-3 italic">
                    <strong>Hindi:</strong> आप अपने लक्ष्यों तक नहीं पहुंचते। आप अपनी आदतों के स्तर तक गिरते हैं।
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
                  'Why habits beat willpower: 95% of wealth-building is automated habits',
                  'Master "Pay Yourself First" - the #1 wealth-building habit',
                  'Set up automation for savings, investments, and bills',
                  'Build 6 micro-habits that create millionaire mindset',
                  'Break 5 bad money habits that destroy wealth'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Section 1: Why Habits Beat Willpower */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-600" />
              1. Why Habits Beat Willpower (आदतें क्यों जीतती हैं?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Most people think wealth-building requires <strong>willpower</strong> and <strong>discipline</strong> every day. 
                Wrong! The rich don't have more willpower—they have <strong>better habits</strong> that run on autopilot.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-red-900 mb-4">❌ Willpower-Based (Fails)</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span><strong>End of month:</strong> "Let me see if I have money left to save." (Usually ₹0 left!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Impulse:</strong> "iPhone on sale! I'll buy now, save next month." (Never saves)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Motivation:</strong> Relies on feeling motivated daily (exhausting!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Result:</strong> Saves 5% of income (₹3K on ₹60K salary). Poor in 30 years.</span>
                    </li>
                  </ul>
                  <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-900 text-sm">
                    <strong>10-Year Outcome:</strong> ₹3K/month savings × 12 months × 10 years = ₹3.6L only (no compounding)
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-green-900 mb-4">✅ Habit-Based (Wins)</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Salary day:</strong> Auto-debit ₹12K to SIP BEFORE you see money (automated!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Impulse:</strong> "24-hour rule" habit kicks in automatically (no temptation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Motivation:</strong> Doesn't need daily motivation—it's automatic!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Result:</strong> Saves 20% of income (₹12K on ₹60K). Wealthy in 30 years.</span>
                    </li>
                  </ul>
                  <div className="bg-green-100 p-3 rounded-lg mt-4 text-green-900 text-sm">
                    <strong>10-Year Outcome:</strong> ₹12K/month SIP @ 12% = <strong>₹27.6L</strong> (power of compounding!)
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                <strong className="text-yellow-900">💡 Key Insight:</strong>
                <p className="text-gray-700 mt-2">
                  <strong>Habits = Automated Willpower.</strong> Once a habit forms (21-30 days), it runs on autopilot. 
                  You don't "decide" to brush teeth daily—you just do it. Same with saving/investing!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 2: 6 Good Financial Habits */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-green-600" />
              2. 6 Financial Habits to Build Now (6 आदतें अभी बनाएं)
            </h2>

            <div className="space-y-6">
              {goodHabits.map((habit, index) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                          {habit.id}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-green-900">{habit.title}</h4>
                          <p className="text-green-700 text-sm">{habit.titleHindi}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        habit.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {habit.impact} Impact
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        habit.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                        habit.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {habit.difficulty}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{habit.description}</p>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4" />
                      <strong>Time to Form:</strong> {habit.timeToForm}
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg mb-3">
                      <strong className="text-blue-900 block mb-1">📌 Example:</strong>
                      <p className="text-sm text-blue-800">{habit.example}</p>
                    </div>
                    <div>
                      <strong className="text-green-800 block mb-2">✅ How to Build This Habit:</strong>
                      <ol className="space-y-1 ml-5 text-sm text-gray-700">
                        {habit.howTo.map((step, i) => (
                          <li key={i} className="list-decimal">{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedHabit(selectedHabit === habit.id ? null : habit.id)}
                    className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors"
                  >
                    {selectedHabit === habit.id ? 'Hide Details ▲' : 'Show More Details ▼'}
                  </button>

                  {selectedHabit === habit.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 bg-green-100 p-4 rounded-lg"
                    >
                      <strong className="text-green-900 block mb-2">💪 Implementation Tips:</strong>
                      <ul className="space-y-1 text-sm text-green-900">
                        <li>• Start TOMORROW (don't wait for "perfect" time)</li>
                        <li>• Track daily for first 21 days (use habit tracker app)</li>
                        <li>• If you miss 1 day, get back immediately next day</li>
                        <li>• Reward yourself after 30 days of consistency</li>
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section 3: Breaking Bad Habits */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-600" />
              3. Breaking 5 Bad Money Habits (बुरी आदतें तोड़ें)
            </h2>

            <div className="space-y-6">
              {badHabits.map((bad, index) => (
                <motion.div
                  key={bad.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-red-50 rounded-xl p-6 border-2 border-red-300"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {bad.id}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-red-900 mb-1">{bad.habit}</h4>
                      <p className="text-red-700 text-sm">{bad.habitHindi}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-red-800 block">💸 Financial Damage:</strong>
                        <p className="text-sm text-gray-700">{bad.damage}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <strong className="text-green-900 block mb-2">✅ How to Break This Habit:</strong>
                    <ol className="space-y-2 ml-5 text-sm text-gray-700">
                      {bad.howToBreak.map((step, i) => (
                        <li key={i} className="list-decimal">{step}</li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section 4: 21-Day Habit Challenge */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              🎯 21-Day Financial Habit Challenge
            </h2>

            <p className="text-xl mb-6 text-white/90">
              Pick ONE habit from above. Commit for 21 days. Track daily. Transform your finances!
            </p>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
              <h4 className="text-xl font-bold mb-4">📅 Daily Tracker Template:</h4>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(21)].map((_, i) => (
                  <div key={i} className="bg-white/30 rounded-lg p-3 text-center">
                    <div className="font-bold text-lg mb-1">Day {i + 1}</div>
                    <div className="text-xs">☐</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-xl p-6">
              <strong className="block mb-3">💪 Success Rules:</strong>
              <ul className="space-y-2 text-sm">
                <li>✅ Do it EVERY day for 21 days (no skips!)</li>
                <li>✅ Track in notebook or habit app (Habitica, Loop)</li>
                <li>✅ If you miss 1 day, restart from Day 1</li>
                <li>✅ After 21 days, it becomes automatic</li>
                <li>✅ Reward yourself on Day 22 (dinner out, movie)</li>
              </ul>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Key Takeaways (मुख्य बातें)
            </h2>
            <div className="space-y-4">
              {[
                'Habits beat willpower: 95% of wealth-building is automated, not motivated daily',
                'Pay Yourself First = #1 habit. Auto-save 20-30% on salary day BEFORE spending',
                'Automation is king: Set up auto-debit SIPs, auto-pay bills, auto-transfer savings',
                '24-Hour Rule kills impulse buying: Wait 24 hours for purchases > ₹2K (saves ₹50K/year)',
                'Track every rupee for 30 days: Find ₹8K-12K monthly leaks you didn\'t know existed',
                'NEVER pay credit card interest: Auto-pay FULL balance every month (saves ₹36K/year)',
                'Small habits = big wealth: ₹500/day saved = ₹1.8L/year = ₹36L in 20 years (compounded)',
                'Break 1 bad habit first: Easier than building 5 good habits. Start with impulse spending.',
                '21-Day Challenge: Pick ONE habit, track daily, no skips. After 21 days = automatic!',
                'Habit formation: Days 1-7 hard → Days 8-14 easier → Days 15-21 automatic → Day 22+ effortless'
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
              🧮 Track Your Habits (मुफ्त कैलकुलेटर)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'SIP Calculator', link: '/calculators/sip-calculator', icon: '📈', desc: 'Calculate auto-investment returns' },
                { name: 'Savings Goal Planner', link: '/calculators/savings-goal', icon: '🎯', desc: 'Plan your savings targets' },
                { name: 'Budget Tracker', link: '/calculators/budget-calculator', icon: '💰', desc: 'Track monthly spending' }
              ].map((calc, i) => (
                <Link
                  key={i}
                  to={calc.link}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-orange-500 hover:shadow-2xl transition-all group"
                >
                  <div className="text-4xl mb-3">{calc.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {calc.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{calc.desc}</p>
                  <div className="flex items-center text-orange-600 font-semibold text-sm">
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
                Now that you've built good habits, learn how to review and adjust your budget monthly to stay on track!
              </p>
              <Link
                to="/learn/money-management/reviewing-adjusting-budget-monthly-quarterly-annual"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                Next: Reviewing & Adjusting Budget
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.section>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600">
            <p>
              <strong>Disclaimer:</strong> Habit formation timelines vary by individual. 21 days is average; some habits take 66 days. 
              Consult a behavioral coach or financial planner for personalized habit-building strategies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialHabits;

