import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  BarChart3, Layers, Lock, Users, Star, Sparkles, Clock, BadgeCheck, XCircle, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const MaximizingReturns: React.FC = () => {
  const [portfolio, setPortfolio] = useState(1000000);
  
  // Basic strategy (all in savings @ 3%)
  const basicReturns = (portfolio * 3) / 100;
  
  // Optimized strategy
  const highInterestPortion = Math.min(portfolio * 0.3, 500000); // 30% or max ₹5L in high-interest (6.5%)
  const fiveYearFD = portfolio * 0.4; // 40% in 5-year FD @ 7.5%
  const sweepInPortion = portfolio * 0.2; // 20% in sweep-in @ 6%
  const liquidPortion = portfolio * 0.1; // 10% in liquid savings @ 3%
  
  const optimizedReturns = 
    (highInterestPortion * 6.5) / 100 +
    (fiveYearFD * 7.5) / 100 +
    (sweepInPortion * 6) / 100 +
    (liquidPortion * 3) / 100;
  
  const extraEarnings = optimizedReturns - basicReturns;

  const faqData = [
    {
      question: "What is FD laddering and how does it help?",
      answer: "FD laddering: Split ₹10L into 5 FDs of ₹2L each with staggered maturity (1Y, 2Y, 3Y, 4Y, 5Y). Benefits: (1) One FD matures every year (liquidity), (2) Higher average interest, (3) Reinvest at current rates. Better than single ₹10L FD!"
    },
    {
      question: "Should I keep all money in one bank or spread across multiple banks?",
      answer: "Spread across 2-3 banks! Benefits: (1) DICGC insurance ₹5L per bank (total ₹15L covered), (2) Backup if one bank has system issues, (3) Access to different offers. But don't go beyond 3-4 banks (becomes messy)."
    },
    {
      question: "High-interest vs FD - where should I put more money?",
      answer: "High-interest savings (6.5%) for emergency fund (₹2-5L). FD (7-8%) for goals 1-5 years away. Don't put all in FD - you need liquidity! 60-40 split recommended."
    },
    {
      question: "What is quarterly compounding and why does it matter?",
      answer: "Banks compound interest quarterly (every 3 months) vs annually (once a year). On ₹10L @ 7% for 5 years: Quarterly = ₹4.18L interest vs Annual = ₹4.02L. Extra ₹16,000! Always choose quarterly compounding."
    },
    {
      question: "Should senior citizens invest only in SCSS?",
      answer: "No! Diversify: ₹15L in SCSS (8.2%, 80C benefit) + ₹9L in POMIS (monthly income) + Rest in Sr Citizen FDs (7.5%). Don't put all eggs in one basket!"
    },
    {
      question: "What is tax-saving FD under Section 80C?",
      answer: "5-year lock-in FD where investment (up to ₹1.5L) gets 80C deduction. Interest rate: 7-7.5%. Benefits: Tax saving + guaranteed returns. But can't withdraw before 5 years!"
    },
    {
      question: "Should I invest in corporate FDs for higher returns?",
      answer: "Corporate FDs give 8-9% (vs 7% bank FD) BUT risky! If company defaults, you lose money. Only invest in AAA-rated companies (HDFC Ltd, Bajaj Finance) and max 10-20% of portfolio."
    },
    {
      question: "What are cumulative FDs and how are they better?",
      answer: "Cumulative FD: Interest reinvested (compounds) till maturity. Non-cumulative: Interest paid quarterly. Cumulative gives higher returns. Example: ₹10L for 5Y @ 7% → Cumulative: ₹14.03L vs Non-cumulative: ₹13.5L. Choose cumulative if you don't need monthly income!"
    },
    {
      question: "Can I increase returns by doing FD in multiple banks?",
      answer: "Yes! Different banks offer different rates. Example: AU Bank 7.25%, SBI 7.1%. Difference on ₹10L = ₹1,500/year extra! Compare rates before investing."
    },
    {
      question: "What is the best strategy for ₹10 lakh savings?",
      answer: "Optimized: ₹5L high-interest savings (emergency fund), ₹3L in 5-year FD (highest rate), ₹1.5L tax-saver FD (80C), ₹50K liquid savings. Returns: ₹60,000/year vs ₹30,000 if all in regular savings!"
    },
    {
      question: "Should I close FD if rates go up?",
      answer: "Check premature withdrawal penalty (0.5-1%). If new rate is 1% higher and 3+ years remaining, worth breaking and reinvesting. Calculate: Penalty vs Extra interest over remaining period."
    },
    {
      question: "Can NRIs earn higher returns on Indian bank deposits?",
      answer: "NRE FDs: 6-7% (tax-free, repatriable). FCNR deposits: 4-5%. Higher than US banks (1-2%)! Best: Open NRE FDs in HDFC, ICICI, Axis for better rates + safety."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Maximize Bank Returns 2025: 10 Strategies to Earn 2-3% More on Savings | MoneyCal"
        description="Advanced guide to maximizing bank returns in India. FD laddering strategy, high-interest accounts (6-7%), sweep-in optimization, quarterly compounding, tax-saving FDs, SCSS for seniors, multiple bank distribution. Earn ₹60,000 vs ₹30,000 on ₹10L. Complete Calculator, examples, case studies."
        keywords="maximize bank returns India, FD laddering strategy, high interest savings optimization, quarterly compounding, tax saving FD 80C, bank investment strategies, best bank returns 2025, बैंक रिटर्न बढ़ाएं"
        url="/learn/savings-bank-products/maximizing-bank-returns-strategies-earn-more-savings-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Savings & Bank Products</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 8 of 9</span>
                <Link 
                  to="/learn/savings-bank-products"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span className="hidden sm:inline">Back to Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                  Lesson 8 • 45 Minutes • Intermediate
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Maximizing Bank Returns
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  10 Strategies to Earn 2-3% More Annually - बैंक रिटर्न बढ़ाने की रणनीतियां
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-green-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>10 advanced strategies: FD laddering, high-interest accounts, sweep-in optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Earn ₹60,000 vs ₹30,000 on ₹10L (100% more!) with smart allocation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Tax optimization: 80C FDs, quarterly compounding impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Implementation checklist & real case studies</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Portfolio Optimizer Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                🧮 Bank Portfolio Optimizer
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Total Savings to Optimize (₹)</label>
                <input
                  type="number"
                  value={portfolio}
                  onChange={(e) => setPortfolio(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-2xl"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Strategy */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-red-300" />
                    ❌ Basic (All in Savings @ 3%)
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm opacity-90">Total Amount</div>
                      <div className="text-2xl font-bold">₹{portfolio.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Annual Returns @ 3%</div>
                      <div className="text-3xl font-bold text-red-300">₹{basicReturns.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                {/* Optimized Strategy */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                    ✅ Optimized (Smart Allocation)
                  </h3>
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span>High-Interest (30%):</span>
                      <span>₹{highInterestPortion.toLocaleString('en-IN')} @ 6.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5-Year FD (40%):</span>
                      <span>₹{fiveYearFD.toLocaleString('en-IN')} @ 7.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sweep-In (20%):</span>
                      <span>₹{sweepInPortion.toLocaleString('en-IN')} @ 6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Liquid (10%):</span>
                      <span>₹{liquidPortion.toLocaleString('en-IN')} @ 3%</span>
                    </div>
                  </div>
                  <div className="border-t border-white/30 pt-3">
                    <div className="text-sm opacity-90">Annual Returns (Optimized)</div>
                    <div className="text-3xl font-bold text-green-300">₹{Math.round(optimizedReturns).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center text-lg">
                💰 Extra Earnings: ₹{Math.round(extraEarnings).toLocaleString('en-IN')}/year ({Math.round((extraEarnings / basicReturns) * 100)}% more!)
              </div>
            </div>
          </motion.section>

          {/* 10 Strategies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🚀 10 Advanced Strategies to Maximize Returns</h2>

              <div className="space-y-8">
                {/* Strategy 1 */}
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">High-Interest Digital Bank Accounts (6-7%)</h3>
                      <p className="text-gray-700 mb-3">
                        Move ₹2-5L emergency fund to Jupiter (6.5%), AU Bank (7.25%), or DBS (7%). Earn 2x more than traditional banks!
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Example:</strong> ₹3L in DBS @ 7% = ₹21,000/year vs ₹9,000 in HDFC @ 3%
                        <p className="text-green-600 font-bold">Extra: ₹12,000/year!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy 2 */}
                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">FD Laddering Strategy</h3>
                      <p className="text-gray-700 mb-3">
                        Instead of single ₹10L FD for 5 years, create ladder with staggered maturities.
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Example Ladder:</strong>
                        <ul className="text-sm space-y-1 mt-2">
                          <li>• ₹2L FD for 1 year @ 6.5%</li>
                          <li>• ₹2L FD for 2 years @ 7%</li>
                          <li>• ₹2L FD for 3 years @ 7.3%</li>
                          <li>• ₹2L FD for 4 years @ 7.5%</li>
                          <li>• ₹2L FD for 5 years @ 7.8%</li>
                        </ul>
                        <p className="text-green-600 font-bold mt-3">Benefits: One FD matures every year (liquidity) + Higher average rate!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy 3 */}
                <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Sweep-In for Idle Money</h3>
                      <p className="text-gray-700 mb-3">
                        Activate sweep-in facility. Money above threshold (₹25K) auto-sweeps to FD @ 6.5%.
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Example:</strong> ₹80K balance, ₹25K threshold
                        <p>• ₹25K in savings @ 3% = ₹750</p>
                        <p>• ₹55K auto-swept to FD @ 6.5% = ₹3,575</p>
                        <p className="text-green-600 font-bold">Total: ₹4,325 vs ₹2,400 (78% more!)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy 4 */}
                <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Quarterly Compounding</h3>
                      <p className="text-gray-700 mb-3">
                        Banks compound interest quarterly (4 times/year) or annually (1 time/year). Quarterly gives more!
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Example:</strong> ₹10L FD @ 7% for 5 years
                        <p>• Quarterly compound: ₹14,18,000 (₹4.18L interest)</p>
                        <p>• Annual compound: ₹14,02,000 (₹4.02L interest)</p>
                        <p className="text-green-600 font-bold">Quarterly earns ₹16,000 extra!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy 5 */}
                <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Senior Citizen Schemes (60+ Only)</h3>
                      <p className="text-gray-700 mb-3">
                        If you're 60+, use SCSS (8.2%) instead of regular FD (7%). Extra 0.7% + 80C tax benefit!
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Example:</strong> ₹15L investment
                        <p>• SCSS @ 8.2%: ₹1,23,000/year + ₹1.5L 80C deduction</p>
                        <p>• Regular FD @ 7%: ₹1,05,000/year, no 80C</p>
                        <p className="text-green-600 font-bold">SCSS gives ₹18,000 more + tax savings!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy 6 */}
                <div className="border-l-4 border-teal-500 bg-teal-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Multiple Banks for DICGC Coverage</h3>
                      <p className="text-gray-700 mb-3">
                        Don't keep more than ₹5L in one bank (DICGC limit). Spread across 2-3 banks for safety.
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Example:</strong> ₹15L to save
                        <p>• ₹5L in Jupiter (6.5%) → Fully insured ✅</p>
                        <p>• ₹5L in AU Bank (7.25%) → Fully insured ✅</p>
                        <p>• ₹5L in DBS (7%) → Fully insured ✅</p>
                        <p className="text-green-600 font-bold mt-2">Total: ₹1,00,875/year + 100% safety!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy 7 */}
                <div className="border-l-4 border-indigo-500 bg-indigo-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">7</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Tax-Saving FDs under Section 80C</h3>
                      <p className="text-gray-700 mb-3">
                        Invest ₹1.5L in 5-year tax-saver FD. Get 80C deduction + 7-7.5% returns!
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Tax Saving Example (30% tax bracket):</strong>
                        <p>• ₹1.5L investment → ₹45,000 tax saved</p>
                        <p>• FD interest @ 7% for 5 years: ₹65,000</p>
                        <p className="text-green-600 font-bold">Total benefit: ₹1,10,000!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy 8 */}
                <div className="border-l-4 border-pink-500 bg-pink-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">8</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Corporate FDs for Higher Returns (Risky!)</h3>
                      <p className="text-gray-700 mb-3">
                        AAA-rated corporate FDs give 8-9% (vs 7% bank FD). Only invest max 10-20% of portfolio.
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Safe Options:</strong>
                        <p>• Bajaj Finance FD: 8.5% (AAA rated)</p>
                        <p>• HDFC Ltd FD: 7.9% (AAA rated)</p>
                        <p>• Mahindra Finance: 8.3% (AAA rated)</p>
                        <div className="mt-3 bg-yellow-50 p-3 rounded">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 inline mr-1" />
                          <span className="text-sm text-yellow-900">Check latest credit ratings before investing!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy 9 */}
                <div className="border-l-4 border-cyan-500 bg-cyan-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">9</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Cumulative FDs for Maximum Compounding</h3>
                      <p className="text-gray-700 mb-3">
                        Choose cumulative (reinvest interest) over non-cumulative (monthly payout) if you don't need regular income.
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Example:</strong> ₹10L for 5 years @ 7%
                        <p>• Cumulative: ₹14,03,000 (₹4.03L interest)</p>
                        <p>• Non-cumulative: ₹13,50,000 (₹3.5L paid quarterly)</p>
                        <p className="text-green-600 font-bold">Cumulative earns ₹53,000 more!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy 10 */}
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">10</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">NRE/NRO Accounts for NRIs</h3>
                      <p className="text-gray-700 mb-3">
                        NRIs can earn 6-7% on NRE FDs (tax-free!) vs 1-2% in USA/UK. Repatriable to any country!
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <strong>Example:</strong> $10,000 (₹8.3L) NRE FD
                        <p>• India NRE @ 7%: $581/year (TAX FREE!)</p>
                        <p>• USA Savings @ 2%: $200/year (taxable)</p>
                        <p className="text-green-600 font-bold">India gives $381 more (190% higher!)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Implementation Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                ✅ Your Action Checklist (Start Today!)
              </h2>

              <div className="space-y-3">
                {[
                  'Check current savings balance across all banks',
                  'Open high-interest account (Jupiter/AU Bank/DBS) for emergency fund',
                  'Activate sweep-in facility on main account (if ₹50K+ balance)',
                  'Create FD ladder if you have ₹5L+ to invest (stagger 1-5 years)',
                  'If 60+, move ₹15L to SCSS (8.2% + 80C benefit)',
                  'Invest ₹1.5L in tax-saver FD for 80C deduction',
                  'Check FD rates across 3-4 banks, choose highest',
                  'Choose cumulative FD (not non-cumulative) for maximum compounding',
                  'Spread portfolio across 2-3 banks (₹5L max per bank for DICGC)',
                  'Review and rebalance every year when FDs mature'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <span className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">{i + 1}</span>
                    <p className="text-white pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
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

          {/* Detailed Case Studies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-600" />
                📊 Real Case Studies: Before & After Optimization
              </h2>

              {/* Case Study 1 */}
              <div className="mb-8 border-b pb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Case Study 1: Rajesh (45, Software Engineer)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                      <XCircle className="w-6 h-6" />
                      Before (Lazy Savings)
                    </h4>
                    <div className="space-y-3 text-gray-800">
                      <p><strong>Portfolio:</strong> ₹25 lakh savings</p>
                      <p><strong>Strategy:</strong> All in SBI Savings @ 3%</p>
                      <p><strong>Annual Returns:</strong> ₹75,000</p>
                      <p className="text-sm bg-white p-3 rounded">
                        "I kept everything in one account because it was convenient. Didn't know I was losing money!"
                      </p>
                    </div>
                  </div>

                  {/* After */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      After (Optimized Strategy)
                    </h4>
                    <div className="space-y-3 text-gray-800">
                      <p><strong>Portfolio:</strong> Same ₹25 lakh</p>
                      <p><strong>New Strategy:</strong></p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• ₹5L → AU Bank Savings @ 7% (emergency)</li>
                        <li>• ₹10L → 5-year FD ladder @ 7.5%</li>
                        <li>• ₹1.5L → Tax-saver FD @ 7% (80C)</li>
                        <li>• ₹5L → Sweep-in account @ 6.5%</li>
                        <li>• ₹3.5L → Liquid savings @ 3%</li>
                      </ul>
                      <p><strong>Annual Returns:</strong> ₹1,67,500</p>
                      <p className="text-green-700 font-bold text-lg">Extra: ₹92,500/year! (123% increase)</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <strong className="text-yellow-900">Result After 10 Years:</strong>
                  <p className="text-yellow-900">• Before: ₹32.5L (₹7.5L interest)</p>
                  <p className="text-yellow-900">• After: ₹41.75L (₹16.75L interest)</p>
                  <p className="text-green-700 font-bold">Rajesh earned ₹9.25 LAKH extra by optimizing!</p>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="mb-8 border-b pb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Case Study 2: Mrs. Sharma (62, Retired Teacher)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                      <XCircle className="w-6 h-6" />
                      Before (Confused Strategy)
                    </h4>
                    <div className="space-y-3 text-gray-800">
                      <p><strong>Retirement Corpus:</strong> ₹20 lakh</p>
                      <p><strong>Strategy:</strong> All in 3-year FD @ 7%</p>
                      <p><strong>Annual Income:</strong> ₹1,40,000</p>
                      <p><strong>Monthly Income:</strong> ₹11,666</p>
                      <p className="text-sm bg-white p-3 rounded">
                        "I need monthly income but my FD gives lump sum only at maturity. I keep breaking FDs and losing penalty."
                      </p>
                    </div>
                  </div>

                  {/* After */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      After (Senior Citizen Plan)
                    </h4>
                    <div className="space-y-3 text-gray-800">
                      <p><strong>Portfolio:</strong> Same ₹20 lakh</p>
                      <p><strong>Optimized Strategy:</strong></p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• ₹15L → SCSS @ 8.2% (₹1.23L/year, quarterly payout)</li>
                        <li>• ₹3L → POMIS @ 7.4% (₹22,200/year, monthly payout)</li>
                        <li>• ₹2L → Sr Citizen FD @ 7.5% (emergency)</li>
                      </ul>
                      <p><strong>Annual Income:</strong> ₹1,67,200</p>
                      <p><strong>Monthly Income:</strong> ₹13,933</p>
                      <p className="text-green-700 font-bold text-lg">Extra: ₹27,200/year + ₹40,500 tax savings (80C)!</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <strong className="text-yellow-900">Benefit:</strong>
                  <p className="text-yellow-900">• 19% higher income + Regular quarterly/monthly payouts</p>
                  <p className="text-yellow-900">• Tax savings: ₹40,500 in 30% bracket (₹1.5L 80C deduction)</p>
                  <p className="text-green-700 font-bold">Total benefit: ₹67,700/year!</p>
                </div>
              </div>

              {/* Case Study 3 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Case Study 3: Priya (28, Marketing Manager)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                      <XCircle className="w-6 h-6" />
                      Before (No Planning)
                    </h4>
                    <div className="space-y-3 text-gray-800">
                      <p><strong>Savings:</strong> ₹8 lakh</p>
                      <p><strong>Goals:</strong> Wedding in 3 years (₹10L needed)</p>
                      <p><strong>Strategy:</strong> All in savings @ 3%</p>
                      <p><strong>After 3 Years:</strong> ₹8.73L (short by ₹1.27L!)</p>
                      <p className="text-sm bg-white p-3 rounded">
                        "I'm saving ₹50K/month but still short of goal. Where's the money going?"
                      </p>
                    </div>
                  </div>

                  {/* After */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      After (Goal-Based Strategy)
                    </h4>
                    <div className="space-y-3 text-gray-800">
                      <p><strong>Current Corpus:</strong> ₹8 lakh</p>
                      <p><strong>Monthly SIP:</strong> ₹50K</p>
                      <p><strong>Optimized Strategy:</strong></p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• ₹8L → 3-year FD @ 7.25% (AU Bank)</li>
                        <li>• ₹50K/month → High-yield debt fund @ 8%</li>
                      </ul>
                      <p><strong>After 3 Years:</strong></p>
                      <p className="text-sm">• FD maturity: ₹9.91L</p>
                      <p className="text-sm">• Debt fund: ₹20.16L (₹18L invested + ₹2.16L returns)</p>
                      <p><strong>Total:</strong> ₹30.07L</p>
                      <p className="text-green-700 font-bold text-lg">Goal achieved + ₹20L extra for house down payment!</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <strong className="text-yellow-900">Lesson Learned:</strong>
                  <p className="text-yellow-900">Priya realized that 3% savings was eating into her goals. By moving to higher-return products (7-8%), she not only met her wedding goal but also accumulated extra ₹20L for her next goal!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Common Mistakes to Avoid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                ⚠️ Common Mistakes (Avoid These!)
              </h2>

              <div className="space-y-6">
                {/* Mistake 1 */}
                <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-3">❌ Mistake 1: Keeping Everything in One Low-Interest Savings Account</h3>
                  <p className="text-gray-800 mb-2">
                    <strong>Problem:</strong> ₹10L in regular savings @ 3% = ₹30,000/year. You're losing ₹30,000+ annually!
                  </p>
                  <p className="text-gray-800 mb-3">
                    <strong>Why It Happens:</strong> Convenience, laziness, "don't know better options exist"
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-green-700 mb-2">✅ Fix:</p>
                    <ul className="text-sm space-y-1 text-gray-800">
                      <li>• Keep only 10-20% in regular savings (₹1-2L for daily expenses)</li>
                      <li>• Move rest to: FDs (7-8%), high-interest accounts (6-7%), sweep-in (6-6.5%)</li>
                      <li>• Action: Open AU Bank/Jupiter account TODAY for 7% on emergency fund</li>
                    </ul>
                  </div>
                </div>

                {/* Mistake 2 */}
                <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-3">❌ Mistake 2: Not Comparing FD Rates Across Banks</h3>
                  <p className="text-gray-800 mb-2">
                    <strong>Problem:</strong> SBI FD @ 7.1% vs AU Bank @ 7.25%. On ₹10L, you lose ₹1,500/year!
                  </p>
                  <p className="text-gray-800 mb-3">
                    <strong>Why It Happens:</strong> "My salary account is in SBI, so I'll do FD there only"
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-green-700 mb-2">✅ Fix:</p>
                    <ul className="text-sm space-y-1 text-gray-800">
                      <li>• Compare 4-5 banks before making FD: Use BankBazaar, Paisabazaar</li>
                      <li>• Small Finance Banks give 0.25-0.5% extra (AU, Ujjivan, Jana, Equitas)</li>
                      <li>• Senior citizens get extra 0.5% in all banks!</li>
                      <li>• Time taken: 10 minutes. Money saved: ₹1,500-5,000/year</li>
                    </ul>
                  </div>
                </div>

                {/* Mistake 3 */}
                <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-3">❌ Mistake 3: Ignoring Quarterly Compounding</h3>
                  <p className="text-gray-800 mb-2">
                    <strong>Problem:</strong> Choosing annual compounding FD when quarterly is available. On ₹10L @ 7% for 5 years, you lose ₹16,000!
                  </p>
                  <p className="text-gray-800 mb-3">
                    <strong>Why It Happens:</strong> "I didn't even know compounding frequency matters"
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-green-700 mb-2">✅ Fix:</p>
                    <ul className="text-sm space-y-1 text-gray-800">
                      <li>• ALWAYS choose quarterly compounding in FDs (available in all banks)</li>
                      <li>• Calculator: ₹10L @ 7% for 5Y → Quarterly: ₹4.18L vs Annual: ₹4.02L</li>
                      <li>• It's a checkbox when opening FD online - just select "Quarterly"!</li>
                    </ul>
                  </div>
                </div>

                {/* Mistake 4 */}
                <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-3">❌ Mistake 4: Breaking FDs Early (Premature Withdrawal Penalty)</h3>
                  <p className="text-gray-800 mb-2">
                    <strong>Problem:</strong> Break 5-year FD after 2 years → Lose 0.5-1% interest + penalty. On ₹10L, lose ₹20,000+!
                  </p>
                  <p className="text-gray-800 mb-3">
                    <strong>Why It Happens:</strong> No emergency fund + put all money in long-term FDs
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-green-700 mb-2">✅ Fix:</p>
                    <ul className="text-sm space-y-1 text-gray-800">
                      <li>• Keep 6-12 months expenses in liquid high-interest account (NOT FD)</li>
                      <li>• Use FD Laddering: Stagger maturities so one FD becomes available every year</li>
                      <li>• If you must break FD: Calculate penalty vs opportunity cost first</li>
                      <li>• Emergency fund = Your safety net so you DON'T break FDs!</li>
                    </ul>
                  </div>
                </div>

                {/* Mistake 5 */}
                <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-3">❌ Mistake 5: Not Using Sweep-In Facility</h3>
                  <p className="text-gray-800 mb-2">
                    <strong>Problem:</strong> Keeping ₹5L idle in savings @ 3% when sweep-in gives 6-6.5% (same liquidity!)
                  </p>
                  <p className="text-gray-800 mb-3">
                    <strong>Why It Happens:</strong> "I didn't know sweep-in exists" or "Sounds complicated"
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-green-700 mb-2">✅ Fix:</p>
                    <ul className="text-sm space-y-1 text-gray-800">
                      <li>• Activate sweep-in in 5 minutes via netbanking</li>
                      <li>• Set threshold: e.g., ₹50K. Balance above ₹50K auto-moves to FD @ 6.5%</li>
                      <li>• When you need money, auto-withdraws from FD (no penalty!)</li>
                      <li>• Works like savings but earns double the interest!</li>
                    </ul>
                  </div>
                </div>

                {/* Mistake 6 */}
                <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-3">❌ Mistake 6: Seniors Not Using SCSS (Missing 8.2% Interest!)</h3>
                  <p className="text-gray-800 mb-2">
                    <strong>Problem:</strong> 60+ keeping ₹15L in regular FD @ 7.5% instead of SCSS @ 8.2%. Losing ₹10,500/year + 80C benefit!
                  </p>
                  <p className="text-gray-800 mb-3">
                    <strong>Why It Happens:</strong> "Don't know about SCSS" or "Post office is far, bank is convenient"
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-green-700 mb-2">✅ Fix:</p>
                    <ul className="text-sm space-y-1 text-gray-800">
                      <li>• If 60+: Move ₹15L (max) to SCSS immediately! Can open in bank + post office</li>
                      <li>• SCSS: 8.2% + 80C deduction + Quarterly payout + Govt backed (zero risk)</li>
                      <li>• On ₹15L: SCSS gives ₹1.23L/year vs FD ₹1.125L = Extra ₹10,500!</li>
                      <li>• Plus: Save ₹46,500 tax in 30% bracket (₹1.5L 80C)</li>
                    </ul>
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
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Smart allocation beats lazy savings:</strong> Earn ₹60,000 vs ₹30,000 on ₹10L (2x more!)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>High-interest accounts:</strong> Move emergency fund to 6-7% digital banks (2x traditional)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>FD laddering:</strong> Creates liquidity + higher average returns (stagger 1-5 years)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Quarterly compounding:</strong> Earn ₹16,000 extra on ₹10L over 5 years</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>SCSS for 60+:</strong> 8.2% + 80C benefit = Unbeatable for retirees!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Lessons */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Lessons & Tools</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/learn/savings-bank-products/fixed-deposits-fd-interest-rates-tax-laddering-strategy-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Layers className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">FD Laddering Guide</h3>
                  <p className="text-sm text-gray-600">Master the laddering strategy</p>
                </Link>
                <Link to="/learn/savings-bank-products/high-interest-savings-accounts-digital-banks-india-comparison" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">High-Interest Accounts</h3>
                  <p className="text-sm text-gray-600">Best digital banks 6-7%</p>
                </Link>
                <Link to="/calculators/fd-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <IndianRupee className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">FD Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate returns</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Featured Tool - Bank Returns Optimizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-8 shadow-2xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-10 h-10" />
                <div>
                  <div className="text-sm uppercase tracking-wide font-semibold opacity-90">🎯 Apply What You Learned</div>
                  <h3 className="text-3xl font-bold">Free Bank Returns Optimizer Tool</h3>
                </div>
              </div>
              <p className="text-xl mb-6">
                Get AI-powered recommendations to maximize your bank returns. Calculate optimal allocation across FDs, high-interest accounts, and sweep-in facilities. See exactly how much more you can earn!
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">100%+</div>
                  <div className="text-sm">More Returns Possible</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">₹30K+</div>
                  <div className="text-sm">Extra on ₹10L Savings</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">2 Min</div>
                  <div className="text-sm">Get Your Plan</div>
                </div>
              </div>
              <Link
                to="/tools/bank-returns-optimizer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <IndianRupee className="w-6 h-6" />
                Try Free Tool Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Course Complete */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-12 h-12" />
              <h3 className="text-3xl font-bold">🎉 Course Complete!</h3>
            </div>
            <p className="text-xl mb-6">Congratulations! You've mastered Savings & Bank Products</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/learn/savings-bank-products"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
                Back to Hub
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Explore Other Categories
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaximizingReturns;
