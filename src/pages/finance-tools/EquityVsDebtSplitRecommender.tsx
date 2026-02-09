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
  TrendingUpIcon
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface AssetAllocation {
  age: number;
  riskProfile: string;
  investmentHorizon: number;
  financialGoals: string[];
  currentIncome: number;
  emergencyFund: number;
  existingInvestments: {
    equity: number;
    debt: number;
    others: number;
  };
  recommendedAllocation: {
    equity: number;
    debt: number;
    others: number;
  };
  riskMetrics: {
    expectedReturn: number;
    volatility: number;
    maxDrawdown: number;
    sharpeRatio: number;
  };
  yearByYearProjection: {
    year: number;
    equityValue: number;
    debtValue: number;
    totalValue: number;
    rebalancingNeeded: boolean;
  }[];
  recommendations: string[];
}

const EquityVsDebtSplitRecommender: React.FC = () => {
  const [age, setAge] = useState('30');
  const [riskProfile, setRiskProfile] = useState('moderate');
  const [investmentHorizon, setInvestmentHorizon] = useState('15');
  const [financialGoals, setFinancialGoals] = useState<string[]>(['retirement']);
  const [currentIncome, setCurrentIncome] = useState('1000000');
  const [emergencyFund, setEmergencyFund] = useState('300000');
  const [existingEquity, setExistingEquity] = useState('500000');
  const [existingDebt, setExistingDebt] = useState('300000');
  const [existingOthers, setExistingOthers] = useState('200000');
  const [analysis, setAnalysis] = useState<AssetAllocation | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const availableGoals = [
    'retirement',
    'child_education',
    'house_purchase',
    'emergency_fund',
    'tax_saving',
    'wealth_creation',
    'income_generation'
  ];

  const calculateAssetAllocation = () => {
    const userAge = parseInt(age);
    const horizon = parseInt(investmentHorizon);
    const income = parseFloat(currentIncome);
    const emergency = parseFloat(emergencyFund);
    const equity = parseFloat(existingEquity);
    const debt = parseFloat(existingDebt);
    const others = parseFloat(existingOthers);
    
    // Base allocation based on age (100 - age rule)
    let baseEquityAllocation = 100 - userAge;
    
    // Adjust for risk profile
    const riskAdjustments = {
      conservative: -15,
      moderate: 0,
      aggressive: +15
    };
    baseEquityAllocation += riskAdjustments[riskProfile as keyof typeof riskAdjustments];
    
    // Adjust for investment horizon
    if (horizon > 20) baseEquityAllocation += 10;
    else if (horizon < 5) baseEquityAllocation -= 15;
    
    // Adjust for goals
    if (financialGoals.includes('retirement') && userAge < 40) baseEquityAllocation += 5;
    if (financialGoals.includes('child_education') && userAge < 35) baseEquityAllocation += 5;
    if (financialGoals.includes('emergency_fund')) baseEquityAllocation -= 10;
    if (financialGoals.includes('income_generation')) baseEquityAllocation -= 20;
    
    // Ensure allocation is within bounds
    baseEquityAllocation = Math.max(10, Math.min(80, baseEquityAllocation));
    
    const recommendedAllocation = {
      equity: baseEquityAllocation,
      debt: 70 - baseEquityAllocation,
      others: 20
    };
    
    // Normalize to 100%
    const total = recommendedAllocation.equity + recommendedAllocation.debt + recommendedAllocation.others;
    recommendedAllocation.equity = (recommendedAllocation.equity / total) * 100;
    recommendedAllocation.debt = (recommendedAllocation.debt / total) * 100;
    recommendedAllocation.others = (recommendedAllocation.others / total) * 100;
    
    // Calculate risk metrics
    const expectedReturn = (recommendedAllocation.equity * 12 + recommendedAllocation.debt * 7 + recommendedAllocation.others * 8) / 100;
    const volatility = (recommendedAllocation.equity * 15 + recommendedAllocation.debt * 3 + recommendedAllocation.others * 10) / 100;
    const maxDrawdown = (recommendedAllocation.equity * 25 + recommendedAllocation.debt * 2 + recommendedAllocation.others * 15) / 100;
    const sharpeRatio = (expectedReturn - 6) / volatility; // Assuming 6% risk-free rate
    
    // Generate year-by-year projection
    const yearByYearProjection = [];
    let currentEquity = equity;
    let currentDebt = debt;
    let currentOthers = others;
    
    for (let year = 1; year <= Math.min(horizon, 20); year++) {
      // Simulate returns
      const equityReturn = 12 + (Math.random() - 0.5) * 10; // 7-17% range
      const debtReturn = 7 + (Math.random() - 0.5) * 4; // 5-9% range
      const othersReturn = 8 + (Math.random() - 0.5) * 6; // 5-11% range
      
      currentEquity *= (1 + equityReturn / 100);
      currentDebt *= (1 + debtReturn / 100);
      currentOthers *= (1 + othersReturn / 100);
      
      const totalValue = currentEquity + currentDebt + currentOthers;
      const currentEquityAllocation = (currentEquity / totalValue) * 100;
      const rebalancingNeeded = Math.abs(currentEquityAllocation - recommendedAllocation.equity) > 5;
      
      yearByYearProjection.push({
        year,
        equityValue: currentEquity,
        debtValue: currentDebt,
        totalValue,
        rebalancingNeeded
      });
    }
    
    // Generate recommendations
    const recommendations = [];
    
    if (baseEquityAllocation > 70) {
      recommendations.push('High equity allocation suitable for long-term growth and higher risk tolerance.');
    } else if (baseEquityAllocation < 30) {
      recommendations.push('Conservative allocation focused on capital preservation and stability.');
    } else {
      recommendations.push('Balanced allocation providing growth potential with moderate risk.');
    }
    
    if (emergency < income * 0.3) {
      recommendations.push('Consider building emergency fund to 6-12 months of expenses.');
    }
    
    if (horizon < 5) {
      recommendations.push('Short investment horizon suggests more conservative allocation.');
    }
    
    if (financialGoals.includes('retirement') && userAge > 45) {
      recommendations.push('Approaching retirement - consider gradual shift to debt instruments.');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Your current allocation appears well-suited to your profile.');
    }
    
    setAnalysis({
      age: userAge,
      riskProfile,
      investmentHorizon: horizon,
      financialGoals,
      currentIncome: income,
      emergencyFund: emergency,
      existingInvestments: { equity, debt, others },
      recommendedAllocation,
      riskMetrics: {
        expectedReturn,
        volatility,
        maxDrawdown,
        sharpeRatio
      },
      yearByYearProjection,
      recommendations
    });
    setShowAnalysis(true);
  };

  const resetForm = () => {
    setAge('30');
    setRiskProfile('moderate');
    setInvestmentHorizon('15');
    setFinancialGoals(['retirement']);
    setCurrentIncome('1000000');
    setEmergencyFund('300000');
    setExistingEquity('500000');
    setExistingDebt('300000');
    setExistingOthers('200000');
    setAnalysis(null);
    setShowAnalysis(false);
  };

  const toggleGoal = (goal: string) => {
    setFinancialGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const getRiskColor = (allocation: number) => {
    if (allocation >= 60) return 'text-red-600';
    if (allocation >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskProfileColor = (profile: string) => {
    switch (profile) {
      case 'conservative': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'aggressive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Equity vs Debt Split Recommender - Asset Allocation Tool | MoneyCal"
        description="Get personalized equity vs debt allocation recommendations based on your age, risk profile, and financial goals. Optimize your portfolio for better returns and risk management."
        keywords="equity debt allocation, asset allocation, portfolio optimization, investment strategy, risk management"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-green-600 to-teal-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Equity vs Debt Split Recommender
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Get personalized equity vs debt allocation recommendations based on your age, 
                risk profile, and financial goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  Asset Allocation
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Risk Assessment
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Portfolio Optimization
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Input Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                Personal Profile & Goals
                </h2>
                
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Risk Profile</label>
                    <select
                      value={riskProfile}
                            onChange={(e) => setRiskProfile(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="conservative">Conservative</option>
                      <option value="moderate">Moderate</option>
                      <option value="aggressive">Aggressive</option>
                    </select>
                  </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Horizon (Years)</label>
                      <input
                        type="number"
                        value={investmentHorizon}
                      onChange={(e) => setInvestmentHorizon(e.target.value)}
                      placeholder="15"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹)</label>
                    <input
                      type="number"
                      value={currentIncome}
                      onChange={(e) => setCurrentIncome(e.target.value)}
                      placeholder="1000000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Fund (₹)</label>
                    <input
                      type="number"
                      value={emergencyFund}
                      onChange={(e) => setEmergencyFund(e.target.value)}
                      placeholder="300000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                </div>

                {/* Financial Goals & Current Investments */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Financial Goals</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {availableGoals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          financialGoals.includes(goal)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {goal.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </button>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Current Investments</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Equity Investments (₹)</label>
                    <input
                      type="number"
                      value={existingEquity}
                      onChange={(e) => setExistingEquity(e.target.value)}
                      placeholder="500000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Debt Investments (₹)</label>
                    <input
                      type="number"
                      value={existingDebt}
                      onChange={(e) => setExistingDebt(e.target.value)}
                      placeholder="300000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Investments (₹)</label>
                    <input
                      type="number"
                      value={existingOthers}
                      onChange={(e) => setExistingOthers(e.target.value)}
                      placeholder="200000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <button
                  onClick={calculateAssetAllocation}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Get Allocation Recommendation
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                  Reset
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
                  Asset Allocation Recommendation
                </h2>

                {/* Profile Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Profile Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-blue-600">Age</p>
                      <p className="font-semibold text-blue-900">{analysis.age} years</p>
                      </div>
                    <div>
                      <p className="text-sm text-blue-600">Risk Profile</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskProfileColor(analysis.riskProfile)}`}>
                        {analysis.riskProfile.charAt(0).toUpperCase() + analysis.riskProfile.slice(1)}
                      </span>
                          </div>
                    <div>
                      <p className="text-sm text-blue-600">Investment Horizon</p>
                      <p className="font-semibold text-blue-900">{analysis.investmentHorizon} years</p>
                        </div>
                    <div>
                      <p className="text-sm text-blue-600">Goals</p>
                      <p className="font-semibold text-blue-900">{analysis.financialGoals.length}</p>
                          </div>
                        </div>
                      </div>

                {/* Recommended Allocation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Equity Allocation</h3>
                    <p className={`text-3xl font-bold ${getRiskColor(analysis.recommendedAllocation.equity)}`}>
                      {analysis.recommendedAllocation.equity.toFixed(1)}%
                    </p>
                    <p className="text-sm text-green-700 mt-2">Growth & Capital Appreciation</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Debt Allocation</h3>
                    <p className="text-3xl font-bold text-blue-900">
                      {analysis.recommendedAllocation.debt.toFixed(1)}%
                    </p>
                    <p className="text-sm text-blue-700 mt-2">Stability & Income</p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Other Assets</h3>
                    <p className="text-3xl font-bold text-purple-900">
                      {analysis.recommendedAllocation.others.toFixed(1)}%
                    </p>
                    <p className="text-sm text-purple-700 mt-2">Diversification</p>
                  </div>
                </div>

                {/* Risk Metrics */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">Portfolio Risk Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-yellow-600">Expected Return</p>
                      <p className="font-semibold text-yellow-900">{analysis.riskMetrics.expectedReturn.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-yellow-600">Volatility</p>
                      <p className="font-semibold text-yellow-900">{analysis.riskMetrics.volatility.toFixed(2)}%</p>
                    </div>
                          <div>
                      <p className="text-sm text-yellow-600">Max Drawdown</p>
                      <p className="font-semibold text-yellow-900">{analysis.riskMetrics.maxDrawdown.toFixed(2)}%</p>
                        </div>
                          <div>
                      <p className="text-sm text-yellow-600">Sharpe Ratio</p>
                      <p className="font-semibold text-yellow-900">{analysis.riskMetrics.sharpeRatio.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>

                {/* Recommendations */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Recommendations</h3>
                  <div className="space-y-2">
                    {analysis.recommendations.map((recommendation, index) => (
                      <p key={index} className="text-green-700">• {recommendation}</p>
                    ))}
                      </div>
                    </div>

                {/* Year-by-Year Projection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Projection</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Equity Value</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Debt Value</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Value</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Rebalancing</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.yearByYearProjection.slice(0, 10).map((data, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{data.year}</td>
                            <td className="py-3 px-4 text-right">₹{data.equityValue.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">₹{data.debtValue.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right font-semibold">₹{data.totalValue.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">
                              {data.rebalancingNeeded ? (
                                <span className="text-red-600 font-semibold">Yes</span>
                              ) : (
                                <span className="text-green-600 font-semibold">No</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                Understanding Asset Allocation
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUpIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Equity Investments
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Stocks and equity mutual funds for growth and capital appreciation.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Returns:</strong> 10-15% historically</p>
                    <p><strong>Risk:</strong> High volatility</p>
                    <p><strong>Purpose:</strong> Long-term growth</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    Debt Investments
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Bonds and debt funds for stability and regular income.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Returns:</strong> 6-8% typically</p>
                    <p><strong>Risk:</strong> Low to moderate</p>
                    <p><strong>Purpose:</strong> Stability & income</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Allocation Factors
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Key factors that influence asset allocation decisions.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Age:</strong> Younger = more equity</p>
                    <p><strong>Risk Profile:</strong> Tolerance for volatility</p>
                    <p><strong>Time Horizon:</strong> Longer = more equity</p>
                    <p><strong>Goals:</strong> Specific financial objectives</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Risk Management
                  </h3>
                  <p className="text-gray-700 mb-4">
                    How proper allocation helps manage investment risk.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Diversification:</strong> Spread risk across assets</p>
                    <p><strong>Rebalancing:</strong> Maintain target allocation</p>
                    <p><strong>Correlation:</strong> Different asset behaviors</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Why Asset Allocation Matters
                </h3>
                <div className="space-y-4 text-blue-700">
                  <p>
                    <strong>Risk Management:</strong> Proper asset allocation helps manage investment 
                    risk by diversifying across different asset classes with varying risk profiles.
                  </p>
                  <p>
                    <strong>Return Optimization:</strong> Strategic allocation can optimize returns 
                    for your risk tolerance and investment goals.
                  </p>
                  <p>
                    <strong>Goal Achievement:</strong> Different financial goals require different 
                    allocation strategies for optimal success.
                  </p>
                  <p>
                    <strong>Long-term Success:</strong> Studies show that asset allocation is the 
                    primary driver of long-term investment success.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Best Practices for Asset Allocation
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Regular Review:</strong> Review and rebalance your portfolio annually 
                    or when your circumstances change significantly.
                  </p>
                  <p>
                    <strong>Age-Based Adjustments:</strong> Gradually reduce equity allocation as 
                    you approach retirement to protect capital.
                  </p>
                  <p>
                    <strong>Goal-Based Planning:</strong> Align your allocation with specific 
                    financial goals and time horizons.
                  </p>
                  <p>
                    <strong>Professional Guidance:</strong> Consider consulting a financial advisor 
                    for complex allocation decisions.
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

export default EquityVsDebtSplitRecommender;