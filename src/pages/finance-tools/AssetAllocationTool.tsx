import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  PieChart,
  BarChart3,
  Target,
  Activity,
  Shield,
  Zap,
  DollarSign,
  Calendar, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface AssetClass {
  id: string;
  name: string;
  description: string;
  expectedReturn: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  color: string;
  icon: React.ReactNode;
}

interface AgeBasedAllocation {
  ageRange: string;
  equity: number;
  debt: number;
  gold: number;
  realEstate: number;
  international: number;
  cash: number;
  description: string;
}

const AssetAllocationTool: React.FC = () => {
  const [age, setAge] = useState(30);
  const [riskProfile, setRiskProfile] = useState('moderate');
  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const [investmentHorizon, setInvestmentHorizon] = useState(20);

  const assetClasses: AssetClass[] = [
    {
      id: 'equity',
      name: 'Equity',
      description: 'Stocks and equity mutual funds',
      expectedReturn: 12,
      riskLevel: 'High',
      color: '#3B82F6',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: 'debt',
      name: 'Debt',
      description: 'Bonds and debt mutual funds',
      expectedReturn: 7,
      riskLevel: 'Low',
      color: '#10B981',
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: 'gold',
      name: 'Gold',
      description: 'Gold ETFs and physical gold',
      expectedReturn: 8,
      riskLevel: 'Medium',
      color: '#F59E0B',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      id: 'realEstate',
      name: 'Real Estate',
      description: 'REITs and real estate funds',
      expectedReturn: 10,
      riskLevel: 'Medium',
      color: '#8B5CF6',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 'international',
      name: 'International',
      description: 'International equity funds',
      expectedReturn: 11,
      riskLevel: 'High',
      color: '#EF4444',
      icon: <Activity className="h-4 w-4" />
    },
    {
      id: 'cash',
      name: 'Cash',
      description: 'Savings and liquid funds',
      expectedReturn: 4,
      riskLevel: 'Low',
      color: '#6B7280',
      icon: <Calendar className="h-4 w-4" />
    }
  ];

  const ageBasedAllocations: AgeBasedAllocation[] = [
    {
      ageRange: '20-30',
      equity: 60,
      debt: 20,
      gold: 5,
      realEstate: 10,
      international: 3,
      cash: 2,
      description: 'High growth focus, long time horizon'
    },
    {
      ageRange: '30-40',
      equity: 55,
      debt: 25,
      gold: 5,
      realEstate: 10,
      international: 3,
      cash: 2,
      description: 'Growth with some stability'
    },
    {
      ageRange: '40-50',
      equity: 45,
      debt: 35,
      gold: 5,
      realEstate: 10,
      international: 2,
      cash: 3,
      description: 'Balanced growth and safety'
    },
    {
      ageRange: '50-60',
      equity: 35,
      debt: 45,
      gold: 5,
      realEstate: 8,
      international: 2,
      cash: 5,
      description: 'Capital preservation focus'
    },
    {
      ageRange: '60+',
      equity: 20,
      debt: 60,
      gold: 5,
      realEstate: 5,
      international: 2,
      cash: 8,
      description: 'Conservative, income generation'
    }
  ];

  const calculateAssetAllocation = () => {
    const ageAllocation = ageBasedAllocations.find(a => {
      const [min, max] = a.ageRange.split('-').map(Number);
      return age >= min && age <= max;
    });

    if (!ageAllocation) return null;

    // Risk profile adjustments
    const riskAdjustments = {
      conservative: { equity: -10, debt: 10, gold: 0, realEstate: 0, international: 0, cash: 0 },
      moderate: { equity: 0, debt: 0, gold: 0, realEstate: 0, international: 0, cash: 0 },
      aggressive: { equity: 10, debt: -10, gold: 0, realEstate: 0, international: 0, cash: 0 }
    };

    const adjustment = riskAdjustments[riskProfile as keyof typeof riskAdjustments];

    const allocation = {
      equity: Math.max(0, Math.min(100, ageAllocation.equity + adjustment.equity)),
      debt: Math.max(0, Math.min(100, ageAllocation.debt + adjustment.debt)),
      gold: ageAllocation.gold,
      realEstate: ageAllocation.realEstate,
      international: ageAllocation.international,
      cash: ageAllocation.cash
    };

    // Calculate amounts
    const amounts = {
      equity: (allocation.equity / 100) * investmentAmount,
      debt: (allocation.debt / 100) * investmentAmount,
      gold: (allocation.gold / 100) * investmentAmount,
      realEstate: (allocation.realEstate / 100) * investmentAmount,
      international: (allocation.international / 100) * investmentAmount,
      cash: (allocation.cash / 100) * investmentAmount
    };

    // Calculate expected portfolio return
    const expectedReturn = (
      allocation.equity * 12 +
      allocation.debt * 7 +
      allocation.gold * 8 +
      allocation.realEstate * 10 +
      allocation.international * 11 +
      allocation.cash * 4
    ) / 100;

    // Calculate future corpus
    const futureCorpus = investmentAmount * Math.pow(1 + expectedReturn / 100, investmentHorizon);

    return {
      allocation,
      amounts,
      expectedReturn,
      futureCorpus,
      ageAllocation
    };
  };

  const result = calculateAssetAllocation();

  return (
    <>
      <SEOHelmet
        title="Asset Allocation Tool - Age-Based Portfolio Allocation | MoneyCal"
        description="Get personalized asset allocation recommendations based on your age. Optimize your portfolio across equity, debt, gold, real estate, international, and cash with our comprehensive allocation tool."
        keywords="asset allocation tool, portfolio allocation, age-based allocation, investment allocation, asset mix, portfolio diversification"
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-indigo-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Asset Allocation Tool
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Age-based portfolio allocation across multiple asset classes
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-5 w-5 md:h-6 md:w-6 mr-3 text-indigo-600" />
                  Your Profile
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Risk Profile</label>
                    <div className="space-y-3">
                      {['conservative', 'moderate', 'aggressive'].map((profile) => (
                        <label key={profile} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                            type="radio"
                            name="riskProfile"
                            value={profile}
                            checked={riskProfile === profile}
                            onChange={(e) => setRiskProfile(e.target.value)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                          />
                          <div className="ml-3">
                            <div className="font-medium text-sm md:text-base capitalize">{profile}</div>
                            <p className="text-xs md:text-sm text-gray-600">
                              {profile === 'conservative' && 'Lower risk, stable returns'}
                              {profile === 'moderate' && 'Balanced risk and returns'}
                              {profile === 'aggressive' && 'Higher risk, higher potential returns'}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₹)</label>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Horizon (Years)</label>
                    <input
                      type="number"
                        value={investmentHorizon}
                        onChange={(e) => setInvestmentHorizon(Number(e.target.value))}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {/* Asset Classes Info */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h3 className="font-semibold text-indigo-900 mb-3">Asset Classes</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                      {assetClasses.map((asset) => (
                        <div key={asset.id} className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
                          <span className="text-indigo-800">{asset.name}: {asset.expectedReturn}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                {result ? (
                  <>
                    {/* Portfolio Summary */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg md:text-xl font-bold">Portfolio Allocation</h3>
                        <PieChart className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-bold mb-1 text-blue-200">
                            {result.allocation.equity}%
                          </div>
                          <p className="text-blue-100 text-sm">Equity</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-bold mb-1 text-green-200">
                            {result.allocation.debt}%
                          </div>
                          <p className="text-green-100 text-sm">Debt</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-bold mb-1 text-yellow-200">
                            {result.allocation.gold}%
                          </div>
                          <p className="text-yellow-100 text-sm">Gold</p>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span>Expected Return:</span>
                          <span className="font-bold">{result.expectedReturn.toFixed(2)}%</span>
                        </div>
                  </div>
                </div>

                    {/* Asset Allocation Chart */}
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                        <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-600" />
                        Asset Allocation Breakdown
                  </h4>
                  <div className="space-y-3">
                        {Object.entries(result.allocation).map(([asset, percentage]) => {
                          const assetClass = assetClasses.find(a => a.id === asset);
                          if (!assetClass) return null;
                          
                          return (
                            <div key={asset} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: assetClass.color }}>
                                  <div className="text-white">
                                    {assetClass.icon}
                                  </div>
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{assetClass.name}</div>
                                  <div className="text-xs text-gray-500">{assetClass.description}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-sm" style={{ color: assetClass.color }}>
                                  {percentage}%
                                </div>
                                <div className="text-xs text-gray-500">
                                  ₹{result.amounts[asset as keyof typeof result.amounts].toLocaleString()}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Investment Projections */}
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                        <Target className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-600" />
                        Investment Projections
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                          <span className="text-sm font-medium">Initial Investment:</span>
                          <span className="font-bold text-indigo-600">₹{investmentAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                          <span className="text-sm font-medium">Expected Corpus ({investmentHorizon} years):</span>
                          <span className="font-bold text-purple-600">₹{result.futureCorpus.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                          <span className="text-sm font-medium">Total Returns:</span>
                          <span className="font-bold text-green-600">₹{(result.futureCorpus - investmentAmount).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Age-Based Recommendations */}
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                        <Activity className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-600" />
                        Age-Based Recommendations
                      </h4>
                      <div className="space-y-2 text-xs md:text-sm">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>{result.ageAllocation.description}</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Risk profile adjustment applied: {riskProfile} allocation</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Rebalance portfolio annually to maintain target allocation</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>Consider tax implications and liquidity needs</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 text-center">
                    <IndianRupee className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Your Details</h3>
                    <p className="text-gray-600 text-sm">Fill in your profile information to get personalized asset allocation recommendations.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Related Finance Tools</h2>
              <p className="text-base md:text-lg text-gray-600">Explore other tools to enhance your investment planning</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Link
                to="/finance-tools/equity-vs-debt-split-recommender"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-3 md:mb-4">
                  <PieChart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Equity vs Debt Split Recommender</h3>
                <p className="text-gray-600 text-xs md:text-sm">Get personalized equity-debt allocation recommendations</p>
              </Link>

              <Link
                to="/finance-tools/portfolio-diversification-visualizer"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Portfolio Diversification Visualizer</h3>
                <p className="text-gray-600 text-xs md:text-sm">Visualize and optimize your portfolio diversification</p>
              </Link>

              <Link
                to="/finance-tools/sip-inflation-adjusted-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3 md:mb-4">
                  <IndianRupee className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">SIP Inflation-Adjusted Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate real returns adjusted for inflation impact</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AssetAllocationTool;
