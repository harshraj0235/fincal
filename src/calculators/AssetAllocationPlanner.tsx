import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, PieChart, TrendingUp, AlertTriangle, Info, HelpCircle } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

/**
 * @file AssetAllocationPlanner.tsx
 * @description India's most advanced asset allocation calculator with risk profiling, manual input, FAQs, and SEO.
 * @see https://github.com/harshraj0235/fincal
 */

type RiskProfile = 'conservative' | 'moderate' | 'balanced' | 'growth' | 'aggressive';

interface AssetAllocation {
  equity: number;
  internationalEquity: number;
  debt: number;
  gold: number;
  reits: number;
  hybrid: number;
  esg: number;
  cash: number;
  alternative: number;
}

interface AssetClass {
  name: string;
  key: keyof AssetAllocation;
  description: string;
  returnRange: string;
  riskLevel: string;
  color: string;
  example: string;
}

const DEFAULT_ALLOCATION: AssetAllocation = {
  equity: 50,
  internationalEquity: 10,
  debt: 20,
  gold: 5,
  reits: 3,
  hybrid: 4,
  esg: 3,
  cash: 3,
  alternative: 2,
};

const assetClasses: AssetClass[] = [
  {
    name: 'Equity (India)',
    key: 'equity',
    description: 'Indian stocks, equity mutual funds, ETFs',
    returnRange: '10-16%',
    riskLevel: 'High',
    color: '#3b82f6',
    example: 'Nifty 50, Flexicap Funds'
  },
  {
    name: 'International Equity',
    key: 'internationalEquity',
    description: 'US/global equity funds, ETFs',
    returnRange: '8-15%',
    riskLevel: 'High',
    color: '#0ea5e9',
    example: 'S&P 500 Index Fund'
  },
  {
    name: 'Debt',
    key: 'debt',
    description: 'Bonds, debt MFs, FDs',
    returnRange: '5-8%',
    riskLevel: 'Low-Medium',
    color: '#f59e0b',
    example: 'Corporate Bond Funds'
  },
  {
    name: 'Gold',
    key: 'gold',
    description: 'SGBs, gold ETFs, gold MFs',
    returnRange: '6-9%',
    riskLevel: 'Medium',
    color: '#eab308',
    example: 'Sovereign Gold Bond'
  },
  {
    name: 'REITs/InvITs',
    key: 'reits',
    description: 'Real Estate/Infra Inv Trusts',
    returnRange: '7-11%',
    riskLevel: 'Medium',
    color: '#6366f1',
    example: 'Embassy Office Parks REIT'
  },
  {
    name: 'Hybrid Funds',
    key: 'hybrid',
    description: 'Balanced, aggressive hybrid funds',
    returnRange: '7-12%',
    riskLevel: 'Medium',
    color: '#10b981',
    example: 'Aggressive Hybrid Fund'
  },
  {
    name: 'ESG/Social Impact',
    key: 'esg',
    description: 'ESG, ethical, social impact funds',
    returnRange: '7-10%',
    riskLevel: 'Medium',
    color: '#22d3ee',
    example: 'SBI Magnum ESG Fund'
  },
  {
    name: 'Cash/Liquid',
    key: 'cash',
    description: 'Savings, liquid funds, MMF',
    returnRange: '3-5%',
    riskLevel: 'Very Low',
    color: '#22c55e',
    example: 'Liquid Mutual Fund'
  },
  {
    name: 'Alternative',
    key: 'alternative',
    description: 'Commodities, PE, P2P, crypto',
    returnRange: '8-16%',
    riskLevel: 'High',
    color: '#a855f7',
    example: 'P2P Lending, AIF'
  }
];

// Returns in % per annum for each class (2024-25 estimates)
const assetReturns = {
  equity: 13,
  internationalEquity: 11,
  debt: 6.5,
  gold: 7.5,
  reits: 9,
  hybrid: 8,
  esg: 8.5,
  cash: 4,
  alternative: 12,
};

