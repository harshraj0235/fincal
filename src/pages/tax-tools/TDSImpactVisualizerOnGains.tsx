import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Info, TrendingUp, Eye, BarChart3, Percent, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


type PaymentType = '194A' | '194C' | '194H' | '194I' | '194J' | '194Q' | 'stcg' | 'ltcg';

interface Rule {
  section: PaymentType;
  label: string;
  baseRate: number;
  threshold: number;
}

const rules: Rule[] = [
  { section: '194A', label: 'Interest (Sec 194A)', baseRate: 10, threshold: 50000 },
  { section: '194C', label: 'Contractor Payment (Sec 194C)', baseRate: 2, threshold: 100000 },
  { section: '194H', label: 'Commission/Brokerage (Sec 194H)', baseRate: 2, threshold: 20000 },
  { section: '194I', label: 'Rent (Sec 194I)', baseRate: 10, threshold: 600000 },
  { section: '194J', label: 'Professional Fee (Sec 194J)', baseRate: 10, threshold: 50000 },
  { section: '194Q', label: 'Purchase of Goods (Sec 194Q)', baseRate: 0.1, threshold: 5000000 },
  { section: 'stcg', label: 'Short-Term Capital Gain (Indicative)', baseRate: 15, threshold: 0 },
  { section: 'ltcg', label: 'Long-Term Capital Gain (Indicative)', baseRate: 10, threshold: 125000 },
];

