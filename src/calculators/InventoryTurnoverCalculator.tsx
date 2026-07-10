import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, Package, TrendingUp } from 'lucide-react';

export const InventoryTurnoverCalculator: React.FC = () => {
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<number>(1000000);
  const [beginningInventory, setBeginningInventory] = useState<number>(200000);
  const [endingInventory, setEndingInventory] = useState<number>(150000);
  const [salesRevenue, setSalesRevenue] = useState<number>(1500000);
  const [inventoryTurnover, setInventoryTurnover] = useState<number>(0);
  const [daysInventory, setDaysInventory] = useState<number>(0);
  const [grossMargin, setGrossMargin] = useState<number>(0);
  
  useEffect(() => {
    // Calculate average inventory
    const averageInventory = (beginningInventory + endingInventory) / 2;
    
    // Calculate inventory turnover ratio
    const turnover = costOfGoodsSold / averageInventory;
    setInventoryTurnover(turnover);
    
    // Calculate days inventory outstanding
    const dio = 365 / turnover;
    setDaysInventory(dio);
    
    // Calculate gross margin
    const margin = ((salesRevenue - costOfGoodsSold) / salesRevenue) * 100;
    setGrossMargin(margin);
  }, [costOfGoodsSold, beginningInventory, endingInventory, salesRevenue]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Package className="w-5 h-5 mr-2 text-[--primary-600]" />
          Inventory Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="cogs" className="text-sm font-medium text-neutral-700">
                Cost of Goods Sold (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(costOfGoodsSold)}
              </span>
            </div>
            <input 
              type="range" 
              id="cogs"
              min="100000" 
              max="10000000" 
              step="100000" 
              value={costOfGoodsSold} 
              onChange={(e) => setCostOfGoodsSold(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="beginning-inventory" className="text-sm font-medium text-neutral-700">
                Beginning Inventory (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(beginningInventory)}
              </span>
            </div>
            <input 
              type="range" 
              id="beginning-inventory"
              min="10000" 
              max="2000000" 
              step="10000" 
              value={beginningInventory} 
              onChange={(e) => setBeginningInventory(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="ending-inventory" className="text-sm font-medium text-neutral-700">
                Ending Inventory (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(endingInventory)}
              </span>
            </div>
            <input 
              type="range" 
              id="ending-inventory"
              min="10000" 
              max="2000000" 
              step="10000" 
              value={endingInventory} 
              onChange={(e) => setEndingInventory(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="sales-revenue" className="text-sm font-medium text-neutral-700">
                Sales Revenue (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(salesRevenue)}
              </span>
            </div>
            <input 
              type="range" 
              id="sales-revenue"
              min={costOfGoodsSold} 
              max={costOfGoodsSold * 2} 
              step="100000" 
              value={salesRevenue} 
              onChange={(e) => setSalesRevenue(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Inventory Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Inventory Turnover Ratio</p>
              <p className="text-xl font-bold text-neutral-900">{inventoryTurnover.toFixed(2)}x</p>
              <p className="text-sm text-[--primary-600]">Times per year</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Days Inventory Outstanding</p>
              <p className="text-xl font-bold text-neutral-900">{daysInventory.toFixed(1)} days</p>
              <p className="text-sm text-[--primary-600]">Average holding period</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Average Inventory</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency((beginningInventory + endingInventory) / 2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Gross Margin</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {grossMargin.toFixed(1)}%
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
            Performance Analysis
          </h2>
          
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Turnover Ratio Trend</h3>
              <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[--primary-600] rounded-full"
                  style={{ width: `${Math.min(100, (inventoryTurnover / 12) * 100)}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-sm text-neutral-500">
                <span>Low (4x)</span>
                <span>Good (8x)</span>
                <span>Excellent (12x)</span>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Days Inventory Trend</h3>
              <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[--primary-600] rounded-full"
                  style={{ width: `${Math.min(100, 100 - (daysInventory / 90) * 100)}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-sm text-neutral-500">
                <span>90 days</span>
                <span>60 days</span>
                <span>30 days</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Analysis & Insights
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Performance Assessment</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p>
                  {inventoryTurnover > 8
                    ? 'Excellent inventory management with high turnover'
                    : inventoryTurnover > 4
                    ? 'Good inventory turnover, but room for improvement'
                    : 'Low turnover rate, consider optimizing inventory levels'
                  }
                </p>
                <p>
                  {daysInventory < 45
                    ? 'Very efficient inventory holding period'
                    : daysInventory < 75
                    ? 'Moderate inventory holding duration'
                    : 'Long inventory holding period, may indicate overstocking'
                  }
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Financial Impact</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Working Capital in Inventory</span>
                  <span className="font-medium">
                    {formatCurrency((beginningInventory + endingInventory) / 2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Profit</span>
                  <span className="font-medium">
                    {formatCurrency(salesRevenue - costOfGoodsSold)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Inventory Efficiency</span>
                  <span className="font-medium">
                    {(costOfGoodsSold / ((beginningInventory + endingInventory) / 2) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Recommendations</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                {inventoryTurnover < 4 && (
                  <>
                    <li>Consider reducing inventory levels</li>
                    <li>Implement better forecasting methods</li>
                    <li>Review purchasing policies</li>
                  </>
                )}
                {inventoryTurnover >= 4 && inventoryTurnover < 8 && (
                  <>
                    <li>Optimize order quantities</li>
                    <li>Monitor seasonal variations</li>
                    <li>Review safety stock levels</li>
                  </>
                )}
                {inventoryTurnover >= 8 && (
                  <>
                    <li>Maintain current inventory management practices</li>
                    <li>Monitor for stockout risks</li>
                    <li>Consider bulk purchase discounts</li>
                  </>
                )}
                <li>Regular review of slow-moving items</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};