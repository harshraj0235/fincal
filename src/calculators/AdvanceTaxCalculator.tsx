import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Calendar } from 'lucide-react';

export const AdvanceTaxCalculator: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(1000000);
  const [otherIncome, setOtherIncome] = useState<number>(100000);
  const [tdsDeducted, setTdsDeducted] = useState<number>(50000);
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  
  const [totalTax, setTotalTax] = useState<number>(0);
  const [advanceTaxInstallments, setAdvanceTaxInstallments] = useState<Array<{
    dueDate: string;
    percentage: number;
    amount: number;
  }>>([]);
  
  useEffect(() => {
    // Calculate total tax (simplified calculation)
    const totalIncome = annualIncome + otherIncome;
    let calculatedTax = 0;
    
    if (taxRegime === 'new') {
      if (totalIncome > 1500000) {
        calculatedTax += (totalIncome - 1500000) * 0.3;
        calculatedTax += 300000 * 0.2;
        calculatedTax += 300000 * 0.15;
        calculatedTax += 300000 * 0.1;
        calculatedTax += 300000 * 0.05;
      } else if (totalIncome > 1200000) {
        calculatedTax += (totalIncome - 1200000) * 0.2;
        calculatedTax += 300000 * 0.15;
        calculatedTax += 300000 * 0.1;
        calculatedTax += 300000 * 0.05;
      } else if (totalIncome > 900000) {
        calculatedTax += (totalIncome - 900000) * 0.15;
        calculatedTax += 300000 * 0.1;
        calculatedTax += 300000 * 0.05;
      } else if (totalIncome > 600000) {
        calculatedTax += (totalIncome - 600000) * 0.1;
        calculatedTax += 300000 * 0.05;
      } else if (totalIncome > 300000) {
        calculatedTax += (totalIncome - 300000) * 0.05;
      }
    } else {
      // Old regime calculation
      if (totalIncome > 1000000) {
        calculatedTax += (totalIncome - 1000000) * 0.3;
        calculatedTax += 500000 * 0.2;
        calculatedTax += 250000 * 0.05;
      } else if (totalIncome > 500000) {
        calculatedTax += (totalIncome - 500000) * 0.2;
        calculatedTax += 250000 * 0.05;
      } else if (totalIncome > 250000) {
        calculatedTax += (totalIncome - 250000) * 0.05;
      }
    }
    
    // Add cess
    calculatedTax *= 1.04;
    
    // Subtract TDS
    calculatedTax = Math.max(0, calculatedTax - tdsDeducted);
    
    setTotalTax(calculatedTax);
    
    // Calculate advance tax installments
    const installments = [
      {
        dueDate: 'June 15',
        percentage: 15,
        amount: calculatedTax * 0.15
      },
      {
        dueDate: 'September 15',
        percentage: 45,
        amount: calculatedTax * 0.45
      },
      {
        dueDate: 'December 15',
        percentage: 75,
        amount: calculatedTax * 0.75
      },
      {
        dueDate: 'March 15',
        percentage: 100,
        amount: calculatedTax
      }
    ];
    
    setAdvanceTaxInstallments(installments);
  }, [annualIncome, otherIncome, tdsDeducted, taxRegime]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Income Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Tax Regime
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  taxRegime === 'new'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setTaxRegime('new')}
              >
                New Regime
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  taxRegime === 'old'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setTaxRegime('old')}
              >
                Old Regime
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="annual-income" className="text-sm font-medium text-neutral-700">
                Annual Income (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(annualIncome)}
              </span>
            </div>
            <input 
              type="range" 
              id="annual-income"
              min="250000" 
              max="5000000" 
              step="50000" 
              value={annualIncome} 
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="other-income" className="text-sm font-medium text-neutral-700">
                Other Income (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(otherIncome)}
              </span>
            </div>
            <input 
              type="range" 
              id="other-income"
              min="0" 
              max="1000000" 
              step="10000" 
              value={otherIncome} 
              onChange={(e) => setOtherIncome(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="tds-deducted" className="text-sm font-medium text-neutral-700">
                TDS Already Deducted (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(tdsDeducted)}
              </span>
            </div>
            <input 
              type="range" 
              id="tds-deducted"
              min="0" 
              max={totalTax} 
              step="1000" 
              value={tdsDeducted} 
              onChange={(e) => setTdsDeducted(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Tax Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Income</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(annualIncome + otherIncome)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Tax</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(totalTax)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">TDS Deducted</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(tdsDeducted)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[--primary-600]" />
            Advance Tax Schedule
          </h2>
          
          <div className="mt-4 space-y-4">
            {advanceTaxInstallments.map((installment, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">Due by {installment.dueDate}</p>
                    <p className="text-lg font-semibold text-neutral-900">{formatCurrency(installment.amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-500">Cumulative</p>
                    <p className="text-lg font-semibold text-[--primary-600]">{installment.percentage}%</p>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[--primary-600] rounded-full"
                    style={{ width: `${(installment.amount / totalTax) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Important Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Who Should Pay?</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Tax liability &gt; ₹10,000 in a financial year</li>
                <li>Income from business or profession</li>
                <li>Capital gains without TDS</li>
                <li>Income from house property</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Payment Schedule</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>15% by June 15</li>
                <li>45% by September 15</li>
                <li>75% by December 15</li>
                <li>100% by March 15</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Interest applicable on delayed payments</li>
                <li>Consider tax deducted at source (TDS)</li>
                <li>Revise estimates if income changes</li>
                <li>Keep payment challans for records</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};