import React, { useState, useEffect } from 'react';
import { formatCurrency, calculatePPF } from '../utils/calculatorUtils';
import { Sliders, Calculator, LineChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { BarChart } from '../components/BarChart';

export const PpfCalculator: React.FC = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [timePeriod, setTimePeriod] = useState<number>(15);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{year: number; investment: number; interest: number; balance: number}>>([]);
  
  // Manual input states
  const [manualYearlyInvestment, setManualYearlyInvestment] = useState<string>(yearlyInvestment.toString());
  const [manualInterestRate, setManualInterestRate] = useState<string>(interestRate.toString());
  const [manualTimePeriod, setManualTimePeriod] = useState<string>(timePeriod.toString());
  
  useEffect(() => {
    const result = calculatePPF(yearlyInvestment, interestRate, timePeriod);
    setTotalInvestment(result.totalInvestment);
    setTotalInterest(result.totalInterest);
    setMaturityValue(result.maturityValue);
    setYearlyBreakup(result.yearlyBreakup);
  }, [yearlyInvestment, interestRate, timePeriod]);
  
  // Update slider values when manual inputs change
  const handleManualYearlyInvestmentChange = (value: string) => {
    setManualYearlyInvestment(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 500 && numValue <= 150000) {
      setYearlyInvestment(numValue);
    }
  };
  
  const handleManualInterestRateChange = (value: string) => {
    setManualInterestRate(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 5 && numValue <= 10) {
      setInterestRate(numValue);
    }
  };
  
  const handleManualTimePeriodChange = (value: string) => {
    setManualTimePeriod(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 15 && numValue <= 50) {
      setTimePeriod(numValue);
    }
  };
  
  // Update manual input values when sliders change
  useEffect(() => {
    setManualYearlyInvestment(yearlyInvestment.toString());
    setManualInterestRate(interestRate.toString());
    setManualTimePeriod(timePeriod.toString());
  }, [yearlyInvestment, interestRate, timePeriod]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-primary-600" />
          PPF Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="yearly-investment" className="text-sm font-medium text-neutral-700">
                Yearly Investment (₹)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {formatCurrency(yearlyInvestment)}
                </span>
                <input 
                  type="number"
                  value={manualYearlyInvestment}
                  onChange={(e) => handleManualYearlyInvestmentChange(e.target.value)}
                  className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="500"
                  max="150000"
                  step="500"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="yearly-investment"
              min="500" 
              max="150000" 
              step="500" 
              value={yearlyInvestment} 
              onChange={(e) => setYearlyInvestment(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹500</span>
              <span>₹1,50,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                Interest Rate (% p.a.)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {interestRate.toFixed(2)}%
                </span>
                <input 
                  type="number"
                  value={manualInterestRate}
                  onChange={(e) => handleManualInterestRateChange(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="5"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="interest-rate"
              min="5" 
              max="10" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>5%</span>
              <span>10%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="time-period" className="text-sm font-medium text-neutral-700">
                Time Period (Years)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {timePeriod} years
                </span>
                <input 
                  type="number"
                  value={manualTimePeriod}
                  onChange={(e) => handleManualTimePeriodChange(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="15"
                  max="50"
                  step="5"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="time-period"
              min="15" 
              max="50" 
              step="5" 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>15 Years</span>
              <span>50 Years</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">PPF Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Interest Earned</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maturity Value</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(maturityValue)}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-accent-50 rounded-lg border border-accent-100">
          <div className="flex items-start">
            <Calculator className="h-5 w-5 text-accent-600 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-accent-800">
                Your yearly investment of <span className="font-semibold">{formatCurrency(yearlyInvestment)}</span> for <span className="font-semibold">{timePeriod} years</span> at <span className="font-semibold">{interestRate}% p.a.</span> will grow to <span className="font-semibold">{formatCurrency(maturityValue)}</span>, generating <span className="font-semibold">{formatCurrency(totalInterest)}</span> in interest.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            PPF Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Interest Earned', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityValue)}\nMaturity Value`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <LineChart className="w-5 h-5 mr-2 text-primary-600" />
            Balance Growth
          </h2>
          <div className="mt-4 h-64">
            <BarChart 
              data={yearlyBreakup.filter((_, index) => index % 5 === 0 || index === yearlyBreakup.length - 1)}
              xKey="year"
              yKey="balance"
              color="#3b82f6"
              xLabel="Year"
              yLabel="Balance (₹)"
              formatY={(value) => formatCurrency(value)}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            Yearly Breakup
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Investment (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Interest (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {yearlyBreakup.map((year, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2 text-sm text-neutral-900">{year.year}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.investment)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.interest)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};