import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Info, TrendingUp, Shield, ChevronRight, ChevronDown, Sparkles, FileText, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
interface LTCGOffsetResult {
  totalLTCG: number;
  annualExemption: number;
  taxableLTCG: number;
  taxAmount: number;
  taxSaved: number;
}

const OffsetLTCGWithAnnualExemptionsTool: React.FC = () => {
  const [ltcgAmount, setLtcgAmount] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [result, setResult] = useState<LTCGOffsetResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateOffset = () => {
    if (!ltcgAmount) {
      alert('Please enter LTCG amount');
      return;
    }

    const ltcg = parseFloat(ltcgAmount);
    
    // Annual exemption for LTCG (₹1.25 lakh per Budget 2024)
    const annualExemption = 125000;
    
    // Calculate taxable LTCG
    const taxableLTCG = Math.max(0, ltcg - annualExemption);
    
    // Calculate tax (12.5% on taxable amount per Budget 2024)
    const taxAmount = taxableLTCG * 0.125;
    
    // Calculate tax saved due to exemption
    const taxSaved = Math.min(ltcg, annualExemption) * 0.125;

    setResult({
      totalLTCG: ltcg,
      annualExemption,
      taxableLTCG,
      taxAmount,
      taxSaved
    });
  };

  const resetForm = () => {
    setLtcgAmount('');
    setOtherIncome('');
    setResult(null);
  };

  const relatedTools = [
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Tax by AY' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sales' },
    { name: 'Intraday vs Delivery', path: '/tax-tools/intraday-vs-delivery-tax-calculator', desc: 'Trading tax' },
    { name: 'Gifted Shares Tax', path: '/tax-tools/gifted-shares-tax-estimator', desc: 'Gift tax' },
    { name: 'Bonus Shares Tax', path: '/tax-tools/bonus-shares-tax-impact-tool', desc: 'Bonus tax' },
    { name: 'Intra-Year Redemption', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains' },
  ];

  const faqs = [
    { q: 'What is the LTCG exemption limit for 2024-25?', a: 'As per Budget 2024 (effective 23 July 2024), the annual LTCG exemption for listed equity and equity mutual funds is ₹1,25,000 per financial year. Gains up to this limit are tax-free; only the amount above ₹1.25L is taxed at 12.5%.' },
    { q: 'Can I use the exemption across multiple sales in a year?', a: 'Yes. The ₹1,25,000 exemption is applied to your total LTCG in the financial year. So you can plan multiple sales and use the exemption against the aggregate LTCG. This tool helps you see tax saved and taxable amount.' },
    { q: 'Does the exemption apply to STCG?', a: 'No. The exemption applies only to long-term capital gains (LTCG) from equity and equity-oriented funds. STCG is taxed at 20% with no exemption.' },
  ];

  return (
    <>
      <SEOHelmet
        title="Offset LTCG with Annual Exemptions Tool – ₹1.25L Exemption 2024-25 | MoneyCal"
        description="Plan LTCG sales with ₹1.25L annual exemption. Budget 2024: 12.5% on amount above exemption. Calculate tax saved and taxable LTCG."
        keywords="LTCG exemption calculator, LTCG 1.25 lakh exemption, long term capital gains tax India 2024, LTCG tax planning"
        canonicalUrl="/tax-tools/offset-ltcg-with-annual-exemptions-tool"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tax-tools" className="hover:text-blue-600">Tax Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Offset LTCG with Exemptions</span>
            </nav>
          </div>
        </div>
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-12 pb-16">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Capital Gains • Budget 2024/2025
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
              Offset LTCG with Annual Exemptions Tool
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-indigo-100 max-w-2xl mx-auto">
              Plan LTCG sales to maximize ₹1.25L annual exemption. 12.5% on amount above exemption.
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
                  LTCG Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Long Term Capital Gains (₹)
                    </label>
                    <input
                      type="number"
                      value={ltcgAmount}
                      onChange={(e) => setLtcgAmount(e.target.value)}
                      placeholder="Enter LTCG amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Income (₹) - Optional
                    </label>
                    <input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value)}
                      placeholder="Enter other income for context"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateOffset}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Offset
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
                  LTCG Offset Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Total LTCG</p>
                        <p className="text-xl font-bold text-blue-900">₹{result.totalLTCG.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-600">Exemption</p>
                        <p className="text-xl font-bold text-green-900">₹{result.annualExemption.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Taxable LTCG:</span>
                        <span className="font-bold text-gray-900">₹{result.taxableLTCG.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Tax Amount:</span>
                        <span className="font-bold text-red-600">₹{result.taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-300">
                        <span className="text-gray-700 font-semibold">Tax Saved:</span>
                        <span className="font-bold text-green-600">₹{result.taxSaved.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-3">Key Benefits</h3>
                      <ul className="space-y-2 text-blue-700 text-sm">
                        <li>• ₹1.25 lakh annual exemption (Budget 2024)</li>
                        <li>• 12.5% tax rate on amount above exemption</li>
                        <li>• No indexation benefit needed</li>
                        <li>• Simple calculation method</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter LTCG details to calculate offset</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

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

        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">LTCG Exemption Planning (2024-25)</h2>
            <p className="text-slate-700 leading-relaxed mb-4">The ₹1,25,000 LTCG exemption is per financial year. Use this tool to see how much tax you save and how much is taxable. Combine with <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG Classifier</Link>, <Link to="/tax-tools/intra-year-redemption-tax-tracker" className="text-indigo-600 hover:underline font-medium">Intra-Year Redemption Tracker</Link>, and <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator</Link>. <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax India</a>. More: <Link to="/blog?category=Tax" className="text-indigo-600 hover:underline">Blog</Link>, <Link to="/news" className="text-indigo-600 hover:underline">News</Link>, <Link to="/tax-tools" className="text-indigo-600 hover:underline">Tax Tools</Link>.</p>
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
          </div>
        </article>
      </div>
    </>
  );
};

export default OffsetLTCGWithAnnualExemptionsTool;
