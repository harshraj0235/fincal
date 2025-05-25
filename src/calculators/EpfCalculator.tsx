import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const EpfCalculator: React.FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(30000);
  const [employeeContribution, setEmployeeContribution] = useState<number>(3600);
  const [employerContribution, setEmployerContribution] = useState<number>(3600);
  const [interestRate, setInterestRate] = useState<number>(8.15);
  const [existingBalance, setExistingBalance] = useState<number>(100000);
  const [timePeriod, setTimePeriod] = useState<number>(20);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalContribution, setTotalContribution] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  useEffect(() => {
    // Calculate EPF accumulation
    let balance = existingBalance;
    const monthlyContribution = employeeContribution + employerContribution;
    let totalContrib = existingBalance;
    let totalInt = 0;
    
    for (let year = 1; year <= timePeriod; year++) {
      const yearlyContribution = monthlyContribution * 12;
      totalContrib += yearlyContribution;
      
      balance += yearlyContribution;
      const yearlyInterest = balance * (interestRate / 100);
      totalInt += yearlyInterest;
      balance += yearlyInterest;
    }
    
    setMaturityAmount(balance);
    setTotalContribution(totalContrib);
    setTotalInterest(totalInt);
  }, [basicSalary, employeeContribution, employerContribution, interestRate, existingBalance, timePeriod]);
  
  // Update contributions when basic salary changes
  useEffect(() => {
    const contribution = Math.round(basicSalary * 0.12);
    setEmployeeContribution(contribution);
    setEmployerContribution(contribution);
  }, [basicSalary]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          EPF Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="basic-salary" className="text-sm font-medium text-neutral-700">
                Monthly Basic Salary (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(basicSalary)}
              </span>
            </div>
            <input 
              type="range" 
              id="basic-salary"
              min="15000" 
              max="200000" 
              step="1000" 
              value={basicSalary} 
              onChange={(e) => setBasicSalary(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹15,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-balance" className="text-sm font-medium text-neutral-700">
                Existing EPF Balance (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingBalance)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-balance"
              min="0" 
              max="5000000" 
              step="10000" 
              value={existingBalance} 
              onChange={(e) => setExistingBalance(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹50L</span>
            </div>
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
              max="12" 
              step="0.05" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>7%</span>
              <span>12%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="time-period" className="text-sm font-medium text-neutral-700">
                Time Period (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {timePeriod} years
              </span>
            </div>
            <input 
              type="range" 
              id="time-period"
              min="1" 
              max="35" 
              step="1" 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>1 Year</span>
              <span>35 Years</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Monthly Contributions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Employee Contribution</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(employeeContribution)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Employer Contribution</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(employerContribution)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            EPF Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Contribution', value: totalContribution, color: '#3b82f6' },
                { name: 'Interest Earned', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            EPF Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Contribution Rules</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Employee contributes 12% of basic salary</li>
                <li>Employer matches 12% contribution</li>
                <li>Interest rate is set by EPFO annually</li>
                <li>Tax-free investment under EEE category</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Withdrawal Rules</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Full withdrawal allowed after retirement (58 years)</li>
                <li>Partial withdrawal allowed for specific needs</li>
                <li>90% withdrawal allowed for home purchase</li>
                <li>Withdrawal allowed after 2 months of unemployment</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Guaranteed returns with government backing</li>
                <li>Tax benefits on contribution and returns</li>
                <li>Employer contribution boosts savings</li>
                <li>Retirement security with pension option</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};