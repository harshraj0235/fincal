import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, DollarSign } from 'lucide-react';

export const ForexPipCalculator: React.FC = () => {
  const [lotSize, setLotSize] = useState<number>(1);
  const [currencyPair, setCurrencyPair] = useState<string>('USDINR');
  const [accountCurrency, setAccountCurrency] = useState<string>('INR');
  const [exchangeRate, setExchangeRate] = useState<number>(83.25); // USD/INR rate
  
  const [pipValue, setPipValue] = useState<number>(0);
  const [pipValueLocal, setPipValueLocal] = useState<number>(0);
  
  useEffect(() => {
    // Calculate pip value
    const standardLotSize = 100000; // Standard lot size in forex
    const lotMultiplier = lotSize;
    const pipSize = 0.0001; // Standard pip size for most pairs
    
    let calculatedPipValue = standardLotSize * lotMultiplier * pipSize;
    
    // Convert to account currency
    const localPipValue = calculatedPipValue * exchangeRate;
    
    setPipValue(calculatedPipValue);
    setPipValueLocal(localPipValue);
  }, [lotSize, currencyPair, accountCurrency, exchangeRate]);
  
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
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Account Currency
            </label>
            <select
              value={accountCurrency}
              onChange={(e) => setAccountCurrency(e.target.value)}
              className="input"
            >
              <option value="INR">Indian Rupee (INR)</option>
              <option value="USD">US Dollar (USD)</option>
            </select>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="lot-size" className="text-sm font-medium text-neutral-700">
                Lot Size
              </label>
              <span className="text-sm text-neutral-500">
                {lotSize} lot{lotSize > 1 ? 's' : ''}
              </span>
            </div>
            <input 
              type="range" 
              id="lot-size"
              min="0.01" 
              max="10" 
              step="0.01" 
              value={lotSize} 
              onChange={(e) => setLotSize(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="exchange-rate" className="text-sm font-medium text-neutral-700">
                Exchange Rate
              </label>
              <span className="text-sm text-neutral-500">
                {exchangeRate}
              </span>
            </div>
            <input 
              type="range" 
              id="exchange-rate"
              min="70" 
              max="90" 
              step="0.01" 
              value={exchangeRate} 
              onChange={(e) => setExchangeRate(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Pip Value</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Pip Value (USD)</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(pipValue)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Pip Value (INR)</p>
              <p className="text-xl font-bold text-[--primary-900]">{formatCurrency(pipValueLocal)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Pip Value Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">What is a Pip?</h3>
              <p className="text-sm text-neutral-600">
                A pip (percentage in point) is the smallest price movement in a trading pair. For most currency pairs, a pip is 0.0001 or 1/100th of 1%. For pairs involving JPY, a pip is 0.01.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Lot Sizes</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Standard Lot:</strong> 100,000 units of base currency</p>
                <p><strong>Mini Lot:</strong> 10,000 units of base currency</p>
                <p><strong>Micro Lot:</strong> 1,000 units of base currency</p>
                <p><strong>Nano Lot:</strong> 100 units of base currency</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Risk Management</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Position Sizing:</strong> Determine position size based on risk tolerance</p>
                <p><strong>Stop Loss:</strong> Calculate potential loss based on pip value and stop loss distance</p>
                <p><strong>Risk per Trade:</strong> Typically 1-2% of account balance</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Pip values vary by currency pair</li>
                <li>Account currency affects pip value</li>
                <li>Higher lot sizes increase risk</li>
                <li>Always use proper risk management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};