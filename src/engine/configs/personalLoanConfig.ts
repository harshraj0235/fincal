import { CalculatorConfig } from '../types';

export const personalLoanConfig: CalculatorConfig = {
  id: 'personal-loan-calculator',
  title: 'Personal Loan Calculator',
  description: 'Calculate EMI and check personal loan eligibility based on your salary.',
  variables: [
    {
      id: 'monthlyIncome',
      name: 'Net Monthly Income',
      type: 'number',
      description: 'Your take-home salary per month',
      group: 'Eligibility',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'inr',
      min: 10000,
      max: 10000000,
      step: 1000
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
      max: 5000000,
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
      min: 8,
      max: 36,
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
    },
    {
      id: 'maxEligibleAmount',
      name: 'Max Eligible Loan',
      type: 'number',
      description: 'Maximum loan you can get based on salary',
      group: 'Eligibility',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'maxEligibleAmount',
      dependencies: ['monthlyIncome'],
      fn: ({ monthlyIncome }) => {
        return Math.min(5000000, monthlyIncome * 25);
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
        const emi = p * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return emi;
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
        const principal = e / (r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        return principal;
      }
    }
  ],
  charts: [
    {
      type: 'pie',
      title: 'Loan Breakup',
      dataPoints: [
        { label: 'Principal', valueVariable: 'principal', color: '#3b82f6' },
        { label: 'Total Interest', fn: ({ emi, tenure, principal }) => (emi * tenure) - principal, color: '#f43f5e' }
      ]
    }
  ]
};
