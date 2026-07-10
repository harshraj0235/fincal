import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, IndianRupee, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import SEOHelmet from '../components/SEOHelmet';

export const InflationAdjustedSipCalculator: React.FC = () => {
  const [currentMonthlyExpense, setCurrentMonthlyExpense] = useState<number>(50000);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [existingCorpus, setExistingCorpus] = useState<number>(500000);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  
  const [requiredCorpus, setRequiredCorpus] = useState<number>(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(0);
  const [inflationAdjustedExpense, setInflationAdjustedExpense] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{year: number; age: number; corpus: number; expense: number}>>([]);
  
  useEffect(() => {
    // Calculate inflation-adjusted retirement corpus
    const yearsToRetirement = retirementAge - currentAge;
    const retirementDuration = lifeExpectancy - retirementAge;
    
    // Calculate inflation-adjusted monthly expense at retirement
    const inflationAdjustedMonthlyExpense = currentMonthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    setInflationAdjustedExpense(inflationAdjustedMonthlyExpense);
    
    // Calculate required corpus at retirement
    // Using the formula for present value of an annuity
    const monthlyReturnRate = (expectedReturn - inflationRate) / 100 / 12; // Real return rate adjusted for inflation
    const totalMonths = retirementDuration * 12;
    
    let corpus = 0;
    if (monthlyReturnRate > 0) {
      corpus = inflationAdjustedMonthlyExpense * (1 - Math.pow(1 + monthlyReturnRate, -totalMonths)) / monthlyReturnRate;
    } else {
      corpus = inflationAdjustedMonthlyExpense * totalMonths;
    }
    
    setRequiredCorpus(corpus);
    
    // Calculate required monthly investment to reach the corpus
    const futureValueOfExistingCorpus = existingCorpus * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    const additionalCorpusNeeded = Math.max(0, corpus - futureValueOfExistingCorpus);
    
    const monthlyRate = expectedReturn / 12 / 100;
    const investmentMonths = yearsToRetirement * 12;
    
    let monthlyInvestmentAmount = 0;
    if (investmentMonths > 0) {
      monthlyInvestmentAmount = additionalCorpusNeeded * monthlyRate / (Math.pow(1 + monthlyRate, investmentMonths) - 1);
    }
    
    setMonthlyInvestment(monthlyInvestmentAmount);
    
    // Generate yearly breakup
    const breakup: Array<{year: number; age: number; corpus: number; expense: number}> = [];
    let currentCorpus = existingCorpus;
    let currentExpense = currentMonthlyExpense;
    
    for (let year = 1; year <= Math.max(yearsToRetirement, retirementDuration); year++) {
      const age = currentAge + year;
      
      // Before retirement: accumulation phase
      if (age <= retirementAge) {
        // Add yearly investment
        const yearlyInvestment = monthlyInvestmentAmount * 12;
        // Calculate returns
        const yearlyReturn = (currentCorpus + yearlyInvestment / 2) * (expectedReturn / 100);
        // Update corpus
        currentCorpus = currentCorpus + yearlyInvestment + yearlyReturn;
      } 
      // After retirement: withdrawal phase
      else {
        // Calculate yearly expense with inflation
        const yearlyExpense = currentExpense * 12;
        // Calculate returns
        const yearlyReturn = (currentCorpus - yearlyExpense / 2) * (expectedReturn / 100);
        // Update corpus
        currentCorpus = currentCorpus - yearlyExpense + yearlyReturn;
      }
      
      // Update expense with inflation
      currentExpense = currentExpense * (1 + inflationRate / 100);
      
      breakup.push({
        year,
        age,
        corpus: currentCorpus,
        expense: currentExpense
      });
    }
    
    setYearlyBreakup(breakup);
  }, [
    currentMonthlyExpense,
    retirementAge,
    currentAge,
    inflationRate,
    expectedReturn,
    existingCorpus,
    lifeExpectancy
  ]);
  
  return (
    <>
      <SEOHelmet
        title="Inflation Adjusted SIP Calculator India 2026 - Retirement Planner | MoneyCal"
        description="Plan retirement using an inflation-adjusted SIP calculator. Estimate required corpus, real returns, and monthly SIP needed for long-term goals in India."
        keywords="inflation adjusted sip calculator india, retirement sip planner with inflation, real return sip calculator, monthly sip required for retirement, inflation retirement calculator"
        url="/calculators/inflation-adjusted-sip-calculator"
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Retirement Planning Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="current-expense" className="text-sm font-medium text-neutral-700">
                Current Monthly Expenses (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(currentMonthlyExpense)}
              </span>
            </div>
            <input 
              type="range" 
              id="current-expense"
              min="10000" 
              max="500000" 
              step="5000" 
              value={currentMonthlyExpense} 
              onChange={(e) => setCurrentMonthlyExpense(Number(e.target.value))}
              className="slider"
            />
          </div>
          
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
                max="59" 
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
                max="70" 
                value={retirementAge} 
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-corpus" className="text-sm font-medium text-neutral-700">
                Existing Retirement Corpus (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingCorpus)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-corpus"
              min="0" 
              max="10000000" 
              step="100000" 
              value={existingCorpus} 
              onChange={(e) => setExistingCorpus(Number(e.target.value))}
              className="slider"
            />
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
          
          <div className="grid grid-cols-2 gap-4">
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
                min="2" 
                max="10" 
                step="0.5" 
                value={inflationRate} 
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="slider"
              />
            </div>
            
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
              <p className="text-sm text-neutral-500 mb-1">Monthly Investment Needed</p>
              <p className="text-xl font-bold text-[--primary-600]">{formatCurrency(monthlyInvestment)}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Monthly Expense at Retirement</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency(inflationAdjustedExpense)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Retirement Duration</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {lifeExpectancy - retirementAge} years
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
            Retirement Corpus Projection
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Required Investment', value: monthlyInvestment * 12 * (retirementAge - currentAge), color: '#3b82f6' },
                { name: 'Expected Growth', value: requiredCorpus - (monthlyInvestment * 12 * (retirementAge - currentAge)) - existingCorpus, color: '#22c55e' },
                { name: 'Existing Corpus', value: existingCorpus, color: '#f59e0b' }
              ]}
              centerText={`${formatCurrency(requiredCorpus)}\nRequired Corpus`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Corpus Projection by Age
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Age</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Corpus (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Monthly Expense (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {yearlyBreakup.filter((_, index) => index % 5 === 0 || index === yearlyBreakup.length - 1).map((year, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2 text-sm text-neutral-900">{year.year}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{year.age}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.corpus)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.expense)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Inflation-Adjusted Planning
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Why Inflation Matters</h3>
              <p className="text-sm text-neutral-600">
                Inflation erodes purchasing power over time. ₹1 lakh today will not buy the same basket of goods after 20 years. This calculator accounts for inflation so your retirement corpus estimate stays realistic.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Investment Strategy</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Start early to benefit from the power of compounding</li>
                <li>Diversify investments across equity, debt, and other asset classes</li>
                <li>Regularly review and rebalance your portfolio</li>
                <li>Consider increasing your SIP amount as your income grows</li>
                <li>Consult a financial advisor for personalized retirement planning</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Key Insights</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Your expenses at retirement will be approximately {(Math.pow(1 + inflationRate / 100, retirementAge - currentAge) * 100).toFixed(0)}% of your current expenses due to inflation</li>
                <li>The real rate of return (after adjusting for inflation) is approximately {(expectedReturn - inflationRate).toFixed(1)}%</li>
                <li>Increasing your monthly investment by just 10% can significantly reduce your retirement age</li>
                <li>A 1% increase in your investment returns can reduce your required monthly investment by approximately 10-15%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="mt-10 space-y-6">
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">Inflation-adjusted SIP retirement planning: practical guide</h2>
        <p className="text-neutral-700 mb-3">
          A regular SIP projection can look attractive, but retirement planning requires inflation-adjusted numbers. If your monthly expense today is ₹50,000,
          it can become multiple times higher by retirement depending on inflation. This planner estimates required corpus and monthly SIP using both expected
          market return and inflation assumptions, so you see the true savings target instead of a nominal figure.
        </p>
        <p className="text-neutral-700 mb-3">
          Long-tail users often search for <strong>retirement SIP calculator with inflation in India</strong> and
          <strong> monthly SIP needed for retirement corpus</strong>. The best way to use this page is to run three scenarios: conservative (higher inflation,
          lower returns), realistic, and optimistic. Then choose a SIP value that survives the conservative case. This protects your plan from future volatility.
        </p>
        <p className="text-neutral-700">
          To improve plan quality, connect this output with the{' '}
          <Link to="/calculators/sip-calculator" className="underline">SIP Calculator</Link>,{' '}
          <Link to="/calculators/retirement-calculator" className="underline">Retirement Calculator</Link>, and{' '}
          <Link to="/calculators/pension-calculator" className="underline">Pension Calculator</Link>. You can also benchmark inflation assumptions from official
          releases on{' '}
          <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="underline">RBI</a> and macro data portals.
        </p>
      </div>
    </section>
    </>
  );
};

export default InflationAdjustedSipCalculator;