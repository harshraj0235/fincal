import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [existingSavings, setExistingSavings] = useState<number>(1000000);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(20000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  
  const [requiredCorpus, setRequiredCorpus] = useState<number>(0);
  const [expectedCorpus, setExpectedCorpus] = useState<number>(0);
  const [monthlyGap, setMonthlyGap] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  
  useEffect(() => {
    // Calculate required retirement corpus
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const yearsToRetirement = retirementAge - currentAge;
    
    // Calculate future monthly expenses considering inflation
    const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    
    // Calculate required corpus assuming post-retirement return of 7%
    const postRetirementReturn = 7;
    const monthlyReturnRate = postRetirementReturn / 1200;
    const numberOfMonths = yearsInRetirement * 12;
    
    const required = futureMonthlyExpenses * 
      (1 - Math.pow(1 + monthlyReturnRate, -numberOfMonths)) / monthlyReturnRate;
    
    setRequiredCorpus(required);
    
    // Calculate expected corpus
    let corpus = existingSavings;
    const monthlyRate = expectedReturn / 1200;
    const investmentMonths = yearsToRetirement * 12;
    
    // Future value of existing savings
    corpus *= Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    
    // Future value of monthly investments
    const futureValueOfInvestments = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, investmentMonths) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    corpus += futureValueOfInvestments;
    
    setExpectedCorpus(corpus);
    setTotalInvestment(existingSavings + (monthlyInvestment * investmentMonths));
    setTotalReturns(corpus - (existingSavings + (monthlyInvestment * investmentMonths)));
    
    // Calculate monthly investment gap
    if (corpus < required) {
      const additionalCorpusNeeded = required - corpus;
      const gapMonthlyInvestment = (additionalCorpusNeeded * monthlyRate) / 
        (Math.pow(1 + monthlyRate, investmentMonths) - 1);
      setMonthlyGap(gapMonthlyInvestment);
    } else {
      setMonthlyGap(0);
    }
  }, [
    currentAge,
    retirementAge,
    monthlyExpenses,
    existingSavings,
    monthlyInvestment,
    expectedReturn,
    inflationRate,
    lifeExpectancy
  ]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Retirement Planning Details
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="current-age" className="text-sm font-medium text-neutral-700">
                  Current Age
                </label>
                <span className="text-sm text-neutral-500">
                  {currentAge} years
                </span>
              </div>
              <input 
                type="range" 
                id="current-age"
                min="20" 
                max="70" 
                value={currentAge} 
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="retirement-age" className="text-sm font-medium text-neutral-700">
                  Retirement Age
                </label>
                <span className="text-sm text-neutral-500">
                  {retirementAge} years
                </span>
              </div>
              <input 
                type="range" 
                id="retirement-age"
                min={currentAge + 1} 
                max="80" 
                value={retirementAge} 
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-expenses" className="text-sm font-medium text-neutral-700">
                Current Monthly Expenses (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyExpenses)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-expenses"
              min="10000" 
              max="500000" 
              step="5000" 
              value={monthlyExpenses} 
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-savings" className="text-sm font-medium text-neutral-700">
                Existing Retirement Savings (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingSavings)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-savings"
              min="0" 
              max="10000000" 
              step="100000" 
              value={existingSavings} 
              onChange={(e) => setExistingSavings(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-investment" className="text-sm font-medium text-neutral-700">
                Monthly Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyInvestment)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-investment"
              min="1000" 
              max="200000" 
              step="1000" 
              value={monthlyInvestment} 
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                  Expected Return (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {expectedReturn}%
                </span>
              </div>
              <input 
                type="range" 
                id="expected-return"
                min="6" 
                max="15" 
                step="0.5" 
                value={expectedReturn} 
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="inflation-rate" className="text-sm font-medium text-neutral-700">
                  Inflation Rate (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {inflationRate}%
                </span>
              </div>
              <input 
                type="range" 
                id="inflation-rate"
                min="4" 
                max="10" 
                step="0.5" 
                value={inflationRate} 
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="life-expectancy" className="text-sm font-medium text-neutral-700">
                Life Expectancy
              </label>
              <span className="text-sm text-neutral-500">
                {lifeExpectancy} years
              </span>
            </div>
            <input 
              type="range" 
              id="life-expectancy"
              min={retirementAge + 1} 
              max="100" 
              value={lifeExpectancy} 
              onChange={(e) => setLifeExpectancy(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Retirement Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Required Corpus</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(requiredCorpus)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Expected Corpus</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(expectedCorpus)}</p>
            </div>
          </div>
          
          {monthlyGap > 0 && (
            <div className="mt-4 p-4 bg-[--error-50] rounded-lg border border-[--error-100]">
              <p className="text-sm text-[--error-600] mb-1">Additional Monthly Investment Needed</p>
              <p className="text-xl font-bold text-[--error-700]">{formatCurrency(monthlyGap)}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Corpus Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Expected Returns', value: totalReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(expectedCorpus)}\nExpected Corpus`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Planning Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Factors</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Start early to benefit from compound growth</li>
                <li>Consider inflation impact on expenses</li>
                <li>Account for medical expenses in later years</li>
                <li>Review and rebalance investments periodically</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Investment Options</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>National Pension System (NPS)</li>
                <li>Public Provident Fund (PPF)</li>
                <li>Mutual Funds</li>
                <li>Fixed Deposits</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Diversify retirement investments</li>
                <li>Consider tax implications</li>
                <li>Build emergency fund separately</li>
                <li>Account for major life events</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};