import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Home, Car, CreditCard, PiggyBank, Building, BarChart3, PieChart, Target, AlertCircle, CheckCircle, Zap, Info, Star } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface Asset {
  id: string;
  name: string;
  value: number;
  category: string;
  type: 'liquid' | 'investment' | 'property' | 'other';
}

interface Liability {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: 'secured' | 'unsecured' | 'credit-card' | 'other';
}

interface NetWorthAnalysis {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  assetBreakdown: Array<{
    category: string;
    value: number;
    percentage: number;
    color: string;
    icon: React.ReactNode;
  }>;
  liabilityBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
    color: string;
    icon: React.ReactNode;
  }>;
  recommendations: string[];
  financialHealth: {
    score: number;
    level: 'excellent' | 'good' | 'fair' | 'poor';
    description: string;
  };
  trends: Array<{
    month: string;
    netWorth: number;
    assets: number;
    liabilities: number;
  }>;
}

type AssetValue = Asset[keyof Asset];
type LiabilityValue = Liability[keyof Liability];

const NetWorthCalculator: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      name: 'Savings Account',
      value: 50000,
      category: 'cash',
      type: 'liquid'
    },
    {
      id: '2',
      name: 'Investment Portfolio',
      value: 200000,
      category: 'investments',
      type: 'investment'
    }
  ]);

  const [liabilities, setLiabilities] = useState<Liability[]>([
    {
      id: '1',
      name: 'Credit Card Debt',
      amount: 25000,
      category: 'credit-cards',
      type: 'credit-card'
    }
  ]);

  const [analysis, setAnalysis] = useState<NetWorthAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const assetCategories = [
    { id: 'cash', name: 'Cash & Savings', icon: <PiggyBank className="w-5 h-5" />, color: 'bg-green-500' },
    { id: 'investments', name: 'Investments', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-blue-500' },
    { id: 'property', name: 'Real Estate', icon: <Home className="w-5 h-5" />, color: 'bg-purple-500' },
    { id: 'vehicles', name: 'Vehicles', icon: <Car className="w-5 h-5" />, color: 'bg-yellow-500' },
    { id: 'business', name: 'Business', icon: <Building className="w-5 h-5" />, color: 'bg-indigo-500' },
    { id: 'other', name: 'Other Assets', icon: <Star className="w-5 h-5" />, color: 'bg-gray-500' }
  ];

  const liabilityCategories = [
    { id: 'mortgage', name: 'Mortgage', icon: <Home className="w-5 h-5" />, color: 'bg-red-500' },
    { id: 'credit-cards', name: 'Credit Cards', icon: <CreditCard className="w-5 h-5" />, color: 'bg-orange-500' },
    { id: 'personal-loans', name: 'Personal Loans', icon: <DollarSign className="w-5 h-5" />, color: 'bg-pink-500' },
    { id: 'car-loans', name: 'Car Loans', icon: <Car className="w-5 h-5" />, color: 'bg-yellow-500' },
    { id: 'student-loans', name: 'Student Loans', icon: <Info className="w-5 h-5" />, color: 'bg-blue-500' },
    { id: 'other', name: 'Other Debts', icon: <AlertCircle className="w-5 h-5" />, color: 'bg-gray-500' }
  ];

  const addAsset = () => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      name: '',
      value: 0,
      category: 'cash',
      type: 'liquid'
    };
    setAssets([...assets, newAsset]);
  };

  const updateAsset = (id: string, field: keyof Asset, value: AssetValue) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, [field]: value } : asset
    ));
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const addLiability = () => {
    const newLiability: Liability = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      category: 'credit-cards',
      type: 'unsecured'
    };
    setLiabilities([...liabilities, newLiability]);
  };

  const updateLiability = (id: string, field: keyof Liability, value: LiabilityValue) => {
    setLiabilities(liabilities.map(liability => 
      liability.id === id ? { ...liability, [field]: value } : liability
    ));
  };

  const removeLiability = (id: string) => {
    setLiabilities(liabilities.filter(liability => liability.id !== id));
  };

  const calculateNetWorth = () => {
    if (assets.length === 0 && liabilities.length === 0) {
      alert('Please add at least one asset or liability');
      return;
    }

    const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
    const netWorth = totalAssets - totalLiabilities;

    // Asset breakdown
    const assetMap = new Map<string, number>();
    assets.forEach(asset => {
      const current = assetMap.get(asset.category) || 0;
      assetMap.set(asset.category, current + asset.value);
    });

    const assetBreakdown = Array.from(assetMap.entries()).map(([category, value]) => {
      const categoryInfo = assetCategories.find(c => c.id === category);
      return {
        category: categoryInfo?.name || category,
        value,
        percentage: totalAssets > 0 ? (value / totalAssets) * 100 : 0,
        color: categoryInfo?.color || 'bg-gray-500',
        icon: categoryInfo?.icon || <Star className="w-5 h-5" />
      };
    }).sort((a, b) => b.value - a.value);

    // Liability breakdown
    const liabilityMap = new Map<string, number>();
    liabilities.forEach(liability => {
      const current = liabilityMap.get(liability.category) || 0;
      liabilityMap.set(liability.category, current + liability.amount);
    });

    const liabilityBreakdown = Array.from(liabilityMap.entries()).map(([category, amount]) => {
      const categoryInfo = liabilityCategories.find(c => c.id === category);
      return {
        category: categoryInfo?.name || category,
        amount,
        percentage: totalLiabilities > 0 ? (amount / totalLiabilities) * 100 : 0,
        color: categoryInfo?.color || 'bg-gray-500',
        icon: categoryInfo?.icon || <AlertCircle className="w-5 h-5" />
      };
    }).sort((a, b) => b.amount - a.amount);

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (netWorth < 0) {
      recommendations.push("Your net worth is negative. Focus on paying down high-interest debt first.");
    } else if (netWorth < totalAssets * 0.3) {
      recommendations.push("Your net worth is low relative to your assets. Consider reducing debt.");
    } else {
      recommendations.push("Great job! You have a positive net worth. Consider increasing investments.");
    }
    
    if (totalLiabilities > totalAssets * 0.5) {
      recommendations.push("Your debt-to-asset ratio is high. Focus on debt reduction strategies.");
    }
    
    if (assetBreakdown.find(a => a.category === 'Cash & Savings')?.percentage > 50) {
      recommendations.push("You have a lot of cash. Consider investing excess funds for better returns.");
    }
    
    if (liabilityBreakdown.find(l => l.category === 'Credit Cards')?.amount > 0) {
      recommendations.push("Pay off credit card debt as soon as possible due to high interest rates.");
    }

    // Calculate financial health score
    let score = 0;
    let level: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
    let description = '';

    if (netWorth > 0) score += 40;
    if (totalLiabilities < totalAssets * 0.3) score += 30;
    if (assetBreakdown.find(a => a.category === 'Investments')?.percentage > 20) score += 20;
    if (liabilityBreakdown.find(l => l.category === 'Credit Cards')?.amount === 0) score += 10;

    if (score >= 80) {
      level = 'excellent';
      description = 'Excellent financial health with strong net worth and good asset allocation';
    } else if (score >= 60) {
      level = 'good';
      description = 'Good financial health with room for improvement in some areas';
    } else if (score >= 40) {
      level = 'fair';
      description = 'Fair financial health with several areas needing attention';
    } else {
      level = 'poor';
      description = 'Poor financial health requiring immediate attention to debt and savings';
    }

    // Generate sample trends (in real app, this would come from historical data)
    const trends = [
      { month: 'Jan 2024', netWorth: netWorth * 0.8, assets: totalAssets * 0.9, liabilities: totalLiabilities * 1.1 },
      { month: 'Feb 2024', netWorth: netWorth * 0.85, assets: totalAssets * 0.92, liabilities: totalLiabilities * 1.05 },
      { month: 'Mar 2024', netWorth: netWorth * 0.9, assets: totalAssets * 0.95, liabilities: totalLiabilities * 1.02 },
      { month: 'Apr 2024', netWorth: netWorth * 0.95, assets: totalAssets * 0.98, liabilities: totalLiabilities * 1.01 },
      { month: 'May 2024', netWorth: netWorth, assets: totalAssets, liabilities: totalLiabilities }
    ];

    setAnalysis({
      totalAssets,
      totalLiabilities,
      netWorth,
      assetBreakdown,
      liabilityBreakdown,
      recommendations,
      financialHealth: { score, level, description },
      trends
    });
    
    setShowResults(true);
  };

  const getHealthColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthIcon = (level: string) => {
    switch (level) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'fair': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'poor': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const resetCalculator = () => {
    setAssets([
      {
        id: '1',
        name: 'Savings Account',
        value: 50000,
        category: 'cash',
        type: 'liquid'
      },
      {
        id: '2',
        name: 'Investment Portfolio',
        value: 200000,
        category: 'investments',
        type: 'investment'
      }
    ]);
    setLiabilities([
      {
        id: '1',
        name: 'Credit Card Debt',
        amount: 25000,
        category: 'credit-cards',
        type: 'credit-card'
      }
    ]);
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Net Worth Calculator - Track Your Financial Health | MoneyCal India"
        description="Calculate your net worth by tracking assets and liabilities. Get insights into your financial health, asset allocation, and personalized recommendations for wealth building."
        keywords="net worth Calculator, financial health, assets, liabilities, wealth tracking, financial planning, net worth analysis, personal finance"
        url="/tools/net-worth-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Net Worth Calculator",
          "description": "Calculate and track your net worth for better financial health",
          "url": "/tools/net-worth-calculator",
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
                  Net Worth Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your net worth by tracking all your assets and liabilities. 
                Get insights into your financial health and personalized recommendations for wealth building.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Assets Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
                  Assets
                </h2>

                <div className="space-y-4 mb-6">
                  {assets.map((asset, index) => (
                    <div key={asset.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Asset #{index + 1}</h3>
                        {assets.length > 1 && (
                          <button
                            onClick={() => removeAsset(asset.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Asset Name</label>
                          <input
                            type="text"
                            value={asset.name}
                            onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Savings Account, House"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            value={asset.category}
                            onChange={(e) => updateAsset(asset.id, 'category', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {assetCategories.map(category => (
                              <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Value (₹)</label>
                          <input
                            type="number"
                            value={asset.value}
                            onChange={(e) => updateAsset(asset.id, 'value', Number(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter current value"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                          <select
                            value={asset.type}
                            onChange={(e) => updateAsset(asset.id, 'type', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="liquid">Liquid</option>
                            <option value="investment">Investment</option>
                            <option value="property">Property</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addAsset}
                  className="w-full bg-green-100 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-200 transition-colors duration-200"
                >
                  + Add Another Asset
                </button>
              </div>

              {/* Liabilities Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingDown className="w-6 h-6 mr-3 text-red-600" />
                  Liabilities
                </h2>

                <div className="space-y-4 mb-6">
                  {liabilities.map((liability, index) => (
                    <div key={liability.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Liability #{index + 1}</h3>
                        {liabilities.length > 1 && (
                          <button
                            onClick={() => removeLiability(liability.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Liability Name</label>
                          <input
                            type="text"
                            value={liability.name}
                            onChange={(e) => updateLiability(liability.id, 'name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Credit Card, Home Loan"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            value={liability.category}
                            onChange={(e) => updateLiability(liability.id, 'category', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {liabilityCategories.map(category => (
                              <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Amount Owed (₹)</label>
                          <input
                            type="number"
                            value={liability.amount}
                            onChange={(e) => updateLiability(liability.id, 'amount', Number(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter amount owed"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                          <select
                            value={liability.type}
                            onChange={(e) => updateLiability(liability.id, 'type', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="secured">Secured</option>
                            <option value="unsecured">Unsecured</option>
                            <option value="credit-card">Credit Card</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addLiability}
                  className="w-full bg-red-100 text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-red-200 transition-colors duration-200"
                >
                  + Add Another Liability
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={calculateNetWorth}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Calculate Net Worth
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Assets</h3>
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.totalAssets.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Liabilities</h3>
                        <TrendingDown className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-600">₹{analysis.totalLiabilities.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Net Worth</h3>
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className={`text-3xl font-bold ${analysis.netWorth >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        ₹{analysis.netWorth.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Financial Health Score */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target className="w-6 h-6 mr-3 text-blue-600" />
                      Financial Health Score
                    </h3>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        {getHealthIcon(analysis.financialHealth.level)}
                        <span className={`ml-3 px-4 py-2 rounded-full text-lg font-semibold ${getHealthColor(analysis.financialHealth.level)}`}>
                          {analysis.financialHealth.level.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-4xl font-bold text-gray-900 mb-2">{analysis.financialHealth.score}/100</p>
                      <p className="text-gray-600">{analysis.financialHealth.description}</p>
                    </div>
                  </div>

                  {/* Asset Breakdown */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Asset Breakdown
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.assetBreakdown.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${asset.color} text-white mr-3`}>
                              {asset.icon}
                            </div>
                            <span className="font-medium text-gray-900">{asset.category}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{asset.value.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{asset.percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Liability Breakdown */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                      Liability Breakdown
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.liabilityBreakdown.map((liability, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${liability.color} text-white mr-3`}>
                              {liability.icon}
                            </div>
                            <span className="font-medium text-gray-900">{liability.category}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{liability.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{liability.percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
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
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your Net Worth?</h3>
                  <p className="text-gray-600">
                    Add your assets and liabilities to get a comprehensive view of your financial health and personalized recommendations.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Net Worth Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What is Net Worth?</h3>
                <p className="text-gray-600 mb-4">
                  Net worth is the difference between your total assets and total liabilities. It's a key indicator of your financial health.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Assets: Everything you own with value</li>
                  <li>• Liabilities: Everything you owe</li>
                  <li>• Net Worth = Assets - Liabilities</li>
                  <li>• Positive net worth is a good sign</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Building Net Worth</h3>
                <p className="text-gray-600 mb-4">
                  Focus on increasing assets and reducing liabilities to build your net worth over time.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Increase income and savings</li>
                  <li>• Invest in appreciating assets</li>
                  <li>• Pay down high-interest debt</li>
                  <li>• Track progress regularly</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Asset Allocation</h3>
                <p className="text-gray-600 mb-4">
                  Diversify your assets across different categories for better risk management and growth potential.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Emergency fund (3-6 months expenses)</li>
                  <li>• Investment portfolio (stocks, bonds, mutual funds)</li>
                  <li>• Real estate (home, rental properties)</li>
                  <li>• Retirement accounts (EPF, NPS, etc.)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NetWorthCalculator;
