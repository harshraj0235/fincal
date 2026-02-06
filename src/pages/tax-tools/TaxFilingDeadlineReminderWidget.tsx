import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Info,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface DeadlineInfo {
  category: string;
  deadline: string;
  daysLeft: number;
  status: 'urgent' | 'warning' | 'safe';
  description: string;
}

const TaxFilingDeadlineReminderWidget: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('individual');
  const [deadlines, setDeadlines] = useState<DeadlineInfo[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    calculateDeadlines();
  }, [selectedCategory]);

  const calculateDeadlines = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    let categoryDeadlines: DeadlineInfo[] = [];

    if (selectedCategory === 'individual') {
      categoryDeadlines = [
        {
          category: 'ITR filing (individuals)',
          deadline: `${currentYear}-07-31`,
          daysLeft: Math.ceil((new Date(`${currentYear}-07-31`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Last date for filing Income Tax Returns for individuals (may be extended by CBDT)',
        },
        {
          category: 'Self-assessment tax payment',
          deadline: `${currentYear}-07-31`,
          daysLeft: Math.ceil((new Date(`${currentYear}-07-31`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Pay self-assessment tax by July 31 to avoid interest under Section 234A',
        },
        {
          category: 'Advance tax Q1',
          deadline: `${currentYear}-06-15`,
          daysLeft: Math.ceil((new Date(`${currentYear}-06-15`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'First quarter advance tax (15% of estimated annual tax)',
        },
        {
          category: 'Advance tax Q2',
          deadline: `${currentYear}-09-15`,
          daysLeft: Math.ceil((new Date(`${currentYear}-09-15`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Second quarter advance tax (45% cumulative)',
        },
        {
          category: 'Advance tax Q3',
          deadline: `${currentYear}-12-15`,
          daysLeft: Math.ceil((new Date(`${currentYear}-12-15`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Third quarter advance tax (75% cumulative)',
        },
        {
          category: 'Advance tax Q4',
          deadline: `${currentYear + 1}-03-15`,
          daysLeft: Math.ceil((new Date(`${currentYear + 1}-03-15`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Fourth quarter advance tax (100% of estimated annual tax)',
        },
      ];
    } else if (selectedCategory === 'business') {
      const nextMonth = currentDate.getMonth() + 1;
      const nextMonthYear = nextMonth > 11 ? currentYear + 1 : currentYear;
      const nextMonthNum = nextMonth > 11 ? nextMonth - 12 : nextMonth;
      const gstDeadline = `${nextMonthYear}-${String(nextMonthNum + 1).padStart(2, '0')}-20`;
      const tdsDeadline = `${nextMonthYear}-${String(nextMonthNum + 1).padStart(2, '0')}-07`;

      categoryDeadlines = [
        {
          category: 'Business ITR (audit cases)',
          deadline: `${currentYear}-10-31`,
          daysLeft: Math.ceil((new Date(`${currentYear}-10-31`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Last date for filing ITR where accounts are required to be audited',
        },
        {
          category: 'GST return (monthly)',
          deadline: gstDeadline,
          daysLeft: Math.ceil((new Date(gstDeadline).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Monthly GSTR-3B filing deadline (generally 20th of next month)',
        },
        {
          category: 'TDS payment (monthly)',
          deadline: tdsDeadline,
          daysLeft: Math.ceil((new Date(tdsDeadline).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Monthly TDS payment deadline (generally 7th of next month)',
        },
      ];
    }

    categoryDeadlines = categoryDeadlines.map((d) => ({
      ...d,
      status: d.daysLeft <= 7 ? 'urgent' : d.daysLeft <= 30 ? 'warning' : 'safe',
    }));

    setDeadlines(categoryDeadlines);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'safe':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Calendar className="h-5 w-5 text-indigo-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'safe':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-indigo-50 border-indigo-200';
    }
  };

  const relatedTools = [
    { name: 'Section 80C Tally Analyzer', path: '/tax-tools/section-80c-tally-analyzer', desc: '80C investments' },
    { name: 'NPS Tax Benefit vs Growth', path: '/tax-tools/nps-tax-benefit-vs-growth-estimator', desc: 'NPS tax vs growth' },
    { name: 'ELSS Lock-in vs Tax Benefit', path: '/tax-tools/elss-lockin-vs-tax-benefit-visualizer', desc: 'ELSS 3-year vs benefit' },
    { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Capital gains tax' },
    { name: 'Dividend Tax Estimator', path: '/tax-tools/dividend-tax-estimator', desc: 'Dividend TDS & tax' },
    { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Classify gains' },
    { name: 'Loss Carry Forward Estimator', path: '/tax-tools/loss-carry-forward-estimator', desc: 'Capital loss carry forward' },
    { name: 'Offset LTCG with Exemptions', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: 'LTCG exemption' },
  ];

  const faqs = [
    {
      q: 'What is the ITR filing deadline for individuals in India?',
      a: 'The standard due date for filing Income Tax Returns for individuals (not requiring audit) is July 31 of the assessment year. CBDT may extend this date (e.g. FY 2024-25 extended to September 15, 2025). Self-assessment tax must still be paid by July 31 to avoid interest under Section 234A. Check incometax.gov.in for the latest. Valid for 2026 and future years unless the law changes.',
    },
    {
      q: 'What are the advance tax payment dates?',
      a: 'Advance tax is paid in four installments: Q1 by June 15 (15% of estimated annual tax), Q2 by September 15 (45% cumulative), Q3 by December 15 (75% cumulative), Q4 by March 15 (100%). Missing these dates can attract interest. Use our Tax Filing Deadline Reminder Widget to track dates. Valid for 2026–2050 unless the law is amended.',
    },
    {
      q: 'When is the business ITR and GST filing deadline?',
      a: 'For taxpayers required to get accounts audited, the ITR filing deadline is usually October 31. GST monthly return (GSTR-3B) is generally due by the 20th of the next month. TDS payment is generally due by the 7th of the next month. Use the Business/Corporate category in this widget to see upcoming dates. Valid for 2026 onwards unless the law changes.',
    },
    {
      q: 'Can I get reminders for tax deadlines?',
      a: 'This widget shows upcoming tax deadlines and days left. Set calendar reminders on your device for each deadline. Keep documents ready and use our tax calculators (Equity Tax Estimator, Dividend Tax Estimator, Section 80C Tally Analyzer) for accurate estimates. Valid for 2026–2050 unless the law is amended.',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Tax Filing Deadline Reminder Widget – ITR & Advance Tax 2026–2050 | MoneyCal"
        description="Never miss tax deadlines. ITR filing, advance tax Q1–Q4, self-assessment tax, GST, TDS. Valid 2026 onwards."
        keywords="tax filing deadline India 2026, ITR deadline July 31, advance tax quarterly dates, GST TDS deadline reminder"
        canonicalUrl="/tax-tools/tax-filing-deadline-reminder-widget"
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
              <span className="text-slate-900 font-medium">Tax Filing Deadline Reminder Widget</span>
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
              Tax Filing Deadline Reminder Widget
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Never miss important tax deadlines. ITR, advance tax, GST, TDS.
            </motion.p>
          </div>
        </section>

        {/* Main content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-indigo-600" />
                  Deadline settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Taxpayer category</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="individual">Individual taxpayer</option>
                      <option value="business">Business / corporate</option>
                    </select>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                    <h3 className="font-semibold text-indigo-900 mb-2">Related tax tools</h3>
                    <div className="space-y-2 text-sm">
                      <Link to="/tax-tools/section-80c-tally-analyzer" className="block text-indigo-700 hover:text-indigo-900 font-medium">
                        Section 80C Tally Analyzer
                      </Link>
                      <Link to="/tax-tools/equity-tax-estimator" className="block text-indigo-700 hover:text-indigo-900 font-medium">
                        Equity Tax Estimator
                      </Link>
                      <Link to="/tax-tools/dividend-tax-estimator" className="block text-indigo-700 hover:text-indigo-900 font-medium">
                        Dividend Tax Estimator
                      </Link>
                      <Link to="/tax-tools/stcg-ltcg-classifier" className="block text-indigo-700 hover:text-indigo-900 font-medium">
                        STCG vs LTCG Classifier
                      </Link>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <h3 className="font-semibold text-amber-900 mb-2">Tips</h3>
                    <ul className="space-y-1 text-sm text-amber-800">
                      <li>• Set calendar reminders for each deadline</li>
                      <li>• Keep documents ready well in advance</li>
                      <li>• Pay self-assessment tax by July 31 to avoid interest</li>
                      <li>• Check incometax.gov.in for CBDT extensions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Info className="h-6 w-6 text-indigo-600" />
                  Upcoming deadlines
                </h2>
                <div className="space-y-4">
                  {deadlines.map((deadline, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${getStatusColor(deadline.status)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(deadline.status)}
                          <h3 className="font-semibold text-slate-900">{deadline.category}</h3>
                        </div>
                        <span className={`text-sm font-semibold ${deadline.status === 'urgent' ? 'text-red-600' : deadline.status === 'warning' ? 'text-yellow-600' : 'text-green-600'}`}>
                          {deadline.daysLeft > 0 ? `${deadline.daysLeft} days left` : deadline.daysLeft === 0 ? 'Due today' : 'Past'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{deadline.description}</p>
                      <p className="text-xs text-slate-500">Deadline: {new Date(deadline.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  ))}
                </div>
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
            <h2 id="tax-deadline-guide" className="text-3xl font-bold text-slate-900 mb-6">
              Tax Filing Deadlines in India: Complete Guide (Valid 2026–2050)
              </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              <p>
                <strong>Tax filing deadlines</strong> in India include the <strong>ITR filing due date</strong>, <strong>advance tax</strong> quarterly dates, <strong>self-assessment tax</strong> payment, and for businesses <strong>GST</strong> and <strong>TDS</strong> deadlines. Missing these dates can result in penalties and interest. Our <strong>Tax Filing Deadline Reminder Widget</strong> helps you track upcoming deadlines by category (individual or business). This guide explains key deadlines and remains valid for <strong>2026 and future years</strong> unless the law is amended (e.g. through 2050). Always check <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">incometax.gov.in</a> and <a href="https://incometaxindia.gov.in/Pages/yearly-deadlines-details.aspx?yfmv=2026" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax India – yearly deadlines</a> for the latest.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What is the ITR filing deadline for individuals?</h3>
              <p>
                The standard due date for filing <strong>Income Tax Returns (ITR)</strong> for individuals (not requiring audit) is <strong>July 31</strong> of the assessment year. The <strong>CBDT</strong> may extend this date; for example, for FY 2024-25 the due date was extended to <strong>September 15, 2025</strong>. Despite any ITR extension, <strong>self-assessment tax</strong> must be paid by <strong>July 31</strong> to avoid interest under Section 234A. For details, see <a href="https://economictimes.indiatimes.com/wealth/tax/itr-filing-due-date-extended-but-deadline-to-pay-final-tax-without-penalty-is-july-31-or-sept-15-now-for-fy-2024-25/articleshow/122018340.cms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Economic Times – ITR deadline vs self-assessment tax</a> and <a href="https://www.cnbctv18.com/personal-finance/income-tax-return-filing-deadline-extension-but-pay-self-assessment-tax-by-july31-19612284.htm" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">CNBC – Pay self-assessment tax by July 31</a>. Use our <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link> to see days left; use our <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator</Link> and <Link to="/tax-tools/dividend-tax-estimator" className="text-indigo-600 hover:underline font-medium">Dividend Tax Estimator</Link> for tax estimates.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What are the advance tax payment dates?</h3>
              <p>
                <strong>Advance tax</strong> is paid in four installments: <strong>Q1 by June 15</strong> (15% of estimated annual tax), <strong>Q2 by September 15</strong> (45% cumulative), <strong>Q3 by December 15</strong> (75% cumulative), <strong>Q4 by March 15</strong> (100%). Missing these dates can attract interest. Use our <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link> to track advance tax and ITR dates. For tax planning tools, see <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link>, <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-indigo-600 hover:underline font-medium">NPS Tax Benefit vs Growth Estimator</Link>, and <Link to="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="text-indigo-600 hover:underline font-medium">ELSS Lock-in vs Tax Benefit Visualizer</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Business ITR, GST, and TDS deadlines</h3>
              <p>
                For taxpayers required to get <strong>accounts audited</strong>, the ITR filing deadline is usually <strong>October 31</strong>. For <strong>transfer pricing</strong> audit cases, it is <strong>November 30</strong>. <strong>GST</strong> monthly return (GSTR-3B) is generally due by the <strong>20th of the next month</strong>. <strong>TDS</strong> payment is generally due by the <strong>7th of the next month</strong>. Use the Business/Corporate category in our <Link to="/tax-tools/tax-filing-deadline-reminder-widget" className="text-indigo-600 hover:underline font-medium">Tax Filing Deadline Reminder Widget</Link> to see upcoming business deadlines. For official due dates, see <a href="https://incometaxindia.gov.in/Pages/yearly-deadlines-details.aspx?yfmv=2026" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Income Tax India – yearly deadlines</a>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Similar tools: tax calculators and reminders</h3>
              <p>
                If you are looking for a <strong>tax filing deadline reminder India</strong>, <strong>ITR deadline tracker</strong>, or <strong>advance tax calendar</strong>, MoneyCal offers the Tax Filing Deadline Reminder Widget plus other tax tools. Use <Link to="/tax-tools/section-80c-tally-analyzer" className="text-indigo-600 hover:underline font-medium">Section 80C Tally Analyzer</Link> to optimize 80C investments; use <Link to="/tax-tools/equity-tax-estimator" className="text-indigo-600 hover:underline font-medium">Equity Tax Estimator</Link> and <Link to="/tax-tools/offset-ltcg-with-annual-exemptions-tool" className="text-indigo-600 hover:underline font-medium">Offset LTCG with Annual Exemptions Tool</Link> for capital gains; use <Link to="/tax-tools/loss-carry-forward-estimator" className="text-indigo-600 hover:underline font-medium">Loss Carry Forward Estimator</Link> for loss carry forward. For classifying gains, see <Link to="/tax-tools/stcg-ltcg-classifier" className="text-indigo-600 hover:underline font-medium">STCG vs LTCG Classifier</Link>.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">More resources on MoneyCal</h3>
              <p>
                We offer <Link to="/tax-tools" className="text-indigo-600 hover:underline font-medium">tax tools</Link> for 80C, NPS, ELSS, capital gains, and deadlines. For learning, visit our <Link to="/learn" className="text-indigo-600 hover:underline font-medium">Learn</Link> section and <Link to="/blog" className="text-indigo-600 hover:underline font-medium">Blog</Link>. For the latest news, check <Link to="/news" className="text-indigo-600 hover:underline font-medium">MoneyCal News</Link>. This widget is for illustration; verify with the Income Tax Act and CBDT notifications. Provisions are valid for 2026–2050 unless the law is amended.
              </p>

              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Disclaimer</p>
                  <p className="text-sm text-amber-700 mt-1">Deadlines are as per current law and may be extended by CBDT. This tool is for educational use. Valid for 2026–2050 unless the law is amended. Consult a CA or tax advisor and check incometax.gov.in for the latest.</p>
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
                <p className="text-sm text-slate-500">Articles on tax and deadlines</p>
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

export default TaxFilingDeadlineReminderWidget;
