import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { ArrowLeft, Zap, DollarSign, Calendar, TrendingUp, Calculator } from 'lucide-react';

const RefinancingCalculator: React.FC = () => {
  const navigate = useNavigate();
  
  // Current loan details
  const [currentBalance, setCurrentBalance] = useState<number>(500000);
  const [currentRate, setCurrentRate] = useState<number>(12);
  const [remainingMonths, setRemainingMonths] = useState<number>(60);
  
  // New loan details
  const [newRate, setNewRate] = useState<number>(9);
  const [newTenure, setNewTenure] = useState<number>(60);
  
  // Refinancing costs
  const [processingFee, setProcessingFee] = useState<number>(10000);
  const [prepaymentPenalty, setPrepaymentPenalty] = useState<number>(5000);
  const [otherCosts, setOtherCosts] = useState<number>(2000);
  
  // Results
  const [currentEMI, setCurrentEMI] = useState<number>(0);
  const [newEMI, setNewEMI] = useState<number>(0);
  const [currentTotalInterest, setCurrentTotalInterest] = useState<number>(0);
  const [newTotalInterest, setNewTotalInterest] = useState<number>(0);
  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [breakEvenMonths, setBreakEvenMonths] = useState<number>(0);
  const [netBenefit, setNetBenefit] = useState<number>(0);

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 12 / 100;
    if (monthlyRate === 0) return principal / months;
    
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  };

  const calculateRefinancing = () => {
    // Calculate current loan details
    const currentEMICalc = calculateEMI(currentBalance, currentRate, remainingMonths);
    const currentTotalInterestCalc = (currentEMICalc * remainingMonths) - currentBalance;
    
    // Calculate new loan details
    const newEMICalc = calculateEMI(currentBalance, newRate, newTenure);
    const newTotalInterestCalc = (newEMICalc * newTenure) - currentBalance;
    
    // Calculate savings
    const totalRefinancingCosts = processingFee + prepaymentPenalty + otherCosts;
    const interestSavings = currentTotalInterestCalc - newTotalInterestCalc;
    const netBenefitCalc = interestSavings - totalRefinancingCosts;
    
    // Calculate break-even point
    const monthlySavings = currentEMICalc - newEMICalc;
    const breakEvenMonthsCalc = monthlySavings > 0 ? Math.ceil(totalRefinancingCosts / monthlySavings) : 0;
    
    setCurrentEMI(currentEMICalc);
    setNewEMI(newEMICalc);
    setCurrentTotalInterest(currentTotalInterestCalc);
    setNewTotalInterest(newTotalInterestCalc);
    setTotalSavings(interestSavings);
    setBreakEvenMonths(breakEvenMonthsCalc);
    setNetBenefit(netBenefitCalc);
  };

  useEffect(() => {
    calculateRefinancing();
  }, [currentBalance, currentRate, remainingMonths, newRate, newTenure, processingFee, prepaymentPenalty, otherCosts]);

  return (
    <>
      <SEOHelmet
        title="Refinancing Break-even Calculator - Loan Refinancing Analysis | MoneyCal.in"
        description="Calculate if refinancing your loan will save you money. Compare current vs new loan terms and find your break-even point."
        keywords={['refinancing calculator', 'loan refinancing', 'break even calculator', 'loan switch', 'refinancing analysis']}
        url="https://moneycal.in/loan-tools/refinancing-calculator"
        image="https://moneycal.in/images/refinancing-calculator.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
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
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Refinancing Calculator</h1>
                <p className="text-gray-600">Calculate if refinancing will save you money</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Current Loan */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Loan Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Outstanding Balance (₹)
                    </label>
                    <input
                      type="number"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter outstanding balance"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Interest Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      value={currentRate}
                      onChange={(e) => setCurrentRate(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter current interest rate"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remaining Tenure (Months)
                    </label>
                    <input
                      type="number"
                      value={remainingMonths}
                      onChange={(e) => setRemainingMonths(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter remaining months"
                    />
                  </div>
                </div>
              </div>

              {/* New Loan */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">New Loan Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Interest Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      value={newRate}
                      onChange={(e) => setNewRate(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter new interest rate"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Tenure (Months)
                    </label>
                    <input
                      type="number"
                      value={newTenure}
                      onChange={(e) => setNewTenure(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter new tenure"
                    />
                  </div>
                </div>
              </div>

              {/* Refinancing Costs */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Refinancing Costs</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processing Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={processingFee}
                      onChange={(e) => setProcessingFee(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter other costs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* EMI Comparison */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">EMI Comparison</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Current EMI</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{currentEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-gray-600">New EMI</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      ₹{newEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Monthly Savings</p>
                  <p className={`text-xl font-bold ${currentEMI - newEMI > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {currentEMI - newEMI > 0 ? '+' : ''}₹{(currentEMI - newEMI).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>

              {/* Interest Comparison */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Interest Comparison</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Current Total Interest:</span>
                    <span className="font-semibold">₹{currentTotalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="font-medium">New Total Interest:</span>
                    <span className="font-semibold">₹{newTotalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Interest Savings:</span>
                    <span className="font-semibold text-green-600">₹{totalSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {/* Break-even Analysis */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Break-even Analysis</h2>
                
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Break-even Point</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {breakEvenMonths} months
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {breakEvenMonths > 0 ? 'Time to recover refinancing costs' : 'Immediate benefit'}
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">Net Benefit</p>
                    <p className={`text-2xl font-bold ${netBenefit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{netBenefit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {netBenefit > 0 ? 'Refinancing is beneficial' : 'Refinancing is not beneficial'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendation</h3>
                <div className={`p-4 rounded-lg ${netBenefit > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${netBenefit > 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                      {netBenefit > 0 ? (
                        <TrendingUp className="h-4 w-4 text-white" />
                      ) : (
                        <Calculator className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${netBenefit > 0 ? 'text-green-800' : 'text-red-800'}`}>
                        {netBenefit > 0 ? 'Refinancing is Recommended' : 'Refinancing is Not Recommended'}
                      </p>
                      <p className={`text-sm ${netBenefit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {netBenefit > 0 
                          ? `You can save ₹${Math.abs(netBenefit).toLocaleString('en-IN')} by refinancing.`
                          : `You would lose ₹${Math.abs(netBenefit).toLocaleString('en-IN')} by refinancing.`
                        }
                      </p>
                    </div>
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

export default RefinancingCalculator;
