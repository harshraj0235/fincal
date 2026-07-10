import React, { useMemo, useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { CalculatorSchema } from '../../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';
import { AlertTriangle, BarChart3, DollarSign, IndianRupee, Sliders, TrendingUp } from 'lucide-react';

const emiFromReducingRate = (principal: number, annualRate: number, tenureMonths: number) => {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / Math.max(1, tenureMonths);
  const factor = Math.pow(1 + r, tenureMonths);
  return (principal * r * factor) / (factor - 1);
};

const findEquivalentReducingRate = (principal: number, tenureMonths: number, targetEmi: number) => {
  let low = 0;
  let high = 100;
  for (let i = 0; i < 80; i += 1) {
    const mid = (low + high) / 2;
    const emi = emiFromReducingRate(principal, mid, tenureMonths);
    if (emi > targetEmi) high = mid;
    else low = mid;
  }
  return (low + high) / 2;
};

const FlatRateCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [flatRate, setFlatRate] = useState(12);
  const [loanTenureYears, setLoanTenureYears] = useState(5);
  const [processingFeePct, setProcessingFeePct] = useState(1);
  const [gstOnFeePct, setGstOnFeePct] = useState(18);
  const [prepaymentAtMonth, setPrepaymentAtMonth] = useState(24);
  const [prepaymentAmount, setPrepaymentAmount] = useState(100000);

  const result = useMemo(() => {
    const tenureMonths = Math.max(1, Math.round(loanTenureYears * 12));
    const flatInterest = loanAmount * (flatRate / 100) * loanTenureYears;
    const totalWithoutFees = loanAmount + flatInterest;
    const flatEmi = totalWithoutFees / tenureMonths;

    const fee = loanAmount * (processingFeePct / 100);
    const feeTax = fee * (gstOnFeePct / 100);
    const upfrontCost = fee + feeTax;
    const trueCost = totalWithoutFees + upfrontCost;

    const reducingEmiAtSameRate = emiFromReducingRate(loanAmount, flatRate, tenureMonths);
    const reducingTotalPaymentAtSameRate = reducingEmiAtSameRate * tenureMonths;
    const reducingInterestAtSameRate = reducingTotalPaymentAtSameRate - loanAmount;
    const extraCostVsReducing = totalWithoutFees - reducingTotalPaymentAtSameRate;
    const equivalentReducingRate = findEquivalentReducingRate(loanAmount, tenureMonths, flatEmi);

    const monthlyInterestFlat = flatInterest / tenureMonths;
    const monthlyPrincipalFlat = loanAmount / tenureMonths;
    const prepayMonth = Math.min(Math.max(1, Math.round(prepaymentAtMonth)), tenureMonths);
    const paidPrincipalBeforePrepay = monthlyPrincipalFlat * prepayMonth;
    const outstandingPrincipalFlat = Math.max(0, loanAmount - paidPrincipalBeforePrepay);
    const prepayApplied = Math.min(Math.max(0, prepaymentAmount), outstandingPrincipalFlat);
    const revisedPrincipal = outstandingPrincipalFlat - prepayApplied;
    const remainingMonths = Math.max(0, tenureMonths - prepayMonth);
    const revisedMonthlyPrincipal = remainingMonths > 0 ? revisedPrincipal / remainingMonths : 0;
    const revisedEmiAfterPrepay = revisedMonthlyPrincipal + monthlyInterestFlat;
    const totalInterestSavedByPrepay = prepayApplied * (flatRate / 100) * (remainingMonths / 12);

    return {
      tenureMonths,
      flatInterest,
      flatEmi,
      totalWithoutFees,
      fee,
      feeTax,
      upfrontCost,
      trueCost,
      reducingEmiAtSameRate,
      reducingInterestAtSameRate,
      extraCostVsReducing,
      equivalentReducingRate,
      prepayMonth,
      outstandingPrincipalFlat,
      prepayApplied,
      revisedEmiAfterPrepay,
      totalInterestSavedByPrepay
    };
  }, [loanAmount, flatRate, loanTenureYears, processingFeePct, gstOnFeePct, prepaymentAtMonth, prepaymentAmount]);

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const contentData = {
    title: 'Flat Rate Interest Calculator India 2026',
    description: `This flat rate interest calculator is built for Indian borrowers who want to understand the real cost behind "low-looking" flat-rate offers from NBFCs, dealer finance desks, and some personal loan channels. In flat-rate loans, interest is charged on the full original principal for the entire tenure, unlike reducing-balance loans where interest drops as principal reduces. That difference can significantly change your total repayment.\n\nMost borrowers compare only EMI and miss the hidden cost. This tool solves that problem by showing flat EMI, total interest, true cost with processing fees and GST, equivalent reducing rate, and a direct comparison against reducing-balance repayment. You can also test prepayment impact.\n\nWhy this is important in India: many two-wheeler, consumer durable, and short-tenure personal loans are quoted as flat rates. A flat rate of 12% may look similar to a reducing rate of 12%, but the effective burden is often much higher. This page helps users evaluate offers with transparency before signing.\n\nHow to use: enter loan amount, flat annual rate, tenure, and upfront fee assumptions. Review equivalent reducing rate and extra cost versus reducing method. Then test part prepayment to evaluate whether reducing outstanding principal can save interest. This helps in practical decisions for borrowers comparing lender offers.\n\nKeyword intent covered: flat rate calculator India, flat vs reducing interest calculator, effective interest rate for flat loan, true cost of flat interest loan India, two wheeler flat rate calculator, NBFC flat rate EMI calculator.`,
    benefits: [
      'Calculates flat-rate EMI and total interest instantly.',
      'Shows equivalent reducing-balance annual rate for fair comparison.',
      'Includes processing fee + GST impact for true borrowing cost.',
      'Compares flat method cost with reducing method at same nominal annual rate.',
      'Estimates prepayment impact in flat-rate structure.',
      'Useful for India-specific two-wheeler, consumer, and personal loan decisions.',
      'Helps identify misleadingly low-looking flat-rate quotes.',
      'Supports scenario analysis before selecting lender offer.'
    ],
    howToSteps: [
      { step: 'Enter principal, flat rate, and tenure', details: 'Use sanction sheet values where possible.' },
      { step: 'Add fee assumptions', details: 'Include processing fee and GST to reflect true entry cost.' },
      { step: 'Review equivalent reducing rate', details: 'Use this metric to compare with bank/NBFC reducing-rate offers.' },
      { step: 'Check extra cost vs reducing model', details: 'This indicates the additional amount paid due to flat structure.' },
      { step: 'Test prepayment timing', details: 'Estimate possible savings and revised installment burden.' }
    ],
    examples: [
      {
        scenario: 'Two-wheeler finance quote validation',
        inputs: [
          { label: 'Loan Amount', value: 'INR 1,20,000' },
          { label: 'Flat Rate', value: '10% p.a.' },
          { label: 'Tenure', value: '36 months' }
        ],
        result: 'Equivalent reducing rate is much higher than headline flat rate.',
        explanation: 'Borrower can compare this with reducing-balance offers from bank channels and avoid hidden cost.'
      }
    ],
    tips: [
      'Always compare equivalent reducing rate, not just flat rate.',
      'Include fee + GST while comparing offers.',
      'Shorter tenure can reduce flat-interest burden.',
      'Use prepayment when contract permits without heavy penalty.',
      'Ask lender if reducing option is available at similar EMI.'
    ],
    mistakes: [
      'Comparing flat and reducing rates directly without conversion.',
      'Ignoring processing charges and taxes.',
      'Choosing only by monthly EMI.',
      'Skipping sanction-sheet fine print on prepayment.',
      'Not stress-testing 12, 24, and 36 month scenarios.'
    ],
    faqs: [
      { question: 'Why is flat-rate loan usually costlier?', answer: 'Because interest is charged on full original principal for whole tenure instead of reducing balance.' },
      { question: 'What is equivalent reducing rate?', answer: 'It is the reducing-balance annual rate that produces nearly the same EMI as the flat-rate setup.' },
      { question: 'Can prepayment help in flat loans?', answer: 'Often yes, but savings depend on contract rules and prepayment month. Always verify lender terms.' },
      { question: 'Which loans in India often use flat-rate quoting?', answer: 'Dealer finance, some NBFC personal loans, and short-ticket product financing commonly use it.' }
    ],
    relatedCalculators: [
      { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'Reducing-balance EMI baseline' },
      { name: 'Loan Comparison Calculator', url: '/calculators/loan-comparison-calculator', description: 'Compare multiple offers side by side' },
      { name: 'Loan Prepayment Calculator', url: '/calculators/loan-prepayment-calculator', description: 'Prepayment savings check' },
      { name: 'Loan Tenure Converter', url: '/calculators/loan-tenure-converter', description: 'Tenure optimization planning' }
    ],
    lastUpdated: '2026-02-12'
  };

  return (
    <>
      <SEOHelmet
        title="Flat Rate Interest Calculator India 2026 | Flat vs Reducing Comparison | MoneyCal"
        description="Advanced flat rate calculator for India. Compare flat vs reducing method, find equivalent reducing rate, estimate true cost with fees and GST, and test prepayment impact."
        keywords="flat rate calculator india, flat vs reducing interest calculator, equivalent reducing rate calculator, true cost flat loan india, two wheeler flat rate emi calculator, nbfc flat interest calculator india"
        url="/loan-tools/flat-rate-calculator"
      />
      <CalculatorSchema
        name="Flat Rate Interest Calculator India"
        description="Calculate flat-rate EMI, equivalent reducing rate, true loan cost with fees, and compare with reducing balance method."
        url="/loan-tools/flat-rate-calculator"
        features={[
          'Flat EMI and total interest calculator',
          'Equivalent reducing-rate conversion',
          'Processing fee + GST true cost layer',
          'Flat vs reducing comparison',
          'Prepayment impact estimate'
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-12"
        rating={{ value: 4.8, count: 10990 }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Flat Rate Calculator (India)</h1>
            <p className="text-lg text-gray-700 mt-2">Compare flat interest loans with reducing-balance reality before you borrow.</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-700 mr-2 mt-0.5" />
            <p className="text-sm text-yellow-800">
              Flat rates can appear low but often map to much higher effective reducing rates. Always compare on equivalent reducing basis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Sliders className="h-5 w-5 mr-2 text-orange-600" />
                Input Panel
              </h2>

              <label className="block text-sm font-medium text-gray-700">
                Loan Amount (INR)
                <input type="number" className="input mt-1" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} min={10000} />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Flat Interest Rate (% p.a.)
                <input type="number" className="input mt-1" value={flatRate} onChange={(e) => setFlatRate(Number(e.target.value))} min={0} max={60} step={0.01} />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Tenure (Years)
                <input type="number" className="input mt-1" value={loanTenureYears} onChange={(e) => setLoanTenureYears(Number(e.target.value))} min={0.5} max={15} step={0.5} />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Processing Fee (% of loan)
                <input type="number" className="input mt-1" value={processingFeePct} onChange={(e) => setProcessingFeePct(Number(e.target.value))} min={0} max={10} step={0.1} />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                GST on Fee (%)
                <input type="number" className="input mt-1" value={gstOnFeePct} onChange={(e) => setGstOnFeePct(Number(e.target.value))} min={0} max={28} step={1} />
              </label>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-orange-50 rounded-lg p-4"><p className="text-xs text-gray-500">Flat EMI</p><p className="text-xl font-bold">{fmt(result.flatEmi)}</p></div>
                <div className="bg-orange-50 rounded-lg p-4"><p className="text-xs text-gray-500">Flat Total Interest</p><p className="text-xl font-bold text-red-600">{fmt(result.flatInterest)}</p></div>
                <div className="bg-orange-50 rounded-lg p-4"><p className="text-xs text-gray-500">Total Without Fees</p><p className="text-xl font-bold">{fmt(result.totalWithoutFees)}</p></div>
                <div className="bg-orange-50 rounded-lg p-4"><p className="text-xs text-gray-500">Upfront Fee + GST</p><p className="text-xl font-bold">{fmt(result.upfrontCost)}</p></div>
                <div className="bg-red-50 rounded-lg p-4 sm:col-span-2"><p className="text-xs text-gray-500">Equivalent Reducing Rate</p><p className="text-2xl font-bold text-red-700">{result.equivalentReducingRate.toFixed(2)}%</p></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Flat vs Reducing (Same Nominal Annual Rate)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="font-semibold text-orange-800 mb-2">Flat Model</p>
                <p className="text-sm text-gray-700">EMI: {fmt(result.flatEmi)}</p>
                <p className="text-sm text-gray-700">Interest: {fmt(result.flatInterest)}</p>
                <p className="text-sm text-gray-700">Total: {fmt(result.totalWithoutFees)}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold text-blue-800 mb-2">Reducing Model</p>
                <p className="text-sm text-gray-700">EMI: {fmt(result.reducingEmiAtSameRate)}</p>
                <p className="text-sm text-gray-700">Interest: {fmt(result.reducingInterestAtSameRate)}</p>
                <p className="text-sm text-gray-700">Total: {fmt(result.reducingEmiAtSameRate * result.tenureMonths)}</p>
              </div>
            </div>
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                Extra cost of flat method vs reducing method (same nominal annual rate): <strong>{fmt(Math.max(0, result.extraCostVsReducing))}</strong>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Prepayment Impact (Flat Model Approximation)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Prepayment Month
                <input type="number" className="input mt-1" value={prepaymentAtMonth} onChange={(e) => setPrepaymentAtMonth(Number(e.target.value))} min={1} max={result.tenureMonths} />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Prepayment Amount (INR)
                <input type="number" className="input mt-1" value={prepaymentAmount} onChange={(e) => setPrepaymentAmount(Number(e.target.value))} min={0} />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="bg-green-50 rounded-lg p-4"><p className="text-xs text-gray-500">Outstanding at month</p><p className="text-lg font-bold">{fmt(result.outstandingPrincipalFlat)}</p></div>
              <div className="bg-green-50 rounded-lg p-4"><p className="text-xs text-gray-500">Interest Saved (est.)</p><p className="text-lg font-bold text-green-700">{fmt(result.totalInterestSavedByPrepay)}</p></div>
              <div className="bg-green-50 rounded-lg p-4"><p className="text-xs text-gray-500">Revised EMI (if same tenure)</p><p className="text-lg font-bold">{fmt(result.revisedEmiAfterPrepay)}</p></div>
            </div>
          </div>

          <CalculatorContentWrapper {...contentData} />
        </div>
      </div>
    </>
  );
};

export default FlatRateCalculator;
