import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const FdCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [timePeriod, setTimePeriod] = useState<number>(12);
  const [interestFrequency, setInterestFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('quarterly');
  const [seniorCitizen, setSeniorCitizen] = useState<boolean>(false);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  useEffect(() => {
    // Add senior citizen bonus rate
    const effectiveRate = seniorCitizen ? interestRate + 0.5 : interestRate;
    
    // Calculate frequency factor
    let frequencyFactor = 1;
    switch (interestFrequency) {
      case 'monthly':
        frequencyFactor = 12;
        break;
      case 'quarterly':
        frequencyFactor = 4;
        break;
      case 'yearly':
        frequencyFactor = 1;
        break;
    }
    
    // Calculate maturity amount using compound interest formula
    const timeInYears = timePeriod / 12;
    const ratePerPeriod = effectiveRate / (100 * frequencyFactor);
    const numberOfPeriods = timeInYears * frequencyFactor;
    
    const amount = principal * Math.pow(1 + ratePerPeriod, numberOfPeriods);
    setMaturityAmount(amount);
    setTotalInterest(amount - principal);
  }, [principal, interestRate, timePeriod, interestFrequency, seniorCitizen]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Fixed Deposit Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="principal" className="text-sm font-medium text-neutral-700">
                Principal Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(principal)}
              </span>
            </div>
            <input 
              type="range" 
              id="principal"
              min="1000" 
              max="10000000" 
              step="1000" 
              value={principal} 
              onChange={(e) => setPrincipal(Number(e.target.value))}
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
              min="1" 
              max="120" 
              step="1" 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Interest Payout Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  interestFrequency === 'monthly'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setInterestFrequency('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  interestFrequency === 'quarterly'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setInterestFrequency('quarterly')}
              >
                Quarterly
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  interestFrequency === 'yearly'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setInterestFrequency('yearly')}
              >
                Yearly
              </button>
            </div>
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
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">FD Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Principal Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(principal)}</p>
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
            FD Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Principal', value: principal, color: '#3b82f6' },
                { name: 'Interest', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nMaturity Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            FD Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Interest Rates</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Rates vary based on deposit tenure</li>
                <li>Senior citizens get additional 0.5%</li>
                <li>Interest rates are subject to change</li>
                <li>Tax deducted at source (TDS) applicable</li>
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
                <li>Guaranteed returns</li>
                <li>Flexible tenure options</li>
                <li>Multiple interest payout options</li>
                <li>Loan facility available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};