import React, { useState, useEffect } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { IndianRupee, TrendingUp, DollarSign, User, Home, AlertTriangle } from 'lucide-react';

interface AffordabilityResult {
  maxLoanAmount: number;
  maxEMI: number;
  recommendedLoanAmount: number;
  recommendedEMI: number;
  dtiRatio: number;
  emiToIncomeRatio: number;
  affordabilityScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendations: string[];
}

const LoanAffordabilityCalculator: React.FC = () => {
  // Income details
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
  const [annualIncome, setAnnualIncome] = useState<number>(1200000);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  
  // Expense details
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(40000);
  const [existingEMIs, setExistingEMIs] = useState<number>(15000);
  const [otherDebts, setOtherDebts] = useState<number>(5000);
  
  // Loan parameters
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [downPayment, setDownPayment] = useState<number>(200000);
  
  // Affordability settings
  const [maxDTIRatio, setMaxDTIRatio] = useState<number>(40);
  const [maxEMIToIncomeRatio, setMaxEMIToIncomeRatio] = useState<number>(30);
  const [emergencyFundMonths, setEmergencyFundMonths] = useState<number>(6);
  
  const [results, setResults] = useState<AffordabilityResult | null>(null);

  const calculateAffordability = () => {
    const totalMonthlyIncome = monthlyIncome + (otherIncome / 12);
    const totalMonthlyExpenses = monthlyExpenses + existingEMIs + otherDebts;
    const availableIncome = totalMonthlyIncome - totalMonthlyExpenses;
    
    // Calculate maximum EMI based on DTI ratio
    const maxEMIByDTI = (totalMonthlyIncome * maxDTIRatio / 100) - existingEMIs - otherDebts;
    
    // Calculate maximum EMI based on EMI-to-Income ratio
    const maxEMIByRatio = totalMonthlyIncome * maxEMIToIncomeRatio / 100;
    
    // Take the lower of the two
    const maxEMI = Math.min(maxEMIByDTI, maxEMIByRatio, availableIncome);
    
    // Calculate maximum loan amount
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    
    let maxLoanAmount = 0;
    if (monthlyRate > 0) {
      maxLoanAmount = (maxEMI * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) / 
                     (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));
    } else {
      maxLoanAmount = maxEMI * tenureMonths;
    }
    
    // Calculate recommended amounts (80% of maximum for safety)
    const recommendedEMI = maxEMI * 0.8;
    let recommendedLoanAmount = 0;
    if (monthlyRate > 0) {
      recommendedLoanAmount = (recommendedEMI * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) / 
                             (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths));
    } else {
      recommendedLoanAmount = recommendedEMI * tenureMonths;
    }
    
    // Calculate ratios
    const dtiRatio = ((existingEMIs + otherDebts + maxEMI) / totalMonthlyIncome) * 100;
    const emiToIncomeRatio = (maxEMI / totalMonthlyIncome) * 100;
    
    // Calculate affordability score
    let affordabilityScore = 100;
    if (dtiRatio > 40) affordabilityScore -= 30;
    else if (dtiRatio > 30) affordabilityScore -= 15;
    
    if (emiToIncomeRatio > 30) affordabilityScore -= 25;
    else if (emiToIncomeRatio > 20) affordabilityScore -= 10;
    
    if (availableIncome < maxEMI * 2) affordabilityScore -= 20;
    
    // Determine risk level
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (affordabilityScore < 60) riskLevel = 'High';
    else if (affordabilityScore < 80) riskLevel = 'Medium';
    
    // Generate recommendations
    const recommendations: string[] = [];
    
    if (dtiRatio > 40) {
      recommendations.push('Your debt-to-income ratio is high. Consider reducing existing debts before taking a new loan.');
    }
    
    if (emiToIncomeRatio > 30) {
      recommendations.push('Your EMI-to-income ratio is high. Consider a longer tenure or lower loan amount.');
    }
    
    if (availableIncome < maxEMI * 2) {
      recommendations.push('Ensure you have sufficient buffer income for unexpected expenses.');
    }
    
    if (affordabilityScore >= 80) {
      recommendations.push('Your financial profile looks good for loan approval.');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Your loan affordability looks healthy. Consider building an emergency fund.');
    }
    
    setResults({
      maxLoanAmount,
      maxEMI,
      recommendedLoanAmount,
      recommendedEMI,
      dtiRatio,
      emiToIncomeRatio,
      affordabilityScore,
      riskLevel,
      recommendations
    });
  };

  useEffect(() => {
    if (monthlyIncome > 0 && interestRate > 0 && loanTenure > 0) {
      calculateAffordability();
    }
  }, [monthlyIncome, annualIncome, otherIncome, monthlyExpenses, existingEMIs, otherDebts, 
      interestRate, loanTenure, downPayment, maxDTIRatio, maxEMIToIncomeRatio]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Loan Affordability Calculator - MoneyCal.in"
        description="Calculate how much loan you can afford based on your income, expenses, and financial profile. Get personalized recommendations."
        keywords="loan affordability Calculator, EMI to income ratio, debt to income ratio, loan eligibility, financial planning"
        url="/loan-tools/loan-affordability"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <IndianRupee className="h-12 w-12 text-indigo-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Loan Affordability Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate how much loan you can afford based on your income, expenses, and financial profile. 
              Get personalized recommendations for better loan planning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Income Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 text-green-600 mr-2" />
                Income Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter monthly income"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(monthlyIncome)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income (₹)
                  </label>
                  <input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter annual income"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(annualIncome)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Annual Income (₹)
                  </label>
                  <input
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter other income"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(otherIncome)}
                  </div>
                </div>
              </div>
            </div>

            {/* Expense Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-red-600 mr-2" />
                Expense Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Expenses (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                    placeholder="Enter monthly expenses"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(monthlyExpenses)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Existing EMIs (₹)
                  </label>
                  <input
                    type="number"
                    value={existingEMIs}
                    onChange={(e) => setExistingEMIs(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                    placeholder="Enter existing EMIs"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(existingEMIs)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Monthly Debts (₹)
                  </label>
                  <input
                    type="number"
                    value={otherDebts}
                    onChange={(e) => setOtherDebts(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                    placeholder="Enter other debts"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(otherDebts)}
                  </div>
                </div>
              </div>
            </div>

            {/* Loan Parameters */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Home className="h-6 w-6 text-blue-600 mr-2" />
                Loan Parameters
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter interest rate"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {interestRate}% per annum
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter loan tenure"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {loanTenure} years
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment (₹)
                  </label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter down payment"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Current: {formatCurrency(downPayment)}
                  </div>
                </div>

                {/* Affordability Settings */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Affordability Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max DTI Ratio (%)
                      </label>
                      <input
                        type="number"
                        value={maxDTIRatio}
                        onChange={(e) => setMaxDTIRatio(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter max DTI ratio"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max EMI-to-Income Ratio (%)
                      </label>
                      <input
                        type="number"
                        value={maxEMIToIncomeRatio}
                        onChange={(e) => setMaxEMIToIncomeRatio(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter max EMI ratio"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-indigo-600 mr-2" />
                Affordability Analysis
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Maximum Loan Amount */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Max Loan Amount</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.maxLoanAmount)}</p>
                    </div>
                    <Home className="h-10 w-10 text-green-200" />
                  </div>
                </div>

                {/* Maximum EMI */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Max EMI</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.maxEMI)}</p>
                    </div>
                    <DollarSign className="h-10 w-10 text-blue-200" />
                  </div>
                </div>

                {/* Recommended Loan Amount */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Recommended Amount</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.recommendedLoanAmount)}</p>
                    </div>
                    <TrendingUp className="h-10 w-10 text-purple-200" />
                  </div>
                </div>

                {/* Affordability Score */}
                <div className={`rounded-xl p-6 text-white ${results.riskLevel === 'High' ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                  results.riskLevel === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                  'bg-gradient-to-r from-green-500 to-green-600'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">Affordability Score</p>
                      <p className="text-2xl font-bold">{results.affordabilityScore.toFixed(0)}/100</p>
                    </div>
                    <AlertTriangle className="h-10 w-10 text-white opacity-80" />
                  </div>
                </div>
              </div>

              {/* Financial Ratios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Ratios</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Debt-to-Income Ratio:</span>
                      <span className={`font-semibold px-2 py-1 rounded ${getRiskColor(results.dtiRatio > 40 ? 'High' : results.dtiRatio > 30 ? 'Medium' : 'Low')}`}>
                        {results.dtiRatio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">EMI-to-Income Ratio:</span>
                      <span className={`font-semibold px-2 py-1 rounded ${getRiskColor(results.emiToIncomeRatio > 30 ? 'High' : results.emiToIncomeRatio > 20 ? 'Medium' : 'Low')}`}>
                        {results.emiToIncomeRatio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Level:</span>
                      <span className={`font-semibold px-2 py-1 rounded ${getRiskColor(results.riskLevel)}`}>
                        {results.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                  <div className="space-y-2">
                    {results.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-1">•</div>
                        <p className="text-sm text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Insights */}
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">DTI Ratio</h3>
                <p className="text-sm text-gray-600">
                  Keep your debt-to-income ratio below 40% for better loan approval chances 
                  and financial stability.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">EMI-to-Income Ratio</h3>
                <p className="text-sm text-gray-600">
                  Your EMI should not exceed 30% of your monthly income to maintain 
                  a healthy financial profile.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Fund</h3>
                <p className="text-sm text-gray-600">
                  Maintain an emergency fund equivalent to 6 months of expenses 
                  before taking on additional debt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanAffordabilityCalculator;
