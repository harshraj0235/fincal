import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator,
  Calendar,
  TrendingUp,
  Info,
  AlertCircle,
  ChevronRight,
  FileText,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Budget 2024: From AY 2024-25 – STCG 20%, LTCG 12.5%, LTCG exemption ₹1,25,000. Earlier AYs: 15%/10%, ₹1L.
const RATES: Record<string, { stcg: number; ltcg: number; exemption: number }> = {
  '2025-26': { stcg: 20, ltcg: 12.5, exemption: 125000 },
  '2024-25': { stcg: 20, ltcg: 12.5, exemption: 125000 },
  '2023-24': { stcg: 15, ltcg: 10, exemption: 100000 },
  '2022-23': { stcg: 15, ltcg: 10, exemption: 100000 },
  '2021-22': { stcg: 15, ltcg: 10, exemption: 100000 },
};

interface TaxBreakdown {
  stcg: number;
  ltcg: number;
  stcgTax: number;
  ltcgTax: number;
  totalTax: number;
  netAmount: number;
  taxRate: { stcg: number; ltcg: number };
  exemption: number;
}

const EquityTaxEstimator: React.FC = () => {
  const [assessmentYear, setAssessmentYear] = useState('2024-25');
  const [stcgAmount, setStcgAmount] = useState('');
  const [ltcgAmount, setLtcgAmount] = useState('');
  const [result, setResult] = useState<TaxBreakdown | null>(null);

  const assessmentYears = ['2025-26', '2024-25', '2023-24', '2022-23', '2021-22'];

  const calculateTax = () => {
    if (!stcgAmount && !ltcgAmount) {
      alert('Please enter at least one capital gains amount');
      return;
    }

    const stcg = parseFloat(stcgAmount) || 0;
    const ltcg = parseFloat(ltcgAmount) || 0;
    const rates = RATES[assessmentYear] || RATES['2024-25'];

    const stcgTax = (stcg * rates.stcg) / 100;
    const taxableLtcg = Math.max(0, ltcg - rates.exemption);
    const ltcgTax = (taxableLtcg * rates.ltcg) / 100;
    const totalTax = stcgTax + ltcgTax;
    const totalGains = stcg + ltcg;
    const netAmount = totalGains - totalTax;

    setResult({
      stcg,
      ltcg,
      stcgTax,
      ltcgTax,
      totalTax,
      netAmount,
      taxRate: { stcg: rates.stcg, ltcg: rates.ltcg },
      exemption: rates.exemption,
    });
  };

  const resetForm = () => {
    setStcgAmount('');
    setLtcgAmount('');
    setResult(null);
  };

  const relatedTools = [
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Holding period & category' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial holding sales' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan LTCG gains' },
    { name: 'Intraday vs Delivery Tax', path: '/tax-tools/intraday-vs-delivery-tax-calculator', desc: 'Trading tax comparison' },
    { name: 'Intra-Year Redemption Tracker', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
  ];

  return (
    <>
      <SEOHelmet
        title="Equity Tax Estimator by Assessment Year – STCG LTCG Tax Calculator India 2024-25 | MoneyCal"
        description="Free equity tax estimator: calculate STCG and LTCG tax by assessment year. Budget 2024 rates: STCG 20%, LTCG 12.5%, ₹1.25L exemption. Plan tax for AY 2024-25 and 2025-26."
        keywords="equity tax estimator India, assessment year tax calculator, STCG LTCG tax 2024 2025, capital gains tax by year, equity tax planning, LTCG exemption 1.25 lakh"
        canonicalUrl="/tax-tools/equity-tax-estimator"
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
              <span className="text-slate-900 font-medium">Equity Tax Estimator</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white pt-12 pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> By assessment year • Budget 2024/2025
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              Equity Tax Estimator by Assessment Year
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
              Calculate equity tax liability by assessment year. STCG & LTCG with latest rates and exemption.
            </motion.p>
          </div>
        </section>

        {/* Calculator */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-emerald-600" />
                  Tax details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assessment year</label>
                    <select value={assessmentYear} onChange={(e) => setAssessmentYear(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                      {assessmentYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500 mt-1">AY 2024-25 & 2025-26: STCG 20%, LTCG 12.5%, ₹1.25L exemption</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short-term capital gains (₹)</label>
                    <input type="number" value={stcgAmount} onChange={(e) => setStcgAmount(e.target.value)} placeholder="e.g. 50000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Long-term capital gains (₹)</label>
                    <input type="number" value={ltcgAmount} onChange={(e) => setLtcgAmount(e.target.value)} placeholder="e.g. 200000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateTax} className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl hover:bg-emerald-700 font-semibold transition-colors">
                      Calculate tax
                    </button>
                    <button onClick={resetForm} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 lg:p-8 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Info className="h-6 w-6 text-emerald-600" />
                  Tax breakdown
                </h2>
                {result ? (
                  <div className="space-y-6">
                    <div className="bg-emerald-50 p-4 rounded-xl text-center border border-emerald-200">
                      <p className="text-sm text-emerald-600">Assessment year</p>
                      <p className="text-xl font-bold text-emerald-900">{assessmentYear}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                        <p className="text-xs text-amber-700">STCG</p>
                        <p className="text-lg font-bold text-amber-900">₹{result.stcg.toLocaleString()}</p>
                        <p className="text-xs text-amber-600">Tax @ {result.taxRate.stcg}%: ₹{result.stcgTax.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <p className="text-xs text-blue-700">LTCG</p>
                        <p className="text-lg font-bold text-blue-900">₹{result.ltcg.toLocaleString()}</p>
                        <p className="text-xs text-blue-600">Exemption ₹{result.exemption.toLocaleString()}, Tax @ {result.taxRate.ltcg}%: ₹{result.ltcgTax.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-100 rounded-xl border border-slate-200">
                        <span className="text-slate-700 font-medium">Total tax</span>
                        <span className="font-bold text-slate-900">₹{result.totalTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                        <span className="text-slate-700 font-medium">Net amount after tax</span>
                        <span className="font-bold text-emerald-700">₹{result.netAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Enter STCG and/or LTCG to see tax by assessment year.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Related tools */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related tax tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <Link key={tool.path} to={tool.path} className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all">
                <ChevronRight className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-emerald-700">{tool.name}</p>
                  <p className="text-sm text-slate-500">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO content */}
        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 id="equity-tax-by-ay" className="text-3xl font-bold text-slate-900 mb-6">
              Equity Tax by Assessment Year: STCG & LTCG Calculator India (2024-25)
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                Planning your <strong>equity tax liability by assessment year</strong> helps you estimate how much <strong>short-term capital gains (STCG)</strong> and <strong>long-term capital gains (LTCG)</strong> tax you will pay. Our <strong>equity tax estimator</strong> uses the correct rates for each assessment year: from <strong>AY 2024-25</strong> and <strong>AY 2025-26</strong>, Budget 2024 applies – <strong>STCG at 20%</strong>, <strong>LTCG at 12.5%</strong>, and an <strong>LTCG exemption of ₹1,25,000</strong> per financial year. For earlier years (e.g. 2023-24), the previous rates (15% STCG, 10% LTCG, ₹1 lakh exemption) are used.
              </p>
              <p>
                Use this tool when you have already classified your gains (e.g. using our <a href="/tax-tools/stcg-ltcg-classifier" className="text-emerald-600 hover:underline font-medium">STCG vs LTCG Classifier</a>) and want to see the tax for a specific <strong>assessment year</strong>. For partial sales, use the <a href="/tax-tools/tax-on-partial-selloff-calculator" className="text-emerald-600 hover:underline font-medium">Tax on Partial Selloff Calculator</a>. To plan LTCG and use the annual exemption efficiently, try the <a href="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-emerald-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</a>. For official rates and updates, refer to the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Income Tax Department</a> and <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Economic Times – Tax</a>.
              </p>
              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">This calculator is for illustration only. Verify with the Income Tax Act and a tax professional before filing.</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Explore more */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore more</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-4">
              <FileText className="h-10 w-10 text-emerald-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-emerald-700">Tax blog</p>
                <p className="text-sm text-slate-500">Capital gains & tax planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
            </Link>
            <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-4">
              <ExternalLink className="h-10 w-10 text-emerald-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-emerald-700">News</p>
                <p className="text-sm text-slate-500">Markets & tax updates</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
            </Link>
            <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-4">
              <Calculator className="h-10 w-10 text-emerald-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-emerald-700">All tax tools</p>
                <p className="text-sm text-slate-500">Calculators & estimators</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default EquityTaxEstimator;
