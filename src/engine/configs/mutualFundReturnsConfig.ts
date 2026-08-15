import { CalculatorConfig } from '../types';

export const mutualFundReturnsConfig: CalculatorConfig = {
  id: 'mutual-fund-returns-calculator',
  title: 'Mutual Fund Returns Calculator',
  description: 'Calculate future wealth from SIP and Lumpsum investments.',
  variables: [
    {
      id: 'investmentType',
      name: 'Investment Type',
      type: 'select',
      description: 'Choose how you want to invest',
      group: 'Investment Details',
      options: [
        { label: 'SIP (Monthly)', value: 1 },
        { label: 'Lumpsum (One-time)', value: 0 }
      ]
    },
    {
      id: 'investmentAmount',
      name: 'Investment Amount',
      type: 'number',
      description: 'Amount you want to invest',
      group: 'Investment Details',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr',
      min: 500,
      max: 10000000,
      step: 500
    },
    {
      id: 'expectedReturn',
      name: 'Expected Return Rate',
      type: 'number',
      description: 'Expected annual growth',
      group: 'Investment Details',
      units: [
        { id: 'percent_yearly', name: '% p.a.', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'percent_yearly',
      min: 1,
      max: 30,
      step: 0.5
    },
    {
      id: 'investmentPeriod',
      name: 'Time Period',
      type: 'number',
      description: 'Duration of investment',
      group: 'Investment Details',
      units: [
        { id: 'years', name: 'Years', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'years',
      min: 1,
      max: 40,
      step: 1
    },
    {
      id: 'existingInvestment',
      name: 'Existing Investment (Optional)',
      type: 'number',
      description: 'Current value of existing investments',
      group: 'Investment Details',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr',
      min: 0,
      max: 50000000,
      step: 5000
    },
    {
      id: 'totalInv',
      name: 'Total Investment',
      type: 'number',
      description: 'Total amount invested by you',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr'
    },
    {
      id: 'totalValue',
      name: 'Total Future Value',
      type: 'number',
      description: 'Estimated total wealth',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr'
    },
    {
      id: 'returns',
      name: 'Wealth Gained',
      type: 'number',
      description: 'Total profit earned',
      group: 'Results',
      units: [
        { id: 'inr', name: '₹', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'totalInv',
      dependencies: ['investmentType', 'investmentAmount', 'investmentPeriod', 'existingInvestment'],
      fn: ({ investmentType, investmentAmount, investmentPeriod, existingInvestment }) => {
        const p = investmentAmount;
        const t = investmentPeriod;
        let baseInv = 0;
        if (investmentType === 1) { // SIP
          baseInv = p * t * 12;
        } else { // Lumpsum
          baseInv = p;
        }
        return baseInv + existingInvestment;
      }
    },
    {
      solveFor: 'totalValue',
      dependencies: ['investmentType', 'investmentAmount', 'investmentPeriod', 'expectedReturn', 'existingInvestment'],
      fn: ({ investmentType, investmentAmount, investmentPeriod, expectedReturn, existingInvestment }) => {
        const p = investmentAmount;
        const t = investmentPeriod;
        const r = expectedReturn / 100;
        let baseValue = 0;
        
        if (investmentType === 1) { // SIP
          const monthlyRate = r / 12;
          const months = t * 12;
          if (monthlyRate > 0) {
            baseValue = p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
          } else {
            baseValue = p * months;
          }
        } else { // Lumpsum
          baseValue = p * Math.pow(1 + r, t);
        }
        
        const existingGrowth = existingInvestment > 0 ? existingInvestment * Math.pow(1 + r, t) : 0;
        return baseValue + existingGrowth;
      }
    },
    {
      solveFor: 'returns',
      dependencies: ['totalValue', 'totalInv'],
      fn: ({ totalValue, totalInv }) => {
        return Math.max(0, totalValue - totalInv);
      }
    }
  ],
  charts: [
    {
      type: 'doughnut',
      title: 'Wealth Breakdown',
      dataPoints: [
        { label: 'Total Invested', valueVariable: 'totalInv', color: '#3b82f6' },
        { label: 'Wealth Gained', valueVariable: 'returns', color: '#10b981' }
      ]
    }
  ]
};
