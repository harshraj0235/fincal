import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Calculator, DollarSign, Calendar, TrendingUp, AlertCircle, CheckCircle, Zap, Info, Star, BarChart3, Target, PieChart } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface HomeLoanAnalysis {
  propertyValue: number;
  loanAmount: number;
  downPayment: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: Array<{
    year: number;
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
  affordabilityAnalysis: {
    monthlyIncome: number;
    emiToIncomeRatio: number;
    isAffordable: boolean;
    maxLoanAmount: number;
  };
  taxBenefits: {
    principalDeduction: number;
    interestDeduction: number;
    totalTaxSavings: number;
  };
}

const HomeLoanCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [analysis, setAnalysis] = useState<HomeLoanAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateHomeLoan = () => {
    if (propertyValue <= 0 || downPayment < 0 || interestRate < 0 || tenure <= 0) {
      alert('Please enter valid loan parameters');
      return;
    }

    const loanAmount = propertyValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenure * 12;
    
    // Calculate EMI using the formula
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    // Generate yearly amortization schedule
    const amortizationSchedule = [];
    let balance = loanAmount;
    
    for (let year = 1; year <= tenure; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = emi - interestPayment;
        balance = balance - principalPayment;
        
        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
      }
      
      amortizationSchedule.push({
        year,
        emi: emi * 12,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
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

    // Affordability analysis
    const emiToIncomeRatio = (emi / monthlyIncome) * 100;
    const isAffordable = emiToIncomeRatio <= 40; // 40% rule
    const maxLoanAmount = monthlyIncome * 0.4 * 12 * tenure / (1 + (interestRate / 100) * tenure / 2);

    // Tax benefits calculation
    const principalDeduction = Math.min(150000, emi * 12 * 0.3); // 30% of EMI as principal
    const interestDeduction = Math.min(200000, emi * 12 * 0.7); // 70% of EMI as interest
    const totalTaxSavings = (principalDeduction + interestDeduction) * 0.30; // Assuming 30% tax rate

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (downPayment < propertyValue * 0.2) {
      recommendations.push("Consider increasing your down payment to at least 20% to reduce EMI and interest burden.");
    }
    
    if (emiToIncomeRatio > 40) {
      recommendations.push("Your EMI is high relative to income. Consider increasing tenure or reducing loan amount.");
    }
    
    if (interestRate > 9) {
      recommendations.push("Consider refinancing your loan as the interest rate is quite high.");
    }
    
    if (tenure > 25) {
      recommendations.push("Long tenure loans result in higher interest. Consider shorter tenure if affordable.");
    }
    
    if (totalInterest > loanAmount * 0.8) {
      recommendations.push("Consider making prepayments to reduce the total interest burden.");
    }

    setAnalysis({
      propertyValue,
      loanAmount,
      downPayment,
      interestRate,
      tenure,
      emi,
      totalPayment,
      totalInterest,
      amortizationSchedule,
      scenarios,
      recommendations,
      affordabilityAnalysis: {
        monthlyIncome,
        emiToIncomeRatio,
        isAffordable,
        maxLoanAmount
      },
      taxBenefits: {
        principalDeduction,
        interestDeduction,
        totalTaxSavings
      }
    });
    
    setShowResults(true);
  };

  const calculateEMIForTenure = (newTenure: number) => {
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = newTenure * 12;
    
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
           (Math.pow(1 + monthlyRate, totalMonths) - 1);
  };

  const calculateTotalInterestForTenure = (newTenure: number) => {
    const emi = calculateEMIForTenure(newTenure);
    const loanAmount = propertyValue - downPayment;
    return (emi * newTenure * 12) - loanAmount;
  };

  const resetCalculator = () => {
    setPropertyValue(5000000);
    setDownPayment(1000000);
    setInterestRate(8.5);
    setTenure(20);
    setMonthlyIncome(100000);
    setAnalysis(null);
    setShowResults(false);
  };

  return (
    <>
      <SEOHelmet
        title="Free Home Loan Calculator - Calculate EMI, Interest & Affordability | MoneyCal India"
        description="Calculate your home loan EMI, total interest, and affordability. Compare different loan scenarios, analyze tax benefits, and get personalized home loan recommendations."
        keywords="home loan calculator, home loan EMI, home loan interest, property loan, home loan affordability, home loan tax benefits, mortgage calculator"
        url="/tools/home-loan-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Home Loan Calculator",
          "description": "Calculate home loan EMI, interest, and affordability analysis",
          "url": "https://moneycal.in/tools/home-loan-calculator",
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
                  Home Loan Calculator
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate your home loan EMI, total interest, and affordability. Compare different loan scenarios, 
                analyze tax benefits, and get personalized recommendations for your home purchase.
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
                <Home className="w-6 h-6 mr-3 text-blue-600" />
                Home Loan Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Value (₹)</label>
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter property value"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment (₹)</label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter down payment amount"
                  />
                  <p className="text-sm text-gray-500 mt-1">Recommended: 20% of property value</p>
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
                    min="5"
                    max="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter monthly income"
                  />
                  <p className="text-sm text-gray-500 mt-1">For affordability analysis</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateHomeLoan}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Home Loan
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
                        <h3 className="text-lg font-semibold text-gray-900">Loan Amount</h3>
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">₹{analysis.loanAmount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">After down payment</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Monthly EMI</h3>
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">₹{analysis.emi.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Per month</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Interest</h3>
                        <TrendingUp className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-600">₹{analysis.totalInterest.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Over {analysis.tenure} years</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Payment</h3>
                        <BarChart3 className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">₹{analysis.totalPayment.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">Principal + Interest</p>
                    </div>
                  </div>

                  {/* Affordability Analysis */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target className="w-6 h-6 mr-3 text-blue-600" />
                      Affordability Analysis
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">EMI to Income Ratio</h4>
                        <p className="text-2xl font-bold text-blue-600">{analysis.affordabilityAnalysis.emiToIncomeRatio.toFixed(1)}%</p>
                        <p className="text-sm text-gray-500">Should be below 40%</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Affordability Status</h4>
                        <p className={`text-2xl font-bold ${analysis.affordabilityAnalysis.isAffordable ? 'text-green-600' : 'text-red-600'}`}>
                          {analysis.affordabilityAnalysis.isAffordable ? 'Affordable' : 'Not Affordable'}
                        </p>
                        <p className="text-sm text-gray-500">Based on 40% rule</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Maximum recommended loan amount: ₹{analysis.affordabilityAnalysis.maxLoanAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Tax Benefits */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Info className="w-6 h-6 mr-3 text-blue-600" />
                      Tax Benefits
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Principal Deduction</h4>
                        <p className="text-2xl font-bold text-green-600">₹{analysis.taxBenefits.principalDeduction.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Under Section 80C (max ₹1.5L)</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Interest Deduction</h4>
                        <p className="text-2xl font-bold text-blue-600">₹{analysis.taxBenefits.interestDeduction.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Under Section 24 (max ₹2L)</p>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <p className="text-lg font-semibold text-gray-900">
                        Annual Tax Savings: ₹{analysis.taxBenefits.totalTaxSavings.toLocaleString()}
                      </p>
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

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-blue-600" />
                      Home Loan Recommendations
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
                  <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate Your Home Loan?</h3>
                  <p className="text-gray-600">
                    Enter your property and loan details to calculate EMI, affordability, and get personalized recommendations.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Home Loan Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Home Loan Basics</h3>
                <p className="text-gray-600 mb-4">
                  Understanding the fundamentals of home loans helps you make informed decisions.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• EMI = Principal + Interest</li>
                  <li>• Down payment typically 20%</li>
                  <li>• Interest rates vary by lender</li>
                  <li>• Tenure can be 5-30 years</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Affordability Rules</h3>
                <p className="text-gray-600 mb-4">
                  Follow these rules to ensure your home loan is affordable and sustainable.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• EMI should not exceed 40% of income</li>
                  <li>• Consider all additional costs</li>
                  <li>• Factor in future income growth</li>
                  <li>• Keep emergency fund intact</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tax Benefits</h3>
                <p className="text-gray-600 mb-4">
                  Home loans offer significant tax benefits that can reduce your overall cost.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Principal deduction under 80C</li>
                  <li>• Interest deduction under Section 24</li>
                  <li>• Additional deduction for first-time buyers</li>
                  <li>• Benefits available for self-occupied property</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomeLoanCalculator;
