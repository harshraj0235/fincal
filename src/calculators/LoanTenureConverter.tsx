import React, { useMemo, useState } from 'react';
import { IndianRupee, CalendarDays, CheckCircle2, Info, Sliders, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/calculatorUtils';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorSchema } from '../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

type Mode = 'convert' | 'emi-to-tenure' | 'prepayment-impact';

const toMonthlyRate = (annualRate: number): number => Math.max(0, annualRate) / 12 / 100;

const calculateEmi = (principal: number, monthlyRate: number, tenureMonths: number): number => {
  const p = Math.max(0, principal);
  const n = Math.max(1, tenureMonths);
  if (monthlyRate === 0) return p / n;
  const factor = Math.pow(1 + monthlyRate, n);
  return (p * monthlyRate * factor) / (factor - 1);
};

const calculateTenureFromEmi = (principal: number, monthlyRate: number, emi: number): number | null => {
  const p = Math.max(0, principal);
  const e = Math.max(0, emi);
  if (p === 0 || e === 0) return null;
  if (monthlyRate === 0) return p / e;
  if (e <= p * monthlyRate) return null;
  return Math.log(e / (e - p * monthlyRate)) / Math.log(1 + monthlyRate);
};

const getYearsMonthsText = (months: number): string => {
  if (!Number.isFinite(months) || months <= 0) return 'Not available';
  const rounded = Math.ceil(months);
  const years = Math.floor(rounded / 12);
  const remMonths = rounded % 12;
  if (years === 0) return `${remMonths} month${remMonths === 1 ? '' : 's'}`;
  if (remMonths === 0) return `${years} year${years === 1 ? '' : 's'}`;
  return `${years} year${years === 1 ? '' : 's'} ${remMonths} month${remMonths === 1 ? '' : 's'}`;
};

export const LoanTenureConverter: React.FC = () => {
  const [mode, setMode] = useState<Mode>('convert');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [tenureInput, setTenureInput] = useState<number>(20);
  const [loanAmount, setLoanAmount] = useState<number>(3000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [targetEmi, setTargetEmi] = useState<number>(30000);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
  const [otherEmis, setOtherEmis] = useState<number>(15000);
  const [extraMonthlyPrepayment, setExtraMonthlyPrepayment] = useState<number>(5000);
  const [oneTimePrepayment, setOneTimePrepayment] = useState<number>(200000);
  const [prepaymentAfterMonths, setPrepaymentAfterMonths] = useState<number>(36);

  const monthlyRate = useMemo(() => toMonthlyRate(interestRate), [interestRate]);
  const tenureMonths = useMemo(
    () => Math.max(1, tenureType === 'years' ? tenureInput * 12 : tenureInput),
    [tenureType, tenureInput]
  );
  const convertedValue = useMemo(
    () => (tenureType === 'years' ? tenureMonths : tenureMonths / 12),
    [tenureType, tenureMonths]
  );

  const baseEmi = useMemo(() => calculateEmi(loanAmount, monthlyRate, tenureMonths), [loanAmount, monthlyRate, tenureMonths]);
  const baseTotalPayment = useMemo(() => baseEmi * tenureMonths, [baseEmi, tenureMonths]);
  const baseTotalInterest = useMemo(() => Math.max(0, baseTotalPayment - loanAmount), [baseTotalPayment, loanAmount]);

  const solvedTenureMonths = useMemo(
    () => calculateTenureFromEmi(loanAmount, monthlyRate, targetEmi),
    [loanAmount, monthlyRate, targetEmi]
  );

  const affordability = useMemo(() => {
    const safeIncome = Math.max(0, monthlyIncome);
    const safeOther = Math.max(0, otherEmis);
    const maxAffordableEmi = Math.max(0, safeIncome * 0.45 - safeOther);
    const suggestedSafeEmi = Math.max(0, safeIncome * 0.35 - safeOther);
    const currentFoir = safeIncome > 0 ? ((baseEmi + safeOther) / safeIncome) * 100 : 0;
    return {
      maxAffordableEmi,
      suggestedSafeEmi,
      currentFoir
    };
  }, [monthlyIncome, otherEmis, baseEmi]);

  const prepaymentImpact = useMemo(() => {
    const extra = Math.max(0, extraMonthlyPrepayment);
    const lumpSum = Math.max(0, oneTimePrepayment);
    const triggerMonth = Math.max(1, Math.min(Math.round(prepaymentAfterMonths), tenureMonths - 1));

    const enhancedEmi = baseEmi + extra;
    const monthsWithExtra = calculateTenureFromEmi(loanAmount, monthlyRate, enhancedEmi);

    let monthsWithLumpSum: number | null = null;
    if (monthlyRate === 0) {
      const balanceAfterTrigger = Math.max(0, loanAmount - baseEmi * triggerMonth - lumpSum);
      monthsWithLumpSum = triggerMonth + balanceAfterTrigger / Math.max(baseEmi, 1);
    } else {
      const factor = Math.pow(1 + monthlyRate, triggerMonth);
      const balanceAtTrigger = loanAmount * factor - baseEmi * ((factor - 1) / monthlyRate);
      const reducedBalance = Math.max(0, balanceAtTrigger - lumpSum);
      const remMonths = reducedBalance === 0 ? 0 : calculateTenureFromEmi(reducedBalance, monthlyRate, baseEmi);
      if (remMonths !== null) monthsWithLumpSum = triggerMonth + remMonths;
    }

    const finalScenarioMonths = monthsWithExtra ?? tenureMonths;
    const finalTotalPayment = enhancedEmi * finalScenarioMonths;
    const finalTotalInterest = Math.max(0, finalTotalPayment - loanAmount);
    const interestSavedVsBase = Math.max(0, baseTotalInterest - finalTotalInterest);
    const tenureSavedMonths = Math.max(0, tenureMonths - finalScenarioMonths);

    const lumpSumSavedMonths =
      monthsWithLumpSum === null ? 0 : Math.max(0, tenureMonths - Math.ceil(monthsWithLumpSum));

    return {
      enhancedEmi,
      monthsWithExtra,
      monthsWithLumpSum,
      interestSavedVsBase,
      tenureSavedMonths,
      lumpSumSavedMonths
    };
  }, [
    baseEmi,
    baseTotalInterest,
    extraMonthlyPrepayment,
    loanAmount,
    monthlyRate,
    oneTimePrepayment,
    prepaymentAfterMonths,
    tenureMonths
  ]);

  const amortizationPreview = useMemo(() => {
    const rows: Array<{ month: number; principal: number; interest: number; balance: number }> = [];
    let balance = Math.max(0, loanAmount);
    for (let month = 1; month <= Math.min(12, tenureMonths); month += 1) {
      const interestComponent = monthlyRate === 0 ? 0 : balance * monthlyRate;
      const principalComponent = Math.min(balance, Math.max(0, baseEmi - interestComponent));
      balance = Math.max(0, balance - principalComponent);
      rows.push({
        month,
        principal: principalComponent,
        interest: interestComponent,
        balance
      });
    }
    return rows;
  }, [loanAmount, tenureMonths, baseEmi, monthlyRate]);

  const contentData = {
    title: 'Loan Tenure Converter India 2026: Years to Months, EMI to Tenure, and Prepayment Planner',
    description:
      "This Loan Tenure Converter is built for Indian borrowers who want more than a simple years-to-months conversion. Most calculators only show one number conversion and stop there. In real life, loan decisions are not that simple. A borrower usually wants to know three things together: first, how tenure in years converts to months and changes EMI; second, what tenure is possible for a target EMI; and third, how much time and interest can be saved using prepayment strategy. This page solves all three in one place.\n\nWhy this matters in 2026: lenders may advertise low EMI, but low EMI often means long tenure and much higher total interest payout. If you are planning home loan, personal loan, education loan, business loan, car loan, or balance transfer, tenure optimization is one of the highest-impact decisions. A one-year difference can significantly change total repayment. When borrowers focus only on EMI affordability and ignore tenure length, they often overpay interest for many years.\n\nThis calculator provides three advanced modes. Convert mode helps you switch between years and months while instantly viewing EMI, total interest, and total payment at selected rate and principal. EMI-to-Tenure mode helps answer a practical question: if your affordable EMI is fixed, what tenure will your loan actually require? Prepayment Impact mode helps you estimate savings from extra monthly prepayment and one-time part payment at a chosen month.\n\nThe UI is designed for fast scenario planning. You can compare base case and improved case without opening multiple tools. It also includes affordability context through FOIR-style checks, where your existing EMI obligations and monthly income are considered. This supports safer borrowing decisions and avoids overleveraging.\n\nHow to use for home loans: start with Convert mode, enter principal and expected rate, then test tenures such as 15, 20, 25, and 30 years. Observe interest expansion as tenure rises. Next, switch to EMI-to-Tenure mode and enter a realistic EMI based on your post-tax income and existing commitments. Finally, use Prepayment mode to test whether a small monthly top-up and annual bonus-linked part payment can reduce tenure by years.\n\nHow to use for personal loans and business loans: short-tenure products often carry higher rates than secured loans. A minor EMI increase can cut interest sharply because tenure compression works strongly in early months. Use this page to evaluate whether choosing a shorter tenure now is better than carrying a low EMI for too long.\n\nSEO intent coverage for users searching in India includes: loan tenure calculator India, convert loan tenure years to months, calculate loan tenure from EMI and interest rate, home loan tenure reduction calculator, prepayment impact on loan tenure India, best loan tenure for low interest cost, EMI affordability and tenure planner India, and loan tenure converter with prepayment.\n\nCommon borrower mistakes this page helps prevent: selecting maximum tenure by default, underestimating total interest burden, overestimating safe EMI, delaying prepayment planning, and ignoring the compounding effect of rate changes. If you are comparing lenders, combine this page with a loan comparison tool to include processing fee and other charges.\n\nPractical strategy for ranking and financial outcomes is similar: provide complete answers, not partial data. For users, complete answer means conversion + affordability + savings simulation. For search engines, complete answer means high-intent content, clear structure, useful examples, accurate formulas, and internal references to related calculators.\n\nThis tool is educational and planning-focused. Final sanction terms vary by lender policies, profile, credit score, and product type. Always verify sanction letter and amortization schedule before signing.",
    benefits: [
      '3-in-1 utility: convert tenure, solve tenure from target EMI, and estimate prepayment savings in one workflow.',
      'Shows EMI, total interest, and total repayment together so users do not optimize only for low EMI.',
      'FOIR-style affordability view adds monthly income and existing EMI context for safer borrowing decisions.',
      'Prepayment strategy simulation supports both extra monthly payment and one-time lump-sum part payment.',
      'Amortization preview table helps users understand interest-heavy early installments.',
      'Useful across home loan, personal loan, business loan, education loan, and vehicle loan planning.',
      'India-first UI with INR formatting, practical ranges, and goal-driven interpretation blocks.',
      'Supports 2026 search intent with long-tail keyword-aligned educational sections for better discoverability.'
    ],
    howToSteps: [
      {
        step: 'Choose a mode based on your decision stage',
        details:
          'Use Convert mode if you are exploring years-to-months impact. Use EMI-to-Tenure mode if you have a fixed monthly budget. Use Prepayment Impact mode if you already have a running or planned loan and want to finish earlier.'
      },
      {
        step: 'Enter principal and realistic annual interest rate',
        details:
          'Input sanctioned or planned principal and lender-quoted annual rate. If your rate may reset, test multiple scenarios such as base rate and stress rate to avoid over-optimistic planning.'
      },
      {
        step: 'Evaluate tenure and total interest together',
        details:
          'Do not finalize tenure by EMI alone. Compare how total interest expands when tenure is stretched. A manageable EMI with extremely high interest outgo may not be efficient in long-term wealth planning.'
      },
      {
        step: 'Use affordability and FOIR checks',
        details:
          'Enter monthly income and existing obligations to see whether your selected EMI is within prudent range. Lower stress improves repayment consistency and protects emergency savings.'
      },
      {
        step: 'Simulate prepayment strategy before final decision',
        details:
          'Test extra monthly contribution and one-time prepayment at bonus months. Even moderate additional amounts can cut repayment years and interest burden significantly.'
      }
    ],
    examples: [
      {
        scenario: 'Home loan tenure optimization',
        inputs: [
          { label: 'Loan Amount', value: 'INR 45,00,000' },
          { label: 'Interest Rate', value: '8.6% p.a.' },
          { label: 'Tenure options', value: '20 years vs 25 years' }
        ],
        result: 'Longer tenure lowers EMI but increases total interest materially over full repayment cycle.',
        explanation:
          'A borrower selecting 25 years only for lower EMI may pay substantially higher interest than a 20-year plan. This tool makes the trade-off visible and supports balanced decision-making.'
      },
      {
        scenario: 'Tenure from target EMI',
        inputs: [
          { label: 'Loan Amount', value: 'INR 12,00,000' },
          { label: 'Interest Rate', value: '11.5% p.a.' },
          { label: 'Target EMI', value: 'INR 28,000' }
        ],
        result: 'Calculated tenure helps decide whether budget is realistic or EMI needs adjustment.',
        explanation:
          'Instead of guessing duration, user gets computed repayment period from EMI capacity. This reduces decision errors while comparing offers from banks and NBFCs.'
      },
      {
        scenario: 'Prepayment savings planning',
        inputs: [
          { label: 'Loan Amount', value: 'INR 30,00,000' },
          { label: 'Base Tenure', value: '20 years' },
          { label: 'Strategy', value: 'INR 5,000 extra EMI + INR 2,00,000 one-time prepayment in year 3' }
        ],
        result: 'Tenure can reduce by multiple months/years and interest burden can drop significantly.',
        explanation:
          'Combining monthly and lump-sum prepayment often improves outcomes more than using one method alone. This mode helps users test such combinations before execution.'
      }
    ],
    tips: [
      'Start with EMI affordability, but finalize using total interest and repayment horizon together.',
      'Use stress testing: run +1% to +2% interest scenarios before locking tenure.',
      'Keep emergency fund separate; do not choose aggressive EMI that leaves no liquidity.',
      'If loan allows part prepayment without heavy penalty, schedule planned prepayments early.',
      'When income grows, convert increments into extra EMI instead of lifestyle inflation alone.',
      'Review amortization annually and revise strategy after salary revisions or bonus.',
      'For floating rate loans, tenure can drift upward; monitor and rebalance periodically.',
      'Compare lender charges separately using loan comparison tools for full true-cost view.'
    ],
    mistakes: [
      'Choosing maximum tenure by default without checking total interest impact.',
      'Assuming lower EMI always means a better loan.',
      'Ignoring existing obligations while deciding EMI affordability.',
      'Failing to test interest-rate increase scenarios for floating rate loans.',
      'Not using bonus/lump sum for early principal reduction.',
      'Comparing only interest rate and ignoring fees or processing costs.',
      'Skipping annual review of remaining tenure and outstanding principal.',
      'Treating conversion output as final sanction; lender terms can differ.'
    ],
    faqs: [
      {
        question: 'What is the difference between loan tenure in years and months?',
        answer:
          'Years and months are two ways of representing the same repayment period. Lenders usually compute EMI using months. For example, 20 years equals 240 months. Converting correctly is important because EMI and interest calculations depend on month-level compounding.'
      },
      {
        question: 'How is tenure calculated from EMI?',
        answer:
          'The calculator uses standard reducing-balance math. Given principal, monthly interest rate, and EMI, tenure is solved using logarithmic formula. If EMI is too low to cover monthly interest, tenure is not feasible and the tool prompts that case.'
      },
      {
        question: 'Why does longer tenure increase total interest so much?',
        answer:
          'Because interest keeps accruing over a larger number of months. Even if EMI is lower, repayment lasts longer and cumulative interest rises. That is why tenure optimization is one of the most effective ways to reduce total loan cost.'
      },
      {
        question: 'Is prepayment always beneficial?',
        answer:
          'In many cases yes, especially when done early in tenure, but users should check prepayment charges, tax treatment, and liquidity needs. This tool helps estimate potential savings before taking final action.'
      },
      {
        question: 'What is a safe EMI-to-income range?',
        answer:
          'Many borrowers and advisors use FOIR-like discipline, often aiming that total EMI obligations remain around 35% to 45% of monthly income depending on profile. Final lender thresholds vary by product and risk policy.'
      },
      {
        question: 'Can I use this for personal, business, and education loans too?',
        answer:
          'Yes. The formulas apply across most reducing-balance loans. You can use different rates and tenures to model each product and then compare affordability and long-term interest cost.'
      }
    ],
    relatedCalculators: [
      { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'Calculate EMI from principal, rate, and tenure' },
      { name: 'Loan Comparison Calculator', url: '/calculators/loan-comparison-calculator', description: 'Compare lender offers and total repayment cost' },
      { name: 'Loan Prepayment Calculator', url: '/calculators/loan-prepayment-calculator', description: 'Estimate savings from part prepayment' },
      { name: 'Loan Affordability Calculator', url: '/calculators/loan-affordability-calculator', description: 'Check safe borrowing capacity by income' },
      { name: 'Interest Rate Converter', url: '/calculators/interest-rate-converter', description: 'Convert effective and nominal rates' },
      { name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator', description: 'Model home loan repayment in detail' }
    ],
    lastUpdated: '2026-02-12'
  };

  return (
    <>
      <SEOHelmet
        title="Loan Tenure Converter India 2026 - Years to Months, EMI to Tenure, Prepayment Impact | MoneyCal"
        description="Advanced loan tenure converter for India. Convert years to months, calculate tenure from EMI, and estimate prepayment impact on loan duration and total interest."
        keywords="loan tenure converter india 2026, years to months loan tenure calculator, loan tenure from emi calculator, home loan tenure reduction calculator, prepayment impact on tenure india, best loan tenure calculator india, emi affordability loan planner, reducing interest loan strategy"
        url="/calculators/loan-tenure-converter"
      />
      <CalculatorSchema
        name="Loan Tenure Converter India - EMI, Tenure, and Prepayment Planner"
        description="Convert loan tenure, solve tenure from target EMI, and calculate savings from prepayment strategies for Indian borrowers."
        url="/calculators/loan-tenure-converter"
        features={[
          'Years to months loan tenure conversion',
          'Calculate tenure from target EMI',
          'Prepayment impact simulation',
          'FOIR-style EMI affordability check',
          'Amortization preview (first 12 months)',
          'Interest and total payment comparison',
          'India-ready loan planning inputs',
          'Free online tenure calculator'
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-12"
        rating={{ value: 4.9, count: 12950 }}
      />

      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
          Loan Tenure Converter & Optimizer
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              <p className="text-sm font-medium text-neutral-700 mb-2">Select Mode</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setMode('convert')}
                  className={`px-3 py-2 rounded-md text-sm font-medium border ${mode === 'convert' ? 'bg-[--primary-100] text-[--primary-800] border-[--primary-200]' : 'bg-white text-neutral-700 border-neutral-300'
                    }`}
                >
                  Convert
                </button>
                <button
                  onClick={() => setMode('emi-to-tenure')}
                  className={`px-3 py-2 rounded-md text-sm font-medium border ${mode === 'emi-to-tenure'
                      ? 'bg-[--primary-100] text-[--primary-800] border-[--primary-200]'
                      : 'bg-white text-neutral-700 border-neutral-300'
                    }`}
                >
                  EMI to Tenure
                </button>
                <button
                  onClick={() => setMode('prepayment-impact')}
                  className={`px-3 py-2 rounded-md text-sm font-medium border ${mode === 'prepayment-impact'
                      ? 'bg-[--primary-100] text-[--primary-800] border-[--primary-200]'
                      : 'bg-white text-neutral-700 border-neutral-300'
                    }`}
                >
                  Prepayment Impact
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-2 block">Tenure Input Type</label>
                <div className="flex gap-3">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium border ${tenureType === 'years' ? 'bg-[--primary-100] text-[--primary-800] border-[--primary-200]' : 'bg-white text-neutral-700 border-neutral-300'
                      }`}
                    onClick={() => setTenureType('years')}
                  >
                    Years
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium border ${tenureType === 'months' ? 'bg-[--primary-100] text-[--primary-800] border-[--primary-200]' : 'bg-white text-neutral-700 border-neutral-300'
                      }`}
                    onClick={() => setTenureType('months')}
                  >
                    Months
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="tenure-input" className="block text-sm font-medium text-neutral-700 mb-2">
                  Loan Tenure ({tenureType === 'years' ? 'Years' : 'Months'})
                </label>
                <input
                  id="tenure-input"
                  type="number"
                  value={tenureInput}
                  onChange={(e) => setTenureInput(Number(e.target.value))}
                  className="input"
                  min={tenureType === 'years' ? 1 : 6}
                  max={tenureType === 'years' ? 40 : 480}
                />
              </div>

              <div>
                <label htmlFor="loan-amount" className="block text-sm font-medium text-neutral-700 mb-2">
                  Loan Amount (INR)
                </label>
                <input
                  id="loan-amount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="input"
                  min={10000}
                  step={10000}
                />
              </div>

              <div>
                <label htmlFor="interest-rate" className="block text-sm font-medium text-neutral-700 mb-2">
                  Interest Rate (% p.a.)
                </label>
                <input
                  id="interest-rate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="input"
                  min={0}
                  max={40}
                  step={0.01}
                />
              </div>

              {mode === 'emi-to-tenure' && (
                <div>
                  <label htmlFor="target-emi" className="block text-sm font-medium text-neutral-700 mb-2">
                    Target EMI (INR)
                  </label>
                  <input
                    id="target-emi"
                    type="number"
                    value={targetEmi}
                    onChange={(e) => setTargetEmi(Number(e.target.value))}
                    className="input"
                    min={500}
                    step={500}
                  />
                </div>
              )}

              {mode === 'prepayment-impact' && (
                <>
                  <div>
                    <label htmlFor="extra-monthly" className="block text-sm font-medium text-neutral-700 mb-2">
                      Extra Monthly Prepayment (INR)
                    </label>
                    <input
                      id="extra-monthly"
                      type="number"
                      value={extraMonthlyPrepayment}
                      onChange={(e) => setExtraMonthlyPrepayment(Number(e.target.value))}
                      className="input"
                      min={0}
                      step={500}
                    />
                  </div>
                  <div>
                    <label htmlFor="one-time-prepay" className="block text-sm font-medium text-neutral-700 mb-2">
                      One-time Part Prepayment (INR)
                    </label>
                    <input
                      id="one-time-prepay"
                      type="number"
                      value={oneTimePrepayment}
                      onChange={(e) => setOneTimePrepayment(Number(e.target.value))}
                      className="input"
                      min={0}
                      step={10000}
                    />
                  </div>
                  <div>
                    <label htmlFor="prepay-month" className="block text-sm font-medium text-neutral-700 mb-2">
                      One-time Prepayment After (Months)
                    </label>
                    <input
                      id="prepay-month"
                      type="number"
                      value={prepaymentAfterMonths}
                      onChange={(e) => setPrepaymentAfterMonths(Number(e.target.value))}
                      className="input"
                      min={1}
                      max={Math.max(2, tenureMonths - 1)}
                    />
                  </div>
                </>
              )}

              <div className="bg-[--accent-50] border border-[--accent-100] rounded-lg p-4">
                <h3 className="text-sm font-semibold text-[--accent-900] mb-2 flex items-center">
                  <Sliders className="w-4 h-4 mr-2" />
                  EMI Affordability Context
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="monthly-income" className="block text-xs text-[--accent-700] mb-1">
                      Monthly Income (INR)
                    </label>
                    <input
                      id="monthly-income"
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="input"
                      min={0}
                    />
                  </div>
                  <div>
                    <label htmlFor="other-emis" className="block text-xs text-[--accent-700] mb-1">
                      Existing EMI Obligations (INR)
                    </label>
                    <input
                      id="other-emis"
                      type="number"
                      value={otherEmis}
                      onChange={(e) => setOtherEmis(Number(e.target.value))}
                      className="input"
                      min={0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-[--primary-50] rounded-lg border border-[--primary-100]">
              <h3 className="text-lg font-semibold text-[--primary-900] mb-3">Core Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500 mb-1">Converted Tenure</p>
                  <p className="text-lg font-bold text-neutral-900">
                    {tenureType === 'years' ? `${convertedValue} months` : `${convertedValue.toFixed(2)} years`}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500 mb-1">Monthly EMI</p>
                  <p className="text-lg font-bold text-neutral-900">{formatCurrency(baseEmi)}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500 mb-1">Total Interest</p>
                  <p className="text-lg font-bold text-[--primary-900]">{formatCurrency(baseTotalInterest)}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500 mb-1">Total Payment</p>
                  <p className="text-lg font-bold text-[--primary-900]">{formatCurrency(baseTotalPayment)}</p>
                </div>
              </div>
            </div>

            {mode === 'emi-to-tenure' && (
              <div className="p-5 bg-[--success-50] rounded-lg border border-[--success-200]">
                <h3 className="text-lg font-semibold text-[--success-900] mb-3">EMI to Tenure Result</h3>
                {solvedTenureMonths === null ? (
                  <p className="text-sm text-[--success-800]">
                    Target EMI is too low for this principal and interest rate. Increase EMI or reduce loan amount.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-neutral-500 mb-1">Solved Tenure</p>
                      <p className="text-lg font-bold text-[--success-900]">{getYearsMonthsText(solvedTenureMonths)}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-neutral-500 mb-1">Rounded Months</p>
                      <p className="text-lg font-bold text-[--success-900]">{Math.ceil(solvedTenureMonths)} months</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {mode === 'prepayment-impact' && (
              <div className="p-5 bg-[--accent-50] rounded-lg border border-[--accent-100]">
                <h3 className="text-lg font-semibold text-[--accent-900] mb-3 flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Prepayment Impact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-neutral-500 mb-1">New EMI (with extra)</p>
                    <p className="text-lg font-bold text-[--accent-900]">{formatCurrency(prepaymentImpact.enhancedEmi)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-neutral-500 mb-1">Tenure with Extra EMI</p>
                    <p className="text-lg font-bold text-[--accent-900]">
                      {prepaymentImpact.monthsWithExtra ? getYearsMonthsText(prepaymentImpact.monthsWithExtra) : 'Not available'}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-neutral-500 mb-1">Tenure Saved</p>
                    <p className="text-lg font-bold text-[--accent-900]">{getYearsMonthsText(prepaymentImpact.tenureSavedMonths)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-neutral-500 mb-1">Interest Saved</p>
                    <p className="text-lg font-bold text-[--accent-900]">{formatCurrency(prepaymentImpact.interestSavedVsBase)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 sm:col-span-2">
                    <p className="text-xs text-neutral-500 mb-1">Estimated Tenure Saved from One-time Prepayment</p>
                    <p className="text-lg font-bold text-[--accent-900]">{getYearsMonthsText(prepaymentImpact.lumpSumSavedMonths)}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-5 bg-neutral-50 rounded-lg border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
                Affordability Indicators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500 mb-1">Current FOIR</p>
                  <p className="text-lg font-bold text-neutral-900">{affordability.currentFoir.toFixed(1)}%</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500 mb-1">Max EMI (45% rule)</p>
                  <p className="text-lg font-bold text-neutral-900">{formatCurrency(affordability.maxAffordableEmi)}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-neutral-500 mb-1">Comfort EMI (35% rule)</p>
                  <p className="text-lg font-bold text-neutral-900">{formatCurrency(affordability.suggestedSafeEmi)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <CalendarDays className="w-5 h-5 mr-2 text-[--primary-600]" />
                First 12 Months Amortization Preview
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-neutral-200">
                      <th className="py-2 pr-3">Month</th>
                      <th className="py-2 pr-3">Principal</th>
                      <th className="py-2 pr-3">Interest</th>
                      <th className="py-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationPreview.map((row) => (
                      <tr key={row.month} className="border-b border-neutral-100">
                        <td className="py-2 pr-3">{row.month}</td>
                        <td className="py-2 pr-3">{formatCurrency(row.principal)}</td>
                        <td className="py-2 pr-3">{formatCurrency(row.interest)}</td>
                        <td className="py-2">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 flex items-start">
              <Info className="w-5 h-5 text-yellow-700 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                Planning tip: If your EMI is comfortable, prefer moderate tenure compression and systematic prepayment to cut interest without straining monthly cash flow.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <CheckCircle2 className="w-5 h-5 mr-2 text-[--primary-600]" />
            Loan Tenure Strategy Summary
          </h2>
          <ul className="list-disc list-inside text-sm text-neutral-700 space-y-2">
            <li>Short tenure -&gt; higher EMI, lower interest, faster loan closure.</li>
            <li>Long tenure -&gt; lower EMI, higher cumulative interest cost.</li>
            <li>EMI top-up and timely part prepayment can reduce tenure meaningfully.</li>
            <li>Always align tenure with job stability, cash reserve, and future obligations.</li>
          </ul>
        </div>

        <CalculatorContentWrapper {...contentData} />
      </div>
    </>
  );
};