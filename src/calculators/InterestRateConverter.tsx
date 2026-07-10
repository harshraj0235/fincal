import React, { useMemo, useState } from 'react';
import { Percent } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorSchema } from '../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

const toMonthlyRate = (annualNominal: number) => annualNominal / 1200;
const toAnnualNominalFromMonthly = (monthlyRate: number) => monthlyRate * 1200;

const emiForRate = (principal: number, annualNominal: number, months: number) => {
  const r = toMonthlyRate(annualNominal);
  if (r <= 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
};

const totalInterestReducing = (principal: number, annualNominal: number, months: number) =>
  emiForRate(principal, annualNominal, months) * months - principal;

const findReducingFromFlat = (principal: number, flatRate: number, months: number) => {
  const years = months / 12;
  const targetInterest = principal * (flatRate / 100) * years;
  let low = 0;
  let high = 100;
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const interest = totalInterestReducing(principal, mid, months);
    if (interest > targetInterest) {
      high = mid;
    } else {
      low = mid;
    }
  }
  return (low + high) / 2;
};

const flatFromReducing = (principal: number, reducingRate: number, months: number) => {
  const years = months / 12;
  if (years <= 0 || principal <= 0) return 0;
  const totalInterest = totalInterestReducing(principal, reducingRate, months);
  return (totalInterest / (principal * years)) * 100;
};

