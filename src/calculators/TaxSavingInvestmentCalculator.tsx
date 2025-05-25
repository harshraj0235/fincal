import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const TaxSavingInvestmentCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(1000000);
  const [section80C, setSection80C] = useState<number>(150000);
  const [section80D, setSection80D] = useState<number>(25000);
  const [section80G, setSection80G] = useState<number>(10000);
  const [nps, setNps] = useState<number>(50000);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [taxSaving, setTaxSaving] = useState<number>(0);
  
  useEffect(() => {
    const total = section80C + section80D + section80G + nps;
    setTotalInvestment(total);
    
    // Calculate tax saving (simplified calculation)
    let saving = 0;
    if (income > 1000000) {
      saving = total * 0.3; // 30% tax bracket
    } else if (income > 500000) {
      saving = total * 0.2; // 20% tax bracket
    } else if (income > 250000) {
      saving = total * 0.05; // 5% tax bracket
    }
    
    setTaxSaving(saving);
  }, [income, section80C, section80D, section80G, nps]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Tax Saving Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="income" className="text-sm font-medium text-neutral-700">
                Annual Income (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(income)}
              </span>
            </div>
            <input 
              type="range" 
              id="income"
              min="250000" 
              max="5000000" 
              step="50000" 
              value={income} 
              onChange={(e) => setIncome(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="section-80c" className="text-sm font-medium text-neutral-700">
                Section 80C Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(section80C)}
              </span>
            </div>
            <input 
              type="range" 
              id="section-80c"
              min="0" 
              max="150000" 
              step="5000" 
              value={section80C} 
              onChange={(e) => setSection80C(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="section-80d" className="text-sm font-medium text-neutral-700">
                Section 80D Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(section80D)}
              </span>
            </div>
            <input 
              type="range" 
              id="section-80d"
              min="0" 
              max="100000" 
              step="5000" 
              value={section80D} 
              onChange={(e) => setSection80D(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="section-80g" className="text-sm font-medium text-neutral-700">
                Section 80G Donations (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(section80G)}
              </span>
            </div>
            <input 
              type="range" 
              id="section-80g"
              min="0" 
              max="100000" 
              step="1000" 
              value={section80G} 
              onChange={(e) => setSection80G(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="nps" className="text-sm font-medium text-neutral-700">
                NPS Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(nps)}
              </span>
            </div>
            <input 
              type="range" 
              id="nps"
              min="0" 
              max="50000" 
              step="1000" 
              value={nps} 
              onChange={(e) => setNps(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Tax Saving</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(taxSaving)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Investment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Section 80C', value: section80C, color: '#3b82f6' },
                { name: 'Section 80D', value: section80D, color: '#22c55e' },
                { name: 'Section 80G', value: section80G, color: '#f59e0b' },
                { name: 'NPS', value: nps, color: '#8b5cf6' }
              ]}
              centerText={`${formatCurrency(totalInvestment)}\nTotal Investment`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Tax Saving Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Section 80C (₹1.5L)</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>PPF, ELSS, Life Insurance Premium</li>
                <li>EPF, NPS, Tax Saving FD</li>
                <li>Home Loan Principal Repayment</li>
                <li>Sukanya Samriddhi Account</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Section 80D</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Health Insurance Premium</li>
                <li>Preventive Health Check-up</li>
                <li>Additional for Senior Citizens</li>
                <li>COVID-19 Treatment Expenses</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Investments must be made within the financial year</li>
                <li>Keep proper documentation of all investments</li>
                <li>Consider lock-in periods before investing</li>
                <li>Plan investments at the start of the year</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};