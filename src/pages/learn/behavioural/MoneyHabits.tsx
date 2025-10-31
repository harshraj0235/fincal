import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Zap, CheckCircle, Target, AlertTriangle,
  Lightbulb, TrendingUp, Clock, Award, Shield, DollarSign,
  Calendar, Coffee, ShoppingCart, Smartphone, X
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const MoneyHabits: React.FC = () => {
  const [showImpact, setShowImpact] = useState(false);
  
  // Calculate 1% daily improvement impact
  const onePercentDaily = Math.pow(1.01, 365);
  
  // Calculate coffee money invested
  const dailyCoffee = 150;
  const monthlyInvestment = dailyCoffee * 30;
  const years = 10;
  const coffeeWealth = monthlyInvestment * (((Math.pow(1 + 0.12/12, years * 12) - 1) / (0.12/12)) * (1 + 0.12/12));

  return (
    <>
      <SEOHelmet 
        title="Money Habits: Discipline Delayed Gratification Compound Effect India 2025 | MoneyCal" 
        description="Build wealth habits in Hindi & English. Pay yourself first, automate savings, delayed gratification, compound effect of small daily actions, 1% improvement daily = 37x in year." 
        keywords="money habits India, discipline, delayed gratification, compound effect, pay yourself first, automate savings, 1% improvement, धन आदतें अनुशासन" 
        url="/learn/behavioural-finance-money-psychology/money-habits-discipline-delayed-gratification-compound-effect-india-2025" 
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/behavioural-finance-money-psychology" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Behavioural Finance & Psychology</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 4 of 7</span>
                <Link 
                  to="/learn/behavioural-finance-money-psychology/wealth-building-strategies-get-rich-slow-consistency-patience-india-2025"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  Lesson 4 • 50 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Money Habits: Small Actions, Big Wealth!
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  धन आदतें: 1% बेहतर हर दिन = 37× साल में!
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  'Master "Pay Yourself First" rule (save 20-30% before spending)',
                  'Automate savings (SIP, RD, PPF auto-debit - remove willpower dependency)',
                  'Practice delayed gratification (wait 6 months, double your purchasing power)',
                  'Understand 1% daily improvement = 37x improvement in 1 year',
                  'Break bad money habits (impulse buying, lifestyle inflation, FOMO)',
                  'Build wealth habits that compound over decades'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Compound Effect Visualization */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6">
              🚀 The 1% Daily Improvement Formula
            </h2>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
              <p className="text-white text-lg mb-4">
                <strong>Mathematical Magic:</strong> If you improve apenas 1% every single day for 1 year:
              </p>
              <div className="bg-white rounded-lg p-6 text-gray-900">
                <p className="text-2xl font-bold mb-3">1.01 <sup>365</sup> = {onePercentDaily.toFixed(2)}</p>
                <p className="text-lg">
                  You become <strong className="text-purple-700">{onePercentDaily.toFixed(1)}× better</strong> in just 365 days!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                <strong className="block mb-3">✅ Positive 1% Daily:</strong>
                <ul className="space-y-2 text-sm">
                  <li>• Read 10 pages/day = 12 books/year = expert in field</li>
                  <li>• Save ₹150/day = ₹4,500/month = ₹54K/year = ₹11L in 10Y @ 12%</li>
                  <li>• Walk 2,000 steps daily = fit in 6 months</li>
                  <li>• Learn 5 new words/day = fluent in 1 year</li>
                </ul>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                <strong className="block mb-3">❌ Negative 1% Daily:</strong>
                <ul className="space-y-2 text-sm">
                  <li>• Skip gym 1 day → becomes habit → unfit in 6 months</li>
                  <li>• Spend ₹150 extra daily = ₹4.5K waste/month = ₹54K/year loss</li>
                  <li>• 1 cigarette/day → addict in 6 months</li>
                  <li>• Netflix binge 1 hour → 15 days wasted in year</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>Key Insight:</strong> Small daily actions (positive or negative) compound over time. 
                1% better daily seems nothing TODAY pero makes you 37× better in 1 YEAR! 
                <strong> Your habits today shape your wealth tomorrow.</strong>
              </p>
            </div>
          </motion.section>

          {/* 7 Wealth-Building Habits */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💪 7 Habits of Wealthy Indians
            </h2>

            <div className="space-y-6">
              {[
                {
                  habit: 'Pay Yourself First',
                  description: 'Salary arrives → Transfer 20-30% to investment account FIRST. Then spend rest.',
                  bad: 'Spend first, save leftover (there\'s NEVER leftover!)',
                  example: '₹50K salary → ₹10K auto-transfer to mutual fund on 1st itself. Spend remaining ₹40K. No temptation.',
                  impact: 'Guarantees saving. Over 20 years: ₹24L invested = ₹1 crore wealth @ 12%!',
                  color: 'green'
                },
                {
                  habit: 'Automate Everything',
                  description: 'Set up auto-SIP, auto-bill payments, auto-PPF deposit. Remove decision fatigue.',
                  bad: 'Manual transfers (forget, delay, skip months). Discipline fails over time.',
                  example: 'SIP on 5th auto-debit, electricity on 10th, credit card on 25th. Zero mental effort.',
                  impact: 'Never miss investments. Consistency beats intensity. Auto-pilot wealth building.',
                  color: 'blue'
                },
                {
                  habit: 'Delayed Gratification (The Marshmallow Test)',
                  description: 'Want iPhone? Wait 6 months. Invest ₹10K/month meanwhile. After 6 months: Buy iPhone + have ₹60K invested!',
                  bad: 'Buy immediately on EMI. Pay ₹12K/month for 12 months = ₹1.44L for ₹70K phone (₹74K interest waste!)',
                  example: 'Rohit delayed Playstation purchase 6 months. Saved ₹6K/month. Bought PS5 in July + had ₹36K invested. Felt better!',
                  impact: 'Double benefit: Get thing you want + build wealth. Delayed ≠ Denied. Delayed = Doubled!',
                  color: 'yellow'
                },
                {
                  habit: 'Track Every Rupee (1 Month Experiment)',
                  description: 'Track ALL expenses for 30 days. Every coffee, Uber ride, Swiggy order. Write in notebook or use app.',
                  bad: 'No tracking. "Where did my salary go?" Shock at month end when apenas ₹2K left.',
                  example: 'Priya tracked 30 days: ₹5.5K on Swiggy! ₹3K on unused subscriptions (Netflix, Prime, Hotstar all 3!). Canceled 2 = ₹24K saved/year.',
                  impact: `Awareness creates change. Can't manage what you don't measure. 1 month tracking changes lifetime habits.`,
                  color: 'orange'
                },
                {
                  habit: '50/30/20 Rule (Simple Budget)',
                  description: '50% on needs (rent, food, bills), 30% on wants (movies, dining), 20% on savings/investments.',
                  bad: 'No budget. 80% on wants, 15% needs, 5% savings (if anything left!)',
                  example: '₹50K salary: ₹25K needs + ₹15K wants + ₹10K savings. Sustainable. Guilt-free spending in wants category.',
                  impact: 'Simple rule, works for everyone (₹20K salary to ₹5L salary). Balances present enjoyment + future wealth.',
                  color: 'purple'
                },
                {
                  habit: 'No-Spend Days/Weeks',
                  description: 'Challenge: 1 week per month = zero non-essential spending. Apenas groceries, bills. No Swiggy, shopping, movies.',
                  bad: 'Spend daily. ₹200 here, ₹500 there. Adds to ₹10-15K/month on "small" purchases.',
                  example: 'Amit did no-spend weeks. Saved ₹6-8K per no-spend week. 1 week/month = ₹72K-96K saved/year! Used for vacation (guilt-free!).',
                  impact: 'Breaks spending addiction. Realizes 80% spending is impulsive, not needed. Saves lakhs annually.',
                  color: 'red'
                },
                {
                  habit: 'Rich Friends, Rich You (Social Circle)',
                  description: 'Your income = average of 5 closest friends. Surround yourself with ambitious, wealth-building people.',
                  bad: 'Friends who say "Money is evil", "Investing is risky", "Live for today!". Pull you down.',
                  example: 'Neha joined investment club at work. Friends discussed SIPs, stocks, tax-saving. Within 2 years, she became financially literate + started ₹15K SIP.',
                  impact: 'Environment shapes behavior. Wealthy friends share knowledge, opportunities. Poor friends share complaints, lottery tickets.',
                  color: 'pink'
                }
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-6 border-l-4 ${
                  item.color === 'green' ? 'bg-green-50 border-green-500' :
                  item.color === 'blue' ? 'bg-blue-50 border-blue-500' :
                  item.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                  item.color === 'orange' ? 'bg-orange-50 border-orange-500' :
                  item.color === 'purple' ? 'bg-purple-50 border-purple-500' :
                  item.color === 'red' ? 'bg-red-50 border-red-500' :
                  'bg-pink-50 border-pink-500'
                }`}>
                  <div className="mb-4">
                    <strong className="text-2xl text-gray-900 block mb-2">
                      {i + 1}. {item.habit}
                    </strong>
                    <p className="text-gray-700">{item.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-100 rounded-lg p-4 border-l-2 border-red-500">
                      <strong className="text-red-900 block mb-2 text-sm">❌ Bad Habit:</strong>
                      <p className="text-sm text-gray-700">{item.bad}</p>
                    </div>
                    <div className="bg-green-100 rounded-lg p-4 border-l-2 border-green-500">
                      <strong className="text-green-900 block mb-2 text-sm">✅ Real Example:</strong>
                      <p className="text-sm text-gray-700">{item.example}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <strong className="text-gray-900 block mb-1">💰 Wealth Impact:</strong>
                    <p className="text-gray-700 text-sm">{item.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Latte Factor Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Coffee className="w-8 h-8 text-brown-600" />
              ☕ "The Latte Factor": ₹150 Coffee = ₹11 Lakh!
            </h2>

            <div className="bg-gradient-to-r from-brown-100 to-orange-100 rounded-xl p-6 border-2 border-brown-400 mb-6">
              <p className="text-gray-700 mb-4">
                <strong>Small daily expenses</strong> seem harmless. "It&apos;s apenas ₹150 coffee!" 
                Pero over 10 years, that daily ₹150 becomes...
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Daily Expense</div>
                  <div className="text-2xl font-bold text-red-700">₹{dailyCoffee}</div>
                  <p className="text-xs text-gray-600">One Starbucks coffee</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Monthly = Annual</div>
                  <div className="text-2xl font-bold text-orange-700">₹{monthlyInvestment.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">₹{(monthlyInvestment * 12).toLocaleString()}/year</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">If Invested (10Y @ 12%)</div>
                  <div className="text-3xl font-bold text-green-700">₹{(coffeeWealth / 100000).toFixed(1)}L</div>
                  <p className="text-xs text-gray-600">Mutual fund SIP</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5">
                <strong className="text-gray-900 text-lg block mb-3">😱 More "Latte Factor" Examples:</strong>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• <strong>Cigarettes ₹10/day:</strong> ₹3,650/year → Invested 20Y @ 12% = <strong className="text-green-700">₹2.97 lakh!</strong> (Plus you&apos;ll live longer!)</li>
                  <li>• <strong>Swiggy lunch ₹200/day:</strong> ₹73K/year → Invested 15Y @ 12% = <strong className="text-green-700">₹24.8 lakh!</strong> (Cook at home 4 days/week)</li>
                  <li>• <strong>Unnecessary Uber ₹150/day:</strong> ₹54K/year → Invested 10Y @ 12% = <strong className="text-green-700">₹10.5 lakh!</strong> (Take bus/metro sometimes)</li>
                  <li>• <strong>Unused gym ₹2K/month:</strong> ₹24K/year → Invested 20Y @ 12% = <strong className="text-green-700">₹19.6 lakh!</strong> (Home workout for free)</li>
                </ul>
                <p className="text-purple-700 font-bold mt-4">
                  Point: Not saying don&apos;t enjoy coffee/lunch. Saying: <strong>Be AWARE.</strong> 
                  Small daily expenses compound negatively. Cut 1-2 small habits = lakhs saved!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Bad Habits to Break */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⚠️ 8 Money Habits That Keep You Poor
            </h2>

            <div className="space-y-4">
              {[
                {
                  habit: 'Lifestyle Inflation (Salary doubles, expenses triple!)',
                  example: '₹40K salary, lived in ₹8K PG, saved ₹10K. Got raise to ₹80K. Moved to ₹25K flat, bought car EMI ₹20K, lifestyle ₹25K. Now saving apenas ₹10K (same as before!).',
                  fix: 'When salary increases, increase savings proportionally. 50% salary increase = 50% SIP increase. Not 100% lifestyle increase!',
                  impact: 'Lifestyle inflation is #1 reason people earning ₹1L/month have zero savings while people earning ₹50K have ₹10L invested.'
                },
                {
                  habit: `Impulse Buying (Saw sale, bought ₹15K shoes you don't need)`,
                  example: 'Flipkart Big Billion Days. "50% off" on ₹8K laptop bag. Bought apenas porque discount. Used apenas twice. ₹8K wasted.',
                  fix: '30-Day Rule: Want something? Wait 30 days. Still want it? Buy. 80% times, urge disappears in 30 days. Saves lakhs annually!',
                  impact: `Indians waste ₹2-5K monthly on impulse buys. That's ₹24-60K/year. Invested for 15 years = ₹6-15 lakh wealth lost!`
                },
                {
                  habit: 'Keeping Up with Joneses (Friends bought car, I MUST too!)',
                  example: `Colleague bought ₹15L car. You bought ₹12L car (couldn't afford ₹15L pero had to show off). EMI ₹25K/month, can barely manage.`,
                  fix: `Compete on NET WORTH, not lifestyle. Joneses might have ₹30L loan. You have ₹15L savings. You're richer! Stop comparing possessions.`,
                  impact: `Comparison kills wealth. Buy what YOU need/can afford, not what impresses others. Their validation isn't worth your financial stress.`
                },
                {
                  habit: 'Not Tracking Expenses (Money disappears mysteriously)',
                  example: 'Month starts with ₹50K salary. Month ends with ₹3K in account. "Where did ₹47K go??" No idea!',
                  fix: 'Track for apenas 1 month. Note every expense (coffee ₹100, Uber ₹200, online shopping ₹3K). You\'ll be shocked! Awareness = control.',
                  impact: 'Tracked expenses = 20-30% reduction automatically. On ₹50K expenses, that's ₹10-15K saved monthly = ₹1.2-1.8L/year!'
                },
                {
                  habit: 'Credit Card Minimum Payment Trap',
                  example: 'Outstanding ₹1L. Paying minimum ₹2K/month. Feels affordable pero ₹98K debt grows at 40%/year! Takes 10 years + ₹3L interest to clear!',
                  fix: `ALWAYS pay full amount. Credit card is for convenience + rewards, not loan. Can't pay full? You're living beyond means - cut expenses!`,
                  impact: '₹1L card debt @ 40% for 5 years = ₹5.4L repaid! That ₹4.4L interest could've been ₹15L wealth if invested in SIP instead.'
                },
                {
                  habit: 'Subscriptions You Don\'t Use (₹3-5K/month drain)',
                  example: 'Netflix ₹649, Prime ₹299, Hotstar ₹499, Spotify ₹119, gym ₹2K (went apenas 2 times/month) = ₹3,566/month waste!',
                  fix: 'Audit subscriptions quarterly. Cancel unused. Share Netflix with family (₹650/4 = ₹162 each). Choose apenas 1-2 essential subscriptions.',
                  impact: 'Average Indian has ₹2-4K/month in forgotten subscriptions. Cancel half = ₹12-24K/year saved = ₹2-4L in 10 years @ 12%!'
                },
                {
                  habit: 'Borrowing for Wants (Car, vacation, wedding on EMI)',
                  example: 'Took ₹3L personal loan @ 15% for destination wedding. EMI ₹6,722 for 60 months = total ₹4.03L paid (₹1.03L interest for 3-day event!).',
                  fix: 'Borrow apenas for NEEDS (education, medical emergency). For WANTS (vacation, wedding), save first, spend later. No EMI stress!',
                  impact: 'Loan EMI ₹10-20K/month for wants = ₹1.2-2.4L/year going to interest. That money could build ₹25-50L wealth in 15 years if invested!'
                },
                {
                  habit: 'Not Negotiating (Overpaying everywhere)',
                  example: 'Bought insurance from first agent (₹18K). Didn\'t compare. Same policy online = ₹12K (₹6K wasted!). Car loan 12% from HDFC, SBI offered 9.5% (didn\'t check!).',
                  fix: 'ALWAYS compare 3 options before buying anything > ₹5K. 2 hours research can save ₹10-50K! Insurance, loans, electronics - everything negotiable.',
                  impact: 'Not comparing costs ₹50K-1L annually on big purchases (insurance, loans, electronics). Over lifetime = ₹10-15L wasted unnecessarily!'
                }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    <strong className="text-xl text-red-900">{item.habit}</strong>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1"><strong>Real Example:</strong></p>
                      <p className="text-gray-700 text-sm">{item.example}</p>
                    </div>
                    <div className="bg-green-100 rounded-lg p-4">
                      <p className="text-sm text-green-900 mb-1"><strong>✅ How to Fix:</strong></p>
                      <p className="text-gray-700 text-sm">{item.fix}</p>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-4">
                      <p className="text-sm text-purple-900 mb-1"><strong>💰 Wealth Impact:</strong></p>
                      <p className="text-gray-700 text-sm">{item.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
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
              💡 Atomic Money Habits (Tiny Changes, Huge Results)
            </h2>

            <div className="space-y-4">
              {[
                `Set SIP on salary day. Auto-debit on 1st (right after salary). No willpower needed. "Out of sight, out of mind" - can't spend what's already invested.`,
                'Delete shopping apps from phone home screen. Add friction to buying. Want to shop? Must login browser (extra steps = time to think = avoid impulse).',
                'Use cash for wants, card for needs. Withdraw ₹5K cash for entertainment monthly. When cash finishes, no more fun spending. Credit card apenas for groceries, bills.',
                'Screenshot investment portfolio. Set as phone wallpaper. See ₹15L corpus daily → motivation to not waste money on ₹500 unnecessary purchase.',
                '24-Hour Rule for purchases > ₹1,000. Want ₹2K shoes? Wait 24 hours. Sleep on it. 60% times, urge goes away. Saves ₹20-30K/year.',
                'Track net worth monthly (assets - liabilities). Increasing? Good habits. Decreasing? Fix habits. What gets measured improves.',
                'Unsubscribe from promotional emails. Swiggy, Amazon, Myntra send 10 emails/day. Each email is temptation. Unsubscribe all = reduce spending 15-20%.',
                'Use 10-10-10 Rule: Before buying, ask: How will I feel in 10 minutes, 10 months, 10 years? ₹40K phone: Happy 10 mins, okay 10 months, regret 10 years (waste!).'
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800"><strong>Habit {i + 1}:</strong> {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Action Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your 30-Day Habit Challenge
            </h2>

            <div className="space-y-3">
              {[
                'Week 1: Track EVERY expense for 7 days (write in notebook)',
                'Week 2: Set up auto-SIP (₹1K minimum, increases later)',
                'Week 2: Cancel 1-2 unused subscriptions (audit Netflix, gym, apps)',
                'Week 3: Try 1 no-spend week (apenas groceries, zero eating out/shopping)',
                'Week 3: Delete shopping apps from home screen (Amazon, Myntra, Flipkart)',
                'Week 4: Calculate "latte factor" (daily ₹100-200 waste → invested = how much in 10Y?)',
                'Week 4: Screenshot investment portfolio, set as wallpaper (daily motivation)',
                'Month End: Review: How much saved vs last month? Even ₹2-3K extra is progress!'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>🎯 Challenge Goal:</strong> Save ₹5,000 extra in first month by fixing habits. 
                Invest that ₹5K in SIP. Next month, repeat. In 1 year: ₹60K saved + started SIP habit. 
                <strong> Small changes, life transformation!</strong>
              </p>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Wealth Building Strategies - Get Rich Slow!</h3>
            <p className="mb-6 text-blue-100">
              Learn Warren Buffett's wealth formula: Consistency beats intensity. 
              How ordinary people become crorepatis with ordinary salaries!
            </p>
            <Link
              to="/learn/behavioural-finance-money-psychology/wealth-building-strategies-get-rich-slow-consistency-patience-india-2025"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Wealth Building Strategies
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoneyHabits;
