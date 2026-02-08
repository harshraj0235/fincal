import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Calculator, Download, Upload, PieChart, TrendingUp, AlertCircle, Target, DollarSign } from 'lucide-react';

const MonthlyBudgetPlanner: React.FC = () => {
  const [budget, setBudget] = useState({
    income: {
      salary: 0,
      freelance: 0,
      investments: 0,
      other: 0
    },
    expenses: {
      housing: 0,
      food: 0,
      transportation: 0,
      utilities: 0,
      healthcare: 0,
      entertainment: 0,
      shopping: 0,
      education: 0,
      insurance: 0,
      other: 0
    },
    savings: {
      emergency: 0,
      investment: 0,
      goal: 0
    }
  });

  const [monthlyGoal, setMonthlyGoal] = useState(0);

  const handleInputChange = (category: string, subcategory: string, value: number) => {
    setBudget(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: value
      }
    }));
  };

  const getTotalIncome = () => {
    return Object.values(budget.income).reduce((sum, value) => sum + value, 0);
  };

  const getTotalExpenses = () => {
    return Object.values(budget.expenses).reduce((sum, value) => sum + value, 0);
  };

  const getTotalSavings = () => {
    return Object.values(budget.savings).reduce((sum, value) => sum + value, 0);
  };

  const getNetAmount = () => {
    return getTotalIncome() - getTotalExpenses() - getTotalSavings();
  };

  const getSavingsRate = () => {
    const totalIncome = getTotalIncome();
    return totalIncome > 0 ? (getTotalSavings() / totalIncome) * 100 : 0;
  };

  const getExpenseBreakdown = () => {
    const totalExpenses = getTotalExpenses();
    return Object.entries(budget.expenses).map(([key, value]) => ({
      category: key,
      amount: value,
      percentage: totalExpenses > 0 ? (value / totalExpenses) * 100 : 0
    })).sort((a, b) => b.amount - a.amount);
  };

  const getBudgetStatus = () => {
    const netAmount = getNetAmount();
    if (netAmount > 0) {
      return { status: 'Surplus', color: 'text-green-600', bg: 'bg-green-50' };
    } else if (netAmount < 0) {
      return { status: 'Deficit', color: 'text-red-600', bg: 'bg-red-50' };
    } else {
      return { status: 'Balanced', color: 'text-blue-600', bg: 'bg-blue-50' };
    }
  };

  const budgetStatus = getBudgetStatus();

  const getRecommendations = () => {
    const recommendations = [];
    const savingsRate = getSavingsRate();
    const expenseBreakdown = getExpenseBreakdown();

    if (savingsRate < 20) {
      recommendations.push({
        type: 'warning',
        message: 'Your savings rate is below 20%. Consider increasing your savings to build wealth faster.'
      });
    }

    if (budget.expenses.housing > getTotalIncome() * 0.3) {
      recommendations.push({
        type: 'error',
        message: 'Housing expenses exceed 30% of income. Consider reducing housing costs or increasing income.'
      });
    }

    if (budget.expenses.food > getTotalIncome() * 0.15) {
      recommendations.push({
        type: 'warning',
        message: 'Food expenses are high. Consider meal planning and cooking at home to save money.'
      });
    }

    if (budget.expenses.entertainment > getTotalIncome() * 0.1) {
      recommendations.push({
        type: 'info',
        message: 'Entertainment expenses are high. Look for free or low-cost entertainment options.'
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  const exportToExcel = () => {
    const data = {
      'Income': budget.income,
      'Expenses': budget.expenses,
      'Savings': budget.savings,
      'Summary': {
        'Total Income': getTotalIncome(),
        'Total Expenses': getTotalExpenses(),
        'Total Savings': getTotalSavings(),
        'Net Amount': getNetAmount(),
        'Savings Rate': `${getSavingsRate().toFixed(1)}%`
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'monthly-budget-planner.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <SEOHelmet
        title="Monthly Budget Planner India - Free Excel Template & App | MoneyCal India"
        description="Create and manage your monthly budget with our free Excel template and mobile app. Track income, expenses, and savings with detailed analysis and recommendations."
        keywords="monthly budget planner, budget template, expense tracker, personal finance, budget calculator, money management, budget app India"
        canonicalUrl="https://moneycal.in/tools/monthly-budget-planner"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Monthly Budget Planner India
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create and manage your monthly budget with our comprehensive planner. Track income, expenses, and savings with detailed analysis and personalized recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Budget Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Income Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Monthly Income
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary/Wages
                    </label>
                    <input
                      type="number"
                      value={budget.income.salary}
                      onChange={(e) => handleInputChange('income', 'salary', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter salary amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Freelance/Side Income
                    </label>
                    <input
                      type="number"
                      value={budget.income.freelance}
                      onChange={(e) => handleInputChange('income', 'freelance', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter freelance income"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Returns
                    </label>
                    <input
                      type="number"
                      value={budget.income.investments}
                      onChange={(e) => handleInputChange('income', 'investments', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter investment returns"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Income
                    </label>
                    <input
                      type="number"
                      value={budget.income.other}
                      onChange={(e) => handleInputChange('income', 'other', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter other income"
                    />
                  </div>
                </div>
              </div>

              {/* Expenses Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-red-600" />
                  Monthly Expenses
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Housing (Rent/EMI)
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.housing}
                      onChange={(e) => handleInputChange('expenses', 'housing', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter housing expenses"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Food & Groceries
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.food}
                      onChange={(e) => handleInputChange('expenses', 'food', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter food expenses"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transportation
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.transportation}
                      onChange={(e) => handleInputChange('expenses', 'transportation', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter transportation costs"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Utilities (Electricity, Water, Gas)
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.utilities}
                      onChange={(e) => handleInputChange('expenses', 'utilities', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter utility bills"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Healthcare
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.healthcare}
                      onChange={(e) => handleInputChange('expenses', 'healthcare', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter healthcare expenses"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entertainment
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.entertainment}
                      onChange={(e) => handleInputChange('expenses', 'entertainment', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter entertainment costs"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shopping & Personal
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.shopping}
                      onChange={(e) => handleInputChange('expenses', 'shopping', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter shopping expenses"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.education}
                      onChange={(e) => handleInputChange('expenses', 'education', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter education expenses"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.insurance}
                      onChange={(e) => handleInputChange('expenses', 'insurance', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter insurance premiums"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Expenses
                    </label>
                    <input
                      type="number"
                      value={budget.expenses.other}
                      onChange={(e) => handleInputChange('expenses', 'other', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter other expenses"
                    />
                  </div>
                </div>
              </div>

              {/* Savings Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-blue-600" />
                  Monthly Savings
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Fund
                    </label>
                    <input
                      type="number"
                      value={budget.savings.emergency}
                      onChange={(e) => handleInputChange('savings', 'emergency', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter emergency fund savings"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment
                    </label>
                    <input
                      type="number"
                      value={budget.savings.investment}
                      onChange={(e) => handleInputChange('savings', 'investment', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter investment amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal Savings
                    </label>
                    <input
                      type="number"
                      value={budget.savings.goal}
                      onChange={(e) => handleInputChange('savings', 'goal', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter goal savings"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="space-y-6">
              {/* Budget Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-purple-600" />
                  Budget Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Total Income</span>
                    <span className="font-semibold text-green-600">₹{getTotalIncome().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-red-700">Total Expenses</span>
                    <span className="font-semibold text-red-600">₹{getTotalExpenses().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Total Savings</span>
                    <span className="font-semibold text-blue-600">₹{getTotalSavings().toLocaleString()}</span>
                  </div>
                  
                  <div className={`flex justify-between items-center p-3 rounded-lg ${budgetStatus.bg}`}>
                    <span className={budgetStatus.color}>Net Amount</span>
                    <span className={`font-semibold ${budgetStatus.color}`}>₹{getNetAmount().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Savings Rate</span>
                    <span className="font-semibold text-purple-600">{getSavingsRate().toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Expense Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 mr-2 text-orange-600" />
                  Expense Breakdown
                </h2>
                
                <div className="space-y-3">
                  {getExpenseBreakdown().map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {item.category.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm text-gray-600">{item.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-4 text-sm font-semibold text-gray-900">
                        ₹{item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-blue-600" />
                  Recommendations
                </h2>
                
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      rec.type === 'error' ? 'bg-red-50 border border-red-200' :
                      rec.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}>
                      <p className={`text-sm ${
                        rec.type === 'error' ? 'text-red-800' :
                        rec.type === 'warning' ? 'text-yellow-800' :
                        'text-blue-800'
                      }`}>
                        {rec.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Download className="w-6 h-6 mr-2 text-green-600" />
                  Export Options
                </h2>
                
                <div className="space-y-3">
                  <button
                    onClick={exportToExcel}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Export Budget Data
                  </button>
                  
                  <button
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Import Budget Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Monthly Budget Planning Guide</h2>
            
            <div className="prose max-w-none">
              <h3>Why Budget Planning is Important</h3>
              <p>
                A monthly budget is the foundation of good financial health. It helps you understand where your money goes, 
                identify spending patterns, and make informed decisions about your finances.
              </p>
              
              <h3>50/30/20 Rule for Budgeting</h3>
              <ul>
                <li><strong>50% for Needs:</strong> Essential expenses like housing, food, utilities, and transportation</li>
                <li><strong>30% for Wants:</strong> Non-essential expenses like entertainment, dining out, and shopping</li>
                <li><strong>20% for Savings:</strong> Emergency fund, investments, and financial goals</li>
              </ul>
              
              <h3>Budget Planning Steps</h3>
              <ol>
                <li><strong>Track Income:</strong> List all sources of monthly income</li>
                <li><strong>List Expenses:</strong> Categorize all monthly expenses</li>
                <li><strong>Set Savings Goals:</strong> Determine how much you want to save</li>
                <li><strong>Calculate Net Amount:</strong> Income minus expenses and savings</li>
                <li><strong>Adjust as Needed:</strong> Modify expenses to balance your budget</li>
                <li><strong>Monitor Regularly:</strong> Review and update your budget monthly</li>
              </ol>
              
              <h3>Common Budgeting Mistakes</h3>
              <ul>
                <li>Not tracking small expenses</li>
                <li>Underestimating irregular expenses</li>
                <li>Not including savings in the budget</li>
                <li>Setting unrealistic spending limits</li>
                <li>Not reviewing and adjusting the budget regularly</li>
              </ul>
              
              <h3>Tips for Successful Budgeting</h3>
              <ul>
                <li>Use the envelope method for variable expenses</li>
                <li>Automate savings transfers</li>
                <li>Review your budget weekly</li>
                <li>Use budgeting apps for tracking</li>
                <li>Set up emergency fund first</li>
                <li>Plan for irregular expenses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBudgetPlanner;
