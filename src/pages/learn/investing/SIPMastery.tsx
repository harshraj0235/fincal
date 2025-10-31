import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, Calculator, CheckCircle, Target,
  AlertTriangle, Lightbulb, DollarSign, Zap, Award, Clock,
  TrendingDown, BarChart3, PieChart, Shield, Users
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const SIPMastery: React.FC = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [years, setYears] = useState(20);
  const [returnRate, setReturnRate] = useState(12);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  
  // Regular SIP calculation
  const months = years * 12;
  const monthlyRate = returnRate / 12 / 100;
  const regularSIPValue = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  const regularInvested = monthlyAmount * months;
  const regularReturns = regularSIPValue - regularInvested;

  // Step-up SIP calculation (simplified)
  let stepUpValue = 0;
  let stepUpInvested = 0;
  let currentAmount = monthlyAmount;
  
  for (let year = 0; year < years; year++) {
    const yearMonths = 12;
    const yearlyInvestment = currentAmount * yearMonths;
    stepUpInvested += yearlyInvestment;
    
    // Future value of this year's investments
    const remainingYears = years - year;
    const fv = currentAmount * (((Math.pow(1 + monthlyRate, remainingYears * 12) - 1) / monthlyRate) * (1 + monthlyRate));
    stepUpValue += fv;
    
    currentAmount = currentAmount * (1 + stepUpPercent / 100);
  }

  return (
    <>
      <SEOHelmet 
        title="SIP Mastery: Build ₹1 Crore with ₹10K/Month - Complete Strategy India 2025 | MoneyCal" 
        description="Master SIP investing in Hindi & English. Rupee cost averaging, step-up SIP 10%, achieving ₹1 crore goal, when to stop SIP, SIP vs lumpsum comparison, tax benefits." 
        keywords="SIP strategy India, systematic investment plan, 1 crore goal, step-up SIP, rupee cost averaging, SIP vs lumpsum, एसआईपी निवेश रणनीति" 
        url="/learn/investing-wealth/sip-systematic-investment-plan-strategy-india-wealth-building" 
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth Creation</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 3 of 10</span>
                <Link 
                  to="/learn/investing-wealth/index-funds-etfs-nifty-sensex-passive-investing-india"
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  Lesson 3 • 60 Minutes • Beginner to Advanced
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  SIP Mastery: ₹1 Crore Wealth Formula
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  एसआईपी से ₹1 करोड़ कैसे बनाएं?
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
                  'Understand Rupee Cost Averaging (why SIP beats lumpsum for 90% investors)',
                  'Calculate how to reach ₹1 Crore goal (₹10K/month for 20 years @ 12%)',
                  'Master Step-Up SIP (increase 10% annually = ₹60L extra wealth!)',
                  'Learn when to STOP SIP vs when to CONTINUE during market crash',
                  'Avoid 8 common SIP mistakes (stopping during crash, checking daily NAV)',
                  'Use SIP for different goals (retirement, child education, house down payment)'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Interactive SIP Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-purple-600" />
              🧮 Advanced SIP Calculator (Regular + Step-Up)
            </h2>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Monthly SIP Amount (₹):</label>
                  <input 
                    type="number" 
                    value={monthlyAmount} 
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg font-semibold"
                    min="500"
                    step="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Investment Period (Years):</label>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg font-semibold"
                    min="1"
                    max="40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Expected Return (%):</label>
                  <input 
                    type="number" 
                    value={returnRate} 
                    onChange={(e) => setReturnRate(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg font-semibold"
                    min="5"
                    max="20"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Step-Up % (Yearly):</label>
                  <input 
                    type="number" 
                    value={stepUpPercent} 
                    onChange={(e) => setStepUpPercent(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg font-semibold"
                    min="0"
                    max="20"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Regular SIP (Fixed Monthly Amount)</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Total Invested</div>
                    <div className="text-2xl font-bold text-blue-700">₹{(regularInvested / 100000).toFixed(2)}L</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Expected Returns</div>
                    <div className="text-2xl font-bold text-green-700">₹{(regularReturns / 100000).toFixed(2)}L</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Final Corpus</div>
                    <div className="text-2xl font-bold text-purple-700">₹{(regularSIPValue / 100000).toFixed(2)}L</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-900 mb-4">🚀 Step-Up SIP (Increase {stepUpPercent}% Every Year)</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Total Invested</div>
                    <div className="text-2xl font-bold text-blue-700">₹{(stepUpInvested / 100000).toFixed(2)}L</div>
                    <p className="text-xs text-gray-600 mt-1">Increases annually</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Extra Returns</div>
                    <div className="text-2xl font-bold text-green-700">
                      ₹{((stepUpValue - regularSIPValue) / 100000).toFixed(2)}L
                    </div>
                    <p className="text-xs text-gray-600 mt-1">vs regular SIP</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Final Corpus</div>
                    <div className="text-3xl font-bold text-purple-700">₹{(stepUpValue / 100000).toFixed(2)}L</div>
                    <p className="text-xs text-green-600 mt-1 font-semibold">HIGHER!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 rounded-xl p-6 border-2 border-green-500">
              <strong className="text-green-900 text-lg block mb-3">💰 The Power of Step-Up SIP:</strong>
              <p className="text-gray-700">
                Regular SIP ₹{monthlyAmount.toLocaleString()}/month = ₹{(regularSIPValue / 10000000).toFixed(2)} Crore<br/>
                Step-Up SIP (increase {stepUpPercent}% annually) = ₹{(stepUpValue / 10000000).toFixed(2)} Crore<br/>
                <strong className="text-green-700">Extra Wealth Created: ₹{((stepUpValue - regularSIPValue) / 100000).toFixed(2)} Lakh!</strong>
                <br/><br/>
                When salary increases, increase SIP too. Compound the growth!
              </p>
            </div>
          </motion.section>

          {/* How to Reach ₹1 Crore */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🎯 How to Reach ₹1 Crore? (Multiple Paths)
            </h2>

            <div className="space-y-4">
              {[
                {
                  path: 'Start at Age 25',
                  sip: '₹6,500/month',
                  years: '30 years',
                  invested: '₹23.4L',
                  corpus: '₹1.52 Cr',
                  ageAtGoal: '55 years',
                  difficulty: 'EASIEST (time is friend)',
                  color: 'green'
                },
                {
                  path: 'Start at Age 30',
                  sip: '₹10,000/month',
                  years: '25 years',
                  invested: '₹30L',
                  corpus: '₹1.89 Cr',
                  ageAtGoal: '55 years',
                  difficulty: 'EASY (still good)',
                  color: 'green'
                },
                {
                  path: 'Start at Age 35',
                  sip: '₹15,000/month',
                  years: '20 years',
                  invested: '₹36L',
                  corpus: '₹1.49 Cr',
                  ageAtGoal: '55 years',
                  difficulty: 'MODERATE (need discipline)',
                  color: 'yellow'
                },
                {
                  path: 'Start at Age 40',
                  sip: '₹27,000/month',
                  years: '15 years',
                  invested: '₹48.6L',
                  corpus: '₹1.10 Cr',
                  ageAtGoal: '55 years',
                  difficulty: 'HARD (high monthly commitment)',
                  color: 'orange'
                },
                {
                  path: 'Start at Age 45',
                  sip: '₹55,000/month',
                  years: '10 years',
                  invested: '₹66L',
                  corpus: '₹1.27 Cr',
                  ageAtGoal: '55 years',
                  difficulty: 'VERY HARD (need high income)',
                  color: 'red'
                }
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-6 border-l-4 ${
                  item.color === 'green' ? 'bg-green-50 border-green-500' :
                  item.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                  item.color === 'orange' ? 'bg-orange-50 border-orange-500' :
                  'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <strong className="text-xl text-gray-900">{item.path}</strong>
                    <span className={`px-4 py-2 rounded-full font-bold text-white ${
                      item.color === 'green' ? 'bg-green-600' :
                      item.color === 'yellow' ? 'bg-yellow-600' :
                      item.color === 'orange' ? 'bg-orange-600' :
                      'bg-red-600'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600">Monthly SIP</div>
                      <div className="font-bold text-gray-900">{item.sip}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600">Duration</div>
                      <div className="font-bold text-gray-900">{item.years}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600">You Invest</div>
                      <div className="font-bold text-blue-700">{item.invested}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600">You Get</div>
                      <div className="font-bold text-green-700">{item.corpus}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">Goal achieved at age: <strong>{item.ageAtGoal}</strong></p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-100 rounded-xl p-6 border-2 border-blue-500">
              <strong className="text-blue-900 text-lg block mb-3">📈 Key Insight: Time &gt; Amount!</strong>
              <p className="text-gray-700">
                Notice: Starting at 25 needs apenas ₹6,500/month. Starting at 45 needs ₹55,000/month (8x more!) 
                for same ₹1 Cr goal. <strong>10 years delay = 2-3x higher monthly requirement.</strong>
                <br/><br/>
                <strong className="text-purple-700">Start SIP TODAY, even if apenas ₹1,000/month. 
                You can increase later. Pero starting 5 years earlier is worth more than investing 2x amount later!</strong>
              </p>
            </div>
          </motion.section>

          {/* Rupee Cost Averaging */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🔄 Rupee Cost Averaging: SIP's Secret Weapon
            </h2>

            <p className="text-lg text-gray-700 mb-6">
              <strong>Rupee Cost Averaging</strong> means buying at different prices throughout the year. 
              When market falls, your ₹5K buys MORE units. When market rises, you buy FEWER units. 
              Average cost becomes moderate - you don't need to time the market!
            </p>

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-400 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">📊 Example: ₹5,000 SIP for 12 Months</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="p-2">Month</th>
                      <th className="p-2">NAV</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Units Bought</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Jan</td>
                      <td className="p-2">₹100</td>
                      <td className="p-2">₹5,000</td>
                      <td className="p-2 font-bold">50 units</td>
                    </tr>
                    <tr className="border-b bg-red-50">
                      <td className="p-2">Feb (Market crash -20%)</td>
                      <td className="p-2 text-red-700 font-bold">₹80</td>
                      <td className="p-2">₹5,000</td>
                      <td className="p-2 font-bold text-green-700">62.5 units 🎉</td>
                    </tr>
                    <tr className="border-b bg-red-50">
                      <td className="p-2">Mar (Still low)</td>
                      <td className="p-2 text-red-700 font-bold">₹85</td>
                      <td className="p-2">₹5,000</td>
                      <td className="p-2 font-bold text-green-700">58.8 units 🎉</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Apr (Recovery)</td>
                      <td className="p-2">₹95</td>
                      <td className="p-2">₹5,000</td>
                      <td className="p-2 font-bold">52.6 units</td>
                    </tr>
                    <tr className="border-b bg-green-50">
                      <td className="p-2">May (Bull run +15%)</td>
                      <td className="p-2 text-green-700 font-bold">₹115</td>
                      <td className="p-2">₹5,000</td>
                      <td className="p-2 font-bold">43.5 units</td>
                    </tr>
                    <tr className="border-b bg-green-50">
                      <td className="p-2">Jun-Dec (Average ₹110)</td>
                      <td className="p-2">₹110</td>
                      <td className="p-2">₹35,000</td>
                      <td className="p-2 font-bold">318 units</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-white rounded-lg p-5">
                <strong className="block mb-2 text-gray-900">Final Calculation:</strong>
                <p className="text-gray-700 mb-2">
                  Total Investment: ₹60,000 | Total Units: 585 units | Average Cost: ₹102.6 per unit
                </p>
                <p className="text-gray-700 mb-3">
                  If NAV ends at ₹115 (Dec): Your ₹60K became <strong className="text-green-700">₹67,275</strong> 
                  (585 units × ₹115) = <strong>12.1% return!</strong>
                </p>
                <p className="text-purple-700 font-bold">
                  ✅ Magic: You bought cheap in Feb-Mar crash (62.5 units for ₹5K!). Those "crash units" grew most when market recovered. 
                  This is why SIP investors love crashes - buying opportunity!
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <strong className="text-blue-900 text-lg block mb-3">🎯 Lumpsum vs SIP - Same ₹60K Investment:</strong>
              <p className="text-gray-700 mb-2">
                <strong>Lumpsum in Jan:</strong> ₹60K at ₹100 NAV = 600 units. Dec NAV ₹115 = ₹69,000 (15% return) ✅ Higher return<br/>
                <strong>SIP monthly:</strong> ₹5K × 12 = 585 units. Dec NAV ₹115 = ₹67,275 (12% return) ✓ Lower return
              </p>
              <p className="text-gray-700 mt-3">
                <strong>Pero what if you did lumpsum in Jan and market crashed to ₹80 in Feb and stayed at ₹100 by Dec?</strong><br/>
                Lumpsum: ₹60K still at ₹100 = apenas ₹60K (0% return! Wasted whole year!)<br/>
                SIP: Still 585 units at ₹100 = ₹58,500 (small loss pero bought cheap during crash for future)
              </p>
              <p className="text-purple-700 font-bold mt-3">
                💡 Lumpsum wins IF you time the market perfectly (buy at lowest point). Pero 99% people can't time market. 
                SIP is safer - you don't need to predict crashes/rallies. Auto-pilot wealth building!
              </p>
            </div>
          </motion.section>

          {/* Common SIP Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⚠️ 8 Common SIP Mistakes That Kill Wealth
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: 'Stopping SIP when market crashes',
                  reality: 'March 2020 COVID crash: Sensex fell from 42K to 26K (-38%). People panicked, stopped SIP. Market recovered to 60K by 2021. They missed 130% rally!',
                  fix: 'NEVER stop SIP during crash. Crashes are BEST time to buy. Increase SIP by 50% if possible. Those "crash units" will grow 3-5x when market recovers (it always does!).'
                },
                {
                  mistake: 'Checking SIP returns daily/weekly',
                  reality: 'SIP is for 5-10 years minimum. Checking daily causes panic. "Down 5% this week - should I sell?" NO! Market volatility is normal.',
                  fix: 'Check apenas once per quarter (every 3 months). Focus on 5-year returns, not weekly ups/downs. Delete fund apps from home screen to avoid temptation.'
                },
                {
                  mistake: 'Starting SIP in NFO (New Fund Offer) at ₹10 NAV',
                  reality: `NAV ₹10 sounds "cheap" pero it's meaningless! Returns % matters, not NAV price. NFOs have no track record - untested fund manager.`,
                  fix: 'Choose funds with 5-10 year proven track record. NAV ₹200 is NOT expensive. ₹5K buys 25 units @ ₹200 or 500 units @ ₹10 - SAME value!'
                },
                {
                  mistake: 'Missing SIP installments due to insufficient balance',
                  reality: 'Bank account had apenas ₹4K when ₹5K SIP auto-debit tried. SIP failed. Over year, missed 3 installments = ₹15K not invested. Lost ₹45K growth in 20 years!',
                  fix: 'Set SIP date right after salary date (salary on 1st = SIP on 5th). Always keep ₹10K buffer in account. Missed SIPs break compounding rhythm.'
                },
                {
                  mistake: 'Investing in too many SIPs (10-15 different funds)',
                  reality: `More funds = more confusion. Most large cap funds have same stocks (TCS, Reliance, HDFC Bank). You're just duplicating, not diversifying.`,
                  fix: 'Maximum 3-5 SIPs: 1 Large Cap (or Nifty Index) + 1 Flexi Cap + 1 Small Cap. Simple. Easier to track. Better returns than 15 funds.'
                },
                {
                  mistake: 'Withdrawing SIP after 2-3 years for vacation/gadget',
                  reality: `Started SIP for retirement (20Y goal). Pero withdrew after 3 years for Europe trip. Lost compounding for next 17 years! That ₹3L would've become ₹20L.`,
                  fix: `SIP is for LONG-TERM goals apenas. For vacation, save separately in RD/FD. Don't touch retirement SIP before retirement! Compounding needs time (10+ years).`
                },
                {
                  mistake: 'Not increasing SIP when salary increases',
                  reality: 'Started ₹5K SIP in 2015 at ₹6L salary. Now earning ₹15L in 2025 pero still ₹5K SIP! Missed opportunity to build more wealth.',
                  fix: 'Use Step-Up SIP: Increase 10-15% every year when salary increases. ₹5K → ₹5.5K → ₹6K → grows to ₹20K in 15 years. Builds ₹60L EXTRA wealth vs flat ₹5K!'
                },
                {
                  mistake: 'Choosing regular plans through agent (paying 1% commission)',
                  reality: `Agent takes 1-1.5% from YOUR returns every year. On ₹5K SIP for 20 years, that's ₹3-5 lakh gone to agent for doing nothing!`,
                  fix: 'Always choose DIRECT plans (Kuvera, Groww, Coin by Zerodha). Same fund, same manager, apenas no agent commission. Save lakhs!'
                }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-3">
                    <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    <div>
                      <p className="text-red-900 font-bold mb-2 text-lg">❌ {item.mistake}</p>
                      <p className="text-gray-700 mb-2"><strong>Reality:</strong> {item.reality}</p>
                      <p className="text-green-700"><strong>✅ Fix:</strong> {item.fix}</p>
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
              💡 SIP Pro Tips from Experts
            </h2>

            <div className="space-y-4">
              {[
                'Start SIP on 1st or 5th of month (right after salary). "Pay yourself first" principle. Invest before spending. Auto-debit ensures discipline.',
                `Use SIP pause feature wisely: Lost job/emergency? Pause SIP for 3-6 months (don't stop permanently). Resume when income stabilizes. Better than withdrawing corpus.`,
                'Increase SIP by ₹500-1,000 every 6 months. Small increases add up. ₹5K → ₹5.5K → ₹6K feels painless pero builds ₹15-20L extra over 20 years!',
                `Market crash = INCREASE SIP by 50-100%! March 2020 crash: Smart investors doubled SIP for 6 months. Bought Nifty at 8,000. Now it's 19,000. 2.4x return!`,
                'Never withdraw SIP for non-emergency. Vacation, gadget, wedding gift - save separately. SIP withdrawal breaks compounding = permanent wealth loss.',
                'Choose multi-cap/flexi-cap over sector funds. Tech fund, pharma fund are risky (one sector crash = big loss). Flexi cap spreads across 20+ sectors.',
                `Monitor apenas once per quarter. Don't check daily NAV. SIP is marathon, not sprint. Warren Buffett checks his portfolio apenas twice a year!`,
                'Use SIP for goals: Retirement (30Y), child education (15Y), house down payment (10Y). Each goal = separate SIP. Don't mix emergency fund with retirement fund!'
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800"><strong>Tip {i + 1}:</strong> {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ❓ Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'Should I stop SIP when market is at all-time high?',
                  a: 'NO! Market has been at "all-time high" 100+ times in last 20 years. If you stopped each time, you'd never invest! Markets go higher over time. Continue SIP regardless of market levels.'
                },
                {
                  q: 'I started SIP 2 years ago. Returns are apenas 8%. Should I switch fund?',
                  a: 'Mutual funds need minimum 5 years to judge. 2 years is too short. If fund has good 5-year track record (11-13%), continue. Don't switch based on 1-2 year performance.'
                },
                {
                  q: 'Can I pause SIP for 6 months if I lose job?',
                  a: 'Yes! Most platforms allow pause for 1-6 months. Better to pause than withdraw corpus. When you get new job, resume SIP. Don't break compounding chain permanently.'
                },
                {
                  q: 'Should I increase SIP or start new SIP in different fund?',
                  a: 'If existing fund is good (5Y returns 12%+), increase SIP amount in SAME fund. Simpler. If fund is underperforming (<10%), start new SIP in better fund + pause old one gradually.'
                },
                {
                  q: 'What if I can't afford ₹10K/month SIP? Should I wait?',
                  a: 'NO! Start with ₹500-1,000/month. Something is better than nothing. Even ₹1K SIP for 25 years @ 12% = ₹18.9 lakh! Increase to ₹2K, ₹3K slowly. Just START!'
                },
                {
                  q: 'Market has fallen 20%. Should I do lumpsum now instead of SIP?',
                  a: 'If you have lump sum cash + 100% sure market has bottomed = Yes, invest lumpsum. Pero predicting bottom is impossible! Safer: Continue SIP + add pequeño lumpsum (₹50K-1L) during crashes as bonus investment.'
                },
                {
                  q: 'Can I do SIP in multiple funds or just one?',
                  a: 'You can do multiple SIPs. Recommended: ₹10K total split as ₹5K large cap + ₹3K flexi cap + ₹2K small cap. Diversification across categories, not 10 funds in same category!'
                },
                {
                  q: 'SIP date is 7th pero salary comes on 10th. Will it fail?',
                  a: 'Yes, SIP will fail due to insufficient balance. Change SIP date to 12th or 15th (after salary). Most platforms allow changing SIP date online. Failed SIPs break rhythm.'
                },
                {
                  q: 'Should I stop SIP after reaching ₹1 Cr goal or continue?',
                  a: 'Depends on goal timeline. Retirement in 5 years? Switch to debt funds (protect corpus). Retirement in 20 years? Continue SIP (let it grow to ₹2-3 Cr!). Goals decide, not absolute amount.'
                },
                {
                  q: 'Can I do SIP of ₹1 lakh/month or is there a limit?',
                  a: 'No upper limit! You can do ₹1L, ₹5L, ₹10L SIP monthly. Pero for large amounts, consider direct equity (buy stocks) + SIP hybrid approach. Also tax planning needed for high investments.'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <p className="font-bold text-lg text-gray-900 mb-2">Q{i + 1}: {faq.q}</p>
                  <p className="text-gray-700"><strong>A:</strong> {faq.a}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Action Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your SIP Wealth-Building Plan
            </h2>

            <div className="space-y-3">
              {[
                'Calculate ₹1 Cr goal using calculator above (your age + monthly capacity)',
                'Download Groww or Kuvera app (zero fees, direct plans)',
                'Choose 2-3 funds: Nifty 50 Index + Flexi Cap (Parag Parikh/PPFAS)',
                'Set SIP date right after salary (salary 1st = SIP 5th)',
                'Enable step-up SIP 10% annual (or manually increase ₹500 every 6 months)',
                'NEVER stop during market crash (crash = opportunity, not danger)',
                'Check returns apenas quarterly, not daily (avoid panic)',
                'Continue for MINIMUM 10 years (compounding magic happens after 10+ years)'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>🏆 Success Formula:</strong> Small amount + Long time + Consistent discipline = Crorepati! 
                Even ₹5K/month for 25 years @ 12% = <strong>₹94 LAKH.</strong> 
                Add step-up 10% = crosses <strong>₹1.5 CRORE!</strong> Start today!
              </p>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Index Funds & ETFs - Passive Investing</h3>
            <p className="mb-6 text-pink-100">
              Learn Nifty 50, Sensex index funds. 0.1% expense ratio vs 1% active funds. 
              Warren Buffett recommends index funds - find out why!
            </p>
            <Link
              to="/learn/investing-wealth/index-funds-etfs-nifty-sensex-passive-investing-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-pink-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Index Funds & ETFs Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SIPMastery;
