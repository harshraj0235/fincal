import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Calculator, Info, AlertCircle, CheckCircle, Target, ChevronRight, ChevronDown, Sparkles, FileText, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface DeductionCategory {
  name: string;
  amount: number;
  maxLimit: number;
  color: string;
  description: string;
  recommendation: string;
}

interface BucketVisualization {
  totalInvested: number;
  totalDeduction: number;
  remainingLimit: number;
  categories: DeductionCategory[];
  optimization: string;
  color: string;
  icon: React.ReactNode;
}

const DeductionBucketVisualizer: React.FC = () => {
  const [elssAmount, setElssAmount] = useState<string>('');
  const [ppfAmount, setPpfAmount] = useState<string>('');
  const [epfAmount, setEpfAmount] = useState<string>('');
  const [npsAmount, setNpsAmount] = useState<string>('');
  const [sukanyaAmount, setSukanyaAmount] = useState<string>('');
  const [ulipAmount, setUlipAmount] = useState<string>('');
  const [nscAmount, setNscAmount] = useState<string>('');
  const [fdAmount, setFdAmount] = useState<string>('');
  const [visualization, setVisualization] = useState<BucketVisualization | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateBucketVisualization = () => {
    const elss = parseFloat(elssAmount) || 0;
    const ppf = parseFloat(ppfAmount) || 0;
    const epf = parseFloat(epfAmount) || 0;
    const nps = parseFloat(npsAmount) || 0;
    const sukanya = parseFloat(sukanyaAmount) || 0;
    const ulip = parseFloat(ulipAmount) || 0;
    const nsc = parseFloat(nscAmount) || 0;
    const fd = parseFloat(fdAmount) || 0;

    const categories: DeductionCategory[] = [
      {
        name: 'ELSS',
        amount: elss,
        maxLimit: 150000,
        color: '#3B82F6',
        description: 'Equity Linked Savings Scheme',
        recommendation: elss < 150000 ? `Consider investing ₹${(150000 - elss).toLocaleString()} more in ELSS for higher returns` : 'ELSS limit fully utilized'
      },
      {
        name: 'PPF',
        amount: ppf,
        maxLimit: 150000,
        color: '#10B981',
        description: 'Public Provident Fund',
        recommendation: ppf < 150000 ? `Consider investing ₹${(150000 - ppf).toLocaleString()} more in PPF for guaranteed returns` : 'PPF limit fully utilized'
      },
      {
        name: 'EPF',
        amount: epf,
        maxLimit: 150000,
        color: '#F59E0B',
        description: 'Employee Provident Fund',
        recommendation: epf < 150000 ? `Consider contributing ₹${(150000 - epf).toLocaleString()} more to EPF` : 'EPF limit fully utilized'
      },
      {
        name: 'NPS',
        amount: nps,
        maxLimit: 50000,
        color: '#8B5CF6',
        description: 'National Pension System (Tier 1)',
        recommendation: nps < 50000 ? `Consider investing ₹${(50000 - nps).toLocaleString()} more in NPS for additional tax benefit` : 'NPS limit fully utilized'
      },
      {
        name: 'Sukanya Samriddhi',
        amount: sukanya,
        maxLimit: 150000,
        color: '#EC4899',
        description: 'Sukanya Samriddhi Yojana',
        recommendation: sukanya < 150000 ? `Consider investing ₹${(150000 - sukanya).toLocaleString()} more in SSY for girl child` : 'SSY limit fully utilized'
      },
      {
        name: 'ULIP',
        amount: ulip,
        maxLimit: 150000,
        color: '#06B6D4',
        description: 'Unit Linked Insurance Plan',
        recommendation: ulip < 150000 ? `Consider investing ₹${(150000 - ulip).toLocaleString()} more in ULIP` : 'ULIP limit fully utilized'
      },
      {
        name: 'NSC',
        amount: nsc,
        maxLimit: 150000,
        color: '#84CC16',
        description: 'National Savings Certificate',
        recommendation: nsc < 150000 ? `Consider investing ₹${(150000 - nsc).toLocaleString()} more in NSC` : 'NSC limit fully utilized'
      },
      {
        name: 'Tax Saving FD',
        amount: fd,
        maxLimit: 150000,
        color: '#F97316',
        description: 'Tax Saving Fixed Deposit',
        recommendation: fd < 150000 ? `Consider investing ₹${(150000 - fd).toLocaleString()} more in Tax Saving FD` : 'FD limit fully utilized'
      }
    ];

    const totalInvested = categories.reduce((sum, cat) => sum + cat.amount, 0);
    const totalDeduction = Math.min(totalInvested, 150000); // 80C limit is 1.5L
    const remainingLimit = Math.max(0, 150000 - totalInvested);

    let optimization: string;
    let color: string;
    let icon: React.ReactNode;

    if (totalInvested >= 150000) {
      optimization = 'Excellent! You have fully utilized your 80C limit';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else if (totalInvested >= 100000) {
      optimization = `Good progress! Consider investing ₹${remainingLimit.toLocaleString()} more to maximize tax benefits`;
      color = 'text-blue-600';
      icon = <Target className="h-5 w-5" />;
    } else {
      optimization = `You can save more tax by investing ₹${remainingLimit.toLocaleString()} more under 80C`;
      color = 'text-orange-600';
      icon = <AlertCircle className="h-5 w-5" />;
    }

    setVisualization({
      totalInvested,
      totalDeduction,
      remainingLimit,
      categories,
      optimization,
      color,
      icon
    });
  };

  const resetForm = () => {
    setElssAmount('');
    setPpfAmount('');
    setEpfAmount('');
    setNpsAmount('');
    setSukanyaAmount('');
    setUlipAmount('');
    setNscAmount('');
    setFdAmount('');
    setVisualization(null);
  };

  const relatedTools = [
    { name: 'Section 80C Tally Analyzer', path: '/tax-tools/section-80c-tally-analyzer', desc: '80C tally' },
    { name: 'ELSS Lock-in vs Tax Benefit', path: '/tax-tools/elss-lockin-vs-tax-benefit-visualizer', desc: 'ELSS 3-year vs benefit' },
    { name: 'NPS Tax Benefit vs Growth', path: '/tax-tools/nps-tax-benefit-vs-growth-estimator', desc: 'NPS tax vs growth' },
    { name: 'Tax Filing Deadline Reminder', path: '/tax-tools/tax-filing-deadline-reminder-widget', desc: 'ITR & advance tax' },
    { name: 'Old vs New Tax Regime Helper', path: '/tax-tools/old-vs-new-tax-regime-helper', desc: 'Compare regimes' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Capital gains tax' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'LTCG exemption' },
    { name: 'HRA vs LTA Comparison', path: '/tax-tools/hra-vs-lta-tax-comparison-tool', desc: 'HRA vs LTA' },
  ];

  const faqs = [
    { q: 'What is the 80C deduction limit?', a: 'The maximum deduction under Section 80C is ₹1,50,000 per financial year. This limit applies to the combined total of all eligible investments (ELSS, PPF, EPF, NPS within 80C, life insurance, NSC, ULIP, tax-saving FD, etc.). NPS has an additional ₹50,000 under 80CCD(1B) over and above 80C. Valid for 2026 and future years unless the law changes.' },
    { q: 'Is 80C available under the new tax regime?', a: 'No. Section 80C deductions are available only under the old tax regime. If you opt for the new tax regime, you cannot claim 80C. Use this visualizer only if you are in or considering the old regime. Valid for 2026–2050 unless the law is amended.' },
    { q: 'What is the NPS limit in the 80C bucket?', a: 'NPS contribution under Section 80CCD(1) is part of the ₹1.5 lakh 80C limit. Additionally, Section 80CCD(1B) allows an extra deduction of up to ₹50,000 on NPS contribution (old regime only). So total NPS-related deduction can be up to ₹2 lakh (₹1.5L under 80C + ₹50k under 80CCD(1B)) if you invest only in NPS, subject to the 80C cap for the 80C portion.' },
    { q: 'By when must I invest for 80C?', a: 'Investments must be made during the financial year (April 1 to March 31) to claim deduction for that year. Use our Tax Filing Deadline Reminder to track ITR and other dates. Valid for 2026 onwards unless the law changes.' },
  ];

  return (
    <>
      <SEOHelmet
        title="80C Deduction Bucket Visualizer – Optimize 80C Investments 2026–2050 | MoneyCal"
        description="Visualize and optimize Section 80C investments. ELSS, PPF, EPF, NPS, SSY, ULIP, NSC, FD – max ₹1.5L. Valid 2026 onwards."
        keywords="80C deduction bucket visualizer India, Section 80C calculator 2026, ELSS PPF EPF NPS 80C limit, tax saving investments calculator"
        canonicalUrl="/tax-tools/80c-deduction-bucket-visualizer"
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
              <span className="text-slate-900 font-medium">80C Deduction Bucket Visualizer</span>
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
              80C Deduction Bucket Visualizer
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Visualize and optimize Section 80C investments. Max deduction ₹1.5 lakh. Old regime only.
            </motion.p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-indigo-600" />
                  Investment details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ELSS Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={elssAmount}
                      onChange={(e) => setElssAmount(e.target.value)}
                      placeholder="Enter ELSS amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PPF Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={ppfAmount}
                      onChange={(e) => setPpfAmount(e.target.value)}
                      placeholder="Enter PPF amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EPF Contribution (₹)
                    </label>
                    <input
                      type="number"
                      value={epfAmount}
                      onChange={(e) => setEpfAmount(e.target.value)}
                      placeholder="Enter EPF amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NPS Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={npsAmount}
                      onChange={(e) => setNpsAmount(e.target.value)}
                      placeholder="Enter NPS amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sukanya Samriddhi (₹)
                    </label>
                    <input
                      type="number"
                      value={sukanyaAmount}
                      onChange={(e) => setSukanyaAmount(e.target.value)}
                      placeholder="Enter SSY amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ULIP Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={ulipAmount}
                      onChange={(e) => setUlipAmount(e.target.value)}
                      placeholder="Enter ULIP amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NSC Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={nscAmount}
                      onChange={(e) => setNscAmount(e.target.value)}
                      placeholder="Enter NSC amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Saving FD (₹)
                    </label>
                    <input
                      type="number"
                      value={fdAmount}
                      onChange={(e) => setFdAmount(e.target.value)}
                      placeholder="Enter FD amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button onClick={calculateBucketVisualization} className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 font-semibold transition-colors">
                      Visualize bucket
                    </button>
                    <button onClick={resetForm} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <PieChart className="h-6 w-6 text-indigo-600" />
                  Bucket analysis
                </h2>

                {visualization ? (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Investment Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Invested:</span>
                          <span className="font-bold text-blue-600">₹{visualization.totalInvested.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Deduction:</span>
                          <span className="font-bold text-blue-600">₹{visualization.totalDeduction.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Remaining Limit:</span>
                          <span className="font-bold text-blue-600">₹{visualization.remainingLimit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Optimization */}
                    <div className={`text-center p-4 rounded-lg ${visualization.color.includes('green') ? 'bg-green-50 border border-green-200' : visualization.color.includes('blue') ? 'bg-blue-50 border border-blue-200' : 'bg-orange-50 border border-orange-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${visualization.color}`}>
                        {visualization.icon}
                        <span className="ml-2 text-lg font-bold">Optimization</span>
                      </div>
                      <p className="text-sm text-gray-600">{visualization.optimization}</p>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800">Investment Categories</h3>
                      {visualization.categories.map((category, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-800">{category.name}</h4>
                            <span className="text-sm text-gray-600">{category.description}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Amount:</span>
                              <span className="font-bold" style={{ color: category.color }}>₹{category.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Max Limit:</span>
                              <span className="font-bold text-gray-600">₹{category.maxLimit.toLocaleString()}</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-2">
                              {category.recommendation}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PieChart className="h-14 w-14 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Enter your investment details to visualize 80C bucket.</p>
                  </div>
                )}
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

        {/* SEO content – 1500+ words */}
        <article className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 id="80c-bucket-guide" className="text-3xl font-bold text-slate-900 mb-6">80C Deduction Bucket: Complete Guide (Valid 2026–2050)</h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>Section 80C of the Income Tax Act allows a deduction of up to <strong>₹1,50,000</strong> per financial year on specified investments and payments. Our <strong>80C Deduction Bucket Visualizer</strong> helps you see how much you have allocated across ELSS, PPF, EPF, NPS, Sukanya Samriddhi, ULIP, NSC, and tax-saving FD, and how much deduction you can claim. This guide explains the 80C bucket, NPS additional limit, and remains valid for <strong>2026 and future years</strong> unless the law is amended. 80C applies only under the <strong>old tax regime</strong>.</p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What is the 80C deduction limit?</h3>
              <p>The maximum deduction under Section 80C is <strong>₹1,50,000</strong> per financial year. No hike was announced in Union Budget 2025. For details see <a href="https://economictimes.indiatimes.com/wealth/tax/has-section-80c-deduction-limit-hiked-check-how-much-you-can-save-after-union-budget-2025/articleshow/117821055.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times – Section 80C limit</a>. Use our <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-indigo-600 hover:underline font-medium">80C Deduction Bucket Visualizer</Link> and <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> to optimize 80C.</p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Which instruments qualify under 80C?</h3>
              <p>Eligible instruments include <strong>ELSS</strong>, <strong>PPF</strong>, <strong>EPF</strong>, <strong>NPS</strong> (within 80C cap), <strong>life insurance premium</strong>, <strong>NSC</strong>, <strong>ULIP</strong>, five-year FD, home loan principal, tuition fees, and <strong>Sukanya Samriddhi Yojana</strong>. NPS has an additional <strong>₹50,000</strong> under 80CCD(1B). See <a href="https://groww.in/p/tax/section-80c" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Groww – Section 80C</a>. Use our <Link to="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="text-indigo-600 hover:underline font-medium">ELSS Lock-in vs Tax Benefit Visualizer</Link> and <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-indigo-600 hover:underline font-medium">NPS Tax Benefit vs Growth Estimator</Link>.</p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Is 80C available in the new tax regime?</h3>
              <p><strong>No.</strong> Section 80C is available only under the old tax regime. Use our <Link to="/tax-tools/old-vs-new-tax-regime-helper" className="text-indigo-600 hover:underline font-medium">Old vs New Tax Regime Helper</Link> to compare regimes and our <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link> for ITR dates.</p>
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources</h3>
              <p>We offer <Link to="/tax-tools" className="text-indigo-600 hover:underline font-medium">tax tools</Link> for 80C, NPS, ELSS, capital gains, and deadlines. Visit our <Link to="/learn" className="text-indigo-600 hover:underline font-medium">Learn</Link> section, <Link to="/blog" className="text-indigo-600 hover:underline font-medium">Blog</Link>, and <Link to="/news" className="text-indigo-600 hover:underline font-medium">MoneyCal News</Link>. This tool is for illustration; verify with the Income Tax Act and a tax advisor. Valid for 2026–2050 unless the law is amended.</p>
              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">80C rules are as per the Income Tax Act and may change. This tool is for educational use. Valid for 2026–2050. Consult a CA or tax advisor before investing or filing.</p>
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

export default DeductionBucketVisualizer;
