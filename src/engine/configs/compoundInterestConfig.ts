import { CalculatorConfig } from '../types';

export const compoundInterestConfig: CalculatorConfig = {
  id: 'compound-interest-calculator',
  title: 'Compound Interest Calculator',
  description: 'Calculate exponential wealth creation based on compounding frequency.',
  variables: [
    {
      id: 'principal',
      name: 'Principal Amount',
      type: 'number',
      description: 'The initial amount you want to invest',
      group: 'Inputs',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 1000,
      max: 100000000,
      step: 1000
    },
    {
      id: 'rate',
      name: 'Interest Rate',
      type: 'number',
      description: 'Annual interest rate',
      group: 'Inputs',
      units: [{ id: 'percent_yearly', name: '% p.a.', toBaseMultiplier: 1 }],
      defaultUnit: 'percent_yearly',
      min: 1,
      max: 30,
      step: 0.1
    },
    {
      id: 'time',
      name: 'Time Period',
      type: 'number',
      description: 'Duration of the investment',
      group: 'Inputs',
      units: [
        { id: 'years', name: 'Years', toBaseMultiplier: 12 },
        { id: 'months', name: 'Months', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'years',
      min: 1,
      max: 50,
      step: 1
    },
    {
      id: 'compoundingFreq',
      name: 'Compounding Frequency',
      type: 'select',
      description: 'How often interest is compounded',
      group: 'Inputs',
      options: [
        { label: 'Annually (1/Yr)', value: '1' },
        { label: 'Semi-Annually (2/Yr)', value: '2' },
        { label: 'Quarterly (4/Yr)', value: '4' },
        { label: 'Monthly (12/Yr)', value: '12' },
        { label: 'Daily (365/Yr)', value: '365' }
      ]
    },
    {
      id: 'maturityAmount',
      name: 'Maturity Amount',
      type: 'number',
      description: 'Total value of investment at maturity',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'totalInterest',
      name: 'Total Interest Earned',
      type: 'number',
      description: 'Wealth generated from interest',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'effectiveRate',
      name: 'Effective Annual Rate (EAR)',
      type: 'number',
      description: 'The true annualized rate of return',
      group: 'Results',
      units: [{ id: 'percent_yearly', name: '% p.a.', toBaseMultiplier: 1 }],
      defaultUnit: 'percent_yearly'
    }
  ],
  solvers: [
    {
      solveFor: 'maturityAmount',
      dependencies: ['principal', 'rate', 'time', 'compoundingFreq'],
      fn: ({ principal, rate, time, compoundingFreq }) => {
        const r = rate / 100;
        const n = Number(compoundingFreq);
        // Time base unit is months, convert to years for formula
        const t = time / 12;
        return principal * Math.pow(1 + r / n, n * t);
      }
    },
    {
      solveFor: 'totalInterest',
      dependencies: ['maturityAmount', 'principal'],
      fn: ({ maturityAmount, principal }) => Math.max(0, maturityAmount - principal)
    },
    {
      solveFor: 'effectiveRate',
      dependencies: ['rate', 'compoundingFreq'],
      fn: ({ rate, compoundingFreq }) => {
        const r = rate / 100;
        const n = Number(compoundingFreq);
        return (Math.pow(1 + r / n, n) - 1) * 100;
      }
    }
  ],
  charts: [
    {
      type: 'doughnut',
      title: 'Wealth Breakdown',
      dataPoints: [
        { label: 'Principal', valueVariable: 'principal', color: '#10b981' }, // emerald-500
        { label: 'Interest', valueVariable: 'totalInterest', color: '#3b82f6' } // blue-500
      ]
    }
  ]
};
