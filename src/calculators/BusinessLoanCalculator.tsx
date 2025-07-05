import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Building2, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const BusinessLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [loanTenure, setLoanTenure] = useState<number>(60);
  const [processingFee, setProcessingFee] = useState<number>(1);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(200000);
  const [monthlyEmi, setMonthlyEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  
  useEffect(() => {
    // Calculate EMI
    const monthlyRate = interestRate / 12 / 100;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) / 
               (Math.pow(1 + monthlyRate, loanTenure) - 1);
    
    const processingAmount = (processingFee / 100) * loanAmount;
    const totalAmount = emi * loanTenure + processingAmount;
    const interestAmount = totalAmount - loanAmount;
    
    setMonthlyEmi(emi);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);
  }, [loanAmount, interestRate, loanTenure, processingFee]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-[--primary-600]" />
          Business Loan Details
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
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                Interest Rate (% p.a.)
              </label>
              <span className="text-sm text-neutral-500">
                {interestRate}%
              </span>
            </div>
            <input 
              type="range" 
              id="interest-rate"
              min="8" 
              max="24" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                Loan Tenure (Months)
              </label>
              <span className="text-sm text-neutral-500">
                {loanTenure} months
              </span>
            </div>
            <input 
              type="range" 
              id="loan-tenure"
              min="12" 
              max="84" 
              value={loanTenure} 
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="processing-fee" className="text-sm font-medium text-neutral-700">
                Processing Fee (%)
              </label>
              <span className="text-sm text-neutral-500">
                {processingFee}%
              </span>
            </div>
            <input 
              type="range" 
              id="processing-fee"
              min="0" 
              max="3" 
              step="0.1" 
              value={processingFee} 
              onChange={(e) => setProcessingFee(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-income" className="text-sm font-medium text-neutral-700">
                Monthly Business Income (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyIncome)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-income"
              min="50000" 
              max="1000000" 
              step="10000" 
              value={monthlyIncome} 
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Loan Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyEmi)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Payment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalPayment)}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Processing Fee</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency((processingFee / 100) * loanAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">EMI to Income Ratio</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {((monthlyEmi / monthlyIncome) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Payment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Principal', value: loanAmount, color: '#3b82f6' },
                { name: 'Interest & Charges', value: totalInterest, color: '#ef4444' }
              ]}
              centerText={`${formatCurrency(totalPayment)}\nTotal`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Business Loan Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Eligibility Criteria</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Minimum business vintage of 3 years</li>
                <li>Good credit score (700+)</li>
                <li>Stable business income</li>
                <li>Clean banking history</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Required Documents</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Business registration documents</li>
                <li>Last 2 years ITR and financials</li>
                <li>Bank statements for 12 months</li>
                <li>KYC documents</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Flexible loan amounts</li>
                <li>Competitive interest rates</li>
                <li>Minimal documentation</li>
                <li>Quick disbursement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};