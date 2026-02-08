import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Info, AlertCircle, CheckCircle, BarChart3, Clock, ChevronRight, ChevronDown, Sparkles, FileText, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
interface RedemptionEntry {
  id: string;
  date: string;
  amount: number;
  holdingPeriod: number;
  type: 'STCG' | 'LTCG';
  taxRate: number;
  taxAmount: number;
}

interface RedemptionTracker {
  totalRedemptions: number;
  totalAmount: number;
  totalTax: number;
  stcgAmount: number;
  ltcgAmount: number;
  stcgTax: number;
  ltcgTax: number;
  averageTaxRate: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const IntraYearRedemptionTaxTracker: React.FC = () => {
  const [redemptions, setRedemptions] = useState<RedemptionEntry[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newAmount, setNewAmount] = useState<string>('');
  const [newHoldingPeriod, setNewHoldingPeriod] = useState<string>('');
  const [tracker, setTracker] = useState<RedemptionTracker | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const addRedemption = () => {
    if (!newDate || !newAmount || !newHoldingPeriod) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(newAmount);
    const holdingPeriod = parseInt(newHoldingPeriod);
    
    const type = holdingPeriod <= 365 ? 'STCG' : 'LTCG';
    // Budget 2024: STCG 20%, LTCG 12.5% (exemption applied at year level)
    const taxRate = type === 'STCG' ? 20 : 12.5;
    const taxAmount = (amount * taxRate) / 100;

    const newRedemption: RedemptionEntry = {
      id: Date.now().toString(),
      date: newDate,
      amount,
      holdingPeriod,
      type,
      taxRate,
      taxAmount
    };

    const updatedRedemptions = [...redemptions, newRedemption];
    setRedemptions(updatedRedemptions);
    calculateTracker(updatedRedemptions);

    // Reset form
    setNewDate('');
    setNewAmount('');
    setNewHoldingPeriod('');
  };

  const removeRedemption = (id: string) => {
    const updatedRedemptions = redemptions.filter(r => r.id !== id);
    setRedemptions(updatedRedemptions);
    calculateTracker(updatedRedemptions);
  };

  const calculateTracker = (redemptionList: RedemptionEntry[]) => {
    if (redemptionList.length === 0) {
      setTracker(null);
      return;
    }

    const totalAmount = redemptionList.reduce((sum, r) => sum + r.amount, 0);
    const totalTax = redemptionList.reduce((sum, r) => sum + r.taxAmount, 0);
    const stcgAmount = redemptionList.filter(r => r.type === 'STCG').reduce((sum, r) => sum + r.amount, 0);
    const ltcgAmount = redemptionList.filter(r => r.type === 'LTCG').reduce((sum, r) => sum + r.amount, 0);
    const stcgTax = redemptionList.filter(r => r.type === 'STCG').reduce((sum, r) => sum + r.taxAmount, 0);
    const ltcgTax = redemptionList.filter(r => r.type === 'LTCG').reduce((sum, r) => sum + r.taxAmount, 0);
    const averageTaxRate = totalAmount > 0 ? (totalTax / totalAmount) * 100 : 0;

    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;

    if (totalTax > 100000) {
      recommendation = 'High tax burden. Consider spreading redemptions across years.';
      color = 'text-red-600';
      icon = <AlertCircle className="h-5 w-5" />;
    } else if (totalTax > 50000) {
      recommendation = 'Moderate tax impact. Review timing of future redemptions.';
      color = 'text-orange-600';
      icon = <Info className="h-5 w-5" />;
    } else {
      recommendation = 'Manageable tax burden. Continue with current strategy.';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    }

    setTracker({
      totalRedemptions: redemptionList.length,
      totalAmount,
      totalTax,
      stcgAmount,
      ltcgAmount,
      stcgTax,
      ltcgTax,
      averageTaxRate,
      recommendation,
      color,
      icon
    });
  };

  const resetTracker = () => {
    setRedemptions([]);
    setTracker(null);
    setNewDate('');
    setNewAmount('');
    setNewHoldingPeriod('');
  };

  return (
    <>
      <SEOHelmet
        title="Intra-Year Redemption Tax Tracker – Multiple Redemptions 2024-25 | MoneyCal"
        description="Track tax on multiple redemptions in a year. STCG 20%, LTCG 12.5%, ₹1.25L exemption. Cumulative STCG/LTCG and tax burden."
        keywords="intra-year redemption tracker, multiple redemptions tax, STCG LTCG tracker 2024, redemption tax calculator"
        canonicalUrl="/tax-tools/intra-year-redemption-tax-tracker"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tax-tools" className="hover:text-blue-600">Tax Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Intra-Year Redemption Tax Tracker</span>
            </nav>
          </div>
        </div>
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-12 pb-16">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Capital Gains • Budget 2024/2025
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
              Intra-Year Redemption Tax Tracker
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-indigo-100 max-w-2xl mx-auto">
              Track tax on multiple redemptions. STCG 20%, LTCG 12.5%, ₹1.25L exemption.
            </motion.p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  Add Redemption
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Redemption Date
                    </label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Redemption Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="Enter redemption amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Holding Period (Days)
                    </label>
                    <input
                      type="number"
                      value={newHoldingPeriod}
                      onChange={(e) => setNewHoldingPeriod(e.target.value)}
                      placeholder="Enter holding period in days"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={addRedemption}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Add Redemption
                  </button>
                </div>

                {/* Redemptions List */}
                {redemptions.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Redemptions ({redemptions.length})
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {redemptions.map((redemption) => (
                        <div key={redemption.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{redemption.date}</span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${redemption.type === 'STCG' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                                {redemption.type}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700">
                              ₹{redemption.amount.toLocaleString()} • {redemption.holdingPeriod} days
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-800">₹{redemption.taxAmount.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">{redemption.taxRate}%</div>
                            <button
                              onClick={() => removeRedemption(redemption.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={resetTracker}
                      className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset All
                    </button>
                  </div>
                )}
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

                {tracker ? (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className={`text-center p-4 rounded-lg ${tracker.color.includes('red') ? 'bg-red-50 border border-red-200' : tracker.color.includes('orange') ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${tracker.color}`}>
                        {tracker.icon}
                        <span className="ml-2 text-lg font-bold">Tax Impact</span>
                      </div>
                      <p className="text-sm text-gray-600">{tracker.recommendation}</p>
                    </div>

                    {/* Overall Summary */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Overall Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Redemptions:</span>
                          <span className="font-bold text-blue-600">{tracker.totalRedemptions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Amount:</span>
                          <span className="font-bold text-blue-600">₹{tracker.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Tax:</span>
                          <span className="font-bold text-blue-600">₹{tracker.totalTax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Average Tax Rate:</span>
                          <span className="font-bold text-blue-600">{tracker.averageTaxRate.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* STCG vs LTCG Breakdown */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Capital Gains Breakdown
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-orange-800 mb-2">Short Term (STCG)</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span className="font-semibold">₹{tracker.stcgAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax:</span>
                              <span className="font-semibold">₹{tracker.stcgTax.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-2">Long Term (LTCG)</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span className="font-semibold">₹{tracker.ltcgAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax:</span>
                              <span className="font-semibold">₹{tracker.ltcgTax.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tax Optimization Tips */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Optimization Tips
                      </h3>
                      <div className="space-y-2 text-purple-700 text-sm">
                        <p>• Consider spreading redemptions across years</p>
                        <p>• Utilize ₹1.25L LTCG exemption effectively</p>
                        <p>• Plan redemptions around tax slabs</p>
                        <p>• Monitor cumulative tax burden</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Add redemptions to track tax implications</p>
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
                Understanding Intra-Year Redemption Tax
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Multiple Redemptions
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Track cumulative tax burden</li>
                    <li>• Monitor STCG vs LTCG mix</li>
                    <li>• Optimize redemption timing</li>
                    <li>• Plan tax-efficient strategies</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Tax Implications
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• STCG: 20% flat rate (Budget 2024)</li>
                    <li>• LTCG: 12.5% with ₹1.25L exemption (Budget 2024)</li>
                    <li>• Cumulative impact assessment</li>
                    <li>• Tax slab considerations</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Considerations
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Multiple redemptions increase tax burden</li>
                  <li>• Consider spreading across financial years</li>
                  <li>• Monitor cumulative LTCG exemption usage</li>
                  <li>• Plan around tax slab boundaries</li>
                  <li>• Consult tax advisor for complex scenarios</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Related tax tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
                  { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Tax by year' },
                  { name: 'Offset LTCG', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan exemptions' },
                  { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sales' },
                  { name: 'Intraday vs Delivery', path: '/tax-tools/intraday-vs-delivery-tax-calculator', desc: 'Trading tax' },
                  { name: 'Gifted Shares Tax', path: '/tax-tools/gifted-shares-tax-estimator', desc: 'Gift tax' },
                  { name: 'Bonus Shares Tax', path: '/tax-tools/bonus-shares-tax-impact-tool', desc: 'Bonus tax' },
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
                  { q: 'How is tax calculated for each redemption?', a: 'Each redemption is classified as STCG (holding ≤365 days) or LTCG (>365 days). STCG is taxed at 20%; LTCG at 12.5%. The ₹1.25L LTCG exemption is applied at the year level when you file; this tracker shows per-redemption tax for planning.' },
                  { q: 'What are the current STCG and LTCG rates (2024-25)?', a: 'As per Budget 2024: STCG on listed equity/equity funds is 20%; LTCG is 12.5% with an annual exemption of ₹1,25,000. Only LTCG above ₹1.25L in the financial year is taxable.' },
                  { q: 'Why track multiple redemptions?', a: 'Tracking helps you see cumulative STCG and LTCG and total tax burden in a year. You can plan timing of redemptions and use the ₹1.25L LTCG exemption effectively. Use our Offset LTCG Tool to plan exemption usage.' },
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
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Intra-Year Redemption Tax Guide (2024-25)</h2>
                <p className="text-slate-700 leading-relaxed mb-4">When you have multiple redemptions in a year, track cumulative STCG and LTCG and total tax. The ₹1.25L LTCG exemption is applied to total LTCG when you file. Use our <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-indigo-600 hover:underline font-medium">Offset LTCG Tool</Link> and <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG Classifier</Link>. <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax India</a>. More: <Link to="/blog?category=Tax" className="text-indigo-600 hover:underline">Blog</Link>, <Link to="/news" className="text-indigo-600 hover:underline">News</Link>, <Link to="/tax-tools" className="text-indigo-600 hover:underline">Tax Tools</Link>.</p>
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

export default IntraYearRedemptionTaxTracker;
