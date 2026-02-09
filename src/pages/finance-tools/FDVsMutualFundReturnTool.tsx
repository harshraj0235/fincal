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
  Banknote
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface InvestmentComparison {
  fd: {
    totalInvestment: number;
    finalValue: number;
    totalReturns: number;
    returnPercentage: number;
    cagr: number;
    taxDeduction: number;
    postTaxReturns: number;
  };
  mutualFund: {
    totalInvestment: number;
    finalValue: number;
    totalReturns: number;
    returnPercentage: number;
    cagr: number;
    taxDeduction: number;
    postTaxReturns: number;
  };
  yearByYearData: {
    year: number;
    fdValue: number;
    mutualFundValue: number;
    fdReturns: number;
    mutualFundReturns: number;
  }[];
}

const FDVsMutualFundReturnTool: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState('100000');
  const [fdRate, setFdRate] = useState('7.5');
  const [mutualFundReturn, setMutualFundReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('5');
  const [taxSlab, setTaxSlab] = useState('30');
  const [comparison, setComparison] = useState<InvestmentComparison | null>(null);
  const [showChart, setShowChart] = useState(false);

  const calculateComparison = () => {
    const amount = parseFloat(investmentAmount);
    const fdRatePercent = parseFloat(fdRate) / 100;
    const mfReturnPercent = parseFloat(mutualFundReturn) / 100;
    const years = parseInt(timePeriod);
    const taxRate = parseFloat(taxSlab) / 100;
    
    // FD Calculations
    const fdFinalValue = amount * Math.pow(1 + fdRatePercent, years);
    const fdReturns = fdFinalValue - amount;
    const fdReturnPercentage = (fdReturns / amount) * 100;
    const fdCAGR = (Math.pow(fdFinalValue / amount, 1 / years) - 1) * 100;
    
    // FD Tax (Interest is taxable)
    const fdTaxDeduction = fdReturns * taxRate;
    const fdPostTaxReturns = fdReturns - fdTaxDeduction;
    const fdPostTaxValue = amount + fdPostTaxReturns;
    
    // Mutual Fund Calculations
    const mfFinalValue = amount * Math.pow(1 + mfReturnPercent, years);
    const mfReturns = mfFinalValue - amount;
    const mfReturnPercentage = (mfReturns / amount) * 100;
    const mfCAGR = (Math.pow(mfFinalValue / amount, 1 / years) - 1) * 100;
    
    // Mutual Fund Tax (LTCG for equity funds after 1 year)
    let mfTaxDeduction = 0;
    if (years > 1) {
      // LTCG tax at 10% for gains above 1 lakh
      const taxableGain = Math.max(0, mfReturns - 100000);
      mfTaxDeduction = taxableGain * 0.1;
    } else {
      // STCG at 15%
      mfTaxDeduction = mfReturns * 0.15;
    }
    const mfPostTaxReturns = mfReturns - mfTaxDeduction;
    const mfPostTaxValue = amount + mfPostTaxReturns;
    
    // Generate year-by-year data
    const yearByYearData = [];
    for (let year = 1; year <= years; year++) {
      const fdYearValue = amount * Math.pow(1 + fdRatePercent, year);
      const mfYearValue = amount * Math.pow(1 + mfReturnPercent, year);
      const fdYearReturns = fdYearValue - amount;
      const mfYearReturns = mfYearValue - amount;
      
      yearByYearData.push({
        year,
        fdValue: fdYearValue,
        mutualFundValue: mfYearValue,
        fdReturns: fdYearReturns,
        mutualFundReturns: mfYearReturns
      });
    }
    
    setComparison({
      fd: {
        totalInvestment: amount,
        finalValue: fdFinalValue,
        totalReturns: fdReturns,
        returnPercentage: fdReturnPercentage,
        cagr: fdCAGR,
        taxDeduction: fdTaxDeduction,
        postTaxReturns: fdPostTaxReturns
      },
      mutualFund: {
        totalInvestment: amount,
        finalValue: mfFinalValue,
        totalReturns: mfReturns,
        returnPercentage: mfReturnPercentage,
        cagr: mfCAGR,
        taxDeduction: mfTaxDeduction,
        postTaxReturns: mfPostTaxReturns
      },
      yearByYearData
    });
    setShowChart(true);
  };

  const resetForm = () => {
    setInvestmentAmount('100000');
    setFdRate('7.5');
    setMutualFundReturn('12');
    setTimePeriod('5');
    setTaxSlab('30');
    setComparison(null);
    setShowChart(false);
  };

  const getRecommendation = () => {
    if (!comparison) return '';
    
    const fdPostTaxValue = comparison.fd.postTaxReturns;
    const mfPostTaxValue = comparison.mutualFund.postTaxReturns;
    
    if (mfPostTaxValue > fdPostTaxValue * 1.5) {
      return 'Mutual Fund shows significantly better post-tax returns. Consider equity funds for long-term goals.';
    } else if (mfPostTaxValue > fdPostTaxValue) {
      return 'Mutual Fund shows better returns but with higher risk. Good for moderate risk tolerance.';
    } else if (fdPostTaxValue > mfPostTaxValue) {
      return 'FD shows better post-tax returns. Consider for capital preservation and low risk.';
    } else {
      return 'Both options show similar returns. Consider your risk tolerance and investment goals.';
    }
  };

  const getRiskAssessment = () => {
    const years = parseInt(timePeriod);
    const mfReturn = parseFloat(mutualFundReturn);
    
    if (years >= 5 && mfReturn >= 10) {
      return 'Low Risk - Long-term equity investments typically provide stable returns.';
    } else if (years >= 3) {
      return 'Moderate Risk - Medium-term horizon balances growth and stability.';
    } else {
      return 'High Risk - Short-term equity investments can be volatile.';
    }
  };

  return (
    <>
      <SEOHelmet
        title="FD vs Mutual Fund Return Tool - Compare Investment Options | MoneyCal"
        description="Compare FD vs Mutual Fund returns with tax implications. Understand which investment option works better for your financial goals with our comprehensive comparison tool."
        keywords="FD vs mutual fund, fixed deposit returns, mutual fund returns, investment comparison, tax implications, post-tax returns calculator"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                FD vs Mutual Fund Return Tool
              </h1>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Compare FD vs Mutual Fund returns with tax implications. 
                Understand which investment option works better for your financial goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-orange-100">
                <div className="flex items-center">
                  <Banknote className="w-4 h-4 mr-2" />
                  Investment Comparison
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Tax Analysis
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
                  <Calculator className="h-6 w-6 mr-3 text-orange-600" />
                  Investment Parameters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="100000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        FD Rate (%)
                    </label>
                    <input
                      type="number"
                      value={fdRate}
                        onChange={(e) => setFdRate(e.target.value)}
                      placeholder="7.5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        MF Return (%)
                    </label>
                    <input
                      type="number"
                      value={mutualFundReturn}
                        onChange={(e) => setMutualFundReturn(e.target.value)}
                      placeholder="12"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Period (Years)
                    </label>
                    <input
                      type="number"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                      placeholder="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Slab (%)
                    </label>
                    <input
                      type="number"
                        value={taxSlab}
                        onChange={(e) => setTaxSlab(e.target.value)}
                        placeholder="30"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-900 mb-3">Parameters Explained</h3>
                    <div className="space-y-2 text-sm text-orange-700">
                      <p><strong>FD Rate:</strong> Fixed deposit interest rate (guaranteed returns).</p>
                      <p><strong>MF Return:</strong> Expected mutual fund return (market-linked).</p>
                      <p><strong>Tax Slab:</strong> Your income tax bracket for calculating tax implications.</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateComparison}
                      className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                    >
                      Compare Returns
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
                  <BarChart3 className="h-6 w-6 mr-3 text-orange-600" />
                  Comparison Results
                </h2>

                {comparison ? (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">Fixed Deposit</h3>
                        <p className="text-2xl font-bold text-blue-900">₹{comparison.fd.finalValue.toLocaleString()}</p>
                        <p className="text-sm text-blue-700">Post-tax: ₹{comparison.fd.postTaxReturns.toLocaleString()}</p>
                        <p className="text-sm text-blue-700">CAGR: {comparison.fd.cagr.toFixed(2)}%</p>
                  </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">Mutual Fund</h3>
                        <p className="text-2xl font-bold text-green-900">₹{comparison.mutualFund.finalValue.toLocaleString()}</p>
                        <p className="text-sm text-green-700">Post-tax: ₹{comparison.mutualFund.postTaxReturns.toLocaleString()}</p>
                        <p className="text-sm text-green-700">CAGR: {comparison.mutualFund.cagr.toFixed(2)}%</p>
                </div>
                    </div>

                    {/* Tax Analysis */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Tax Analysis</h3>
                      <div className="space-y-2 text-sm text-red-700">
                        <div className="flex justify-between">
                          <span>FD Tax Paid:</span>
                          <span className="font-semibold">₹{comparison.fd.taxDeduction.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MF Tax Paid:</span>
                          <span className="font-semibold">₹{comparison.mutualFund.taxDeduction.toLocaleString()}</span>
                    </div>
                        <div className="flex justify-between">
                          <span>Tax Difference:</span>
                          <span className="font-semibold">₹{(comparison.fd.taxDeduction - comparison.mutualFund.taxDeduction).toLocaleString()}</span>
                  </div>
                    </div>
                    </div>

                    {/* Return Comparison */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-purple-800 mb-3">Return Comparison</h3>
                      <div className="space-y-2 text-sm text-purple-700">
                        <div className="flex justify-between">
                          <span>FD Post-tax Return:</span>
                          <span className="font-semibold">{((comparison.fd.postTaxReturns / comparison.fd.totalInvestment) * 100).toFixed(2)}%</span>
                  </div>
                        <div className="flex justify-between">
                          <span>MF Post-tax Return:</span>
                          <span className="font-semibold">{((comparison.mutualFund.postTaxReturns / comparison.mutualFund.totalInvestment) * 100).toFixed(2)}%</span>
                </div>
                    <div className="flex justify-between">
                          <span>Return Difference:</span>
                          <span className={`font-semibold ${comparison.mutualFund.postTaxReturns > comparison.fd.postTaxReturns ? 'text-green-600' : 'text-red-600'}`}>
                            {(((comparison.mutualFund.postTaxReturns - comparison.fd.postTaxReturns) / comparison.fd.totalInvestment) * 100).toFixed(2)}%
                      </span>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Investment Recommendation
                      </h3>
                      <p className="text-yellow-700">{getRecommendation()}</p>
                    </div>

                    {/* Risk Assessment */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-orange-800 mb-3">Risk Assessment</h3>
                      <p className="text-orange-700">{getRiskAssessment()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter parameters to compare returns</p>
                </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Year-by-Year Analysis */}
        {showChart && comparison && (
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <LineChart className="h-6 w-6 mr-3 text-orange-600" />
                  Year-by-Year Comparison
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">FD Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">MF Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">FD Returns</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">MF Returns</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.yearByYearData.slice(0, 20).map((data, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{data.year}</td>
                          <td className="py-3 px-4 text-right">₹{data.fdValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.mutualFundValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.fdReturns.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.mutualFundReturns.toLocaleString()}</td>
                          <td className={`py-3 px-4 text-right font-semibold ${data.mutualFundReturns > data.fdReturns ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{(data.mutualFundReturns - data.fdReturns).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding FD vs Mutual Fund Investments
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Banknote className="w-5 h-5 mr-2 text-blue-600" />
                    Fixed Deposits (FD)
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Bank fixed deposits offer guaranteed returns with capital protection.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Pros:</strong> Guaranteed returns, capital protection, predictable income</p>
                    <p><strong>Cons:</strong> Lower returns, taxable interest, inflation risk</p>
                    <p><strong>Tax:</strong> Interest fully taxable as per income slab</p>
                    <p><strong>Best for:</strong> Capital preservation, short-term goals</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Mutual Funds
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Market-linked investments with potential for higher returns.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Pros:</strong> Higher potential returns, tax efficiency, diversification</p>
                    <p><strong>Cons:</strong> Market risk, no capital guarantee, volatility</p>
                    <p><strong>Tax:</strong> LTCG benefits, indexation benefits</p>
                    <p><strong>Best for:</strong> Long-term wealth creation, growth goals</p>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Percent className="w-5 h-5 mr-2 text-red-600" />
                    Tax Implications
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Understanding how taxes affect your investment returns.
                  </p>
                  <div className="space-y-2 text-sm text-red-700">
                    <p><strong>FD Tax:</strong> Interest fully taxable as per income slab</p>
                    <p><strong>MF Tax:</strong> LTCG at 10% after 1 year, STCG at 15%</p>
                    <p><strong>Tax Efficiency:</strong> Mutual funds generally more tax-efficient</p>
                    <p><strong>Planning:</strong> Consider tax implications in investment decisions</p>
              </div>
            </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Investment Strategy
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Choosing the right investment based on your goals and risk tolerance.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Short-term:</strong> FD for capital preservation</p>
                    <p><strong>Long-term:</strong> Mutual funds for wealth creation</p>
                    <p><strong>Balanced:</strong> Mix of both for diversification</p>
                    <p><strong>Goal-based:</strong> Align investments with specific goals</p>
          </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Key Factors to Consider
                </h3>
                <div className="space-y-4 text-orange-700">
                  <p>
                    <strong>Investment Horizon:</strong> Longer periods favor mutual funds due to compounding 
                    and tax efficiency, while shorter periods may favor FDs for stability.
                  </p>
                  <p>
                    <strong>Risk Tolerance:</strong> FDs offer capital protection but lower returns, while 
                    mutual funds offer higher potential returns with market risk.
                  </p>
                  <p>
                    <strong>Tax Efficiency:</strong> Mutual funds generally provide better post-tax returns 
                    due to LTCG benefits and indexation advantages.
                  </p>
                  <p>
                    <strong>Liquidity Needs:</strong> Consider your liquidity requirements and choose 
                    investments that align with your cash flow needs.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Investment Recommendations
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Emergency Fund:</strong> Use FDs for emergency funds due to capital protection 
                    and predictable returns.
                  </p>
                  <p>
                    <strong>Retirement Planning:</strong> Prefer mutual funds for long-term retirement goals 
                    due to higher growth potential and tax efficiency.
                  </p>
                  <p>
                    <strong>Goal-based Investing:</strong> Match investment type with goal timeline - 
                    FDs for short-term, mutual funds for long-term goals.
                  </p>
                  <p>
                    <strong>Diversification:</strong> Consider a mix of both to balance risk and returns 
                    based on your overall financial plan.
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

export default FDVsMutualFundReturnTool;