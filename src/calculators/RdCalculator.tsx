import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const RdCalculator: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [timePeriod, setTimePeriod] = useState<number>(60);
  const [seniorCitizen, setSeniorCitizen] = useState<boolean>(false);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  useEffect(() => {
    // Add senior citizen bonus rate
    const effectiveRate = seniorCitizen ? interestRate + 0.5 : interestRate;
    
    // Calculate RD maturity amount
    const monthlyRate = effectiveRate / 1200; // Convert annual rate to monthly
    const months = timePeriod;
    
    // Using RD formula: P * n + P * (n(n+1)/2) * r
    const depositAmount = monthlyDeposit * months;
    const interestAmount = monthlyDeposit * (months * (months + 1) / 2) * monthlyRate;
    
    setTotalDeposit(depositAmount);
    setTotalInterest(interestAmount);
    setMaturityAmount(depositAmount + interestAmount);
  }, [monthlyDeposit, interestRate, timePeriod, seniorCitizen]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Recurring Deposit Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-deposit" className="text-sm font-medium text-neutral-700">
                Monthly Deposit (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyDeposit)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-deposit"
              min="500" 
              max="100000" 
              step="500" 
              value={monthlyDeposit} 
              onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                Interest Rate (% p.a.)
              </label>
              <span className="text-sm text-neutral-500">
                {interestRate}% {seniorCitizen && '+ 0.5%'}
              </span>
            </div>
            <input 
              type="range" 
              id="interest-rate"
              min="3" 
              max="12" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="time-period" className="text-sm font-medium text-neutral-700">
                Time Period (Months)
              </label>
              <span className="text-sm text-neutral-500">
                {timePeriod} months
              </span>
            </div>
            <input 
              type="range" 
              id="time-period"
              min="6" 
              max="120" 
              step="6" 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="senior-citizen"
              checked={seniorCitizen}
              onChange={(e) => setSeniorCitizen(e.target.checked)}
              className="rounded border-neutral-300 text-[--primary-600] focus:ring-[--primary-500]"
            />
            <label htmlFor="senior-citizen" className="text-sm font-medium text-neutral-700">
              Senior Citizen (+0.5% additional rate)
            </label>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">RD Summary</h3>
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
            RD Breakup
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
            RD Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Fixed monthly deposits</li>
                <li>Flexible tenure options</li>
                <li>Compound interest quarterly</li>
                <li>Auto-debit facility available</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Tax Implications</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Interest income is taxable</li>
                <li>TDS applicable if interest exceeds ₹40,000</li>
                <li>Form 15G/15H can avoid TDS</li>
                <li>Interest taxed at slab rate</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Disciplined savings habit</li>
                <li>Guaranteed returns</li>
                <li>Loan facility available</li>
                <li>Nomination facility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};