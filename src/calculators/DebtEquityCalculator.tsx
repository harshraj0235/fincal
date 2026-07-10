import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, Scale, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const DebtEquityCalculator: React.FC = () => {
  const [totalDebt, setTotalDebt] = useState<number>(1000000);
  const [shortTermDebt, setShortTermDebt] = useState<number>(400000);
  const [totalEquity, setTotalEquity] = useState<number>(2000000);
  const [retainedEarnings, setRetainedEarnings] = useState<number>(500000);
  const [debtEquityRatio, setDebtEquityRatio] = useState<number>(0);
  const [equityMultiplier, setEquityMultiplier] = useState<number>(0);
  const [financialLeverage, setFinancialLeverage] = useState<number>(0);
  
  useEffect(() => {
    // Calculate financial ratios
    const debtToEquity = totalDebt / totalEquity;
    const eqMultiplier = (totalDebt + totalEquity) / totalEquity;
    const leverage = totalDebt / (totalDebt + totalEquity);
    
    setDebtEquityRatio(debtToEquity);
    setEquityMultiplier(eqMultiplier);
    setFinancialLeverage(leverage);
  }, [totalDebt, totalEquity, shortTermDebt, retainedEarnings]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Scale className="w-5 h-5 mr-2 text-[--primary-600]" />
          Financial Structure
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="total-debt" className="text-sm font-medium text-neutral-700">
                Total Debt (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(totalDebt)}
              </span>
            </div>
            <input 
              type="range" 
              id="total-debt"
              min="0" 
              max="10000000" 
              step="100000" 
              value={totalDebt} 
              onChange={(e) => setTotalDebt(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="short-term-debt" className="text-sm font-medium text-neutral-700">
                Short-term Debt (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(shortTermDebt)}
              </span>
            </div>
            <input 
              type="range" 
              id="short-term-debt"
              min="0" 
              max={totalDebt} 
              step="100000" 
              value={shortTermDebt} 
              onChange={(e) => setShortTermDebt(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="total-equity" className="text-sm font-medium text-neutral-700">
                Total Equity (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(totalEquity)}
              </span>
            </div>
            <input 
              type="range" 
              id="total-equity"
              min="100000" 
              max="20000000" 
              step="100000" 
              value={totalEquity} 
              onChange={(e) => setTotalEquity(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="retained-earnings" className="text-sm font-medium text-neutral-700">
                Retained Earnings (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(retainedEarnings)}
              </span>
            </div>
            <input 
              type="range" 
              id="retained-earnings"
              min="0" 
              max={totalEquity} 
              step="100000" 
              value={retainedEarnings} 
              onChange={(e) => setRetainedEarnings(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Financial Ratios</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Debt-to-Equity Ratio</p>
              <p className="text-xl font-bold text-neutral-900">{debtEquityRatio.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Equity Multiplier</p>
              <p className="text-xl font-bold text-neutral-900">{equityMultiplier.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Financial Leverage</p>
              <p className="text-xl font-bold text-neutral-900">{(financialLeverage * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Capital Structure
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Long-term Debt', value: totalDebt - shortTermDebt, color: '#3b82f6' },
                { name: 'Short-term Debt', value: shortTermDebt, color: '#f59e0b' },
                { name: 'Retained Earnings', value: retainedEarnings, color: '#22c55e' },
                { name: 'Other Equity', value: totalEquity - retainedEarnings, color: '#a855f7' }
              ]}
              centerText={`${formatCurrency(totalDebt + totalEquity)}\nTotal Capital`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Financial Analysis
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Debt Structure</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Long-term Debt</span>
                  <span className="font-medium">{formatCurrency(totalDebt - shortTermDebt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Short-term Debt</span>
                  <span className="font-medium">{formatCurrency(shortTermDebt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt Mix (Short-term)</span>
                  <span className="font-medium">
                    {((shortTermDebt / totalDebt) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Equity Structure</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Retained Earnings</span>
                  <span className="font-medium">{formatCurrency(retainedEarnings)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Equity</span>
                  <span className="font-medium">{formatCurrency(totalEquity - retainedEarnings)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Retention Ratio</span>
                  <span className="font-medium">
                    {((retainedEarnings / totalEquity) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Risk Assessment</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                {debtEquityRatio > 2 ? (
                  <>
                    <li>High financial leverage indicates increased risk</li>
                    <li>Consider reducing debt exposure</li>
                    <li>Monitor interest coverage carefully</li>
                  </>
                ) : debtEquityRatio > 1 ? (
                  <>
                    <li>Moderate leverage with balanced risk</li>
                    <li>Maintain debt service coverage</li>
                    <li>Review cost of capital optimization</li>
                  </>
                ) : (
                  <>
                    <li>Conservative financial structure</li>
                    <li>Potential for additional leverage</li>
                    <li>Consider growth opportunities</li>
                  </>
                )}
                <li>
                  Short-term debt is {((shortTermDebt / totalDebt) * 100).toFixed(1)}% of total debt
                  {shortTermDebt / totalDebt > 0.5 ? ' (high refinancing risk)' : ' (manageable)'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};