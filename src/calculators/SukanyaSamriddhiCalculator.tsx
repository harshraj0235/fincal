import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import {
  Sliders,
  Calculator,
  PieChart
} from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const SukanyaSamriddhiCalculator: React.FC = () => {
  const [yearlyDeposit, setYearlyDeposit] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [girlAge, setGirlAge] = useState<number>(2);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  useEffect(() => {
    // Calculate maturity amount
    let balance = 0;
    let depositYears = Math.min(15, 21 - girlAge);
    let totalDepositAmount = 0;
    
    // Calculate for deposit period (15 years or till age 21)
    for (let year = 1; year <= depositYears; year++) {
      balance += yearlyDeposit;
      totalDepositAmount += yearlyDeposit;
      balance += balance * (interestRate / 100);
    }
    
    // Calculate interest for remaining period till maturity (21 years)
    const remainingYears = 21 - girlAge - depositYears;
    for (let year = 1; year <= remainingYears; year++) {
      balance += balance * (interestRate / 100);
    }
    
    setTotalDeposit(totalDepositAmount);
    setMaturityAmount(balance);
    setTotalInterest(balance - totalDepositAmount);
  }, [yearlyDeposit, interestRate, girlAge]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Sukanya Samriddhi Account Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="yearly-deposit" className="text-sm font-medium text-neutral-700">
                Yearly Deposit (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(yearlyDeposit)}
              </span>
            </div>
            <input 
              type="range" 
              id="yearly-deposit"
              min="1000" 
              max="150000" 
              step="1000" 
              value={yearlyDeposit} 
              onChange={(e) => setYearlyDeposit(Number(e.target.value))}
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
              min="7" 
              max="9" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="girl-age" className="text-sm font-medium text-neutral-700">
                Girl's Age (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {girlAge} years
              </span>
            </div>
            <input 
              type="range" 
              id="girl-age"
              min="0" 
              max="10" 
              step="1" 
              value={girlAge} 
              onChange={(e) => setGirlAge(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Account Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Deposit</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalDeposit)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Interest Earned</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maturity Amount</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(maturityAmount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Account Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Deposit', value: totalDeposit, color: '#3b82f6' },
                { name: 'Interest', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nMaturity Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Scheme Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Account can be opened for girl child below 10 years</li>
                <li>Deposits allowed for 15 years</li>
                <li>Account matures when girl turns 21</li>
                <li>Minimum deposit: ₹250, Maximum: ₹1.5 lakh per year</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Tax Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Tax deduction under Section 80C</li>
                <li>Interest earned is tax-free</li>
                <li>Maturity amount is tax-free</li>
                <li>EEE (Exempt-Exempt-Exempt) status</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Highest interest rate among government schemes</li>
                <li>Partial withdrawal allowed for education</li>
                <li>Government backed security</li>
                <li>Helps in girl child's future planning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};