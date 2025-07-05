import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, PieChart, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

type RiskProfile = 'conservative' | 'moderate' | 'balanced' | 'growth' | 'aggressive';

interface AssetAllocation {
  equity: number;
  debt: number;
  gold: number;
  cash: number;
  alternative: number;
}

interface AssetClass {
  name: string;
  key: keyof AssetAllocation;
  description: string;
  returnRange: string;
  riskLevel: string;
  color: string;
}

export const AssetAllocationPlanner: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000000);
  const [age, setAge] = useState<number>(35);
  const [timeHorizon, setTimeHorizon] = useState<number>(10);
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('balanced');
  const [allocation, setAllocation] = useState<AssetAllocation>({
    equity: 60,
    debt: 30,
    gold: 5,
    cash: 3,
    alternative: 2
  });
  const [customAllocation, setCustomAllocation] = useState<boolean>(false);
  const [expectedReturn, setExpectedReturn] = useState<number>(0);
  const [riskLevel, setRiskLevel] = useState<number>(0);
  
  // Asset class information
  const assetClasses: AssetClass[] = [
    {
      name: 'Equity',
      key: 'equity',
      description: 'Stocks, equity mutual funds, ETFs',
      returnRange: '10-15%',
      riskLevel: 'High',
      color: '#3b82f6' // blue
    },
    {
      name: 'Debt',
      key: 'debt',
      description: 'Bonds, debt mutual funds, fixed deposits',
      returnRange: '6-8%',
      riskLevel: 'Low to Medium',
      color: '#f59e0b' // amber
    },
    {
      name: 'Gold',
      key: 'gold',
      description: 'Physical gold, gold ETFs, sovereign gold bonds',
      returnRange: '7-9%',
      riskLevel: 'Medium',
      color: '#eab308' // yellow
    },
    {
      name: 'Cash',
      key: 'cash',
      description: 'Savings accounts, liquid funds, money market',
      returnRange: '3-5%',
      riskLevel: 'Very Low',
      color: '#22c55e' // green
    },
    {
      name: 'Alternative',
      key: 'alternative',
      description: 'Real estate, commodities, private equity',
      returnRange: '8-12%',
      riskLevel: 'High',
      color: '#a855f7' // purple
    }
  ];
  
  // Predefined allocations based on risk profile
  const riskProfileAllocations: Record<RiskProfile, AssetAllocation> = {
    conservative: { equity: 20, debt: 60, gold: 10, cash: 8, alternative: 2 },
    moderate: { equity: 40, debt: 40, gold: 10, cash: 5, alternative: 5 },
    balanced: { equity: 60, debt: 30, gold: 5, cash: 3, alternative: 2 },
    growth: { equity: 70, debt: 20, gold: 5, cash: 2, alternative: 3 },
    aggressive: { equity: 80, debt: 10, gold: 5, cash: 0, alternative: 5 }
  };
  
  // Update allocation based on risk profile
  useEffect(() => {
    if (!customAllocation) {
      setAllocation(riskProfileAllocations[riskProfile]);
    }
  }, [riskProfile, customAllocation]);
  
  // Calculate expected return and risk level
  useEffect(() => {
    // Simplified expected return calculation
    const returns = {
      equity: 12,
      debt: 7,
      gold: 8,
      cash: 4,
      alternative: 10
    };
    
    let weightedReturn = 0;
    let riskScore = 0;
    
    // Calculate weighted return
    Object.entries(allocation).forEach(([key, value]) => {
      const assetKey = key as keyof AssetAllocation;
      weightedReturn += (value / 100) * returns[assetKey];
    });
    
    // Calculate risk score (simplified)
    riskScore = allocation.equity * 0.8 + allocation.alternative * 0.15 + allocation.gold * 0.05;
    
    setExpectedReturn(weightedReturn);
    setRiskLevel(riskScore);
  }, [allocation]);
  
  // Handle allocation change
  const handleAllocationChange = (asset: keyof AssetAllocation, value: number) => {
    if (!customAllocation) {
      setCustomAllocation(true);
    }
    
    // Calculate total of other allocations
    const otherTotal = Object.entries(allocation)
      .filter(([key]) => key !== asset)
      .reduce((sum, [_, value]) => sum + value, 0);
    
    // Ensure total doesn't exceed 100%
    if (value + otherTotal > 100) {
      value = 100 - otherTotal;
    }
    
    setAllocation({
      ...allocation,
      [asset]: value
    });
  };
  
  // Reset to predefined allocation
  const resetAllocation = () => {
    setCustomAllocation(false);
    setAllocation(riskProfileAllocations[riskProfile]);
  };
  
  // Calculate asset amounts
  const calculateAssetAmounts = () => {
    return Object.entries(allocation).map(([key, percentage]) => {
      const assetKey = key as keyof AssetAllocation;
      const assetClass = assetClasses.find(ac => ac.key === assetKey);
      return {
        name: assetClass?.name || key,
        value: (percentage / 100) * investmentAmount,
        color: assetClass?.color || '#000000'
      };
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Investment Profile
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-amount" className="text-sm font-medium text-neutral-700">
                Investment Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(investmentAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="investment-amount"
              min="10000" 
              max="10000000" 
              step="10000" 
              value={investmentAmount} 
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="age" className="text-sm font-medium text-neutral-700">
                Your Age
              </label>
              <span className="text-sm text-neutral-500">
                {age} years
              </span>
            </div>
            <input 
              type="range" 
              id="age"
              min="18" 
              max="80" 
              value={age} 
              onChange={(e) => setAge(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="time-horizon" className="text-sm font-medium text-neutral-700">
                Investment Time Horizon
              </label>
              <span className="text-sm text-neutral-500">
                {timeHorizon} years
              </span>
            </div>
            <input 
              type="range" 
              id="time-horizon"
              min="1" 
              max="30" 
              value={timeHorizon} 
              onChange={(e) => setTimeHorizon(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Risk Profile
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['conservative', 'moderate', 'balanced', 'growth', 'aggressive'] as RiskProfile[]).map((profile) => (
                <button
                  key={profile}
                  onClick={() => setRiskProfile(profile)}
                  className={`px-2 py-3 rounded-lg text-xs font-medium ${
                    riskProfile === profile
                      ? 'bg-[--primary-100] text-[--primary-800] border-2 border-[--primary-300]'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                  }`}
                >
                  {profile.charAt(0).toUpperCase() + profile.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[--primary-900]">Asset Allocation</h3>
            {customAllocation && (
              <button
                onClick={resetAllocation}
                className="text-xs text-[--primary-600] hover:text-[--primary-800] font-medium"
              >
                Reset to Recommended
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            {assetClasses.map((assetClass) => (
              <div key={assetClass.key}>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-neutral-700 flex items-center">
                    <span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: assetClass.color }}></span>
                    {assetClass.name}
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-500">
                      {allocation[assetClass.key]}%
                    </span>
                    <span className="text-xs text-neutral-400">
                      {formatCurrency((allocation[assetClass.key] / 100) * investmentAmount)}
                    </span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={allocation[assetClass.key]} 
                  onChange={(e) => handleAllocationChange(assetClass.key, Number(e.target.value))}
                  className="slider"
                  style={{ 
                    background: `linear-gradient(to right, ${assetClass.color} 0%, ${assetClass.color} ${allocation[assetClass.key]}%, #e5e7eb ${allocation[assetClass.key]}%, #e5e7eb 100%)` 
                  }}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-neutral-500">Expected Annual Return</p>
                <p className="text-lg font-semibold text-[--success-600]">{expectedReturn.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Risk Level</p>
                <div className="flex items-center">
                  <div className="w-24 bg-neutral-200 rounded-full h-2 mr-2">
                    <div 
                      className={`h-full rounded-full ${
                        riskLevel < 30 ? 'bg-[--success-500]' : 
                        riskLevel < 60 ? 'bg-[--warning-500]' : 
                        'bg-[--error-500]'
                      }`}
                      style={{ width: `${riskLevel}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-neutral-600">
                    {riskLevel < 30 ? 'Low' : riskLevel < 60 ? 'Medium' : 'High'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Allocation Breakdown
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={calculateAssetAmounts()}
              centerText={`${formatCurrency(investmentAmount)}\nTotal`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
            Asset Class Information
          </h2>
          
          <div className="space-y-4">
            {assetClasses.map((assetClass) => (
              <div key={assetClass.key} className="p-4 bg-white rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="h-4 w-4 rounded-full mr-2" style={{ backgroundColor: assetClass.color }}></span>
                  <h3 className="text-lg font-medium text-neutral-900">{assetClass.name}</h3>
                </div>
                <p className="text-sm text-neutral-600 mb-2">{assetClass.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Expected Returns:</span>
                    <span className="font-medium text-neutral-900">{assetClass.returnRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Risk Level:</span>
                    <span className="font-medium text-neutral-900">{assetClass.riskLevel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Personalized Recommendations</h2>
          
          <div className="space-y-4">
            {age < 30 && timeHorizon > 15 && (
              <div className="p-4 bg-[--success-50] rounded-lg border border-[--success-200]">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-[--success-600] mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-[--success-800] mb-1">Young Investor Advantage</h3>
                    <p className="text-sm text-[--success-700]">
                      With your young age and long time horizon, you can afford to take more risk. Consider increasing your equity allocation to capitalize on long-term growth potential.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {age > 50 && allocation.equity > 60 && (
              <div className="p-4 bg-[--warning-50] rounded-lg border border-[--warning-200]">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-[--warning-600] mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-[--warning-800] mb-1">Consider Reducing Risk</h3>
                    <p className="text-sm text-[--warning-700]">
                      As you approach retirement, consider gradually reducing your equity exposure to protect your capital. A common rule of thumb is to subtract your age from 100 to get your equity allocation percentage.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {timeHorizon < 5 && allocation.equity > 50 && (
              <div className="p-4 bg-[--warning-50] rounded-lg border border-[--warning-200]">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-[--warning-600] mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-[--warning-800] mb-1">Short Time Horizon Risk</h3>
                    <p className="text-sm text-[--warning-700]">
                      With a time horizon under 5 years, your high equity allocation may expose you to market volatility. Consider increasing your allocation to debt and cash for more stability.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {allocation.cash < 5 && (
              <div className="p-4 bg-[--accent-50] rounded-lg border border-[--accent-200]">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-[--accent-600] mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-[--accent-800] mb-1">Emergency Fund Reminder</h3>
                    <p className="text-sm text-[--accent-700]">
                      Your cash allocation is low. Remember to maintain an emergency fund of 3-6 months of expenses in liquid assets outside of your investment portfolio.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-[--primary-50] rounded-lg border border-[--primary-200]">
              <h3 className="font-medium text-[--primary-800] mb-2">Suggested Investment Options</h3>
              <div className="space-y-3">
                {allocation.equity > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[--primary-700]">Equity ({allocation.equity}%)</h4>
                    <p className="text-xs text-[--primary-600]">
                      Nifty 50 Index Funds, Flexicap Funds, Blue Chip Funds
                      {allocation.equity > 30 && ", Mid & Small Cap Funds"}
                      {allocation.equity > 50 && ", Sectoral/Thematic Funds"}
                    </p>
                  </div>
                )}
                
                {allocation.debt > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[--primary-700]">Debt ({allocation.debt}%)</h4>
                    <p className="text-xs text-[--primary-600]">
                      Government Securities, Corporate Bond Funds, Banking & PSU Debt Funds
                      {timeHorizon < 3 && ", Short Duration Funds"}
                      {timeHorizon > 5 && ", Long Duration Funds"}
                    </p>
                  </div>
                )}
                
                {allocation.gold > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[--primary-700]">Gold ({allocation.gold}%)</h4>
                    <p className="text-xs text-[--primary-600]">
                      Sovereign Gold Bonds, Gold ETFs, Gold Mutual Funds
                    </p>
                  </div>
                )}
                
                {allocation.cash > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[--primary-700]">Cash ({allocation.cash}%)</h4>
                    <p className="text-xs text-[--primary-600]">
                      Liquid Funds, Overnight Funds, Savings Account, Fixed Deposits
                    </p>
                  </div>
                )}
                
                {allocation.alternative > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-[--primary-700]">Alternative ({allocation.alternative}%)</h4>
                    <p className="text-xs text-[--primary-600]">
                      REITs, InvITs, P2P Lending, Alternative Investment Funds
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocationPlanner;