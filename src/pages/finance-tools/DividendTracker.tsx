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
  Calendar,
  Target
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface DividendStock {
  id: string;
  name: string;
  shares: number;
  dividendPerShare: number;
  frequency: 'quarterly' | 'semi-annual' | 'annual';
  lastDividendDate: string;
  nextDividendDate: string;
  color: string;
}

const DividendTracker: React.FC = () => {
  const [stocks, setStocks] = useState<DividendStock[]>([
    {
      id: '1',
      name: 'HDFC Bank',
      shares: 100,
      dividendPerShare: 19.5,
      frequency: 'quarterly',
      lastDividendDate: '2024-12-15',
      nextDividendDate: '2025-03-15',
      color: '#3B82F6'
    },
    {
      id: '2',
      name: 'ITC Limited',
      shares: 50,
      dividendPerShare: 12.5,
      frequency: 'quarterly',
      lastDividendDate: '2024-11-20',
      nextDividendDate: '2025-02-20',
      color: '#10B981'
    },
    {
      id: '3',
      name: 'Reliance Industries',
      shares: 25,
      dividendPerShare: 9.0,
      frequency: 'quarterly',
      lastDividendDate: '2024-12-10',
      nextDividendDate: '2025-03-10',
      color: '#F59E0B'
    }
  ]);

  const [newStock, setNewStock] = useState({
    name: '',
    shares: 0,
    dividendPerShare: 0,
    frequency: 'quarterly' as const,
    lastDividendDate: '',
    nextDividendDate: ''
  });

  const addStock = () => {
    if (newStock.name && newStock.shares > 0 && newStock.dividendPerShare > 0) {
      const stock: DividendStock = {
        id: Date.now().toString(),
        name: newStock.name,
        shares: newStock.shares,
        dividendPerShare: newStock.dividendPerShare,
        frequency: newStock.frequency,
        lastDividendDate: newStock.lastDividendDate,
        nextDividendDate: newStock.nextDividendDate,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      };
      setStocks([...stocks, stock]);
      setNewStock({
        name: '',
        shares: 0,
        dividendPerShare: 0,
        frequency: 'quarterly',
        lastDividendDate: '',
        nextDividendDate: ''
      });
    }
  };

  const removeStock = (id: string) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  const calculateMetrics = () => {
    const totalShares = stocks.reduce((sum, stock) => sum + stock.shares, 0);
    const totalDividendIncome = stocks.reduce((sum, stock) => {
      const annualDividend = stock.dividendPerShare * stock.shares;
      const frequencyMultiplier = stock.frequency === 'quarterly' ? 4 : stock.frequency === 'semi-annual' ? 2 : 1;
      return sum + (annualDividend * frequencyMultiplier);
    }, 0);

    const averageDividendYield = stocks.length > 0 ? 
      stocks.reduce((sum, stock) => sum + stock.dividendPerShare, 0) / stocks.length : 0;

    const monthlyDividendIncome = totalDividendIncome / 12;
    const quarterlyDividendIncome = totalDividendIncome / 4;

    const nextDividendDate = stocks.length > 0 ? 
      stocks.reduce((earliest, stock) => 
        new Date(stock.nextDividendDate) < new Date(earliest.nextDividendDate) ? stock : earliest
      ).nextDividendDate : '';

    return {
      totalShares,
      totalDividendIncome,
      averageDividendYield,
      monthlyDividendIncome,
      quarterlyDividendIncome,
      nextDividendDate
    };
  };

  const result = calculateMetrics();

  return (
    <>
      <SEOHelmet
        title="Dividend Tracker - Track Dividend Income & Yields | MoneyCal"
        description="Track your dividend income, yields, and upcoming dividend payments. Monitor your dividend portfolio with our comprehensive dividend tracker."
        keywords="dividend tracker, dividend income, dividend yield, dividend calculator, dividend portfolio, dividend payments"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-600 via-blue-600 to-green-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-green-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Dividend Tracker
              </h1>
              <p className="text-lg md:text-xl text-green-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Track your dividend income, yields, and upcoming dividend payments
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
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-green-600" />
                  Add Dividend Stock
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Name
                    </label>
                    <input
                      type="text"
                      value={newStock.name}
                      onChange={(e) => setNewStock({...newStock, name: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      placeholder="e.g., HDFC Bank"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Shares
                      </label>
                      <input
                        type="number"
                        value={newStock.shares}
                        onChange={(e) => setNewStock({...newStock, shares: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dividend per Share (₹)
                      </label>
                      <input
                        type="number"
                        value={newStock.dividendPerShare}
                        onChange={(e) => setNewStock({...newStock, dividendPerShare: Number(e.target.value)})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                        placeholder="19.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dividend Frequency
                    </label>
                    <select
                      value={newStock.frequency}
                      onChange={(e) => setNewStock({...newStock, frequency: e.target.value as any})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    >
                      <option value="quarterly">Quarterly</option>
                      <option value="semi-annual">Semi-Annual</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Dividend Date
                      </label>
                      <input
                        type="date"
                        value={newStock.lastDividendDate}
                        onChange={(e) => setNewStock({...newStock, lastDividendDate: e.target.value})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Next Dividend Date
                      </label>
                      <input
                        type="date"
                        value={newStock.nextDividendDate}
                        onChange={(e) => setNewStock({...newStock, nextDividendDate: e.target.value})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <button
                    onClick={addStock}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm md:text-base"
                  >
                    Add Stock
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
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Dividend Portfolio</h3>
                    <DollarSign className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">₹{result.totalDividendIncome.toLocaleString()}</div>
                      <p className="text-green-100 text-sm">Annual Dividend Income</p>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">{result.totalShares}</div>
                      <p className="text-green-100 text-sm">Total Shares</p>
                    </div>
                  </div>
                  <div className="mt-4 p-2 rounded-lg text-sm bg-green-500/20">
                    Next Dividend: {result.nextDividendDate ? new Date(result.nextDividendDate).toLocaleDateString() : 'No upcoming dividends'}
                  </div>
                </div>

                {/* Monthly/Quarterly Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Monthly Income</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-blue-600 mb-1">
                      ₹{result.monthlyDividendIncome.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Average monthly dividend</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Target className="h-4 w-4 md:h-5 md:w-5 text-purple-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Quarterly Income</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-purple-600 mb-1">
                      ₹{result.quarterlyDividendIncome.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Average quarterly dividend</p>
                  </div>
                </div>

                {/* Stock List */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
                    Dividend Stocks ({stocks.length})
                  </h4>
                  <div className="space-y-3">
                    {stocks.map((stock) => {
                      const annualDividend = stock.dividendPerShare * stock.shares;
                      const frequencyMultiplier = stock.frequency === 'quarterly' ? 4 : stock.frequency === 'semi-annual' ? 2 : 1;
                      const totalAnnualDividend = annualDividend * frequencyMultiplier;
                      
                      return (
                        <div key={stock.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-3" 
                              style={{ backgroundColor: stock.color }}
                            ></div>
                            <div>
                              <div className="font-medium text-sm">{stock.name}</div>
                              <div className="text-xs text-gray-500">{stock.shares} shares • ₹{stock.dividendPerShare}/share</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-sm">₹{totalAnnualDividend.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">{stock.frequency}</div>
                            <button
                              onClick={() => removeStock(stock.id)}
                              className="text-xs text-red-500 hover:text-red-700 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {stocks.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No dividend stocks added yet
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
                to="/finance-tools/portfolio-diversification-visualizer"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-3 md:mb-4">
                  <PieChart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Portfolio Diversification Visualizer</h3>
                <p className="text-gray-600 text-xs md:text-sm">Visualize and analyze your portfolio diversification across asset classes</p>
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
                to="/finance-tools/fd-vs-mutual-fund-return-tool"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">FD vs Mutual Fund Return Tool</h3>
                <p className="text-gray-600 text-xs md:text-sm">Compare Fixed Deposit vs Mutual Fund returns with tax implications</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DividendTracker;