const riskProfileAllocations: Record<RiskProfile, AssetAllocation> = {
  conservative:   { equity: 20, internationalEquity: 5, debt: 45, gold: 8, reits: 5, hybrid: 5, esg: 2, cash: 8, alternative: 2 },
  moderate:       { equity: 35, internationalEquity: 10, debt: 30, gold: 7, reits: 5, hybrid: 5, esg: 3, cash: 3, alternative: 2 },
  balanced:       { equity: 45, internationalEquity: 10, debt: 20, gold: 7, reits: 5, hybrid: 5, esg: 3, cash: 3, alternative: 2 },
  growth:         { equity: 55, internationalEquity: 14, debt: 10, gold: 5, reits: 5, hybrid: 4, esg: 4, cash: 2, alternative: 5 },
  aggressive:     { equity: 65, internationalEquity: 15, debt: 5, gold: 4, reits: 4, hybrid: 3, esg: 2, cash: 1, alternative: 6 }
};

function getDynamicRiskProfile(age: number, timeHorizon: number, investmentAmount: number): RiskProfile {
  if (age < 30 && timeHorizon >= 10 && investmentAmount > 5000000) return 'aggressive';
  if (age < 35 && timeHorizon >= 8) return 'growth';
  if (age < 45 && timeHorizon >= 5) return 'balanced';
  if (age < 55) return 'moderate';
  return 'conservative';
}

export const AssetAllocationPlanner: React.FC = () => {
  // Inputs
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000000);
  const [manualAmount, setManualAmount] = useState<string>('1000000');
  const [age, setAge] = useState<number>(35);
  const [manualAge, setManualAge] = useState<string>('35');
  const [timeHorizon, setTimeHorizon] = useState<number>(10);
  const [manualHorizon, setManualHorizon] = useState<string>('10');
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('balanced');
  const [allocation, setAllocation] = useState<AssetAllocation>(DEFAULT_ALLOCATION);
  const [customAllocation, setCustomAllocation] = useState<boolean>(false);

  // Results
  const [expectedReturn, setExpectedReturn] = useState<number>(0);
  const [riskLevel, setRiskLevel] = useState<number>(0);

  // SEO schema state (no re-render)
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is an asset allocation planner?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'An asset allocation planner helps you diversify your investments across different asset classes based on your risk profile and financial goals.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How is the best asset allocation for India calculated?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Our tool uses latest Indian market trends, your age, and investment horizon to recommend asset allocation using advanced algorithms.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I enter my own allocations and amounts?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, you can manually enter your investment amount, age, horizon, and custom asset allocation in the planner.'
          }
        }
      ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  useEffect(() => {
    if (!customAllocation) {
      setAllocation(riskProfileAllocations[riskProfile]);
    }
  }, [riskProfile, customAllocation]);

  useEffect(() => {
    let weightedReturn = 0, riskScore = 0;
    Object.entries(allocation).forEach(([key, value]) => {
      weightedReturn += (value / 100) * (assetReturns[key as keyof AssetAllocation] || 0);
      if (key === 'equity' || key === 'internationalEquity' || key === 'alternative') riskScore += value * 0.8;
      else if (key === 'debt' || key === 'hybrid' || key === 'esg') riskScore += value * 0.3;
      else if (key === 'gold' || key === 'reits') riskScore += value * 0.4;
      else riskScore += value * 0.1;
    });
    setExpectedReturn(weightedReturn);
    setRiskLevel(riskScore / 100);
  }, [allocation]);

  const handleManualInput = (setter: React.Dispatch<React.SetStateAction<number>>, value: string, min: number, max: number) => {
    let num = Number(value.replace(/[^0-9]/g, ''));
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;
    setter(num);
    return String(num);
  };

  const handleAllocationChange = (asset: keyof AssetAllocation, value: number) => {
    if (!customAllocation) setCustomAllocation(true);
    value = Math.max(0, Math.min(100, value));
    const otherTotal = Object.entries(allocation)
      .filter(([key]) => key !== asset)
      .reduce((sum, [_, v]) => sum + v, 0);
    if (value + otherTotal > 100) value = 100 - otherTotal;
    setAllocation({ ...allocation, [asset]: value });
  };

  const resetAllocation = () => {
    setCustomAllocation(false);
    setAllocation(riskProfileAllocations[riskProfile]);
  };

  const calculateAssetAmounts = () =>
    Object.entries(allocation).map(([key, pct]) => {
      const assetClass = assetClasses.find(ac => ac.key === key)!;
      return {
        name: assetClass.name,
        value: (pct / 100) * investmentAmount,
        color: assetClass.color
      };
    });

  useEffect(() => {
    if (!customAllocation) {
      setRiskProfile(getDynamicRiskProfile(age, timeHorizon, investmentAmount));
    }
    // eslint-disable-next-line
  }, [age, timeHorizon, investmentAmount]);

  const FAQS = [
    {
      q: "What is the best asset allocation for Indian investors in 2025?",
      a: "A diversified portfolio with domestic equity, international equity, debt, gold, REITs, and alternative assets is recommended. Adjust based on your age, risk appetite and goals."
    },
    {
      q: "Can I enter my own asset allocation?",
      a: "Yes. Enable manual mode and adjust each asset class as per your preference."
    },
    {
      q: "How does risk profiling work?",
      a: "The planner calculates your risk profile based on your age, investment horizon, and amount using the latest Indian investor data."
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8" itemScope itemType="https://schema.org/FinancialProduct">
      {/* SEO: Title and FAQ */}
      <h1 className="sr-only" itemProp="name">Best Asset Allocation Planner India 2025</h1>
      <meta itemProp="description" content="Plan your investments with the most advanced asset allocation calculator for India. Get personalized recommendations, risk profiling, FAQs and more." />
      <div className="space-y-6">
        {/* Inputs Section */}
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Investment Profile
        </h2>
        <div className="space-y-4">
          {/* Investment Amount */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-amount" className="text-sm font-medium text-neutral-700">
                Investment Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">{formatCurrency(investmentAmount)}</span>
            </div>
            <input
              type="range"
              id="investment-amount"
              min="10000"
              max="10000000"
              step="10000"
              value={investmentAmount}
              onChange={e => {
                setInvestmentAmount(Number(e.target.value));
                setManualAmount(e.target.value);
              }}
              className="slider"
              aria-label="Investment Amount"
            />
            <input
              type="text"
              className="border mt-2 px-2 py-1 rounded w-full"
              value={manualAmount}
              onChange={e => setManualAmount(handleManualInput(setInvestmentAmount, e.target.value, 10000, 10000000))}
              aria-label="Manual Investment Amount"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          {/* Age */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="age" className="text-sm font-medium text-neutral-700">Your Age</label>
              <span className="text-sm text-neutral-500">{age} years</span>
            </div>
            <input
              type="range"
              id="age"
              min="18"
              max="80"
              value={age}
              onChange={e => {
                setAge(Number(e.target.value));
                setManualAge(e.target.value);
              }}
              className="slider"
              aria-label="Age"
            />
            <input
              type="text"
              className="border mt-2 px-2 py-1 rounded w-full"
              value={manualAge}
              onChange={e => setManualAge(handleManualInput(setAge, e.target.value, 18, 80))}
              aria-label="Manual Age"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          {/* Time Horizon */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="time-horizon" className="text-sm font-medium text-neutral-700">
                Investment Time Horizon (years)
              </label>
              <span className="text-sm text-neutral-500">{timeHorizon} years</span>
            </div>
            <input
              type="range"
              id="time-horizon"
              min="1"
              max="30"
              value={timeHorizon}
              onChange={e => {
                setTimeHorizon(Number(e.target.value));
                setManualHorizon(e.target.value);
              }}
              className="slider"
              aria-label="Time Horizon"
            />
            <input
              type="text"
              className="border mt-2 px-2 py-1 rounded w-full"
              value={manualHorizon}
              onChange={e => setManualHorizon(handleManualInput(setTimeHorizon, e.target.value, 1, 30))}
              aria-label="Manual Time Horizon"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          {/* Risk Profile */}
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Risk Profile
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['conservative', 'moderate', 'balanced', 'growth', 'aggressive'] as RiskProfile[]).map(profile => (
                <button
                  key={profile}
                  onClick={() => { setRiskProfile(profile); setCustomAllocation(false); }}
                  className={`px-2 py-3 rounded-lg text-xs font-medium ${
                    riskProfile === profile
                      ? 'bg-[--primary-100] text-[--primary-800] border-2 border-[--primary-300]'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                  }`}
                  aria-pressed={riskProfile === profile}
                >
                  {profile.charAt(0).toUpperCase() + profile.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Asset Allocation */}
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[--primary-900]">Asset Allocation <span className="text-xs text-neutral-500">(sum: {Object.values(allocation).reduce((a, b) => a + b, 0)}%)</span></h3>
            {customAllocation && (
              <button
                onClick={resetAllocation}
                className="text-xs text-[--primary-600] hover:text-[--primary-800] font-medium"
              >Reset to Recommended</button>
            )}
          </div>
          <div className="space-y-4">
            {assetClasses.map(assetClass => (
              <div key={assetClass.key}>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-neutral-700 flex items-center">
                    <span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: assetClass.color }}></span>
                    {assetClass.name}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      className="w-14 text-right border px-1 rounded text-xs"
                      value={allocation[assetClass.key]}
                      min={0} max={100}
                      onChange={e => handleAllocationChange(assetClass.key, Number(e.target.value))}
                      aria-label={`% Allocation for ${assetClass.name}`}
                    />
                    <span className="text-xs text-neutral-400">{formatCurrency((allocation[assetClass.key] / 100) * investmentAmount)}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={allocation[assetClass.key]}
                  onChange={e => handleAllocationChange(assetClass.key, Number(e.target.value))}
                  className="slider"
                  style={{
                    background: `linear-gradient(to right, ${assetClass.color} 0%, ${assetClass.color} ${allocation[assetClass.key]}%, #e5e7eb ${allocation[assetClass.key]}%, #e5e7eb 100%)`
                  }}
                  aria-label={`Slider for ${assetClass.name}`}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg flex flex-wrap gap-6 justify-between">
            <div>
              <p className="text-sm text-neutral-500">Expected Annual Return</p>
              <p className="text-lg font-semibold text-[--success-600]">{expectedReturn.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Risk Level</p>
              <div className="flex items-center">
                <div className="w-24 bg-neutral-200 rounded-full h-2 mr-2">
                  <div
                    className={`h-full rounded-full ${
                      riskLevel < 30 ? 'bg-[--success-500]'
                      : riskLevel < 60 ? 'bg-[--warning-500]'
                      : 'bg-[--error-500]'
                    }`}
                    style={{ width: `${riskLevel}%` }}
                  />
                </div>
                <span className="text-xs text-neutral-600">
                  {riskLevel < 30 ? 'Low' : riskLevel < 60 ? 'Medium' : 'High'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Column */}
      <div className="space-y-6">
        {/* Chart */}
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Allocation Breakdown
          </h2>
          <div className="mt-4 h-64">
            <ResultChart
              data={calculateAssetAmounts()}
              centerText={`${formatCurrency(investmentAmount)}\nTotal`}
            />
          </div>
        </div>
        {/* Asset Class Info */}
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
            Asset Class Details
          </h2>
          <div className="space-y-4">
            {assetClasses.map(assetClass => (
              <div key={assetClass.key} className="p-4 bg-white rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center">
                    <span
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: assetClass.color }}
                    ></span>
                    <span className="font-semibold">{assetClass.name}</span>
                  </span>
                  <span className="text-xs text-neutral-500">{assetClass.returnRange} returns</span>
                </div>
                <div className="text-sm text-neutral-700 mb-1"
