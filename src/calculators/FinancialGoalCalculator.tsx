import React, { useMemo, useState } from 'react';
import { Target, TrendingUp, CalendarDays, PiggyBank, Shield, AlertTriangle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorSchema } from '../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const FinancialGoalCalculator: React.FC = () => {
  const [goalAmount, setGoalAmount] = useState<number>(10000000);
  const [existingCorpus, setExistingCorpus] = useState<number>(500000);
  const [timeframeYears, setTimeframeYears] = useState<number>(10);
  const [annualReturn, setAnnualReturn] = useState<number>(12);
  const [annualStepUp, setAnnualStepUp] = useState<number>(10);

  const result = useMemo(() => {
    const months = Math.max(1, Math.round(timeframeYears * 12));
    const monthlyRate = annualReturn / 12 / 100;
    const annualStepUpFactor = 1 + annualStepUp / 100;
    
    // Future value of existing corpus
    const fvExisting = existingCorpus * Math.pow(1 + monthlyRate, months);
    const futureValueGap = Math.max(0, goalAmount - fvExisting);

    if (futureValueGap === 0) {
      return {
        monthlySIP: 0,
        firstYearStepUpSIP: 0,
        projectedCorpus: fvExisting,
        fvExisting
      };
    }

    let low = 0;
    let high = goalAmount;
    
    const simulateCorpus = (baseMonthly: number) => {
      let corpus = existingCorpus;
      for (let m = 1; m <= months; m++) {
        const yearIndex = Math.floor((m - 1) / 12);
        const stepUpAmount = baseMonthly * Math.pow(annualStepUpFactor, yearIndex);
        corpus = corpus * (1 + monthlyRate) + stepUpAmount;
      }
      return corpus;
    };

    for (let i = 0; i < 50; i++) {
      const mid = (low + high) / 2;
      if (simulateCorpus(mid) >= goalAmount) {
        high = mid;
      } else {
        low = mid;
      }
    }

    const monthlySIP = Math.ceil(high);
    return {
      monthlySIP,
      firstYearStepUpSIP: monthlySIP * annualStepUpFactor,
      projectedCorpus: simulateCorpus(monthlySIP),
      fvExisting
    };
  }, [annualReturn, annualStepUp, existingCorpus, goalAmount, timeframeYears]);

  const contentData = {
    title: 'Financial Goal Calculator India',
    description: 'Free Financial Goal Calculator for India 2026. Calculate the exact monthly SIP required to reach your target corpus. Accounts for existing investments, expected returns (CAGR), and annual step-up SIP to match salary increments. Essential tool for planning child education, marriage, home down payment, or retirement in India.',
    benefits: [
      'Calculate precise monthly investment required for any financial goal',
      'Accounts for existing corpus compounding - know exactly how much your current savings will grow',
      'Step-up SIP feature realistically models salary increments (8-10% annually)',
      'Adjustable expected returns to match equity (12%) or debt (7%) allocations',
      'Prevents under-saving due to inflation miscalculations',
      '100% free tool with no sign-up required, specific to Indian market'
    ],
    howToSteps: [
      {
        step: 'Define Target Goal Amount',
        details: 'Determine the exact corpus needed. IMPORTANT: Adjust your target for inflation! If a child\'s engineering degree costs ₹20 Lakhs today, at 8% education inflation, it will cost ₹43 Lakhs in 10 years. Always enter the INFLATION-ADJUSTED target amount in the \'Target Goal Amount\' field.'
      },
      {
        step: 'Enter Existing Savings (Seed Money)',
        details: 'If you have already started saving for this goal (e.g., ₹2 Lakhs in an FD or Mutual Fund earmarked for this), enter it here. The calculator automatically computes the future compound value of this existing corpus and deducts it from your target, reducing your monthly burden.'
      },
      {
        step: 'Set Realistic Time Horizon',
        details: 'Enter the exact number of years left until the goal. 1-3 years: Short term. 4-7 years: Medium term. 7+ years: Long term. The longer the horizon, the harder compounding works for you.'
      },
      {
        step: 'Choose Expected Return (CAGR)',
        details: 'Align returns with the asset class suitable for your timeframe. Short term (<3 yrs): 6-7% (FDs, Liquid Funds). Medium term (3-7 yrs): 8-10% (Balanced Advantage, Hybrid Funds). Long term (7+ yrs): 11-13% (Large/Flexi Cap Equity Funds). Do not assume 15%+ returns for planning purposes!'
      },
      {
        step: 'Apply Annual Step-Up',
        details: 'As your salary increases in India (average 8-10% annually), your SIPs should increase too. Adding a 10% annual step-up drastically reduces the initial monthly SIP required today, making large goals affordable immediately.'
      }
    ],
    tips: [
      'Always add 6-8% inflation to your target goal amount before calculating.',
      'Use conservative return estimates (10-12% for equity, not 15%+).',
      'A 10% annual Step-Up SIP is the secret weapon to achieving massive goals with a small starting salary.',
      'Map specific mutual funds to specific goals (e.g., \'Child Edu Fund\') to track progress accurately.',
      'As you get within 2 years of the goal, shift funds from equity to safe debt to protect against market crashes.'
    ],
    mistakes: [
      'Ignoring inflation when setting the target amount (₹1 Crore today is not ₹1 Crore in 20 years!).',
      'Assuming 15-18% consistent returns in equity mutual funds for long-term planning.',
      'Keeping goal money in Savings Accounts (3%) when the goal is 10 years away (Inflation is 6%).',
      'Stopping SIPs during a market crash - this destroys the rupee cost averaging benefit.',
      'Not stepping up SIPs annually despite receiving salary hikes.'
    ],
    examples: [
      {
        scenario: 'Child Education (15 Years Away)',
        inputs: [
          { label: 'Current Cost', value: '₹15 Lakhs' },
          { label: 'Target (at 8% infl.)', value: '₹48 Lakhs' },
          { label: 'Existing Corpus', value: '₹1 Lakh' },
          { label: 'Return & Step-up', value: '12% Return, 10% Step-up' }
        ],
        result: 'Initial SIP: ₹3,100 / month',
        explanation: 'Because of the 15-year compounding and the 10% annual step-up, an intimidating ₹48 Lakh target requires an initial SIP of just ₹3,100 per month today!'
      },
      {
        scenario: 'Home Down Payment (5 Years Away)',
        inputs: [
          { label: 'Target Amount', value: '₹25 Lakhs' },
          { label: 'Existing Corpus', value: '₹5 Lakhs' },
          { label: 'Return', value: '9% (Hybrid Funds)' },
          { label: 'Step-up', value: '0% (Constant SIP)' }
        ],
        result: 'Monthly SIP: ₹23,500',
        explanation: 'For shorter durations (5 years), compounding has less time to work. Even with a ₹5 Lakh head start, a heavy SIP is required. Equity (12%) is too risky for a strict 5-year goal, so 9% hybrid return is used.'
      }
    ],
    faqs: [
      {
        question: 'How do I calculate the inflation-adjusted target amount?',
        answer: 'Use the Future Value formula: Target = Current Cost × (1 + Inflation Rate) ^ Years. For example, a ₹20 Lakh expense today at 7% inflation over 10 years becomes ₹20L × (1.07)^10 = ₹39.3 Lakhs.'
      },
      {
        question: 'Why should I use a Step-Up SIP?',
        answer: 'Step-Up SIP aligns your investments with your career growth. If you need a ₹50,000 flat SIP for a goal, you might not afford it today. But a Step-Up SIP might require only ₹25,000 today (increasing 10% yearly), making the goal achievable without crushing your current lifestyle.'
      },
      {
        question: 'What return should I assume for a 3-year goal?',
        answer: 'For any goal under 3 years, capital preservation is paramount. Do not invest in equity. Assume a return of 6-7% using Fixed Deposits, Arbitrage Funds, or Liquid Mutual Funds.'
      },
      {
        question: 'Can I have multiple goals running simultaneously?',
        answer: 'Yes! It is recommended to use different mutual fund folios for different goals (e.g., Folio A for Retirement, Folio B for House). This prevents you from accidentally withdrawing retirement funds for a vacation.'
      }
    ],
    relatedCalculators: [
      { name: 'SIP Calculator', url: '/calculators/sip-calculator', description: 'Calculate mutual fund SIP returns' },
      { name: 'Retirement Calculator', url: '/calculators/retirement-calculator', description: 'Plan your FIRE number' },
      { name: 'Emergency Fund Calculator', url: '/calculators/emergency-fund-calculator', description: 'Calculate safety corpus' }
    ],
    lastUpdated: '2026-02-15'
  };

  return (
    <>
      <SEOHelmet
        title="Financial Goal Calculator India 2026 - SIP Target Planner | MoneyCal"
        description="Free financial goal calculator for India. Calculate the exact monthly SIP needed to reach your target corpus with annual step-up and inflation adjustments."
        keywords="financial goal calculator india, goal based sip calculator, target corpus calculator, step up sip calculator for goal, investment planner india"
        url="/calculators/financial-goal-calculator"
      />
      <CalculatorSchema
        name="Financial Goal Calculator India"
        description="Calculate the monthly investment required to reach a specific financial target."
        url="/calculators/financial-goal-calculator"
        features={['Goal target calculation', 'Existing corpus projection', 'Step-up SIP modeling', 'Adjustable CAGR']}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-15"
      />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Financial Goal Calculator</h1>
        <p className="text-lg text-center text-gray-700 mb-8">Calculate the exact monthly SIP required to hit your target corpus.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Goal Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Include inflation! (e.g. ₹50,00,000)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Existing Savings for this Goal (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input
                    type="number"
                    value={existingCorpus}
                    onChange={(e) => setExistingCorpus(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time to Goal: {timeframeYears} Years</label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={timeframeYears}
                  onChange={(e) => setTimeframeYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 Yr</span>
                  <span>40 Yrs</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%): {annualReturn}%</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Conservative (6%)</span>
                  <span>Aggressive (15%+)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Step-Up (%): {annualStepUp}%</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={annualStepUp}
                  onChange={(e) => setAnnualStepUp(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-xs text-gray-500 mt-1">Increase SIP every year with salary hikes</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Target className="w-6 h-6 mr-2 text-blue-600" />
              Your Goal Blueprint
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-50">
                  <p className="text-sm text-gray-600 mb-1">Required Monthly SIP (Year 1)</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {formatCurrency(result.monthlySIP)}
                  </p>
                  {annualStepUp > 0 && (
                    <p className="text-xs text-green-600 mt-1 font-medium">
                      Increases by {annualStepUp}% every year
                    </p>
                  )}
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Value of Existing Corpus at Maturity</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {formatCurrency(result.fvExisting)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Your ₹{existingCorpus.toLocaleString('en-IN')} grows without new additions</p>
                </div>

                {result.monthlySIP === 0 && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-green-800 font-medium">
                      Congratulations! Your existing corpus is already sufficient to reach your goal of {formatCurrency(goalAmount)} in {timeframeYears} years at {annualReturn}% return! No additional SIP is needed.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
                Reality Check
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>If inflation is 7%, your ₹{goalAmount.toLocaleString('en-IN')} target will only have the purchasing power of roughly <strong>{formatCurrency(goalAmount / Math.pow(1.07, timeframeYears))}</strong> in today\'s money. Ensure your target is inflated!</span>
                </li>
                {timeframeYears < 5 && annualReturn > 10 && (
                  <li className="flex items-start text-red-600">
                    <span className="mr-2 font-bold">•</span>
                    <span><strong>Warning:</strong> Assuming {annualReturn}% returns for a short {timeframeYears}-year horizon is highly risky. Consider lowering expected returns to 7-9% using debt/hybrid instruments.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CalculatorContentWrapper
        contentData={contentData}
        title="Comprehensive Guide to Financial Goal Planning in India"
      />
    </>
  );
};

export default FinancialGoalCalculator;
