import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI } from '../utils/calculatorUtils';
import { Sliders, Calculator, ArrowRight } from 'lucide-react';
import { BarChart } from '../components/BarChart';

export const LoanRefinanceCalculator: React.FC = () => {
  // Existing loan details
  const [currentLoanBalance, setCurrentLoanBalance] = useState<number>(2000000);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(9.5);
  const [remainingTenure, setRemainingTenure] = useState<number>(15);
  const [currentEmi, setCurrentEmi] = useState<number>(0);
  
  // New loan details
  const [newInterestRate, setNewInterestRate] = useState<number>(8.5);
  const [newTenure, setNewTenure] = useState<number>(15);
  const [processingFee, setProcessingFee] = useState<number>(0.5);
  const [newEmi, setNewEmi] = useState<number>(0);
  
  // Calculated values
  const [currentTotalPayment, setCurrentTotalPayment] = useState<number>(0);
  const [newTotalPayment, setNewTotalPayment] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [breakEvenMonths, setBreakEvenMonths] = useState<number>(0);
  
  useEffect(() => {
    // Calculate current loan details
    const calculatedCurrentEmi = calculateEMI(currentLoanBalance, currentInterestRate, remainingTenure * 12);
    const currentTotal = calculatedCurrentEmi * remainingTenure * 12;
    setCurrentEmi(calculatedCurrentEmi);
    setCurrentTotalPayment(currentTotal);
    
    // Calculate new loan details
    const calculatedNewEmi = calculateEMI(currentLoanBalance, newInterestRate, newTenure * 12);
    const processingFeeAmount = (processingFee / 100) * currentLoanBalance;
    const newTotal = (calculatedNewEmi * newTenure * 12) + processingFeeAmount;
    setNewEmi(calculatedNewEmi);
    setNewTotalPayment(newTotal);
    
    // Calculate savings
    const calculatedSavings = currentTotal - newTotal;
    setSavings(calculatedSavings);
    
    // Calculate break-even point
    const monthlyBenefit = calculatedCurrentEmi - calculatedNewEmi;
    if (monthlyBenefit > 0) {
      const months = Math.ceil(processingFeeAmount / monthlyBenefit);
      setBreakEvenMonths(months);
    } else {
      setBreakEvenMonths(0);
    }
  }, [
    currentLoanBalance,
    currentInterestRate,
    remainingTenure,
    newInterestRate,
    newTenure,
    processingFee
  ]);
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
            Current Loan Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="current-balance" className="text-sm font-medium text-neutral-700">
                  Outstanding Balance (₹)
                </label>
                <span className="text-sm text-neutral-500">
                  {formatCurrency(currentLoanBalance)}
                </span>
              </div>
              <input 
                type="range" 
                id="current-balance"
                min="100000" 
                max="10000000" 
                step="100000" 
                value={currentLoanBalance} 
                onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>₹1L</span>
                <span>₹1Cr</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="current-rate" className="text-sm font-medium text-neutral-700">
                  Current Interest Rate (% p.a.)
                </label>
                <span className="text-sm text-neutral-500">
                  {currentInterestRate.toFixed(2)}%
                </span>
              </div>
              <input 
                type="range" 
                id="current-rate"
                min="6" 
                max="15" 
                step="0.05" 
                value={currentInterestRate} 
                onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>6%</span>
                <span>15%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="remaining-tenure" className="text-sm font-medium text-neutral-700">
                  Remaining Tenure (Years)
                </label>
                <span className="text-sm text-neutral-500">
                  {remainingTenure} years
                </span>
              </div>
              <input 
                type="range" 
                id="remaining-tenure"
                min="1" 
                max="30" 
                step="1" 
                value={remainingTenure} 
                onChange={(e) => setRemainingTenure(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-neutral-50 rounded-lg">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Current Loan Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(currentEmi)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Total Payment</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(currentTotalPayment)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            New Loan Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="new-rate" className="text-sm font-medium text-neutral-700">
                  New Interest Rate (% p.a.)
                </label>
                <span className="text-sm text-neutral-500">
                  {newInterestRate.toFixed(2)}%
                </span>
              </div>
              <input 
                type="range" 
                id="new-rate"
                min="6" 
                max="15" 
                step="0.05" 
                value={newInterestRate} 
                onChange={(e) => setNewInterestRate(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>6%</span>
                <span>15%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="new-tenure" className="text-sm font-medium text-neutral-700">
                  New Tenure (Years)
                </label>
                <span className="text-sm text-neutral-500">
                  {newTenure} years
                </span>
              </div>
              <input 
                type="range" 
                id="new-tenure"
                min="1" 
                max="30" 
                step="1" 
                value={newTenure} 
                onChange={(e) => setNewTenure(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="processing-fee" className="text-sm font-medium text-neutral-700">
                  Processing Fee (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {processingFee.toFixed(2)}%
                </span>
              </div>
              <input 
                type="range" 
                id="processing-fee"
                min="0" 
                max="2" 
                step="0.05" 
                value={processingFee} 
                onChange={(e) => setProcessingFee(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>0%</span>
                <span>2%</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-[--primary-50] rounded-lg">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-4">New Loan Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500 mb-1">New Monthly EMI</p>
                <p className="text-xl font-bold text-[--primary-900]">{formatCurrency(newEmi)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Total Payment</p>
                <p className="text-xl font-bold text-[--primary-900]">{formatCurrency(newTotalPayment)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Processing Fee</p>
                <p className="text-xl font-bold text-[--primary-900]">
                  {formatCurrency((processingFee / 100) * currentLoanBalance)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">EMI Reduction</p>
                <p className="text-xl font-bold text-[--primary-900]">
                  {formatCurrency(Math.max(0, currentEmi - newEmi))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-[--success-50] rounded-lg">
          <h3 className="text-lg font-semibold text-[--success-800] mb-4">Refinancing Benefits</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[--success-600] mb-1">Total Savings</p>
              <p className="text-2xl font-bold text-[--success-700]">
                {formatCurrency(Math.max(0, savings))}
              </p>
            </div>
            <div>
              <p className="text-sm text-[--success-600] mb-1">Break-even Period</p>
              <p className="text-2xl font-bold text-[--success-700]">
                {breakEvenMonths > 0 
                  ? `${Math.floor(breakEvenMonths / 12)} years ${breakEvenMonths % 12} months`
                  : 'Not applicable'}
              </p>
            </div>
            <div>
              <p className="text-sm text-[--success-600] mb-1">Monthly Savings</p>
              <p className="text-2xl font-bold text-[--success-700]">
                {formatCurrency(Math.max(0, currentEmi - newEmi))}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Payment Comparison</h3>
          <div className="h-64">
            <BarChart 
              data={[
                {
                  label: 'Current Loan',
                  value: currentTotalPayment,
                  color: '#ef4444'
                },
                {
                  label: 'New Loan',
                  value: newTotalPayment,
                  color: '#22c55e'
                }
              ]}
              xKey="label"
              yKey="value"
              color="color"
              xLabel="Loan"
              yLabel="Total Payment (₹)"
              formatY={(value) => formatCurrency(value)}
            />
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-neutral-50 rounded-lg">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Refinancing Recommendations</h3>
        <div className="space-y-4">
          {savings > 0 && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center">
                ✓
              </div>
              <div>
                <p className="text-neutral-900">
                  Refinancing is recommended as it will save you {formatCurrency(savings)} over the loan term.
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  You'll break even on the processing fee in {breakEvenMonths} months.
                </p>
              </div>
            </div>
          )}
          
          {currentEmi - newEmi > 0 && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center">
                ✓
              </div>
              <div>
                <p className="text-neutral-900">
                  Your monthly EMI will reduce by {formatCurrency(currentEmi - newEmi)}.
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  This improves your monthly cash flow and reduces financial stress.
                </p>
              </div>
            </div>
          )}
          
          {newInterestRate < currentInterestRate && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center">
                ✓
              </div>
              <div>
                <p className="text-neutral-900">
                  Interest rate reduction of {(currentInterestRate - newInterestRate).toFixed(2)}%.
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  Lower interest rate means more of your payment goes toward principal.
                </p>
              </div>
            </div>
          )}
          
          {savings <= 0 && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[--error-100] text-[--error-600] flex items-center justify-center">
                ✕
              </div>
              <div>
                <p className="text-neutral-900">
                  Refinancing may not be beneficial at this time.
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  The processing fees and/or new loan terms don't result in significant savings.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};