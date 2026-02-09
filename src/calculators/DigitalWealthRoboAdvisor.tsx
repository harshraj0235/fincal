import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, PieChart, TrendingUp, ArrowRight, AlertTriangle, Info, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  timeHorizon: number;
  priority: 'High' | 'Medium' | 'Low';
}

interface RiskProfile {
  type: string;
  description: string;
  equityAllocation: number;
  debtAllocation: number;
  goldAllocation: number;
  alternativeAllocation: number;
}

export const DigitalWealthRoboAdvisor: React.FC = () => {
  // User inputs
  const [age, setAge] = useState<number>(30);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(60000);
  const [existingInvestments, setExistingInvestments] = useState<number>(500000);
  const [existingLoans, setExistingLoans] = useState<number>(2000000);
  const [riskTolerance, setRiskTolerance] = useState<number>(3);
  const [investmentHorizon, setInvestmentHorizon] = useState<number>(10);
  
  // Financial goals
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Retirement',
      targetAmount: 5000000,
      timeHorizon: 25,
      priority: 'High'
    },
    {
      id: '2',
      name: 'Home Purchase',
      targetAmount: 3000000,
      timeHorizon: 5,
      priority: 'Medium'
    }
  ]);
  
  // Calculated values
  const [monthlyInvestmentCapacity, setMonthlyInvestmentCapacity] = useState<number>(0);
  const [recommendedAllocation, setRecommendedAllocation] = useState<{
    equity: number;
    debt: number;
    gold: number;
    alternative: number;
  }>({
    equity: 0,
    debt: 0,
    gold: 0,
    alternative: 0
  });
  const [recommendedInvestments, setRecommendedInvestments] = useState<{
    name: string;
    category: string;
    allocation: number;
    amount: number;
  }[]>([]);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [showAdvancedInsights, setShowAdvancedInsights] = useState<boolean>(false);
  
  // Calculate investment capacity and recommendations
  useEffect(() => {
    // Calculate monthly investment capacity
    const capacity = monthlyIncome - monthlyExpenses;
    setMonthlyInvestmentCapacity(capacity * 0.8); // Assuming 80% of surplus can be invested
    
    // Determine risk profile based on age, risk tolerance, and investment horizon
    let equityAllocation = 0;
    let debtAllocation = 0;
    let goldAllocation = 0;
    let alternativeAllocation = 0;
    
    // Base allocation on risk tolerance (1-5 scale)
    switch (riskTolerance) {
      case 1: // Very Conservative
        equityAllocation = 20;
        debtAllocation = 60;
        goldAllocation = 15;
        alternativeAllocation = 5;
        break;
      case 2: // Conservative
        equityAllocation = 35;
        debtAllocation = 50;
        goldAllocation = 10;
        alternativeAllocation = 5;
        break;
      case 3: // Moderate
        equityAllocation = 50;
        debtAllocation = 35;
        goldAllocation = 10;
        alternativeAllocation = 5;
        break;
      case 4: // Aggressive
        equityAllocation = 65;
        debtAllocation = 25;
        goldAllocation = 5;
        alternativeAllocation = 5;
        break;
      case 5: // Very Aggressive
        equityAllocation = 80;
        debtAllocation = 10;
        goldAllocation = 5;
        alternativeAllocation = 5;
        break;
    }
    
    // Adjust based on age (younger = more equity)
    if (age < 30) {
      equityAllocation += 10;
      debtAllocation -= 10;
    } else if (age > 50) {
      equityAllocation -= 10;
      debtAllocation += 10;
    }
    
    // Adjust based on investment horizon (longer = more equity)
    if (investmentHorizon > 15) {
      equityAllocation += 5;
      debtAllocation -= 5;
    } else if (investmentHorizon < 5) {
      equityAllocation -= 15;
      debtAllocation += 15;
    }
    
    // Ensure allocations are within reasonable bounds
    equityAllocation = Math.max(10, Math.min(90, equityAllocation));
    debtAllocation = Math.max(5, Math.min(80, debtAllocation));
    goldAllocation = Math.max(0, Math.min(20, goldAllocation));
    alternativeAllocation = Math.max(0, Math.min(15, alternativeAllocation));
    
    // Normalize to ensure total is 100%
    const total = equityAllocation + debtAllocation + goldAllocation + alternativeAllocation;
    equityAllocation = Math.round((equityAllocation / total) * 100);
    debtAllocation = Math.round((debtAllocation / total) * 100);
    goldAllocation = Math.round((goldAllocation / total) * 100);
    alternativeAllocation = 100 - equityAllocation - debtAllocation - goldAllocation;
    
    setRecommendedAllocation({
      equity: equityAllocation,
      debt: debtAllocation,
      gold: goldAllocation,
      alternative: alternativeAllocation
    });
    
    // Set risk profile
    let profileType = '';
    let profileDescription = '';
    
    if (equityAllocation < 30) {
      profileType = 'Conservative';
      profileDescription = 'You prioritize capital preservation over growth. This portfolio focuses on stability with some inflation protection.';
    } else if (equityAllocation < 45) {
      profileType = 'Moderately Conservative';
      profileDescription = 'You seek primarily to preserve capital but are willing to accept a small amount of risk for potential growth.';
    } else if (equityAllocation < 60) {
      profileType = 'Moderate';
      profileDescription = 'You aim for a balance between growth and capital preservation. You can tolerate some market fluctuations for long-term growth potential.';
    } else if (equityAllocation < 75) {
      profileType = 'Moderately Aggressive';
      profileDescription = 'You prioritize growth over capital preservation. You can tolerate significant market fluctuations for higher potential returns.';
    } else {
      profileType = 'Aggressive';
      profileDescription = 'You seek maximum growth and are willing to accept substantial risk. You can tolerate significant market volatility in pursuit of higher returns.';
    }
    
    setRiskProfile({
      type: profileType,
      description: profileDescription,
      equityAllocation,
      debtAllocation,
      goldAllocation,
      alternativeAllocation
    });
    
    // Generate recommended investments
    const monthlyAmount = monthlyInvestmentCapacity;
    
    const recommendations = [
      // Equity recommendations
      {
        name: 'Nifty 50 Index Fund',
        category: 'Equity - Index',
        allocation: Math.round(equityAllocation * 0.3),
        amount: Math.round(monthlyAmount * equityAllocation * 0.3 / 100)
      },
      {
        name: 'Flexi Cap Fund',
        category: 'Equity - Diversified',
        allocation: Math.round(equityAllocation * 0.3),
        amount: Math.round(monthlyAmount * equityAllocation * 0.3 / 100)
      },
      {
        name: 'Mid & Small Cap Fund',
        category: 'Equity - Mid/Small Cap',
        allocation: Math.round(equityAllocation * 0.2),
        amount: Math.round(monthlyAmount * equityAllocation * 0.2 / 100)
      },
      {
        name: 'International Equity Fund',
        category: 'Equity - International',
        allocation: Math.round(equityAllocation * 0.2),
        amount: Math.round(monthlyAmount * equityAllocation * 0.2 / 100)
      },
      
      // Debt recommendations
      {
        name: 'Corporate Bond Fund',
        category: 'Debt - Corporate',
        allocation: Math.round(debtAllocation * 0.4),
        amount: Math.round(monthlyAmount * debtAllocation * 0.4 / 100)
      },
      {
        name: 'Banking & PSU Debt Fund',
        category: 'Debt - Banking & PSU',
        allocation: Math.round(debtAllocation * 0.3),
        amount: Math.round(monthlyAmount * debtAllocation * 0.3 / 100)
      },
      {
        name: 'Short Duration Fund',
        category: 'Debt - Short Duration',
        allocation: Math.round(debtAllocation * 0.3),
        amount: Math.round(monthlyAmount * debtAllocation * 0.3 / 100)
      },
      
      // Gold recommendation
      {
        name: 'Gold ETF / Gold Fund',
        category: 'Gold',
        allocation: goldAllocation,
        amount: Math.round(monthlyAmount * goldAllocation / 100)
      },
      
      // Alternative recommendations
      {
        name: 'REITs / InvITs',
        category: 'Alternative - Real Estate',
        allocation: Math.round(alternativeAllocation * 0.6),
        amount: Math.round(monthlyAmount * alternativeAllocation * 0.6 / 100)
      },
      {
        name: 'P2P Lending',
        category: 'Alternative - Lending',
        allocation: Math.round(alternativeAllocation * 0.4),
        amount: Math.round(monthlyAmount * alternativeAllocation * 0.4 / 100)
      }
    ];
    
    setRecommendedInvestments(recommendations);
    
  }, [age, monthlyIncome, monthlyExpenses, existingInvestments, existingLoans, riskTolerance, investmentHorizon]);
  
  // Add a new goal
  const addGoal = () => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      name: 'New Goal',
      targetAmount: 1000000,
      timeHorizon: 10,
      priority: 'Medium'
    };
    
    setGoals([...goals, newGoal]);
  };
  
  // Update a goal
  const updateGoal = (id: string, field: keyof Goal, value: any) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };
  
  // Remove a goal
  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Digital Wealth Robo-Advisor</h2>
        <p className="text-neutral-600">
          Get personalized investment recommendations based on your financial situation, goals, and risk tolerance. Our AI-powered robo-advisor analyzes your profile to create a tailored investment strategy.
        </p>
      </div>

      {/* Financial Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Your Financial Profile</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-neutral-700 mb-2">
                Your Age
              </label>
              <input
                type="number"
                id="age"
                min="18"
                max="80"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="monthly-income" className="block text-sm font-medium text-neutral-700 mb-2">
                Monthly Income (₹)
              </label>
              <input
                type="number"
                id="monthly-income"
                min="10000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="monthly-expenses" className="block text-sm font-medium text-neutral-700 mb-2">
                Monthly Expenses (₹)
              </label>
              <input
                type="number"
                id="monthly-expenses"
                min="0"
                max={monthlyIncome}
                step="5000"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="input w-full"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="existing-investments" className="block text-sm font-medium text-neutral-700 mb-2">
                Existing Investments (₹)
              </label>
              <input
                type="number"
                id="existing-investments"
                min="0"
                step="10000"
                value={existingInvestments}
                onChange={(e) => setExistingInvestments(Number(e.target.value))}
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="existing-loans" className="block text-sm font-medium text-neutral-700 mb-2">
                Existing Loans (₹)
              </label>
              <input
                type="number"
                id="existing-loans"
                min="0"
                step="10000"
                value={existingLoans}
                onChange={(e) => setExistingLoans(Number(e.target.value))}
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="investment-horizon" className="block text-sm font-medium text-neutral-700 mb-2">
                Investment Horizon (Years)
              </label>
              <input
                type="number"
                id="investment-horizon"
                min="1"
                max="40"
                value={investmentHorizon}
                onChange={(e) => setInvestmentHorizon(Number(e.target.value))}
                className="input w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Risk Tolerance
          </label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setRiskTolerance(level)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                  riskTolerance === level
                    ? 'bg-[--primary-600] text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {level === 1 && 'Very Conservative'}
                {level === 2 && 'Conservative'}
                {level === 3 && 'Moderate'}
                {level === 4 && 'Aggressive'}
                {level === 5 && 'Very Aggressive'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Goals Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Your Financial Goals</h3>
          <button
            onClick={addGoal}
            className="px-3 py-1 bg-[--primary-100] text-[--primary-700] rounded-lg text-sm font-medium hover:bg-[--primary-200]"
          >
            Add Goal
          </button>
        </div>
        
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <input
                  type="text"
                  value={goal.name}
                  onChange={(e) => updateGoal(goal.id, 'name', e.target.value)}
                  className="text-lg font-medium bg-transparent border-none p-0 focus:ring-0"
                  placeholder="Goal Name"
                />
                <button
                  onClick={() => removeGoal(goal.id)}
                  className="text-neutral-400 hover:text-[--error-600]"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">
                    Target Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={goal.targetAmount}
                    onChange={(e) => updateGoal(goal.id, 'targetAmount', Number(e.target.value))}
                    className="input text-sm py-1.5"
                    min="10000"
                    step="10000"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">
                    Time Horizon (Years)
                  </label>
                  <input
                    type="number"
                    value={goal.timeHorizon}
                    onChange={(e) => updateGoal(goal.id, 'timeHorizon', Number(e.target.value))}
                    className="input text-sm py-1.5"
                    min="1"
                    max="40"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">
                    Priority
                  </label>
                  <select
                    value={goal.priority}
                    onChange={(e) => updateGoal(goal.id, 'priority', e.target.value as 'High' | 'Medium' | 'Low')}
                    className="input text-sm py-1.5"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>Monthly Investment Required</span>
                  <span>{formatCurrency(goal.targetAmount / (goal.timeHorizon * 12))}</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-1.5">
                  <div 
                    className={`h-full rounded-full ${
                      goal.priority === 'High' ? 'bg-[--error-500]' : 
                      goal.priority === 'Medium' ? 'bg-[--warning-500]' : 
                      'bg-[--success-500]'
                    }`}
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
          
          {goals.length === 0 && (
            <div className="text-center py-8 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500 mb-2">No financial goals added yet</p>
              <button
                onClick={addGoal}
                className="px-4 py-2 bg-[--primary-600] text-white rounded-lg text-sm font-medium hover:bg-[--primary-700]"
              >
                Add Your First Goal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Your Personalized Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-[--primary-50] rounded-lg">
            <p className="text-sm text-neutral-500 mb-1">Monthly Investment Capacity</p>
            <p className="text-2xl font-bold text-[--primary-800]">{formatCurrency(monthlyInvestmentCapacity)}</p>
            <p className="text-xs text-[--primary-600] mt-1">
              {monthlyInvestmentCapacity > 0 
                ? 'Available for investments after expenses' 
                : 'Your expenses exceed your income'}
            </p>
          </div>
          
          <div className="p-4 bg-[--primary-50] rounded-lg">
            <p className="text-sm text-neutral-500 mb-1">Risk Profile</p>
            <p className="text-2xl font-bold text-[--primary-800]">{riskProfile?.type || 'Calculating...'}</p>
            <p className="text-xs text-[--primary-600] mt-1">Based on your age, goals, and risk tolerance</p>
          </div>
          
          <div className="p-4 bg-[--primary-50] rounded-lg">
            <p className="text-sm text-neutral-500 mb-1">Debt-to-Income Ratio</p>
            <p className="text-2xl font-bold text-[--primary-800]">
              {((existingLoans / 12) / monthlyIncome * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-[--primary-600] mt-1">
              {((existingLoans / 12) / monthlyIncome) < 0.36 
                ? 'Healthy ratio (below 36%)' 
                : 'Consider reducing debt before investing more'}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h4 className="font-medium text-neutral-900 mb-3">Recommended Asset Allocation</h4>
            <div className="h-64">
              <ResultChart 
                data={[
                  { name: 'Equity', value: recommendedAllocation.equity, color: '#3b82f6' },
                  { name: 'Debt', value: recommendedAllocation.debt, color: '#f59e0b' },
                  { name: 'Gold', value: recommendedAllocation.gold, color: '#eab308' },
                  { name: 'Alternative', value: recommendedAllocation.alternative, color: '#a855f7' }
                ]}
                centerText={`${formatCurrency(monthlyInvestmentCapacity)}\nMonthly`}
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-neutral-900 mb-3">Recommended Investments</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {recommendedInvestments.map((investment, index) => (
                <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-900">{investment.name}</p>
                      <p className="text-xs text-neutral-500">{investment.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-neutral-900">{formatCurrency(investment.amount)}</p>
                      <p className="text-xs text-neutral-500">{investment.allocation}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-[--accent-50] rounded-lg border border-[--accent-200] mb-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-[--accent-700] mt-0.5 mr-3" />
            <div>
              <h4 className="font-medium text-[--accent-800] mb-1">Investment Strategy</h4>
              <p className="text-sm text-[--accent-700]">
                {riskProfile?.description || 'Based on your profile, we recommend a balanced approach to investing that aligns with your goals and risk tolerance.'}
              </p>
              <p className="text-sm text-[--accent-700] mt-2">
                We recommend a systematic investment plan (SIP) approach, investing {formatCurrency(monthlyInvestmentCapacity)} monthly across the recommended asset classes. This strategy helps you average out market volatility while building wealth consistently.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <button
            onClick={() => setShowAdvancedInsights(!showAdvancedInsights)}
            className="flex items-center justify-between w-full p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100"
          >
            <span className="font-medium text-neutral-900">Advanced Insights & Recommendations</span>
            {showAdvancedInsights ? <ChevronUp className="h-5 w-5 text-neutral-500" /> : <ChevronDown className="h-5 w-5 text-neutral-500" />}
          </button>
          
          {showAdvancedInsights && (
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h5 className="font-medium text-neutral-900 mb-2">Goal-Based Investment Strategy</h5>
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-3 bg-white rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className={`h-3 w-3 rounded-full mr-2 ${
                            goal.priority === 'High' ? 'bg-[--error-500]' : 
                            goal.priority === 'Medium' ? 'bg-[--warning-500]' : 
                            'bg-[--success-500]'
                          }`}></span>
                          <p className="font-medium text-neutral-900">{goal.name}</p>
                        </div>
                        <p className="text-sm text-neutral-600">{goal.timeHorizon} years</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-neutral-500">Target Amount</p>
                          <p className="font-medium text-neutral-900">{formatCurrency(goal.targetAmount)}</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Monthly Investment</p>
                          <p className="font-medium text-neutral-900">
                            {formatCurrency(goal.targetAmount / (goal.timeHorizon * 12))}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-xs text-neutral-500 mb-1">Recommended Strategy</p>
                        <p className="text-xs text-neutral-700">
                          {goal.timeHorizon < 3 
                            ? 'Short-term goal: Focus on debt funds and liquid investments' 
                            : goal.timeHorizon < 7 
                            ? 'Medium-term goal: Balanced approach with moderate equity exposure' 
                            : 'Long-term goal: Higher equity allocation for better growth potential'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h5 className="font-medium text-neutral-900 mb-2">Tax Optimization Strategy</h5>
                <ul className="list-disc list-inside text-sm text-neutral-600 space-y-2">
                  <li>Maximize Section 80C investments (₹1.5 lakh) through ELSS funds for equity exposure</li>
                  <li>Consider PPF for debt allocation with tax-free returns</li>
                  <li>Utilize NPS additional tax benefit under Section 80CCD(1B) for retirement planning</li>
                  <li>For non-tax saving investments, consider growth option in mutual funds for better tax efficiency</li>
                  <li>Hold equity investments for more than 1 year to benefit from LTCG taxation with ₹1 lakh exemption</li>
                </ul>
              </div>
              
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h5 className="font-medium text-neutral-900 mb-2">Debt Management</h5>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">Current Debt-to-Income Ratio</span>
                    <span className={`font-medium ${
                      ((existingLoans / 12) / monthlyIncome) < 0.36 
                        ? 'text-[--success-600]' 
                        : ((existingLoans / 12) / monthlyIncome) < 0.42 
                        ? 'text-[--warning-600]' 
                        : 'text-[--error-600]'
                    }`}>
                      {((existingLoans / 12) / monthlyIncome * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full ${
                        ((existingLoans / 12) / monthlyIncome) < 0.36 
                          ? 'bg-[--success-500]' 
                          : ((existingLoans / 12) / monthlyIncome) < 0.42 
                          ? 'bg-[--warning-500]' 
                          : 'bg-[--error-500]'
                      }`}
                      style={{ width: `${Math.min(100, ((existingLoans / 12) / monthlyIncome) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {((existingLoans / 12) / monthlyIncome) > 0.36 && (
                  <div className="p-3 bg-[--warning-50] rounded-lg text-sm text-[--warning-700]">
                    <p className="font-medium text-[--warning-800] mb-1">Recommendation</p>
                    <p>Consider allocating {formatCurrency(monthlyInvestmentCapacity * 0.3)} monthly towards debt repayment before increasing investments.</p>
                  </div>
                )}
                
                {((existingLoans / 12) / monthlyIncome) <= 0.36 && (
                  <div className="p-3 bg-[--success-50] rounded-lg text-sm text-[--success-700]">
                    <p className="font-medium text-[--success-800] mb-1">Healthy Debt Level</p>
                    <p>Your debt-to-income ratio is within healthy limits. Continue with your current debt repayment plan while investing as recommended.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-[--warning-50] rounded-lg border border-[--warning-200]">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-[--warning-600] mt-0.5 mr-3" />
            <div>
              <h4 className="font-medium text-[--warning-800] mb-1">Important Disclaimer</h4>
              <p className="text-sm text-[--warning-700]">
                This robo-advisory tool provides general guidance based on the information you've provided. It is not a substitute for professional financial advice. Investment markets are subject to risks, and past performance is not indicative of future returns. Consider consulting with a financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Plan Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Your Action Plan</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-4">
              1
            </div>
            <div>
              <h4 className="font-medium text-neutral-900 mb-1">Set Up Emergency Fund</h4>
              <p className="text-sm text-neutral-600 mb-2">
                Before investing, ensure you have 3-6 months of expenses ({formatCurrency(monthlyExpenses * 3)} - {formatCurrency(monthlyExpenses * 6)}) saved in a liquid fund or high-yield savings account.
              </p>
              <div className="flex items-center text-xs text-[--primary-600]">
                <Check className="h-4 w-4 mr-1" />
                <span>Essential first step</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-4">
              2
            </div>
            <div>
              <h4 className="font-medium text-neutral-900 mb-1">Start Systematic Investment Plan (SIP)</h4>
              <p className="text-sm text-neutral-600 mb-2">
                Set up monthly SIPs of {formatCurrency(monthlyInvestmentCapacity)} as per the recommended allocation. Start with the core funds first and gradually add satellite investments.
              </p>
              <a 
                href="#" 
                className="text-xs text-[--primary-600] font-medium flex items-center"
              >
                View recommended funds
                <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-4">
              3
            </div>
            <div>
              <h4 className="font-medium text-neutral-900 mb-1">Optimize for Tax Efficiency</h4>
              <p className="text-sm text-neutral-600 mb-2">
                Allocate {formatCurrency(Math.min(150000, monthlyInvestmentCapacity * 2))} annually to tax-saving investments like ELSS funds to maximize Section 80C benefits.
              </p>
              <a 
                href="/calculators/tax-saving-investment-calculator" 
                className="text-xs text-[--primary-600] font-medium flex items-center"
              >
                Tax-saving calculator
                <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center mr-4">
              4
            </div>
            <div>
              <h4 className="font-medium text-neutral-900 mb-1">Regular Portfolio Review</h4>
              <p className="text-sm text-neutral-600 mb-2">
                Review your portfolio quarterly and rebalance annually to maintain your target asset allocation. Adjust your strategy as your goals or circumstances change.
              </p>
              <div className="flex items-center text-xs text-[--primary-600]">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Set calendar reminders for reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 border border-[--primary-100]">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Related Investment Tools</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/calculators/sip-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">SIP Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate returns on your systematic investment plans</p>
          </a>
          <a 
            href="/calculators/asset-allocation-planner" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Asset Allocation Planner</h4>
            <p className="text-xs text-[--primary-600]">Create a detailed investment plan based on your risk profile</p>
          </a>
          <a 
            href="/calculators/risk-appetite-assessment" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Risk Appetite Assessment</h4>
            <p className="text-xs text-[--primary-600]">Determine your investment risk tolerance</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DigitalWealthRoboAdvisor;