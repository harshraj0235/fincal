import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, TrendingUp } from 'lucide-react';

interface CommodityOption {
  name: string;
  price: number;
  lotSize: number;
  marginPercentage: number;
}

export const CommodityMarginCalculator: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<string>('gold');
  const [lots, setLots] = useState<number>(1);
  const [price, setPrice] = useState<number>(60000);
  const [marginPercentage, setMarginPercentage] = useState<number>(5);
  
  const [requiredMargin, setRequiredMargin] = useState<number>(0);
  const [exposureValue, setExposureValue] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(0);
  
  const commodities: Record<string, CommodityOption> = {
    gold: {
      name: 'Gold',
      price: 60000,
      lotSize: 10,
      marginPercentage: 5
    },
    silver: {
      name: 'Silver',
      price: 75000,
      lotSize: 30,
      marginPercentage: 6
    },
    crudeoil: {
      name: 'Crude Oil',
      price: 6500,
      lotSize: 100,
      marginPercentage: 8
    },
    copper: {
      name: 'Copper',
      price: 750,
      lotSize: 2500,
      marginPercentage: 7
    }
  };
  
  useEffect(() => {
    const commodity = commodities[selectedCommodity];
    setPrice(commodity.price);
    setMarginPercentage(commodity.marginPercentage);
  }, [selectedCommodity]);
  
  useEffect(() => {
    const commodity = commodities[selectedCommodity];
    const contractValue = price * commodity.lotSize * lots;
    const margin = contractValue * (marginPercentage / 100);
    
    setExposureValue(contractValue);
    setRequiredMargin(margin);
    setLeverage(contractValue / margin);
  }, [selectedCommodity, lots, price, marginPercentage]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Commodity Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Select Commodity
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(commodities).map(([key, commodity]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCommodity(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedCommodity === key
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {commodity.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="lots" className="text-sm font-medium text-neutral-700">
                Number of Lots
              </label>
              <span className="text-sm text-neutral-500">
                {lots} lot{lots > 1 ? 's' : ''}
              </span>
            </div>
            <input 
              type="range" 
              id="lots"
              min="1" 
              max="10" 
              value={lots} 
              onChange={(e) => setLots(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="price" className="text-sm font-medium text-neutral-700">
                Price (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(price)}
              </span>
            </div>
            <input 
              type="range" 
              id="price"
              min={price * 0.8} 
              max={price * 1.2} 
              step="10" 
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))}
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
              min="3" 
              max="15" 
              step="0.5" 
              value={marginPercentage} 
              onChange={(e) => setMarginPercentage(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Margin Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Required Margin</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(requiredMargin)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Exposure Value</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(exposureValue)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Leverage</p>
              <p className="text-xl font-bold text-[--primary-900]">{leverage.toFixed(2)}x</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Commodity Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Contract Specifications</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Commodity</span>
                  <span className="font-medium">{commodities[selectedCommodity].name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lot Size</span>
                  <span className="font-medium">{commodities[selectedCommodity].lotSize} units</span>
                </div>
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-medium">{formatCurrency(price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contract Value</span>
                  <span className="font-medium">{formatCurrency(price * commodities[selectedCommodity].lotSize)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Margin Requirements</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Initial Margin:</strong> The amount required to open a position</p>
                <p><strong>Maintenance Margin:</strong> The minimum amount required to keep the position open</p>
                <p><strong>Margin Call:</strong> When your account equity falls below the maintenance margin</p>
                <p><strong>Liquidation:</strong> When your account equity falls below the required margin</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Risk Management</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Use stop losses to limit potential losses</li>
                <li>Don't overleverage your positions</li>
                <li>Monitor margin levels regularly</li>
                <li>Be aware of market volatility</li>
                <li>Maintain adequate buffer in your account</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};