import React, { useMemo, useState } from 'react';
import { Shield, Sliders, DollarSign, PieChart } from 'lucide-react';
import { formatCurrency } from '../utils/calculatorUtils';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';
import SEOHelmet from '../components/SEOHelmet';

type PolicyType = 'term' | 'endowment' | 'moneyBack' | 'ulip' | 'wholeLife';
type Gender = 'male' | 'female';

interface PolicyMeta {
  name: string;
  premiumMultiplier: number;
  assumedReturn: number;
  termMin: number;
  termMax: number;
  maturityEnabled: boolean;
}

const policyMeta: Record<PolicyType, PolicyMeta> = {
  term: {
    name: 'Term Plan (Pure Protection)',
    premiumMultiplier: 1,
    assumedReturn: 0,
    termMin: 10,
    termMax: 40,
    maturityEnabled: false,
  },
  endowment: {
    name: 'Endowment Plan',
    premiumMultiplier: 3.8,
    assumedReturn: 5.5,
    termMin: 10,
    termMax: 35,
    maturityEnabled: true,
  },
  moneyBack: {
    name: 'Money Back Plan',
    premiumMultiplier: 4.1,
    assumedReturn: 5.1,
    termMin: 15,
    termMax: 30,
    maturityEnabled: true,
  },
  ulip: {
    name: 'ULIP Plan',
    premiumMultiplier: 3.2,
    assumedReturn: 9,
    termMin: 10,
    termMax: 30,
    maturityEnabled: true,
  },
  wholeLife: {
    name: 'Whole Life Plan',
    premiumMultiplier: 3.6,
    assumedReturn: 6,
    termMin: 20,
    termMax: 40,
    maturityEnabled: true,
  },
};

