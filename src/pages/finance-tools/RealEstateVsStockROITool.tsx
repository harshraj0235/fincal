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
  Home,
  Building
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface InvestmentAnalysis {
  type: 'Real Estate' | 'Stock Market';
  initialInvestment: number;
  currentValue: number;
  totalReturns: number;
  returnPercentage: number;
  annualizedReturn: number;
  timePeriod: number;
  monthlyRental?: number;
  maintenanceCosts?: number;
  propertyTaxes?: number;
  stockDividends?: number;
  brokerageFees?: number;
  netReturns: number;
  netReturnPercentage: number;
}

const RealEstateVsStockROITool: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState('5000000');
  const [timePeriod, setTimePeriod] = useState('10');
  const [realEstateAppreciation, setRealEstateAppreciation] = useState('8');
  const [stockMarketReturn, setStockMarketReturn] = useState('12');
  const [monthlyRental, setMonthlyRental] = useState('25000');
  const [maintenanceCosts, setMaintenanceCosts] = useState('50000');
  const [propertyTaxes, setPropertyTaxes] = useState('15000');
  const [stockDividends, setStockDividends] = useState('2');
  const [brokerageFees, setBrokerageFees] = useState('10000');
  const [results, setResults] = useState<{ realEstate: InvestmentAnalysis; stockMarket: InvestmentAnalysis } | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const calculateReturns = () => {
    const initialInvestment = parseFloat(investmentAmount);
    const years = parseFloat(timePeriod);
    const realEstateAppreciationRate = parseFloat(realEstateAppreciation) / 100;
    const stockReturnRate = parseFloat(stockMarketReturn) / 100;
    const rentalIncome = parseFloat(monthlyRental) * 12;
    const maintenance = parseFloat(maintenanceCosts);
    const taxes = parseFloat(propertyTaxes);
    const dividendYield = parseFloat(stockDividends) / 100;
    const brokerage = parseFloat(brokerageFees);

    // Real Estate Calculations
    const realEstateFutureValue = initialInvestment * Math.pow(1 + realEstateAppreciationRate, years);
    const totalRentalIncome = rentalIncome * years;
    const totalMaintenanceCosts = maintenance * years;
    const totalPropertyTaxes = taxes * years;
    const realEstateGrossReturns = realEstateFutureValue - initialInvestment + totalRentalIncome;
    const realEstateNetReturns = realEstateGrossReturns - totalMaintenanceCosts - totalPropertyTaxes;
    const realEstateReturnPercentage = (realEstateNetReturns / initialInvestment) * 100;
    const realEstateAnnualizedReturn = (Math.pow(realEstateFutureValue / initialInvestment, 1 / years) - 1) * 100;

    // Stock Market Calculations
    const stockFutureValue = initialInvestment * Math.pow(1 + stockReturnRate, years);
    const totalDividends = initialInvestment * dividendYield * years;
    const stockGrossReturns = stockFutureValue - initialInvestment + totalDividends;
    const stockNetReturns = stockGrossReturns - brokerage;
    const stockReturnPercentage = (stockNetReturns / initialInvestment) * 100;
    const stockAnnualizedReturn = (Math.pow(stockFutureValue / initialInvestment, 1 / years) - 1) * 100;

    setResults({
      realEstate: {
        type: 'Real Estate',
        initialInvestment,
        currentValue: realEstateFutureValue,
        totalReturns: realEstateGrossReturns,
        returnPercentage: realEstateReturnPercentage,
        annualizedReturn: realEstateAnnualizedReturn,
        timePeriod: years,
        monthlyRental: rentalIncome / 12,
        maintenanceCosts: maintenance,
        propertyTaxes: taxes,
        netReturns: realEstateNetReturns,
        netReturnPercentage: realEstateReturnPercentage
      },
      stockMarket: {
        type: 'Stock Market',
        initialInvestment,
        currentValue: stockFutureValue,
        totalReturns: stockGrossReturns,
        returnPercentage: stockReturnPercentage,
        annualizedReturn: stockAnnualizedReturn,
        timePeriod: years,
        stockDividends: totalDividends,
        brokerageFees: brokerage,
        netReturns: stockNetReturns,
        netReturnPercentage: stockReturnPercentage
      }
    });
  };

  useEffect(() => {
    if (investmentAmount && timePeriod && realEstateAppreciation && stockMarketReturn) {
      calculateReturns();
    }
  }, [investmentAmount, timePeriod, realEstateAppreciation, stockMarketReturn, monthlyRental, maintenanceCosts, propertyTaxes, stockDividends, brokerageFees]);

  const resetForm = () => {
    setInvestmentAmount('5000000');
    setTimePeriod('10');
    setRealEstateAppreciation('8');
    setStockMarketReturn('12');
    setMonthlyRental('25000');
    setMaintenanceCosts('50000');
    setPropertyTaxes('15000');
    setStockDividends('2');
    setBrokerageFees('10000');
    setResults(null);
    setShowDetails(false);
  };

  const getRecommendation = () => {
    if (!results) return '';
    
    const difference = results.stockMarket.netReturns - results.realEstate.netReturns;
    const percentageDiff = ((results.stockMarket.currentValue - results.realEstate.currentValue) / results.realEstate.currentValue) * 100;
    
    if (difference > 0) {
      return `Stock Market is better by ₹${difference.toLocaleString()} (${percentageDiff.toFixed(2)}% higher returns)`;
    } else {
      return `Real Estate is better by ₹${Math.abs(difference).toLocaleString()} (${Math.abs(percentageDiff).toFixed(2)}% higher returns)`;
    }
  };

  return (
    <>
      <SEOHelmet
        title="Real Estate vs Stock ROI Tool - Compare Investment Returns | MoneyCal"
        description="Compare Real Estate vs Stock Market returns with our advanced ROI calculator. Analyze rental income, dividends, maintenance costs, and taxes to make informed investment decisions."
        keywords="real estate vs stock market, ROI calculator, investment comparison, rental income calculator, stock market returns, real estate investment, property investment vs stocks"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-green-600 to-teal-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Real Estate vs Stock ROI Tool
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Compare Real Estate and Stock Market investment returns. Analyze rental income, dividends, 
                maintenance costs, and taxes to choose the optimal investment strategy.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-2" />
                  Real Estate
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Stock Market
                </div>
                <div className="flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  ROI Analysis
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                  Investment Parameters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="Enter investment amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Time Period (Years)
                    </label>
                    <input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      placeholder="Enter time period"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Real Estate Appreciation (%)
                      </label>
                      <input
                        type="number"
                        value={realEstateAppreciation}
                        onChange={(e) => setRealEstateAppreciation(e.target.value)}
                        placeholder="8"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Market Return (%)
                      </label>
                      <input
                        type="number"
                        value={stockMarketReturn}
                        onChange={(e) => setStockMarketReturn(e.target.value)}
                        placeholder="12"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Real Estate Parameters</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Monthly Rental Income (₹)
                        </label>
                        <input
                          type="number"
                          value={monthlyRental}
                          onChange={(e) => setMonthlyRental(e.target.value)}
                          placeholder="25000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Annual Maintenance (₹)
                          </label>
                          <input
                            type="number"
                            value={maintenanceCosts}
                            onChange={(e) => setMaintenanceCosts(e.target.value)}
                            placeholder="50000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                            Annual Property Tax (₹)
                    </label>
                    <input
                      type="number"
                            value={propertyTaxes}
                            onChange={(e) => setPropertyTaxes(e.target.value)}
                            placeholder="15000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Stock Market Parameters</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dividend Yield (%)
                        </label>
                        <input
                          type="number"
                          value={stockDividends}
                          onChange={(e) => setStockDividends(e.target.value)}
                          placeholder="2"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Brokerage Fees (₹)
                        </label>
                        <input
                          type="number"
                          value={brokerageFees}
                          onChange={(e) => setBrokerageFees(e.target.value)}
                          placeholder="10000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateReturns}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate ROI
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
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  ROI Comparison Results
                </h2>

                {results ? (
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="text-blue-800 font-medium">{getRecommendation()}</p>
                </div>
                    </div>

                    {/* Real Estate Results */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <Home className="w-5 h-5 mr-2" />
                        Real Estate Investment
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-blue-700">Initial Investment:</p>
                          <p className="font-bold text-blue-900">₹{results.realEstate.initialInvestment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-blue-700">Current Value:</p>
                          <p className="font-bold text-blue-900">₹{results.realEstate.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-blue-700">Net Returns:</p>
                          <p className="font-bold text-blue-900">₹{results.realEstate.netReturns.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-blue-700">Net ROI %:</p>
                          <p className="font-bold text-blue-900">{results.realEstate.netReturnPercentage.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-blue-700">Annualized Return:</p>
                          <p className="font-bold text-blue-900">{results.realEstate.annualizedReturn.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-blue-700">Monthly Rental:</p>
                          <p className="font-bold text-blue-900">₹{results.realEstate.monthlyRental?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stock Market Results */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Stock Market Investment
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-700">Initial Investment:</p>
                          <p className="font-bold text-green-900">₹{results.stockMarket.initialInvestment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-green-700">Current Value:</p>
                          <p className="font-bold text-green-900">₹{results.stockMarket.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-green-700">Net Returns:</p>
                          <p className="font-bold text-green-900">₹{results.stockMarket.netReturns.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-green-700">Net ROI %:</p>
                          <p className="font-bold text-green-900">{results.stockMarket.netReturnPercentage.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-green-700">Annualized Return:</p>
                          <p className="font-bold text-green-900">{results.stockMarket.annualizedReturn.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-green-700">Total Dividends:</p>
                          <p className="font-bold text-green-900">₹{results.stockMarket.stockDividends?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Comparison */}
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                    >
                      {showDetails ? 'Hide' : 'Show'} Detailed Analysis
                    </button>

                    {showDetails && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Detailed Analysis</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Value Difference:</span>
                            <span className="font-bold">₹{(results.stockMarket.currentValue - results.realEstate.currentValue).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Return Difference:</span>
                            <span className="font-bold">₹{(results.stockMarket.netReturns - results.realEstate.netReturns).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ROI Difference:</span>
                            <span className="font-bold">{(results.stockMarket.netReturnPercentage - results.realEstate.netReturnPercentage).toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annualized Return Diff:</span>
                            <span className="font-bold">{(results.stockMarket.annualizedReturn - results.realEstate.annualizedReturn).toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter investment parameters to see ROI comparison</p>
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
                Real Estate vs Stock Market: Investment Comparison Guide
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Home className="h-5 w-5 mr-2" />
                    Real Estate Investment
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Tangible asset with intrinsic value</li>
                    <li>• Regular rental income stream</li>
                    <li>• Tax benefits and deductions</li>
                    <li>• Hedge against inflation</li>
                    <li>• Higher transaction costs</li>
                    <li>• Lower liquidity</li>
                    <li>• Requires active management</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Stock Market Investment
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• High liquidity and easy trading</li>
                    <li>• Dividend income potential</li>
                    <li>• Lower transaction costs</li>
                    <li>• Diversification benefits</li>
                    <li>• Higher volatility</li>
                    <li>• Requires market knowledge</li>
                    <li>• Passive investment option</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Key Factors to Consider
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Investment Amount</h4>
                    <p className="text-yellow-700 text-sm">
                      Real estate requires higher capital, while stocks can be started with smaller amounts.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Time Horizon</h4>
                    <p className="text-yellow-700 text-sm">
                      Real estate is better for long-term investments, while stocks offer flexibility for different timeframes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Risk Tolerance</h4>
                    <p className="text-yellow-700 text-sm">
                      Real estate is generally less volatile, while stocks can have higher short-term fluctuations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Liquidity Needs</h4>
                    <p className="text-yellow-700 text-sm">
                      Stocks offer immediate liquidity, while real estate requires time to sell and convert to cash.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 h-5 mr-2" />
                  Investment Recommendations
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>For Conservative Investors:</strong> Consider real estate for stable returns and regular income.
                  </p>
                  <p>
                    <strong>For Growth-Oriented Investors:</strong> Stocks offer higher growth potential and better liquidity.
                  </p>
                  <p>
                    <strong>For Diversification:</strong> Consider a mix of both asset classes for balanced portfolio.
                  </p>
                  <p>
                    <strong>For Beginners:</strong> Start with stocks for lower capital requirements and easier management.
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

export default RealEstateVsStockROITool;