import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Info, AlertCircle, CheckCircle, BarChart3, Target, ChevronRight, ChevronDown, Sparkles, FileText, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface WithdrawalPlan {
  totalCorpus: number;
  annualWithdrawal: number;
  withdrawalYears: number;
  taxEfficientAmount: number;
  taxInefficientAmount: number;
  totalTaxPaid: number;
  netAmountReceived: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const TaxEfficientWithdrawalPlanner: React.FC = () => {
  const [totalCorpus, setTotalCorpus] = useState<string>('');
  const [annualWithdrawal, setAnnualWithdrawal] = useState<string>('');
  const [withdrawalYears, setWithdrawalYears] = useState<string>('');
  const [calculation, setCalculation] = useState<WithdrawalPlan | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateWithdrawalPlan = () => {
    if (!totalCorpus || !annualWithdrawal || !withdrawalYears) {
      alert('Please fill in all fields');
      return;
    }

    const corpus = parseFloat(totalCorpus);
    const withdrawal = parseFloat(annualWithdrawal);
    const years = parseInt(withdrawalYears);
    
    // Tax-efficient withdrawal (LTCG with exemption – Budget 2024: ₹1.25L, 12.5%)
    const ltcgExemption = 125000; // ₹1.25L per year (Budget 2024)
    const taxEfficientAmount = Math.min(withdrawal, ltcgExemption);
    const taxInefficientAmount = Math.max(0, withdrawal - ltcgExemption);
    
    const taxRate = 12.5; // LTCG rate (Budget 2024)
    const taxOnInefficient = (taxInefficientAmount * taxRate) / 100;
    const totalTaxPaid = taxOnInefficient * years;
    const netAmountReceived = (withdrawal * years) - totalTaxPaid;
    
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (withdrawal <= ltcgExemption) {
      recommendation = 'Optimal! Withdrawal within LTCG exemption limit. No tax liability.';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (taxOnInefficient <= 50000) {
      recommendation = 'Good strategy. Moderate tax impact. Consider spreading withdrawals.';
      color = 'text-blue-600';
      icon = <Info className="h-5 w-5" />;
    } else {
      recommendation = 'High tax impact. Consider reducing withdrawal or extending timeline.';
      color = 'text-red-600';
      icon = <AlertCircle className="h-5 w-5" />;
    }

    setCalculation({
      totalCorpus,
      annualWithdrawal: withdrawal,
      withdrawalYears: years,
      taxEfficientAmount,
      taxInefficientAmount,
      totalTaxPaid,
      netAmountReceived,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setTotalCorpus('');
    setAnnualWithdrawal('');
    setWithdrawalYears('');
    setCalculation(null);
  };

  const relatedTools = [
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'LTCG exemption' },
    { name: 'Exit Strategy Tax Visualizer', path: '/tax-tools/exit-strategy-tax-visualizer', desc: 'Exit strategies' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Capital gains tax' },
    { name: 'Section 80C Tally Analyzer', path: '/tax-tools/section-80c-tally-analyzer', desc: '80C investments' },
    { name: 'Tax Filing Deadline Reminder', path: '/tax-tools/tax-filing-deadline-reminder-widget', desc: 'ITR & advance tax' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
    { name: 'Loss Carry Forward Estimator', path: '/tax-tools/loss-carry-forward-estimator', desc: 'Capital loss carry forward' },
    { name: 'Old vs New Tax Regime Helper', path: '/tax-tools/old-vs-new-tax-regime-helper', desc: 'Compare regimes' },
  ];

  const faqs = [
    { q: 'What is the LTCG exemption for equity withdrawals?', a: 'As per Budget 2024 (effective July 23, 2024), the annual LTCG exemption for listed equity and equity mutual funds is ₹1,25,000 per financial year. Withdrawals up to this limit are tax-free; only the amount above ₹1.25L is taxed at 12.5%. Valid for 2026 and future years unless the law changes.' },
    { q: 'How can I plan tax-efficient withdrawals?', a: 'Plan annual withdrawals to stay within the ₹1.25L LTCG exemption where possible. Spread large redemptions across years, use the Offset LTCG with Annual Exemptions Tool to see tax saved, and consider staggered exits. Use our Tax-Efficient Withdrawal Planner and Exit Strategy Tax Visualizer for scenarios. Valid for 2026–2050 unless the law is amended.' },
    { q: 'Is the LTCG rate 10% or 12.5%?', a: 'Budget 2024 increased the LTCG tax rate on listed equity from 10% to 12.5% and the exemption from ₹1 lakh to ₹1.25 lakh (effective July 23, 2024). Our planner uses 12.5% and ₹1.25L. Valid for 2026 onwards unless the law changes.' },
    { q: 'Can I use this for retirement corpus withdrawal?', a: 'Yes. Use this planner to see how much of your annual withdrawal falls within the LTCG exemption and how much tax you pay on the excess. Combine with our Offset LTCG with Exemptions Tool and Exit Strategy Tax Visualizer for full planning. Valid for 2026–2050 unless the law is amended.' },
  ];

  return (
    <>
      <SEOHelmet
        title="Tax-Efficient Withdrawal Planner – LTCG ₹1.25L 2026–2050 | MoneyCal"
        description="Plan tax-efficient withdrawals. LTCG ₹1.25L exemption, 12.5% on excess. Valid 2026 onwards."
        keywords="tax efficient withdrawal planner India 2026, LTCG 1.25 lakh exemption planner, retirement withdrawal tax calculator, capital gains withdrawal"
        canonicalUrl="/tax-tools/tax-efficient-withdrawal-planner"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tax-tools" className="hover:text-blue-600">Tax Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Tax-Efficient Withdrawal Planner</span>
            </nav>
          </div>
        </div>
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-12 pb-16">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Tax Planning • Valid 2026–2050
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              Tax-Efficient Withdrawal Planner
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Plan tax-efficient withdrawals. LTCG ₹1.25L exemption, 12.5% on excess.
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
                  Withdrawal Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Corpus (₹)
                    </label>
                    <input
                      type="number"
                      value={totalCorpus}
                      onChange={(e) => setTotalCorpus(e.target.value)}
                      placeholder="Enter total investment corpus"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Withdrawal (₹)
                    </label>
                    <input
                      type="number"
                      value={annualWithdrawal}
                      onChange={(e) => setAnnualWithdrawal(e.target.value)}
                      placeholder="Enter annual withdrawal amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Withdrawal Years
                    </label>
                    <input
                      type="number"
                      value={withdrawalYears}
                      onChange={(e) => setWithdrawalYears(e.target.value)}
                      placeholder="Enter number of years"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateWithdrawalPlan}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Plan Withdrawal
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
                  Withdrawal Analysis
                </h2>

                {calculation ? (
                  <div className="space-y-6">
                    {/* Strategy Status */}
                    <div className={`text-center p-4 rounded-lg ${calculation.color.includes('green') ? 'bg-green-50 border border-green-200' : calculation.color.includes('blue') ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${calculation.color}`}>
                        {calculation.icon}
                        <span className="ml-2 text-lg font-bold">Strategy Status</span>
                      </div>
                      <p className="text-sm text-gray-600">{calculation.recommendation}</p>
                    </div>

                    {/* Annual Breakdown */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Annual Withdrawal Breakdown
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Annual Withdrawal:</span>
                          <span className="font-bold text-blue-600">₹{calculation.annualWithdrawal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax-Efficient Amount:</span>
                          <span className="font-bold text-green-600">₹{calculation.taxEfficientAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax-Inefficient Amount:</span>
                          <span className="font-bold text-red-600">₹{calculation.taxInefficientAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Annual Tax:</span>
                          <span className="font-bold text-red-600">₹{((calculation.taxInefficientAmount * 12.5) / 100).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Long-term Impact */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Long-term Impact
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Withdrawal Period:</span>
                          <span className="font-bold text-green-600">{calculation.withdrawalYears} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Amount Withdrawn:</span>
                          <span className="font-bold text-green-600">₹{(calculation.annualWithdrawal * calculation.withdrawalYears).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Tax Paid:</span>
                          <span className="font-bold text-red-600">₹{calculation.totalTaxPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Amount Received:</span>
                          <span className="font-bold text-green-600">₹{calculation.netAmountReceived.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Optimization Tips */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Optimization Tips
                      </h3>
                      <div className="space-y-2 text-purple-700 text-sm">
                        <p>• Stay within ₹1.25L LTCG exemption annually (Budget 2024)</p>
                        <p>• Consider spreading withdrawals across years</p>
                        <p>• Plan around tax slab boundaries</p>
                        <p>• Monitor corpus sustainability</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter withdrawal details to plan tax-efficient strategy</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related tools */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related tools</h2>
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
        {/* SEO content */}
        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 id="withdrawal-guide" className="text-3xl font-bold text-slate-900 mb-6">Tax-Efficient Withdrawals: Complete Guide (Valid 2026–2050)</h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>Planning <strong>tax-efficient withdrawals</strong> from equity and equity mutual funds helps you use the <strong>LTCG exemption</strong> (₹1.25 lakh per year from Budget 2024) and minimize tax at 12.5% on the excess. Our <strong>Tax-Efficient Withdrawal Planner</strong> shows how much of your annual withdrawal is tax-efficient (within exemption) and how much tax you pay. Valid for <strong>2026 and future years</strong> unless the law is amended. For LTCG rules see <a href="https://economictimes.indiatimes.com/wealth/tax/capital-gains-exemption-limit-hiked-to-rs-1-25-lakh-stcg-tax-rate-changed-to-20-ltcg-hiked-to-12-5-on-certain-assets-in-budget-2024/articleshow/111951361.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times – LTCG exemption Budget 2024</a>. Use our <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="text-indigo-600 hover:underline font-medium">Tax-Efficient Withdrawal Planner</Link>, <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-indigo-600 hover:underline font-medium">Offset LTCG with Exemptions Tool</Link>, and <Link to="/tax-tools/exit-strategy-tax-visualizer" className="text-indigo-600 hover:underline font-medium">Exit Strategy Tax Visualizer</Link>.</p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What is the LTCG exemption?</h3>
              <p>Budget 2024 (effective July 23, 2024) increased the <strong>annual LTCG exemption</strong> for listed equity and equity mutual funds from ₹1 lakh to <strong>₹1,25,000</strong>. LTCG above this limit is taxed at <strong>12.5%</strong>. STCG on equity is taxed at <strong>20%</strong>. Use our planner to see tax-efficient vs tax-inefficient portions. Valid for 2026–2050 unless the law changes.</p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources</h3>
              <p>We offer <Link to="/tax-tools" className="text-indigo-600 hover:underline font-medium">tax tools</Link> for withdrawals, LTCG, capital gains, and deadlines. Visit our <Link to="/learn" className="text-indigo-600 hover:underline font-medium">Learn</Link> section, <Link to="/blog" className="text-indigo-600 hover:underline font-medium">Blog</Link>, and <Link to="/news" className="text-indigo-600 hover:underline font-medium">MoneyCal News</Link>. This tool is for illustration; verify with the Income Tax Act and a tax advisor. Valid for 2026–2050.</p>
              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">LTCG and withdrawal rules are as per the Income Tax Act and may change. This tool is for educational use. Valid for 2026–2050. Consult a CA or tax advisor before withdrawing or filing.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
        {/* Explore more */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore more</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
              <FileText className="h-10 w-10 text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Tax &amp; investment blog</p>
                <p className="text-sm text-slate-500">Articles on withdrawals and tax</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
            </Link>
            <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
              <ExternalLink className="h-10 w-10 text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Latest news</p>
                <p className="text-sm text-slate-500">Markets and tax updates</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
            </Link>
            <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
              <Calculator className="h-10 w-10 text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-indigo-700">All tax tools</p>
                <p className="text-sm text-slate-500">Calculators for tax planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default TaxEfficientWithdrawalPlanner;
