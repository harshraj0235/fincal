import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const BreakEvenCalculator: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<number>(100000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(60);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<number>(100);
  const [monthlyUnits, setMonthlyUnits] = useState<number>(2000);
  const [breakEvenUnits, setBreakEvenUnits] = useState<number>(0);
  const [breakEvenRevenue, setBreakEvenRevenue] = useState<number>(0);
  const [monthlyProfit, setMonthlyProfit] = useState<number>(0);
  const [marginOfSafety, setMarginOfSafety] = useState<number>(0);
  
  useEffect(() => {
    // Calculate break-even point
    const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
    const breakEvenPoint = fixedCosts / contributionMargin;
    
    setBreakEvenUnits(breakEvenPoint);
    setBreakEvenRevenue(breakEvenPoint * sellingPricePerUnit);
    
    // Calculate monthly profit/loss
    const totalRevenue = monthlyUnits * sellingPricePerUnit;
    const totalVariableCosts = monthlyUnits * variableCostPerUnit;
    const profit = totalRevenue - totalVariableCosts - fixedCosts;
    setMonthlyProfit(profit);
    
    // Calculate margin of safety
    const mos = ((monthlyUnits - breakEvenPoint) / monthlyUnits) * 100;
    setMarginOfSafety(mos);
  }, [fixedCosts, variableCostPerUnit, sellingPricePerUnit, monthlyUnits]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Cost & Price Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="fixed-costs" className="text-sm font-medium text-neutral-700">
                Monthly Fixed Costs (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(fixedCosts)}
              </span>
            </div>
            <input 
              type="range" 
              id="fixed-costs"
              min="10000" 
              max="1000000" 
              step="10000" 
              value={fixedCosts} 
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="variable-cost" className="text-sm font-medium text-neutral-700">
                Variable Cost per Unit (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(variableCostPerUnit)}
              </span>
            </div>
            <input 
              type="range" 
              id="variable-cost"
              min="1" 
              max={sellingPricePerUnit * 0.9} 
              step="1" 
              value={variableCostPerUnit} 
              onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="selling-price" className="text-sm font-medium text-neutral-700">
                Selling Price per Unit (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(sellingPricePerUnit)}
              </span>
            </div>
            <input 
              type="range" 
              id="selling-price"
              min={variableCostPerUnit * 1.1} 
              max="1000" 
              step="1" 
              value={sellingPricePerUnit} 
              onChange={(e) => setSellingPricePerUnit(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-units" className="text-sm font-medium text-neutral-700">
                Expected Monthly Units
              </label>
              <span className="text-sm text-neutral-500">
                {monthlyUnits.toLocaleString()} units
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-units"
              min="100" 
              max="10000" 
              step="100" 
              value={monthlyUnits} 
              onChange={(e) => setMonthlyUnits(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Break-even Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Break-even Units</p>
              <p className="text-xl font-bold text-neutral-900">
                {Math.ceil(breakEvenUnits).toLocaleString()} units
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Break-even Revenue</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(breakEvenRevenue)}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly Profit/Loss</p>
              <p className={`text-xl font-bold ${monthlyProfit >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {formatCurrency(monthlyProfit)}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Margin of Safety</p>
              <p className={`text-xl font-bold ${marginOfSafety >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {marginOfSafety.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Cost Structure
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Fixed Costs', value: fixedCosts, color: '#3b82f6' },
                { name: 'Variable Costs', value: monthlyUnits * variableCostPerUnit, color: '#f59e0b' },
                { 
                  name: monthlyProfit >= 0 ? 'Profit' : 'Loss',
                  value: Math.abs(monthlyProfit),
                  color: monthlyProfit >= 0 ? '#22c55e' : '#ef4444'
                }
              ]}
              centerText={`${formatCurrency(monthlyUnits * sellingPricePerUnit)}\nRevenue`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Analysis Details
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Unit Economics</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Contribution Margin per Unit</span>
                  <span className="font-medium">
                    {formatCurrency(sellingPricePerUnit - variableCostPerUnit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Contribution Margin Ratio</span>
                  <span className="font-medium">
                    {((sellingPricePerUnit - variableCostPerUnit) / sellingPricePerUnit * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Monthly Analysis</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Total Revenue</span>
                  <span className="font-medium">
                    {formatCurrency(monthlyUnits * sellingPricePerUnit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Variable Costs</span>
                  <span className="font-medium">
                    {formatCurrency(monthlyUnits * variableCostPerUnit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Fixed Costs</span>
                  <span className="font-medium">{formatCurrency(fixedCosts)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span>Net Profit/Loss</span>
                  <span className={`font-medium ${monthlyProfit >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                    {formatCurrency(monthlyProfit)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Key Insights</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>
                  {monthlyUnits >= breakEvenUnits
                    ? `Operating ${((monthlyUnits / breakEvenUnits - 1) * 100).toFixed(1)}% above break-even`
                    : `Need ${((breakEvenUnits - monthlyUnits) / breakEvenUnits * 100).toFixed(1)}% more units to break even`
                  }
                </li>
                <li>Each unit contributes {formatCurrency(sellingPricePerUnit - variableCostPerUnit)} to fixed costs</li>
                <li>
                  {marginOfSafety >= 0
                    ? `Can sustain a ${marginOfSafety.toFixed(1)}% drop in sales`
                    : 'Currently operating below break-even point'
                  }
                </li>
                <li>Fixed costs represent {((fixedCosts / (monthlyUnits * sellingPricePerUnit)) * 100).toFixed(1)}% of revenue</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};