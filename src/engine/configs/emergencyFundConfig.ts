import { CalculatorConfig } from '../types';

export const emergencyFundConfig: CalculatorConfig = {
  id: 'emergency-fund-calculator',
  title: 'Emergency Fund Calculator',
  description: 'Calculate how much emergency corpus you need for financial security.',
  variables: [
    {
      id: 'monthlyExpenses',
      name: 'Monthly Expenses',
      type: 'number',
      description: 'Your total essential monthly expenses',
      group: 'Inputs',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 5000,
      max: 1000000,
      step: 1000,
      defaultValue: 50000
    },
    {
      id: 'monthsOfCoverage',
      name: 'Months of Coverage',
      type: 'number',
      description: 'Number of months you want to cover',
      group: 'Inputs',
      units: [{ id: 'months', name: 'Months', toBaseMultiplier: 1 }],
      defaultUnit: 'months',
      min: 3,
      max: 24,
      step: 1,
      defaultValue: 6
    },
    {
      id: 'emergencyFund',
      name: 'Emergency Fund Required',
      type: 'number',
      description: 'Total emergency corpus needed',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'savingsAccount',
      name: 'In Savings Account (20%)',
      type: 'number',
      description: 'Instant access for immediate emergencies',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'liquidFunds',
      name: 'In Liquid Mutual Funds (60%)',
      type: 'number',
      description: '1-day access, better returns',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'debtFunds',
      name: 'In Ultra-Short Debt Funds (20%)',
      type: 'number',
      description: '3-day access, slightly higher returns',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'emergencyFund',
      dependencies: ['monthlyExpenses', 'monthsOfCoverage'],
      fn: ({ monthlyExpenses, monthsOfCoverage }) => monthlyExpenses * monthsOfCoverage
    },
    {
      solveFor: 'savingsAccount',
      dependencies: ['emergencyFund'],
      fn: ({ emergencyFund }) => emergencyFund * 0.2
    },
    {
      solveFor: 'liquidFunds',
      dependencies: ['emergencyFund'],
      fn: ({ emergencyFund }) => emergencyFund * 0.6
    },
    {
      solveFor: 'debtFunds',
      dependencies: ['emergencyFund'],
      fn: ({ emergencyFund }) => emergencyFund * 0.2
    }
  ],
  charts: [
    {
      type: 'doughnut',
      title: 'Emergency Fund Allocation',
      dataPoints: [
        { label: 'Savings Account', valueVariable: 'savingsAccount', color: '#10b981' },
        { label: 'Liquid Mutual Funds', valueVariable: 'liquidFunds', color: '#3b82f6' },
        { label: 'Ultra-Short Debt Funds', valueVariable: 'debtFunds', color: '#f59e0b' }
      ]
    }
  ]
};
