import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Wallet, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const SavingsAccountCalculator: React.FC = () => {
  const [averageBalance, setAverageBalance] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [calculationPeriod, setCalculationPeriod] = useState<number>(12);
  const [minimumBalance, setMinimumBalance] = useState<number>(10000);
  const [monthlyInterest, setMonthlyInterest] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [finalBalance, setFinalBalance] = useState<number>(0);
  
  useEffect(() => {
    // Calculate interest (compounded quarterly)
    const quarterlyRate = interestRate / 4 / 100;
    const quarters = calculationPeriod / 3;
    
    let balance = averageBalance;
    let totalInt = 0;
    
    for (let i = 0; i < quarters; i++) {
      const quarterlyInterest = balance * quarterlyRate;
      totalInt += quarterlyInterest;
      balance += quarterlyInterest;
    }
    
    setMonthlyInterest(totalInt / calculationPeriod);
    setTotalInterest(totalInt);
    setFinalBalance(averageBalance + totalInt);
  }, [averageBalance, interestRate, calculationPeriod, minimumBalance]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Wallet className="w-5 h-5 mr-2 text-[--primary-600]" />
          Savings Account Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="average-balance" className="text-sm font-medium text-neutral-700">
                Average Monthly Balance (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(averageBalance)}
              </span>
            </div>
            <input 
              type="range" 
              id="average-balance"
              min="0" 
              max="1000000" 
              step="5000" 
              value={averageBalance} 
              onChange={(e) => setAverageBalance(Number(e.target.value))}
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
              min="2.5" 
              max="7" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="calculation-period" className="text-sm font-medium text-neutral-700">
                Calculation Period (Months)
              </label>
              <span className="text-sm text-neutral-500">
                {calculationPeriod} months
              </span>
            </div>
            <input 
              type="range" 
              id="calculation-period"
              min="1" 
              max="36" 
              value={calculationPeriod} 
              onChange={(e) => setCalculationPeriod(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="minimum-balance" className="text-sm font-medium text-neutral-700">
                Minimum Balance Required (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(minimumBalance)}
              </span>
            </div>
            <input 
              type="range" 
              id="minimum-balance"
              min="0" 
              max="25000" 
              step="1000" 
              value={minimumBalance} 
              onChange={(e) => setMinimumBalance(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Interest Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly Interest</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(monthlyInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Final Balance</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(finalBalance)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Balance Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Principal', value: averageBalance, color: '#3b82f6' },
                { name: 'Interest Earned', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(finalBalance)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Account Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Interest Calculation</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Interest calculated on daily end-of-day balance</li>
                <li>Interest credited quarterly</li>
                <li>Interest rates subject to change as per RBI guidelines</li>
                <li>TDS applicable on interest earned above ₹40,000 per year</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Account Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Free digital banking services</li>
                <li>Mobile and internet banking access</li>
                <li>Free ATM transactions (limits apply)</li>
                <li>Auto-sweep facility available</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Maintain minimum average monthly balance</li>
                <li>Charges applicable for non-maintenance of minimum balance</li>
                <li>Interest rates may vary across banks</li>
                <li>Senior citizens may get additional interest rate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};