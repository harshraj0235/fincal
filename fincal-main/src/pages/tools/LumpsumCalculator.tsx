import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Calculator, TrendingUp, PieChart, BarChart3, Target, AlertCircle } from 'lucide-react';

const LumpsumCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    principal: 100000,
    expectedReturn: 12,
    timePeriod: 5,
    inflation: 6
  });

  const [results, setResults] = useState({
    maturityValue: 0,
    totalGains: 0,
    realValue: 0,
    realGains: 0
  });

  const calculateResults = () => {
    const { principal, expectedReturn, timePeriod, inflation } = inputs;
    
    // Calculate maturity value using compound interest formula
    const maturityValue = principal * Math.pow(1 + expectedReturn / 100, timePeriod);
    
    // Calculate total gains
    const totalGains = maturityValue - principal;
    
    // Calculate real value (adjusted for inflation)
    const realValue = maturityValue / Math.pow(1 + inflation / 100, timePeriod);
    
    // Calculate real gains
    const realGains = realValue - principal;
    
    setResults({
      maturityValue,
      totalGains,
      realValue,
      realGains
    });
  };

  React.useEffect(() => {
    calculateResults();
  }, [inputs]);

  const handleInputChange = (field: string, value: number) => {
    setInputs({ ...inputs, [field]: value });
  };

  const getReturnComparison = () => {
    const { principal, timePeriod } = inputs;
    const simpleInterest = principal * (1 + (inputs.expectedReturn * timePeriod) / 100);
    const compoundInterest = results.maturityValue;
    const difference = compoundInterest - simpleInterest;
    
    return {
      simpleInterest,
      compoundInterest,
      difference,
      percentage: ((difference / simpleInterest) * 100)
    };
  };

  const comparison = getReturnComparison();

  const getYearlyBreakdown = () => {
    const { principal, expectedReturn } = inputs;
    const breakdown = [];
    
    for (let year = 1; year <= inputs.timePeriod; year++) {
      const value = principal * Math.pow(1 + expectedReturn / 100, year);
      const gains = value - principal;
      breakdown.push({
        year,
        value,
        gains,
        percentage: ((gains / principal) * 100)
      });
    }
    
    return breakdown;
  };

  const yearlyBreakdown = getYearlyBreakdown();

  const getRiskAssessment = () => {
    const { expectedReturn, timePeriod } = inputs;
    
    if (expectedReturn > 15) {
      return { level: 'High', color: 'text-red-600', bg: 'bg-red-50', description: 'High risk, high return potential' };
    } else if (expectedReturn > 10) {
      return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', description: 'Moderate risk, balanced returns' };
    } else {
      return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50', description: 'Low risk, stable returns' };
    }
  };

  const riskAssessment = getRiskAssessment();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <SEOHelmet
        title="Lumpsum Calculator - Calculate Lumpsum Investment Returns | MoneyCal India"
        description="Calculate returns from lumpsum investments with our comprehensive calculator. Get detailed analysis of maturity value, gains, inflation-adjusted returns, and yearly breakdown."
        keywords="lumpsum calculator, lumpsum investment, compound interest, investment calculator, lumpsum returns, investment planning, financial calculator"
        canonicalUrl="https://moneycal.in/tools/lumpsum-calculator"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Lumpsum Investment Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate the potential returns from your lumpsum investment with detailed analysis of maturity value, gains, and inflation-adjusted returns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Investment Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-600" />
                  Investment Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.principal}
                      onChange={(e) => handleInputChange('principal', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter investment amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.expectedReturn}
                      onChange={(e) => handleInputChange('expectedReturn', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter expected return"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <input
                      type="number"
                      value={inputs.timePeriod}
                      onChange={(e) => handleInputChange('timePeriod', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter time period"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.inflation}
                      onChange={(e) => handleInputChange('inflation', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter inflation rate"
                    />
                  </div>
                </div>
              </div>

              {/* Yearly Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
                  Yearly Breakdown
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Investment Value</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Gains</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Gain %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyBreakdown.map((item) => (
                        <tr key={item.year} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{item.year}</td>
                          <td className="py-3 px-4 text-right text-gray-900">₹{item.value.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-green-600">₹{item.gains.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-blue-600">{item.percentage.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Investment Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Investment Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Initial Investment</span>
                    <span className="font-semibold text-gray-900">₹{inputs.principal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Maturity Value</span>
                    <span className="font-semibold text-green-600">₹{results.maturityValue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Total Gains</span>
                    <span className="font-semibold text-blue-600">₹{results.totalGains.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Real Value (Inflation Adjusted)</span>
                    <span className="font-semibold text-purple-600">₹{results.realValue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-700">Real Gains</span>
                    <span className="font-semibold text-orange-600">₹{results.realGains.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-600" />
                  Risk Assessment
                </h2>
                
                <div className={`p-4 rounded-lg ${riskAssessment.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Risk Level</span>
                    <span className={`font-semibold ${riskAssessment.color}`}>{riskAssessment.level}</span>
                  </div>
                  <p className="text-sm text-gray-600">{riskAssessment.description}</p>
                </div>
              </div>

              {/* Compound vs Simple Interest */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-purple-600" />
                  Compound vs Simple Interest
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Simple Interest</span>
                    <span className="font-semibold text-gray-900">₹{comparison.simpleInterest.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Compound Interest</span>
                    <span className="font-semibold text-green-600">₹{comparison.compoundInterest.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Extra Gains</span>
                    <span className="font-semibold text-blue-600">₹{comparison.difference.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Extra Gain %</span>
                    <span className="font-semibold text-purple-600">{comparison.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-blue-600" />
                  Recommendations
                </h2>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Long-term Focus:</strong> Lumpsum investments work best for long-term goals (5+ years).
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Diversification:</strong> Consider diversifying across different asset classes.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Tax Planning:</strong> Consider tax-saving investments like ELSS for better post-tax returns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Lumpsum Investment Guide</h2>
            
            <div className="prose max-w-none">
              <h3>What is Lumpsum Investment?</h3>
              <p>
                A lumpsum investment is when you invest a large amount of money at once, rather than investing smaller amounts 
                regularly over time. This approach can be beneficial for investors who have a significant amount of money 
                available and want to maximize their returns through compound interest.
              </p>
              
              <h3>Benefits of Lumpsum Investment</h3>
              <ul>
                <li><strong>Higher Returns:</strong> More money invested means higher absolute returns</li>
                <li><strong>Compound Interest:</strong> Your money grows exponentially over time</li>
                <li><strong>Time in Market:</strong> Your money starts working for you immediately</li>
                <li><strong>Lower Costs:</strong> Fewer transactions mean lower transaction costs</li>
                <li><strong>Simplicity:</strong> One-time investment is easier to manage</li>
              </ul>
              
              <h3>When to Choose Lumpsum Investment</h3>
              <ul>
                <li>When you have a large amount of money available</li>
                <li>For long-term financial goals (5+ years)</li>
                <li>When you're confident about market timing</li>
                <li>For tax-saving investments like ELSS</li>
                <li>When you want to maximize compound interest benefits</li>
              </ul>
              
              <h3>Lumpsum vs SIP</h3>
              <ul>
                <li><strong>Lumpsum:</strong> Higher returns potential, requires market timing, higher risk</li>
                <li><strong>SIP:</strong> Lower risk, rupee cost averaging, disciplined investing</li>
                <li><strong>Hybrid Approach:</strong> Combine both strategies for optimal results</li>
              </ul>
              
              <h3>Tips for Lumpsum Investment</h3>
              <ul>
                <li>Research and choose the right investment options</li>
                <li>Consider your risk tolerance and investment horizon</li>
                <li>Diversify across different asset classes</li>
                <li>Review and rebalance your portfolio regularly</li>
                <li>Consider tax implications of your investments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LumpsumCalculator;
