import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateSIPReturns } from '../utils/calculatorUtils';
import { Sliders, Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const SipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [investedAmount, setInvestedAmount] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{year: number; investment: number; value: number}>>([]);
  
  // Manual input states
  const [manualMonthlyInvestment, setManualMonthlyInvestment] = useState<string>(monthlyInvestment.toString());
  const [manualExpectedReturn, setManualExpectedReturn] = useState<string>(expectedReturn.toString());
  const [manualTimePeriod, setManualTimePeriod] = useState<string>(timePeriod.toString());
  
  useEffect(() => {
    const result = calculateSIPReturns(monthlyInvestment, expectedReturn, timePeriod);
    setInvestedAmount(result.investedAmount);
    setEstimatedReturns(result.estimatedReturns);
    setTotalValue(result.totalValue);
    setYearlyBreakup(result.yearlyBreakup);
  }, [monthlyInvestment, expectedReturn, timePeriod]);
  
  // Update slider values when manual inputs change
  const handleManualMonthlyInvestmentChange = (value: string) => {
    setManualMonthlyInvestment(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 500 && numValue <= 100000) {
      setMonthlyInvestment(numValue);
    }
  };
  
  const handleManualExpectedReturnChange = (value: string) => {
    setManualExpectedReturn(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 30) {
      setExpectedReturn(numValue);
    }
  };
  
  const handleManualTimePeriodChange = (value: string) => {
    setManualTimePeriod(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 30) {
      setTimePeriod(numValue);
    }
  };
  
  // Update manual input values when sliders change
  useEffect(() => {
    setManualMonthlyInvestment(monthlyInvestment.toString());
    setManualExpectedReturn(expectedReturn.toString());
    setManualTimePeriod(timePeriod.toString());
  }, [monthlyInvestment, expectedReturn, timePeriod]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-primary-600" />
          SIP Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-investment" className="text-sm font-medium text-neutral-700">
                Monthly Investment (₹)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {formatCurrency(monthlyInvestment)}
                </span>
                <input 
                  type="number"
                  value={manualMonthlyInvestment}
                  onChange={(e) => handleManualMonthlyInvestmentChange(e.target.value)}
                  className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="500"
                  max="100000"
                  step="500"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="monthly-investment"
              min="500" 
              max="100000" 
              step="500" 
              value={monthlyInvestment} 
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹500</span>
              <span>₹1,00,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                Expected Annual Return (%)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {expectedReturn.toFixed(2)}%
                </span>
                <input 
                  type="number"
                  value={manualExpectedReturn}
                  onChange={(e) => handleManualExpectedReturnChange(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="expected-return"
              min="1" 
              max="30" 
              step="0.1" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>1%</span>
              <span>30%</span>
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
                  min="1"
                  max="30"
                  step="1"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="time-period"
              min="1" 
              max="30" 
              step="1" 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Investment Summary</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-neutral-500 mb-1">Invested Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(investedAmount)}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-neutral-400" />
            <div className="text-center">
              <p className="text-sm text-neutral-500 mb-1">Est. Returns</p>
              <p className="text-xl font-bold text-accent-600">{formatCurrency(estimatedReturns)}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-neutral-400" />
            <div className="text-center">
              <p className="text-sm text-neutral-500 mb-1">Total Value</p>
              <p className="text-xl font-bold text-success-600">{formatCurrency(totalValue)}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-accent-50 rounded-lg border border-accent-100">
          <div className="flex items-start">
            <Calculator className="h-5 w-5 text-accent-600 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-accent-800">
                Your monthly investment of <span className="font-semibold">{formatCurrency(monthlyInvestment)}</span> for <span className="font-semibold">{timePeriod} years</span> can grow to <span className="font-semibold">{formatCurrency(totalValue)}</span> at <span className="font-semibold">{expectedReturn}% p.a.</span> expected rate of return.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
            Investment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Invested Amount', value: investedAmount, color: '#3b82f6' },
                { name: 'Est. Returns', value: estimatedReturns, color: '#f59e0b' }
              ]}
              centerText={`${formatCurrency(totalValue)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            Year-on-Year Growth
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Invested Amount (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Value (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {yearlyBreakup.map((year, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2 text-sm text-neutral-900">{year.year}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.investment)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.value)}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-800">
                        {((year.value / year.investment - 1) * 100).toFixed(2)}%
                      </span>
                    </td>
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