import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
  Calculator,
  TrendingUp,
  Info,
  AlertCircle,
  CheckCircle,
  BarChart3,
  DollarSign,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

// Equity MF: STCG 20%, LTCG 12.5%, exemption ₹1,25,000. STT 0.001% on redemption.
const STCG_RATE_EQUITY = 20;
const LTCG_RATE_EQUITY = 12.5;
const LTCG_EXEMPTION = 125000;
const STT_RATE = 0.00001; // 0.001%

interface SwitchMFCalculation {
  currentValue: number;
  originalInvestment: number;
  exitLoad: number;
  stt: number;
  capitalGain: number;
  holdingPeriod: number;
  taxRate: number;
  taxAmount: number;
  totalCharges: number;
  netAmount: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const SwitchMFTaxCalculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<string>('');
  const [originalInvestment, setOriginalInvestment] = useState<string>('');
  const [exitLoadPercentage, setExitLoadPercentage] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [switchDate, setSwitchDate] = useState<string>('');
  const [fundType, setFundType] = useState<'equity' | 'debt'>('equity');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [calculation, setCalculation] = useState<SwitchMFCalculation | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateSwitchTax = () => {
    if (!currentValue || !originalInvestment || !purchaseDate || !switchDate) {
      alert('Please fill in current value, original investment, purchase date and switch date');
      return;
    }

    const current = parseFloat(currentValue);
    const original = parseFloat(originalInvestment);
    const exitLoadPct = exitLoadPercentage ? parseFloat(exitLoadPercentage) : 0;
    
    const purchase = new Date(purchaseDate);
    const switchDateObj = new Date(switchDate);
    const holdingPeriod = Math.floor((switchDateObj.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24));
    
    const capitalGain = current - original;
    const exitLoadAmount = (current * exitLoadPct) / 100;
    const stt = fundType === 'equity' ? current * STT_RATE : 0;
    const totalCharges = exitLoadAmount + stt;
    
    let taxRate: number;
    let taxAmount: number;
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (capitalGain <= 0) {
      taxRate = 0;
      taxAmount = 0;
      recommendation = 'No capital gains tax – loss or no gain';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (fundType === 'debt') {
      const slabRate = parseInt(incomeSlab) / 100;
      taxRate = parseInt(incomeSlab);
      taxAmount = capitalGain * slabRate;
      recommendation = 'Debt fund: gains taxed at your income tax slab (post-April 2023).';
      color = 'text-violet-600';
      icon = <Info className="h-5 w-5" />;
    } else {
      if (holdingPeriod <= 365) {
        taxRate = STCG_RATE_EQUITY;
        taxAmount = (capitalGain * STCG_RATE_EQUITY) / 100;
        recommendation = `Equity-oriented MF: STCG at ${STCG_RATE_EQUITY}% (held ≤12 months).`;
        color = 'text-amber-600';
        icon = <AlertCircle className="h-5 w-5" />;
      } else {
        taxRate = LTCG_RATE_EQUITY;
        const taxableLTCG = Math.max(0, capitalGain - LTCG_EXEMPTION);
        taxAmount = (taxableLTCG * LTCG_RATE_EQUITY) / 100;
        recommendation = `Equity-oriented MF: LTCG at ${LTCG_RATE_EQUITY}% on gains above ₹${LTCG_EXEMPTION.toLocaleString()} (held >12 months).`;
      color = 'text-blue-600';
      icon = <Info className="h-5 w-5" />;
      }
    }
    
    const netAmount = current - totalCharges - taxAmount;

    setCalculation({
      currentValue: current,
      originalInvestment: original,
      exitLoad: exitLoadAmount,
      stt,
      capitalGain,
      holdingPeriod,
      taxRate,
      taxAmount,
      totalCharges,
      netAmount,
      recommendation,
      color,
      icon,
    });
  };

  const resetForm = () => {
    setCurrentValue('');
    setOriginalInvestment('');
    setExitLoadPercentage('');
    setPurchaseDate('');
    setSwitchDate('');
    setCalculation(null);
  };

  const relatedTools = [
    { name: 'Mutual Fund Exit Load Checker', path: '/tax-tools/mutual-fund-exit-load-checker', desc: 'Exit load on redemption' },
    { name: 'Debt Fund Tax Calculator', path: '/tax-tools/debt-fund-tax-calculator', desc: 'Debt fund tax' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Capital gains type' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Equity tax by AY' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'Plan LTCG' },
    { name: 'Intra-Year Redemption Tracker', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
    { name: 'Tax on Partial Selloff', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sales' },
    { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Offset gains' },
  ];

  const faqs = [
    {
      q: 'Is switching mutual funds taxable?',
      a: 'Yes. A switch is treated as a redemption of units in the existing fund and is a taxable event. Capital gains (or loss) are computed on the switch. Exit load (if any) and STT (for equity-oriented funds) also apply. Use this calculator to see total charges and tax.',
    },
    {
      q: 'What are the tax rates for equity mutual fund switch (2025-26)?',
      a: 'For equity-oriented mutual funds, if held for 12 months or less, gains are STCG and taxed at 20%. If held for more than 12 months, gains are LTCG with an annual exemption of ₹1,25,000; tax is 12.5% on the amount above the exemption. STT of 0.001% applies on redemption of equity-oriented units.',
    },
    {
      q: 'What are the tax rates for debt fund switch (2025-26)?',
      a: 'For debt mutual funds (investments from April 2023 onwards), gains on redemption or switch are taxed as short-term capital gains at your applicable income tax slab rate. There is no separate LTCG rate or indexation for these investments.',
    },
    {
      q: 'Should I switch or redeem and reinvest?',
      a: 'Tax is the same whether you switch (within the same fund house) or redeem and reinvest elsewhere—both are redemptions for tax purposes. Consider exit load, STT (equity), and capital gains tax. Use our Exit Load Checker and this calculator to compare.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Switch MF Tax Calculator – Mutual Fund Switch Tax 2025-26 | MoneyCal"
        description="Calculate tax on mutual fund switching. Exit load, STT, STCG 20%, LTCG 12.5% with ₹1.25L exemption. Equity and debt fund switch tax calculator India."
        keywords="switch MF tax calculator, mutual fund switch tax India 2025 2026, MF redemption tax, exit load STT capital gains, equity debt fund switch tax"
        canonicalUrl="/tax-tools/switch-mf-tax-calculator"
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
              <span className="text-slate-900 font-medium">Switch MF Tax Calculator</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white pt-12 pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Mutual Funds • FY 2025-26 / AY 2026-27
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">
              Switch MF Tax Calculator
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-sky-100 max-w-2xl mx-auto">
              Calculate tax when switching mutual funds. Exit load, STT, and capital gains tax for equity and debt funds.
            </motion.p>
          </div>
        </section>

        {/* Calculator Card */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-sky-600" />
                  Fund &amp; switch details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fund type</label>
                    <select value={fundType} onChange={(e) => setFundType(e.target.value as 'equity' | 'debt')} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500">
                      <option value="equity">Equity-oriented MF (≥65% equity)</option>
                      <option value="debt">Debt MF</option>
                    </select>
                  </div>
                  {fundType === 'debt' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Income tax slab (%)</label>
                      <select value={incomeSlab} onChange={(e) => setIncomeSlab(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500">
                        <option value="5">5%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current value (₹)</label>
                    <input type="number" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} placeholder="e.g. 120000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Original investment (₹)</label>
                    <input type="number" value={originalInvestment} onChange={(e) => setOriginalInvestment(e.target.value)} placeholder="e.g. 100000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Exit load (%) – optional</label>
                    <input type="number" step="0.01" value={exitLoadPercentage} onChange={(e) => setExitLoadPercentage(e.target.value)} placeholder="e.g. 1" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Purchase date</label>
                      <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500" />
                    </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Switch date</label>
                      <input type="date" value={switchDate} onChange={(e) => setSwitchDate(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateSwitchTax} className="flex-1 bg-sky-600 text-white py-3 px-6 rounded-xl hover:bg-sky-700 font-semibold transition-colors">
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
                  <BarChart3 className="h-6 w-6 text-sky-600" />
                  Tax analysis
                </h2>
                <AnimatePresence mode="wait">
                {calculation ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className={`text-center p-4 rounded-xl border ${calculation.color.includes('green') ? 'bg-green-50 border-green-200' : calculation.color.includes('amber') ? 'bg-amber-50 border-amber-200' : 'bg-sky-50 border-sky-200'}`}>
                        <div className={`flex items-center justify-center gap-2 mb-2 ${calculation.color}`}>
                        {calculation.icon}
                          <span className="font-bold">Tax status</span>
                        </div>
                        <p className="text-sm text-slate-600">{calculation.recommendation}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between p-3 bg-slate-100 rounded-xl">
                          <span className="text-slate-700">Capital gain</span>
                          <span className={`font-bold ${calculation.capitalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{calculation.capitalGain.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-amber-50 rounded-xl">
                          <span className="text-slate-700">Exit load</span>
                          <span className="font-bold text-amber-700">₹{calculation.exitLoad.toLocaleString()}</span>
                        </div>
                        {calculation.stt > 0 && (
                          <div className="flex justify-between p-3 bg-slate-100 rounded-xl">
                            <span className="text-slate-700">STT (0.001%)</span>
                            <span className="font-bold text-slate-700">₹{calculation.stt.toLocaleString()}</span>
                        </div>
                        )}
                        <div className="flex justify-between p-3 bg-red-50 rounded-xl">
                          <span className="text-slate-700">Tax ({calculation.taxRate}%)</span>
                          <span className="font-bold text-red-600">₹{calculation.taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-sky-50 rounded-xl border-2 border-sky-200">
                          <span className="text-slate-700 font-semibold">Net amount</span>
                          <span className="font-bold text-sky-700">₹{calculation.netAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <RefreshCw className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter fund and switch details to see tax and net amount.</p>
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
              <Link key={tool.path} to={tool.path} className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all">
                <ChevronRight className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-sky-700">{tool.name}</p>
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
            <h2 id="switch-mf-tax-guide" className="text-3xl font-bold text-slate-900 mb-6">
              Mutual Fund Switch Tax: Complete Guide (2025-26, AY 2026-27)
              </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                When you <strong>switch from one mutual fund to another</strong> (e.g. from a growth option to a dividend option, or from one scheme to another within the same fund house), the transaction is treated as a <strong>redemption</strong> for tax purposes. You must pay <strong>capital gains tax</strong> on the gain, and you may also incur <strong>exit load</strong> and <strong>Securities Transaction Tax (STT)</strong> where applicable. This guide explains how switch tax works for equity and debt funds in FY 2025-26 and AY 2026-27, and how to use our <strong>Switch MF Tax Calculator</strong>. The framework remains valid for future years unless the law changes.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Is mutual fund switch taxable?</h3>
              <p>
                <strong>Yes.</strong> A switch is a redemption of units in the existing scheme and a fresh investment in another scheme. The redemption leg is a taxable event. You must compute <strong>capital gain</strong> as (redemption value minus cost of acquisition) and pay tax as per the type of fund and holding period. In addition, the fund house may deduct <strong>exit load</strong> if you redeem before the specified period. For <strong>equity-oriented mutual funds</strong>, <strong>STT</strong> at 0.001% is levied on the redemption value. Use our <Link to="/tax-tools/switch-mf-tax-calculator" className="text-sky-600 hover:underline font-medium">Switch MF Tax Calculator</Link> to enter current value, original investment, purchase and switch dates, and fund type (equity or debt) to see exit load, STT, capital gains tax, and net amount. For exit load only, use the <Link to="/tax-tools/mutual-fund-exit-load-checker" className="text-sky-600 hover:underline font-medium">Mutual Fund Exit Load Checker</Link>; for debt fund gains, use the <Link to="/tax-tools/debt-fund-tax-calculator" className="text-sky-600 hover:underline font-medium">Debt Fund Tax Calculator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Tax on equity-oriented MF switch (2025-26)</h3>
              <p>
                For <strong>equity-oriented mutual funds</strong> (schemes that invest at least 65% in equity), the holding period and tax rates are: (1) <strong>Short-term</strong> (12 months or less): gains are <strong>STCG</strong> and taxed at <strong>20%</strong>. (2) <strong>Long-term</strong> (more than 12 months): gains are <strong>LTCG</strong>; an annual exemption of <strong>₹1,25,000</strong> applies, and tax is <strong>12.5%</strong> on the amount above the exemption. STT of <strong>0.001%</strong> is charged on the redemption value. These rates are as per the current tax framework. Use our <Link to="/tax-tools/stcg-ltcg-classifier" className="text-sky-600 hover:underline font-medium">STCG vs LTCG Classifier</Link> to check holding period and our <Link to="/tax-tools/equity-tax-estimator" className="text-sky-600 hover:underline font-medium">Equity Tax Estimator</Link> for assessment-year-wise tax. For planning LTCG and exemption, see <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-sky-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Tax on debt MF switch (2025-26)</h3>
              <p>
                For <strong>debt mutual funds</strong>, from investments made on or after 1 April 2023, the entire gain on redemption or switch is treated as <strong>short-term capital gain</strong> and is <strong>taxed at your applicable income tax slab rate</strong>. There is no separate LTCG rate or indexation. So when you switch a debt fund, you pay tax at 5%, 20%, or 30% depending on your slab. Use our <Link to="/tax-tools/debt-fund-tax-calculator" className="text-sky-600 hover:underline font-medium">Debt Fund Tax Calculator</Link> to see tax at different slabs. For pre-April 2023 debt fund investments, LTCG (holding >36 months) was taxed at 20% with indexation; that treatment continues for those old investments.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Switch vs redeem and reinvest</h3>
              <p>
                From a <strong>tax perspective</strong>, switching (redeem one scheme and invest in another) and redeeming and reinvesting in a different fund house are the same: both involve a redemption and attract capital gains tax, exit load (if any), and STT (for equity). The only difference may be convenience and timing of the new investment. When deciding, consider whether the expected return from the new fund justifies the tax and charges. For multiple redemptions or switches in a year, use our <Link to="/tax-tools/intra-year-redemption-tax-tracker" className="text-sky-600 hover:underline font-medium">Intra-Year Redemption Tax Tracker</Link>. For official tax rates and mutual fund taxation, refer to the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">Income Tax Department</a>, <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">Economic Times – Tax</a>, and <a href="https://www.tatamutualfund.com/blogs/understanding-long-term-and-short-term-capital-gains-tax-mutual-funds" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">Tata Mutual Fund – Capital gains tax on MF</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-sky-600 hover:underline font-medium">tax tools</Link> for mutual funds, capital gains, and income tax. For learning, visit our <Link to="/learn" className="text-sky-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-sky-600 hover:underline font-medium">Blog</Link>. For the latest news on markets and tax, check <Link to="/news" className="text-sky-600 hover:underline font-medium">MoneyCal News</Link>. This switch MF tax calculator is for illustration; confirm with the Income Tax Act and a tax advisor for your situation.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">Tax rates and rules are as per current law. This tool is for educational use. Verify with the Income Tax Act and a CA or tax advisor before filing.</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Explore more */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore more</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/blog?category=Tax" className="group p-5 rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex items-center gap-4">
              <FileText className="h-10 w-10 text-sky-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-sky-700">Tax &amp; investment blog</p>
                <p className="text-sm text-slate-500">Articles on mutual funds and tax</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 ml-auto" />
            </Link>
            <Link to="/news" className="group p-5 rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex items-center gap-4">
              <ExternalLink className="h-10 w-10 text-sky-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-sky-700">Latest news</p>
                <p className="text-sm text-slate-500">Markets and tax updates</p>
                </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 ml-auto" />
            </Link>
            <Link to="/tax-tools" className="group p-5 rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex items-center gap-4">
              <Calculator className="h-10 w-10 text-sky-600" />
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-sky-700">All tax tools</p>
                <p className="text-sm text-slate-500">Calculators for tax planning</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 ml-auto" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default SwitchMFTaxCalculator;
