import { CalculatorConfig } from '../types';

export const ppfConfig: CalculatorConfig = {
  id: 'ppf-calculator',
  title: 'PPF Calculator',
  description: 'Calculate maturity value and interest for Public Provident Fund (PPF).',
  variables: [
    {
      id: 'yearlyInvestment',
      name: 'Yearly Investment',
      type: 'number',
      description: 'Amount invested every year (Max ₹1.5 Lakhs)',
      group: 'PPF Details',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'inr',
      min: 500,
      max: 150000,
      step: 500
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      description: 'Current PPF Interest Rate',
      group: 'PPF Details',
      units: [
        { id: 'percent', name: '% p.a.', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'percent',
      min: 7,
      max: 10,
      step: 0.1
    },
    {
      id: 'timePeriod',
      name: 'Time Period',
      type: 'number',
      description: 'PPF Tenure in Years (Min 15)',
      group: 'PPF Details',
      units: [
        { id: 'years', name: 'Years', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'years',
      min: 15,
      max: 50,
      step: 5
    },
    {
      id: 'totalInvested',
      name: 'Total Invested',
      type: 'number',
      description: 'Total amount deposited',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'inr'
    },
    {
      id: 'totalInterest',
      name: 'Total Interest',
      type: 'number',
      description: 'Total tax-free interest earned',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'inr'
    },
    {
      id: 'maturityValue',
      name: 'Maturity Value',
      type: 'number',
      description: 'Total tax-free maturity amount',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 },
        { id: 'crores', name: 'Crores', toBaseMultiplier: 10000000 }
      ],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'totalInvested',
      dependencies: ['yearlyInvestment', 'timePeriod'],
      fn: ({ yearlyInvestment, timePeriod }) => {
        return yearlyInvestment * timePeriod;
      }
    },
    {
      solveFor: 'maturityValue',
      dependencies: ['yearlyInvestment', 'interestRate', 'timePeriod'],
      fn: ({ yearlyInvestment, interestRate, timePeriod }) => {
        const r = interestRate / 100;
        let balance = 0;
        // Accurate PPF calculation: interest is calculated monthly but compounded annually
        // Assuming monthly investments for average scenario
        const monthlyDeposit = yearlyInvestment / 12;
        
        for (let yr = 1; yr <= timePeriod; yr++) {
          let yearInterest = 0;
          let monthlyBalance = balance;
          
          for (let m = 1; m <= 12; m++) {
            monthlyBalance += monthlyDeposit;
            yearInterest += monthlyBalance * r / 12;
          }
          
          balance += yearlyInvestment + yearInterest;
        }
        return balance;
      }
    },
    {
      solveFor: 'totalInterest',
      dependencies: ['maturityValue', 'totalInvested'],
      fn: ({ maturityValue, totalInvested }) => {
        return maturityValue - totalInvested;
      }
    },
    {
      solveFor: 'yearlyInvestment',
      dependencies: ['maturityValue', 'interestRate', 'timePeriod'],
      fn: ({ maturityValue, interestRate, timePeriod }) => {
        // Binary search to find required yearly investment for target maturity
        let low = 0;
        let high = maturityValue;
        const r = interestRate / 100;
        
        for (let iter = 0; iter < 50; iter++) {
          const mid = (low + high) / 2;
          let balance = 0;
          const monthlyDeposit = mid / 12;
          
          for (let yr = 1; yr <= timePeriod; yr++) {
            let yearInterest = 0;
            let monthlyBalance = balance;
            for (let m = 1; m <= 12; m++) {
              monthlyBalance += monthlyDeposit;
              yearInterest += monthlyBalance * r / 12;
            }
            balance += mid + yearInterest;
          }
          
          if (balance < maturityValue) {
            low = mid;
          } else {
            high = mid;
          }
        }
        return (low + high) / 2;
      }
    }
  ],
  charts: [
    {
      type: 'doughnut',
      title: 'PPF Wealth Creation',
      dataPoints: [
        { label: 'Total Invested', valueVariable: 'totalInvested', color: '#3b82f6' },
        { label: 'Total Interest', valueVariable: 'totalInterest', color: '#10b981' }
      ]
    }
  ]
};
