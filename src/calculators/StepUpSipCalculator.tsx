import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const StepUpSipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [annualIncrease, setAnnualIncrease] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{year: number; investment: number; value: number; stepUpAmount: number}>>([]);
  
  useEffect(() => {
    // Calculate Step-Up SIP returns
    let totalInvestmentAmount = 0;
    let currentMonthlyInvestment = monthlyInvestment;
    let totalValue = 0;
    const yearlyData: Array<{year: number; investment: number; value: number; stepUpAmount: number}> = [];
    
    for (let year = 1; year <= timePeriod; year++) {
      let yearlyInvestment = 0;
      let yearStartValue = totalValue;
      
      // Calculate for each month in the year
      for (let month = 1; month <= 12; month++) {
        // Add monthly investment
        yearlyInvestment += currentMonthlyInvestment;
        totalInvestmentAmount += currentMonthlyInvestment;
        
        // Calculate returns for this month
        const monthlyRate = expectedReturn / 12 / 100;
        totalValue = (totalValue + currentMonthlyInvestment) * (1 + monthlyRate);
      }
      
      // Increase monthly investment for next year
      const stepUpAmount = currentMonthlyInvestment * (annualIncrease / 100);
      currentMonthlyInvestment += stepUpAmount;
      
      // Store yearly data
      yearlyData.push({
        year,
        investment: yearlyInvestment,
        value: totalValue,
        stepUpAmount
      });
    }
    
    setTotalInvestment(totalInvestmentAmount);
    setMaturityAmount(totalValue);
    setEstimatedReturns(totalValue - totalInvestmentAmount);
    setYearlyBreakup(yearlyData);
  }, [monthlyInvestment, annualIncrease, expectedReturn, timePeriod]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Step-Up SIP Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-investment" className="text-sm font-medium text-neutral-700">
                Initial Monthly Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyInvestment)}
              </span>
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
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="annual-increase" className="text-sm font-medium text-neutral-700">
                Annual Step-Up (%)
              </label>
              <span className="text-sm text-neutral-500">
                {annualIncrease}%
              </span>
            </div>
            <input 
              type="range" 
              id="annual-increase"
              min="0" 
              max="25" 
              step="1" 
              value={annualIncrease} 
              onChange={(e) => setAnnualIncrease(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                Expected Annual Return (%)
              </label>
              <span className="text-sm text-neutral-500">
                {expectedReturn}%
              </span>
            </div>
            <input 
              type="range" 
              id="expected-return"
              min="1" 
              max="30" 
              step="0.5" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="time-period" className="text-sm font-medium text-neutral-700">
                Investment Period (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {timePeriod} years
              </span>
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
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Estimated Returns</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(estimatedReturns)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maturity Amount</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(maturityAmount)}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Final Monthly Investment</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency(monthlyInvestment * Math.pow(1 + annualIncrease/100, timePeriod))}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Growth</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {((maturityAmount / totalInvestment) * 100 - 100).toFixed(2)}%
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
            Investment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Estimated Returns', value: estimatedReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
            Year-on-Year Growth
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Monthly SIP (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Invested Amount (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Value (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {yearlyBreakup.map((year, index) => {
                  const monthlyInvestmentForYear = monthlyInvestment * Math.pow(1 + annualIncrease/100, year.year - 1);
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-4 py-2 text-sm text-neutral-900">{year.year}</td>
                      <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(monthlyInvestmentForYear)}</td>
                      <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.investment)}</td>
                      <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.value)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            About Step-Up SIP
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">What is Step-Up SIP?</h3>
              <p className="text-sm text-neutral-600">
                A Step-Up SIP (Systematic Investment Plan) allows you to increase your investment amount periodically, typically annually. This approach aligns with your growing income, helping you invest more as your earnings increase over time.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Benefits of Step-Up SIP</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Aligns with your increasing income and career growth</li>
                <li>Helps achieve financial goals faster</li>
                <li>Combats the effects of inflation on your investments</li>
                <li>Maximizes the power of compounding</li>
                <li>Builds financial discipline with gradual increases</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Ideal For</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Salaried professionals expecting regular increments</li>
                <li>Young investors with growing career trajectories</li>
                <li>Long-term financial goals like retirement planning</li>
                <li>Investors looking to counter inflation effects</li>
                <li>Those who want to maximize wealth creation over time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepUpSipCalculator;