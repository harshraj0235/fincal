import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Info,
  AlertCircle,
  TrendingDown,
  DollarSign,
  Calendar,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface LossBenefit {
  currentYearLoss: number;
  carriedForwardLoss: number;
  totalLoss: number;
  taxBenefit: number;
  carryForwardYears: number;
  recommendations: string[];
  benefits: string[];
  limitations: string[];
}

const CARRY_FORWARD_YEARS = 8;

const ShortTermCapitalLossBenefitEstimator: React.FC = () => {
  const [currentYearLoss, setCurrentYearLoss] = useState('');
  const [previousYearLoss, setPreviousYearLoss] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<LossBenefit | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateBenefit = () => {
    if (!currentYearLoss) {
      alert('Please enter current year loss');
      return;
    }

    const currentLoss = parseFloat(currentYearLoss);
    const previousLoss = parseFloat(previousYearLoss) || 0;
    const otherInc = parseFloat(otherIncome) || 0;
    const slabRate = parseInt(incomeSlab) / 100;

    const totalLoss = currentLoss + previousLoss;
    
    // Tax benefit = potential tax saved if loss were set off against gains at this slab
    const taxBenefit = totalLoss * slabRate;

    const recommendations: string[] = [];
    const benefits: string[] = [];
    const limitations: string[] = [];

    if (currentLoss > 0) {
      recommendations.push('File ITR to carry forward the loss for 8 years');
      recommendations.push('Can be set off against future STCG and LTCG');
      recommendations.push('Maintain proper documentation of losses');
    }

    if (previousLoss > 0) {
      recommendations.push('Utilize carried forward loss against current year gains');
      recommendations.push('Check if loss is still within 8-year limit');
    }

    if (totalLoss > 0 && otherInc > 0) {
      recommendations.push('Consider timing of gains to maximize loss utilization');
    }

    benefits.push('Can be carried forward for 8 assessment years');
    benefits.push('Can be set off against both STCG and LTCG');
    benefits.push('No limit on amount that can be carried forward');
    benefits.push('Helps reduce tax liability in future years');

    limitations.push('Must file ITR to carry forward losses');
    limitations.push('Losses lapse after 8 years if not utilized');
    limitations.push('Cannot be set off against salary or business income');
    limitations.push('Requires proper documentation and proof');

    setResult({
      currentYearLoss: currentLoss,
      carriedForwardLoss: previousLoss,
      totalLoss,
      taxBenefit,
      carryForwardYears: CARRY_FORWARD_YEARS,
      recommendations,
      benefits,
      limitations,
    });
  };

  const resetForm = () => {
    setCurrentYearLoss('');
    setPreviousYearLoss('');
    setOtherIncome('');
    setIncomeSlab('30');
    setResult(null);
  };

  const relatedTools = [
    { name: 'Loss Carry Forward Estimator', path: '/tax-tools/loss-carry-forward-estimator', desc: 'Track carry forward' },
    { name: 'Short-Term Loss Offset Visualizer', path: '/tax-tools/short-term-loss-offset-visualizer', desc: 'Visualize offset' },
    { name: 'Tax Loss Harvesting Calculator', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Equity tax by AY' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan LTCG' },
    { name: 'Intra-Year Redemption Tracker', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sales' },
  ];

  const faqs = [
    {
      q: 'How is the tax benefit from STCL calculated?',
      a: 'The tax benefit shown is the potential tax you would have paid if the short-term capital loss had been a gain, at the selected income tax slab rate. When you set off the loss against STCG or LTCG in the same year or in future years (within 8 years), you save tax on that amount. File ITR to carry forward. Valid for 2026 and future years unless the law changes.',
    },
    {
      q: 'Can STCL be set off against LTCG?',
      a: 'Yes. Short-term capital loss (STCL) can be set off against both short-term capital gains (STCG) and long-term capital gains (LTCG) in the same year. Unabsorbed STCL can be carried forward for 8 assessment years and set off against STCG and LTCG in those years. You must file your ITR within the due date to carry forward the loss.',
    },
    {
      q: 'What income slab should I choose for the benefit estimate?',
      a: 'Choose the slab rate that applies to the tax you would pay on short-term capital gains. STCG on equity is taxed at a flat 20% (no basic exemption). If you are estimating benefit in the context of your overall income, you may use your marginal slab (e.g. 30% for income above ₹5L) as an approximation of tax saved when you set off the loss against gains.',
    },
    {
      q: 'Do I need to file ITR to carry forward STCL?',
      a: 'Yes. To carry forward short-term capital loss, you must file your income tax return (ITR) within the due date (usually 31 July for individuals, or as notified). If you do not file in time, the loss cannot be carried forward and will lapse. This applies under both old and new tax regimes. Valid for 2026–2050 unless the law is amended.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Short-Term Capital Loss Benefit Estimator – STCG Loss Tax Benefit 2026–2050 | MoneyCal"
        description="Calculate benefits of short-term capital losses and optimize tax strategy. STCL set-off against STCG & LTCG, 8-year carry forward. Valid 2026 onwards."
        keywords="STCG loss calculator India, short term capital loss benefit, STCL tax benefit estimator, loss carry forward tax saved, capital loss set off calculator 2026"
        canonicalUrl="/tax-tools/short-term-capital-loss-benefit-estimator"
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
              <span className="text-slate-900 font-medium">Short-Term Capital Loss Benefit Estimator</span>
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
              Short-Term Capital Loss Benefit Estimator
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-rose-100 max-w-2xl mx-auto">
              Calculate benefits of STCG losses and optimize your tax strategy. 8-year carry forward.
            </motion.p>
          </div>
        </section>

        {/* Calculator */}
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current year STCG loss (₹)</label>
                    <input type="number" value={currentYearLoss} onChange={(e) => setCurrentYearLoss(e.target.value)} placeholder="e.g. 50000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Brought-forward loss (₹) – optional</label>
                    <input type="number" value={previousYearLoss} onChange={(e) => setPreviousYearLoss(e.target.value)} placeholder="e.g. 20000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Other income (₹) – optional</label>
                    <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} placeholder="For context" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tax slab for benefit estimate (%)</label>
                    <select value={incomeSlab} onChange={(e) => setIncomeSlab(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L – ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateBenefit} className="flex-1 bg-rose-600 text-white py-3 px-6 rounded-xl hover:bg-rose-700 font-semibold transition-colors">
                      Calculate benefits
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
                  Loss benefit analysis
                </h2>
                <AnimatePresence mode="wait">
                {result ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-xl text-center">
                        <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
                          <p className="text-sm text-red-600">Total loss</p>
                        <p className="text-xl font-bold text-red-900">₹{result.totalLoss.toLocaleString()}</p>
                      </div>
                        <div className="bg-green-50 p-4 rounded-xl text-center">
                        <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="text-sm text-green-600">Tax benefit (est.)</p>
                        <p className="text-xl font-bold text-green-900">₹{result.taxBenefit.toLocaleString()}</p>
                      </div>
                    </div>
                      <div className="flex items-center gap-2 p-4 bg-rose-50 rounded-xl border border-rose-200">
                        <Calendar className="h-5 w-5 text-rose-600 flex-shrink-0" />
                        <span className="font-semibold text-slate-900">Carry forward:</span>
                        <span className="text-slate-700">{result.carryForwardYears} years</span>
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
                    </div>
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                        <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                          <ArrowRight className="h-4 w-4" />
                        Recommendations
                      </h3>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    </motion.div>
                ) : (
                  <div className="text-center py-12">
                      <TrendingDown className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter current year STCG loss to see tax benefit and recommendations.</p>
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
            <h2 id="stcl-benefit-guide" className="text-3xl font-bold text-slate-900 mb-6">
              Short-Term Capital Loss Benefit: Complete Guide (Valid 2026–2050)
              </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                <strong>Short-term capital loss (STCL)</strong> from equity, equity mutual funds, or other short-term capital assets can be <strong>set off</strong> against <strong>short-term capital gains (STCG)</strong> and <strong>long-term capital gains (LTCG)</strong> in the same year. Unabsorbed STCL can be <strong>carried forward for 8 assessment years</strong> and set off against future STCG and LTCG. Understanding the <strong>tax benefit of short-term capital loss</strong> helps you plan redemptions and reduce tax. This guide explains how STCL benefit works, how to use our <strong>Short-Term Capital Loss Benefit Estimator</strong>, and remains valid for <strong>2026 and future years</strong> unless the law is amended (e.g. through 2050).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What is the tax benefit of short-term capital loss?</h3>
              <p>
                The <strong>tax benefit</strong> from STCL is the <strong>tax you save</strong> when you set off the loss against STCG or LTCG. Short-term capital gains on equity are taxed at 20% (plus cess); LTCG above ₹1.25 lakh is taxed at 12.5%. When you set off STCL against such gains, you reduce your taxable capital gains and thus your tax. Our <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-rose-600 hover:underline font-medium">Short-Term Capital Loss Benefit Estimator</Link> shows an <strong>estimated tax benefit</strong> by applying your chosen slab rate to the total loss (current year plus brought forward)—this approximates the potential tax saved when the loss is set off. For exact carry-forward tracking, use our <Link to="/tax-tools/loss-carry-forward-estimator" className="text-rose-600 hover:underline font-medium">Loss Carry Forward Estimator</Link>; for visualizing how ST and LT gains and losses offset each other, use the <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-rose-600 hover:underline font-medium">Short-Term Loss Offset Visualizer</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">How many years can you carry forward STCL?</h3>
              <p>
                <strong>Short-term capital loss</strong> can be <strong>carried forward for 8 assessment years</strong> immediately following the financial year in which the loss was incurred. You must <strong>file your income tax return (ITR)</strong> within the due date to be able to carry forward the loss; otherwise the loss lapses. There is <strong>no limit on the amount</strong> of STCL that can be carried forward. For official rules, see <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Income Tax Department</a> and <a href="https://incometaxindia.gov.in/Pages/tools/carry-forward-and-set-off-of-losses-tool.aspx" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Carry Forward and Set Off of Losses</a>. For news on set-off rules in FY 2025-26, see <a href="https://upstox.com/news/personal-finance/tax/how-to-set-off-long-term-and-short-term-capital-losses-against-capital-gains-in-fy-2025-26/article-164071/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Upstox – Set off capital losses FY 2025-26</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Can STCL be set off against LTCG?</h3>
              <p>
                Yes. <strong>Short-term capital loss (STCL) can be set off against long-term capital gains (LTCG)</strong> in the same year. It can also be set off against short-term capital gains (STCG). So STCL is more flexible than long-term capital loss (LTCL), which can only be set off against LTCG (unless one-time relief from FY 2026-27 applies). Use our <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-rose-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</Link> to plan LTCG and exemption; use our <Link to="/tax-tools/equity-tax-estimator" className="text-rose-600 hover:underline font-medium">Equity Tax Estimator</Link> to see tax by assessment year.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Can you carry forward STCL under the new tax regime?</h3>
              <p>
                Yes. If you opt for the <strong>new tax regime</strong>, you can still <strong>carry forward and set off capital losses</strong> (including STCL) from both previous and current years. The same 8-year carry-forward rule applies. For details, see <a href="https://m.economictimes.com/wealth/invest/can-you-carry-forward-losses-while-filing-itr-under-the-new-tax-regime-read-the-fine-print/articleshow/111156122.cms" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Economic Times – Carry forward losses new tax regime</a>. Our estimator is valid for 2026–2050 unless the law is amended.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">When to use the STCL benefit estimator</h3>
              <p>
                Use our <strong>Short-Term Capital Loss Benefit Estimator</strong> when you have incurred or expect to incur <strong>short-term capital loss</strong> from equity, equity mutual funds, or other short-term assets, and want to see the <strong>potential tax benefit</strong> of setting off that loss against future STCG or LTCG. Enter your current year STCG loss and any brought-forward loss; choose a tax slab that reflects the rate at which you would pay tax on capital gains (e.g. 20% for STCG on equity, or your marginal slab). The tool shows estimated tax benefit and recommendations such as filing ITR to carry forward and utilizing the loss within 8 years. For step-by-step guidance on set-off in a specific year, see <a href="https://upstox.com/news/personal-finance/tax/how-to-set-off-long-term-and-short-term-capital-losses-against-capital-gains-in-fy-2025-26/article-164071/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Upstox – Set off capital losses FY 2025-26</a>. For whether capital losses can be set off against other income, see <a href="https://www.angelone.in/news/taxation/itr-filing-fy25-can-i-set-off-capital-losses-against-other-income" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Angel One – Set off capital losses against other income</a> (they cannot).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Documentation and ITR filing for STCL carry forward</h3>
              <p>
                To <strong>carry forward short-term capital loss</strong>, you must <strong>file your income tax return (ITR)</strong> within the due date (usually 31 July for individuals, or as notified by the CBDT). Maintain <strong>proper documentation</strong>: contract notes, broker statements, and a summary of capital gains and losses for the year. Report the loss in the appropriate schedule (e.g. Schedule CG) in your ITR. There is no separate form to register carry-forward; filing the return in time is the key. If you do not file in time, the loss lapses and cannot be carried forward. For official tools and forms, visit <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">incometax.gov.in</a> and <a href="https://incometaxindia.gov.in/Pages/tools/carry-forward-and-set-off-of-losses-tool.aspx" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Carry Forward and Set Off of Losses</a>. For more on tax and wealth, see <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Economic Times – Tax</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Similar tools: loss carry forward and offset calculators</h3>
              <p>
                If you are looking for a <strong>STCG loss calculator India</strong>, <strong>short term capital loss benefit calculator</strong>, or <strong>tax loss harvesting calculator</strong>, MoneyCal offers several related tools. Besides the Short-Term Capital Loss Benefit Estimator, use the <Link to="/tax-tools/loss-carry-forward-estimator" className="text-rose-600 hover:underline font-medium">Loss Carry Forward Estimator</Link> to track current-year and brought-forward loss and carry-forward period; use the <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-rose-600 hover:underline font-medium">Short-Term Loss Offset Visualizer</Link> to visualize how ST and LT gains and losses offset and what remains taxable or to be carried forward. For classifying gains as short-term or long-term, use the <Link to="/tax-tools/stcg-ltcg-classifier" className="text-rose-600 hover:underline font-medium">STCG vs LTCG Classifier</Link>; for equity tax by assessment year, use the <Link to="/tax-tools/equity-tax-estimator" className="text-rose-600 hover:underline font-medium">Equity Tax Estimator</Link>. For partial sell-offs and multiple redemptions, see <Link to="/tax-tools/tax-on-partial-selloff-calculator" className="text-rose-600 hover:underline font-medium">Tax on Partial Selloff Calculator</Link> and <Link to="/tax-tools/intra-year-redemption-tax-tracker" className="text-rose-600 hover:underline font-medium">Intra-Year Redemption Tax Tracker</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-rose-600 hover:underline font-medium">tax tools</Link> for capital gains, loss carry forward, and income tax. For learning, visit our <Link to="/learn" className="text-rose-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-rose-600 hover:underline font-medium">Blog</Link>. For the latest news on tax and markets, check <Link to="/news" className="text-rose-600 hover:underline font-medium">MoneyCal News</Link>. This estimator is for illustration; verify with the Income Tax Act and a tax advisor for your situation. Provisions described are valid for 2026–2050 unless the law is amended.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">Set-off and carry-forward rules are as per the Income Tax Act and may change. This tool is for educational use. Valid for 2026–2050 unless the law is amended. Consult a CA or tax advisor before filing.</p>
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

export default ShortTermCapitalLossBenefitEstimator;
