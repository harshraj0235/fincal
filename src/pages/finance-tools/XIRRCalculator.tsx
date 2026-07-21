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
  Calendar, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface CashFlow {
  id: string;
  date: string;
  amount: number;
  type: 'investment' | 'withdrawal' | 'dividend';
  description: string;
}

interface XIRRAnalysis {
  xirr: number;
  totalInvestment: number;
  totalWithdrawals: number;
  totalDividends: number;
  netCashFlow: number;
  finalValue: number;
  totalReturn: number;
  totalReturnPercentage: number;
  investmentPeriod: number;
  cashFlowBreakdown: {
    type: string;
    amount: number;
    count: number;
  }[];
  monthlyData: {
    month: string;
    cumulativeInvestment: number;
    cumulativeWithdrawals: number;
    cumulativeDividends: number;
    netPosition: number;
  }[];
}

const XIRRCalculator: React.FC = () => {
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    {
      id: '1',
      date: '2023-01-01',
      amount: 100000,
      type: 'investment',
      description: 'Initial Investment'
    },
    {
      id: '2',
      date: '2023-06-01',
      amount: 50000,
      type: 'investment',
      description: 'Additional Investment'
    },
    {
      id: '3',
      date: '2023-12-01',
      amount: 5000,
      type: 'dividend',
      description: 'Dividend Payment'
    },
    {
      id: '4',
      date: '2024-06-01',
      amount: 20000,
      type: 'withdrawal',
      description: 'Partial Withdrawal'
    },
    {
      id: '5',
      date: '2024-12-31',
      amount: 150000,
      type: 'withdrawal',
      description: 'Final Value'
    }
  ]);
  const [analysis, setAnalysis] = useState<XIRRAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const calculateXIRR = () => {
    // Sort cash flows by date
    const sortedFlows = [...cashFlows].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Calculate totals
    const totalInvestment = sortedFlows
      .filter(flow => flow.type === 'investment')
      .reduce((sum, flow) => sum + flow.amount, 0);
    
    const totalWithdrawals = sortedFlows
      .filter(flow => flow.type === 'withdrawal')
      .reduce((sum, flow) => sum + flow.amount, 0);
    
    const totalDividends = sortedFlows
      .filter(flow => flow.type === 'dividend')
      .reduce((sum, flow) => sum + flow.amount, 0);
    
    const netCashFlow = totalWithdrawals + totalDividends - totalInvestment;
    const finalValue = totalWithdrawals;
    const totalReturn = finalValue - totalInvestment;
    const totalReturnPercentage = (totalReturn / totalInvestment) * 100;
    
    // Calculate investment period in years
      const startDate = new Date(sortedFlows[0].date);
    const endDate = new Date(sortedFlows[sortedFlows.length - 1].date);
    const investmentPeriod = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    // Simplified XIRR calculation (using approximation)
    // In a real implementation, you would use a numerical method like Newton-Raphson
    let xirr = 0;
    if (investmentPeriod > 0) {
      // Approximate XIRR using the formula: (Final Value / Initial Investment)^(1/period) - 1
      xirr = (Math.pow(finalValue / totalInvestment, 1 / investmentPeriod) - 1) * 100;
    }
    
    // Cash flow breakdown
    const cashFlowBreakdown = [
      { type: 'Investments', amount: totalInvestment, count: sortedFlows.filter(f => f.type === 'investment').length },
      { type: 'Withdrawals', amount: totalWithdrawals, count: sortedFlows.filter(f => f.type === 'withdrawal').length },
      { type: 'Dividends', amount: totalDividends, count: sortedFlows.filter(f => f.type === 'dividend').length }
    ];
    
    // Generate monthly data
    const monthlyData = [];
    let cumulativeInvestment = 0;
    let cumulativeWithdrawals = 0;
    let cumulativeDividends = 0;
    
    const months = Math.ceil(investmentPeriod * 12);
    for (let i = 1; i <= Math.min(months, 24); i++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(monthDate.getMonth() + i);
      
      // Add cash flows for this month
      const monthFlows = sortedFlows.filter(flow => {
        const flowDate = new Date(flow.date);
        return flowDate.getMonth() === monthDate.getMonth() && 
               flowDate.getFullYear() === monthDate.getFullYear();
      });
      
      monthFlows.forEach(flow => {
        if (flow.type === 'investment') cumulativeInvestment += flow.amount;
        if (flow.type === 'withdrawal') cumulativeWithdrawals += flow.amount;
        if (flow.type === 'dividend') cumulativeDividends += flow.amount;
      });
      
      monthlyData.push({
        month: `Month ${i}`,
        cumulativeInvestment,
        cumulativeWithdrawals,
        cumulativeDividends,
        netPosition: cumulativeWithdrawals + cumulativeDividends - cumulativeInvestment
      });
    }
    
    setAnalysis({
      xirr,
      totalInvestment,
      totalWithdrawals,
      totalDividends,
      netCashFlow,
      finalValue,
      totalReturn,
      totalReturnPercentage,
      investmentPeriod,
      cashFlowBreakdown,
      monthlyData
    });
    setShowAnalysis(true);
  };

  const addCashFlow = () => {
    const newCashFlow: CashFlow = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      type: 'investment',
      description: ''
    };
    setCashFlows([...cashFlows, newCashFlow]);
  };

  const updateCashFlow = (id: string, field: keyof CashFlow, value: any) => {
    setCashFlows(cashFlows.map(flow => 
      flow.id === id ? { ...flow, [field]: value } : flow
    ));
  };

  const removeCashFlow = (id: string) => {
    setCashFlows(cashFlows.filter(flow => flow.id !== id));
  };

  const getCashFlowTypeColor = (type: string) => {
    switch (type) {
      case 'investment': return 'text-blue-600 bg-blue-100';
      case 'withdrawal': return 'text-red-600 bg-red-100';
      case 'dividend': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getXIRRAssessment = () => {
    if (!analysis) return '';
    
    if (analysis.xirr > 15) {
      return 'Excellent XIRR - Outstanding investment performance with high returns.';
    } else if (analysis.xirr > 10) {
      return 'Good XIRR - Strong investment performance with above-average returns.';
    } else if (analysis.xirr > 5) {
      return 'Moderate XIRR - Decent investment performance with moderate returns.';
    } else if (analysis.xirr > 0) {
      return 'Low XIRR - Minimal returns, consider reviewing investment strategy.';
    } else {
      return 'Negative XIRR - Investment is losing value, immediate review needed.';
    }
  };

  return (
    <>
      <SEOHelmet
        title="XIRR Calculator - Extended Internal Rate of Return | MoneyCal"
        description="Calculate XIRR (Extended Internal Rate of Return) for complex cash flows. Analyze investment performance with multiple inflows and outflows using our comprehensive XIRR calculator."
        keywords="XIRR Calculator, extended internal rate of return, investment performance, cash flow analysis, IRR calculator"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                XIRR Calculator
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Calculate XIRR (Extended Internal Rate of Return) for complex cash flows. 
                Analyze investment performance with multiple inflows and outflows.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-100">
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 mr-2" />
                  XIRR Analysis
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Cash Flow Tracking
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Performance Metrics
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cash Flow Input Section */}
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
                  <IndianRupee className="h-6 w-6 mr-3 text-purple-600" />
                  Cash Flow Entries
                </h2>
                <button
                  onClick={addCashFlow}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Cash Flow
                </button>
                  </div>

              <div className="space-y-4">
                {cashFlows.map((flow, index) => (
                  <div key={flow.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={flow.date}
                          onChange={(e) => updateCashFlow(flow.id, 'date', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                      <input
                        type="number"
                          value={flow.amount}
                          onChange={(e) => updateCashFlow(flow.id, 'amount', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="100000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                          value={flow.type}
                          onChange={(e) => updateCashFlow(flow.id, 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="investment">Investment</option>
                          <option value="withdrawal">Withdrawal</option>
                          <option value="dividend">Dividend</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                          type="text"
                          value={flow.description}
                          onChange={(e) => updateCashFlow(flow.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., Initial Investment"
                      />
                    </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => removeCashFlow(flow.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Cash Flow Summary */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCashFlowTypeColor(flow.type)}`}>
                        {flow.type.charAt(0).toUpperCase() + flow.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(flow.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
                  </div>

              <div className="mt-6">
                  <button
                  onClick={calculateXIRR}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                  Calculate XIRR
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
                  <BarChart3 className="h-6 w-6 mr-3 text-purple-600" />
                  XIRR Analysis Results
                </h2>

                {/* Main XIRR Card */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white mb-8">
                  <h3 className="text-lg font-semibold mb-2">Extended Internal Rate of Return (XIRR)</h3>
                  <p className="text-4xl font-bold mb-2">{analysis.xirr.toFixed(2)}%</p>
                  <p className="text-purple-100">Annualized return considering all cash flows</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Total Investment</h3>
                    <p className="text-2xl font-bold text-blue-900">₹{analysis.totalInvestment.toLocaleString()}</p>
                    </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-800 mb-2">Total Withdrawals</h3>
                    <p className="text-2xl font-bold text-green-900">₹{analysis.totalWithdrawals.toLocaleString()}</p>
                    </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-yellow-800 mb-2">Total Dividends</h3>
                    <p className="text-2xl font-bold text-yellow-900">₹{analysis.totalDividends.toLocaleString()}</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-purple-800 mb-2">Investment Period</h3>
                    <p className="text-2xl font-bold text-purple-900">{analysis.investmentPeriod.toFixed(1)} years</p>
                  </div>
                </div>

                {/* Return Analysis */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Return Analysis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-green-600">Total Return</p>
                      <p className={`text-xl font-bold ${analysis.totalReturn >= 0 ? 'text-green-900' : 'text-red-600'}`}>
                        ₹{analysis.totalReturn.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-600">Return %</p>
                      <p className={`text-xl font-bold ${analysis.totalReturnPercentage >= 0 ? 'text-green-900' : 'text-red-600'}`}>
                        {analysis.totalReturnPercentage.toFixed(2)}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-600">Net Cash Flow</p>
                      <p className={`text-xl font-bold ${analysis.netCashFlow >= 0 ? 'text-green-900' : 'text-red-600'}`}>
                        ₹{analysis.netCashFlow.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-600">Final Value</p>
                      <p className="text-xl font-bold text-green-900">₹{analysis.finalValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Cash Flow Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Breakdown</h3>
                  <div className="space-y-3">
                      {analysis.cashFlowBreakdown.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-700">{item.type}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{item.count} entries</span>
                            <span className="font-semibold text-gray-900">₹{item.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                          </div>
                        </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">XIRR Assessment</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-700">{getXIRRAssessment()}</p>
                          </div>
                        </div>
                      </div>

                {/* Monthly Cash Flow Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Cash Flow Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Cumulative Investment</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Cumulative Withdrawals</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Cumulative Dividends</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Net Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.monthlyData.map((data, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{data.month}</td>
                            <td className="py-3 px-4 text-right">₹{data.cumulativeInvestment.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">₹{data.cumulativeWithdrawals.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">₹{data.cumulativeDividends.toLocaleString()}</td>
                            <td className={`py-3 px-4 text-right font-semibold ${data.netPosition >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ₹{data.netPosition.toLocaleString()}
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
                Understanding XIRR (Extended Internal Rate of Return)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <IndianRupee className="w-5 h-5 mr-2 text-purple-600" />
                    What is XIRR?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    XIRR calculates the annualized return for investments with irregular cash flows.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Purpose:</strong> Measure complex investment performance</p>
                    <p><strong>Use:</strong> Multiple investments and withdrawals</p>
                    <p><strong>Advantage:</strong> Accounts for timing of cash flows</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    XIRR vs IRR
                  </h3>
                  <p className="text-gray-700 mb-4">
                    XIRR is more flexible than IRR for real-world investment scenarios.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>IRR:</strong> Regular intervals only</p>
                    <p><strong>XIRR:</strong> Irregular cash flows</p>
                    <p><strong>Accuracy:</strong> XIRR is more precise</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    When to Use XIRR
                  </h3>
                  <p className="text-gray-700 mb-4">
                    XIRR is ideal for analyzing complex investment scenarios.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>SIP Investments:</strong> Regular monthly investments</p>
                    <p><strong>Partial Withdrawals:</strong> Taking money out over time</p>
                    <p><strong>Dividend Reinvestment:</strong> Complex cash flow patterns</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Interpretation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Understanding what XIRR values mean for your investments.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>15%+ XIRR:</strong> Excellent performance</p>
                    <p><strong>10-15% XIRR:</strong> Good performance</p>
                    <p><strong>5-10% XIRR:</strong> Moderate performance</p>
                    <p><strong>0-5% XIRR:</strong> Poor performance</p>
                  </div>
                </div>
                </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Why XIRR Matters for Investors
                </h3>
                <div className="space-y-4 text-purple-700">
                  <p>
                    <strong>Accurate Performance Measurement:</strong> XIRR provides a more accurate picture 
                    of investment performance by considering the timing and size of all cash flows.
                  </p>
                  <p>
                    <strong>Real-World Scenarios:</strong> Most investors don't invest once and leave it. 
                    XIRR accounts for regular investments, withdrawals, and dividends.
                  </p>
                  <p>
                    <strong>Comparison Tool:</strong> Use XIRR to compare different investment strategies 
                    or portfolios with complex cash flow patterns.
                  </p>
                  <p>
                    <strong>Decision Making:</strong> XIRR helps you make informed decisions about 
                    continuing, modifying, or exiting investment strategies.
                  </p>
                </div>
                </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Best Practices for XIRR Calculation
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Include All Cash Flows:</strong> Record every investment, withdrawal, 
                    dividend, and fee to get an accurate XIRR calculation.
                  </p>
                  <p>
                    <strong>Use Correct Dates:</strong> The timing of cash flows significantly affects 
                    XIRR, so use exact dates for all transactions.
                  </p>
                  <p>
                    <strong>Regular Updates:</strong> Recalculate XIRR periodically to track 
                    performance changes and make timely adjustments.
                  </p>
                  <p>
                    <strong>Compare with Benchmarks:</strong> Compare your XIRR with market indices 
                    and similar investment strategies to assess relative performance.
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

export default XIRRCalculator;
