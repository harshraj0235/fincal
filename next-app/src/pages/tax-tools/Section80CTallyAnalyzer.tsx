import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Info,
  AlertCircle,
  TrendingUp,
  DollarSign,
  CheckCircle,
  PieChart,
  Target,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface Section80CItem {
  name: string;
  amount: number;
  maxLimit: number;
  category: string;
  color: string;
}

interface TallyResult {
  totalInvested: number;
  totalTaxSaved: number;
  remainingLimit: number;
  recommendations: string[];
  breakdown: Section80CItem[];
  utilizationPercentage: number;
}

const MAX_80C_LIMIT = 150000;

const Section80CTallyAnalyzer: React.FC = () => {
  const [elssAmount, setElssAmount] = useState('');
  const [ppfAmount, setPpfAmount] = useState('');
  const [epfAmount, setEpfAmount] = useState('');
  const [npsAmount, setNpsAmount] = useState('');
  const [sukanyaAmount, setSukanyaAmount] = useState('');
  const [ulipAmount, setUlipAmount] = useState('');
  const [lifeInsuranceAmount, setLifeInsuranceAmount] = useState('');
  const [homeLoanPrincipal, setHomeLoanPrincipal] = useState('');
  const [tuitionFees, setTuitionFees] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<TallyResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateTally = () => {
    const elss = parseFloat(elssAmount) || 0;
    const ppf = parseFloat(ppfAmount) || 0;
    const epf = parseFloat(epfAmount) || 0;
    const nps = parseFloat(npsAmount) || 0;
    const sukanya = parseFloat(sukanyaAmount) || 0;
    const ulip = parseFloat(ulipAmount) || 0;
    const lifeInsurance = parseFloat(lifeInsuranceAmount) || 0;
    const homeLoan = parseFloat(homeLoanPrincipal) || 0;
    const tuition = parseFloat(tuitionFees) || 0;
    const other = parseFloat(otherAmount) || 0;

    const breakdown: Section80CItem[] = [
      { name: 'ELSS Mutual Funds', amount: elss, maxLimit: MAX_80C_LIMIT, category: 'Equity', color: 'bg-blue-500' },
      { name: 'Public Provident Fund (PPF)', amount: ppf, maxLimit: MAX_80C_LIMIT, category: 'Government', color: 'bg-green-500' },
      { name: 'Employee Provident Fund (EPF)', amount: epf, maxLimit: MAX_80C_LIMIT, category: 'Government', color: 'bg-purple-500' },
      { name: 'National Pension System (NPS)', amount: nps, maxLimit: MAX_80C_LIMIT, category: 'Pension', color: 'bg-orange-500' },
      { name: 'Sukanya Samriddhi Yojana', amount: sukanya, maxLimit: MAX_80C_LIMIT, category: 'Government', color: 'bg-pink-500' },
      { name: 'ULIP', amount: ulip, maxLimit: MAX_80C_LIMIT, category: 'Insurance', color: 'bg-indigo-500' },
      { name: 'Life Insurance Premium', amount: lifeInsurance, maxLimit: MAX_80C_LIMIT, category: 'Insurance', color: 'bg-red-500' },
      { name: 'Home Loan Principal', amount: homeLoan, maxLimit: MAX_80C_LIMIT, category: 'Housing', color: 'bg-teal-500' },
      { name: 'Tuition Fees', amount: tuition, maxLimit: MAX_80C_LIMIT, category: 'Education', color: 'bg-yellow-500' },
      { name: 'Other (NSC, FD 5yr, etc.)', amount: other, maxLimit: MAX_80C_LIMIT, category: 'Others', color: 'bg-gray-500' },
    ];

    const totalInvested = breakdown.reduce((sum, item) => sum + item.amount, 0);
    const remainingLimit = Math.max(0, MAX_80C_LIMIT - totalInvested);
    const utilizationPercentage = (totalInvested / MAX_80C_LIMIT) * 100;
    const slabRate = parseInt(incomeSlab) / 100;
    const totalTaxSaved = Math.min(totalInvested, MAX_80C_LIMIT) * slabRate;

    const recommendations: string[] = [];
    if (remainingLimit > 0) {
      recommendations.push(`You can invest ₹${remainingLimit.toLocaleString()} more to maximize Section 80C benefits`);
    }
    if (elss === 0) {
      recommendations.push('Consider ELSS for equity exposure with tax benefits and 3-year lock-in');
    }
    if (ppf === 0) {
      recommendations.push('PPF offers guaranteed returns with tax-free maturity');
    }
    if (utilizationPercentage < 50) {
      recommendations.push('You are underutilizing Section 80C benefits');
    }
    if (utilizationPercentage > 100) {
      recommendations.push('You have exceeded the ₹1.5 lakh limit – excess amount will not get tax benefit');
    }

    setResult({
      totalInvested,
      totalTaxSaved,
      remainingLimit,
      recommendations,
      breakdown,
      utilizationPercentage,
    });
  };

  const resetForm = () => {
    setElssAmount('');
    setPpfAmount('');
    setEpfAmount('');
    setNpsAmount('');
    setSukanyaAmount('');
    setUlipAmount('');
    setLifeInsuranceAmount('');
    setHomeLoanPrincipal('');
    setTuitionFees('');
    setOtherAmount('');
    setIncomeSlab('30');
    setResult(null);
  };

  const relatedTools = [
    { name: 'NPS Tax Benefit vs Growth Estimator', path: '/tax-tools/nps-tax-benefit-vs-growth-estimator', desc: 'NPS tax vs growth' },
    { name: 'ELSS Lock-in vs Tax Benefit Visualizer', path: '/tax-tools/elss-lockin-vs-tax-benefit-visualizer', desc: 'ELSS 3-year vs benefit' },
    { name: 'Tax Filing Deadline Reminder', path: '/tax-tools/tax-filing-deadline-reminder-widget', desc: 'ITR & advance tax dates' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Capital gains tax' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'LTCG exemption' },
    { name: 'Dividend Tax Estimator', path: '/tax-tools/dividend-tax-estimator', desc: 'Dividend TDS & tax' },
    { name: 'Loss Carry Forward Estimator', path: '/tax-tools/loss-carry-forward-estimator', desc: 'Capital loss carry forward' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
  ];

  const faqs = [
    {
      q: 'What is the Section 80C deduction limit for FY 2025-26 and 2026?',
      a: 'The maximum deduction under Section 80C is ₹1,50,000 per financial year. This limit has remained unchanged; no hike was announced in Union Budget 2025. Section 80C applies only under the old tax regime. Under the new tax regime, 80C deductions are not available. Valid for 2026 and future years unless the law is amended.',
    },
    {
      q: 'Which investments qualify under Section 80C?',
      a: 'Eligible instruments include ELSS mutual funds, PPF, EPF, NPS (within 80C limit), life insurance premium, NSC, ULIP, five-year fixed deposits, home loan principal repayment, children’s tuition fees, and Sukanya Samriddhi Yojana. The combined deduction from all these cannot exceed ₹1.5 lakh in a financial year.',
    },
    {
      q: 'Is Section 80C available under the new tax regime?',
      a: 'No. Section 80C deductions are available only under the old tax regime. If you opt for the new tax regime, you cannot claim 80C. Use this tally analyzer to plan 80C only if you are in or considering the old regime. Valid for 2026 onwards unless the law changes.',
    },
    {
      q: 'By when must I invest to claim Section 80C for a financial year?',
      a: 'Investments must be made during the financial year (April 1 to March 31). For the full deduction, ensure your total eligible investments are made before March 31 of that year. Use our Tax Filing Deadline Reminder to track ITR and other dates.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Section 80C Tally Analyzer – Optimize 80C Investments 2026–2050 | MoneyCal"
        description="Analyze and optimize Section 80C investments. ELSS, PPF, EPF, NPS, life insurance, home loan principal – max ₹1.5L. Valid 2026 onwards."
        keywords="Section 80C calculator India, 80C tally analyzer, tax saving investments 2026, ELSS PPF EPF NPS 80C limit 1.5 lakh"
        canonicalUrl="/tax-tools/section-80c-tally-analyzer"
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
              <span className="text-slate-900 font-medium">Section 80C Tally Analyzer</span>
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
              Section 80C Tally Analyzer
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Analyze and optimize your Section 80C investments. Max deduction ₹1.5 lakh. Old regime only.
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
                  Investment details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Income tax slab (%) – old regime</label>
                    <select value={incomeSlab} onChange={(e) => setIncomeSlab(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L – ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: 'ELSS (₹)', state: elssAmount, set: setElssAmount, ph: '0' },
                      { label: 'PPF (₹)', state: ppfAmount, set: setPpfAmount, ph: '0' },
                      { label: 'EPF (₹)', state: epfAmount, set: setEpfAmount, ph: '0' },
                      { label: 'NPS (₹)', state: npsAmount, set: setNpsAmount, ph: '0' },
                      { label: 'Sukanya (₹)', state: sukanyaAmount, set: setSukanyaAmount, ph: '0' },
                      { label: 'ULIP (₹)', state: ulipAmount, set: setUlipAmount, ph: '0' },
                      { label: 'Life insurance (₹)', state: lifeInsuranceAmount, set: setLifeInsuranceAmount, ph: '0' },
                      { label: 'Home loan principal (₹)', state: homeLoanPrincipal, set: setHomeLoanPrincipal, ph: '0' },
                      { label: 'Tuition fees (₹)', state: tuitionFees, set: setTuitionFees, ph: '0' },
                      { label: 'Other (₹)', state: otherAmount, set: setOtherAmount, ph: '0' },
                    ].map(({ label, state, set, ph }) => (
                      <div key={label}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                        <input type="number" value={state} onChange={(e) => set(e.target.value)} placeholder={ph} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateTally} className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 font-semibold transition-colors">
                      Analyze Section 80C
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
                  Section 80C analysis
                </h2>
                <AnimatePresence mode="wait">
                {result ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-xl text-center">
                          <TrendingUp className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                          <p className="text-sm text-indigo-600">Total invested</p>
                          <p className="text-xl font-bold text-indigo-900">₹{result.totalInvested.toLocaleString()}</p>
                      </div>
                        <div className="bg-green-50 p-4 rounded-xl text-center">
                        <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="text-sm text-green-600">Tax saved (est.)</p>
                        <p className="text-xl font-bold text-green-900">₹{result.totalTaxSaved.toLocaleString()}</p>
                      </div>
                    </div>
                      <div className="bg-slate-100 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-700">80C utilization</span>
                          <span className="text-sm font-bold text-slate-900">{result.utilizationPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${result.utilizationPercentage > 100 ? 'bg-red-500' : result.utilizationPercentage > 80 ? 'bg-green-500' : 'bg-indigo-500'}`} style={{ width: `${Math.min(result.utilizationPercentage, 100)}%` }} />
                      </div>
                        <p className="text-xs text-slate-600 mt-1">Limit: ₹1,50,000 | Remaining: ₹{result.remainingLimit.toLocaleString()}</p>
                      </div>
                      {result.recommendations.length > 0 && (
                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                          <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4" />
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
                      )}
                      <div className="bg-slate-100 p-4 rounded-xl">
                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <PieChart className="h-4 w-4" />
                          Breakdown
                      </h3>
                        <div className="space-y-2 max-h-36 overflow-y-auto">
                          {result.breakdown.filter((item) => item.amount > 0).map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                              <span className="text-slate-700">{item.name}</span>
                              <span className="font-semibold text-slate-900">₹{item.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    </motion.div>
                ) : (
                  <div className="text-center py-12">
                      <PieChart className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter your Section 80C investments to see tally and tax saved.</p>
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
            <h2 id="section-80c-guide" className="text-3xl font-bold text-slate-900 mb-6">
              Section 80C Tax Deduction: Complete Guide (Valid 2026–2050)
              </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                <strong>Section 80C</strong> of the Income Tax Act allows individuals and Hindu Undivided Families to claim a deduction of up to <strong>₹1,50,000</strong> per financial year on specified investments and payments. Using a <strong>Section 80C tally analyzer</strong> helps you see how much you have invested across ELSS, PPF, EPF, NPS, life insurance, home loan principal, tuition fees, and other eligible instruments, and how much <strong>tax you can save</strong>. This guide explains the 80C limit, eligible investments, and how to use our <strong>Section 80C Tally Analyzer</strong>. Provisions are valid for <strong>2026 and future years</strong> unless the law is amended (e.g. through 2050). Note: 80C applies only under the <strong>old tax regime</strong>; it is not available under the new regime.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What is the Section 80C limit for FY 2025-26 and 2026?</h3>
              <p>
                The maximum deduction under Section 80C is <strong>₹1,50,000 per financial year</strong>. This limit has not been increased in Union Budget 2025; it remains unchanged for FY 2025-26 and continues unless the government amends the law. For the latest on whether the 80C limit was hiked, see <a href="https://economictimes.indiatimes.com/wealth/tax/has-section-80c-deduction-limit-hiked-check-how-much-you-can-save-after-union-budget-2025/articleshow/117821055.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times – Section 80C limit Budget 2025</a>. Use our <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> to enter your investments and see total invested, tax saved, and remaining limit. For NPS-specific tax benefit (including additional ₹50,000 under 80CCD(1B)), use our <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-indigo-600 hover:underline font-medium">NPS Tax Benefit vs Growth Estimator</Link>; for ELSS lock-in vs tax benefit, use the <Link to="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="text-indigo-600 hover:underline font-medium">ELSS Lock-in vs Tax Benefit Visualizer</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Which investments qualify under Section 80C?</h3>
              <p>
                Eligible instruments include <strong>ELSS mutual funds</strong>, <strong>Public Provident Fund (PPF)</strong>, <strong>Employee Provident Fund (EPF)</strong>, <strong>National Pension System (NPS)</strong> contribution (within the 80C cap), <strong>life insurance premium</strong>, <strong>National Savings Certificate (NSC)</strong>, <strong>ULIP</strong>, five-year fixed deposits, <strong>home loan principal repayment</strong>, <strong>children’s tuition fees</strong>, and <strong>Sukanya Samriddhi Yojana</strong>. The combined deduction from all these cannot exceed ₹1.5 lakh in a year. For a full list, see <a href="https://www.motilaloswal.com/personal-finance/tax/section-80c-deductions-list-income-tax-deduction-under-section-80c" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Motilal Oswal – Section 80C deductions list</a> and <a href="https://groww.in/p/tax/section-80c" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Groww – Section 80C</a>. For income tax deductions list FY 2025-26, see <a href="https://www.kotaklife.com/insurance-guide/savingstax/income-tax-deductions-list" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Kotak – Income tax deductions 80C to 80U</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Is Section 80C available under the new tax regime?</h3>
              <p>
                No. <strong>Section 80C deductions are available only under the old tax regime</strong>. If you opt for the new tax regime, you cannot claim 80C. Use our tally analyzer only if you are in or considering the old regime. For tax planning and deadlines, use our <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link>. For capital gains and other tools, see <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator</Link> and <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-indigo-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">By when must I invest to claim Section 80C?</h3>
              <p>
                Investments must be made <strong>during the financial year</strong> (April 1 to March 31). To claim the full deduction, ensure your total eligible investments are completed before March 31 of that year. Our <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link> helps you track ITR and advance tax dates so you do not miss deadlines.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Similar tools: tax planning and 80C calculators</h3>
              <p>
                If you are looking for a <strong>Section 80C calculator India</strong>, <strong>80C tally analyzer</strong>, or <strong>tax saving investment calculator</strong>, MoneyCal offers several related tools. Besides the Section 80C Tally Analyzer, use the <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-indigo-600 hover:underline font-medium">NPS Tax Benefit vs Growth Estimator</Link> to compare NPS tax benefit vs growth; use the <Link to="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="text-indigo-600 hover:underline font-medium">ELSS Lock-in vs Tax Benefit Visualizer</Link> to compare ELSS 3-year lock-in with tax benefits. For capital gains, see <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG Classifier</Link> and <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator</Link>; for loss carry forward, see <Link to="/tax-tools/loss-carry-forward-estimator" className="text-indigo-600 hover:underline font-medium">Loss Carry Forward Estimator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-indigo-600 hover:underline font-medium">tax tools</Link> for 80C, NPS, ELSS, capital gains, and deadlines. For learning, visit our <Link to="/learn" className="text-indigo-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-indigo-600 hover:underline font-medium">Blog</Link>. For the latest news, check <Link to="/news" className="text-indigo-600 hover:underline font-medium">MoneyCal News</Link>. This analyzer is for illustration; verify with the Income Tax Act and a tax advisor. Provisions are valid for 2026–2050 unless the law is amended.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">80C rules are as per the Income Tax Act and may change. This tool is for educational use. Valid for 2026–2050 unless the law is amended. Consult a CA or tax advisor before investing or filing.</p>
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
                <p className="text-sm text-slate-500">Articles on 80C and tax</p>
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

export default Section80CTallyAnalyzer;
