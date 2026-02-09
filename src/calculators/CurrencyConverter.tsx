import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, ArrowRight, RefreshCw } from 'lucide-react';

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('INR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(0.012); // Default INR to USD rate
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  
  const currencies = [
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'AED', name: 'UAE Dirham' }
  ];
  
  const rates: Record<string, Record<string, number>> = {
    'INR': {
      'USD': 0.012,
      'EUR': 0.011,
      'GBP': 0.0095,
      'JPY': 1.78,
      'AUD': 0.018,
      'CAD': 0.016,
      'CHF': 0.011,
      'SGD': 0.016,
      'AED': 0.044
    }
  };
  
  // Generate reverse rates
  Object.entries(rates['INR']).forEach(([currency, rate]) => {
    if (!rates[currency]) rates[currency] = {};
    rates[currency]['INR'] = 1 / rate;
    
    // Generate cross rates
    Object.entries(rates['INR']).forEach(([otherCurrency, otherRate]) => {
      if (!rates[currency][otherCurrency]) {
        rates[currency][otherCurrency] = rate / otherRate;
      }
    });
  });
  
  useEffect(() => {
    const rate = rates[fromCurrency][toCurrency] || 1;
    setExchangeRate(rate);
    setConvertedAmount(amount * rate);
  }, [amount, fromCurrency, toCurrency]);
  
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Currency Conversion
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-neutral-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input"
              min="0"
              step="100"
            />
          </div>
          
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
            <div>
              <label htmlFor="from-currency" className="block text-sm font-medium text-neutral-700 mb-2">
                From Currency
              </label>
              <select
                id="from-currency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="input"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={swapCurrencies}
              className="mt-6 p-2 rounded-full hover:bg-neutral-100"
            >
              <RefreshCw className="w-5 h-5 text-neutral-500" />
            </button>
            
            <div>
              <label htmlFor="to-currency" className="block text-sm font-medium text-neutral-700 mb-2">
                To Currency
              </label>
              <select
                id="to-currency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="input"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Conversion Result</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Amount</p>
              <p className="text-xl font-bold text-neutral-900">
                {amount.toLocaleString()} {fromCurrency}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-sm text-neutral-500 mb-1">Converted Amount</p>
              <p className="text-xl font-bold text-[--success-600]">
                {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
              </p>
            </div>
          </div>
          <p className="text-sm text-neutral-500 mt-4">
            Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Currency Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Exchange Rate Details</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p>Exchange rates are indicative and updated periodically. For actual rates, please check with your bank or forex provider.</p>
                <p>Rates shown are mid-market rates and may differ from the rates used by financial institutions.</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Popular Currency Pairs</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-neutral-900">INR/USD</p>
                  <p className="text-neutral-600">{rates['INR']['USD'].toFixed(4)}</p>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">INR/EUR</p>
                  <p className="text-neutral-600">{rates['INR']['EUR'].toFixed(4)}</p>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">INR/GBP</p>
                  <p className="text-neutral-600">{rates['INR']['GBP'].toFixed(4)}</p>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">INR/AED</p>
                  <p className="text-neutral-600">{rates['INR']['AED'].toFixed(4)}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Exchange rates fluctuate constantly</li>
                <li>Banks may charge additional fees</li>
                <li>Different rates may apply for cash and electronic transfers</li>
                <li>Consider timing and market conditions when converting large amounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};