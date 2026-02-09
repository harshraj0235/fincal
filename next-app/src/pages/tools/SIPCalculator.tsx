import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart3, Target, Calendar, PieChart, AlertCircle, CheckCircle, Zap, Info, Star, Clock, PiggyBank } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface SIPAnalysis {
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
  taxImplications: {
    stcg: number;
    ltcg: number;
    totalTax: number;
    afterTaxValue: number;
  };
  milestones: Array<{
    year: number;
    value: number;
    description: string;
  }>;
}

const SIPCalculator: React.FC = () => {
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [analysis, setAnalysis] = useState<SIPAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateSIP = () => {
    if (monthlySIP <= 0 || expectedReturn < 0 || investmentPeriod <= 0) {
      alert('Please enter valid SIP parameters');
      return;
    }

    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;

    // Calculate future value of SIP using SIP formula
    const totalValue = monthlySIP * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = monthlySIP * totalMonths;
    const totalGains = totalValue - totalInvested;
    const gainPercentage = (totalGains / totalInvested) * 100;

    // Generate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const invested = monthlySIP * 12 * year;
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

    // Tax implications
    const stcg = calculateSTCG(totalValue, totalInvested);
    const ltcg = calculateLTCG(totalValue, totalInvested);
    const totalTax = stcg + ltcg;
    const afterTaxValue = totalValue - totalTax;

    // Generate milestones
    const milestones = [];
    for (let year = 5; year <= investmentPeriod; year += 5) {
      const value = calculateValueAtYear(year);
      milestones.push({
        year,
        value,
        description: `₹${value.toLocaleString()} at year ${year}`
      });
    }

    setAnalysis({
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
      },
      taxImplications: {
        stcg,
        ltcg,
        totalTax,
        afterTaxValue
      },
      milestones
    });
    
    setShowResults(true);
  };

  const calculateValueAtYear = (year: number) => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = year * 12;
    
    return monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  };

  const calculateValueAtReturn = (returnRate: number) => {
    const monthlyRate = returnRate / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    return monthlySIP * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  };

  const calculateSTCG = (totalValue: number, totalInvested: number) => {
    // Short-term capital gains (held for less than 1 year) - 15% for equity funds
    return totalValue * 0.15; // Simplified calculation
  };

  const calculateLTCG = (totalValue: number, totalInvested: number) => {
    // Long-term capital gains (held for more than 1 year)
    const gains = totalValue - totalInvested;
    const exemptAmount = Math.min(100000, gains); // ₹1 lakh exemption
    return Math.max(0, (gains - exemptAmount) * 0.10); // 10% on gains above ₹1 lakh
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
    setMonthlySIP(5000);
    setExpectedReturn(12);
    setInvestmentPeriod(10);
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free SIP Calculator - Calculate SIP Returns & Investment Growth | MoneyCal India"
        description="Calculate your SIP returns with our comprehensive SIP calculator. Analyze different scenarios, risk levels, tax implications, and get personalized recommendations for wealth building."
        keywords="SIP calculator, systematic investment plan, SIP returns, mutual fund SIP, SIP investment, compound interest, wealth building, investment planning"
        url="/tools/sip-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SIP Calculator",
          "description": "Calculate SIP returns and plan your systematic investments",
          "url": "https://moneycal.in/tools/sip-calculator",
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
                  SIP Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your SIP returns and see the power of compound interest. Analyze different scenarios, 
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
                SIP Investment Planning
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly SIP Amount (₹)</label>
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
                  <p className="text-sm text-gray-500 mt-1">Duration of SIP investment</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateSIP}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Calculate SIP Returns
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

                  {/* Investment Milestones */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-3 text-blue-600" />
                      Investment Milestones
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-900">Year {milestone.year}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{milestone.value.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Different Scenarios */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Different Return Scenarios
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.scenarios.map((scenario, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your SIP Returns?</h3>
                  <p className="text-gray-600">
                    Enter your SIP details to see the power of compound interest and get personalized recommendations.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">SIP Investment Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What is SIP?</h3>
                <p className="text-gray-600 mb-4">
                  SIP (Systematic Investment Plan) is a disciplined approach to investing in mutual funds.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Invest fixed amount regularly</li>
                  <li>• Reduces market timing risk</li>
                  <li>• Benefits from rupee cost averaging</li>
                  <li>• Builds wealth over time</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits of SIP</h3>
                <p className="text-gray-600 mb-4">
                  SIP offers several advantages over lump sum investments for long-term wealth building.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Disciplined investing</li>
                  <li>• Lower average cost</li>
                  <li>• Power of compounding</li>
                  <li>• Flexible investment amounts</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">SIP Strategies</h3>
                <p className="text-gray-600 mb-4">
                  Different SIP strategies can help you achieve your financial goals effectively.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Start early for maximum benefit</li>
                  <li>• Increase SIP amount annually</li>
                  <li>• Diversify across fund types</li>
                  <li>• Stay invested for long term</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SIPCalculator;
