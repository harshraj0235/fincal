import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3,
  Calculator, 
  DollarSign, 
  PieChart,
  LineChart, 
  Activity,
  Info,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Shield,
  Globe,
  Smartphone,
  TrendingDown,
  Percent,
  Layers, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface Asset {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  category: string;
  risk: 'low' | 'medium' | 'high';
  expectedReturn: number;
}

interface PortfolioAnalysis {
  totalValue: number;
  diversificationScore: number;
  riskScore: number;
  expectedReturn: number;
  assetAllocation: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  riskBreakdown: {
  risk: string;
    amount: number;
    percentage: number;
  }[];
  recommendations: string[];
}

const PortfolioDiversificationVisualizer: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: 'Equity Mutual Funds', amount: 500000, percentage: 50, category: 'Equity', risk: 'high', expectedReturn: 12 },
    { id: '2', name: 'Fixed Deposits', amount: 300000, percentage: 30, category: 'Fixed Income', risk: 'low', expectedReturn: 7 },
    { id: '3', name: 'Gold ETF', amount: 100000, percentage: 10, category: 'Commodities', risk: 'medium', expectedReturn: 8 },
    { id: '4', name: 'Real Estate', amount: 100000, percentage: 10, category: 'Real Estate', risk: 'medium', expectedReturn: 10 }
  ]);
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const categories = ['Equity', 'Fixed Income', 'Commodities', 'Real Estate', 'International', 'Bonds', 'Cash'];
  const riskLevels = ['low', 'medium', 'high'];

  const calculateAnalysis = () => {
    const totalValue = assets.reduce((sum, asset) => sum + asset.amount, 0);
    
    // Update percentages
    const updatedAssets = assets.map(asset => ({
      ...asset,
      percentage: (asset.amount / totalValue) * 100
    }));
    setAssets(updatedAssets);
    
    // Calculate diversification score (0-100)
    const categoryCount = new Set(updatedAssets.map(a => a.category)).size;
    const maxCategories = 7;
    const diversificationScore = Math.min((categoryCount / maxCategories) * 100, 100);
    
    // Calculate risk score (0-100, higher = more risky)
    const riskWeights = { low: 1, medium: 2, high: 3 };
    const weightedRisk = updatedAssets.reduce((sum, asset) => 
      sum + (asset.percentage * riskWeights[asset.risk]), 0);
    const riskScore = Math.min(weightedRisk / 3, 100);
    
    // Calculate expected return
    const expectedReturn = updatedAssets.reduce((sum, asset) => 
      sum + (asset.percentage * asset.expectedReturn / 100), 0);
    
    // Asset allocation by category
    const assetAllocation = categories.map(category => {
      const categoryAssets = updatedAssets.filter(a => a.category === category);
      const amount = categoryAssets.reduce((sum, asset) => sum + asset.amount, 0);
      return {
        category,
        amount,
        percentage: (amount / totalValue) * 100
      };
    }).filter(item => item.amount > 0);
    
    // Risk breakdown
    const riskBreakdown = riskLevels.map(risk => {
      const riskAssets = updatedAssets.filter(a => a.risk === risk);
      const amount = riskAssets.reduce((sum, asset) => sum + asset.amount, 0);
    return {
        risk: risk.charAt(0).toUpperCase() + risk.slice(1),
        amount,
        percentage: (amount / totalValue) * 100
      };
    }).filter(item => item.amount > 0);
    
    // Generate recommendations
    const recommendations = [];
    if (diversificationScore < 60) {
      recommendations.push('Consider adding more asset categories for better diversification');
    }
    if (riskScore > 70) {
      recommendations.push('Portfolio is high-risk. Consider adding more low-risk assets');
    }
    if (expectedReturn < 8) {
      recommendations.push('Expected return is low. Consider adding growth-oriented assets');
    }
    if (assetAllocation.find(a => a.category === 'Cash')?.percentage > 20) {
      recommendations.push('High cash allocation. Consider investing excess cash');
    }
    if (recommendations.length === 0) {
      recommendations.push('Portfolio is well-diversified and balanced');
    }
    
    setAnalysis({
      totalValue,
      diversificationScore,
      riskScore,
      expectedReturn,
      assetAllocation,
      riskBreakdown,
      recommendations
    });
    setShowAnalysis(true);
  };

  const addAsset = () => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      percentage: 0,
      category: 'Equity',
      risk: 'medium',
      expectedReturn: 10
    };
    setAssets([...assets, newAsset]);
  };

  const updateAsset = (id: string, field: keyof Asset, value: any) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, [field]: value } : asset
    ));
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDiversificationColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return 'text-green-600';
    if (score <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <>
      <SEOHelmet
        title="Portfolio Diversification Visualizer - Asset Allocation Analysis | MoneyCal"
        description="Visualize and analyze your portfolio diversification with our comprehensive asset allocation tool. Get insights on risk distribution and optimization recommendations."
        keywords="portfolio diversification, asset allocation, investment portfolio analysis, risk management, portfolio optimization"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Portfolio Diversification Visualizer
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Visualize and analyze your portfolio diversification with comprehensive asset allocation insights.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2" />
                  Asset Allocation
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Risk Analysis
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Optimization
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Input Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Portfolio Assets
                </h2>
                <button
                  onClick={addAsset}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Asset
                </button>
              </div>

              <div className="space-y-4">
                {assets.map((asset, index) => (
                  <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
                        <input
                          type="text"
                          value={asset.name}
                          onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Equity Mutual Funds"
                        />
                      </div>
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                          value={asset.amount}
                          onChange={(e) => updateAsset(asset.id, 'amount', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="500000"
                    />
                  </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={asset.category}
                          onChange={(e) => updateAsset(asset.id, 'category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                        <select
                          value={asset.risk}
                          onChange={(e) => updateAsset(asset.id, 'risk', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {riskLevels.map(risk => (
                            <option key={risk} value={risk}>{risk.charAt(0).toUpperCase() + risk.slice(1)}</option>
                          ))}
                        </select>
                        </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Return (%)</label>
                        <input
                          type="number"
                          value={asset.expectedReturn}
                          onChange={(e) => updateAsset(asset.id, 'expectedReturn', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="12"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => removeAsset(asset.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                      </div>
                    ))}
                  </div>

              <div className="mt-6">
                <button
                  onClick={calculateAnalysis}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Analyze Portfolio
                </button>
                </div>
              </motion.div>
          </div>
        </section>

        {/* Analysis Results */}
        {showAnalysis && analysis && (
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Portfolio Analysis Results
                </h2>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Total Portfolio Value</h3>
                    <p className="text-2xl font-bold text-blue-900">₹{analysis.totalValue.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-800 mb-2">Diversification Score</h3>
                    <p className={`text-2xl font-bold ${getDiversificationColor(analysis.diversificationScore)}`}>
                      {analysis.diversificationScore.toFixed(1)}%
                    </p>
                    </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-red-800 mb-2">Risk Score</h3>
                    <p className={`text-2xl font-bold ${getRiskScoreColor(analysis.riskScore)}`}>
                      {analysis.riskScore.toFixed(1)}%
                    </p>
                    </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-purple-800 mb-2">Expected Return</h3>
                    <p className="text-2xl font-bold text-purple-900">{analysis.expectedReturn.toFixed(2)}%</p>
                  </div>
                </div>

                {/* Asset Allocation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation by Category</h3>
                  <div className="space-y-3">
                      {analysis.assetAllocation.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-700">{item.category}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">₹{item.amount.toLocaleString()}</span>
                            <span className="font-semibold text-gray-900">{item.percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
                    <div className="space-y-3">
                      {analysis.riskBreakdown.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(item.risk.toLowerCase())}`}>
                            {item.risk}
                      </span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">₹{item.amount.toLocaleString()}</span>
                            <span className="font-semibold text-gray-900">{item.percentage.toFixed(1)}%</span>
                    </div>
                    </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Portfolio Recommendations
                  </h3>
                  <div className="space-y-2">
                    {analysis.recommendations.map((recommendation, index) => (
                      <p key={index} className="text-yellow-700">• {recommendation}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
          </div>
        </section>
        )}

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Portfolio Diversification
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-blue-600" />
                    What is Diversification?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Spreading investments across different asset classes to reduce risk.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Purpose:</strong> Reduce portfolio volatility</p>
                    <p><strong>Benefit:</strong> Protect against market downturns</p>
                    <p><strong>Strategy:</strong> Don't put all eggs in one basket</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    Risk Management
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Balancing risk and return through proper asset allocation.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Low Risk:</strong> Fixed deposits, bonds</p>
                    <p><strong>Medium Risk:</strong> Balanced funds, gold</p>
                    <p><strong>High Risk:</strong> Equity, real estate</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Asset Categories
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Different types of investments for portfolio diversification.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Equity:</strong> Stocks, equity mutual funds</p>
                    <p><strong>Fixed Income:</strong> Bonds, FDs, debt funds</p>
                    <p><strong>Commodities:</strong> Gold, silver, oil</p>
                    <p><strong>Real Estate:</strong> Property, REITs</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-orange-600" />
                    Optimization Tips
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Best practices for portfolio diversification.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Rebalance:</strong> Regular portfolio review</p>
                    <p><strong>Age-based:</strong> Adjust risk with age</p>
                    <p><strong>Goal-based:</strong> Align with financial goals</p>
                  </div>
                </div>
                </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Benefits of Portfolio Diversification
                </h3>
                <div className="space-y-4 text-blue-700">
                  <p>
                    <strong>Risk Reduction:</strong> Diversification helps reduce the impact of poor performance 
                    in any single investment or asset class on your overall portfolio.
                  </p>
                  <p>
                    <strong>Stable Returns:</strong> A well-diversified portfolio typically provides more 
                    consistent returns over time, reducing volatility.
                  </p>
                  <p>
                    <strong>Capital Preservation:</strong> By spreading investments across different assets, 
                    you protect your capital from significant losses in any single investment.
                  </p>
                  <p>
                    <strong>Growth Opportunities:</strong> Diversification allows you to participate in 
                    growth across different sectors and asset classes.
                  </p>
                </div>
                </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Diversification Best Practices
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Asset Allocation:</strong> Allocate investments across different asset classes 
                    based on your risk tolerance and investment goals.
                  </p>
                  <p>
                    <strong>Geographic Diversification:</strong> Consider international investments to 
                    reduce country-specific risks and access global growth opportunities.
                  </p>
                  <p>
                    <strong>Sector Diversification:</strong> Spread investments across different sectors 
                    to avoid concentration risk in any single industry.
                  </p>
                  <p>
                    <strong>Regular Rebalancing:</strong> Periodically review and rebalance your portfolio 
                    to maintain your target asset allocation and risk profile.
                  </p>
            </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PortfolioDiversificationVisualizer;
