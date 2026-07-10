import React, { useState } from 'react';

export default function MiniSIP() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);

  const months = years * 12;
  const i = returnRate / 100 / 12;
  
  // Future Value = P * [ (1+i)^n - 1 ] * (1+i)/i
  const expectedAmount = Math.round(monthlyInvestment * ((Math.pow(1 + i, months) - 1) / i) * (1 + i));
  const totalInvested = monthlyInvestment * months;
  const wealthGained = expectedAmount - totalInvested;

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="bg-white border border-blue-100 rounded-xl p-4 my-4 shadow-sm w-full max-w-sm font-sans">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
        <h4 className="font-bold text-blue-800 text-sm flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 p-1 rounded">📈</span> SIP Calculator
        </h4>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="flex justify-between text-xs text-gray-600 font-medium mb-1">
            <span>Monthly Investment</span>
            <span className="text-blue-700 font-bold">{formatCurrency(monthlyInvestment)}</span>
          </label>
          <input 
            type="range" 
            min="500" max="100000" step="500" 
            value={monthlyInvestment} 
            onChange={e => setMonthlyInvestment(Number(e.target.value))} 
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <label className="flex justify-between text-xs text-gray-600 font-medium mb-1">
            <span>Time Period</span>
            <span className="text-blue-700 font-bold">{years} Years</span>
          </label>
          <input 
            type="range" 
            min="1" max="30" step="1" 
            value={years} 
            onChange={e => setYears(Number(e.target.value))} 
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <label className="flex justify-between text-xs text-gray-600 font-medium mb-1">
            <span>Expected Return</span>
            <span className="text-blue-700 font-bold">{returnRate}%</span>
          </label>
          <input 
            type="range" 
            min="1" max="30" step="0.5" 
            value={returnRate} 
            onChange={e => setReturnRate(Number(e.target.value))} 
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      <div className="mt-5 bg-blue-50 rounded-lg p-3 text-sm border border-blue-100">
        <div className="flex justify-between mb-1">
          <span className="text-gray-600 text-xs">Total Invested</span>
          <span className="font-semibold text-gray-800">{formatCurrency(totalInvested)}</span>
        </div>
        <div className="flex justify-between mb-2 pb-2 border-b border-blue-200">
          <span className="text-gray-600 text-xs">Wealth Gained</span>
          <span className="font-semibold text-emerald-600">+{formatCurrency(wealthGained)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium text-xs">Expected Amount</span>
          <span className="font-bold text-blue-700 text-lg">{formatCurrency(expectedAmount)}</span>
        </div>
      </div>
    </div>
  );
}
