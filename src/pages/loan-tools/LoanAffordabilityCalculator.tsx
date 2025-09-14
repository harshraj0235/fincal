import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { ArrowLeft, DollarSign, TrendingUp, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';

const LoanAffordabilityCalculator: React.FC = () => {
  const navigate = useNavigate();
  
  // Income details
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  
  // Expense details
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(40000);
  const [existingEMIs, setExistingEMIs] = useState<number>(10000);
  const [otherCommitments, setOtherCommitments] = useState<number>(5000);
  
  // Loan parameters
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [maxEMIRatio, setMaxEMIRatio] = useState<number>(40);
  
  // Results
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [disposableIncome, setDisposableIncome] = useState<number>(0);
  const [maxEMI, setMaxEMI] = useState<number>(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(0);
  const [affordabilityScore, setAffordabilityScore] = useState<number>(0);
  const [recommendation, setRecommendation] = useState<string>('');

  const calculateAffordability = () => {
    const totalIncomeCalc = monthlyIncome + otherIncome;
    const totalExpensesCalc = monthlyExpenses + existingEMIs + otherCommitments;
    const disposableIncomeCalc = totalIncomeCalc - totalExpensesCalc;
    
    // Calculate maximum EMI based on income ratio
    const maxEMICalc = (totalIncomeCalc * maxEMIRatio) / 100;
    
    // Calculate maximum loan amount
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    
    let maxLoanAmountCalc = 0;
    if (monthlyRate > 0) {
      maxLoanAmountCalc = (maxEMICalc * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) / 
                         (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));
    } else {
      maxLoanAmountCalc = maxEMICalc * tenureMonths;
    }
    
    // Calculate affordability score (0-100)
    const emiToIncomeRatio = (maxEMICalc / totalIncomeCalc) * 100;
    const disposableIncomeRatio = (disposableIncomeCalc / totalIncomeCalc) * 100;
    
    let score = 100;
    if (emiToIncomeRatio > 40) score -= 30;
    else if (emiToIncomeRatio > 30) score -= 15;
    
    if (disposableIncomeRatio < 20) score -= 25;
    else if (disposableIncomeRatio < 30) score -= 10;
    
    if (existingEMIs > totalIncomeCalc * 0.2) score -= 20;
    
    score = Math.max(0, Math.min(100, score));
    
    // Generate recommendation
    let recommendationText = '';
    if (score >= 80) {
      recommendationText = 'Excellent! You have strong loan affordability.';
    } else if (score >= 60) {
      recommendationText = 'Good! You can comfortably afford a loan.';
    } else if (score >= 40) {
      recommendationText = 'Fair. Consider reducing expenses or increasing income.';
    } else {
      recommendationText = 'Poor. Not recommended to take additional loans.';
    }
    
    setTotalIncome(totalIncomeCalc);
    setTotalExpenses(totalExpensesCalc);
    setDisposableIncome(disposableIncomeCalc);
    setMaxEMI(maxEMICalc);
    setMaxLoanAmount(maxLoanAmountCalc);
    setAffordabilityScore(score);
    setRecommendation(recommendationText);
  };

  useEffect(() => {
    calculateAffordability();
  }, [monthlyIncome, otherIncome, monthlyExpenses, existingEMIs, otherCommitments, interestRate, loanTenure, maxEMIRatio]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 60) return <CheckCircle className="h-6 w-6" />;
    return <AlertTriangle className="h-6 w-6" />;
  };

  return (
    <>
      <SEOHelmet
        title="Loan Affordability Calculator - How Much Loan Can You Afford | MoneyCal.in"
        description="Calculate how much loan you can afford based on your income, expenses, and existing commitments. Get personalized loan affordability analysis."
        keywords={['loan affordability calculator', 'how much loan can I afford', 'loan eligibility', 'EMI to income ratio', 'borrowing capacity']}
        url="https://moneycal.in/loan-tools/loan-affordability"
        image="https://moneycal.in/images/loan-affordability-calculator.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Loan Tools</span>
            </button>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Loan Affordability Calculator</h1>
                <p className="text-gray-600">Calculate how much loan you can afford</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Income Details */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Income Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Income (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter monthly income"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Income (₹)
                    </label>
                    <input
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter other income"
                    />
                  </div>
                </div>
              </div>

              {/* Expense Details */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Expense Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Expenses (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter monthly expenses"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing EMIs (₹)
                    </label>
                    <input
                      type="number"
                      value={existingEMIs}
                      onChange={(e) => setExistingEMIs(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter existing EMIs"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Commitments (₹)
                    </label>
                    <input
                      type="number"
                      value={otherCommitments}
                      onChange={(e) => setOtherCommitments(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter other commitments"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Parameters */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Loan Parameters</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter interest rate"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Tenure (Years)
                    </label>
                    <input
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter loan tenure"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max EMI to Income Ratio (%)
                    </label>
                    <input
                      type="number"
                      value={maxEMIRatio}
                      onChange={(e) => setMaxEMIRatio(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter max EMI ratio"
                      min="10"
                      max="60"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Recommended: 30-40% of monthly income
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Affordability Score */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Affordability Score</h2>
                
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreColor(affordabilityScore)} mb-4`}>
                    {getScoreIcon(affordabilityScore)}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {affordabilityScore}/100
                  </div>
                  <p className="text-gray-600 mb-4">{recommendation}</p>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Monthly Income:</span>
                    <span className="font-semibold">₹{totalIncome.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Monthly Expenses:</span>
                    <span className="font-semibold">₹{totalExpenses.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                    <span className="font-medium">Disposable Income:</span>
                    <span className="font-semibold text-teal-600">₹{disposableIncome.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Loan Capacity */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Loan Capacity</h2>
                
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Maximum EMI</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{maxEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {maxEMIRatio}% of monthly income
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Maximum Loan Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{maxLoanAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Based on {loanTenure} years at {interestRate}% p.a.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips to Improve Affordability</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Keep EMI to income ratio below 40%</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Maintain at least 20% disposable income</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Consider longer tenure for lower EMI</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Pay off existing high-interest debts first</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanAffordabilityCalculator;
