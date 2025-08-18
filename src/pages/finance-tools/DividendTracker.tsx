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
  Receipt
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface DividendStock {
  id: string;
  symbol: string;
  companyName: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  dividendPerShare: number;
  dividendYield: number;
  dividendFrequency: 'quarterly' | 'semi-annual' | 'annual';
  lastDividendDate: string;
  nextDividendDate: string;
}

interface DividendAnalysis {
  totalInvestment: number;
  currentValue: number;
  totalDividends: number;
  dividendYield: number;
  annualDividendIncome: number;
  monthlyDividendIncome: number;
  totalReturn: number;
  totalReturnPercentage: number;
  dividendStocks: DividendStock[];
  monthlyDividendData: {
    month: string;
    dividendIncome: number;
    cumulativeIncome: number;
  }[];
}

const DividendTracker: React.FC = () => {
  const [stocks, setStocks] = useState<DividendStock[]>([
    {
      id: '1',
      symbol: 'RELIANCE',
      companyName: 'Reliance Industries Ltd',
      shares: 100,
      avgPrice: 2500,
      currentPrice: 2800,
      dividendPerShare: 10,
      dividendYield: 0.36,
      dividendFrequency: 'quarterly',
      lastDividendDate: '2024-12-01',
      nextDividendDate: '2025-03-01'
    },
    {
      id: '2',
      symbol: 'HDFCBANK',
      companyName: 'HDFC Bank Ltd',
      shares: 50,
      avgPrice: 1600,
      currentPrice: 1700,
      dividendPerShare: 19,
      dividendYield: 4.47,
      dividendFrequency: 'annual',
      lastDividendDate: '2024-07-15',
      nextDividendDate: '2025-07-15'
    }
  ]);
  const [analysis, setAnalysis] = useState<DividendAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const calculateAnalysis = () => {
    const totalInvestment = stocks.reduce((sum, stock) => sum + (stock.shares * stock.avgPrice), 0);
    const currentValue = stocks.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
    
    // Calculate total dividends
    const totalDividends = stocks.reduce((sum, stock) => {
      const annualDividend = stock.dividendPerShare * stock.shares;
      let multiplier = 1;
      
      switch (stock.dividendFrequency) {
        case 'quarterly':
          multiplier = 4;
          break;
        case 'semi-annual':
          multiplier = 2;
          break;
        case 'annual':
          multiplier = 1;
          break;
      }
      
      return sum + (annualDividend * multiplier);
    }, 0);
    
    const dividendYield = (totalDividends / totalInvestment) * 100;
    const annualDividendIncome = totalDividends;
    const monthlyDividendIncome = annualDividendIncome / 12;
    const totalReturn = currentValue + totalDividends - totalInvestment;
    const totalReturnPercentage = (totalReturn / totalInvestment) * 100;
    
    // Generate monthly dividend data
    const monthlyDividendData = [];
    let cumulativeIncome = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthDividend = stocks.reduce((sum, stock) => {
        const annualDividend = stock.dividendPerShare * stock.shares;
        let monthlyDividend = 0;
        
        switch (stock.dividendFrequency) {
          case 'quarterly':
            if (month % 3 === 0) monthlyDividend = annualDividend / 4;
            break;
          case 'semi-annual':
            if (month % 6 === 0) monthlyDividend = annualDividend / 2;
            break;
          case 'annual':
            if (month === 12) monthlyDividend = annualDividend;
            break;
        }
        
        return sum + monthlyDividend;
      }, 0);
      
      cumulativeIncome += monthDividend;
      
      monthlyDividendData.push({
        month: `Month ${month}`,
        dividendIncome: monthDividend,
        cumulativeIncome
      });
    }
    
    setAnalysis({
      totalInvestment,
      currentValue,
      totalDividends,
      dividendYield,
      annualDividendIncome,
      monthlyDividendIncome,
      totalReturn,
      totalReturnPercentage,
      dividendStocks: stocks,
      monthlyDividendData
    });
    setShowAnalysis(true);
  };

  const addStock = () => {
    const newStock: DividendStock = {
        id: Date.now().toString(),
      symbol: '',
      companyName: '',
        shares: 0,
      avgPrice: 0,
      currentPrice: 0,
        dividendPerShare: 0,
      dividendYield: 0,
      dividendFrequency: 'quarterly',
      lastDividendDate: new Date().toISOString().split('T')[0],
      nextDividendDate: new Date().toISOString().split('T')[0]
    };
    setStocks([...stocks, newStock]);
  };

  const updateStock = (id: string, field: keyof DividendStock, value: any) => {
    setStocks(stocks.map(stock => {
      if (stock.id === id) {
        const updatedStock = { ...stock, [field]: value };
        
        // Auto-calculate dividend yield
        if (field === 'dividendPerShare' || field === 'currentPrice') {
          if (updatedStock.currentPrice > 0) {
            updatedStock.dividendYield = (updatedStock.dividendPerShare / updatedStock.currentPrice) * 100;
          }
        }
        
        return updatedStock;
      }
      return stock;
    }));
  };

  const removeStock = (id: string) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  const getDividendFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'quarterly': return 'text-green-600 bg-green-100';
      case 'semi-annual': return 'text-yellow-600 bg-yellow-100';
      case 'annual': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getReturnColor = (returnValue: number) => {
    return returnValue >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <>
      <SEOHelmet
        title="Dividend Tracker - Track Dividend Income & Returns | MoneyCal"
        description="Track your dividend income and analyze dividend stock performance. Monitor dividend yields, income streams, and total returns with our comprehensive dividend tracking tool."
        keywords="dividend tracker, dividend income, dividend yield calculator, dividend stock analysis, passive income tracker"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Dividend Tracker
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Track your dividend income and analyze dividend stock performance. 
                Monitor dividend yields, income streams, and total returns.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-green-100">
                <div className="flex items-center">
                  <Receipt className="w-4 h-4 mr-2" />
                  Dividend Income
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Yield Analysis
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Performance Tracking
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stock Input Section */}
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
                  <Calculator className="h-6 w-6 mr-3 text-green-600" />
                  Dividend Stocks
                </h2>
                <button
                  onClick={addStock}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Stock
                </button>
              </div>

              <div className="space-y-4">
                {stocks.map((stock, index) => (
                  <div key={stock.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
                        <input
                          type="text"
                          value={stock.symbol}
                          onChange={(e) => updateStock(stock.id, 'symbol', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="RELIANCE"
                        />
                      </div>
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                          value={stock.companyName}
                          onChange={(e) => updateStock(stock.id, 'companyName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Reliance Industries"
                    />
                  </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shares</label>
                      <input
                        type="number"
                          value={stock.shares}
                          onChange={(e) => updateStock(stock.id, 'shares', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="100"
                      />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avg Price</label>
                        <input
                          type="number"
                          value={stock.avgPrice}
                          onChange={(e) => updateStock(stock.id, 'avgPrice', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="2500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Price</label>
                      <input
                        type="number"
                          value={stock.currentPrice}
                          onChange={(e) => updateStock(stock.id, 'currentPrice', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="2800"
                      />
                    </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dividend/Share</label>
                        <input
                          type="number"
                          value={stock.dividendPerShare}
                          onChange={(e) => updateStock(stock.id, 'dividendPerShare', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="10"
                        />
                  </div>
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select
                          value={stock.dividendFrequency}
                          onChange={(e) => updateStock(stock.id, 'dividendFrequency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="quarterly">Quarterly</option>
                      <option value="semi-annual">Semi-Annual</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => removeStock(stock.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                          Remove
                        </button>
                    </div>
                  </div>

                    {/* Stock Summary */}
                    <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <span className="text-gray-600">Dividend Yield:</span>
                        <span className="ml-1 font-semibold text-green-600">{stock.dividendYield.toFixed(2)}%</span>
                      </div>
                      <div className="text-center">
                        <span className="text-gray-600">Total Value:</span>
                        <span className="ml-1 font-semibold">₹{(stock.shares * stock.currentPrice).toLocaleString()}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-gray-600">Annual Dividend:</span>
                        <span className="ml-1 font-semibold text-green-600">₹{(stock.dividendPerShare * stock.shares).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                  <button
                  onClick={calculateAnalysis}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                  Analyze Dividend Portfolio
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
                  <BarChart3 className="h-6 w-6 mr-3 text-green-600" />
                  Dividend Portfolio Analysis
                </h2>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Total Investment</h3>
                    <p className="text-2xl font-bold text-blue-900">₹{analysis.totalInvestment.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-800 mb-2">Annual Dividend Income</h3>
                    <p className="text-2xl font-bold text-green-900">₹{analysis.annualDividendIncome.toLocaleString()}</p>
                    </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-purple-800 mb-2">Dividend Yield</h3>
                    <p className="text-2xl font-bold text-purple-900">{analysis.dividendYield.toFixed(2)}%</p>
                    </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-orange-800 mb-2">Total Return</h3>
                    <p className={`text-2xl font-bold ${getReturnColor(analysis.totalReturn)}`}>
                      ₹{analysis.totalReturn.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Monthly Dividend Income */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Monthly Dividend Income</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-green-600">Monthly Average</p>
                      <p className="text-xl font-bold text-green-900">₹{analysis.monthlyDividendIncome.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-600">Current Value</p>
                      <p className="text-xl font-bold text-green-900">₹{analysis.currentValue.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-600">Total Dividends</p>
                      <p className="text-xl font-bold text-green-900">₹{analysis.totalDividends.toLocaleString()}</p>
                  </div>
                    <div className="text-center">
                      <p className="text-sm text-green-600">Return %</p>
                      <p className={`text-xl font-bold ${getReturnColor(analysis.totalReturnPercentage)}`}>
                        {analysis.totalReturnPercentage.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Monthly Dividend Chart */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Dividend Income Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Dividend Income</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Cumulative Income</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.monthlyDividendData.map((data, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{data.month}</td>
                            <td className="py-3 px-4 text-right text-green-600 font-semibold">
                              ₹{data.dividendIncome.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right font-semibold">
                              ₹{data.cumulativeIncome.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                            </div>
                          </div>

                {/* Stock Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Individual Stock Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Shares</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Current Value</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Dividend/Share</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Annual Dividend</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Yield</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.dividendStocks.map((stock, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{stock.symbol}</p>
                                <p className="text-xs text-gray-600">{stock.companyName}</p>
                          </div>
                            </td>
                            <td className="py-3 px-4 text-right">{stock.shares}</td>
                            <td className="py-3 px-4 text-right">₹{(stock.shares * stock.currentPrice).toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">₹{stock.dividendPerShare}</td>
                            <td className="py-3 px-4 text-right text-green-600 font-semibold">
                              ₹{(stock.dividendPerShare * stock.shares).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right font-semibold text-green-600">
                              {stock.dividendYield.toFixed(2)}%
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDividendFrequencyColor(stock.dividendFrequency)}`}>
                                {stock.dividendFrequency}
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
                Understanding Dividend Investing
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Receipt className="w-5 h-5 mr-2 text-green-600" />
                    What are Dividends?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Regular payments made by companies to shareholders from profits.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Source:</strong> Company profits</p>
                    <p><strong>Frequency:</strong> Quarterly, semi-annual, or annual</p>
                    <p><strong>Benefit:</strong> Passive income stream</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Percent className="w-5 h-5 mr-2 text-blue-600" />
                    Dividend Yield
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Annual dividend income as a percentage of current stock price.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Formula:</strong> (Annual Dividend / Current Price) × 100</p>
                    <p><strong>High Yield:</strong> 4%+ (higher risk)</p>
                    <p><strong>Low Yield:</strong> 1-3% (lower risk)</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Dividend Investing Benefits
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Advantages of focusing on dividend-paying stocks.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Passive Income:</strong> Regular cash flow</p>
                    <p><strong>Compounding:</strong> Reinvest dividends</p>
                    <p><strong>Stability:</strong> Less volatile than growth stocks</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Risk Considerations
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Important factors to consider in dividend investing.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Dividend Cuts:</strong> Companies can reduce dividends</p>
                    <p><strong>Market Risk:</strong> Stock prices can fall</p>
                    <p><strong>Taxation:</strong> Dividends are taxable income</p>
                  </div>
                </div>
                </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Dividend Investing Strategies
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Dividend Growth Investing:</strong> Focus on companies that consistently increase 
                    their dividend payments over time, providing growing income streams.
                  </p>
                  <p>
                    <strong>High-Yield Investing:</strong> Target stocks with above-average dividend yields 
                    for maximum current income, though this often comes with higher risk.
                  </p>
                  <p>
                    <strong>Dividend Aristocrats:</strong> Invest in companies that have increased dividends 
                    for 25+ consecutive years, indicating financial stability and commitment to shareholders.
                  </p>
                  <p>
                    <strong>DRIP (Dividend Reinvestment):</strong> Automatically reinvest dividends to 
                    purchase additional shares, accelerating wealth building through compounding.
                  </p>
                </div>
                </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Best Practices for Dividend Investing
                </h3>
                <div className="space-y-4 text-blue-700">
                  <p>
                    <strong>Diversification:</strong> Spread investments across different sectors and 
                    companies to reduce risk and ensure consistent dividend income.
                  </p>
                  <p>
                    <strong>Quality Over Yield:</strong> Focus on financially strong companies with 
                    sustainable dividend policies rather than just high yields.
                  </p>
                  <p>
                    <strong>Regular Monitoring:</strong> Track dividend payments, company financials, 
                    and market conditions to make informed decisions.
                  </p>
                  <p>
                    <strong>Long-term Perspective:</strong> Dividend investing works best as a long-term 
                    strategy, allowing time for compounding and dividend growth.
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

export default DividendTracker;
