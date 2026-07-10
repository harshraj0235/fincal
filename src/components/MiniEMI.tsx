import React, { useState } from 'react';

export default function MiniEMI() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [years, setYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const P = loanAmount;
  const r = interestRate / 12 / 100;
  const n = years * 12;
  
  // EMI = P x r x (1 + r)^n / ((1 + r)^n - 1)
  const emi = Math.round(P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="bg-white border border-teal-100 rounded-xl p-4 my-4 shadow-sm w-full max-w-sm font-sans">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
        <h4 className="font-bold text-teal-800 text-sm flex items-center gap-2">
          <span className="bg-teal-100 text-teal-700 p-1 rounded">🏠</span> EMI Calculator
        </h4>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="flex justify-between text-xs text-gray-600 font-medium mb-1">
            <span>Loan Amount</span>
            <span className="text-teal-700 font-bold">{formatCurrency(loanAmount)}</span>
          </label>
          <input 
            type="range" 
            min="100000" max="20000000" step="100000" 
            value={loanAmount} 
            onChange={e => setLoanAmount(Number(e.target.value))} 
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>

        <div>
          <label className="flex justify-between text-xs text-gray-600 font-medium mb-1">
            <span>Tenure</span>
            <span className="text-teal-700 font-bold">{years} Years</span>
          </label>
          <input 
            type="range" 
            min="1" max="30" step="1" 
            value={years} 
            onChange={e => setYears(Number(e.target.value))} 
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>

        <div>
          <label className="flex justify-between text-xs text-gray-600 font-medium mb-1">
            <span>Interest Rate</span>
            <span className="text-teal-700 font-bold">{interestRate}%</span>
          </label>
          <input 
            type="range" 
            min="5" max="20" step="0.1" 
            value={interestRate} 
            onChange={e => setInterestRate(Number(e.target.value))} 
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>
      </div>

      <div className="mt-5 bg-teal-50 rounded-lg p-3 text-sm border border-teal-100">
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-teal-200">
          <span className="text-gray-700 font-medium text-xs">Monthly EMI</span>
          <span className="font-bold text-teal-700 text-xl">{formatCurrency(emi)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-600 text-xs">Principal Amount</span>
          <span className="font-semibold text-gray-800">{formatCurrency(P)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 text-xs">Total Interest</span>
          <span className="font-semibold text-red-500">+{formatCurrency(totalInterest)}</span>
        </div>
      </div>
    </div>
  );
}
