import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator } from 'lucide-react';

export const Section80CCalculator: React.FC = () => {
  const [ppf, setPpf] = useState<number>(0);
  const [elss, setElss] = useState<number>(0);
  const [epf, setEpf] = useState<number>(0);
  const [lifeInsurance, setLifeInsurance] = useState<number>(0);
  const [homeLoanPrincipal, setHomeLoanPrincipal] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [deduction, setDeduction] = useState<number>(0);
  
  useEffect(() => {
    const total = ppf + elss + epf + lifeInsurance + homeLoanPrincipal;
    setTotalInvestment(total);
    setDeduction(Math.min(total, 150000));
  }, [ppf, elss, epf, lifeInsurance, homeLoanPrincipal]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="ppf" className="text-sm font-medium text-neutral-700">
                PPF Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(ppf)}
              </span>
            </div>
            <input 
              type="range" 
              id="ppf"
              min="0" 
              max="150000" 
              step="1000" 
              value={ppf} 
              onChange={(e) => setPpf(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="elss" className="text-sm font-medium text-neutral-700">
                ELSS Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(elss)}
              </span>
            </div>
            <input 
              type="range" 
              id="elss"
              min="0" 
              max="150000" 
              step="1000" 
              value={elss} 
              onChange={(e) => setElss(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="epf" className="text-sm font-medium text-neutral-700">
                EPF Contribution (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(epf)}
              </span>
            </div>
            <input 
              type="range" 
              id="epf"
              min="0" 
              max="150000" 
              step="1000" 
              value={epf} 
              onChange={(e) => setEpf(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="life-insurance" className="text-sm font-medium text-neutral-700">
                Life Insurance Premium (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(lifeInsurance)}
              </span>
            </div>
            <input 
              type="range" 
              id="life-insurance"
              min="0" 
              max="150000" 
              step="1000" 
              value={lifeInsurance} 
              onChange={(e) => setLifeInsurance(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="home-loan" className="text-sm font-medium text-neutral-700">
                Home Loan Principal Repayment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(homeLoanPrincipal)}
              </span>
            </div>
            <input 
              type="range" 
              id="home-loan"
              min="0" 
              max="150000" 
              step="1000" 
              value={homeLoanPrincipal} 
              onChange={(e) => setHomeLoanPrincipal(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Deduction Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Eligible Deduction</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(deduction)}</p>
            </div>
          </div>
          {totalInvestment > 150000 && (
            <p className="mt-4 text-sm text-[--error-600]">
              Note: Maximum deduction under Section 80C is limited to ₹1,50,000
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Section 80C Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Eligible Investments</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Public Provident Fund (PPF)</li>
                <li>Equity Linked Savings Scheme (ELSS)</li>
                <li>Employee Provident Fund (EPF)</li>
                <li>Life Insurance Premium</li>
                <li>Home Loan Principal Repayment</li>
                <li>National Savings Certificate (NSC)</li>
                <li>5-year Tax Saving Fixed Deposit</li>
                <li>Sukanya Samriddhi Account</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Points</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Maximum deduction limit of ₹1,50,000 per financial year</li>
                <li>Available under old tax regime only</li>
                <li>Investments must be made during the financial year</li>
                <li>Some investments have lock-in periods</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Tax Saving Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Diversify investments across different options</li>
                <li>Consider lock-in periods before investing</li>
                <li>Plan investments at the start of the financial year</li>
                <li>Keep proper documentation of all investments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};