import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Info,
  AlertCircle,
  TrendingDown,
  Calendar,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Capital losses: carry forward 8 assessment years. STCL vs STCG/LTCG; LTCL vs LTCG only (unless one-time relief from FY 2026-27).
const CARRY_FORWARD_YEARS = 8;

interface LossResult {
  currentYearLoss: number;
  carriedForwardLoss: number;
  totalLoss: number;
  description: string;
  carryForwardYears: number;
  lossType: 'stcl' | 'ltcl';
  setOffAgainst: string;
}

const LossCarryForwardEstimator: React.FC = () => {
  const [currentYearLoss, setCurrentYearLoss] = useState('');
  const [previousYearLoss, setPreviousYearLoss] = useState('');
  const [lossType, setLossType] = useState<'stcl' | 'ltcl'>('stcl');
  const [result, setResult] = useState<LossResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateLoss = () => {
    if (!currentYearLoss) {
      alert('Please enter current year loss');
      return;
    }

    const currentLoss = parseFloat(currentYearLoss);
    const previousLoss = parseFloat(previousYearLoss) || 0;
    const totalLoss = currentLoss + previousLoss;

    const setOffAgainst = lossType === 'stcl'
      ? 'Can be set off against future STCG and LTCG (same year and carry forward).'
      : 'Can be set off against future LTCG only (same year and carry forward). From FY 2026-27, one-time set-off of LTCL against STCG may apply as per law.';

    const description = lossType === 'stcl'
      ? `Short-term capital loss (STCL) – carry forward for ${CARRY_FORWARD_YEARS} assessment years. Set off against STCG and LTCG. File ITR to carry forward.`
      : `Long-term capital loss (LTCL) – carry forward for ${CARRY_FORWARD_YEARS} assessment years. Set off against LTCG only (unless one-time relief applies). File ITR to carry forward.`;

    setResult({
      currentYearLoss: currentLoss,
      carriedForwardLoss: previousLoss,
      totalLoss,
      description,
      carryForwardYears: CARRY_FORWARD_YEARS,
      lossType,
      setOffAgainst,
    });
  };

  const resetForm = () => {
    setCurrentYearLoss('');
    setPreviousYearLoss('');
    setLossType('stcl');
    setResult(null);
  };

  const relatedTools = [
    { name: 'Short-Term Capital Loss Benefit Estimator', path: '/tax-tools/short-term-capital-loss-benefit-estimator', desc: 'STCL benefits & tax saved' },
    { name: 'Short-Term Loss Offset Visualizer', path: '/tax-tools/short-term-loss-offset-visualizer', desc: 'Visualize loss offset' },
    { name: 'Tax Loss Harvesting Calculator', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains with losses' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Equity tax by AY' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan LTCG' },
    { name: 'Intra-Year Redemption Tracker', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sales' },
  ];

  const faqs = [
    {
      q: 'How many years can I carry forward capital loss?',
      a: 'Under the Income Tax Act, both short-term capital loss (STCL) and long-term capital loss (LTCL) can be carried forward for 8 assessment years immediately following the year in which the loss was incurred. You must file your income tax return (ITR) within the due date to be able to carry forward the loss. These provisions remain in force unless the law is amended (valid for 2026 and future years).',
    },
    {
      q: 'What can STCL be set off against?',
      a: 'Short-term capital loss (STCL) can be set off against short-term capital gains (STCG) and long-term capital gains (LTCG) in the same year. Unabsorbed STCL can be carried forward for 8 assessment years and set off against STCG and LTCG in those years. STCL cannot be set off against salary, business income, or other heads of income.',
    },
    {
      q: 'What can LTCL be set off against?',
      a: 'Long-term capital loss (LTCL) can be set off only against long-term capital gains (LTCG) in the same year or in future years (within 8 years). Under existing rules, LTCL cannot be set off against short-term capital gains. From FY 2026-27, a one-time set-off of LTCL against STCG may be allowed as per the Income Tax Bill 2025; refer to the latest law for applicability.',
    },
    {
      q: 'Do I need to file ITR to carry forward capital loss?',
      a: 'Yes. To carry forward capital losses (both STCL and LTCL), you must file your income tax return (ITR) within the due date (usually 31 July for individuals, or as notified). If you do not file the return in time, the loss cannot be carried forward and will lapse.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Loss Carry Forward Estimator – Capital Loss Carry Forward 2026–2050 | MoneyCal"
        description="Calculate and track capital loss carry forward. STCL & LTCL carry forward 8 years. Set-off rules, file ITR to carry forward. Valid 2026 onwards."
        keywords="loss carry forward calculator India, capital loss carry forward 8 years, STCL LTCL carry forward, set off capital loss, file ITR carry forward loss"
        canonicalUrl="/tax-tools/loss-carry-forward-estimator"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tax-tools" className="hover:text-blue-600">Tax Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Loss Carry Forward Estimator</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-red-500 to-orange-600 text-white pt-12 pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Loss Management • Valid 2026–2050
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              Loss Carry Forward Estimator
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-rose-100 max-w-2xl mx-auto">
              Calculate and track capital loss carry forward. STCL &amp; LTCL – 8 years. File ITR to carry forward.
            </motion.p>
          </div>
        </section>

        {/* Calculator Card */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-rose-600" />
                  Loss details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Loss type</label>
                    <select value={lossType} onChange={(e) => setLossType(e.target.value as 'stcl' | 'ltcl')} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                      <option value="stcl">Short-term capital loss (STCL)</option>
                      <option value="ltcl">Long-term capital loss (LTCL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current year loss (₹)</label>
                    <input type="number" value={currentYearLoss} onChange={(e) => setCurrentYearLoss(e.target.value)} placeholder="e.g. 50000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Brought-forward loss (₹) – optional</label>
                    <input type="number" value={previousYearLoss} onChange={(e) => setPreviousYearLoss(e.target.value)} placeholder="e.g. 20000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateLoss} className="flex-1 bg-rose-600 text-white py-3 px-6 rounded-xl hover:bg-rose-700 font-semibold transition-colors">
                      Calculate
                    </button>
                    <button onClick={resetForm} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Info className="h-6 w-6 text-rose-600" />
                  Result
                </h2>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <p className="text-sm text-slate-500 uppercase tracking-wider">Loss type</p>
                        <p className="text-lg font-bold text-slate-900">{result.lossType === 'stcl' ? 'Short-term capital loss (STCL)' : 'Long-term capital loss (LTCL)'}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                          <span className="text-slate-700">Current year loss</span>
                          <span className="font-bold text-red-600">₹{result.currentYearLoss.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl">
                          <span className="text-slate-700">Brought forward</span>
                          <span className="font-bold text-orange-600">₹{result.carriedForwardLoss.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-rose-50 rounded-xl border-2 border-rose-200">
                          <span className="text-slate-700 font-semibold">Total loss</span>
                          <span className="font-bold text-rose-700">₹{result.totalLoss.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-4 bg-slate-100 rounded-xl border border-slate-200">
                        <Calendar className="h-5 w-5 text-rose-600 flex-shrink-0" />
                        <span className="font-semibold text-slate-900">Carry forward:</span>
                        <span className="text-slate-700">{result.carryForwardYears} assessment years</span>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                        <p className="text-sm text-slate-600 mb-2">{result.setOffAgainst}</p>
                        <p className="text-sm text-slate-600">{result.description}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <TrendingDown className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter current year loss to see carry forward and set-off rules.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Related tools */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link key={tool.path} to={tool.path} className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/50 transition-all">
                <ChevronRight className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-rose-700">{tool.name}</p>
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

        {/* SEO content – 1500+ words, valid 2026–2050 */}
        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 id="loss-carry-forward-guide" className="text-3xl font-bold text-slate-900 mb-6">
              Capital Loss Carry Forward in India: Complete Guide (Valid 2026–2050)
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                Under the <strong>Income Tax Act, 1961</strong>, <strong>capital losses</strong> (both short-term and long-term) can be <strong>carried forward</strong> for a specified number of assessment years and set off against future capital gains. Understanding carry-forward and set-off rules helps you plan redemptions and reduce tax. This guide explains how capital loss carry forward works, how to use our <strong>Loss Carry Forward Estimator</strong>, and remains valid for <strong>2026 and future years</strong> unless the law is amended (e.g. through 2050). Rules described here reflect current provisions as applicable till such time the law is changed.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">How many years can you carry forward capital loss?</h3>
              <p>
                Both <strong>short-term capital loss (STCL)</strong> and <strong>long-term capital loss (LTCL)</strong> can be <strong>carried forward for 8 assessment years</strong> immediately following the financial year in which the loss was incurred. So if you incur a loss in FY 2025-26, you can carry it forward from AY 2026-27 to AY 2034-35. You must <strong>file your income tax return (ITR)</strong> within the due date to be able to carry forward the loss; otherwise the loss lapses. Use our <Link to="/tax-tools/loss-carry-forward-estimator" className="text-rose-600 hover:underline font-medium">Loss Carry Forward Estimator</Link> to enter current-year loss and brought-forward loss and see total loss and carry-forward period. For estimating tax benefit from STCL, use our <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-rose-600 hover:underline font-medium">Short-Term Capital Loss Benefit Estimator</Link>; for visualizing set-off of STCL against STCG and LTCG, use the <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-rose-600 hover:underline font-medium">Short-Term Loss Offset Visualizer</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Set-off rules: STCL vs LTCL</h3>
              <p>
                <strong>Short-term capital loss (STCL)</strong> can be set off against <strong>short-term capital gains (STCG)</strong> and <strong>long-term capital gains (LTCG)</strong> in the same year. Unabsorbed STCL can be carried forward for 8 years and set off against STCG and LTCG in those years. <strong>Long-term capital loss (LTCL)</strong> can be set off only against <strong>long-term capital gains (LTCG)</strong> in the same year or in future years (within 8 years). Under existing rules, LTCL cannot be set off against short-term capital gains. From <strong>FY 2026-27</strong>, a <strong>one-time set-off of LTCL against STCG</strong> may be allowed as per the Income Tax Bill 2025; investors should refer to the latest law and notifications for applicability. Capital losses <strong>cannot</strong> be set off against income from other heads (salary, business, house property, etc.). For official details, see <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Income Tax Department</a> and <a href="https://incometaxindia.gov.in/Pages/tools/carry-forward-and-set-off-of-losses-tool.aspx" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Carry Forward and Set Off of Losses</a>. For more on set-off, see <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Economic Times – Tax</a> and <a href="https://taxguru.in/income-tax/all-about-carry-forward-and-set-off-of-losses-under-the-income-tax-act.html" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">TaxGuru – Carry Forward and Set Off</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why file ITR to carry forward loss?</h3>
              <p>
                To <strong>carry forward</strong> capital losses, you must <strong>file your income tax return (ITR)</strong> within the due date (usually 31 July for individuals, or as notified). If you do not file the return in time, the loss cannot be carried forward and will lapse. So even if you have no taxable income in a year but have incurred a capital loss, filing the return is essential to preserve the loss for future set-off. Use our <Link to="/tax-tools/tax-loss-harvesting-calculator" className="text-rose-600 hover:underline font-medium">Tax Loss Harvesting Calculator</Link> to plan loss utilization, and our <Link to="/tax-tools/stcg-ltcg-classifier" className="text-rose-600 hover:underline font-medium">STCG vs LTCG Classifier</Link> and <Link to="/tax-tools/equity-tax-estimator" className="text-rose-600 hover:underline font-medium">Equity Tax Estimator</Link> to see tax on gains. For planning LTCG and exemption, see <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-rose-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Can you carry forward losses under the new tax regime?</h3>
              <p>
                Yes. If you opt for the <strong>new tax regime</strong>, you can still <strong>carry forward and set off capital losses</strong> from both previous and current years. The same 8-year carry-forward rule applies. House property losses have different rules under the new regime. For detailed guidance on carry forward of losses while filing ITR under the new tax regime, see <a href="https://m.economictimes.com/wealth/invest/can-you-carry-forward-losses-while-filing-itr-under-the-new-tax-regime-read-the-fine-print/articleshow/111156122.cms" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Economic Times – Carry forward losses new tax regime</a>. Use our <Link to="/tax-tools/equity-tax-estimator" className="text-rose-600 hover:underline font-medium">Equity Tax Estimator</Link> to see tax by assessment year under current rates.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">One-time set-off of LTCL against STCG from FY 2026-27</h3>
              <p>
                The <strong>Income Tax Bill 2025</strong> introduces a <strong>one-time relief</strong> allowing <strong>long-term capital loss (LTCL) to be set off against short-term capital gains (STCG)</strong>. This provision applies to losses incurred up to 31 March 2026 and becomes effective from the tax year 2026-27 onwards. Until now, LTCL could only be set off against LTCG. For news and analysis on this one-time set-off, refer to <a href="https://m.economictimes.com/wealth/tax/one-time-set-off-of-long-term-capital-loss-against-stcg-new-income-tax-bill-2025-allows-this-from-tax-year-2026-27-onwards/articleshow/121287647.cms" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Economic Times – One-time set-off LTCL against STCG</a>. Our <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-rose-600 hover:underline font-medium">Short-Term Loss Offset Visualizer</Link> helps you visualize how ST and LT gains and losses interact.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Can capital losses be set off against other income?</h3>
              <p>
                No. <strong>Capital losses cannot be set off against salary, business income, house property income, or other heads of income</strong>. Inter-head adjustment is not permitted for capital losses. They can only be set off against capital gains (STCG and/or LTCG as per the rules). For a clear explanation of whether you can set off capital losses against other income while filing ITR, see <a href="https://www.angelone.in/news/taxation/itr-filing-fy25-can-i-set-off-capital-losses-against-other-income" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Angel One – Set off capital losses against other income</a>. To plan gains and losses in one place, use our <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-rose-600 hover:underline font-medium">Short-Term Loss Offset Visualizer</Link> and <Link to="/tax-tools/tax-loss-harvesting-calculator" className="text-rose-600 hover:underline font-medium">Tax Loss Harvesting Calculator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">How to set off long-term and short-term capital losses in FY 2025-26</h3>
              <p>
                In <strong>FY 2025-26</strong>, the standard rules apply: set off STCL first against STCG, then against LTCG in the same year. Set off LTCL only against LTCG. File your ITR within the due date to carry forward any unabsorbed loss for the next 8 assessment years. For a step-by-step guide on how to set off long-term and short-term capital losses against capital gains in FY 2025-26, see <a href="https://upstox.com/news/personal-finance/tax/how-to-set-off-long-term-and-short-term-capital-losses-against-capital-gains-in-fy-2025-26/article-164071/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Upstox – Set off capital losses FY 2025-26</a>. Our <Link to="/tax-tools/loss-carry-forward-estimator" className="text-rose-600 hover:underline font-medium">Loss Carry Forward Estimator</Link> and <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-rose-600 hover:underline font-medium">Short-Term Capital Loss Benefit Estimator</Link> help you quantify total loss and potential tax benefit.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Similar tools and calculators for loss and gains</h3>
              <p>
                If you are looking for <strong>capital loss carry forward calculator India</strong>, <strong>STCL LTCL carry forward calculator</strong>, or <strong>tax loss harvesting calculator</strong>, MoneyCal offers several related tools. Besides the Loss Carry Forward Estimator, try the <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-rose-600 hover:underline font-medium">Short-Term Capital Loss Benefit Estimator</Link> to see potential tax saved from STCL, and the <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-rose-600 hover:underline font-medium">Short-Term Loss Offset Visualizer</Link> to visualize offset of ST and LT gains and losses. For classifying gains as short-term or long-term, use the <Link to="/tax-tools/stcg-ltcg-classifier" className="text-rose-600 hover:underline font-medium">STCG vs LTCG Classifier</Link>; for equity tax by assessment year, use the <Link to="/tax-tools/equity-tax-estimator" className="text-rose-600 hover:underline font-medium">Equity Tax Estimator</Link>. For partial sell-offs and multiple redemptions, see <Link to="/tax-tools/tax-on-partial-selloff-calculator" className="text-rose-600 hover:underline font-medium">Tax on Partial Selloff Calculator</Link> and <Link to="/tax-tools/intra-year-redemption-tax-tracker" className="text-rose-600 hover:underline font-medium">Intra-Year Redemption Tax Tracker</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Documentation and proof for carry forward</h3>
              <p>
                Maintain <strong>proper documentation</strong> of your capital transactions and losses: contract notes, broker statements, and capital gains/loss summary. When you file ITR, report the loss in the appropriate schedule (e.g. Schedule CG) so that the department records the carry-forward. There is no separate form to “register” carry-forward; filing the return within the due date is the key. For official tools and forms, visit <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">incometax.gov.in</a> and <a href="https://incometaxindia.gov.in/Pages/tools/carry-forward-and-set-off-of-losses-tool.aspx" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Carry Forward and Set Off of Losses</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-rose-600 hover:underline font-medium">tax tools</Link> for capital gains, loss carry forward, and income tax. For learning, visit our <Link to="/learn" className="text-rose-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-rose-600 hover:underline font-medium">Blog</Link>. For the latest news on tax and markets, check <Link to="/news" className="text-rose-600 hover:underline font-medium">MoneyCal News</Link>. This loss carry forward estimator is for illustration; verify with the Income Tax Act and a tax advisor for your situation. Provisions described are valid for 2026 and future years unless the law is amended.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">Carry-forward and set-off rules are as per the Income Tax Act and may change. This tool is for educational use. Valid for 2026–2050 unless the law is amended. Consult a CA or tax advisor before filing.</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Explore more */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore more</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all flex items-center gap-4">
              <FileText className="h-10 w-10 text-rose-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-rose-700">Tax &amp; investment blog</p>
                <p className="text-sm text-slate-500">Articles on loss and tax</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-rose-600 ml-auto" />
            </Link>
            <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all flex items-center gap-4">
              <ExternalLink className="h-10 w-10 text-rose-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-rose-700">Latest news</p>
                <p className="text-sm text-slate-500">Markets and tax updates</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-rose-600 ml-auto" />
            </Link>
            <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all flex items-center gap-4">
              <Calculator className="h-10 w-10 text-rose-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-rose-700">All tax tools</p>
                <p className="text-sm text-slate-500">Calculators for tax planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-rose-600 ml-auto" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default LossCarryForwardEstimator;
