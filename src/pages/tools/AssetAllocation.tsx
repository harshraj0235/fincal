import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { PieChart, BarChart3, TrendingUp, Target, Calculator, AlertCircle } from 'lucide-react';

const AssetAllocation: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number>(1000000);
  const [allocation, setAllocation] = useState({
    equity: 60,
    debt: 30,
    gold: 10
  });

  const [customAllocation, setCustomAllocation] = useState({
    largeCap: 20,
    midCap: 15,
    smallCap: 10,
    international: 15,
    governmentBonds: 15,
    corporateBonds: 10,
    goldETF: 5,
    realEstate: 10
  });

  const [showCustom, setShowCustom] = useState(false);

  const handleAllocationChange = (asset: string, value: number) => {
    const newAllocation = { ...allocation, [asset]: value };
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0);
    
    if (total <= 100) {
      setAllocation(newAllocation);
    }
  };

  const handleCustomAllocationChange = (asset: string, value: number) => {
    const newAllocation = { ...customAllocation, [asset]: value };
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0);
    
    if (total <= 100) {
      setCustomAllocation(newAllocation);
    }
  };

  const getAssetAmount = (percentage: number) => {
    return (totalAmount * percentage) / 100;
  };

  const getCustomAssetAmount = (percentage: number) => {
    return (totalAmount * percentage) / 100;
  };

  const getExpectedReturns = () => {
    const equityReturns = 12;
    const debtReturns = 7;
    const goldReturns = 8;
    
    return (allocation.equity * equityReturns + allocation.debt * debtReturns + allocation.gold * goldReturns) / 100;
  };

  const getCustomExpectedReturns = () => {
    const returns = {
      largeCap: 12,
      midCap: 15,
      smallCap: 18,
      international: 10,
      governmentBonds: 6,
      corporateBonds: 8,
      goldETF: 8,
      realEstate: 10
    };
    
    let totalReturns = 0;
    Object.entries(customAllocation).forEach(([asset, percentage]) => {
      totalReturns += (percentage * returns[asset as keyof typeof returns]) / 100;
    });
    
    return totalReturns;
  };

  const getRiskLevel = () => {
    const equityWeight = allocation.equity;
    if (equityWeight > 70) return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
    if (equityWeight > 40) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const riskLevel = getRiskLevel();
  const expectedReturns = getExpectedReturns();
  const customExpectedReturns = getCustomExpectedReturns();

  const allocationPresets = [
    { name: 'Conservative', equity: 20, debt: 60, gold: 20 },
    { name: 'Moderate', equity: 40, debt: 50, gold: 10 },
    { name: 'Balanced', equity: 60, debt: 30, gold: 10 },
    { name: 'Growth', equity: 80, debt: 15, gold: 5 },
    { name: 'Aggressive', equity: 90, debt: 5, gold: 5 }
  ];

  const applyPreset = (preset: typeof allocationPresets[0]) => {
    setAllocation({
      equity: preset.equity,
      debt: preset.debt,
      gold: preset.gold
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <SEOHelmet
        title="Asset Allocation Calculator - Optimize Your Investment Portfolio | MoneyCal India"
        description="Calculate optimal asset allocation for your investment portfolio. Get personalized recommendations for equity, debt, and gold allocation based on your risk profile and financial goals."
        keywords="asset allocation, portfolio allocation, investment allocation, equity allocation, debt allocation, gold allocation, portfolio optimization, investment strategy"
        canonicalUrl="https://moneycal.in/tools/asset-allocation"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Asset Allocation Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Optimize your investment portfolio with the right mix of equity, debt, and gold based on your risk tolerance and financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Investment Amount */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-600" />
                  Investment Amount
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Investment Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter investment amount"
                  />
                </div>
              </div>

              {/* Allocation Presets */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-green-600" />
                  Quick Allocation Presets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allocationPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                    >
                      <div className="font-semibold text-gray-900 mb-2">{preset.name}</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Equity: {preset.equity}%</div>
                        <div>Debt: {preset.debt}%</div>
                        <div>Gold: {preset.gold}%</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Allocation */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <PieChart className="w-6 h-6 mr-2 text-purple-600" />
                    Asset Allocation
                  </h2>
                  <button
                    onClick={() => setShowCustom(!showCustom)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {showCustom ? 'Simple View' : 'Detailed View'}
                  </button>
                </div>

                {!showCustom ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Equity</label>
                        <span className="text-sm text-gray-500">{allocation.equity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={allocation.equity}
                        onChange={(e) => handleAllocationChange('equity', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Debt</label>
                        <span className="text-sm text-gray-500">{allocation.debt}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={allocation.debt}
                        onChange={(e) => handleAllocationChange('debt', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Gold</label>
                        <span className="text-sm text-gray-500">{allocation.gold}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={allocation.gold}
                        onChange={(e) => handleAllocationChange('gold', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Large Cap</label>
                          <span className="text-sm text-gray-500">{customAllocation.largeCap}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customAllocation.largeCap}
                          onChange={(e) => handleCustomAllocationChange('largeCap', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Mid Cap</label>
                          <span className="text-sm text-gray-500">{customAllocation.midCap}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customAllocation.midCap}
                          onChange={(e) => handleCustomAllocationChange('midCap', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Small Cap</label>
                          <span className="text-sm text-gray-500">{customAllocation.smallCap}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customAllocation.smallCap}
                          onChange={(e) => handleCustomAllocationChange('smallCap', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">International</label>
                          <span className="text-sm text-gray-500">{customAllocation.international}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customAllocation.international}
                          onChange={(e) => handleCustomAllocationChange('international', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Government Bonds</label>
                          <span className="text-sm text-gray-500">{customAllocation.governmentBonds}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customAllocation.governmentBonds}
                          onChange={(e) => handleCustomAllocationChange('governmentBonds', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Corporate Bonds</label>
                          <span className="text-sm text-gray-500">{customAllocation.corporateBonds}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customAllocation.corporateBonds}
                          onChange={(e) => handleCustomAllocationChange('corporateBonds', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Gold ETF</label>
                          <span className="text-sm text-gray-500">{customAllocation.goldETF}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customAllocation.goldETF}
                          onChange={(e) => handleCustomAllocationChange('goldETF', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Real Estate</label>
                          <span className="text-sm text-gray-500">{customAllocation.realEstate}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={customAllocation.realEstate}
                          onChange={(e) => handleCustomAllocationChange('realEstate', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Portfolio Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
                  Portfolio Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-semibold text-gray-900">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Expected Returns</span>
                    <span className="font-semibold text-green-600">
                      {showCustom ? customExpectedReturns.toFixed(2) : expectedReturns.toFixed(2)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Risk Level</span>
                    <span className={`font-semibold ${riskLevel.color}`}>{riskLevel.level}</span>
                  </div>
                </div>
              </div>

              {/* Asset Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Asset Breakdown</h2>
                
                {!showCustom ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-900">Equity</span>
                      <div className="text-right">
                        <div className="font-semibold text-blue-900">{allocation.equity}%</div>
                        <div className="text-sm text-blue-700">₹{getAssetAmount(allocation.equity).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-green-900">Debt</span>
                      <div className="text-right">
                        <div className="font-semibold text-green-900">{allocation.debt}%</div>
                        <div className="text-sm text-green-700">₹{getAssetAmount(allocation.debt).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-yellow-900">Gold</span>
                      <div className="text-right">
                        <div className="font-semibold text-yellow-900">{allocation.gold}%</div>
                        <div className="text-sm text-yellow-700">₹{getAssetAmount(allocation.gold).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(customAllocation).map(([asset, percentage]) => (
                      <div key={asset} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 capitalize">{asset.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{percentage}%</div>
                          <div className="text-sm text-gray-600">₹{getCustomAssetAmount(percentage).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-orange-600" />
                  Recommendations
                </h2>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Diversification:</strong> Your current allocation provides good diversification across asset classes.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Rebalancing:</strong> Review and rebalance your portfolio every 6-12 months.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Tax Optimization:</strong> Consider tax-saving investments like ELSS for equity allocation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Asset Allocation Guide</h2>
            
            <div className="prose max-w-none">
              <h3>What is Asset Allocation?</h3>
              <p>
                Asset allocation is the process of dividing your investment portfolio among different asset categories, 
                such as stocks, bonds, and cash. The goal is to balance risk and reward by diversifying your investments.
              </p>
              
              <h3>Key Asset Classes</h3>
              <ul>
                <li><strong>Equity:</strong> Stocks and equity mutual funds that offer higher growth potential but with higher risk</li>
                <li><strong>Debt:</strong> Bonds, fixed deposits, and debt mutual funds that provide stability and regular income</li>
                <li><strong>Gold:</strong> Precious metals that act as a hedge against inflation and currency fluctuations</li>
                <li><strong>Real Estate:</strong> Property investments that provide both income and capital appreciation</li>
              </ul>
              
              <h3>Asset Allocation Strategies</h3>
              <ul>
                <li><strong>Age-based:</strong> Subtract your age from 100 to determine equity allocation</li>
                <li><strong>Risk-based:</strong> Allocate based on your risk tolerance and investment goals</li>
                <li><strong>Goal-based:</strong> Different allocations for different financial goals</li>
                <li><strong>Market-based:</strong> Adjust allocation based on market conditions and valuations</li>
              </ul>
              
              <h3>Benefits of Proper Asset Allocation</h3>
              <ul>
                <li>Reduces overall portfolio risk through diversification</li>
                <li>Helps achieve consistent returns over time</li>
                <li>Provides protection against market volatility</li>
                <li>Aligns investments with your risk tolerance and goals</li>
                <li>Enables systematic rebalancing for optimal performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;
