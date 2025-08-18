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

interface ExpenseBreakdown {
  managementFee: number;
  administrativeFee: number;
  distributionFee: number;
  otherExpenses: number;
  totalExpenseRatio: number;
}

interface FundComparison {
  fundName: string;
  expenseRatio: number;
  investmentAmount: number;
  timePeriod: number;
  annualExpense: number;
  totalExpense: number;
  netReturn: number;
  netReturnPercentage: number;
  expenseImpact: number;
}

interface ExpenseAnalysis {
  totalInvestment: number;
  timePeriod: number;
  expectedReturn: number;
  totalExpenseRatio: number;
  annualExpense: number;
  totalExpense: number;
  grossReturn: number;
  netReturn: number;
  expenseImpact: number;
  expenseImpactPercentage: number;
  yearByYearData: {
    year: number;
    investmentValue: number;
    grossReturn: number;
    expenses: number;
    netReturn: number;
    netValue: number;
  }[];
  fundComparisons: FundComparison[];
}

const MutualFundExpenseRatioEstimator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState('100000');
  const [timePeriod, setTimePeriod] = useState('10');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [managementFee, setManagementFee] = useState('1.5');
  const [administrativeFee, setAdministrativeFee] = useState('0.2');
  const [distributionFee, setDistributionFee] = useState('0.5');
  const [otherExpenses, setOtherExpenses] = useState('0.1');
  const [analysis, setAnalysis] = useState<ExpenseAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const calculateExpenseAnalysis = () => {
    const amount = parseFloat(investmentAmount);
    const years = parseInt(timePeriod);
    const returnRate = parseFloat(expectedReturn) / 100;
    const mgmtFee = parseFloat(managementFee) / 100;
    const adminFee = parseFloat(administrativeFee) / 100;
    const distFee = parseFloat(distributionFee) / 100;
    const otherFee = parseFloat(otherExpenses) / 100;
    
    const totalExpenseRatio = mgmtFee + adminFee + distFee + otherFee;
    
    // Calculate gross return (without expenses)
    const grossReturn = amount * Math.pow(1 + returnRate, years);
    
    // Calculate net return (with expenses)
    const netReturnRate = returnRate - totalExpenseRatio;
    const netReturn = amount * Math.pow(1 + netReturnRate, years);
    
    // Calculate expenses
    const annualExpense = amount * totalExpenseRatio;
    const totalExpense = grossReturn - netReturn;
    const expenseImpact = grossReturn - netReturn;
    const expenseImpactPercentage = (expenseImpact / grossReturn) * 100;
    
    // Generate year-by-year data
    const yearByYearData = [];
    for (let year = 1; year <= years; year++) {
      const yearGrossValue = amount * Math.pow(1 + returnRate, year);
      const yearGrossReturn = yearGrossValue - amount;
      const yearExpenses = yearGrossValue * totalExpenseRatio;
      const yearNetValue = amount * Math.pow(1 + netReturnRate, year);
      const yearNetReturn = yearNetValue - amount;
      
      yearByYearData.push({
        year,
        investmentValue: amount,
        grossReturn: yearGrossReturn,
        expenses: yearExpenses,
        netReturn: yearNetReturn,
        netValue: yearNetValue
      });
    }
    
    // Fund comparisons
    const fundComparisons: FundComparison[] = [
      {
        fundName: 'Low-Cost Index Fund',
        expenseRatio: 0.1,
        investmentAmount: amount,
        timePeriod: years,
        annualExpense: amount * 0.001,
        totalExpense: amount * 0.001 * years,
        netReturn: amount * Math.pow(1 + returnRate - 0.001, years),
        netReturnPercentage: ((amount * Math.pow(1 + returnRate - 0.001, years)) / amount - 1) * 100,
        expenseImpact: amount * 0.001 * years
      },
      {
        fundName: 'Actively Managed Fund',
        expenseRatio: totalExpenseRatio,
        investmentAmount: amount,
        timePeriod: years,
        annualExpense: annualExpense,
        totalExpense: totalExpense,
        netReturn: netReturn,
        netReturnPercentage: ((netReturn / amount) - 1) * 100,
        expenseImpact: expenseImpact
      },
      {
        fundName: 'High-Cost Fund',
        expenseRatio: 2.5,
        investmentAmount: amount,
        timePeriod: years,
        annualExpense: amount * 0.025,
        totalExpense: amount * 0.025 * years,
        netReturn: amount * Math.pow(1 + returnRate - 0.025, years),
        netReturnPercentage: ((amount * Math.pow(1 + returnRate - 0.025, years)) / amount - 1) * 100,
        expenseImpact: amount * 0.025 * years
      }
    ];
    
    setAnalysis({
      totalInvestment: amount,
      timePeriod: years,
      expectedReturn: returnRate * 100,
      totalExpenseRatio: totalExpenseRatio * 100,
      annualExpense,
      totalExpense,
      grossReturn,
      netReturn,
      expenseImpact,
      expenseImpactPercentage,
      yearByYearData,
      fundComparisons
    });
    setShowAnalysis(true);
  };

  const resetForm = () => {
    setInvestmentAmount('100000');
    setTimePeriod('10');
    setExpectedReturn('12');
    setManagementFee('1.5');
    setAdministrativeFee('0.2');
    setDistributionFee('0.5');
    setOtherExpenses('0.1');
    setAnalysis(null);
    setShowAnalysis(false);
  };

  const getExpenseAssessment = () => {
    if (!analysis) return '';
    
    if (analysis.totalExpenseRatio <= 0.5) {
      return 'Excellent - Very low expense ratio, maximizing your returns.';
    } else if (analysis.totalExpenseRatio <= 1.0) {
      return 'Good - Reasonable expense ratio with competitive costs.';
    } else if (analysis.totalExpenseRatio <= 1.5) {
      return 'Moderate - Higher expenses, consider lower-cost alternatives.';
    } else {
      return 'High - Very expensive fund, significant impact on returns.';
    }
  };

  const getRecommendation = () => {
    if (!analysis) return '';
    
    if (analysis.expenseImpactPercentage > 20) {
      return 'Consider switching to lower-cost funds to significantly improve returns.';
    } else if (analysis.expenseImpactPercentage > 10) {
      return 'Expenses are moderate. Look for similar funds with lower expense ratios.';
    } else if (analysis.expenseImpactPercentage > 5) {
      return 'Expenses are reasonable. Monitor for better alternatives.';
    } else {
      return 'Excellent cost efficiency. Continue with current fund selection.';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Mutual Fund Expense Ratio Estimator - Calculate Fund Costs | MoneyCal"
        description="Calculate mutual fund expense ratios and their impact on returns. Understand how fund costs affect your investment performance with our comprehensive expense analysis tool."
        keywords="mutual fund expense ratio, fund costs calculator, expense ratio impact, mutual fund fees, investment cost analysis"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Mutual Fund Expense Ratio Estimator
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Calculate mutual fund expense ratios and their impact on returns. 
                Understand how fund costs affect your investment performance.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <Receipt className="w-4 h-4 mr-2" />
                  Expense Analysis
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Cost Impact
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Fund Comparison
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
                  Fund Parameters
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
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
                        placeholder="10"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Return (%)
                      </label>
                      <input
                        type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        placeholder="12"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Expense Components</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Management Fee (%)
                        </label>
                        <input
                          type="number"
                          value={managementFee}
                          onChange={(e) => setManagementFee(e.target.value)}
                          placeholder="1.5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Administrative Fee (%)
                        </label>
                        <input
                          type="number"
                          value={administrativeFee}
                          onChange={(e) => setAdministrativeFee(e.target.value)}
                          placeholder="0.2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Distribution Fee (%)
                        </label>
                        <input
                          type="number"
                          value={distributionFee}
                          onChange={(e) => setDistributionFee(e.target.value)}
                          placeholder="0.5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Other Expenses (%)
                        </label>
                        <input
                          type="number"
                          value={otherExpenses}
                          onChange={(e) => setOtherExpenses(e.target.value)}
                          placeholder="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Parameters Explained</h3>
                    <div className="space-y-2 text-sm text-green-700">
                      <p><strong>Management Fee:</strong> Fee charged by fund manager for managing the portfolio.</p>
                      <p><strong>Administrative Fee:</strong> Costs for fund administration and operations.</p>
                      <p><strong>Distribution Fee:</strong> Marketing and distribution costs (12b-1 fees).</p>
                      <p><strong>Other Expenses:</strong> Additional costs like legal, audit, and custodial fees.</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateExpenseAnalysis}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Impact
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
                  Expense Analysis Results
                </h2>

                {analysis ? (
                  <div className="space-y-6">
                    {/* Main Expense Ratio Card */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">Total Expense Ratio</h3>
                      <p className="text-4xl font-bold mb-2">{analysis.totalExpenseRatio.toFixed(2)}%</p>
                      <p className="text-blue-100">Annual cost of fund ownership</p>
                </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">Gross Return</h3>
                        <p className="text-2xl font-bold text-green-900">₹{analysis.grossReturn.toLocaleString()}</p>
                    </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-red-800 mb-2">Net Return</h3>
                        <p className="text-2xl font-bold text-red-900">₹{analysis.netReturn.toLocaleString()}</p>
                    </div>
                    </div>

                    {/* Expense Impact */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3">Expense Impact</h3>
                      <div className="space-y-2 text-sm text-yellow-700">
                        <div className="flex justify-between">
                          <span>Total Expenses:</span>
                          <span className="font-semibold">₹{analysis.totalExpense.toLocaleString()}</span>
                                </div>
                        <div className="flex justify-between">
                          <span>Annual Expenses:</span>
                          <span className="font-semibold">₹{analysis.annualExpense.toLocaleString()}</span>
                              </div>
                        <div className="flex justify-between">
                          <span>Impact on Returns:</span>
                          <span className="font-semibold">{analysis.expenseImpactPercentage.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Assessment */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Expense Assessment
                      </h3>
                      <p className="text-blue-700">{getExpenseAssessment()}</p>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">Recommendation</h3>
                      <p className="text-green-700">{getRecommendation()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter fund parameters to calculate expense impact</p>
                </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Fund Comparison */}
        {showAnalysis && analysis && (
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <LineChart className="h-6 w-6 mr-3 text-blue-600" />
                  Fund Comparison Analysis
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Fund Type</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Expense Ratio</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Expenses</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Net Return</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Return %</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Expense Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.fundComparisons.map((fund, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{fund.fundName}</td>
                          <td className="py-3 px-4 text-right">{fund.expenseRatio.toFixed(2)}%</td>
                          <td className="py-3 px-4 text-right">₹{fund.totalExpense.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{fund.netReturn.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {fund.netReturnPercentage.toFixed(2)}%
                          </td>
                          <td className="py-3 px-4 text-right text-red-600 font-semibold">
                            ₹{fund.expenseImpact.toLocaleString()}
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

        {/* Year-by-Year Analysis */}
        {showAnalysis && analysis && (
          <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Activity className="h-6 w-6 mr-3 text-blue-600" />
                  Year-by-Year Expense Impact
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Gross Return</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Expenses</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Net Return</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Net Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Expense %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.yearByYearData.slice(0, 20).map((data, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{data.year}</td>
                          <td className="py-3 px-4 text-right">₹{data.grossReturn.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-red-600">₹{data.expenses.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">₹{data.netReturn.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right font-semibold">₹{data.netValue.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-red-600">
                            {((data.expenses / (data.investmentValue + data.grossReturn)) * 100).toFixed(2)}%
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
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Mutual Fund Expense Ratios
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Receipt className="w-5 h-5 mr-2 text-blue-600" />
                    What is Expense Ratio?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Annual fee charged by mutual funds as a percentage of assets under management.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Purpose:</strong> Cover fund operating costs</p>
                    <p><strong>Impact:</strong> Reduces net returns</p>
                    <p><strong>Range:</strong> 0.1% to 3% typically</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    Expense Components
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Different types of fees that make up the total expense ratio.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Management Fee:</strong> Portfolio management costs</p>
                    <p><strong>Administrative Fee:</strong> Fund operations</p>
                    <p><strong>Distribution Fee:</strong> Marketing and sales</p>
                    <p><strong>Other Expenses:</strong> Legal, audit, custodial</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Impact on Returns
                  </h3>
                  <p className="text-gray-700 mb-4">
                    How expense ratios affect your investment performance over time.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Compounding Effect:</strong> Higher costs compound over time</p>
                    <p><strong>Net Returns:</strong> Gross return minus expenses</p>
                    <p><strong>Long-term Impact:</strong> Significant difference over decades</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Cost Efficiency
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Understanding what makes a fund cost-efficient.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Low Cost:</strong> 0.5% or less (excellent)</p>
                    <p><strong>Moderate Cost:</strong> 0.5-1.0% (good)</p>
                    <p><strong>High Cost:</strong> 1.0%+ (expensive)</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Why Expense Ratios Matter
                </h3>
                <div className="space-y-4 text-blue-700">
                  <p>
                    <strong>Compounding Impact:</strong> Even small differences in expense ratios can have 
                    a significant impact on long-term returns due to the power of compounding.
                  </p>
                  <p>
                    <strong>Predictable Costs:</strong> Unlike market returns, expense ratios are predictable 
                    and within your control, making them an important factor in fund selection.
                  </p>
                  <p>
                    <strong>Performance Comparison:</strong> Lower expense ratios often correlate with 
                    better net performance, especially in efficient markets.
                  </p>
                  <p>
                    <strong>Wealth Building:</strong> Minimizing costs maximizes the amount of money 
                    working for you and accelerates wealth building over time.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Best Practices for Expense Management
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Compare Before Investing:</strong> Always compare expense ratios between 
                    similar funds before making investment decisions.
                  </p>
                  <p>
                    <strong>Consider Index Funds:</strong> Index funds typically have lower expense ratios 
                    than actively managed funds while providing similar or better returns.
                  </p>
                  <p>
                    <strong>Monitor Regularly:</strong> Review your fund expenses periodically and 
                    consider switching to lower-cost alternatives when available.
                  </p>
                  <p>
                    <strong>Look Beyond Fees:</strong> While important, expense ratios should be considered 
                    alongside other factors like performance, risk, and investment strategy.
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

export default MutualFundExpenseRatioEstimator;