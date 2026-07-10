import React, { useMemo, useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Calculator,
  Landmark,
  Scale,
  ShieldCheck,
  TimerReset, IndianRupee } from 'lucide-react';

type BankCategory = 'public' | 'private' | 'small-finance' | 'cooperative' | 'foreign';
type BounceReason = 'insufficient-funds' | 'signature-mismatch' | 'account-closed' | 'stop-payment' | 'technical';
type CaseStage = 'bank-only' | 'legal-notice' | 'filing' | 'trial';

const bankFeeMap: Record<BankCategory, number> = {
  public: 180,
  private: 450,
  'small-finance': 300,
  cooperative: 220,
  foreign: 650,
};

const reasonRiskWeight: Record<BounceReason, number> = {
  'insufficient-funds': 1,
  'signature-mismatch': 0.8,
  'account-closed': 1.3,
  'stop-payment': 1.1,
  technical: 0.5,
};

const stageCostMap: Record<CaseStage, number> = {
  'bank-only': 0,
  'legal-notice': 1500,
  filing: 5500,
  trial: 18000,
};

const fmt = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const ChequeBounceChargesCalculator: React.FC = () => {
  const [chequeAmount, setChequeAmount] = useState<number>(250000);
  const [bankCategory, setBankCategory] = useState<BankCategory>('private');
  const [bounceReason, setBounceReason] = useState<BounceReason>('insufficient-funds');
  const [repeatCount, setRepeatCount] = useState<number>(1);
  const [includeGst, setIncludeGst] = useState<boolean>(true);
  const [caseStage, setCaseStage] = useState<CaseStage>('bank-only');
  const [daysSinceMemo, setDaysSinceMemo] = useState<number>(5);
  const [settlementPct, setSettlementPct] = useState<number>(100);

  const calculation = useMemo(() => {
    const baseBankFee = bankFeeMap[bankCategory];
    const repeatedMultiplier = Math.max(1, 1 + (repeatCount - 1) * 0.45);
    const weightedBankFee = baseBankFee * repeatedMultiplier * reasonRiskWeight[bounceReason];
    const bankFee = weightedBankFee;
    const gst = includeGst ? bankFee * 0.18 : 0;
    const noticeOrCourt = stageCostMap[caseStage];
    const estimatedCompensation = caseStage === 'trial' ? chequeAmount * 0.2 : 0;
    const indicativeFineCap = caseStage === 'trial' ? chequeAmount * 2 : 0;
    const totalOutflow = bankFee + gst + noticeOrCourt + estimatedCompensation;
    const settlementAmount = chequeAmount * (settlementPct / 100);

    const noticeDeadlineLeft = Math.max(0, 30 - daysSinceMemo);
    const paymentWindowDays = 15;
    const limitationRisk =
      noticeDeadlineLeft <= 0
        ? 'High - notice period may be missed'
        : noticeDeadlineLeft <= 5
        ? 'Medium - issue notice immediately'
        : 'Low - timeline still manageable';

    return {
      bankFee,
      gst,
      noticeOrCourt,
      estimatedCompensation,
      indicativeFineCap,
      totalOutflow,
      settlementAmount,
      noticeDeadlineLeft,
      paymentWindowDays,
      limitationRisk,
      effectiveImpactPct: (totalOutflow / Math.max(1, chequeAmount)) * 100,
    };
  }, [bankCategory, bounceReason, repeatCount, includeGst, caseStage, chequeAmount, daysSinceMemo, settlementPct]);

  const faqs = [
    {
      question: 'How is cheque bounce charge calculated in this tool?',
      answer:
        'The calculator combines bank return fee, optional GST, repeat bounce impact, case-stage legal cost, and indicative compensation scenarios. It gives planning estimates, not legal advice.',
    },
    {
      question: 'What is the Section 138 cheque bounce timeline?',
      answer:
        'Typical flow: return memo -> issue legal notice within 30 days -> drawer gets 15 days to pay -> complaint can be filed if unpaid, subject to legal limitation and jurisdictional requirements.',
    },
    {
      question: 'Can I avoid court and settle cheque bounce matter?',
      answer:
        'In many cases, yes. Parties often settle through principal repayment plus negotiated charges before or during proceedings. Document settlement clearly and close all claims.',
    },
    {
      question: 'Are bank charges same for all banks?',
      answer:
        'No. Charges vary by bank category, account type, and reason code. The tool uses category-based indicative ranges for quick comparison and planning.',
    },
    {
      question: 'Can I rank legal cost exposure before filing a case?',
      answer:
        'Yes. Use case stage, repeat bounce count, and settlement slider to compare out-of-court resolution vs legal escalation.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-red-50">
      <SEOHelmet
        title="Cheque Bounce Charges Calculator India (2026): Bank Fee, Legal Notice, Court Cost Estimate"
        description="Advanced Cheque Bounce Charges Calculator for India. Estimate bank return fee, GST, legal notice cost, court-stage exposure, timeline risk, and settlement impact."
        keywords="cheque bounce charges calculator, cheque dishonour charges india, section 138 cheque bounce calculator, legal notice cost cheque bounce, cheque return fee calculator"
        url="/calculators/cheque-bounce-charges-calculator"
        type="article"
        tags={['Cheque Bounce Charges Calculator', 'Section 138', 'Cheque Dishonour', 'Legal Notice', 'Bank Charges']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: 'Cheque Bounce Charges Calculator', url: '/calculators/cheque-bounce-charges-calculator' },
        ]}
        faqData={faqs}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
          <div className="flex items-start gap-4">
            <IndianRupee className="h-9 w-9 text-red-600 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Cheque Bounce Charges Calculator</h1>
              <p className="text-slate-600 mt-3 max-w-4xl">
                Plan cheque dishonour risk with bank charges, legal timeline exposure, and settlement scenarios.
                This page is designed for practical decision support so individuals, MSMEs, and finance teams can
                compare fast settlement vs escalation before cost overruns happen.
              </p>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-blue-600" />
              Input Details
            </h2>

            <div>
              <label className="text-sm font-semibold text-slate-700">Cheque Amount</label>
              <input
                type="number"
                min={1000}
                value={chequeAmount}
                onChange={(e) => setChequeAmount(Number(e.target.value || 0))}
                className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">Bank Category</label>
                <select
                  value={bankCategory}
                  onChange={(e) => setBankCategory(e.target.value as BankCategory)}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2"
                >
                  <option value="public">Public Sector Bank</option>
                  <option value="private">Private Sector Bank</option>
                  <option value="small-finance">Small Finance Bank</option>
                  <option value="cooperative">Co-operative Bank</option>
                  <option value="foreign">Foreign Bank</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Bounce Reason</label>
                <select
                  value={bounceReason}
                  onChange={(e) => setBounceReason(e.target.value as BounceReason)}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2"
                >
                  <option value="insufficient-funds">Insufficient Funds</option>
                  <option value="signature-mismatch">Signature Mismatch</option>
                  <option value="account-closed">Account Closed</option>
                  <option value="stop-payment">Stop Payment</option>
                  <option value="technical">Technical Return</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">Repeat Bounce Count</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={repeatCount}
                  onChange={(e) => setRepeatCount(Math.max(1, Number(e.target.value || 1)))}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Case Stage</label>
                <select
                  value={caseStage}
                  onChange={(e) => setCaseStage(e.target.value as CaseStage)}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2"
                >
                  <option value="bank-only">Bank Return Stage</option>
                  <option value="legal-notice">Legal Notice Stage</option>
                  <option value="filing">Complaint Filing Stage</option>
                  <option value="trial">Trial / Litigation Stage</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">Days Since Return Memo</label>
                <input
                  type="number"
                  min={0}
                  value={daysSinceMemo}
                  onChange={(e) => setDaysSinceMemo(Math.max(0, Number(e.target.value || 0)))}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Settlement (%)</label>
                <input
                  type="range"
                  min={60}
                  max={120}
                  value={settlementPct}
                  onChange={(e) => setSettlementPct(Number(e.target.value))}
                  className="mt-3 w-full"
                />
                <div className="text-xs text-slate-600 mt-1">{settlementPct}% of cheque amount</div>
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={includeGst} onChange={(e) => setIncludeGst(e.target.checked)} />
              Include GST on bank charges
            </label>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-green-600" />
              Estimated Cost Breakdown
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Bank Return Fee</span><strong>{fmt(calculation.bankFee)}</strong></div>
              <div className="flex justify-between"><span>GST (if selected)</span><strong>{fmt(calculation.gst)}</strong></div>
              <div className="flex justify-between"><span>Legal / Court Stage Cost</span><strong>{fmt(calculation.noticeOrCourt)}</strong></div>
              <div className="flex justify-between"><span>Indicative Compensation Exposure</span><strong>{fmt(calculation.estimatedCompensation)}</strong></div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-lg">
                <span className="font-semibold">Total Current Exposure</span>
                <strong className="text-red-600">{fmt(calculation.totalOutflow)}</strong>
              </div>
              <div className="text-xs text-slate-600">
                Effective impact: {calculation.effectiveImpactPct.toFixed(2)}% of cheque amount.
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 flex items-center gap-2">
                <TimerReset className="h-4 w-4" />
                Timeline Risk Snapshot
              </h3>
              <p className="text-sm text-amber-800 mt-2">
                Notice window left: <strong>{calculation.noticeDeadlineLeft} day(s)</strong> | Post-notice payment window:
                <strong> {calculation.paymentWindowDays} day(s)</strong>
              </p>
              <p className="text-sm text-amber-800 mt-1">Risk level: <strong>{calculation.limitationRisk}</strong></p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="font-semibold text-emerald-900">Settlement View</h3>
              <p className="text-sm text-emerald-800 mt-1">
                If settled at {settlementPct}%, expected settlement amount is <strong>{fmt(calculation.settlementAmount)}</strong>.
              </p>
              <p className="text-xs text-emerald-800 mt-2">
                Indicative upper fine cap in full litigation scenario: <strong>{fmt(calculation.indicativeFineCap)}</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Cheque Bounce Charges Calculator India: Complete 2026 Guide</h2>
          <div className="space-y-4 text-slate-700 leading-7">
            <p>
              A typical cheque dishonour event in India has three cost layers: bank-level return charges, legal process
              cost, and settlement or litigation exposure. Most people only consider the first layer and underestimate the
              second and third layers, which is why real-world outflow becomes much higher than expected. The purpose of
              this advanced calculator is not only to show "bank bounce fee", but to provide a complete decision model:
              how much is payable now, how much may become payable if delayed, and what happens if the matter moves from
              notice to complaint to trial.
            </p>
            <p>
              For salaried users and small business owners, the biggest mistake is reacting late after return memo. Legal
              timelines matter. A delayed response increases negotiation friction and often increases legal handling cost.
              Therefore this page adds timeline-sensitive guidance with notice window tracking. You can modify "days since
              return memo" and instantly see urgency risk. It helps both payee and drawer plan next steps more rationally.
            </p>
            <p>
              Another practical issue is category-wise bank fee variation. Public banks, private banks, foreign banks, and
              cooperative institutions do not always apply identical fee structures. Account type and reason code can also
              change cost. This tool uses category-weighted estimation so users can compare realistic ranges faster. For
              treasury teams, this is useful during vendor reconciliation when multiple bounced instruments must be priced
              for provisioning.
            </p>
            <p>
              Legal stage modeling is the strongest difference between a basic cheque penalty page and this advanced tool.
              If the matter is at bank return stage, legal cost may be nil. Once notice starts, documentation and drafting
              overhead begins. If complaint filing starts, cost rises sharply. At trial stage, outflow uncertainty and
              compensation exposure become material. With one stage selector, users can simulate each scenario and decide
              whether settlement now is financially superior.
            </p>
            <p>
              The settlement slider is intentionally built for negotiation planning. Many disputes close before final
              judgment because parties prefer certainty over prolonged litigation cost. By testing settlement at 90%, 100%,
              or 110% of cheque amount, both sides can estimate negotiation bands. A well-documented settlement, done in
              time, often reduces non-financial risk such as business relationship damage and repeated legal follow-up.
            </p>
            <p>
              How should you use this calculator in practice? Start by entering cheque value and bank category. Then set
              reason code and repeat count because repeated dishonour tends to increase severity perception. Switch case
              stage to your actual point in process. Finally set memo days and settlement percentage. Compare "Total
              Current Exposure" across scenarios and pick the strategy with lowest expected cost and lowest execution risk.
            </p>
            <p>
              If you are a business owner, combine this page with your accounts receivable aging process. Cheque bounce is
              not only a legal event; it is also a cash-flow and working-capital event. Each delayed recovery cycle locks
              capital and reduces liquidity. This is why finance teams should maintain a "bounce risk register" for repeat
              customers and move high-risk counterparties to secure payment rails.
            </p>
            <p>
              If you are an individual payer who faced accidental bounce due to timing mismatch, immediate communication,
              transparent repayment intent, and documented closure reduce escalation chances. If you are a payee, preserve
              all records: cheque copy, return memo, notice proof, communication trail, and transaction context. Strong
              documentation typically improves settlement quality and legal enforceability.
            </p>
            <p>
              For educational clarity, this page references commonly discussed timeline markers under cheque dishonour
              proceedings and practical compliance habits. However, exact legal outcome depends on facts, jurisdiction, and
              legal strategy. Use this calculator as a financial planning tool and consult qualified counsel for
              case-specific legal direction.
            </p>
            <p>
              Search intent for "Cheque Bounce Charges Calculator" is usually immediate and high urgency. Users want fast
              numbers, timeline clarity, and action path. That is why this page combines calculator output + legal timeline
              + settlement planning + FAQ in one view. It reduces bounce-back to search results and helps users complete
              decision flow on a single page, which improves both usability and SEO quality signals.
            </p>
            <p>
              You can also use this tool to run pre-risk checks before issuing large-value cheques: estimate expected
              downside, compare with digital alternatives, and set internal controls. In many organizations, moving high
              ticket payments from physical instruments to trackable digital rails significantly lowers dishonour
              operational burden. Still, where cheques remain in use, structured pre-checks and timely response systems are
              essential.
            </p>
            <p>
              In summary, a modern cheque bounce calculator should not stop at static fee lists. It must help users decide
              what to do next and what delay may cost. This page is built exactly for that: scenario simulation, timeline
              risk flags, settlement planning, and clear cost visibility.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="h-5 w-5 text-indigo-600" />
              Practical Timeline Checklist
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Keep cheque return memo and date stamp.</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Issue notice within typical legal window.</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Track 15-day payment response after notice.</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Prepare evidence stack before escalation.</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Compare settlement vs litigation economics.</li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Prevention Controls for Businesses
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Run pre-deposit balance confirmation for large instruments.</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Use maker-checker process for cheque issuance data.</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Shift repeat-defaulter counterparties to secure payment rails.</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Maintain bounce analytics by client and period.</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />Create standard settlement templates for faster closure.</li>
            </ul>
          </div>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900">
          <p className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5" />
            This calculator provides planning estimates using category-level assumptions. Final charges, legal cost, and
            outcomes vary by bank schedule, jurisdiction, facts, and legal representation.
          </p>
          <p className="mt-2">
            Reference inspiration for court-fee interface patterns: Bombay High Court calculator UX.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ChequeBounceChargesCalculator;
