import { CalculatorConfig } from '../types';

export const bikeLoanConfig: CalculatorConfig = {
  id: 'bike-loan-calculator',
  title: 'Bike Loan EMI Calculator',
  description: 'Calculate your two-wheeler loan EMI, total interest, and amortization schedule.',
  variables: [
    {
      id: 'bikePrice',
      name: 'Bike On-Road Price',
      type: 'number',
      description: 'Total on-road price including insurance and RTO',
      group: 'Loan Details',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 30000,
      max: 600000,
      step: 5000
    },
    {
      id: 'downPayment',
      name: 'Down Payment (%)',
      type: 'number',
      description: 'Percentage of price you will pay upfront',
      group: 'Loan Details',
      units: [{ id: 'percent', name: '%', toBaseMultiplier: 1 }],
      defaultUnit: 'percent',
      min: 0,
      max: 80,
      step: 1
    },
    {
      id: 'interestRate',
      name: 'Interest Rate',
      type: 'number',
      description: 'Annual interest rate',
      group: 'Loan Details',
      units: [{ id: 'percent_yearly', name: '% p.a.', toBaseMultiplier: 1 }],
      defaultUnit: 'percent_yearly',
      min: 7,
      max: 25,
      step: 0.1
    },
    {
      id: 'loanTenure',
      name: 'Loan Tenure',
      type: 'number',
      description: 'Duration of the loan in years',
      group: 'Loan Details',
      units: [
        { id: 'years', name: 'Years', toBaseMultiplier: 12 },
        { id: 'months', name: 'Months', toBaseMultiplier: 1 }
      ],
      defaultUnit: 'years',
      min: 1,
      max: 5,
      step: 1
    },
    {
      id: 'loanAmount',
      name: 'Principal Loan Amount',
      type: 'number',
      description: 'Actual amount borrowed',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'dpAmount',
      name: 'Down Payment Amount',
      type: 'number',
      description: 'Amount paid upfront',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'emi',
      name: 'Monthly EMI',
      type: 'number',
      description: 'Your monthly installment',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'totalInterest',
      name: 'Total Interest Payable',
      type: 'number',
      description: 'Total interest paid over the loan tenure',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'totalPayment',
      name: 'Total Payment (Principal + Interest)',
      type: 'number',
      description: 'Total amount paid back to the lender',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'dpAmount',
      dependencies: ['bikePrice', 'downPayment'],
      fn: ({ bikePrice, downPayment }) => bikePrice * (downPayment / 100)
    },
    {
      solveFor: 'loanAmount',
      dependencies: ['bikePrice', 'dpAmount'],
      fn: ({ bikePrice, dpAmount }) => bikePrice - dpAmount
    },
    {
      solveFor: 'emi',
      dependencies: ['loanAmount', 'interestRate', 'loanTenure'],
      fn: ({ loanAmount, interestRate, loanTenure }) => {
        if (loanAmount <= 0) return 0;
        const ratePerMonth = interestRate / 12 / 100;
        if (ratePerMonth === 0) return loanAmount / loanTenure;
        return (loanAmount * ratePerMonth * Math.pow(1 + ratePerMonth, loanTenure)) / (Math.pow(1 + ratePerMonth, loanTenure) - 1);
      }
    },
    {
      solveFor: 'totalPayment',
      dependencies: ['emi', 'loanTenure'],
      fn: ({ emi, loanTenure }) => emi * loanTenure
    },
    {
      solveFor: 'totalInterest',
      dependencies: ['totalPayment', 'loanAmount'],
      fn: ({ totalPayment, loanAmount }) => Math.max(0, totalPayment - loanAmount)
    }
  ],
  charts: [
    {
      type: 'doughnut',
      title: 'Total Payment Breakup',
      dataPoints: [
        { label: 'Principal Loan Amount', valueVariable: 'loanAmount', color: '#3b82f6' },
        { label: 'Total Interest', valueVariable: 'totalInterest', color: '#f59e0b' }
      ]
    },
    {
      type: 'doughnut',
      title: 'Overall Bike Cost',
      dataPoints: [
        { label: 'Down Payment', valueVariable: 'dpAmount', color: '#10b981' },
        { label: 'Principal Loan Amount', valueVariable: 'loanAmount', color: '#3b82f6' },
        { label: 'Total Interest', valueVariable: 'totalInterest', color: '#f59e0b' }
      ]
    }
  ]
};
