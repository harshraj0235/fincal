import { CalculatorConfig } from '../types';

export const emiConfig: CalculatorConfig = {
  id: 'emi-calculator-omni',
  title: 'EMI Calculator',
  description: 'Calculate Equated Monthly Installment (EMI) for Home, Car, or Personal Loans.',
  variables: [
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
      min: 1,
      max: 500,
      step: 1
    },
    {
      id: 'rate',
      name: 'Interest Rate',
      type: 'number',
      description: 'Annual interest rate',
      group: 'Loan Details',
      units: [
        { id: 'percent_yearly', name: '% p.a.', toBaseMultiplier: 1 },
        { id: 'percent_monthly', name: '% p.m.', toBaseMultiplier: 12 }
      ],
      defaultUnit: 'percent_yearly',
      min: 1,
      max: 30,
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
      max: 30,
      step: 1
    },
    {
      id: 'emi',
      name: 'Monthly EMI',
      type: 'number',
      description: 'Your monthly payment',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr'
    },
    {
      id: 'totalPayment',
      name: 'Total Payment',
      type: 'number',
      description: 'Principal + Total Interest',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'lakhs'
    },
    {
      id: 'totalInterest',
      name: 'Total Interest',
      type: 'number',
      description: 'Total interest over the loan tenure',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'lakhs'
    }
  ],
  solvers: [
    {
      solveFor: 'emi',
      dependencies: ['principal', 'rate', 'tenure'],
      fn: ({ principal, rate, tenure }) => {
        const r = rate / 12 / 100;
        if (r === 0) return principal / tenure;
        return (principal * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
      }
    },
    {
      solveFor: 'principal',
      dependencies: ['emi', 'rate', 'tenure'],
      fn: ({ emi, rate, tenure }) => {
        const r = rate / 12 / 100;
        if (r === 0) return emi * tenure;
        return (emi / r) * (1 - Math.pow(1 + r, -tenure));
      }
    },
    {
      solveFor: 'tenure',
      dependencies: ['principal', 'rate', 'emi'],
      fn: ({ principal, rate, emi }) => {
        const r = rate / 12 / 100;
        if (r === 0) return principal / emi;
        if (emi <= principal * r) return NaN; // Loan will never be paid off
        const n = Math.log(emi / (emi - principal * r)) / Math.log(1 + r);
        return Math.ceil(n); // Usually rounded to next month
      }
    },
    {
      solveFor: 'totalPayment',
      dependencies: ['emi', 'tenure'],
      fn: ({ emi, tenure }) => {
        return emi * tenure;
      }
    },
    {
       solveFor: 'emi',
       dependencies: ['totalPayment', 'tenure'],
       fn: ({ totalPayment, tenure }) => {
         return totalPayment / tenure;
       }
    },
    {
       solveFor: 'totalInterest',
       dependencies: ['totalPayment', 'principal'],
       fn: ({ totalPayment, principal }) => {
         return totalPayment - principal;
       }
    },
    {
       solveFor: 'totalPayment',
       dependencies: ['totalInterest', 'principal'],
       fn: ({ totalInterest, principal }) => {
         return totalInterest + principal;
       }
    }
  ],
  charts: [
    {
      type: 'pie',
      title: 'Principal vs Interest',
      dataPoints: [
        { label: 'Principal', valueVariable: 'principal', color: '#3b82f6' },
        { label: 'Total Interest', valueVariable: 'totalInterest', color: '#f59e0b' }
      ]
    }
  ]
};
