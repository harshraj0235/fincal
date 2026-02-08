import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Info,
  AlertCircle,
  DollarSign,
  Clock,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface ExitLoadResult {
  fundName: string;
  redemptionValue: number;
  exitLoadRate: number;
  exitLoadAmount: number;
  netAmount: number;
  description: string;
}

const MutualFundExitLoadChecker: React.FC = () => {
  const [fundName, setFundName] = useState('');
  const [redemptionValue, setRedemptionValue] = useState('');
  const [holdingPeriodDays, setHoldingPeriodDays] = useState('');
  const [exitLoadPercent, setExitLoadPercent] = useState('');
  const [exitLoadPeriodDays, setExitLoadPeriodDays] = useState('');
  const [result, setResult] = useState<ExitLoadResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateExitLoad = () => {
    if (!redemptionValue) {
      alert('Please enter redemption value');
      return;
    }

    const value = parseFloat(redemptionValue);
    const period = holdingPeriodDays ? parseInt(holdingPeriodDays) : 0;
    const loadPercent = exitLoadPercent ? parseFloat(exitLoadPercent) : 0;
    const loadPeriod = exitLoadPeriodDays ? parseInt(exitLoadPeriodDays) : 365;

    let exitLoadRate = 0;
    let description = '';

    if (loadPercent > 0 && loadPeriod > 0) {
      if (period < loadPeriod) {
        exitLoadRate = Math.min(loadPercent, 3);
        description = `Exit load ${exitLoadRate}% applies (redeemed before ${loadPeriod} days). SEBI caps exit load; check fund's SID for exact structure.`;
      } else {
        exitLoadRate = 0;
        description = `No exit load (held ${period} days ≥ ${loadPeriod} days).`;
      }
    } else {
    if (period <= 7) {
        exitLoadRate = 1;
        description = 'Illustrative: 1% within 7 days. Actual rate varies by fund; check offer document.';
    } else if (period <= 30) {
        exitLoadRate = 0.5;
        description = 'Illustrative: 0.5% for 8–30 days. Check fund SID for exact exit load structure.';
    } else if (period <= 365) {
        exitLoadRate = 0.25;
        description = 'Illustrative: 0.25% for 31–365 days. SEBI max exit load 2–3%; verify with fund house.';
    } else {
        exitLoadRate = 0;
        description = 'No exit load (held over 1 year). Many equity funds waive exit load after 1 year.';
      }
    }

    const exitLoadAmount = (value * exitLoadRate) / 100;
    const netAmount = value - exitLoadAmount;

    setResult({
      fundName: fundName || 'Your fund',
      redemptionValue: value,
      exitLoadRate,
      exitLoadAmount,
      netAmount,
      description,
    });
  };

  const resetForm = () => {
    setFundName('');
    setRedemptionValue('');
    setHoldingPeriodDays('');
    setExitLoadPercent('');
    setExitLoadPeriodDays('');
    setResult(null);
  };

  const relatedTools = [
    { name: 'Switch MF Tax Calculator', path: '/tax-tools/switch-mf-tax-calculator', desc: 'Tax on MF switch' },
    { name: 'Debt Fund Tax Calculator', path: '/tax-tools/debt-fund-tax-calculator', desc: 'Debt fund tax' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Capital gains type' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Equity tax by AY' },
    { name: 'Intra-Year Redemption Tracker', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan LTCG' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sales' },
    { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains' },
  ];

  const faqs = [
    {
      q: 'What is exit load in mutual funds?',
      a: 'Exit load is a charge deducted by the fund house when you redeem (sell) mutual fund units before a specified period. It is expressed as a percentage of the redemption value and is meant to discourage short-term redemptions. SEBI has capped the maximum exit load; check the fund’s Scheme Information Document (SID) for the exact structure.',
    },
    {
      q: 'What is the maximum exit load allowed by SEBI in 2025–2026?',
      a: 'SEBI has reduced the maximum permissible exit load on mutual funds. The cap is now lower than the earlier 5%; refer to SEBI (Mutual Funds) Regulations and the fund’s offer document for the current cap. Exit load structure varies by fund and holding period.',
    },
    {
      q: 'Is exit load the same for all mutual funds?',
      a: 'No. Exit load varies by fund, scheme, and holding period. Equity funds often charge exit load if you redeem within one year; debt and liquid funds may have different or no exit load. Always check the Scheme Information Document (SID) or Key Information Document (KID) of the fund.',
    },
    {
      q: 'How do I avoid exit load on mutual fund redemption?',
      a: 'Hold the units for at least the period specified in the fund’s exit load structure (often 1 year for equity funds). After that period, exit load is usually zero. Use our calculator to see the impact of redeeming before or after the threshold.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Mutual Fund Exit Load Checker – Redemption Charges Calculator 2025-26 | MoneyCal"
        description="Check exit load charges for mutual fund redemptions. SEBI 2026 rules, max exit load cap. Calculate redemption value after exit load for equity, debt, hybrid funds. Free exit load calculator India."
        keywords="mutual fund exit load calculator, exit load on redemption, MF redemption charges, SEBI exit load 2025 2026, how to check exit load mutual fund, redemption value after exit load, exit load checker India"
        canonicalUrl="/tax-tools/mutual-fund-exit-load-checker"
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
              <span className="text-slate-900 font-medium">Mutual Fund Exit Load Checker</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white pt-12 pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Mutual Funds • SEBI 2025–2026
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              Mutual Fund Exit Load Checker
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
              Check exit load charges for mutual fund redemptions. Calculate net amount after redemption charges. Valid for current SEBI framework.
            </motion.p>
          </div>
        </section>

        {/* Calculator Card */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-emerald-600" />
                  Redemption Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fund name (optional)</label>
                    <input type="text" value={fundName} onChange={(e) => setFundName(e.target.value)} placeholder="e.g. ABC Equity Fund" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Redemption value (₹)</label>
                    <input type="number" value={redemptionValue} onChange={(e) => setRedemptionValue(e.target.value)} placeholder="e.g. 100000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Holding period (days)</label>
                    <input type="number" value={holdingPeriodDays} onChange={(e) => setHoldingPeriodDays(e.target.value)} placeholder="e.g. 180" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Exit load % (optional)</label>
                      <input type="number" step="0.01" value={exitLoadPercent} onChange={(e) => setExitLoadPercent(e.target.value)} placeholder="e.g. 1" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Load period (days)</label>
                      <input type="number" value={exitLoadPeriodDays} onChange={(e) => setExitLoadPeriodDays(e.target.value)} placeholder="365" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">Leave exit load % blank to use illustrative rates. For exact charges, enter the fund’s exit load and period from its SID.</p>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateExitLoad} className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl hover:bg-emerald-700 font-semibold transition-colors">
                      Calculate exit load
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
                  Result
                </h2>
                <AnimatePresence mode="wait">
                {result ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <p className="text-sm text-slate-500 uppercase tracking-wider">Fund</p>
                        <p className="text-lg font-bold text-slate-900">{result.fundName}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                          <span className="text-slate-700">Redemption value</span>
                          <span className="font-bold text-emerald-700">₹{result.redemptionValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                          <span className="text-slate-700">Exit load ({result.exitLoadRate}%)</span>
                          <span className="font-bold text-amber-700">₹{result.exitLoadAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                          <span className="text-slate-700 font-semibold">Net amount</span>
                          <span className="font-bold text-emerald-700">₹{result.netAmount.toLocaleString()}</span>
                      </div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                        <p className="text-sm text-slate-600">{result.description}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <Calculator className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter redemption value and holding period to see exit load impact.</p>
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

        {/* SEO content – 1500+ words, internal + external links */}
        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 id="exit-load-guide" className="text-3xl font-bold text-slate-900 mb-6">
              Mutual Fund Exit Load: Complete Guide to Redemption Charges (2025–2026)
              </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                When you <strong>redeem mutual fund units</strong>, the fund house may deduct an <strong>exit load</strong>—a charge meant to discourage short-term redemptions and cover costs. Understanding how exit load works helps you plan redemptions and avoid unnecessary charges. This guide explains exit load in line with the <strong>SEBI mutual fund framework (2025–2026)</strong>, how to use our <strong>Mutual Fund Exit Load Checker</strong>, and where to find exact charges for your scheme.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What is exit load in mutual funds?</h3>
              <p>
                <strong>Exit load</strong> is a fee charged when you redeem (sell) units of a mutual fund before a specified holding period. It is usually expressed as a <strong>percentage of the redemption value</strong> and is deducted before the net amount is paid to you. For example, if the redemption value is ₹1,00,000 and the exit load is 1%, you receive ₹99,000. Exit load structures differ by scheme: equity funds often charge if you redeem within one year; debt and liquid funds may have different or no exit load. Always refer to the fund’s <strong>Scheme Information Document (SID)</strong> or <strong>Key Information Document (KID)</strong> for the exact structure. Use our <Link to="/tax-tools/mutual-fund-exit-load-checker" className="text-emerald-600 hover:underline font-medium">Mutual Fund Exit Load Checker</Link> to estimate the impact; for precise figures, use the exit load and period mentioned in your fund’s offer document.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">SEBI exit load rules (2025–2026)</h3>
              <p>
                The <strong>Securities and Exchange Board of India (SEBI)</strong> regulates mutual funds and has capped the maximum exit load that can be charged. The regulator has reduced the earlier cap to ease the financial burden on investors and encourage long-term investing. The exact cap may be updated from time to time; investors should refer to <a href="https://www.sebi.gov.in/legal/regulations/jan-2026/securities-and-exchange-board-of-india-mutual-funds-regulations-2026_99091.html" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">SEBI (Mutual Funds) Regulations</a> and the fund’s SID. Exit loads are designed to discourage short-term churning while giving flexibility to hold beyond the load period for zero exit load. For official investor education on exit load, see <a href="https://investor.sebi.gov.in/exit_load.html" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">SEBI Investor – Exit Load</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">How to check exit load for your fund</h3>
              <p>
                To know the <strong>exact exit load</strong> for a scheme: (1) Open the fund’s <strong>Scheme Information Document (SID)</strong> or <strong>Key Information Document (KID)</strong> on the AMC website or AMFI portal. (2) Look for the section on “Loads” or “Exit Load”. (3) Note the percentage and the period (e.g. 1% if redeemed within 365 days). (4) Use our <Link to="/tax-tools/mutual-fund-exit-load-checker" className="text-emerald-600 hover:underline font-medium">Exit Load Checker</Link> by entering your redemption value, holding period in days, and optionally the exit load % and load period from the SID to get the net amount after charges. If you are also switching or redeeming for re-investment, consider tax: use our <Link to="/tax-tools/switch-mf-tax-calculator" className="text-emerald-600 hover:underline font-medium">Switch MF Tax Calculator</Link> for exit load plus capital gains tax on equity-oriented funds, and our <Link to="/tax-tools/debt-fund-tax-calculator" className="text-emerald-600 hover:underline font-medium">Debt Fund Tax Calculator</Link> for debt fund gains.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Exit load vs tax on redemption</h3>
              <p>
                <strong>Exit load</strong> is a charge by the fund house; <strong>capital gains tax</strong> is levied by the tax laws. Both reduce what you take home. For <strong>equity-oriented mutual funds</strong>, short-term capital gains (STCG) apply if you redeem within 12 months (tax at 20% as per current rules), and long-term capital gains (LTCG) apply if held longer (12.5% with annual exemption). For <strong>debt funds</strong>, from April 2023 onwards, gains are typically taxed as per your income slab. When planning a redemption, factor in both exit load and tax. Our <Link to="/tax-tools/stcg-ltcg-classifier" className="text-emerald-600 hover:underline font-medium">STCG vs LTCG Classifier</Link> helps you see whether your gain is short-term or long-term; our <Link to="/tax-tools/equity-tax-estimator" className="text-emerald-600 hover:underline font-medium">Equity Tax Estimator</Link> gives assessment-year-wise tax. For multiple redemptions in a year, use the <Link to="/tax-tools/intra-year-redemption-tax-tracker" className="text-emerald-600 hover:underline font-medium">Intra-Year Redemption Tax Tracker</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Who should use the Exit Load Checker?</h3>
              <p>
                This tool is useful if you: plan to <strong>redeem mutual fund units</strong> and want to see the impact of exit load; are comparing <strong>redemption value before and after exit load</strong>; want to decide whether to hold a bit longer to avoid exit load; or need a quick estimate when the fund’s exit load structure is known. It is valid for equity, debt, hybrid, and other mutual fund categories; the actual exit load always depends on the scheme’s SID. For tax on the same redemption, use our debt and equity tax tools linked above. For more on mutual fund taxation, see <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Economic Times – Tax</a> and <a href="https://www.cleartax.in/s/mutual-funds" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">ClearTax – Mutual Funds</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-emerald-600 hover:underline font-medium">tax tools</Link> for capital gains, mutual funds, and income tax. For learning, visit our <Link to="/learn" className="text-emerald-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-emerald-600 hover:underline font-medium">Blog</Link> for articles on mutual funds and tax planning. For the latest news on markets and regulation, check <Link to="/news" className="text-emerald-600 hover:underline font-medium">MoneyCal News</Link>. This exit load checker is for illustration; always confirm charges with the fund’s SID and your advisor.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">Exit load and SEBI rules are subject to change. This tool is for educational use. Verify with the fund’s Scheme Information Document and SEBI/AMFI for current regulations.</p>
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
                <p className="font-semibold text-slate-900 group-hover:text-emerald-700">Tax & investment blog</p>
                <p className="text-sm text-slate-500">Articles on mutual funds, tax saving, and planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 ml-auto" />
            </Link>
            <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-4">
              <ExternalLink className="h-10 w-10 text-emerald-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-emerald-700">Latest news</p>
                <p className="text-sm text-slate-500">Markets, mutual funds, and regulation</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 ml-auto" />
            </Link>
            <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-4">
              <Calculator className="h-10 w-10 text-emerald-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-emerald-700">All tax tools</p>
                <p className="text-sm text-slate-500">Calculators and estimators for tax planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 ml-auto" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default MutualFundExitLoadChecker;
