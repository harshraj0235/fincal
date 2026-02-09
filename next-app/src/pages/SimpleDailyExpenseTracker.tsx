import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Receipt, Plus, Trash2, Download, TrendingUp, Calendar, DollarSign, BarChart3, Save, FileSpreadsheet } from 'lucide-react';
import { getXlsx } from '../lib/clientOnlyLibs';

interface ExpenseRow {
  date: string;
  category: string;
  description: string;
  amount: number;
}

const initialRow: ExpenseRow = { date: '', category: '', description: '', amount: 0 };

const SimpleDailyExpenseTracker: React.FC = () => {
  const [rows, setRows] = useState<ExpenseRow[]>([{ ...initialRow }]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const expenseCategories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
    'Healthcare', 'Utilities', 'Rent/Mortgage', 'Insurance', 
    'Education', 'Travel', 'Gifts', 'Other'
  ];

  const handleRowChange = (idx: number, field: keyof ExpenseRow, value: string | number) => {
    const updated = [...rows];
    updated[idx] = { ...updated[idx], [field]: value };
    setRows(updated);
  };

  const addRow = () => setRows([...rows, { ...initialRow }]);
  const removeRow = (idx: number) => setRows(rows.length > 1 ? rows.filter((_, i) => i !== idx) : rows);
  const getTotal = () => rows.reduce((sum, row) => sum + (row.amount || 0), 0);

  const getCategoryTotal = (category: string) => {
    return rows
      .filter(row => row.category === category)
      .reduce((sum, row) => sum + (row.amount || 0), 0);
  };

  const getMonthlyTotal = () => {
    return rows
      .filter(row => row.date.startsWith(selectedMonth))
      .reduce((sum, row) => sum + (row.amount || 0), 0);
  };

  const handleDownload = async () => {
    const XLSX = await getXlsx();
    const wsData = [
      ['Date', 'Category', 'Description', 'Amount'],
      ...rows.map(row => [row.date, row.category, row.description, row.amount]),
      [],
      ['Total', '', '', getTotal().toFixed(2)],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
    XLSX.writeFile(wb, 'daily-expense-tracker.xlsx');
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('expenseTrackerData', JSON.stringify(rows));
    alert('Data saved successfully!');
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('expenseTrackerData');
    if (saved) {
      setRows(JSON.parse(saved));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <SEOHelmet
        title="Daily Expense Tracker - Free Online Expense Management Tool India 2025"
        description="Track your daily expenses with our free online expense tracker. Categorize spending, analyze patterns, and download reports. Perfect for personal finance management."
        keywords="daily expense tracker, expense management, personal finance tracker, spending tracker, budget tracker, expense calculator"
        url="/tools/simple-daily-expense-tracker"
        type="website"
        image="/images/expense-tracker.jpg"
        tags={["expense tracker", "budget management", "personal finance", "spending tracker"]}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Receipt className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Daily Expense Tracker
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your daily expenses, categorize spending, and analyze your financial patterns. 
            Free online tool to help you manage your personal finances effectively.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-800">₹{getTotal().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-800">₹{getMonthlyTotal().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-800">{rows.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expense Entry Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Plus className="h-6 w-6 mr-2 text-green-600" />
                Add Expenses
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={saveToLocalStorage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </button>
                <button
                  onClick={loadFromLocalStorage}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Load
                </button>
              </div>
            </div>

            {/* Month Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Month
              </label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Expense Rows */}
            <div className="space-y-4">
        {rows.map((row, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Date</label>
                      <input
                        type="date"
                        value={row.date}
                        onChange={e => handleRowChange(idx, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Category</label>
                      <select
                        value={row.category}
                        onChange={e => handleRowChange(idx, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      >
                        <option value="">Select Category</option>
                        {expenseCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Description</label>
                      <input
                        type="text"
                        placeholder="What did you spend on?"
                        value={row.description}
                        onChange={e => handleRowChange(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Amount (₹)</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={row.amount}
                          min={0}
                          onChange={e => handleRowChange(idx, 'amount', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removeRow(idx)}
                        disabled={rows.length === 1}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
          </div>
        ))}
            </div>

            <button
              onClick={addRow}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Expense
            </button>
          </div>

          {/* Analysis Section */}
          <div className="space-y-6">
            {/* Category Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                Spending by Category
              </h3>
              
              <div className="space-y-3">
                {expenseCategories.map(category => {
                  const total = getCategoryTotal(category);
                  if (total === 0) return null;
                  
                  const percentage = (total / getTotal()) * 100;
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-gray-700">{category}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-800">₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Expense Tracking Tips</h3>
              <div className="space-y-2 text-gray-700">
                <p>• <strong>Track daily:</strong> Record expenses as they happen</p>
                <p>• <strong>Be specific:</strong> Use detailed descriptions</p>
                <p>• <strong>Categorize properly:</strong> Helps with analysis</p>
                <p>• <strong>Review weekly:</strong> Identify spending patterns</p>
                <p>• <strong>Set budgets:</strong> Create category-wise limits</p>
                <p>• <strong>Save regularly:</strong> Backup your data</p>
              </div>
            </div>

            {/* Export Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileSpreadsheet className="h-5 w-5 mr-2 text-green-600" />
                Export Data
              </h3>
              <p className="text-gray-600 mb-4">
                Download your expense data as an Excel file for further analysis or record keeping.
              </p>
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Excel Report
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Benefits of Daily Expense Tracking</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Financial Awareness</h3>
              <p className="text-gray-600 text-sm">Understand where your money goes and identify spending patterns</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Better Budgeting</h3>
              <p className="text-gray-600 text-sm">Create realistic budgets based on actual spending data</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Goal Achievement</h3>
              <p className="text-gray-600 text-sm">Track progress towards savings and financial goals</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Privacy & Data</h3>
          <p className="text-yellow-700">
            Your expense data is stored locally in your browser and is not sent to our servers. 
            Use the Save/Load buttons to backup your data. For security, clear your browser data 
            when using shared computers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleDailyExpenseTracker; 