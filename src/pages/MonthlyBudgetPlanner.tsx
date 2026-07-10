import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { IndianRupee, TrendingUp, DollarSign, Plus, Trash2, Download, Save, BarChart3, Target, AlertTriangle } from 'lucide-react';
import * as XLSX from 'xlsx';

interface BudgetRow {
  category: string;
  planned: number;
  actual: number;
}

const initialRow: BudgetRow = { category: '', planned: 0, actual: 0 };

const MonthlyBudgetPlanner: React.FC = () => {
  const [rows, setRows] = useState<BudgetRow[]>([
    { category: 'Housing & Rent', planned: 0, actual: 0 },
    { category: 'Food & Groceries', planned: 0, actual: 0 },
    { category: 'Transportation', planned: 0, actual: 0 },
    { category: 'Utilities', planned: 0, actual: 0 },
    { category: 'Entertainment', planned: 0, actual: 0 },
    { category: 'Healthcare', planned: 0, actual: 0 },
    { category: 'Shopping', planned: 0, actual: 0 },
    { category: 'Savings', planned: 0, actual: 0 }
  ]);

  const handleRowChange = (idx: number, field: keyof BudgetRow, value: string | number) => {
    const updated = [...rows];
    updated[idx] = { ...updated[idx], [field]: value };
    setRows(updated);
  };

  const addRow = () => setRows([...rows, { ...initialRow }]);
  const removeRow = (idx: number) => setRows(rows.length > 1 ? rows.filter((_, i) => i !== idx) : rows);
  const getPlannedTotal = () => rows.reduce((sum, row) => sum + (row.planned || 0), 0);
  const getActualTotal = () => rows.reduce((sum, row) => sum + (row.actual || 0), 0);
  const getVariance = () => getPlannedTotal() - getActualTotal();

  const handleDownload = () => {
    const wsData = [
      ['Category', 'Planned', 'Actual', 'Variance'],
      ...rows.map(row => [row.category, row.planned, row.actual, (row.planned - row.actual).toFixed(2)]),
      [],
      ['Total', getPlannedTotal().toFixed(2), getActualTotal().toFixed(2), getVariance().toFixed(2)],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Budget');
    XLSX.writeFile(wb, 'monthly-budget-planner.xlsx');
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('budgetData', JSON.stringify(rows));
    alert('Budget data saved successfully!');
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('budgetData');
    if (saved) {
      setRows(JSON.parse(saved));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SEOHelmet
        title="Monthly Budget Planner - Free Budget Planning Tool India 2025"
        description="Plan and track your monthly budget with our free online budget planner. Compare planned vs actual expenses and achieve your financial goals."
        keywords="monthly budget planner, budget calculator, expense tracking, financial planning, budget vs actual"
        url="/calculators/monthly-budget-planner"
        type="website"
        image="/images/monthly-budget-planner.jpg"
        tags={["budget planner", "financial planning", "expense tracking", "budget calculator"]}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <IndianRupee className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Monthly Budget Planner
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan and track your monthly budget effectively. Compare planned vs actual expenses 
            and stay on track with your financial goals.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Planned Budget</p>
                <p className="text-2xl font-bold text-blue-600">₹{getPlannedTotal().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Actual Spent</p>
                <p className="text-2xl font-bold text-green-600">₹{getActualTotal().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Variance</p>
                <p className={`text-2xl font-bold ${getVariance() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{getVariance().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Budget Planning Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <IndianRupee className="h-6 w-6 mr-2 text-blue-600" />
                Budget Categories
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

            <div className="space-y-4">
        {rows.map((row, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Category</label>
                      <input
                        type="text"
                        value={row.category}
                        onChange={e => handleRowChange(idx, 'category', e.target.value)}
                        placeholder="Category name"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Planned (₹)</label>
                      <input
                        type="number"
                        value={row.planned}
                        onChange={e => handleRowChange(idx, 'planned', Number(e.target.value))}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Actual (₹)</label>
                      <input
                        type="number"
                        value={row.actual}
                        onChange={e => handleRowChange(idx, 'actual', Number(e.target.value))}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Variance</label>
                        <span className={`block px-3 py-2 rounded text-sm font-medium ${
                          (row.planned - row.actual) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          ₹{(row.planned - row.actual).toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeRow(idx)}
                        className="text-red-500 hover:text-red-700 p-2"
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
              Add New Category
            </button>
          </div>

          {/* Analysis Section */}
          <div className="space-y-6">
            {/* Budget Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                Budget Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-700">Budget Utilization:</span>
                  <span className="font-bold text-blue-600">
                    {getPlannedTotal() > 0 ? ((getActualTotal() / getPlannedTotal()) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-700">Savings Rate:</span>
                  <span className="font-bold text-green-600">
                    {getPlannedTotal() > 0 ? ((getVariance() / getPlannedTotal()) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                
                {getVariance() < 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">⚠️ Over Budget</p>
                    <p className="text-red-700 text-sm">You've exceeded your planned budget by ₹{Math.abs(getVariance()).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Budgeting Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Budgeting Best Practices</h3>
              <div className="space-y-2 text-gray-700">
                <p>• <strong>50/30/20 Rule:</strong> 50% needs, 30% wants, 20% savings</p>
                <p>• <strong>Track daily:</strong> Record expenses as they happen</p>
                <p>• <strong>Review weekly:</strong> Check progress and adjust</p>
                <p>• <strong>Set realistic goals:</strong> Start with achievable targets</p>
                <p>• <strong>Emergency fund:</strong> Save 3-6 months of expenses</p>
                <p>• <strong>Automate savings:</strong> Set up automatic transfers</p>
              </div>
            </div>

            {/* Export Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Export & Share</h3>
              <p className="text-gray-600 mb-4">
                Download your budget data as an Excel file for further analysis or sharing with family members.
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

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
          <p className="text-yellow-700">
            This budget planner is for educational purposes. Your data is stored locally in your browser. 
            For comprehensive financial planning, consider consulting with a qualified financial advisor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBudgetPlanner; 
