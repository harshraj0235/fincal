import React, { useState, useEffect } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { Calculator, TrendingUp, DollarSign, Calendar, ArrowRight, AlertCircle } from 'lucide-react';

interface RefinancingResult {
  currentLoan: {
    emi: number;
    totalInterest: number;
    totalPayment: number;
    remainingTenure: number;
  };
  newLoan: {
    emi: number;
    totalInterest: number;
    totalPayment: number;
    tenure: number;
  };
  savings: {
    monthlySavings: number;
    totalInterestSaved: number;
    totalSavings: number;
    breakEvenMonths: number;
  };
  costs: {
    processingFee: number;
    prepaymentPenalty: number;
    otherCosts: number;
    totalCosts: number;
  };
}

const RefinancingCalculator: React.FC = () => {
  // Current loan details
  const [currentLoanAmount, setCurrentLoanAmount] = useState<number>(1000000);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(9.5);
  const [currentTenure, setCurrentTenure] = useState<number>(20);
  const [elapsedMonths, setElapsedMonths] = useState<number>(24);
  
  // New loan details
  const [newInterestRate, setNewInterestRate] = useState<number>(8.0);
  const [newTenure, setNewTenure] = useState<number>(18);
  
  // Refinancing costs
  const [processingFee, setProcessingFee] = useState<number>(10000);
  const [prepaymentPenalty, setPrepaymentPenalty] = useState<number>(25000);
  const [otherCosts, setOtherCosts] = useState<number>(5000);
  
  const [results, setResults] = useState<RefinancingResult | null>(null);

  const calculateRefinancing = () => {
    const currentMonthlyRate = currentInterestRate / 12 / 100;
    const currentTenureMonths = currentTenure * 12;
    const remainingMonths = currentTenureMonths - elapsedMonths;
    
    // Calculate current loan EMI
    const currentEMI = (currentLoanAmount * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentTenureMonths)) / 
                      (Math.pow(1 + currentMonthlyRate, currentTenureMonths) - 1);
    
    // Calculate outstanding balance
    let outstandingBalance = currentLoanAmount;
    for (let month = 1; month <= elapsedMonths; month++) {
      const interestPayment = outstandingBalance * currentMonthlyRate;
      const principalPayment = currentEMI - interestPayment;
      outstandingBalance = Math.max(0, outstandingBalance - principalPayment);
    }
    
    // Calculate remaining interest on current loan
    const currentRemainingInterest = currentEMI * remainingMonths - outstandingBalance;
    
    // Calculate new loan details
    const newMonthlyRate = newInterestRate / 12 / 100;
    const newTenureMonths = newTenure * 12;
    const newEMI = (outstandingBalance * newMonthlyRate * Math.pow(1 + newMonthlyRate, newTenureMonths)) / 
                   (Math.pow(1 + newMonthlyRate, newTenureMonths) - 1);
    const newTotalInterest = newEMI * newTenureMonths - outstandingBalance;
    
    // Calculate costs
    const totalCosts = processingFee + prepaymentPenalty + otherCosts;
    
    // Calculate savings
    const monthlySavings = currentEMI - newEMI;
    const totalInterestSaved = currentRemainingInterest - newTotalInterest;
    const totalSavings = totalInterestSaved - totalCosts;
    
    // Calculate break-even point
    const breakEvenMonths = totalCosts / monthlySavings;
    
    setResults({
      currentLoan: {
        emi: currentEMI,
        totalInterest: currentRemainingInterest,
        totalPayment: currentEMI * remainingMonths,
        remainingTenure: remainingMonths
      },
      newLoan: {
        emi: newEMI,
        totalInterest: newTotalInterest,
        totalPayment: newEMI * newTenureMonths,
        tenure: newTenureMonths
      },
      savings: {
        monthlySavings,
        totalInterestSaved,
        totalSavings,
        breakEvenMonths
      },
      costs: {
        processingFee,
        prepaymentPenalty,
        otherCosts,
        totalCosts
      }
    });
  };

  useEffect(() => {
    if (currentLoanAmount > 0 && currentInterestRate > 0 && currentTenure > 0 && 
        elapsedMonths > 0 && newInterestRate > 0 && newTenure > 0) {
      calculateRefinancing();
    }
  }, [currentLoanAmount, currentInterestRate, currentTenure, elapsedMonths, 
      newInterestRate, newTenure, processingFee, prepaymentPenalty, otherCosts]);

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

  return (
    <>
      <SEOHelmet
        title="Loan Refinancing Calculator - MoneyCal.in"
        description="Calculate the benefits of refinancing your loan. Compare current vs new loan terms and find your break-even point."
        keywords="loan refinancing calculator, refinance break-even, loan comparison, EMI reduction, interest savings"
        url="/loan-tools/refinancing-calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-purple-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Loan Refinancing Calculator</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate the benefits of refinancing your existing loan. Compare current vs new loan terms, 
              find your break-even point, and see how much you can save.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Loan Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-red-600 mr-2" />
                Current Loan
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={currentLoanAmount}
                    onChange={(e) => setCurrentLoanAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                    placeholder="Enter loan amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={currentInterestRate}
                    onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                    placeholder="Enter interest rate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={currentTenure}
                    onChange={(e) => setCurrentTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                    placeholder="Enter tenure"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Months Elapsed
                  </label>
                  <input
                    type="number"
                    value={elapsedMonths}
                    onChange={(e) => setElapsedMonths(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                    placeholder="Enter months elapsed"
                  />
                </div>
              </div>
            </div>

            {/* New Loan Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ArrowRight className="h-6 w-6 text-green-600 mr-2" />
                New Loan
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInterestRate}
                    onChange={(e) => setNewInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter new interest rate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={newTenure}
                    onChange={(e) => setNewTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter new tenure"
                  />
                </div>

                {/* Refinancing Costs */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Refinancing Costs</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Processing Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={processingFee}
                        onChange={(e) => setProcessingFee(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter processing fee"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prepayment Penalty (₹)
                      </label>
                      <input
                        type="number"
                        value={prepaymentPenalty}
                        onChange={(e) => setPrepaymentPenalty(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter prepayment penalty"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Costs (₹)
                      </label>
                      <input
                        type="number"
                        value={otherCosts}
                        onChange={(e) => setOtherCosts(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter other costs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
                Refinancing Analysis
              </h2>
              
              {results && (
                <div className="space-y-6">
                  {/* Monthly Savings */}
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Monthly Savings</p>
                        <p className="text-3xl font-bold">{formatCurrency(results.savings.monthlySavings)}</p>
                      </div>
                      <Calendar className="h-12 w-12 text-green-200" />
                    </div>
                  </div>

                  {/* Break-even Point */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Break-even Point</p>
                        <p className="text-3xl font-bold">{results.savings.breakEvenMonths.toFixed(1)} months</p>
                      </div>
                      <AlertCircle className="h-12 w-12 text-blue-200" />
                    </div>
                  </div>

                  {/* Total Savings */}
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Total Savings</p>
                        <p className="text-3xl font-bold">{formatCurrency(results.savings.totalSavings)}</p>
                      </div>
                      <TrendingUp className="h-12 w-12 text-purple-200" />
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">Interest Saved</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(results.savings.totalInterestSaved)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 font-medium">Total Costs</p>
                      <p className="text-xl font-bold text-red-600">{formatCurrency(results.costs.totalCosts)}</p>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className={`rounded-lg p-4 ${results.savings.totalSavings > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center">
                      {results.savings.totalSavings > 0 ? (
                        <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
                      )}
                      <div>
                        <p className={`font-semibold ${results.savings.totalSavings > 0 ? 'text-green-800' : 'text-red-800'}`}>
                          {results.savings.totalSavings > 0 ? 'Refinancing Recommended' : 'Refinancing Not Recommended'}
                        </p>
                        <p className={`text-sm ${results.savings.totalSavings > 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {results.savings.totalSavings > 0 
                            ? `You can save ${formatCurrency(results.savings.totalSavings)} by refinancing.`
                            : `Refinancing will cost you ${formatCurrency(Math.abs(results.savings.totalSavings))} more.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Comparison */}
          {results && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-gray-600 mr-2" />
                Detailed Comparison
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Current Loan */}
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">Current Loan</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly EMI:</span>
                      <span className="font-semibold">{formatCurrency(results.currentLoan.emi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remaining Interest:</span>
                      <span className="font-semibold text-red-600">{formatCurrency(results.currentLoan.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remaining Tenure:</span>
                      <span className="font-semibold">{results.currentLoan.remainingTenure} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Payment:</span>
                      <span className="font-semibold">{formatCurrency(results.currentLoan.totalPayment)}</span>
                    </div>
                  </div>
                </div>

                {/* New Loan */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">New Loan</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly EMI:</span>
                      <span className="font-semibold">{formatCurrency(results.newLoan.emi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.newLoan.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">New Tenure:</span>
                      <span className="font-semibold">{results.newLoan.tenure} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Payment:</span>
                      <span className="font-semibold">{formatCurrency(results.newLoan.totalPayment)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Insights */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Break-even Analysis</h3>
                <p className="text-sm text-gray-600">
                  The break-even point tells you how long it takes to recover the refinancing costs 
                  through monthly savings.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Interest Rate Impact</h3>
                <p className="text-sm text-gray-600">
                  Even a small reduction in interest rate can lead to significant savings 
                  over the loan tenure.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Cost Consideration</h3>
                <p className="text-sm text-gray-600">
                  Factor in all costs including processing fees, prepayment penalties, 
                  and other charges when making the decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefinancingCalculator;