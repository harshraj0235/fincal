import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, DollarSign, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const LoanAffordabilityCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(20000);
  const [existingEmi, setExistingEmi] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(0);
  const [maxEmi, setMaxEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  useEffect(() => {
    // Calculate maximum EMI capacity (50% of net disposable income)
    const disposableIncome = monthlyIncome - monthlyExpenses;
    const availableForEmi = Math.max(0, disposableIncome * 0.5 - existingEmi);
    setMaxEmi(availableForEmi);
    
    // Calculate maximum loan amount based on EMI capacity
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTenure * 12;
    
    const maxLoan = availableForEmi * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / 
                   (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)));
    
    setMaxLoanAmount(maxLoan);
    setTotalInterest((availableForEmi * totalMonths) - maxLoan);
  }, [monthlyIncome, monthlyExpenses, existingEmi, interestRate, loanTenure]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-[--primary-600]" />
          Income & Expenses
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-income" className="text-sm font-medium text-neutral-700">
                Monthly Income (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyIncome)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-income"
              min="20000" 
              max="1000000" 
              step="5000" 
              value={monthlyIncome} 
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-expenses" className="text-sm font-medium text-neutral-700">
                Monthly Expenses (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyExpenses)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-expenses"
              min="0" 
              max={monthlyIncome * 0.8} 
              step="1000" 
              value={monthlyExpenses} 
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-emi" className="text-sm font-medium text-neutral-700">
                Existing EMI Obligations (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingEmi)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-emi"
              min="0" 
              max={monthlyIncome * 0.5} 
              step="1000" 
              value={existingEmi} 
              onChange={(e) => setExistingEmi(Number(e.target.value))}
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
              min="6" 
              max="15" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                Loan Tenure (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {loanTenure} years
              </span>
            </div>
            <input 
              type="range" 
              id="loan-tenure"
              min="1" 
              max="30" 
              value={loanTenure} 
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Loan Eligibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maximum Loan Amount</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(maxLoanAmount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maximum EMI Capacity</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(maxEmi)}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">FOIR</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {(((existingEmi + maxEmi) / monthlyIncome) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Debt Service Ratio</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {((maxEmi / (monthlyIncome - monthlyExpenses)) * 100).toFixed(1)}%
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
            Monthly Income Distribution
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Expenses', value: monthlyExpenses, color: '#f59e0b' },
                { name: 'Existing EMI', value: existingEmi, color: '#ef4444' },
                { name: 'New EMI Capacity', value: maxEmi, color: '#22c55e' },
                { name: 'Savings', value: monthlyIncome - monthlyExpenses - existingEmi - maxEmi, color: '#3b82f6' }
              ]}
              centerText={`${formatCurrency(monthlyIncome)}\nMonthly Income`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Eligibility Criteria
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Factors</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Monthly income and stability</li>
                <li>Existing debt obligations</li>
                <li>Credit score and history</li>
                <li>Age and remaining service years</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Income Ratios</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Fixed Obligation to Income Ratio (FOIR) should be below 50-55%</li>
                <li>EMI to Net Income Ratio should be below 40-45%</li>
                <li>Debt Service Ratio should be comfortable</li>
                <li>Consider future income growth potential</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Tips to Improve Eligibility</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Maintain a good credit score</li>
                <li>Reduce existing debt obligations</li>
                <li>Include additional income sources</li>
                <li>Opt for a longer loan tenure</li>
                <li>Add a co-applicant to increase eligibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};