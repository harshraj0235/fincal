import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Info, TrendingUp, PieChart, ChevronRight, ChevronDown, Sparkles, FileText, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
interface PartialSelloffResult {
  totalShares: number;
  sharesSold: number;
  sharesRemaining: number;
  averageCost: number;
  salePrice: number;
  saleProceeds: number;
  capitalGain: number;
  taxAmount: number;
  netProceeds: number;
  holdingPeriod: string;
  taxType: string;
  taxRate: number;
}

const TaxOnPartialSelloffCalculator: React.FC = () => {
  const [totalShares, setTotalShares] = useState('');
  const [sharesSold, setSharesSold] = useState('');
  const [averageCost, setAverageCost] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [result, setResult] = useState<PartialSelloffResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateTax = () => {
    if (!totalShares || !sharesSold || !averageCost || !salePrice || !purchaseDate || !saleDate) {
      alert('Please fill in all fields');
      return;
    }

    const total = parseInt(totalShares);
    const sold = parseInt(sharesSold);
    const cost = parseFloat(averageCost);
    const price = parseFloat(salePrice);

    if (sold > total) {
      alert('Shares sold cannot be more than total shares');
      return;
    }

    const remaining = total - sold;
    const soldCost = sold * cost;
    const saleProceeds = sold * price;
    const capitalGain = saleProceeds - soldCost;

    // Calculate holding period
    const purchase = new Date(purchaseDate);
    const sale = new Date(saleDate);
    const daysDiff = Math.floor((sale.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24));

    let holdingPeriod = '';
    let taxType = '';
    let taxRate = 0;

    if (daysDiff <= 365) {
      holdingPeriod = `${daysDiff} days`;
      taxType = 'STCG';
      taxRate = 20; // Budget 2024
    } else {
      holdingPeriod = `${Math.floor(daysDiff / 365)} years`;
      taxType = 'LTCG';
      taxRate = 12.5; // Budget 2024 (exemption ₹1.25L applied at year level)
    }

    const taxableGain = taxType === 'LTCG' ? Math.max(0, capitalGain - 125000) : capitalGain;
    const taxAmount = capitalGain > 0 ? (taxableGain * taxRate) / 100 : 0;
    const netProceeds = saleProceeds - taxAmount;

    setResult({
      totalShares: total,
      sharesSold: sold,
      sharesRemaining: remaining,
      averageCost: cost,
      salePrice: price,
      saleProceeds,
      capitalGain,
      taxAmount,
      netProceeds,
      holdingPeriod,
      taxType,
      taxRate
    });
  };

  const resetForm = () => {
    setTotalShares('');
    setSharesSold('');
    setAverageCost('');
    setSalePrice('');
    setPurchaseDate('');
    setSaleDate('');
    setResult(null);
  };

  const relatedTools = [
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Tax by AY' },
    { name: 'Intraday vs Delivery', path: '/tax-tools/intraday-vs-delivery-tax-calculator', desc: 'Trading comparison' },
    { name: 'Offset LTCG', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan exemptions' },
    { name: 'Gifted Shares Tax', path: '/tax-tools/gifted-shares-tax-estimator', desc: 'Gift tax' },
    { name: 'Bonus Shares Tax', path: '/tax-tools/bonus-shares-tax-impact-tool', desc: 'Bonus tax' },
    { name: 'Intra-Year Redemption', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains' },
  ];

  const faqs = [
    { q: 'How is tax calculated on partial sale of shares?', a: 'Tax is calculated on the capital gain from the shares sold. If holding period is ≤12 months, STCG at 20% (Budget 2024) applies. If >12 months, LTCG at 12.5% applies; the first ₹1,25,000 of LTCG in the financial year is exempt.' },
    { q: 'What is the LTCG exemption for partial selloff?', a: 'The ₹1,25,000 LTCG exemption is per financial year and applies to your total LTCG from equity/equity funds. For a single partial sale, we show tax after applying this exemption to the gain from this sale; when filing, aggregate all LTCG for the year.' },
    { q: 'Does selling part of my holding change cost basis of remaining shares?', a: 'No. Your remaining shares retain the same cost per share. Only the sold portion\'s gain is taxed. Use our calculator to see sale proceeds, tax, and net proceeds for the partial selloff.' },
  ];

  return (
    <>
      <SEOHelmet
        title="Tax on Partial Selloff Calculator – STCG LTCG on Partial Sales 2024-25 | MoneyCal"
        description="Calculate tax when selling part of your holdings. Budget 2024: STCG 20%, LTCG 12.5%, ₹1.25L exemption. Net proceeds and tax breakdown."
        keywords="partial selloff tax calculator, partial share sale tax, STCG LTCG partial sale, capital gains tax India 2024"
        canonicalUrl="/tax-tools/tax-on-partial-selloff-calculator"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tax-tools" className="hover:text-blue-600">Tax Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Tax on Partial Selloff</span>
            </nav>
          </div>
        </div>
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-12 pb-16">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Capital Gains • Budget 2024/2025
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
              Tax on Partial Selloff Calculator
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-indigo-100 max-w-2xl mx-auto">
              Calculate tax when selling only a portion of your holdings. STCG 20%, LTCG 12.5%, ₹1.25L exemption.
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                  Selloff Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Shares Owned
                    </label>
                    <input
                      type="number"
                      value={totalShares}
                      onChange={(e) => setTotalShares(e.target.value)}
                      placeholder="Enter total shares owned"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shares to Sell
                    </label>
                    <input
                      type="number"
                      value={sharesSold}
                      onChange={(e) => setSharesSold(e.target.value)}
                      placeholder="Enter shares to sell"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Cost Price (₹)
                    </label>
                    <input
                      type="number"
                      value={averageCost}
                      onChange={(e) => setAverageCost(e.target.value)}
                      placeholder="Enter average cost per share"
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
                      placeholder="Enter sale price per share"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
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

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTax}
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

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Tax Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <PieChart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Shares Sold</p>
                        <p className="text-xl font-bold text-blue-900">{result.sharesSold}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">Remaining</p>
                        <p className="text-xl font-bold text-green-900">{result.sharesRemaining}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Sale Proceeds:</span>
                        <span className="font-bold text-gray-900">₹{result.saleProceeds.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Capital Gain/Loss:</span>
                        <span className={`font-bold ${result.capitalGain > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{result.capitalGain.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700">Tax Amount:</span>
                        <span className="font-bold text-purple-600">₹{result.taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-300">
                        <span className="text-gray-700 font-semibold">Net Proceeds:</span>
                        <span className="font-bold text-green-600">₹{result.netProceeds.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-3">Tax Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Holding Period:</span>
                          <span className="font-semibold text-blue-900">{result.holdingPeriod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Tax Type:</span>
                          <span className="font-semibold text-blue-900">{result.taxType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Tax Rate:</span>
                          <span className="font-semibold text-blue-900">{result.taxRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter selloff details to calculate tax</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related tools */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related tax tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link key={tool.path} to={tool.path} className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-indigo-700">{tool.name}</p>
                  <p className="text-sm text-slate-500">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
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
        </section>

        {/* SEO + Explore */}
        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Partial Selloff Tax Guide (2024-25)</h2>
            <p className="text-slate-700 leading-relaxed mb-4">When you sell only part of your equity holdings, tax is due on the capital gain from the sold portion. Holding period (purchase to sale) decides STCG (≤12 months, 20%) or LTCG (&gt;12 months, 12.5% with ₹1.25L annual exemption). Use our <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG Classifier</Link> and <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-indigo-600 hover:underline font-medium">Offset LTCG Tool</Link> to plan. <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax India</a>. More: <Link to="/blog?category=Tax" className="text-indigo-600 hover:underline">Blog</Link>, <Link to="/news" className="text-indigo-600 hover:underline">News</Link>, <Link to="/tax-tools" className="text-indigo-600 hover:underline">Tax Tools</Link>.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 flex items-center gap-4">
                <FileText className="h-10 w-10 text-indigo-600" />
                <div><p className="font-semibold text-slate-900">Tax blog</p><p className="text-sm text-slate-500">Capital gains & planning</p></div>
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
          </div>
        </article>
      </div>
    </>
  );
};

export default TaxOnPartialSelloffCalculator;
