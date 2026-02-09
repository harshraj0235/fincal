import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, ArrowRight, Target, AlertTriangle, Shield } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MutualFundRiskAnalyzer: React.FC = () => {
  const [fundType, setFundType] = useState('equity');
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [timeHorizon, setTimeHorizon] = useState(5);
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [volatility, setVolatility] = useState(15);

  const calculateRiskAnalysis = () => {
    // Risk factors based on fund type
    const riskFactors = {
      equity: { baseRisk: 8, maxDrawdown: 25, volatilityMultiplier: 1.2 },
      debt: { baseRisk: 3, maxDrawdown: 5, volatilityMultiplier: 0.3 },
      hybrid: { baseRisk: 5, maxDrawdown: 15, volatilityMultiplier: 0.8 },
      liquid: { baseRisk: 1, maxDrawdown: 1, volatilityMultiplier: 0.1 }
    };

    const selectedRisk = riskFactors[fundType as keyof typeof riskFactors];
    
    // Calculate risk metrics
    const adjustedVolatility = volatility * selectedRisk.volatilityMultiplier;
    const maxDrawdown = selectedRisk.maxDrawdown;
    const riskScore = selectedRisk.baseRisk + (adjustedVolatility / 10);
    
    // Calculate potential losses
    const worstCaseLoss = investmentAmount * (maxDrawdown / 100);
    const expectedLoss = investmentAmount * (adjustedVolatility / 100);
    
    // Calculate risk-adjusted return
    const riskAdjustedReturn = expectedReturn - adjustedVolatility;
    
    // Calculate probability of loss
    const probabilityOfLoss = Math.min(50, adjustedVolatility * 2);
    
    // Calculate recovery time
    const recoveryTime = Math.ceil(maxDrawdown / (expectedReturn - 2));
    
    // Risk assessment
    let riskLevel = 'Low';
    let riskColor = 'green';
    if (riskScore > 7) {
      riskLevel = 'High';
      riskColor = 'red';
    } else if (riskScore > 4) {
      riskLevel = 'Moderate';
      riskColor = 'orange';
    }
    
    // Suitability check
    const riskToleranceScores = { low: 3, moderate: 6, high: 9 };
    const toleranceScore = riskToleranceScores[riskTolerance as keyof typeof riskToleranceScores];
    const isSuitable = riskScore <= toleranceScore;
    
    // Yearly risk projection
    const yearlyProjection = [];
    for (let year = 1; year <= timeHorizon; year++) {
      const optimistic = investmentAmount * Math.pow(1 + expectedReturn / 100, year);
      const pessimistic = investmentAmount * Math.pow(1 + (expectedReturn - adjustedVolatility) / 100, year);
      const worstCase = investmentAmount * Math.pow(1 - maxDrawdown / 100, year);
      
      yearlyProjection.push({
        year,
        optimistic,
        pessimistic,
        worstCase,
        expected: investmentAmount * Math.pow(1 + expectedReturn / 100, year)
      });
    }
    
    return {
      riskScore,
      riskLevel,
      riskColor,
      adjustedVolatility,
      maxDrawdown,
      worstCaseLoss,
      expectedLoss,
      riskAdjustedReturn,
      probabilityOfLoss,
      recoveryTime,
      isSuitable,
      toleranceScore,
      yearlyProjection
    };
  };

  const results = calculateRiskAnalysis();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Mutual Fund Risk Analyzer - Analyze Investment Risk Profile"
        description="Analyze the risk profile of mutual funds and understand potential losses, volatility, and suitability for your investment goals."
        keywords="mutual fund risk analyzer, investment risk analysis, fund risk assessment, volatility calculator"
        url="/finance-tools/mutual-fund-risk-analyzer"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Link to="/finance-tools" className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
              <ArrowRight className="h-4 w-4 rotate-180 mr-1" />
              Back to Finance Tools
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mutual Fund Risk Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Analyze the risk profile of mutual funds and understand potential losses, volatility, and suitability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
              Fund Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fund Type</label>
                <select value={fundType} onChange={(e) => setFundType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="equity">Equity Fund</option>
                  <option value="debt">Debt Fund</option>
                  <option value="hybrid">Hybrid Fund</option>
                  <option value="liquid">Liquid Fund</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₹)</label>
                <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="100000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon (Years)</label>
                <input type="number" value={timeHorizon} onChange={(e) => setTimeHorizon(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                <select value={riskTolerance} onChange={(e) => setRiskTolerance(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="12" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volatility (%)</label>
                <input type="number" value={volatility} onChange={(e) => setVolatility(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="15" />
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
                Risk Assessment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`rounded-lg p-4 ${results.riskColor === 'red' ? 'bg-red-50' : results.riskColor === 'orange' ? 'bg-orange-50' : 'bg-green-50'}`}>
                  <h3 className={`text-sm font-medium mb-2 ${results.riskColor === 'red' ? 'text-red-800' : results.riskColor === 'orange' ? 'text-orange-800' : 'text-green-800'}`}>Risk Level</h3>
                  <p className={`text-2xl font-bold ${results.riskColor === 'red' ? 'text-red-900' : results.riskColor === 'orange' ? 'text-orange-900' : 'text-green-900'}`}>{results.riskLevel}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Risk Score</h3>
                  <p className="text-2xl font-bold text-blue-900">{results.riskScore.toFixed(1)}/10</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Adjusted Volatility</h3>
                  <p className="text-2xl font-bold text-purple-900">{results.adjustedVolatility.toFixed(1)}%</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Max Drawdown</h3>
                  <p className="text-2xl font-bold text-orange-900">{results.maxDrawdown}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-blue-600" />
                Loss Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Worst Case Loss</h3>
                  <p className="text-2xl font-bold text-red-900">₹{results.worstCaseLoss.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Expected Loss</h3>
                  <p className="text-2xl font-bold text-orange-900">₹{results.expectedLoss.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Risk-Adjusted Return</h3>
                  <p className="text-2xl font-bold text-green-900">{results.riskAdjustedReturn.toFixed(1)}%</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Recovery Time</h3>
                  <p className="text-2xl font-bold text-blue-900">{results.recoveryTime} years</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Suitability Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`rounded-lg p-6 ${results.isSuitable ? 'bg-green-50' : 'bg-red-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${results.isSuitable ? 'text-green-900' : 'text-red-900'}`}>Suitability Check</h3>
              <p className={`text-3xl font-bold mb-2 ${results.isSuitable ? 'text-green-900' : 'text-red-900'}`}>
                {results.isSuitable ? 'Suitable' : 'Not Suitable'}
              </p>
              <p className={`text-sm ${results.isSuitable ? 'text-green-700' : 'text-red-700'}`}>
                {results.isSuitable 
                  ? 'This fund matches your risk tolerance level' 
                  : 'This fund exceeds your risk tolerance level'}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Risk Tolerance Match</h3>
              <p className="text-3xl font-bold text-blue-900 mb-2">{results.toleranceScore}/10</p>
              <p className="text-sm text-blue-700">Your risk tolerance score</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
            Yearly Risk Projection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.yearlyProjection.map((year) => (
              <div key={year.year} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Year {year.year}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Optimistic:</span>
                    <span className="font-medium text-green-600">₹{year.optimistic.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected:</span>
                    <span className="font-medium">₹{year.expected.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pessimistic:</span>
                    <span className="font-medium text-orange-600">₹{year.pessimistic.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Worst Case:</span>
                    <span className="font-medium text-red-600">₹{year.worstCase.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/finance-tools/asset-allocation-tool" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Asset Allocation Tool</h3>
              <p className="text-sm text-gray-600">Optimize your investment portfolio</p>
            </Link>
            <Link to="/finance-tools/portfolio-diversification-visualizer" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Portfolio Diversification</h3>
              <p className="text-sm text-gray-600">Visualize portfolio diversification</p>
            </Link>
            <Link to="/finance-tools" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">All Finance Tools</h3>
              <p className="text-sm text-gray-600">Explore our complete collection</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MutualFundRiskAnalyzer;
