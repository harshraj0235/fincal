import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  DollarSign,
  BarChart3,
  Calendar,
  Target,
  Activity,
  AlertTriangle,
  PieChart,
  Shield,
  Zap,
  Clock,
  TrendingDown
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface ExitLoadStructure {
  id: string;
  name: string;
  description: string;
  exitLoad: number;
  holdingPeriod: number;
  color: string;
}

interface FundData {
  id: string;
  name: string;
  investmentAmount: number;
  currentValue: number;
  exitLoad: number;
  holdingPeriod: number;
  purchaseDate: string;
  color: string;
}

const MutualFundExitLoadTracker: React.FC = () => {
  const [funds, setFunds] = useState<FundData[]>([
    {
      id: '1',
      name: 'HDFC Mid-Cap Opportunities Fund',
      investmentAmount: 100000,
      currentValue: 120000,
      exitLoad: 1,
      holdingPeriod: 6,
      purchaseDate: '2024-07-15',
      color: '#3B82F6'
    },
    {
      id: '2',
      name: 'Axis Bluechip Fund',
      investmentAmount: 50000,
      currentValue: 55000,
      exitLoad: 0.5,
      holdingPeriod: 12,
      purchaseDate: '2024-01-15',
      color: '#10B981'
    }
  ]);

  const [newFund, setNewFund] = useState({
    name: '',
    investmentAmount: 100000,
    currentValue: 120000,
    exitLoad: 1,
    holdingPeriod: 6,
    purchaseDate: ''
  });

  const exitLoadStructures: ExitLoadStructure[] = [
    {
      id: '1',
      name: 'Standard Exit Load',
      description: '1% exit load if redeemed within 1 year',
      exitLoad: 1,
      holdingPeriod: 12,
      color: '#EF4444'
    },
    {
      id: '2',
      name: 'Reduced Exit Load',
      description: '0.5% exit load if redeemed within 6 months',
      exitLoad: 0.5,
      holdingPeriod: 6,
      color: '#F59E0B'
    },
    {
      id: '3',
      name: 'No Exit Load',
      description: 'No exit load after 1 year',
      exitLoad: 0,
      holdingPeriod: 12,
      color: '#10B981'
    }
  ];

  const addFund = () => {
    if (newFund.name && newFund.investmentAmount > 0 && newFund.currentValue > 0) {
      const fund: FundData = {
        id: Date.now().toString(),
        name: newFund.name,
        investmentAmount: newFund.investmentAmount,
        currentValue: newFund.currentValue,
        exitLoad: newFund.exitLoad,
        holdingPeriod: newFund.holdingPeriod,
        purchaseDate: newFund.purchaseDate,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      };
      setFunds([...funds, fund]);
      setNewFund({
        name: '',
        investmentAmount: 100000,
        currentValue: 120000,
        exitLoad: 1,
        holdingPeriod: 6,
        purchaseDate: ''
      });
    }
  };

  const removeFund = (id: string) => {
    setFunds(funds.filter(fund => fund.id !== id));
  };

  const calculateExitLoadImpact = (fund: FundData) => {
    const gain = fund.currentValue - fund.investmentAmount;
    const exitLoadAmount = fund.currentValue * (fund.exitLoad / 100);
    const netGain = gain - exitLoadAmount;
    const effectiveReturn = (netGain / fund.investmentAmount) * 100;
    const grossReturn = (gain / fund.investmentAmount) * 100;
    const exitLoadImpact = (exitLoadAmount / fund.investmentAmount) * 100;
    
    return {
      gain,
      exitLoadAmount,
      netGain,
      effectiveReturn,
      grossReturn,
      exitLoadImpact
    };
  };

  const calculatePortfolioMetrics = () => {
    const totalInvestment = funds.reduce((sum, fund) => sum + fund.investmentAmount, 0);
    const totalCurrentValue = funds.reduce((sum, fund) => sum + fund.currentValue, 0);
    const totalExitLoad = funds.reduce((sum, fund) => {
      const impact = calculateExitLoadImpact(fund);
      return sum + impact.exitLoadAmount;
    }, 0);
    const totalNetGain = funds.reduce((sum, fund) => {
      const impact = calculateExitLoadImpact(fund);
      return sum + impact.netGain;
    }, 0);

    const weightedExitLoad = totalCurrentValue > 0 ? (totalExitLoad / totalCurrentValue) * 100 : 0;
    const portfolioReturn = totalInvestment > 0 ? (totalNetGain / totalInvestment) * 100 : 0;

    return {
      totalInvestment,
      totalCurrentValue,
      totalExitLoad,
      totalNetGain,
      weightedExitLoad,
      portfolioReturn
    };
  };

  const portfolioMetrics = calculatePortfolioMetrics();

  return (
    <>
      <SEOHelmet
        title="Mutual Fund Exit Load Tracker - Calculate Exit Load Impact | MoneyCal"
        description="Track mutual fund exit loads and their impact on your returns. Calculate exit load charges, effective returns, and optimize your redemption strategy with our comprehensive tracker."
        keywords="mutual fund exit load tracker, exit load calculator, fund redemption charges, exit load impact, mutual fund returns, redemption strategy"
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-red-600 via-orange-600 to-red-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-red-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Mutual Fund Exit Load Tracker
              </h1>
              <p className="text-lg md:text-xl text-red-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Track exit loads and optimize your redemption strategy
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
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-red-600" />
                  Add Fund
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fund Name</label>
                    <input
                      type="text"
                      value={newFund.name}
                      onChange={(e) => setNewFund({...newFund, name: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                      placeholder="Enter fund name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₹)</label>
                      <input
                        type="number"
                        value={newFund.investmentAmount}
                        onChange={(e) => setNewFund({...newFund, investmentAmount: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Value (₹)</label>
                      <input
                        type="number"
                        value={newFund.currentValue}
                        onChange={(e) => setNewFund({...newFund, currentValue: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Exit Load (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newFund.exitLoad}
                        onChange={(e) => setNewFund({...newFund, exitLoad: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Holding Period (Months)</label>
                    <input
                      type="number"
                        value={newFund.holdingPeriod}
                        onChange={(e) => setNewFund({...newFund, holdingPeriod: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                    <input
                      type="date"
                      value={newFund.purchaseDate}
                      onChange={(e) => setNewFund({...newFund, purchaseDate: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>

                  <button
                    onClick={addFund}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Add Fund
                  </button>

                  {/* Exit Load Structures */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-3">Common Exit Load Structures</h3>
                    <div className="space-y-2 text-xs md:text-sm">
                      {exitLoadStructures.map((structure) => (
                        <div key={structure.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: structure.color }}></div>
                            <span className="text-red-800">{structure.name}</span>
                          </div>
                          <span className="text-red-600 font-medium">{structure.exitLoad}%</span>
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
                {/* Portfolio Summary */}
                <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Portfolio Summary</h3>
                    <PieChart className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold mb-1 text-red-200">
                        ₹{portfolioMetrics.totalInvestment.toLocaleString()}
                      </div>
                      <p className="text-red-100 text-sm">Total Investment</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold mb-1 text-orange-200">
                        ₹{portfolioMetrics.totalCurrentValue.toLocaleString()}
                      </div>
                      <p className="text-orange-100 text-sm">Current Value</p>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Exit Load Impact:</span>
                      <span className="font-bold">₹{portfolioMetrics.totalExitLoad.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Fund Details */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-red-600" />
                    Fund Details
                  </h4>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {funds.map((fund) => {
                      const impact = calculateExitLoadImpact(fund);
                      return (
                        <div key={fund.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: fund.color }}></div>
                              <h5 className="font-medium text-sm md:text-base">{fund.name}</h5>
                            </div>
                            <button
                              onClick={() => removeFund(fund.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                            <div>
                              <span className="text-gray-600">Investment:</span>
                              <span className="font-medium ml-1">₹{fund.investmentAmount.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Current Value:</span>
                              <span className="font-medium ml-1">₹{fund.currentValue.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Exit Load:</span>
                              <span className="font-medium ml-1">{fund.exitLoad}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Holding Period:</span>
                              <span className="font-medium ml-1">{fund.holdingPeriod} months</span>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center">
                                <div className="font-semibold text-green-600">{impact.grossReturn.toFixed(2)}%</div>
                                <div className="text-gray-500">Gross Return</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-red-600">-{impact.exitLoadImpact.toFixed(2)}%</div>
                                <div className="text-gray-500">Exit Load</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-blue-600">{impact.effectiveReturn.toFixed(2)}%</div>
                                <div className="text-gray-500">Net Return</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Exit Load Impact Analysis */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <Activity className="h-4 w-4 md:h-5 md:w-5 mr-2 text-red-600" />
                    Exit Load Impact Analysis
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                      <span className="text-sm font-medium">Total Exit Load:</span>
                      <span className="font-bold text-red-600">₹{portfolioMetrics.totalExitLoad.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                      <span className="text-sm font-medium">Weighted Exit Load:</span>
                      <span className="font-bold text-orange-600">{portfolioMetrics.weightedExitLoad.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Portfolio Return:</span>
                      <span className="font-bold text-green-600">{portfolioMetrics.portfolioReturn.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <Target className="h-4 w-4 md:h-5 md:w-5 mr-2 text-red-600" />
                    Redemption Recommendations
                  </h4>
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Consider holding funds longer to avoid exit loads</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Exit loads can significantly impact short-term returns</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Plan redemptions around exit load-free periods</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Compare exit loads when choosing between similar funds</span>
                    </div>
                  </div>
                </div>
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
                to="/finance-tools/mutual-fund-expense-ratio-estimator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-red-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-3 md:mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Mutual Fund Expense Ratio Estimator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate the impact of expense ratios on returns</p>
              </Link>

              <Link
                to="/finance-tools/asset-allocation-tool"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-red-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4">
                  <PieChart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Asset Allocation Tool</h3>
                <p className="text-gray-600 text-xs md:text-sm">Get personalized asset allocation recommendations</p>
              </Link>

              <Link
                to="/finance-tools/equity-vs-debt-split-recommender"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-red-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Equity vs Debt Split Recommender</h3>
                <p className="text-gray-600 text-xs md:text-sm">Get personalized equity-debt allocation recommendations</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MutualFundExitLoadTracker;