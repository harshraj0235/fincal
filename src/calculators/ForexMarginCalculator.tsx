import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { IndianRupee, DollarSign } from 'lucide-react';

export const ForexMarginCalculator: React.FC = () => {
  const [positionSize, setPositionSize] = useState<number>(100000);
  const [leverage, setLeverage] = useState<number>(20);
  const [stopLoss, setStopLoss] = useState<number>(50);
  const [currencyPair, setCurrencyPair] = useState<string>('USDINR');
  
  const [requiredMargin, setRequiredMargin] = useState<number>(0);
  const [marginPercentage, setMarginPercentage] = useState<number>(0);
  const [potentialLoss, setPotentialLoss] = useState<number>(0);
  
  useEffect(() => {
    // Calculate margin requirements
    const margin = positionSize / leverage;
    setRequiredMargin(margin);
    setMarginPercentage((margin / positionSize) * 100);
    
    // Calculate potential loss
    const pipValue = (positionSize * 0.0001); // Assuming standard pip value
    const potentialLossAmount = pipValue * stopLoss;
    setPotentialLoss(potentialLossAmount);
  }, [positionSize, leverage, stopLoss, currencyPair]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-[--primary-600]" />
          Position Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Currency Pair
            </label>
            <select
              value={currencyPair}
              onChange={(e) => setCurrencyPair(e.target.value)}
              className="input"
            >
              <option value="USDINR">USD/INR</option>
              <option value="EURINR">EUR/INR</option>
              <option value="GBPINR">GBP/INR</option>
              <option value="JPYINR">JPY/INR</option>
            </select>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="position-size" className="text-sm font-medium text-neutral-700">
                Position Size (USD)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(positionSize)}
              </span>
            </div>
            <input 
              type="range" 
              id="position-size"
              min="1000" 
              max="1000000" 
              step="1000" 
              value={positionSize} 
              onChange={(e) => setPositionSize(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="leverage" className="text-sm font-medium text-neutral-700">
                Leverage
              </label>
              <span className="text-sm text-neutral-500">
                {leverage}:1
              </span>
            </div>
            <input 
              type="range" 
              id="leverage"
              min="1" 
              max="100" 
              value={leverage} 
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="stop-loss" className="text-sm font-medium text-neutral-700">
                Stop Loss (Pips)
              </label>
              <span className="text-sm text-neutral-500">
                {stopLoss} pips
              </span>
            </div>
            <input 
              type="range" 
              id="stop-loss"
              min="10" 
              max="200" 
              value={stopLoss} 
              onChange={(e) => setStopLoss(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Margin Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Required Margin</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(requiredMargin)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Margin Percentage</p>
              <p className="text-xl font-bold text-neutral-900">{marginPercentage.toFixed(2)}%</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Potential Loss</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(potentialLoss)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Margin Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Margin Calculation</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Required Margin:</strong> Position Size ÷ Leverage</p>
                <p><strong>Margin Percentage:</strong> (Required Margin ÷ Position Size) × 100</p>
                <p><strong>Pip Value:</strong> Position Size × 0.0001</p>
                <p><strong>Potential Loss:</strong> Pip Value × Stop Loss Pips</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Risk Management</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Keep position sizes manageable</li>
                <li>Use appropriate leverage</li>
                <li>Set stop losses to limit risk</li>
                <li>Monitor margin levels closely</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3  className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Higher leverage increases risk</li>
                <li>Maintain adequate margin buffer</li>
                <li>Consider market volatility</li>
                <li>Use proper risk management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};