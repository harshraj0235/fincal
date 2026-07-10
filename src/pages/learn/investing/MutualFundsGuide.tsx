import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, PieChart, Calculator, CheckCircle, 
  Target, Lightbulb, Zap, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const MutualFundsGuide: React.FC = () => {
  const [sipAmount, setSIPAmount] = useState(5000);
  const [years, setYears] = useState(20);
  const [returnRate, setReturnRate] = useState(12);
  
  const months = years * 12;
  const monthlyRate = returnRate / 12 / 100;
  const futureValue = sipAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  const invested = sipAmount * months;
  const returns = futureValue - invested;

  return (
    <>
      <SEOHelmet 
        title="Mutual Funds Complete Guide: SIP, NAV, Expense Ratio, Direct Plans India 2025 | MoneyCal" 
        description="Master mutual funds in Hindi & English. SIP vs lumpsum, NAV calculation, expense ratio, direct vs regular plans, equity vs debt funds, how to choose best mutual funds India." 
        keywords="mutual funds India guide, SIP investment, NAV calculation, expense ratio, direct mutual funds, equity funds, debt funds, म्यूचुअल फंड गाइड हिंदी" 
        url="/learn/investing-wealth/mutual-funds-complete-guide-sip-nav-expense-ratio-india" 
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth Creation</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 2 of 10</span>
                <Link 
                  to="/learn/investing-wealth/sip-systematic-investment-plan-strategy-india-wealth-building"
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
                  Lesson 2 • 65 Minutes • Beginner to Intermediate
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Mutual Funds Complete Guide
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  म्यूचुअल फंड: SIP, NAV, Expense Ratio समझें
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  'Understand what mutual funds are and how they work (pool money + professional management)',
                  'Learn SIP vs Lumpsum investing (₹5K/month vs ₹6L once - which is better?)',
                  'Master NAV (Net Asset Value) calculation and why it matters',
                  'Compare Equity vs Debt vs Hybrid funds (risk-return tradeoff)',
                  'Choose Direct plans over Regular (save 1-1.5% expense ratio = ₹3L extra in 20 years!)',
                  'Pick best mutual funds using performance metrics (Sharpe ratio, Alpha, Beta)'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* What are Mutual Funds */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💡 What are Mutual Funds? (म्यूचुअल फंड क्या है?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Mutual Fund</strong> is a pool of money collected from many investors (like you!) and managed by a 
                professional fund manager who invests in stocks, bonds, and other assets. You buy <strong>units</strong> of the fund, 
                and its value grows (or falls) based on market performance.
              </p>

              <p className="text-lg text-gray-700 mb-4">
                <strong>Hindi में:</strong> म्यूचुअल फंड कई निवेशकों के पैसे का एक पूल है जिसे पेशेवर फंड मैनेजर शेयरों, 
                बॉन्ड्स में निवेश करता है। आप फंड की यूनिट्स खरीदते हैं और बाजार के प्रदर्शन के आधार पर इसका मूल्य बढ़ता या घटता है।
              </p>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500 my-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Simple Example: How It Works</h3>
                <p className="text-gray-700 mb-3">
                  Imagine 1,000 people each contribute ₹10,000 = ₹1 crore pool. Fund manager invests this ₹1 crore in 50 different stocks. 
                  If stocks go up 12%, entire pool becomes ₹1.12 crore. Your ₹10,000 becomes ₹11,200!
                </p>
                <p className="text-green-700 font-bold">
                  ✅ Benefit: Instead of picking 50 stocks yourself (risky!), you get instant diversification + expert management for apenas 0.5-1% annual fee.
                </p>
              </div>
            </div>
          </motion.section>

          {/* SIP Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <IndianRupee className="w-8 h-8 text-green-600" />
              🧮 SIP Wealth Calculator
            </h2>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Monthly SIP (₹):</label>
                  <input 
                    type="number" 
                    value={sipAmount} 
                    onChange={(e) => setSIPAmount(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
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
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
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
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
                    min="5"
                    max="20"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 border-2 border-blue-500">
                  <div className="text-sm text-gray-600 mb-1">Total Invested</div>
                  <div className="text-3xl font-bold text-blue-700">
                    ₹{(invested / 100000).toFixed(2)}L
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Your contribution over {years} years</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-green-500">
                  <div className="text-sm text-gray-600 mb-1">Estimated Returns</div>
                  <div className="text-3xl font-bold text-green-700">
                    ₹{(returns / 100000).toFixed(2)}L
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Market growth @ {returnRate}% p.a.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-purple-500">
                  <div className="text-sm text-gray-600 mb-1">Total Value</div>
                  <div className="text-3xl font-bold text-purple-700">
                    ₹{(futureValue / 100000).toFixed(2)}L
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Wealth created in {years} years</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <strong className="text-yellow-900 text-lg block mb-3">🎯 Real Example: ₹10,000/month SIP for 20 Years</strong>
              <p className="text-gray-700">
                Monthly SIP: ₹10,000 | Total Invested: ₹24 lakh (₹10K × 240 months)<br/>
                Expected Returns @ 12%: ₹76 lakh | <strong className="text-green-700">Total Wealth: ₹1 CRORE!</strong><br/><br/>
                <strong>This is the power of SIP + Compounding.</strong> Start small, stay consistent, become crorepati!
              </p>
            </div>
          </motion.section>

          {/* Types of Mutual Funds */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📊 Types of Mutual Funds (Complete Breakdown)
            </h2>

            <div className="space-y-6">
              {[
                {
                  type: 'Equity Funds (Stocks)',
                  nameHindi: 'इक्विटी फंड',
                  risk: 'HIGH',
                  returns: '12-15% average (long-term)',
                  taxation: 'LTCG: 12.5% above ₹1.25L | STCG: 20%',
                  timeline: '5+ years minimum',
                  subTypes: ['Large Cap (Nifty 50 stocks - stable)', 'Mid Cap (growing companies - moderate risk)', 'Small Cap (startups - high risk/reward)', 'Flexi Cap (mix of all - balanced)'],
                  bestFor: 'Young investors (age 25-45), long-term wealth building, retirement',
                  examples: 'Axis Bluechip, Mirae Asset Large Cap, Parag Parikh Flexi Cap',
                  color: 'red'
                },
                {
                  type: 'Debt Funds (Bonds)',
                  nameHindi: 'डेट फंड',
                  risk: 'LOW to MEDIUM',
                  returns: '7-9% average',
                  taxation: 'As per your income tax slab (debt taxed like FD)',
                  timeline: '1-5 years',
                  subTypes: ['Liquid Funds (7 days - 1 year)', 'Short Duration (1-3 years)', 'Corporate Bond Funds (AAA rated companies)', 'Gilt Funds (government bonds - safest)'],
                  bestFor: 'Emergency fund (better than savings account), short-term goals (car in 2 years)',
                  examples: 'HDFC Liquid Fund, ICICI Pru Short Term, Axis Treasury Advantage',
                  color: 'blue'
                },
                {
                  type: 'Hybrid Funds (Balanced)',
                  nameHindi: 'हाइब्रिड फंड',
                  risk: 'MEDIUM',
                  returns: '9-11% average',
                  taxation: 'Equity-oriented: LTCG 12.5% | Debt-oriented: as per slab',
                  timeline: '3-7 years',
                  subTypes: ['Aggressive Hybrid (65-80% equity)', 'Conservative Hybrid (10-25% equity)', 'Balanced Advantage (dynamic allocation)', 'Multi-Asset (equity + debt + gold)'],
                  bestFor: `Those who want equity returns pero can't handle 100% volatility. Good for age 45-60.`,
                  examples: 'HDFC Hybrid Equity, ICICI Balanced Advantage, SBI Equity Hybrid',
                  color: 'yellow'
                },
                {
                  type: 'Index Funds / ETFs',
                  nameHindi: 'इंडेक्स फंड',
                  risk: 'MEDIUM (market risk)',
                  returns: '11-12% (matches Nifty/Sensex)',
                  taxation: 'Same as equity funds (LTCG 12.5%)',
                  timeline: '7+ years',
                  subTypes: ['Nifty 50 Index (top 50 companies)', 'Nifty Next 50 (next 50 companies)', 'Sensex Index', 'Bank Nifty (banking stocks)'],
                  bestFor: `Passive investors who don't want to pick funds. Cheapest (expense ratio 0.1-0.3%).`,
                  examples: 'UTI Nifty Index, HDFC Index Nifty 50, Nippon India ETF Nifty BeES',
                  color: 'purple'
                },
                {
                  type: 'ELSS (Tax-Saving)',
                  nameHindi: 'ईएलएसएस (कर बचत)',
                  risk: 'HIGH (equity-based)',
                  returns: '12-15% average + Section 80C benefit',
                  taxation: 'LTCG 12.5% above ₹1.25L (best tax efficiency!)',
                  timeline: '3+ years (shortest lock-in for 80C)',
                  subTypes: ['Pure equity ELSS (aggressive)', 'Diversified ELSS (balanced)', 'Focus ELSS (sector-specific)'],
                  bestFor: 'Tax-saving under 80C. Better than PPF/FD for young investors.',
                  examples: 'Axis Long Term Equity, Mirae Asset Tax Saver, Quant ELSS',
                  color: 'green'
                }
              ].map((fund, i) => (
                <div key={i} className={`rounded-xl p-6 border-2 ${
                  fund.color === 'red' ? 'bg-red-50 border-red-400' :
                  fund.color === 'blue' ? 'bg-blue-50 border-blue-400' :
                  fund.color === 'yellow' ? 'bg-yellow-50 border-yellow-400' :
                  fund.color === 'purple' ? 'bg-purple-50 border-purple-400' :
                  'bg-green-50 border-green-400'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <strong className="text-2xl text-gray-900">{fund.type}</strong>
                      <p className="text-sm text-gray-600">{fund.nameHindi}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-bold text-white ${
                      fund.risk === 'HIGH' ? 'bg-red-600' :
                      fund.risk.includes('MEDIUM') ? 'bg-yellow-600' :
                      'bg-green-600'
                    }`}>
                      Risk: {fund.risk}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-xs text-gray-600">Expected Returns</div>
                      <div className="text-xl font-bold text-green-700">{fund.returns}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-xs text-gray-600">Investment Timeline</div>
                      <div className="text-xl font-bold text-blue-700">{fund.timeline}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 mb-4">
                    <strong className="text-gray-900 block mb-2">Sub-Types:</strong>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {fund.subTypes.map((sub, j) => (
                        <li key={j}>• {sub}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="bg-gray-50 rounded-lg p-3"><strong>Tax:</strong> {fund.taxation}</p>
                    <p className="bg-green-50 rounded-lg p-3"><strong>Best For:</strong> {fund.bestFor}</p>
                    <p className="bg-blue-50 rounded-lg p-3"><strong>Top Funds:</strong> {fund.examples}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* SIP vs Lumpsum */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg overflow-x-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⚖️ SIP vs Lumpsum: Which is Better?
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="p-3 text-left">Feature</th>
                    <th className="p-3">SIP (Monthly) ✅</th>
                    <th className="p-3">Lumpsum (One-time)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Investment Amount</td>
                    <td className="p-3 text-center">₹5K-10K/month</td>
                    <td className="p-3 text-center">₹1L-10L once</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Timing Risk</td>
                    <td className="p-3 text-center text-green-700 font-bold">LOW (Rupee cost averaging)</td>
                    <td className="p-3 text-center text-red-700 font-bold">HIGH (what if market falls next day?)</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Discipline Required</td>
                    <td className="p-3 text-center">Auto-debit helps</td>
                    <td className="p-3 text-center">One-time decision</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Market Crash Impact</td>
                    <td className="p-3 text-center text-green-700">GOOD! Buy more units when cheap</td>
                    <td className="p-3 text-center text-red-700">BAD! Entire amount drops</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Returns (Historical 15Y)</td>
                    <td className="p-3 text-center">12.5% (smoother journey)</td>
                    <td className="p-3 text-center">12% (higher volatility)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Best For</td>
                    <td className="p-3 text-center">Salaried (monthly income), beginners</td>
                    <td className="p-3 text-center">Bonus/inheritance, market experts</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-500">
              <strong className="text-green-900 text-lg block mb-3">🏆 Verdict: SIP is Better for 90% People</strong>
              <p className="text-gray-700 mb-3">
                <strong>Why SIP Wins:</strong> You don't need to time the market. Buy automatically every month at different NAVs. 
                When market falls, you buy cheaper units (good for long-term). When market rises, your existing units grow.
              </p>
              <p className="text-gray-700">
                <strong>When Lumpsum is Okay:</strong> Apenas if you have 10+ years' experience, track market daily, 
                and can handle 30-40% volatility. For beginners: <strong>SIP is ALWAYS safer.</strong>
              </p>
            </div>
          </motion.section>

          {/* Direct vs Regular Plans */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💰 Direct vs Regular Plans: Save ₹3 Lakh!
            </h2>

            <div className="bg-red-100 rounded-xl p-6 border-2 border-red-500 mb-6">
              <strong className="text-red-900 text-xl block mb-3">⚠️ CRITICAL: Always Choose DIRECT Plans!</strong>
              <p className="text-gray-700">
                Same mutual fund has 2 versions: <strong>Direct</strong> (buy from AMC website/app) and <strong>Regular</strong> (buy through agent/distributor). 
                Direct plans have 1-1.5% lower expense ratio. Over 20 years, this saves <strong>₹3-5 lakh!</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-500">
                <h3 className="text-2xl font-bold text-green-900 mb-4">Direct Plan ✅</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between">
                    <span>Expense Ratio:</span>
                    <strong>0.5-1.0%</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Commission:</span>
                    <strong className="text-green-700">₹0 (no middleman)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Where to Buy:</span>
                    <strong>AMC website, Kuvera, Groww</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Returns (₹5K SIP, 20Y):</span>
                    <strong className="text-green-700">₹51 lakh</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-500">
                <h3 className="text-2xl font-bold text-red-900 mb-4">Regular Plan ❌</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between">
                    <span>Expense Ratio:</span>
                    <strong>1.5-2.5%</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Commission:</span>
                    <strong className="text-red-700">1% to agent (from YOUR money!)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Where:</span>
                    <strong>Agents, bank branches</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Returns (₹5K SIP, 20Y):</span>
                    <strong className="text-red-700">₹48 lakh</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-100 rounded-xl p-6 border-2 border-yellow-500">
              <strong className="text-yellow-900 text-lg block mb-3">📊 Real Math: ₹5,000/Month SIP for 20 Years</strong>
              <div className="space-y-2 text-gray-700">
                <p><strong>Direct Plan (0.8% expense ratio):</strong> Returns @ 12% = ₹51 lakh</p>
                <p><strong>Regular Plan (2% expense ratio):</strong> Returns @ 10.5% (after 1.5% eaten by commission) = ₹48 lakh</p>
                <p className="text-red-700 font-bold text-lg mt-3">❌ You LOSE ₹3 LAKH by buying regular plan through agent!</p>
                <p className="text-green-700 font-bold mt-2">
                  ✅ Same fund, same manager, same stocks. Only difference: Agent takes ₹3L from YOUR returns for doing nothing. 
                  <strong> Buy direct. Save ₹3L.</strong>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Common Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⚠️ 10 Mutual Fund Mistakes Beginners Make
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: 'Buying regular plans through agents/bank branches',
                  reality: `Agent earns 1-1.5% commission EVERY YEAR from your investment. On ₹10L over 20 years, that's ₹3-5L gone!`,
                  fix: 'Buy direct plans from Kuvera, Groww, Paytm Money, or AMC websites. No agent needed. Save lakhs!'
                },
                {
                  mistake: 'Stopping SIP when market crashes (panic selling)',
                  reality: 'March 2020 COVID crash: Nifty fell 40%. People who stopped SIP missed the recovery. Market is now 100% higher! They lost biggest buying opportunity.',
                  fix: `Market crashes are BEST time to buy! Continue SIP. Better yet, INCREASE SIP by 50% during crashes. You're buying units at huge discount.`
                },
                {
                  mistake: 'Checking mutual fund NAV daily',
                  reality: `Mutual funds are for 5+ years. Daily NAV changes don't matter. Checking daily causes panic - "Down 2% today! Should I sell?" NO!`,
                  fix: 'Check apenas once per quarter (every 3 months). Focus on 3-5 year returns, not daily noise. Delete apps from home screen to avoid temptation.'
                },
                {
                  mistake: 'Investing in 10-15 different mutual funds',
                  reality: 'More funds = more confusion, overlapping stocks (Axis Bluechip and HDFC Top 100 both have same stocks!), difficult to track.',
                  fix: 'Maximum 3-5 funds: 1 Large Cap, 1 Mid Cap, 1 Small Cap (or 1 Flexi Cap + 1 Index). Simple is better than complicated.'
                },
                {
                  mistake: 'Choosing funds based on 1-year returns (past performance)',
                  reality: `Fund gave 40% last year doesn't mean it will give 40% every year. Last year's winners become next year's losers often.`,
                  fix: 'Check 5-year and 10-year returns. Consistency matters more than 1-year spikes. Look for funds with steady 11-13% for 10 years.'
                },
                {
                  mistake: 'Not understanding expense ratio impact',
                  reality: '1% expense ratio sounds small. Pero on ₹10L over 20 years @ 12% returns, 1% expense eats ₹2.5 lakh of YOUR money!',
                  fix: 'Choose funds with expense ratio < 1%. Index funds have apenas 0.1-0.3% (cheapest). Direct plans are 1% cheaper than regular.'
                },
                {
                  mistake: 'Selling after 1 year to "book profits"',
                  reality: 'Mutual funds are for LONG TERM (5+ years). Selling in 1 year = STCG tax 20%. Also miss compounding magic (doubles money every 6 years @ 12%).',
                  fix: 'Stay invested minimum 5 years. LTCG tax is apenas 12.5% vs STCG 20%. Plus compounding works wonders after 10+ years.'
                },
                {
                  mistake: 'Putting emergency fund in equity mutual funds',
                  reality: 'Equity can fall 30-40% anytime. If you need money during crash, you sell at loss. Emergency fund should be liquid (withdrawable without loss).',
                  fix: `Emergency fund (6 months expenses): Keep in liquid fund or FD. Long-term money (> 5 years): Equity mutual funds. Don't mix them!`
                },
                {
                  mistake: 'Chasing NFO (New Fund Offer) at ₹10 NAV',
                  reality: `NAV ₹10 vs ₹100 doesn't matter! ₹10K buys 1,000 units @ ₹10 NAV or 100 units @ ₹100 NAV - same thing. NFOs are untested (no track record).`,
                  fix: 'Ignore NFOs. Choose funds with 5-10 year proven track record. NAV price is irrelevant - returns percentage matters!'
                },
                {
                  mistake: 'Not rebalancing portfolio annually',
                  reality: 'Started with 70% equity, 30% debt in 2020. By 2025, equity grew to 85%, debt apenas 15%. Higher risk than you wanted!',
                  fix: 'Rebalance once a year (Dec/Jan). If equity > 70%, sell some units, move to debt. Keeps risk in check. Automatic profit-booking!'
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
              💡 Pro Tips from Fund Managers
            </h2>

            <div className="space-y-4">
              {[
                'Start SIP on 1st or 5th of month (right after salary). Auto-debit ensures you invest BEFORE spending. "Pay yourself first" principle.',
                'Use Step-Up SIP: Increase SIP by 10% every year when salary increases. ₹5K becomes ₹5.5K next year, ₹6K year after. Builds massive wealth!',
                `Don't withdraw for 10+ years. First 5 years: principal grows slowly. After 10 years: compounding explodes. ₹5K SIP for 10Y = ₹11.5L, for 20Y = ₹50L (4x more!)`,
                `Invest in "boring" funds (Nifty Index, Bluechip). Don't chase "hot" sector funds (pharma fund, tech fund). Boring steady wins long-term.`,
                'Set SIP date after salary date. Salary on 1st? SIP on 5th. Ensures money is in account when SIP deducts. Failed SIPs break rhythm.',
                'ELSS for 80C tax-saving. 3-year lock-in pero 12% returns vs PPF 7.1%. For young investors (< 50 years), ELSS is no-brainer.',
                'Use Coin by Zerodha or Kuvera for zero fees. Some platforms charge ₹50-100 per transaction. Over 20 years = ₹24K wasted!',
                'Emergency? Redeem liquid fund/debt fund, NEVER equity fund during emergency. Equity can be down 20% when you need money. Sell at loss = permanent wealth destruction.'
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
                  q: 'What is NAV? Why does it change daily?',
                  a: `NAV (Net Asset Value) = Total fund value ÷ Total units. It's the price per unit. Changes daily porque stocks in fund go up/down daily. Calculated at 4:00 PM. If you invest at 2 PM, you get 4 PM NAV.`
                },
                {
                  q: 'Should I buy mutual fund when NAV is low (₹20) or high (₹200)?',
                  a: `NAV price DOESN'T MATTER! ₹10K buys 500 units @ ₹20 NAV or 50 units @ ₹200 NAV - same value. What matters is FUTURE GROWTH %, not current NAV price. Ignore NAV, focus on fund quality.`
                },
                {
                  q: 'I started SIP in Jan. Market crashed in March. Should I stop SIP?',
                  a: 'NO! Continue SIP. Crashes are BEST time to buy. Your ₹5K will buy MORE units when market is down. When market recovers (it always does), those cheap units will grow massively. Never stop SIP in crash!'
                },
                {
                  q: 'How much should I invest in mutual funds monthly?',
                  a: 'Formula: Save 20-30% of income. If salary ₹50K, save ₹10-15K. Split: ₹8-10K equity MF SIP (long-term) + ₹2-5K debt/liquid fund (emergency). Start with ₹1K if new. Increase slowly.'
                },
                {
                  q: 'Can I lose ALL my money in mutual funds?',
                  a: 'Theoretically yes, practically NO. For ALL money to be lost, ALL 50-100 stocks in fund must go to zero (company bankruptcies). Never happened in history. Worst case: 50-60% fall during major crashes pero recovers in 2-3 years.'
                },
                {
                  q: 'Direct plan vs Regular plan - is quality different?',
                  a: 'EXACT SAME FUND! Same manager, same stocks, same strategy. Only difference: Regular plan pays 1% commission to agent (from YOUR money). Direct plan keeps that 1% for YOU. Always choose direct!'
                },
                {
                  q: 'Should I invest lumpsum bonus or start SIP?',
                  a: 'Got ₹2L bonus? Option 1: ₹2L lumpsum now (risky if market crashes tomorrow). Option 2: ₹16,667/month SIP for 12 months (safer, rupee cost averaging). Option 2 is better for beginners.'
                },
                {
                  q: 'Can I withdraw anytime or is there lock-in?',
                  a: `Most funds: No lock-in, withdraw anytime. ELSS funds: 3-year lock-in (tax-saving benefit). Pero mutual funds are for LONG-TERM. Don't withdraw in 1-2 years - you'll lose compounding magic!`
                },
                {
                  q: 'Where to buy mutual funds online? Groww vs Zerodha Coin vs ET Money?',
                  a: 'All are good for direct plans. Groww: Best UI, beginner-friendly. Zerodha Coin: ₹0 fees (cheapest). ET Money: Good research tools. Kuvera: Free + excellent support. Use any - all sell direct plans apenas.'
                },
                {
                  q: 'How many mutual funds should I have in portfolio?',
                  a: `3-5 is ideal. Example: 1 Large Cap (Nifty Index) + 1 Flexi Cap (Parag Parikh) + 1 Small Cap (Axis Small Cap) + 1 Debt fund (HDFC Liquid) = Complete portfolio. Don't buy 15 funds - over-diversification dilutes returns!`
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
            className="mb-12 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your Mutual Fund Action Plan
            </h2>

            <div className="space-y-3">
              {[
                'Download Groww or Zerodha Coin app (best for beginners)',
                'Complete KYC online (PAN + Aadhaar + selfie = 10 minutes)',
                `Start with ₹1,000-5,000/month SIP (don't wait to save big amount)`,
                'Choose DIRECT plans only (save 1-1.5% expense ratio)',
                'Pick 2-3 funds: Nifty Index Fund + Flexi Cap Fund',
                'Set SIP date right after salary date (auto-debit)',
                `DON'T check NAV daily (check apenas once per quarter)`,
                'Continue SIP for minimum 5 years (10+ years ideal for wealth creation)'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>🎯 Goal:</strong> ₹5,000/month SIP for 20 years @ 12% = <strong>₹50 LAKH corpus!</strong> 
                Invested apenas ₹12L, earned ₹38L from market growth. This is how middle-class becomes crorepati. 
                <strong> Start today!</strong>
              </p>
            </div>
          </motion.section>

          {/* Standalone Calculator CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <PieChart className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Ready to analyze your funds?</h3>
                <p className="text-green-100 mb-6 text-lg max-w-2xl">
                  Use our advanced Mutual Fund Returns Calculator to see how your different fund 
                  choices impact your long-term wealth.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/tools/mutual-fund-calculator"
                    className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg"
                  >
                    <Calculator className="w-5 h-5" />
                    Open MF Returns Calculator
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Related Tools Grid */}
          <section className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Investment Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'SIP Calculator', url: '/tools/sip-calculator' },
                { name: 'Lumpsum Calculator', url: '/tools/lumpsum-calculator' },
                { name: 'Mutual Fund Analyzer', url: '/tools/mutual-fund-analyzer' },
                { name: 'Step-Up SIP Planner', url: '/finance-tools/sip-step-up-planner' },
                { name: 'Retirement Planner', url: '/tools/retirement-calculator' }
              ].map((tool, idx) => (
                <Link 
                  key={idx}
                  to={tool.url}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all group border border-transparent hover:border-green-100"
                >
                  <span className="font-semibold">{tool.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </section>
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: SIP Mastery - ₹1 Crore Wealth Formula</h3>
            <p className="mb-6 text-purple-100">
              Deep dive into SIP strategy: When to increase, when to pause, step-up SIP, 
              how to create ₹1 crore in 20 years with apenas ₹10K/month!
            </p>
            <Link
              to="/learn/investing-wealth/sip-systematic-investment-plan-strategy-india-wealth-building"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: SIP Mastery Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MutualFundsGuide;
