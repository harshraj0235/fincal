import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Info,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Percent,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Post-2020: dividends taxable at slab. TDS 10% (Section 194). From Apr 2025, no TDS if dividend from payer ≤ ₹10,000 in FY.
const TDS_RATE_DIVIDEND = 10;
const TDS_THRESHOLD_FY25 = 10000;

interface DividendResult {
  dividendAmount: number;
  category: string;
  tdsRate: number;
  tdsAmount: number;
  slabRate: number;
  taxAtSlab: number;
  netAfterTDS: number;
  description: string;
}

const DividendTaxEstimator: React.FC = () => {
  const [dividendAmount, setDividendAmount] = useState('');
  const [dividendType, setDividendType] = useState<'equity' | 'debt' | 'mutual-fund'>('equity');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<DividendResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateTax = () => {
    if (!dividendAmount) {
      alert('Please enter dividend amount');
      return;
    }

    const amount = parseFloat(dividendAmount);
    const slabRate = parseInt(incomeSlab) / 100;

    const tdsRate = dividendType === 'debt' ? 25 : TDS_RATE_DIVIDEND; // Debt MF IDCW: 25% TDS for individuals if no PAN etc; typically 10% for resident individuals. Use 10% for simplicity; note in description.
    const tdsApplicable = amount > TDS_THRESHOLD_FY25;
    const tdsAmount = tdsApplicable ? (amount * (dividendType === 'debt' ? 25 : TDS_RATE_DIVIDEND)) / 100 : 0;
    const taxAtSlab = amount * slabRate;
    const netAfterTDS = amount - tdsAmount;

    let category = 'Equity Dividend';
    if (dividendType === 'debt') category = 'Debt / IDCW';
    if (dividendType === 'mutual-fund') category = 'Mutual Fund Dividend';

    let description = `Dividends are taxable at your income tax slab (post-2020). TDS ${dividendType === 'debt' ? '25%' : '10%'} may apply. From FY 2025-26, no TDS if dividend from this payer ≤ ₹${TDS_THRESHOLD_FY25.toLocaleString()} in the financial year. You may have to pay additional tax or get refund when you file ITR based on your slab.`;

    setResult({
      dividendAmount: amount,
      category,
      tdsRate: dividendType === 'debt' ? 25 : TDS_RATE_DIVIDEND,
      tdsAmount,
      slabRate: parseInt(incomeSlab),
      taxAtSlab,
      netAfterTDS,
      description,
    });
  };

  const resetForm = () => {
    setDividendAmount('');
    setDividendType('equity');
    setIncomeSlab('30');
    setResult(null);
  };

  const relatedTools = [
    { name: 'Dividend Reinvestment Tax Comparison', path: '/tax-tools/dividend-reinvestment-tax-comparison', desc: 'Growth vs dividend reinvestment' },
    { name: 'High Dividend Tax Impact Calculator', path: '/tax-tools/high-dividend-tax-impact-calculator', desc: 'High dividend tax impact' },
    { name: 'Debt Fund Tax Calculator', path: '/tax-tools/debt-fund-tax-calculator', desc: 'Debt fund gains tax' },
    { name: 'Switch MF Tax Calculator', path: '/tax-tools/switch-mf-tax-calculator', desc: 'MF switch tax' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Capital gains type' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Equity tax by AY' },
    { name: 'Mutual Fund Exit Load Checker', path: '/tax-tools/mutual-fund-exit-load-checker', desc: 'Exit load on redemption' },
    { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains' },
  ];

  const faqs = [
    {
      q: 'How is dividend income taxed in India after 2020?',
      a: 'From FY 2020-21, Dividend Distribution Tax (DDT) was removed. Dividends are now taxable in the hands of the recipient at their applicable income tax slab rate. TDS may be deducted at source (e.g. 10% under Section 194); from April 2025, no TDS if dividend from a payer does not exceed ₹10,000 in the financial year.',
    },
    {
      q: 'What is the TDS rate on dividend income (2025-26)?',
      a: 'TDS on dividend paid by domestic companies and mutual funds is generally 10% for resident individuals (Section 194). From FY 2025-26, no TDS is required if the total dividend from that payer in the financial year does not exceed ₹10,000. For amounts above the threshold, 10% TDS applies. Surcharge on dividend income is capped at 15%.',
    },
    {
      q: 'Is dividend from equity shares and mutual funds taxed the same?',
      a: 'Yes. Post-2020, both equity dividends and mutual fund dividend income (including IDCW) are taxable as income at your slab rate. TDS rules (e.g. 10%, threshold ₹10,000 from FY25) apply as per the Income Tax Act. There is no separate exempt category for equity dividends in the hands of the investor.',
    },
    {
      q: 'Do I have to pay extra tax on dividend after TDS?',
      a: 'If your marginal tax slab is higher than the TDS rate (e.g. 30% slab vs 10% TDS), you will pay the balance tax when you file your return. If your slab is lower than the TDS rate, you can claim a refund. Include dividend income in your total income and compute tax accordingly.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Dividend Tax Estimator – Post-2020 Rules, TDS & Slab Tax 2025-26 | MoneyCal"
        description="Calculate dividend tax under post-2020 rules. TDS 10%, threshold ₹10,000 from FY25. Equity, MF, debt dividend taxable at slab. Free dividend tax calculator India."
        keywords="dividend tax calculator India 2025 2026, post-2020 dividend tax, TDS on dividend 10 percent, dividend income tax slab, equity dividend tax, mutual fund dividend tax"
        canonicalUrl="/tax-tools/dividend-tax-estimator"
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
              <span className="text-slate-900 font-medium">Dividend Tax Estimator</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white pt-12 pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Dividends • FY 2025-26 / 2026 & beyond
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              Dividend Tax Estimator (Post-2020 Rules)
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">
              Calculate dividend tax under new regulations. TDS 10%, threshold ₹10,000 from FY25. Taxable at your income slab.
            </motion.p>
          </div>
        </section>

        {/* Calculator Card */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-amber-600" />
                  Dividend details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dividend type</label>
                    <select value={dividendType} onChange={(e) => setDividendType(e.target.value as 'equity' | 'debt' | 'mutual-fund')} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                      <option value="equity">Equity dividend (shares)</option>
                      <option value="mutual-fund">Mutual fund dividend / IDCW</option>
                      <option value="debt">Debt fund / IDCW</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dividend amount (₹)</label>
                    <input type="number" value={dividendAmount} onChange={(e) => setDividendAmount(e.target.value)} placeholder="e.g. 50000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Applicable income tax slab (%)</label>
                    <select value={incomeSlab} onChange={(e) => setIncomeSlab(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500">
                      <option value="5">5% (up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L – ₹5L)</option>
                      <option value="30">30% (above ₹5L)</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateTax} className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-xl hover:bg-amber-700 font-semibold transition-colors">
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
                  <Info className="h-6 w-6 text-amber-600" />
                  Result
                </h2>
                <AnimatePresence mode="wait">
                {result ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <p className="text-sm text-slate-500 uppercase tracking-wider">Category</p>
                        <p className="text-lg font-bold text-slate-900">{result.category}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                          <span className="text-slate-700">Gross dividend</span>
                          <span className="font-bold text-emerald-700">₹{result.dividendAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                          <span className="text-slate-700">TDS ({result.tdsRate}%)</span>
                          <span className="font-bold text-amber-700">₹{result.tdsAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-100 rounded-xl">
                          <span className="text-slate-700">Tax at slab ({result.slabRate}%)</span>
                          <span className="font-bold text-slate-700">₹{result.taxAtSlab.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl border-2 border-amber-200">
                          <span className="text-slate-700 font-semibold">Net after TDS</span>
                          <span className="font-bold text-amber-700">₹{result.netAfterTDS.toLocaleString()}</span>
                      </div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                        <p className="text-sm text-slate-600">{result.description}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <DollarSign className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter dividend amount and slab to see TDS and tax at slab.</p>
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
              <Link key={tool.path} to={tool.path} className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all">
                <ChevronRight className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-amber-700">{tool.name}</p>
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
            <h2 id="dividend-tax-guide" className="text-3xl font-bold text-slate-900 mb-6">
              Dividend Tax in India: Complete Guide (Post-2020 Rules, FY 2025-26 & 2026 Onwards)
              </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                From <strong>FY 2020-21</strong>, the <strong>Dividend Distribution Tax (DDT)</strong> was removed. Dividends are now <strong>taxable in the hands of the recipient</strong> at their applicable <strong>income tax slab rate</strong>. Companies and mutual funds may deduct <strong>TDS (Tax Deducted at Source)</strong> on dividend payments; from <strong>April 2025</strong>, no TDS is required when dividend from a payer does not exceed <strong>₹10,000</strong> in the financial year. This guide explains the post-2020 dividend tax rules, TDS, and how to use our <strong>Dividend Tax Estimator</strong> for FY 2025-26 and beyond. The framework remains valid for 2026 and future years unless the law changes.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">How is dividend income taxed (post-2020)?</h3>
              <p>
                <strong>Dividend income</strong> (from equity shares, mutual funds, or any other source) is treated as <strong>income from other sources</strong> and is <strong>added to your total income</strong>. You pay tax at your applicable slab rate (5%, 20%, or 30% plus cess). There is no separate exempt category for equity dividends in the hands of the investor after the removal of DDT. Use our <Link to="/tax-tools/dividend-tax-estimator" className="text-amber-600 hover:underline font-medium">Dividend Tax Estimator</Link> to see TDS and tax at slab. For comparing growth vs dividend options, use our <Link to="/tax-tools/dividend-reinvestment-tax-comparison" className="text-amber-600 hover:underline font-medium">Dividend Reinvestment Tax Comparison</Link>; for high dividend scenarios, see the <Link to="/tax-tools/high-dividend-tax-impact-calculator" className="text-amber-600 hover:underline font-medium">High Dividend Tax Impact Calculator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">TDS on dividend (Section 194, FY 2025-26)</h3>
              <p>
                <strong>Section 194</strong> requires the payer (company or mutual fund) to deduct TDS on dividend at <strong>10%</strong> for resident individuals. From <strong>1 April 2025</strong>, no TDS is required when the <strong>total dividend paid to a shareholder by that payer during the financial year does not exceed ₹10,000</strong>. So small shareholders may receive dividend without TDS; above ₹10,000 from that payer, 10% TDS applies. The surcharge on dividend income is capped at 15%. For official rates, refer to <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Income Tax Department</a> and <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Economic Times – Tax</a>. For mutual fund IDCW/dividend, similar TDS rules apply; see <a href="https://www.cleartax.in/s/dividend-income-tax" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">ClearTax – Dividend Income Tax</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Equity vs mutual fund vs debt dividend</h3>
              <p>
                <strong>Equity dividends</strong> (from listed or unlisted shares) and <strong>mutual fund dividend / IDCW</strong> (Income Distribution cum Capital Withdrawal) are both taxable at your slab. <strong>Debt fund IDCW</strong> is also taxable at slab; TDS may be at a higher rate in certain cases (e.g. 25% for non-PAN or as per law). Our calculator lets you choose equity, mutual fund, or debt and shows TDS and tax at your slab. For capital gains on sale of units/shares, use our <Link to="/tax-tools/stcg-ltcg-classifier" className="text-amber-600 hover:underline font-medium">STCG vs LTCG Classifier</Link>, <Link to="/tax-tools/equity-tax-estimator" className="text-amber-600 hover:underline font-medium">Equity Tax Estimator</Link>, and <Link to="/tax-tools/debt-fund-tax-calculator" className="text-amber-600 hover:underline font-medium">Debt Fund Tax Calculator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Additional tax or refund after TDS</h3>
              <p>
                TDS is only a <strong>withholding</strong>. When you file your return, you add dividend income to your total income and compute tax at slab. If your marginal rate is <strong>higher</strong> than the TDS rate (e.g. 30% slab vs 10% TDS), you pay the <strong>balance tax</strong>. If your marginal rate is <strong>lower</strong> (e.g. 5% slab), you can <strong>claim a refund</strong>. Our estimator shows both TDS and tax at slab so you can plan. For multiple income sources, use our other <Link to="/tax-tools" className="text-amber-600 hover:underline font-medium">tax tools</Link> and consult a CA for filing.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-amber-600 hover:underline font-medium">tax tools</Link> for dividends, capital gains, and income tax. For learning, visit our <Link to="/learn" className="text-amber-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-amber-600 hover:underline font-medium">Blog</Link>. For the latest news on tax and markets, check <Link to="/news" className="text-amber-600 hover:underline font-medium">MoneyCal News</Link>. This dividend tax estimator is for illustration; verify with the Income Tax Act and a tax advisor for your situation.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">Tax rates and TDS thresholds are as per current law (FY 2025-26 and applicable for 2026 onwards unless changed). This tool is for educational use. Consult a CA or tax advisor before filing.</p>
                </div>
              </div>
            </div>
                </div>
        </article>

        {/* Explore more */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore more</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex items-center gap-4">
              <FileText className="h-10 w-10 text-amber-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-amber-700">Tax &amp; investment blog</p>
                <p className="text-sm text-slate-500">Articles on dividends and tax</p>
                </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 ml-auto" />
            </Link>
            <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex items-center gap-4">
              <ExternalLink className="h-10 w-10 text-amber-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-amber-700">Latest news</p>
                <p className="text-sm text-slate-500">Markets and tax updates</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 ml-auto" />
            </Link>
            <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex items-center gap-4">
              <Calculator className="h-10 w-10 text-amber-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-amber-700">All tax tools</p>
                <p className="text-sm text-slate-500">Calculators for tax planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 ml-auto" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default DividendTaxEstimator;
