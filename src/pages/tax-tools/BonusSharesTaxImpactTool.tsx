import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Calculator, TrendingUp, Info, AlertCircle, CheckCircle, BarChart3, DollarSign, PieChart, ChevronRight, ChevronDown, Sparkles, FileText, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
interface BonusSharesTax {
  originalShares: number;
  bonusRatio: string;
  originalCost: number;
  bonusDate: string;
  saleDate: string;
  salePrice: number;
  bonusShares: number;
  costPerShare: number;
  totalCost: number;
  capitalGain: number;
  holdingPeriod: number;
  taxRate: number;
  taxAmount: number;
  netAmount: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const BonusSharesTaxImpactTool: React.FC = () => {
  const [originalShares, setOriginalShares] = useState<string>('');
  const [bonusRatio, setBonusRatio] = useState<string>('');
  const [originalCost, setOriginalCost] = useState<string>('');
  const [bonusDate, setBonusDate] = useState<string>('');
  const [saleDate, setSaleDate] = useState<string>('');
  const [salePrice, setSalePrice] = useState<string>('');
  const [taxCalculation, setTaxCalculation] = useState<BonusSharesTax | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateBonusSharesTax = () => {
    if (!originalShares || !bonusRatio || !originalCost || !bonusDate || !saleDate || !salePrice) {
      alert('Please fill in all fields');
      return;
    }

    const original = parseFloat(originalShares);
    const ratio = parseFloat(bonusRatio);
    const cost = parseFloat(originalCost);
    const saleAmount = parseFloat(salePrice);
    
    const bonusShares = original * (ratio / 100);
    const costPerShare = cost / (original + bonusShares);
    const totalCost = costPerShare * (original + bonusShares);
    
    const bonus = new Date(bonusDate);
    const sale = new Date(saleDate);
    const holdingPeriod = Math.floor((sale.getTime() - bonus.getTime()) / (1000 * 60 * 60 * 24));
    
    const capitalGain = saleAmount - totalCost;
    
    let taxRate: number;
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (capitalGain <= 0) {
      taxRate = 0;
      recommendation = 'No tax liability - Capital loss or no gain';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (holdingPeriod <= 365) {
      taxRate = 20; // STCG (Budget 2024)
      recommendation = 'Short-term capital gains tax applies';
      color = 'text-orange-600';
      icon = <AlertCircle className="h-5 w-5" />;
    } else {
      taxRate = 12.5; // LTCG (Budget 2024)
      recommendation = 'Long-term capital gains tax with ₹1.25L exemption';
      color = 'text-blue-600';
      icon = <Info className="h-5 w-5" />;
    }
    
    const taxableForLTCG = holdingPeriod > 365 ? Math.max(0, capitalGain - 125000) : capitalGain;
    const taxAmount = capitalGain > 0 ? (holdingPeriod > 365 ? taxableForLTCG * 0.125 : capitalGain * (taxRate / 100)) : 0;
    const netAmount = saleAmount - taxAmount;

    setTaxCalculation({
      originalShares: original,
      bonusRatio: bonusRatio,
      originalCost: cost,
      bonusDate,
      saleDate,
      salePrice: saleAmount,
      bonusShares,
      costPerShare,
      totalCost,
      capitalGain,
      holdingPeriod,
      taxRate,
      taxAmount,
      netAmount,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setOriginalShares('');
    setBonusRatio('');
    setOriginalCost('');
    setBonusDate('');
    setSaleDate('');
    setSalePrice('');
    setTaxCalculation(null);
  };

  return (
    <>
      <SEOHelmet
        title="Bonus Shares Tax Impact Tool – Bonus Share Tax 2024-25 | MoneyCal"
        description="Calculate tax on bonus shares. Budget 2024: STCG 20%, LTCG 12.5%, ₹1.25L exemption. Cost per share and net amount."
        keywords="bonus shares tax, bonus shares calculator, capital gains bonus 2024, STCG LTCG bonus shares"
        canonicalUrl="/tax-tools/bonus-shares-tax-impact-tool"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tax-tools" className="hover:text-blue-600">Tax Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Bonus Shares Tax Impact</span>
            </nav>
          </div>
        </div>
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-12 pb-16">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Capital Gains • Budget 2024/2025
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
              Bonus Shares Tax Impact Tool
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-indigo-100 max-w-2xl mx-auto">
              Calculate tax on bonus shares. STCG 20%, LTCG 12.5%, ₹1.25L exemption.
            </motion.p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                  Bonus Shares Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Shares Held
                    </label>
                    <input
                      type="number"
                      value={originalShares}
                      onChange={(e) => setOriginalShares(e.target.value)}
                      placeholder="Enter number of original shares"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bonus Ratio (%)
                    </label>
                    <input
                      type="number"
                      value={bonusRatio}
                      onChange={(e) => setBonusRatio(e.target.value)}
                      placeholder="e.g., 1:1 = 100, 1:2 = 50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Cost (₹)
                    </label>
                    <input
                      type="number"
                      value={originalCost}
                      onChange={(e) => setOriginalCost(e.target.value)}
                      placeholder="Enter original cost of shares"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bonus Issue Date
                    </label>
                    <input
                      type="date"
                      value={bonusDate}
                      onChange={(e) => setBonusDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Date
                    </label>
                    <input
                      type="date"
                      value={saleDate}
                      onChange={(e) => setSaleDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Price (₹)
                    </label>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="Enter sale price"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateBonusSharesTax}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Tax
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Tax Analysis
                </h2>

                {taxCalculation ? (
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className={`text-center p-4 rounded-lg ${taxCalculation.color.includes('green') ? 'bg-green-50 border border-green-200' : taxCalculation.color.includes('orange') ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${taxCalculation.color}`}>
                        {taxCalculation.icon}
                        <span className="ml-2 text-lg font-bold">Tax Status</span>
                      </div>
                      <p className="text-sm text-gray-600">{taxCalculation.recommendation}</p>
                    </div>

                    {/* Bonus Shares Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <Gift className="h-5 w-5 mr-2" />
                        Bonus Shares Calculation
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Original Shares:</span>
                          <span className="font-bold text-gray-600">{taxCalculation.originalShares.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Bonus Ratio:</span>
                          <span className="font-bold text-gray-600">{taxCalculation.bonusRatio}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Bonus Shares:</span>
                          <span className="font-bold text-gray-600">{taxCalculation.bonusShares.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Shares:</span>
                          <span className="font-bold text-gray-600">{(taxCalculation.originalShares + taxCalculation.bonusShares).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Cost Basis */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <PieChart className="h-5 w-5 mr-2" />
                        Cost Basis Calculation
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Original Cost:</span>
                          <span className="font-bold text-blue-600">₹{taxCalculation.originalCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Cost per Share:</span>
                          <span className="font-bold text-blue-600">₹{taxCalculation.costPerShare.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Cost:</span>
                          <span className="font-bold text-blue-600">₹{taxCalculation.totalCost.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Capital Gains */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Capital Gains & Tax
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Sale Price:</span>
                          <span className="font-bold text-purple-600">₹{taxCalculation.salePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Capital Gain:</span>
                          <span className={`font-bold ${taxCalculation.capitalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{taxCalculation.capitalGain.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Rate:</span>
                          <span className="font-bold text-purple-600">{taxCalculation.taxRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Amount:</span>
                          <span className="font-bold text-purple-600">₹{taxCalculation.taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Amount:</span>
                          <span className="font-bold text-purple-600">₹{taxCalculation.netAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter bonus shares details to calculate tax liability</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Bonus Shares Tax
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    Bonus Shares Basics
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Free shares issued by companies</li>
                    <li>• No additional cost to shareholders</li>
                    <li>• Cost basis gets adjusted proportionally</li>
                    <li>• Holding period starts from bonus date</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Tax Calculation
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Cost per share = Original cost / Total shares</li>
                    <li>• Capital gains calculated on sale</li>
                    <li>• STCG if held &le; 1 year</li>
                    <li>• LTCG if held &gt; 1 year</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Bonus shares are not taxable at the time of issue</li>
                  <li>• Tax applies only when bonus shares are sold</li>
                  <li>• Cost basis is proportionally reduced</li>
                  <li>• Consult a tax professional for accurate calculations</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Related tax tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
                  { name: 'Tax on Bonus Shares Tracker', path: '/tax-tools/tax-on-bonus-shares-tracker', desc: 'Bonus tracker' },
                  { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Tax by AY' },
                  { name: 'Gifted Shares Tax', path: '/tax-tools/gifted-shares-tax-estimator', desc: 'Gift tax' },
                  { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sales' },
                  { name: 'Offset LTCG', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan exemptions' },
                  { name: 'Intra-Year Redemption', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
                  { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains' },
                ].map((tool) => (
                  <Link key={tool.path} to={tool.path} className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                    <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-indigo-700">{tool.name}</p>
                      <p className="text-sm text-slate-500">{tool.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Frequently asked questions</h2>
              <div className="space-y-2">
                {[
                  { q: 'How is cost per share calculated for bonus shares?', a: 'Cost per share = original cost of shares / (original shares + bonus shares). So the original cost is spread over all shares. Holding period for bonus shares is from the date of allotment.' },
                  { q: 'What are the tax rates on sale of bonus shares (2024-25)?', a: 'As per Budget 2024: if held ≤12 months from allotment, STCG at 20%; if held >12 months, LTCG at 12.5% with ₹1,25,000 annual exemption. Tax is on the amount above exemption.' },
                  { q: 'Are bonus shares taxable when received?', a: 'No. Bonus shares are not taxable on receipt. Tax arises only when you sell the bonus shares; the gain is then STCG or LTCG based on holding period from allotment.' },
                ].map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-900 hover:bg-slate-50">
                      {faq.q}
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-slate-200">
                          <p className="p-4 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <article className="mt-12 pt-12 border-t border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Bonus Shares Tax Guide (2024-25)</h2>
                <p className="text-slate-700 leading-relaxed mb-4">Bonus shares are not taxable on receipt; tax applies on sale. Cost is spread over original + bonus shares; holding from allotment. Use our <Link to="/tax-tools/tax-on-bonus-shares-tracker" className="text-indigo-600 hover:underline font-medium">Tax on Bonus Shares Tracker</Link> and <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG Classifier</Link>. <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax India</a>. More: <Link to="/blog?category=Tax" className="text-indigo-600 hover:underline">Blog</Link>, <Link to="/news" className="text-indigo-600 hover:underline">News</Link>, <Link to="/tax-tools" className="text-indigo-600 hover:underline">Tax Tools</Link>.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                  <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 flex items-center gap-4">
                    <FileText className="h-10 w-10 text-indigo-600" />
                    <div><p className="font-semibold text-slate-900">Tax blog</p><p className="text-sm text-slate-500">Capital gains</p></div>
                    <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
                  </Link>
                  <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 flex items-center gap-4">
                    <ExternalLink className="h-10 w-10 text-indigo-600" />
                    <div><p className="font-semibold text-slate-900">News</p><p className="text-sm text-slate-500">Markets & tax</p></div>
                    <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
                  </Link>
                  <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 flex items-center gap-4">
                    <Calculator className="h-10 w-10 text-indigo-600" />
                    <div><p className="font-semibold text-slate-900">All tax tools</p><p className="text-sm text-slate-500">Calculators</p></div>
                    <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
                  </Link>
                </div>
              </article>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BonusSharesTaxImpactTool;
