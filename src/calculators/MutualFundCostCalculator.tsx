import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const MutualFundCostCalculator: React.FC = () => {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [expenseRatio, setExpenseRatio] = useState<number>(1.5);
  const [exitLoad, setExitLoad] = useState<number>(1);
  const [exitYear, setExitYear] = useState<number>(1);
  
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [grossReturns, setGrossReturns] = useState<number>(0);
  const [expenseCost, setExpenseCost] = useState<number>(0);
  const [exitLoadCost, setExitLoadCost] = useState<number>(0);
  const [netReturns, setNetReturns] = useState<number>(0);
  const [netValue, setNetValue] = useState<number>(0);
  const [returnImpact, setReturnImpact] = useState<number>(0);
  
  useEffect(() => {
    let calculatedTotalInvestment = 0;
    let calculatedGrossValue = 0;
    let calculatedNetValue = 0;
    let calculatedExpenseCost = 0;
    
    if (investmentType === 'sip') {
      // Calculate for SIP
      const monthlyRate = expectedReturn / 12 / 100;
      const months = investmentPeriod * 12;
      
      // Gross future value of SIP (without expenses)
      calculatedGrossValue = investmentAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      calculatedTotalInvestment = investmentAmount * months;
      
      // Net future value with expense ratio
      const netMonthlyRate = (expectedReturn - expenseRatio) / 12 / 100;
      calculatedNetValue = investmentAmount * ((Math.pow(1 + netMonthlyRate, months) - 1) / netMonthlyRate) * (1 + netMonthlyRate);
    } else {
      // Calculate for lumpsum
      calculatedTotalInvestment = investmentAmount;
      
      // Gross future value (without expenses)
      calculatedGrossValue = investmentAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
      
      // Net future value with expense ratio
      calculatedNetValue = investmentAmount * Math.pow(1 + (expectedReturn - expenseRatio) / 100, investmentPeriod);
    }
    
    calculatedExpenseCost = calculatedGrossValue - calculatedNetValue;
    
    // Calculate exit load if applicable
    let calculatedExitLoadCost = 0;
    if (exitYear <= investmentPeriod) {
      calculatedExitLoadCost = calculatedNetValue * (exitLoad / 100);
      calculatedNetValue -= calculatedExitLoadCost;
    }
    
    const calculatedGrossReturns = calculatedGrossValue - calculatedTotalInvestment;
    const calculatedNetReturns = calculatedNetValue - calculatedTotalInvestment;
    const calculatedReturnImpact = ((calculatedGrossReturns - calculatedNetReturns) / calculatedGrossReturns) * 100;
    
    setTotalInvestment(calculatedTotalInvestment);
    setGrossReturns(calculatedGrossReturns);
    setExpenseCost(calculatedExpenseCost);
    setExitLoadCost(calculatedExitLoadCost);
    setNetReturns(calculatedNetReturns);
    setNetValue(calculatedNetValue);
    setReturnImpact(calculatedReturnImpact);
  }, [investmentType, investmentAmount, investmentPeriod, expectedReturn, expenseRatio, exitLoad, exitYear]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Investment Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'sip'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setInvestmentType('sip')}
              >
                SIP
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'lumpsum'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setInvestmentType('lumpsum')}
              >
                Lumpsum
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-amount" className="text-sm font-medium text-neutral-700">
                {investmentType === 'sip' ? 'Monthly Investment (₹)' : 'Investment Amount (₹)'}
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(investmentAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="investment-amount"
              min={investmentType === 'sip' ? '500' : '1000'} 
              max={investmentType === 'sip' ? '100000' : '10000000'} 
              step={investmentType === 'sip' ? '500' : '10000'} 
              value={investmentAmount} 
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-period" className="text-sm font-medium text-neutral-700">
                Investment Period (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {investmentPeriod} years
              </span>
            </div>
            <input 
              type="range" 
              id="investment-period"
              min="1" 
              max="30" 
              step="1" 
              value={investmentPeriod} 
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
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
              min="5" 
              max="25" 
              step="0.5" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="expense-ratio" className="text-sm font-medium text-neutral-700">
                Expense Ratio (%)
              </label>
              <span className="text-sm text-neutral-500">
                {expenseRatio}%
              </span>
            </div>
            <input 
              type="range" 
              id="expense-ratio"
              min="0.1" 
              max="2.5" 
              step="0.1" 
              value={expenseRatio} 
              onChange={(e) => setExpenseRatio(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="exit-load" className="text-sm font-medium text-neutral-700">
                  Exit Load (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {exitLoad}%
                </span>
              </div>
              <input 
                type="range" 
                id="exit-load"
                min="0" 
                max="3" 
                step="0.1" 
                value={exitLoad} 
                onChange={(e) => setExitLoad(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="exit-year" className="text-sm font-medium text-neutral-700">
                  Exit Year
                </label>
                <span className="text-sm text-neutral-500">
                  Year {exitYear}
                </span>
              </div>
              <input 
                type="range" 
                id="exit-year"
                min="1" 
                max={investmentPeriod} 
                step="1" 
                value={exitYear} 
                onChange={(e) => setExitYear(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Cost Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Expense Cost</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(expenseCost)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Exit Load Cost</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(exitLoadCost)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Cost</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(expenseCost + exitLoadCost)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Return Impact</p>
              <p className="text-xl font-bold text-[--error-600]">{returnImpact.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Returns Comparison
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Net Returns', value: netReturns, color: '#22c55e' },
                { name: 'Cost Impact', value: expenseCost + exitLoadCost, color: '#ef4444' }
              ]}
              centerText={`${formatCurrency(netValue)}\nNet Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Cost Analysis
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Returns Comparison</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Gross Returns (Without Costs)</span>
                  <span className="font-medium">{formatCurrency(grossReturns)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Returns (After Costs)</span>
                  <span className="font-medium">{formatCurrency(netReturns)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Impact</span>
                  <span className="font-medium">{formatCurrency(grossReturns - netReturns)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Percentage Impact on Returns</span>
                  <span className="font-medium">{returnImpact.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Understanding Fund Costs</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Expense Ratio:</strong> Annual fee charged by mutual funds for managing your investments, expressed as a percentage of your investment</p>
                <p><strong>Exit Load:</strong> Fee charged when you redeem your investment before a specified period</p>
                <p><strong>Direct vs Regular:</strong> Direct plans have lower expense ratios (0.5-1% lower) as they don't include distributor commissions</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Cost Reduction Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Invest in direct plans to save on expense ratio</li>
                <li>Avoid frequent redemptions to minimize exit load</li>
                <li>Compare expense ratios before selecting funds</li>
                <li>Index funds typically have lower expense ratios</li>
                <li>Hold investments beyond exit load period</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};