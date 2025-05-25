import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const NpsCalculator: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [employerContribution, setEmployerContribution] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [existingBalance, setExistingBalance] = useState<number>(100000);
  const [equityAllocation, setEquityAllocation] = useState<number>(50);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalContribution, setTotalContribution] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  
  useEffect(() => {
    // Calculate NPS accumulation
    const investmentYears = retirementAge - currentAge;
    let balance = existingBalance;
    const yearlyContribution = (monthlyContribution + employerContribution) * 12;
    let totalContrib = existingBalance;
    
    for (let year = 1; year <= investmentYears; year++) {
      totalContrib += yearlyContribution;
      balance += yearlyContribution;
      
      // Calculate returns based on asset allocation
      const equityReturns = balance * (equityAllocation / 100) * (expectedReturn / 100);
      const debtReturns = balance * ((100 - equityAllocation) / 100) * ((expectedReturn - 2) / 100);
      const totalReturns = equityReturns + debtReturns;
      
      balance += totalReturns;
    }
    
    setMaturityAmount(balance);
    setTotalContribution(totalContrib);
    setTotalReturns(balance - totalContrib);
  }, [monthlyContribution, employerContribution, expectedReturn, currentAge, retirementAge, existingBalance, equityAllocation]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          NPS Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-contribution" className="text-sm font-medium text-neutral-700">
                Monthly Contribution (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyContribution)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-contribution"
              min="500" 
              max="50000" 
              step="500" 
              value={monthlyContribution} 
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹500</span>
              <span>₹50,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="employer-contribution" className="text-sm font-medium text-neutral-700">
                Monthly Employer Contribution (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(employerContribution)}
              </span>
            </div>
            <input 
              type="range" 
              id="employer-contribution"
              min="0" 
              max="50000" 
              step="500" 
              value={employerContribution} 
              onChange={(e) => setEmployerContribution(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹50,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-balance" className="text-sm font-medium text-neutral-700">
                Existing NPS Balance (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingBalance)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-balance"
              min="0" 
              max="10000000" 
              step="10000" 
              value={existingBalance} 
              onChange={(e) => setExistingBalance(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="current-age" className="text-sm font-medium text-neutral-700">
                Current Age (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {currentAge} years
              </span>
            </div>
            <input 
              type="range" 
              id="current-age"
              min="18" 
              max="55" 
              step="1" 
              value={currentAge} 
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="equity-allocation" className="text-sm font-medium text-neutral-700">
                Equity Allocation (%)
              </label>
              <span className="text-sm text-neutral-500">
                {equityAllocation}%
              </span>
            </div>
            <input 
              type="range" 
              id="equity-allocation"
              min="0" 
              max="75" 
              step="5" 
              value={equityAllocation} 
              onChange={(e) => setEquityAllocation(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                Expected Return (% p.a.)
              </label>
              <span className="text-sm text-neutral-500">
                {expectedReturn}%
              </span>
            </div>
            <input 
              type="range" 
              id="expected-return"
              min="8" 
              max="15" 
              step="0.5" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">NPS Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Contribution</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalContribution)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Returns</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalReturns)}</p>
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
            NPS Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Contribution', value: totalContribution, color: '#3b82f6' },
                { name: 'Returns', value: totalReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            NPS Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Investment Rules</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Maximum equity exposure capped at 75%</li>
                <li>Auto reduction in equity after age 50</li>
                <li>Minimum contribution of ₹6,000 per year</li>
                <li>Maximum contribution not capped</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Tax Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Additional ₹50,000 deduction under 80CCD(1B)</li>
                <li>Employer contribution deductible under 80CCD(2)</li>
                <li>40% of corpus tax-free on maturity</li>
                <li>Partial withdrawal tax-free after 3 years</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Retirement age fixed at 60 years</li>
                <li>Minimum 40% annuitization mandatory</li>
                <li>Partial withdrawal allowed for specific needs</li>
                <li>Professional fund management with low costs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};