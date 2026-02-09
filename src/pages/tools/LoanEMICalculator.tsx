import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Calendar, TrendingUp, AlertCircle, CheckCircle, Zap, Info, Star, BarChart3, Target, PieChart } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface EMIAnalysis {
  principal: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
  scenarios: Array<{
    tenure: number;
    emi: number;
    totalInterest: number;
    savings: number;
  }>;
  recommendations: string[];
  prepaymentAnalysis: {
    prepaymentAmount: number;
    newEMI: number;
    interestSaved: number;
    tenureReduced: number;
  };
}

const LoanEMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(20);
  const [prepaymentAmount, setPrepaymentAmount] = useState(0);
  const [analysis, setAnalysis] = useState<EMIAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateEMI = () => {
    if (principal <= 0 || interestRate < 0 || tenure <= 0) {
      alert('Please enter valid loan parameters');
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenure * 12;
    
    // Calculate EMI using the formula
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule
    const amortizationSchedule = [];
    let balance = principal;
    
    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance = balance - principalPayment;
      
      amortizationSchedule.push({
        month,
        emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    // Generate different scenarios
    const scenarios = [
      {
        tenure: tenure - 5,
        emi: calculateEMIForTenure(tenure - 5),
        totalInterest: calculateTotalInterestForTenure(tenure - 5),
        savings: totalInterest - calculateTotalInterestForTenure(tenure - 5)
      },
      {
        tenure: tenure,
        emi: emi,
        totalInterest: totalInterest,
        savings: 0
      },
      {
        tenure: tenure + 5,
        emi: calculateEMIForTenure(tenure + 5),
        totalInterest: calculateTotalInterestForTenure(tenure + 5),
        savings: totalInterest - calculateTotalInterestForTenure(tenure + 5)
      }
    ];

    // Prepayment analysis
    const prepaymentAnalysis = {
      prepaymentAmount,
      newEMI: prepaymentAmount > 0 ? calculateEMIAfterPrepayment() : emi,
      interestSaved: prepaymentAmount > 0 ? calculateInterestSaved() : 0,
      tenureReduced: prepaymentAmount > 0 ? calculateTenureReduction() : 0
    };

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (interestRate > 12) {
      recommendations.push("Consider refinancing your loan as the interest rate is quite high.");
    }
    
    if (emi > principal * 0.01) {
      recommendations.push("Your EMI is high relative to the loan amount. Consider extending the tenure.");
    }
    
    if (totalInterest > principal * 0.5) {
      recommendations.push("Consider making prepayments to reduce the total interest burden.");
    }
    
    if (tenure > 25) {
      recommendations.push("Long tenure loans result in higher interest. Consider shorter tenure if affordable.");
    }

    setAnalysis({
      principal,
      interestRate,
      tenure,
      emi,
      totalPayment,
      totalInterest,
      amortizationSchedule,
      scenarios,
      recommendations,
      prepaymentAnalysis
    });
    
    setShowResults(true);
  };

  const calculateEMIForTenure = (newTenure: number) => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = newTenure * 12;
    
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
           (Math.pow(1 + monthlyRate, totalMonths) - 1);
  };

  const calculateTotalInterestForTenure = (newTenure: number) => {
    const emi = calculateEMIForTenure(newTenure);
    return (emi * newTenure * 12) - principal;
  };

  const calculateEMIAfterPrepayment = () => {
    const remainingPrincipal = principal - prepaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenure * 12;
    
    return (remainingPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
           (Math.pow(1 + monthlyRate, totalMonths) - 1);
  };

  const calculateInterestSaved = () => {
    const originalTotalInterest = (analysis?.emi || 0) * tenure * 12 - principal;
    const newTotalInterest = calculateEMIAfterPrepayment() * tenure * 12 - (principal - prepaymentAmount);
    return originalTotalInterest - newTotalInterest;
  };

  const calculateTenureReduction = () => {
    // Simplified calculation - in reality, this would require iterative calculation
    return Math.floor(prepaymentAmount / (analysis?.emi || 1));
  };

  const resetCalculator = () => {
    setPrincipal(1000000);
    setInterestRate(10);
    setTenure(20);
    setPrepaymentAmount(0);
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Loan EMI Calculator - Calculate EMI, Interest & Amortization | MoneyCal India"
        description="Calculate your loan EMI, total interest, and amortization schedule. Compare different loan scenarios, analyze prepayment benefits, and get personalized loan recommendations."
        keywords="loan EMI calculator, EMI calculation, loan calculator, home loan EMI, personal loan EMI, car loan EMI, loan amortization, prepayment calculator"
        url="/tools/loan-emi-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Loan EMI Calculator",
          "description": "Calculate loan EMI, interest, and amortization schedule",
          "url": "https://moneycal.in/tools/loan-emi-calculator",
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
                  Loan EMI Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your loan EMI, total interest, and amortization schedule. 
                Compare different scenarios and analyze prepayment benefits for better loan planning.
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
                <Calculator className="w-6 h-6 mr-3 text-blue-600" />
                Loan Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% per annum)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter interest rate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Tenure (Years)</label>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan tenure"
                    min="1"
                    max="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prepayment Amount (₹)</label>
                  <input
                    type="number"
                    value={prepaymentAmount}
                    onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Optional prepayment amount"
                  />
                  <p className="text-sm text-gray-500 mt-1">Optional: Enter if you plan to make prepayments</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateEMI}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate EMI
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
                        <h3 className="text-lg font-semibold text-gray-900">Monthly EMI</h3>
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">₹{analysis.emi.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Per month</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Payment</h3>
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.totalPayment.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Over {analysis.tenure} years</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Interest</h3>
                        <TrendingUp className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-600">₹{analysis.totalInterest.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Interest component</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Interest Rate</h3>
                        <BarChart3 className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{analysis.interestRate}%</p>
                      <p className="text-sm text-gray-500 mt-1">Per annum</p>
                    </div>
                  </div>

                  {/* Different Scenarios */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Different Tenure Scenarios
                    </h3>
                    
                    <div className="space-y-4">
                      {analysis.scenarios.map((scenario, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{scenario.tenure} Years</h4>
                            <span className="text-sm font-semibold text-blue-600">₹{scenario.emi.toLocaleString()}/month</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Total Interest</p>
                              <p className="font-semibold text-gray-900">₹{scenario.totalInterest.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Interest Savings</p>
                              <p className="font-semibold text-green-600">₹{scenario.savings.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prepayment Analysis */}
                  {prepaymentAmount > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Target className="w-6 h-6 mr-3 text-blue-600" />
                        Prepayment Analysis
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">New EMI</h4>
                          <p className="text-2xl font-bold text-blue-600">₹{analysis.prepaymentAnalysis.newEMI.toLocaleString()}</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Interest Saved</h4>
                          <p className="text-2xl font-bold text-green-600">₹{analysis.prepaymentAnalysis.interestSaved.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Loan Recommendations
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
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your EMI?</h3>
                  <p className="text-gray-600">
                    Enter your loan details to calculate EMI, total interest, and get personalized loan recommendations.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Loan EMI Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding EMI</h3>
                <p className="text-gray-600 mb-4">
                  EMI (Equated Monthly Installment) is the fixed amount you pay monthly towards your loan.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• EMI = Principal + Interest</li>
                  <li>• Fixed amount every month</li>
                  <li>• Interest component decreases over time</li>
                  <li>• Principal component increases over time</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Factors Affecting EMI</h3>
                <p className="text-gray-600 mb-4">
                  Several factors determine your EMI amount and total loan cost.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Loan amount (higher = higher EMI)</li>
                  <li>• Interest rate (higher = higher EMI)</li>
                  <li>• Loan tenure (longer = lower EMI)</li>
                  <li>• Type of interest (fixed vs floating)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Loan Planning Tips</h3>
                <p className="text-gray-600 mb-4">
                  Smart loan planning can save you thousands in interest payments.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Compare rates from multiple lenders</li>
                  <li>• Consider prepayment options</li>
                  <li>• Choose tenure based on affordability</li>
                  <li>• Factor in all additional costs</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoanEMICalculator;
