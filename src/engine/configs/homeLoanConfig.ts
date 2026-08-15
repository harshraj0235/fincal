import { CalculatorConfig } from '../types';

export const homeLoanConfig: CalculatorConfig = {
  id: 'home-loan-calculator',
  title: 'Home Loan Calculator',
  description: 'Calculate your Home Loan EMI, amortization schedule, and tax savings.',
  variables: [
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      description: 'Total value of the property',
      group: 'Loan Details',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 },
        { id: 'crores', name: 'Crores', toBaseMultiplier: 10000000 }
      ],
      defaultUnit: 'lakhs',
      min: 100000,
      max: 500000000,
      step: 50000
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      description: 'Initial payment as a percentage',
      group: 'Loan Details',
      units: [
        { id: 'percent', name: '%', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'percent',
      min: 0,
      max: 100,
      step: 1
    },
    {
      id: 'principal',
      name: 'Loan Amount',
      type: 'number',
      description: 'Total amount you wish to borrow',
      group: 'Loan Details',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 },
        { id: 'crores', name: 'Crores', toBaseMultiplier: 10000000 }
      ],
      defaultUnit: 'lakhs',
      min: 100000,
      max: 500000000,
      step: 50000
    },
    {
      id: 'rate',
      name: 'Interest Rate',
      type: 'number',
      description: 'Annual interest rate',
      group: 'Loan Details',
      units: [
        { id: 'percent_yearly', name: '% p.a.', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'percent_yearly',
      min: 5,
      max: 20,
      step: 0.05
    },
    {
      id: 'tenure',
      name: 'Loan Tenure',
      type: 'number',
      description: 'Duration of the loan',
      group: 'Loan Details',
      units: [
        { id: 'years', name: 'Years', toBaseMultiplier: 12 },
        { id: 'months', name: 'Months', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'years',
      min: 1,
      max: 30,
      step: 1
    },
    {
      id: 'monthlyPrepayment',
      name: 'Monthly Prepayment',
      type: 'number',
      description: 'Extra amount paid every month',
      group: 'Prepayment & Tax',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'taxSlab',
      name: 'Income Tax Slab',
      type: 'select',
      description: 'Your applicable income tax bracket',
      group: 'Prepayment & Tax',
      options: [
        { label: '30% Slab', value: 0.30 },
        { label: '20% Slab', value: 0.20 },
        { label: '10% Slab', value: 0.10 },
        { label: 'No Tax', value: 0 }
      ]
    },
    {
      id: 'emi',
      name: 'Monthly EMI',
      type: 'number',
      description: 'Your required monthly payment',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'principal',
      dependencies: ['propertyValue', 'downPayment'],
      fn: ({ propertyValue, downPayment }) => {
        return Math.round(propertyValue * (1 - downPayment / 100));
      }
    },
    {
      solveFor: 'propertyValue',
      dependencies: ['principal', 'downPayment'],
      fn: ({ principal, downPayment }) => {
        if (downPayment >= 100) return principal;
        return Math.round(principal / (1 - downPayment / 100));
      }
    },
    {
      solveFor: 'emi',
      dependencies: ['principal', 'rate', 'tenure'],
      fn: ({ principal, rate, tenure }) => {
        const p = principal;
        const r = rate / 12 / 100;
        const n = tenure;
        if (p === 0 || n === 0) return 0;
        if (r === 0) return p / n;
        return p * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
    },
    {
      solveFor: 'principal',
      dependencies: ['emi', 'rate', 'tenure'],
      fn: ({ emi, rate, tenure }) => {
        const e = emi;
        const r = rate / 12 / 100;
        const n = tenure;
        if (e === 0 || n === 0) return 0;
        if (r === 0) return e * n;
        return e / (r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      }
    }
  ],
  charts: [
    {
      type: 'pie',
      title: 'Payment Breakup',
      dataPoints: [
        { label: 'Principal Amount', valueVariable: 'principal', color: '#3b82f6' },
        { label: 'Interest Amount', fn: ({ emi, tenure, principal }) => Math.max(0, (emi * tenure) - principal), color: '#f43f5e' }
      ]
    }
  ]
};
