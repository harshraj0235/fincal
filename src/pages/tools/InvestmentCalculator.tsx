import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, Target, Calendar, PieChart, AlertCircle, CheckCircle, Zap, PiggyBank } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface InvestmentAnalysis {
  initialInvestment: number;
  monthlySIP: number;
  expectedReturn: number;
  investmentPeriod: number;
  totalInvested: number;
  totalValue: number;
  totalGains: number;
  gainPercentage: number;
  yearlyBreakdown: Array<{
    year: number;
    invested: number;
    value: number;
    gains: number;
  }>;
  scenarios: Array<{
    return: number;
    totalValue: number;
    totalGains: number;
    description: string;
  }>;
  recommendations: string[];
  riskAnalysis: {
    riskLevel: 'low' | 'medium' | 'high';
    description: string;
    suitableFor: string[];
  };
}

const InvestmentCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [analysis, setAnalysis] = useState<InvestmentAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateInvestment = () => {
    if (initialInvestment < 0 || monthlySIP < 0 || expectedReturn < 0 || investmentPeriod <= 0) {
      alert('Please enter valid investment parameters');
      return;
    }

    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;

    // Calculate future value of initial investment
    const futureValueOfInitial = initialInvestment * Math.pow(1 + expectedReturn / 100, investmentPeriod);
    
    // Calculate future value of SIP using SIP formula
    const futureValueOfSIP = monthlySIP * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const totalValue = futureValueOfInitial + futureValueOfSIP;
    const totalInvested = initialInvestment + (monthlySIP * totalMonths);
    const totalGains = totalValue - totalInvested;
    const gainPercentage = (totalGains / totalInvested) * 100;

    // Generate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const invested = initialInvestment + (monthlySIP * 12 * year);
      const value = calculateValueAtYear(year);
      const gains = value - invested;
      yearlyBreakdown.push({
        year,
        invested,
        value,
        gains
      });
    }

    // Generate different scenarios
    const scenarios = [
      {
        return: 8,
        totalValue: calculateValueAtReturn(8),
        totalGains: calculateValueAtReturn(8) - totalInvested,
        description: "Conservative (8% returns)"
      },
      {
        return: 12,
        totalValue: totalValue,
        totalGains: totalGains,
        description: "Moderate (12% returns)"
      },
      {
        return: 15,
        totalValue: calculateValueAtReturn(15),
        totalGains: calculateValueAtReturn(15) - totalInvested,
        description: "Aggressive (15% returns)"
      }
    ];

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (investmentPeriod < 5) {
      recommendations.push("Consider a longer investment horizon (5+ years) for better returns and risk management.");
    }
    
    if (expectedReturn < 10) {
      recommendations.push("Consider equity mutual funds for better long-term returns (12-15% expected).");
    }
    
    if (monthlySIP < 1000) {
      recommendations.push("Even small SIP amounts can grow significantly over time. Consider increasing if possible.");
    }
    
    if (gainPercentage > 200) {
      recommendations.push("Excellent potential returns! Stay disciplined with your SIP investments.");
    }
    
    if (totalInvested > totalValue * 0.8) {
      recommendations.push("Your investment is mostly principal. Consider longer investment horizon for better growth.");
    }

    // Risk analysis
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    let description = '';
    let suitableFor: string[] = [];

    if (expectedReturn <= 8) {
      riskLevel = 'low';
      description = 'Low risk investments suitable for conservative investors';
      suitableFor = ['Conservative investors', 'Near retirement', 'Short-term goals'];
    } else if (expectedReturn <= 12) {
      riskLevel = 'medium';
      description = 'Moderate risk investments with balanced growth potential';
      suitableFor = ['Balanced investors', 'Medium-term goals', 'Regular income earners'];
    } else {
      riskLevel = 'high';
      description = 'High risk investments with potential for higher returns';
      suitableFor = ['Aggressive investors', 'Long-term goals', 'Young investors'];
    }

    setAnalysis({
      initialInvestment,
      monthlySIP,
      expectedReturn,
      investmentPeriod,
      totalInvested,
      totalValue,
      totalGains,
      gainPercentage,
      yearlyBreakdown,
      scenarios,
      recommendations,
      riskAnalysis: {
        riskLevel,
        description,
        suitableFor
      }
    });
    
    setShowResults(true);
  };

  const calculateValueAtYear = (year: number) => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = year * 12;
    
    const futureValueOfInitial = initialInvestment * Math.pow(1 + expectedReturn / 100, year);
    const futureValueOfSIP = monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return futureValueOfInitial + futureValueOfSIP;
  };

  const calculateValueAtReturn = (returnRate: number) => {
    const monthlyRate = returnRate / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    const futureValueOfInitial = initialInvestment * Math.pow(1 + returnRate / 100, investmentPeriod);
    const futureValueOfSIP = monthlySIP * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return futureValueOfInitial + futureValueOfSIP;
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const resetCalculator = () => {
    setInitialInvestment(100000);
    setMonthlySIP(5000);
    setExpectedReturn(12);
    setInvestmentPeriod(10);
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Investment Calculator - SIP & Lump Sum Investment Calculator | MoneyCal India"
        description="Calculate your investment returns with our comprehensive SIP and lump sum calculator. Plan your investments, analyze different scenarios, and get personalized recommendations for wealth building."
        keywords="investment Calculator, SIP Calculator, mutual fund Calculator, investment planning, wealth building, compound interest, investment returns, financial planning"
        url="/tools/investment-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Investment Calculator",
          "description": "Calculate investment returns and plan your wealth building strategy",
          "url": "/tools/investment-calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser"
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Investment Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your investment returns with SIP and lump sum investments. Analyze different scenarios, 
                understand compound growth, and get personalized recommendations for wealth building.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                Investment Planning
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment (₹)</label>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter lump sum amount"
                  />
                  <p className="text-sm text-gray-500 mt-1">One-time investment amount</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly SIP (₹)</label>
                  <input
                    type="number"
                    value={monthlySIP}
                    onChange={(e) => setMonthlySIP(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter monthly SIP amount"
                  />
                  <p className="text-sm text-gray-500 mt-1">Systematic Investment Plan amount</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 12"
                  />
                  <p className="text-sm text-gray-500 mt-1">Expected annual return on investment</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                  <input
                    type="number"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 10"
                    min="1"
                    max="50"
                  />
                  <p className="text-sm text-gray-500 mt-1">Duration of investment in years</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateInvestment}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Calculate Investment
                </button>
                <button
                  onClick={resetCalculator}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {showResults && analysis && (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Invested</h3>
                        <PiggyBank className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">₹{analysis.totalInvested.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Principal amount</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Value</h3>
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.totalValue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">After {analysis.investmentPeriod} years</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Gains</h3>
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-3xl font-bold text-purple-600">₹{analysis.totalGains.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Profit earned</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Gain %</h3>
                        <Target className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{analysis.gainPercentage.toFixed(1)}%</p>
                      <p className="text-sm text-gray-500 mt-1">Return on investment</p>
                    </div>
                  </div>

                  {/* Risk Analysis */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3 text-blue-600" />
                      Risk Analysis
                    </h3>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <span className={`px-4 py-2 rounded-full text-lg font-semibold ${getRiskColor(analysis.riskAnalysis.riskLevel)}`}>
                          {analysis.riskAnalysis.riskLevel.toUpperCase()} RISK
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{analysis.riskAnalysis.description}</p>
                      <div className="space-y-2">
                        <p className="font-semibold text-gray-900">Suitable for:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {analysis.riskAnalysis.suitableFor.map((item, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Yearly Breakdown */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                      Yearly Breakdown
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.yearlyBreakdown.slice(0, 10).map((year, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900">Year {year.year}</h4>
                            <p className="text-sm text-gray-600">Invested: ₹{year.invested.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{year.value.toLocaleString()}</p>
                            <p className="text-sm text-green-600">+₹{year.gains.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      {analysis.yearlyBreakdown.length > 10 && (
                        <p className="text-center text-gray-500 text-sm">
                          ... and {analysis.yearlyBreakdown.length - 10} more years
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Different Scenarios */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Different Scenarios
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.scenarios.map((scenario, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{scenario.description}</h4>
                            <span className="text-sm font-semibold text-blue-600">{scenario.return}% returns</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Total Value</p>
                              <p className="font-semibold text-gray-900">₹{scenario.totalValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Total Gains</p>
                              <p className="font-semibold text-gray-900">₹{scenario.totalGains.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Personalized Recommendations
                    </h3>
                    
                    <div className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!showResults && (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your Investment?</h3>
                  <p className="text-gray-600">
                    Enter your investment details to see the power of compound interest and get personalized recommendations.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Educational Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment Planning Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Power of Compound Interest</h3>
                <p className="text-gray-600 mb-4">
                  Compound interest is the eighth wonder of the world. It allows your money to grow exponentially over time.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Start investing early for maximum benefit</li>
                  <li>• Even small amounts can grow significantly</li>
                  <li>• Time is your greatest asset</li>
                  <li>• Consistency beats perfection</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">SIP vs Lump Sum</h3>
                <p className="text-gray-600 mb-4">
                  Both SIP and lump sum investments have their advantages. Choose based on your financial situation.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• SIP: Reduces market timing risk</li>
                  <li>• Lump Sum: Better for long-term growth</li>
                  <li>• Combine both for optimal results</li>
                  <li>• SIP is great for regular income</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Strategies</h3>
                <p className="text-gray-600 mb-4">
                  Different investment strategies work for different goals and risk appetites.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Diversify across asset classes</li>
                  <li>• Rebalance portfolio regularly</li>
                  <li>• Stay invested for long term</li>
                  <li>• Review and adjust annually</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default InvestmentCalculator;