const formatINR = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const TDSImpactVisualizerOnGains: React.FC = () => {
  const [grossGain, setGrossGain] = useState<number>(750000);
  const [paymentType, setPaymentType] = useState<PaymentType>('194J');
  const [incomeSlab, setIncomeSlab] = useState<number>(30);
  const [hasValidPan, setHasValidPan] = useState<boolean>(true);
  const [includeCess, setIncludeCess] = useState<boolean>(true);
  const [surchargeRate, setSurchargeRate] = useState<number>(0);

  const selectedRule = useMemo(() => rules.find((r) => r.section === paymentType)!, [paymentType]);

  const result = useMemo(() => {
    const isAboveThreshold = grossGain > selectedRule.threshold;
    const tdsRate = hasValidPan ? selectedRule.baseRate : Math.max(20, selectedRule.baseRate);
    const tdsAmount = isAboveThreshold ? grossGain * (tdsRate / 100) : 0;
    const netAfterTds = grossGain - tdsAmount;

    const baseTaxLiability = grossGain * (incomeSlab / 100);
    const surcharge = baseTaxLiability * (surchargeRate / 100);
    const cess = includeCess ? (baseTaxLiability + surcharge) * 0.04 : 0;
    const totalTaxLiability = baseTaxLiability + surcharge + cess;
    const additionalTaxPayable = Math.max(0, totalTaxLiability - tdsAmount);
    const expectedRefund = Math.max(0, tdsAmount - totalTaxLiability);

    const monthlyCashflow = Array.from({ length: 4 }).map((_, i) => {
      const quarterGain = grossGain / 4;
      const quarterTds = isAboveThreshold ? quarterGain * (tdsRate / 100) : 0;
      return { quarter: `Q${i + 1}`, gain: quarterGain, tds: quarterTds, net: quarterGain - quarterTds };
    });

    return {
      isAboveThreshold,
      tdsRate,
      tdsAmount,
      netAfterTds,
      baseTaxLiability,
      surcharge,
      cess,
      totalTaxLiability,
      additionalTaxPayable,
      expectedRefund,
      effectiveTdsPct: (tdsAmount / Math.max(grossGain, 1)) * 100,
      monthlyCashflow,
    };
  }, [grossGain, selectedRule, hasValidPan, incomeSlab, includeCess, surchargeRate]);

  return (
    <>
      <SEOHelmet
        title="TDS Impact Visualizer on Gains (India 2026): Section-wise TDS, Threshold, Refund and Cashflow"
        description="Advanced TDS Impact Visualizer on Gains. Model section-wise TDS rates, threshold checks, PAN impact, cess/surcharge, refund vs additional tax, and quarterly cashflow."
        keywords="TDS Impact Visualizer on Gains, TDS rate chart india, section wise tds calculator, tds threshold calculator, tds refund estimate"
        url="/tax-tools/tds-impact-visualizer-on-gains"
        type="article"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'TDS Impact Visualizer on Gains', url: '/tax-tools/tds-impact-visualizer-on-gains' },
        ]}
        faqData={[
          {
            question: 'What is TDS Impact Visualizer on Gains?',
            answer:
              'It is a decision tool that estimates TDS deduction, net receivable amount, likely final tax liability, and expected refund or additional tax based on your scenario inputs.',
          },
          {
            question: 'How does PAN affect TDS?',
            answer:
              'In many cases, missing or invalid PAN can trigger higher deduction rates. This tool models that impact instantly for planning.',
          },
          {
            question: 'Does TDS equal final tax?',
            answer:
              'Not always. TDS is advance deduction. Final liability may be higher or lower depending on total taxable income and filing outcome.',
          },
          {
            question: 'Can this replace professional tax advice?',
            answer:
              'No. It is a planning visualizer. Use it to understand cashflow impact and then validate filing/treatment with a tax professional.',
          },
        ]}
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                TDS Impact Visualizer on Gains
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Section-wise TDS, threshold logic, PAN effect, and refund planning in one view
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Gain Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gross Capital Gain (₹)
                    </label>
                    <input
                      type="number"
                      value={grossGain}
                      onChange={(e) => setGrossGain(Number(e.target.value || 0))}
                      placeholder="Enter gross capital gain"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Type / Section
                    </label>
                    <select
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {rules.map((r) => (
                        <option key={r.section} value={r.section}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Income Tax Slab (%)
                    </label>
                      <select
                      value={incomeSlab}
                        onChange={(e) => setIncomeSlab(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value={5}>5%</option>
                        <option value={20}>20%</option>
                        <option value={30}>30%</option>
                    </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Surcharge (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={37}
                        value={surchargeRate}
                        onChange={(e) => setSurchargeRate(Number(e.target.value || 0))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={hasValidPan} onChange={(e) => setHasValidPan(e.target.checked)} />
                      Valid PAN available
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={includeCess} onChange={(e) => setIncludeCess(e.target.checked)} />
                      Include 4% cess in final tax estimate
                    </label>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600">
                    Section threshold: <strong>{formatINR(selectedRule.threshold)}</strong> | Base TDS Rate:{' '}
                    <strong>{selectedRule.baseRate}%</strong>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  TDS Impact Analysis
                </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Gross Gain</p>
                        <p className="text-xl font-bold text-blue-900">{formatINR(grossGain)}</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <Eye className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-red-600">TDS Amount</p>
                        <p className="text-xl font-bold text-red-900">{formatINR(result.tdsAmount)}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Applied TDS Rate:</span>
                        <span className="font-bold text-gray-900">{result.tdsRate}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Net Gain:</span>
                        <span className="font-bold text-green-600">{formatINR(result.netAfterTds)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700">Final Tax Liability:</span>
                        <span className="font-bold text-purple-600">{formatINR(result.totalTaxLiability)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                        <span className="text-gray-700">Refund / Extra Tax:</span>
                        <span className="font-bold text-amber-700">
                          {result.expectedRefund > 0
                            ? `Refund ${formatINR(result.expectedRefund)}`
                            : `Pay ${formatINR(result.additionalTaxPayable)}`}
                        </span>
                      </div>
                    </div>

                    {/* Visual Bar Chart */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Impact Visualization
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 w-16">Gross:</span>
                          <div className="flex-1 bg-blue-200 h-4 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <span className="text-xs text-gray-600 ml-2">100%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 w-16">TDS:</span>
                          <div className="flex-1 bg-red-200 h-4 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full rounded-full" style={{ width: `${result.effectiveTdsPct}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-600 ml-2">{result.effectiveTdsPct.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 w-16">Net:</span>
                          <div className="flex-1 bg-green-200 h-4 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full" style={{ width: `${100 - result.effectiveTdsPct}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-600 ml-2">{(100 - result.effectiveTdsPct).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                        <Percent className="h-4 w-4" />
                        Quarterly Cashflow View
                      </h3>
                      <div className="space-y-2 text-sm">
                        {result.monthlyCashflow.map((q) => (
                          <div key={q.quarter} className="flex justify-between">
                            <span>{q.quarter}</span>
                            <span>
                              Gain {formatINR(q.gain)} | TDS {formatINR(q.tds)} | Net {formatINR(q.net)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">Key Insights</h3>
                      <ul className="space-y-1 text-sm text-yellow-800">
                        <li>• Threshold crossed: {result.isAboveThreshold ? 'Yes' : 'No'}</li>
                        <li>• TDS immediate cash impact: {formatINR(result.tdsAmount)}</li>
                        <li>• PAN impact modeled: {hasValidPan ? 'Standard rate' : 'Higher deduction applied'}</li>
                        <li>• Net amount after TDS: {formatINR(result.netAfterTds)}</li>
                      </ul>
                    </div>
                  </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl space-y-4 text-gray-700 leading-7">
              <h2 className="text-2xl font-bold text-gray-900">TDS Impact Visualizer on Gains: Complete 2026 Guide</h2>
              <p>
                Most taxpayers see only one part of TDS: deduction at source. But financial reality is broader. TDS affects
                liquidity timing, quarterly cash planning, filing-time refund probability, and effective post-tax yield. A
                good TDS impact visualizer should answer all of these in one place. This page is built for that purpose.
              </p>
              <p>
                Why do users search for "TDS Impact Visualizer on Gains"? Because they want to know net amount now, not just
                gross amount on paper. If deduction is high, business and personal cashflow decisions change immediately. This
                is especially true for consultants, commission earners, traders, and businesses receiving contract payments.
              </p>
              <p>
                This upgraded tool models section-wise logic first. You select payment type and the tool reads rate and
                threshold context. Then PAN validity, cess inclusion, and surcharge assumptions are applied to approximate
                final liability. The result is not only TDS amount but also likely refund or additional tax at filing stage.
              </p>
              <p>
                Threshold logic is critical. In many sections, if annual payment is below threshold, deduction can be nil or
                lower. Once threshold is crossed, effective deduction changes quickly. That is why this page shows threshold
                and applied rate side-by-side so users can understand whether they are below or above trigger level.
              </p>
              <p>
                PAN compliance has a direct monetary effect. Missing or invalid PAN can cause higher deduction rates depending
                on section and payer setup. Many users discover this only after deduction. Modeling PAN toggle in advance helps
                estimate avoidable cashflow loss and prioritize compliance correction.
              </p>
              <p>
                Next comes final tax view. TDS is advance tax collection, not always final tax burden. If total annual taxable
                income and deductions imply lower liability than TDS deducted, you may expect refund. If liability is higher,
                additional tax may be payable. This tool estimates both outcomes so users can set aside money earlier.
              </p>
              <p>
                Quarterly cashflow block is a practical addition for planners and founders. Even when annual profit looks
                healthy, quarterly TDS outflow can create short-term pressure if not planned. By splitting annual gain into
                four periods, users can preview deduction pattern and align working-capital decisions.
              </p>
              <p>
                For salaried individuals, this page is useful for secondary income streams such as interest, commission, or
                professional side income. For freelancers and agencies, it helps compare invoice structure and expected
                receivables. For investors, it gives a first-pass idea of gross-vs-net realizable amounts.
              </p>
              <p>
                SEO quality for tax tools improves when page intent is complete: section mapping, threshold awareness, net
                impact clarity, and filing consequence. That is why this page includes not only form output but also actionable
                interpretation. Better clarity generally improves user trust and session depth.
              </p>
              <p>
                Recommended workflow: choose relevant section, enter realistic gain amount, set PAN status correctly, add
                surcharge if applicable, then compare net amount and refund/additional tax outcomes. Repeat with alternative
                assumptions to create a conservative and an optimistic plan.
              </p>
              <p>
                If you are building annual tax budget, keep this sequence: (1) estimate gross gains by source, (2) model TDS
                by section, (3) map expected deductions/exemptions separately, (4) project final payable/refundable position,
                and (5) maintain compliance evidence. This helps avoid filing-season surprises.
              </p>
              <p>
                Even with accurate modeling, final return outcome depends on complete income aggregation and law updates. Use
                this tool for decision support and liquidity planning; validate final return treatment with official guidance or
                qualified tax professional where required.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow border border-gray-200">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                TDS Planning Checklist
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Verify section code used by deductor.</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Ensure PAN is valid and updated.</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Track threshold crossing month-wise.</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Reconcile credits in Form 26AS / AIS.</li>
              </ul>
            </div>
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-amber-900">Important Note</h3>
              <p className="text-sm text-amber-900 mt-2">
                Rates/thresholds are modeled for educational planning and can change by Finance Act updates, notifications, or
                taxpayer type conditions. Cross-check final compliance values before filing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TDSImpactVisualizerOnGains;
