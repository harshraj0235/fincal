import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Briefcase, TrendingUp, DollarSign, Home, Car, CreditCard, Building, Plus, Trash2, Download, Save, BarChart3 } from 'lucide-react';

interface Asset {
  id: number;
  name: string;
  value: number;
  category: string;
}

interface Liability {
  id: number;
  name: string;
  value: number;
  category: string;
}

const NetWorthCalculator: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: 1, name: 'Savings Account', value: 0, category: 'Cash & Savings' },
    { id: 2, name: 'Investment Portfolio', value: 0, category: 'Investments' },
    { id: 3, name: 'Real Estate', value: 0, category: 'Real Estate' },
    { id: 4, name: 'Vehicle', value: 0, category: 'Personal Property' }
  ]);

  const [liabilities, setLiabilities] = useState<Liability[]>([
    { id: 1, name: 'Home Loan', value: 0, category: 'Mortgage' },
    { id: 2, name: 'Car Loan', value: 0, category: 'Vehicle Loan' },
    { id: 3, name: 'Credit Card Debt', value: 0, category: 'Credit Cards' },
    { id: 4, name: 'Personal Loan', value: 0, category: 'Personal Loans' }
  ]);

  const assetCategories = [
    'Cash & Savings', 'Investments', 'Real Estate', 'Personal Property', 
    'Business Assets', 'Retirement Accounts', 'Insurance Cash Value', 'Other'
  ];

  const liabilityCategories = [
    'Mortgage', 'Vehicle Loan', 'Credit Cards', 'Personal Loans', 
    'Student Loans', 'Business Loans', 'Tax Liabilities', 'Other'
  ];

  const handleAssetChange = (id: number, field: string, value: string | number) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, [field]: field === 'value' ? Number(value) : value } : asset
    ));
  };

  const handleLiabilityChange = (id: number, field: string, value: string | number) => {
    setLiabilities(liabilities.map(liability => 
      liability.id === id ? { ...liability, [field]: field === 'value' ? Number(value) : value } : liability
    ));
  };

  const addAsset = () => {
    const newId = Math.max(...assets.map(a => a.id)) + 1;
    setAssets([...assets, { id: newId, name: '', value: 0, category: 'Other' }]);
  };

  const addLiability = () => {
    const newId = Math.max(...liabilities.map(l => l.id)) + 1;
    setLiabilities([...liabilities, { id: newId, name: '', value: 0, category: 'Other' }]);
  };

  const removeAsset = (id: number) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const removeLiability = (id: number) => {
    setLiabilities(liabilities.filter(liability => liability.id !== id));
  };

  const getTotalAssets = () => assets.reduce((sum, asset) => sum + asset.value, 0);
  const getTotalLiabilities = () => liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const getNetWorth = () => getTotalAssets() - getTotalLiabilities();

  const getCategoryTotal = (items: Asset[] | Liability[], category: string) => {
    return items
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.value, 0);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('netWorthData', JSON.stringify({ assets, liabilities }));
    alert('Net worth data saved successfully!');
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('netWorthData');
    if (saved) {
      const data = JSON.parse(saved);
      setAssets(data.assets);
      setLiabilities(data.liabilities);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <SEOHelmet
        title="Net Worth Calculator - Calculate Your Financial Net Worth India 2025"
        description="Calculate your net worth with our free online calculator. Track assets, liabilities, and understand your financial position. Perfect for financial planning and wealth assessment."
        keywords="net worth calculator, financial net worth, assets liabilities calculator, wealth calculator, financial position calculator"
        url="/calculators/net-worth-calculator"
        type="website"
        image="/images/net-worth-calculator.jpg"
        tags={["net worth", "financial calculator", "wealth assessment", "assets liabilities"]}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Net Worth Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your net worth by tracking all your assets and liabilities. 
            Understand your financial position and plan for wealth building.
          </p>
        </div>

        {/* Net Worth Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-green-600">₹{getTotalAssets().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Liabilities</p>
                <p className="text-2xl font-bold text-red-600">₹{getTotalLiabilities().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Net Worth</p>
                <p className={`text-2xl font-bold ${getNetWorth() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{getNetWorth().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Assets Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Assets
              </h2>
              <button
                onClick={addAsset}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Asset
              </button>
            </div>

            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Asset Name</label>
                      <input
                        type="text"
                        value={asset.name}
                        onChange={(e) => handleAssetChange(asset.id, 'name', e.target.value)}
                        placeholder="e.g., Savings Account"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Category</label>
                      <select
                        value={asset.category}
                        onChange={(e) => handleAssetChange(asset.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      >
                        {assetCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Value (₹)</label>
                        <input
                          type="number"
                          value={asset.value}
                          onChange={(e) => handleAssetChange(asset.id, 'value', e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removeAsset(asset.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-red-600" />
                Liabilities
              </h2>
              <button
                onClick={addLiability}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Liability
              </button>
            </div>

            <div className="space-y-4">
              {liabilities.map((liability) => (
                <div key={liability.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Liability Name</label>
                      <input
                        type="text"
                        value={liability.name}
                        onChange={(e) => handleLiabilityChange(liability.id, 'name', e.target.value)}
                        placeholder="e.g., Home Loan"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Category</label>
                      <select
                        value={liability.category}
                        onChange={(e) => handleLiabilityChange(liability.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      >
                        {liabilityCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Amount (₹)</label>
                        <input
                          type="number"
                          value={liability.value}
                          onChange={(e) => handleLiabilityChange(liability.id, 'value', e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removeLiability(liability.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Asset Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
              Asset Breakdown
            </h3>
            
            <div className="space-y-3">
              {assetCategories.map(category => {
                const total = getCategoryTotal(assets, category);
                if (total === 0) return null;
                
                const percentage = (total / getTotalAssets()) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-700">{category}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
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

          {/* Liability Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-red-600" />
              Liability Breakdown
            </h3>
            
            <div className="space-y-3">
              {liabilityCategories.map(category => {
                const total = getCategoryTotal(liabilities, category);
                if (total === 0) return null;
                
                const percentage = (total / getTotalLiabilities()) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-700">{category}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
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
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={saveToLocalStorage}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Data
          </button>
          <button
            onClick={loadFromLocalStorage}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            Load Data
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
            <Download className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>

        {/* Financial Health Assessment */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Health Assessment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Net Worth Analysis</h3>
              <div className="space-y-3">
                {getNetWorth() >= 0 ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✅ Positive Net Worth</p>
                    <p className="text-green-700 text-sm">Your assets exceed your liabilities. Great financial position!</p>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">⚠️ Negative Net Worth</p>
                    <p className="text-red-700 text-sm">Focus on reducing debt and building assets to improve your position.</p>
                  </div>
                )}
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 font-medium">📊 Asset to Liability Ratio</p>
                  <p className="text-blue-700 text-sm">
                    {getTotalLiabilities() > 0 ? 
                      `Your assets are ${(getTotalAssets() / getTotalLiabilities()).toFixed(1)}x your liabilities.` :
                      'No liabilities recorded.'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Improvement Tips</h3>
              <div className="space-y-2 text-gray-700">
                <p>• <strong>Increase savings</strong> and emergency fund</p>
                <p>• <strong>Invest regularly</strong> in diversified assets</p>
                <p>• <strong>Pay off high-interest debt</strong> first</p>
                <p>• <strong>Track net worth monthly</strong> to monitor progress</p>
                <p>• <strong>Consider insurance</strong> to protect assets</p>
                <p>• <strong>Plan for retirement</strong> with long-term investments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
          <p className="text-yellow-700">
            This calculator provides estimates for educational purposes. For accurate financial assessment, 
            consult with a qualified financial advisor. Asset values may fluctuate and should be updated regularly. 
            This tool is not a substitute for professional financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCalculator; 