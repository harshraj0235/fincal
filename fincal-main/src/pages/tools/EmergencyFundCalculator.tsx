import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, TrendingUp, Calendar, AlertCircle, CheckCircle, DollarSign, PiggyBank, Clock, BarChart3, Info, Zap } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface EmergencyFundAnalysis {
  targetAmount: number;
  currentAmount: number;
  remainingAmount: number;
  monthlyContribution: number;
  monthsToTarget: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  scenarios: Array<{
    scenario: string;
    monthlyContribution: number;
    monthsToTarget: number;
    description: string;
  }>;
}

const EmergencyFundCalculator: React.FC = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [currentEmergencyFund, setCurrentEmergencyFund] = useState(0);
  const [targetMonths, setTargetMonths] = useState(6);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [analysis, setAnalysis] = useState<EmergencyFundAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateEmergencyFund = () => {
    if (monthlyExpenses <= 0) {
      alert('Please enter your monthly expenses');
      return;
    }

    const targetAmount = monthlyExpenses * targetMonths;
    const remainingAmount = Math.max(0, targetAmount - currentEmergencyFund);
    
    // Calculate months to target based on monthly contribution
    const monthsToTarget = monthlyContribution > 0 
      ? Math.ceil(remainingAmount / monthlyContribution)
      : 0;

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (currentEmergencyFund < monthlyExpenses * 3) {
      riskLevel = 'high';
    } else if (currentEmergencyFund < monthlyExpenses * 6) {
      riskLevel = 'medium';
    }

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (currentEmergencyFund === 0) {
      recommendations.push("Start building your emergency fund immediately. Even ₹5,000-₹10,000 can help in small emergencies.");
    } else if (currentEmergencyFund < monthlyExpenses * 3) {
      recommendations.push("Your emergency fund is below 3 months of expenses. This is a high-risk situation.");
      recommendations.push("Consider reducing discretionary spending to accelerate emergency fund building.");
    } else if (currentEmergencyFund < monthlyExpenses * 6) {
      recommendations.push("Good progress! Aim to reach 6 months of expenses for better financial security.");
      recommendations.push("Consider increasing your monthly contribution to reach your target faster.");
    } else {
      recommendations.push("Excellent! You have a well-funded emergency fund.");
      recommendations.push("Consider investing excess emergency fund in high-yield savings or short-term instruments.");
    }

    if (monthlyContribution > 0 && monthsToTarget > 12) {
      recommendations.push("Consider increasing your monthly contribution to reach your target within a year.");
    }

    if (targetMonths < 3) {
      recommendations.push("Consider increasing your target to at least 3-6 months for better financial security.");
    }

    // Generate different scenarios
    const scenarios = [
      {
        scenario: "Conservative",
        monthlyContribution: Math.ceil(remainingAmount / 12),
        monthsToTarget: 12,
        description: "Build emergency fund over 12 months"
      },
      {
        scenario: "Moderate",
        monthlyContribution: Math.ceil(remainingAmount / 8),
        monthsToTarget: 8,
        description: "Build emergency fund over 8 months"
      },
      {
        scenario: "Aggressive",
        monthlyContribution: Math.ceil(remainingAmount / 6),
        monthsToTarget: 6,
        description: "Build emergency fund over 6 months"
      }
    ];

    setAnalysis({
      targetAmount,
      currentAmount: currentEmergencyFund,
      remainingAmount,
      monthlyContribution,
      monthsToTarget,
      riskLevel,
      recommendations,
      scenarios
    });
    
    setShowResults(true);
  };

  const resetCalculator = () => {
    setMonthlyExpenses(0);
    setCurrentEmergencyFund(0);
    setTargetMonths(6);
    setMonthlyContribution(0);
    setAnalysis(null);
    setShowResults(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'medium': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'high': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <>
      <SEOHelmet
        title="Free Emergency Fund Calculator - Build Your Financial Safety Net | MoneyCal India"
        description="Calculate how much you need for your emergency fund and create a plan to build it. Get personalized recommendations for financial security and peace of mind."
        keywords="emergency fund calculator, financial safety net, emergency savings, financial security, money management, personal finance, savings planning"
        url="/tools/emergency-fund-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Emergency Fund Calculator",
          "description": "Calculate and plan your emergency fund for financial security",
          "url": "https://moneycal.in/tools/emergency-fund-calculator",
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
                  Emergency Fund Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Build your financial safety net with our comprehensive emergency fund calculator. 
                Get personalized recommendations and create a plan for financial security.
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
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                Emergency Fund Planning
              </h2>

              {/* Monthly Expenses */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Essential Expenses (₹)
                </label>
                <input
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your monthly essential expenses"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Include rent, groceries, utilities, insurance, and minimum debt payments
                </p>
              </div>

              {/* Current Emergency Fund */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Emergency Fund (₹)
                </label>
                <input
                  type="number"
                  value={currentEmergencyFund}
                  onChange={(e) => setCurrentEmergencyFund(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your current emergency fund amount"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Amount you currently have saved for emergencies
                </p>
              </div>

              {/* Target Months */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Emergency Fund Duration
                </label>
                <select
                  value={targetMonths}
                  onChange={(e) => setTargetMonths(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={3}>3 months of expenses</option>
                  <option value={6}>6 months of expenses (Recommended)</option>
                  <option value={9}>9 months of expenses</option>
                  <option value={12}>12 months of expenses</option>
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  Recommended: 6 months for most people, 12 months for freelancers/entrepreneurs
                </p>
              </div>

              {/* Monthly Contribution */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Contribution (₹)
                </label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter how much you can save monthly"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Amount you can contribute to your emergency fund each month
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={calculateEmergencyFund}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Calculate Emergency Fund
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
                        <h3 className="text-lg font-semibold text-gray-900">Target Amount</h3>
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">₹{analysis.targetAmount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">{targetMonths} months of expenses</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Remaining Amount</h3>
                        <PiggyBank className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.remainingAmount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Still needed</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Time to Target</h3>
                        <Calendar className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-3xl font-bold text-purple-600">{analysis.monthsToTarget}</p>
                      <p className="text-sm text-gray-500 mt-1">months</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Risk Level</h3>
                        {getRiskIcon(analysis.riskLevel)}
                      </div>
                      <p className={`text-2xl font-bold capitalize ${getRiskColor(analysis.riskLevel).split(' ')[0]}`}>
                        {analysis.riskLevel}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Financial risk</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                      Progress to Target
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Current: ₹{analysis.currentAmount.toLocaleString()}</span>
                        <span>Target: ₹{analysis.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(100, (analysis.currentAmount / analysis.targetAmount) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        {((analysis.currentAmount / analysis.targetAmount) * 100).toFixed(1)}% complete
                      </p>
                    </div>
                  </div>

                  {/* Different Scenarios */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                      Different Saving Scenarios
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.scenarios.map((scenario, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{scenario.scenario} Plan</h4>
                            <span className="text-sm text-gray-500">{scenario.monthsToTarget} months</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Monthly contribution:</span>
                            <span className="font-semibold text-blue-600">₹{scenario.monthlyContribution.toLocaleString()}</span>
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
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Plan Your Emergency Fund?</h3>
                  <p className="text-gray-600">
                    Enter your monthly expenses and current savings to get a personalized emergency fund plan with recommendations.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Emergency Fund Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why You Need an Emergency Fund</h3>
                <p className="text-gray-600 mb-4">
                  An emergency fund provides financial security during unexpected situations like job loss, medical emergencies, or major repairs.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Covers unexpected expenses without debt</li>
                  <li>• Provides peace of mind and reduces stress</li>
                  <li>• Prevents financial emergencies from becoming crises</li>
                  <li>• Allows you to take calculated risks</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How Much to Save</h3>
                <p className="text-gray-600 mb-4">
                  The amount depends on your situation, but 3-6 months of expenses is generally recommended.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 3 months: Minimum for most people</li>
                  <li>• 6 months: Recommended for most situations</li>
                  <li>• 9-12 months: For freelancers or unstable income</li>
                  <li>• Include only essential expenses</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Where to Keep It</h3>
                <p className="text-gray-600 mb-4">
                  Emergency funds should be easily accessible but separate from your regular spending account.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High-yield savings account</li>
                  <li>• Money market account</li>
                  <li>• Short-term fixed deposits</li>
                  <li>• Avoid investments with risk</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EmergencyFundCalculator;
