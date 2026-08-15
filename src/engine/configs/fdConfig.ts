import { CalculatorConfig } from '../types';

export const fdConfig: CalculatorConfig = {
  id: 'fd-calculator',
  title: 'FD Calculator',
  description: 'Calculate maturity amount and interest earned on your Fixed Deposit.',
  variables: [
    {
      id: 'principal',
      name: 'Deposit Amount',
      type: 'number',
      description: 'Total amount deposited',
      group: 'Deposit Details',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'inr',
      min: 1000,
      max: 10000000,
      step: 1000
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      description: 'Annual interest rate',
      group: 'Deposit Details',
      units: [
        { id: 'percent', name: '% p.a.', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'percent',
      min: 1,
      max: 15,
      step: 0.1
    },
    {
      id: 'tenure',
      name: 'Tenure',
      type: 'number',
      description: 'Duration of fixed deposit',
      group: 'Deposit Details',
      units: [
        { id: 'years', name: 'Years', toBaseMultiplier: 1 },
        { id: 'months', name: 'Months', toBaseMultiplier: 1/12 },
        { id: 'days', name: 'Days', toBaseMultiplier: 1/365 }
      ],
      defaultUnit: 'years',
      min: 1,
      max: 3650,
      step: 1
    },
    {
      id: 'compoundingFrequency',
      name: 'Compounding Frequency',
      type: 'select',
      description: 'How often interest is compounded',
      group: 'Deposit Details',
      options: [
        { label: 'Monthly', value: 12 },
        { label: 'Quarterly', value: 4 },
        { label: 'Half-Yearly', value: 2 },
        { label: 'Annually', value: 1 }
      ]
    },
    {
      id: 'maturityAmount',
      name: 'Maturity Amount',
      type: 'number',
      description: 'Total amount at the end of tenure',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr'
    },
    {
      id: 'interestEarned',
      name: 'Total Interest',
      type: 'number',
      description: 'Interest earned on deposit',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'maturityAmount',
      dependencies: ['principal', 'interestRate', 'tenure', 'compoundingFrequency'],
      fn: ({ principal, interestRate, tenure, compoundingFrequency }) => {
        const r = interestRate / 100;
        const t = tenure; // Already in years due to unit multiplier
        const n = compoundingFrequency;
        if (!n) return principal + (principal * r * t); // Simple interest fallback
        return principal * Math.pow(1 + r / n, n * t);
      }
    },
    {
      solveFor: 'interestEarned',
      dependencies: ['maturityAmount', 'principal'],
      fn: ({ maturityAmount, principal }) => {
        return maturityAmount - principal;
      }
    },
    {
      solveFor: 'principal',
      dependencies: ['maturityAmount', 'interestRate', 'tenure', 'compoundingFrequency'],
      fn: ({ maturityAmount, interestRate, tenure, compoundingFrequency }) => {
        const r = interestRate / 100;
        const t = tenure;
        const n = compoundingFrequency;
        if (!n) return maturityAmount / (1 + r * t);
        return maturityAmount / Math.pow(1 + r / n, n * t);
      }
    }
  ],
  charts: [
    {
      type: 'pie',
      title: 'Principal vs Interest',
      dataPoints: [
        { label: 'Principal', valueVariable: 'principal', color: '#3b82f6' },
        { label: 'Interest', valueVariable: 'interestEarned', color: '#10b981' }
      ]
    }
  ]
};
