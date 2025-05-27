import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

type SchemeType = 'td' | 'rd' | 'mis' | 'scss' | 'kvp';

interface SchemeDetails {
  name: string;
  interestRate: number;
  minTenure: number;
  maxTenure: number;
  minAmount: number;
  maxAmount: number;
  description: string;
}

const schemeDetails: Record<SchemeType, SchemeDetails> = {
  td: {
    name: 'Time Deposit',
    interestRate: 7.1,
    minTenure: 1,
    maxTenure: 5,
    minAmount: 1000,
    maxAmount: 10000000,
    description: 'Fixed deposit scheme with tenure options from 1 to 5 years'
  },
  rd: {
    name: 'Recurring Deposit',
    interestRate: 6.7,
    minTenure: 5,
    maxTenure: 5,
    minAmount: 100,
    maxAmount: 1000000,
    description: 'Monthly deposit scheme with 5-year tenure'
  },
  mis: {
    name: 'Monthly Income Scheme',
    interestRate: 7.4,
    minTenure: 5,
    maxTenure: 5,
    minAmount: 1000,
    maxAmount: 900000,
    description: 'Investment scheme providing monthly income'
  },
  scss: {
    name: 'Senior Citizen Savings Scheme',
    interestRate: 8.2,
    minTenure: 5,
    maxTenure: 5,
    minAmount: 1000,
    maxAmount: 1500000,
    description: 'High-return savings scheme for senior citizens'
  },
  kvp: {
    name: 'Kisan Vikas Patra',
    interestRate: 7.5,
    minTenure: 10,
    maxTenure: 10,
    minAmount: 1000,
    maxAmount: 10000000,
    description: 'Investment doubles in about 10 years'
  }
};

export const PostOfficeCalculator: React.FC = () => {
  const [schemeType, setSchemeType] = useState<SchemeType>('kvp');
  const [amount, setAmount] = useState<number>(100000);
  const [tenure, setTenure] = useState<number>(10);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  
  useEffect(() => {
    const scheme = schemeDetails[schemeType];
    const rate = scheme.interestRate / 100;
    
    let calculatedMaturity = 0;
    let calculatedInterest = 0;
    let calculatedMonthlyIncome = 0;
    
    switch (schemeType) {
      case 'td':
        calculatedMaturity = amount * Math.pow(1 + rate, tenure);
        calculatedInterest = calculatedMaturity - amount;
        break;
        
      case 'rd':
        const monthlyRate = rate / 12;
        calculatedMaturity = amount * ((Math.pow(1 + monthlyRate, tenure * 12) - 1) / monthlyRate);
        calculatedInterest = calculatedMaturity - (amount * tenure * 12);
        break;
        
      case 'mis':
        calculatedMonthlyIncome = amount * (rate / 12);
        calculatedInterest = calculatedMonthlyIncome * tenure * 12;
        calculatedMaturity = amount + calculatedInterest;
        break;
        
      case 'scss':
        calculatedMonthlyIncome = amount * (rate / 12);
        calculatedInterest = calculatedMonthlyIncome * tenure * 12;
        calculatedMaturity = amount + calculatedInterest;
        break;
        
      case 'kvp':
        // KVP doubles the money in approximately 10 years at 7.5%
        calculatedMaturity = amount * Math.pow(2, tenure / 10);
        calculatedInterest = calculatedMaturity - amount;
        break;
    }
    
    setMaturityAmount(calculatedMaturity);
    setTotalInterest(calculatedInterest);
    setMonthlyIncome(calculatedMonthlyIncome);
  }, [schemeType, amount, tenure]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Post Office Scheme Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Select Scheme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(schemeDetails).map(([key, scheme]) => (
                <button
                  key={key}
                  onClick={() => setSchemeType(key as SchemeType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    schemeType === key
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {scheme.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="amount" className="text-sm font-medium text-neutral-700">
                Investment Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(amount)}
              </span>
            </div>
            <input 
              type="range" 
              id="amount"
              min={schemeDetails[schemeType].minAmount} 
              max={schemeDetails[schemeType].maxAmount} 
              step={1000} 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          {schemeDetails[schemeType].minTenure !== schemeDetails[schemeType].maxTenure && (
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="tenure" className="text-sm font-medium text-neutral-700">
                  Tenure (Years)
                </label>
                <span className="text-sm text-neutral-500">
                  {tenure} years
                </span>
              </div>
              <input 
                type="range" 
                id="tenure"
                min={schemeDetails[schemeType].minTenure} 
                max={schemeDetails[schemeType].maxTenure} 
                step={1} 
                value={tenure} 
                onChange={(e) => setTenure(Number(e.target.value))}
                className="slider"
              />
            </div>
          )}
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Scheme Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Investment Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(amount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maturity Amount</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(maturityAmount)}</p>
            </div>
          </div>
          {monthlyIncome > 0 && (
            <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Monthly Income</p>
              <p className="text-xl font-bold text-[--accent-800]">{formatCurrency(monthlyIncome)}</p>
            </div>
          )}
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
                { name: 'Principal', value: amount, color: '#3b82f6' },
                { name: 'Interest', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Scheme Details
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                {schemeDetails[schemeType].name}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                {schemeDetails[schemeType].description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Interest Rate</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {schemeDetails[schemeType].interestRate}% p.a.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Tenure</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {schemeDetails[schemeType].minTenure === schemeDetails[schemeType].maxTenure
                      ? `${schemeDetails[schemeType].minTenure} years`
                      : `${schemeDetails[schemeType].minTenure}-${schemeDetails[schemeType].maxTenure} years`
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Investment Limits</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Minimum</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {formatCurrency(schemeDetails[schemeType].minAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Maximum</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {formatCurrency(schemeDetails[schemeType].maxAmount)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Government backed security</li>
                <li>Tax benefits under Section 80C (for specific schemes)</li>
                <li>Flexible investment options</li>
                <li>Wide accessibility through post offices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};