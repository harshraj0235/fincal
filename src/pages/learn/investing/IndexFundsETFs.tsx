import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  BarChart3, PieChart, Percent, Users, Star, LineChart, Activity
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const IndexFundsETFs: React.FC = () => {
  const [investment, setInvestment] = useState(100000);
  const [years, setYears] = useState(10);
  
  const indexReturn = 12; // Historical Nifty 50 average
  const activeReturn = 10; // After 1-2% expense ratio
  
  const indexMaturity = investment * Math.pow(1 + indexReturn / 100, years);
  const activeMaturity = investment * Math.pow(1 + activeReturn / 100, years);
  const indexCost = (investment * 0.001 * years); // 0.10% expense ratio
  const activeCost = (investment * 0.02 * years); // 2% expense ratio
  const savingsFromIndex = (indexMaturity - activeMaturity) + (activeCost - indexCost);

  const faqData = [
    {
      question: "What is Index Fund and how is it different from regular mutual fund?",
      answer: "Index Fund mimics an index (Nifty 50, Sensex) - buys all stocks in same proportion. Regular (active) fund: Fund manager picks stocks. Index = Passive (no stock picking), Active = Active management. Index has lower cost (0.1-0.5%) vs Active (1-2.5%)."
    },
    {
      question: "Nifty 50 vs Sensex - which index fund is better?",
      answer: "Nifty 50: Top 50 companies across 13 sectors. Sensex: Top 30 companies (older, more established). Returns similar (11-12% over 15 years). Nifty 50 better due to more diversification (50 vs 30 stocks)."
    },
    {
      question: "Index Fund vs Index ETF - what's the difference?",
      answer: "Index Fund: Buy via mutual fund platform, NAV-based pricing, SIP easy. ETF: Buy on stock exchange like shares, real-time pricing, need demat account. For beginners: Index Fund easier. For advanced: ETF has lower expense ratio."
    },
    {
      question: "Can index funds give negative returns?",
      answer: "Yes, in bear markets! 2020 COVID crash: -35%. 2008: -50%. But if you stay invested 10+ years, historically recovered and gave 12%+ returns. Never invest short-term money in index funds!"
    },
    {
      question: "What is expense ratio and why does it matter?",
      answer: "Annual fee charged by fund. Index fund: 0.05-0.5%, Active fund: 1-2.5%. On ₹10L for 20 years: Index cost ₹50K vs Active ₹5L! Lower expense ratio = You keep more returns."
    },
    {
      question: "Best index funds in India for SIP?",
      answer: "Top picks: (1) UTI Nifty 50 Index Fund (0.05% expense), (2) ICICI Pru Nifty 50 Index, (3) HDFC Index Fund - Nifty 50. All track Nifty 50 with minimal tracking error (<0.1%)."
    },
    {
      question: "Should I invest in Nifty Next 50 or Nifty 50?",
      answer: "Nifty 50: Large-cap, stable, lower volatility. Nifty Next 50: Mid-cap, higher growth potential, more volatile. For beginners: Start with Nifty 50. For aggressive: 70% Nifty 50 + 30% Next 50."
    },
    {
      question: "Can active funds beat index funds?",
      answer: "Data shows: 85% of active funds FAIL to beat index over 10+ years! Only 15% succeed. Problem: High fees (2%) eat returns. Warren Buffett recommends index funds for 99% of investors!"
    },
    {
      question: "What is tracking error in index funds?",
      answer: "Difference between index return vs fund return. Good index fund: <0.2% tracking error. Example: Nifty 50 +12%, your fund +11.85% → 0.15% tracking error (excellent!)."
    },
    {
      question: "Should I invest lump sum or SIP in index fund?",
      answer: "If market is low (Nifty PE < 20): Lump sum better. If market is high (PE > 25): SIP safer. If unsure: Always SIP - reduces timing risk. Historically, SIP gives 12%+ over 10 years regardless of entry point!"
    },
    {
      question: "Can I do SIP in ETF?",
      answer: "Yes, but complicated. You need to buy manually every month on stock exchange. Easier: Use SIP in Index Fund (auto-debit). Or use ETF only for lump sum investments."
    },
    {
      question: "What is total return index vs price return index?",
      answer: "Price Return Index (Nifty 50): Only stock price movement. Total Return Index (Nifty 50 TRI): Includes dividends reinvested. TRI gives 1-2% higher returns. Always invest in funds tracking TRI!"
    },
    {
      question: "Are index funds taxed differently than active funds?",
      answer: "No, same taxation! Equity funds (including index): 10% LTCG tax above ₹1L after 1 year + 15% STCG if sold before 1 year. Taxation same for index and active equity funds."
    },
    {
      question: "Can I lose all money in index fund?",
      answer: "Only if ALL top 50 companies in India collapse (extremely unlikely!). Nifty 50 includes: Reliance, TCS, HDFC Bank, Infosys, ITC - India's biggest companies. Diversification = Safety!"
    },
    {
      question: "Gold ETF vs Sovereign Gold Bond - which is better?",
      answer: "SGB better: 2.5% extra interest + capital gains tax-free after 8 years. Gold ETF: No interest, capital gains taxable. But SGB has 8-year lock-in. For flexibility: Gold ETF. For buy-hold: SGB."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Index Funds & ETFs Guide 2025: Nifty 50, Sensex Passive Investing India | MoneyCal"
        description="Complete guide to index funds and ETFs in India. What is index fund, Nifty 50 vs Sensex comparison, index vs active funds (85% active funds fail!), expense ratio 0.1% vs 2%, best index funds (UTI, ICICI, HDFC), SIP strategy, taxation LTCG/STCG, Warren Buffett recommendation. Save ₹4.5L on ₹10L in 20 years!"
        keywords="index fund India, Nifty 50 index fund, ETF vs mutual fund, passive investing India, best index funds SIP, expense ratio comparison, UTI Nifty 50, index fund taxation, Warren Buffett index fund, इंडेक्स फंड"
        url="/learn/investing-wealth/index-funds-etf-nifty-50-sensex-passive-investing-india-guide"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 4 of 11</span>
                <Link 
                  to="/learn/investing-wealth/asset-allocation-equity-debt-gold-diversification-strategy-india"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <LineChart className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Lesson 4 • 45 Minutes • Intermediate</div>
                <h1 className="text-4xl font-bold text-gray-900">Index Funds & ETFs</h1>
                <p className="text-xl text-gray-600 mt-1">Nifty 50, Sensex - Passive Investing Guide (Warren Buffett's Choice!)</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-blue-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>What are index funds & ETFs - How they track Nifty 50/Sensex automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Index vs Active funds: 85% active funds FAIL to beat index over 10 years!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Save ₹4.5L on ₹10L investment (20 years) with low 0.1% expense ratio</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Best index funds in India + How to invest via SIP</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* What is Index Fund */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <PieChart className="w-8 h-8 text-blue-600" />
                What is Index Fund?
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Index Fund</strong> is a mutual fund that <strong>automatically copies an index</strong> (like Nifty 50 or Sensex). If Nifty has 50 stocks, index fund buys all 50 stocks in exact same proportion!
                </p>
                
                <div className="bg-blue-50 p-6 rounded-xl my-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Example: Nifty 50 Index Fund</h3>
                  <p className="text-gray-700 mb-3">Nifty 50 composition (approx):</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Reliance Industries: 10% → Index fund also buys 10% Reliance</li>
                    <li>• HDFC Bank: 8% → Index fund buys 8% HDFC Bank</li>
                    <li>• Infosys: 7% → Index fund buys 7% Infosys</li>
                    <li>• ...and all 50 stocks in exact same %!</li>
                  </ul>
                  <div className="mt-4 bg-white p-4 rounded-lg">
                    <p className="font-bold text-blue-900">Result: Your returns = Exactly same as Nifty 50 returns! 📈</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-bold text-lg text-green-900 mb-3">✅ Why Warren Buffett Loves Index Funds:</h4>
                  <div className="space-y-2 text-gray-700">
                    <p className="italic">"A low-cost index fund is the most sensible equity investment for the great majority of investors." - Warren Buffett</p>
                    <p><strong>His bet:</strong> In 2008, Buffett bet $1 million that S&P 500 index fund would beat hedge funds over 10 years. <strong>He won!</strong> Index returned 126% vs hedge funds 36%.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Index vs Active Comparison */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Index vs Active Funds - The Shocking Truth</h2>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6">
                <h3 className="text-xl font-bold text-red-900 mb-3">🚨 Data Doesn't Lie:</h3>
                <p className="text-gray-700 mb-3">
                  <strong>S&P India study (2023):</strong> 85% of active large-cap funds <strong>failed to beat Nifty 50</strong> over 10 years!
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-900">
                    <strong>Translation:</strong> If you pick random active fund, 85% chance it performs WORSE than simple Nifty 50 index fund. Only 15% succeed!
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="p-4 font-bold text-gray-900">Parameter</th>
                      <th className="p-4 font-bold text-blue-900">Index Fund</th>
                      <th className="p-4 font-bold text-green-900">Active Fund</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Management</td>
                      <td className="p-4">Passive (auto-copies index)</td>
                      <td className="p-4">Active (fund manager picks stocks)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Expense Ratio</td>
                      <td className="p-4 text-green-600 font-bold">0.05-0.50% (Very Low ✅)</td>
                      <td className="p-4 text-red-600">1-2.5% (High)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Returns (15Y avg)</td>
                      <td className="p-4">11-12% (Matches Nifty)</td>
                      <td className="p-4">9-10% (After 2% fees)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Risk</td>
                      <td className="p-4">Market risk (diversified across 50 stocks)</td>
                      <td className="p-4">Market risk + Fund manager risk</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Success Rate</td>
                      <td className="p-4 text-green-600 font-bold">100% match Nifty ✅</td>
                      <td className="p-4 text-red-600">Only 15% beat Nifty</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Complexity</td>
                      <td className="p-4">Simple (buy & forget)</td>
                      <td className="p-4">Complex (need to track performance)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Best For</td>
                      <td className="p-4">99% of investors (Buffett's advice)</td>
                      <td className="p-4">1% who can identify top 15% funds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* Interactive Calculator */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                💰 Index vs Active Fund Cost Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Investment Amount (₹)</label>
                  <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Investment Period (Years)</label>
                  <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                    Index Fund (0.1% expense)
                  </h3>
                  <div className="space-y-3">
                    <div><div className="text-sm opacity-90">Invested</div><div className="text-2xl font-bold">₹{investment.toLocaleString('en-IN')}</div></div>
                    <div><div className="text-sm opacity-90">Expected @ 12%</div><div className="text-3xl font-bold text-green-300">₹{Math.round(indexMaturity).toLocaleString('en-IN')}</div></div>
                    <div><div className="text-sm opacity-90">Total Cost (0.1% × {years}Y)</div><div className="text-lg font-bold">₹{Math.round(indexCost).toLocaleString('en-IN')}</div></div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-orange-300" />
                    Active Fund (2% expense)
                  </h3>
                  <div className="space-y-3">
                    <div><div className="text-sm opacity-90">Invested</div><div className="text-2xl font-bold">₹{investment.toLocaleString('en-IN')}</div></div>
                    <div><div className="text-sm opacity-90">Expected @ 10%</div><div className="text-3xl font-bold text-orange-300">₹{Math.round(activeMaturity).toLocaleString('en-IN')}</div></div>
                    <div><div className="text-sm opacity-90">Total Cost (2% × {years}Y)</div><div className="text-lg font-bold text-red-300">₹{Math.round(activeCost).toLocaleString('en-IN')}</div></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center text-lg">
                💎 Index Fund Saves: ₹{Math.round(savingsFromIndex).toLocaleString('en-IN')} More!
              </div>
            </div>
          </motion.section>

          {/* Best Index Funds */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🏆 Best Index Funds in India (2025)</h2>

              <div className="space-y-6">
                <div className="border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">UTI Nifty 50 Index Fund</h3>
                      <p className="text-gray-600">Lowest expense ratio!</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">0.05%</div>
                      <div className="text-sm text-gray-600">Expense Ratio</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <strong>✅ Why Best:</strong>
                      <ul className="text-sm space-y-1 text-gray-700 mt-2">
                        <li>• Lowest cost: 0.05% (₹500 on ₹10L/year)</li>
                        <li>• Tracking error: <0.05% (excellent!)</li>
                        <li>• AUM: ₹30,000+ crore (large, stable)</li>
                        <li>• Min SIP: ₹500/month</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <strong>Returns (Last 10 Years):</strong>
                      <p className="text-3xl font-bold text-blue-600">14.2%</p>
                      <p className="text-sm text-gray-600 mt-2">₹10L became ₹37L in 10 years!</p>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-orange-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">ICICI Pru Nifty 50 Index Fund</h3>
                      <p className="text-gray-600">Reliable option</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">0.20%</div>
                      <div className="text-sm text-gray-600">Expense Ratio</div>
                    </div>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Established fund with good track record</li>
                    <li>• Tracking error: 0.1%</li>
                    <li>• Easy SIP setup via ICICI Direct</li>
                  </ul>
                </div>

                <div className="border-2 border-green-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">HDFC Index Fund - Nifty 50 Plan</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">0.20%</div>
                      <div className="text-sm text-gray-600">Expense Ratio</div>
                    </div>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Large AUM: ₹10,000+ crore</li>
                    <li>• Good liquidity</li>
                    <li>• HDFC brand trust</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
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

          {/* Key Takeaways */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Index funds copy Nifty 50/Sensex automatically. Your returns = Index returns (11-12% over 15 years).</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>85% active funds FAIL to beat index! Lower costs (0.1% vs 2%) = You keep more returns.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Best: UTI Nifty 50 (0.05% expense), ICICI Pru Nifty 50, HDFC Nifty 50.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Start SIP with ₹5,000/month → Get India's growth automatically!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Calculators */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Calculators</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/calculators/sip-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Calculator className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">SIP Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate index fund SIP returns</p>
                </Link>
                <Link to="/calculators/mutual-fund-returns-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">MF Calculator</h3>
                  <p className="text-sm text-gray-600">Compare different funds</p>
                </Link>
                <Link to="/calculators/income-tax-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <DollarSign className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tax Calculator</h3>
                  <p className="text-sm text-gray-600">LTCG/STCG calculation</p>
                </Link>
              </div>
            </div>
          </motion.section>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Asset Allocation Strategy (Equity, Debt, Gold)</h3>
            <p className="mb-6 text-purple-100">Learn how to split your portfolio across different asset classes for maximum returns with minimum risk!</p>
            <Link to="/learn/investing-wealth/asset-allocation-equity-debt-gold-diversification-strategy-india" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next Lesson: Asset Allocation
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexFundsETFs;
