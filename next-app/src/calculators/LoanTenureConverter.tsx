import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, ArrowRight } from 'lucide-react';

export const LoanTenureConverter: React.FC = () => {
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [tenure, setTenure] = useState<number>(20);
  const [loanAmount, setLoanAmount] = useState<number>(2000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [convertedTenure, setConvertedTenure] = useState<number>(0);
  const [monthlyEMI, setMonthlyEMI] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  useEffect(() => {
    // Convert tenure
    const tenureInMonths = tenureType === 'years' ? tenure * 12 : tenure;
    const tenureInYears = tenureType === 'months' ? tenure / 12 : tenure;
    
    setConvertedTenure(tenureType === 'years' ? tenureInMonths : tenureInYears);
    
    // Calculate EMI and interest
    const monthlyRate = interestRate / 12 / 100;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) / 
               (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
    
    setMonthlyEMI(emi);
    setTotalInterest((emi * tenureInMonths) - loanAmount);
  }, [tenure, tenureType, loanAmount, interestRate]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Loan Tenure Conversion
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Tenure Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  tenureType === 'years'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setTenureType('years')}
              >
                Years
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  tenureType === 'months'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setTenureType('months')}
              >
                Months
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="tenure" className="block text-sm font-medium text-neutral-700 mb-2">
              Loan Tenure
            </label>
            <input
              type="number"
              id="tenure"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="input"
              min={tenureType === 'years' ? 1 : 12}
              max={tenureType === 'years' ? 30 : 360}
              step={tenureType === 'years' ? 1 : 12}
            />
          </div>
          
          <div>
            <label htmlFor="loan-amount" className="block text-sm font-medium text-neutral-700 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              id="loan-amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="input"
              min="0"
              step="10000"
            />
          </div>
          
          <div>
            <label htmlFor="interest-rate" className="block text-sm font-medium text-neutral-700 mb-2">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              id="interest-rate"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="input"
              min="1"
              max="30"
              step="0.1"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Conversion Result</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500 mb-1">
                {tenureType === 'years' ? 'Years' : 'Months'}
              </p>
              <p className="text-xl font-bold text-neutral-900">
                {tenure} {tenureType === 'years' ? 'years' : 'months'}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">
                {tenureType === 'years' ? 'Months' : 'Years'}
              </p>
              <p className="text-xl font-bold text-[--primary-900]">
                {convertedTenure.toFixed(1)} {tenureType === 'years' ? 'months' : 'years'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-[--accent-50] rounded-lg border border-[--accent-100]">
          <h3 className="text-lg font-semibold text-[--accent-900] mb-4">EMI Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-[--accent-700] mb-1">Monthly EMI</p>
              <p className="text-xl font-bold text-[--accent-900]">{formatCurrency(monthlyEMI)}</p>
            </div>
            <div>
              <p className="text-sm text-[--accent-700] mb-1">Total Interest</p>
              <p className="text-xl font-bold text-[--accent-900]">{formatCurrency(totalInterest)}</p>
            </div>
            <div>
              <p className="text-sm text-[--accent-700] mb-1">Total Payment</p>
              <p className="text-xl font-bold text-[--accent-900]">{formatCurrency(loanAmount + totalInterest)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Loan Tenure Guide
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Impact of Loan Tenure</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Shorter Tenure:</strong></p>
                <ul className="list-disc list-inside ml-4 mb-2">
                  <li>Higher EMI payments</li>
                  <li>Lower total interest cost</li>
                  <li>Faster debt freedom</li>
                </ul>
                <p><strong>Longer Tenure:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>Lower EMI payments</li>
                  <li>Higher total interest cost</li>
                  <li>More financial flexibility</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Common Loan Tenures</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Home Loans:</strong> 15-30 years (180-360 months)</p>
                <p><strong>Car Loans:</strong> 5-7 years (60-84 months)</p>
                <p><strong>Personal Loans:</strong> 1-5 years (12-60 months)</p>
                <p><strong>Education Loans:</strong> 5-15 years (60-180 months)</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Tips for Choosing Tenure</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Consider your current and future income</li>
                <li>Balance EMI affordability with total cost</li>
                <li>Account for other financial commitments</li>
                <li>Keep EMI within 40-50% of monthly income</li>
                <li>Consider prepayment options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};