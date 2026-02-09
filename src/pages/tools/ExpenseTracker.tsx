import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, PieChart, BarChart3, Calendar, Plus, Edit, Trash2, Filter, Download, Upload, Target, AlertCircle, CheckCircle, DollarSign, CreditCard, PiggyBank, Home, Car, ShoppingBag, Heart, BookOpen, Gamepad2 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  budget?: number;
}

interface ExpenseAnalysis {
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
    color: string;
  }>;
  monthlyTrend: Array<{
    month: string;
    income: number;
    expenses: number;
    net: number;
  }>;
  topExpenses: Expense[];
  budgetAlerts: Array<{
    category: string;
    spent: number;
    budget: number;
    percentage: number;
  }>;
}

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [analysis, setAnalysis] = useState<ExpenseAnalysis | null>(null);

  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: 0,
    type: 'expense' as 'income' | 'expense'
  });

  const categories: Category[] = [
    { id: 'housing', name: 'Housing & Rent', icon: <Home className="w-5 h-5" />, color: 'bg-blue-500' },
    { id: 'food', name: 'Food & Groceries', icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-green-500' },
    { id: 'transportation', name: 'Transportation', icon: <Car className="w-5 h-5" />, color: 'bg-yellow-500' },
    { id: 'utilities', name: 'Utilities', icon: <Target className="w-5 h-5" />, color: 'bg-purple-500' },
    { id: 'healthcare', name: 'Healthcare', icon: <Heart className="w-5 h-5" />, color: 'bg-red-500' },
    { id: 'entertainment', name: 'Entertainment', icon: <Gamepad2 className="w-5 h-5" />, color: 'bg-pink-500' },
    { id: 'shopping', name: 'Shopping', icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-indigo-500' },
    { id: 'education', name: 'Education', icon: <BookOpen className="w-5 h-5" />, color: 'bg-orange-500' },
    { id: 'insurance', name: 'Insurance', icon: <Shield className="w-5 h-5" />, color: 'bg-teal-500' },
    { id: 'debt', name: 'Debt Payments', icon: <CreditCard className="w-5 h-5" />, color: 'bg-gray-500' },
    { id: 'savings', name: 'Savings & Investment', icon: <PiggyBank className="w-5 h-5" />, color: 'bg-emerald-500' },
    { id: 'other', name: 'Other', icon: <DollarSign className="w-5 h-5" />, color: 'bg-cyan-500' }
  ];

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenseTracker');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenseTracker', JSON.stringify(expenses));
    calculateAnalysis();
  }, [expenses]);

  const calculateAnalysis = () => {
    const totalIncome = expenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);
    
    const totalExpenses = expenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
    
    const netAmount = totalIncome - totalExpenses;

    // Category breakdown
    const categoryMap = new Map();
    expenses
      .filter(e => e.type === 'expense')
      .forEach(expense => {
        const current = categoryMap.get(expense.category) || 0;
        categoryMap.set(expense.category, current + expense.amount);
      });

    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, amount]) => {
      const categoryInfo = categories.find(c => c.id === category);
      return {
        category,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
        color: categoryInfo?.color || 'bg-gray-500'
      };
    }).sort((a, b) => b.amount - a.amount);

    // Monthly trend (last 6 months)
    const monthlyData = new Map();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toISOString().slice(0, 7);
    });

    last6Months.forEach(month => {
      monthlyData.set(month, { month, income: 0, expenses: 0, net: 0 });
    });

    expenses.forEach(expense => {
      const month = expense.date.slice(0, 7);
      if (monthlyData.has(month)) {
        const data = monthlyData.get(month);
        if (expense.type === 'income') {
          data.income += expense.amount;
        } else {
          data.expenses += expense.amount;
        }
        data.net = data.income - data.expenses;
      }
    });

    const monthlyTrend = Array.from(monthlyData.values()).reverse();

    // Top expenses
    const topExpenses = expenses
      .filter(e => e.type === 'expense')
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // Budget alerts (simplified - would need budget data)
    const budgetAlerts: Array<{
      category: string;
      spent: number;
      budget: number;
      percentage: number;
    }> = [];

    setAnalysis({
      totalIncome,
      totalExpenses,
      netAmount,
      categoryBreakdown,
      monthlyTrend,
      topExpenses,
      budgetAlerts
    });
  };

  const addExpense = () => {
    if (!newExpense.category || !newExpense.description || newExpense.amount <= 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    const expense: Expense = {
      id: Date.now().toString(),
      ...newExpense
    };

    setExpenses([...expenses, expense]);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: '',
      description: '',
      amount: 0,
      type: 'expense'
    });
    setShowAddForm(false);
  };

  const editExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setNewExpense({
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
      type: expense.type
    });
    setShowAddForm(true);
  };

  const updateExpense = () => {
    if (!editingExpense || !newExpense.category || !newExpense.description || newExpense.amount <= 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    const updatedExpenses = expenses.map(expense =>
      expense.id === editingExpense.id
        ? { ...newExpense, id: expense.id }
        : expense
    );

    setExpenses(updatedExpenses);
    setEditingExpense(null);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: '',
      description: '',
      amount: 0,
      type: 'expense'
    });
    setShowAddForm(false);
  };

  const deleteExpense = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(expenses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expense-tracker-data.json';
    link.click();
  };

  const filteredExpenses = expenses.filter(expense => {
    const categoryMatch = filterCategory === 'all' || expense.category === filterCategory;
    const typeMatch = filterType === 'all' || expense.type === filterType;
    return categoryMatch && typeMatch;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || <DollarSign className="w-5 h-5" />;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-500';
  };

  return (
    <>
      <SEOHelmet
        title="Free Expense Tracker - Track Your Daily Expenses & Income | MoneyCal India"
        description="Track your daily expenses and income with our comprehensive expense tracker. Analyze spending patterns, categorize expenses, and get insights to improve your financial health."
        keywords="expense tracker, income tracking, spending analysis, budget management, personal finance, money management, expense categorization"
        url="/tools/expense-tracker"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Expense Tracker",
          "description": "Track and analyze your daily expenses and income with comprehensive insights",
          "url": "https://moneycal.in/tools/expense-tracker",
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
                  Expense Tracker
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Track your daily expenses and income with comprehensive analysis, spending insights, and financial health monitoring.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Cards */}
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
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
                      <h3 className="text-lg font-semibold text-gray-900">Net Amount</h3>
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className={`text-3xl font-bold ${analysis.netAmount >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                      ₹{analysis.netAmount.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Add Expense Form */}
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {editingExpense ? 'Edit Transaction' : 'Add New Transaction'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select
                        value={newExpense.type}
                        onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value as 'income' | 'expense' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                      <input
                        type="number"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter description"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={editingExpense ? updateExpense : addExpense}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    >
                      {editingExpense ? 'Update Transaction' : 'Add Transaction'}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingExpense(null);
                        setNewExpense({
                          date: new Date().toISOString().split('T')[0],
                          category: '',
                          description: '',
                          amount: 0,
                          type: 'expense'
                        });
                      }}
                      className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col md:flex-row gap-4">
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Transaction
                    </button>
                    
                    <button
                      onClick={exportData}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Export Data
                    </button>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Expense List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h3>
                
                {filteredExpenses.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h4>
                    <p className="text-gray-600">Start by adding your first transaction to track your expenses and income.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredExpenses
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center">
                            <div className={`p-3 rounded-lg ${getCategoryColor(expense.category)} text-white mr-4`}>
                              {getCategoryIcon(expense.category)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{expense.description}</h4>
                              <p className="text-sm text-gray-600">
                                {categories.find(c => c.id === expense.category)?.name} • {new Date(expense.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className={`font-bold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">{expense.type}</p>
                            </div>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => editExpense(expense)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteExpense(expense.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category Breakdown */}
              {analysis && analysis.categoryBreakdown.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                    Category Breakdown
                  </h3>
                  
                  <div className="space-y-4">
                    {analysis.categoryBreakdown.slice(0, 8).map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${category.color} mr-3`}></div>
                          <span className="text-sm font-medium text-gray-900">
                            {categories.find(c => c.id === category.category)?.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">₹{category.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{category.percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Top Expenses */}
              {analysis && analysis.topExpenses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                    Top Expenses
                  </h3>
                  
                  <div className="space-y-4">
                    {analysis.topExpenses.map((expense, index) => (
                      <div key={expense.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${getCategoryColor(expense.category)} text-white mr-3`}>
                            {getCategoryIcon(expense.category)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                            <p className="text-xs text-gray-500">
                              {categories.find(c => c.id === expense.category)?.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-red-600">₹{expense.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-blue-600" />
                  Expense Tracking Tips
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Record transactions immediately to maintain accuracy</p>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Use specific categories for better analysis</p>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Review your spending patterns weekly</p>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Set monthly spending limits for each category</p>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">Export data regularly for backup</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;
