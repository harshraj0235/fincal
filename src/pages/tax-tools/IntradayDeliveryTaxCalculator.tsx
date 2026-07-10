import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, TrendingDown, Info, AlertCircle, Activity } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface TradingResult {
  type: 'Intraday' | 'Delivery';
  totalTrades: number;
  profitableTrades: number;
  lossTrades: number;
  grossProfit: number;
  grossLoss: number;
  netProfit: number;
  taxAmount: number;
  netAmount: number;
  taxRate: number;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const IntradayDeliveryTaxCalculator: React.FC = () => {
  const [tradingType, setTradingType] = useState<'intraday' | 'delivery'>('intraday');
  const [totalTrades, setTotalTrades] = useState('');
  const [profitableTrades, setProfitableTrades] = useState('');
  const [averageProfit, setAverageProfit] = useState('');
  const [averageLoss, setAverageLoss] = useState('');
  const [result, setResult] = useState<TradingResult | null>(null);

  const calculateTax = () => {
    if (!totalTrades || !profitableTrades || !averageProfit || !averageLoss) {
      alert('Please fill in all fields');
      return;
    }

    const total = parseInt(totalTrades);
    const profitable = parseInt(profitableTrades);
    const lossTrades = total - profitable;
    const avgProfit = parseFloat(averageProfit);
    const avgLoss = parseFloat(averageLoss);

    if (profitable > total) {
      alert('Profitable trades cannot be more than total trades');
      return;
    }

    const grossProfit = profitable * avgProfit;
    const grossLoss = lossTrades * avgLoss;
    const netProfit = grossProfit - grossLoss;

    if (netProfit <= 0) {
      setResult({
        type: tradingType === 'intraday' ? 'Intraday' : 'Delivery',
        totalTrades: total,
        profitableTrades: profitable,
        lossTrades: lossTrades,
        grossProfit: grossProfit,
        grossLoss: grossLoss,
        netProfit: netProfit,
        taxAmount: 0,
        netAmount: netProfit,
        taxRate: 0,
        description: 'No tax on losses',
        color: 'text-green-600',
        icon: <TrendingDown className="h-5 w-5" />
      });
      return;
    }

    let taxRate: number;
    let description: string;

    if (tradingType === 'intraday') {
      // Intraday trading is treated as business income
      taxRate = 30; // Assuming 30% tax bracket
      description = 'Intraday trading - Taxed as business income';
    } else {
      // Delivery trading - STCG if held for less than 1 year
      taxRate = 15; // STCG rate
      description = 'Delivery trading - Taxed as Short Term Capital Gains';
    }

    const taxAmount = (netProfit * taxRate) / 100;
    const netAmount = netProfit - taxAmount;

    setResult({
      type: tradingType === 'intraday' ? 'Intraday' : 'Delivery',
      totalTrades: total,
      profitableTrades: profitable,
      lossTrades: lossTrades,
      grossProfit: grossProfit,
      grossLoss: grossLoss,
      netProfit: netProfit,
      taxAmount: taxAmount,
      netAmount: netAmount,
      taxRate: taxRate,
      description: description,
      color: tradingType === 'intraday' ? 'text-red-600' : 'text-blue-600',
      icon: tradingType === 'intraday' ? <Activity className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />
    });
  };

  const resetForm = () => {
    setTradingType('intraday');
    setTotalTrades('');
    setProfitableTrades('');
    setAverageProfit('');
    setAverageLoss('');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Intraday vs Delivery Tax Calculator - Trading Tax Comparison | MoneyCal"
        description="Compare tax implications of intraday vs delivery trading. Calculate tax liability for different trading styles with our comprehensive calculator."
        keywords="intraday delivery tax Calculator, trading tax comparison, business income tax, capital gains tax, stock trading tax"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Intraday vs Delivery Tax Calculator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare tax implications of different trading styles and optimize your trading strategy
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Trading Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trading Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setTradingType('intraday')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          tradingType === 'intraday'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <Activity className="h-6 w-6 mx-auto mb-2" />
                        <div className="text-sm font-semibold">Intraday</div>
                        <div className="text-xs text-gray-500">Same day trading</div>
                      </button>
                      <button
                        onClick={() => setTradingType('delivery')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          tradingType === 'delivery'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                        <div className="text-sm font-semibold">Delivery</div>
                        <div className="text-xs text-gray-500">Hold overnight</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Number of Trades
                    </label>
                    <input
                      type="number"
                      value={totalTrades}
                      onChange={(e) => setTotalTrades(e.target.value)}
                      placeholder="Enter total trades"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Profitable Trades
                    </label>
                    <input
                      type="number"
                      value={profitableTrades}
                      onChange={(e) => setProfitableTrades(e.target.value)}
                      placeholder="Enter profitable trades"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Profit per Trade (₹)
                    </label>
                    <input
                      type="number"
                      value={averageProfit}
                      onChange={(e) => setAverageProfit(e.target.value)}
                      placeholder="Enter average profit"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Loss per Trade (₹)
                    </label>
                    <input
                      type="number"
                      value={averageLoss}
                      onChange={(e) => setAverageLoss(e.target.value)}
                      placeholder="Enter average loss"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTax}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Tax
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Tax Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Trading Type Badge */}
                    <div className={`text-center p-4 rounded-lg ${result.type === 'Intraday' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${result.color}`}>
                        {result.icon}
                        <span className="ml-2 text-lg font-bold">{result.type} Trading</span>
                      </div>
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>

                    {/* Trading Statistics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Trades</p>
                        <p className="text-xl font-bold text-gray-900">{result.totalTrades}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Win Rate</p>
                        <p className="text-xl font-bold text-gray-900">{((result.profitableTrades / result.totalTrades) * 100).toFixed(1)}%</p>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Gross Profit:</span>
                        <span className="font-bold text-green-600">₹{result.grossProfit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Gross Loss:</span>
                        <span className="font-bold text-red-600">₹{result.grossLoss.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">Net Profit:</span>
                        <span className="font-bold text-blue-600">₹{result.netProfit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-gray-700">Tax Amount ({result.taxRate}%):</span>
                        <span className="font-bold text-yellow-600">₹{result.taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-2 border-purple-300">
                        <span className="text-gray-700 font-semibold">Net Amount After Tax:</span>
                        <span className="font-bold text-purple-600">₹{result.netAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your trading details to calculate tax liability</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Intraday vs Delivery Tax
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Intraday Trading
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Same day buy and sell</li>
                    <li>• Taxed as business income</li>
                    <li>• Tax rate: 30% (slab rate)</li>
                    <li>• Can claim business expenses</li>
                    <li>• Requires business registration</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Delivery Trading
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Hold shares overnight</li>
                    <li>• Taxed as capital gains</li>
                    <li>• STCG: 15% (≤1 year)</li>
                    <li>• LTCG: 10% (&gt; 1 year)</li>
                    <li>• ₹1L exemption for LTCG</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• This Calculator is for educational purposes</li>
                  <li>• Tax rates may vary based on income slab</li>
                  <li>• Consult a tax professional for accurate calculations</li>
                  <li>• Consider other deductions and exemptions</li>
                  <li>• Business income requires proper documentation</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IntradayDeliveryTaxCalculator;
