import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar, Target, AlertCircle, Download, Upload } from 'lucide-react';

const PersonalFinanceDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [dashboardData, setDashboardData] = useState({
    income: {
      current: 75000,
      previous: 72000,
      trend: 'up'
    },
    expenses: {
      current: 45000,
      previous: 48000,
      trend: 'down'
    },
    savings: {
      current: 15000,
      previous: 12000,
      trend: 'up'
    },
    investments: {
      current: 250000,
      previous: 230000,
      trend: 'up'
    },
    netWorth: {
      current: 850000,
      previous: 780000,
      trend: 'up'
    }
  });

  const [expenseCategories] = useState([
    { name: 'Housing', amount: 18000, percentage: 40, color: 'bg-blue-500' },
    { name: 'Food', amount: 9000, percentage: 20, color: 'bg-green-500' },
    { name: 'Transportation', amount: 6000, percentage: 13, color: 'bg-yellow-500' },
    { name: 'Utilities', amount: 4500, percentage: 10, color: 'bg-purple-500' },
    { name: 'Entertainment', amount: 3600, percentage: 8, color: 'bg-pink-500' },
    { name: 'Healthcare', amount: 2700, percentage: 6, color: 'bg-red-500' },
    { name: 'Other', amount: 1200, percentage: 3, color: 'bg-gray-500' }
  ]);

  const [financialGoals] = useState([
    { name: 'Emergency Fund', target: 200000, current: 150000, deadline: '2025-12-31' },
    { name: 'House Down Payment', target: 500000, current: 200000, deadline: '2026-06-30' },
    { name: 'Retirement Fund', target: 10000000, current: 250000, deadline: '2045-12-31' }
  ]);

  const [recentTransactions] = useState([
    { date: '2025-01-20', description: 'Salary Credit', amount: 75000, type: 'income', category: 'Salary' },
    { date: '2025-01-19', description: 'Rent Payment', amount: -18000, type: 'expense', category: 'Housing' },
    { date: '2025-01-18', description: 'Grocery Shopping', amount: -3500, type: 'expense', category: 'Food' },
    { date: '2025-01-17', description: 'SIP Investment', amount: -5000, type: 'investment', category: 'Mutual Fund' },
    { date: '2025-01-16', description: 'Fuel', amount: -2000, type: 'expense', category: 'Transportation' }
  ]);

  const getPercentageChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getGoalProgress = (current: number, target: number) => {
    return (current / target) * 100;
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const exportDashboardData = () => {
    const data = {
      timeframe,
      dashboardData,
      expenseCategories,
      financialGoals,
      recentTransactions,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'personal-finance-dashboard.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <SEOHelmet
        title="Personal Finance Dashboard - Google Sheets Template | MoneyCal India"
        description="Comprehensive personal finance dashboard with Google Sheets integration. Track income, expenses, investments, and net worth with real-time analytics and visualizations."
        keywords="personal finance dashboard, Google Sheets finance, financial tracking, expense tracker, net worth tracker, financial analytics, money management dashboard"
        canonicalUrl="https://moneycal.in/tools/personal-finance-dashboard"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Personal Finance Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial dashboard with Google Sheets integration. Track your income, expenses, investments, and net worth with real-time analytics.
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-md font-semibold transition-all capitalize ${
                    timeframe === period
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className={`flex items-center ${getTrendColor(dashboardData.income.trend)}`}>
                  {getTrendIcon(dashboardData.income.trend)}
                  <span className="ml-1 text-sm font-medium">
                    {getPercentageChange(dashboardData.income.current, dashboardData.income.previous).toFixed(1)}%
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Income</h3>
              <p className="text-2xl font-bold text-gray-900">₹{dashboardData.income.current.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <div className={`flex items-center ${getTrendColor(dashboardData.expenses.trend)}`}>
                  {getTrendIcon(dashboardData.expenses.trend)}
                  <span className="ml-1 text-sm font-medium">
                    {getPercentageChange(dashboardData.expenses.current, dashboardData.expenses.previous).toFixed(1)}%
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Expenses</h3>
              <p className="text-2xl font-bold text-gray-900">₹{dashboardData.expenses.current.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className={`flex items-center ${getTrendColor(dashboardData.savings.trend)}`}>
                  {getTrendIcon(dashboardData.savings.trend)}
                  <span className="ml-1 text-sm font-medium">
                    {getPercentageChange(dashboardData.savings.current, dashboardData.savings.previous).toFixed(1)}%
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Monthly Savings</h3>
              <p className="text-2xl font-bold text-gray-900">₹{dashboardData.savings.current.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className={`flex items-center ${getTrendColor(dashboardData.investments.trend)}`}>
                  {getTrendIcon(dashboardData.investments.trend)}
                  <span className="ml-1 text-sm font-medium">
                    {getPercentageChange(dashboardData.investments.current, dashboardData.investments.previous).toFixed(1)}%
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Investments</h3>
              <p className="text-2xl font-bold text-gray-900">₹{dashboardData.investments.current.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <div className={`flex items-center ${getTrendColor(dashboardData.netWorth.trend)}`}>
                  {getTrendIcon(dashboardData.netWorth.trend)}
                  <span className="ml-1 text-sm font-medium">
                    {getPercentageChange(dashboardData.netWorth.current, dashboardData.netWorth.previous).toFixed(1)}%
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Net Worth</h3>
              <p className="text-2xl font-bold text-gray-900">₹{dashboardData.netWorth.current.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Expense Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <PieChart className="w-6 h-6 mr-2 text-blue-600" />
                Expense Breakdown
              </h2>
              
              <div className="space-y-4">
                {expenseCategories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${category.color} mr-3`}></div>
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">₹{category.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{category.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Goals */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-green-600" />
                Financial Goals
              </h2>
              
              <div className="space-y-4">
                {financialGoals.map((goal) => (
                  <div key={goal.name} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                      <span className="text-sm text-gray-500">
                        {getDaysUntilDeadline(goal.deadline)} days left
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${getGoalProgress(goal.current, goal.target)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{goal.current.toLocaleString()}</span>
                      <span>₹{goal.target.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-purple-600" />
              Recent Transactions
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-900">{transaction.description}</td>
                      <td className="py-3 px-4 text-gray-600">{transaction.category}</td>
                      <td className={`py-3 px-4 text-right font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export/Import Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Download className="w-6 h-6 mr-2 text-blue-600" />
              Data Management
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Export Data</h3>
                <p className="text-gray-600 mb-4">
                  Export your dashboard data to JSON format for backup or analysis.
                </p>
                <button
                  onClick={exportDashboardData}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Dashboard Data
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Import Data</h3>
                <p className="text-gray-600 mb-4">
                  Import data from previous exports or other financial tools.
                </p>
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Import Dashboard Data
                </button>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Finance Dashboard Guide</h2>
            
            <div className="prose max-w-none">
              <h3>What is a Personal Finance Dashboard?</h3>
              <p>
                A personal finance dashboard is a centralized view of your financial health that displays key metrics, 
                trends, and insights about your money. It helps you make informed financial decisions by providing 
                real-time visibility into your financial situation.
              </p>
              
              <h3>Key Components of a Finance Dashboard</h3>
              <ul>
                <li><strong>Income Tracking:</strong> Monitor all sources of income and their trends</li>
                <li><strong>Expense Analysis:</strong> Categorize and analyze spending patterns</li>
                <li><strong>Savings Rate:</strong> Track how much you save each month</li>
                <li><strong>Investment Performance:</strong> Monitor portfolio growth and returns</li>
                <li><strong>Net Worth:</strong> Track total assets minus liabilities</li>
                <li><strong>Goal Progress:</strong> Monitor progress towards financial goals</li>
              </ul>
              
              <h3>Benefits of Using a Finance Dashboard</h3>
              <ul>
                <li>Better financial awareness and control</li>
                <li>Identification of spending patterns and trends</li>
                <li>Improved decision-making based on data</li>
                <li>Goal tracking and motivation</li>
                <li>Early detection of financial issues</li>
                <li>Better preparation for financial planning</li>
              </ul>
              
              <h3>Google Sheets Integration</h3>
              <p>
                Our dashboard integrates with Google Sheets to provide seamless data management. You can:
              </p>
              <ul>
                <li>Import data from bank statements</li>
                <li>Export data for further analysis</li>
                <li>Share data with financial advisors</li>
                <li>Create custom reports and charts</li>
                <li>Automate data updates</li>
              </ul>
              
              <h3>Best Practices for Dashboard Usage</h3>
              <ul>
                <li>Update data regularly (daily or weekly)</li>
                <li>Set up automatic data imports where possible</li>
                <li>Review trends monthly</li>
                <li>Set up alerts for important changes</li>
                <li>Backup data regularly</li>
                <li>Use consistent categorization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFinanceDashboard;
