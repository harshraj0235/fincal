import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, PieChart, Home, Coffee, Car, Shield } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const BudgetCalculator: React.FC = () => {
  const [income, setIncome] = useState({
    salary: 80000,
    otherIncome: 5000
  });

  const [expenses, setExpenses] = useState({
    housing: 25000,
    food: 12000,
    transport: 5000,
    utilities: 4000,
    insurance: 3000,
    loans: 8000,
    entertainment: 5000,
    other: 3000
  });

  const totalIncome = Object.values(income).reduce((sum, val) => sum + (val || 0), 0);
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + (val || 0), 0);
  const surplus = totalIncome - totalExpenses;

  // 50/30/20 Rule Targets
  const targetNeeds = totalIncome * 0.5;
  const targetWants = totalIncome * 0.3;
  const targetSavings = totalIncome * 0.2;

  // Actuals based on typical categories
  const actualNeeds = (expenses.housing || 0) + (expenses.food || 0) + (expenses.transport || 0) + (expenses.utilities || 0) + (expenses.insurance || 0) + (expenses.loans || 0);
  const actualWants = (expenses.entertainment || 0) + (expenses.other || 0);
  const actualSavings = surplus;

  const contentData = {
    title: 'Budget Calculator India 2026 (50/30/20 Rule)',
    description: 'Free Monthly Budget Calculator for India. Track your income, control expenses, and optimize your cash flow using the famous 50/30/20 Budgeting Rule. Find out exactly where your money goes and how much you should be saving every month.',
    benefits: [
      'Identifies cash flow leaks immediately',
      'Automatically calculates your 50/30/20 rule adherence',
      'Separates \"Needs\" from \"Wants\" mathematically',
      'Helps prevent credit card debt by keeping expenses below income',
      'Shows exactly how much surplus you have for SIPs and Emergency Funds',
      '100% free tool, customized for the Indian salaried class'
    ],
    howToSteps: [
      {
        step: 'Enter Total Monthly Income',
        details: 'Enter your IN-HAND salary (after PF and TDS deductions). Also add any secondary income like freelance work, rent received, or side-hustle money.'
      },
      {
        step: 'Input Essential Expenses (Needs)',
        details: 'Enter your rent, home loan EMI, groceries, electricity bill, society maintenance, and insurance premiums. These are expenses you cannot avoid even if you lose your job.'
      },
      {
        step: 'Input Discretionary Spending (Wants)',
        details: 'Enter your entertainment, dining out, weekend trips, OTT subscriptions, and luxury shopping. Be brutally honest here; this is where most budgets fail.'
      },
      {
        step: 'Review Surplus & Deficit',
        details: 'If your expenses exceed your income (Deficit), you are living beyond your means and probably accumulating hidden debt. If you have a Surplus, this is the amount available for investing.'
      },
      {
        step: 'Check the 50/30/20 Benchmark',
        details: 'The calculator compares your actual spending against the ideal benchmark (50% Needs, 30% Wants, 20% Savings). If your \"Needs\" cross 50%, you might be living in a house you cannot afford.'
      }
    ],
    tips: [
      'Always budget based on IN-HAND salary, not CTC.',
      'Treat SIPs as an \"Expense\" and deduct it on the 1st of the month (Pay Yourself First).',
      'If your \"Needs\" exceed 60%, avoid taking any new EMIs (No new car or phone!).',
      'Track your expenses for 1 month using a notebook or app before filling this calculator to get accurate numbers.',
      'A 20% savings rate is the bare minimum. Aim for 30%+ to achieve Financial Independence.'
    ],
    mistakes: [
      'Underestimating discretionary spending (the \"I only spend ₹2000 on weekends\" myth).',
      'Forgetting annual expenses (Life insurance premiums, car service) - divide them by 12 and add to monthly budget.',
      'Including Credit Card payments as a category (Credit card is a payment method, not an expense category. Categorize the actual items bought).',
      'Budgeting with gross salary instead of net take-home pay.',
      'Not leaving a 5% buffer for miscellaneous/unplanned expenses.'
    ],
    examples: [
      {
        scenario: 'The Balanced Budget (₹80,000 Income)',
        inputs: [
          { label: 'Income', value: '₹80,000' },
          { label: 'Needs', value: '₹40,000 (Rent, Groceries, EMIs)' },
          { label: 'Wants', value: '₹15,000 (Dining, Movies, Shopping)' }
        ],
        result: 'Savings: ₹25,000 (31%)',
        explanation: 'This profile perfectly beats the 50/30/20 rule. Needs are exactly 50%, Wants are strictly controlled at 19%, leaving a massive 31% for wealth creation. This person will become wealthy very quickly.'
      },
      {
        scenario: 'The \"House Poor\" Budget (₹1,00,000 Income)',
        inputs: [
          { label: 'Income', value: '₹1,00,000' },
          { label: 'Needs', value: '₹75,000 (High Home Loan EMI, Car EMI)' },
          { label: 'Wants', value: '₹20,000' }
        ],
        result: 'Savings: ₹5,000 (5%)',
        explanation: 'Despite a ₹1 Lakh salary, this person is struggling. Needs (75%) have completely crushed the ability to save. They are one medical emergency away from a debt trap. They must aggressively prepay loans.'
      }
    ],
    faqs: [
      {
        question: 'What is the 50/30/20 Rule?',
        answer: 'It is a budgeting framework popularized by Senator Elizabeth Warren. 50% of your income should go to Needs (Rent, Food), 30% to Wants (Entertainment, Shopping), and 20% to Savings/Investments.'
      },
      {
        question: 'Are EMIs a \"Need\" or a \"Want\"?',
        answer: 'Home Loan and basic Car Loan EMIs are Needs because they represent housing and transport. An EMI for an iPhone 15 Pro Max is a Want (Discretionary expense).'
      },
      {
        question: 'What if my Needs are naturally higher than 50%?',
        answer: 'If you live in a Tier-1 city (Mumbai/Bangalore) or have a starting salary (e.g., ₹25,000), Needs will inevitably cross 50%. In such cases, temporarily adjust the rule to 60/20/20 or 70/10/20 until your income grows.'
      },
      {
        question: 'Should I include tax in my expenses?',
        answer: 'No. The 50/30/20 rule applies to post-tax income. Always enter your net take-home salary after TDS and PF deductions.'
      }
    ],
    relatedCalculators: [
      { name: 'Emergency Fund Calculator', url: '/calculators/emergency-fund-calculator', description: 'Plan safety corpus' },
      { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'Calculate loan burden before buying' },
      { name: 'Net Worth Calculator', url: '/calculators/net-worth-calculator', description: 'Track true wealth' }
    ],
    lastUpdated: '2026-02-15'
  };

  const handleIncomeChange = (field: keyof typeof income) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(prev => ({
      ...prev,
      [field]: Number(e.target.value) || 0
    }));
  };

  const handleExpenseChange = (field: keyof typeof expenses) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenses(prev => ({
      ...prev,
      [field]: Number(e.target.value) || 0
    }));
  };

  return (
    <>
      <SEOHelmet
        title="Budget Calculator India 2026 - 50/30/20 Rule Planner | MoneyCal"
        description="Free monthly budget calculator for India. Track your income, manage expenses, and optimize your cash flow using the 50/30/20 budgeting rule."
        keywords="budget calculator india, 50 30 20 rule calculator, monthly expense tracker, personal finance budget tool, cash flow calculator"
        url="/calculators/budget-calculator"
      />
      <CalculatorSchema
        name="Budget Calculator India"
        description="Calculate and optimize your monthly budget using the 50/30/20 rule."
        url="/calculators/budget-calculator"
        features={['50/30/20 Rule Analysis', 'Income vs Expense Tracking', 'Surplus Calculation', 'Cash flow optimization']}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-15"
      />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Budget Calculator</h1>
        <p className="text-lg text-center text-gray-700 mb-8">Optimize your cash flow using the 50/30/20 Rule.</p>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                Monthly Income
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">In-Hand Salary (Post Tax)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={income.salary}
                      onChange={handleIncomeChange('salary')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Income (Freelance, Rent)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={income.otherIncome}
                      onChange={handleIncomeChange('otherIncome')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Income:</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(totalIncome)}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingDown className="w-6 h-6 mr-2 text-red-500" />
                Monthly Expenses
              </h2>
              
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center border-b pb-2">
                <Home className="w-4 h-4 mr-2" /> Needs (Essentials)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Housing (Rent/Home EMI)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={expenses.housing}
                      onChange={handleExpenseChange('housing')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food & Groceries</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={expenses.food}
                      onChange={handleExpenseChange('food')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transport (Fuel/Cab/Metro)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={expenses.transport}
                      onChange={handleExpenseChange('transport')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Utilities (Electricity, Internet)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={expenses.utilities}
                      onChange={handleExpenseChange('utilities')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance (Life/Health)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={expenses.insurance}
                      onChange={handleExpenseChange('insurance')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Loan EMIs (Car, Edu)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={expenses.loans}
                      onChange={handleExpenseChange('loans')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-700 mb-3 flex items-center border-b pb-2">
                <Coffee className="w-4 h-4 mr-2" /> Wants (Discretionary)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entertainment & Dining</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={expenses.entertainment}
                      onChange={handleExpenseChange('entertainment')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shopping & Others</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={expenses.other}
                      onChange={handleExpenseChange('other')}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Expenses:</span>
                <span className="text-xl font-bold text-red-600">{formatCurrency(totalExpenses)}</span>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border-2 border-indigo-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-indigo-600" />
                Budget Summary
              </h3>
              
              <div className="bg-white rounded-xl p-5 shadow-sm mb-6 border border-indigo-50">
                <p className="text-sm text-gray-600 mb-1">Monthly Surplus (Available to Invest)</p>
                <p className={`text-4xl font-bold ${surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(surplus)}
                </p>
                <p className="text-xs text-gray-500 mt-2">Income minus Expenses</p>
              </div>

              <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">50/30/20 Rule Analysis</h4>
              
              <div className="space-y-4">
                {/* Needs */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Needs (Target 50%)</span>
                    <span className={`font-bold ${(actualNeeds/totalIncome)*100 > 50 ? 'text-red-600' : 'text-green-600'}`}>
                      {((actualNeeds/totalIncome)*100 || 0).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${(actualNeeds/totalIncome)*100 > 50 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, (actualNeeds/totalIncome)*100 || 0)}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Actual: {formatCurrency(actualNeeds)} | Target: {formatCurrency(targetNeeds)}</p>
                </div>

                {/* Wants */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Wants (Target 30%)</span>
                    <span className={`font-bold ${(actualWants/totalIncome)*100 > 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {((actualWants/totalIncome)*100 || 0).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${(actualWants/totalIncome)*100 > 30 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, (actualWants/totalIncome)*100 || 0)}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Actual: {formatCurrency(actualWants)} | Target: {formatCurrency(targetWants)}</p>
                </div>

                {/* Savings */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">Savings (Target 20%+)</span>
                    <span className={`font-bold ${(actualSavings/totalIncome)*100 < 20 ? 'text-red-600' : 'text-green-600'}`}>
                      {((actualSavings/totalIncome)*100 || 0).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${(actualSavings/totalIncome)*100 < 20 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, Math.max(0, (actualSavings/totalIncome)*100 || 0))}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Actual: {formatCurrency(actualSavings)} | Target: {formatCurrency(targetSavings)}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <CalculatorContentWrapper
        contentData={contentData}
        title="Comprehensive Guide to Budgeting in India"
      />
    </>
  );
};

export default BudgetCalculator;
