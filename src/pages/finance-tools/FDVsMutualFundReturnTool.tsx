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
  Shield,
  Zap
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';


const FDVsMutualFundReturnTool: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [fdRate, setFdRate] = useState(7.5);
  const [mutualFundReturn, setMutualFundReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [taxRate, setTaxRate] = useState(10);

  const calculateReturns = () => {
    // Calculate FD returns (simple interest for comparison)
    const fdInterest = (investmentAmount * fdRate * investmentPeriod) / 100;
    const fdTax = fdInterest * (taxRate / 100);
    const fdNetReturn = fdInterest - fdTax;
    const fdFinalAmount = investmentAmount + fdNetReturn;
    
    // Calculate Mutual Fund returns (compound interest)
    const mutualFundFinalAmount = investmentAmount * Math.pow(1 + mutualFundReturn / 100, investmentPeriod);
    const mutualFundProfit = mutualFundFinalAmount - investmentAmount;
    
    // Calculate tax on mutual fund (assuming LTCG after 1 year)
    let mutualFundTax = 0;
    if (investmentPeriod > 1) {
      // LTCG tax on equity funds (10% above 1L)
      const taxableAmount = Math.max(0, mutualFundProfit - 100000);
      mutualFundTax = taxableAmount * 0.1;
    } else {
      // STCG tax (15%)
      mutualFundTax = mutualFundProfit * 0.15;
    }
    
    const mutualFundNetReturn = mutualFundProfit - mutualFundTax;
    const mutualFundNetFinalAmount = investmentAmount + mutualFundNetReturn;
    
    // Calculate difference
    const difference = mutualFundNetFinalAmount - fdFinalAmount;
    const betterOption = mutualFundNetFinalAmount > fdFinalAmount ? 'Mutual Fund' : 'Fixed Deposit';
    
    return {
      fdFinalAmount: Math.round(fdFinalAmount),
      fdNetReturn: Math.round(fdNetReturn),
      fdTax: Math.round(fdTax),
      mutualFundFinalAmount: Math.round(mutualFundFinalAmount),
      mutualFundNetFinalAmount: Math.round(mutualFundNetFinalAmount),
      mutualFundNetReturn: Math.round(mutualFundNetReturn),
      mutualFundTax: Math.round(mutualFundTax),
      difference: Math.round(difference),
      betterOption,
      fdROI: ((fdNetReturn / investmentAmount) * 100),
      mutualFundROI: ((mutualFundNetReturn / investmentAmount) * 100)
    };
  };

  const result = calculateReturns();

  return (
    <>
      <SEOHelmet
        title="FD vs Mutual Fund Return Tool - Compare Investment Returns | MoneyCal"
        description="Compare Fixed Deposit vs Mutual Fund returns with tax implications. Make informed investment decisions with our comprehensive FD vs Mutual Fund comparison tool."
        keywords="FD vs mutual fund, fixed deposit calculator, mutual fund returns, investment comparison, tax implications, FD returns"
      />


      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-orange-600 via-blue-600 to-orange-700">
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
                FD vs Mutual Fund Return Tool
              </h1>
              <p className="text-lg md:text-xl text-orange-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
                Compare Fixed Deposit vs Mutual Fund returns with tax implications
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
                  Compare Investment Returns
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                      placeholder="100000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      FD Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      value={fdRate}
                      onChange={(e) => setFdRate(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                      placeholder="7.5"
                    />
                    <p className="text-xs text-gray-500 mt-1">Annual interest rate on Fixed Deposit</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mutual Fund Return (%)
                    </label>
                    <input
                      type="number"
                      value={mutualFundReturn}
                      onChange={(e) => setMutualFundReturn(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                      placeholder="12"
                    />
                    <p className="text-xs text-gray-500 mt-1">Expected annual return from Mutual Fund</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <input
                      type="number"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                      placeholder="5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Rate on FD (%)
                    </label>
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                      placeholder="10"
                    />
                    <p className="text-xs text-gray-500 mt-1">Tax rate applicable on FD interest</p>
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
                {/* Winner Card */}
                <div className={`bg-gradient-to-br ${result.betterOption === 'Mutual Fund' ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-2xl p-6 md:p-8 text-white shadow-xl`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold">Better Option</h3>
                    <Target className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="text-2xl md:text-4xl font-bold mb-2">{result.betterOption}</div>
                  <p className="text-orange-100 md:text-blue-100 text-sm md:text-base">
                    Higher returns after {investmentPeriod} years
                  </p>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Shield className="h-4 w-4 md:h-5 md:w-5 text-orange-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Fixed Deposit</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-orange-600 mb-1">
                      ₹{result.fdFinalAmount.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Final Amount</p>
                    <p className="text-xs text-orange-600 mt-1">ROI: {result.fdROI.toFixed(2)}%</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Zap className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">Mutual Fund</h4>
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-blue-600 mb-1">
                      ₹{result.mutualFundNetFinalAmount.toLocaleString()}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Final Amount</p>
                    <p className="text-xs text-blue-600 mt-1">ROI: {result.mutualFundROI.toFixed(2)}%</p>
                  </div>
                </div>

                {/* Tax Analysis */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-sm md:text-base">
                    <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-orange-600" />
                    Tax Impact Analysis
                  </h4>
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">FD Tax Paid:</span>
                      <span className="font-semibold text-orange-600">
                        ₹{result.fdTax.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">MF Tax Paid:</span>
                      <span className="font-semibold text-blue-600">
                        ₹{result.mutualFundTax.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Net Difference:</span>
                      <span className={`font-semibold ${result.difference > 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                        ₹{Math.abs(result.difference).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">FD vs Mutual Fund Comparison</h2>
              <p className="text-base md:text-lg text-gray-600">Understanding the pros and cons of each investment option</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-orange-100 rounded-full p-3 w-fit mb-4">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Fixed Deposit</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <p className="text-gray-600">✅ Guaranteed returns</p>
                  <p className="text-gray-600">✅ Low risk investment</p>
                  <p className="text-gray-600">✅ Fixed interest rate</p>
                  <p className="text-gray-600">❌ Lower returns compared to equity</p>
                  <p className="text-gray-600">❌ Interest is fully taxable</p>
                  <p className="text-gray-600">❌ No liquidity during lock-in</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                  <Zap className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Mutual Fund</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <p className="text-gray-600">✅ Higher potential returns</p>
                  <p className="text-gray-600">✅ Tax benefits on long-term gains</p>
                  <p className="text-gray-600">✅ Liquidity and flexibility</p>
                  <p className="text-gray-600">❌ Market risk and volatility</p>
                  <p className="text-gray-600">❌ No guaranteed returns</p>
                  <p className="text-gray-600">❌ Requires market knowledge</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tax Implications Section */}
        <section className="py-8 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Tax Implications</h2>
              <p className="text-base md:text-lg text-gray-600">Understanding how taxes affect your investment returns</p>
            </motion.div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Fixed Deposit Tax:</h4>
                  <div className="space-y-2 text-sm">
                    <p>• Interest income is fully taxable</p>
                    <p>• Taxed at your income tax slab rate</p>
                    <p>• TDS deducted if interest &gt; ₹40,000</p>
                    <p>• No tax benefits available</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Mutual Fund Tax:</h4>
                  <div className="space-y-2 text-sm">
                    <p>• STCG: 15% (if held &lt; 1 year)</p>
                    <p>• LTCG: 10% (if held &gt; 1 year)</p>
                    <p>• ₹1L exemption on LTCG</p>
                    <p>• Indexation benefits available</p>
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
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Lumpsum vs SIP Analyzer</h3>
                <p className="text-gray-600 text-xs md:text-sm">Compare lumpsum vs SIP investment strategies for optimal returns</p>
              </Link>

              <Link
                to="/finance-tools/stock-cagr-calculator"
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Stock CAGR Calculator</h3>
                <p className="text-gray-600 text-xs md:text-sm">Calculate Compound Annual Growth Rate for stock investments</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FDVsMutualFundReturnTool;