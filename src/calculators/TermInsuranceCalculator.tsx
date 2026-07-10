import React, { useMemo, useState } from 'react';
import { Shield, Sliders, DollarSign, Info } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorSchema } from '../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { formatCurrency } from '../utils/calculatorUtils';

type Gender = 'male' | 'female';
type PaymentFrequency = 'annual' | 'monthly';

const roundToNearestThousand = (value: number) => Math.round(value / 1000) * 1000;

export const TermInsuranceCalculator: React.FC = () => {
  const [age, setAge] = useState(30);
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [coverAmount, setCoverAmount] = useState(10000000);
  const [policyTerm, setPolicyTerm] = useState(30);
  const [gender, setGender] = useState<Gender>('male');
  const [smoker, setSmoker] = useState(false);
  const [criticalIllness, setCriticalIllness] = useState(false);
  const [accidentalDeath, setAccidentalDeath] = useState(false);
  const [waiverOfPremium, setWaiverOfPremium] = useState(false);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('annual');

  const recommendedCover = useMemo(() => {
    const byIncome = annualIncome * 15;
    return roundToNearestThousand(Math.max(byIncome, 5000000));
  }, [annualIncome]);

  const annualPremium = useMemo(() => {
    // This is a planning estimate, not an insurer quote.
    let premium = (coverAmount / 1000) * 0.24;

    premium *= 1 + Math.max(0, age - 25) * 0.035;
    premium *= 1 + Math.max(0, policyTerm - 20) * 0.015;

    if (gender === 'female') premium *= 0.9;
    if (smoker) premium *= 1.65;
    if (criticalIllness) premium *= 1.22;
    if (accidentalDeath) premium *= 1.08;
    if (waiverOfPremium) premium *= 1.07;

    return Math.max(3500, Math.round(premium));
  }, [coverAmount, age, policyTerm, gender, smoker, criticalIllness, accidentalDeath, waiverOfPremium]);

  const periodicPremium = useMemo(() => {
    if (paymentFrequency === 'monthly') return Math.round((annualPremium / 12) * 1.03);
    return annualPremium;
  }, [annualPremium, paymentFrequency]);

  const totalOutgo = useMemo(() => annualPremium * policyTerm, [annualPremium, policyTerm]);

  const contentData = {
    title: 'Term Insurance Calculator India',
    description:
      'Term insurance calculator India to estimate premium, check ideal cover amount, and plan policy term with rider impact. Build a practical protection plan for your family cash flow.',
    benefits: [
      'Estimate term insurance premium for planning before buying',
      'Check recommended cover based on annual income',
      'Model impact of smoker status and policy term',
      'Understand how riders can affect annual premium',
      'Plan premium affordability with monthly or annual mode',
      'Align protection amount with liabilities and dependents',
    ],
    howToSteps: [
      { step: 'Set annual income', details: 'This helps derive a recommended baseline cover amount.' },
      { step: 'Adjust cover amount and term', details: 'Tune sum assured and policy years for your family goals.' },
      { step: 'Select profile and riders', details: 'Smoker status, gender, and riders affect estimated premium.' },
      { step: 'Review premium and total outgo', details: 'Compare annual affordability and long-term payment commitment.' },
    ],
    examples: [
      {
        scenario: 'Salaried parent with home loan',
        inputs: [
          { label: 'Age', value: '32 years' },
          { label: 'Income', value: '₹18,00,000/year' },
          { label: 'Cover', value: '₹1.5 crore' },
        ],
        result: 'Affordable pure-risk protection with predictable outgo',
        explanation: 'Useful when liabilities and child education goals need long-tenure cover.',
      },
      {
        scenario: 'Single non-smoker buying early',
        inputs: [
          { label: 'Age', value: '26 years' },
          { label: 'Income', value: '₹9,00,000/year' },
          { label: 'Cover', value: '₹1 crore' },
        ],
        result: 'Lower premium due to early entry age',
        explanation: 'Buying early generally improves long-term affordability for high cover.',
      },
    ],
    tips: [
      'Buy early to lock lower premiums for long policy terms.',
      'Keep cover aligned with liabilities, goals, and dependents.',
      'Compare claim process quality, not only lowest premium.',
      'Review policy wording and exclusions before purchase.',
      'Increase cover after major life events like marriage or child.',
    ],
    mistakes: [
      'Choosing too little cover only to reduce premium',
      'Ignoring rider costs and policy exclusions',
      'Delaying purchase until health risk increases',
      'Assuming calculator estimate equals final insurer quote',
    ],
    faqs: [
      {
        question: 'How much term insurance cover should I take?',
        answer:
          'A common starting rule is 10x to 15x annual income, then adjust for home loan, education goals, and existing assets.',
      },
      {
        question: 'Why does smoker status change premium so much?',
        answer:
          'Insurers price higher health risk into term plans for smokers, so premiums can be materially higher than non-smoker rates.',
      },
      {
        question: 'Is this calculator premium final?',
        answer:
          'No. It is a planning estimate. Final premium depends on insurer underwriting, medicals, occupation, and plan-specific terms.',
      },
      {
        question: 'Should I choose monthly or annual premium payment?',
        answer:
          'Annual payment is often cheaper overall, while monthly mode can improve short-term cash-flow comfort.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Human Life Value Calculator',
        url: '/calculators/human-life-value-calculator',
        description: 'Estimate ideal protection amount from income replacement lens',
      },
      {
        name: 'Life Insurance Calculator',
        url: '/calculators/life-insurance-calculator',
        description: 'Compare broader life insurance planning',
      },
      {
        name: 'Health Insurance Calculator',
        url: '/calculators/health-insurance-calculator',
        description: 'Plan medical coverage separately from income protection',
      },
    ],
    lastUpdated: '2026-02-12',
  };

  return (
    <>
      <SEOHelmet
        title="Term Insurance Calculator India 2026 | Premium & Coverage Planner | MoneyCal"
        description="Term insurance calculator India to estimate premium and ideal cover amount. Compare policy term and rider impact for better family protection planning."
        keywords="term insurance calculator india, term insurance premium calculator india 2026, how much term insurance cover do i need, 1 crore term insurance premium calculator, family protection insurance calculator"
        url="/calculators/term-insurance-calculator"
      />
      <CalculatorSchema
        name="Term Insurance Calculator India"
        description="Estimate term insurance premium, recommended cover amount, and long-term payment outgo."
        url="/calculators/term-insurance-calculator"
        features={[
          'Premium estimate',
          'Income-based cover recommendation',
          'Smoker and rider impact',
          'Monthly or annual payment view',
          'Policy term comparison',
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-12"
        rating={{ value: 4.9, count: 11930 }}
      />

      <div className="mx-auto max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
            Term Insurance Inputs
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="annual-income" className="text-sm font-medium text-neutral-700">
                  Annual Income (INR)
                </label>
                <span className="text-sm text-neutral-500">{formatCurrency(annualIncome)}</span>
              </div>
              <input
                type="range"
                id="annual-income"
                min="300000"
                max="10000000"
                step="50000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="cover-amount" className="text-sm font-medium text-neutral-700">
                  Cover Amount (INR)
                </label>
                <span className="text-sm text-neutral-500">{formatCurrency(coverAmount)}</span>
              </div>
              <input
                type="range"
                id="cover-amount"
                min="5000000"
                max="50000000"
                step="500000"
                value={coverAmount}
                onChange={(e) => setCoverAmount(Number(e.target.value))}
                className="slider"
              />
              <p className="mt-2 text-xs text-neutral-500">Recommended baseline: {formatCurrency(recommendedCover)}</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="age" className="text-sm font-medium text-neutral-700">
                  Age
                </label>
                <span className="text-sm text-neutral-500">{age} years</span>
              </div>
              <input
                type="range"
                id="age"
                min="18"
                max="65"
                step="1"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="policy-term" className="text-sm font-medium text-neutral-700">
                  Policy Term
                </label>
                <span className="text-sm text-neutral-500">{policyTerm} years</span>
              </div>
              <input
                type="range"
                id="policy-term"
                min="5"
                max="40"
                step="1"
                value={policyTerm}
                onChange={(e) => setPolicyTerm(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-2 block">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-2 block">Payment Mode</label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value as PaymentFrequency)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                >
                  <option value="annual">Annual</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="inline-flex items-center text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={smoker}
                  onChange={(e) => setSmoker(e.target.checked)}
                  className="mr-2 rounded border-neutral-300"
                />
                  Smoker
                </label>
              <label className="inline-flex items-center text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={criticalIllness}
                  onChange={(e) => setCriticalIllness(e.target.checked)}
                  className="mr-2 rounded border-neutral-300"
                  />
                Critical illness rider
                </label>
              <label className="inline-flex items-center text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={accidentalDeath}
                  onChange={(e) => setAccidentalDeath(e.target.checked)}
                  className="mr-2 rounded border-neutral-300"
                />
                Accidental death rider
              </label>
              <label className="inline-flex items-center text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={waiverOfPremium}
                  onChange={(e) => setWaiverOfPremium(e.target.checked)}
                  className="mr-2 rounded border-neutral-300"
                />
                Waiver of premium rider
                </label>
              </div>
            </div>
          </div>

        <div className="space-y-6">
          <div className="bg-[--primary-50] p-6 rounded-lg border border-[--primary-100]">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Premium Estimate
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">{paymentFrequency === 'monthly' ? 'Monthly Premium' : 'Annual Premium'}</p>
                <p className="text-2xl font-bold text-neutral-900">{formatCurrency(periodicPremium)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Estimated Annual Premium</p>
                <p className="text-xl font-bold text-neutral-800">{formatCurrency(annualPremium)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Premium Outgo ({policyTerm} years)</p>
                <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalOutgo)}</p>
                </div>
            </div>
          </div>

          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <DollarSign className="w-5 h-5 mr-2 text-[--primary-600]" />
              Planning Notes
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
              <li>Choose a cover that can replace income and handle liabilities.</li>
              <li>Final premium may differ after underwriting and medical checks.</li>
              <li>Term insurance is pure protection; compare claim process quality as well.</li>
              <li>Review exclusions, waiting periods, and rider wording carefully.</li>
                </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-3">
              <Info className="w-5 h-5 mr-2 text-[--primary-600]" />
              Reference Links
            </h2>
            <div className="text-sm text-neutral-600 space-y-2">
              <p>
                IRDAI annual reports and disclosures: <a className="text-blue-700 underline" href="https://irdai.gov.in/" target="_blank" rel="noopener noreferrer">irdai.gov.in</a>
              </p>
              <p>
                Compare market plans and features: <a className="text-blue-700 underline" href="https://www.policybazaar.com/life-insurance/term-insurance/" target="_blank" rel="noopener noreferrer">PolicyBazaar term plans</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 mt-12">
        <CalculatorContentWrapper {...contentData} />
      </div>
    </>
  );
};

export default TermInsuranceCalculator;
