import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, TrendingDown, PieChart, BarChart3, Target, AlertCircle, CheckCircle, DollarSign, Calendar, PiggyBank, CreditCard } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  spent: number;
  color: string;
  icon: React.ReactNode;
}

interface BudgetAnalysis {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  savingsRate: number;
  emergencyFundMonths: number;
  debtToIncomeRatio: number;
  recommendations: string[];
}

const BudgetCalculator: React.FC = () => {
  const [income, setIncome] = useState({
    salary: 0,
    freelance: 0,
    investments: 0,
    other: 0
  });

  const [expenses, setExpenses] = useState({
    housing: 0,
    food: 0,
    transportation: 0,
    utilities: 0,
    healthcare: 0,
    entertainment: 0,
    shopping: 0,
    education: 0,
    insurance: 0,
    debt: 0,
    other: 0
  });

  const [analysis, setAnalysis] = useState<BudgetAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const budgetCategories: BudgetCategory[] = [
    { id: 'housing', name: 'Housing & Rent', amount: expenses.housing, spent: 0, color: 'bg-blue-500', icon: <Target className="w-5 h-5" /> },
    { id: 'food', name: 'Food & Groceries', amount: expenses.food, spent: 0, color: 'bg-green-500', icon: <PiggyBank className="w-5 h-5" /> },
    { id: 'transportation', name: 'Transportation', amount: expenses.transportation, spent: 0, color: 'bg-yellow-500', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'utilities', name: 'Utilities', amount: expenses.utilities, spent: 0, color: 'bg-purple-500', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'healthcare', name: 'Healthcare', amount: expenses.healthcare, spent: 0, color: 'bg-red-500', icon: <AlertCircle className="w-5 h-5" /> },
    { id: 'entertainment', name: 'Entertainment', amount: expenses.entertainment, spent: 0, color: 'bg-pink-500', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'shopping', name: 'Shopping', amount: expenses.shopping, spent: 0, color: 'bg-indigo-500', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'education', name: 'Education', amount: expenses.education, spent: 0, color: 'bg-orange-500', icon: <Calculator className="w-5 h-5" /> },
    { id: 'insurance', name: 'Insurance', amount: expenses.insurance, spent: 0, color: 'bg-teal-500', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'debt', name: 'Debt Payments', amount: expenses.debt, spent: 0, color: 'bg-gray-500', icon: <TrendingDown className="w-5 h-5" /> },
    { id: 'other', name: 'Other Expenses', amount: expenses.other, spent: 0, color: 'bg-cyan-500', icon: <Calendar className="w-5 h-5" /> }
  ];

  const calculateBudget = () => {
    const totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0);
    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    const totalSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;
    
    // Calculate emergency fund months (assuming 6 months of expenses)
    const emergencyFundMonths = totalExpenses > 0 ? (totalSavings * 12) / totalExpenses : 0;
    
    // Calculate debt-to-income ratio
    const debtToIncomeRatio = totalIncome > 0 ? (expenses.debt / totalIncome) * 100 : 0;

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (savingsRate < 20) {
      recommendations.push("Your savings rate is below the recommended 20%. Consider reducing discretionary expenses.");
    }
    
    if (debtToIncomeRatio > 20) {
      recommendations.push("Your debt-to-income ratio is high. Focus on paying down high-interest debt first.");
    }
    
    if (expenses.housing / totalIncome > 0.3) {
      recommendations.push("Housing costs exceed 30% of income. Consider downsizing or finding additional income sources.");
    }
    
    if (expenses.food / totalIncome > 0.15) {
      recommendations.push("Food expenses are high. Try meal planning and cooking at home more often.");
    }
    
    if (emergencyFundMonths < 6) {
      recommendations.push("Build an emergency fund covering 6 months of expenses for financial security.");
    }
    
    if (savingsRate >= 20 && debtToIncomeRatio < 20) {
      recommendations.push("Great job! Your budget is well-balanced. Consider increasing investments for long-term wealth building.");
    }

    setAnalysis({
      totalIncome,
      totalExpenses,
      totalSavings,
      savingsRate,
      emergencyFundMonths,
      debtToIncomeRatio,
      recommendations
    });
    
    setShowResults(true);
  };

  const resetCalculator = () => {
    setIncome({ salary: 0, freelance: 0, investments: 0, other: 0 });
    setExpenses({
      housing: 0, food: 0, transportation: 0, utilities: 0, healthcare: 0,
      entertainment: 0, shopping: 0, education: 0, insurance: 0, debt: 0, other: 0
    });
    setAnalysis(null);
    setShowResults(false);
  };

  const getSavingsRateColor = (rate: number) => {
    if (rate >= 20) return 'text-green-600';
    if (rate >= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSavingsRateIcon = (rate: number) => {
    if (rate >= 20) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (rate >= 10) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <>
      <SEOHelmet
        title="Free Budget Calculator - Create & Manage Your Monthly Budget | MoneyCal India"
        description="Create and manage your monthly budget with our comprehensive budget calculator. Track income, expenses, savings rate, and get personalized financial recommendations for better money management."
        keywords="budget calculator, monthly budget, expense tracking, income planning, savings rate, financial planning, money management, personal finance"
        url="/tools/budget-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Budget Calculator",
          "description": "Create and manage your monthly budget with comprehensive tracking and analysis",
          "url": "https://moneycal.in/tools/budget-calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser"
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Budget Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Create and manage your monthly budget with comprehensive tracking, analysis, and personalized recommendations for better financial health.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-3 text-blue-600" />
                Budget Input
              </h2>

              {/* Income Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Monthly Income
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary/Wages</label>
                    <input
                      type="number"
                      value={income.salary}
                      onChange={(e) => setIncome({ ...income, salary: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter monthly salary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Freelance/Side Income</label>
                    <input
                      type="number"
                      value={income.freelance}
                      onChange={(e) => setIncome({ ...income, freelance: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter freelance income"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Returns</label>
                    <input
                      type="number"
                      value={income.investments}
                      onChange={(e) => setIncome({ ...income, investments: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter investment returns"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Income</label>
                    <input
                      type="number"
                      value={income.other}
                      onChange={(e) => setIncome({ ...income, other: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter other income"
                    />
                  </div>
                </div>
              </div>

              {/* Expenses Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2 text-red-600" />
                  Monthly Expenses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Housing & Rent</label>
                    <input
                      type="number"
                      value={expenses.housing}
                      onChange={(e) => setExpenses({ ...expenses, housing: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Rent/mortgage"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food & Groceries</label>
                    <input
                      type="number"
                      value={expenses.food}
                      onChange={(e) => setExpenses({ ...expenses, food: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Food expenses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
                    <input
                      type="number"
                      value={expenses.transportation}
                      onChange={(e) => setExpenses({ ...expenses, transportation: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Transport costs"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Utilities</label>
                    <input
                      type="number"
                      value={expenses.utilities}
                      onChange={(e) => setExpenses({ ...expenses, utilities: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Electricity, water, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare</label>
                    <input
                      type="number"
                      value={expenses.healthcare}
                      onChange={(e) => setExpenses({ ...expenses, healthcare: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Medical expenses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entertainment</label>
                    <input
                      type="number"
                      value={expenses.entertainment}
                      onChange={(e) => setExpenses({ ...expenses, entertainment: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Movies, dining out"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shopping</label>
                    <input
                      type="number"
                      value={expenses.shopping}
                      onChange={(e) => setExpenses({ ...expenses, shopping: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Clothing, gadgets"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <input
                      type="number"
                      value={expenses.education}
                      onChange={(e) => setExpenses({ ...expenses, education: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Courses, books"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                    <input
                      type="number"
                      value={expenses.insurance}
                      onChange={(e) => setExpenses({ ...expenses, insurance: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Insurance premiums"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Debt Payments</label>
                    <input
                      type="number"
                      value={expenses.debt}
                      onChange={(e) => setExpenses({ ...expenses, debt: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Loan EMIs, credit cards"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Expenses</label>
                    <input
                      type="number"
                      value={expenses.other}
                      onChange={(e) => setExpenses({ ...expenses, other: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Miscellaneous"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={calculateBudget}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Budget
                </button>
                <button
                  onClick={resetCalculator}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {showResults && analysis && (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Income</h3>
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.totalIncome.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Expenses</h3>
                        <TrendingDown className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-600">₹{analysis.totalExpenses.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Monthly Savings</h3>
                        <PiggyBank className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className={`text-3xl font-bold ${analysis.totalSavings >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        ₹{analysis.totalSavings.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Savings Rate</h3>
                        {getSavingsRateIcon(analysis.savingsRate)}
                      </div>
                      <p className={`text-3xl font-bold ${getSavingsRateColor(analysis.savingsRate)}`}>
                        {analysis.savingsRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Budget Breakdown */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Budget Breakdown
                    </h3>
                    <div className="space-y-4">
                      {budgetCategories.filter(cat => cat.amount > 0).map((category) => (
                        <div key={category.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${category.color} text-white mr-3`}>
                              {category.icon}
                            </div>
                            <span className="font-medium text-gray-900">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{category.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">
                              {analysis.totalIncome > 0 ? ((category.amount / analysis.totalIncome) * 100).toFixed(1) : 0}% of income
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Health Metrics */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                      Financial Health Metrics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Emergency Fund Coverage</p>
                          <p className="text-sm text-gray-600">Months of expenses covered</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{analysis.emergencyFundMonths.toFixed(1)}</p>
                          <p className="text-sm text-gray-500">months</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Debt-to-Income Ratio</p>
                          <p className="text-sm text-gray-600">Percentage of income going to debt</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${analysis.debtToIncomeRatio <= 20 ? 'text-green-600' : 'text-red-600'}`}>
                            {analysis.debtToIncomeRatio.toFixed(1)}%
                          </p>
                          <p className="text-sm text-gray-500">
                            {analysis.debtToIncomeRatio <= 20 ? 'Good' : 'High'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target className="w-6 h-6 mr-3 text-blue-600" />
                      Personalized Recommendations
                    </h3>
                    <div className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!showResults && (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your Budget?</h3>
                  <p className="text-gray-600">
                    Enter your income and expenses to get a comprehensive budget analysis with personalized recommendations.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Educational Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Budget Planning Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">50/30/20 Rule</h3>
                <p className="text-gray-600 mb-4">
                  Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 50% for essential expenses (housing, food, utilities)</li>
                  <li>• 30% for discretionary spending (entertainment, dining)</li>
                  <li>• 20% for savings and debt payments</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Fund</h3>
                <p className="text-gray-600 mb-4">
                  Build an emergency fund covering 3-6 months of expenses for financial security.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Start with ₹10,000-₹50,000</li>
                  <li>• Aim for 3-6 months of expenses</li>
                  <li>• Keep in high-yield savings account</li>
                  <li>• Use only for true emergencies</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Budgeting Tips</h3>
                <p className="text-gray-600 mb-4">
                  Effective budgeting strategies to improve your financial health.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Track all expenses for at least one month</li>
                  <li>• Use budgeting apps or spreadsheets</li>
                  <li>• Review and adjust monthly</li>
                  <li>• Set realistic goals and stick to them</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BudgetCalculator;
