import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, TrendingUp, AlertTriangle } from 'lucide-react';

export const MarginTradingCalculator: React.FC = () => {
  const [stockPrice, setStockPrice] = useState<number>(1000);
  const [quantity, setQuantity] = useState<number>(100);
  const [marginPercentage, setMarginPercentage] = useState<number>(20);
  const [stopLoss, setStopLoss] = useState<number>(5);
  const [targetProfit, setTargetProfit] = useState<number>(10);
  
  const [positionValue, setPositionValue] = useState<number>(0);
  const [marginRequired, setMarginRequired] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(0);
  const [potentialProfit, setPotentialProfit] = useState<number>(0);
  const [potentialLoss, setPotentialLoss] = useState<number>(0);
  const [returnOnEquity, setReturnOnEquity] = useState<number>(0);
  
  useEffect(() => {
    // Calculate position value
    const value = stockPrice * quantity;
    setPositionValue(value);
    
    // Calculate margin required
    const margin = value * (marginPercentage / 100);
    setMarginRequired(margin);
    
    // Calculate leverage
    const calculatedLeverage = 100 / marginPercentage;
    setLeverage(calculatedLeverage);
    
    // Calculate potential profit and loss
    const profit = value * (targetProfit / 100);
    const loss = value * (stopLoss / 100);
    setPotentialProfit(profit);
    setPotentialLoss(loss);
    
    // Calculate return on equity (ROE)
    const roe = (profit / margin) * 100;
    setReturnOnEquity(roe);
  }, [stockPrice, quantity, marginPercentage, stopLoss, targetProfit]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Margin Trading Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="stock-price" className="text-sm font-medium text-neutral-700">
                Stock Price (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(stockPrice)}
              </span>
            </div>
            <input 
              type="range" 
              id="stock-price"
              min="100" 
              max="10000" 
              step="50" 
              value={stockPrice} 
              onChange={(e) => setStockPrice(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="quantity" className="text-sm font-medium text-neutral-700">
                Quantity
              </label>
              <span className="text-sm text-neutral-500">
                {quantity} shares
              </span>
            </div>
            <input 
              type="range" 
              id="quantity"
              min="1" 
              max="1000" 
              step="1" 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="margin-percentage" className="text-sm font-medium text-neutral-700">
                Margin Percentage (%)
              </label>
              <span className="text-sm text-neutral-500">
                {marginPercentage}%
              </span>
            </div>
            <input 
              type="range" 
              id="margin-percentage"
              min="10" 
              max="100" 
              step="5" 
              value={marginPercentage} 
              onChange={(e) => setMarginPercentage(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="stop-loss" className="text-sm font-medium text-neutral-700">
                  Stop Loss (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {stopLoss}%
                </span>
              </div>
              <input 
                type="range" 
                id="stop-loss"
                min="1" 
                max="20" 
                step="0.5" 
                value={stopLoss} 
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="target-profit" className="text-sm font-medium text-neutral-700">
                  Target Profit (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {targetProfit}%
                </span>
              </div>
              <input 
                type="range" 
                id="target-profit"
                min="1" 
                max="50" 
                step="0.5" 
                value={targetProfit} 
                onChange={(e) => setTargetProfit(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Margin Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Position Value</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(positionValue)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Margin Required</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(marginRequired)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Leverage</p>
              <p className="text-xl font-bold text-[--primary-900]">{leverage.toFixed(2)}x</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Return on Equity</p>
              <p className="text-xl font-bold text-[--success-600]">{returnOnEquity.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Profit & Loss Scenarios
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Target Scenario</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Target Price</span>
                  <span className="font-medium">{formatCurrency(stockPrice * (1 + targetProfit / 100))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Potential Profit</span>
                  <span className="font-medium text-[--success-600]">{formatCurrency(potentialProfit)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Return on Investment</span>
                  <span className="font-medium text-[--success-600]">{(potentialProfit / positionValue * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Return on Equity</span>
                  <span className="font-medium text-[--success-600]">{returnOnEquity.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Stop Loss Scenario</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Stop Loss Price</span>
                  <span className="font-medium">{formatCurrency(stockPrice * (1 - stopLoss / 100))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Potential Loss</span>
                  <span className="font-medium text-[--error-600]">{formatCurrency(potentialLoss)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Loss on Investment</span>
                  <span className="font-medium text-[--error-600]">{(potentialLoss / positionValue * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Loss on Equity</span>
                  <span className="font-medium text-[--error-600]">{(potentialLoss / marginRequired * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--error-50] rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-[--error-600] mt-0.5 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-[--error-900] mb-2">Margin Call Warning</h3>
                  <p className="text-sm text-[--error-700]">
                    Margin call will be triggered if the stock price drops by approximately {((marginPercentage - 10) / marginPercentage * 100).toFixed(1)}%. 
                    This would require additional funds to maintain the position.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Risk Management Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Always use stop losses to limit potential losses</li>
                <li>Don't use maximum available leverage</li>
                <li>Keep additional funds as buffer for margin calls</li>
                <li>Be cautious with overnight positions</li>
                <li>Monitor your positions regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};