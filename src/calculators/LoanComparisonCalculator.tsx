import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI } from '../utils/calculatorUtils';
import { Sliders, Calculator, ArrowDown } from 'lucide-react';
import { BarChart } from '../components/BarChart';

interface LoanOption {
  id: number;
  loanAmount: number;
  interestRate: number;
  tenure: number;
  processingFee: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
  bank?: string;
}

export const LoanComparisonCalculator: React.FC = () => {
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([
    {
      id: 1,
      loanAmount: 1000000,
      interestRate: 8.5,
      tenure: 20,
      processingFee: 0.5,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      bank: 'Bank A'
    },
    {
      id: 2,
      loanAmount: 1000000,
      interestRate: 8.7,
      tenure: 20,
      processingFee: 0.25,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      bank: 'Bank B'
    }
  ]);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  useEffect(() => {
    const updatedOptions = loanOptions.map(option => {
      const emi = calculateEMI(option.loanAmount, option.interestRate, option.tenure * 12);
      const totalPayment = emi * option.tenure * 12;
      const totalInterest = totalPayment - option.loanAmount;
      const processingFeeAmount = (option.processingFee / 100) * option.loanAmount;
      
      return {
        ...option,
        emi,
        totalInterest,
        totalPayment: totalPayment + processingFeeAmount
      };
    });
    
    setLoanOptions(updatedOptions);
  }, []);
  
  const addLoanOption = () => {
    const newId = Math.max(...loanOptions.map(o => o.id)) + 1;
    setLoanOptions([...loanOptions, {
      id: newId,
      loanAmount: 1000000,
      interestRate: 8.5,
      tenure: 20,
      processingFee: 0.5,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      bank: `Bank ${String.fromCharCode(65 + newId - 1)}`
    }]);
  };
  
  const removeLoanOption = (id: number) => {
    if (loanOptions.length > 2) {
      setLoanOptions(loanOptions.filter(option => option.id !== id));
      if (selectedOption === id) setSelectedOption(null);
    }
  };
  
  const updateLoanOption = (id: number, updates: Partial<LoanOption>) => {
    setLoanOptions(loanOptions.map(option => {
      if (option.id === id) {
        const updatedOption = { ...option, ...updates };
        const emi = calculateEMI(updatedOption.loanAmount, updatedOption.interestRate, updatedOption.tenure * 12);
        const totalPayment = emi * updatedOption.tenure * 12;
        const totalInterest = totalPayment - updatedOption.loanAmount;
        const processingFeeAmount = (updatedOption.processingFee / 100) * updatedOption.loanAmount;
        
        return {
          ...updatedOption,
          emi,
          totalInterest,
          totalPayment: totalPayment + processingFeeAmount
        };
      }
      return option;
    }));
  };
  
  const getBestOption = () => {
    return loanOptions.reduce((best, current) => 
      current.totalPayment < best.totalPayment ? current : best
    );
  };
  
  const bestOption = getBestOption();
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loanOptions.map(option => (
          <div 
            key={option.id}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedOption === option.id 
                ? 'border-[--primary-500] bg-[--primary-50]'
                : option.id === bestOption.id
                  ? 'border-[--success-500] bg-[--success-50]'
                  : 'border-neutral-200 bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <input
                type="text"
                value={option.bank}
                onChange={(e) => updateLoanOption(option.id, { bank: e.target.value })}
                className="text-lg font-semibold bg-transparent border-none p-0 focus:ring-0"
                placeholder="Bank Name"
              />
              {loanOptions.length > 2 && (
                <button
                  onClick={() => removeLoanOption(option.id)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  ✕
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={option.loanAmount}
                  onChange={(e) => updateLoanOption(option.id, { loanAmount: Number(e.target.value) })}
                  className="input mt-1"
                  min="10000"
                  max="100000000"
                  step="10000"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  value={option.interestRate}
                  onChange={(e) => updateLoanOption(option.id, { interestRate: Number(e.target.value) })}
                  className="input mt-1"
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Tenure (Years)
                </label>
                <input
                  type="number"
                  value={option.tenure}
                  onChange={(e) => updateLoanOption(option.id, { tenure: Number(e.target.value) })}
                  className="input mt-1"
                  min="1"
                  max="30"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Processing Fee (%)
                </label>
                <input
                  type="number"
                  value={option.processingFee}
                  onChange={(e) => updateLoanOption(option.id, { processingFee: Number(e.target.value) })}
                  className="input mt-1"
                  min="0"
                  max="5"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Monthly EMI</span>
                  <span className="font-medium">{formatCurrency(option.emi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Processing Fee</span>
                  <span className="font-medium">{formatCurrency(option.loanAmount * option.processingFee / 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Total Interest</span>
                  <span className="font-medium">{formatCurrency(option.totalInterest)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold mt-4 pt-2 border-t border-neutral-200">
                  <span>Total Payment</span>
                  <span>{formatCurrency(option.totalPayment)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedOption(option.id === selectedOption ? null : option.id)}
              className={`w-full mt-4 btn ${
                option.id === selectedOption
                  ? 'bg-[--primary-600] text-white'
                  : 'bg-white text-[--primary-600] border border-[--primary-600]'
              }`}
            >
              {option.id === selectedOption ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
        
        {loanOptions.length < 4 && (
          <button
            onClick={addLoanOption}
            className="h-full min-h-[200px] rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-600 hover:text-neutral-800 hover:border-neutral-400 transition-colors"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">+</div>
              <div>Add Another Option</div>
            </div>
          </button>
        )}
      </div>
      
      <div className="bg-[--success-50] border border-[--success-200] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[--success-800] mb-4">Best Option: {bestOption.bank}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
            <p className="text-xl font-bold text-[--success-700]">{formatCurrency(bestOption.emi)}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-neutral-500 mb-1">Interest Rate</p>
            <p className="text-xl font-bold text-[--success-700]">{bestOption.interestRate}%</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
            <p className="text-xl font-bold text-[--success-700]">{formatCurrency(bestOption.totalInterest)}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-neutral-500 mb-1">Total Payment</p>
            <p className="text-xl font-bold text-[--success-700]">{formatCurrency(bestOption.totalPayment)}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-6">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Comparison Chart
        </h2>
        <div className="h-80">
          <BarChart 
            data={loanOptions.map(option => ({
              label: option.bank || `Option ${option.id}`,
              value: option.totalPayment,
              color: option.id === bestOption.id ? '#22c55e' : '#3b82f6'
            }))}
            xKey="label"
            yKey="value"
            color="color"
            xLabel="Banks"
            yLabel="Total Payment (₹)"
            formatY={(value) => formatCurrency(value)}
          />
        </div>
      </div>
    </div>
  );
};