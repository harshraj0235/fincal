import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator } from 'lucide-react';

type PaymentType = 'salary' | 'professional' | 'rent' | 'interest' | 'commission';

export const TdsCalculator: React.FC = () => {
  const [paymentType, setPaymentType] = useState<PaymentType>('salary');
  const [paymentAmount, setPaymentAmount] = useState<number>(100000);
  const [tdsRate, setTdsRate] = useState<number>(10);
  const [tdsAmount, setTdsAmount] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);
  
  useEffect(() => {
    // Set TDS rate based on payment type
    let rate = 10;
    switch (paymentType) {
      case 'salary':
        rate = 10;
        break;
      case 'professional':
        rate = 10;
        break;
      case 'rent':
        rate = paymentAmount > 50000 ? 10 : 0;
        break;
      case 'interest':
        rate = 10;
        break;
      case 'commission':
        rate = 5;
        break;
    }
    setTdsRate(rate);
  }, [paymentType, paymentAmount]);
  
  useEffect(() => {
    const tds = (paymentAmount * tdsRate) / 100;
    setTdsAmount(tds);
    setNetAmount(paymentAmount - tds);
  }, [paymentAmount, tdsRate]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Payment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Payment Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'salary'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('salary')}
              >
                Salary
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'professional'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('professional')}
              >
                Professional
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'rent'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('rent')}
              >
                Rent
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'interest'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('interest')}
              >
                Interest
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentType === 'commission'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setPaymentType('commission')}
              >
                Commission
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="payment-amount" className="text-sm font-medium text-neutral-700">
                Payment Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(paymentAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="payment-amount"
              min="1000" 
              max="1000000" 
              step="1000" 
              value={paymentAmount} 
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹1,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="tds-rate" className="text-sm font-medium text-neutral-700">
                TDS Rate (%)
              </label>
              <span className="text-sm text-neutral-500">
                {tdsRate}%
              </span>
            </div>
            <input 
              type="range" 
              id="tds-rate"
              min="0" 
              max="30" 
              step="0.1" 
              value={tdsRate} 
              onChange={(e) => setTdsRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>0%</span>
              <span>30%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">TDS Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Gross Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(paymentAmount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">TDS Amount</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(tdsAmount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Net Amount</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(netAmount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            TDS Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">TDS Rates</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Salary:</span> As per income tax slab</p>
                <p><span className="font-medium">Professional Fees:</span> 10% (5% for technical services)</p>
                <p><span className="font-medium">Rent:</span> 10% if above ₹50,000 per month</p>
                <p><span className="font-medium">Interest:</span> 10% on most interest payments</p>
                <p><span className="font-medium">Commission:</span> 5% on commission or brokerage</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Threshold Limits</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Professional Fees:</span> ₹30,000 per year</p>
                <p><span className="font-medium">Rent:</span> ₹50,000 per month</p>
                <p><span className="font-medium">Interest:</span> ₹40,000 per year (₹50,000 for senior citizens)</p>
                <p><span className="font-medium">Commission:</span> ₹15,000 per year</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>PAN is mandatory for TDS deduction</li>
                <li>Higher TDS rate applies if PAN is not provided</li>
                <li>TDS certificates (Form 16/16A) must be issued</li>
                <li>Quarterly TDS returns must be filed by deductor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};