import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, Calendar } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const LoanPrepaymentCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(2000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [prepaymentAmount, setPrepaymentAmount] = useState<number>(500000);
  const [prepaymentYear, setPrepaymentYear] = useState<number>(5);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [savingsAmount, setSavingsAmount] = useState<number>(0);
  const [tenureReduction, setTenureReduction] = useState<number>(0);
  const [breakup, setBreakup] = useState<{principal: number; interest: number}[]>([]);
  const [prepaidBreakup, setPrepaidBreakup] = useState<{principal: number; interest: number}[]>([]);
  
  useEffect(() => {
    // Calculate original loan details
    const tenureInMonths = loanTenure * 12;
    const calculatedEmi = calculateEMI(loanAmount, interestRate, tenureInMonths);
    const totalAmount = calculatedEmi * tenureInMonths;
    const interestAmount = totalAmount - loanAmount;
    
    setEmi(calculatedEmi);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);
    setBreakup(calculateLoanBreakup(loanAmount, interestRate, tenureInMonths));
    
    // Calculate prepayment scenario
    const monthsBeforePrepayment = prepaymentYear * 12;
    const prepaymentInterest = prepaymentAmount * (interestRate / 100 / 12);
    const remainingPrincipal = loanAmount - 
      (calculatedEmi * monthsBeforePrepayment - 
       (interestAmount * monthsBeforePrepayment / tenureInMonths)) - 
      prepaymentAmount;
    
    if (remainingPrincipal > 0) {
      const newEmi = calculateEMI(remainingPrincipal, interestRate, tenureInMonths - monthsBeforePrepayment);
      const newTotalAmount = (calculatedEmi * monthsBeforePrepayment) + prepaymentAmount + 
        (newEmi * (tenureInMonths - monthsBeforePrepayment));
      const newInterestAmount = newTotalAmount - loanAmount;
      
      setSavingsAmount(interestAmount - newInterestAmount);
      setPrepaidBreakup(calculateLoanBreakup(remainingPrincipal, interestRate, tenureInMonths - monthsBeforePrepayment));
      
      // Calculate tenure reduction
      const monthsReduced = Math.floor((totalAmount - newTotalAmount) / calculatedEmi);
      setTenureReduction(monthsReduced);
    }
  }, [loanAmount, interestRate, loanTenure, prepaymentAmount, prepaymentYear]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Loan Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-amount" className="text-sm font-medium text-neutral-700">
                Loan Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="loan-amount"
              min="100000" 
              max="10000000" 
              step="100000" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹1L</span>
              <span>₹1Cr</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                Interest Rate (% p.a.)
              </label>
              <span className="text-sm text-neutral-500">
                {interestRate.toFixed(2)}%
              </span>
            </div>
            <input 
              type="range" 
              id="interest-rate"
              min="5" 
              max="15" 
              step="0.05" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>5%</span>
              <span>15%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                Loan Tenure (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {loanTenure} years
              </span>
            </div>
            <input 
              type="range" 
              id="loan-tenure"
              min="5" 
              max="30" 
              step="1" 
              value={loanTenure} 
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>5 Years</span>
              <span>30 Years</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Prepayment Details</h3>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="prepayment-amount" className="text-sm font-medium text-neutral-700">
                  Prepayment Amount (₹)
                </label>
                <span className="text-sm text-neutral-500">
                  {formatCurrency(prepaymentAmount)}
                </span>
              </div>
              <input 
                type="range" 
                id="prepayment-amount"
                min="100000" 
                max={loanAmount * 0.5} 
                step="100000" 
                value={prepaymentAmount} 
                onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>₹1L</span>
                <span>{formatCurrency(loanAmount * 0.5)}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <label htmlFor="prepayment-year" className="text-sm font-medium text-neutral-700">
                  Prepayment After (Years)
                </label>
                <span className="text-sm text-neutral-500">
                  {prepaymentYear} years
                </span>
              </div>
              <input 
                type="range" 
                id="prepayment-year"
                min="1" 
                max={loanTenure - 1} 
                step="1" 
                value={prepaymentYear} 
                onChange={(e) => setPrepaymentYear(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>1 Year</span>
                <span>{loanTenure - 1} Years</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Prepayment Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Interest Savings</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(savingsAmount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Tenure Reduction</p>
              <p className="text-xl font-bold text-[--success-600]">
                {Math.floor(tenureReduction / 12)} years {tenureReduction % 12} months
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Payment Comparison
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h3 className="text-sm font-medium text-neutral-700 mb-4">Without Prepayment</h3>
              <div className="h-48">
                <ResultChart 
                  data={[
                    { name: 'Principal', value: loanAmount, color: '#3b82f6' },
                    { name: 'Interest', value: totalInterest, color: '#f59e0b' }
                  ]}
                  centerText={`${formatCurrency(totalPayment)}\nTotal`}
                />
              </div>
            </div>
            <div className="p-4 bg-[--success-50] rounded-lg">
              <h3 className="text-sm font-medium text-[--success-700] mb-4">With Prepayment</h3>
              <div className="h-48">
                <ResultChart 
                  data={[
                    { name: 'Principal', value: loanAmount, color: '#22c55e' },
                    { name: 'Interest', value: totalInterest - savingsAmount, color: '#f59e0b' }
                  ]}
                  centerText={`${formatCurrency(totalPayment - savingsAmount)}\nTotal`}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Loan Schedule
          </h2>
          <div className="mt-4 overflow-auto max-h-96 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Principal (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Interest (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {breakup.map((year, index) => {
                  if (index < prepaymentYear) {
                    // Before prepayment
                    const yearlyPrincipal = year.principal;
                    const yearlyInterest = year.interest;
                    const remainingBalance = totalPayment - ((index + 1) * 12 * emi);
                    
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                        <td className="px-4 py-2 text-sm text-neutral-900">{index + 1}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyPrincipal)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyInterest)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(Math.max(0, remainingBalance))}</td>
                      </tr>
                    );
                  } else if (index === prepaymentYear) {
                    // Prepayment year
                    return (
                      <tr key={index} className="bg-[--success-50]">
                        <td className="px-4 py-2 text-sm font-medium text-[--success-700]">{index + 1}</td>
                        <td className="px-4 py-2 text-sm font-medium text-[--success-700]">
                          {formatCurrency(year.principal + prepaymentAmount)}
                        </td>
                        <td className="px-4 py-2 text-sm font-medium text-[--success-700]">{formatCurrency(year.interest)}</td>
                        <td className="px-4 py-2 text-sm font-medium text-[--success-700]">
                          {formatCurrency(Math.max(0, totalPayment - savingsAmount - ((index + 1) * 12 * emi) - prepaymentAmount))}
                        </td>
                      </tr>
                    );
                  } else if (index < prepaidBreakup.length + prepaymentYear) {
                    // After prepayment
                    const prepaidYear = prepaidBreakup[index - prepaymentYear];
                    const remainingBalance = totalPayment - savingsAmount - 
                      ((index + 1) * 12 * emi) - prepaymentAmount;
                    
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                        <td className="px-4 py-2 text-sm text-neutral-900">{index + 1}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(prepaidYear.principal)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(prepaidYear.interest)}</td>
                        <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(Math.max(0, remainingBalance))}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};