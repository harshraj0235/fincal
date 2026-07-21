import { CalculatorConfig } from '../types';

export const advanceTaxConfig: CalculatorConfig = {
  id: 'advance-tax-calculator',
  title: 'Advance Tax Calculator',
  description: 'Calculate your Advance Tax installments for the financial year.',
  variables: [
    {
      id: 'taxRegime',
      name: 'Tax Regime',
      type: 'select',
      description: 'Choose your tax regime',
      group: 'Basic Details',
      options: [
        { label: 'New Regime (Default)', value: 1 },
        { label: 'Old Regime', value: 0 }
      ]
    },
    {
      id: 'annualSalary',
      name: 'Annual Salary',
      type: 'number',
      group: 'Income Sources',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 0,
      max: 100000000,
      step: 10000
    },
    {
      id: 'businessIncome',
      name: 'Business/Professional Income',
      type: 'number',
      group: 'Income Sources',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 0,
      max: 100000000,
      step: 10000
    },
    {
      id: 'capitalGains',
      name: 'Capital Gains',
      type: 'number',
      group: 'Income Sources',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 0,
      max: 100000000,
      step: 10000
    },
    {
      id: 'houseProperty',
      name: 'Income from House Property',
      type: 'number',
      group: 'Income Sources',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 0,
      max: 100000000,
      step: 10000
    },
    {
      id: 'otherSources',
      name: 'Income from Other Sources',
      type: 'number',
      group: 'Income Sources',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 0,
      max: 100000000,
      step: 10000
    },
    {
      id: 'deduction80C',
      name: '80C Deductions (Old Regime)',
      type: 'number',
      group: 'Deductions & Tax Paid',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 0,
      max: 150000,
      step: 5000
    },
    {
      id: 'deduction80D',
      name: '80D Deductions (Old Regime)',
      type: 'number',
      group: 'Deductions & Tax Paid',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 0,
      max: 100000,
      step: 5000
    },
    {
      id: 'tdsDeducted',
      name: 'TDS/TCS already Deducted',
      type: 'number',
      group: 'Deductions & Tax Paid',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr',
      min: 0,
      max: 10000000,
      step: 5000
    },
    {
      id: 'totalIncome',
      name: 'Taxable Income',
      type: 'number',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'grossTax',
      name: 'Gross Tax Liability',
      type: 'number',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    },
    {
      id: 'netTax',
      name: 'Net Advance Tax Due',
      type: 'number',
      group: 'Results',
      units: [{ id: 'inr', name: '₹', toBaseMultiplier: 1 }],
      defaultUnit: 'inr'
    }
  ],
  solvers: [
    {
      solveFor: 'totalIncome',
      dependencies: ['taxRegime', 'annualSalary', 'businessIncome', 'capitalGains', 'houseProperty', 'otherSources', 'deduction80C', 'deduction80D'],
      fn: (v) => {
        const grossIncome = v.annualSalary + v.businessIncome + v.capitalGains + v.houseProperty + v.otherSources;
        let appliedDeductions = 0;
        if (v.taxRegime === 0) { // Old
          appliedDeductions = Math.min(v.deduction80C, 150000) + Math.min(v.deduction80D, 100000);
          if (v.annualSalary > 0) appliedDeductions += 50000;
        } else { // New
          if (v.annualSalary > 0) appliedDeductions += 75000;
        }
        return Math.max(0, grossIncome - appliedDeductions);
      }
    },
    {
      solveFor: 'grossTax',
      dependencies: ['totalIncome', 'taxRegime'],
      fn: (v) => {
        let tax = 0;
        const inc = v.totalIncome;
        if (v.taxRegime === 1) { // New
          if (inc > 1500000) {
            tax += (inc - 1500000) * 0.30;
            tax += 300000 * 0.20 + 300000 * 0.15 + 300000 * 0.10 + 300000 * 0.05;
          } else if (inc > 1200000) {
            tax += (inc - 1200000) * 0.20;
            tax += 300000 * 0.15 + 300000 * 0.10 + 300000 * 0.05;
          } else if (inc > 900000) {
            tax += (inc - 900000) * 0.15;
            tax += 300000 * 0.10 + 300000 * 0.05;
          } else if (inc > 600000) {
            tax += (inc - 600000) * 0.10;
            tax += 300000 * 0.05;
          } else if (inc > 300000) {
            tax += (inc - 300000) * 0.05;
          }
          if (inc <= 700000) tax = 0;
        } else { // Old
          if (inc > 1000000) {
            tax += (inc - 1000000) * 0.30;
            tax += 500000 * 0.20;
            tax += 250000 * 0.05;
          } else if (inc > 500000) {
            tax += (inc - 500000) * 0.20;
            tax += 250000 * 0.05;
          } else if (inc > 250000) {
            tax += (inc - 250000) * 0.05;
          }
          if (inc <= 500000) tax = 0;
        }
        if (tax > 0) {
          tax *= 1.04; // Cess
        }
        return tax;
      }
    },
    {
      solveFor: 'netTax',
      dependencies: ['grossTax', 'tdsDeducted'],
      fn: (v) => {
        return Math.max(0, v.grossTax - v.tdsDeducted);
      }
    }
  ]
};
