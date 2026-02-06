import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Info,
  FileText,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Download,
  Share2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface LossOffsetResult {
  totalSTGains: number;
  totalSTLosses: number;
  totalLTGains: number;
  totalLTLosses: number;
  netSTGains: number;
  netLTGains: number;
  stLossOffset: number;
  ltLossOffset: number;
  carryForwardLoss: number;
  finalTaxableGains: number;
  recommendations: string[];
  status: 'success' | 'warning' | 'info';
  icon: React.ReactNode;
}

const CARRY_FORWARD_YEARS = 8;

const ShortTermLossOffsetVisualizer: React.FC = () => {
  const [stGains, setStGains] = useState<string>('');
  const [stLosses, setStLosses] = useState<string>('');
  const [ltGains, setLtGains] = useState<string>('');
  const [ltLosses, setLtLosses] = useState<string>('');
  const [result, setResult] = useState<LossOffsetResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateLossOffset = () => {
    const stG = parseFloat(stGains) || 0;
    const stL = parseFloat(stLosses) || 0;
    const ltG = parseFloat(ltGains) || 0;
    const ltL = parseFloat(ltLosses) || 0;

    const netSTGains = stG - stL;
    const netLTGains = ltG - ltL;

    let stLossOffset = 0;
    let ltLossOffset = 0;
    let carryForwardLoss = 0;
    let finalTaxableGains = 0;

    // ST losses offset ST gains first, then remaining ST loss can offset LT gains (net LT = ltG - ltL)
    if (stL > stG) {
      stLossOffset = stG;
      const remainingSTLoss = stL - stG;
      const netLT = ltG - ltL;

      if (remainingSTLoss >= netLT) {
        ltLossOffset = Math.max(0, netLT);
        carryForwardLoss = remainingSTLoss - netLT;
        finalTaxableGains = 0;
      } else {
        ltLossOffset = remainingSTLoss;
        finalTaxableGains = netLT - remainingSTLoss;
        carryForwardLoss = 0;
      }
    } else {
      stLossOffset = stL;
      finalTaxableGains = Math.max(0, netSTGains) + Math.max(0, netLTGains);
      carryForwardLoss = 0;
    }

    const recommendations: string[] = [];
    if (carryForwardLoss > 0) {
      recommendations.push(`Carry forward ₹${carryForwardLoss.toLocaleString()} for next ${CARRY_FORWARD_YEARS} years`);
    }
    if (netSTGains > 0) {
      recommendations.push('Consider holding investments longer to qualify for LTCG benefits');
    }
    if (stL > stG) {
      recommendations.push('Maximize ST loss utilization against LT gains this year');
    }
    if (finalTaxableGains > 0) {
      recommendations.push('File ITR and report gains/losses; use loss carry forward in future years if applicable');
    }

    let status: 'success' | 'warning' | 'info' = 'info';
    let icon: React.ReactNode = <Info className="h-5 w-5" />;
    if (carryForwardLoss > 0) {
      status = 'warning';
      icon = <AlertTriangle className="h-5 w-5" />;
    } else if (finalTaxableGains === 0) {
      status = 'success';
      icon = <CheckCircle className="h-5 w-5" />;
    }

    setResult({
      totalSTGains: stG,
      totalSTLosses: stL,
      totalLTGains: ltG,
      totalLTLosses: ltL,
      netSTGains,
      netLTGains,
      stLossOffset,
      ltLossOffset,
      carryForwardLoss,
      finalTaxableGains,
      recommendations,
      status,
      icon,
    });
  };

  const resetForm = () => {
    setStGains('');
    setStLosses('');
    setLtGains('');
    setLtLosses('');
    setResult(null);
  };

  const exportToCSV = () => {
    if (!result) return;
    const csvContent =
      'Short Term Loss Offset Analysis\n\n' +
      `Short Term Gains,${result.totalSTGains}\n` +
      `Short Term Losses,${result.totalSTLosses}\n` +
      `Long Term Gains,${result.totalLTGains}\n` +
      `Long Term Losses,${result.totalLTLosses}\n` +
      `Net ST Gains,${result.netSTGains}\n` +
      `Net LT Gains,${result.netLTGains}\n` +
      `ST Loss Offset,${result.stLossOffset}\n` +
      `LT Loss Offset,${result.ltLossOffset}\n` +
      `Carry Forward Loss,${result.carryForwardLoss}\n` +
      `Final Taxable Gains,${result.finalTaxableGains}\n`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'short-term-loss-offset-analysis.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const relatedTools = [
    { name: 'Loss Carry Forward Estimator', path: '/tax-tools/loss-carry-forward-estimator', desc: 'Track carry forward' },
    { name: 'Short-Term Capital Loss Benefit Estimator', path: '/tax-tools/short-term-capital-loss-benefit-estimator', desc: 'STCL tax benefit' },
    { name: 'Tax Loss Harvesting Calculator', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Equity tax by AY' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan LTCG' },
    { name: 'Intra-Year Redemption Tracker', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sales' },
  ];

  const faqs = [
    {
      q: 'In what order are ST and LT losses set off against gains?',
      a: 'Short-term capital loss (STCL) is first set off against short-term capital gains (STCG) in the same year. Any remaining STCL can then be set off against long-term capital gains (LTCG). Long-term capital loss (LTCL) can only be set off against LTCG (and from FY 2026-27, one-time set-off against STCG may apply as per law). This tool visualizes the offset order and final taxable gains. Valid for 2026–2050 unless the law changes.',
    },
    {
      q: 'How is carry forward loss calculated in the visualizer?',
      a: 'If your short-term capital losses exceed your ST gains, the excess ST loss can be set off against your net long-term capital gains (LT gains minus LT losses). Any ST loss still remaining after offsetting both ST and LT gains is the amount you can carry forward for 8 assessment years. You must file ITR within the due date to carry forward. Use our Loss Carry Forward Estimator to track brought-forward loss.',
    },
    {
      q: 'Do I need to file ITR to carry forward unabsorbed ST loss?',
      a: 'Yes. To carry forward unabsorbed short-term capital loss, you must file your income tax return (ITR) within the due date (usually 31 July for individuals). If you do not file in time, the loss lapses. This applies under both old and new tax regimes. Valid for 2026 and future years unless the law is amended.',
    },
    {
      q: 'Can LT losses be set off against ST gains?',
      a: 'Under current rules, long-term capital loss (LTCL) can only be set off against long-term capital gains (LTCG). From FY 2026-27, the Income Tax Bill 2025 may allow a one-time set-off of LTCL against STCG; refer to the latest law for applicability. This visualizer focuses on ST loss offset; for LTCL rules see our Loss Carry Forward Estimator.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Short-Term Loss Offset Visualizer – Capital Loss Offset Strategy 2026–2050 | MoneyCal"
        description="Visualize and optimize capital loss offset strategies. ST loss vs ST/LT gains, carry forward. Valid 2026 onwards."
        keywords="short term loss offset calculator India, capital loss offset visualizer, STCL set off STCG LTCG, loss carry forward 8 years calculator 2026"
        canonicalUrl="/tax-tools/short-term-loss-offset-visualizer"
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
              <span className="text-slate-900 font-medium">Short-Term Loss Offset Visualizer</span>
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
              Short-Term Loss Offset Visualizer
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-rose-100 max-w-2xl mx-auto">
              Visualize and optimize capital loss offset strategies. ST loss vs ST/LT gains, 8-year carry forward.
            </motion.p>
          </div>
        </section>

        {/* Calculator & Results */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-rose-600" />
                  Gains &amp; losses
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short-term capital gains (₹)</label>
                    <input type="number" value={stGains} onChange={(e) => setStGains(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short-term capital losses (₹)</label>
                    <input type="number" value={stLosses} onChange={(e) => setStLosses(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Long-term capital gains (₹)</label>
                    <input type="number" value={ltGains} onChange={(e) => setLtGains(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Long-term capital losses (₹)</label>
                    <input type="number" value={ltLosses} onChange={(e) => setLtLosses(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateLossOffset} className="flex-1 bg-rose-600 text-white py-3 px-6 rounded-xl hover:bg-rose-700 font-semibold transition-colors">
                      Calculate offset
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
                  Offset summary
                </h2>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className={`rounded-xl border-l-4 p-4 ${result.status === 'success' ? 'bg-green-50 border-green-500' : result.status === 'warning' ? 'bg-amber-50 border-amber-500' : 'bg-slate-50 border-slate-400'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {result.icon}
                          <span className="font-semibold text-slate-900">Loss offset summary</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">₹{result.stLossOffset.toLocaleString()}</div>
                            <div className="text-sm text-green-700">ST loss offset</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">₹{result.ltLossOffset.toLocaleString()}</div>
                            <div className="text-sm text-blue-700">LT loss offset</div>
                          </div>
                        </div>
                        <div className="text-center p-4 bg-slate-100 rounded-xl mt-3">
                          <div className="text-2xl font-bold text-slate-900">₹{result.finalTaxableGains.toLocaleString()}</div>
                          <div className="text-sm text-slate-600">Final taxable gains</div>
                        </div>
                      {result.carryForwardLoss > 0 && (
                          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                            <div className="font-semibold text-amber-800">Carry forward: ₹{result.carryForwardLoss.toLocaleString()}</div>
                            <div className="text-sm text-amber-700">Available for next {CARRY_FORWARD_YEARS} years. File ITR to carry forward.</div>
                        </div>
                      )}
                    </div>
                      {result.recommendations.length > 0 && (
                        <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
                          <h3 className="font-semibold text-rose-900 mb-2 flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                        Recommendations
                      </h3>
                          <ul className="space-y-1">
                            {result.recommendations.map((rec, i) => (
                              <li key={i} className="text-sm text-rose-800 flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                      )}
                      <div className="flex gap-3">
                        <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm font-medium">
                          <Download className="h-4 w-4" />
                          Export CSV
                        </button>
                        {typeof navigator !== 'undefined' && navigator.share && (
                        <button
                            onClick={() => navigator.share({ title: 'Short-Term Loss Offset Analysis', text: `Final Taxable Gains: ₹${result.finalTaxableGains.toLocaleString()}`, url: window.location.href })}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-xl hover:bg-slate-700 text-sm font-medium"
                          >
                            <Share2 className="h-4 w-4" />
                          Share
                        </button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <TrendingDown className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter ST/LT gains and losses to see offset and final taxable gains.</p>
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
            <h2 id="loss-offset-guide" className="text-3xl font-bold text-slate-900 mb-6">
              Capital Loss Offset Strategy: Complete Guide (Valid 2026–2050)
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                Understanding <strong>capital loss offset</strong> rules helps you minimize tax by setting off <strong>short-term capital loss (STCL)</strong> and <strong>long-term capital loss (LTCL)</strong> against <strong>short-term capital gains (STCG)</strong> and <strong>long-term capital gains (LTCG)</strong> in the right order. Our <strong>Short-Term Loss Offset Visualizer</strong> lets you enter your ST and LT gains and losses and see how much is offset, how much is taxable, and how much can be <strong>carried forward for 8 years</strong>. This guide explains the offset order, carry-forward rules, and remains valid for <strong>2026 and future years</strong> unless the law is amended (e.g. through 2050).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">In what order are losses set off against gains?</h3>
              <p>
                <strong>Short-term capital loss (STCL)</strong> is first set off against <strong>short-term capital gains (STCG)</strong> in the same year. Any <strong>remaining STCL</strong> can then be set off against <strong>long-term capital gains (LTCG)</strong>. Long-term capital loss (LTCL) can only be set off against LTCG in the same year or in future years (within 8 years); under current rules LTCL cannot be set off against STCG. From <strong>FY 2026-27</strong>, a one-time set-off of LTCL against STCG may be allowed as per the Income Tax Bill 2025; refer to the latest law. Use our <Link to="/tax-tools/short-term-loss-offset-visualizer" className="text-rose-600 hover:underline font-medium">Short-Term Loss Offset Visualizer</Link> to see the exact offset and final taxable gains; use our <Link to="/tax-tools/loss-carry-forward-estimator" className="text-rose-600 hover:underline font-medium">Loss Carry Forward Estimator</Link> to track carry-forward amount and period. For official rules, see <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Income Tax Department</a> and <a href="https://incometaxindia.gov.in/Pages/tools/carry-forward-and-set-off-of-losses-tool.aspx" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Carry Forward and Set Off of Losses</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">How is final taxable gain calculated?</h3>
              <p>
                After setting off STCL against STCG, any remaining STCL is set off against your <strong>net long-term capital gains</strong> (LT gains minus LT losses). The amount of LTCG left after this set-off, plus any net STCG (ST gains minus ST losses) that remains, is your <strong>final taxable capital gains</strong>. Any STCL that could not be set off in the year can be <strong>carried forward for 8 assessment years</strong> and set off against future STCG and LTCG. You must file your ITR within the due date to carry forward. For a step-by-step guide on set-off in FY 2025-26, see <a href="https://upstox.com/news/personal-finance/tax/how-to-set-off-long-term-and-short-term-capital-losses-against-capital-gains-in-fy-2025-26/article-164071/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Upstox – Set off capital losses FY 2025-26</a>. For estimating tax benefit from STCL, use our <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-rose-600 hover:underline font-medium">Short-Term Capital Loss Benefit Estimator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Can you carry forward loss under the new tax regime?</h3>
              <p>
                Yes. If you opt for the <strong>new tax regime</strong>, you can still <strong>carry forward and set off capital losses</strong> (both STCL and LTCL) from previous and current years. The same 8-year carry-forward and set-off order applies. For details, see <a href="https://m.economictimes.com/wealth/invest/can-you-carry-forward-losses-while-filing-itr-under-the-new-tax-regime-read-the-fine-print/articleshow/111156122.cms" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Economic Times – Carry forward losses new tax regime</a>. Our visualizer is valid for 2026–2050 unless the law is amended.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Similar tools: loss offset and carry forward calculators</h3>
              <p>
                If you are looking for a <strong>short term loss offset calculator India</strong>, <strong>capital loss offset visualizer</strong>, or <strong>tax loss harvesting calculator</strong>, MoneyCal offers several related tools. Besides the Short-Term Loss Offset Visualizer, use the <Link to="/tax-tools/loss-carry-forward-estimator" className="text-rose-600 hover:underline font-medium">Loss Carry Forward Estimator</Link> to track current-year and brought-forward loss; use the <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-rose-600 hover:underline font-medium">Short-Term Capital Loss Benefit Estimator</Link> to see potential tax saved from STCL. For classifying gains as short-term or long-term, use the <Link to="/tax-tools/stcg-ltcg-classifier" className="text-rose-600 hover:underline font-medium">STCG vs LTCG Classifier</Link>; for equity tax by assessment year, use the <Link to="/tax-tools/equity-tax-estimator" className="text-rose-600 hover:underline font-medium">Equity Tax Estimator</Link>. For LTCG and exemption planning, see <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-rose-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</Link>; for partial sell-offs and multiple redemptions, see <Link to="/tax-tools/tax-on-partial-selloff-calculator" className="text-rose-600 hover:underline font-medium">Tax on Partial Selloff Calculator</Link> and <Link to="/tax-tools/intra-year-redemption-tax-tracker" className="text-rose-600 hover:underline font-medium">Intra-Year Redemption Tax Tracker</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">When to use the loss offset visualizer</h3>
              <p>
                Use our <strong>Short-Term Loss Offset Visualizer</strong> when you have both <strong>short-term and long-term capital gains and losses</strong> in the same year and want to see how they offset each other, what your <strong>final taxable capital gains</strong> are, and how much loss can be <strong>carried forward for 8 years</strong>. Enter your ST gains, ST losses, LT gains, and LT losses; the tool applies the correct set-off order (STCL vs STCG first, then remaining STCL vs LTCG) and shows ST loss offset, LT loss offset, final taxable gains, and any carry-forward amount. Use it together with our <Link to="/tax-tools/loss-carry-forward-estimator" className="text-rose-600 hover:underline font-medium">Loss Carry Forward Estimator</Link> and <Link to="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-rose-600 hover:underline font-medium">Short-Term Capital Loss Benefit Estimator</Link> for a full loss-management workflow. For news on one-time LTCL vs STCG from FY 2026-27, see <a href="https://m.economictimes.com/wealth/tax/one-time-set-off-of-long-term-capital-loss-against-stcg-new-income-tax-bill-2025-allows-this-from-tax-year-2026-27-onwards/articleshow/121287647.cms" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Economic Times – One-time set-off LTCL against STCG</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Documentation and ITR filing</h3>
              <p>
                To <strong>carry forward</strong> any unabsorbed capital loss, you must <strong>file your income tax return (ITR)</strong> within the due date. Maintain contract notes, broker statements, and a summary of gains and losses. Report all gains and losses in the appropriate schedule (e.g. Schedule CG). For official tools and forms, visit <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">incometax.gov.in</a>. For more on tax and wealth, see <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Economic Times – Tax</a> and <a href="https://www.angelone.in/news/taxation/itr-filing-fy25-can-i-set-off-capital-losses-against-other-income" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Angel One – Set off capital losses</a> (capital losses cannot be set off against other income).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-rose-600 hover:underline font-medium">tax tools</Link> for capital gains, loss offset, and carry forward. For learning, visit our <Link to="/learn" className="text-rose-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-rose-600 hover:underline font-medium">Blog</Link>. For the latest news on tax and markets, check <Link to="/news" className="text-rose-600 hover:underline font-medium">MoneyCal News</Link>. This visualizer is for illustration; verify with the Income Tax Act and a tax advisor for your situation. Provisions described are valid for 2026–2050 unless the law is amended.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
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

export default ShortTermLossOffsetVisualizer;
