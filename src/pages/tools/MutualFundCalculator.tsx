import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, Target, PieChart, AlertCircle, CheckCircle, Zap, Info, PiggyBank } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface MutualFundAnalysis {
  investmentAmount: number;
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
  fundTypes: Array<{
    type: string;
    expectedReturn: number;
    risk: string;
    description: string;
    color: string;
  }>;
  recommendations: string[];
  riskAnalysis: {
    riskLevel: 'low' | 'medium' | 'high';
    description: string;
    suitableFor: string[];
  };
  taxImplications: {
    stcg: number;
    ltcg: number;
    totalTax: number;
    afterTaxValue: number;
  };
}

const MutualFundCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [fundType, setFundType] = useState('equity');
  const [analysis, setAnalysis] = useState<MutualFundAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateMutualFund = () => {
    if (investmentAmount < 0 || monthlySIP < 0 || expectedReturn < 0 || investmentPeriod <= 0) {
      alert('Please enter valid investment parameters');
      return;
    }

    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;

    // Calculate future value of lump sum investment
    const futureValueOfLumpSum = investmentAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
    
    // Calculate future value of SIP using SIP formula
    const futureValueOfSIP = monthlySIP * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const totalValue = futureValueOfLumpSum + futureValueOfSIP;
    const totalInvested = investmentAmount + (monthlySIP * totalMonths);
    const totalGains = totalValue - totalInvested;
    const gainPercentage = (totalGains / totalInvested) * 100;

    // Generate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const invested = investmentAmount + (monthlySIP * 12 * year);
      const value = calculateValueAtYear(year);
      const gains = value - invested;
      yearlyBreakdown.push({
        year,
        invested,
        value,
        gains
      });
    }

    // Fund types analysis
    const fundTypes = [
      {
        type: 'Equity Funds',
        expectedReturn: 12,
        risk: 'High',
        description: 'Invest in stocks, higher returns but higher risk',
        color: 'bg-red-500'
      },
      {
        type: 'Debt Funds',
        expectedReturn: 7,
        risk: 'Low',
        description: 'Invest in bonds, stable returns with low risk',
        color: 'bg-green-500'
      },
      {
        type: 'Hybrid Funds',
        expectedReturn: 9,
        risk: 'Medium',
        description: 'Mix of equity and debt, balanced risk-return',
        color: 'bg-yellow-500'
      },
      {
        type: 'ELSS Funds',
        expectedReturn: 12,
        risk: 'High',
        description: 'Tax-saving equity funds with 3-year lock-in',
        color: 'bg-blue-500'
      }
    ];

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (investmentPeriod < 5) {
      recommendations.push("Consider debt funds or hybrid funds for short-term investments (less than 5 years).");
    }
    
    if (expectedReturn < 8) {
      recommendations.push("Consider equity funds for better long-term returns if you can handle volatility.");
    }
    
    if (monthlySIP < 1000) {
      recommendations.push("Even small SIP amounts can grow significantly over time. Consider increasing if possible.");
    }
    
    if (gainPercentage > 200) {
      recommendations.push("Excellent potential returns! Stay disciplined with your SIP investments.");
    }
    
    if (fundType === 'equity' && investmentPeriod < 7) {
      recommendations.push("Equity funds are best for long-term investments (7+ years) to ride out market volatility.");
    }

    // Risk analysis
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    let description = '';
    let suitableFor: string[] = [];

    if (fundType === 'debt') {
      riskLevel = 'low';
      description = 'Low risk investments suitable for conservative investors';
      suitableFor = ['Conservative investors', 'Short-term goals', 'Risk-averse individuals'];
    } else if (fundType === 'hybrid') {
      riskLevel = 'medium';
      description = 'Moderate risk investments with balanced growth potential';
      suitableFor = ['Balanced investors', 'Medium-term goals', 'Regular income earners'];
    } else {
      riskLevel = 'high';
      description = 'High risk investments with potential for higher returns';
      suitableFor = ['Aggressive investors', 'Long-term goals', 'Young investors'];
    }

    // Tax implications
    const stcg = calculateSTCG(totalValue);
    const ltcg = calculateLTCG(totalValue, totalInvested);
    const totalTax = stcg + ltcg;
    const afterTaxValue = totalValue - totalTax;

    setAnalysis({
      investmentAmount,
      monthlySIP,
      expectedReturn,
      investmentPeriod,
      totalInvested,
      totalValue,
      totalGains,
      gainPercentage,
      yearlyBreakdown,
      fundTypes,
      recommendations,
      riskAnalysis: {
        riskLevel,
        description,
        suitableFor
      },
      taxImplications: {
        stcg,
        ltcg,
        totalTax,
        afterTaxValue
      }
    });
    
    setShowResults(true);
  };

  const calculateValueAtYear = (year: number) => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = year * 12;
    
    const futureValueOfLumpSum = investmentAmount * Math.pow(1 + expectedReturn / 100, year);
    const futureValueOfSIP = monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    return futureValueOfLumpSum + futureValueOfSIP;
  };

  const calculateSTCG = (totalValue: number) => {
    // Short-term capital gains (held for less than 1 year) - 15% for equity funds
    if (fundType === 'equity' || fundType === 'elss') {
      return totalValue * 0.15; // Simplified calculation
    }
    return 0;
  };

  const calculateLTCG = (totalValue: number, totalInvested: number) => {
    // Long-term capital gains (held for more than 1 year)
    if (fundType === 'equity' || fundType === 'elss') {
      const gains = totalValue - totalInvested;
      const exemptAmount = Math.min(100000, gains); // ₹1 lakh exemption
      return Math.max(0, (gains - exemptAmount) * 0.10); // 10% on gains above ₹1 lakh
    }
    return 0;
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
    setInvestmentAmount(100000);
    setMonthlySIP(5000);
    setExpectedReturn(12);
    setInvestmentPeriod(10);
    setFundType('equity');
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Mutual Fund Calculator - SIP & Lump Sum Investment Calculator | MoneyCal India"
        description="Calculate your mutual fund returns with our comprehensive SIP and lump sum calculator. Analyze different fund types, risk levels, and get personalized recommendations for wealth building."
        keywords="mutual fund Calculator, SIP Calculator, mutual fund returns, equity funds, debt funds, hybrid funds, ELSS, tax saving mutual funds, investment planning"
        url="/tools/mutual-fund-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Mutual Fund Calculator",
          "description": "Calculate mutual fund returns and plan your SIP investments",
          "url": "/tools/mutual-fund-calculator",
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
                  Mutual Fund Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your mutual fund returns with SIP and lump sum investments. Analyze different fund types, 
                risk levels, tax implications, and get personalized recommendations for wealth building.
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lump Sum Investment (₹)</label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fund Type</label>
                  <select
                    value={fundType}
                    onChange={(e) => setFundType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="equity">Equity Funds</option>
                    <option value="debt">Debt Funds</option>
                    <option value="hybrid">Hybrid Funds</option>
                    <option value="elss">ELSS Funds</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateMutualFund}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Calculate Returns
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

                  {/* Fund Types Comparison */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Fund Types Comparison
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.fundTypes.map((fund, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full ${fund.color} mr-3`}></div>
                              <h4 className="font-semibold text-gray-900">{fund.type}</h4>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(fund.risk.toLowerCase())}`}>
                              {fund.risk} Risk
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{fund.description}</p>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">Expected Return: {fund.expectedReturn}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tax Implications */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Info className="w-6 h-6 mr-3 text-blue-600" />
                      Tax Implications
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">After Tax Value</h4>
                        <p className="text-2xl font-bold text-green-600">₹{analysis.taxImplications.afterTaxValue.toLocaleString()}</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Total Tax</h4>
                        <p className="text-2xl font-bold text-red-600">₹{analysis.taxImplications.totalTax.toLocaleString()}</p>
                      </div>
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your Mutual Fund Returns?</h3>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mutual Fund Investment Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Types of Mutual Funds</h3>
                <p className="text-gray-600 mb-4">
                  Different types of mutual funds cater to different investment goals and risk appetites.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Equity Funds: High growth potential</li>
                  <li>• Debt Funds: Stable returns, low risk</li>
                  <li>• Hybrid Funds: Balanced approach</li>
                  <li>• ELSS Funds: Tax-saving investments</li>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tax Benefits</h3>
                <p className="text-gray-600 mb-4">
                  Mutual funds offer various tax benefits depending on the type and holding period.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• ELSS: ₹1.5L deduction under 80C</li>
                  <li>• LTCG: ₹1L exemption for equity funds</li>
                  <li>• STCG: 15% tax for equity funds</li>
                  <li>• Debt funds: As per income tax slab</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MutualFundCalculator;