export const InterestRateConverter: React.FC = () => {
  const [rateType, setRateType] = useState<'flat' | 'reducing' | 'apr' | 'eir'>('flat');
  const [rate, setRate] = useState<number>(10);
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [tenure, setTenure] = useState<number>(12);
  const convertedRates = useMemo(() => {
    const months = Math.max(1, Math.round(tenure));
    let reducingRate = 0;
    if (rateType === 'flat') reducingRate = findReducingFromFlat(Math.max(loanAmount, 1), Math.max(rate, 0), months);
    if (rateType === 'reducing' || rateType === 'apr') reducingRate = Math.max(rate, 0);
    if (rateType === 'eir') {
      const monthly = Math.pow(1 + Math.max(rate, 0) / 100, 1 / 12) - 1;
      reducingRate = toAnnualNominalFromMonthly(monthly);
    }

    const monthlyReducing = toMonthlyRate(reducingRate);
    const eir = (Math.pow(1 + monthlyReducing, 12) - 1) * 100;
    const flat = flatFromReducing(Math.max(loanAmount, 1), reducingRate, months);
    const apr = reducingRate;

    return { flat, reducing: reducingRate, apr, eir };
  }, [loanAmount, rate, rateType, tenure]);

  const monthlyEmi = useMemo(
    () => emiForRate(Math.max(loanAmount, 1), convertedRates.reducing, Math.max(1, Math.round(tenure))),
    [convertedRates.reducing, loanAmount, tenure]
  );

  const contentData = {
    title: 'Interest Rate Converter',
    description:
      'Convert flat, reducing, APR, and effective annual rates to compare loans fairly. This tool helps borrowers avoid misleading comparisons by standardizing rate formats.',
    benefits: [
      'Converts between common rate formats in seconds',
      'Improves loan offer comparison quality',
      'Shows true annualized impact using EIR',
      'Useful for personal and business borrowing decisions',
    ],
    howToSteps: [
      { step: 'Select input rate type', details: 'Choose flat, reducing, APR, or effective annual as your base input.' },
      { step: 'Enter rate, principal, and tenure', details: 'Tenure influences flat-to-reducing equivalence.' },
      { step: 'Compare converted outputs', details: 'Use reducing/APR/EIR to compare competing loan quotes on the same basis.' },
    ],
    tips: [
      'Always compare loans using reducing or APR/EIR basis.',
      'Flat rates usually look lower but may cost more.',
      'Check processing fees separately; APR may include additional charges depending on lender policy.',
    ],
    mistakes: [
      'Comparing flat rate from one lender with reducing rate from another',
      'Ignoring compounding effect when evaluating true cost',
      'Choosing low EMI without checking total interest outgo',
    ],
    faqs: [
      {
        question: 'What is the difference between reducing and flat interest?',
        answer:
          'Flat interest is calculated on original principal for full tenure, while reducing interest is calculated on declining outstanding balance. Reducing is usually more transparent for EMI products.',
      },
      {
        question: 'Why should I check EIR?',
        answer:
          'EIR includes compounding effect and gives a truer annualized borrowing cost. It is helpful when comparing products with different compounding structures.',
      },
    ],
    relatedCalculators: [
      { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'Estimate EMI and total interest' },
      { name: 'Loan Comparison Calculator', url: '/calculators/loan-comparison-calculator', description: 'Compare two loan offers side-by-side' },
      { name: 'Personal Loan Calculator', url: '/calculators/personal-loan-calculator', description: 'Plan repayment for unsecured borrowing' },
    ],
    lastUpdated: '2026-02-11',
  };

  return (
    <>
      <SEOHelmet
        title="Interest Rate Converter India 2026 - Flat, Reducing, APR, EIR | MoneyCal"
        description="Convert flat rate, reducing rate, APR, and effective annual rate (EIR) online. Compare loan interest rates fairly before choosing a lender."
        keywords="interest rate converter india, flat to reducing interest converter, apr to eir calculator, loan rate comparison tool, reducing balance interest converter"
        url="/calculators/interest-rate-converter"
      />
      <CalculatorSchema
        name="Interest Rate Converter India"
        description="Convert flat, reducing, APR, and EIR interest rates for better loan comparisons."
        url="/calculators/interest-rate-converter"
        features={['Rate type conversion', 'Loan tenure based equivalence', 'APR and EIR comparison']}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-11"
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Percent className="w-5 h-5 mr-2 text-[--primary-600]" />
          Interest Rate Conversion
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Rate Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  rateType === 'flat'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setRateType('flat')}
              >
                Flat Rate
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  rateType === 'reducing'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setRateType('reducing')}
              >
                Reducing Rate
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  rateType === 'apr'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setRateType('apr')}
              >
                APR
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  rateType === 'eir'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setRateType('eir')}
              >
                EIR
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="rate" className="block text-sm font-medium text-neutral-700 mb-2">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="input"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          
          <div>
            <label htmlFor="loan-amount" className="block text-sm font-medium text-neutral-700 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              id="loan-amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="input"
              min="0"
              step="1000"
            />
          </div>
          
          <div>
            <label htmlFor="tenure" className="block text-sm font-medium text-neutral-700 mb-2">
              Loan Tenure (Months)
            </label>
            <input
              type="number"
              id="tenure"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="input"
              min="1"
              max="360"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Converted Rates</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Flat Rate</p>
              <p className="text-xl font-bold text-neutral-900">{convertedRates.flat.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">Reducing Balance</p>
              <p className="text-xl font-bold text-neutral-900">{convertedRates.reducing.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">APR</p>
              <p className="text-xl font-bold text-neutral-900">{convertedRates.apr.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">EIR</p>
              <p className="text-xl font-bold text-neutral-900">{convertedRates.eir.toFixed(2)}%</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[--primary-200]">
            <p className="text-sm text-neutral-600">Approx. EMI at reducing rate</p>
            <p className="text-2xl font-bold text-[--primary-900]">
              ₹{Math.round(monthlyEmi).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Percent className="w-5 h-5 mr-2 text-[--primary-600]" />
            Interest Rate Types
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Flat Rate</h3>
              <p className="text-sm text-neutral-600">
                Interest is calculated on the full loan amount throughout the loan tenure. 
                This method typically results in higher effective interest rates.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Reducing Balance</h3>
              <p className="text-sm text-neutral-600">
                Interest is calculated on the remaining principal amount after each EMI payment. 
                This is the most common method used for loans.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Annual Percentage Rate (APR)</h3>
              <p className="text-sm text-neutral-600">
                Includes the interest rate plus other costs like processing fees and insurance premiums. 
                Provides a more comprehensive view of borrowing costs.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Effective Interest Rate (EIR)</h3>
              <p className="text-sm text-neutral-600">
                Takes into account the compounding effect of interest and shows the actual cost of borrowing 
                on an annual basis.
              </p>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Always compare loans using the same interest rate type</li>
                <li>EIR is typically higher than the nominal interest rate</li>
                <li>Flat rates appear lower but result in higher interest payments</li>
                <li>Consider all fees and charges when comparing loans</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-10">
      <CalculatorContentWrapper {...contentData} />
    </div>
    </>
  );
};