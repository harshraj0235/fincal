import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, FileText, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Percent,
  TrendingUp, BarChart3, PieChart, Calendar, Zap, BadgeCheck
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const TaxOnInvestments: React.FC = () => {
  const [capitalGains, setCapitalGains] = useState(200000);
  const [holdingPeriod, setHoldingPeriod] = useState<'short' | 'long'>('long');
  const [assetType, setAssetType] = useState<'equity' | 'debt' | 'gold'>('equity');
  
  // Tax calculation logic
  const calculateTax = () => {
    if (assetType === 'equity') {
      if (holdingPeriod === 'long') {
        // LTCG: 10% above ₹1L
        const exemption = 100000;
        const taxableGains = Math.max(0, capitalGains - exemption);
        return (taxableGains * 10) / 100;
      } else {
        // STCG: 15% flat
        return (capitalGains * 15) / 100;
      }
    } else if (assetType === 'debt') {
      if (holdingPeriod === 'long') {
        // LTCG: 20% with indexation
        return (capitalGains * 20) / 100;
      } else {
        // STCG: As per income tax slab
        return (capitalGains * 30) / 100; // Assuming 30% slab
      }
    } else { // gold
      if (holdingPeriod === 'long') {
        return (capitalGains * 20) / 100; // With indexation
      } else {
        return (capitalGains * 30) / 100; // As per slab
      }
    }
  };

  const tax = calculateTax();
  const afterTaxGains = capitalGains - tax;

  const faqData = [
    {
      question: "What is LTCG and STCG in simple terms?",
      answer: "LTCG (Long-Term Capital Gains): Profit from selling after holding more than 1 year (equity) or more than 3 years (debt/gold). STCG (Short-Term): Profit from selling before this period. LTCG taxed lower than STCG!"
    },
    {
      question: "How much is LTCG tax on equity mutual funds/stocks?",
      answer: "10% tax on gains above ₹1 lakh per financial year. Example: ₹3L gains → First ₹1L exempt, remaining ₹2L taxed at 10% = ₹20,000 tax. Gains below ₹1L = zero tax!"
    },
    {
      question: "What is STCG tax on equity?",
      answer: "15% flat tax on all short-term gains. Example: Bought stock in Jan 2024, sold in Oct 2024 (9 months). Profit ₹50,000 → Tax = ₹7,500 (15%). No exemption for STCG!"
    },
    {
      question: "How is debt fund taxation different?",
      answer: "Debt funds (2023 onwards): ALL gains taxed as per your income slab (20-30%). No LTCG benefit! Better to use debt funds for <3 years only. For long-term debt: Use FD or bonds."
    },
    {
      question: "What is tax harvesting and how does it save tax?",
      answer: "Sell equity investments with ₹1L gains before March 31 (to use exemption), buy back immediately. Example: ₹5L portfolio, ₹1L gains. Sell and buy back → ₹1L gains tax-free! Repeat every year."
    },
    {
      question: "Do I need to file ITR if I only have LTCG below ₹1 lakh?",
      answer: "No! If total income below ₹2.5L and LTCG below ₹1L (exempt), no need to file ITR. But filing is recommended for loan applications, visa, etc."
    },
    {
      question: "When is tax deducted - at the time of selling or annually?",
      answer: "At time of redemption/selling! When you sell mutual fund units, AMC deducts TDS if applicable (if LTCG >₹1L). You pay actual tax when filing ITR (get refund if TDS > actual tax)."
    },
    {
      question: "Is dividend from mutual funds taxable?",
      answer: "Yes, fully taxable as per your slab (20-30%). Dividend added to your income. TDS deducted at 10% if dividend >₹5,000. Growth option better than dividend for tax efficiency!"
    },
    {
      question: "What is indexation benefit in LTCG?",
      answer: "Indexation adjusts purchase price for inflation. Example: Bought gold ₹1L in 2020, sold ₹1.5L in 2024. With indexation, purchase price becomes ₹1.2L (inflation adjustment). Taxable gain: ₹30K (vs ₹50K without). Saves ₹4,000 tax!"
    },
    {
      question: "Can I offset LTCG with STCG?",
      answer: "Yes! STCG losses can offset LTCG. Example: LTCG ₹2L + STCG loss -₹50K = Net LTCG ₹1.5L. Tax on ₹50K only (₹1L exempt). This is tax-loss harvesting!"
    },
    {
      question: "NRI taxation on Indian equity investments?",
      answer: "Same LTCG/STCG as residents BUT + Tax in your country of residence (India-country tax treaty applies). Plus TDS: 10% on LTCG, 15% on STCG (file ITR for refund if lower bracket)."
    },
    {
      question: "How to save tax on equity investment legally?",
      answer: "5 ways: (1) Tax harvesting (use ₹1L exemption yearly), (2) Hold more than 1 year for LTCG, (3) Spread sales across years, (4) Use ₹1L exemption for family members, (5) Invest in ELSS for 80C (separate benefit)."
    },
    {
      question: "What is Section 54/54F for capital gains tax exemption?",
      answer: "Section 54: Capital gains from selling property exempt if buying another property. Section 54F: Invest LTCG in bonds/home to get exemption. Complex - consult CA!"
    },
    {
      question: "Taxation on SGB (Sovereign Gold Bonds)?",
      answer: "Interest: 2.5% taxable as income. Capital gains: TAX FREE if held till maturity (8 years)! If sell before 8 years: LTCG 20% with indexation after 3 years. SGB best for tax!"
    },
    {
      question: "How to report mutual fund gains in ITR?",
      answer: "Use ITR-2 form. Download capital gains statement from fund house/platform. Enter in Schedule CG. Automatic tax calculation. Or use ClearTax/QuickBooks (free for simple ITR)."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Taxation on Investments 2025: LTCG, STCG Complete Guide Equity Debt Gold | MoneyCal"
        description="Complete investment taxation guide for India. LTCG tax 10% above ₹1L (equity), STCG 15% (equity), debt fund taxation 20-30%, gold indexation benefit, tax harvesting strategies, save ₹20,000 annually with ₹1L exemption, Section 54/54F, dividend tax, NRI taxation, ITR filing guide."
        keywords="LTCG tax India, STCG tax rate, equity taxation, mutual fund tax, capital gains tax, tax harvesting, Section 54F, investment tax guide, SGB tax free, निवेश पर कर, LTCG STCG"
        url="/learn/investing-wealth/taxation-investments-ltcg-stcg-equity-debt-gold-tax-guide-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 7 of 11</span>
                <Link 
                  to="/learn/investing-wealth/value-vs-growth-investing-warren-buffett-strategy-india"
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Lesson 7 • 45 Minutes • Intermediate</div>
                <h1 className="text-4xl font-bold text-gray-900">Taxation on Investments</h1>
                <p className="text-xl text-gray-600 mt-1">LTCG, STCG Complete Guide - निवेश पर कर (₹1L छूट का उपयोग करें!)</p>
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
                  <span>LTCG tax: 10% on equity gains above ₹1 lakh (use exemption wisely!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>STCG tax: 15% (equity), 20-30% (debt, gold) - Hold longer!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Tax harvesting: Save ₹10,000-20,000 annually with smart strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Interactive tax calculator for all asset classes</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* LTCG Guide */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                📈 LTCG - Long-Term Capital Gains Tax
              </h2>

              <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">10%</div>
                  <div className="text-xl">Tax on Equity LTCG above ₹1 Lakh</div>
                  <div className="text-sm mt-2 opacity-90">First ₹1L gains per year = Tax FREE! 🎉</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-green-900 mb-3">📋 LTCG for Equity (Stocks/Equity MF):</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Holding Period:</strong> More than 1 year (366 days+)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Tax Rate:</strong> 10% (no indexation benefit)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Exemption:</strong> ₹1,00,000 per financial year (April-March)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Applies To:</strong> Stocks, equity mutual funds, equity-oriented hybrid funds</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-blue-900 mb-4">💰 LTCG Tax Calculation Examples:</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-gray-900">Example 1: ₹80,000 LTCG</strong>
                      <p className="text-gray-700 mt-2">Gains: ₹80,000 (below ₹1L exemption)</p>
                      <p className="text-green-600 font-bold">Tax: ₹0 (Fully Exempt!) 🎉</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-gray-900">Example 2: ₹3,00,000 LTCG</strong>
                      <div className="text-gray-700 mt-2 space-y-1">
                        <p>Total Gains: ₹3,00,000</p>
                        <p className="text-green-600">Less: Exemption -₹1,00,000</p>
                        <p>Taxable Gains: ₹2,00,000</p>
                        <p className="text-red-600 font-bold">Tax @ 10%: ₹20,000</p>
                        <p className="font-bold text-green-700">After-tax gains: ₹2,80,000</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-gray-900">Example 3: ₹10,00,000 LTCG</strong>
                      <div className="text-gray-700 mt-2 space-y-1">
                        <p>Total Gains: ₹10,00,000</p>
                        <p className="text-green-600">Less: Exemption -₹1,00,000</p>
                        <p>Taxable Gains: ₹9,00,000</p>
                        <p className="text-red-600 font-bold">Tax @ 10%: ₹90,000</p>
                        <p className="font-bold text-green-700">After-tax gains: ₹9,10,000 (91%)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* STCG Guide */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-red-600" />
                ⚡ STCG - Short-Term Capital Gains Tax
              </h2>

              <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">15%</div>
                  <div className="text-xl">Tax on Equity STCG (No Exemption!)</div>
                    <div className="text-sm mt-2 opacity-90">Hold more than 1 year to get LTCG benefit instead!</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-red-100">
                      <th className="p-4 font-bold text-gray-900">Asset Class</th>
                      <th className="p-4 font-bold text-gray-900">Holding Period</th>
                      <th className="p-4 font-bold text-red-900">STCG Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-red-50">
                      <td className="p-4 font-semibold">Equity Stocks/MF</td>
                      <td className="p-4">Less than 1 year</td>
                      <td className="p-4 text-red-600 font-bold text-xl">15% flat</td>
                    </tr>
                    <tr className="border-b bg-gray-50 hover:bg-red-50">
                      <td className="p-4 font-semibold">Debt Mutual Funds</td>
                      <td className="p-4">Less than 3 years</td>
                      <td className="p-4 text-red-600 font-bold text-xl">20-30% (slab)</td>
                    </tr>
                    <tr className="border-b hover:bg-red-50">
                      <td className="p-4 font-semibold">Gold ETF/Funds</td>
                      <td className="p-4">Less than 3 years</td>
                      <td className="p-4 text-red-600 font-bold text-xl">20-30% (slab)</td>
                    </tr>
                    <tr className="hover:bg-red-50">
                      <td className="p-4 font-semibold">Property/Real Estate</td>
                      <td className="p-4">Less than 2 years</td>
                      <td className="p-4 text-red-600 font-bold text-xl">20-30% (slab)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                <p className="text-yellow-900 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span><strong>Pro Tip:</strong> If you're close to 1-year holding period, WAIT! Selling 1 day before 1 year = 15% tax. Selling 1 day after = 10% tax (with ₹1L exemption). Patience saves lakhs!</span>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Interactive Tax Calculator */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                🧮 Capital Gains Tax Calculator
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Capital Gains (₹)</label>
                  <input type="number" value={capitalGains} onChange={(e) => setCapitalGains(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Period</label>
                  <select value={holdingPeriod} onChange={(e) => setHoldingPeriod(e.target.value as 'short' | 'long')} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold">
                    <option value="long">Long-term</option>
                    <option value="short">Short-term</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Asset Type:</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['equity', 'debt', 'gold'] as const).map((type) => (
                    <button key={type} onClick={() => setAssetType(type)} className={`px-4 py-3 rounded-lg font-bold capitalize transition-colors ${assetType === type ? 'bg-white text-purple-600' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-sm opacity-90">Capital Gains</div>
                    <div className="text-3xl font-bold">₹{capitalGains.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Tax Amount</div>
                    <div className="text-3xl font-bold text-red-300">-₹{Math.round(tax).toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90">After-Tax Gains</div>
                    <div className="text-3xl font-bold text-green-300">₹{Math.round(afterTaxGains).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-center opacity-90">
                Tax Rate: {assetType === 'equity' ? (holdingPeriod === 'long' ? '10% (above ₹1L)' : '15% flat') : 
                          holdingPeriod === 'long' ? '20% with indexation' : '20-30% as per slab'}
              </div>
            </div>
          </motion.section>

          {/* Tax Harvesting */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-3xl font-bold mb-6">💎 Tax Harvesting Strategy (Save ₹10K-20K/Year!)</h2>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4">How It Works:</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="bg-white text-orange-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                    <p>Before March 31, check your equity portfolio for unrealized gains</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-white text-orange-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                    <p>If gains are ₹1L+, sell units worth ₹1L gains</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-white text-orange-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                    <p>Immediately buy back same units (within 1-2 days)</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-white text-orange-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                    <p>₹1L gains are tax-free! Your cost basis resets higher</p>
                  </li>
                </ol>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold text-lg mb-4">Example: Rahul's Tax Harvesting</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Date:</strong> March 25, 2024</p>
                  <p><strong>Portfolio:</strong> ₹10L invested in Nifty index fund (Jan 2023)</p>
                  <p><strong>Current Value:</strong> ₹12L (₹2L unrealized gains)</p>
                  <p className="text-yellow-300 font-bold mt-3">Action Taken:</p>
                  <p>• Sells units worth ₹1L gains (partial redemption)</p>
                  <p>• Buys back same units next day</p>
                  <p className="text-green-300 font-bold mt-3">Result:</p>
                  <p>• ₹1L gains harvested (tax-free!)</p>
                  <p>• New cost basis higher → Future tax lower</p>
                  <p>• Repeats every year → Save ₹10,000/year in tax!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Complete Tax Table */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Complete Investment Taxation Table</h2>

              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="p-3 font-bold">Asset</th>
                    <th className="p-3 font-bold">LTCG Period</th>
                    <th className="p-3 font-bold">LTCG Tax</th>
                    <th className="p-3 font-bold">STCG Tax</th>
                    <th className="p-3 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-purple-50">
                    <td className="p-3 font-semibold">Equity Stocks/MF</td>
                    <td className="p-3">&gt;1 year</td>
                    <td className="p-3 text-green-600 font-bold">10% (above ₹1L)</td>
                    <td className="p-3 text-red-600 font-bold">15%</td>
                    <td className="p-3">₹1L exemption per year</td>
                  </tr>
                  <tr className="border-b bg-gray-50 hover:bg-purple-50">
                    <td className="p-3 font-semibold">Debt Mutual Funds</td>
                    <td className="p-3">&gt;3 years</td>
                    <td className="p-3 text-red-600 font-bold">20-30% (slab)</td>
                    <td className="p-3 text-red-600 font-bold">20-30% (slab)</td>
                    <td className="p-3">No indexation from 2023</td>
                  </tr>
                  <tr className="border-b hover:bg-purple-50">
                    <td className="p-3 font-semibold">Gold ETF/Funds</td>
                    <td className="p-3">&gt;3 years</td>
                    <td className="p-3 text-green-600 font-bold">20% (with indexation)</td>
                    <td className="p-3 text-red-600 font-bold">20-30% (slab)</td>
                    <td className="p-3">Indexation reduces tax</td>
                  </tr>
                  <tr className="border-b bg-gray-50 hover:bg-purple-50">
                    <td className="p-3 font-semibold">SGB (Gold Bonds)</td>
                    <td className="p-3">8 years (maturity)</td>
                    <td className="p-3 text-green-600 font-bold">TAX FREE!</td>
                    <td className="p-3 text-red-600">20% (with indexation)</td>
                    <td className="p-3">Best for gold investment!</td>
                  </tr>
                  <tr className="border-b hover:bg-purple-50">
                    <td className="p-3 font-semibold">Property/Real Estate</td>
                    <td className="p-3">&gt;2 years</td>
                    <td className="p-3 text-green-600 font-bold">20% (with indexation)</td>
                    <td className="p-3 text-red-600 font-bold">20-30% (slab)</td>
                    <td className="p-3">Section 54/54F exemptions</td>
                  </tr>
                </tbody>
              </table>
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
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <p><strong>Equity LTCG:</strong> 10% tax above ₹1L. Hold more than 1 year! First ₹1L/year tax-free.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Equity STCG:</strong> 15% flat (no exemption). Wait for 1 year to save 5% + get ₹1L exemption!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Tax harvesting:</strong> Sell ₹1L gains every March, buy back → ₹10K tax saved annually!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>SGB tax-free:</strong> Hold Sovereign Gold Bonds for 8 years = zero capital gains tax!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Calculators</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/calculators/income-tax-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Calculator className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tax Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate total tax liability</p>
                </Link>
                <Link to="/calculators/sip-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">SIP Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate SIP returns</p>
                </Link>
                <Link to="/calculators/mutual-fund-returns-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">MF Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate after-tax returns</p>
                </Link>
              </div>
            </div>
          </motion.section>

          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Value vs Growth Investing (Buffett Strategy)</h3>
            <p className="mb-6 text-green-100">Learn Warren Buffett's value investing principles applied to Indian stocks. When to buy value vs growth stocks!</p>
            <Link to="/learn/investing-wealth/value-vs-growth-investing-warren-buffett-strategy-india" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next Lesson: Value vs Growth
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxOnInvestments;