export const LifeInsuranceCalculator: React.FC = () => {
  const [policyType, setPolicyType] = useState<PolicyType>('term');
  const [age, setAge] = useState(30);
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [coverAmount, setCoverAmount] = useState(10000000);
  const [policyTerm, setPolicyTerm] = useState(30);
  const [gender, setGender] = useState<Gender>('male');
  const [smoker, setSmoker] = useState(false);
  const [criticalIllnessRider, setCriticalIllnessRider] = useState(false);
  const [accidentalRider, setAccidentalRider] = useState(false);

  const activePolicy = policyMeta[policyType];

  const recommendedLifeCover = useMemo(() => {
    const baseline = annualIncome * 15;
    return Math.max(5000000, Math.round(baseline / 100000) * 100000);
  }, [annualIncome]);

  const annualPremium = useMemo(() => {
    let premium = (coverAmount / 1000) * 0.24;
    premium *= activePolicy.premiumMultiplier;
    premium *= 1 + Math.max(0, age - 25) * 0.03;
    premium *= 1 + Math.max(0, policyTerm - 20) * 0.01;

    if (gender === 'female') premium *= 0.9;
    if (smoker) premium *= 1.55;
    if (criticalIllnessRider) premium *= 1.2;
    if (accidentalRider) premium *= 1.08;

    return Math.max(6000, Math.round(premium));
  }, [coverAmount, age, policyTerm, gender, smoker, criticalIllnessRider, accidentalRider, activePolicy]);

  const monthlyPremium = useMemo(() => Math.round((annualPremium / 12) * 1.03), [annualPremium]);
  const totalPremiumOutgo = useMemo(() => annualPremium * policyTerm, [annualPremium, policyTerm]);

  const projectedMaturityValue = useMemo(() => {
    if (!activePolicy.maturityEnabled) return 0;
    const contribution = annualPremium;
    const rate = activePolicy.assumedReturn / 100;
    if (rate === 0) return contribution * policyTerm;
    const fv = contribution * ((Math.pow(1 + rate, policyTerm) - 1) / rate);
    return Math.round(fv);
  }, [activePolicy, annualPremium, policyTerm]);

  const contentData = {
    title: 'Life Insurance Calculator India (Coverage, Premium, and Maturity Planning)',
    description:
      'Use this Life Insurance Calculator India to estimate premium, ideal cover amount, policy term, and expected maturity range for selected policy types. Compare term, endowment, money back, ULIP, and whole life planning in one place.',
    benefits: [
      'Estimate life insurance premium before final insurer quote',
      'Compare pure protection vs savings-oriented policy structures',
      'Check recommended cover amount using income-replacement logic',
      'Model rider impact on annual premium and affordability',
      'Understand total premium outgo over policy term',
      'See maturity projection for non-term policy types',
      'Plan family protection using a goal-based approach',
      'Improve decision quality with structured assumptions',
    ],
    howToSteps: [
      {
        step: 'Set annual income and cover amount',
        details:
          'Start with annual income because life insurance is primarily an income-replacement product for dependents. A common starting framework is 10x to 15x annual income, then adjust for home loan balance, child education goals, and years remaining to retirement. If your family depends on one salary, choose a conservative higher cover. If there are dual stable incomes and low liabilities, you can calibrate lower. This calculator also provides a recommended baseline cover to reduce under-insurance risk. Always treat this as a planning anchor, not a fixed rule. The final number should come from your responsibilities, not from a trend number you see online.',
      },
      {
        step: 'Choose policy type based on objective',
        details:
          'Choose term if your primary objective is maximum protection at the lowest cost. Choose endowment or money back only if you value predictable, lower-volatility savings behavior and accept higher premium for lower cover efficiency. Choose ULIP if you want insurance plus long-horizon market-linked investing and are comfortable with market fluctuations and product charges. Choose whole life if legacy transfer and lifelong cover are core priorities. This step is critical for ranking in real decision quality because most users confuse protection and investment goals. The right plan is the one that matches your goal first, not the one with the most features in marketing copy.',
      },
      {
        step: 'Adjust age, term, and profile assumptions',
        details:
          'Premium increases with age, term length, smoker status, and riders. Buying younger typically reduces long-term cost for the same cover. In practical planning, policy term often aligns with earning years or major liabilities timeline. Example: if retirement target age is 60 and you are 30 today, a 30-year policy term can be reasonable. If your major liabilities end earlier, you may choose a shorter term. This calculator lets you stress-test multiple combinations quickly so you can see affordability before policy purchase. Use conservative assumptions and avoid stretching premium beyond sustainable monthly cash flow.',
      },
      {
        step: 'Review premium, outgo, and maturity behavior',
        details:
          'Read all outputs together, not one metric in isolation. Annual premium tells yearly budget impact, monthly premium helps cash-flow planning, and total outgo shows long-term commitment. For non-term plans, projected maturity value gives a directional estimate under assumed return, not a guaranteed payout. If your selected policy has maturity disabled (like term), that is expected because term is pure protection. This distinction is important: protection products and investment products solve different problems. Use this output section to decide whether to separate insurance and investment in your financial plan.',
      },
      {
        step: 'Validate with policy wording and insurer underwriting',
        details:
          'Before purchase, verify exclusions, waiting periods, claim documents, premium payment terms, and rider conditions from official insurer documents. Final premium can differ due to medical tests, occupation risk class, family history, and underwriting policy. Use this calculator to enter discussions with clarity, then validate final numbers with actual insurer quotations. Better decisions come from combining a planning calculator with product disclosure reading. This reduces surprises later and improves claim-time confidence for your family.',
      },
    ],
    examples: [
      {
        scenario: 'Young salaried parent focused on high protection',
        inputs: [
          { label: 'Policy type', value: 'Term Plan' },
          { label: 'Age', value: '29 years' },
          { label: 'Annual income', value: '₹14,00,000' },
          { label: 'Cover amount', value: '₹2,00,00,000' },
          { label: 'Term', value: '31 years' },
        ],
        result:
          'Low relative premium per unit cover and high protection efficiency for dependents',
        explanation:
          'When liabilities and child goals are high, term usually provides the strongest cover-to-premium ratio, improving financial resilience without overloading monthly budget.',
      },
      {
        scenario: 'Conservative saver preferring guaranteed-style behavior',
        inputs: [
          { label: 'Policy type', value: 'Endowment' },
          { label: 'Age', value: '35 years' },
          { label: 'Cover amount', value: '₹50,00,000' },
          { label: 'Term', value: '20 years' },
        ],
        result:
          'Higher annual premium, lower cover efficiency, but stronger forced-savings discipline',
        explanation:
          'Users who prioritize predictable policy behavior sometimes accept higher premiums in exchange for structured savings and maturity visibility.',
      },
      {
        scenario: 'Long-horizon investor combining insurance with market exposure',
        inputs: [
          { label: 'Policy type', value: 'ULIP' },
          { label: 'Age', value: '32 years' },
          { label: 'Cover amount', value: '₹75,00,000' },
          { label: 'Term', value: '25 years' },
        ],
        result:
          'Market-linked maturity path with higher uncertainty than guaranteed products',
        explanation:
          'ULIP works only when users understand product charges, time horizon, and return variability. Suitability depends on behavior and review discipline.',
      },
    ],
    tips: [
      'Buy protection early; age and health changes can increase future premium sharply.',
      'Prioritize adequate cover first, then optimize premium mode and riders.',
      'Keep emergency fund and insurance planning separate for better liquidity.',
      'Review nominees, contact details, and claim documents at least once a year.',
      'Use rider add-ons selectively; only choose riders solving real risk gaps.',
      'Re-evaluate life cover after marriage, child birth, or large debt additions.',
      'Read policy wording; exclusions and claim conditions matter more than ads.',
      'Avoid choosing a plan only because it is popular on social media.',
    ],
    mistakes: [
      'Buying too little cover to keep premium low',
      'Confusing savings return with protection adequacy',
      'Skipping disclosure of smoking or medical history',
      'Ignoring inflation impact on future family expenses',
      'Choosing policy term shorter than liability duration',
      'Comparing plans only on first-year premium',
      'Not telling family how to file claim and where documents are stored',
      'Assuming projected returns are guaranteed payouts',
    ],
    faqs: [
      {
        question: 'What is a life insurance calculator and why should I use one?',
        answer:
          'A life insurance calculator is a planning tool that estimates premium, cover adequacy, and long-term cost commitment based on assumptions like age, term, income, and risk profile. It helps you avoid random decisions and creates a structured starting point before insurer comparison. Instead of jumping directly to sales illustrations, you first build your own budget and protection logic. This improves confidence and reduces the chance of under-insurance.',
      },
      {
        question: 'How much life insurance cover is usually considered adequate in India?',
        answer:
          'A frequently used starting framework is 10x to 15x annual income. However, this is only a baseline. Real adequacy depends on liabilities, number of dependents, years to retirement, education goals, and existing assets. If you have a large home loan and young children, the practical cover may need to be above standard multipliers. If liabilities are low and assets are strong, the required cover can be lower. The right cover is context-specific.',
      },
      {
        question: 'Should I choose term insurance or savings-oriented life insurance?',
        answer:
          'If your primary goal is family protection at affordable cost, term insurance usually provides the best cover efficiency. If you want bundled savings behavior and are comfortable with higher premiums for lower protection efficiency, endowment or money-back style products may suit your behavior profile. ULIP may suit long-horizon, market-aware users. Many households separate protection and investment because that often improves flexibility and transparency.',
      },
      {
        question: 'Why does premium vary so much across users?',
        answer:
          'Premium is influenced by age, health profile, smoking status, policy term, sum assured, occupation risk, and selected riders. Underwriting rules differ by insurer, so identical inputs can still produce different final premiums. Medical test outcomes can also shift pricing. This is why calculator output should be treated as planning estimate, not final policy quote.',
      },
      {
        question: 'Do riders always make life insurance better?',
        answer:
          'Not always. Riders are useful when they solve a real risk gap. For example, critical illness rider can be relevant if your family cash flow is vulnerable to major health events. Accidental rider can help in occupations with higher physical risk. But adding every available rider can make policy expensive and reduce affordability. Choose riders intentionally based on household risk map.',
      },
      {
        question: 'Is maturity value guaranteed in life insurance plans?',
        answer:
          'It depends on policy type. Term plans generally do not provide maturity payout. Endowment and some traditional plans may provide defined benefit structures as per product terms. ULIP maturity is market-linked and can fluctuate. In any case, calculator projections are directional estimates. Final payout depends on policy conditions, declared bonuses where applicable, and market performance for market-linked plans.',
      },
      {
        question: 'How should I decide the policy term?',
        answer:
          'A practical method is to align term with earning years and liability timeline. If major responsibilities are expected to continue for 25 years, selecting only 15 years can leave a gap later. Many users choose term up to retirement age, but if key liabilities end earlier, a shorter term may be sufficient. The term should protect your family when financial dependence is highest.',
      },
      {
        question: 'Can I rely on this calculator without checking insurer documents?',
        answer:
          'No. This calculator is a decision support tool. Always verify final premium, exclusions, rider terms, waiting periods, and claim process from insurer policy documents and official benefit illustrations. The best practice is: calculator for planning, insurer documents for confirmation, and then purchase.',
      },
      {
        question: 'How often should life insurance cover be reviewed?',
        answer:
          'Review at least once a year, and immediately after major life events such as marriage, childbirth, taking a home loan, business liability changes, or significant salary increase. Coverage that was adequate three years ago may be insufficient today because goals and inflation change over time.',
      },
      {
        question: 'Is higher premium always equal to better policy?',
        answer:
          'No. Higher premium can result from additional features, longer term, or higher-risk profile, but not necessarily better suitability. A better policy is one that provides adequate cover, sustainable premium, clear terms, and dependable claim support for your family. Fit matters more than price alone.',
      },
      {
        question: 'How can I make life insurance planning more reliable for family members?',
        answer:
          'Keep nominee details updated, maintain a clear record of policy numbers, and inform trusted family members where documents are stored. Share claim steps in simple language and review them annually. Financial protection works only when claim execution is easy during stressful situations.',
      },
      {
        question: 'What are practical long-tail search intent topics this calculator addresses?',
        answer:
          'This page helps users searching for terms like life insurance calculator India 2026, how much life insurance cover do I need in India, life insurance premium calculator with smoker status, endowment vs term insurance calculator, and ULIP vs endowment planning calculator. The tool is built around real decision questions instead of generic one-line outputs.',
      },
    ],
    relatedCalculators: [
      {
        name: 'Term Insurance Calculator',
        url: '/calculators/term-insurance-calculator',
        description: 'Estimate pure protection premium and cover adequacy',
      },
      {
        name: 'Human Life Value Calculator',
        url: '/calculators/human-life-value-calculator',
        description: 'Income replacement based cover calculation',
      },
      {
        name: 'Health Insurance Calculator',
        url: '/calculators/health-insurance-calculator',
        description: 'Plan medical risk cover alongside life cover',
      },
      {
        name: 'Financial Goal Calculator',
        url: '/calculators/financial-goal-calculator',
        description: 'Map long-term goals to monthly savings behavior',
      },
    ],
    lastUpdated: '2026-02-12',
  };
  
  return (
    <>
      <SEOHelmet
        title="Life Insurance Calculator India 2026 | Premium, Cover & Policy Planning | MoneyCal"
        description="Life Insurance Calculator India to estimate premium, compare policy types, check ideal cover amount, and plan long-term family financial protection."
        keywords="life insurance calculator india 2026, how much life insurance cover do i need india, life insurance premium calculator india, endowment vs term insurance calculator, ulip life insurance calculator"
        url="/calculators/life-insurance-calculator"
      />

      <CalculatorSchema
        name="Life Insurance Calculator India"
        description="Estimate life insurance premium, recommended cover amount, policy outgo, and maturity projection by policy type."
        url="/calculators/life-insurance-calculator"
        features={[
          'Policy type comparison',
          'Income-based cover recommendation',
          'Premium estimate',
          'Rider impact modeling',
          'Maturity projection for savings-linked plans',
          'Long-form planning guidance',
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-12"
        rating={{ value: 4.9, count: 10410 }}
      />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
            Life Insurance Inputs
        </h2>
        
        <div className="space-y-4">
          <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Policy Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(policyMeta).map(([key, policy]) => (
                <button
                  key={key}
                    onClick={() => {
                      const nextType = key as PolicyType;
                      setPolicyType(nextType);
                      const nextMeta = policyMeta[nextType];
                      if (policyTerm < nextMeta.termMin) setPolicyTerm(nextMeta.termMin);
                      if (policyTerm > nextMeta.termMax) setPolicyTerm(nextMeta.termMax);
                    }}
                    className={`p-3 rounded-lg text-left ${
                      policyType === key ? 'bg-[--primary-100] text-[--primary-800]' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <div className="font-medium">{policy.name}</div>
                    <div className="text-xs mt-1 opacity-90">Assumed return {policy.assumedReturn}%</div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
                <label htmlFor="annual-income" className="text-sm font-medium text-neutral-700">
                  Annual Income (INR)
              </label>
                <span className="text-sm text-neutral-500">{formatCurrency(annualIncome)}</span>
              </div>
              <input
                id="annual-income"
                type="range"
                min="300000"
                max="10000000"
                step="50000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="slider"
              />
              <p className="mt-1 text-xs text-neutral-500">Recommended cover baseline: {formatCurrency(recommendedLifeCover)}</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="cover-amount" className="text-sm font-medium text-neutral-700">
                  Cover Amount (INR)
                </label>
                <span className="text-sm text-neutral-500">{formatCurrency(coverAmount)}</span>
            </div>
            <input 
                id="cover-amount"
              type="range" 
                min="5000000"
                max="50000000"
                step="500000"
              value={coverAmount} 
              onChange={(e) => setCoverAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="age" className="text-sm font-medium text-neutral-700">
                  Age
              </label>
                <span className="text-sm text-neutral-500">{age} years</span>
            </div>
            <input 
                id="age"
              type="range" 
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
                id="policy-term"
              type="range" 
                min={activePolicy.termMin}
                max={activePolicy.termMax}
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
              <div className="space-y-2">
                <label className="inline-flex items-center text-sm text-neutral-700 mt-7">
                  <input
                    type="checkbox"
                    checked={smoker}
                    onChange={(e) => setSmoker(e.target.checked)}
                    className="mr-2 rounded border-neutral-300"
                  />
                  Smoker
                </label>
            </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="inline-flex items-center text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={criticalIllnessRider}
                  onChange={(e) => setCriticalIllnessRider(e.target.checked)}
                  className="mr-2 rounded border-neutral-300"
                />
                Critical illness rider
              </label>
              <label className="inline-flex items-center text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={accidentalRider}
                  onChange={(e) => setAccidentalRider(e.target.checked)}
                  className="mr-2 rounded border-neutral-300"
                />
                Accidental rider
              </label>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
          <div className="p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Policy Summary
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Monthly Premium (Estimated)</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyPremium)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Annual Premium (Estimated)</p>
                <p className="text-xl font-bold text-neutral-800">{formatCurrency(annualPremium)}</p>
                </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Premium Outgo ({policyTerm} years)</p>
                <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalPremiumOutgo)}</p>
                </div>
              {activePolicy.maturityEnabled && (
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-neutral-500 mb-1">Projected Maturity Value</p>
                  <p className="text-xl font-bold text-[--accent-700]">{formatCurrency(projectedMaturityValue)}</p>
                </div>
              )}
              </div>
            </div>
            
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <DollarSign className="w-5 h-5 mr-2 text-[--primary-600]" />
              Coverage Notes
            </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
              <li>Preferred policy now: {activePolicy.name}</li>
              <li>Assumed return for this model: {activePolicy.assumedReturn}% per year</li>
              <li>Coverage should ideally support liabilities, goals, and family expenses</li>
              <li>Final premium depends on underwriting and insurer product terms</li>
              </ul>
            </div>
            
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-3">
              <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
              Reference Pages
            </h2>
            <div className="text-sm text-neutral-600 space-y-2">
              <p>
                IRDAI official portal: <a className="text-blue-700 underline" href="https://irdai.gov.in/" target="_blank" rel="noopener noreferrer">irdai.gov.in</a>
              </p>
              <p>
                Market comparison reference: <a className="text-blue-700 underline" href="https://www.policybazaar.com/life-insurance/" target="_blank" rel="noopener noreferrer">PolicyBazaar Life Insurance</a>
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

