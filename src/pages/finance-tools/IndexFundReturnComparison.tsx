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
  TrendingUpIcon, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface IndexFund {
  id: string;
  name: string;
  category: string;
  expenseRatio: number;
  trackingError: number;
  aum: number;
  inceptionDate: string;
  benchmark: string;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
    sinceInception: number;
  };
  riskMetrics: {
    volatility: number;
    sharpeRatio: number;
    beta: number;
    maxDrawdown: number;
  };
}

interface ComparisonAnalysis {
  selectedFunds: IndexFund[];
  timePeriod: number;
  investmentAmount: number;
  comparisonResults: {
    fundName: string;
    totalValue: number;
    totalReturn: number;
    totalReturnPercentage: number;
    annualizedReturn: number;
    expenses: number;
    netReturn: number;
    netReturnPercentage: number;
  }[];
  performanceRanking: {
    fundName: string;
    rank: number;
    score: number;
  }[];
  riskAnalysis: {
    fundName: string;
    riskScore: number;
    volatility: number;
    sharpeRatio: number;
  }[];
  costAnalysis: {
    fundName: string;
    expenseRatio: number;
    totalExpenses: number;
    costEfficiency: number;
  }[];
}

const IndexFundReturnComparison: React.FC = () => {
  const [selectedFunds, setSelectedFunds] = useState<string[]>([]);
  const [timePeriod, setTimePeriod] = useState('5');
  const [investmentAmount, setInvestmentAmount] = useState('100000');
  const [analysis, setAnalysis] = useState<ComparisonAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Mock data for index funds
  const availableFunds: IndexFund[] = [
    {
      id: '1',
      name: 'HDFC Index Fund - Nifty 50 Plan',
      category: 'Large Cap',
      expenseRatio: 0.2,
      trackingError: 0.05,
      aum: 5000,
      inceptionDate: '2019-01-01',
      benchmark: 'Nifty 50',
      returns: {
        oneYear: 12.5,
        threeYear: 15.2,
        fiveYear: 14.8,
        sinceInception: 15.0
      },
      riskMetrics: {
        volatility: 12.5,
        sharpeRatio: 1.2,
        beta: 0.98,
        maxDrawdown: -8.5
      }
    },
    {
      id: '2',
      name: 'ICICI Prudential Nifty Index Fund',
      category: 'Large Cap',
      expenseRatio: 0.15,
      trackingError: 0.03,
      aum: 3500,
      inceptionDate: '2018-06-01',
      benchmark: 'Nifty 50',
      returns: {
        oneYear: 12.8,
        threeYear: 15.5,
        fiveYear: 15.1,
        sinceInception: 15.3
      },
      riskMetrics: {
        volatility: 12.2,
        sharpeRatio: 1.25,
        beta: 0.99,
        maxDrawdown: -8.2
      }
    },
    {
      id: '3',
      name: 'UTI Nifty Index Fund',
      category: 'Large Cap',
      expenseRatio: 0.18,
      trackingError: 0.04,
      aum: 2800,
      inceptionDate: '2019-03-01',
      benchmark: 'Nifty 50',
      returns: {
        oneYear: 12.3,
        threeYear: 14.9,
        fiveYear: 14.6,
        sinceInception: 14.8
      },
      riskMetrics: {
        volatility: 12.8,
        sharpeRatio: 1.15,
        beta: 0.97,
        maxDrawdown: -8.8
      }
    },
    {
      id: '4',
      name: 'SBI Nifty Index Fund',
      category: 'Large Cap',
      expenseRatio: 0.12,
      trackingError: 0.02,
      aum: 4200,
      inceptionDate: '2018-01-01',
      benchmark: 'Nifty 50',
      returns: {
        oneYear: 12.9,
        threeYear: 15.6,
        fiveYear: 15.2,
        sinceInception: 15.4
      },
      riskMetrics: {
        volatility: 12.0,
        sharpeRatio: 1.28,
        beta: 1.0,
        maxDrawdown: -7.9
      }
    },
    {
      id: '5',
      name: 'Axis Nifty 50 Index Fund',
      category: 'Large Cap',
      expenseRatio: 0.25,
      trackingError: 0.06,
      aum: 1800,
      inceptionDate: '2020-01-01',
      benchmark: 'Nifty 50',
      returns: {
        oneYear: 12.1,
        threeYear: 14.7,
        fiveYear: 14.4,
        sinceInception: 14.6
      },
      riskMetrics: {
        volatility: 13.0,
        sharpeRatio: 1.1,
        beta: 0.96,
        maxDrawdown: -9.0
      }
    }
  ];

  const calculateComparison = () => {
    if (selectedFunds.length < 2) {
      alert('Please select at least 2 funds for comparison');
      return;
    }

    const amount = parseFloat(investmentAmount);
    const years = parseInt(timePeriod);
    const selectedFundData = availableFunds.filter(fund => selectedFunds.includes(fund.id));

    // Calculate returns based on time period
    const getReturnForPeriod = (fund: IndexFund) => {
      switch (years) {
        case 1: return fund.returns.oneYear;
        case 3: return fund.returns.threeYear;
        case 5: return fund.returns.fiveYear;
        default: return fund.returns.fiveYear;
      }
    };

    const comparisonResults = selectedFundData.map(fund => {
      const annualReturn = getReturnForPeriod(fund);
      const totalReturnPercentage = Math.pow(1 + annualReturn / 100, years) - 1;
      const totalValue = amount * (1 + totalReturnPercentage);
      const totalReturn = totalValue - amount;
      const annualizedReturn = (Math.pow(totalValue / amount, 1 / years) - 1) * 100;
      const expenses = amount * (fund.expenseRatio / 100) * years;
      const netReturn = totalReturn - expenses;
      const netReturnPercentage = (netReturn / amount) * 100;

      return {
        fundName: fund.name,
        totalValue,
        totalReturn,
        totalReturnPercentage: totalReturnPercentage * 100,
        annualizedReturn,
        expenses,
        netReturn,
        netReturnPercentage
      };
    });

    // Performance ranking
    const performanceRanking = comparisonResults
      .map((result, index) => ({
        fundName: result.fundName,
        rank: 0,
        score: result.netReturnPercentage
      }))
      .sort((a, b) => b.score - a.score)
      .map((item, index) => ({
        ...item,
        rank: index + 1
      }));

    // Risk analysis
    const riskAnalysis = selectedFundData.map(fund => ({
      fundName: fund.name,
      riskScore: (fund.riskMetrics.volatility * 0.4) + (fund.riskMetrics.maxDrawdown * 0.3) + ((1 - fund.riskMetrics.sharpeRatio) * 0.3),
      volatility: fund.riskMetrics.volatility,
      sharpeRatio: fund.riskMetrics.sharpeRatio
    }));

    // Cost analysis
    const costAnalysis = selectedFundData.map(fund => {
      const totalExpenses = amount * (fund.expenseRatio / 100) * years;
      const costEfficiency = 1 - (fund.expenseRatio / 0.5); // Assuming 0.5% as high expense ratio
      
      return {
        fundName: fund.name,
        expenseRatio: fund.expenseRatio,
        totalExpenses,
        costEfficiency: Math.max(0, costEfficiency)
      };
    });

    setAnalysis({
      selectedFunds: selectedFundData,
      timePeriod: years,
      investmentAmount: amount,
      comparisonResults,
      performanceRanking,
      riskAnalysis,
      costAnalysis
    });
    setShowAnalysis(true);
  };

  const toggleFundSelection = (fundId: string) => {
    setSelectedFunds(prev => 
      prev.includes(fundId) 
        ? prev.filter(id => id !== fundId)
        : [...prev, fundId]
    );
  };

  const resetForm = () => {
    setSelectedFunds([]);
    setTimePeriod('5');
    setInvestmentAmount('100000');
    setAnalysis(null);
    setShowAnalysis(false);
  };

  const getPerformanceColor = (returnValue: number) => {
    if (returnValue >= 15) return 'text-green-600';
    if (returnValue >= 10) return 'text-blue-600';
    if (returnValue >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 5) return 'text-green-600';
    if (riskScore <= 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <>
      <SEOHelmet
        title="Index Fund Return Comparison - Compare Index Fund Performance | MoneyCal"
        description="Compare index fund returns and performance. Analyze expense ratios, tracking errors, and risk metrics to choose the best index fund for your investment goals."
        keywords="index fund comparison, index fund returns, mutual fund comparison, expense ratio comparison, tracking error analysis"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Index Fund Return Comparison
              </h1>
              <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                Compare index fund returns and performance. Analyze expense ratios, 
                tracking errors, and risk metrics to choose the best index fund.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-indigo-100">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  Performance Analysis
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Fund Comparison
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Risk Assessment
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Fund Selection Section */}
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
                  <IndianRupee className="h-6 w-6 mr-3 text-indigo-600" />
                  Fund Selection & Parameters
                </h2>
                  </div>
                  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="100000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period (Years)
                  </label>
                  <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="1">1 Year</option>
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                  </select>
                </div>

                <div className="flex items-end space-x-4">
                  <button
                    onClick={calculateComparison}
                    className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    Compare Funds
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-3">Select Funds for Comparison</h3>
                <p className="text-indigo-700 mb-4">Choose at least 2 index funds to compare their performance:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableFunds.map((fund) => (
                    <div
                      key={fund.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedFunds.includes(fund.id)
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white hover:border-indigo-300'
                      }`}
                      onClick={() => toggleFundSelection(fund.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{fund.name}</h4>
                          <p className="text-sm text-gray-600">{fund.category} • {fund.benchmark}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className="text-gray-600">Expense: {fund.expenseRatio}%</span>
                            <span className="text-gray-600">AUM: ₹{fund.aum} Cr</span>
                  </div>
                      </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedFunds.includes(fund.id)
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedFunds.includes(fund.id) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                    </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Comparison Results */}
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
                  <BarChart3 className="h-6 w-6 mr-3 text-indigo-600" />
                  Comparison Results
                </h2>

                {/* Performance Comparison */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Fund Name</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Value</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Return</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Return %</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Annualized</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Expenses</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Net Return</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Net Return %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.comparisonResults.map((result, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{result.fundName}</td>
                            <td className="py-3 px-4 text-right">₹{result.totalValue.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">₹{result.totalReturn.toLocaleString()}</td>
                            <td className={`py-3 px-4 text-right font-semibold ${getPerformanceColor(result.totalReturnPercentage)}`}>
                              {result.totalReturnPercentage.toFixed(2)}%
                            </td>
                            <td className={`py-3 px-4 text-right font-semibold ${getPerformanceColor(result.annualizedReturn)}`}>
                              {result.annualizedReturn.toFixed(2)}%
                            </td>
                            <td className="py-3 px-4 text-right text-red-600">₹{result.expenses.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">₹{result.netReturn.toLocaleString()}</td>
                            <td className={`py-3 px-4 text-right font-semibold ${getPerformanceColor(result.netReturnPercentage)}`}>
                              {result.netReturnPercentage.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Performance Ranking */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Ranking</h3>
                  <div className="space-y-3">
                      {analysis.performanceRanking.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              index === 0 ? 'bg-yellow-500' : 
                              index === 1 ? 'bg-gray-400' : 
                              index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                            }`}>
                              {item.rank}
                            </span>
                            <span className="ml-3 font-medium text-gray-900">{item.fundName}</span>
                          </div>
                          <span className={`font-semibold ${getPerformanceColor(item.score)}`}>
                            {item.score.toFixed(2)}%
                          </span>
                            </div>
                      ))}
                            </div>
                            </div>

                            <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h3>
                    <div className="space-y-3">
                      {analysis.riskAnalysis.map((item, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">{item.fundName}</span>
                            <span className={`font-semibold ${getRiskColor(item.riskScore)}`}>
                              Risk Score: {item.riskScore.toFixed(1)}
                              </span>
                            </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <span>Volatility: {item.volatility.toFixed(1)}%</span>
                            <span>Sharpe Ratio: {item.sharpeRatio.toFixed(2)}</span>
                    </div>
                    </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cost Analysis */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Fund Name</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Expense Ratio</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Expenses</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Cost Efficiency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.costAnalysis.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{item.fundName}</td>
                            <td className="py-3 px-4 text-right">{item.expenseRatio.toFixed(2)}%</td>
                            <td className="py-3 px-4 text-right text-red-600">₹{item.totalExpenses.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">
                              <span className={`font-semibold ${item.costEfficiency > 0.7 ? 'text-green-600' : item.costEfficiency > 0.4 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {(item.costEfficiency * 100).toFixed(0)}%
                              </span>
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
                Understanding Index Fund Comparison
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUpIcon className="w-5 h-5 mr-2 text-indigo-600" />
                    What are Index Funds?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Index funds track specific market indices and provide broad market exposure.
                  </p>
                  <div className="space-y-2 text-sm text-indigo-700">
                    <p><strong>Purpose:</strong> Match market index performance</p>
                    <p><strong>Advantage:</strong> Low cost and diversification</p>
                    <p><strong>Risk:</strong> Market risk, not fund manager risk</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-purple-600" />
                    Key Comparison Factors
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Important metrics to consider when comparing index funds.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Expense Ratio:</strong> Annual fund management costs</p>
                    <p><strong>Tracking Error:</strong> Deviation from benchmark</p>
                    <p><strong>Returns:</strong> Historical performance</p>
                    <p><strong>Risk Metrics:</strong> Volatility and drawdown</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    Why Compare Index Funds?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Even index funds tracking the same benchmark can have different performance.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Cost Differences:</strong> Expense ratios vary significantly</p>
                    <p><strong>Tracking Quality:</strong> Some track better than others</p>
                    <p><strong>Liquidity:</strong> Different fund sizes affect trading</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Selection Criteria
                  </h3>
                  <p className="text-gray-700 mb-4">
                    How to choose the best index fund for your needs.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Low Expense Ratio:</strong> Minimize costs</p>
                    <p><strong>Low Tracking Error:</strong> Better index replication</p>
                    <p><strong>High AUM:</strong> Better liquidity</p>
                    <p><strong>Good Performance:</strong> Consistent returns</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Index Fund Investment Strategy
                </h3>
                <div className="space-y-4 text-indigo-700">
                  <p>
                    <strong>Long-term Approach:</strong> Index funds are ideal for long-term investing 
                    as they provide broad market exposure with minimal costs and management risk.
                  </p>
                  <p>
                    <strong>Diversification:</strong> By tracking market indices, index funds automatically 
                    provide diversification across multiple stocks and sectors.
                  </p>
                  <p>
                    <strong>Cost Efficiency:</strong> Lower expense ratios mean more of your money 
                    stays invested and compounds over time.
                  </p>
                  <p>
                    <strong>Consistent Performance:</strong> Index funds typically outperform most 
                    actively managed funds over the long term due to lower costs.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Best Practices for Index Fund Selection
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Compare Similar Funds:</strong> Only compare index funds that track 
                    the same benchmark for meaningful analysis.
                  </p>
                  <p>
                    <strong>Focus on Costs:</strong> Lower expense ratios directly translate to 
                    higher net returns over time.
                  </p>
                  <p>
                    <strong>Check Tracking Error:</strong> Lower tracking error indicates better 
                    replication of the benchmark index.
                  </p>
                  <p>
                    <strong>Consider Fund Size:</strong> Larger funds typically have better liquidity 
                    and lower trading costs.
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

export default IndexFundReturnComparison;
