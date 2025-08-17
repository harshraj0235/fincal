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
  Plus,
  Minus
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface CashFlow {
  id: string;
  amount: number;
  date: string;
  type: 'investment' | 'withdrawal' | 'dividend';
}

const XIRRCalculator: React.FC = () => {
  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    {
      id: '1',
      amount: -10000,
      date: '2024-01-01',
      type: 'investment'
    },
    {
      id: '2',
      amount: 500,
      date: '2024-04-01',
      type: 'dividend'
    },
    {
      id: '3',
      amount: 500,
      date: '2024-07-01',
      type: 'dividend'
    },
    {
      id: '4',
      amount: 500,
      date: '2024-10-01',
      type: 'dividend'
    },
    {
      id: '5',
      amount: 12000,
      date: '2024-12-31',
      type: 'withdrawal'
    }
  ]);

  const [newCashFlow, setNewCashFlow] = useState({
    amount: 0,
    date: '',
    type: 'investment' as const
  });

  const addCashFlow = () => {
    if (newCashFlow.amount !== 0 && newCashFlow.date) {
      const cashFlow: CashFlow = {
        id: Date.now().toString(),
        amount: newCashFlow.amount,
        date: newCashFlow.date,
        type: newCashFlow.type
      };
      setCashFlows([...cashFlows, cashFlow]);
      setNewCashFlow({
        amount: 0,
        date: '',
        type: 'investment'
      });
    }
  };

  const removeCashFlow = (id: string) => {
    setCashFlows(cashFlows.filter(cf => cf.id !== id));
  };

  const calculateXIRR = () => {
    // Sort cash flows by date
    const sortedFlows = [...cashFlows].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (sortedFlows.length < 2) return null;

    // Simple XIRR calculation using Newton-Raphson method
    let guess = 0.1; // 10% initial guess
    const tolerance = 0.0001;
    const maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let derivative = 0;
      const startDate = new Date(sortedFlows[0].date);

      for (const flow of sortedFlows) {
        const days = (new Date(flow.date).getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        const years = days / 365;
        
        npv += flow.amount / Math.pow(1 + guess, years);
        derivative += -years * flow.amount / Math.pow(1 + guess, years + 1);
      }

      const newGuess = guess - npv / derivative;
      
      if (Math.abs(newGuess - guess) < tolerance) {
        return newGuess * 100; // Convert to percentage
      }
      
      guess = newGuess;
    }

    return null; // No convergence
  };

  const xirr = calculateXIRR();

  const calculateMetrics = () => {
    const totalInvestment = cashFlows
      .filter(cf => cf.type === 'investment')
      .reduce((sum, cf) => sum + Math.abs(cf.amount), 0);
    
    const totalWithdrawal = cashFlows
      .filter(cf => cf.type === 'withdrawal')
      .reduce((sum, cf) => sum + cf.amount, 0);
    
    const totalDividend = cashFlows
      .filter(cf => cf.type === 'dividend')
      .reduce((sum, cf) => sum + cf.amount, 0);
    
    const netReturn = totalWithdrawal + totalDividend - totalInvestment;
    const totalReturn = totalWithdrawal + totalDividend;
    
    const startDate = cashFlows.length > 0 ? new Date(Math.min(...cashFlows.map(cf => new Date(cf.date).getTime()))) : new Date();
    const endDate = cashFlows.length > 0 ? new Date(Math.max(...cashFlows.map(cf => new Date(cf.date).getTime()))) : new Date();
    const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

    return {
      totalInvestment,
      totalWithdrawal,
      totalDividend,
      netReturn,
      totalReturn,
      years: Math.max(years, 0.1),
      startDate,
      endDate
    };
  };

  const result = calculateMetrics();

  return (
    <>
      <SEOHelmet
        title="XIRR Calculator - Extended Internal Rate of Return | MoneyCal"
        description="Calculate Extended Internal Rate of Return (XIRR) for irregular cash flows. Analyze investment performance with our comprehensive XIRR calculator."
        keywords="XIRR calculator, extended internal rate of return, investment performance, cash flow analysis, IRR calculator"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-blue-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                XIRR Calculator
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Calculate Extended Internal Rate of Return for irregular cash flows
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
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-blue-600" />
                  Add Cash Flow
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cash Flow Type
                    </label>
                    <select
                      value={newCashFlow.type}
                      onChange={(e) => setNewCashFlow({...newCashFlow, type: e.target.value as any})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    >
                      <option value="investment">Investment (Negative)</option>
                      <option value="withdrawal">Withdrawal (Positive)</option>
                      <option value="dividend">Dividend/Income (Positive)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={newCashFlow.amount}
                        onChange={(e) => setNewCashFlow({...newCashFlow, amount: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                        placeholder="10000"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {newCashFlow.type === 'investment' ? 'Use negative value (e.g., -10000)' : 'Use positive value'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={newCashFlow.date}
                        onChange={(e) => setNewCashFlow({...newCashFlow, date: e.target.value})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <button
                    onClick={addCashFlow}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base"
                  >
                    Add Cash Flow
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
                {/* XIRR Result */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">XIRR Result</h3>
                    <Target className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {xirr !== null ? `${xirr.toFixed(2)}%` : 'N/A'}
                    </div>
                    <p className="text-blue-100 text-sm md:text-base">
                      Extended Internal Rate of Return
                    </p>
                    {xirr === null && (
                      <p className="text-yellow-200 text-xs mt-2">
                        Insufficient data or no convergence
                      </p>
                    )}
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Minus className="h-4 w-4 md:h-5 md:w-5 text-red-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Total Investment</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-red-600 mb-1">
                      ₹{result.totalInvestment.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Total amount invested</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Plus className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Total Return</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                      ₹{result.totalReturn.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Withdrawals + Dividends</p>
                  </div>
                </div>

                {/* Net Return */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Investment Analysis
                  </h4>
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Net Return:</span>
                      <span className={`font-semibold ${result.netReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{result.netReturn.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Period:</span>
                      <span className="font-semibold text-gray-900">
                        {result.years.toFixed(1)} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Dividends:</span>
                      <span className="font-semibold text-green-600">
                        ₹{result.totalDividend.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Withdrawals:</span>
                      <span className="font-semibold text-blue-600">
                        ₹{result.totalWithdrawal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cash Flows List */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Cash Flows ({cashFlows.length})
                  </h4>
                  <div className="space-y-3">
                    {cashFlows.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((flow) => (
                      <div key={flow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            flow.type === 'investment' ? 'bg-red-500' : 
                            flow.type === 'withdrawal' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <div className="font-medium text-sm">{flow.type.charAt(0).toUpperCase() + flow.type.slice(1)}</div>
                            <div className="text-xs text-gray-500">{new Date(flow.date).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold text-sm ${flow.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{flow.amount.toLocaleString()}
                          </div>
                          <button
                            onClick={() => removeCashFlow(flow.id)}
                            className="text-xs text-red-500 hover:text-red-700 mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {cashFlows.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No cash flows added yet
                      </div>
                    )}
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
                to="/finance-tools/stock-cagr-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Stock CAGR Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate Compound Annual Growth Rate for stock investments</p>
              </Link>

              <Link
                to="/finance-tools/portfolio-diversification-visualizer"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
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

export default XIRRCalculator;
