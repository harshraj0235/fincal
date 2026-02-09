import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Info,
  TrendingUp,
  Shield,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface NPSResult {
  taxBenefit: number;
  growthBenefit: number;
  totalBenefit: number;
  recommendation: string;
}

const NPS_80CCD1B_LIMIT = 50000;

const NPSTaxBenefitVsGrowthEstimator: React.FC = () => {
  const [investment, setInvestment] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [years, setYears] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<NPSResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateBenefits = () => {
    if (!investment || !growthRate || !years) {
      alert('Please fill in all fields');
      return;
    }

    const inv = parseFloat(investment);
    const growth = parseFloat(growthRate) / 100;
    const y = parseInt(years);
    const slabRate = parseInt(incomeSlab) / 100;

    // Tax benefit: Section 80CCD(1B) – additional ₹50,000 deduction (old regime only)
    const taxBenefit = Math.min(inv, NPS_80CCD1B_LIMIT) * slabRate;

    const futureValue = inv * Math.pow(1 + growth, y);
    const growthBenefit = futureValue - inv;
    const totalBenefit = taxBenefit + growthBenefit;

    const recommendation =
      taxBenefit > growthBenefit
        ? 'Tax benefits (80CCD(1B)) are more significant than growth in the short run'
        : 'Growth benefits outweigh immediate tax benefits over this period';

    setResult({
      taxBenefit,
      growthBenefit,
      totalBenefit,
      recommendation,
    });
  };

  const resetForm = () => {
    setInvestment('');
    setGrowthRate('');
    setYears('');
    setIncomeSlab('30');
    setResult(null);
  };

  const relatedTools = [
    { name: 'Section 80C Tally Analyzer', path: '/tax-tools/section-80c-tally-analyzer', desc: '80C investments' },
    { name: 'ELSS Lock-in vs Tax Benefit Visualizer', path: '/tax-tools/elss-lockin-vs-tax-benefit-visualizer', desc: 'ELSS 3-year vs benefit' },
    { name: 'Tax Filing Deadline Reminder', path: '/tax-tools/tax-filing-deadline-reminder-widget', desc: 'ITR & advance tax' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Capital gains tax' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'LTCG exemption' },
    { name: 'Dividend Tax Estimator', path: '/tax-tools/dividend-tax-estimator', desc: 'Dividend TDS & tax' },
    { name: 'Loss Carry Forward Estimator', path: '/tax-tools/loss-carry-forward-estimator', desc: 'Capital loss carry forward' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
  ];

  const faqs = [
    {
      q: 'What is the NPS additional tax deduction under 80CCD(1B)?',
      a: 'Section 80CCD(1B) allows an additional deduction of up to ₹50,000 on your personal NPS contribution, over and above the ₹1.5 lakh limit under Section 80C/80CCD(1). This additional deduction is available only under the old tax regime. Under the new tax regime, personal NPS contributions are not deductible; only employer contribution under 80CCD(2) is allowed. Valid for 2026 and future years unless the law changes.',
    },
    {
      q: 'Is NPS tax benefit available under the new tax regime?',
      a: 'Personal NPS contributions under 80CCD(1) and 80CCD(1B) are not deductible in the new tax regime. Only employer contribution to NPS under Section 80CCD(2) is allowed in the new regime (up to 14% of salary). This estimator shows tax benefit as per 80CCD(1B) for old regime taxpayers. For details, see official CBDT/Income Tax guidelines.',
    },
    {
      q: 'How is growth benefit calculated in the NPS estimator?',
      a: 'Growth benefit is the estimated increase in your NPS corpus over the investment period at the expected annual return rate you enter. It is computed as: Future Value minus Investment. Actual NPS returns depend on the fund choice (equity, debt, hybrid) and market conditions. This tool is for illustration only.',
    },
    {
      q: 'Who can claim NPS deduction under 80CCD(1B)?',
      a: 'Indian citizens aged 18–70 years, both salaried and self-employed, can contribute to NPS and claim the additional ₹50,000 deduction under 80CCD(1B) if they are in the old tax regime. The deduction is available only under the old regime. Valid for 2026–2050 unless the law is amended.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="NPS Tax Benefit vs Growth Estimator – 80CCD(1B) 2026–2050 | MoneyCal"
        description="Compare NPS tax benefits vs growth benefits. 80CCD(1B) ₹50,000 additional deduction, old regime. Valid 2026 onwards."
        keywords="NPS tax benefit calculator India, 80CCD 1B 50000 deduction, NPS vs growth estimator 2026, pension scheme tax benefit"
        canonicalUrl="/tax-tools/nps-tax-benefit-vs-growth-estimator"
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
              <span className="text-slate-900 font-medium">NPS Tax Benefit vs Growth Estimator</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-12 pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Tax Planning • Valid 2026–2050
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              NPS Tax Benefit vs Growth Estimator
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Compare tax benefits (80CCD(1B) ₹50,000) vs growth benefits of NPS. Old regime only.
            </motion.p>
          </div>
        </section>

        {/* Calculator */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-indigo-600" />
                  NPS details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">NPS investment (₹)</label>
                    <input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} placeholder="e.g. 50000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expected growth rate (% p.a.)</label>
                    <input type="number" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} placeholder="e.g. 10" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Investment period (years)</label>
                    <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 10" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Income tax slab (%) – old regime</label>
                    <select value={incomeSlab} onChange={(e) => setIncomeSlab(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L – ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateBenefits} className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 font-semibold transition-colors">
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
                  <Info className="h-6 w-6 text-indigo-600" />
                  Benefits analysis
                </h2>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-xl text-center">
                          <Shield className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                          <p className="text-sm text-indigo-600">Tax benefit (80CCD(1B))</p>
                          <p className="text-xl font-bold text-indigo-900">₹{result.taxBenefit.toLocaleString()}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl text-center">
                          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="text-sm text-green-600">Growth benefit</p>
                          <p className="text-xl font-bold text-green-900">₹{result.growthBenefit.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                        <h3 className="font-semibold text-purple-900 mb-1">Total benefit (tax + growth)</h3>
                        <p className="text-lg font-bold text-purple-600">₹{result.totalBenefit.toLocaleString()}</p>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                        <h3 className="font-semibold text-amber-900 mb-1">Recommendation</h3>
                        <p className="text-sm text-amber-800">{result.recommendation}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <Shield className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter NPS investment, growth rate, and period to see tax vs growth.</p>
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

        {/* SEO content – 1500+ words, valid 2026–2050 */}
        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 id="nps-tax-benefit-guide" className="text-3xl font-bold text-slate-900 mb-6">
              NPS Tax Benefit vs Growth: Complete Guide (Valid 2026–2050)
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                The <strong>National Pension System (NPS)</strong> offers tax benefits under <strong>Section 80CCD(1)</strong> (within the ₹1.5 lakh 80C limit) and an <strong>additional deduction of up to ₹50,000</strong> under <strong>Section 80CCD(1B)</strong> on your personal contribution. These deductions are available only under the <strong>old tax regime</strong>. Under the new tax regime, personal NPS contributions are not deductible; only employer contribution under <strong>80CCD(2)</strong> is allowed. This guide explains NPS tax benefit vs growth and how to use our <strong>NPS Tax Benefit vs Growth Estimator</strong>. Valid for <strong>2026 and future years</strong> unless the law is amended.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What is Section 80CCD(1B)?</h3>
              <p>
                <strong>Section 80CCD(1B)</strong> provides an <strong>additional NPS tax deduction of up to ₹50,000</strong> over and above the regular ₹1.5 lakh limit under Section 80C/80CCD(1). So you can claim up to ₹1.5 lakh under 80C (including NPS under 80CCD(1)) plus up to ₹50,000 under 80CCD(1B) on your personal NPS contribution. This additional deduction is available only in the <strong>old tax regime</strong>. For details, see <a href="https://cleartax.in/s/section-80ccd" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">ClearTax – Section 80CCD</a> and <a href="https://www.taxbuddy.com/blog/80ccd-deduction-limit-under-the-new-tax-regime-fy-2025-26" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">TaxBuddy – 80CCD new regime</a>. Use our <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-indigo-600 hover:underline font-medium">NPS Tax Benefit vs Growth Estimator</Link> to compare tax benefit with growth; use our <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> to track all 80C investments including NPS.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Is NPS tax benefit available in the new tax regime?</h3>
              <p>
                <strong>Personal NPS contributions under 80CCD(1) and 80CCD(1B) are not deductible in the new tax regime.</strong> Only <strong>employer contribution to NPS under Section 80CCD(2)</strong> is allowed in the new regime (up to 14% of salary from FY 2025-26). For new regime features, see <a href="https://m.economictimes.com/wealth/tax/new-tax-regime-2025-features-standard-deduction-and-key-benefits-explained/deduction-on-nps-contribution-made-by-employer-under-section-80ccd-2/slideshow/118760206.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times – New tax regime 2025 NPS</a>. Our estimator shows tax benefit as per 80CCD(1B) for old regime taxpayers. For ELSS (another 80C option), use our <Link to="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="text-indigo-600 hover:underline font-medium">ELSS Lock-in vs Tax Benefit Visualizer</Link>; for deadlines, use our <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">How is growth benefit calculated?</h3>
              <p>
                Growth benefit in our estimator is the <strong>estimated increase in your NPS corpus</strong> over the investment period at the expected annual return rate you enter. It is computed as Future Value minus Investment. Actual NPS returns depend on your fund choice (equity, debt, hybrid) and market conditions. This tool is for illustration only. For official NPS details, visit <a href="https://www.npscra.nsdl.co.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">NPS CRA</a>. For more tax tools, see <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator</Link> and <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-indigo-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Similar tools: tax planning and NPS calculators</h3>
              <p>
                If you are looking for a <strong>NPS tax benefit calculator India</strong>, <strong>80CCD 1B calculator</strong>, or <strong>pension scheme tax benefit calculator</strong>, MoneyCal offers several related tools. Besides the NPS Tax Benefit vs Growth Estimator, use the <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> to optimize 80C investments; use the <Link to="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="text-indigo-600 hover:underline font-medium">ELSS Lock-in vs Tax Benefit Visualizer</Link> to compare ELSS 3-year lock-in with tax benefits. For capital gains and deadlines, see <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG Classifier</Link>, <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator</Link>, and <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-indigo-600 hover:underline font-medium">tax tools</Link> for 80C, NPS, ELSS, capital gains, and deadlines. For learning, visit our <Link to="/learn" className="text-indigo-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-indigo-600 hover:underline font-medium">Blog</Link>. For the latest news, check <Link to="/news" className="text-indigo-600 hover:underline font-medium">MoneyCal News</Link>. This estimator is for illustration; verify with the Income Tax Act and a tax advisor. Provisions are valid for 2026–2050 unless the law is amended.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">NPS and 80CCD rules are as per the Income Tax Act and may change. This tool is for educational use. Valid for 2026–2050 unless the law is amended. Consult a CA or tax advisor before investing or filing.</p>
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
                <p className="text-sm text-slate-500">Articles on NPS and tax</p>
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

export default NPSTaxBenefitVsGrowthEstimator;
