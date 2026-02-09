import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';

export const ProfitMarginCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(1000000);
  const [costOfGoods, setCostOfGoods] = useState<number>(600000);
  const [operatingExpenses, setOperatingExpenses] = useState<number>(200000);
  const [otherExpenses, setOtherExpenses] = useState<number>(50000);
  const [grossProfit, setGrossProfit] = useState<number>(0);
  const [operatingProfit, setOperatingProfit] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [margins, setMargins] = useState<{
    gross: number;
    operating: number;
    net: number;
  }>({ gross: 0, operating: 0, net: 0 });
  
  useEffect(() => {
    const gross = revenue - costOfGoods;
    const operating = gross - operatingExpenses;
    const net = operating - otherExpenses;
    
    setGrossProfit(gross);
    setOperatingProfit(operating);
    setNetProfit(net);
    
    setMargins({
      gross: (gross / revenue) * 100,
      operating: (operating / revenue) * 100,
      net: (net / revenue) * 100
    });
  }, [revenue, costOfGoods, operatingExpenses, otherExpenses]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Financial Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="revenue" className="text-sm font-medium text-neutral-700">
                Revenue (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(revenue)}
              </span>
            </div>
            <input 
              type="range" 
              id="revenue"
              min="100000" 
              max="10000000" 
              step="100000" 
              value={revenue} 
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="cost-of-goods" className="text-sm font-medium text-neutral-700">
                Cost of Goods Sold (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(costOfGoods)}
              </span>
            </div>
            <input 
              type="range" 
              id="cost-of-goods"
              min="0" 
              max={revenue} 
              step="10000" 
              value={costOfGoods} 
              onChange={(e) => setCostOfGoods(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="operating-expenses" className="text-sm font-medium text-neutral-700">
                Operating Expenses (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(operatingExpenses)}
              </span>
            </div>
            <input 
              type="range" 
              id="operating-expenses"
              min="0" 
              max={revenue - costOfGoods} 
              step="10000" 
              value={operatingExpenses} 
              onChange={(e) => setOperatingExpenses(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="other-expenses" className="text-sm font-medium text-neutral-700">
                Other Expenses (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(otherExpenses)}
              </span>
            </div>
            <input 
              type="range" 
              id="other-expenses"
              min="0" 
              max={revenue - costOfGoods - operatingExpenses} 
              step="10000" 
              value={otherExpenses} 
              onChange={(e) => setOtherExpenses(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Profit Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Gross Profit</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(grossProfit)}</p>
              <p className="text-sm text-[--success-600]">{margins.gross.toFixed(1)}% margin</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Operating Profit</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(operatingProfit)}</p>
              <p className="text-sm text-[--success-600]">{margins.operating.toFixed(1)}% margin</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Net Profit</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(netProfit)}</p>
              <p className="text-sm text-[--success-600]">{margins.net.toFixed(1)}% margin</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Cost Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Cost of Goods', value: costOfGoods, color: '#ef4444' },
                { name: 'Operating Expenses', value: operatingExpenses, color: '#f59e0b' },
                { name: 'Other Expenses', value: otherExpenses, color: '#a855f7' },
                { name: 'Net Profit', value: netProfit, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(revenue)}\nRevenue`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Margin Analysis
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Gross Profit Margin</h3>
              <p className="text-sm text-neutral-600 mb-2">
                Measures the profitability of your core business operations before operating expenses.
              </p>
              <div className="flex items-center space-x-2">
                <div className="h-2 rounded-full bg-[--primary-100] flex-grow">
                  <div 
                    className="h-full rounded-full bg-[--primary-600]"
                    style={{ width: `${Math.min(100, Math.max(0, margins.gross))}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-neutral-900">{margins.gross.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Operating Profit Margin</h3>
              <p className="text-sm text-neutral-600 mb-2">
                Shows how efficiently you manage your operations and overhead costs.
              </p>
              <div className="flex items-center space-x-2">
                <div className="h-2 rounded-full bg-[--primary-100] flex-grow">
                  <div 
                    className="h-full rounded-full bg-[--primary-600]"
                    style={{ width: `${Math.min(100, Math.max(0, margins.operating))}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-neutral-900">{margins.operating.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Net Profit Margin</h3>
              <p className="text-sm text-neutral-600 mb-2">
                Indicates the overall profitability of your business after all expenses.
              </p>
              <div className="flex items-center space-x-2">
                <div className="h-2 rounded-full bg-[--primary-100] flex-grow">
                  <div 
                    className="h-full rounded-full bg-[--primary-600]"
                    style={{ width: `${Math.min(100, Math.max(0, margins.net))}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-neutral-900">{margins.net.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Industry Benchmarks</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Retail: 3-5% net margin</li>
                <li>Manufacturing: 10-15% net margin</li>
                <li>Technology: 15-25% net margin</li>
                <li>Services: 15-20% net margin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};