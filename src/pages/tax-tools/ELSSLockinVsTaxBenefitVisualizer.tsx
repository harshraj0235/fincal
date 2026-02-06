import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Calculator,
  TrendingUp,
  Info,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Calendar,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface ELSSComparison {
  investmentAmount: number;
  lockinPeriod: number;
  taxBenefit: number;
  potentialReturns: number;
  netBenefit: number;
  alternativeInvestment: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const ELSS_LOCKIN_YEARS = 3;

const ELSSLockinVsTaxBenefitVisualizer: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [incomeTaxSlab, setIncomeTaxSlab] = useState('30');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [comparison, setComparison] = useState<ELSSComparison | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateELSSComparison = () => {
    if (!investmentAmount || !incomeTaxSlab || !expectedReturn) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(investmentAmount);
    const taxSlab = parseFloat(incomeTaxSlab) / 100;
    const returns = parseFloat(expectedReturn) / 100;

    const taxBenefit = amount * taxSlab;
    const lockinPeriod = ELSS_LOCKIN_YEARS;
    const potentialReturns = amount * (Math.pow(1 + returns, lockinPeriod) - 1);
    const netBenefit = taxBenefit + potentialReturns;
    
    const alternativeInvestment = amount * (Math.pow(1 + returns - 0.02, lockinPeriod) - 1);
    
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (netBenefit > alternativeInvestment) {
      recommendation = 'ELSS is beneficial – higher net returns with tax benefits and 3-year lock-in';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else {
      recommendation = 'Consider alternatives – lock-in period may not justify tax benefits for your inputs';
      color = 'text-orange-600';
      icon = <AlertCircle className="h-5 w-5" />;
    }

    setComparison({
      investmentAmount: amount,
      lockinPeriod,
      taxBenefit,
      potentialReturns,
      netBenefit,
      alternativeInvestment,
      recommendation,
      color,
      icon,
    });
  };

  const resetForm = () => {
    setInvestmentAmount('');
    setIncomeTaxSlab('30');
    setExpectedReturn('12');
    setComparison(null);
  };

  const relatedTools = [
    { name: 'Section 80C Tally Analyzer', path: '/tax-tools/section-80c-tally-analyzer', desc: '80C investments' },
    { name: 'NPS Tax Benefit vs Growth', path: '/tax-tools/nps-tax-benefit-vs-growth-estimator', desc: 'NPS tax vs growth' },
    { name: 'Tax Filing Deadline Reminder', path: '/tax-tools/tax-filing-deadline-reminder-widget', desc: 'ITR & advance tax' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Capital gains tax' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'LTCG exemption' },
    { name: 'Dividend Tax Estimator', path: '/tax-tools/dividend-tax-estimator', desc: 'Dividend TDS & tax' },
    { name: 'Loss Carry Forward Estimator', path: '/tax-tools/loss-carry-forward-estimator', desc: 'Capital loss carry forward' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
  ];

  const faqs = [
    {
      q: 'What is the ELSS lock-in period?',
      a: 'ELSS (Equity Linked Savings Scheme) mutual funds have a mandatory lock-in period of 3 years from the date of investment. During this period you cannot redeem units. After 3 years, redemption is allowed without exit load. ELSS qualifies for deduction under Section 80C (within the ₹1.5 lakh limit). Valid for 2026 and future years unless the law changes.',
    },
    {
      q: 'Is ELSS tax benefit available under the new tax regime?',
      a: 'Section 80C deductions (including ELSS) are available only under the old tax regime. If you opt for the new tax regime, you cannot claim 80C deduction on ELSS or any other 80C investment. This visualizer shows tax benefit as per old regime. Valid for 2026–2050 unless the law is amended.',
    },
    {
      q: 'How is ELSS tax benefit calculated?',
      a: 'The tax benefit from ELSS is the deduction you get under Section 80C, which reduces your taxable income. The amount of tax saved = (Investment amount, subject to 80C limit) × your income tax slab rate. So if you invest ₹1.5 lakh in ELSS and are in the 30% slab, you save ₹45,000 in tax (subject to overall 80C limit of ₹1.5 lakh).',
    },
    {
      q: 'Is ELSS better than PPF or other 80C options?',
      a: 'ELSS offers equity exposure and a shorter lock-in (3 years) than PPF (15 years), but carries market risk. PPF offers guaranteed returns and tax-free maturity. The best choice depends on your risk appetite, liquidity needs, and other 80C investments. Use our Section 80C Tally Analyzer to see total 80C utilization and our NPS Tax Benefit vs Growth Estimator for NPS comparison. Valid for 2026 onwards unless the law changes.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="ELSS Lock-in vs Tax Benefit Visualizer – 80C 2026–2050 | MoneyCal"
        description="Compare ELSS 3-year lock-in with tax benefits. Section 80C deduction, old regime. Valid 2026 onwards."
        keywords="ELSS calculator India, ELSS lock-in 3 years vs tax benefit, 80C tax saving mutual fund 2026, ELSS vs PPF calculator"
        canonicalUrl="/tax-tools/elss-lockin-vs-tax-benefit-visualizer"
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
              <span className="text-slate-900 font-medium">ELSS Lock-in vs Tax Benefit Visualizer</span>
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
              ELSS Lock-in vs Tax Benefit Visualizer
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Compare ELSS 3-year lock-in period with tax benefits under Section 80C. Old regime only.
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
                  Investment parameters
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Investment amount (₹)</label>
                    <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} placeholder="e.g. 150000" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Income tax slab (%) – old regime</label>
                    <select value={incomeTaxSlab} onChange={(e) => setIncomeTaxSlab(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L – ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expected annual return (% p.a.)</label>
                    <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} placeholder="e.g. 12" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={calculateELSSComparison} className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 font-semibold transition-colors">
                      Compare options
                    </button>
                    <button onClick={resetForm} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                  Comparison analysis
                </h2>
                <AnimatePresence mode="wait">
                {comparison ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className={`text-center p-4 rounded-xl ${comparison.color.includes('green') ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                        <div className={`flex items-center justify-center gap-2 mb-2 ${comparison.color}`}>
                        {comparison.icon}
                          <span className="font-bold">Recommendation</span>
                        </div>
                        <p className="text-sm text-slate-600">{comparison.recommendation}</p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                        <h3 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          ELSS (3-year lock-in)
                      </h3>
                        <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-700">Tax benefit (80C)</span>
                          <span className="font-bold text-green-600">₹{comparison.taxBenefit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-700">Potential returns (3 yr)</span>
                            <span className="font-bold text-indigo-600">₹{comparison.potentialReturns.toLocaleString()}</span>
                        </div>
                          <div className="flex justify-between border-t border-indigo-200 pt-2">
                            <span className="font-semibold text-slate-900">Net benefit</span>
                          <span className="font-bold text-purple-600">₹{comparison.netBenefit.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Alternative (no lock-in, no 80C)
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-700">Tax benefit</span>
                            <span className="font-bold text-slate-600">₹0</span>
                    </div>
                        <div className="flex justify-between">
                            <span className="text-slate-700">Potential returns (3 yr)</span>
                            <span className="font-bold text-slate-600">₹{comparison.alternativeInvestment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t border-slate-300 pt-2">
                            <span className="font-semibold text-slate-900">Net benefit</span>
                            <span className="font-bold text-slate-600">₹{comparison.alternativeInvestment.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 p-3 rounded-xl text-center">
                          <p className="text-xs text-slate-600">Lock-in</p>
                          <p className="text-lg font-bold text-green-600">{comparison.lockinPeriod} years</p>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-xl text-center">
                          <p className="text-xs text-slate-600">Tax savings (slab)</p>
                          <p className="text-lg font-bold text-indigo-600">{incomeTaxSlab}%</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <Lock className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter investment amount, slab, and expected return to compare ELSS vs alternatives.</p>
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
            <h2 id="elss-guide" className="text-3xl font-bold text-slate-900 mb-6">
              ELSS Lock-in vs Tax Benefit: Complete Guide (Valid 2026–2050)
              </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                <strong>ELSS (Equity Linked Savings Scheme)</strong> mutual funds offer <strong>tax deduction under Section 80C</strong> (within the ₹1.5 lakh limit) and have a <strong>3-year lock-in period</strong>. Comparing the <strong>ELSS lock-in vs tax benefit</strong> helps you decide whether ELSS is suitable for you. Our <strong>ELSS Lock-in vs Tax Benefit Visualizer</strong> lets you enter investment amount, tax slab, and expected return to see tax saved and potential returns over 3 years, and compare with an alternative (no lock-in, no 80C). This guide explains ELSS, 80C, and lock-in. Valid for <strong>2026 and future years</strong> unless the law is amended. Note: 80C is available only under the <strong>old tax regime</strong>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What is ELSS and what is the lock-in period?</h3>
              <p>
                <strong>ELSS</strong> is an <strong>equity-linked savings scheme</strong> that qualifies for <strong>deduction under Section 80C</strong> (within the ₹1.5 lakh limit per financial year). ELSS has a <strong>mandatory lock-in of 3 years</strong> from the date of investment; you cannot redeem units before 3 years. After 3 years, redemption is allowed without exit load. ELSS invests primarily in equity and carries market risk. For a list of 80C options, see <a href="https://www.motilaloswal.com/personal-finance/tax/section-80c-deductions-list-income-tax-deduction-under-section-80c" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Motilal Oswal – Section 80C deductions</a> and <a href="https://groww.in/p/tax/section-80c" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Groww – Section 80C</a>. Use our <Link to="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="text-indigo-600 hover:underline font-medium">ELSS Lock-in vs Tax Benefit Visualizer</Link> to compare ELSS with alternatives; use our <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> to optimize all 80C investments.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Is ELSS tax benefit available under the new tax regime?</h3>
              <p>
                <strong>No. Section 80C deductions (including ELSS) are available only under the old tax regime.</strong> If you opt for the new tax regime, you cannot claim 80C deduction on ELSS or any other 80C investment. This visualizer shows tax benefit as per old regime. For NPS (which has additional ₹50,000 under 80CCD(1B) in old regime), use our <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-indigo-600 hover:underline font-medium">NPS Tax Benefit vs Growth Estimator</Link>; for deadlines, use our <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">How is ELSS tax benefit calculated?</h3>
              <p>
                The <strong>tax benefit from ELSS</strong> is the <strong>deduction under Section 80C</strong>, which reduces your taxable income. The amount of tax saved = (Investment amount, subject to the overall 80C limit of ₹1.5 lakh) × your income tax slab rate. So if you invest ₹1.5 lakh in ELSS and are in the 30% slab, you save ₹45,000 in tax. If you invest ₹50,000 in ELSS and have other 80C investments totaling ₹1 lakh, your total 80C is ₹1.5 lakh and you get the full deduction. Use our <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> to see total 80C and tax saved. For official 80C limit, see <a href="https://economictimes.indiatimes.com/wealth/tax/has-section-80c-deduction-limit-hiked-check-how-much-you-can-save-after-union-budget-2025/articleshow/117821055.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times – Section 80C limit Budget 2025</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">ELSS vs PPF and other 80C options</h3>
              <p>
                <strong>ELSS</strong> offers equity exposure and a <strong>shorter lock-in (3 years)</strong> than <strong>PPF (15 years)</strong>, but carries market risk. PPF offers guaranteed returns and tax-free maturity. The best choice depends on your risk appetite, liquidity needs, and other 80C investments. Use our <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> to see total 80C utilization; use our <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-indigo-600 hover:underline font-medium">NPS Tax Benefit vs Growth Estimator</Link> for NPS. For capital gains tools, see <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator</Link> and <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-indigo-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Similar tools: tax planning and 80C calculators</h3>
              <p>
                If you are looking for an <strong>ELSS calculator India</strong>, <strong>ELSS lock-in vs tax benefit calculator</strong>, or <strong>80C tax saving calculator</strong>, MoneyCal offers several related tools. Besides the ELSS Lock-in vs Tax Benefit Visualizer, use the <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> to optimize 80C investments; use the <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-indigo-600 hover:underline font-medium">NPS Tax Benefit vs Growth Estimator</Link> to compare NPS tax vs growth. For deadlines, see <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link>; for capital gains, see <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG Classifier</Link> and <Link to="/tax-tools/loss-carry-forward-estimator" className="text-indigo-600 hover:underline font-medium">Loss Carry Forward Estimator</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-indigo-600 hover:underline font-medium">tax tools</Link> for 80C, NPS, ELSS, capital gains, and deadlines. For learning, visit our <Link to="/learn" className="text-indigo-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-indigo-600 hover:underline font-medium">Blog</Link>. For the latest news, check <Link to="/news" className="text-indigo-600 hover:underline font-medium">MoneyCal News</Link>. This visualizer is for illustration; verify with the Income Tax Act and a tax advisor. Provisions are valid for 2026–2050 unless the law is amended.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">80C and ELSS rules are as per the Income Tax Act and may change. This tool is for educational use. Valid for 2026–2050 unless the law is amended. Consult a CA or tax advisor before investing or filing.</p>
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
                <p className="text-sm text-slate-500">Articles on ELSS and 80C</p>
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

export default ELSSLockinVsTaxBenefitVisualizer;
