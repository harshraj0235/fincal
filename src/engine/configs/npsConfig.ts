import { CalculatorConfig } from '../types';

export const npsConfig: CalculatorConfig = {
  id: 'nps-calculator',
  title: 'NPS Calculator',
  description: 'Estimate your retirement corpus under the National Pension System.',
  variables: [
    {
      id: 'currentAge',
      name: 'Current Age',
      type: 'number',
      description: 'Your current age',
      group: 'Personal Details',
      units: [{ id: 'years', name: 'Years', toBaseMultiplier: 1 }],
      defaultUnit: 'years',
      min: 18,
      max: 70,
      step: 1
    },
    {
      id: 'retirementAge',
      name: 'Retirement Age',
      type: 'number',
      description: 'Age at which you plan to retire (usually 60)',
      group: 'Personal Details',
      units: [{ id: 'years', name: 'Years', toBaseMultiplier: 1 }],
      defaultUnit: 'years',
      min: 60,
      max: 75,
      step: 1
    },
    {
      id: 'monthlyContribution',
      name: 'Your Monthly Contribution',
      type: 'number',
      description: 'Amount you invest per month',
      group: 'Investment Details',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 500,
      max: 150000,
      step: 500
    },
    {
      id: 'employerContribution',
      name: 'Employer Monthly Contribution',
      type: 'number',
      description: 'Amount your employer invests per month (optional)',
      group: 'Investment Details',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 0,
      max: 150000,
      step: 500
    },
    {
      id: 'equityAllocation',
      name: 'Equity Allocation (E)',
      type: 'number',
      description: 'Percentage invested in Equity (max 75%)',
      group: 'Portfolio Strategy',
      units: [{ id: 'percent', name: '%', toBaseMultiplier: 1 }],
      defaultUnit: 'percent',
      min: 0,
      max: 75,
      step: 5
    },
    {
      id: 'expectedReturn',
      name: 'Expected Equity Return',
      type: 'number',
      description: 'Expected return from equity (Debt assumed 2% lower)',
      group: 'Portfolio Strategy',
      units: [{ id: 'percent_yearly', name: '% p.a.', toBaseMultiplier: 1 }],
      defaultUnit: 'percent_yearly',
      min: 5,
      max: 20,
      step: 0.5
    },
    {
      id: 'maturityAmount',
      name: 'Total NPS Corpus',
      type: 'number',
      description: 'Estimated corpus at retirement',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'totalContribution',
      name: 'Total Principal Invested',
      type: 'number',
      description: 'Total amount invested over the years',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'returnAmount',
      name: 'Wealth Gained',
      type: 'number',
      description: 'Total returns earned',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'taxFreeLumpSum',
      name: 'Tax-Free Lumpsum (60%)',
      type: 'number',
      description: 'Amount you can withdraw tax-free',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'annuityAmount',
      name: 'Annuity Re-investment (40%)',
      type: 'number',
      description: 'Amount that must go towards pension',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'maturityAmount',
      dependencies: ['currentAge', 'retirementAge', 'monthlyContribution', 'employerContribution', 'equityAllocation', 'expectedReturn'],
      fn: ({ currentAge, retirementAge, monthlyContribution, employerContribution, equityAllocation, expectedReturn }) => {
        const investmentYears = retirementAge - currentAge;
        if (investmentYears <= 0) return 0;
        
        let balance = 0;
        const yearlySelf = monthlyContribution * 12;
        const yearlyEmployer = employerContribution * 12;
        const yearlyContribution = yearlySelf + yearlyEmployer;
        
        for (let year = 1; year <= investmentYears; year++) {
          balance += yearlyContribution;
          const equityReturns = balance * (equityAllocation / 100) * (expectedReturn / 100);
          const debtReturns = balance * ((100 - equityAllocation) / 100) * ((expectedReturn - 2) / 100);
          balance += (equityReturns + debtReturns);
        }
        return balance;
      }
    },
    {
      solveFor: 'totalContribution',
      dependencies: ['currentAge', 'retirementAge', 'monthlyContribution', 'employerContribution'],
      fn: ({ currentAge, retirementAge, monthlyContribution, employerContribution }) => {
        const investmentYears = Math.max(0, retirementAge - currentAge);
        return (monthlyContribution * 12 + employerContribution * 12) * investmentYears;
      }
    },
    {
      solveFor: 'returnAmount',
      dependencies: ['maturityAmount', 'totalContribution'],
      fn: ({ maturityAmount, totalContribution }) => Math.max(0, maturityAmount - totalContribution)
    },
    {
      solveFor: 'taxFreeLumpSum',
      dependencies: ['maturityAmount'],
      fn: ({ maturityAmount }) => maturityAmount * 0.6
    },
    {
      solveFor: 'annuityAmount',
      dependencies: ['maturityAmount'],
      fn: ({ maturityAmount }) => maturityAmount * 0.4
    }
  ],
  charts: [
    {
      type: 'doughnut',
      title: 'Maturity Value Breakup',
      dataPoints: [
        { label: 'Total Invested', valueVariable: 'totalContribution', color: '#3b82f6' },
        { label: 'Wealth Gained', valueVariable: 'returnAmount', color: '#10b981' }
      ]
    },
    {
      type: 'doughnut',
      title: 'Corpus Usage (Mandatory)',
      dataPoints: [
        { label: 'Tax-Free Withdrawal (60%)', valueVariable: 'taxFreeLumpSum', color: '#0ea5e9' },
        { label: 'Pension Annuity (40%)', valueVariable: 'annuityAmount', color: '#f59e0b' }
      ]
    }
  ]
};
