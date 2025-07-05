import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, Calendar } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const HomeLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(3000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [propertyValue, setPropertyValue] = useState<number>(4000000);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [breakup, setBreakup] = useState<{principal: number; interest: number}[]>([]);
  
  useEffect(() => {
    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const calculatedEmi = calculateEMI(loanAmount, interestRate, tenureInMonths);
    const totalAmount = calculatedEmi * tenureInMonths;
    const interestAmount = totalAmount - loanAmount;
    
    setEmi(calculatedEmi);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);
    setBreakup(calculateLoanBreakup(loanAmount, interestRate, tenureInMonths));
  }, [loanAmount, interestRate, loanTenure, tenureType, propertyValue]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Home Loan Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="property-value" className="text-sm font-medium text-neutral-700">
                Property Value (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(propertyValue)}
              </span>
            </div>
            <input 
              type="range" 
              id="property-value"
              min="500000" 
              max="50000000" 
              step="100000" 
              value={propertyValue} 
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹5L</span>
              <span>₹5Cr</span>
            </div>
          </div>
          
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
              max={propertyValue * 0.9} 
              step="100000" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹1L</span>
              <span>{formatCurrency(propertyValue * 0.9)}</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Loan amount up to 90% of property value
            </p>
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
              min="6" 
              max="15" 
              step="0.05" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>6%</span>
              <span>15%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                Loan Tenure
              </label>
              <div className="flex space-x-2">
                <button 
                  className={`px-2 py-1 text-xs rounded-md ${tenureType === 'years' ? 'bg-[--primary-100] text-[--primary-800]' : 'bg-neutral-100 text-neutral-600'}`}
                  onClick={() => setTenureType('years')}
                >
                  Years
                </button>
                <button 
                  className={`px-2 py-1 text-xs rounded-md ${tenureType === 'months' ? 'bg-[--primary-100] text-[--primary-800]' : 'bg-neutral-100 text-neutral-600'}`}
                  onClick={() => setTenureType('months')}
                >
                  Months
                </button>
                <span className="text-sm text-neutral-500">
                  {loanTenure} {tenureType}
                </span>
              </div>
            </div>
            <input 
              type="range" 
              id="loan-tenure"
              min={tenureType === 'years' ? '1' : '12'} 
              max={tenureType === 'years' ? '30' : '360'} 
              step="1" 
              value={loanTenure} 
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
              <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Loan Summary</h3>
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
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Down Payment</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency(propertyValue - loanAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Loan to Value Ratio</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {((loanAmount / propertyValue) * 100).toFixed(1)}%
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
                { name: 'Interest', value: totalInterest, color: '#f59e0b' }
              ]}
              centerText={`${formatCurrency(totalPayment)}\nTotal`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[--primary-600]" />
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