import { CalculatorConfig } from '../types';

export const carLoanConfig: CalculatorConfig = {
  id: 'car-loan-calculator',
  title: 'Car Loan Calculator',
  description: 'Calculate EMI for your new, used, or electric car.',
  variables: [
    {
      id: 'carValue',
      name: 'On-Road Price',
      type: 'number',
      description: 'Total cost of the car',
      group: 'Vehicle Details',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'lakhs',
      min: 1,
      max: 500,
      step: 0.5
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      description: 'Initial payment percentage',
      group: 'Vehicle Details',
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
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'inr',
      min: 10000,
      max: 50000000,
      step: 10000
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
      max: 25,
      step: 0.1
    },
    {
      id: 'tenure',
      name: 'Loan Tenure',
      type: 'number',
      description: 'Duration of the loan',
      group: 'Loan Details',
      units: [
        { id: 'months', name: 'Months', toBaseMultiplier: 1 },
        { id: 'years', name: 'Years', toBaseMultiplier: 12 }
      ],
      defaultUnit: 'years',
      min: 1,
      max: 10,
      step: 1
    },
    {
      id: 'emi',
      name: 'Monthly EMI',
      type: 'number',
      description: 'Your monthly payment',
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
      dependencies: ['carValue', 'downPayment'],
      fn: ({ carValue, downPayment }) => {
        return Math.round(carValue * (1 - downPayment / 100));
      }
    },
    {
      solveFor: 'carValue',
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
      title: 'Cost Breakup',
      dataPoints: [
        { label: 'Down Payment', valueVariable: 'carValue', fn: ({ carValue, downPayment }) => carValue * (downPayment / 100), color: '#10b981' },
        { label: 'Loan Principal', valueVariable: 'principal', color: '#3b82f6' },
        { label: 'Total Interest', fn: ({ emi, tenure, principal }) => Math.max(0, (emi * tenure) - principal), color: '#f43f5e' }
      ]
    }
  ]
};
