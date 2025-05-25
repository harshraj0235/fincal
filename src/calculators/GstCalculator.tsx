import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateGST } from '../utils/calculatorUtils';
import { Plus, Calculator, ArrowDown, ArrowUp } from 'lucide-react';

export const GstCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [cgst, setCgst] = useState<number>(0);
  const [sgst, setSgst] = useState<number>(0);
  
  useEffect(() => {
    const result = calculateGST(amount, gstRate, calculationType);
    
    if (calculationType === 'exclusive') {
      setGstAmount(result.gstAmount);
      setTotalAmount(result.totalAmount);
      setBaseAmount(amount);
    } else {
      setGstAmount(result.gstAmount);
      setBaseAmount(result.baseAmount);
      setTotalAmount(amount);
    }
    
    setCgst(result.gstAmount / 2);
    setSgst(result.gstAmount / 2);
  }, [amount, gstRate, calculationType]);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex rounded-lg overflow-hidden border border-neutral-200">
          <button 
            className={`px-4 py-2 text-sm font-medium ${calculationType === 'exclusive' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setCalculationType('exclusive')}
          >
            Add GST (Exclusive)
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${calculationType === 'inclusive' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setCalculationType('inclusive')}
          >
            Remove GST (Inclusive)
          </button>
        </div>
        
        <div className="flex rounded-lg overflow-hidden border border-neutral-200">
          {[5, 12, 18, 28].map(rate => (
            <button 
              key={rate}
              className={`px-3 py-2 text-sm font-medium ${gstRate === rate ? 'bg-primary-600 text-white' : 'bg-white text-neutral-700'}`}
              onClick={() => setGstRate(rate)}
            >
              {rate}%
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            {calculationType === 'exclusive' ? 'Add GST to Amount' : 'Remove GST from Amount'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-neutral-700 mb-2">
                {calculationType === 'exclusive' ? 'Base Amount (₹)' : 'Total Amount (₹)'}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-neutral-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  className="input pl-8"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="gst-rate" className="block text-sm font-medium text-neutral-700 mb-2">
                GST Rate (%)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="gst-rate"
                  className="input pr-8"
                  placeholder="GST rate"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.01"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-neutral-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            {calculationType === 'exclusive' ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-neutral-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500">Base Amount</p>
                  <p className="text-xl font-bold text-neutral-900">{formatCurrency(baseAmount)}</p>
                </div>
                <Plus className="h-5 w-5 text-neutral-400" />
                <div className="bg-primary-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500">GST Amount ({gstRate}%)</p>
                  <p className="text-xl font-bold text-primary-800">{formatCurrency(gstAmount)}</p>
                </div>
                <ArrowDown className="h-5 w-5 text-neutral-400" />
                <div className="bg-accent-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500">Total Amount</p>
                  <p className="text-xl font-bold text-accent-800">{formatCurrency(totalAmount)}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-accent-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500">Total Amount</p>
                  <p className="text-xl font-bold text-accent-800">{formatCurrency(totalAmount)}</p>
                </div>
                <ArrowDown className="h-5 w-5 text-neutral-400" />
                <div className="bg-neutral-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500">Base Amount</p>
                  <p className="text-xl font-bold text-neutral-900">{formatCurrency(baseAmount)}</p>
                </div>
                <Plus className="h-5 w-5 text-neutral-400" />
                <div className="bg-primary-100 rounded-lg p-4 w-64 text-center">
                  <p className="text-sm text-neutral-500">GST Amount ({gstRate}%)</p>
                  <p className="text-xl font-bold text-primary-800">{formatCurrency(gstAmount)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            GST Breakup
          </h2>
          
          <div className="p-6 bg-white rounded-lg border border-neutral-200">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-500">Base Amount</p>
                    <p className="text-lg font-semibold text-neutral-900">{formatCurrency(baseAmount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Taxable Value</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-500">CGST @ {gstRate/2}%</p>
                    <p className="text-lg font-semibold text-primary-800">{formatCurrency(cgst)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Central Tax</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-500">SGST @ {gstRate/2}%</p>
                    <p className="text-lg font-semibold text-primary-800">{formatCurrency(sgst)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">State Tax</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 my-2"></div>
              
              <div className="p-4 bg-accent-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-500">Total Amount</p>
                    <p className="text-lg font-semibold text-accent-800">{formatCurrency(totalAmount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Invoice Value</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-700 mb-2">GST Calculation Formula</h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <p><span className="font-medium">Add GST (Exclusive):</span></p>
              <p className="pl-4">GST Amount = Base Amount × (GST Rate ÷ 100)</p>
              <p className="pl-4">Total Amount = Base Amount + GST Amount</p>
              <p className="mt-2"><span className="font-medium">Remove GST (Inclusive):</span></p>
              <p className="pl-4">Base Amount = Total Amount ÷ (1 + GST Rate ÷ 100)</p>
              <p className="pl-4">GST Amount = Total Amount - Base Amount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};