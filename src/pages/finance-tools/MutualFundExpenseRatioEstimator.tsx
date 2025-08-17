import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  AlertTriangle,
  Info
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface Fund {
  id: string;
  name: string;
  expenseRatio: number;
  investmentAmount: number;
  investmentPeriod: number;
  expectedReturn: number;
  color: string;
}

const MutualFundExpenseRatioEstimator: React.FC = () => {
  const [funds, setFunds] = useState<Fund[]>([
    {
      id: '1',
      name: 'HDFC Mid-Cap Opportunities',
      expenseRatio: 1.75,
      investmentAmount: 100000,
      investmentPeriod: 10,
      expectedReturn: 12,
      color: '#3B82F6'
    },
    {
      id: '2',
      name: 'Axis Bluechip Fund',
      expenseRatio: 1.50,
      investmentAmount: 100000,
      investmentPeriod: 10,
      expectedReturn: 10,
      color: '#10B981'
    }
  ]);

  const [newFund, setNewFund] = useState({
    name: '',
    expenseRatio: 1.5,
    investmentAmount: 100000,
    investmentPeriod: 10,
    expectedReturn: 12
  });

  const addFund = () => {
    if (newFund.name && newFund.investmentAmount > 0) {
      const fund: Fund = {
        id: Date.now().toString(),
        name: newFund.name,
        expenseRatio: newFund.expenseRatio,
        investmentAmount: newFund.investmentAmount,
        investmentPeriod: newFund.investmentPeriod,
        expectedReturn: newFund.expectedReturn,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      };
      setFunds([...funds, fund]);
      setNewFund({
        name: '',
        expenseRatio: 1.5,
        investmentAmount: 100000,
        investmentPeriod: 10,
        expectedReturn: 12
      });
    }
  };

  const removeFund = (id: string) => {
    setFunds(funds.filter(fund => fund.id !== id));
  };

  const calculateExpenseImpact = (fund: Fund) => {
    const grossReturn = fund.expectedReturn / 100;
    const netReturn = grossReturn - (fund.expenseRatio / 100);
    
    // Calculate corpus with and without expenses
    const corpusWithExpenses = fund.investmentAmount * Math.pow(1 + netReturn, fund.investmentPeriod);
    const corpusWithoutExpenses = fund.investmentAmount * Math.pow(1 + grossReturn, fund.investmentPeriod);
    
    const expenseImpact = corpusWithoutExpenses - corpusWithExpenses;
    const totalExpenses = corpusWithExpenses * (fund.expenseRatio / 100) * fund.investmentPeriod;
    
    return {
      corpusWithExpenses,
      corpusWithoutExpenses,
      expenseImpact,
      totalExpenses,
      netReturn: netReturn * 100
    };
  };

  const calculatePortfolioMetrics = () => {
    const totalInvestment = funds.reduce((sum, fund) => sum + fund.investmentAmount, 0);
    const weightedExpenseRatio = funds.reduce((sum, fund) => 
      sum + (fund.expenseRatio * fund.investmentAmount / totalInvestment), 0);
    
    let totalCorpusWithExpenses = 0;
    let totalCorpusWithoutExpenses = 0;
    let totalExpenseImpact = 0;

    funds.forEach(fund => {
      const impact = calculateExpenseImpact(fund);
      totalCorpusWithExpenses += impact.corpusWithExpenses;
      totalCorpusWithoutExpenses += impact.corpusWithoutExpenses;
      totalExpenseImpact += impact.expenseImpact;
    });

    return {
      totalInvestment,
      weightedExpenseRatio,
      totalCorpusWithExpenses,
      totalCorpusWithoutExpenses,
      totalExpenseImpact
    };
  };

  const result = calculatePortfolioMetrics();

  return (
    <>
      <SEOHelmet
        title="Mutual Fund Expense Ratio Estimator - Calculate Fund Expenses Impact | MoneyCal"
        description="Estimate the impact of mutual fund expense ratios on your returns. Calculate how much expenses reduce your investment corpus over time."
        keywords="mutual fund expense ratio, fund expenses calculator, expense ratio impact, mutual fund costs, TER calculator"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-orange-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Mutual Fund Expense Ratio Estimator
              </h1>
              <p className="text-lg md:text-xl text-orange-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Calculate the impact of expense ratios on your mutual fund returns
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
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-orange-600" />
                  Add Mutual Fund
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fund Name
                    </label>
                    <input
                      type="text"
                      value={newFund.name}
                      onChange={(e) => setNewFund({...newFund, name: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                      placeholder="e.g., HDFC Mid-Cap Opportunities"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expense Ratio (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={newFund.expenseRatio}
                        onChange={(e) => setNewFund({...newFund, expenseRatio: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                        placeholder="1.75"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investment Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={newFund.investmentAmount}
                        onChange={(e) => setNewFund({...newFund, investmentAmount: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                        placeholder="100000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investment Period (Years)
                      </label>
                      <input
                        type="number"
                        value={newFund.investmentPeriod}
                        onChange={(e) => setNewFund({...newFund, investmentPeriod: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Return (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={newFund.expectedReturn}
                        onChange={(e) => setNewFund({...newFund, expectedReturn: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                        placeholder="12"
                      />
                    </div>
                  </div>

                  <button
                    onClick={addFund}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base"
                  >
                    Add Fund
                  </button>
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
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Portfolio Impact</h3>
                    <AlertTriangle className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">{result.weightedExpenseRatio.toFixed(2)}%</div>
                      <p className="text-orange-100 text-sm">Weighted Expense Ratio</p>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">₹{result.totalExpenseImpact.toLocaleString()}</div>
                      <p className="text-orange-100 text-sm">Total Expense Impact</p>
                    </div>
                  </div>
                  <div className="mt-4 p-2 rounded-lg text-sm bg-orange-500/20">
                    Net Corpus: ₹{result.totalCorpusWithExpenses.toLocaleString()}
                  </div>
                </div>

                {/* Expense Impact Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Without Expenses</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                      ₹{result.totalCorpusWithoutExpenses.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Gross corpus</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Target className="h-4 w-4 md:h-5 md:w-5 text-red-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">With Expenses</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-red-600 mb-1">
                      ₹{result.totalCorpusWithExpenses.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Net corpus</p>
                  </div>
                </div>

                {/* Fund List */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-orange-600" />
                    Mutual Funds ({funds.length})
                  </h4>
                  <div className="space-y-3">
                    {funds.map((fund) => {
                      const impact = calculateExpenseImpact(fund);
                      
                      return (
                        <div key={fund.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-3" 
                                style={{ backgroundColor: fund.color }}
                              ></div>
                              <div>
                                <div className="font-medium text-sm">{fund.name}</div>
                                <div className="text-xs text-gray-500">
                                  {fund.expenseRatio}% TER • {fund.expectedReturn}% expected return
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFund(fund.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-600">Investment:</span>
                              <span className="font-semibold ml-1">₹{fund.investmentAmount.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Net Return:</span>
                              <span className="font-semibold ml-1">{impact.netReturn.toFixed(2)}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Expense Impact:</span>
                              <span className="font-semibold text-red-600 ml-1">₹{impact.expenseImpact.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Final Corpus:</span>
                              <span className="font-semibold ml-1">₹{impact.corpusWithExpenses.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {funds.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No mutual funds added yet
                      </div>
                    )}
                  </div>
                </div>

                {/* Expense Ratio Guide */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <Info className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Expense Ratio Guide
                  </h4>
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Equity Funds:</span>
                      <span className="font-semibold">1.5% - 2.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Debt Funds:</span>
                      <span className="font-semibold">0.5% - 1.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Index Funds:</span>
                      <span className="font-semibold">0.1% - 0.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Direct Plans:</span>
                      <span className="font-semibold text-green-600">Lower by 0.5-1%</span>
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
                to="/finance-tools/xirr-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">XIRR Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate Extended Internal Rate of Return for irregular cash flows</p>
              </Link>

              <Link
                to="/finance-tools/dividend-tracker"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3 md:mb-4">
                  <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Dividend Tracker</h3>
                <p className="text-gray-600 text-xs md:text-sm">Track your dividend income, yields, and upcoming dividend payments</p>
              </Link>

              <Link
                to="/finance-tools/portfolio-diversification-visualizer"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-3 md:mb-4">
                  <PieChart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Portfolio Diversification Visualizer</h3>
                <p className="text-gray-600 text-xs md:text-sm">Visualize and analyze your portfolio diversification across asset classes</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MutualFundExpenseRatioEstimator;