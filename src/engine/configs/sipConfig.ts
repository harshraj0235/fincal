import { CalculatorConfig } from '../types';

export const sipConfig: CalculatorConfig = {
  id: 'sip-calculator',
  title: 'SIP Calculator',
  description: 'Calculate the future value of your Systematic Investment Plan.',
  variables: [
    {
      id: 'monthlyInvestment',
      name: 'Monthly Investment',
      type: 'number',
      description: 'Amount you invest every month',
      group: 'Investment Details',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 }
      ],
      defaultUnit: 'inr',
      min: 500,
      max: 1000000,
      step: 500
    },
    {
      id: 'expectedReturn',
      name: 'Expected Return',
      type: 'number',
      description: 'Expected annual return rate',
      group: 'Investment Details',
      units: [
        { id: 'percent_yearly', name: '% p.a.', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'percent_yearly',
      min: 1,
      max: 30,
      step: 0.1
    },
    {
      id: 'timePeriod',
      name: 'Time Period',
      type: 'number',
      description: 'Duration of your investment',
      group: 'Investment Details',
      units: [
        { id: 'years', name: 'Years', toBaseMultiplier: 12 },
        { id: 'months', name: 'Months', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'years',
      min: 1,
      max: 40,
      step: 1
    },
    {
      id: 'totalInvested',
      name: 'Total Invested',
      type: 'number',
      description: 'Total amount invested over the period',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 },
        { id: 'crores', name: 'Crores', toBaseMultiplier: 10000000 }
      ],
      defaultUnit: 'inr'
    },
    {
      id: 'totalReturn',
      name: 'Estimated Returns',
      type: 'number',
      description: 'Total profit earned',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 },
        { id: 'crores', name: 'Crores', toBaseMultiplier: 10000000 }
      ],
      defaultUnit: 'inr'
    },
    {
      id: 'totalWealth',
      name: 'Total Value',
      type: 'number',
      description: 'Total future value of investment',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹ (INR)', toBaseMultiplier: 1 },
        { id: 'lakhs', name: 'Lakhs', toBaseMultiplier: 100000 },
        { id: 'crores', name: 'Crores', toBaseMultiplier: 10000000 }
      ],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'totalInvested',
      dependencies: ['monthlyInvestment', 'timePeriod'],
      fn: ({ monthlyInvestment, timePeriod }) => {
        return monthlyInvestment * timePeriod;
      }
    },
    {
      solveFor: 'totalWealth',
      dependencies: ['monthlyInvestment', 'expectedReturn', 'timePeriod'],
      fn: ({ monthlyInvestment, expectedReturn, timePeriod }) => {
        const r = expectedReturn / 12 / 100;
        const n = timePeriod; // Already in months based on unit multiplier
        if (r === 0) return monthlyInvestment * n;
        return monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      }
    },
    {
      solveFor: 'totalReturn',
      dependencies: ['totalWealth', 'totalInvested'],
      fn: ({ totalWealth, totalInvested }) => {
        return totalWealth - totalInvested;
      }
    },
    {
      solveFor: 'monthlyInvestment',
      dependencies: ['totalWealth', 'expectedReturn', 'timePeriod'],
      fn: ({ totalWealth, expectedReturn, timePeriod }) => {
        const r = expectedReturn / 12 / 100;
        const n = timePeriod;
        if (r === 0) return totalWealth / n;
        return totalWealth / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      }
    }
  ],
  charts: [
    {
      type: 'doughnut',
      title: 'Investment vs Returns',
      dataPoints: [
        { label: 'Invested Amount', valueVariable: 'totalInvested', color: '#3b82f6' },
        { label: 'Estimated Returns', valueVariable: 'totalReturn', color: '#10b981' }
      ]
    }
  ]
};
