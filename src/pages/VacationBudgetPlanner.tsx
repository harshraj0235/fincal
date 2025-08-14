import React, { useState, useEffect } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Globe2, Calculator, DollarSign, Plane, Hotel, Utensils, Car, Camera, Plus, Trash2, Download, Save } from 'lucide-react';

const VacationBudgetPlanner: React.FC = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Transportation', planned: '', actual: '', subcategory: 'Flights' },
    { id: 2, category: 'Accommodation', planned: '', actual: '', subcategory: 'Hotel' },
    { id: 3, category: 'Food & Dining', planned: '', actual: '', subcategory: 'Restaurants' },
    { id: 4, category: 'Activities', planned: '', actual: '', subcategory: 'Sightseeing' },
    { id: 5, category: 'Shopping', planned: '', actual: '', subcategory: 'Souvenirs' },
    { id: 6, category: 'Miscellaneous', planned: '', actual: '', subcategory: 'Emergency' }
  ]);

  const [tripDetails, setTripDetails] = useState({
    destination: '',
    duration: '',
    travelers: 1,
    currency: 'INR'
  });

  const handleExpenseChange = (id: number, field: string, value: string) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addExpense = () => {
    const newId = Math.max(...expenses.map(e => e.id)) + 1;
    setExpenses([...expenses, { 
      id: newId, 
      category: 'Custom', 
      planned: '', 
      actual: '', 
      subcategory: 'Other' 
    }]);
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const calculateTotals = () => {
    const planned = expenses.reduce((sum, exp) => sum + (parseFloat(exp.planned) || 0), 0);
    const actual = expenses.reduce((sum, exp) => sum + (parseFloat(exp.actual) || 0), 0);
    const variance = actual - planned;
    return { planned, actual, variance };
  };

  const { planned, actual, variance } = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SEOHelmet
        title="Vacation Budget Planner - Plan Your Trip Expenses India 2025"
        description="Free vacation budget planner to calculate and track your travel expenses. Plan flights, accommodation, food, activities, and more. Perfect for Indian travelers."
        keywords="vacation budget planner, travel budget calculator, trip expense planner, holiday budget india, travel cost calculator"
        url="/tools/vacation-budget-planner"
        type="website"
        image="/images/vacation-budget-planner.jpg"
        tags={["vacation planner", "budget calculator", "travel tools", "expense tracker"]}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe2 className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Vacation Budget Planner
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan and track your vacation expenses with our comprehensive budget planner. 
            Calculate costs for flights, accommodation, food, activities, and more.
          </p>
        </div>

        {/* Trip Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Plane className="h-6 w-6 mr-2 text-blue-600" />
            Trip Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <input
                type="text"
                value={tripDetails.destination}
                onChange={(e) => setTripDetails({...tripDetails, destination: e.target.value})}
                placeholder="e.g., Goa, Thailand"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Days)
              </label>
              <input
                type="number"
                value={tripDetails.duration}
                onChange={(e) => setTripDetails({...tripDetails, duration: e.target.value})}
                placeholder="7"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Travelers
              </label>
              <input
                type="number"
                value={tripDetails.travelers}
                onChange={(e) => setTripDetails({...tripDetails, travelers: parseInt(e.target.value) || 1})}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={tripDetails.currency}
                onChange={(e) => setTripDetails({...tripDetails, currency: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Budget Planning Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expense Categories */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-green-600" />
                Budget Planning
              </h2>
              <button
                onClick={addExpense}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Category
              </button>
            </div>
            
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{expense.category}</h3>
                    {expense.category !== 'Transportation' && expense.category !== 'Accommodation' && 
                     expense.category !== 'Food & Dining' && expense.category !== 'Activities' && 
                     expense.category !== 'Shopping' && expense.category !== 'Miscellaneous' && (
                      <button
                        onClick={() => removeExpense(expense.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Planned Budget</label>
                      <input
                        type="number"
                        value={expense.planned}
                        onChange={(e) => handleExpenseChange(expense.id, 'planned', e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Actual Spent</label>
                      <input
                        type="number"
                        value={expense.actual}
                        onChange={(e) => handleExpenseChange(expense.id, 'actual', e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Summary */}
          <div className="space-y-6">
            {/* Total Summary */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Budget Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-700">Total Planned Budget:</span>
                  <span className="font-bold text-green-600">₹{planned.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-700">Total Actual Spent:</span>
                  <span className="font-bold text-blue-600">₹{actual.toLocaleString()}</span>
                </div>
                
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  variance >= 0 ? 'bg-red-50' : 'bg-green-50'
                }`}>
                  <span className="font-medium text-gray-700">Variance:</span>
                  <span className={`font-bold ${variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₹{variance.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Per Person:</span>
                  <span className="font-bold text-gray-800">₹{(actual / tripDetails.travelers).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Planning Tips</h3>
              <div className="space-y-3 text-gray-700">
                <p>• <strong>Research costs</strong> for your destination before planning</p>
                <p>• <strong>Set aside 10-15%</strong> for unexpected expenses</p>
                <p>• <strong>Book flights early</strong> to get better deals</p>
                <p>• <strong>Compare accommodation</strong> options and read reviews</p>
                <p>• <strong>Plan meals</strong> - mix of restaurants and local food</p>
                <p>• <strong>Use public transport</strong> when possible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
            <Save className="h-5 w-5 mr-2" />
            Save Budget Plan
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Download className="h-5 w-5 mr-2" />
            Export to PDF
          </button>
        </div>

        {/* Travel Tips Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Essential Travel Planning Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Plane className="h-5 w-5 mr-2 text-blue-600" />
                Transportation
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Book flights 2-3 months in advance</li>
                <li>• Compare prices across multiple airlines</li>
                <li>• Consider budget airlines for short trips</li>
                <li>• Research local transportation options</li>
                <li>• Factor in airport transfers and local travel</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Hotel className="h-5 w-5 mr-2 text-green-600" />
                Accommodation
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Read reviews from multiple sources</li>
                <li>• Check location and accessibility</li>
                <li>• Compare hotel vs. vacation rentals</li>
                <li>• Book during off-peak seasons</li>
                <li>• Consider all-inclusive packages</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Utensils className="h-5 w-5 mr-2 text-orange-600" />
                Food & Dining
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Research local cuisine and restaurants</li>
                <li>• Mix fine dining with local eateries</li>
                <li>• Budget for 3 meals plus snacks</li>
                <li>• Consider food tours and cooking classes</li>
                <li>• Factor in drinks and beverages</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Camera className="h-5 w-5 mr-2 text-purple-600" />
                Activities & Entertainment
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Research must-see attractions</li>
                <li>• Book popular activities in advance</li>
                <li>• Look for combo tickets and passes</li>
                <li>• Include free activities and walking tours</li>
                <li>• Budget for souvenirs and shopping</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
          <p className="text-yellow-700">
            This budget planner provides estimates based on general travel costs. Actual expenses may vary 
            depending on destination, season, and personal preferences. Always research current prices 
            for your specific destination and travel dates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VacationBudgetPlanner; 