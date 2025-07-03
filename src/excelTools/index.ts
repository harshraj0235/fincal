// Centralized export for all Excel tool components and metadata
// Add new tool imports and entries here as you build out the suite

import AccountsPayableTracker from '../pages/AccountsPayableTracker';
import AccountsReceivableTracker from '../pages/AccountsReceivableTracker';
import BalanceSheet from '../pages/BalanceSheet';
import BillPaymentTracker from '../pages/BillPaymentTracker';
import BusinessExpenseTracker from '../pages/BusinessExpenseTracker';
import CapitalGainsTaxCalculator from '../pages/CapitalGainsTaxCalculator';
import CashFlowStatement from '../pages/CashFlowStatement';
import CryptoPortfolioTracker from '../pages/CryptoPortfolioTracker';
import DebtRepaymentTracker from '../pages/DebtRepaymentTracker';
import EmergencyFundCalculator from '../pages/EmergencyFundCalculator';
import EventBudgetPlanner from '../pages/EventBudgetPlanner';
// ...add more as needed

export const excelTools = [
  {
    slug: 'accounts-payable-tracker-excel-template',
    name: 'Accounts Payable Tracker',
    description: 'Manage your business payables, track due dates, and avoid late fees.',
    component: AccountsPayableTracker,
  },
  {
    slug: 'accounts-receivable-tracker-excel-template',
    name: 'Accounts Receivable Tracker',
    description: 'Track outstanding invoices and manage receivables efficiently.',
    component: AccountsReceivableTracker,
  },
  {
    slug: 'balance-sheet-excel-template',
    name: 'Balance Sheet',
    description: 'Create a professional balance sheet for your business.',
    component: BalanceSheet,
  },
  {
    slug: 'bill-payment-tracker-excel-template',
    name: 'Bill Payment Tracker',
    description: 'Never miss a bill payment again! Track due dates, amounts, and payment status.',
    component: BillPaymentTracker,
  },
  {
    slug: 'business-expense-tracker-excel-template',
    name: 'Business Expense Tracker',
    description: 'Track business expenses, categorize costs, and prepare for tax deductions.',
    component: BusinessExpenseTracker,
  },
  {
    slug: 'capital-gains-tax-calculator-excel-template',
    name: 'Capital Gains Tax Calculator',
    description: 'Calculate capital gains tax for stocks, mutual funds, and property.',
    component: CapitalGainsTaxCalculator,
  },
  {
    slug: 'cash-flow-statement-excel-template',
    name: 'Cash Flow Statement',
    description: 'Easily prepare and analyze your business cash flow.',
    component: CashFlowStatement,
  },
  {
    slug: 'crypto-portfolio-tracker-excel-template',
    name: 'Crypto Portfolio Tracker',
    description: 'Track cryptocurrency investments, monitor prices, and analyze returns.',
    component: CryptoPortfolioTracker,
  },
  {
    slug: 'debt-repayment-tracker-excel-template',
    name: 'Debt Repayment Tracker',
    description: 'Track and manage debt repayments, visualize progress, and plan debt-free dates.',
    component: DebtRepaymentTracker,
  },
  {
    slug: 'emergency-fund-calculator-excel-template',
    name: 'Emergency Fund Calculator',
    description: 'Calculate and plan your emergency fund. Set targets and track progress.',
    component: EmergencyFundCalculator,
  },
  {
    slug: 'event-budget-planner-excel-template',
    name: 'Event Budget Planner',
    description: 'Plan and manage event expenses. Track costs, payments, and vendor details.',
    component: EventBudgetPlanner,
  },
  // ...add more as you build them
]; 