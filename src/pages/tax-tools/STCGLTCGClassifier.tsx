import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Calculator,
  TrendingUp,
  TrendingDown,
  Info,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Budget 2024/2025: STCG 20%, LTCG 12.5%, LTCG exemption ₹1,25,000 per year. Holding period for equity: 12 months.
const STCG_RATE = 20;
const LTCG_RATE = 12.5;
const LTCG_EXEMPTION_LIMIT = 125000;
const LTCG_HOLDING_DAYS = 365;

interface TaxResult {
  type: 'STCG' | 'LTCG';
  holdingPeriod: number;
  taxRate: number;
  taxAmount: number;
  netAmount: number;
  grossProfit: number;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const STCGLTCGClassifier: React.FC = () => {
  const [purchaseDate, setPurchaseDate] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [assetType, setAssetType] = useState<'equity' | 'equity-mf'>('equity');
  const [result, setResult] = useState<TaxResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateTax = () => {
    if (!purchaseDate || !saleDate || !purchasePrice || !salePrice) {
      alert('Please fill in all fields');
      return;
    }

    const purchase = new Date(purchaseDate);
    const sale = new Date(saleDate);
    const holdingPeriod = Math.floor((sale.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24));

    const purchaseAmount = parseFloat(purchasePrice);
    const saleAmount = parseFloat(salePrice);
    const grossProfit = saleAmount - purchaseAmount;

    if (grossProfit <= 0) {
      setResult({
        type: 'STCG',
        holdingPeriod,
        taxRate: 0,
        taxAmount: 0,
        netAmount: saleAmount,
        grossProfit,
        description: 'No tax on capital losses. Losses can be carried forward.',
        color: 'text-emerald-600',
        icon: <CheckCircle className="h-5 w-5" />,
      });
      return;
    }

    if (holdingPeriod <= LTCG_HOLDING_DAYS) {
      const taxAmount = (grossProfit * STCG_RATE) / 100;
      setResult({
        type: 'STCG',
        holdingPeriod,
        taxRate: STCG_RATE,
        taxAmount,
        netAmount: saleAmount - taxAmount,
        grossProfit,
        description: `Short Term Capital Gains – taxed at ${STCG_RATE}% (Budget 2024). No exemption.`,
        color: 'text-amber-700',
        icon: <TrendingUp className="h-5 w-5" />,
      });
    } else {
      const taxableLTCG = Math.max(0, grossProfit - LTCG_EXEMPTION_LIMIT);
      const taxAmount = (taxableLTCG * LTCG_RATE) / 100;
      setResult({
        type: 'LTCG',
        holdingPeriod,
        taxRate: LTCG_RATE,
        taxAmount,
        netAmount: saleAmount - taxAmount,
        grossProfit,
        description: `Long Term Capital Gains – ${LTCG_RATE}% on gains above ₹${LTCG_EXEMPTION_LIMIT.toLocaleString()} (FY exemption applied).`,
        color: 'text-blue-700',
        icon: <TrendingDown className="h-5 w-5" />,
      });
    }
  };

  const resetForm = () => {
    setPurchaseDate('');
    setSaleDate('');
    setPurchasePrice('');
    setSalePrice('');
    setResult(null);
  };

  const relatedTools = [
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Tax by assessment year' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial holding sales' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan LTCG gains' },
    { name: 'Intraday vs Delivery Tax', path: '/tax-tools/intraday-vs-delivery-tax-calculator', desc: 'Trading tax comparison' },
    { name: 'Gifted Shares Tax', path: '/tax-tools/gifted-shares-tax-estimator', desc: 'Tax on gifted shares' },
    { name: 'Bonus Shares Tax', path: '/tax-tools/bonus-shares-tax-impact-tool', desc: 'Bonus share tax impact' },
    { name: 'Intra-Year Redemption Tracker', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains with losses' },
  ];

  const faqs = [
    {
      q: 'What is the holding period for long-term capital gains on equity in India?',
      a: 'For listed equity shares and equity-oriented mutual funds, the holding period for long-term capital gains (LTCG) is more than 12 months (365 days). If you sell before 12 months, gains are classified as short-term (STCG). Budget 2024 did not change the holding period.',
    },
    {
      q: 'What are the current STCG and LTCG tax rates for equity (2024-25)?',
      a: `As per Budget 2024 (effective from 23 July 2024), STCG on listed equity is taxed at ${STCG_RATE}%, and LTCG at ${LTCG_RATE}%. An annual LTCG exemption of ₹${LTCG_EXEMPTION_LIMIT.toLocaleString()} applies. Budget 2025 left these rates unchanged.`,
    },
    {
      q: 'Is the ₹1.25 lakh LTCG exemption per financial year?',
      a: 'Yes. The LTCG exemption limit of ₹1,25,000 is per financial year. Gains up to this limit from the sale of listed equity or equity mutual funds (held for more than 12 months) are exempt from tax.',
    },
    {
      q: 'Do STCG and LTCG apply to both equity shares and equity mutual funds?',
      a: 'Yes. The same rules apply to listed equity shares and equity-oriented mutual funds: holding period more than 12 months for LTCG, and the same tax rates and exemption as per the current income tax rules.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="STCG vs LTCG Classifier – Capital Gains Tax Calculator India 2024-25 | MoneyCal"
        description="Free STCG LTCG classifier: determine short-term vs long-term capital gains on equity. Budget 2024 rates: STCG 20%, LTCG 12.5%, ₹1.25L exemption. Holding period calculator for shares & mutual funds."
        keywords="STCG LTCG calculator India, short term long term capital gains tax, equity holding period 12 months, capital gains tax 2024 2025, STCG 20 percent LTCG 12.5, LTCG exemption 1.25 lakh, capital gains classifier"
        canonicalUrl="/tax-tools/stcg-ltcg-classifier"
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
              <span className="text-slate-900 font-medium">STCG vs LTCG Classifier</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-12 pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Capital Gains Tax • Budget 2024/2025
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              STCG vs LTCG Classifier
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Determine your capital gains tax category based on holding period. Latest rates: STCG 20%, LTCG 12.5%, ₹1.25L exemption.
            </motion.p>
          </div>
        </section>

        {/* Calculator Card */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Input */}
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-indigo-600" />
                  Investment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Asset type</label>
                    <select
                      value={assetType}
                      onChange={(e) => setAssetType(e.target.value as 'equity' | 'equity-mf')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="equity">Listed equity shares</option>
                      <option value="equity-mf">Equity-oriented mutual fund</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Purchase date</label>
                      <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Sale date</label>
                      <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Purchase price (₹)</label>
                    <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="e.g. 50000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sale price (₹)</label>
                    <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="e.g. 75000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateTax} className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 font-semibold transition-colors">
                      Calculate tax
                    </button>
                    <button onClick={resetForm} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="p-6 lg:p-8 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Info className="h-6 w-6 text-indigo-600" />
                  Tax analysis
                </h2>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      <div className={`text-center p-5 rounded-xl ${result.type === 'STCG' ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
                        <div className={`flex items-center justify-center gap-2 mb-2 ${result.color}`}>
                          {result.icon}
                          <span className="text-lg font-bold">{result.type}</span>
                        </div>
                        <p className="text-sm text-slate-600">{result.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Holding period</p>
                          <p className="text-lg font-bold text-slate-900">{result.holdingPeriod} days</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Tax rate</p>
                          <p className="text-lg font-bold text-slate-900">{result.taxRate}%</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                          <span className="text-slate-700">Gross profit</span>
                          <span className="font-bold text-emerald-700">₹{result.grossProfit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                          <span className="text-slate-700">Tax amount</span>
                          <span className="font-bold text-red-600">₹{result.taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-xl">
                          <span className="text-slate-700">Net amount</span>
                          <span className="font-bold text-indigo-700">₹{result.netAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <Calculator className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter purchase & sale details to see STCG/LTCG classification and tax.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Related tools */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related tax tools</h2>
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

        {/* SEO content – 1500+ words, internal + external links */}
        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 id="stcg-ltcg-guide" className="text-3xl font-bold text-slate-900 mb-6">
              STCG vs LTCG in India: Complete Guide to Capital Gains Tax on Equity (2024-25)
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                If you invest in <strong>listed equity shares</strong> or <strong>equity-oriented mutual funds</strong> in India, your profits from sale are taxed as either <strong>short-term capital gains (STCG)</strong> or <strong>long-term capital gains (LTCG)</strong>. The classification depends on your <strong>holding period</strong> and directly affects the tax rate and exemptions you get. This guide explains the latest rules (post-Budget 2024 and Budget 2025), how to use our <strong>STCG vs LTCG classifier</strong>, and how to plan your investments for better tax efficiency.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What is the holding period for LTCG on equity?</h3>
              <p>
                For <strong>listed equity shares</strong> and <strong>equity-oriented mutual funds</strong>, the income tax law defines long-term holding as <strong>more than 12 months</strong> (i.e., more than 365 days from the date of purchase to the date of sale). If you sell within 12 months, the gain is treated as <strong>short-term capital gains (STCG)</strong>. Budget 2024 did not change this holding period; it remains 12 months for equity. You can use our <a href="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG classifier</a> to instantly check whether your gain is STCG or LTCG based on your purchase and sale dates.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Current STCG and LTCG tax rates (Budget 2024 / 2025)</h3>
              <p>
                In <strong>Budget 2024</strong>, the government revised capital gains tax rates for listed equity and equity mutual funds. From <strong>23 July 2024</strong>, the following rates apply (and were left unchanged in Budget 2025):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Short-term capital gains (STCG):</strong> Taxed at <strong>20%</strong> (flat). There is no exemption limit for STCG.</li>
                <li><strong>Long-term capital gains (LTCG):</strong> Taxed at <strong>12.5%</strong>. An annual exemption of <strong>₹1,25,000</strong> applies; only LTCG above this limit in a financial year is taxable.</li>
              </ul>
              <p>
                These rates apply to both the old and new tax regimes. For official details, you can refer to the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax Department</a> and news sources such as <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times – Tax</a> and <a href="https://www.business-standard.com/finance/personal-finance" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Business Standard – Personal Finance</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">How to use the STCG vs LTCG classifier</h3>
              <p>
                Our free <strong>capital gains classifier</strong> asks for your <strong>purchase date</strong>, <strong>sale date</strong>, <strong>purchase price</strong>, and <strong>sale price</strong>. It then calculates the holding period in days and classifies the gain as STCG or LTCG. For LTCG, it applies the ₹1,25,000 exemption and shows the tax at 12.5% on the balance. For STCG, it shows tax at 20% on the full gain. You can choose asset type as listed equity or equity-oriented mutual fund; the rules are the same for both. Use it alongside our <a href="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator by Assessment Year</a> for assessment-year-wise planning, or our <a href="/tax-tools/tax-on-partial-selloff-calculator" className="text-indigo-600 hover:underline font-medium">Tax on Partial Selloff Calculator</a> when you sell only part of your holdings.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">LTCG exemption limit: ₹1.25 lakh per year</h3>
              <p>
                The <strong>LTCG exemption</strong> of <strong>₹1,25,000</strong> is per <strong>financial year</strong>. So, if your total LTCG from equity and equity funds in a year is within ₹1,25,000, no tax is payable on that LTCG. If it exceeds ₹1,25,000, only the amount above ₹1,25,000 is taxed at 12.5%. To plan large exits, use our <a href="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-indigo-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</a> to see how to use the exemption across multiple sales. For multiple redemptions in the same year, the <a href="/tax-tools/intra-year-redemption-tax-tracker" className="text-indigo-600 hover:underline font-medium">Intra-Year Redemption Tax Tracker</a> helps you track cumulative STCG and LTCG and tax.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Intraday and delivery trading: STCG vs LTCG</h3>
              <p>
                <strong>Intraday trading</strong> (buy and sell on the same day) does not involve delivery of shares; such profits are treated as <strong>business income</strong> and taxed as per your slab, not as STCG. When you take <strong>delivery</strong> and hold shares, the same 12-month rule applies: less than or equal to 12 months is STCG (20%), more than 12 months is LTCG (12.5% with exemption). To compare tax impact of intraday vs delivery, use our <a href="/tax-tools/intraday-vs-delivery-tax-calculator" className="text-indigo-600 hover:underline font-medium">Intraday vs Delivery Tax Calculator</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Bonus shares and gifted shares</h3>
              <p>
                For <strong>bonus shares</strong>, the cost of acquisition is usually nil (or as per tax rules), and the holding period is counted from the date of allotment of bonus shares. Gains on their sale are STCG or LTCG based on this holding period. Use our <a href="/tax-tools/bonus-shares-tax-impact-tool" className="text-indigo-600 hover:underline font-medium">Bonus Shares Tax Impact Tool</a> to estimate tax. For <strong>gifted shares</strong>, the cost and holding period may be derived from the previous owner in certain cases; our <a href="/tax-tools/gifted-shares-tax-estimator" className="text-indigo-600 hover:underline font-medium">Gifted Shares Tax Estimator</a> helps you calculate tax on such gains.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Losses and tax harvesting</h3>
              <p>
                Capital losses (both STCG and LTCG) can be carried forward for up to 8 assessment years. STCG loss can be set off against future STCG and LTCG; LTCG loss can be set off only against future LTCG. To plan loss harvesting and offset gains, use our <a href="/tax-tools/tax-loss-harvesting-calculator" className="text-indigo-600 hover:underline font-medium">Tax Loss Harvesting Calculator</a> and <a href="/tax-tools/short-term-capital-loss-benefit-estimator" className="text-indigo-600 hover:underline font-medium">Short Term Capital Loss Benefit Estimator</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer a full set of <a href="/tax-tools" className="text-indigo-600 hover:underline font-medium">tax tools</a> for capital gains, income tax, and GST. For learning, visit our <a href="/learn" className="text-indigo-600 hover:underline font-medium">Learn</a> section and <a href="/blog" className="text-indigo-600 hover:underline font-medium">Blog</a> for articles on tax planning and investment. For the latest news on tax and markets, check <a href="/news" className="text-indigo-600 hover:underline font-medium">MoneyCal News</a>. This STCG vs LTCG classifier is for educational use; for personal advice, consult a qualified CA or tax advisor.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">Rates and rules are as per Budget 2024/2025 and are subject to change. This tool is for illustration only; always verify with the Income Tax Act and a tax professional before filing returns.</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Suggest Blog & News */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore more</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
              <FileText className="h-10 w-10 text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Tax & investment blog</p>
                <p className="text-sm text-slate-500">Articles on capital gains, tax saving, and planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
            </Link>
            <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
              <ExternalLink className="h-10 w-10 text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-indigo-700">Latest news</p>
                <p className="text-sm text-slate-500">Markets, tax updates, and business news</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
            </Link>
            <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4">
              <Calculator className="h-10 w-10 text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-indigo-700">All tax tools</p>
                <p className="text-sm text-slate-500">Calculators and estimators for tax planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 ml-auto" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default STCGLTCGClassifier;
