import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, AlertTriangle, CheckCircle, Target,
  Lightbulb, TrendingDown, XCircle, Award, Shield, DollarSign,
  Zap, Clock, TrendingUp, AlertCircleIcon, Ban, Activity
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const InvestingMistakes: React.FC = () => {
  const [calculateLoss, setCalculateLoss] = useState(false);
  
  // Calculate panic selling loss
  const investment = 500000;
  const marketFall = 0.30; // 30% crash
  const panicValue = investment * (1 - marketFall); // ₹3.5L
  const recoveryValue = investment * 1.15; // Market recovers +15% from original
  const panicLoss = recoveryValue - panicValue; // ₹1.25L loss from panic!

  return (
    <>
      <SEOHelmet 
        title="Top 10 Investing Mistakes India: Panic Selling, Timing Market, Over-Trading 2025 | MoneyCal" 
        description="Learn from expensive investing mistakes in Hindi & English. Panic selling loses ₹1-2L, market timing fails 95% time, over-trading wastes ₹50K annually. Real examples, prevention strategies." 
        keywords="investing mistakes India, panic selling, market timing, over trading, day trading loss, common errors, portfolio mistakes, निवेश गलतियाँ" 
        url="/learn/investing-wealth/investing-mistakes-to-avoid-panic-selling-timing-market-india" 
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 10 of 10 - FINAL!</span>
                <Link 
                  to="/learn"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <span className="hidden sm:inline">Explore More Categories</span>
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
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                  Lesson 10 • 60 Minutes • All Levels
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Top 10 Investing Mistakes (Cost: ₹5-25 Lakh!)
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  निवेश गलतियाँ: ₹5-25 लाख नुकसान कैसे बचाएं
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Why This Lesson Matters (यह सबक क्यों महत्वपूर्ण है)
              </h3>
              <ul className="space-y-2">
                {[
                  'Avoid panic selling (costs ₹1-2L loss in crashes)',
                  'Stop trying to time market (95% fail, miss 10 best days = 50% less returns)',
                  'Quit over-trading (brokerage + taxes = ₹50K-1L annual waste)',
                  'Ignore hot tips (90% scams/bad stocks = ₹1-3L loss)',
                  'Understand diversification (all in 1 stock = 100% loss if it crashes)',
                  'Learn from real examples of investors who lost crores'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-red-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Panic Selling Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6">
              💸 Cost of Panic Selling (Real Math)
            </h2>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
              <p className="text-white text-lg mb-4">
                <strong>Scenario:</strong> You invested ₹5 lakh. Market crashes 30%. 
                You panic, sell everything at ₹3.5 lakh (₹1.5L loss). 
                6 months later, market recovers to +15% above original. 
                It's now ₹5.75 lakh. <strong>Your loss from panic?</strong>
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600">Original Investment</div>
                  <div className="text-2xl font-bold text-gray-900">₹5.00L</div>
                </div>
                <div className="bg-red-100 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Panic Sold At</div>
                  <div className="text-2xl font-bold text-red-700">₹3.50L</div>
                  <p className="text-xs text-gray-600 mt-1">30% crash, you sold</p>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <div className="text-sm text-gray-600">If You Held (6 months)</div>
                  <div className="text-2xl font-bold text-green-700">₹5.75L</div>
                  <p className="text-xs text-gray-600 mt-1">Market recovered +15%</p>
                </div>
              </div>

              <div className="mt-4 bg-red-900 text-white rounded-lg p-5">
                <strong className="text-xl">😱 Total Loss from Panic Selling: ₹{((recoveryValue - panicValue) / 100000).toFixed(2)} Lakh!</strong>
                <p className="text-sm mt-2">
                  ₹1.5L immediate loss + ₹0.75L opportunity cost (missed recovery) = ₹2.25L total!
                  <br/>If you had simply HELD for 6 months, you'd have ₹5.75L. Panic cost you ₹2.25L.
                </p>
              </div>
            </div>

            <div className="bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>Key Learning:</strong> Markets crash 30-50% every 5-10 years. 
                They ALWAYS recover (historically 100% recovery rate). 
                <strong> Panic sellers lose crores. Patient investors become crorepatis.</strong>
              </p>
            </div>
          </motion.section>

          {/* Top 10 Mistakes Detailed */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🚫 Top 10 Investing Mistakes (Detailed)
            </h2>

            <div className="space-y-6">
              {[
                {
                  mistake: 'Panic Selling During Market Crashes',
                  example: 'March 2020: Nifty fell 38% in 1 month. Rahul panicked, sold entire ₹10L portfolio at ₹6.2L. By June 2020, Nifty recovered 50%+. His portfolio would be ₹12L. Loss: ₹5.8L!',
                  why: 'Fear of "losing everything". Media panic (TV shows screaming "market crash!"). Friends selling. Lack of emergency fund (forced to sell).',
                  fix: 'Have 6-12 months emergency fund. Never invest money needed in <5 years. Remember: Crashes recover 100% historically. 2008 crash recovered by 2013. COVID crash recovered in 4 months!',
                  realStat: '95% of investors who panic sold in Mar 2020 regret it. Those who held are now up 100%+ (Nifty doubled from COVID lows).',
                  cost: '₹1-5 lakh loss per panic sale'
                },
                {
                  mistake: 'Trying to Time the Market (Buy Low, Sell High)',
                  example: 'Priya waited for "correction" to invest ₹5L. Market kept rising. She waited 2 years. Finally invested at peak. Market corrected 20%. She panicked, sold. Lost ₹1L + 2 years of returns!',
                  why: 'Greed (wanting perfect entry). Fear (waiting for crash that never comes). Overconfidence (thinking you can predict future).',
                  fix: 'Time IN market > Timing the market. Start SIP today. Rupee cost averaging averages out highs/lows. Missing 10 best days = 50% less returns!',
                  realStat: 'Study: If you invested ₹1L in 2010 and missed apenas 10 best days, your ₹5L becomes ₹2.5L! Nobody can predict those 10 days.',
                  cost: '₹2-5 lakh opportunity cost over 10 years'
                },
                {
                  mistake: 'Over-Trading (Daily/Weekly Buying-Selling)',
                  example: 'Amit day-traded. Bought Reliance Monday ₹2,500, sold ₹2,520 (+₹20). Profit? ₹20 - brokerage ₹40 - STT ₹15 - GST ₹8 = ₹37 loss! Did 100 trades/month = ₹3.7K loss monthly!',
                  why: 'Excitement/addiction. False belief that frequent trading = more profit. Social media gurus showing fake gains. Boredom with "boring" long-term investing.',
                  fix: 'Buy quality stocks/funds. HOLD for 5-10 years. Each trade costs ₹50-100 (brokerage + taxes). 100 trades = ₹5-10K waste. 1,000 trades = ₹50K-1L gone!',
                  realStat: 'SEBI study: 90% of day traders lose money. Average loss: ₹1.1 lakh per trader per year. Only 1% make consistent profit.',
                  cost: '₹50K-2 lakh annual loss (brokerage + taxes + bad decisions)'
                },
                {
                  mistake: 'Following Hot Tips Blindly (WhatsApp Groups, TV)',
                  example: 'Uncle forwarded "insider tip": "Buy XYZ Ltd, will double in 1 month!" Invested ₹2L. Stock crashed 60% (₹80K left). XYZ was pump-and-dump scam. Lost ₹1.2L.',
                  why: 'Trust in "experts". FOMO (friends making money). Get-rich-quick mentality. Laziness (no research, want easy tips).',
                  fix: 'NEVER invest based on tips. Do own research: Check financials, PE ratio, debt, management. Invest in index funds if unsure. 80% "hot tips" are scams or bad stocks.',
                  realStat: 'Operator scams: They buy penny stock at ₹10, spread "hot tip", retail investors buy (price rises to ₹50), operators dump, price crashes to ₹5. Retail loses 90%.',
                  cost: '₹50K-3 lakh per scam stock'
                },
                {
                  mistake: 'Investing Without Emergency Fund',
                  example: 'Neha invested entire ₹8L savings in stocks. 6 months later, medical emergency needs ₹4L. Market down 25%. Forced to sell at ₹6L value = ₹1L loss. Emergency fund would have prevented this.',
                  why: 'Greed (want ALL money earning high returns). Overconfidence (thinking emergencies won't happen). Lack of financial planning.',
                  fix: 'Rule: 6-12 months expenses in liquid emergency fund (savings account, liquid fund) FIRST. Only surplus money in stocks/equity. Never invest money needed in <5 years.',
                  realStat: '60% of Indians have zero emergency fund. One medical emergency wipes out investments. ₹5L emergency fund prevents ₹2-5L forced-sale losses.',
                  cost: '₹1-3 lakh forced-sale loss during emergencies'
                },
                {
                  mistake: 'Not Diversifying (All Eggs in One Basket)',
                  example: 'Rohit put entire ₹12L in Yes Bank shares (₹350/share). Stock crashed to ₹15 (96% fall!). Portfolio: ₹48K from ₹12L. Lost ₹11.5 lakh porque no diversification.',
                  why: 'Overconfidence in one stock/sector. Greed (want maximum return from "best" stock). Laziness (easier to track 1 stock than 10).',
                  fix: 'Never >5-10% in single stock. Diversify: 10-20 stocks across sectors. Or invest in index fund (diversified across 50 stocks automatically). Yes Bank won't crash index 96%!',
                  realStat: 'Even "safe" large-cap stocks crash: Yes Bank (-96%), Jet Airways (-100%), DHFL (-99%). Diversification = survival.',
                  cost: '₹5-15 lakh loss if concentrated stock crashes'
                },
                {
                  mistake: 'Chasing Past Returns (Last Year's Winner)',
                  example: '2017: Small-cap funds gave 60% return. Investors poured money in 2018. 2018-2019: Small-caps crashed 40%. Investors lost heavily. Past returns ≠ future returns!',
                  why: 'Recency bias (assuming recent trend continues forever). FOMO (everyone talking about high returns). Ignoring market cycles.',
                  fix: 'Don't chase returns. High returns usually mean high risk taken. Returns normalize over time. Invest in balanced portfolio (large+mid+small cap, debt+equity). Think 10-year average, not last year.',
                  realStat: 'Study: Funds in top 10% (last 5 years) fall to bottom 50% (next 5 years) 70% of times. Past performance is NOT indicator of future.',
                  cost: '₹1-4 lakh loss buying at peak after hot streak'
                },
                {
                  mistake: 'Ignoring Expense Ratio (High Fees Eat Returns)',
                  example: 'Fund A: 12% return, 2.5% expense ratio = 9.5% net. Fund B: 12% return, 0.5% expense ratio = 11.5% net. On ₹10L invested for 20 years: Fund A = ₹61L, Fund B = ₹89L. Fund B is ₹28L richer!',
                  why: 'Not aware expense ratio exists. Thinking "apenas 2%" is small. Ignoring compounding effect of fees over 20-30 years.',
                  fix: 'Choose low-cost index funds (expense ratio <0.5%). Direct plans (0.5% less expense than regular plans). Over 30 years, 1% expense difference = 30% wealth difference!',
                  realStat: 'Regular plan MF: 2% expense. Direct plan: 1%. On ₹1L SIP for 30 years @ 12%: Regular = ₹2.89 Cr, Direct = ₹3.53 Cr. Difference: ₹64 lakh!',
                  cost: '₹10-50 lakh lost to high fees over 30 years'
                },
                {
                  mistake: 'Short-Term Thinking (Investing for <3 Years)',
                  example: 'Invested ₹5L for daughter's admission (2 years away). Market corrected 25% in year 2. Needed money, sold at ₹3.75L. Lost ₹1.25L. Should have kept in FD (7% safe return = ₹5.74L).',
                  why: 'Greed (want equity returns but can't wait). Wrong asset allocation (equity for short-term goal). Lack of financial planning.',
                  fix: '<3 years goal: Debt (FD, debt funds). 3-5 years: Hybrid funds (60% debt, 40% equity). 5+ years: 100% equity. Don't put short-term money in volatile assets!',
                  realStat: 'Equity returns: 1 year = -50% to +80% (very volatile). 5 years = 8-18% (moderate). 10+ years = 12-15% (consistent). Need patience!',
                  cost: '₹1-3 lakh loss selling at wrong time for short-term needs'
                },
                {
                  mistake: 'Not Reviewing Portfolio Annually (Set & Forget)',
                  example: 'Started with 60% equity, 40% debt. After 5 years (equity grew), became 85% equity, 15% debt. Risk increased unknowingly. Market crash = bigger loss because no rebalancing.',
                  why: 'Laziness (set and forget mentality). Not knowing rebalancing is needed. Overconfidence (portfolio is doing well, why touch it?).',
                  fix: 'Review portfolio annually. Rebalance to original allocation (60-40). Book profits from winners, add to losers. Exit bad-performing funds (3-year underperformance). Takes apenas 2 hours/year!',
                  realStat: 'Rebalancing adds 0.5-1% extra annual return. On ₹50L portfolio over 30 years @ 12%: No rebalancing = ₹14.9 Cr. Rebalancing = ₹17.4 Cr. Difference: ₹2.5 Cr!',
                  cost: '₹2-5 crore opportunity loss over 30 years'
                }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">{i + 1}</span>
                    <div>
                      <strong className="text-2xl text-red-900 block mb-2">{item.mistake}</strong>
                      <div className="bg-red-100 rounded-lg p-3 mb-3">
                        <p className="text-sm text-red-900"><strong>💰 Typical Cost:</strong> {item.cost}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1"><strong>😱 Real Example:</strong></p>
                      <p className="text-gray-700 text-sm">{item.example}</p>
                    </div>

                    <div className="bg-orange-100 rounded-lg p-4">
                      <p className="text-sm text-orange-900 mb-1"><strong>🧠 Why People Do This:</strong></p>
                      <p className="text-gray-700 text-sm">{item.why}</p>
                    </div>

                    <div className="bg-green-100 rounded-lg p-4">
                      <p className="text-sm text-green-900 mb-1"><strong>✅ How to Avoid:</strong></p>
                      <p className="text-gray-700 text-sm">{item.fix}</p>
                    </div>

                    <div className="bg-blue-100 rounded-lg p-4">
                      <p className="text-sm text-blue-900 mb-1"><strong>📊 Real Data/Stats:</strong></p>
                      <p className="text-gray-700 text-sm">{item.realStat}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Real Stories of Massive Losses */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              😱 Real Stories: How Indians Lost Crores
            </h2>

            <div className="space-y-4">
              {[
                {
                  name: 'Yes Bank Investors (2020)',
                  loss: '₹11,000 Cr collective loss',
                  story: 'Yes Bank was "safe" large-cap bank. Fell from ₹400 to ₹15 (96% crash) due to bad loans. Retail investors holding 10L+ shares lost everything. Diversification lesson: Never put all money in one bank stock!',
                  lesson: 'Even "safe" large-caps can crash. Diversify across 10-20 stocks minimum.'
                },
                {
                  name: 'DHFL Investors (2019)',
                  loss: '₹91,000 Cr defaults',
                  story: 'DHFL was AAA-rated company (highest safety!). Suddenly declared bankrupt. Stock crashed from ₹600 to ₹10 (98% fall). FD holders lost money. Rating agencies failed. Showed AAA doesn't mean 100% safe.',
                  lesson: 'Don't trust ratings blindly. Diversify even "safe" debt investments across 5-10 companies.'
                },
                {
                  name: 'Harshad Mehta Scam Victims (1992)',
                  loss: '₹5,000 Cr scam',
                  story: 'Harshad artificially pumped ACC, Videocon, Reliance. Retail followed. Stocks crashed 70-90% when scam exposed. Investors lost life savings. Lesson: Don't follow hot tips, sudden 100% rises are usually scams.',
                  lesson: 'If it sounds too good to be true, it IS. Avoid penny stocks, operator-driven stocks.'
                },
                {
                  name: 'Dot-Com Bubble Investors (2000)',
                  loss: 'Satyam, Infosys fell 70-90%',
                  story: '2000: Everyone bought IT stocks. Infosys was ₹10,000 (pre-split). Bubble burst. IT stocks crashed 90%. Investors who bought at peak waited 7 years to recover. Lesson: Don't buy when everyone is euphoric.',
                  lesson: 'Market cycles exist. Bull markets end. Don't invest when taxi drivers give stock tips (bubble sign!).'
                },
                {
                  name: 'Karvy Stock Broking Fraud (2019)',
                  loss: '₹2,000 Cr demat fraud',
                  story: 'Karvy illegally pledged clients' demat shares for loans. When exposed, SEBI banned them. Thousands of investors lost shares. Lesson: Choose regulated, reputed brokers. Check demat holdings monthly!',
                  lesson: 'Use apenas SEBI-registered brokers. Check CDSL/NSDL statement monthly to verify your holdings.'
                }
              ].map((story, i) => (
                <div key={i} className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-6 border-2 border-red-400">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    <div>
                      <strong className="text-xl text-red-900 block">{story.name}</strong>
                      <p className="text-red-700 font-semibold">Loss: {story.loss}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{story.story}</p>
                  <div className="bg-white rounded-lg p-4">
                    <strong className="text-green-900">✅ Lesson:</strong>
                    <p className="text-gray-700 text-sm mt-1">{story.lesson}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Expert Tips to Avoid Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 shadow-lg border-2 border-yellow-400"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              💡 Warren Buffett's Rules to Avoid Mistakes
            </h2>

            <div className="space-y-4">
              {[
                'Rule #1: Never lose money. Rule #2: Never forget Rule #1. (Meaning: Focus on NOT losing rather than maximizing gains. Avoid risky bets.)',
                'Be fearful when others are greedy, greedy when others are fearful. (Buy in crashes when everyone is panic selling. Sell in euphoria when everyone is buying.)',
                'Price is what you pay, value is what you get. (Don't buy overpriced stocks apenas porque they're rising. Check intrinsic value.)',
                'If you aren't willing to own a stock for 10 years, don't even think about owning it for 10 minutes. (Long-term mindset. No trading, apenas investing.)',
                'Diversification is protection against ignorance. (If you don't know what you're doing, diversify. Experts can concentrate pero beginners MUST diversify.)',
                'The stock market is a device for transferring money from the impatient to the patient. (Patient investors win. Traders lose.)',
                'It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price. (Quality > cheap. Asian Paints at ₹3K > random penny stock at ₹10.)',
                'Risk comes from not knowing what you're doing. (Educate yourself. Don't invest in things you don't understand. No crypto if you can't explain blockchain!)'
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800"><strong>Wisdom {i + 1}:</strong> {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Mistake Prevention Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your Mistake-Prevention Checklist
            </h2>

            <div className="space-y-3">
              {[
                'Before investing ₹1: Do I have 6 months emergency fund? (If no, build emergency fund first!)',
                'Is this money I can forget for 5+ years? (If no, don't invest in equity. Use FD/debt.)',
                'Am I investing apenas porque friend/relative made money? (FOMO = bad reason. Skip!)',
                'Can I explain why this stock/fund is good investment? (If no, don't invest. Do research first.)',
                'Is this >10% of my portfolio? (If yes, you're not diversified. Reduce concentration.)',
                'Am I chasing last year's high returns? (If yes, STOP. Past returns don't repeat.)',
                'Is expense ratio <1% (stocks) or <0.5% (index funds)? (If no, find cheaper alternative.)',
                'Will I panic sell if this falls 30%? (If yes, you're taking too much risk. Add debt allocation.)',
                'Have I reviewed portfolio in last 12 months? (If no, review NOW. Rebalance if needed.)',
                'Am I getting this "tip" from WhatsApp/friend? (If yes, IGNORE. Do own research or invest in index fund.)'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>🎯 Golden Rule:</strong> When in doubt, invest in low-cost index fund (Nifty 50 / Sensex). 
                Can't go wrong with entire market. No stock-picking mistakes. No timing mistakes. 
                <strong> Simple, safe, and beats 80% of investors!</strong>
              </p>
            </div>
          </motion.section>

          {/* Completion CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-3xl font-bold mb-4">🎉 Investing & Wealth Category Complete!</h3>
            <p className="text-xl mb-6 text-purple-100">
              You've mastered all 10 lessons! You now know more than 90% of Indian investors. 
              Time to apply this knowledge and build your ₹1 crore corpus!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/learn"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                Explore More Categories
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                to="/learn/investing-wealth"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-purple-500 text-white rounded-xl font-bold text-lg hover:bg-purple-400 transition-all"
              >
                Review All Lessons
                <Award className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestingMistakes;
