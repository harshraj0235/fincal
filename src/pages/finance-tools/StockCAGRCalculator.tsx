import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  Target,
  CheckCircle,
  ArrowUpRight,
  BarChart3,
  PieChart,
  AlertTriangle,
  DollarSign,
  Calendar
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const StockCAGRCalculator: React.FC = () => {
  const [initialPrice, setInitialPrice] = useState(100);
  const [finalPrice, setFinalPrice] = useState(150);
  const [timePeriod, setTimePeriod] = useState(3);
  const [investmentAmount, setInvestmentAmount] = useState(10000);

  const calculateCAGR = () => {
    // CAGR = (Final Value / Initial Value)^(1/n) - 1
    const cagr = Math.pow(finalPrice / initialPrice, 1 / timePeriod) - 1;
    
    // Calculate total return percentage
    const totalReturn = ((finalPrice - initialPrice) / initialPrice) * 100;
    
    // Calculate final investment value
    const finalInvestmentValue = investmentAmount * Math.pow(1 + cagr, timePeriod);
    
    // Calculate total profit
    const totalProfit = finalInvestmentValue - investmentAmount;
    
    // Calculate annualized return
    const annualizedReturn = cagr * 100;
    
    // Calculate absolute return
    const absoluteReturn = ((finalPrice - initialPrice) / initialPrice) * 100;
    
    // Calculate price appreciation
    const priceAppreciation = finalPrice - initialPrice;
    
    return {
      cagr: cagr * 100,
      totalReturn,
      finalInvestmentValue: Math.round(finalInvestmentValue),
      totalProfit: Math.round(totalProfit),
      annualizedReturn,
      absoluteReturn,
      priceAppreciation: Math.round(priceAppreciation),
      multiplier: finalPrice / initialPrice
    };
  };

  const result = calculateCAGR();

  return (
    <>
      <SEOHelmet
        title="Stock CAGR Calculator - Compound Annual Growth Rate | MoneyCal"
        description="Calculate Compound Annual Growth Rate (CAGR) for stock investments. Understand your investment performance with our comprehensive CAGR calculator for stocks."
        keywords="stock CAGR calculator, compound annual growth rate, investment returns, stock performance, CAGR formula, investment calculator"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-purple-200 transition-colors text-sm md:text-base">
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Stock CAGR Calculator
              </h1>
              <p className="text-lg md:text-xl text-purple-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Calculate Compound Annual Growth Rate for stock investments
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
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 mr-3 text-purple-600" />
                  Calculate CAGR
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Stock Price (₹)
                    </label>
                    <input
                      type="number"
                      value={initialPrice}
                      onChange={(e) => setInitialPrice(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                      placeholder="100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Price when you bought the stock</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Final Stock Price (₹)
                    </label>
                    <input
                      type="number"
                      value={finalPrice}
                      onChange={(e) => setFinalPrice(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                      placeholder="150"
                    />
                    <p className="text-xs text-gray-500 mt-1">Current or selling price of the stock</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Period (Years)
                    </label>
                    <input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                      placeholder="3"
                    />
                    <p className="text-xs text-gray-500 mt-1">Number of years you held the investment</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                      placeholder="10000"
                    />
                    <p className="text-xs text-gray-500 mt-1">Total amount invested in the stock</p>
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
                {/* CAGR Card */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">CAGR</h3>
                    <Target className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="text-2xl md:text-4xl font-bold mb-2">{result.cagr.toFixed(2)}%</div>
                  <p className="text-purple-100 text-sm md:text-base">
                    Compound Annual Growth Rate
                  </p>
                </div>

                {/* Investment Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Final Value</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                      ₹{result.finalInvestmentValue.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Investment Value</p>
                    <p className="text-xs text-green-600 mt-1">Profit: ₹{result.totalProfit.toLocaleString()}</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Total Return</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-blue-600 mb-1">
                      {result.totalReturn.toFixed(2)}%
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Overall Return</p>
                    <p className="text-xs text-blue-600 mt-1">Price: ₹{result.priceAppreciation}</p>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-600" />
                    Investment Analysis
                  </h4>
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annualized Return:</span>
                      <span className="font-semibold text-purple-600">
                        {result.annualizedReturn.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Absolute Return:</span>
                      <span className="font-semibold text-blue-600">
                        {result.absoluteReturn.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price Multiplier:</span>
                      <span className="font-semibold text-green-600">
                        {result.multiplier.toFixed(2)}x
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Period:</span>
                      <span className="font-semibold text-gray-900">
                        {timePeriod} years
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Understanding CAGR Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Understanding CAGR</h2>
              <p className="text-base md:text-lg text-gray-600">Why Compound Annual Growth Rate matters for stock investments</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-purple-100 rounded-full p-3 w-fit mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">What is CAGR?</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <p className="text-gray-600">✅ Annualized growth rate over time</p>
                  <p className="text-gray-600">✅ Smooths out volatility in returns</p>
                  <p className="text-gray-600">✅ Helps compare different investments</p>
                  <p className="text-gray-600">✅ Accounts for compound growth</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-indigo-100 rounded-full p-3 w-fit mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Why Use CAGR?</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <p className="text-gray-600">✅ Better than simple average returns</p>
                  <p className="text-gray-600">✅ Reflects actual investment performance</p>
                  <p className="text-gray-600">✅ Useful for long-term planning</p>
                  <p className="text-gray-600">✅ Industry standard metric</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formula Section */}
        <section className="py-8 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">CAGR Formula</h2>
              <p className="text-base md:text-lg text-gray-600">The mathematical formula behind CAGR calculation</p>
            </motion.div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">CAGR Formula</h3>
                <div className="bg-gray-100 rounded-lg p-4 md:p-6 text-lg md:text-xl font-mono">
                  CAGR = (Final Value / Initial Value)^(1/n) - 1
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Example Calculation:</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Initial Price:</strong> ₹100</p>
                    <p><strong>Final Price:</strong> ₹150</p>
                    <p><strong>Time Period:</strong> 3 years</p>
                    <p><strong>CAGR:</strong> (150/100)^(1/3) - 1 = 14.47%</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Key Insights:</h4>
                  <div className="space-y-2 text-sm">
                    <p>• CAGR smooths out year-to-year volatility</p>
                    <p>• Higher CAGR = better long-term performance</p>
                    <p>• Useful for comparing different time periods</p>
                    <p>• Assumes reinvestment of returns</p>
                  </div>
                </div>
              </div>
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
                to="/finance-tools/fd-vs-mutual-fund-return-tool"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-3 md:mb-4">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">FD vs Mutual Fund Return Tool</h3>
                <p className="text-gray-600 text-xs md:text-sm">Compare Fixed Deposit vs Mutual Fund returns with tax implications</p>
              </Link>

              <Link
                to="/finance-tools/real-vs-nominal-return-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3 md:mb-4">
                  <Calculator className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Real vs Nominal Return Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate inflation-adjusted returns to understand true investment performance</p>
              </Link>

              <Link
                to="/finance-tools/lumpsum-vs-sip-analyzer"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Lumpsum vs SIP Analyzer</h3>
                <p className="text-gray-600 text-xs md:text-sm">Compare lumpsum vs SIP investment strategies for optimal returns</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StockCAGRCalculator;