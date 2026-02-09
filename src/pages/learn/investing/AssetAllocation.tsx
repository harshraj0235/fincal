import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, PieChart, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  BarChart3, TrendingUp, Users, Star, Layers, Activity, LineChart
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const AssetAllocation: React.FC = () => {
  const [age, setAge] = useState(30);
  const [riskTolerance, setRiskTolerance] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  
  // Rule: 100 - Age = Equity %
  const baseEquity = 100 - age;
  
  // Adjust based on risk tolerance
  const equityPercent = riskTolerance === 'conservative' ? Math.max(baseEquity - 10, 30) :
                        riskTolerance === 'aggressive' ? Math.min(baseEquity + 10, 90) :
                        baseEquity;
  const debtPercent = Math.max(100 - equityPercent - 10, 10);
  const goldPercent = 10;
  
  const [portfolio, setPortfolio] = useState(1000000);
  const equityAmount = (portfolio * equityPercent) / 100;
  const debtAmount = (portfolio * debtPercent) / 100;
  const goldAmount = (portfolio * goldPercent) / 100;
  
  const equityReturns = (equityAmount * 12) / 100;
  const debtReturns = (debtAmount * 7) / 100;
  const goldReturns = (goldAmount * 8) / 100;
  const totalReturns = equityReturns + debtReturns + goldReturns;

  const faqData = [
    {
      question: "What is asset allocation and why is it important?",
      answer: "Asset allocation means dividing your portfolio across different asset classes (equity, debt, gold, cash). It's THE most important factor - 90% of portfolio returns depend on allocation, only 10% on which specific stocks/funds you pick!"
    },
    {
      question: "What is the 100-age rule for equity allocation?",
      answer: "Formula: (100 - Your Age) = Equity %. Example: 30 years old → 70% equity, 30% debt+gold. At 60 years → 40% equity, 60% debt+gold. Logic: Younger = More time to recover from market falls."
    },
    {
      question: "Should I invest in gold? How much?",
      answer: "Yes! Gold hedge against inflation and rupee depreciation. Ideal: 10% of portfolio in gold (Sovereign Gold Bonds or Gold ETF). Example: ₹10L portfolio → ₹1L in gold. Never more than 15%."
    },
    {
      question: "What is debt allocation - is it just FD?",
      answer: "Debt allocation includes: (1) Debt mutual funds (7-8% returns), (2) FDs (7%), (3) Bonds, (4) PPF (7.1%), (5) EPF (8.15%). Choose based on liquidity needs and tax bracket."
    },
    {
      question: "How often should I rebalance my portfolio?",
      answer: "Once a year! Example: Started with 70% equity, 20% debt, 10% gold. After 1 year, equity grew to 80% (bull market). Rebalance: Sell 10% equity, buy debt/gold. Maintains risk level + books profits!"
    },
    {
      question: "Conservative vs Moderate vs Aggressive - how to know mine?",
      answer: "Conservative: Can't sleep if portfolio falls 20%. Retire in <10 years. Moderate: Okay with 20-30% temporary falls. 10-20 years to goal. Aggressive: Can handle 40% crash. 20+ years to goal."
    },
    {
      question: "Can I put 100% in equity for maximum returns?",
      answer: "Risky! In 2008, portfolios fell 50%. With 100% equity, ₹10L became ₹5L! With 60-30-10 allocation, only fell to ₹7L. Debt+gold cushions falls. Never go 100% equity unless <25 years old!"
    },
    {
      question: "What happens if I don't rebalance?",
      answer: "Your risk increases! Example: Start 70% equity. After 5-year bull run, becomes 85% equity. If market crashes 40%, you lose more! Rebalancing keeps risk in control."
    },
    {
      question: "Should allocation change with market levels?",
      answer: "Yes! When Nifty PE >25 (expensive market): Increase debt to 40-50%. When PE <18 (cheap market): Increase equity to 80%. This is tactical allocation on top of strategic allocation."
    },
    {
      question: "Equity mutual funds or direct stocks for equity allocation?",
      answer: "For most people: Mutual funds! Diversification automatic, professional management. Direct stocks only if you can research 20+ hours/month. Recommendation: 80% MF + 20% stocks (if you want)."
    },
    {
      question: "What is international diversification - should I invest in US stocks?",
      answer: "Yes, 10-20% in international funds (US/Global). Benefits: (1) Dollar appreciation, (2) Access to Apple, Google, Tesla. Funds: Motilal Nasdaq 100, Parag Parikh Flexi (35% overseas). Tax: Same as equity funds."
    },
    {
      question: "How to allocate ₹10 lakh for 30-year-old?",
      answer: "Example: Age 30, Moderate risk → 70% equity (₹7L), 20% debt (₹2L), 10% gold (₹1L). Equity: 50% Nifty index + 20% mid-cap + 10% international. Debt: 15% debt funds + 5% liquid. Rebalance yearly!"
    },
    {
      question: "Should I allocate to crypto/cryptocurrency?",
      answer: "Max 5% of portfolio if you want to speculate! Crypto is VERY volatile (can fall 70%). Don't treat as serious investment. Only invest money you can afford to lose 100%."
    },
    {
      question: "What is emergency fund allocation?",
      answer: "Keep 3-6 months expenses in liquid assets (savings account, liquid funds). This is SEPARATE from investment allocation! Example: ₹30K/month expenses → Keep ₹1.5L emergency fund. Then allocate remaining corpus."
    },
    {
      question: "Can allocation be too complex?",
      answer: "Yes! Don't create 20 categories. Keep simple: 3-4 asset classes max. Example: 60% equity (2-3 funds), 30% debt (1-2 funds), 10% gold (SGB/ETF). Simple is better!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Asset Allocation Strategy 2025: Equity, Debt, Gold Diversification India | MoneyCal"
        description="Complete asset allocation guide for Indian investors. 100-age rule, equity vs debt vs gold allocation by age (20s: 80% equity, 30s: 70%, 40s: 60%, 50s: 50%, 60s: 40%), risk tolerance assessment, rebalancing strategy, portfolio optimization calculator. Reduce portfolio volatility by 40% with correct allocation!"
        keywords="asset allocation India, equity debt gold allocation, 100 minus age rule, portfolio diversification, rebalancing strategy, risk tolerance, investment allocation by age, परिसंपत्ति आवंटन, equity allocation percentage"
        url="/learn/investing-wealth/asset-allocation-equity-debt-gold-diversification-strategy-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 5 of 11</span>
                <Link 
                  to="/learn/investing-wealth/direct-vs-regular-mutual-funds-save-15-lakh-direct-plans-india"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Lesson 5 • 50 Minutes • Intermediate</div>
                <h1 className="text-4xl font-bold text-gray-900">Asset Allocation Strategy</h1>
                <p className="text-xl text-gray-600 mt-1">Equity, Debt, Gold Diversification - परिसंपत्ति आवंटन रणनीति</p>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-purple-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>100-age rule: Perfect equity allocation by age (30 years = 70% equity)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Equity vs Debt vs Gold: When to use each + optimal percentages</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Rebalancing: How to book profits & reduce risk annually</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Interactive calculator: See your optimal allocation NOW!</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* What is Asset Allocation */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Layers className="w-8 h-8 text-purple-600" />
                What is Asset Allocation?
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Asset Allocation</strong> is how you divide your investment portfolio across different <strong>asset classes</strong>:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 my-6">
                  <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                    <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                    <h4 className="font-bold text-lg text-gray-900 mb-2">📈 Equity (Stocks/MF)</h4>
                    <p className="text-sm text-gray-700">High growth potential: 12-15% returns. High risk: Can fall 30-50% in crashes.</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <Shield className="w-8 h-8 text-blue-600 mb-3" />
                    <h4 className="font-bold text-lg text-gray-900 mb-2">🏦 Debt (FD/Bonds)</h4>
                    <p className="text-sm text-gray-700">Stable returns: 6-8%. Low risk: Principal mostly safe. Cushion for portfolio.</p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                    <Star className="w-8 h-8 text-yellow-600 mb-3" />
                    <h4 className="font-bold text-lg text-gray-900 mb-2">🪙 Gold (SGB/ETF)</h4>
                    <p className="text-sm text-gray-700">Inflation hedge: 8-10% long-term. Rupee depreciation protection.</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h4 className="font-bold text-lg text-purple-900 mb-3">🎯 Why Allocation Matters Most:</h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Research shows:</strong> 90% of portfolio performance depends on asset allocation, only 10% on stock/fund selection!
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Example:</strong>
                    <p className="text-gray-700 mt-2">
                      • Portfolio A: 100% equity → Falls 40% in crash 😰<br/>
                      • Portfolio B: 60% equity, 30% debt, 10% gold → Falls only 20% in same crash 😌<br/>
                      <span className="text-green-600 font-bold">Proper allocation reduces volatility by 50%!</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Interactive Calculator */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                🧮 Your Optimal Asset Allocation Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Portfolio Value (₹)</label>
                  <input type="number" value={portfolio} onChange={(e) => setPortfolio(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Risk Tolerance:</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['conservative', 'moderate', 'aggressive'] as const).map((risk) => (
                    <button
                      key={risk}
                      onClick={() => setRiskTolerance(risk)}
                      className={`px-4 py-3 rounded-lg font-bold capitalize transition-colors ${
                        riskTolerance === risk ? 'bg-white text-purple-600' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {risk}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-6">Your Recommended Allocation:</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-right"><strong>Equity:</strong></div>
                    <div className="flex-1 bg-white/30 rounded-full h-8 overflow-hidden">
                      <div className="bg-green-500 h-full flex items-center justify-center font-bold" style={{ width: `${equityPercent}%` }}>
                        {equityPercent}%
                      </div>
                    </div>
                    <div className="w-32 font-bold text-green-300">₹{(equityAmount/100000).toFixed(2)}L</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-right"><strong>Debt:</strong></div>
                    <div className="flex-1 bg-white/30 rounded-full h-8 overflow-hidden">
                      <div className="bg-blue-500 h-full flex items-center justify-center font-bold" style={{ width: `${debtPercent}%` }}>
                        {debtPercent}%
                      </div>
                    </div>
                    <div className="w-32 font-bold text-blue-300">₹{(debtAmount/100000).toFixed(2)}L</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-right"><strong>Gold:</strong></div>
                    <div className="flex-1 bg-white/30 rounded-full h-8 overflow-hidden">
                      <div className="bg-yellow-500 h-full flex items-center justify-center font-bold" style={{ width: `${goldPercent}%` }}>
                        {goldPercent}%
                      </div>
                    </div>
                    <div className="w-32 font-bold text-yellow-300">₹{(goldAmount/100000).toFixed(2)}L</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold text-xl mb-4">Expected Annual Returns:</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm opacity-90">Equity @ 12%</div>
                    <div className="text-2xl font-bold text-green-300">₹{(equityReturns/1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Debt @ 7%</div>
                    <div className="text-2xl font-bold text-blue-300">₹{(debtReturns/1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Gold @ 8%</div>
                    <div className="text-2xl font-bold text-yellow-300">₹{(goldReturns/1000).toFixed(0)}K</div>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center text-xl">
                  Total Expected: ₹{(totalReturns/1000).toFixed(0)}K/year ({((totalReturns/portfolio)*100).toFixed(1)}% returns)
                </div>
              </div>
            </div>
          </motion.section>

          {/* Age-based Allocation */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">👥 Asset Allocation by Age</h2>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="p-4 font-bold">Age Group</th>
                    <th className="p-4 font-bold text-green-900">Equity %</th>
                    <th className="p-4 font-bold text-blue-900">Debt %</th>
                    <th className="p-4 font-bold text-yellow-900">Gold %</th>
                    <th className="p-4 font-bold">Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-purple-50">
                    <td className="p-4 font-semibold">20-30 years</td>
                    <td className="p-4 text-green-600 font-bold text-xl">70-80%</td>
                    <td className="p-4">10-20%</td>
                    <td className="p-4">10%</td>
                    <td className="p-4 text-sm">Long horizon, can handle volatility</td>
                  </tr>
                  <tr className="border-b bg-gray-50 hover:bg-purple-50">
                    <td className="p-4 font-semibold">30-40 years</td>
                    <td className="p-4 text-green-600 font-bold text-xl">60-70%</td>
                    <td className="p-4">20-30%</td>
                    <td className="p-4">10%</td>
                    <td className="p-4 text-sm">Balancing growth & stability</td>
                  </tr>
                  <tr className="border-b hover:bg-purple-50">
                    <td className="p-4 font-semibold">40-50 years</td>
                    <td className="p-4 text-green-600 font-bold text-xl">50-60%</td>
                    <td className="p-4">30-40%</td>
                    <td className="p-4">10%</td>
                    <td className="p-4 text-sm">More debt for stability</td>
                  </tr>
                  <tr className="border-b bg-gray-50 hover:bg-purple-50">
                    <td className="p-4 font-semibold">50-60 years</td>
                    <td className="p-4 text-green-600 font-bold text-xl">40-50%</td>
                    <td className="p-4">40-50%</td>
                    <td className="p-4">10%</td>
                    <td className="p-4 text-sm">Near retirement, preserve capital</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="p-4 font-semibold">60+ years</td>
                    <td className="p-4 text-green-600 font-bold text-xl">30-40%</td>
                    <td className="p-4">50-60%</td>
                    <td className="p-4">10%</td>
                    <td className="p-4 text-sm">Capital protection + steady income</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> This is for moderate risk tolerance. Conservative: Reduce equity by 10%. Aggressive: Increase equity by 10%.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Rebalancing Strategy */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-3xl font-bold mb-6">🔄 Annual Rebalancing - Book Profits Automatically!</h2>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">Example: Rebalancing After 1 Year Bull Run</h3>
                <div className="space-y-4">
                  <div className="bg-white/30 p-4 rounded-lg">
                    <strong>Initial Allocation (₹10L):</strong>
                    <p className="mt-2">• Equity: ₹7L (70%)</p>
                    <p>• Debt: ₹2L (20%)</p>
                    <p>• Gold: ₹1L (10%)</p>
                  </div>

                  <div className="text-center font-bold text-lg">⬇️ After 1 Year (Bull Market) ⬇️</div>

                  <div className="bg-white/30 p-4 rounded-lg">
                    <strong>New Values:</strong>
                    <p className="mt-2">• Equity: ₹8.4L (75%) ← Grew 20%</p>
                    <p>• Debt: ₹2.14L (19%) ← Grew 7%</p>
                    <p>• Gold: ₹1.08L (10%) ← Grew 8%</p>
                    <p className="font-bold text-yellow-300 mt-2">Total: ₹11.62L</p>
                  </div>

                  <div className="text-center font-bold text-lg">🔄 Rebalance to Target 70-20-10 🔄</div>

                  <div className="bg-green-400 text-green-900 p-4 rounded-lg">
                    <strong>Action:</strong>
                    <p className="mt-2">• Sell ₹62K worth equity (from 75% to 70%)</p>
                    <p>• Buy ₹50K debt (from 19% to 20%)</p>
                    <p>• Buy ₹12K gold (maintain 10%)</p>
                    <p className="font-bold mt-3">✅ Result: Booked profits in equity + reduced risk!</p>
                  </div>
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
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>100-age rule:</strong> At 30, invest 70% in equity. At 50, reduce to 50% equity. Adjust for risk tolerance.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Never 100% equity:</strong> Diversification reduces risk by 40-50%. Always keep 20-30% in debt+gold.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Rebalance annually:</strong> Sell winners, buy losers. Maintains risk level + books profits automatically!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Gold = 10% always:</strong> Inflation hedge + rupee protection. Use SGB or Gold ETF.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Calculators</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/calculators/sip-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Calculator className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">SIP Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate equity portion returns</p>
                </Link>
                <Link to="/calculators/fd-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Shield className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">FD Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate debt portion returns</p>
                </Link>
                <Link to="/calculators/income-tax-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tax Calculator</h3>
                  <p className="text-sm text-gray-600">Tax on rebalancing</p>
                </Link>
              </div>
            </div>
          </motion.section>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Direct vs Regular Mutual Funds (Save ₹15L!)</h3>
            <p className="mb-6 text-blue-100">Learn how direct plans save ₹15 lakh over 20 years compared to regular plans. Stop paying unnecessary commissions!</p>
            <Link to="/learn/investing-wealth/direct-vs-regular-mutual-funds-save-15-lakh-direct-plans-india" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next Lesson: Direct vs Regular MF
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetAllocation;
