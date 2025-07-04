import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { Sliders, PieChart, Calendar } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [breakup, setBreakup] = useState<{principal: number; interest: number}[]>([]);
  
  // Manual input states
  const [manualLoanAmount, setManualLoanAmount] = useState<string>(loanAmount.toString());
  const [manualInterestRate, setManualInterestRate] = useState<string>(interestRate.toString());
  const [manualLoanTenure, setManualLoanTenure] = useState<string>(loanTenure.toString());
  
  useEffect(() => {
    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const calculatedEmi = calculateEMI(loanAmount, interestRate, tenureInMonths);
    const totalAmount = calculatedEmi * tenureInMonths;
    const interestAmount = totalAmount - loanAmount;
    
    setEmi(calculatedEmi);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);
    setBreakup(calculateLoanBreakup(loanAmount, interestRate, tenureInMonths));
  }, [loanAmount, interestRate, loanTenure, tenureType]);
  
  // Update slider values when manual inputs change
  const handleManualLoanAmountChange = (value: string) => {
    setManualLoanAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 10000 && numValue <= 10000000) {
      setLoanAmount(numValue);
    }
  };
  
  const handleManualInterestRateChange = (value: string) => {
    setManualInterestRate(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 5 && numValue <= 20) {
      setInterestRate(numValue);
    }
  };
  
  const handleManualLoanTenureChange = (value: string) => {
    setManualLoanTenure(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      const min = tenureType === 'years' ? 1 : 1;
      const max = tenureType === 'years' ? 30 : 360;
      if (numValue >= min && numValue <= max) {
        setLoanTenure(numValue);
      }
    }
  };
  
  // Update manual input values when sliders change
  useEffect(() => {
    setManualLoanAmount(loanAmount.toString());
    setManualInterestRate(interestRate.toString());
    setManualLoanTenure(loanTenure.toString());
  }, [loanAmount, interestRate, loanTenure]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-primary-600" />
          Loan Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-amount" className="text-sm font-medium text-neutral-700">
                Loan Amount (₹)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {formatCurrency(loanAmount)}
                </span>
                <input 
                  type="number"
                  value={manualLoanAmount}
                  onChange={(e) => handleManualLoanAmountChange(e.target.value)}
                  className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="10000"
                  max="10000000"
                  step="10000"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="loan-amount"
              min="10000" 
              max="10000000" 
              step="10000" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹10K</span>
              <span>₹1Cr</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                Interest Rate (% p.a.)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {interestRate.toFixed(2)}%
                </span>
                <input 
                  type="number"
                  value={manualInterestRate}
                  onChange={(e) => handleManualInterestRateChange(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="5"
                  max="20"
                  step="0.05"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="interest-rate"
              min="5" 
              max="20" 
              step="0.05" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                Loan Tenure
              </label>
              <div className="flex items-center">
                <div className="flex space-x-2 mr-2">
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${tenureType === 'years' ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-600'}`}
                    onClick={() => setTenureType('years')}
                  >
                    Years
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${tenureType === 'months' ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-600'}`}
                    onClick={() => setTenureType('months')}
                  >
                    Months
                  </button>
                </div>
                <input 
                  type="number"
                  value={manualLoanTenure}
                  onChange={(e) => handleManualLoanTenureChange(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min={tenureType === 'years' ? 1 : 1}
                  max={tenureType === 'years' ? 30 : 360}
                  step="1"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="loan-tenure"
              min={tenureType === 'years' ? '1' : '1'} 
              max={tenureType === 'years' ? '30' : '360'} 
              step="1" 
              value={loanTenure} 
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>{tenureType === 'years' ? '1 Year' : '1 Month'}</span>
              <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Loan Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(emi)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalPayment)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-primary-600" />
            Payment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Principal', value: loanAmount, color: '#3b82f6' },
                { name: 'Interest', value: totalInterest, color: '#f59e0b' }
              ]}
              centerText={`${formatCurrency(totalPayment)}\nTotal`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary-600" />
            Yearly Breakup
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
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
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};