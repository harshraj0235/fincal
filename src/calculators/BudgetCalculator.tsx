import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  Home,
  Car,
  ShoppingBag,
  Coffee,
  Heart,
  Gamepad2,
  BookOpen,
  Shirt,
  Edit2,
  Trash2,
  Target,
  Calculator,
  ExternalLink,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  budgeted?: number;
}

const categoryIcons = {
  housing: Home,
  transportation: Car,
  food: Coffee,
  shopping: ShoppingBag,
  healthcare: Heart,
  entertainment: Gamepad2,
  education: BookOpen,
  clothing: Shirt,
  other: DollarSign,
  salary: Wallet,
  freelance: TrendingUp,
  investments: PieChart,
};

const categoryColors = {
  housing: 'bg-blue-500',
  transportation: 'bg-green-500',
  food: 'bg-orange-500',
  shopping: 'bg-purple-500',
  healthcare: 'bg-red-500',
  entertainment: 'bg-pink-500',
  education: 'bg-indigo-500',
  clothing: 'bg-yellow-500',
  other: 'bg-gray-500',
  salary: 'bg-emerald-500',
  freelance: 'bg-blue-500',
  investments: 'bg-violet-500',
};

export const BudgetCalculator: React.FC = () => {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
  const [showSEOContent, setShowSEOContent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    budgeted: '',
    category: 'other',
    type: 'expense' as 'income' | 'expense'
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('budgetItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('budgetItems', JSON.stringify(items));
  }, [items]);

  const totalIncome = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalBudgeted = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + (item.budgeted || 0), 0);

  const remainingBudget = totalIncome - totalExpenses;
  const budgetProgress = totalBudgeted > 0 ? (totalExpenses / totalBudgeted) * 100 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: BudgetItem = {
      id: editingItem?.id || Date.now().toString(),
      name: formData.name,
      amount: parseFloat(formData.amount),
      budgeted: formData.budgeted ? parseFloat(formData.budgeted) : undefined,
      category: formData.category,
      type: formData.type
    };

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? newItem : item));
      setEditingItem(null);
    } else {
      setItems([...items, newItem]);
    }

    setFormData({ name: '', amount: '', budgeted: '', category: 'other', type: 'expense' });
    setShowForm(false);
  };

  const handleEdit = (item: BudgetItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      amount: item.amount.toString(),
      budgeted: item.budgeted?.toString() || '',
      category: item.category,
      type: item.type
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getExpensesByCategory = () => {
    const expenses = items.filter(item => item.type === 'expense');
    const categories = expenses.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { total: 0, budgeted: 0, items: [] };
      }
      acc[item.category].total += item.amount;
      acc[item.category].budgeted += item.budgeted || 0;
      acc[item.category].items.push(item);
      return acc;
    }, {} as Record<string, { total: number; budgeted: number; items: BudgetItem[] }>);
    
    return categories;
  };

  const expenseCategories = getExpensesByCategory();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* SEO Header Section */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Free Budget Calculator & Investment Planner</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Take control of your finances with our comprehensive budget calculator. Track expenses, plan investments, 
            and achieve your financial goals with intelligent insights and real-time calculations.
          </p>
          
          {/* SEO Keywords Section */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">Budget Calculator</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Investment Calculator</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Financial Planning</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Expense Tracker</span>
          </div>
        </header>

        {/* Investment Calculator Link Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-8 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <PieChart className="w-8 h-8 text-emerald-600 mr-3" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Advanced Investment Calculators</h3>
                <p className="text-gray-600">Calculate SIP returns, compound interest, and investment growth</p>
              </div>
            </div>
            <a 
              href="https://moneycal.in/#investment-calculators" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
            >
              Try Now <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Income</h3>
            <p className="text-2xl font-bold text-gray-900">${totalIncome.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Expenses</h3>
            <p className="text-2xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                remainingBudget >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <DollarSign className={`w-6 h-6 ${
                  remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Available for Investment</h3>
            <p className={`text-2xl font-bold ${
              remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${Math.abs(remainingBudget).toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Budget Progress</h3>
            <p className="text-2xl font-bold text-gray-900">{budgetProgress.toFixed(0)}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  budgetProgress > 100 ? 'bg-red-500' : budgetProgress > 80 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Financial Tips Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Info className="w-6 h-6 text-blue-500 mr-2" />
              Smart Financial Planning Tips
            </h3>
            <button
              onClick={() => setShowSEOContent(!showSEOContent)}
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              {showSEOContent ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          
          {showSEOContent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Budget Calculator Best Practices</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Track all income sources including salary, freelance, and investment returns</li>
                  <li>• Categorize expenses to identify spending patterns and optimization opportunities</li>
                  <li>• Set realistic budget limits for each category based on historical data</li>
                  <li>• Review and adjust your budget monthly to stay on track with financial goals</li>
                  <li>• Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings and investments</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Investment Planning Strategies</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Start investing early to benefit from compound interest growth</li>
                  <li>• Diversify your portfolio across different asset classes and sectors</li>
                  <li>• Consider SIP (Systematic Investment Plan) for regular investment discipline</li>
                  <li>• Use our <a href="https://moneycal.in/#investment-calculators" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">investment calculators</a> to project returns</li>
                  <li>• Maintain an emergency fund covering 6-12 months of expenses</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Add New Item Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Budget Item
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-in fade-in duration-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {editingItem ? 'Edit Budget Item' : 'Add New Budget Item'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter item name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {formData.type === 'expense' ? (
                        <>
                          <option value="housing">Housing</option>
                          <option value="transportation">Transportation</option>
                          <option value="food">Food & Dining</option>
                          <option value="shopping">Shopping</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="education">Education</option>
                          <option value="clothing">Clothing</option>
                          <option value="other">Other</option>
                        </>
                      ) : (
                        <>
                          <option value="salary">Salary</option>
                          <option value="freelance">Freelance</option>
                          <option value="investments">Investments</option>
                          <option value="other">Other</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                      required
                    />
                  </div>

                  {formData.type === 'expense' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.budgeted}
                        onChange={(e) => setFormData({ ...formData, budgeted: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                      setFormData({ name: '', amount: '', budgeted: '', category: 'other', type: 'expense' });
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all"
                  >
                    {editingItem ? 'Update' : 'Add'} Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Categories and Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-emerald-500 mr-2" />
              Income Sources & Investment Returns
            </h3>
            <div className="space-y-3">
              {items.filter(item => item.type === 'income').map((item) => {
                const IconComponent = categoryIcons[item.category as keyof typeof categoryIcons] || DollarSign;
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${categoryColors[item.category as keyof typeof categoryColors] || 'bg-gray-500'}`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-emerald-600">+${item.amount.toLocaleString()}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 text-blue-500 hover:bg-blue-100 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {items.filter(item => item.type === 'income').length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No income sources added yet</p>
                  <p className="text-sm text-gray-400">Add your salary, freelance income, or investment returns to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Expenses Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingDown className="w-6 h-6 text-red-500 mr-2" />
              Expense Categories & Budget Tracking
            </h3>
            <div className="space-y-4">
              {Object.entries(expenseCategories).map(([category, data]) => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || DollarSign;
                const progressPercentage = data.budgeted > 0 ? (data.total / data.budgeted) * 100 : 0;
                
                return (
                  <div key={category} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${categoryColors[category as keyof typeof categoryColors] || 'bg-gray-500'}`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 capitalize">{category}</p>
                          <p className="text-sm text-gray-500">{data.items.length} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">${data.total.toLocaleString()}</p>
                        {data.budgeted > 0 && (
                          <p className="text-sm text-gray-500">of ${data.budgeted.toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                    
                    {data.budgeted > 0 && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            progressPercentage > 100 ? 'bg-red-500' : progressPercentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {data.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg group">
                          <span className="text-sm text-gray-700">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">${item.amount.toLocaleString()}</span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-1 text-blue-500 hover:bg-blue-100 rounded"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1 text-red-500 hover:bg-red-100 rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {Object.keys(expenseCategories).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No expenses added yet</p>
                  <p className="text-sm text-gray-400">Start tracking your expenses to see detailed budget analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO Footer Content */}
        <footer className="mt-12 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Budget Calculator Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time expense tracking and categorization</li>
                <li>• Budget vs actual spending analysis</li>
                <li>• Investment planning and goal setting</li>
                <li>• Visual progress indicators and charts</li>
                <li>• Data persistence with local storage</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Financial Planning Tools</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <a href="https://moneycal.in/#investment-calculators" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">SIP Calculator</a></li>
                <li>• <a href="https://moneycal.in/#investment-calculators" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Compound Interest Calculator</a></li>
                <li>• <a href="https://moneycal.in/#investment-calculators" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Retirement Planning Calculator</a></li>
                <li>• <a href="https://moneycal.in/#investment-calculators" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">EMI Calculator</a></li>
                <li>• <a href="https://moneycal.in/#investment-calculators" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Tax Calculator</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Why Use Our Calculator?</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Free and easy to use budget planner</li>
                <li>• No registration or personal data required</li>
                <li>• Mobile-responsive design for all devices</li>
                <li>• Secure local data storage</li>
                <li>• Professional financial planning insights</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Start your financial journey today with our comprehensive budget calculator and 
              <a href="https://moneycal.in/#investment-calculators" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                investment planning tools
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BudgetCalculator;
