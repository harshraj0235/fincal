import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, TrendingUp } from 'lucide-react';

export const BrokerageCalculator: React.FC = () => {
  const [tradeType, setTradeType] = useState<'equity' | 'futures' | 'options'>('equity');
  const [buyPrice, setBuyPrice] = useState<number>(1000);
  const [sellPrice, setSellPrice] = useState<number>(1050);
  const [quantity, setQuantity] = useState<number>(100);
  const [brokerageType, setBrokerageType] = useState<'flat' | 'percentage'>('flat');
  const [brokerageRate, setBrokerageRate] = useState<number>(20);
  
  const [turnover, setTurnover] = useState<number>(0);
  const [brokerage, setBrokerage] = useState<number>(0);
  const [stt, setStt] = useState<number>(0);
  const [exchangeCharges, setExchangeCharges] = useState<number>(0);
  const [gst, setGst] = useState<number>(0);
  const [sebi, setSebi] = useState<number>(0);
  const [stampDuty, setStampDuty] = useState<number>(0);
  const [totalCharges, setTotalCharges] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  
  useEffect(() => {
    // Calculate turnover
    const buyValue = buyPrice * quantity;
    const sellValue = sellPrice * quantity;
    const calculatedTurnover = buyValue + sellValue;
    setTurnover(calculatedTurnover);
    
    // Calculate brokerage
    let calculatedBrokerage = 0;
    if (brokerageType === 'flat') {
      calculatedBrokerage = brokerageRate * 2; // Buy and sell
    } else {
      calculatedBrokerage = calculatedTurnover * (brokerageRate / 100);
    }
    setBrokerage(calculatedBrokerage);
    
    // Calculate STT (Securities Transaction Tax)
    let calculatedStt = 0;
    if (tradeType === 'equity') {
      calculatedStt = sellValue * 0.001; // 0.1% on sell side for equity delivery
    } else if (tradeType === 'futures') {
      calculatedStt = sellValue * 0.0001; // 0.01% on sell side for futures
    } else {
      calculatedStt = sellValue * 0.0005; // 0.05% on sell side for options
    }
    setStt(calculatedStt);
    
    // Calculate exchange charges
    const calculatedExchangeCharges = calculatedTurnover * 0.0000325; // 0.00325%
    setExchangeCharges(calculatedExchangeCharges);
    
    // Calculate GST (18% on brokerage and exchange charges)
    const calculatedGst = (calculatedBrokerage + calculatedExchangeCharges) * 0.18;
    setGst(calculatedGst);
    
    // Calculate SEBI charges
    const calculatedSebi = calculatedTurnover * 0.000001; // 0.0001%
    setSebi(calculatedSebi);
    
    // Calculate stamp duty (only on buy side)
    let calculatedStampDuty = 0;
    if (tradeType === 'equity') {
      calculatedStampDuty = buyValue * 0.00015; // 0.015% for equity
    } else if (tradeType === 'futures') {
      calculatedStampDuty = buyValue * 0.00002; // 0.002% for futures
    } else {
      calculatedStampDuty = buyValue * 0.00003; // 0.003% for options
    }
    setStampDuty(calculatedStampDuty);
    
    // Calculate total charges
    const calculatedTotalCharges = calculatedBrokerage + calculatedStt + calculatedExchangeCharges + 
                                  calculatedGst + calculatedSebi + calculatedStampDuty;
    setTotalCharges(calculatedTotalCharges);
    
    // Calculate net profit/loss
    const grossProfit = sellValue - buyValue;
    const calculatedNetProfit = grossProfit - calculatedTotalCharges;
    setNetProfit(calculatedNetProfit);
  }, [tradeType, buyPrice, sellPrice, quantity, brokerageType, brokerageRate]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Trade Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Trade Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  tradeType === 'equity'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setTradeType('equity')}
              >
                Equity
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  tradeType === 'futures'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setTradeType('futures')}
              >
                Futures
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  tradeType === 'options'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setTradeType('options')}
              >
                Options
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="buy-price" className="text-sm font-medium text-neutral-700">
                Buy Price (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(buyPrice)}
              </span>
            </div>
            <input 
              type="range" 
              id="buy-price"
              min="10" 
              max="10000" 
              step="10" 
              value={buyPrice} 
              onChange={(e) => setBuyPrice(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="sell-price" className="text-sm font-medium text-neutral-700">
                Sell Price (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(sellPrice)}
              </span>
            </div>
            <input 
              type="range" 
              id="sell-price"
              min="10" 
              max="10000" 
              step="10" 
              value={sellPrice} 
              onChange={(e) => setSellPrice(Number(e.target.value))}
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
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Brokerage Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  brokerageType === 'flat'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setBrokerageType('flat')}
              >
                Flat Fee
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  brokerageType === 'percentage'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setBrokerageType('percentage')}
              >
                Percentage
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="brokerage-rate" className="text-sm font-medium text-neutral-700">
                {brokerageType === 'flat' ? 'Brokerage per Order (₹)' : 'Brokerage Rate (%)'}
              </label>
              <span className="text-sm text-neutral-500">
                {brokerageType === 'flat' ? `₹${brokerageRate}` : `${brokerageRate}%`}
              </span>
            </div>
            <input 
              type="range" 
              id="brokerage-rate"
              min={brokerageType === 'flat' ? '0' : '0'} 
              max={brokerageType === 'flat' ? '100' : '0.5'} 
              step={brokerageType === 'flat' ? '5' : '0.01'} 
              value={brokerageRate} 
              onChange={(e) => setBrokerageRate(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Trade Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Turnover</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(turnover)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Gross P&L</p>
              <p className={`text-xl font-bold ${(sellPrice - buyPrice) * quantity >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {formatCurrency((sellPrice - buyPrice) * quantity)}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Charges</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(totalCharges)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Net P&L</p>
              <p className={`text-xl font-bold ${netProfit >= 0 ? 'text-[--success-600]' : 'text-[--error-600]'}`}>
                {formatCurrency(netProfit)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Charges Breakdown
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Charges Details</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Brokerage</span>
                  <span className="font-medium">{formatCurrency(brokerage)}</span>
                </div>
                <div className="flex justify-between">
                  <span>STT</span>
                  <span className="font-medium">{formatCurrency(stt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Charges</span>
                  <span className="font-medium">{formatCurrency(exchangeCharges)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="font-medium">{formatCurrency(gst)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SEBI Charges</span>
                  <span className="font-medium">{formatCurrency(sebi)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stamp Duty</span>
                  <span className="font-medium">{formatCurrency(stampDuty)}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span className="font-medium">Total Charges</span>
                  <span className="font-medium">{formatCurrency(totalCharges)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Breakeven Point</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p>To break even, the stock needs to move:</p>
                <p className="text-lg font-semibold text-[--primary-600]">
                  {((totalCharges / (quantity * buyPrice)) * 100).toFixed(2)}% from your buy price
                </p>
                <p>Breakeven price: {formatCurrency(buyPrice + (totalCharges / quantity))}</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>STT is higher for delivery-based equity trades</li>
                <li>Stamp duty varies by state</li>
                <li>Consider impact cost for large orders</li>
                <li>Short-term capital gains tax applicable on profits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};