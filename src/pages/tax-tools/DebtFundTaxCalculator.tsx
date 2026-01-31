import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Info,
  TrendingUp,
  BarChart3,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// From April 1, 2023: debt fund gains = STCG at slab rate only. Pre-April 2023: LTCG >36 months = 20% with indexation.
const DEBT_LTCG_RATE_PRE_2023 = 20;

interface DebtFundResult {
  purchaseDate: string;
  gainAmount: number;
  incomeSlabRate: number;
  taxAtSlab: number;
  isPostApril2023: boolean;
  taxAmount: number;
  netGain: number;
  recommendation: string;
}

const DebtFundTaxCalculator: React.FC = () => {
  const [gainAmount, setGainAmount] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [result, setResult] = useState<DebtFundResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateTax = () => {
    if (!gainAmount) {
      alert('Please enter gain amount');
      return;
    }

    const gain = parseFloat(gainAmount);
    const slabRate = parseInt(incomeSlab) / 100;

    const purchase = purchaseDate ? new Date(purchaseDate) : new Date('2023-04-01');
    const isPostApril2023 = purchase.getTime() >= new Date('2023-04-01').getTime();

    let taxAmount: number;
    let recommendation: string;

    if (isPostApril2023) {
      taxAmount = gain * slabRate;
      recommendation = 'Debt fund purchased on or after 1 April 2023: gains are taxed as per your income tax slab. No indexation or separate LTCG rate.';
    } else {
      const sale = saleDate ? new Date(saleDate) : new Date();
      const monthsHeld = (sale.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
      if (monthsHeld > 36) {
        taxAmount = gain * (DEBT_LTCG_RATE_PRE_2023 / 100);
        recommendation = 'Debt fund purchased before 1 April 2023, held >36 months: LTCG at 20% (with indexation as per law). This calculator uses 20% on gain for illustration; indexation reduces taxable gain.';
      } else {
        taxAmount = gain * slabRate;
        recommendation = 'Debt fund purchased before 1 April 2023, held ≤36 months: STCG at your income tax slab rate.';
      }
    }

    setResult({
      purchaseDate: purchaseDate || '2023-04-01',
      gainAmount: gain,
      incomeSlabRate: parseInt(incomeSlab),
      taxAtSlab: gain * slabRate,
      isPostApril2023,
      taxAmount,
      netGain: gain - taxAmount,
      recommendation,
    });
  };

  const resetForm = () => {
    setGainAmount('');
    setIncomeSlab('30');
    setPurchaseDate('');
    setSaleDate('');
    setResult(null);
  };

  const relatedTools = [
    { name: 'Mutual Fund Exit Load Checker', path: '/tax-tools/mutual-fund-exit-load-checker', desc: 'Exit load on redemption' },
    { name: 'Switch MF Tax Calculator', path: '/tax-tools/switch-mf-tax-calculator', desc: 'Tax on MF switch' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Capital gains type' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Equity tax by AY' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan LTCG' },
    { name: 'Intra-Year Redemption Tracker', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sales' },
    { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains' },
  ];

  const faqs = [
    {
      q: 'How is debt mutual fund gain taxed from April 2023?',
      a: 'For debt mutual funds purchased on or after 1 April 2023, the entire gain (whether short-term or long-term by holding) is taxed as short-term capital gain and added to your income. Tax is at your applicable income tax slab rate. There is no separate LTCG rate or indexation benefit for these investments.',
    },
    {
      q: 'What was the debt fund tax before April 2023?',
      a: 'For debt funds purchased before 1 April 2023, if held for more than 36 months, gains were treated as LTCG and taxed at 20% with indexation benefit. If held for 36 months or less, gains were STCG and taxed at slab rate. This treatment continues for pre-April 2023 purchases.',
    },
    {
      q: 'Is there any exemption for debt fund gains?',
      a: 'For post-April 2023 debt fund investments, there is no special exemption; tax is at slab rate. Section 87A rebate (e.g. for income up to ₹7 lakh under new regime) can reduce your overall tax, including on such gains. For pre-April 2023 LTCG, indexation lowers the taxable gain.',
    },
    {
      q: 'Why compare normal vs STCG for debt funds?',
      a: 'From FY 2023-24 onwards, debt fund gains are effectively “normal” (slab) tax only. The calculator still lets you see tax at different slabs and clarifies that there is no separate favourable STCG/LTCG rate for new debt fund investments.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Debt Fund Tax Calculator – Debt Mutual Fund Taxation 2025-26 AY 2026-27 | MoneyCal"
        description="Calculate tax on debt mutual fund gains. Post-April 2023: slab rate. Pre-April 2023: LTCG 20% with indexation if held >36 months. Free debt fund tax calculator India."
        keywords="debt fund tax calculator, debt mutual fund taxation India 2025 2026, debt fund STCG slab rate, debt fund LTCG indexation before April 2023, how is debt fund gain taxed"
        canonicalUrl="/tax-tools/debt-fund-tax-calculator"
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
              <span className="text-slate-900 font-medium">Debt Fund Tax Calculator</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 text-white pt-12 pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Mutual Funds • FY 2025-26 / AY 2026-27
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              Debt Fund Tax Calculator
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-violet-100 max-w-2xl mx-auto">
              Compare tax on debt mutual fund gains. Post-April 2023: slab rate. Pre-April 2023: LTCG 20% with indexation if held &gt;36 months.
            </motion.p>
          </div>
        </section>

        {/* Calculator Card */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-violet-600" />
                  Gain &amp; Slab
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Capital gain from debt fund (₹)</label>
                    <input type="number" value={gainAmount} onChange={(e) => setGainAmount(e.target.value)} placeholder="e.g. 50000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Applicable income tax slab (%)</label>
                    <select value={incomeSlab} onChange={(e) => setIncomeSlab(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500">
                      <option value="5">5% (up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L – ₹5L)</option>
                      <option value="30">30% (above ₹5L)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First purchase date (optional)</label>
                    <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sale date (optional, for pre-2023)</label>
                    <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <p className="text-xs text-slate-500">If purchase date is on or after 1 Apr 2023, gain is taxed at slab. Before that, &gt;36 months holding may get 20% LTCG (with indexation).</p>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateTax} className="flex-1 bg-violet-600 text-white py-3 px-6 rounded-xl hover:bg-violet-700 font-semibold transition-colors">
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
                  <Info className="h-6 w-6 text-violet-600" />
                  Tax result
                </h2>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Gain</p>
                          <p className="text-lg font-bold text-slate-900">₹{result.gainAmount.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Tax ({result.incomeSlabRate}%)</p>
                          <p className="text-lg font-bold text-violet-700">₹{result.taxAmount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-violet-50 rounded-xl border border-violet-200">
                        <span className="text-slate-700 font-semibold">Net gain after tax</span>
                        <span className="font-bold text-violet-700">₹{result.netGain.toLocaleString()}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                        <p className="text-sm text-slate-600">{result.recommendation}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <BarChart3 className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter gain and slab to see tax on debt fund.</p>
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
              <Link key={tool.path} to={tool.path} className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all">
                <ChevronRight className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-violet-700">{tool.name}</p>
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

        {/* SEO content – 1500+ words */}
        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 id="debt-fund-tax-guide" className="text-3xl font-bold text-slate-900 mb-6">
              Debt Mutual Fund Taxation in India: Complete Guide (FY 2025-26, AY 2026-27)
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                <strong>Debt mutual funds</strong> invest in fixed-income instruments such as bonds, government securities, and money market instruments. The tax on gains from debt funds depends on <strong>when you purchased the units</strong>. From <strong>1 April 2023</strong>, the tax treatment of debt fund gains changed: there is no separate long-term capital gains (LTCG) rate or indexation for new investments. This guide explains the current rules and how to use our <strong>Debt Fund Tax Calculator</strong> for FY 2025-26 and AY 2026-27, and remains valid for future years unless the law changes.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Debt fund tax from April 2023 onwards</h3>
              <p>
                For <strong>debt mutual fund units purchased on or after 1 April 2023</strong>, the entire gain on redemption (whether you held for a short or long period) is treated as <strong>short-term capital gain (STCG)</strong> and is <strong>taxed at your applicable income tax slab rate</strong>. There is no indexation benefit and no separate 20% LTCG rate. So if you are in the 30% slab, your debt fund gain is taxed at 30%. This applies to all debt funds, including liquid funds, short-duration, and long-duration debt schemes. Use our <Link to="/tax-tools/debt-fund-tax-calculator" className="text-violet-600 hover:underline font-medium">Debt Fund Tax Calculator</Link> by entering your gain and slab to see the tax and net gain. For redemption charges, use the <Link to="/tax-tools/mutual-fund-exit-load-checker" className="text-violet-600 hover:underline font-medium">Mutual Fund Exit Load Checker</Link>; for switching between funds, see <Link to="/tax-tools/switch-mf-tax-calculator" className="text-violet-600 hover:underline font-medium">Switch MF Tax Calculator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Debt fund tax for investments before April 2023</h3>
              <p>
                For <strong>debt fund units purchased before 1 April 2023</strong>, the old rules continue to apply. If you held the units for <strong>more than 36 months</strong>, the gain is <strong>long-term capital gains (LTCG)</strong> and is taxed at <strong>20% with indexation benefit</strong>. Indexation adjusts the cost of acquisition for inflation, which reduces the taxable gain. If you held for 36 months or less, the gain is STCG and taxed at your slab rate. Our calculator allows you to enter the first purchase date and sale date to illustrate pre-2023 LTCG at 20%; for exact indexation figures, refer to the cost inflation index (CII) and a tax advisor. For equity-oriented funds, the rules are different: see our <Link to="/tax-tools/stcg-ltcg-classifier" className="text-violet-600 hover:underline font-medium">STCG vs LTCG Classifier</Link> and <Link to="/tax-tools/equity-tax-estimator" className="text-violet-600 hover:underline font-medium">Equity Tax Estimator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why did debt fund tax change in 2023?</h3>
              <p>
                The <strong>Union Budget 2023</strong> removed the favourable LTCG treatment (20% with indexation) for debt mutual funds for investments made on or after 1 April 2023. The objective was to align the tax treatment of debt fund gains with other fixed-income products and to simplify the regime. As a result, debt fund gains are now taxed like interest income—at the investor’s slab rate. Investors in lower slabs (e.g. 5% or 20%) pay less tax; those in the 30% slab pay 30% on the gain. Section 87A and other rebates can still reduce your overall tax liability. For official details, refer to the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Income Tax Department</a> and <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Economic Times – Tax</a>. For mutual fund taxation overview, see <a href="https://www.cleartax.in/s/tax-on-debt-funds" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">ClearTax – Tax on Debt Funds</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Comparing normal (slab) tax for debt funds</h3>
              <p>
                Since post-April 2023 debt fund gains are taxed only at the slab rate, there is no “normal vs STCG” choice for new investments—both are the same. Our calculator still shows “tax at slab” so you can see how much tax you pay at different slab rates (5%, 20%, 30%) and plan accordingly. If you have other capital gains (e.g. from equity), use our <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-violet-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</Link> and <Link to="/tax-tools/intra-year-redemption-tax-tracker" className="text-violet-600 hover:underline font-medium">Intra-Year Redemption Tax Tracker</Link> to see the combined picture. For loss harvesting, see <Link to="/tax-tools/tax-loss-harvesting-calculator" className="text-violet-600 hover:underline font-medium">Tax Loss Harvesting Calculator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer a full set of <Link to="/tax-tools" className="text-violet-600 hover:underline font-medium">tax tools</Link> for mutual funds, capital gains, and income tax. For learning, visit our <Link to="/learn" className="text-violet-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-violet-600 hover:underline font-medium">Blog</Link>. For the latest news on tax and markets, check <Link to="/news" className="text-violet-600 hover:underline font-medium">MoneyCal News</Link>. This debt fund tax calculator is for illustration; verify with the Income Tax Act and a tax professional for your specific case.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">Tax rates and rules are as per current law and may change. Pre-2023 LTCG illustration uses 20% on full gain; actual tax uses indexation. Consult a CA or tax advisor before filing.</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Explore more */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore more</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all flex items-center gap-4">
              <FileText className="h-10 w-10 text-violet-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-violet-700">Tax &amp; investment blog</p>
                <p className="text-sm text-slate-500">Articles on mutual funds and tax</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 ml-auto" />
            </Link>
            <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all flex items-center gap-4">
              <ExternalLink className="h-10 w-10 text-violet-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-violet-700">Latest news</p>
                <p className="text-sm text-slate-500">Markets and tax updates</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 ml-auto" />
            </Link>
            <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all flex items-center gap-4">
              <Calculator className="h-10 w-10 text-violet-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-violet-700">All tax tools</p>
                <p className="text-sm text-slate-500">Calculators for tax planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 ml-auto" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default DebtFundTaxCalculator;
